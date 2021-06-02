/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '../../../../../src/app/myAccount/modules/directives.module';
import * as i2 from '../../../../node_modules/@angular/material/dialog/typings/index.ngfactory';
import * as i3 from '../../../../node_modules/@angular/material/datepicker/typings/index.ngfactory';
import * as i4 from '@angular/common';
import * as i5 from '@angular/cdk/bidi';
import * as i6 from '@angular/platform-browser';
import * as i7 from '@angular/cdk/platform';
import * as i8 from '@angular/cdk/scrolling';
import * as i9 from '@angular/cdk/a11y';
import * as i10 from '@angular/cdk/observers';
import * as i11 from '@angular/cdk/overlay';
import * as i12 from '@angular/material/dialog';
import * as i13 from '@angular/material/icon';
import * as i14 from '@angular/http';
import * as i15 from '@angular/material/datepicker';
import * as i16 from '@angular/material/menu';
import * as i17 from '@angular/material/core';
import * as i18 from '@angular/forms';
import * as i19 from '@angular/material/button';
import * as i20 from '@angular/material/card';
import * as i21 from '@angular/material/checkbox';
import * as i22 from '@angular/cdk/portal';
import * as i23 from '@angular/material/form-field';
import * as i24 from '@angular/material/input';
import * as i25 from '@angular/material/radio';
import * as i26 from '@angular/material/slide-toggle';
import * as i27 from '../../../../../src/app/myAccount/modules/my-account.material.module';
import * as i28 from '../../../../../src/app/myAccount/modules/commonPipes.module';
export const DirectivesModuleNgFactory:i0.NgModuleFactory<i1.DirectivesModule> = i0.ɵcmf(i1.DirectivesModule,
    ([] as any[]),(_l:any) => {
      return i0.ɵmod([i0.ɵmpd(512,i0.ComponentFactoryResolver,i0.ɵCodegenComponentFactoryResolver,
          [[8,[i2.MdDialogContainerNgFactory,i3.MdDatepickerContentNgFactory]],[3,
              i0.ComponentFactoryResolver],i0.NgModuleRef]),i0.ɵmpd(4608,i4.NgLocalization,
          i4.NgLocaleLocalization,[i0.LOCALE_ID]),i0.ɵmpd(6144,i5.DIR_DOCUMENT,(null as any),
          [i6.DOCUMENT]),i0.ɵmpd(4608,i5.Directionality,i5.Directionality,[[2,i5.DIR_DOCUMENT]]),
          i0.ɵmpd(4608,i7.Platform,i7.Platform,([] as any[])),i0.ɵmpd(5120,i8.ScrollDispatcher,
              i8.SCROLL_DISPATCHER_PROVIDER_FACTORY,[[3,i8.ScrollDispatcher],i0.NgZone,
                  i7.Platform]),i0.ɵmpd(5120,i8.ViewportRuler,i8.VIEWPORT_RULER_PROVIDER_FACTORY,
              [[3,i8.ViewportRuler],i8.ScrollDispatcher]),i0.ɵmpd(4608,i9.InteractivityChecker,
              i9.InteractivityChecker,[i7.Platform]),i0.ɵmpd(4608,i9.FocusTrapFactory,
              i9.FocusTrapFactory,[i9.InteractivityChecker,i7.Platform,i0.NgZone]),
          i0.ɵmpd(136192,i9.AriaDescriber,i9.ARIA_DESCRIBER_PROVIDER_FACTORY,[[3,i9.AriaDescriber],
              i7.Platform]),i0.ɵmpd(5120,i9.LiveAnnouncer,i9.LIVE_ANNOUNCER_PROVIDER_FACTORY,
              [[3,i9.LiveAnnouncer],[2,i9.LIVE_ANNOUNCER_ELEMENT_TOKEN],i7.Platform]),
          i0.ɵmpd(5120,i9.FocusMonitor,i9.FOCUS_MONITOR_PROVIDER_FACTORY,[[3,i9.FocusMonitor],
              i0.NgZone,i7.Platform]),i0.ɵmpd(4608,i10.MdMutationObserverFactory,i10.MdMutationObserverFactory,
              ([] as any[])),i0.ɵmpd(4608,i11.ScrollStrategyOptions,i11.ScrollStrategyOptions,
              [i8.ScrollDispatcher,i8.ViewportRuler]),i0.ɵmpd(5120,i11.OverlayContainer,
              i11.ɵa,[[3,i11.OverlayContainer]]),i0.ɵmpd(4608,i11.ɵf,i11.ɵf,[i8.ViewportRuler]),
          i0.ɵmpd(4608,i11.Overlay,i11.Overlay,[i11.ScrollStrategyOptions,i11.OverlayContainer,
              i0.ComponentFactoryResolver,i11.ɵf,i0.ApplicationRef,i0.Injector,i0.NgZone]),
          i0.ɵmpd(5120,i11.ɵc,i11.ɵd,[i11.Overlay]),i0.ɵmpd(5120,i12.MD_DIALOG_SCROLL_STRATEGY,
              i12.MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,[i11.Overlay]),i0.ɵmpd(4608,
              i12.MdDialog,i12.MdDialog,[i11.Overlay,i0.Injector,[2,i4.Location],i12.MD_DIALOG_SCROLL_STRATEGY,
                  [3,i12.MdDialog]]),i0.ɵmpd(5120,i13.MdIconRegistry,i13.ICON_REGISTRY_PROVIDER_FACTORY,
              [[3,i13.MdIconRegistry],[2,i14.Http],i6.DomSanitizer]),i0.ɵmpd(4608,
              i15.MdDatepickerIntl,i15.MdDatepickerIntl,([] as any[])),i0.ɵmpd(5120,
              i15.MD_DATEPICKER_SCROLL_STRATEGY,i15.MAT_DATEPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY,
              [i11.Overlay]),i0.ɵmpd(5120,i16.MD_MENU_SCROLL_STRATEGY,i16.ɵc17,[i11.Overlay]),
          i0.ɵmpd(6144,i17.MAT_DATE_LOCALE,(null as any),[i0.LOCALE_ID]),i0.ɵmpd(4608,
              i17.DateAdapter,i17.NativeDateAdapter,[[2,i17.MAT_DATE_LOCALE]]),i0.ɵmpd(5120,
              i17.UniqueSelectionDispatcher,i17.UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY,
              [[3,i17.UniqueSelectionDispatcher]]),i0.ɵmpd(4608,i6.HAMMER_GESTURE_CONFIG,
              i17.GestureConfig,([] as any[])),i0.ɵmpd(4608,i18.FormBuilder,i18.FormBuilder,
              ([] as any[])),i0.ɵmpd(4608,i18.ɵi,i18.ɵi,([] as any[])),i0.ɵmpd(512,
              i4.CommonModule,i4.CommonModule,([] as any[])),i0.ɵmpd(512,i17.CompatibilityModule,
              i17.CompatibilityModule,([] as any[])),i0.ɵmpd(512,i5.BidiModule,i5.BidiModule,
              ([] as any[])),i0.ɵmpd(256,i17.MATERIAL_SANITY_CHECKS,true,([] as any[])),
          i0.ɵmpd(512,i17.MdCommonModule,i17.MdCommonModule,[[2,i6.DOCUMENT],[2,i17.MATERIAL_SANITY_CHECKS]]),
          i0.ɵmpd(512,i7.PlatformModule,i7.PlatformModule,([] as any[])),i0.ɵmpd(512,
              i8.ScrollDispatchModule,i8.ScrollDispatchModule,([] as any[])),i0.ɵmpd(512,
              i17.MdRippleModule,i17.MdRippleModule,([] as any[])),i0.ɵmpd(512,i9.A11yModule,
              i9.A11yModule,([] as any[])),i0.ɵmpd(512,i19.MdButtonModule,i19.MdButtonModule,
              ([] as any[])),i0.ɵmpd(512,i20.MdCardModule,i20.MdCardModule,([] as any[])),
          i0.ɵmpd(512,i10.ObserversModule,i10.ObserversModule,([] as any[])),i0.ɵmpd(512,
              i21.MdCheckboxModule,i21.MdCheckboxModule,([] as any[])),i0.ɵmpd(512,
              i22.PortalModule,i22.PortalModule,([] as any[])),i0.ɵmpd(512,i11.OverlayModule,
              i11.OverlayModule,([] as any[])),i0.ɵmpd(512,i12.MdDialogModule,i12.MdDialogModule,
              ([] as any[])),i0.ɵmpd(512,i13.MdIconModule,i13.MdIconModule,([] as any[])),
          i0.ɵmpd(512,i15.MdDatepickerModule,i15.MdDatepickerModule,([] as any[])),
          i0.ɵmpd(512,i23.MdFormFieldModule,i23.MdFormFieldModule,([] as any[])),i0.ɵmpd(512,
              i24.MdInputModule,i24.MdInputModule,([] as any[])),i0.ɵmpd(512,i16.MdMenuModule,
              i16.MdMenuModule,([] as any[])),i0.ɵmpd(512,i17.NativeDateModule,i17.NativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i17.MdNativeDateModule,i17.MdNativeDateModule,
              ([] as any[])),i0.ɵmpd(512,i25.MdRadioModule,i25.MdRadioModule,([] as any[])),
          i0.ɵmpd(512,i26.MdSlideToggleModule,i26.MdSlideToggleModule,([] as any[])),
          i0.ɵmpd(512,i27.MyAccountMaterialModule,i27.MyAccountMaterialModule,([] as any[])),
          i0.ɵmpd(512,i28.CommonPipesModule,i28.CommonPipesModule,([] as any[])),i0.ɵmpd(512,
              i18.ɵba,i18.ɵba,([] as any[])),i0.ɵmpd(512,i18.ReactiveFormsModule,i18.ReactiveFormsModule,
              ([] as any[])),i0.ɵmpd(512,i18.FormsModule,i18.FormsModule,([] as any[])),
          i0.ɵmpd(512,i1.DirectivesModule,i1.DirectivesModule,([] as any[])),i0.ɵmpd(256,
              i16.MD_MENU_DEFAULT_OPTIONS,{overlapTrigger:true,xPosition:'after',yPosition:'below'},
              ([] as any[])),i0.ɵmpd(256,i17.MD_DATE_FORMATS,i17.MAT_NATIVE_DATE_FORMATS,
              ([] as any[]))]);
    });
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9tb2R1bGVzL2RpcmVjdGl2ZXMubW9kdWxlLm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvbW9kdWxlcy9kaXJlY3RpdmVzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIgIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
