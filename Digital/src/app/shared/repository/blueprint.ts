
/**
 * Interface class for the base repository
 */
import { Headers, Http, RequestMethod, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from '../service/config.service';
import { Guid } from '../utils/guid';
import { AglAuthTokenProvider } from './aglAuthTokenProvider';

export interface IAPIRepoBase {
    get<T>(apiOptions: RequestOptions): Observable<T>;
    post<T>(apiOptions: RequestOptions): Observable<T>;
    put<T>(apiOptions: RequestOptions): Observable<T>;
    delete<T>(apiOptions: RequestOptions): Observable<T>;
}

/**
 * Base class for the repository, that implements IAPIRepoBase
 *
 * This would contain the majority of the logic for conducting GET, POST, etc calls
 */
export abstract class ApiRepoBase implements IAPIRepoBase {

    public errors = new Subject();
    protected _baseUrl: string;
    protected _cache: Object = {};
    protected _standardOptions: RequestOptions; // Request options that are present for each request in this repository
    protected _authorizationBearerToken: string;

    constructor(
        protected _http: Http,
        protected _config: ConfigService,
        protected _tokenProvider: AglAuthTokenProvider,
        protected baseUrl: string
    ) {
        this._standardOptions = new RequestOptions();
        let token: string;
        token = _tokenProvider.getToken();
        if (token) { this._authorizationBearerToken = token; }
    }

    public get<T>(apiOptions: RequestOptions): Observable<T> {
        let requestOptions: RequestOptions = new RequestOptions({
            method: RequestMethod.Get
        });
        return this.doRequest(requestOptions.merge(apiOptions));
    }

    public post<T>(apiOptions: RequestOptions): Observable<T> {
        let requestOptions: RequestOptions = new RequestOptions({
            method: RequestMethod.Post
        });
        return this.doRequest(requestOptions.merge(apiOptions));
    }

    public put<T>(apiOptions: RequestOptions): Observable<T> {
        let requestOptions: RequestOptions = new RequestOptions({
            method: RequestMethod.Put
        });
        return this.doRequest(requestOptions.merge(apiOptions));
    }

    public delete<T>(apiOptions: RequestOptions): Observable<T> {
        let requestOptions: RequestOptions = new RequestOptions({
            method: RequestMethod.Delete
        });
        return this.doRequest(requestOptions.merge(apiOptions));
    }

    protected mergeHeaders(base: Headers, override: Headers): Headers {
        // TODO: Copy the headers
        return base;
    }

    protected appendPlatformIdentifier(req: RequestOptions): RequestOptions {
        if (!req.params) {
            req.params = new URLSearchParams();
        }
        req.params.append('Source', 'Web');
        return req;
    }

    protected appendCorrelationId(req: RequestOptions): RequestOptions {
        if (!req.headers) {
            req.headers = new Headers();
        }
        let transactionGuid = Guid.newGuid();
        req.headers.append(`x-correlation-id`, transactionGuid);
        return req;
    }

    protected appendAuthHeaders(req: RequestOptions): RequestOptions {
        if (this._authorizationBearerToken) {
            if (!req.headers) {
                req.headers = new Headers();
            }
            req.headers.append('Authorization', `Bearer ${this._authorizationBearerToken}`);
        }
        return req;
    }

    private doRequest<T>(requestOptions: RequestOptions): Observable<T> {
        let url: string = requestOptions.url;
        return this._http
            .request(url, requestOptions)
            .map(
                (response) => response.json()
            )
            .do(() => {
                // Inline event for each download
            })
            .catch((err) => {
                this.errors.next(err);
                if (err.status === 401) {
                    // TODO: Send Unauth Message
                }
                return Observable.throw(err.json());
            });
    }

}

/**
 * Interface for the API V1 that extends the IAPIRepoBase
 */
export interface IApiRepoV1 extends IAPIRepoBase {
    get<T>(apiOptions: RequestOptions): Observable<T>;
    post<T>(apiOptions: RequestOptions): Observable<T>;
    put<T>(apiOptions: RequestOptions): Observable<T>;
    delete<T>(apiOptions: RequestOptions): Observable<T>;
}

/**
 * Interface for the API V1 that extends the IAPIRepoBase
 */
export interface IApiRepoV2 extends IAPIRepoBase {
    get<T>(apiOptions: RequestOptions): Observable<T>;
    post<T>(apiOptions: RequestOptions): Observable<T>;
    put<T>(apiOptions: RequestOptions): Observable<T>;
    delete<T>(apiOptions: RequestOptions): Observable<T>;
}

/**
 * Interface for the Settings API repo
 */
export interface ISettingsApiRepo extends IAPIRepoBase {
    get<T>(apiOptions: RequestOptions): Observable<T>;
    post<T>(apiOptions: RequestOptions): Observable<T>;
    put<T>(apiOptions: RequestOptions): Observable<T>;
    delete<T>(apiOptions: RequestOptions): Observable<T>;
}

/**
 * API Repo V1 that extends the ApiRepoBase and implements IApiRepoV1
 *
 * This would contaion logic that is specific to the V1 endpoints
 */
export class ApiRepoV1 extends ApiRepoBase implements IApiRepoV1 {

    constructor(
        protected _http: Http,
        protected _config: ConfigService,
        protected _tokenProvider: AglAuthTokenProvider,
    ) {
        super(
            _http,
            _config,
            _tokenProvider,
            `${_config.current.aglWebApiBaseUrl}api/v1`
        );
    }

    public get<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.get<T>(apiOptions);
    }

    public post<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.post<T>(apiOptions);
    }

    public put<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.put<T>(apiOptions);
    }

    public delete<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.delete<T>(apiOptions);
    }

}

/**
 * API Repo V2 that extends the ApiRepoBase and implements IApiRepoV2.
 *
 * This would contain logic that is specific to V2 endpoints (x-correlation-id, source parameter, etc)
 */
export class ApiRepoV2 extends ApiRepoBase implements IApiRepoV2 {

    protected _authorizationBearerToken: string;

    constructor(
        protected _http: Http,
        protected _config: ConfigService,
        protected _tokenProvider: AglAuthTokenProvider,
    ) {
        super(
            _http,
            _config,
            _tokenProvider,
            `${_config.current.aglWebApiBaseUrl}v2`
        );
    }

    public get<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendPlatformIdentifier(apiOptions);
        apiOptions = this.appendCorrelationId(apiOptions);
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.get(apiOptions);
    }

    public post<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendPlatformIdentifier(apiOptions);
        apiOptions = this.appendCorrelationId(apiOptions);
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.post(apiOptions);
    }

    public put<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendPlatformIdentifier(apiOptions);
        apiOptions = this.appendCorrelationId(apiOptions);
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.put(apiOptions);
    }

    public delete<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendPlatformIdentifier(apiOptions);
        apiOptions = this.appendCorrelationId(apiOptions);
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.delete(apiOptions);
    }

}

export class SettingsApiRepo extends ApiRepoBase implements ISettingsApiRepo {

    protected _authorizationBearerToken: string;

    constructor(
        protected _http: Http,
        protected _config: ConfigService,
        protected _tokenProvider: AglAuthTokenProvider,
    ) {
        super(
            _http,
            _config,
            _tokenProvider,
            _config.current.aglSettingsApiBaseUrl
        );
    }

    public get<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendCorrelationId(apiOptions);
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.delete(apiOptions);
    }
    public post<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendCorrelationId(apiOptions);
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.delete(apiOptions);
    }
    public put<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendCorrelationId(apiOptions);
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.delete(apiOptions);
    }
    public delete<T>(apiOptions: RequestOptions): Observable<T> {
        apiOptions = this.appendCorrelationId(apiOptions);
        apiOptions = this.appendAuthHeaders(apiOptions);
        return super.delete(apiOptions);
    }

}
