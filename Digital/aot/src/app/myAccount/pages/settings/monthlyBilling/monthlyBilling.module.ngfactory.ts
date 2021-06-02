/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '../../../../../../../src/app/myAccount/pages/settings/monthlyBilling/monthlyBilling.module';
import * as i2 from '../../../../../../node_modules/@angular/material/dialog/typings/index.ngfactory';
import * as i3 from '../../../../../../node_modules/@angular/material/datepicker/typings/index.ngfactory';
import * as i4 from '../../../../shared/component/paymentMethods/paymentMethods.creditCard.component.ngfactory';
import * as i5 from '../../../../shared/component/paymentMethods/addPaymentMethod.component.ngfactory';
import * as i6 from '../../../forms/storeCreditCardForm/storeCreditCardForm.component.ngfactory';
import * as i7 from '../../../forms/storeBankAccountForm/storeBankForm.component.ngfactory';
import * as i8 from '../../../forms/storePaypalForm/storePaypalForm.component.ngfactory';
import * as i9 from '../../../../shared/component/billSmoothingLearnMore/billSmoothingLearnMore.component.ngfactory';
import * as i10 from './monthlyBillingSettings/monthlyBilling.settings.component.ngfactory';
import * as i11 from './chooseService/chooseService.component.ngfactory';
import * as i12 from './chooseDate/chooseDate.component.ngfactory';
import * as i13 from './confirmation/confirmation.component.ngfactory';
import * as i14 from '@angular/common';
import * as i15 from '@angular/cdk/bidi';
import * as i16 from '@angular/platform-browser';
import * as i17 from '@angular/cdk/platform';
import * as i18 from '@angular/cdk/scrolling';
import * as i19 from '@angular/cdk/a11y';
import * as i20 from '@angular/cdk/observers';
import * as i21 from '@angular/cdk/overlay';
import * as i22 from '@angular/material/dialog';
import * as i23 from '@angular/material/icon';
import * as i24 from '@angular/http';
import * as i25 from '@angular/material/datepicker';
import * as i26 from '@angular/material/menu';
import * as i27 from '@angular/material/core';
import * as i28 from '@angular/forms';
import * as i29 from '../../../../../../../src/app/shared/service/interval.service';
import * as i30 from '../../../../../../../src/app/shared/validators/paymentValidators';
import * as i31 from '../../../../../../../src/app/shared/messages/alertMessages';
import * as i32 from '../../../../../../../src/app/myAccount/services/contract/ibusinessPartnerNumber.service';
import * as i33 from '../../../../../../../src/app/myAccount/services/businessPartnerNumber/businessPartnerNumber.service';
import * as i34 from '../../../../../../../src/app/shared/service/contract/iapi.service';
import * as i35 from '../../../../../../../src/app/myAccount/pages/settings/monthlyBilling/monthlyBilling.guard';
import * as i36 from '@angular/router';
import * as i37 from '../../../../../../../src/app/myAccount/services/monthlyBilling.service';
import * as i38 from '@angular/material/button';
import * as i39 from '@angular/material/card';
import * as i40 from '@angular/material/checkbox';
import * as i41 from '@angular/cdk/portal';
import * as i42 from '@angular/material/form-field';
import * as i43 from '@angular/material/input';
import * as i44 from '@angular/material/radio';
import * as i45 from '@angular/material/slide-toggle';
import * as i46 from '../../../../../../../src/app/myAccount/modules/my-account.material.module';
import * as i47 from '../../../../../../../src/app/myAccount/modules/commonPipes.module';
import * as i48 from '../../../../../../../src/app/myAccount/modules/directives.module';
import * as i49 from '../../../../../../../src/app/shared/loaders/loading.module';
import * as i50 from '../../../../../../../src/app/shared/component/webChat/webChat.Module';
import * as i51 from '../../../../../../../src/app/myAccount/maui/flashMessage/flashMessage.module';
import * as i52 from '../../../../../../../src/app/myAccount/pages/settings/contactDetails/contactDetailsUpdateConfirmation/contactDetailsUpdateConfirmation.module';
import * as i53 from '../../../../../../../src/app/myAccount/pages/settings/concession/concession.module';
import * as i54 from '../../../../../../../src/app/myAccount/modules/commonComponents.module';
import * as i55 from '../../../../../../../src/app/myAccount/pages/settings/monthlyBilling/monthlyBillingSettings/index';
import * as i56 from '../../../../../../../src/app/myAccount/maui/heading/heading.module';
import * as i57 from '../../../../../../../src/app/myAccount/maui/iconList/iconList.module';
import * as i58 from '../../../../../../../src/app/myAccount/maui/fuelChip/fuelChip.module';
import * as i59 from '../../../../../../../src/app/myAccount/maui/secondaryNavigation/secondaryNavigation.module';
import * as i60 from '../../../../../../../src/app/myAccount/maui/container/container.module';
import * as i61 from '../../../../../../../src/app/myAccount/maui/confirmationBanner/confirmationBanner.module';
import * as i62 from '../../../../../../../src/app/myAccount/maui/dayOfMonthPicker/dayOfMonthPicker.module';
import * as i63 from '../../../../../../../src/app/myAccount/maui/termsAndConditions/termsAndConditions.module';
import * as i64 from '../../../../../../../src/app/myAccount/maui/button/button.module';
import * as i65 from '../../../../../../../src/app/myAccount/maui/lightBox/lightBox.module';
import * as i66 from '../../../../../../../src/app/myAccount/pages/settings/monthlyBilling/monthlyBillingSettings/monthlyBilling.settings.component';
import * as i67 from '../../../../../../../src/app/myAccount/pages/settings/monthlyBilling/chooseService/chooseService.component';
import * as i68 from '../../../../../../../src/app/myAccount/pages/settings/monthlyBilling/chooseDate/chooseDate.component';
import * as i69 from '../../../../../../../src/app/myAccount/pages/settings/monthlyBilling/confirmation/confirmation.component';
export const MonthlyBillingModuleNgFactory:i0.NgModuleFactory<i1.MonthlyBillingModule> = i0.ɵcmf(i1.MonthlyBillingModule,
    ([] as any[]),(_l:any) => {
      return i0.ɵmod([i0.ɵmpd(512,i0.ComponentFactoryResolver,i0.ɵCodegenComponentFactoryResolver,
          [[8,[i2.MdDialogContainerNgFactory,i3.MdDatepickerContentNgFactory,i4.PaymentMethodsCreditCardComponentNgFactory,
              i5.AddPaymentMethodComponentNgFactory,i6.StoreCreditCardFormComponentNgFactory,
              i7.StoreBankFormComponentNgFactory,i8.StorePaypalFormComponentNgFactory,
              i9.BillSmoothingLearnMoreComponentNgFactory,i10.MonthlyBillingSettingsComponentNgFactory,
              i11.MonthlyBillingChooseServiceComponentNgFactory,i12.MonthlyBillingChooseDateComponentNgFactory,
              i13.MonthlyBillingConfirmationComponentNgFactory]],[3,i0.ComponentFactoryResolver],
              i0.NgModuleRef]),i0.ɵmpd(4608,i14.NgLocalization,i14.NgLocaleLocalization,
          [i0.LOCALE_ID]),i0.ɵmpd(6144,i15.DIR_DOCUMENT,(null as any),[i16.DOCUMENT]),
          i0.ɵmpd(4608,i15.Directionality,i15.Directionality,[[2,i15.DIR_DOCUMENT]]),
          i0.ɵmpd(4608,i17.Platform,i17.Platform,([] as any[])),i0.ɵmpd(5120,i18.ScrollDispatcher,
              i18.SCROLL_DISPATCHER_PROVIDER_FACTORY,[[3,i18.ScrollDispatcher],i0.NgZone,
                  i17.Platform]),i0.ɵmpd(5120,i18.ViewportRuler,i18.VIEWPORT_RULER_PROVIDER_FACTORY,
              [[3,i18.ViewportRuler],i18.ScrollDispatcher]),i0.ɵmpd(4608,i19.InteractivityChecker,
              i19.InteractivityChecker,[i17.Platform]),i0.ɵmpd(4608,i19.FocusTrapFactory,
              i19.FocusTrapFactory,[i19.InteractivityChecker,i17.Platform,i0.NgZone]),
          i0.ɵmpd(136192,i19.AriaDescriber,i19.ARIA_DESCRIBER_PROVIDER_FACTORY,[[3,
              i19.AriaDescriber],i17.Platform]),i0.ɵmpd(5120,i19.LiveAnnouncer,i19.LIVE_ANNOUNCER_PROVIDER_FACTORY,
              [[3,i19.LiveAnnouncer],[2,i19.LIVE_ANNOUNCER_ELEMENT_TOKEN],i17.Platform]),
          i0.ɵmpd(5120,i19.FocusMonitor,i19.FOCUS_MONITOR_PROVIDER_FACTORY,[[3,i19.FocusMonitor],
              i0.NgZone,i17.Platform]),i0.ɵmpd(4608,i20.MdMutationObserverFactory,
              i20.MdMutationObserverFactory,([] as any[])),i0.ɵmpd(4608,i21.ScrollStrategyOptions,
              i21.ScrollStrategyOptions,[i18.ScrollDispatcher,i18.ViewportRuler]),
          i0.ɵmpd(5120,i21.OverlayContainer,i21.ɵa,[[3,i21.OverlayContainer]]),i0.ɵmpd(4608,
              i21.ɵf,i21.ɵf,[i18.ViewportRuler]),i0.ɵmpd(4608,i21.Overlay,i21.Overlay,
              [i21.ScrollStrategyOptions,i21.OverlayContainer,i0.ComponentFactoryResolver,
                  i21.ɵf,i0.ApplicationRef,i0.Injector,i0.NgZone]),i0.ɵmpd(5120,i21.ɵc,
              i21.ɵd,[i21.Overlay]),i0.ɵmpd(5120,i22.MD_DIALOG_SCROLL_STRATEGY,i22.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i21.Overlay]),i0.ɵmpd(4608,i22.MdDialog,i22.MdDialog,[i21.Overlay,i0.Injector,
              [2,i14.Location],i22.MD_DIALOG_SCROLL_STRATEGY,[3,i22.MdDialog]]),i0.ɵmpd(5120,
              i23.MdIconRegistry,i23.ICON_REGISTRY_PROVIDER_FACTORY,[[3,i23.MdIconRegistry],
                  [2,i24.Http],i16.DomSanitizer]),i0.ɵmpd(4608,i25.MdDatepickerIntl,
              i25.MdDatepickerIntl,([] as any[])),i0.ɵmpd(5120,i25.MD_DATEPICKER_SCROLL_STRATEGY,
              i25.MAT_DATEPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY,[i21.Overlay]),i0.ɵmpd(5120,
              i26.MD_MENU_SCROLL_STRATEGY,i26.ɵc17,[i21.Overlay]),i0.ɵmpd(6144,i27.MAT_DATE_LOCALE,
              (null as any),[i0.LOCALE_ID]),i0.ɵmpd(4608,i27.DateAdapter,i27.NativeDateAdapter,
              [[2,i27.MAT_DATE_LOCALE]]),i0.ɵmpd(5120,i27.UniqueSelectionDispatcher,
              i27.UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY,[[3,i27.UniqueSelectionDispatcher]]),
          i0.ɵmpd(4608,i16.HAMMER_GESTURE_CONFIG,i27.GestureConfig,([] as any[])),
          i0.ɵmpd(4608,i28.FormBuilder,i28.FormBuilder,([] as any[])),i0.ɵmpd(4608,
              i28.ɵi,i28.ɵi,([] as any[])),i0.ɵmpd(4608,i29.IIntervalService,i29.IntervalService,
              ([] as any[])),i0.ɵmpd(4608,i30.PaymentValidators,i30.PaymentValidators,
              ([] as any[])),i0.ɵmpd(4608,i31.AlertMessages,i31.AlertMessages,([] as any[])),
          i0.ɵmpd(4608,i32.IBusinessPartnerNumberService,i33.BusinessPartnerNumberService,
              [i34.IApiService]),i0.ɵmpd(4608,i35.MonthlyBillingRoutingGuard,i35.MonthlyBillingRoutingGuard,
              [i36.Router,i37.MonthlyBillingService]),i0.ɵmpd(512,i36.RouterModule,
              i36.RouterModule,[[2,i36.ɵa],[2,i36.Router]]),i0.ɵmpd(512,i14.CommonModule,
              i14.CommonModule,([] as any[])),i0.ɵmpd(512,i27.CompatibilityModule,
              i27.CompatibilityModule,([] as any[])),i0.ɵmpd(512,i15.BidiModule,i15.BidiModule,
              ([] as any[])),i0.ɵmpd(256,i27.MATERIAL_SANITY_CHECKS,true,([] as any[])),
          i0.ɵmpd(512,i27.MdCommonModule,i27.MdCommonModule,[[2,i16.DOCUMENT],[2,i27.MATERIAL_SANITY_CHECKS]]),
          i0.ɵmpd(512,i17.PlatformModule,i17.PlatformModule,([] as any[])),i0.ɵmpd(512,
              i18.ScrollDispatchModule,i18.ScrollDispatchModule,([] as any[])),i0.ɵmpd(512,
              i27.MdRippleModule,i27.MdRippleModule,([] as any[])),i0.ɵmpd(512,i19.A11yModule,
              i19.A11yModule,([] as any[])),i0.ɵmpd(512,i38.MdButtonModule,i38.MdButtonModule,
              ([] as any[])),i0.ɵmpd(512,i39.MdCardModule,i39.MdCardModule,([] as any[])),
          i0.ɵmpd(512,i20.ObserversModule,i20.ObserversModule,([] as any[])),i0.ɵmpd(512,
              i40.MdCheckboxModule,i40.MdCheckboxModule,([] as any[])),i0.ɵmpd(512,
              i41.PortalModule,i41.PortalModule,([] as any[])),i0.ɵmpd(512,i21.OverlayModule,
              i21.OverlayModule,([] as any[])),i0.ɵmpd(512,i22.MdDialogModule,i22.MdDialogModule,
              ([] as any[])),i0.ɵmpd(512,i23.MdIconModule,i23.MdIconModule,([] as any[])),
          i0.ɵmpd(512,i25.MdDatepickerModule,i25.MdDatepickerModule,([] as any[])),
          i0.ɵmpd(512,i42.MdFormFieldModule,i42.MdFormFieldModule,([] as any[])),i0.ɵmpd(512,
              i43.MdInputModule,i43.MdInputModule,([] as any[])),i0.ɵmpd(512,i26.MdMenuModule,
              i26.MdMenuModule,([] as any[])),i0.ɵmpd(512,i27.NativeDateModule,i27.NativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i27.MdNativeDateModule,i27.MdNativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i44.MdRadioModule,i44.MdRadioModule,([] as any[])),
          i0.ɵmpd(512,i45.MdSlideToggleModule,i45.MdSlideToggleModule,([] as any[])),
          i0.ɵmpd(512,i46.MyAccountMaterialModule,i46.MyAccountMaterialModule,([] as any[])),
          i0.ɵmpd(512,i47.CommonPipesModule,i47.CommonPipesModule,([] as any[])),i0.ɵmpd(512,
              i28.ɵba,i28.ɵba,([] as any[])),i0.ɵmpd(512,i28.ReactiveFormsModule,i28.ReactiveFormsModule,
              ([] as any[])),i0.ɵmpd(512,i28.FormsModule,i28.FormsModule,([] as any[])),
          i0.ɵmpd(512,i48.DirectivesModule,i48.DirectivesModule,([] as any[])),i0.ɵmpd(512,
              i49.LoadingModule,i49.LoadingModule,([] as any[])),i0.ɵmpd(512,i50.WebChatModule,
              i50.WebChatModule,([] as any[])),i0.ɵmpd(512,i51.MauiFlashMessageModule,
              i51.MauiFlashMessageModule,([] as any[])),i0.ɵmpd(512,i52.ContactDetailsUpdateConfirmationModule,
              i52.ContactDetailsUpdateConfirmationModule,([] as any[])),i0.ɵmpd(512,
              i53.ConcessionModule,i53.ConcessionModule,([] as any[])),i0.ɵmpd(512,
              i54.CommonComponentsModule,i54.CommonComponentsModule,([] as any[])),
          i0.ɵmpd(512,i55.MonthlyBillingSettingsComponentModule,i55.MonthlyBillingSettingsComponentModule,
              ([] as any[])),i0.ɵmpd(512,i56.MauiHeadingModule,i56.MauiHeadingModule,
              ([] as any[])),i0.ɵmpd(512,i57.MauiIconListModule,i57.MauiIconListModule,
              ([] as any[])),i0.ɵmpd(512,i58.MauiFuelChipModule,i58.MauiFuelChipModule,
              ([] as any[])),i0.ɵmpd(512,i59.MauiSecondaryNavigationModule,i59.MauiSecondaryNavigationModule,
              ([] as any[])),i0.ɵmpd(512,i60.MauiContainerModule,i60.MauiContainerModule,
              ([] as any[])),i0.ɵmpd(512,i61.MauiConfirmationBannerModule,i61.MauiConfirmationBannerModule,
              ([] as any[])),i0.ɵmpd(512,i62.MauiDayOfMonthPickerModule,i62.MauiDayOfMonthPickerModule,
              ([] as any[])),i0.ɵmpd(512,i63.MauiTermsAndConditionsModule,i63.MauiTermsAndConditionsModule,
              ([] as any[])),i0.ɵmpd(512,i64.MauiButtonModule,i64.MauiButtonModule,
              ([] as any[])),i0.ɵmpd(512,i65.MauiLightBoxModule,i65.MauiLightBoxModule,
              ([] as any[])),i0.ɵmpd(512,i1.MonthlyBillingModule,i1.MonthlyBillingModule,
              ([] as any[])),i0.ɵmpd(256,i26.MD_MENU_DEFAULT_OPTIONS,{overlapTrigger:true,
              xPosition:'after',yPosition:'below'},([] as any[])),i0.ɵmpd(256,i27.MD_DATE_FORMATS,
              i27.MAT_NATIVE_DATE_FORMATS,([] as any[])),i0.ɵmpd(1024,i36.ROUTES,() => {
            return [[{path:'',component:i66.MonthlyBillingSettingsComponent},{path:'services',
                component:i67.MonthlyBillingChooseServiceComponent,canActivate:[i35.MonthlyBillingRoutingGuard]},
                {path:'date',component:i68.MonthlyBillingChooseDateComponent,canActivate:[i35.MonthlyBillingRoutingGuard]},
                {path:'confirmation',component:i69.MonthlyBillingConfirmationComponent,
                    canActivate:[i35.MonthlyBillingRoutingGuard]}]];
          },([] as any[]))]);
    });
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9tb250aGx5QmlsbGluZy9tb250aGx5QmlsbGluZy5tb2R1bGUubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9tb250aGx5QmlsbGluZy9tb250aGx5QmlsbGluZy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiICJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==