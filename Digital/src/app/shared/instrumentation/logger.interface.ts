export enum LogType {
    ALL = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5
}

export abstract class LoggerInterface {
    public abstract log(message: string, logType: LogType, ...optionalParams: any[]): void;

    /**
     * Convert optional parameters into their json representation and concatinate into a string
     * @param  {any[]}  ...optionalParams This is passed as an array with an array so we only ever work with the first array item
     * @return {string}                   [description]
     */
    public concatenateOptionalParamsIntoString(...optionalParams: any[]): string {
      let params = new Array<string>();
      if (optionalParams && optionalParams.length > 0) {
        let innerArray = optionalParams[0];
        if (innerArray && innerArray.length > 0) {
            innerArray.forEach(
                (param: any) => {
                  try {
                    if (param) {
                        params.push(JSON.stringify(param));
                    }
                  // tslint:disable-next-line:no-empty
                  } catch (exception) {}
                }
            );
          }
      }

      return (params && params.length > 0) ? params.join('\n ') : '';
    }
}
