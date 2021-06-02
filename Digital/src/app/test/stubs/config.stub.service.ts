import { Injectable } from '@angular/core';
import { IConfig } from './../../shared/service/config.service';

@Injectable()
export class ConfigStubService {

    public current: IConfig;

    constructor() {
        this.current = Object.assign({
            aglWebApiBaseUrl: 'https://api.fake-agl-url.com',
            aglRedLineApiBaseUrl: 'https://redline-api.fake-agl-url.com',
            aglSettingsApiBaseUrl: 'https://settings-api.fake-agl-url.com',
            aglPaymentSchemeApi: 'https://aglPaymentSchemeApi.fake-agl-url.com',
            aglConcessionApiBaseUrl: 'https://aglConcessionApiBaseUrl.fake-agl-url.com',
            aglHomeProfileApi: 'https://aglHomeProfileApi.fake-agl-url.com',
            domainApiUrl: '',
            isPilotBannerCollapsedKey: '',
            betaSitePreferenceKey: '',
            bearerTokenCookieName: '',
            sitecoreApiBaseUrl: 'https://www.fake-agl-url.com',
            sitecoreBaseContentPath: '',
            fileBaseContentPath: '',
            aglWebApiSyncPollingIntervalMs: 1000,
            aglWebApiSyncPollingTimeOutMs: 60000,
            aglPalPalApiBaseUrl: '',
            aglPayPalTokenUrl: '',
            splunkUrl: '',
            splunkApplicationKey: '',
            logProvider: null,
            aglWebPaymentApiBaseUrl: '',
            leanEngageAppId: '',
            PCIDSSURL: '',
            showLoadingModalAfterMs: 30000,
            loginDetailsBaseUrl: '',
            aglRewardsExternalBaseUrl: 'https://www.aglrewards.com.au',
            isE2eTestMode: () => false
        });
    }

    public getEnvironmentName() {
        return 'localhost';
    }

}
