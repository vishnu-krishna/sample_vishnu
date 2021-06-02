import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { IFeatureIntroService } from './iFeatureIntro.service';
import { FeatureIntro } from '../shared/featureIntro';
import { FeatureIntroApi } from './featureIntroApi.service';

@Injectable()
export class FeatureIntroService implements IFeatureIntroService {
    private readonly featuresUrl = '/v1/features';
    private readonly myAccountChannel = 'myaccount';

    constructor(private api: FeatureIntroApi) {}

    public getFeatureIntros(): Observable<FeatureIntro[]> {
        return this.api.get<FeatureIntro[]>(this.featuresUrl + '?channel=' + this.myAccountChannel)
            .catch((err) => {
                console.error(err);
                return Observable.of([]);
            });
    }

    public markFeatureIntroAsViewed(featureId: string): Observable<boolean> {
        let body = {
            hasViewed: true
        };
        return this.api.patch(this.featuresUrl + '/' + featureId, body)
            .map((result) => true)
            .catch((err) => Observable.of(false));
    }

}
