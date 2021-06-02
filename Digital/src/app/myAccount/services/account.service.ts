import { Inject, Injectable } from '@angular/core';
import orderBy from 'lodash-es/orderBy';
import flatten from 'lodash-es/flatten';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscriber } from 'rxjs';

import { PrePaymentBalanceTopUpUrgency } from '../../shared/globals/prePaymentBalanceTopUpUrgency';
import { LoggerInterface, LogType } from '../../shared/instrumentation/logger.interface';
import * as api from '../../shared/service/api.service';
import { DataLayerService } from '../../shared/service/dataLayer.service';
import { PrintDocMappings, RedLineApiService } from '../../shared/service/redLineApi.service';
import { PaymentSchemeDisplayModel } from '../pages/settings/billSmoothing/billSmoothing.model';
import { DefinitionCheckPipe } from '../pipes/definitionCheck.pipe';
import { FeatureFlagService, FeatureFlagTypes } from './featureFlag.service';
import { PaygAccountService } from './paygAccount.service';
import { IPaymentMethodsService } from './settings/paymentMethods.service.interface';
import { ProductAttributesService } from './productAttributesService';
import { PaymentArrangementInstalmentPlans, InstalmentPlanStatus, InstalmentPlan } from './paymentScheme/paymentSchemeApi.service';
import { InstalmentPlanBilling, InstalmentPlanService, InstalmentPlanData, ContractInstalmentPlan } from './paymentScheme/instalmentPlan.service';
import { InstalmentPlanModel } from '../pages/bills/billPanel/billInstalmentPlanDescription/billInstalmentPlanDescription.component';

const formatRawAddress = (address: string) => {
    return !address ? '' : address
        .replace(/(\|)/g, ', ')
        .replace(/\s\s+/g, ' ')
        .toLowerCase()
        .split(' ')
        .map((word) => {
            return word.replace(word[0], word[0].toUpperCase());
        })
        .join(' ')
        .replace(/(\s[a-z]{2,3})\s+\d{4}$/i, (v) => v.toUpperCase());
};

export abstract class IAccountServiceMA {
    /**
     * Returns an observable that when subscribed to, will return a collection of contract
     * accounts. Accounts are cached. See also refreshAccounts().
     * @returns {ReplaySubject<AccountViewModel[]>} An observable yeilds accounts.
     */
    public abstract getAccounts(): Observable<AccountViewModel[]>;

    public abstract getName(): Observable<AccountOwnerModel>;

    public abstract formatAddress(address: string): string;

    public abstract areAllAccountContractsRestricted(): Observable<boolean>;

    /**
     * Returns an observable that when subscribed to, will return a collection of contract
     * accounts. Accounts will always be fetched from the server. See also getAccounts();
     * @returns {ReplaySubject<AccountViewModel[]>} An observable that yeilds accounts.
     */
    public abstract refreshAccounts(): Observable<AccountViewModel[]>;

    public abstract isExcludedFromBillSmoothing(accountViewModels: AccountViewModel[]): boolean;

    public abstract getAllActiveContracts(): Observable<string[]>;

    public abstract hasAnyContractInRegionId(regionId: string): Observable<boolean>;

    public abstract hasContractPayOnTimeDiscount(accounts: AccountViewModel[]): boolean;
}

@Injectable()
export class AccountService implements IAccountServiceMA {
    private accountsSubject: ReplaySubject<AccountViewModel[]>;
    private _publishAccountsInProgress: boolean = false;
    private _publishAccountsHaveData: boolean = false;
    private _contractWithRedlineBills: ContractWithRedlineBill[] = [];

    constructor(
        private _api: api.ApiService,
        private _redLine: RedLineApiService,
        private _paygAccountService: PaygAccountService,
        private _logger: LoggerInterface,
        private _featureFlagService: FeatureFlagService,
        private _datalayerService: DataLayerService,
        public paymentMethodService: IPaymentMethodsService,
        private productAttributesService: ProductAttributesService,
        private instalmentPlanService: InstalmentPlanService,
        @Inject('AppContentBranch') protected appContentBranch: string
    ) {
        this.accountsSubject = new ReplaySubject<AccountViewModel[]>(1);
    }

    public areAllAccountContractsRestricted(): Observable<boolean> {
        return new Observable((observer: Subscriber<boolean>) => {
            this.getAccounts().subscribe((accounts) => {
                    observer.next(accounts.every((account) => account.allContractsAreRestricted));
                    observer.complete();
                },
                (error) => {
                    observer.error(error);
                });
        });
    }

    public getAccounts(): Observable<AccountViewModel[]> {
        this.publishAccountsData();
        return this.accountsSubject.first();
    }

    public refreshAccounts(): Observable<AccountViewModel[]> {
        this.accountsSubject = new ReplaySubject<AccountViewModel[]>(1);
        this._publishAccountsHaveData = false;
        this._publishAccountsInProgress = false;
        this.publishAccountsData();
        // Don't return first as that won't update the view.
        return this.accountsSubject.first();
    }

    /**
     * Formats the address of the customer
     * @param  {string} address The address
     * @return {string}         The formatted address
     */
    public formatAddress(address: string): string {
        return formatRawAddress(address);
    }

    public getName(): Observable<AccountOwnerModel> {
        return this.getAccounts().map(
            (accounts) => {
                if (accounts.length === 0) { return; }
                let account = accounts.find((a) => !!(a.firstName && a.lastName));
                if (account) {
                    return new AccountOwnerModel(account.firstName, account.lastName);
                } else {
                    return new AccountOwnerModel();
                }
            }
        );
    }

    public isExcludedFromBillSmoothing(accountViewModels: AccountViewModel[]): boolean {
        return accountViewModels.some((account) => account.hasContractInWA);
    }

    public getAllActiveContracts(): Observable<string[]> {
        return this
            .getAccounts()
            .map(
                (accounts: AccountViewModel[]) => {
                    let contracts: string[] = [];
                    accounts
                        .filter((account: AccountViewModel) => !account.allContractsAreRestricted)
                        .map((activeAccount: AccountViewModel) => Object.assign({}, activeAccount));
                    for (let account of accounts) {
                        contracts = contracts.concat(account.contracts
                                                            .filter((contract: ContractViewModel) => !contract.isRestricted)
                                                            .map((contract: ContractViewModel) => contract.contractNumber));
                    }
                    return contracts;
                }
            );
    }

    public hasAnyContractInRegionId(regionId: string): Observable<boolean> {
        return this.getAccounts()
                   .map((accounts: AccountViewModel[]) => {
                       return accounts.some((avm) => avm.contracts.some((c) => (c.regionId || '').toLowerCase() === (regionId || '').toLowerCase()));
                   });
    }

    public hasContractPayOnTimeDiscount(accounts: AccountViewModel[]): boolean {
        return accounts.some((account) => account.contracts.some((contract) => contract.hasPayOnTimeDiscount));
    }

    private publishAccountsData(): void {

        if (this._publishAccountsInProgress || this._publishAccountsHaveData) {
            return;
        }

        this._publishAccountsInProgress = true;

        console.time(`startupForkJoin`);
        console.time(`accountsLoaded`);

        Observable.forkJoin(
            this._api.getDashboard(),
            this._api.getAccounts(),
            this._api.getBills(),
            this._api.getPendingPayments(),
            this._api.getPayments(),
            this._featureFlagService.getFeatureFlags([FeatureFlagTypes.billSmoothingEnabled, FeatureFlagTypes.paymentAssistanceEnabled]),
        ).subscribe(
            ([
                contractDetailsApiModel,
                accountsApiModel,
                billsApiModel,
                pendingPaymentsApiModel,
                paymentsApiModel,
                featureFlags
            ]) => {
                console.timeEnd(`bootstrapping-to-syncfinished`);
                console.timeEnd(`startupForkJoin`);
                const billSmoothingEnabled: boolean = featureFlags.get(FeatureFlagTypes.billSmoothingEnabled);
                const instalmentPlanEnabled: boolean = featureFlags.get(FeatureFlagTypes.paymentAssistanceEnabled);

                this.getDirectDebitContracts().subscribe((directDebitContracts) => {
                    const billSmoothingRequest = this.getBillSmoothingRequest(billSmoothingEnabled, accountsApiModel);
                    const instalmentPlansRequest = this.getInstalmentPlansRequest(instalmentPlanEnabled, accountsApiModel);

                    Observable.forkJoin(
                        billSmoothingRequest,
                        instalmentPlansRequest
                    ).subscribe(([billSmoothingAccounts, instalmentPlans]) => {
                        let accounts = this.buildAccountsViewModel(
                            accountsApiModel,
                            contractDetailsApiModel,
                            billsApiModel,
                            pendingPaymentsApiModel,
                            paymentsApiModel,
                            billSmoothingAccounts,
                            [].concat(...instalmentPlans),
                            directDebitContracts,
                        );

                        this.productAttributesService.processContractProductAttributes(accounts);

                        this.addRedlineToContracts(accounts)
                            .subscribe(
                                (hasAddedRedline) => {
                                    this.populatePayg(accounts);
                                }
                            );
                    },
                    (error) => {
                        this._logger.log(`Error forking BillSmoothing api calls in AccountService`, LogType.ERROR, error);
                    });
                });
            },
            (error) => {
                this._logger.log(`Error forking WebApi calls in AccountService`, LogType.ERROR, error);
                this._publishAccountsHaveData = false;
                this._publishAccountsInProgress = false;
            });
    }

    private getInstalmentPlansRequest = (instalmentPlanEnabled: boolean, accountsApiModel: api.AccountApiModel[]) => {
        return Observable.forkJoin(this.getInstalmentPlans(instalmentPlanEnabled, accountsApiModel));
    }

    private getInstalmentPlans(instalmentPlanEnabled: boolean, accountsApiModel: api.AccountApiModel[]): Array<Observable<ContractInstalmentPlan[]>> {
        let instalmentPlanRequest: Array<Observable<ContractInstalmentPlan[]>> = [Observable.of(new Array<ContractInstalmentPlan>())];
        if (instalmentPlanEnabled) {
            instalmentPlanRequest = accountsApiModel
                .map((account) => this.instalmentPlanService.getInstalmentPlans(account.number));
        }
        return instalmentPlanRequest;
    }

    private getBillSmoothingRequest = (billSmoothingEnabled: boolean, accountsApiModel: api.AccountApiModel[]) =>
        Observable.forkJoin(this.getBillSmoothing(billSmoothingEnabled, accountsApiModel))

    private getBillSmoothing(billSmoothingEnabled: boolean, accountsApiModel: api.AccountApiModel[]) {
        let billSmoothingRequest: Array<Observable<any>> = [Observable.of({})];
        if (billSmoothingEnabled) {
            billSmoothingRequest = accountsApiModel.map((account) =>
                                   this._api.getBillSmoothingContracts(account.number));
        }
        return billSmoothingRequest;
    }

    private getDirectDebitContracts(): Observable<string[]> {
        let directDebitContractAccounts: string[] = [];
        return new Observable((observer: Subscriber<string[]>) => {
            this.paymentMethodService.getPaymentMethods()
                .subscribe((paymentMethods) => {
                        paymentMethods.forEach((pm) => {
                            pm.directDebitContractAccounts.forEach((directDebitContract) => {
                                directDebitContractAccounts.push(directDebitContract.toString());
                            });
                        });
                        observer.next(directDebitContractAccounts);
                        observer.complete();
                    },
                    (error) => {
                        observer.error(error);
                        console.error('An error occurred retrieving direct debit contracts', error);
                    });
        });
    }

    private addRedlineToContracts(accounts: AccountViewModel[]): Observable<boolean> {

        let contractWithRedlineBillRequests = this._contractWithRedlineBills.map((contractWithRedlineBill) => {
            return this._redLine.getBillsForContract(contractWithRedlineBill.contractNumber);
        });

        return new Observable((observer: Subscriber<boolean>) => {
            Observable
                .forkJoin(contractWithRedlineBillRequests)
                .finally(() => {
                    observer.next(true);
                    observer.complete();
                    this._api.accountLoadedStatus.next('Loaded');
                    this._api.accountLoadedStatus.complete();
                })
                .subscribe(
                    (arrayOfPrintDocMappings: PrintDocMappings[][]) => {
                        let printDocMappings: PrintDocMappings[] = flatten(arrayOfPrintDocMappings);
                        this._contractWithRedlineBills.forEach((contractWithRedlineBill) => {
                            let accountToBeUpdated = accounts.find((account) => account.accountNumber === contractWithRedlineBill.accountNumber);
                            let contractToBeUpdated = accountToBeUpdated.contracts.find((contract) => contract.contractNumber === contractWithRedlineBill.contractNumber);

                            contractToBeUpdated.bills.forEach((bill) => {
                                let printDocMappingForThisBill = printDocMappings.find((printDocMapping) => printDocMapping.SapPrintDoc === bill.sapPrintDoc);
                                if (printDocMappingForThisBill) {
                                    bill.fxPrintDoc = printDocMappingForThisBill.FxPrintDoc;
                                }
                            });
                        });
                    },
                    (error) => {
                        this._logger.log(`Error forking RedLine api calls in AccountService`, LogType.ERROR, error);
                    }
                );
        }
        );
    }

    private populatePayg(accounts: AccountViewModel[]) {
        // check if there are payg details before we add accounts list to subject
        this._paygAccountService.getPaygDetails(accounts)
            .subscribe(
                (result) => {
                    console.timeEnd(`accountsLoaded`);
                    this.accountsSubject.next(accounts);
                    this._publishAccountsHaveData = true;
                    this._publishAccountsInProgress = false;
                }
            );

    }

    /**
     * Merges and transforms account, contract and billing data from the API into the view model.
     */
    private buildAccountsViewModel(
        apiAccounts: api.AccountApiModel[],
        apiContractDetails: api.ContractDetailApiModel[],
        apiBillsModel: api.BillHistoryApiModel[],
        apiPendingPaymentsModel: api.PendingPaymentApiModel[],
        apiPaymentsModel: api.PaymentApiModel[],
        billSmoothingAccounts: api.BillSmoothingApiModel[],
        instalmentPlans: ContractInstalmentPlan[],
        directDebitContractAccounts: string[]
    ): AccountViewModel[] {

        let accountNumbers = [];
        this._contractWithRedlineBills = [];
        let accounts: AccountViewModel[] = apiAccounts.map((apiAccount) => {

            let account = new AccountViewModel(apiAccount.number);
            accountNumbers.push(apiAccount.number);

            account.firstName = apiAccount.firstName;
            account.lastName = apiAccount.lastName;
            account.allContractsAreNewConnection = apiAccount.contracts.every((apiContract) => apiContract.inFlight);
            account.hasContractInWA = apiAccount.contracts.some((apiContract) => apiContract.regionId === 'WA');
            let billSmoothingAccount = billSmoothingAccounts.find(
                (billSmoothing) => billSmoothing
                    ? billSmoothing.contractAccountNumber === Number(apiAccount.number)
                    : null
            );
            account.contracts = this.buildAllContractViewModels(
                                apiAccount.number,
                                apiAccount.contracts, apiBillsModel, apiContractDetails,
                                apiPendingPaymentsModel, apiPaymentsModel, billSmoothingAccount, instalmentPlans, directDebitContractAccounts);

            let orderByActiveContractsFirst = orderBy(account.contracts, ['isRestricted', 'fuelType'], ['false', 'Electricity']);
            account.contracts = orderByActiveContractsFirst;

            return account;
        });

        this._api.accountNumber = accountNumbers;

        this.groupAddresses(accounts);

        let orderByActiveAccountsFirst = orderBy(accounts, ['allContractsAreRestricted'], ['asc']);

        return orderByActiveAccountsFirst;
    }

    private buildAllContractViewModels(
        accountNumber: string,
        apiContracts: api.ContractApiModel[],
        apiBillsModel: api.BillHistoryApiModel[],
        apiContractDetails: api.ContractDetailApiModel[],
        apiPendingPaymentsModel: api.PendingPaymentApiModel[],
        apiPaymentsModel: api.PaymentApiModel[],
        billSmoothingAccount: api.BillSmoothingApiModel,
        instalmentPlans: ContractInstalmentPlan[],
        directDebitContractAccounts: string[]): ContractViewModel[] {

        let contracts: ContractViewModel[] = apiContracts.map((apiContract) => {
            let apiContractDetail = apiContractDetails.find((cd) =>
                cd.account === accountNumber &&
                cd.contract === apiContract.number);

            let apiBillsDetail = apiBillsModel.find((bd) =>
                bd.account === accountNumber &&
                bd.contract === apiContract.number);

            let apiPendingPayment = apiPendingPaymentsModel.find((p) =>
                p.contractNumber === apiContract.number);

            let apiPayment = apiPaymentsModel.find((p) =>
                p.account === accountNumber &&
                p.contract === apiContract.number);

            let paymentScheme = billSmoothingAccount
                ? billSmoothingAccount.paymentSchemes.find((ps) => ps.contractNumber === Number(apiContract.number))
                : null;

            const instalmentPlan = this.getInstalmentPlan(instalmentPlans, +accountNumber, +apiContract.number);

            let accountBills = this.buildBillViewModels(apiBillsDetail, apiContract.number, accountNumber);

            return this.buildContractViewModel(accountNumber, apiContract, accountBills, apiContractDetail, apiPendingPayment, apiPayment, paymentScheme, instalmentPlan,  directDebitContractAccounts);
        });

        return contracts;
    }

    private buildContractViewModel(
        accountNumber: string,
        apiContract: api.ContractApiModel,
        accountBills: BillViewModel[],
        apiContractDetail: api.ContractDetailApiModel,
        apiPendingPayment: api.PendingPaymentApiModel,
        apiPayment: api.PaymentApiModel,
        paymentScheme: api.BillSmoothingApiSchemeModel,
        instalmentPlan: InstalmentPlan,
        directDebitContractAccounts: string[]): ContractViewModel {

        let contract = new ContractViewModel(apiContract.number, accountBills);
        contract.accountNumber = accountNumber;
        contract.planName = apiContract.planName;
        contract.isInFlight = apiContract.inFlight;
        contract.isRestricted = apiContract.isRestricted;
        contract.addressRaw = apiContract.address;
        contract.address = this.formatAddress(apiContract.address);
        contract.hasSolar = apiContract.hasSolar;
        contract.solarCheckRegistered = apiContract.solarCheckRegistered;
        contract.fuelType = apiContract.fuelType;
        contract.hasElectricVehicle = apiContract.hasElectricVehicle;
        contract.productId = apiContract.productId !== null && apiContract.productId !== undefined ? apiContract.productId : null;
        contract.regionId = apiContract.regionId !== null && apiContract.regionId !== undefined ? apiContract.regionId : null;
        contract.unitMeasurement = apiContract.regionId === 'WA' ? 'Units' : 'MJ';
        contract.isBillSmoothingV2 = false;

        if (apiContractDetail) {
            contract.isSmartMeter = apiContractDetail.isSmartMeter;
            contract.costToDate = apiContractDetail.costToDate;
            contract.projectedBill = apiContractDetail.projectedBill;
            contract.usageCostThisWeek = apiContractDetail.usageCostThisWeek;
            contract.usageCostLastWeek = apiContractDetail.usageCostLastWeek;
            contract.currentBillStartDate = apiContractDetail.currentBillStartDate;
            contract.currentBillEndDate = apiContractDetail.currentBillEndDate;
            contract.balance = apiContractDetail.balance;
            contract.accountNumber = apiContractDetail.account;
            contract.estimatedReads = apiContractDetail.estimatedReads;
        }

        if (apiPendingPayment) {
            contract.pendingPaymentDate = apiPendingPayment.paymentDateTime;
            contract.pendingPaymentAmount = apiPendingPayment.amount;
        }

        if (apiPayment) {
            contract.isBillSmoothing = apiPayment.billSmoothing;
            contract.paymentOverdue = apiPayment.overdue;
            contract.paymentTotal = apiPayment.totalPayment;
            contract.currentBalance = apiPayment.currentBalance;
            contract.payOnTimeDiscountAmount = apiPayment.payOnTimeDiscount;
            // api will not contain a value for currentBalanceExcludingPOTDAmount if it cannot be calculated (so undefined is expected)
            contract.currentBalanceExcludingPOTDAmount = apiPayment.currentBalanceExcludingPayOnTimeDiscount === undefined ? null : apiPayment.currentBalanceExcludingPayOnTimeDiscount;
            if (apiPayment.dueDate) {
                contract.dueDate = moment(apiPayment.dueDate, 'DD/MM/YYYY').toDate();
            }
            if (apiPayment.extendedDueDate) {
                contract.extendedDueDate = moment(apiPayment.extendedDueDate, 'DD/MM/YYYY').toDate();
            }
        }

        if (directDebitContractAccounts.length != null) {
            contract.isDirectDebit = directDebitContractAccounts.some((item) => item === contract.accountNumber);
        }

        if (paymentScheme) {
            contract.isBillSmoothingV2 = true;
            contract.paymentScheme = paymentScheme;
        }

        if (instalmentPlan) {
            const instalmentPlanBilling = this.instalmentPlanService.getBilling(instalmentPlan.instalments);
            const progressTracker = this.instalmentPlanService.prepareInstalmentProgressTracker(instalmentPlan);
            contract.instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);
        }

        return contract;
    }

    private buildBillViewModels(apiBillsDetail: api.BillHistoryApiModel, contractNumber: string, accountNumber: string): BillViewModel[] {
        let accountBills = new Array<BillViewModel>();

        if (apiBillsDetail) {
            let hasBills = new DefinitionCheckPipe().transform(apiBillsDetail);

            if (hasBills && apiBillsDetail.bills) {
                accountBills = apiBillsDetail.bills.map((b) => {
                    return {
                        newCharges: b.newCharges,
                        totalDue: b.totalDue,
                        issuedDate: b.billIssued,
                        dueDate: b.dueDate,
                        isInCredit: b.isInCredit,
                        isOverdue: b.isOverdue,
                        billStatus: b.billStatus,
                        sapPrintDoc: b.printDoc,
                        fxPrintDoc: null,
                        startDate: b.startDate,
                        endDate: b.endDate
                    };
                });
                if (accountBills && accountBills.length > 0) {
                    this._contractWithRedlineBills.push({
                        accountNumber: accountNumber,
                        contractNumber: contractNumber
                    });
                }
            }
        }

        return accountBills;
    }

    /**
     * Groups matching contract addresses
     * @param {AccountViewModel[]} accounts
     */
    private groupAddresses(accounts: AccountViewModel[]): void {
        for (let account of accounts) {
            if (account.contracts.length > 1) {
                let firstAddress = account.contracts[0].address;
                let allAddressesMatch = account.contracts.every((contract, index, arr) => {
                    return index === 0 || contract.address === firstAddress;
                });
                if (allAddressesMatch) {
                    account.groupedAddress = firstAddress;
                    account.contracts.forEach((c) => { c.address = null; });
                }
            }
        }
    }

    private getInstalmentPlan(instalmentPlans: ContractInstalmentPlan[], contractAccountNumber: number, contractNumber: number): InstalmentPlan {
        const instalmentPlanContract = instalmentPlans
            ? instalmentPlans.find((instalmentPlan) => instalmentPlan.contractAccountNumber === contractAccountNumber && instalmentPlan.contractNumber === contractNumber)
            : undefined;

        return instalmentPlanContract ? instalmentPlanContract.instalmentPlan : undefined;
    }
}

export class AccountOwnerModel {

    public get fullName(): string {
        return this.firstName.trim() + ' ' + this.lastName.trim();
    }

    constructor(public firstName?: string, public lastName?: string) {
        this.firstName = firstName || 'My Profile';
        this.lastName = lastName || 'My Profile';
    }
}

export class AccountViewModel {
    public accountNumber: string;
    public groupedAddress: string;  // only populated if the account has more than 1 contract, and all of the addresses on the contracts are identical
    public get allContractsAreRestricted(): boolean {
        return this.contracts.every((c) => c.isRestricted);
    }
    public allContractsInflight?(): boolean {
        return this.contracts.every((c) => c.isInFlight);
    }

    public allContractsAreNewConnection: boolean;
    public contracts: ContractViewModel[];

    /** Note this is a `registration name` - it may not match the `business partner name` as it comes from a different table in SAP  */
    public firstName: string;
    /** Note this is a `registration name` - it may not match the `business partner name` as it comes from a different table in SAP  */
    public lastName: string;

    public hasContractInWA: boolean;

    constructor(accountNumber: string, contracts?: ContractViewModel[]) {
        this.accountNumber = accountNumber;
        this.contracts = contracts ? contracts : new Array<ContractViewModel>();
    }
}

export class ContractViewModel {
    public accountNumber: string;
    public contractNumber: string;
    public address: string;
    public addressRaw: string;
    public fuelType: string;
    public isSmartMeter: boolean;
    public bills: BillViewModel[];
    public costToDate: number;
    public projectedBill: number;
    public usageCostThisWeek: number;
    public usageCostLastWeek: number;
    public currentBillStartDate: Date;
    public currentBillEndDate: Date;
    public pendingPaymentDate: Date;
    public pendingPaymentAmount: number;
    /** older version of bill smoothing that is only managed via SAP (not in My Account) */
    public isBillSmoothing: boolean;
    /** version of bill smoothing that can be managed in My Account */
    public isBillSmoothingV2: boolean;
    public isDirectDebit: boolean;
    /** The overdue balance excluding the currently issued bill (see currentBalance) */
    public paymentOverdue: number;
    public paymentTotal: number;
    /** The balance of the currently issued bill (including all discounts), minus any payments that have been made (after the due date see paymentOverdue) */
    public currentBalance: number;
    /** The balance of the currently issued bill excluding any additional pay on time discount, minus any payments that have been made */
    public currentBalanceExcludingPOTDAmount: number;
    /**
     * SAP is only pushing the new potd values as new bills are issued to customers.
     * After that time all the data should be populated, however there are several SAP quirks that mean that it may never be pushed (or calculated) correctly.
     */
    public get isCurrentBalanceExcludingPOTDAmountValid(): boolean {
        // never valid when currentBalanceExcludingPOTDAmount is null
        // not all the scenarios have be fleshed out when the account is in credit so exclude them too
        const accountIsInCredit = (this.currentBalance || 0) < 0;
        return this.currentBalanceExcludingPOTDAmount !== null && !accountIsInCredit;
    }
    public balance: number;
    public planName: string;
    public isInFlight: boolean;
    public isRestricted: boolean;
    public hasElectricVehicle: boolean;
    public hasSolar: boolean;
    public solarCheckRegistered: boolean;
    public isPayg: boolean;
    public paygBand: PrePaymentBalanceTopUpUrgency;
    public paygBalance: number;
    public paygPrepaymentEligibile: string;
    public isProductSwap: boolean;
    public outstandingBill: number;
    public showOutstandingBillPayg: boolean;
    public prepaidCharges: number;
    public productId: string;
    public regionId: string;
    public estimatedReads: boolean;
    public unitMeasurement: string;
    public paymentScheme: PaymentSchemeDisplayModel;
    public addressFormatted: string;
    public dueDate: Date;
    public extendedDueDate?: Date;
    public isEligibleForPaymentExtension?: boolean;
    public prepaidCredit: boolean;
    /** Is the contract for a product that has a pay on time discount */
    public hasPayOnTimeDiscount?: boolean;
    public isMandatoryEBilling?: boolean;
    public isMandatoryDirectDebit?: boolean;
    /** The amount that has been deducted from the currentBalance if paid before the due date */
    public payOnTimeDiscountAmount: number;
    public instalmentPlan?: InstalmentPlanData;

    constructor(contractNumber?: string, bills?: BillViewModel[]) {
        this.contractNumber = contractNumber;
        this.bills = bills ? bills : new Array<BillViewModel>();
        this.addressFormatted = formatRawAddress(this.addressRaw);
    }

    get isSolarElec(): boolean {
        return this.hasSolar && this.isElectricity;
    }

    get isElectricity(): boolean {
        return this.fuelType && this.fuelType.toLowerCase().slice(0, 4) === 'elec';
    }

    get isSolar(): boolean {
        return this.hasSolar;
    }

    get isGas(): boolean {
        return this.fuelType && this.fuelType.toLowerCase() === 'gas';
    }

    get hasBillHistory(): boolean {
        return (this.bills ? true : false) && this.bills.length > 0;
    }

    get isDataAvailable(): boolean {
        return (!this.isInFlight && this.hasBillHistory);
    }

    get currentBillDaysUntilDue(): number {
        let today = moment().startOf('day');
        let billEndDate = moment(this.currentBillEndDate).startOf('day');
        return billEndDate.diff(today, 'days');
    }

    public getNewestBill(): BillViewModel {
        if (!this.bills || this.bills.length === 0) { return null; }
        return this.bills.sort((d1, d2) =>
            new Date(d2.issuedDate.toString()).valueOf() - new Date(d1.issuedDate.toString()).valueOf())[0];
    }

    get hasAnyBillSmoothing(): boolean {
        return (this.isBillSmoothing || this.isBillSmoothingV2);
    }

    public getInstalmentPlan(): InstalmentPlanModel {
        if (this.instalmentPlan && this.instalmentPlan.billing) {
            return new InstalmentPlanModel(this.instalmentPlan.billing, this.isDirectDebit);
        }

        return undefined;
    }
}

export class BillViewModel {
    public sapPrintDoc: string;
    public fxPrintDoc: string;

    constructor(
        public newCharges: number,
        public totalDue: number,
        public issuedDate: Date,
        public dueDate: Date,
        public isInCredit: boolean,
        public isOverdue: boolean,
        public billStatus: string,
        public startDate: Date,
        public endDate: Date) {
    }
}

interface ContractWithRedlineBill {
    accountNumber: string;
    contractNumber: string;
}
