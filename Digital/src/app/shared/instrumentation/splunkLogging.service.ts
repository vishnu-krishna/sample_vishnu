import { Injectable }                         from '@angular/core';
import { Headers, Http, RequestOptions }      from '@angular/http';
import 'rxjs/Rx';
import { ConfigService }                      from '../service/config.service';
import { LoggerInterface, LogType }           from './logger.interface';

/**
 * Logs to our splunk instance.
 *
 * @export
 * @class SplunkService
 */
@Injectable()
export class SplunkLoggingService extends LoggerInterface {
    constructor(
        private _http: Http,
        private _config: ConfigService) {
        super();
    }

    public log(message: string, logType: LogType, ...optionalParams: any[]) {

        let concatenatedOptionalParams = this.concatenateOptionalParamsIntoString(optionalParams);

        let headers = new Headers({ 'Authorization': `Splunk ${this._config.current.splunkApplicationKey}`, 'Content-Type': 'application/json' });

        let requestOptions = new RequestOptions({
            headers: headers
        });

        let body = JSON.stringify({ event: `${message} ${concatenatedOptionalParams}`.trim() });

        this._http.post(this._config.current.splunkUrl, body, requestOptions)
            .map((r) => r.json())
            .subscribe((r) => r);
    }
}
