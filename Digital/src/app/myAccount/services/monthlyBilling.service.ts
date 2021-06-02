import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { BillFrequencyModel } from '../../shared/model/domain/billFrequency.model';
import { AccountViewModel, IAccountServiceMA } from './account.service';
import { AccountMonthlyBillingModel } from './settings/model/accountMonthlyBillingModel';
import { BillDateOption } from './settings/model/billDateOption';
import { BillingFrequency } from './settings/model/billingFrequency';
import { CancelMonthlyBillingResponse } from './settings/model/cancelMonthlyBillingResponse';
import { ContractMonthlyBillingModel } from './settings/model/contractMonthlyBillingModel';
import { MonthlyBillingEntryPointRoutes, MonthlyBillingRoutes } from '../pages/settings/monthlyBilling/monthlyBillingRoutes.const';
import { ApiService, ContactDetailModel } from '../../shared/service/api.service';
import { AglValidators } from '../../shared/validators/aglValidators';
import { MonthlyBillingEligibility } from './settings/model/monthlyBillingEligibility';
import { SetupMonthlyBillingRequest } from './settings/model/setupMonthlyBillingRequest';
import { ISettingsApi } from './settings/settingsApi.service.interface';
import { BillingFrequencyType } from './settings/model/billingFrequencyType';

export enum MonthlyBillingSapCode {
    unknown,
    mandatory = <any> '080',
    mandatoryDueToPrepaid = <any> '086',
    prepaidNotBeforeStartDate = <any> '093',
    billSmoothingBasicMeter = <any> '123'
}
@Injectable()

export class MonthlyBillingService {
    public ELIGIBILITY_ERROR_MESSAGES: Map<string, string> = new Map(
        [
            // Placeholder for phase 2
            ['080', 'Monthly billing is mandatory for this plan.'],
            //  PAYG is not eligible for Monthly Billing Termination
            ['086', 'Monthly billing is required for this Electricity plan'],
            //  For PAYG customer, change in Monthly Billing is not allowed in this scenario
            ['093', 'Change in date is not allowed until product start date has been reached.'],
            //  For BS2.0 customers, only smart meter sites are eligible for Monthly Billing
            ['123', 'Bill Smoothing accounts with basic meters are not eligible for monthly billing.'],
        ]
    );

    public currentAccount: AccountViewModel;
    public billFrequency: BillFrequencyModel;
    public monthlyBillingReferrer: MonthlyBillingReferrer;
    public selectedMonthlyBillingContract: ContractMonthlyBillingModel;
    public selectedMonthlyBillingAccount: AccountMonthlyBillingModel;
    public dateModifiedContractNumber: string;
    public cancelledContractNumber: string;
    public billDateOptionList: BillDateOption[] = [];
    public eligibilityFailed: boolean;

    // ReplaySubject caches of items
    private billingFrequenciesMap: Map<string, ReplaySubject<BillingFrequency[]>>;
    private billingDateOptionsMap: Map<string, ReplaySubject<BillDateOption[]>>;
    private infoForAccountMap: Map<string, ReplaySubject<AccountMonthlyBillingModel>>;

    constructor(
        private settingsApi: ISettingsApi,
        private accountService: IAccountServiceMA,
        public apiService: ApiService,
    ) {
        if (!this.settingsApi) {
            throw new Error(`settingsApi was undefined`);
        }
        if (!this.accountService) {
            throw new Error(`accountService was undefined`);
        }
        this.billingFrequenciesMap = new Map<string, ReplaySubject<BillingFrequency[]>>();
        this.billingDateOptionsMap = new Map<string, ReplaySubject<BillDateOption[]>>();
        this.infoForAccountMap = new Map<string, ReplaySubject<AccountMonthlyBillingModel>>();
    }

    public isCustomerPredictedAsEligible(): Observable<boolean> {
        return this.accountService.getAccounts()
            .flatMap(
                (allAccounts: AccountViewModel[]) => {
                    let mbAccountRequests: Array<Observable<AccountMonthlyBillingModel>> = [];
                    for (let account of allAccounts) {
                        mbAccountRequests.push(this.getMonthlyBillingInfoForAccount(account));
                    }
                    return Observable.forkJoin(mbAccountRequests)
                        .map(
                            (results: AccountMonthlyBillingModel[]) => {
                                return results.some((x) => x.anyContractsPredictedAsEligibleForSetup);
                            }
                        );
                }
        );
    }

    /**
     * Checks whether there is any contract that is not in monthly billing frequency for the user.
     */
    public hasAnyNonMonthlyBillingContract(): Observable<boolean> {
         return this.accountService.getAccounts()
            .flatMap(
                (allAccounts: AccountViewModel[]) => {
                    let mbAccountRequests: Array<Observable<AccountMonthlyBillingModel>> = [];
                    for (let account of allAccounts) {
                        mbAccountRequests.push(this.getMonthlyBillingInfoForAccount(account));
                    }
                    return Observable.forkJoin(mbAccountRequests)
                        .map(
                            (results: AccountMonthlyBillingModel[]) => {
                                return results.some((x) => x.hasNonMonthlyBillingContract);
                            }
                        );
                }
        );
    }

    public getMonthlyBillingInfoWithEligibility(account: AccountViewModel): Observable<AccountMonthlyBillingModel> {
        return this.getMonthlyBillingInfoForAccount(account)
            .flatMap(
                (result: AccountMonthlyBillingModel) => {
                    return this.checkEligibility(account.accountNumber)
                        .map(
                            (eligilibities: MonthlyBillingEligibility[]) => {
                                for (let contractModel of result.contractMonthlyBillingModels) {

                                    // If the contract is already flagged as having incomplete data, then we can't allow the customer to set it up
                                    if (!contractModel.hasIncompleteData) {
                                        let thisContractNumber = contractModel.contract.contractNumber;
                                        let eligilibity = eligilibities.find(
                                            (x: MonthlyBillingEligibility) => {
                                                return x.contractNumber.toString() === thisContractNumber;
                                            });
                                        if (!eligilibity) {
                                            contractModel.hasIncompleteData = true;
                                            contractModel.setupPredicted = false;
                                            contractModel.cancelPredicted = false;
                                            contractModel.setup = {
                                                isEligible: false,
                                                reason: {
                                                    message: `Data mis-match: There was no monthly billing eligibility information for the contract ${thisContractNumber}`,
                                                    internal: null
                                                }
                                            };
                                            contractModel.cancellation = {
                                                isEligible: false,
                                                reason: {
                                                    message: `Data mis-match: There was no monthly billing eligibility information for the contract ${thisContractNumber}`,
                                                    internal: null
                                                }
                                            };
                                        } else {
                                            contractModel.setup = eligilibity.setup;
                                            contractModel.cancellation = eligilibity.cancellation;
                                            if (!contractModel.setup.isEligible) {
                                                contractModel.setup.reason.friendlyMessage = this.ELIGIBILITY_ERROR_MESSAGES.get(contractModel.setup.reason.internal.number);
                                            }
                                            if (!contractModel.cancellation.isEligible) {
                                                contractModel.cancellation.reason.friendlyMessage = this.ELIGIBILITY_ERROR_MESSAGES.get(contractModel.cancellation.reason.internal.number);
                                            }
                                        }
                                    }
                                }
                                return result;
                            }
                        );
                }
            );
    }

    public getMonthlyBillingInfoForAccount(account: AccountViewModel): Observable<AccountMonthlyBillingModel> {
        if (!account) {
            return Observable.throw(`getMonthlyBillingInfoForAccount(): No Account object was passed`);
        }
        if (!this.infoForAccountMap.has(account.accountNumber)) {
            let item = new ReplaySubject<AccountMonthlyBillingModel>(1);
            this.infoForAccountMap.set(account.accountNumber, item);
            this.getBillingFrequencies(account.accountNumber)
                .map(
                    (billingFrequencies: BillingFrequency[]) => {
                        let model: AccountMonthlyBillingModel = new AccountMonthlyBillingModel(account.accountNumber);
                        for (let contract of account.contracts) {
                            let contractModel: ContractMonthlyBillingModel = new ContractMonthlyBillingModel(contract);
                            let billFrequency = billingFrequencies.find((x) => x.contractNumber.toString() === contract.contractNumber);
                            if (!billFrequency) {
                                // Mark this contract as incomplete
                                contractModel.hasIncompleteData = true;
                                contractModel.setupPredicted = false;
                                contractModel.cancelPredicted = false;
                                contractModel.setup = {
                                    isEligible: false,
                                    reason: {
                                        message: `Data mis-match: There was no billing frequency information for the contract ${contract.contractNumber}`,
                                        internal: null
                                    }
                                };
                                contractModel.cancellation = {
                                    isEligible: false,
                                    reason: {
                                        message: `Data mis-match: There was no billing frequency information for the contract ${contract.contractNumber}`,
                                        internal: null
                                    }
                                };
                            } else {

                                if (account.hasContractInWA) {
                                    contractModel.setupPredicted = false;
                                    contractModel.cancelPredicted = false;
                                } else {
                                    contractModel.setupPredicted = true;
                                    contractModel.cancelPredicted = true;
                                }
                                contractModel.accountNumber = account.accountNumber;
                                contractModel.frequency = billFrequency.frequency;
                                contractModel.preferredDayOfMonth = billFrequency.preferredDayOfMonth;
                                model.contractMonthlyBillingModels.push(contractModel);
                            }
                        }
                        return model;
                    }
                )
                .subscribe(
                    (result: AccountMonthlyBillingModel) => {
                        item.next(result);
                    },
                    (error: any) => {
                        item.error(error);
                    }
                );
        }
        return this.infoForAccountMap.get(account.accountNumber).first();
    }

    public checkEligibility(contractAccountNumber: string): Observable<MonthlyBillingEligibility[]> {
        if (!contractAccountNumber) {
            return Observable.throw(`Contract Number was empty`);
        }
        if (isNaN(Number(contractAccountNumber))) {
            return Observable.throw(`Contract Number was not a valid number`);
        }
        return this.settingsApi
            .get<MonthlyBillingEligibility[]>(`/v2/contractAccounts/${contractAccountNumber}/monthlyBilling/eligibilities`);
    }

    public getBillingFrequencies(contractAccountNumber: string): Observable<BillingFrequency[]> {
        if (!contractAccountNumber) {
            return Observable.throw(`Contract Account Number was empty`);
        }
        if (isNaN(Number(contractAccountNumber))) {
            return Observable.throw(`Contract Account Number was not a valid number`);
        }
        if (!this.billingFrequenciesMap.has(contractAccountNumber)) {
            let item = new ReplaySubject<BillingFrequency[]>(1);
            this.billingFrequenciesMap.set(contractAccountNumber, item);
            this.settingsApi.get<BillingFrequency[]>(`/v2/contractAccounts/${contractAccountNumber}/billingFrequencies`)
                .subscribe(
                    (value: BillingFrequency[]) => {
                        item.next(value);
                    },
                    (error: any) => {
                        item.error(error);
                    }
                );
        }
        return this.billingFrequenciesMap.get(contractAccountNumber).first();
    }

    public getBillDateOptions(contractNumber: string): Observable<BillDateOption[]> {
        if (!contractNumber) {
            return Observable.throw(`Contract Number was empty`);
        }
        if (isNaN(Number(contractNumber))) {
            return Observable.throw(`Contract Number was not a valid number`);
        }
        if (!this.billingDateOptionsMap.has(contractNumber)) {
            let item = new ReplaySubject<BillDateOption[]>(1);
            this.billingDateOptionsMap.set(contractNumber, item);
            this.settingsApi.get<BillDateOption[]>(`/v2/contracts/${contractNumber}/monthlyBilling/billDateOptions`)
                .subscribe(
                    (value: BillDateOption[]) => {
                        item.next(value);
                    },
                    (error: any) => {
                        item.error(error);
                    }
                );
        }
        return this.billingDateOptionsMap.get(contractNumber).first();
    }

    public getOrdinal(num): string {
        let suffixes = ['th', 'st', 'nd', 'rd'];
        return num + (suffixes[(num - 20) % 10] || suffixes[num] || suffixes[0]);
    }

    public setupMonthlyBilling(contractNumber: string, preferredDayOfMonth: number): Observable<any> {
        if (!contractNumber) {
            return Observable.throw(`contractNumber was empty`);
        }
        if (isNaN(Number(contractNumber))) {
            return Observable.throw(`contractNumber was not a valid number`);
        }
        if (!preferredDayOfMonth) {
            return Observable.throw(`preferredDayOfMonth was empty`);
        }
        if (isNaN(preferredDayOfMonth)) {
            return Observable.throw(`preferredDayOfMonth was not a valid number`);
        }
        let requestModel: SetupMonthlyBillingRequest = new SetupMonthlyBillingRequest();
        requestModel.preferredDayOfMonth = preferredDayOfMonth;
        return this.settingsApi
            .post(`/v2/contracts/${contractNumber}/monthlyBilling`, requestModel);
    }

    public cancelMonthlyBilling(contractNumber: string): Observable<CancelMonthlyBillingResponse> {
        if (!contractNumber) {
            return Observable.throw(`Contract Number was empty`);
        }
        if (isNaN(Number(contractNumber))) {
            return Observable.throw(`Contract Number was not a valid number`);
        }
        return this.settingsApi
            .delete<CancelMonthlyBillingResponse>(`/v2/contracts/${contractNumber}/monthlyBilling`);
    }

    public getEntryPointUrl(): string {
        if (this.monthlyBillingReferrer === MonthlyBillingReferrer.Billing) {
            return MonthlyBillingEntryPointRoutes.Billing;
        } else if (this.monthlyBillingReferrer === MonthlyBillingReferrer.ManageAccount) {
            return MonthlyBillingEntryPointRoutes.ManageAccount;
        } else {
            return MonthlyBillingEntryPointRoutes.Overview;
        }
    }

    public isSingleAccountCustomer(): Observable<boolean> {
        return this.accountService.getAccounts()
            .flatMap(
                (accounts: AccountViewModel[]) => {
                    if (accounts.length === 1) {
                        this.currentAccount = accounts[0];
                        return this.getMonthlyBillingInfoWithEligibility(this.currentAccount).map(
                            (monthlyBillingAccountDetails: AccountMonthlyBillingModel ) => {

                                this.eligibilityFailed = false;
                                this.monthlyBillingReferrer = MonthlyBillingReferrer.DeepLink;
                                this.selectedMonthlyBillingAccount = monthlyBillingAccountDetails;
                                return true;
                            },
                            (err) => {
                                this.eligibilityFailed = true;
                                return false;
                            }
                        );
                    } else {
                        return Observable.of(false);
                    }
                }
            );
    }

    public hasValidMobileNumber(contactDetails: ContactDetailModel): void {
            if (contactDetails.businessPartners && contactDetails.businessPartners.length) {
                let mobileNumber = contactDetails.businessPartners[0].mobile;
                this.selectedMonthlyBillingAccount.hasValidMobileNumber = AglValidators.isMobileNumberValid(mobileNumber, false);
            } else {
                this.selectedMonthlyBillingAccount.hasValidMobileNumber = false;
            }
    }

    public createMessage(accountMonthlyBillingModel: AccountMonthlyBillingModel): string {
        let message: string = '';
        let contractsForConsideration = accountMonthlyBillingModel.contractMonthlyBillingModels;

        let activeContracts = contractsForConsideration.filter((contract) => !contract.contract.isRestricted);
        let restrictedContracts = contractsForConsideration.filter((contract) => contract.contract.isRestricted);

        // only allow active contracts to be considered for setup/manage monthly billing
        let monthlyBillingContracts = activeContracts.filter((contract) => contract.frequency === BillingFrequencyType.FlexibleMonthly);
        let nonMonthlyBillingContracts = activeContracts.filter((contract) => contract.frequency !== BillingFrequencyType.FlexibleMonthly);

        let sameFuelType = this.allContractsSameFuel(activeContracts);
        let isMultiContract = activeContracts.length > 2;

        if (sameFuelType || isMultiContract) {
            // generic handling of multi-contracts (3 and above) or same fuel type contracts (2 or above)
            message = this.createSameFuelMultiContractMessage(monthlyBillingContracts.length > 0, sameFuelType);
        } else {
            // Handling of 1 contract and dual fuel (2 contracts with different fuel types) contracts.
            if (monthlyBillingContracts.length > 0) {
                message = this.createMonthlyBillingMessage(monthlyBillingContracts, nonMonthlyBillingContracts.length > 0);
            }
            if (nonMonthlyBillingContracts.length > 0) {
                message += this.appendSetupMonthlyBillingMessage(nonMonthlyBillingContracts, monthlyBillingContracts.length > 0);
            }
        }

        if (restrictedContracts.length > 0) {
            message += this.appendRestrictedContractMessage(restrictedContracts);
        }

        return message;
    }

    private createSameFuelMultiContractMessage(hasMonthlyBilling: boolean, fuelType: string): string {
        let message: string = '';
        message = hasMonthlyBilling ? 'Manage the bill issue date' : 'Set up monthly billing';
        message += fuelType != null ? ` for your ${fuelType.toLowerCase()} bills.` : ' for your electricity and gas bills.';

        return message;
    }

    private createMonthlyBillingMessage(monthlyBillingContracts: ContractMonthlyBillingModel[], hasNonMonthlyBillingContracts: boolean): string {
        let message: string = '';

        if (monthlyBillingContracts.length === 1) {
            let contract = monthlyBillingContracts[0];
            let messageSuffix = hasNonMonthlyBillingContracts ? ' and ' : '.';

            message = `Your ${contract.contract.fuelType.toLowerCase()} bills are issued on the ${this.getOrdinal(contract.preferredDayOfMonth)} of every month`;
            message += messageSuffix;
        } else {
            let sameBillDay = this.bothContractsHaveSameBillDay(monthlyBillingContracts);
            let preferredDayOfMonth: string[] = [
                this.getOrdinal(monthlyBillingContracts[0].preferredDayOfMonth),
                this.getOrdinal(monthlyBillingContracts[1].preferredDayOfMonth)
            ];

            message = sameBillDay ? `Your electricity and gas bills are issued on the ${preferredDayOfMonth[0]} of each month.`
                : `Your ${monthlyBillingContracts[0].contract.fuelType.toLowerCase()} bills are issued on the ${preferredDayOfMonth[0]} of every month. Your ${monthlyBillingContracts[1].contract.fuelType.toLowerCase()} bills are issued on the ${preferredDayOfMonth[1]} of every month.`;
        }

        return message;
    }

    private appendSetupMonthlyBillingMessage(contracts: ContractMonthlyBillingModel[], hasMonthlyBilling: boolean): string {
        let message = '';

        if (contracts.length === 1) {
            let messagePrefix = hasMonthlyBilling ? 'your ' : 'Your ';
            message = messagePrefix + `${contracts[0].contract.fuelType.toLowerCase()} account is billed ${this.getFrequencyText(contracts[0].frequency)}.`;
        } else {
            let firstContract = contracts[0];
            let secondContract = contracts[1];
            message = `Your ${firstContract.contract.fuelType.toLowerCase()} account is billed ${this.getFrequencyText(firstContract.frequency)} and your ${secondContract.contract.fuelType.toLowerCase()} account is billed ${this.getFrequencyText(secondContract.frequency)}.`;
        }

        return message;
    }

    private appendRestrictedContractMessage(restrictedContracts: ContractMonthlyBillingModel[]): string {
        let message = '';

        if (restrictedContracts.length === 1) {
            message = ` One of your accounts is ineligible for monthly billing as it is inactive.`;
        } else {
            message = ` Some of your accounts are ineligible for monthly billing as they are inactive.`;
        }

        return message;
    }

    private getFrequencyText(frequency: BillingFrequencyType): string {
        if (frequency === BillingFrequencyType.BiMonthly) {
            return 'every two months';
        } else {
            return frequency.toString().toLowerCase();
        }
    }

    private bothContractsHaveSameBillDay(contractMBMs: ContractMonthlyBillingModel[]): boolean {
        return contractMBMs[0].preferredDayOfMonth === contractMBMs[1].preferredDayOfMonth;
    }

    private allContractsSameFuel(contractMBMs: ContractMonthlyBillingModel[]): string {
        if (!!contractMBMs.length) {
            if (contractMBMs.length === 1) {
                return null;
            }

            const firstContractFuelType = contractMBMs[0].contract.fuelType;
            let allSame: boolean = contractMBMs.every((contractMBM) => {
                return contractMBM.contract.fuelType === firstContractFuelType;
            });
            if (allSame) {
                return firstContractFuelType;
            }
        }
        return null;
    }
}
export enum MonthlyBillingReferrer {
    Billing = 'Billing',
    ManageAccount = 'ManageAccount',
    DeepLink = 'DeepLink'
}
