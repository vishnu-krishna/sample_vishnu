import { Injectable }                 from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, Response } from '@angular/http';
import { Observable }                 from 'rxjs/Observable';
import { AglAuthTokenProvider }       from '../../../shared/repository/aglAuthTokenProvider';
import { ConfigService }              from '../../../shared/service/config.service';
import { Guid }                       from '../../../shared/utils/guid';
import { ISettingsApi }               from './settingsApi.service.interface';

@Injectable()
export class SettingsApi implements ISettingsApi {
    private basePath: string;

    constructor(
        private http: Http,
        private configService: ConfigService,
        private tokenProvider: AglAuthTokenProvider) {
            this.basePath = configService.current.aglSettingsApiBaseUrl.trim().replace(/\/$/, '');
    }

    public get<T>(url: string): Observable<T> {
        let requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: this.commonHeaders() });
        return this.http.get(`${this.basePath}${url}`, requestOptions)
            .map((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log('SettingsApi error', error);
                return Observable.throw(error);
            });
    }

    public put<T>(url: string, body: T): Observable<T> {
        return Observable.throw(new Error(`PUT Not implemented for ${url}`));
    }

    public post<T>(url: string, body: T): Observable<T> {
        let requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: this.commonHeaders() });
        return this.http.post(`${this.basePath}${url}`, body, requestOptions)
            .map((response: Response) => {
                let result = (response.text() === '') ? response : response.json(); // Safely handle empty response bodies
                return result;
            })
            .catch((error) => {
                console.log('SettingsApi error', error);
                return Observable.throw(error);
            });
    }

    public delete<T>(url: string): Observable<T> {
        let requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: this.commonHeaders() });
        return this.http.delete(`${this.basePath}${url}`, requestOptions)
            .map((response) => {
                let result = (response.text() === '') ? response : response.json(); // Safely handle empty response bodies
                return result;
            })
            .catch((error) => {
                console.log('SettingsApi error', error);
                return Observable.throw(error);
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
