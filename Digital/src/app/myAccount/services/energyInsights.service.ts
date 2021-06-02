import { Injectable, EventEmitter } from '@angular/core';

import { Observable, Observer } from 'rxjs/Rx';

import { ISettingsApi } from './settings/settingsApi.service.interface';
import { IAccountServiceMA, AccountViewModel, ContractViewModel } from './account.service';
import { ApiService, SelfServiceReadingResponse, ContactDetailModel } from '../../shared/service/api.service';
import { SetupEnergyInsightsRequest } from './settings/model/setupEnergyInsightsRequest';
import * as ApiModel from '../../shared/model/api.model';
import { Guid } from '../../shared/utils/guid';
import { EnergyInsightsApiRepository } from '../repository/energyInsightsApi.repository';
import { ContractEnergyInsightsModel } from './settings/model/contractEnergyInsightsModel';
import { ManageEnergyInsightsComponentModel } from '../pages/settings/notifications/manageEnergyInsights/manageEnergyInsightsComponentModel';
import { EnergyInsightsUsage } from './settings/model/energyInsightsUsage';
import { UsageBreakdownBillPeriod } from './settings/model/usageBreakdownBillPeriod';
import { EnergyInsightsEligibilityAccount } from './settings/model/energyInsightsEligibilityAccount';
import { EnergyInsightsEligibilityContract } from './settings/model/energyInsightsEligibilityContract';
import { EnergyInsightsIneligibleReason } from '../pages/settings/energyInsights/energyInsightsIneligibleReason.enum';

@Injectable()

export class EnergyInsightsService {

    public selectedEnergyInsightsContract: ContractEnergyInsightsModel;
    public selectedAccount: AccountViewModel;
    public energyInsightsContracts: ContractEnergyInsightsModel[];
    public energyInsightsAccounts: string[];
    public isApiCallSuccess: boolean = false;
    public energyInsightsContractsPreSetup: ContractEnergyInsightsModel[];
    public energyInsightsContractsPostSetup: ContractEnergyInsightsModel[];
    public energyInsightsContractsIneligible: ContractEnergyInsightsModel[];
    public isValidAccount: boolean = false;
    public isMultiContractEnergyInsights: boolean = false;
    public isMultiAccountUser: boolean = false;
    public readonly energyInsightsDeeplink: string = `/d/energyinsights`;
    public energyInsightsEligibility: ManageEnergyInsightsComponentModel[] = [];
    public modelUpdated: EventEmitter<ManageEnergyInsightsComponentModel[]> = new EventEmitter<ManageEnergyInsightsComponentModel[]>();
    public selectedContract: ContractViewModel;
    public selectedBillStartDate: string;
    public selectedBillEndDate: string;
    public isEnergyInsightsDisagEnabled: boolean = false;

    private readonly internalCodeToEnumMap: ReadonlyMap<string, EnergyInsightsIneligibleReason> = new Map<string, EnergyInsightsIneligibleReason>(
        [
            [`022`, EnergyInsightsIneligibleReason.NotAvailableForAccount],
            [`023`, EnergyInsightsIneligibleReason.ServiceNotActive],
            [`024`, EnergyInsightsIneligibleReason.GasAccount],
            [`027`, EnergyInsightsIneligibleReason.BasicMeter],
            [`028`, EnergyInsightsIneligibleReason.ResidentialOnly],
            [`029`, EnergyInsightsIneligibleReason.InvalidPlan],
            [`030`, EnergyInsightsIneligibleReason.InvalidSmartMeter],
            [`032`, EnergyInsightsIneligibleReason.EBillingOff],
            [`033`, EnergyInsightsIneligibleReason.InvalidEmail],
            [`042`, EnergyInsightsIneligibleReason.UnsupportedArea],
        ]
    );
    private readonly energyInsightsIneligibleReasonMap: ReadonlyMap<EnergyInsightsIneligibleReason, string> = new Map<EnergyInsightsIneligibleReason, string>(
        [
            [EnergyInsightsIneligibleReason.NotAvailableForAccount, `Sorry, Energy Insights isn’t available for your account yet.`],
            [EnergyInsightsIneligibleReason.ServiceNotActive, `Your energy account isn’t active yet. Please check back soon.`],
            [EnergyInsightsIneligibleReason.GasAccount, `Sorry, Energy Insights isn’t available for gas accounts.`],
            [EnergyInsightsIneligibleReason.BasicMeter, `Sorry, Energy Insights is only available to customers with smart meters.`],
            [EnergyInsightsIneligibleReason.ResidentialOnly, `Sorry, Energy Insights isn’t compatible with your energy plan.`],
            [EnergyInsightsIneligibleReason.InvalidPlan, `Sorry, Energy Insights isn’t compatible with your energy plan.`],
            [EnergyInsightsIneligibleReason.InvalidSmartMeter, `Sorry, Energy Insights isn’t compatible with your smart meter.`],
            [EnergyInsightsIneligibleReason.EBillingOff, `You’ll need to register for eBilling before you can sign up for Energy Insights. Switch to eBilling above.`],
            [EnergyInsightsIneligibleReason.InvalidEmail, `Sorry, it looks like your email address is invalid. Please update your email before setting up Energy Insights.`],
            [EnergyInsightsIneligibleReason.UnsupportedArea, `Sorry, Energy Insights isn’t available in your state yet. We’re hard at work rolling it out across Australia, so please check back soon.`],
            [EnergyInsightsIneligibleReason.Unknown, `Energy Insights is currently not available. We’re busy working on an experience for you so please check back soon.`],
        ]
    );

    constructor(
        private apiService: ApiService,
        private energyInsightsApiRepository: EnergyInsightsApiRepository,
        private accountService: IAccountServiceMA,
    ) {
        if (!this.energyInsightsApiRepository) {
            throw new Error(`energyInsightsApiRepository was undefined`);
        }

    }

    public getUsageBreakdownForBilled(contractNumber: string, billStartDate: string, billEndDate: string, forceRefresh: boolean = false): Observable<EnergyInsightsUsage> {
        return this.energyInsightsApiRepository.getUsageBreakdownForBilled(contractNumber, billStartDate, billEndDate);
    }

    public setModel(energyInsightsEligibility: ManageEnergyInsightsComponentModel[]) {
        this.energyInsightsEligibility = energyInsightsEligibility;
        this.modelUpdated.emit(this.energyInsightsEligibility);
    }

    public getAccountStatus(accountNumber: string): Observable<EnergyInsightsEligibilityAccount> {
        if (!accountNumber) {
            return Observable.throw(`Contract Number was empty`);
        }
        if (isNaN(Number(accountNumber))) {
            return Observable.throw(`Contract Number was not a valid number`);
        }

        return this.energyInsightsApiRepository
            .getEligibilityAndSubscriptionStatus(accountNumber)
            .map((results: EnergyInsightsEligibilityContract[]) => {
                return new EnergyInsightsEligibilityAccount(accountNumber, results);
            });
    }

    public setupEnergyInsights(contractNumber: string, setupEnergyInsightsRequest: SetupEnergyInsightsRequest): Observable<void> {
        if (!contractNumber) {
            return Observable.throw(`contractNumber was empty`);
        }
        if (isNaN(Number(contractNumber))) {
            return Observable.throw(`contractNumber was not a valid number`);
        }
        if (setupEnergyInsightsRequest.subscribedToMidBillEnergyBreakdown === null && setupEnergyInsightsRequest.subscribedToEndBillEnergyBreakdown === null) {
            return Observable.throw(`at least one of Mid or End subscription must be provided`);
        }
        return this.energyInsightsApiRepository.setupEnergyInsights(contractNumber, setupEnergyInsightsRequest);
    }

    public getContractDetailsAndEligibility(): Observable<ContractEnergyInsightsModel[]> {

        return Observable.forkJoin(
            this.accountService.getAccounts(),
            this.apiService.getContactDetail()
        )
        .mergeMap(([accounts, contactDetails]) => {

            let contractEnergyInsightsList: ContractEnergyInsightsModel[] = [];
            let activeAccounts = accounts.filter((account: AccountViewModel) => {
                return !account.allContractsAreRestricted && !account.allContractsInflight();
            });

            const energyInsightsSubscriptions: Array<Observable<EnergyInsightsEligibilityAccount>> =
                activeAccounts.map((account: AccountViewModel) => {
                    return this.getAccountStatus(account.accountNumber)
                        .catch((error) => {
                            return Observable.of(new EnergyInsightsEligibilityAccount(account.accountNumber, []));
                        });
                });

            return Observable
                .forkJoin(energyInsightsSubscriptions)
                .map((accountEligibilityList: EnergyInsightsEligibilityAccount[]) => {
                    accountEligibilityList.forEach((accountEligibility: EnergyInsightsEligibilityAccount) => {
                        accountEligibility.contracts.forEach((contractEligibility: EnergyInsightsEligibilityContract) => {
                            // this will be NULL for contracts in the eligibility list that don't belong in an account (i.e. old, invalid contracts)
                            let contractEnergyInsightsModel = this.buildContractEnergyInsightsModel(contractEligibility, activeAccounts, contactDetails);
                            if (contractEnergyInsightsModel) {
                                contractEnergyInsightsList.push(contractEnergyInsightsModel);
                            }
                        });
                    });
                    return contractEnergyInsightsList;
                });
        });
    }

    public verifySingleAccountDetails(accounts: AccountViewModel[]): boolean {
        let validAccounts = accounts.filter((account) => !account.allContractsAreRestricted);

        if (validAccounts.length === 1) {
            let account: AccountViewModel = validAccounts[0];
            let numberOfElectricityContracts: number = account.contracts.filter((contract) => {
                return (contract.isElectricity && contract.isSmartMeter && !contract.isRestricted);
            }).length;
            if (numberOfElectricityContracts === 1) {
                this.selectedAccount = validAccounts[0];
                return true;
            }

            return numberOfElectricityContracts > 0;
        } else {
            return validAccounts.length > 0;
        }
    }

    public filterContracts(): void {
        this.energyInsightsContractsIneligible = this.energyInsightsContracts.filter((contract) => contract.energyInsightsEligibility.isEligible === false);
        let eligibleContracts = this.energyInsightsContracts.filter((contract) => contract.energyInsightsEligibility.isEligible);
        this.energyInsightsContractsPostSetup = eligibleContracts.filter((contract) => {
           return (contract.energyInsightsEligibility.subscribedToEndBillEnergyBreakdown === true ||
                    contract.energyInsightsEligibility.subscribedToMidBillEnergyBreakdown === true);
        });
        this.energyInsightsContractsPreSetup = eligibleContracts.filter((contract) => {
            return (contract.energyInsightsEligibility.subscribedToEndBillEnergyBreakdown === false &&
                        contract.energyInsightsEligibility.subscribedToMidBillEnergyBreakdown === false);
        });
    }

    public shouldDisplayBackButton(): boolean {
        let referrer = window.document.referrer;
        if (referrer.substr(-this.energyInsightsDeeplink.length) === this.energyInsightsDeeplink) {
            return false;
        }
        return true;
    }

    private buildContractEnergyInsightsModel(
        contractEligibility: EnergyInsightsEligibilityContract,
        accounts: AccountViewModel[],
        contactDetails: ContactDetailModel,
    ): ContractEnergyInsightsModel {
        let contractEnergyInsightsModel: ContractEnergyInsightsModel = new ContractEnergyInsightsModel();

        let energyInsightsAccount: AccountViewModel = accounts.find((account: AccountViewModel) => {
            return account.contracts.some((contract: ContractViewModel) => contract.contractNumber === contractEligibility.contractNumber.toString());
        });

        // energyInsightsAccount will be null for contracts that don't belong in an account (i.e. old, invalid contracts)
        if (energyInsightsAccount) {

            let energyInsightsContract: ContractViewModel = energyInsightsAccount.contracts.find((contract) => {
                return (contract.contractNumber === contractEligibility.contractNumber.toString());
            });

            if (contactDetails && contactDetails.businessPartners && contactDetails.businessPartners.length > 0) {
                let emailAddress = contactDetails.businessPartners[0].email;
                contractEnergyInsightsModel.email = emailAddress ? emailAddress.toLowerCase() : '';
            } else {
                contractEnergyInsightsModel.email = '';
            }

            contractEnergyInsightsModel.accountNumber = energyInsightsAccount.accountNumber;
            contractEnergyInsightsModel.address = energyInsightsContract.address === null ? energyInsightsAccount.groupedAddress : energyInsightsContract.address;
            contractEnergyInsightsModel.contract = energyInsightsContract;

            if (contractEligibility.ineligibleReason &&
                contractEligibility.ineligibleReason.internal &&
                contractEligibility.ineligibleReason.internal.number) {

                    if (this.internalCodeToEnumMap.has(contractEligibility.ineligibleReason.internal.number)) {
                        contractEligibility.reasonForIneligibility = this.internalCodeToEnumMap.get(contractEligibility.ineligibleReason.internal.number);
                    }

                    contractEligibility.ineligibilityMessage = this.energyInsightsIneligibleReasonMap.get(contractEligibility.reasonForIneligibility);

                }

            contractEnergyInsightsModel.energyInsightsEligibility = contractEligibility;

            return contractEnergyInsightsModel;
        }

        return null;
    }

    public hasPostSetupContracts(): boolean {
        return !!this.energyInsightsContractsPostSetup.length;
    }

    public hasPreSetupContracts(): boolean {
        return !!this.energyInsightsContractsPreSetup.length;
    }

    public hasIneligibleContracts(): boolean {
        return !!this.energyInsightsContractsIneligible.length;
    }

}
