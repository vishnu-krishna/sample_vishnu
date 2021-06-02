import { Injectable }                         from '@angular/core';
import { LoggerInterface, LogType }           from './logger.interface';

/**
 * Logs to console.
 *
 * @export
 * @class ConsoleLoggingService
 */
@Injectable()
export class ConsoleLoggingService extends LoggerInterface {
    constructor() {
      super();
    }

    public log(message: string, logType: LogType, ...optionalParams: any[]) {
      switch ( logType ) {
        case LogType.ALL :
          console.log(message, optionalParams);
          break;
          /* tslint:disable */
        case LogType.DEBUG :
          console.debug(message, optionalParams);
          break;
        case LogType.INFO :
          console.info(message, optionalParams);
          break;
        /* tslint:enable */
        case LogType.WARN :
          console.warn(message, optionalParams);
          break;
        case LogType.ERROR :
          console.error(message, optionalParams);
          break;
        case LogType.FATAL :
          console.error(message, optionalParams);
          break;
        default:
          console.log(message, optionalParams);
          break;
      }
    }
}
