import { Observable } from 'rxjs/Rx';

import { FeatureIntro } from '../shared/featureIntro';

export abstract class IFeatureIntroService {
    public abstract getFeatureIntros(): Observable<FeatureIntro[]>;
    public abstract markFeatureIntroAsViewed(featureId: string): Observable<boolean>;
}
