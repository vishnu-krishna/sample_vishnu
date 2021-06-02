import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { FeatureFlagTypes } from '../../services/featureFlag.constants';
import { FeatureFlagService } from '../../services/featureFlag.service';
import { RewardsEligibility } from '../shared/rewards-eligibility';
import { IRewardsApiService } from './contract/iRewardsApi.service';

@Injectable()
export class RewardsEligibilityService {
    private readonly eligibilityUrl = '/v1/eligibility';
    private readonly benefitsEligibilityUrl = '/v1/benefits/eligibility';
    private cachedAuthToken: string;
    private cachedEligibility: RewardsEligibility;

    constructor(private api: IRewardsApiService, private featureFlagService: FeatureFlagService) {}

    public checkEligibility(): Observable<RewardsEligibility> {
        if (this.api.getAuthorizationToken() === this.cachedAuthToken && this.cachedEligibility) {
            return Observable.of(this.cachedEligibility);
        }

        return this.featureFlagService.featureFlagged(FeatureFlagTypes.rewardsEnabled)
        .flatMap((featureEnabled) => {
            if (!featureEnabled) {
                return Observable.of(new RewardsEligibility());
            } else {
                return this.getEligibility();
            }
        });
    }

    public isEligibleForBenefits(): Observable<boolean> {
        return this.featureFlagService.featureFlagged(FeatureFlagTypes.rewardsBenefitsMembershipEnabled)
        .flatMap((featureEnabled) => {
            if (featureEnabled) {
                return this.api.get(this.benefitsEligibilityUrl).map((responseJson) => {
                    return responseJson.isEligibleForBenefits;
                }).catch((err) => {
                    console.error(err);
                    return Observable.of(false);
                });
            } else {
                return Observable.of(false);
            }
        });
    }

    private getEligibility(): Observable<RewardsEligibility> {
        let result = new RewardsEligibility();

        return this.api.get(this.eligibilityUrl).map((responseJson) => {
            result.fromJSON(responseJson);

            this.cacheEligibility(result);
            return result;
        }).catch((err) => {
            console.error(err);
            return Observable.of(result);
        });
    }

    private cacheEligibility(rewardsEligibility: RewardsEligibility) {
        this.cachedAuthToken = this.api.getAuthorizationToken();
        this.cachedEligibility = rewardsEligibility;
    }
}
