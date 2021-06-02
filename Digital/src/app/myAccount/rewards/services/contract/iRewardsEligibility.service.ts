import { Observable } from 'rxjs/Rx';

import { RewardsEligibility } from '../../shared/rewards-eligibility';

export abstract class IRewardsEligibilityService {
    public abstract checkEligibility(): Observable<RewardsEligibility>;
    public abstract isEligibleForBenefits(): Observable<boolean>;
}
