import { Component, OnInit } from '@angular/core';

import { Response } from 'express';
import { Observable } from 'rxjs/Observable';

import { EBillingComponentModel } from './emailBilling/eBillingComponentModel';
import { BillDeliveryContactDetailModel } from './../../../services/settings/model/billDeliveryContactDetailModel';
import { FeatureFlagService } from '../../../services/featureFlag.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { EnergyInsightsService } from '../../../services/energyInsights.service';
import { FeatureFlagTypes } from '../../../services/featureFlag.constants';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../services/account.service';
import { ContractEnergyInsightsModel } from '../../../services/settings/model/contractEnergyInsightsModel';
import { BillDeliveryMethod, BillDelivery } from '../../../services/settings/model';
import { FlashMessageType } from '../../../maui/flashMessage';
import { ISettingsService } from '../../../services/settings/settings.service.interface';
import { EmailBillingComponentModel } from '../billing/emailBilling/emailBillingComponentModel';
import { ManageEnergyInsightsComponentModel } from './manageEnergyInsights/manageEnergyInsightsComponentModel';

@Component({
    selector: 'agl-settings-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./_notifications.component.scss']
})

export class NotificationsComponent implements OnInit {

    private isEbillLoading: boolean = true;
    private isAccountValidForEnergyInsights: boolean = true;
    public isEnergyInsightsEnabled: boolean = false;

    public preferencesUrl: string;
    public paperlessBillingUrl: string;
    public FlashMessageType = FlashMessageType;
    public accountList: AccountViewModel[];
    public energyInsightsEligibility: ManageEnergyInsightsComponentModel[] = [];
    public isEnergyInsightsApiError: boolean = false;
    public eBillingComponentModels: EBillingComponentModel[] = [];
    public isEbillApiError: boolean = false;
    public isEbillEnabled: boolean = false;
    public isPageLoading: boolean = true;
    public isEnergyInsightsEligible: boolean = false;
    public isEnergyInsightsRefreshing: boolean = false;
    public hasInflightAccount: boolean = false;

    constructor(
        private configService: ConfigService,
        private accountService: IAccountServiceMA,
        private featureFlagService: FeatureFlagService,
        private energyInsightsService: EnergyInsightsService,
        private iSettingsService: ISettingsService,
    ) {
        this.preferencesUrl = `${this.configService.current.aglSiteCoreWebsiteBaseUrl}/aeo/Home/MyAccount/Update-Details/PreferencesPage`;
        this.paperlessBillingUrl = `${this.configService.current.aglSiteCoreWebsiteBaseUrl}/aeo/myaccount/paperless-billing`;
    }

    public ngOnInit(): void {
        this.accountService.getAccounts()
            .subscribe(
                (accountList: AccountViewModel[]) => {
                    this.accountList = accountList.filter((acc) => !acc.allContractsAreRestricted);

                    this.hasInflightAccount = accountList.some((acc) => acc.allContractsInflight());

                    Observable.forkJoin(
                        this.featureFlagService.featureFlagged(FeatureFlagTypes.ebillEnabled),
                        this.featureFlagService.featureFlagged(FeatureFlagTypes.energyInsightsEnabled),

                        this.iSettingsService.getBillDeliveryMethodPreferences()
                            .catch((error) => {
                                this.isEbillApiError = true;
                                return Observable.of([new BillDeliveryContactDetailModel()]);
                            }),

                        this.energyInsightsService.getContractDetailsAndEligibility()
                            .catch((error) => {
                                this.isEnergyInsightsApiError = true;
                                return Observable.of([new ContractEnergyInsightsModel()]);
                            })

                    )
                    .finally(() => {
                        this.isPageLoading = false;
                    })
                    .subscribe(
                        ([eBillFeatureFlag, energyInsightsFeatureFlag, billDeliveryPreferenceList, energyInsightsEligibilityList]) => {
                            this.isEbillEnabled = eBillFeatureFlag;
                            this.isEnergyInsightsEnabled = energyInsightsFeatureFlag;
                            this.isAccountValidForEnergyInsights = this.energyInsightsService.verifySingleAccountDetails(accountList) && energyInsightsFeatureFlag;

                            this.buildEmailBillingDataModel(accountList, billDeliveryPreferenceList);
                            this.buildEnergyInsightsDataModel(energyInsightsEligibilityList);
                        }
                    );
                }
            );
    }

    public showEnergyInsights(): boolean {
        return this.isEnergyInsightsEnabled
        && this.energyInsightsEligibility.length > 0
        && !this.isEnergyInsightsRefreshing;
    }

    public getAccountAddresses(account: AccountViewModel): string[] {
        let accountAddresses = [];
        if (!!account.groupedAddress) {
            accountAddresses = [account.groupedAddress];
        } else {
            account.contracts.forEach((contract) => {
                if (!contract.isRestricted) {
                    accountAddresses.push(contract.address);
                }
            });
        }
        return accountAddresses;
    }

    public accountHasGas(account: AccountViewModel): boolean {
        return account.contracts.some((contract) => contract.isGas);
    }

    public accountHasElectricity(account: AccountViewModel): boolean {
        return account.contracts.some((contract) => contract.isElectricity);
    }

    public eBillingSelectionChanged(): void {
        this.isEnergyInsightsRefreshing = true;
        this.energyInsightsService.getContractDetailsAndEligibility()
            .catch((error) => {
                this.isEnergyInsightsApiError = true;
                return Observable.of([new ContractEnergyInsightsModel()]);
            })
            .finally(() => {
                this.isEnergyInsightsRefreshing = false;
            })
            .subscribe((energyInsightsEligibilityList) => {
                this.buildEnergyInsightsDataModel(energyInsightsEligibilityList);
            });
    }

    private buildEmailBillingDataModel(accountsList: AccountViewModel[], billDeliveryPreferenceList: BillDeliveryContactDetailModel[]): void {
        if (this.isEbillApiError || !billDeliveryPreferenceList.length || !accountsList.length) {
            return;
        }

        accountsList.forEach((account: AccountViewModel) => {
            let billDeliveryContactDetail: BillDeliveryContactDetailModel = billDeliveryPreferenceList.find(
                (billDelivery: BillDeliveryContactDetailModel) => billDelivery.accountNumber === account.accountNumber);

            this.eBillingComponentModels.push(new EBillingComponentModel(billDeliveryContactDetail, account));
        });
    }

    private buildEnergyInsightsDataModel(energyInsightsEligibilityList: ContractEnergyInsightsModel[]): void {
        if (this.isEnergyInsightsApiError) {
            return;
        }

        // include ineligible electricity contracts in the Energy Insights list for the ineligibility reason for Phase 2
        this.energyInsightsEligibility = energyInsightsEligibilityList
            .filter((energyInsightsEligibility: ContractEnergyInsightsModel) => energyInsightsEligibility.contract.isElectricity)
            .map((energyInsightsEligibility: ContractEnergyInsightsModel) => {
                return new ManageEnergyInsightsComponentModel(energyInsightsEligibility);
        });
    }
}
