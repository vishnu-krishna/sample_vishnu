
/*
    NOTE:
    This file does not live inside the Angular application, and is not processed by WebPack.

    Do not use of the ` character as it is not supported by versions of IE.

*/

var getTransformedConfig = function () {
    var config = {
        aglSiteCoreWebsiteBaseUrl: '#{config-aglSiteCoreWebsiteBaseUrl}',
        aglWebApiBaseUrl: '#{config-aglWebApiBaseUrl}',
        aglRedLineApiBaseUrl: '#{config-aglRedLineApiBaseUrl}',
        aglSettingsApiBaseUrl: '#{config-aglSettingsApiBaseUrl}',
        aglProductApiBaseUrl: '#{config-aglProductApiBaseUrl}',
        aglMoveAndJoinApiUrl: '#{config-aglMoveAndJoinApiUrl}',
        aglStoredPaymentApi: '#{config-aglStoredPaymentApi}',
        solarCheckApiBaseUrl: '#{config-solarCheckApiBaseUrl}',
        aglPaymentSchemeApi: '#{config-aglPaymentSchemeApi}',
        aglConcessionApiBaseUrl: '#{config-aglConcessionApiBaseUrl}',
        aglHomeProfileApi: '#{config-aglHomeProfileApi}',
        aglRewardsApiBaseUrl: '#{config-aglRewardsApiBaseUrl}',
        aglPersonalisationApiBaseUrl: '#{config-aglPersonalisationApiBaseUrl}',
        aglDecisioningApiUrl: '#{config-aglDecisioningApiUrl}',
        aglEnergyInsightsApiBaseUrl: '#{config-aglEnergyInsightsApiBaseUrl}',
        isPilotBannerCollapsedKey: 'selfService.isPilotBannerCollapsed',
        betaSitePreferenceKey: 'AGL_beta_site_login',
        bearerTokenCookieName: 'bearer',
        sitecoreApiBaseUrl: '/sitecore/api/ssc/item/',
        sitecoreBaseContentPath: '/sitecore/content/AGL/Home/Apps',
        fileBaseContentPath: '/Apps/dist',
        aglWebApiSyncPollingIntervalMs: '#{config-aglWebApiSyncPollingIntervalMs}',
        aglWebApiSyncPollingTimeOutMs: '#{config-aglWebApiSyncPollingTimeOutMs}',
        aglPalPalApiBaseUrl: '#{config-aglPalPalApiBaseUrl}',
        aglPayPalTokenUrl: '#{config-aglPayPalTokenUrl}',
        splunkUrl: '#{config-splunkUrl}',
        splunkApplicationKey: '#{config-splunkApplicationKey}',
        logProvider: "Sitecore",
        aglWebPaymentApiBaseUrl: '#{config-aglWebPaymentApiBaseUrl}',
        leanEngageAppId: '#{config-leanEngageAppId}',
        leanEngageTrackerAppId: '#{config-leanEngageTrackerAppId}',
        PCIDSSURL: '#{config-PCIDSSURL}',

        loginDetailsBaseUrl: '#{config-loginDetailsBaseUrl}',
        showLoadingModalAfterMs: '#{config-showLoadingModalAfterMs}',
        aglAeoWarmUpDelayMs: '#{config-aglAeoWarmUpDelayMs}',
        aglRewardsExternalBaseUrl: '#{config-aglRewardsExternalBaseUrl}',

        isE2eTestMode: function() {
            return false;
        },
    };

    // Loop through all properties and check
    for (var property in config) {
        var propertyValue= config[property].toString();
        if (propertyValue.indexOf('#{') === 0) {
            console.error('Environment config setting ' + property + ' has not been configured for this environment.');
        }
    }

    return config;
}
