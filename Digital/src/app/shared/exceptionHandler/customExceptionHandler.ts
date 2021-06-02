import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerInterface, LogType } from '../instrumentation/logger.interface';

/**
 * Centralised error handler
 *
 * @export
 * @class CustomExceptionHandler
 * @extends {ErrorHandler}
 */
@Injectable()
export class CustomExceptionHandler extends ErrorHandler {

    constructor(private _logger: LoggerInterface) {
      super();
    }

    public handleError(error: any): void {
      try {
        this._logger.log('CustomExceptionHandler:', LogType.FATAL, error);
      } finally {
        super.handleError(error);
      }
    }
}
