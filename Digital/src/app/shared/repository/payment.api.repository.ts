import { Injectable }           from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }           from 'rxjs/Observable';
import { Subject }              from 'rxjs/Subject';
import * as ApiModel            from '../model/api.model';
import { ConfigService }        from '../service/config.service';
import { IApiRepository }       from './contract/iapi.repository';

import { Guid }                 from '../../shared/utils/guid';
import { AglAuthTokenProvider } from './aglAuthTokenProvider';

export abstract class PaymentApiRepositoryBase extends IApiRepository {
    public errors = new Subject();

    protected _authorizationBearerToken: string;
    protected _baseUrl: string;
    protected _cache: Object = {};

    constructor(protected _http: Http, protected _config: ConfigService, public _tokenProvider: AglAuthTokenProvider) {
        super();
    }

    protected getViaHttp<T>(apiOptions: ApiModel.ApiRequestOptions): Observable<T> {
        let requestOptions: RequestOptions;
        return this._http.request(apiOptions.endpoint, requestOptions)
            .catch((err) => {
                console.log(`An error occured on ${apiOptions.endpoint}: error:${JSON.stringify(err.json())}`);
                this.errors.next(err);
                return Observable.throw(err.json());
            })
            .map((response) => apiOptions.isJson ?
                response.json() :
                response.text());
    }

    // tslint:disable-next-line
    abstract post<T>(apiOptions: ApiModel.ApiRequestOptions): Observable<T>;
}

@Injectable()
export class PaymentApiRepository extends PaymentApiRepositoryBase {
    constructor(http: Http, config: ConfigService, tokenProvider: AglAuthTokenProvider) {
        super(http, config, tokenProvider);
    }

    public get<T>( endpoint: string, syncStatus: Observable<ApiModel.SyncStatus>, useCache = true, isJson = true, parameters?: URLSearchParams): Observable<any> {
        let url = `${this._baseUrl}${endpoint}`;
        let getObservable = this.getViaHttp<T>({ endpoint: url, isJson: isJson, body: {}, useCache: true, searchParams: parameters });
        let observable = new Observable();
        let endpointKey = endpoint.replace(new RegExp('^/(v1/)?'), '');
        this._cache[endpointKey] = observable;
        return observable;
    }

    public post<T>(apiOptions: ApiModel.ApiRequestOptions): Observable<T> {
        let requestOptions = {};
        let currentHost = this._config.getEnvironmentName();
        let isLocalHost = (currentHost === 'localhost:8080' || currentHost === 'localhost');
        let endPoint = `${apiOptions.endpoint}`;

        requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            withCredentials: false
        });

        // Payment options
        // The below checks if the object is empty like {}, if so do a regular request.
        if (Object.keys(apiOptions.body).length !== 0 && apiOptions.body.constructor !== Object) {
            let paymentOptions: any = apiOptions.body;
            endPoint = `${apiOptions.endpoint}?amount=${paymentOptions.amount}&cccard=${paymentOptions.cccard}&month=${paymentOptions.month}&year=${paymentOptions.year}&cvv=${paymentOptions.cvv}&billReferenceNumber=${paymentOptions.billReferenceNumber}&paymentToken=${paymentOptions.paymentToken}&useTokenisedCard=true`;
        }

        return this._http.request(endPoint, requestOptions)
            .map((response) => apiOptions.isJson ?
                response.json() :
                response.text());
    }

    public postBody<T>(apiOptions: ApiModel.ApiRequestOptions): Observable<T> {
        let requestOptions = {};
        let currentHost = this._config.getEnvironmentName();
        let isLocalHost = (currentHost === 'localhost:8080' || currentHost === 'localhost');
        let endPoint = `${apiOptions.endpoint}`;

        requestOptions = new RequestOptions({
            method: RequestMethod.Post,
            body: apiOptions.body,
            headers: this.commonHeaders(),
            withCredentials: true,
        });

        return this._http.request(endPoint, requestOptions)
            .map((response) => apiOptions.isJson ?
                response.json() :
                response.text());
    }

    private commonHeaders(): Headers {
        return new Headers({
            'Authorization': `Bearer ${this._tokenProvider.getToken()}`,
            'X-Correlation-Id': Guid.newGuid()
        });
    }
}
