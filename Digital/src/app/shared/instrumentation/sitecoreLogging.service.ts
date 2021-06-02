import { Injectable }                    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { ConfigService }                 from '../service/config.service';
import { LoggerInterface, LogType }      from './logger.interface';

/**
 * Logs to sitecore default logging location.
 *
 * @export
 * @class SitecoreLoggingService
 */
@Injectable()
export class SitecoreLoggingService extends LoggerInterface {
    constructor(
      private _http: Http,
      private _config: ConfigService) {
      super();
    }

    public log(message: string, logType: LogType, ...optionalParams: any[]) {
      // debugger;
      let concatenatedOptionalParams = this.concatenateOptionalParamsIntoString(optionalParams);

      let sitecoreLogType: string = this.mapLogTypeToSitecoreLogType(logType);
      let body = JSON.stringify({ message: `${message} ${concatenatedOptionalParams}`.trim(), logType: sitecoreLogType });
      let headers = new Headers({ 'Content-Type': 'application/json' });

      let requestOptions = new RequestOptions({
          headers: headers,
          withCredentials: true
        });

      let siteCoreUrl = this._config.current.aglSiteCoreWebsiteBaseUrl;

      this._http.post(`${siteCoreUrl}/svc/app/log`, body, requestOptions)
          .subscribe({
           error: (error) => console.error(error)
         });
    }
  /**
   * Maps from the LogType to sitecore log types defined in .NET Type SiteCoreLogType
   * @param  {LogType} logType
   * @return {string}          string representation of the .NET SiteCoreLogType
   */
    private mapLogTypeToSitecoreLogType(logType: LogType): string {
      let returnValue: string = null;
      switch ( logType ) {
          case LogType.ALL :
            returnValue = 'Audit';
            break;
          case LogType.DEBUG :
            returnValue = 'Debug';
            break;
          case LogType.INFO :
            returnValue = 'Info';
            break;
          case LogType.WARN :
            returnValue = 'Warning';
            break;
          case LogType.ERROR :
            returnValue = 'Error';
            break;
          case LogType.FATAL :
            returnValue = 'Fatal';
            break;
          default :
            returnValue = 'Error';
            break;
        }
      return returnValue;
    }
}
