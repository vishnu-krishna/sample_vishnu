/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './storeCreditCardForm.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/material/icon';
import * as i5 from '@angular/common';
import * as i6 from '../../../../../../src/app/myAccount/forms/storeCreditCardForm/storeCreditCardForm.component';
import * as i7 from '../../../shared/component/paymentMethods/paymentMethods.creditCard.component.ngfactory';
import * as i8 from '../../../../../../src/app/shared/component/paymentMethods/paymentMethods.creditCard.component';
import * as i9 from '../../../../../../src/app/shared/service/api.service';
import * as i10 from '../../../../../../src/app/shared/service/config.service';
import * as i11 from '@angular/platform-browser';
import * as i12 from '@angular/router';
import * as i13 from '../../../../../../src/app/shared/service/contract/imessageBus.service';
import * as i14 from '../../../../../../src/app/myAccount/services/featureFlag.service';
import * as i15 from '@angular/forms';
import * as i16 from '../../../../../../src/app/shared/validators/paymentValidators';
import * as i17 from '../../../../../../src/app/shared/service/dataLayer.service';
import * as i18 from '../../../../../../src/app/shared/component/paymentArrangement/paymentArrangementState.service';
import * as i19 from '../../../../../../src/app/myAccount/services/settings/paymentMethods.service.interface';
import * as i20 from '../../../../../../src/app/myAccount/modal/modal.service';
import * as i21 from '../../../../../../src/app/shared/messages/addCreditCardResult.message';
import * as i22 from '../../../../../../src/app/shared/messages/switchPaymentArrangementResult.message';
const styles_StoreCreditCardFormComponent:any[] = [i0.styles];
export const RenderType_StoreCreditCardFormComponent:i1.RendererType2 = i1.??crt({encapsulation:0,
    styles:styles_StoreCreditCardFormComponent,data:{}});
function View_StoreCreditCardFormComponent_1(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[(_l()(),i1.??eld(0,(null as any),(null as any),30,'div',[['class',
      'store-card-return']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.??ted((null as any),['\n    '])),(_l()(),i1.??eld(0,
      (null as any),(null as any),16,'div',[['class','desktop']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.??ted((null as any),['\n        '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),2,'md-icon',[['alt','Credit Card'],
          ['class','creditCardIcon mat-icon'],['role','img'],['svgIcon','icon-exp-bill']],
          (null as any),(null as any),(null as any),i2.View_MdIcon_0,i2.RenderType_MdIcon)),
      i1.??did(16384,(null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],
          i1.ElementRef],(null as any),(null as any)),i1.??did(638976,(null as any),
          0,i4.MdIcon,[i1.Renderer2,i1.ElementRef,i4.MdIconRegistry,[8,(null as any)]],
          {svgIcon:[0,'svgIcon']},(null as any)),(_l()(),i1.??ted((null as any),['\n        '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),1,'h1',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.??ted((null as any),
          ['Credit or debit card'])),(_l()(),i1.??ted((null as any),['\n        '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),3,'p',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.??ted((null as any),
          ['Use Mastercard or Visa.'])),(_l()(),i1.??eld(0,(null as any),(null as any),
          0,'br',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.??ted((null as any),['Transaction fee of 0.45% applies.'])),
      (_l()(),i1.??ted((null as any),['\n        '])),(_l()(),i1.??eld(0,(null as any),
          (null as any),1,'span',([] as any[]),(null as any),[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.goBack()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.??ted((null as any),['Change'])),
      (_l()(),i1.??ted((null as any),['\n    '])),(_l()(),i1.??ted((null as any),['\n    '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),9,'div',[['class','mobile']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.??ted((null as any),
          ['\n        '])),(_l()(),i1.??eld(0,(null as any),(null as any),3,'div',[['class',
          'mobile-change-method']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.??ted((null as any),['Credit or debit card'])),
      (_l()(),i1.??eld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),
          [[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.goBack()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.??ted((null as any),['Change'])),
      (_l()(),i1.??ted((null as any),['\n        '])),(_l()(),i1.??eld(0,(null as any),
          (null as any),1,'p',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.??ted((null as any),['Use Mastercard or Visa. Transaction fee of 0.45% applies.'])),
      (_l()(),i1.??ted((null as any),['\n    '])),(_l()(),i1.??ted((null as any),['\n']))],
      (_ck,_v) => {
        const currVal_0:any = 'icon-exp-bill';
        _ck(_v,6,0,currVal_0);
      },(null as any));
}
function View_StoreCreditCardFormComponent_2(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[(_l()(),i1.??eld(0,(null as any),(null as any),14,'div',[['class',
      'store-card-return']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.??ted((null as any),['\n    '])),(_l()(),i1.??eld(0,
      (null as any),(null as any),11,'div',[['class','desktop']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.??ted((null as any),['\n        '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),2,'md-icon',[['alt','Wallet'],
          ['class','creditCardIcon mat-icon'],['role','img'],['svgIcon','icon-wallet']],
          (null as any),(null as any),(null as any),i2.View_MdIcon_0,i2.RenderType_MdIcon)),
      i1.??did(16384,(null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],
          i1.ElementRef],(null as any),(null as any)),i1.??did(638976,(null as any),
          0,i4.MdIcon,[i1.Renderer2,i1.ElementRef,i4.MdIconRegistry,[8,(null as any)]],
          {svgIcon:[0,'svgIcon']},(null as any)),(_l()(),i1.??ted((null as any),['\n        '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),1,'h1',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.??ted((null as any),
          ['Wallet'])),(_l()(),i1.??ted((null as any),['\n        '])),(_l()(),i1.??eld(0,
          (null as any),(null as any),1,'p',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.??ted((null as any),
          ['You can add a Mastercard or Visa card. A 0.45% fee will apply to each payment transaction.'])),
      (_l()(),i1.??ted((null as any),['\n    '])),(_l()(),i1.??ted((null as any),['\n']))],
      (_ck,_v) => {
        const currVal_0:any = 'icon-wallet';
        _ck(_v,6,0,currVal_0);
      },(null as any));
}
export function View_StoreCreditCardFormComponent_0(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[(_l()(),i1.??and(16777216,(null as any),(null as any),1,(null as any),
      View_StoreCreditCardFormComponent_1)),i1.??did(16384,(null as any),0,i5.NgIf,
      [i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),
      i1.??ted((null as any),['\n'])),(_l()(),i1.??and(16777216,(null as any),(null as any),
      1,(null as any),View_StoreCreditCardFormComponent_2)),i1.??did(16384,(null as any),
      0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.??ted((null as any),['\n'])),(_l()(),i1.??eld(0,(null as any),(null as any),
          5,'div',[['class','store-card-form']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.??ted((null as any),['\n    '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),2,'agl-directdebitcreditcard',
          [['myWallet','true']],(null as any),[[(null as any),'onSave']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i6.StoreCreditCardFormComponent = _v.component;
            if (('onSave' === en)) {
              const pd_0:any = ((<any>_co.saveCreditCard($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i7.View_PaymentMethodsCreditCardComponent_0,i7.RenderType_PaymentMethodsCreditCardComponent)),
      i1.??did(114688,[['creditCardView',4]],0,i8.PaymentMethodsCreditCardComponent,
          [i9.ApiService,i1.Renderer,i10.ConfigService,i11.DomSanitizer,i12.ActivatedRoute,
              i13.IMessageBusService,i14.FeatureFlagService,i15.FormBuilder,i16.PaymentValidators,
              i9.ApiService,i17.DataLayerService,i18.IPaymentArrangementStateService],
          {content:[0,'content'],myWallet:[1,'myWallet'],isDirectDebit:[2,'isDirectDebit'],
              isSmsPay:[3,'isSmsPay'],isSwitchingPaymentArrangements:[4,'isSwitchingPaymentArrangements']},
          {onSave:'onSave'}),(_l()(),i1.??ted((null as any),['\n    '])),(_l()(),i1.??ted((null as any),
          ['\n'])),(_l()(),i1.??ted((null as any),['\n']))],(_ck,_v) => {
    var _co:i6.StoreCreditCardFormComponent = _v.component;
    const currVal_0:boolean = (!_co.data.isSmsPay || !_co.data.paymentArrangementPaymentMethodId);
    _ck(_v,1,0,currVal_0);
    const currVal_1:any = (_co.data.isSmsPay && _co.data.paymentArrangementPaymentMethodId);
    _ck(_v,4,0,currVal_1);
    const currVal_2:any = _co.content;
    const currVal_3:any = 'true';
    const currVal_4:any = _co.data.isDirectDebit;
    const currVal_5:any = _co.data.isSmsPay;
    const currVal_6:any = _co.isSwitchingPaymentArrangements;
    _ck(_v,9,0,currVal_2,currVal_3,currVal_4,currVal_5,currVal_6);
  },(null as any));
}
export function View_StoreCreditCardFormComponent_Host_0(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[(_l()(),i1.??eld(0,(null as any),(null as any),1,'agl-store-credit-card-form',
      ([] as any[]),(null as any),(null as any),(null as any),View_StoreCreditCardFormComponent_0,
      RenderType_StoreCreditCardFormComponent)),i1.??did(114688,(null as any),0,i6.StoreCreditCardFormComponent,
      [i19.IPaymentMethodsService,i20.ModalService,i13.IMessageBusService,i21.AddCreditCardResultMessage,
          i22.SwitchPaymentArrangementResultMessage,i17.DataLayerService,i18.IPaymentArrangementStateService],
      (null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const StoreCreditCardFormComponentNgFactory:i1.ComponentFactory<i6.StoreCreditCardFormComponent> = i1.??ccf('agl-store-credit-card-form',
    i6.StoreCreditCardFormComponent,View_StoreCreditCardFormComponent_Host_0,{data:'data',
        isSwitchingPaymentArrangements:'isSwitchingPaymentArrangements'},{returnToPreviousPage:'returnToPreviousPage'},
    ([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9mb3Jtcy9zdG9yZUNyZWRpdENhcmRGb3JtL3N0b3JlQ3JlZGl0Q2FyZEZvcm0uY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvZm9ybXMvc3RvcmVDcmVkaXRDYXJkRm9ybS9zdG9yZUNyZWRpdENhcmRGb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvZm9ybXMvc3RvcmVDcmVkaXRDYXJkRm9ybS9zdG9yZUNyZWRpdENhcmRGb3JtLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9mb3Jtcy9zdG9yZUNyZWRpdENhcmRGb3JtL3N0b3JlQ3JlZGl0Q2FyZEZvcm0uY29tcG9uZW50LnRzLlN0b3JlQ3JlZGl0Q2FyZEZvcm1Db21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2ICpuZ0lmPVwiIWRhdGEuaXNTbXNQYXkgfHwgIWRhdGEucGF5bWVudEFycmFuZ2VtZW50UGF5bWVudE1ldGhvZElkXCIgY2xhc3M9XCJzdG9yZS1jYXJkLXJldHVyblwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImRlc2t0b3BcIj5cclxuICAgICAgICA8bWQtaWNvbiBjbGFzcz1cImNyZWRpdENhcmRJY29uXCIgc3ZnSWNvbj1cImljb24tZXhwLWJpbGxcIiBhbHQ9XCJDcmVkaXQgQ2FyZFwiPjwvbWQtaWNvbj5cclxuICAgICAgICA8aDE+Q3JlZGl0IG9yIGRlYml0IGNhcmQ8L2gxPlxyXG4gICAgICAgIDxwPlVzZSBNYXN0ZXJjYXJkIG9yIFZpc2EuPGJyLz5UcmFuc2FjdGlvbiBmZWUgb2YgMC40NSUgYXBwbGllcy48L3A+XHJcbiAgICAgICAgPHNwYW4gKGNsaWNrKT1cImdvQmFjaygpXCI+Q2hhbmdlPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9iaWxlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vYmlsZS1jaGFuZ2UtbWV0aG9kXCI+Q3JlZGl0IG9yIGRlYml0IGNhcmQ8c3BhbiAoY2xpY2spPVwiZ29CYWNrKClcIj5DaGFuZ2U8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgPHA+VXNlIE1hc3RlcmNhcmQgb3IgVmlzYS4gVHJhbnNhY3Rpb24gZmVlIG9mIDAuNDUlIGFwcGxpZXMuPC9wPlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2ICpuZ0lmPVwiZGF0YS5pc1Ntc1BheSAmJiBkYXRhLnBheW1lbnRBcnJhbmdlbWVudFBheW1lbnRNZXRob2RJZFwiIGNsYXNzPVwic3RvcmUtY2FyZC1yZXR1cm5cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJkZXNrdG9wXCI+XHJcbiAgICAgICAgPG1kLWljb24gY2xhc3M9XCJjcmVkaXRDYXJkSWNvblwiIHN2Z0ljb249XCJpY29uLXdhbGxldFwiIGFsdD1cIldhbGxldFwiPjwvbWQtaWNvbj5cclxuICAgICAgICA8aDE+V2FsbGV0PC9oMT5cclxuICAgICAgICA8cD5Zb3UgY2FuIGFkZCBhIE1hc3RlcmNhcmQgb3IgVmlzYSBjYXJkLiBBIDAuNDUlIGZlZSB3aWxsIGFwcGx5IHRvIGVhY2ggcGF5bWVudCB0cmFuc2FjdGlvbi48L3A+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJzdG9yZS1jYXJkLWZvcm1cIj5cclxuICAgIDxhZ2wtZGlyZWN0ZGViaXRjcmVkaXRjYXJkXHJcbiAgICAgICAgI2NyZWRpdENhcmRWaWV3IFxyXG4gICAgICAgIFtjb250ZW50XT1cImNvbnRlbnRcIlxyXG4gICAgICAgIFtpc0RpcmVjdERlYml0XT1cImRhdGEuaXNEaXJlY3REZWJpdFwiXHJcbiAgICAgICAgW2lzU21zUGF5XT1cImRhdGEuaXNTbXNQYXlcIlxyXG4gICAgICAgIFtpc1N3aXRjaGluZ1BheW1lbnRBcnJhbmdlbWVudHNdPVwiaXNTd2l0Y2hpbmdQYXltZW50QXJyYW5nZW1lbnRzXCJcclxuICAgICAgICAob25TYXZlKT1cInNhdmVDcmVkaXRDYXJkKCRldmVudClcIlxyXG4gICAgICAgIG15V2FsbGV0PVwidHJ1ZVwiPlxyXG4gICAgPC9hZ2wtZGlyZWN0ZGViaXRjcmVkaXRjYXJkPlxyXG48L2Rpdj5cclxuIiwiPGFnbC1zdG9yZS1jcmVkaXQtY2FyZC1mb3JtPjwvYWdsLXN0b3JlLWNyZWRpdC1jYXJkLWZvcm0+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQUE7TUFBQTtNQUFBLGdCQUFpRywyQ0FDN0Y7TUFBQTtNQUFBLDRDQUFxQjtNQUNqQjtVQUFBO1VBQUE7YUFBQTt1QkFBQSxzQ0FBQTtVQUFBO1VBQUEsdUNBQW9GO01BQ3BGO1VBQUEsMERBQUk7VUFBQSwyQkFBeUI7TUFDN0I7VUFBQSwwREFBRztVQUFBLDhCQUF1QjtVQUFBO1VBQUEsZ0JBQUs7TUFBcUMsK0NBQ3BFO1VBQUE7VUFBQTtZQUFBO1lBQUE7WUFBTTtjQUFBO2NBQUE7WUFBQTtZQUFOO1VBQUEsZ0NBQXlCO01BQWEsMkNBQ3BDO01BQ047VUFBQSwwREFBb0I7VUFBQSxpQkFDaEI7VUFBQTtVQUFBLGdCQUFrQztNQUFvQjtVQUFBO1lBQUE7WUFBQTtZQUFNO2NBQUE7Y0FBQTtZQUFBO1lBQU47VUFBQSxnQ0FBeUI7TUFBbUIsK0NBQ2xHO1VBQUE7VUFBQSw4QkFBRztNQUE2RCwyQ0FDOUQ7O1FBUjhCO1FBQWhDLFdBQWdDLFNBQWhDOzs7O29CQVVSO01BQUE7TUFBQSxnQkFBK0YsMkNBQzNGO01BQUE7TUFBQSw0Q0FBcUI7TUFDakI7VUFBQTtVQUFBO2FBQUE7dUJBQUEsc0NBQUE7VUFBQTtVQUFBLHVDQUE2RTtNQUM3RTtVQUFBLDBEQUFJO1VBQUEsYUFBVywrQ0FDZjtVQUFBO1VBQUEsNENBQUc7VUFBQTtNQUE4RiwyQ0FDL0Y7O1FBSDhCO1FBQWhDLFdBQWdDLFNBQWhDOzs7O29CQWRSO01BQUEsNkNBQUE7TUFBQSxzRUFXTTthQUFBLHdCQUNOO01BQUEsNkRBQUE7TUFBQTtNQU1NLHVDQUNOO1VBQUE7VUFBQSw4QkFBNkI7TUFDekI7VUFBQTtZQUFBO1lBQUE7WUFNSTtjQUFBO2NBQUE7WUFBQTtZQU5KO1VBQUE7YUFBQTtVQUFBOztvRkFBQTtVQUFBO2NBQUE7VUFBQSxtQkFPb0IsMkNBQ1E7VUFBQSxTQUMxQjs7SUE3QkQ7SUFBTCxXQUFLLFNBQUw7SUFZSztJQUFMLFdBQUssU0FBTDtJQVVRO0lBS0E7SUFKQTtJQUNBO0lBQ0E7SUFMSixXQUVJLFVBS0EsVUFKQSxVQUNBLFVBQ0EsU0FMSjs7OztvQkNwQko7TUFBQTs2Q0FBQSxVQUFBO01BQUE7NEdBQUE7TUFBQTtJQUFBOzs7Ozs7In0=
