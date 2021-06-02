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
        aglBillSmoothingApi: '#{config-aglBillSmoothingApi}',
        aglPaymentArrangementApi: '#{config-aglPaymentArrangementApi}',

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

        isE2eTestMode: function() {
            return false;
        },
    };

    return config;
}
