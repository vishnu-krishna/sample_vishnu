import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from '../../shared/service/config.service';
import { Guid } from '../../shared/utils/guid';
import { AglAuthTokenProvider } from './aglAuthTokenProvider';
import { IProductRepository } from './contract/iproduct.repository';

@Injectable()
export class ProductApiRepository implements IProductRepository {
    public errors = new Subject();
    protected _baseUrl: string;
    protected _authorizationBearerToken: string;

    constructor(
        protected _http: Http,
        protected _config: ConfigService, _tokenProvider: AglAuthTokenProvider) {
        this._baseUrl = this._config.current.aglProductApiBaseUrl;
        let token: string;
        token = _tokenProvider.getToken();
        if (token) { this._authorizationBearerToken = token; }
    }

    public get<T>(endpoint: string, parameters: URLSearchParams = null): Observable<T> {
        let requestOptions = {};
        let headers = new Headers();
        let url = `${this._baseUrl}${endpoint}`;

        headers.append('X-Correlation-Id', Guid.newGuid());
        headers.append(`Authorization`, `Bearer ${this._authorizationBearerToken}`);

        requestOptions = new RequestOptions({
            headers: headers,
            withCredentials: false
        });
        if (parameters) {
            requestOptions = new RequestOptions({
                headers: headers,
                search: parameters,
            });
        }

        return this._http.get(url, requestOptions)
            .catch((err) => {
                console.log(`An error occured on ${endpoint}: error:${JSON.stringify(err.json())}`);
                this.errors.next(err);
                return Observable.throw([]);
            })
            .map((response) => response.json());
    }
    public post<T>(endpoint: string, body: Object): Observable<T> {
        let requestOptions = {};
        let headers = new Headers();
        let url = `${this._baseUrl}${endpoint}`;

        headers.append('X-Correlation-Id', Guid.newGuid());
        requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            body: body,
            headers: headers,
        });
        return this._http.request(url, requestOptions)
            .catch((err) => {
                console.log(`An error occured on ${endpoint}: error:${JSON.stringify(err.json())}`);
                this.errors.next(err);

                // Unauthorised
                if (err.status === 401) {
                    window.location.href = this._config.getEnvironmentLogoutUrl;
                }
                return Observable.throw([]);
            })
            .map((response) => response.json());
    }
}
