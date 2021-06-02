import { Injectable }           from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }           from 'rxjs/Observable';
import { Subject }              from 'rxjs/Subject';
import * as ApiModel            from '../model/api.model';
import { ConfigService }        from '../service/config.service';
import { AglAuthTokenProvider } from './aglAuthTokenProvider';
import { IApiRepository }       from './contract/iapi.repository';

export abstract class ApiRepositoryBase extends IApiRepository {
    public errors = new Subject();

    protected _authorizationBearerToken: string;
    protected _baseUrl: string;
    protected _cache: Object = {};

    constructor(protected _http: Http, protected _config: ConfigService, _tokenProvider: AglAuthTokenProvider) {
        super();
        this._baseUrl = this._config.current.aglWebApiBaseUrl;
        let token: string;
        token = _tokenProvider.getToken();
        if (token) { this._authorizationBearerToken = token; }
    }

    protected isSyncComplete(sync: ApiModel.SyncStatus) {
        return (sync && sync.status && sync.status.toLowerCase() === 'complete');
    }

    protected getViaHttp<T>(apiOptions: ApiModel.ApiRequestOptions): Observable<T> {
        let requestOptions: RequestOptions;

        if (this._authorizationBearerToken) {
            let headers = new Headers();

            headers.set(`Authorization`, `Bearer ${this._authorizationBearerToken}`);

            requestOptions = new RequestOptions({
                method: RequestMethod.Get,
                headers: headers,
                withCredentials: true
            });

            if (apiOptions.searchParams) {
                requestOptions.search = apiOptions.searchParams;
            }
        }

        return this._http.request(apiOptions.endpoint, requestOptions)
            .catch((err: Response) => {

                if (err.status === 404) {
                    // 404 is NOT considered an error as it is desired behaviour for some endpoints
                    console.log(`404 from endpoint (allowed as per design)`);
                } else if (err.status === 401) {
                    window.location.href = this._config.getEnvironmentLogoutUrl;
                } else {
                    console.error(`API REPOSITORY ERROR:`);
                    console.error(err);
                    console.error(apiOptions);
                    console.error(requestOptions);
                    console.log(`An error occured on ${apiOptions.endpoint}: error:${JSON.stringify(err.json())}`);
                    this.errors.next(err);
                }
                return Observable.throw(err.json());
            })
            .map((response) => apiOptions.isJson ?
                response.json() :
                response.text());
    }

    // TODO: Refactor this abstract class, remove tslint disable to see issue.
    // tslint:disable-next-line
    abstract get<T>( endpoint: string, syncStatus: Observable<ApiModel.SyncStatus>, useCache: boolean, isJson: boolean, parameters?: URLSearchParams): Observable<T>;
    // tslint:disable-next-line
    abstract post<T>(apiOptions: ApiModel.ApiRequestOptions): Observable<T>;
}

@Injectable()
export class ApiRepository extends ApiRepositoryBase {
    constructor(http: Http, config: ConfigService, tokenProvider: AglAuthTokenProvider) {
        super(http, config, tokenProvider);
    }
    public get<T>( endpoint: string, syncStatus: Observable<ApiModel.SyncStatus>, useCache = true, isJson = true, parameters?: URLSearchParams): Observable<T> {
        let url = `${this._baseUrl}${endpoint}`;
        let getObservable = this.getViaHttp<T>({ endpoint: url, isJson: isJson, body: {}, useCache: true, searchParams: parameters });
        let observable = (syncStatus ?
            syncStatus.filter((s) => this.isSyncComplete(s)).flatMap(() => getObservable) :
            getObservable).share();
        let endpointKey = endpoint.replace(new RegExp('^/(v1/)?'), '');
        this._cache[endpointKey] = observable;
        return observable;
    }
    public post<T>(apiOptions: ApiModel.ApiRequestOptions): Observable<T> {
        let requestOptions = {};
        let currentHost = this._config.getEnvironmentName();
        let endPoint = `${this._baseUrl}${apiOptions.endpoint}`;

        if (this._authorizationBearerToken) {
            let headers = new Headers({ Authorization: `Bearer ${this._authorizationBearerToken}` });
            requestOptions = new RequestOptions({
                method: RequestMethod.Post,
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
