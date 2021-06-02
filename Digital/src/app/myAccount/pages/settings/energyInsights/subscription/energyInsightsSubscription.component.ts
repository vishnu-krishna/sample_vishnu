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
import { SecondaryNavigationService } from '../../../../services/secondaryNavigation.service';
import { EnergyInsightSubscriptionRoutes } from '../energyInsightsRouteConstants';

@Component({
    selector: 'agl-energy-insights',
    templateUrl: 'energyInsightsSubscription.component.html',
    styleUrls: ['energyInsightsSubscription.component.scss']
})
export class EnergyInsightsSubscriptionComponent implements OnInit {
    public isLoadingMidBill: boolean = false;
    public isLoadingFullBill: boolean = false;
    public isMidSubscription: boolean = false;
    public isEndSubscription: boolean = false;
    public getEnergyInsightsFailed: boolean = false;
    public isLoading: boolean = false;
    public isContactDetailsFeatureEnabled: boolean;
    public aeoContactDetailsUrl: string;
    public FlashMessageType = FlashMessageType;
    public postEnergyInsightsEndFailed: boolean = false;
    public postEnergyInsightsMidFailed: boolean = false;
    public isValidAccount: boolean = false;
    public displayBackButton: boolean = false;
    public goBackClicked: boolean = false;

    public readonly productEnergyInsightUrl: string = `https://www.agl.com.au/residential/why-choose-agl/energyinsights`;

    constructor(
        public location: Location,
        public accountService: IAccountServiceMA,
        public energyInsightsService: EnergyInsightsService,
        public featureFlagService: FeatureFlagService,
        public router: Router,
        public configService: ConfigService
    ) {

    }

    public ngOnInit() {
        if (!this.energyInsightsService.selectedEnergyInsightsContract) {
            this.router.navigate([EnergyInsightSubscriptionRoutes.Landing]);
        }
        this.isLoading = true;
        // AEO link for contact details
        this.aeoContactDetailsUrl = `${this.configService.current.aglSiteCoreWebsiteBaseUrl}/aeo/myaccount/update-details`;
        if (!this.energyInsightsService.isMultiContractEnergyInsights) {
            this.displayBackButton = this.energyInsightsService.shouldDisplayBackButton();
        } else {
            this.displayBackButton = true;
        }
        this.isMidSubscription = this.energyInsightsService.selectedEnergyInsightsContract.energyInsightsEligibility.subscribedToMidBillEnergyBreakdown;
        this.isEndSubscription = this.energyInsightsService.selectedEnergyInsightsContract.energyInsightsEligibility.subscribedToEndBillEnergyBreakdown;

        this.featureFlagService.featureFlagged(FeatureFlagTypes.contactDetailsEnabled)
        .finally(() => {
            this.isLoading = false;
        })
        .subscribe((
                contactEnabledFeatureFlagResult,
            ) => {
                this.isContactDetailsFeatureEnabled = contactEnabledFeatureFlagResult;
            }
        );
    }

    public midBillSubscription(event): void {
        let midBillSubscription: SetupEnergyInsightsRequest = new SetupEnergyInsightsRequest();
        this.isLoadingMidBill = true;
        midBillSubscription.subscribedToMidBillEnergyBreakdown = this.isMidSubscription;
        this.energyInsightsService.setupEnergyInsights(this.energyInsightsService.selectedEnergyInsightsContract.contract.contractNumber, midBillSubscription)
        .finally(() => {
            this.isLoadingMidBill = false;
            this.energyInsightsService.selectedEnergyInsightsContract.energyInsightsEligibility.subscribedToMidBillEnergyBreakdown = this.isMidSubscription;
        })
        .subscribe(
            () => {
                this.postEnergyInsightsMidFailed = false;
            },
            (error) => {
                this.isMidSubscription = !this.isMidSubscription;
                this.postEnergyInsightsMidFailed = true;
            }
        );
    }

    public endBillSubscription(event): void {
        this.isLoadingFullBill = true;
        let midBillSubscription: SetupEnergyInsightsRequest = new SetupEnergyInsightsRequest();
        midBillSubscription.subscribedToEndBillEnergyBreakdown = this.isEndSubscription;
        this.energyInsightsService.setupEnergyInsights(this.energyInsightsService.selectedEnergyInsightsContract.contract.contractNumber, midBillSubscription)
        .finally(() => {
            this.isLoadingFullBill = false;
            this.energyInsightsService.selectedEnergyInsightsContract.energyInsightsEligibility.subscribedToEndBillEnergyBreakdown = this.isEndSubscription;
        })
        .subscribe(
            () => {
                this.postEnergyInsightsEndFailed = false;
            },
            (error) => {
                this.isEndSubscription = !this.isEndSubscription;
                this.postEnergyInsightsEndFailed = true;
            }
        );
    }

    onClickDismissFlashMessage(isMid: boolean): void {
        if (isMid) {
            this.postEnergyInsightsMidFailed = false;
        } else {
            this.postEnergyInsightsEndFailed = false;
        }
    }

    public goBack(): void {
        if (!this.goBackClicked) {
            this.goBackClicked = true;
            this.router.navigate(['/settings/energyinsights']);
        }
    }

    private goToOverview(): void {
        this.router.navigate(['/overview']);
    }

    public onClickHomeProfile(): void {
        this.router.navigate(['/settings/homeprofile']);
    }

    public onClickDone(): void {
        this.router.navigate(['/overview']);
    }
}
