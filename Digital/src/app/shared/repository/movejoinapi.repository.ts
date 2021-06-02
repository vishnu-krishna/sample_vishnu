import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ConfigService } from '../../shared/service/config.service';
import { Guid } from '../../shared/utils/guid';
import { AglAuthTokenProvider } from './aglAuthTokenProvider';
import { IMoveJoinRepository } from './contract/imovejoin.repository';

@Injectable()
export class MoveJoinApiRepository implements IMoveJoinRepository {
    public errors = new Subject();
    public authorizationError = new Subject();
    protected _baseUrl: string;
    protected _authorizationBearerToken: string;

    constructor(
        protected _http: Http,
        protected _config: ConfigService,
        _tokenProvider: AglAuthTokenProvider) {
        this._baseUrl = `${this._config.current.aglMoveAndJoinApiUrl}/v2`;
        let token: string;
        token = _tokenProvider.getToken();
        if (token) { this._authorizationBearerToken = token; }
    }

    public get<T>(endpoint: string): Observable<T> {
        let requestOptions = {};
        let headers = new Headers();
        let url = `${this._baseUrl}${endpoint}`;
        headers.append('Authorization', `Bearer ${this._authorizationBearerToken}`);
        headers.append('X-Correlation-Id', Guid.newGuid());
        requestOptions = new RequestOptions({
            headers: headers,
            method: RequestMethod.Get,
            withCredentials: false
        });

        return this._http.get(url, requestOptions)
            .catch((err) => {
                console.log(`An error occured on ${endpoint}: error:${JSON.stringify(err.json())}`);
                this.errors.next(err);
                if (err.status === 401) {
                    let currentHost = this._config.getEnvironmentName();
                    let isLocalHost = (currentHost === 'localhost:8080' || currentHost === 'localhost');

                    // Don't redirect a local site.
                    if (isLocalHost) {
                        console.warn('You\'re getting a 401 unauthorised call, please make sure you are either mocking data or have a token for the API.');
                    } else {
                        // window.location.href = `https://${currentHost}/aeo/home/login`;
                        this.authorizationError.next(err);
                    }
                }
                return Observable.throw(null);
            })
            .map((response) => response.json());
    }
}
