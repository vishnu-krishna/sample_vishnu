import { Component, OnInit, } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { isEmpty } from 'rxjs/operator/isEmpty';

import { ApiService } from '../../../../../shared/service/api.service';
import { AccountViewModel, IAccountServiceMA } from '../../../../services/account.service';
import { EnergyInsightsService } from '../../../../services/energyInsights.service';
import { ContractEnergyInsightsModel } from '../../../../services/settings/model/contractEnergyInsightsModel';
import { SetupEnergyInsightsRequest } from '../../../../services/settings/model/setupEnergyInsightsRequest';
import { FeatureFlagService, FeatureFlagTypes } from '../../../../services/featureFlag.service';
import { ConfigService } from '../../../../../shared/service/config.service';
import { FlashMessageType } from '../../../../maui/flashMessage/index';
import { EnergyInsightSubscriptionRoutes } from '../energyInsightsRouteConstants';

@Component({
    selector: 'agl-energy-insights-landing',
    templateUrl: 'energyInsightsLanding.component.html',
    styleUrls: ['energyInsightsLanding.component.scss']
})
export class EnergyInsightsLandingComponent implements OnInit {
    public isLoading: boolean = false;
    public isValidAccount: boolean = false;

    constructor(
        public location: Location,
        public accountService: IAccountServiceMA,
        public energyInsightsService: EnergyInsightsService,
        public featureFlagService: FeatureFlagService,
        public router: Router,
        public configService: ConfigService,
    ) {
    }

    public ngOnInit() {
        this.isLoading = true;
        this.featureFlagService.featureFlagged(FeatureFlagTypes.energyInsightsEnabled)
            .subscribe((
                energyInsightsEnabled
            ) => {
                if (energyInsightsEnabled) {
                    this.energyInsightsService.getContractDetailsAndEligibility()
                    .finally(() => {
                        this.isLoading = false;
                    })
                    .subscribe((result: ContractEnergyInsightsModel[]) => {
                        this.energyInsightsService.isApiCallSuccess = true;
                        const contractCount = result.length;
                        if (contractCount > 0) {
                            this.energyInsightsService.energyInsightsContracts = result;
                            this.energyInsightsService.filterContracts();
                            let validContractCount = this.energyInsightsService.energyInsightsContracts.filter((contract) => contract.energyInsightsEligibility.isEligible);
                            if ( validContractCount.length === 1 && !this.energyInsightsService.isMultiAccountUser) {
                                this.energyInsightsService.selectedEnergyInsightsContract = validContractCount[0]; // Getting the one contract
                                this.router.navigate([EnergyInsightSubscriptionRoutes.Subscription]);
                            } else {
                                // Go to choose service page for multiple contracts users
                                this.energyInsightsService.isMultiContractEnergyInsights = true;
                                this.router.navigate([EnergyInsightSubscriptionRoutes.ChooseService]);
                            }
                        } else {
                            this.goToOverview();
                        }
                    },
                    () => {
                        this.energyInsightsService.isApiCallSuccess = false;
                    });
                } else {
                    this.goToOverview();
                }
            }
        );
    }

    private goToOverview(): void {
        this.router.navigate(['/overview']);
    }
}
