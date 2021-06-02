/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './paymentSmsPayBanner.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../ctaButton/ctaButton.component.ngfactory';
import * as i3 from '../../../../../../../src/app/shared/component/ctaButton/ctaButton.component';
import * as i4 from '@angular/common';
import * as i5 from '../../../../../../../src/app/shared/component/payment/paymentSmsPayBanner/paymentSmsPayBanner.component';
import * as i6 from '../../../../../../../src/app/shared/service/api.service';
import * as i7 from '@angular/router';
import * as i8 from '../../../../../../../src/app/myAccount/services/contract/idecisioning.service';
const styles_PaymentSmsPayBannerComponent:any[] = [i0.styles];
export const RenderType_PaymentSmsPayBannerComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_PaymentSmsPayBannerComponent,data:{}});
function View_PaymentSmsPayBannerComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),25,'div',[['class',
      'payment-sms-banner']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),22,'div',[['class','payment-sms-banner__container']],
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      3,'div',[['class','payment-sms-banner__icon']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'img',[['alt','SMS PAY icon'],
          ['class','payment-sms-banner__icon--elec'],['src','svg/icon_smspay.svg']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',[['class',
          'payment-sms-banner__text']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','payment-sms-banner__text-header']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['SMS Pay is here'])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',
          [['class','payment-sms-banner__text-subtext']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['Set up SMS Pay and we\'ll text you a few days before payment is due. Just reply \'Pay\' and we\'ll deduct your payment on the due date.'])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),5,'div',
          [['class','payment-sms-banner__cta']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),2,'agl-cta-button',([] as any[]),
          (null as any),[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.onClickSetupSmsPay()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i2.View_CtaButtonComponent_0,i2.RenderType_CtaButtonComponent)),i1.ɵdid(49152,
          (null as any),0,i3.CtaButtonComponent,([] as any[]),{color:[0,'color']},
          (null as any)),(_l()(),i1.ɵted(0,['SET UP SMS PAY'])),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),
          ['\n']))],(_ck,_v) => {
    const currVal_0:any = 'primary';
    _ck(_v,21,0,currVal_0);
  },(null as any));
}
export function View_PaymentSmsPayBannerComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_PaymentSmsPayBannerComponent_1)),i1.ɵdid(16384,(null as any),0,i4.NgIf,
      [i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any))],(_ck,
      _v) => {
    var _co:i5.PaymentSmsPayBannerComponent = _v.component;
    const currVal_0:any = _co.showSmsPayPanel;
    _ck(_v,1,0,currVal_0);
  },(null as any));
}
export function View_PaymentSmsPayBannerComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-payment-smspay-banner',
      ([] as any[]),(null as any),(null as any),(null as any),View_PaymentSmsPayBannerComponent_0,
      RenderType_PaymentSmsPayBannerComponent)),i1.ɵdid(114688,(null as any),0,i5.PaymentSmsPayBannerComponent,
      [i6.ApiService,i7.Router,i8.IDecisioningService],(null as any),(null as any))],
      (_ck,_v) => {
        _ck(_v,1,0);
      },(null as any));
}
export const PaymentSmsPayBannerComponentNgFactory:i1.ComponentFactory<i5.PaymentSmsPayBannerComponent> = i1.ɵccf('agl-payment-smspay-banner',
    i5.PaymentSmsPayBannerComponent,View_PaymentSmsPayBannerComponent_Host_0,{accounts:'accounts'},
    {setupSmsPayEvent:'setupSmsPayEvent'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvcGF5bWVudC9wYXltZW50U21zUGF5QmFubmVyL3BheW1lbnRTbXNQYXlCYW5uZXIuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50L3BheW1lbnQvcGF5bWVudFNtc1BheUJhbm5lci9wYXltZW50U21zUGF5QmFubmVyLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50L3BheW1lbnQvcGF5bWVudFNtc1BheUJhbm5lci9wYXltZW50U21zUGF5QmFubmVyLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvcGF5bWVudC9wYXltZW50U21zUGF5QmFubmVyL3BheW1lbnRTbXNQYXlCYW5uZXIuY29tcG9uZW50LnRzLlBheW1lbnRTbXNQYXlCYW5uZXJDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGNsYXNzPVwicGF5bWVudC1zbXMtYmFubmVyXCIgKm5nSWY9XCJzaG93U21zUGF5UGFuZWxcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJwYXltZW50LXNtcy1iYW5uZXJfX2NvbnRhaW5lclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYXltZW50LXNtcy1iYW5uZXJfX2ljb25cIj5cclxuICAgICAgICAgICAgPGltZyBjbGFzcz1cInBheW1lbnQtc21zLWJhbm5lcl9faWNvbi0tZWxlY1wiICBzcmM9XCJzdmcvaWNvbl9zbXNwYXkuc3ZnXCIgYWx0PVwiU01TIFBBWSBpY29uXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBheW1lbnQtc21zLWJhbm5lcl9fdGV4dFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC1zbXMtYmFubmVyX190ZXh0LWhlYWRlclwiPlNNUyBQYXkgaXMgaGVyZTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC1zbXMtYmFubmVyX190ZXh0LXN1YnRleHRcIj5TZXQgdXAgU01TIFBheSBhbmQgd2UnbGwgdGV4dCB5b3UgYSBmZXcgZGF5cyBiZWZvcmUgcGF5bWVudCBpcyBkdWUuIEp1c3QgcmVwbHkgJ1BheScgYW5kIHdlJ2xsIGRlZHVjdCB5b3VyIHBheW1lbnQgb24gdGhlIGR1ZSBkYXRlLjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGF5bWVudC1zbXMtYmFubmVyX19jdGFcIj5cclxuICAgICAgICAgICAgPGFnbC1jdGEtYnV0dG9uIFtjb2xvcl09XCIncHJpbWFyeSdcIiAoY2xpY2spPSdvbkNsaWNrU2V0dXBTbXNQYXkoKSc+U0VUIFVQIFNNUyBQQVk8L2FnbC1jdGEtYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PiIsIjxhZ2wtcGF5bWVudC1zbXNwYXktYmFubmVyPjwvYWdsLXBheW1lbnQtc21zcGF5LWJhbm5lcj4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQUE7TUFBQTtNQUFBLGdCQUF3RCwyQ0FDcEQ7TUFBQTtNQUFBLHdFQUEyQzthQUFBLGdDQUN2QztNQUFBO01BQUEsOEJBQXNDO01BQ2xDO1VBQUE7VUFBQTtNQUEwRiwrQ0FDeEY7VUFBQSxpQkFDTjtVQUFBO1VBQUEsZ0JBQXNDLG1EQUNsQztpQkFBQTtjQUFBO01BQTZDLG9EQUFxQjtVQUFBLHFCQUNsRTtVQUFBO1VBQUEsNENBQThDO1VBQUE7TUFBeUksK0NBQ3JMO1VBQUEsbUJBRU47VUFBQTtVQUFBLDhCQUFxQztNQUNqQztVQUFBO1lBQUE7WUFBQTtZQUFvQztjQUFBO2NBQUE7WUFBQTtZQUFwQztVQUFBLHlFQUFBO1VBQUE7VUFBQSxlQUFtRSx1Q0FBK0I7VUFBQSxpQkFDaEcsMkNBQ0o7VUFBQTtJQUZrQjtJQUFoQixZQUFnQixTQUFoQjs7OztvQkFYWjtNQUFBLDZDQUFBO01BQUE7OztJQUFnQztJQUFoQyxXQUFnQyxTQUFoQzs7OztvQkNBQTtNQUFBOzZDQUFBLFVBQUE7TUFBQTs7UUFBQTs7Ozs7In0=
