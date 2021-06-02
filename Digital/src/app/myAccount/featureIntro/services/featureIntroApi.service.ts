import { Injectable }                 from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, Response } from '@angular/http';
import { Observable }                 from 'rxjs/Observable';
import { AglAuthTokenProvider }       from '../../../shared/repository/aglAuthTokenProvider';
import { ConfigService }              from '../../../shared/service/config.service';
import { Guid }                       from '../../../shared/utils/guid';

@Injectable()
export class FeatureIntroApi {
    private basePath: string;

    constructor(
        private http: Http,
        private configService: ConfigService,
        private tokenProvider: AglAuthTokenProvider) {
            this.basePath = configService.current.aglPersonalisationApiBaseUrl;
    }

    public get<T>(url: string): Observable<T> {
        let requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: this.commonHeaders() });
        return this.http.get(`${this.basePath}${url}`, requestOptions)
            .map((response) => response.json());
    }

    public post<T>(url: string, body: any): Observable<T> {
        let requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: this.commonHeaders() });
        return this.http.post(`${this.basePath}${url}`, body, requestOptions)
            .map((response: Response) => {
                let result = (response.text() === '') ? response : response.json(); // Safely handle empty response bodies
                return result;
            });
    }

    public patch<T>(url: string, body: any): Observable<T> {
        let requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: this.commonHeaders() });
        return this.http.patch(`${this.basePath}${url}`, body, requestOptions)
            .map((response: Response) => {
                let result = (response.text() === '') ? response : response.json(); // Safely handle empty response bodies
                return result;
            });
    }

    private commonHeaders(): Headers {
        return new Headers({
            'Authorization': `Bearer ${this.tokenProvider.getToken()}`,
            'X-Correlation-Id': Guid.newGuid(),
            'Content-Type': 'application/json'
        });
    }
}
