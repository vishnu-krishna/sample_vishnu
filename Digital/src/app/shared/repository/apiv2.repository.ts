import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, URLSearchParams } from '@angular/http';
import { ProgressHttp } from 'angular-progress-http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as ApiModel from '../model/api.model';
import { ConfigService } from '../service/config.service';
import { IMessageBusService } from '../service/contract/imessageBus.service';
import { SessionService } from '../service/session.service';
import { Guid }               from '../utils/guid';
import { UploadProgressMessage } from './../messages/uploadProgress.message';
import { AglAuthTokenProvider } from './aglAuthTokenProvider';
import { IApiv2Repository } from './contract/iapiv2.repository';

export abstract class Apiv2RepositoryBase extends IApiv2Repository {
    public errors = new Subject();

    protected _authorizationBearerToken: string;
    protected _baseUrl: string;
    protected _cache: Object = {};

    constructor(
        protected _http: Http,
        protected _config: ConfigService,
        protected _tokenProvider: AglAuthTokenProvider,
        protected progressHttp: ProgressHttp,
        protected sessionService: SessionService,
        protected messageBusService: IMessageBusService) {
            super();
            this._baseUrl = this._config.current.aglWebApiBaseUrl;
            let token: string;
            token = _tokenProvider.getToken();
            if (token) { this._authorizationBearerToken = token; }
    }

    protected getViaHttp<T>(apiOptions: ApiModel.ApiV2RequestOptions): Observable<T> {

        let requestOptions = {};
        if (this._authorizationBearerToken) {
            let headers = new Headers();
            headers.append('Authorization', `Bearer ${this._authorizationBearerToken}`);
            if (apiOptions.guid) {
                headers.append('X-Correlation-Id', apiOptions.guid);
            }
            requestOptions = new RequestOptions({
                method: RequestMethod.Get,
                headers: headers,
            });
        }

        // Append the parameters & token.
        if (apiOptions.searchParams && this._authorizationBearerToken) {
            let headers = new Headers();
            headers.append('Authorization', `Bearer ${this._authorizationBearerToken}`);
            if (apiOptions.guid) {
                headers.append('X-Correlation-Id', apiOptions.guid);
            }
            requestOptions = new RequestOptions({
                method: RequestMethod.Get,
                headers: headers,
                search: apiOptions.searchParams,
                withCredentials: true
            });
        }

        return this._http.request(apiOptions.endpoint, requestOptions)
            .catch((err) => {
                console.log(`An error occured on ${apiOptions.endpoint}: error:${JSON.stringify(err.json())}`);
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
    abstract get<T>(endpoint: string, useCache: boolean, isJson: boolean, parameters?: URLSearchParams): Observable<T>;

    // tslint:disable-next-line
    abstract post<T>(apiOptions: ApiModel.ApiV2RequestOptions): Observable<T>;

    // tslint:disable-next-line
    abstract postForm<T>(apiOptions: ApiModel.ApiV2RequestOptions, formSubmissionData: FormData): Observable<T>;

    // tslint:disable-next-line
    abstract patch<T>(apiOptions: ApiModel.ApiV2RequestOptions): Observable<T>;
}

@Injectable()
export class Apiv2Repository extends Apiv2RepositoryBase {

    constructor(
        http: Http,
        config: ConfigService,
        tokenProvider: AglAuthTokenProvider,
        progressHttp: ProgressHttp,
        sessionService: SessionService,
        messageBusService: IMessageBusService) {
        super(http, config, tokenProvider, progressHttp, sessionService, messageBusService);
    }

    public get<T>(endpoint: string, useCache = true, isJson = true, parameters?: URLSearchParams, ): Observable<T> {
        let url = `${this._baseUrl}${endpoint}`;
        let observable = this.getViaHttp<T>({ endpoint: url, isJson: isJson, body: {}, useCache: true, searchParams: parameters, guid: Guid.newGuid() });
        let endpointKey = endpoint.replace(new RegExp('^/(v2/)?'), '');
        this._cache[endpointKey] = observable;
        return observable;
    }

    public post<T>(apiOptions: ApiModel.ApiV2RequestOptions): Observable<T> {
        return this.postOrPatch(apiOptions, RequestMethod.Post);
    }

    public patch<T>(apiOptions: ApiModel.ApiV2RequestOptions): Observable<T> {
        return this.postOrPatch(apiOptions, RequestMethod.Patch);
    }

    public postForm<T>(apiOptions: ApiModel.ApiV2RequestOptions, formSubmissionData: FormData): Observable<T> {

        let requestOptions = {};
        let currentHost = this._config.getEnvironmentName();
        let isLocalHost = (currentHost === 'localhost:8080' || currentHost === 'localhost');
        let endPoint = `${this._baseUrl}${apiOptions.endpoint}`;

        if (this._authorizationBearerToken) {
            let headers = new Headers();
            headers.append('Authorization', `Bearer ${this._authorizationBearerToken}`);
            if (apiOptions.guid) {
                headers.append('X-Correlation-Id', apiOptions.guid);
            }
            requestOptions = new RequestOptions({
                method: RequestMethod.Post,
                headers: headers,
                withCredentials: true
            });
        }

        return this.progressHttp
            .withUploadProgressListener((progress) => {
                let progressMessage = new UploadProgressMessage(progress);
                this.messageBusService.broadcast(progressMessage);
            })
            .post(endPoint, formSubmissionData, requestOptions)
                .catch((err) => {
                    this.errors.next(err);
                    // Unauthorised
                    if (err.status === 401) {
                        window.location.href = this._config.getEnvironmentLogoutUrl;
                    }
                    return Observable.throw(err.json());
                })
                .map((response) => apiOptions.isJson ?
                    response.json() :
                    response.text());
    }

    private postOrPatch<T>(apiOptions: ApiModel.ApiV2RequestOptions, requestMethod: RequestMethod.Post | RequestMethod.Patch): Observable<T> {
        let requestOptions = {};
        let currentHost = this._config.getEnvironmentName();
        let isLocalHost = (currentHost === 'localhost:8080' || currentHost === 'localhost');
        let endPoint = `${this._baseUrl}${apiOptions.endpoint}`;

        if (this._authorizationBearerToken) {
            let headers = new Headers();
            headers.append('Authorization', `Bearer ${this._authorizationBearerToken}`);
            if (apiOptions.guid) {
                headers.append('X-Correlation-Id', apiOptions.guid);
            }
            requestOptions = new RequestOptions({
                method: requestMethod,
                body: apiOptions.body,
                headers: headers,
                withCredentials: true
            });
        }

        return this._http.request(endPoint, requestOptions)
            .catch((err) => {
                this.errors.next(err);
                // Unauthorised
                if (err.status === 401) {
                    window.location.href = this._config.getEnvironmentLogoutUrl;
                }
                return Observable.throw(err.json());
            })
            .map((response) => apiOptions.isJson ?
                response.json() :
                response.text());
    }
}
