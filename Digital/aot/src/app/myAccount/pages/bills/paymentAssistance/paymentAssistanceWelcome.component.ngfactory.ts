/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './paymentAssistanceWelcome.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../maui/heading/heading.component.ngfactory';
import * as i3 from '../../../../../../../src/app/myAccount/maui/heading/heading.component';
import * as i4 from '../../../maui/button/button.component.ngfactory';
import * as i5 from '../../../../../../../src/app/myAccount/maui/button/button.component';
import * as i6 from '@angular/common';
import * as i7 from '../../../../../../../src/app/myAccount/pages/bills/paymentAssistance/paymentAssistanceWelcome.component';
import * as i8 from '../../../../../../../src/app/shared/service/config.service';
import * as i9 from '@angular/router';
import * as i10 from '../../../../../../../src/app/shared/repository/aglAuthTokenProvider';
const styles_PaymentAssistanceWelcomeComponent:any[] = [i0.styles];
export const RenderType_PaymentAssistanceWelcomeComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_PaymentAssistanceWelcomeComponent,data:{}});
function View_PaymentAssistanceWelcomeComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),41,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      9,'div',([] as any[]),(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),2,'agl-maui-heading',[['heading','Welcome to payment assistance'],
          ['subheading','We understand that energy bills can have a big impact on your budget.']],
      (null as any),(null as any),(null as any),i2.View_HeadingComponent_0,i2.RenderType_HeadingComponent)),
      i1.ɵdid(49152,(null as any),0,i3.HeadingComponent,([] as any[]),{heading:[0,
          'heading'],subheading:[1,'subheading']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),2,'agl-maui-heading',[['subheading',
          'If you need more time to pay, or would like to split up your bill into smaller instalments, you may be eligible for assistance by logging in to My Account.']],
          (null as any),(null as any),(null as any),i2.View_HeadingComponent_0,i2.RenderType_HeadingComponent)),
      i1.ɵdid(49152,(null as any),0,i3.HeadingComponent,([] as any[]),{subheading:[0,
          'subheading']},(null as any)),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),5,'div',
          [['class','payment-assistance-welcome__button-login']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),2,'agl-maui-button',
          ([] as any[]),(null as any),[[(null as any),'clicked']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('clicked' === en)) {
              const pd_0:any = ((<any>_co.login()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i4.View_ButtonComponent_0,i4.RenderType_ButtonComponent)),i1.ɵdid(49152,
          (null as any),0,i5.ButtonComponent,([] as any[]),(null as any),{clicked:'clicked'}),
      (_l()(),i1.ɵted(0,['Log in'])),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵted((null as any),['\n\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),4,'div',[['class','payment-assistance-welcome__text-login']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['Log in using your usual My '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'span',[['class','payment-assistance-welcome__text-no-wrap']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['Account credentials.'])),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵted((null as any),['\n\n        '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),5,'div',[['class','payment-assistance-welcome__button-register']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),2,'agl-maui-button',[['type','secondary']],(null as any),[[(null as any),
              'clicked']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('clicked' === en)) {
              const pd_0:any = ((<any>_co.register()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i4.View_ButtonComponent_0,i4.RenderType_ButtonComponent)),i1.ɵdid(49152,
          (null as any),0,i5.ButtonComponent,([] as any[]),{type:[0,'type']},{clicked:'clicked'}),
      (_l()(),i1.ɵted(0,['New user? Register now'])),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵted((null as any),['\n\n        '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),7,'div',[['class','payment-assistance-welcome__text-register']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            To register, you will need your account number, '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['the name that appears on your first bill,'])),(_l()(),i1.ɵted((null as any),
          [' '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class',
          'payment-assistance-welcome__text-no-wrap']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['and your date of birth.'])),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵted((null as any),['\n    ']))],(_ck,_v) => {
    const currVal_0:any = 'Welcome to payment assistance';
    const currVal_1:any = 'We understand that energy bills can have a big impact on your budget.';
    _ck(_v,5,0,currVal_0,currVal_1);
    const currVal_2:any = 'If you need more time to pay, or would like to split up your bill into smaller instalments, you may be eligible for assistance by logging in to My Account.';
    _ck(_v,9,0,currVal_2);
    const currVal_3:any = 'secondary';
    _ck(_v,29,0,currVal_3);
  },(null as any));
}
export function View_PaymentAssistanceWelcomeComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',[['class',
      'payment-assistance-welcome']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵand(16777216,
      (null as any),(null as any),1,(null as any),View_PaymentAssistanceWelcomeComponent_1)),
      i1.ɵdid(16384,(null as any),0,i6.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:i7.PaymentAssistanceWelcomeComponent = _v.component;
    const currVal_0:any = _co.showPage;
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
export function View_PaymentAssistanceWelcomeComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-payment-assistance-welcome',
      ([] as any[]),(null as any),(null as any),(null as any),View_PaymentAssistanceWelcomeComponent_0,
      RenderType_PaymentAssistanceWelcomeComponent)),i1.ɵdid(114688,(null as any),
      0,i7.PaymentAssistanceWelcomeComponent,[i8.ConfigService,i9.Router,i10.AglAuthTokenProvider],
      (null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const PaymentAssistanceWelcomeComponentNgFactory:i1.ComponentFactory<i7.PaymentAssistanceWelcomeComponent> = i1.ɵccf('agl-payment-assistance-welcome',
    i7.PaymentAssistanceWelcomeComponent,View_PaymentAssistanceWelcomeComponent_Host_0,
    {},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9iaWxscy9wYXltZW50QXNzaXN0YW5jZS9wYXltZW50QXNzaXN0YW5jZVdlbGNvbWUuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvYmlsbHMvcGF5bWVudEFzc2lzdGFuY2UvcGF5bWVudEFzc2lzdGFuY2VXZWxjb21lLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvYmlsbHMvcGF5bWVudEFzc2lzdGFuY2UvcGF5bWVudEFzc2lzdGFuY2VXZWxjb21lLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9iaWxscy9wYXltZW50QXNzaXN0YW5jZS9wYXltZW50QXNzaXN0YW5jZVdlbGNvbWUuY29tcG9uZW50LnRzLlBheW1lbnRBc3Npc3RhbmNlV2VsY29tZUNvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxkaXYgY2xhc3M9XCJwYXltZW50LWFzc2lzdGFuY2Utd2VsY29tZVwiPlxyXG4gICAgPGRpdiAqbmdJZj1cInNob3dQYWdlXCI+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGFnbC1tYXVpLWhlYWRpbmdcclxuICAgICAgICAgICAgICAgIGhlYWRpbmc9XCJXZWxjb21lIHRvIHBheW1lbnQgYXNzaXN0YW5jZVwiXHJcbiAgICAgICAgICAgICAgICBzdWJoZWFkaW5nPVwiV2UgdW5kZXJzdGFuZCB0aGF0IGVuZXJneSBiaWxscyBjYW4gaGF2ZSBhIGJpZyBpbXBhY3Qgb24geW91ciBidWRnZXQuXCI+XHJcbiAgICAgICAgICAgIDwvYWdsLW1hdWktaGVhZGluZz5cclxuICAgICAgICAgICAgPGFnbC1tYXVpLWhlYWRpbmdcclxuICAgICAgICAgICAgICAgIHN1YmhlYWRpbmc9XCJJZiB5b3UgbmVlZCBtb3JlIHRpbWUgdG8gcGF5LCBvciB3b3VsZCBsaWtlIHRvIHNwbGl0IHVwIHlvdXIgYmlsbCBpbnRvIHNtYWxsZXIgaW5zdGFsbWVudHMsIHlvdSBtYXkgYmUgZWxpZ2libGUgZm9yIGFzc2lzdGFuY2UgYnkgbG9nZ2luZyBpbiB0byBNeSBBY2NvdW50LlwiPlxyXG4gICAgICAgICAgICA8L2FnbC1tYXVpLWhlYWRpbmc+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYXltZW50LWFzc2lzdGFuY2Utd2VsY29tZV9fYnV0dG9uLWxvZ2luXCI+XHJcbiAgICAgICAgICAgIDxhZ2wtbWF1aS1idXR0b24gKGNsaWNrZWQpPVwibG9naW4oKVwiPkxvZyBpbjwvYWdsLW1hdWktYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC1hc3Npc3RhbmNlLXdlbGNvbWVfX3RleHQtbG9naW5cIj5Mb2cgaW4gdXNpbmcgeW91ciB1c3VhbCBNeSA8c3BhbiBjbGFzcz1cInBheW1lbnQtYXNzaXN0YW5jZS13ZWxjb21lX190ZXh0LW5vLXdyYXBcIj5BY2NvdW50IGNyZWRlbnRpYWxzLjwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBheW1lbnQtYXNzaXN0YW5jZS13ZWxjb21lX19idXR0b24tcmVnaXN0ZXJcIj5cclxuICAgICAgICAgICAgPGFnbC1tYXVpLWJ1dHRvbiB0eXBlPVwic2Vjb25kYXJ5XCIgKGNsaWNrZWQpPVwicmVnaXN0ZXIoKVwiPk5ldyB1c2VyPyBSZWdpc3RlciBub3c8L2FnbC1tYXVpLWJ1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBheW1lbnQtYXNzaXN0YW5jZS13ZWxjb21lX190ZXh0LXJlZ2lzdGVyXCI+XHJcbiAgICAgICAgICAgIFRvIHJlZ2lzdGVyLCB5b3Ugd2lsbCBuZWVkIHlvdXIgYWNjb3VudCBudW1iZXIsIDxzcGFuPnRoZSBuYW1lIHRoYXQgYXBwZWFycyBvbiB5b3VyIGZpcnN0IGJpbGwsPC9zcGFuPiA8c3BhbiBjbGFzcz1cInBheW1lbnQtYXNzaXN0YW5jZS13ZWxjb21lX190ZXh0LW5vLXdyYXBcIj5hbmQgeW91ciBkYXRlIG9mIGJpcnRoLjwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuIiwiPGFnbC1wYXltZW50LWFzc2lzdGFuY2Utd2VsY29tZT48L2FnbC1wYXltZW50LWFzc2lzdGFuY2Utd2VsY29tZT4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNDSTtNQUFBLHdFQUFzQjthQUFBLGdDQUNsQjtNQUFBO01BQUEsZ0JBQUssbURBQ0Q7TUFBQTtVQUFBO01BQUE7YUFBQTtVQUFBLHVEQUV1RjtVQUFBLHFCQUNwRTtNQUNuQjtVQUFBO1VBQUE7YUFBQTtVQUFBLDhCQUM2SztNQUMxSiwrQ0FDakI7VUFBQSxtQkFFTjtVQUFBO1VBQUEsNENBQXNEO1VBQUEscUJBQ2xEO1VBQUE7WUFBQTtZQUFBO1lBQWlCO2NBQUE7Y0FBQTtZQUFBO1lBQWpCO1VBQUEsbUVBQUE7VUFBQTtNQUFxQywrQkFBd0I7TUFDM0QsaURBRU47VUFBQTtVQUFBO01BQW9ELGdFQUEyQjtVQUFBO1VBQUE7TUFBdUQseURBQTJCO1VBQUEsaUJBQzNKLGlEQUVOO2lCQUFBO2NBQUE7TUFBeUQsbURBQ3JEO1VBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBa0M7Y0FBQTtjQUFBO1lBQUE7WUFBbEM7VUFBQSxtRUFBQTtVQUFBO01BQXlELCtDQUF3QztVQUFBLGlCQUMvRixpREFFTjtpQkFBQTtjQUFBO01BQXVEO01BQ0g7VUFBQSwwREFBTTtVQUFBLGdEQUFnRDtVQUFBLFFBQUM7VUFBQTtVQUFBLDRDQUF1RDtVQUFBLDhCQUE4QjtNQUMxTDtJQXJCRTtJQUNBO0lBRkosV0FDSSxVQUNBLFNBRko7SUFLSTtJQURKLFdBQ0ksU0FESjtJQWFpQjtJQUFqQixZQUFpQixTQUFqQjs7OztvQkFwQlo7TUFBQTtNQUFBLGdCQUF3QywyQ0FDcEM7TUFBQTthQUFBO1VBQUEsd0JBeUJNLHVDQUNKO1VBQUE7O0lBMUJHO0lBQUwsV0FBSyxTQUFMOzs7O29CQ0RKO01BQUE7a0RBQUEsVUFBQTtNQUFBO01BQUE7SUFBQTs7Ozs7In0=
