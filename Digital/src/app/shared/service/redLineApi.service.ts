import { Injectable }                                   from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions } from '@angular/http';
import { Observable }                                   from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subject }                                      from 'rxjs/Subject';
import { ConfigService } from './config.service';
import { IRedLineApiService } from './contract/iredlineapi.service';

@Injectable()
export class RedLineApiService implements IRedLineApiService {

    public errors = new Subject();

    private _authorizationBearerToken;
    private _bearerTokenStorageKey = 'Bearer';
    private _baseUrl: string;
    private _cache: Object = {};

    constructor(private _http: Http, private _config: ConfigService) {
        this._baseUrl = this._config.current.aglRedLineApiBaseUrl;
        let token = sessionStorage.getItem(this._bearerTokenStorageKey);
        if (token) { this._authorizationBearerToken = token; }
    }

    /**
     * Retrieves bill printDoc mappings for the given contract number
     * @param  {string}                         contractNumber A contract number
     * @return {Observable<PrintDocMappings[]>}                An array of bill printDoc mappings
     */
    public getBillsForContract(contractNumber: string): Observable<PrintDocMappings[]> {
        return this.getOrMock<PrintDocMappings[]>(`/v1/bills/contract/${contractNumber}`, false);
    }

    /**
     * Obtains the URL of a bill PDF given its print document ID and the contract account it pertains to.
     * @param  {string}             contractAccount The Contract Account
     * @param  {string}             printDocId      The PrintDoc ID
     * @return {Observable<string>}                 A URL
     */
    public getBillPdfUrl(contractAccount: string, printDoc: string): Observable<string> {
        return this.getOrMock<string>(`/v1/bills/pdf/${contractAccount}/${printDoc}`, true); // .delay(4000);
    }

    private getOrMock<T>(endpoint: string, useCache: boolean): Observable<T> {

        // console.log('getOrMock 01', endpoint);

        let endpointKey = endpoint.replace(new RegExp('^/(v1/)?'), '');
        // console.log('getOrMock 02', endpointKey);

        if (useCache) {
            // console.log('getOrMock 02a about to look in _cache for', endpointKey);
            let cachedObservable = this._cache[endpointKey];
            // console.log('getOrMock 02b ok');
            if (cachedObservable) {
                // console.log('getOrMock 03 returning observable from cache');
                return cachedObservable;
            }
        }
        // console.log('getOrMock 04 cache miss');

        let mockStorageKeyInline = `selfService.mock.redline.${endpointKey}:data`;
        // console.log('getOrMock 05 mockStorageKeyInline', mockStorageKeyInline);

        let mockDataInline = localStorage.getItem(mockStorageKeyInline);
        // console.log('getOrMock 06 mockDataInline', mockDataInline);

        if (mockDataInline) {
            let observable: Observable<T> = Observable.of(JSON.parse(mockDataInline));
            this._cache[endpointKey] = observable;
            // console.log('getOrMock 07 returning observable built from mockDataInline');
            return observable;
        }

        let mockStorageKeyError = `selfService.mock.redline.${endpointKey}:error`;
        // console.log('getOrMock 07a mockStorageKeyInline', mockStorageKeyInline);

        let mockErrorData = localStorage.getItem(mockStorageKeyError);
        // console.log('getOrMock 07b mockDataInline', mockDataInline);

        if (mockErrorData) {
            // console.log('getOrMock 0c returning observable that will error');
            return Observable.throw(mockErrorData);
        }

        let url;

        let mockStorageKey = `selfService.mock.redline.${endpointKey}:file`;
        // console.log('getOrMock 08 mockStorageKey', mockStorageKey);

        let mockDataFile = localStorage.getItem(mockStorageKey);
        // console.log('getOrMock 09 mockDataFile', mockDataFile);

        let currentApi = this._config.current.aglWebApiBaseUrl;
        // console.log('getOrMock 10 currentApi', currentApi);

        let fileBase = this._config.current.fileBaseContentPath;
        // console.log('getOrMock 11 fileBase', fileBase);

        let mockFileUrl = `/_mockData/redLineApi/${endpointKey}/${mockDataFile}.json`;
        // console.log('getOrMock 12 mockFileUrl', mockFileUrl);

        if (currentApi !== '/webpack-mock-api') {
            mockFileUrl = fileBase + `/_mockData/redLineApi/${endpointKey}/${mockDataFile}.json`;
            // console.log('getOrMock 13 mockFileUrl', mockFileUrl);
        }

        if (mockDataFile) {
            console.warn(`Mock data "${endpoint}" is set to ${mockDataFile}. To disable, clear local storage flag "${mockStorageKey}"`);
            url = mockFileUrl;
            // console.log('getOrMock 14 url', url);
        } else {
            // todo: check trailing slash, add if missing
            url = `${this._baseUrl}${endpoint}`;
            // console.log('getOrMock 15 url', url);
        }

        let options = new ApiRequestOptions(url);
        options.isJson = true;
        options.useCache = true;

        let observable$ = this.get<T>(options);

        // console.log('getOrMock 16 returned from get<T>');

        this._cache[endpointKey] = observable$;

        return observable$;
    }

    /**
     * Invoke an HTTP GET request to the AGL Web API.
     */
    private get<T>(apiOptions: ApiRequestOptions): Observable<T> {

        let requestOptions = {};

        if (this._authorizationBearerToken) {
            let headers = new Headers({ Authorization: `Bearer ${this._authorizationBearerToken}` });
            requestOptions = new RequestOptions({
                method: RequestMethod.Get,
                headers: headers,
                withCredentials: true
            });
        }

        // console.log('get<T> 01 endpoint', apiOptions.endpoint);

        return this._http.request(apiOptions.endpoint, requestOptions)
            .catch((err) => {
                // console.log('get<T> 02 error', err);
                this.errors.next(err);
                // Unauthorised
                if (err.status === 401) {
                    window.location.href = this._config.getEnvironmentLogoutUrl;
                }
                return Observable.throw(err.json());
            })
            .map((response) => {
                // console.log('get<T> 03 response', response.json());
                let rs = apiOptions.isJson ? response.json() : response.text();
                // console.log('getT 19 ajax rq ok returning', rs);
                return rs;
            });
    }
}

export class PrintDocMappings {
    public FxPrintDoc: string;
    public SapPrintDoc: string;
}

class ApiRequestOptions {
    public endpoint: string;
    public isJson: boolean = true;
    public useCache: boolean = true;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }
}
