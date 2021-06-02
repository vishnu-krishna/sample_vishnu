import { Observable } from 'rxjs/Observable';

import { EligibilityModel } from '../../model/oneMinMove/eligibility.model';

export abstract class IEligibilityService {
    public abstract CheckEligibilityMyAccount(): Observable<EligibilityModel[]>;
    public abstract CheckEligibility(): Observable<EligibilityModel[]>;
    public abstract CheckEligibilityV2(): Observable<EligibilityModel[]>;
}
