import { Component, OnInit } from '@angular/core';

import { ConfigService } from '../../../shared/service/config.service';
import { DocumentService } from '../../../shared/service/document.service';
import { IAccountServiceMA, AccountViewModel } from '../../services/account.service';

import { FeatureFlagService, FeatureFlagTypes } from '../../services/featureFlag.service';
import { Observable } from 'rxjs/Observable';
import { ContractEnergyInsightsModel } from '../../services/settings/model/contractEnergyInsightsModel';
import { ManageEnergyInsightsComponentModel } from '../settings/notifications/manageEnergyInsights/manageEnergyInsightsComponentModel';
import { EnergyInsightsService } from '../../services/energyInsights.service';

@Component({
    selector: 'agl-account-bills',
    templateUrl: './bills.component.html',
    styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
    public accounts: any;
    public accountList: AccountViewModel[];

    public allContractsAreRestricted: boolean = true;

    public decisioningEnabled: boolean = false;
    public marketingTileEnabled: boolean = false;
    public isEnergyInsightsApiError: boolean = false;
    public isPageLoading: boolean = true;
    private isEnergyInsightsEnabled: boolean = false;

    private isAccountValidForEnergyInsights: boolean = true;
    public energyInsightsEligibility: ManageEnergyInsightsComponentModel[] = [];

    constructor(
        public accountsService: IAccountServiceMA,
        public configService: ConfigService,
        public dom: DocumentService,
        public energyInsightsService: EnergyInsightsService,
        public featureFlagService: FeatureFlagService,
    ) { }

    public isButtonStackReadOnly(): boolean {
        // If all contracts in all accounts are restricted
        // present buttonStack as read only.
        if (!this.accounts) { return true; }
        let restrictedAccountCount =
            this.accounts
                .map((account) => account.allContractsAreRestricted)
                .reduce((accumulator: number, allContractsAreRestrictedFlag: boolean) => {
                    return accumulator + (allContractsAreRestrictedFlag ? 1 : 0);
                }, 0);
        let result = (restrictedAccountCount > 0 && restrictedAccountCount === this.accounts.length);
        return result;
    }

    public ngOnInit() {
            this.accountsService.getAccounts()
            .subscribe(
                (accountList: AccountViewModel[]) => {
                    this.accounts = accountList;
                    this.accountList = accountList.filter((acc) => !acc.allContractsAreRestricted);
                    Observable.forkJoin(
                        this.featureFlagService.featureFlagValues([FeatureFlagTypes.energyInsightsEnabled, FeatureFlagTypes.energyInsightsDisaggregationEnabled]),
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
                        ([[energyInsightsFeatureFlag, energyInsightsDisagFlag], energyInsightsEligibilityList]) => {
                            if (energyInsightsFeatureFlag && energyInsightsDisagFlag) {
                                this.isEnergyInsightsEnabled = energyInsightsFeatureFlag;
                                this.energyInsightsService.isEnergyInsightsDisagEnabled = energyInsightsDisagFlag;
                                this.isAccountValidForEnergyInsights = this.energyInsightsService.verifySingleAccountDetails(accountList) && energyInsightsFeatureFlag;
                                this.buildEnergyInsightsDataModel(energyInsightsEligibilityList);
                            }
                        }
                    );
                }
            );

            this.featureFlagService.featureFlagged(FeatureFlagTypes.decisioningEnabled).subscribe(
                    (featureIsEnabled: boolean) => {
                    this.decisioningEnabled = featureIsEnabled;
                    this.marketingTileEnabled = !this.decisioningEnabled;
                }
            );
            this.accountsService.areAllAccountContractsRestricted().subscribe((result) => {
                this.allContractsAreRestricted = result;
            });
    }

    public buildEnergyInsightsDataModel(energyInsightsEligibilityList: ContractEnergyInsightsModel[]): void {
        if (this.isEnergyInsightsApiError) {
            return;
        }

        // include ineligible electricity contracts in the Energy Insights list for the ineligibility reason for Phase 2
        this.energyInsightsEligibility = energyInsightsEligibilityList
        .filter((energyInsightsEligibility: ContractEnergyInsightsModel) => energyInsightsEligibility.contract.isElectricity)
        .map((energyInsightsEligibility: ContractEnergyInsightsModel) => {
            return new ManageEnergyInsightsComponentModel(energyInsightsEligibility);
        });
        this.energyInsightsService.setModel(this.energyInsightsEligibility);
    }
}
