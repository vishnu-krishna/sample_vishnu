/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '../../../../../src/app/myAccount/modules/overview.module';
import * as i2 from '../../../../node_modules/@angular/material/dialog/typings/index.ngfactory';
import * as i3 from '../../../../node_modules/@angular/material/datepicker/typings/index.ngfactory';
import * as i4 from '../../shared/component/paymentMethods/paymentMethods.creditCard.component.ngfactory';
import * as i5 from '../../shared/component/paymentMethods/addPaymentMethod.component.ngfactory';
import * as i6 from '../forms/storeCreditCardForm/storeCreditCardForm.component.ngfactory';
import * as i7 from '../forms/storeBankAccountForm/storeBankForm.component.ngfactory';
import * as i8 from '../forms/storePaypalForm/storePaypalForm.component.ngfactory';
import * as i9 from '../../shared/component/billSmoothingLearnMore/billSmoothingLearnMore.component.ngfactory';
import * as i10 from '../dashboard/solarCheck/solarCheckRegisterProcess/solarCheckRegisterProcess.component.ngfactory';
import * as i11 from '../pages/settings/solarCheck/systemDetails/updateProcess/solarCheckUpdateDetailsProcess.component.ngfactory';
import * as i12 from '@angular/common';
import * as i13 from '@angular/cdk/bidi';
import * as i14 from '@angular/platform-browser';
import * as i15 from '@angular/cdk/platform';
import * as i16 from '@angular/cdk/scrolling';
import * as i17 from '@angular/cdk/a11y';
import * as i18 from '@angular/cdk/observers';
import * as i19 from '@angular/cdk/overlay';
import * as i20 from '@angular/material/dialog';
import * as i21 from '@angular/material/icon';
import * as i22 from '@angular/http';
import * as i23 from '@angular/material/datepicker';
import * as i24 from '@angular/material/menu';
import * as i25 from '@angular/material/core';
import * as i26 from '@angular/forms';
import * as i27 from '../../../../../src/app/shared/service/interval.service';
import * as i28 from '../../../../../src/app/shared/validators/paymentValidators';
import * as i29 from '../../../../../src/app/shared/messages/alertMessages';
import * as i30 from '../../../../../src/app/myAccount/services/contract/ibusinessPartnerNumber.service';
import * as i31 from '../../../../../src/app/myAccount/services/businessPartnerNumber/businessPartnerNumber.service';
import * as i32 from '../../../../../src/app/shared/service/contract/iapi.service';
import * as i33 from '../../../../../src/app/myAccount/services/featureFlag.service';
import * as i34 from '../../../../../src/app/myAccount/services/account.service';
import * as i35 from '../../../../../src/app/shared/service/api.service';
import * as i36 from '../../../../../src/app/shared/service/redLineApi.service';
import * as i37 from '../../../../../src/app/myAccount/services/paygAccount.service';
import * as i38 from '../../../../../src/app/shared/instrumentation/logger.interface';
import * as i39 from '../../../../../src/app/shared/service/dataLayer.service';
import * as i40 from '../../../../../src/app/myAccount/services/settings/paymentMethods.service.interface';
import * as i41 from '../../../../../src/app/myAccount/services/productAttributesService';
import * as i42 from '../../../../../src/app/myAccount/services/contract/isolarCheckOffer.service';
import * as i43 from '../../../../../src/app/myAccount/services/solarCheckOffer.service';
import * as i44 from '../../../../../src/app/myAccount/services/contract/isolarCheck.service';
import * as i45 from '../../../../../src/app/myAccount/dashboard/solarCheck/solarCheckStatus/solarCheckStatusViewModelFactory';
import * as i46 from '../../../../../src/app/myAccount/dashboard/dashboard.component';
import * as i47 from '../../../../../src/app/shared/service/paypalApi.service';
import * as i48 from '../../../../../src/app/shared/service/config.service';
import * as i49 from '../../../../../src/app/shared/service/deviceDetector.service';
import * as i50 from '@angular/router';
import * as i51 from '../../../../../src/app/myAccount/modal/modal.service';
import * as i52 from '../../../../../src/app/shared/service/content.service';
import * as i53 from '../../../../../src/app/shared/service/now.service';
import * as i54 from '../../../../../src/app/myAccount/services/contract/issmr.service';
import * as i55 from '../../../../../src/app/myAccount/services/contract/iurl.service';
import * as i56 from '@angular/material/button';
import * as i57 from '@angular/material/card';
import * as i58 from '@angular/material/checkbox';
import * as i59 from '@angular/cdk/portal';
import * as i60 from '@angular/material/form-field';
import * as i61 from '@angular/material/input';
import * as i62 from '@angular/material/radio';
import * as i63 from '@angular/material/slide-toggle';
import * as i64 from '../../../../../src/app/myAccount/modules/my-account.material.module';
import * as i65 from '../../../../../src/app/myAccount/modules/commonPipes.module';
import * as i66 from '../../../../../src/app/myAccount/modules/directives.module';
import * as i67 from '../../../../../src/app/shared/loaders/loading.module';
import * as i68 from '../../../../../src/app/shared/component/webChat/webChat.Module';
import * as i69 from '../../../../../src/app/myAccount/maui/flashMessage/flashMessage.module';
import * as i70 from '../../../../../src/app/myAccount/pages/settings/contactDetails/contactDetailsUpdateConfirmation/contactDetailsUpdateConfirmation.module';
import * as i71 from '../../../../../src/app/myAccount/pages/settings/concession/concession.module';
import * as i72 from '../../../../../src/app/myAccount/modules/commonComponents.module';
import * as i73 from '../../../../../src/app/myAccount/modules/billing.module';
import * as i74 from '../../../../../src/app/myAccount/dashboard/solarCheck/solarCheckRegisterProcess/solarCheckSolarDetails/solarCheckSolarDetails.component';
import * as i75 from '../../../../../src/app/myAccount/modules/solarCheck.module';
export const OverviewModuleNgFactory:i0.NgModuleFactory<i1.OverviewModule> = i0.??cmf(i1.OverviewModule,
    ([] as any[]),(_l:any) => {
      return i0.??mod([i0.??mpd(512,i0.ComponentFactoryResolver,i0.??CodegenComponentFactoryResolver,
          [[8,[i2.MdDialogContainerNgFactory,i3.MdDatepickerContentNgFactory,i4.PaymentMethodsCreditCardComponentNgFactory,
              i5.AddPaymentMethodComponentNgFactory,i6.StoreCreditCardFormComponentNgFactory,
              i7.StoreBankFormComponentNgFactory,i8.StorePaypalFormComponentNgFactory,
              i9.BillSmoothingLearnMoreComponentNgFactory,i10.SolarCheckRegisterProcessComponentNgFactory,
              i11.SolarCheckUpdateDetailsProcessComponentNgFactory]],[3,i0.ComponentFactoryResolver],
              i0.NgModuleRef]),i0.??mpd(4608,i12.NgLocalization,i12.NgLocaleLocalization,
          [i0.LOCALE_ID]),i0.??mpd(6144,i13.DIR_DOCUMENT,(null as any),[i14.DOCUMENT]),
          i0.??mpd(4608,i13.Directionality,i13.Directionality,[[2,i13.DIR_DOCUMENT]]),
          i0.??mpd(4608,i15.Platform,i15.Platform,([] as any[])),i0.??mpd(5120,i16.ScrollDispatcher,
              i16.SCROLL_DISPATCHER_PROVIDER_FACTORY,[[3,i16.ScrollDispatcher],i0.NgZone,
                  i15.Platform]),i0.??mpd(5120,i16.ViewportRuler,i16.VIEWPORT_RULER_PROVIDER_FACTORY,
              [[3,i16.ViewportRuler],i16.ScrollDispatcher]),i0.??mpd(4608,i17.InteractivityChecker,
              i17.InteractivityChecker,[i15.Platform]),i0.??mpd(4608,i17.FocusTrapFactory,
              i17.FocusTrapFactory,[i17.InteractivityChecker,i15.Platform,i0.NgZone]),
          i0.??mpd(136192,i17.AriaDescriber,i17.ARIA_DESCRIBER_PROVIDER_FACTORY,[[3,
              i17.AriaDescriber],i15.Platform]),i0.??mpd(5120,i17.LiveAnnouncer,i17.LIVE_ANNOUNCER_PROVIDER_FACTORY,
              [[3,i17.LiveAnnouncer],[2,i17.LIVE_ANNOUNCER_ELEMENT_TOKEN],i15.Platform]),
          i0.??mpd(5120,i17.FocusMonitor,i17.FOCUS_MONITOR_PROVIDER_FACTORY,[[3,i17.FocusMonitor],
              i0.NgZone,i15.Platform]),i0.??mpd(4608,i18.MdMutationObserverFactory,
              i18.MdMutationObserverFactory,([] as any[])),i0.??mpd(4608,i19.ScrollStrategyOptions,
              i19.ScrollStrategyOptions,[i16.ScrollDispatcher,i16.ViewportRuler]),
          i0.??mpd(5120,i19.OverlayContainer,i19.??a,[[3,i19.OverlayContainer]]),i0.??mpd(4608,
              i19.??f,i19.??f,[i16.ViewportRuler]),i0.??mpd(4608,i19.Overlay,i19.Overlay,
              [i19.ScrollStrategyOptions,i19.OverlayContainer,i0.ComponentFactoryResolver,
                  i19.??f,i0.ApplicationRef,i0.Injector,i0.NgZone]),i0.??mpd(5120,i19.??c,
              i19.??d,[i19.Overlay]),i0.??mpd(5120,i20.MD_DIALOG_SCROLL_STRATEGY,i20.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i19.Overlay]),i0.??mpd(4608,i20.MdDialog,i20.MdDialog,[i19.Overlay,i0.Injector,
              [2,i12.Location],i20.MD_DIALOG_SCROLL_STRATEGY,[3,i20.MdDialog]]),i0.??mpd(5120,
              i21.MdIconRegistry,i21.ICON_REGISTRY_PROVIDER_FACTORY,[[3,i21.MdIconRegistry],
                  [2,i22.Http],i14.DomSanitizer]),i0.??mpd(4608,i23.MdDatepickerIntl,
              i23.MdDatepickerIntl,([] as any[])),i0.??mpd(5120,i23.MD_DATEPICKER_SCROLL_STRATEGY,
              i23.MAT_DATEPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY,[i19.Overlay]),i0.??mpd(5120,
              i24.MD_MENU_SCROLL_STRATEGY,i24.??c17,[i19.Overlay]),i0.??mpd(5120,i25.UniqueSelectionDispatcher,
              i25.UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY,[[3,i25.UniqueSelectionDispatcher]]),
          i0.??mpd(4608,i14.HAMMER_GESTURE_CONFIG,i25.GestureConfig,([] as any[])),
          i0.??mpd(4608,i26.FormBuilder,i26.FormBuilder,([] as any[])),i0.??mpd(4608,
              i26.??i,i26.??i,([] as any[])),i0.??mpd(4608,i27.IIntervalService,i27.IntervalService,
              ([] as any[])),i0.??mpd(4608,i28.PaymentValidators,i28.PaymentValidators,
              ([] as any[])),i0.??mpd(4608,i29.AlertMessages,i29.AlertMessages,([] as any[])),
          i0.??mpd(4608,i30.IBusinessPartnerNumberService,i31.BusinessPartnerNumberService,
              [i32.IApiService]),i0.??mpd(4608,i33.FeatureFlagService,i33.FeatureFlagService,
              [i22.Http]),i0.??mpd(4608,i34.AccountService,i34.AccountService,[i35.ApiService,
              i36.RedLineApiService,i37.PaygAccountService,i38.LoggerInterface,i33.FeatureFlagService,
              i39.DataLayerService,i40.IPaymentMethodsService,i41.ProductAttributesService,
              'AppContentBranch']),i0.??mpd(4608,i42.ISolarCheckOfferService,i43.SolarCheckOfferService,
              [i44.ISolarCheckService,i34.IAccountServiceMA,i33.FeatureFlagService]),
          i0.??mpd(4608,i45.SolarCheckStatusViewModelFactory,i45.SolarCheckStatusViewModelFactory,
              ([] as any[])),i0.??mpd(4608,i46.DashboardComponent,i46.DashboardComponent,
              [i47.PaypalApiService,i48.ConfigService,i49.DeviceDetectorService,i50.Router,
                  i51.ModalService,i34.IAccountServiceMA,i35.ApiService,i52.ContentService,
                  i53.Now,i33.FeatureFlagService,i54.ISsmrService,i55.IUrlService]),
          i0.??mpd(512,i12.CommonModule,i12.CommonModule,([] as any[])),i0.??mpd(512,
              i25.CompatibilityModule,i25.CompatibilityModule,([] as any[])),i0.??mpd(512,
              i13.BidiModule,i13.BidiModule,([] as any[])),i0.??mpd(256,i25.MATERIAL_SANITY_CHECKS,
              true,([] as any[])),i0.??mpd(512,i25.MdCommonModule,i25.MdCommonModule,
              [[2,i14.DOCUMENT],[2,i25.MATERIAL_SANITY_CHECKS]]),i0.??mpd(512,i15.PlatformModule,
              i15.PlatformModule,([] as any[])),i0.??mpd(512,i16.ScrollDispatchModule,
              i16.ScrollDispatchModule,([] as any[])),i0.??mpd(512,i25.MdRippleModule,
              i25.MdRippleModule,([] as any[])),i0.??mpd(512,i17.A11yModule,i17.A11yModule,
              ([] as any[])),i0.??mpd(512,i56.MdButtonModule,i56.MdButtonModule,([] as any[])),
          i0.??mpd(512,i57.MdCardModule,i57.MdCardModule,([] as any[])),i0.??mpd(512,
              i18.ObserversModule,i18.ObserversModule,([] as any[])),i0.??mpd(512,i58.MdCheckboxModule,
              i58.MdCheckboxModule,([] as any[])),i0.??mpd(512,i59.PortalModule,i59.PortalModule,
              ([] as any[])),i0.??mpd(512,i19.OverlayModule,i19.OverlayModule,([] as any[])),
          i0.??mpd(512,i20.MdDialogModule,i20.MdDialogModule,([] as any[])),i0.??mpd(512,
              i21.MdIconModule,i21.MdIconModule,([] as any[])),i0.??mpd(512,i23.MdDatepickerModule,
              i23.MdDatepickerModule,([] as any[])),i0.??mpd(512,i60.MdFormFieldModule,
              i60.MdFormFieldModule,([] as any[])),i0.??mpd(512,i61.MdInputModule,i61.MdInputModule,
              ([] as any[])),i0.??mpd(512,i24.MdMenuModule,i24.MdMenuModule,([] as any[])),
          i0.??mpd(512,i25.NativeDateModule,i25.NativeDateModule,([] as any[])),i0.??mpd(512,
              i25.MdNativeDateModule,i25.MdNativeDateModule,([] as any[])),i0.??mpd(512,
              i62.MdRadioModule,i62.MdRadioModule,([] as any[])),i0.??mpd(512,i63.MdSlideToggleModule,
              i63.MdSlideToggleModule,([] as any[])),i0.??mpd(512,i64.MyAccountMaterialModule,
              i64.MyAccountMaterialModule,([] as any[])),i0.??mpd(512,i65.CommonPipesModule,
              i65.CommonPipesModule,([] as any[])),i0.??mpd(512,i26.??ba,i26.??ba,([] as any[])),
          i0.??mpd(512,i26.ReactiveFormsModule,i26.ReactiveFormsModule,([] as any[])),
          i0.??mpd(512,i26.FormsModule,i26.FormsModule,([] as any[])),i0.??mpd(512,i66.DirectivesModule,
              i66.DirectivesModule,([] as any[])),i0.??mpd(512,i50.RouterModule,i50.RouterModule,
              [[2,i50.??a],[2,i50.Router]]),i0.??mpd(512,i67.LoadingModule,i67.LoadingModule,
              ([] as any[])),i0.??mpd(512,i68.WebChatModule,i68.WebChatModule,([] as any[])),
          i0.??mpd(512,i69.MauiFlashMessageModule,i69.MauiFlashMessageModule,([] as any[])),
          i0.??mpd(512,i70.ContactDetailsUpdateConfirmationModule,i70.ContactDetailsUpdateConfirmationModule,
              ([] as any[])),i0.??mpd(512,i71.ConcessionModule,i71.ConcessionModule,
              ([] as any[])),i0.??mpd(512,i72.CommonComponentsModule,i72.CommonComponentsModule,
              ([] as any[])),i0.??mpd(512,i73.BillingModule,i73.BillingModule,([] as any[])),
          i0.??mpd(256,i0.LOCALE_ID,'en-AU',([] as any[])),i0.??mpd(2048,i25.MAT_DATE_LOCALE,
              (null as any),[i0.LOCALE_ID]),i0.??mpd(512,i25.DateAdapter,i74.MyDateAdapterService,
              [[2,i25.MAT_DATE_LOCALE]]),i0.??mpd(512,i75.SolarCheckModule,i75.SolarCheckModule,
              [i25.DateAdapter]),i0.??mpd(512,i1.OverviewModule,i1.OverviewModule,([] as any[])),
          i0.??mpd(256,i24.MD_MENU_DEFAULT_OPTIONS,{overlapTrigger:true,xPosition:'after',
              yPosition:'below'},([] as any[])),i0.??mpd(256,i25.MD_DATE_FORMATS,i25.MAT_NATIVE_DATE_FORMATS,
              ([] as any[]))]);
    });
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9tb2R1bGVzL292ZXJ2aWV3Lm1vZHVsZS5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L21vZHVsZXMvb3ZlcnZpZXcubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIiAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
