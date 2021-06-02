import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AGLRewardsBannerComponent } from './components/aglrewards-banner/aglrewards-banner.component';
import { AGLRewardsActiveBannerComponent } from './components/aglrewards-banner/aglrewards-active-banner.component';
import { RewardsDiscountsComponent } from './pages/discounts/rewards-discounts.component';
import { RewardsFlybuysComponent } from './pages/flybuys/rewards-flybuys.component';
import { RewardsDMBannerComponent } from './components/dm-banner/rewards-dm-banner.component';
import { RewardsDMBTermsConditionsComponent } from './components/dm-banner/terms-conditions/rewards-dmb-terms-conditions.component';
import { RewardsComponent } from './pages/rewards/rewards.component';
import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsGenericErrorComponent } from './components/rewards-generic-error/rewards-generic-error.component';
import { BenefitsDashboardComponent } from './components/benefits-dashboard/benefits-dashboard.component';
import { BenefitTileComponent } from './components/benefit-tile/benefit-tile.component';
import { HorizontalScrollerComponent } from './components/horizontal-scroller/horizontal-scroller.component';

import { IRewardsService } from './services/contract/iRewards.service';
import { RewardsService } from './services/rewards.service';
import { RewardsAnalytics } from './rewards-analytics';
import { FormatDatePipeModule } from '../../shared/pipes/formatDate/formatDatePipe.module';
import { DLSCTATileComponent } from './components/ctaTile/dlsCtaTile.component';
import { RewardsDiscountTileComponent } from './components/discount/rewardsDiscountTile.component';
import { DLSDMBannerModule, DLSLinkModule, DLSTileModule } from './components/dls';
import { RewardsFlybuysTileComponent } from './components/flybuys/rewardsFlybuysTile.component';
import { WebchatRewardsErrorComponent } from './components/webchat-rewards-error/webchat-rewards-error.component';
import { BenefitsActivationComponent } from './components/benefits-activation/benefits-activation.component';
import { LoadingModule } from '../../shared/loaders/loading.module';
import { GenericErrorImageModule } from '../../shared/component/genericError/genericErrorImage/genericErrorImage.module';
import { RemoveHtmlTagsPipe } from './shared/remove-html-tags.pipe';

// including maui button, subheader  modules
import { MauiButtonModule } from '../maui/button';
import { MauiSecondaryNavigationModule } from '../maui/secondaryNavigation';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        RewardsRoutingModule,
        FormatDatePipeModule,
        DLSLinkModule,
        DLSTileModule,
        DLSDMBannerModule,
        LoadingModule,
        GenericErrorImageModule,
        MauiButtonModule,
        MauiSecondaryNavigationModule,
        MatTooltipModule
    ],
    declarations: [
        RewardsComponent,
        AGLRewardsBannerComponent,
        AGLRewardsActiveBannerComponent,
        RewardsDiscountTileComponent,
        RewardsFlybuysTileComponent,
        BenefitsActivationComponent,
        RewardsDiscountsComponent,
        RewardsFlybuysComponent,
        RewardsDMBannerComponent,
        RewardsDMBTermsConditionsComponent,
        DLSCTATileComponent,
        WebchatRewardsErrorComponent,
        RewardsGenericErrorComponent,
        BenefitsDashboardComponent,
        BenefitTileComponent,
        HorizontalScrollerComponent,
        RemoveHtmlTagsPipe
    ],
    entryComponents: [
       RewardsDMBTermsConditionsComponent
    ],
    providers: [
        { provide: IRewardsService, useClass: RewardsService },
        RewardsAnalytics
    ]
})
export class RewardsModule { }
