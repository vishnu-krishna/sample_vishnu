import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AglAuthTokenProvider } from '../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../shared/service/config.service';
import { Guid } from '../../../shared/utils/guid';

@Injectable()
export class RewardsApiService {
    private basePath: string;

    constructor(private http: Http, private config: ConfigService, private tokenProvider: AglAuthTokenProvider) {
        this.basePath = config.current.aglRewardsApiBaseUrl;
    }

    public get(url: string, extraHeaders?: { [headerName: string]: string }): Observable<any> {
        let requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: this.commonHeaders(extraHeaders) });
        return this.http.get(`${this.basePath}${url}`, requestOptions)
        .map((response) => response.json())
        .catch((error) => {
            this.handleUnauthorizedSession(error);
            console.error('RewardsApi error', error);
            return Observable.throw(error);
        });
    }

    public post(url: string, body: any): Observable<any> {
        let requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: this.commonHeaders() });
        return this.http.post(`${this.basePath}${url}`, body, requestOptions)
        .map((response) => response.json())
        .catch((error) => {
            this.handleUnauthorizedSession(error);
            console.error('RewardsApi error', error);
            return Observable.throw(error);
        });
    }

    public put(url: string, body: any): Observable<any> {
        let requestOptions = new RequestOptions({ method: RequestMethod.Get, headers: this.commonHeaders() });
        return this.http.put(`${this.basePath}${url}`, body, requestOptions)
        .map((response) => response.json())
        .catch((error) => {
            this.handleUnauthorizedSession(error);
            console.error('RewardsApi error', error);
            return Observable.throw(error);
        });
    }
    public getAuthorizationToken(): string {
        return this.tokenProvider.getToken();
    }

    private handleUnauthorizedSession(error: any) {
        if (error.status === 401) {
            window.location.href = this.config.getEnvironmentLogoutUrl;
        }
    }

    private commonHeaders(extraHeaders?: { [headerName: string]: string }): Headers {
        let headers = {
            'Authorization': `Bearer ${this.getAuthorizationToken()}`,
            'X-Correlation-Id': Guid.newGuid(),
            'Content-Type': 'application/json'
        };
        if (extraHeaders) {
            Object.assign(headers, extraHeaders);
        }
        return new Headers(headers);
    }

}
