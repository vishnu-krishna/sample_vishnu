import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ApiErrorCode } from '../model/domain/resultWrapper/apiErrorCode.enum';
import { ConfigService } from '../service/config.service';

export class SettingApiRepository {

    public errors = new Subject();

    protected _authorizationBearerToken: string;
    protected _baseUrl: string;
    protected _bearerTokenStorageKey: string = 'Bearer';
    protected _cache: Object = {};

    constructor(protected _http: Http, protected _config: ConfigService) {

    }

    public get<T>(endpoint: string): Observable<T> {

        return this._http.get(endpoint)
            .catch((err) => {
                console.log(`An error occured on ${endpoint}: error:${JSON.stringify(err.json())}`);
                this.errors.next(err);

                // Unauthorised
                if (err.status === 401) {
                    window.location.href = this._config.getEnvironmentLogoutUrl;
                } else if (err.status === 500) {
                    console.error('Internal server error');
                }
                return Observable.throw(err.json());
            })
            .map((response) => response.json());
    }
    public post<T>(endpoint: string): Observable<T> {

        return this._http.get(endpoint)
            .catch((err) => {
                console.log(`An error occured on ${endpoint}: error:${JSON.stringify(err.json())}`);
                this.errors.next(err);
                let errMsg: string;

                // Unauthorised
                if (err.status === 401) {
                    window.location.href = this._config.getEnvironmentLogoutUrl;
                    errMsg = err.json();
                } else {
                    errMsg = err.message ? ApiErrorCode.result[err.message] : err.toString();
                }
                return Observable.throw(errMsg);
            })
            .map((response) => response.json());
    }
}
