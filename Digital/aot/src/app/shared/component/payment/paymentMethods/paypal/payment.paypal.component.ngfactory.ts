/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './payment.paypal.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../alert/alert.component.ngfactory';
import * as i3 from '../../../../../../../../src/app/shared/component/alert/alert.component';
import * as i4 from '@angular/platform-browser';
import * as i5 from '../../../../loaders/loading.component.ngfactory';
import * as i6 from '../../../../../../../../src/app/shared/loaders/loading.component';
import * as i7 from '@angular/common';
import * as i8 from '../../../../../../../../src/app/shared/component/payment/paymentMethods/paypal/payment.paypal.component';
import * as i9 from '../../../../../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i10 from '@angular/material/core';
import * as i11 from '@angular/material/button';
import * as i12 from '@angular/cdk/platform';
import * as i13 from '@angular/cdk/a11y';
import * as i14 from '../../../../../../../../src/app/shared/service/config.service';
import * as i15 from '../../../../../../../../src/app/shared/service/paypalApi.service';
import * as i16 from '../../../../../../../../src/app/shared/service/contract/imessageBus.service';
import * as i17 from '../../../../../../../../src/app/shared/service/dataLayer.service';
const styles_PaymentPaypalComponent:any[] = [i0.styles];
export const RenderType_PaymentPaypalComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_PaymentPaypalComponent,data:{}});
function View_PaymentPaypalComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-alert',[['alertType',
      'error']],(null as any),(null as any),(null as any),i2.View_AlertComponent_0,
      i2.RenderType_AlertComponent)),i1.ɵdid(114688,(null as any),0,i3.AlertComponent,
      [i4.DomSanitizer],{alertType:[0,'alertType'],heading:[1,'heading'],body:[2,'body']},
      (null as any))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = 'error';
    const currVal_1:any = _co.errorMessageHeader;
    const currVal_2:any = _co.errorMessage;
    _ck(_v,1,0,currVal_0,currVal_1,currVal_2);
  },(null as any));
}
function View_PaymentPaypalComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-loader',[['loadingSubMessage',
      'You will be redirected to the PayPal website shortly.']],(null as any),(null as any),
      (null as any),i5.View_LoadingComponent_0,i5.RenderType_LoadingComponent)),i1.ɵdid(114688,
      (null as any),0,i6.LoadingComponent,([] as any[]),{loadingSubMessage:[0,'loadingSubMessage'],
          fullScreen:[1,'fullScreen']},(null as any))],(_ck,_v) => {
    const currVal_0:any = 'You will be redirected to the PayPal website shortly.';
    const currVal_1:any = true;
    _ck(_v,1,0,currVal_0,currVal_1);
  },(null as any));
}
export function View_PaymentPaypalComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),29,'div',[['id',
      'payment-paypal']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_PaymentPaypalComponent_1)),i1.ɵdid(16384,
          (null as any),0,i7.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n    \n    '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','payment-paypal__content'],
              ['id','payment-paypal-content']],(null as any),(null as any),(null as any),
              (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        Use any linked credit card or account. No payment processing fees apply.\n    '])),
      (_l()(),i1.ɵted((null as any),['\n\n    '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),5,'button',[['class','payment-paypal__button mat-raised-button'],
              ['color','accent'],['id','make-payment-paypal'],['md-raised-button',
                  '']],[[8,'disabled',0]],[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i8.PaymentPaypalComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.payByPayPal()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i9.View_MdButton_0,i9.RenderType_MdButton)),i1.ɵdid(16384,(null as any),
          0,i10.MdPrefixRejector,[[2,i10.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
          (null as any),(null as any)),i1.ɵdid(180224,(null as any),0,i11.MdButton,
          [i1.Renderer2,i1.ElementRef,i12.Platform,i13.FocusMonitor],{color:[0,'color']},
          (null as any)),i1.ɵdid(16384,(null as any),0,i11.MdRaisedButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),i1.ɵprd(8448,(null as any),i10.MATERIAL_COMPATIBILITY_MODE,
          true,([] as any[])),(_l()(),i1.ɵted(0,['Make Payment'])),(_l()(),i1.ɵted((null as any),
          ['  \n    \n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),10,'div',
          [['class','payment-paypal__footnote'],['id','payment-paypal-footnote']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'div',[['class','payment-paypal__footnote-text']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            PayPal supports payments via bank transfer, credit card, debit card and AMEX.\n        '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'div',[['class','payment-paypal__footnote-text']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            Payments submitted before 6pm AEST will reach your account by the next business day.\n        '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'div',[['class','payment-paypal__footnote-text']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          [' \n            Any payments submitted after 6pm AEST will take up to 2 business days to reach your account. If you have paid your outstanding bills in full, you can disregard any payment reminder notices during this period.\n        '])),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),['\n\n    '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_PaymentPaypalComponent_2)),
      i1.ɵdid(16384,(null as any),0,i7.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:i8.PaymentPaypalComponent = _v.component;
    const currVal_0:any = _co.hasError;
    _ck(_v,3,0,currVal_0);
    const currVal_2:any = 'accent';
    _ck(_v,10,0,currVal_2);
    const currVal_3:any = _co.paypalLoading;
    _ck(_v,28,0,currVal_3);
  },(_ck,_v) => {
    const currVal_1:any = (i1.ɵnov(_v,10).disabled || (null as any));
    _ck(_v,8,0,currVal_1);
  });
}
export function View_PaymentPaypalComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-payment-paypal',
      ([] as any[]),(null as any),(null as any),(null as any),View_PaymentPaypalComponent_0,
      RenderType_PaymentPaypalComponent)),i1.ɵdid(49152,(null as any),0,i8.PaymentPaypalComponent,
      [i14.ConfigService,i15.PaypalApiService,i16.IMessageBusService,i17.DataLayerService],
      (null as any),(null as any))],(null as any),(null as any));
}
export const PaymentPaypalComponentNgFactory:i1.ComponentFactory<i8.PaymentPaypalComponent> = i1.ɵccf('agl-payment-paypal',
    i8.PaymentPaypalComponent,View_PaymentPaypalComponent_Host_0,{paymentDetails:'paymentDetails',
        content:'content'},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvcGF5bWVudC9wYXltZW50TWV0aG9kcy9wYXlwYWwvcGF5bWVudC5wYXlwYWwuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50L3BheW1lbnQvcGF5bWVudE1ldGhvZHMvcGF5cGFsL3BheW1lbnQucGF5cGFsLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50L3BheW1lbnQvcGF5bWVudE1ldGhvZHMvcGF5cGFsL3BheW1lbnQucGF5cGFsLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvcGF5bWVudC9wYXltZW50TWV0aG9kcy9wYXlwYWwvcGF5bWVudC5wYXlwYWwuY29tcG9uZW50LnRzLlBheW1lbnRQYXlwYWxDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGlkPVwicGF5bWVudC1wYXlwYWxcIj5cclxuICAgIDxhZ2wtYWxlcnQgKm5nSWY9XCJoYXNFcnJvclwiIGFsZXJ0VHlwZT1cImVycm9yXCIgW2hlYWRpbmddPVwiZXJyb3JNZXNzYWdlSGVhZGVyXCIgW2JvZHldPVwiZXJyb3JNZXNzYWdlXCI+PC9hZ2wtYWxlcnQ+XHJcbiAgICBcclxuICAgIDxkaXYgaWQ9XCJwYXltZW50LXBheXBhbC1jb250ZW50XCIgY2xhc3M9XCJwYXltZW50LXBheXBhbF9fY29udGVudFwiPlxyXG4gICAgICAgIFVzZSBhbnkgbGlua2VkIGNyZWRpdCBjYXJkIG9yIGFjY291bnQuIE5vIHBheW1lbnQgcHJvY2Vzc2luZyBmZWVzIGFwcGx5LlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGJ1dHRvbiBpZD1cIm1ha2UtcGF5bWVudC1wYXlwYWxcIiBjbGFzcz1cInBheW1lbnQtcGF5cGFsX19idXR0b25cIiBtZC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwiYWNjZW50XCIgKGNsaWNrKT1cInBheUJ5UGF5UGFsKClcIj5NYWtlIFBheW1lbnQ8L2J1dHRvbj4gIFxyXG4gICAgXHJcbiAgICA8ZGl2IGlkPVwicGF5bWVudC1wYXlwYWwtZm9vdG5vdGVcIiBjbGFzcz1cInBheW1lbnQtcGF5cGFsX19mb290bm90ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYXltZW50LXBheXBhbF9fZm9vdG5vdGUtdGV4dFwiPlxyXG4gICAgICAgICAgICBQYXlQYWwgc3VwcG9ydHMgcGF5bWVudHMgdmlhIGJhbmsgdHJhbnNmZXIsIGNyZWRpdCBjYXJkLCBkZWJpdCBjYXJkIGFuZCBBTUVYLlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYXltZW50LXBheXBhbF9fZm9vdG5vdGUtdGV4dFwiPlxyXG4gICAgICAgICAgICBQYXltZW50cyBzdWJtaXR0ZWQgYmVmb3JlIDZwbSBBRVNUIHdpbGwgcmVhY2ggeW91ciBhY2NvdW50IGJ5IHRoZSBuZXh0IGJ1c2luZXNzIGRheS5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC1wYXlwYWxfX2Zvb3Rub3RlLXRleHRcIj4gXHJcbiAgICAgICAgICAgIEFueSBwYXltZW50cyBzdWJtaXR0ZWQgYWZ0ZXIgNnBtIEFFU1Qgd2lsbCB0YWtlIHVwIHRvIDIgYnVzaW5lc3MgZGF5cyB0byByZWFjaCB5b3VyIGFjY291bnQuIElmIHlvdSBoYXZlIHBhaWQgeW91ciBvdXRzdGFuZGluZyBiaWxscyBpbiBmdWxsLCB5b3UgY2FuIGRpc3JlZ2FyZCBhbnkgcGF5bWVudCByZW1pbmRlciBub3RpY2VzIGR1cmluZyB0aGlzIHBlcmlvZC5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxhZ2wtbG9hZGVyICpuZ0lmPVwicGF5cGFsTG9hZGluZ1wiIGxvYWRpbmdTdWJNZXNzYWdlPVwiWW91IHdpbGwgYmUgcmVkaXJlY3RlZCB0byB0aGUgUGF5UGFsIHdlYnNpdGUgc2hvcnRseS5cIiBbZnVsbFNjcmVlbl09XCJ0cnVlXCI+PC9hZ2wtbG9hZGVyPlxyXG48L2Rpdj5cclxuIiwiPGFnbC1wYXltZW50LXBheXBhbD48L2FnbC1wYXltZW50LXBheXBhbD4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQ0k7TUFBQTtrQ0FBQSxVQUFBO01BQUE7TUFBQTs7SUFBNEI7SUFBa0I7SUFBK0I7SUFBN0UsV0FBNEIsVUFBa0IsVUFBK0IsU0FBN0U7Ozs7b0JBb0JBO01BQUE7TUFBQSxpRkFBQTtNQUFBO1VBQUE7SUFBa0M7SUFBMEU7SUFBNUcsV0FBa0MsVUFBMEUsU0FBNUc7Ozs7b0JBckJKO01BQUE7TUFBeUIsMkNBQ3JCO1VBQUEscUVBQUE7VUFBQTtVQUFBLGVBQStHLGlEQUUvRztpQkFBQTtjQUFBO2NBQUEsOEJBQWlFO01BRTNELDZDQUVOO1VBQUE7Y0FBQTtrQkFBQTtZQUFBO1lBQUE7WUFBZ0c7Y0FBQTtjQUFBO1lBQUE7WUFBaEc7VUFBQSxxREFBQTtVQUFBO1VBQUEsb0NBQUE7VUFBQTtVQUFBLHNCQUFBO1VBQUEsa0RBQUE7VUFBQSxvQkFBd0gscUNBQXFCO1VBQUEscUJBRTdJO1VBQUE7VUFBQTtNQUFtRSwrQ0FDL0Q7VUFBQTtVQUFBLDBEQUEyQztVQUFBO01BRXJDLCtDQUNOO1VBQUE7VUFBQSwwREFBMkM7VUFBQTtNQUVyQywrQ0FDTjtVQUFBO1VBQUEsMERBQTJDO1VBQUE7TUFFckMsMkNBQ0o7TUFFTjthQUFBO1VBQUEsd0JBQTZJLHVDQUMzSTtVQUFBOztJQXJCUztJQUFYLFdBQVcsU0FBWDtJQU1pRjtJQUFqRixZQUFpRixTQUFqRjtJQWNZO0lBQVosWUFBWSxTQUFaOztJQWRBO0lBQUEsV0FBQSxTQUFBOzs7O29CQ1BKO01BQUE7dUNBQUEsVUFBQTtNQUFBO01BQUE7Ozs7In0=