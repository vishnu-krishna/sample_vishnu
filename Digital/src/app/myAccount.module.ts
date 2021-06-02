// modules
import { ApplicationRef, ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// non-package modules
import { MyAccountRoutingModule } from './myaccount-routing.module';
import { FeatureIntroModule } from './myAccount/featureIntro/featureIntro.module';
import { BillingModule } from './myAccount/modules/billing.module';
import { CommonComponentsModule } from './myAccount/modules/commonComponents.module';
import { CommonPipesModule } from './myAccount/modules/commonPipes.module';
import { ModalModule } from './myAccount/modules/modal.module';
import { MyAccountMaterialModule } from './myAccount/modules/my-account.material.module';
import { OmmTrackerModule } from './myAccount/modules/ommtracker.module';
import { OverviewModule } from './myAccount/modules/overview.module';
import { PaymentsModule } from './myAccount/modules/payments.module';
import { SettingsModule } from './myAccount/modules/settings.module';
import { GenericErrorImageModule } from './shared/component/genericError/genericErrorImage/genericErrorImage.module';
// app component
import { AppComponent } from './app.component';
// feature components
import { MyAccountComponent } from './myAccount/myAccount.component';
import { MyAccountUnauthorisedComponent } from './myAccount/myAccountUnauthorised.component';
// components
import { Angulartics2GoogleTagManager, Angulartics2Module } from 'angulartics2';
import { BillHistoryComponent } from './myAccount/billhistory/billhistory.component';
import { FooterComponent } from './myAccount/footer/footer.component';
import { HeaderAuthorisedComponent } from './myAccount/headerAuthorised/headerAuthorised.component';
import { HeaderUnauthorisedComponent } from './myAccount/headerUnauthorised/headerUnauthorised.component';
import { DesktopMenuComponent } from './myAccount/menu/desktopMenu.component';
import { MenuItemComponent } from './myAccount/menu/menuItem.component';
import { MobileMenuComponent } from './myAccount/menu/mobileMenu.component';
import { SubMenuItemComponent } from './myAccount/menu/subMenuItem.component';
import { BillsComponent } from './myAccount/pages/bills/bills.component';
import { ContactUsComponent } from './myAccount/pages/contact-us/contact-us.component';
import { AccountService, IAccountServiceMA } from './myAccount/services/account.service';
import { CcPaymentUrlService } from './myAccount/services/ccPaymentUrl.service';
import { PaygAccountService } from './myAccount/services/paygAccount.service';
import { SecondaryNavigationService } from './myAccount/services/secondaryNavigation.service';
import { TrackerChatService } from './myAccount/services/trackerChat.service';
import { GenericErrorComponent } from './shared/component/genericError/genericError.component';
import { ContentService } from './shared/service/content.service';
import { Now } from './shared/service/now.service';
import { ProductAttributesService } from './myAccount/services/productAttributesService';

import { MessageBarComponent } from './shared/component/messageBar/messageBar.component';
// providers and services
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { ISsmrService } from './myAccount/services/contract/issmr.service';
import { DecisioningApiService } from './myAccount/services/decisioningApi/decisioningApi.service';
import { EventService } from './myAccount/services/event.service';
import { FeatureFlagService } from './myAccount/services/featureFlag.service';
import { PaymentService } from './myAccount/services/payment.service';
import { AglAuthTokenProvider } from './shared/repository/aglAuthTokenProvider';
import { ApiService } from './shared/service/api.service';
import { ConfigService } from './shared/service/config.service';
import { IApiService } from './shared/service/contract/iapi.service';
import { CookieService } from './shared/service/cookie.service';
import { DataLayerService } from './shared/service/dataLayer.service';
import { DeviceDetectorService } from './shared/service/deviceDetector.service';
import { DocumentService } from './shared/service/document.service';
import { EmailReceiptService } from './shared/service/email.receipt.service';
import { InputEventHelperService } from './shared/service/inputEventHelper.service';
import { JwtDecoderService } from './shared/service/jwt.decoder.service';
import { PaypalApiService } from './shared/service/paypalApi.service';
import { RedLineApiService } from './shared/service/redLineApi.service';
import { UsageRenderingService } from './shared/service/usageRendering.service';
import { PaymentValidators }      from './shared/validators/paymentValidators';
import { HomeProfileNavigationService, HomeProfileUrls } from './myAccount/pages/settings/homeProfile/homeProfileNavigation.service';
import { HomeProfileEligibilityService } from './myAccount/pages/settings/homeProfile/homeProfileEligibility.service';
import { DeepLinkRoutingGuard } from './deepLinkRouting.guard';
import { DisableProductionGuard } from './disableProduction.guard';
import { OmmTrackerGuard } from './myAccount/ommtracker/ommTracker.guard';
import { PaymentExtensionRoutingGuard } from './myAccount/pages/bills/paymentAssistance/extend/paymentExtensionRouting.guard';
import { NotificationsRoutingGuard } from './myAccount/pages/settings/notifications/notificationsRouting.guard';
import { HomeProfileRoutingGuard } from './myAccount/pages/settings/homeProfile/homeProfileRouting.guard';
import { OffersRoutingGuard } from './myAccount/pages/settings/offers/offers-routing.guard';
import { IDecisioningService } from './myAccount/services/contract/idecisioning.service';
import { DecisioningService } from './myAccount/services/decisioning.service';
import { SsmrService } from './myAccount/services/ssmr.service';
import { AglValidators } from './shared/validators/aglValidators';
// Directives
import { ClickOnEnterDirective } from './shared/directives/clickOnEnter.directive';
import { CurrencyFieldDirective } from './shared/directives/currencyField.directive';
import { ExpiryDateMaskDirective } from './shared/directives/expiryDateMask.directive';

import { ProgressHttpModule } from 'angular-progress-http';
import { MockIdentityComponent } from './myAccount/mockManager/mockIdentity.component';
import { MockIndex } from './myAccount/mockManager/mockIndex';
import { SSMRModule } from './myAccount/modules/ssmr.module';
import { IDecisioningApiService } from './myAccount/services/contract/idecisioningApi.service';
import { ISolarCheckService } from './myAccount/services/contract/isolarCheck.service';
import { SettingsService } from './myAccount/services/settings/settings.service';
import { ISettingsService } from './myAccount/services/settings/settings.service.interface';
import { SolarCheckService } from './myAccount/services/solarCheck.service';
import { SurveyService } from './myAccount/services/survey.service';
import { CustomExceptionHandler } from './shared/exceptionHandler/customExceptionHandler';
import { loggingServiceProvider } from './shared/instrumentation/loggingService.provider';
import { ApiRepository } from './shared/repository/api.repository';
import { Apiv2Repository } from './shared/repository/apiv2.repository';
import { IApiRepository } from './shared/repository/contract/iapi.repository';
import { IApiv2Repository } from './shared/repository/contract/iapiv2.repository';
import { IMoveJoinRepository } from './shared/repository/contract/imovejoin.repository';
import { IPaymentApiRepository } from './shared/repository/contract/ipaymentapi.repository';
import { IProductRepository } from './shared/repository/contract/iproduct.repository';
import { ISolarCheckRepository } from './shared/repository/contract/isolarCheck.repository';
import { DecisioningApiRepository } from './shared/repository/decisioningapi.repository';
import { MoveJoinApiRepository } from './shared/repository/movejoinapi.repository';
import { PaymentApiRepository } from './shared/repository/payment.api.repository';
import { ProductApiRepository } from './shared/repository/product.repository';
import { SolarCheckRepository } from './shared/repository/solarCheck.repository';
import { IEligibilityService } from './shared/service/contract/ieligibility.service';
import { IMessageBusService } from './shared/service/contract/imessageBus.service';
import { IMoveJoinApiService } from './shared/service/contract/imoveJoinApi.service';
import { IPricingInfoService } from './shared/service/contract/ipricinginfo.service';
import { IProductApiService } from './shared/service/contract/iproductApi.service';
import { IRateFactGroupService } from './shared/service/contract/iratefactgroup.service';
import { IUsageService } from './shared/service/contract/iusage.service';
import { IUsageRenderingService } from './shared/service/contract/iusageRendering.service';
import { IWebService } from './shared/service/contract/iweb.service';
import { EligibilityService } from './shared/service/eligibility.service';
import { MessageBusService } from './shared/service/messageBus.service';
import { MoveJoinApiService } from './shared/service/moveJoinApi.service';
import { PricingInfoService } from './shared/service/pricingInfo.service';
import { ProductApiService } from './shared/service/productApi.service';
import { RateFactGroupService } from './shared/service/rateFactGroup.service';
import { UsageService } from './shared/service/usage.service';
import { UserInfoService } from './shared/service/userInfo/userInfo.Service';
import { IUserInfoService } from './shared/service/userInfo/userInfo.service.interface';
import { WebService } from './shared/service/web.service';

import { MauiSecondaryNavigationModule } from './myAccount/maui/secondaryNavigation/index';
import { RewardsEligibilityModule } from './myAccount/rewards';
import { SettingsApi } from './myAccount/services/settings/settingsApi.service';
import { ISettingsApi } from './myAccount/services/settings/settingsApi.service.interface';
import { SessionService } from './shared/service/session.service';
// Entry components (These live at this level so they're loaded immediately.)
// This is not sane, see https://github.com/angular/angular/issues/14324
import { FailedLoadingComponent } from './myAccount/dashboard/failedloading/failed.loading.component';
import { PaymentExtensionEligibilityModule } from './myAccount/pages/bills/paymentAssistance/extend/eligibility/paymentExtensionEligibility.module';
import { IPaymentExtensionStateService, PaymentExtensionStateService } from './myAccount/pages/bills/paymentAssistance/extend/services/paymentExtensionState.service';
import { PaymentAssistanceModule } from './myAccount/pages/bills/paymentAssistance/paymentAssistance.module';
import { ContactDetailsStateService, IContactDetailsStateService } from './myAccount/pages/settings/contactDetails/contactDetailsState.service';
import { IAuthenticationEventService } from './myAccount/services/contract/iauthenticationEvent.service';
import { AuthenticationEventService } from './myAccount/services/decisioningApi/authenticationEvent.service';
import { MonthlyBillingService } from './myAccount/services/monthlyBilling.service';
import { IPaymentExtensionApplication, PaymentExtensionApplicationService } from './myAccount/services/paymentScheme/paymentExtensionApplication.service';
import { IPaymentSchemeApi, PaymentSchemeApiService } from './myAccount/services/paymentScheme/paymentSchemeApi.service';
import { UrlService } from './myAccount/services/url.service';
import { IUrlService } from './myAccount/services/contract/iurl.service';
import { MonthlyBillingWelcomeRoutingGuard } from './myAccount/pages/settings/monthlyBilling/welcome/monthlyBillingWelcome.guard';
import { PaymentExtensionWelcomeModule } from './myAccount/pages/bills/paymentAssistance/extend/welcome/paymentExtensionWelcome.module';
import { NotificationsModule } from './myAccount/pages/settings/notifications/notifications.module';
import { IPaymentArrangementStateService, PaymentArrangementStateService } from './shared/component/paymentArrangement/paymentArrangementState.service';
import { IFeatureFlagService } from './myAccount/services/contract/ifeatureflag.service';
import { ConcessionApiService, IConcessionApi } from './myAccount/services/concession/concessionApi.service';
import { ConcessionStatusService, IConcessionStatusService } from './myAccount/pages/settings/concession/services/concessionStatus.service';
import { AuthInterceptor } from './myAccount/interceptors/auth.interceptor';
import { CorrelationIdInterceptor } from './myAccount/interceptors/correlationId.interceptor';
import { EnergyInsightsInfoModule } from './myAccount/pages/energyInsightsInfo/energyInsightsInfo.module';
import { registerLocaleData } from '@angular/common';
import localEnAu from '@angular/common/locales/en-AU';
import { Locale } from './shared/globals/localisation';
import { InstalmentPlanService } from './myAccount/services/paymentScheme/instalmentPlan.service';
import { MockIdentityStorageService } from './myAccount/mockManager/mockIdentityStorage.service';
import { BillDescriptionService } from './myAccount/services/billDescription.service';

// set default locale
registerLocaleData(localEnAu);

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        MyAccountComponent,
        BillsComponent,
        BillHistoryComponent,
        ContactUsComponent,
        DesktopMenuComponent,
        MobileMenuComponent,
        MenuItemComponent,
        HeaderAuthorisedComponent,
        HeaderUnauthorisedComponent,
        FooterComponent,
        SubMenuItemComponent,
        GenericErrorComponent,
        MessageBarComponent,
        ClickOnEnterDirective,
        MockIdentityComponent,
        FailedLoadingComponent,
        ExpiryDateMaskDirective,
        CurrencyFieldDirective,
        MyAccountUnauthorisedComponent,
    ],
    imports: [
        BrowserModule,
        CommonComponentsModule,
        CommonPipesModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        ModalModule,
        MyAccountRoutingModule,
        BillingModule,
        NotificationsModule,
        MyAccountMaterialModule,
        Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ]),
        SettingsModule,
        OverviewModule,
        PaymentsModule,
        BrowserAnimationsModule,
        SSMRModule,
        OmmTrackerModule,
        ProgressHttpModule,
        RewardsEligibilityModule,
        GenericErrorImageModule,
        FeatureIntroModule,
        MauiSecondaryNavigationModule,
        PaymentExtensionEligibilityModule,
        PaymentExtensionWelcomeModule,
        PaymentAssistanceModule,
        EnergyInsightsInfoModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: Locale.AUSTRALIA },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CorrelationIdInterceptor, multi: true },
        { provide: ISolarCheckService, useClass: SolarCheckService },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: 'AppContentBranch', useValue: 'selfService' },
        ConfigService,
        { provide: IAccountServiceMA, useClass: AccountService },
        loggingServiceProvider,
        { provide: ErrorHandler, useClass: CustomExceptionHandler },
        ContentService,
        ApiService,
        { provide: IApiService, useExisting: ApiService },
        CookieService,
        SessionService,
        AglAuthTokenProvider,
        { provide: IFeatureFlagService, useClass: FeatureFlagService },
        Now,
        DeviceDetectorService,
        EventService,
        PaypalApiService,
        EmailReceiptService,
        DocumentService,
        CcPaymentUrlService,
        InputEventHelperService,
        ProductAttributesService,

        { provide: ISolarCheckRepository, useClass: SolarCheckRepository },
        { provide: IRateFactGroupService, useClass: RateFactGroupService },
        { provide: IPricingInfoService, useClass: PricingInfoService },
        { provide: IWebService, useClass: WebService },
        { provide: IMessageBusService, useClass: MessageBusService },
        { provide: IApiRepository, useClass: ApiRepository },
        { provide: IPaymentApiRepository, useClass: PaymentApiRepository },
        { provide: IUsageService, useClass: UsageService },
        { provide: IUsageRenderingService, useClass: UsageRenderingService },
        { provide: ISettingsService, useClass: SettingsService },
        { provide: ISettingsApi, useClass: SettingsApi },
        { provide: IUserInfoService, useClass: UserInfoService },
        { provide: IApiv2Repository, useClass: Apiv2Repository },
        { provide: IProductRepository, useClass: ProductApiRepository },
        { provide: IProductApiService, useClass: ProductApiService },
        { provide: IEligibilityService, useClass: EligibilityService },
        { provide: IMoveJoinApiService, useClass: MoveJoinApiService },
        { provide: IMoveJoinRepository, useClass: MoveJoinApiRepository },
        { provide: IPaymentArrangementStateService, useClass: PaymentArrangementStateService },
        { provide: IPaymentSchemeApi, useClass: PaymentSchemeApiService },
        { provide: IDecisioningApiService, useClass: DecisioningApiService },
        { provide: IAuthenticationEventService, useClass: AuthenticationEventService },
        DecisioningApiRepository,
        MockIndex, /* Used by MockManager and MockIdentity to get a list of BPs from a json file _directory.json */
        RedLineApiService,
        PaymentValidators,
        UsageRenderingService,
        DataLayerService,
        JwtDecoderService,
        { provide: ISsmrService, useClass: SsmrService },
        AglValidators,
        PaygAccountService,
        SecondaryNavigationService,
        PaymentService,
        DeepLinkRoutingGuard,
        PaymentExtensionRoutingGuard,
        MonthlyBillingWelcomeRoutingGuard,
        DisableProductionGuard,
        OffersRoutingGuard,
        TrackerChatService,
        OmmTrackerGuard,
        HomeProfileRoutingGuard,
        HomeProfileEligibilityService,
        NotificationsRoutingGuard,
        SurveyService,
        { provide: IDecisioningService, useClass: DecisioningService },
        { provide: IContactDetailsStateService, useClass: ContactDetailsStateService },
        MonthlyBillingService,
        { provide: IPaymentExtensionApplication, useClass: PaymentExtensionApplicationService },
        { provide: IPaymentExtensionStateService, useClass: PaymentExtensionStateService },
        { provide: IUrlService, useClass: UrlService },
        { provide: IConcessionApi, useClass: ConcessionApiService },
        { provide: IConcessionStatusService, useClass: ConcessionStatusService },
        InstalmentPlanService,
        HomeProfileNavigationService,
        HomeProfileUrls,
        MockIdentityStorageService,
        BillDescriptionService
    ],
    entryComponents: [
        FailedLoadingComponent,
    ]
})
export class MyAccountModule {
    constructor(public appRef: ApplicationRef) {
        console.timeEnd(`main-to-bootstrapping`);
        console.time(`bootstrapping-to-dashboard-ngOnInit`);
        console.time(`bootstrapping-to-dashboard-ngAfterViewInit`);
        console.time(`bootstrapping-to-syncfinished`);
        console.time(`bootstrapping-to-dashboardHasAccounts`);
        console.time(`bootstrapping-to-dashboardCtor`);
    }
}
