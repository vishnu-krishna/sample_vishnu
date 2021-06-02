import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { FeatureFlagService } from '../../myAccount/services/featureFlag.service';
import { AglAuthTokenProvider } from '../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../shared/service/config.service';

import { RewardsRoutingGuard } from './rewards-routing.guard';
import { IRewardsApiService } from './services/contract/iRewardsApi.service';
import { IRewardsEligibilityService } from './services/contract/iRewardsEligibility.service';
import { RewardsApiService } from './services/rewardsApi.service';
import { RewardsEligibilityService } from './services/rewardsEligibility.service';

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        ConfigService,
        AglAuthTokenProvider,
        FeatureFlagService,
        { provide: IRewardsApiService, useClass: RewardsApiService },
        { provide: IRewardsEligibilityService, useClass: RewardsEligibilityService },
        RewardsRoutingGuard
    ]
})
export class RewardsEligibilityModule { }
