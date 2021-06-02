import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as ApiModel from '../model/api.model';
import { ConfigService } from '../service/config.service';
import { SessionService } from '../service/session.service';
import { Guid } from '../utils/guid';
import { AglAuthTokenProvider } from './aglAuthTokenProvider';
import { ISolarCheckRepository } from './contract/isolarCheck.repository';

export abstract class SolarCheckRepositoryBase extends ISolarCheckRepository {
    public errors = new Subject();

    protected _authorizationBearerToken: string;
    protected _baseUrl: string;
    protected _cache: Object = {};

    constructor(protected _http: Http, protected _config: ConfigService, _tokenProvider: AglAuthTokenProvider, protected sessionService: SessionService) {
        super();
        this._baseUrl = this._config.current.solarCheckApiBaseUrl;
        let token: string;
        token = _tokenProvider.getToken();
        if (token) { this._authorizationBearerToken = token; }
    }
    protected sendHttpRequest<T>(apiOptions: ApiModel.ApiV2RequestOptions, requestMethod: RequestMethod): Observable<T> {
        let requestOptions = {};
        if (this._authorizationBearerToken) {
            let headers = new Headers();

            headers.set(`Authorization`, `Bearer ${this._authorizationBearerToken}`);
            headers.append('Access-Control-Allow-Origin', 'true');
            if (apiOptions.guid) {
                headers.append('X-Correlation-Id', apiOptions.guid);
            }

            requestOptions = new RequestOptions({
                method: requestMethod,
                body: apiOptions.body,
                headers: headers,
                withCredentials: true,
                search: apiOptions.searchParams
            });
        }

        return this._http.request(apiOptions.endpoint, requestOptions)
            .catch((err) => {
                this.errors.next(err);

                // Unauthorised
                if (err.status === 401) {
                    // call for deleting the guid if unauthorized.
                    this.sessionService.deleteSession();
                    window.location.href = this._config.getEnvironmentLogoutUrl;
                }
                return Observable.throw(err.json());
            })
            .map((response) => apiOptions.isJson ?
                response.json() :
                response.text());
    }

    // TODO: Refactor this abstract class, remove tslint disable to see issue.
    // tslint:disable-next-line
    abstract get<T>(endpoint: string, syncStatus: Observable<ApiModel.SyncStatus>, useCache: boolean, isJson: boolean, parameters?: URLSearchParams): Observable<T>;
    // tslint:disable-next-line
    abstract post<T>(apiOptions: ApiModel.ApiRequestOptions): Observable<T>;
    // tslint:disable-next-line
    abstract put(apiOptions: ApiModel.ApiRequestOptions): Observable<String>;
}

@Injectable()
export class SolarCheckRepository extends SolarCheckRepositoryBase {
    constructor(http: Http, config: ConfigService, tokenProvider: AglAuthTokenProvider, sessionService: SessionService) {
        super(http, config, tokenProvider, sessionService);
    }
    public get<T>(endpoint: string, syncStatus: Observable<ApiModel.SyncStatus>, useCache = true, isJson = true, parameters?: URLSearchParams): Observable<T> {
        let url = `${this._baseUrl}${endpoint}`;
        let getObservable = this.sendHttpRequest<T>(
            {
                endpoint: url,
                isJson: isJson,
                body: {},
                useCache: true,
                searchParams: parameters,
                guid: Guid.newGuid()
            },
            RequestMethod.Get);
        let observable = (syncStatus ?
            syncStatus.flatMap(() => getObservable) :
            getObservable).share();
        let endpointKey = endpoint.replace(new RegExp('^/(v1/)?'), '');
        this._cache[endpointKey] = observable;
        return observable;
    }
    public put(apiOptions: ApiModel.ApiV2RequestOptions): Observable<String> {
        apiOptions.guid = Guid.newGuid();
        apiOptions.endpoint = `${this._baseUrl}${apiOptions.endpoint}`;
        return this.sendHttpRequest(apiOptions, RequestMethod.Put);
    }

    public post<T>(apiOptions: ApiModel.ApiV2RequestOptions): Observable<T> {
        apiOptions.guid = Guid.newGuid();
        apiOptions.endpoint = `${this._baseUrl}${apiOptions.endpoint}`;
        return this.sendHttpRequest(apiOptions, RequestMethod.Post);
    }
}
