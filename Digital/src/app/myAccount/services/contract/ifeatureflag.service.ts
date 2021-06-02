import { Observable } from 'rxjs/Observable';
import { FeatureFlagTypes } from '../featureFlag.service';

export abstract class IFeatureFlagService {
    public abstract featureFlagged(FeatureFlagTypes: FeatureFlagTypes): Observable<boolean>;
    public abstract featureFlagValues(flagTypes: FeatureFlagTypes[]): Observable<boolean[]>;
    public abstract getFeatureFlags(flagTypes: FeatureFlagTypes[]): Observable<Map<FeatureFlagTypes, boolean>>;
}
