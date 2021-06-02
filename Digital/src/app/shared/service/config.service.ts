import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { IConfig } from './config.service';

// Import non-bundled .js file (./config/config.js) that contains our config
declare let getTransformedConfig: any;

// Native html object
declare let window: any;

@Injectable()
export class ConfigService {

    /**
     * Get config settings for the current environment.
     */
    public current: IConfig;

    constructor() {
        let env = this.getEnvironmentName();
        this.current = this.getConfigForEnvironment(env);
    }

    public getEnvironmentName() {
        return window.location.host;
    }

    public navigateToLoginWithReturnPath(path: string): void {
        const loginPage = this.formatSiteCoreLoginUrl(path);
        this.replaceWindowLocation(loginPage);
    }

    public navigateToRegisterWithReturnPath(path: string): void {
        const loginPage = this.formatSiteCoreLoginUrl(path, true);
        this.replaceWindowLocation(loginPage);
    }

    public replaceWindowLocation(newLocation: string) {
        window.location.replace(newLocation);
    }

    public get getEnvironmentLoginUrl() {
        return `${this.current.aglSiteCoreWebsiteBaseUrl}/sts/account/login`;
    }

    public get getEnvironmentLogoutUrl() {
        return `${this.current.aglSiteCoreWebsiteBaseUrl}/aeo/home/logout`;
    }

    // TODO: move into a NavigationService with other similar methods
    public routeWithParameters(router: Router, activatedRoute: ActivatedRoute, destinationRoute: String, queryParamsWhiteList: string[]): void {
        const allowedQueryParams: Params = Object.assign({}, ...queryParamsWhiteList
                                                                .filter((key: string) => !!activatedRoute.snapshot.queryParams[key])
                                                                .map((key: string) => ({ [key]: activatedRoute.snapshot.queryParams[key] })));

        let extra = {
            queryParams: allowedQueryParams
        };

        router.navigate([destinationRoute], extra);
    }

    public getForwardingRouteWithParameters(router: Router, activatedRoute: ActivatedRoute, destinationRoute: String, queryParamsWhiteList: string[]): string {
        const allowedQueryParams: Params = Object.assign({}, ...queryParamsWhiteList
                                                .filter((key: string) => !!activatedRoute.snapshot.queryParams[key])
                                                .map((key: string) => ({ [key]: activatedRoute.snapshot.queryParams[key] })));

        let extra = {
            queryParams: allowedQueryParams
        };

        const urlTree = router.createUrlTree([destinationRoute], extra);

        return router.serializeUrl(urlTree);
    }

    /**
     * Setup the configuration variables.
     * @param  {string} env the env
     * @return {Object}     the config
     */
    private getConfigForEnvironment(env: string): IConfig {

        // removeNonProdConfig() - This function will strip out on build-prod
        // release with webpack.
        function removeNonProdConfig() {

            let currentProcess = process.env.ENV;

            let baseConfig = {
                aglMockServerConfigBaseUrl: 'https://localhost:3456',
                aglWebApiBaseUrl: 'https://apiaglbauuat.api.agl.com.au',
                aglRedLineApiBaseUrl: 'https://uat-redline.digital.agl.com.au/api',
                aglSettingsApiBaseUrl: 'https://settings-api-agl-bauu-aus.azurewebsites.net/v2',
                // TODO: Confirm Energy Insights URL
                aglEnergyInsightsApiBaseUrl: 'https://energy-insights-api-agl-bauu-aus.azurewebsites.net/v2',
                aglProductApiBaseUrl: 'https://product.api.agl.com.au/v2',
                aglMoveAndJoinApiUrl: 'https://moveandjoin-api-agl-bautst-aus.azurewebsites.net',
                aglStoredPaymentApi: 'https://storedpayments-api-agl-bauu-aus.azurewebsites.net/v1',
                aglPaymentSchemeApi: 'base-config-value',
                aglConcessionApiBaseUrl: 'base-config-value',
                aglHomeProfileApi: 'https://homeprofiles-bauuat.api.agl.com.au',
                isPilotBannerCollapsedKey: 'selfService.isPilotBannerCollapsed',
                betaSitePreferenceKey: 'AGL_beta_site_login',
                bearerTokenCookieName: 'bearer',
                sitecoreApiBaseUrl: '/sitecore/api/ssc/item/',
                sitecoreBaseContentPath: '/sitecore/content/AGL/Home/Apps',
                fileBaseContentPath: '/Apps/dist',
                aglWebApiSyncPollingIntervalMs: 1000,
                aglWebApiSyncPollingTimeOutMs: 60000,
                aglPalPalApiBaseUrl: 'https://api.sandbox.paypal.com/v1/',
                aglPayPalTokenUrl: '/svc/paypal/GetSandboxToken',
                splunkUrl: 'https://azsaw0177.agl.int:8088/services/collector/event',
                splunkApplicationKey: 'F58C933B-7548-4957-A5B0-4ED755B08237',
                logProvider: LogProvider.Sitecore,
                aglWebPaymentApiBaseUrl: 'https://apipaymentdev.agl.com.au',
                leanEngageAppId: 'd9d00195-bbac-438b-907c-6d6c839ae11d',
                leanEngageTrackerAppId: '89a6d223-e90e-47e3-80e3-30d10cc4b550',
                PCIDSSURL: 'https://glawiwde3.agl.int/PCIDSSWeb_AEO/PCIDSS/creditcardnumbermyaccount',
                showLoadingModalAfterMs: 30000,
                solarCheckApiBaseUrl : 'https://solarcheck-api-dev.azurewebsites.net',
                aglRewardsApiBaseUrl: '',
                aglPersonalisationApiBaseUrl: '',
                loginDetailsBaseUrl: 'https://agl-identity-app-uat.azurewebsites.net',
                isE2eTestMode: () => !!localStorage.getItem('selfService.e2e'),
                aglAeoWarmUpDelayMs: 0,
                aglRewardsExternalBaseUrl: 'https://www.aglrewards.com.au'
            };

            let localhostConfig: IConfig = Object.assign({}, baseConfig, {
                // NOTE: These are fake base URL's, to allow the WebPack proxy to detect these and re-route to the node mock servers
                aglSiteCoreWebsiteBaseUrl: 'https://localhost:3456/siteCoreWebsite',
                aglWebApiBaseUrl: 'https://localhost:3456/aglWebApi',
                aglRedLineApiBaseUrl: 'https://localhost:3456/aglRedlineApi',
                aglMoveAndJoinApiUrl: `https://localhost:3456/aglMoveAndJoinApi`,
                aglSettingsApiBaseUrl: 'https://localhost:3456/aglSettingsApi',
                aglEnergyInsightsApiBaseUrl: 'https://localhost:3456/aglEnergyInsightsApi',
                aglProductApiBaseUrl: 'https://localhost:3456/aglProductApi',
                aglPaymentSchemeApi: 'https://localhost:3456/aglPaymentSchemeApi',
                aglHomeProfileApi: 'https://localhost:3456/aglHomeProfileApi',
                solarCheckApiBaseUrl: 'https://localhost:3456/aglSolarCheckApi',
                aglRewardsApiBaseUrl: 'https://localhost:3456/aglRewardsApi',
                aglPersonalisationApiBaseUrl: 'https://localhost:3456/aglPersonalisationApi',
                aglConcessionApiBaseUrl: 'https://localhost:3456/aglConcessionApi',
                aglDecisioningApiUrl: 'https://localhost:3456/aglDecisioningApi',
                aglStoredPaymentApi: 'https://storedpayments-api-agl-qtrt-aus.azurewebsites.net/v1',
                domainApiUrl: '/domainapi',
                PCIDSSURL: 'https://localhost:8080/pci-frame.html',
                logProvider: LogProvider.Console,
                aglRewardsExternalBaseUrl: 'https://www.aglrewards.com.au'
            });

            let envConfigs = {
                'localhost:3000': localhostConfig, // Unsure, leaving here just incase it is in use.
                // Comment out line below and run `yarn start disable-cors` to dev against hosted environment
                'localhost:8080': localhostConfig, // Local WebPack Development
                'localhost': localhostConfig,
            };

            // Fix for concurrent npm run test-ci failing due to port collision (Determine config based on NPM command rather than port)
            if ((currentProcess === 'test-ci') || (currentProcess === 'test') || (currentProcess === 'test-watch')) {
                return baseConfig;
            }

            // No URL based config was matched, so use the octopus config
            if (env && !envConfigs.hasOwnProperty(env.toLowerCase())) {
                return getTransformedConfig();
            }

            let config = envConfigs[env];
            return config;
        }

        function prodConfig() {
            return getTransformedConfig();
        }

        // Return type based on build.
        if (process.env.ENV === 'build:prod') {
            return prodConfig();
        } else {
            return removeNonProdConfig();
        }

    }

    private formatSiteCoreLoginUrl(path: string, register: boolean = false): string {
        const siteCoreUrl = this.current.aglSiteCoreWebsiteBaseUrl;
        const registerParameter = register ? 'register=true&' : '';
        const returnPathParameter = path ? `&returnPath=${encodeURIComponent(path)}` : '';
        const loginPage = `${siteCoreUrl}/sts/account/login?${registerParameter}returnApp=MyAccount${returnPathParameter}`;

        return loginPage;
    }
}

export enum LogProvider {
    Console,
    Splunk,
    Sitecore
}

export interface IConfig {
    aglMockServerConfigBaseUrl: string;
    aglWebApiBaseUrl: string;
    aglSiteCoreWebsiteBaseUrl: string; // Contains the URL of the sitecore website that this instance of myaccount uses (eg. myaccount.agl.com.au consumes www.agl.com.au)
    aglRedLineApiBaseUrl: string;
    aglPalPalApiBaseUrl: string;
    aglSettingsApiBaseUrl: string;
    aglProductApiBaseUrl: string;
    aglMoveAndJoinApiUrl: string;
    aglStoredPaymentApi: string;
    aglPaymentSchemeApi: string;
    aglConcessionApiBaseUrl: string;
    aglHomeProfileApi: string;
    aglDecisioningApiUrl: string;
    aglEnergyInsightsApiBaseUrl: string;
    isPilotBannerCollapsedKey: string;
    betaSitePreferenceKey: string;
    bearerTokenCookieName: string;
    sitecoreApiBaseUrl: string;
    sitecoreBaseContentPath: string;
    fileBaseContentPath: string;
    aglWebApiSyncPollingIntervalMs: number;
    aglWebApiSyncPollingTimeOutMs: number;
    splunkUrl: string;
    splunkApplicationKey: string;
    logProvider: LogProvider;
    aglWebPaymentApiBaseUrl: string;
    aglPayPalTokenUrl: string;
    leanEngageAppId: string;
    leanEngageTrackerAppId: string;
    PCIDSSURL: string;
    showLoadingModalAfterMs: number;
    solarCheckApiBaseUrl: string;
    aglRewardsApiBaseUrl: string;
    aglPersonalisationApiBaseUrl: string;
    loginDetailsBaseUrl: string;
    aglAeoWarmUpDelayMs: number; // A Delay (in milliseconds) to wait before calling the AEO warm up endpoints
    aglRewardsExternalBaseUrl: string;

    isE2eTestMode(): Boolean;
}
