import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ProgressHttp } from 'angular-progress-http';
import { ConfigService } from '../../shared/service/config.service';
import { Guid } from '../../shared/utils/guid';
import * as ApiModel            from '../model/api.model';
import { Apiv2Repository } from '../repository/apiv2.repository';
import { IMessageBusService } from '../service/contract/imessageBus.service';
import { SessionService } from '../service/session.service';
import { AglAuthTokenProvider } from './aglAuthTokenProvider';

@Injectable()
export class DecisioningApiRepository extends Apiv2Repository {
    constructor(
            _http: Http,
            _config: ConfigService,
            _tokenProvider: AglAuthTokenProvider,
            progressHttp: ProgressHttp,
            sessionService: SessionService,
            messageBusService: IMessageBusService
    ) {
        super(_http, _config, _tokenProvider, progressHttp, sessionService, messageBusService);
        this._baseUrl = this._config.current.aglDecisioningApiUrl;
    }
    public get<T>(endpoint: string, useCache: boolean, isJson: boolean, parameters?: URLSearchParams): Observable<T> {
        return super.get(endpoint, useCache, isJson, parameters);
    }
    public post<T>(option: ApiModel.ApiV2RequestOptions): Observable<T> {
        option.guid = Guid.newGuid();
        return super.post(option);
    }
    public postForm<T>(apiOptions: ApiModel.ApiV2RequestOptions, formSubmissionData: FormData): Observable<T> {
        return super.postForm(apiOptions, formSubmissionData);
    }
}
