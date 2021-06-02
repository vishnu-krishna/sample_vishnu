import { Http }                       from '@angular/http';
import { ConsoleLoggingService }      from '../instrumentation/consoleLogging.service';
import { SitecoreLoggingService }     from '../instrumentation/sitecoreLogging.service';
import { SplunkLoggingService }       from '../instrumentation/splunkLogging.service';
import { ConfigService, LogProvider } from '../service/config.service';
import { LoggerInterface }            from './logger.interface';

export let loggingServiceFactory = (http: Http, config: ConfigService) => {
    let logger: LoggerInterface;

    switch (config.current.logProvider) {
      case LogProvider.Sitecore:
        logger = new SitecoreLoggingService(http, config);
        break;
      case LogProvider.Splunk:
        logger = new SplunkLoggingService(http, config);
        break;
      default:
        logger = new ConsoleLoggingService();
        break;
    }
    return logger;
  };

export let loggingServiceProvider = {
    provide: LoggerInterface,
    useFactory: loggingServiceFactory,
    deps: [Http, ConfigService]
  };
