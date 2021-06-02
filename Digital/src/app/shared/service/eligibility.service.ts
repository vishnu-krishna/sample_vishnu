import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../shared/service/config.service';
import { ContentService } from '../../shared/service/content.service';
import { Guid } from '../../shared/utils/guid';
import { EligibilityModel } from '../model/oneMinMove/eligibility.model';
import { IEligibilityService } from './contract/ieligibility.service';

@Injectable()
export class EligibilityService implements IEligibilityService {
    constructor(
        private http: Http,
        private configService: ConfigService,
        private _contentService: ContentService
    ) { }

    public CheckEligibilityMyAccount(): Observable<EligibilityModel[]> {
        return new Observable((observer) => {
            this._contentService.getContent().subscribe((content) => {
                // first check if the payg flag is active
                if (content.selfService.featureFlags.oneMinuteMoveMvp) {
                    this.CheckEligibility().subscribe((result) => {
                        observer.next(result);
                        observer.complete();
                    });
                } else {
                    this.CheckEligibilityV2().subscribe((result) => {
                        observer.next(result);
                        observer.complete();
                    });
                }
            });
        });
    }

    public CheckEligibility(): Observable <EligibilityModel[] > {
        let correlationId = Guid.newGuid();
        let moveType: string = 'OneMinuteMove';
        let eligibilityUrl: string = `${this.configService.current.aglMoveAndJoinApiUrl}/v1/moves/eligibility`;
        let headers = new Headers();
        let auth: string = sessionStorage.getItem('Bearer');

        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('X-Correlation-Id', correlationId);
        headers.append('Authorization', 'Bearer ' + auth);
        headers.append('Access-Control-Allow-Origin', 'true');
        headers.append('Access-Control-Allow-Credentials', 'true');

        let options = new RequestOptions({ headers: headers, method: RequestMethod.Get, withCredentials: false });
        let endpointUrl = eligibilityUrl + '?moveType=' + moveType;

        return this.http.get(endpointUrl, options)
            .map((response) => response.json())
            .catch((error) => Observable.of([{ oneMinuteMove: { isEligible: false } }]));
    }

    public CheckEligibilityV2(): Observable < EligibilityModel[] > {
        let correlationId = Guid.newGuid();
        let moveType: string = 'OneMinuteMove';
        let eligibilityUrl: string = `${this.configService.current.aglMoveAndJoinApiUrl}/v2/moves/eligibility`;
        let headers = new Headers();
        let auth: string = sessionStorage.getItem('Bearer');

        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('X-Correlation-Id', correlationId);
        headers.append('Authorization', 'Bearer ' + auth);
        headers.append('Access-Control-Allow-Origin', 'true');
        headers.append('Access-Control-Allow-Credentials', 'true');

        let options = new RequestOptions({ headers: headers, method: RequestMethod.Get, withCredentials: false });
        let endpointUrl = eligibilityUrl + '?moveType=' + moveType;

        return this.http.get(endpointUrl, options)
            .map((response) => response.json())
            .catch((error) => Observable.of([{ oneMinuteMove: { isEligible: false } }]));
    }
}
