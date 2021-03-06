/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './paymentContainer.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from './paymentSelect.component.ngfactory';
import * as i3 from '../../../../../../src/app/shared/component/payment/paymentSelect.component';
import * as i4 from '../../../../../../src/app/shared/service/content.service';
import * as i5 from '../../../../../../src/app/myAccount/services/featureFlag.service';
import * as i6 from '../../../../../../src/app/shared/service/api.service';
import * as i7 from '../../../../../../src/app/myAccount/services/settings/paymentMethods.service.interface';
import * as i8 from '../../../../../../src/app/shared/service/contract/imessageBus.service';
import * as i9 from '../../../../../../src/app/shared/service/dataLayer.service';
import * as i10 from './payg/paygBonus.component.ngfactory';
import * as i11 from '../../../../../../src/app/shared/component/payment/payg/paygBonus.component';
import * as i12 from './paymentSuccess.component.ngfactory';
import * as i13 from '../../../../../../src/app/shared/component/payment/paymentSuccess.component';
import * as i14 from '../../../../../../src/app/shared/service/now.service';
import * as i15 from '../../../../../../src/app/shared/service/email.receipt.service';
import * as i16 from '../../../../../../src/app/myAccount/dashboard/dashboard.component';
import * as i17 from '../../../../../../src/app/myAccount/services/account.service';
import * as i18 from '../../../../../../src/app/shared/service/config.service';
import * as i19 from '../../../../../../src/app/myAccount/modal/modal.service';
import * as i20 from '../../../../../../src/app/myAccount/services/event.service';
import * as i21 from '../../../../../../src/app/shared/messages/alertMessages';
import * as i22 from '../../../../../../src/app/myAccount/services/contract/idecisioning.service';
import * as i23 from '@angular/common';
import * as i24 from '../../../../../../src/app/myAccount/pipes/addressFormatter.pipe';
import * as i25 from '../../../../../../src/app/shared/component/payment/paymentContainer.component';
const styles_PaymentContainerComponent:any[] = [i0.styles];
export const RenderType_PaymentContainerComponent:i1.RendererType2 = i1.??crt({encapsulation:0,
    styles:styles_PaymentContainerComponent,data:{}});
function View_PaymentContainerComponent_1(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[(_l()(),i1.??eld(0,(null as any),(null as any),21,'div',[['class',
      'row'],['id','payment-customer-details']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.??ted((null as any),['\n        '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),9,'div',[['class','col-xs-12 col-sm-6 payment-container--left'],
          ['id','payment-address-container']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.??ted((null as any),['\n            '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),2,'div',[['class','payment-container__label'],
          ['id','payment-address-label']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.??ted((null as any),['You are paying for ',
          ' at'])),i1.??ppd(1),(_l()(),i1.??ted((null as any),['\n            '])),(_l()(),
          i1.??eld(0,(null as any),(null as any),2,'div',[['class','payment-container__text'],
              ['id','payment-address-text']],(null as any),(null as any),(null as any),
              (null as any),(null as any))),(_l()(),i1.??ted((null as any),['',''])),
      i1.??ppd(1),(_l()(),i1.??ted((null as any),['\n        '])),(_l()(),i1.??ted((null as any),
          ['\n        '])),(_l()(),i1.??eld(0,(null as any),(null as any),7,'div',[['class',
          'col-xs-12 col-sm-6 payment-container--right'],['id','payment-reference-container']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.??ted((null as any),['\n            '])),(_l()(),i1.??eld(0,(null as any),
          (null as any),1,'div',[['class','payment-container__label'],['id','payment-reference-label']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.??ted((null as any),['Reference number'])),(_l()(),i1.??ted((null as any),
          ['\n            '])),(_l()(),i1.??eld(0,(null as any),(null as any),1,'div',
          [['class','payment-container__text'],['id','payment-reference-text']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.??ted((null as any),
          ['',''])),(_l()(),i1.??ted((null as any),['\n        '])),(_l()(),i1.??ted((null as any),
          ['\n    ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = i1.??unv(_v,5,0,_ck(_v,6,0,i1.??nov((<any>_v.parent),0),_co.fuelType));
    _ck(_v,5,0,currVal_0);
    const currVal_1:any = i1.??unv(_v,9,0,_ck(_v,10,0,i1.??nov((<any>_v.parent),1),_co.address));
    _ck(_v,9,0,currVal_1);
    const currVal_2:any = _co.reference;
    _ck(_v,19,0,currVal_2);
  });
}
function View_PaymentContainerComponent_2(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[(_l()(),i1.??eld(0,(null as any),(null as any),1,'agl-payment-select',
      ([] as any[]),(null as any),(null as any),(null as any),i2.View_PaymentSelectComponent_0,
      i2.RenderType_PaymentSelectComponent)),i1.??did(8503296,[[1,4],['paymentSelect',
      4]],0,i3.PaymentSelectComponent,[i4.ContentService,i5.FeatureFlagService,i6.ApiService,
      i1.ChangeDetectorRef,i7.IPaymentMethodsService,i6.ApiService,i8.IMessageBusService,
      i9.DataLayerService],{paymentDetails:[0,'paymentDetails'],bonusBands:[1,'bonusBands'],
      isDirectDebit:[2,'isDirectDebit'],isSmsPay:[3,'isSmsPay']},(null as any))],(_ck,
      _v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.paymentDetails;
    const currVal_1:any = _co.bonusBands;
    const currVal_2:any = ((_co.data == null)? (null as any): _co.data.isDirectDebit);
    const currVal_3:any = ((_co.data == null)? (null as any): _co.data.isSmsPay);
    _ck(_v,1,0,currVal_0,currVal_1,currVal_2,currVal_3);
  },(null as any));
}
function View_PaymentContainerComponent_3(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[(_l()(),i1.??eld(0,(null as any),(null as any),1,'agl-payg-bonus',
      ([] as any[]),(null as any),[[(null as any),'onSelectAmount']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('onSelectAmount' === en)) {
          const pd_0:any = ((<any>_co.onPAYGSelectAmount($event)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i10.View_PaygBonusComponent_0,i10.RenderType_PaygBonusComponent)),i1.??did(114688,
      (null as any),0,i11.PaygBonusComponent,[i4.ContentService],{paymentDetails:[0,
          'paymentDetails'],bonusBands:[1,'bonusBands']},{onSelectAmount:'onSelectAmount'})],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.paymentDetails;
        const currVal_1:any = _co.bonusBands;
        _ck(_v,1,0,currVal_0,currVal_1);
      },(null as any));
}
function View_PaymentContainerComponent_4(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[(_l()(),i1.??eld(0,(null as any),(null as any),1,'agl-payment-success',
      [['id','agl-payment-success']],(null as any),(null as any),(null as any),i12.View_PaymentSuccessComponent_0,
      i12.RenderType_PaymentSuccessComponent)),i1.??did(4308992,[[2,4],['paymentSuccess',
      4]],0,i13.PaymentSuccessComponent,[i14.Now,i4.ContentService,i15.EmailReceiptService,
      i16.DashboardComponent,i17.IAccountServiceMA,i18.ConfigService,i19.ModalService,
      i20.EventService,i6.ApiService,i21.AlertMessages,i9.DataLayerService,i5.FeatureFlagService,
      i22.IDecisioningService],{paymentDetails:[0,'paymentDetails']},(null as any))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.paymentDetails;
        _ck(_v,1,0,currVal_0);
      },(null as any));
}
export function View_PaymentContainerComponent_0(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[i1.??pid(0,i23.LowerCasePipe,([] as any[])),i1.??pid(0,i24.AddressFormatterPipe,
      ([] as any[])),i1.??qud(671088640,1,{paymentSelect:0}),i1.??qud(671088640,2,{paymentSuccess:0}),
      (_l()(),i1.??eld(0,(null as any),(null as any),16,'div',[['class','payment-container'],
          ['id','payment-container']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.??ted((null as any),['\n    '])),(_l()(),i1.??and(16777216,
          (null as any),(null as any),1,(null as any),View_PaymentContainerComponent_1)),
      i1.??did(16384,(null as any),0,i23.NgIf,[i1.ViewContainerRef,i1.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.??ted((null as any),['\n    '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),7,'div',[['class','payment-container__main'],
          ['id','payment-container-main']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.??ted((null as any),['\n        '])),
      (_l()(),i1.??and(16777216,(null as any),(null as any),1,(null as any),View_PaymentContainerComponent_2)),
      i1.??did(16384,(null as any),0,i23.NgIf,[i1.ViewContainerRef,i1.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.??ted((null as any),['\n        '])),
      (_l()(),i1.??and(16777216,(null as any),(null as any),1,(null as any),View_PaymentContainerComponent_3)),
      i1.??did(16384,(null as any),0,i23.NgIf,[i1.ViewContainerRef,i1.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.??ted((null as any),['\n    '])),
      (_l()(),i1.??ted((null as any),['\n    '])),(_l()(),i1.??and(16777216,(null as any),
          (null as any),1,(null as any),View_PaymentContainerComponent_4)),i1.??did(16384,
          (null as any),0,i23.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.??ted((null as any),['\n'])),(_l()(),i1.??ted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:i25.PaymentContainerComponent = _v.component;
    const currVal_0:any = (_co.currentView !== _co.PaymentViewEnum.PaymentSuccess);
    _ck(_v,7,0,currVal_0);
    const currVal_1:any = (_co.currentView === _co.PaymentViewEnum.MakePayment);
    _ck(_v,12,0,currVal_1);
    const currVal_2:any = (_co.currentView === _co.PaymentViewEnum.PAYGBonusSelect);
    _ck(_v,15,0,currVal_2);
    const currVal_3:any = (_co.currentView == _co.PaymentViewEnum.PaymentSuccess);
    _ck(_v,19,0,currVal_3);
  },(null as any));
}
export function View_PaymentContainerComponent_Host_0(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[(_l()(),i1.??eld(0,(null as any),(null as any),1,'agl-payment-form',
      ([] as any[]),(null as any),(null as any),(null as any),View_PaymentContainerComponent_0,
      RenderType_PaymentContainerComponent)),i1.??did(114688,(null as any),0,i25.PaymentContainerComponent,
      [i8.IMessageBusService,i9.DataLayerService],(null as any),(null as any))],(_ck,
      _v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const PaymentContainerComponentNgFactory:i1.ComponentFactory<i25.PaymentContainerComponent> = i1.??ccf('agl-payment-form',
    i25.PaymentContainerComponent,View_PaymentContainerComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvcGF5bWVudC9wYXltZW50Q29udGFpbmVyLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudC9wYXltZW50L3BheW1lbnRDb250YWluZXIuY29tcG9uZW50LnRzIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvcGF5bWVudC9wYXltZW50Q29udGFpbmVyLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvcGF5bWVudC9wYXltZW50Q29udGFpbmVyLmNvbXBvbmVudC50cy5QYXltZW50Q29udGFpbmVyQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPGRpdiBpZD1cInBheW1lbnQtY29udGFpbmVyXCIgY2xhc3M9XCJwYXltZW50LWNvbnRhaW5lclwiPlxyXG4gICAgPGRpdiBpZD1cInBheW1lbnQtY3VzdG9tZXItZGV0YWlsc1wiICpuZ0lmPVwiY3VycmVudFZpZXcgIT09IFBheW1lbnRWaWV3RW51bS5QYXltZW50U3VjY2Vzc1wiIGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiBpZD1cInBheW1lbnQtYWRkcmVzcy1jb250YWluZXJcIiBjbGFzcz1cImNvbC14cy0xMiBjb2wtc20tNiBwYXltZW50LWNvbnRhaW5lci0tbGVmdFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwicGF5bWVudC1hZGRyZXNzLWxhYmVsXCIgY2xhc3M9XCJwYXltZW50LWNvbnRhaW5lcl9fbGFiZWxcIj5Zb3UgYXJlIHBheWluZyBmb3Ige3tmdWVsVHlwZSB8IGxvd2VyY2FzZX19IGF0PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJwYXltZW50LWFkZHJlc3MtdGV4dFwiIGNsYXNzPVwicGF5bWVudC1jb250YWluZXJfX3RleHRcIj57e2FkZHJlc3MgfCBhZ2xBZGRyZXNzRm9ybWF0dGVyfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkPVwicGF5bWVudC1yZWZlcmVuY2UtY29udGFpbmVyXCIgY2xhc3M9XCJjb2wteHMtMTIgY29sLXNtLTYgcGF5bWVudC1jb250YWluZXItLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJwYXltZW50LXJlZmVyZW5jZS1sYWJlbFwiIGNsYXNzPVwicGF5bWVudC1jb250YWluZXJfX2xhYmVsXCI+UmVmZXJlbmNlIG51bWJlcjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwicGF5bWVudC1yZWZlcmVuY2UtdGV4dFwiIGNsYXNzPVwicGF5bWVudC1jb250YWluZXJfX3RleHRcIj57e3JlZmVyZW5jZX19PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgaWQ9XCJwYXltZW50LWNvbnRhaW5lci1tYWluXCIgY2xhc3M9XCJwYXltZW50LWNvbnRhaW5lcl9fbWFpblwiPlxyXG4gICAgICAgIDxhZ2wtcGF5bWVudC1zZWxlY3QgI3BheW1lbnRTZWxlY3RcclxuICAgICAgICBbaXNTbXNQYXldPVwiZGF0YT8uaXNTbXNQYXlcIlxyXG4gICAgICAgIFtpc0RpcmVjdERlYml0XT1cImRhdGE/LmlzRGlyZWN0RGViaXRcIlxyXG4gICAgICAgIFtwYXltZW50RGV0YWlsc109XCJwYXltZW50RGV0YWlsc1wiIFtib251c0JhbmRzXT1cImJvbnVzQmFuZHNcIiAqbmdJZj1cImN1cnJlbnRWaWV3ID09PSBQYXltZW50Vmlld0VudW0uTWFrZVBheW1lbnRcIj48L2FnbC1wYXltZW50LXNlbGVjdD5cclxuICAgICAgICA8YWdsLXBheWctYm9udXMgW3BheW1lbnREZXRhaWxzXT1cInBheW1lbnREZXRhaWxzXCIgW2JvbnVzQmFuZHNdPVwiYm9udXNCYW5kc1wiIChvblNlbGVjdEFtb3VudCk9XCJvblBBWUdTZWxlY3RBbW91bnQoJGV2ZW50KVwiICpuZ0lmPVwiY3VycmVudFZpZXcgPT09IFBheW1lbnRWaWV3RW51bS5QQVlHQm9udXNTZWxlY3RcIj48L2FnbC1wYXlnLWJvbnVzPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8YWdsLXBheW1lbnQtc3VjY2VzcyBpZD1cImFnbC1wYXltZW50LXN1Y2Nlc3NcIiAjcGF5bWVudFN1Y2Nlc3MgW3BheW1lbnREZXRhaWxzXT1cInBheW1lbnREZXRhaWxzXCIgKm5nSWY9XCJjdXJyZW50VmlldyA9PSBQYXltZW50Vmlld0VudW0uUGF5bWVudFN1Y2Nlc3NcIj48L2FnbC1wYXltZW50LXN1Y2Nlc3M+XHJcbjwvZGl2PlxyXG4iLCI8YWdsLXBheW1lbnQtZm9ybT48L2FnbC1wYXltZW50LWZvcm0+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQ0k7TUFBQTtNQUFBLDhCQUFzRztNQUNsRztVQUFBO1VBQUEsOEJBQXVGO01BQ25GO1VBQUE7VUFBQSw4QkFBaUU7VUFBQSxvQkFBb0QsbURBQ3JIO2lCQUFBO2NBQUE7Y0FBQSw4QkFBK0Q7YUFBQSxJQUF1QywrQ0FDcEc7VUFBQSxpQkFDTjtVQUFBO1VBQUE7TUFBMEYsbURBQ3RGO1VBQUE7VUFBQTtNQUFtRSxxREFBc0I7VUFBQSxxQkFDekY7VUFBQTtVQUFBLDBEQUFpRTtVQUFBLFVBQW1CLCtDQUNsRjtVQUFBOztJQU4rRDtJQUFBO0lBQ0Y7SUFBQTtJQUlFO0lBQUE7Ozs7b0JBSXJFO01BQUE7MENBQUEsVUFBQTtNQUFBOzt5QkFBQTtNQUFBOzs7SUFHQTtJQUFrQztJQURsQztJQURBO0lBREEsV0FHQSxVQUFrQyxVQURsQyxVQURBLFNBREE7Ozs7b0JBSUE7TUFBQTtRQUFBO1FBQUE7UUFBNEU7VUFBQTtVQUFBO1FBQUE7UUFBNUU7TUFBQSwyRUFBQTtNQUFBO1VBQUE7OztRQUFnQjtRQUFrQztRQUFsRCxXQUFnQixVQUFrQyxTQUFsRDs7OztvQkFFSjtNQUFBOzRDQUFBLFVBQUE7TUFBQTs7OzZCQUFBOzs7UUFBOEQ7UUFBOUQsV0FBOEQsU0FBOUQ7Ozs7OztNQWxCSjtVQUFBO1VBQUEsZ0JBQXNELDJDQUNsRDtVQUFBO2FBQUE7VUFBQSxpQ0FTTTtNQUNOO1VBQUE7VUFBQSw4QkFBaUU7TUFDN0Q7YUFBQTtVQUFBLGlDQUdxSTtNQUNySTthQUFBO1VBQUEsaUNBQW1NO01BQ2pNLDJDQUNOO1VBQUEsd0VBQUE7VUFBQTtVQUFBLGVBQTRLLHVDQUMxSztVQUFBOztJQWxCaUM7SUFBbkMsV0FBbUMsU0FBbkM7SUFjZ0U7SUFINUQsWUFHNEQsU0FINUQ7SUFJMEg7SUFBMUgsWUFBMEgsU0FBMUg7SUFFNEY7SUFBaEcsWUFBZ0csU0FBaEc7Ozs7b0JDbEJKO01BQUE7MENBQUEsVUFBQTtNQUFBOztJQUFBOzs7OyJ9
