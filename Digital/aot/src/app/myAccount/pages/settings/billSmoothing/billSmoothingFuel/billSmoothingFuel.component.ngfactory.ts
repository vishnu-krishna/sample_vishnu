/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './billSmoothingFuel.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '../../../../../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i4 from '@angular/material/core';
import * as i5 from '@angular/material/icon';
import * as i6 from '../../../../../shared/component/alert/alert.component.ngfactory';
import * as i7 from '../../../../../../../../src/app/shared/component/alert/alert.component';
import * as i8 from '@angular/platform-browser';
import * as i9 from '../../../../../../../../src/app/myAccount/pages/settings/billSmoothing/billSmoothingFuel/billSmoothingFuel.component';
import * as i10 from '../../../../../../../../src/app/myAccount/pages/settings/billSmoothing/billSmoothing.service';
import * as i11 from '../../../../../../../../src/app/myAccount/services/payment.service';
const styles_BillSmoothingFuelComponent:any[] = [i0.styles];
export const RenderType_BillSmoothingFuelComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_BillSmoothingFuelComponent,data:{}});
function View_BillSmoothingFuelComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,(null as any),
      (null as any),(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                ',' payments of $','\n            ']))],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.fuelInformation.paymentScheme.frequency;
        const currVal_1:any = _co.nextPaymentAmount;
        _ck(_v,1,0,currVal_0,currVal_1);
      });
}
function View_BillSmoothingFuelComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,(null as any),
      (null as any),(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                ',' payments of $','\n            ']))],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.fuelInformation.paymentScheme.frequency;
        const currVal_1:any = _co.previousPaymentAmount;
        _ck(_v,1,0,currVal_0,currVal_1);
      });
}
function View_BillSmoothingFuelComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,(null as any),
      (null as any),(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                    Your next payment: ','\n                ']))],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.nextPaymentDate;
        _ck(_v,1,0,currVal_0);
      });
}
function View_BillSmoothingFuelComponent_5(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,(null as any),
      (null as any),(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                    Your last paid payment: ',
          '\n                ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.previousPaymentDate;
    _ck(_v,1,0,currVal_0);
  });
}
function View_BillSmoothingFuelComponent_7(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                        Weekly payments are debited from your nominated account.\n                    ']))],
      (null as any),(null as any));
}
function View_BillSmoothingFuelComponent_8(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                        Fortnightly payments are debited from your nominated account.\n                    ']))],
      (null as any),(null as any));
}
function View_BillSmoothingFuelComponent_9(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                        Monthly payments are debited from your nominated account.\n                    ']))],
      (null as any),(null as any));
}
function View_BillSmoothingFuelComponent_6(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),10,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵand(16777216,
      (null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_7)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_8)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_9)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.isWeeklyPayment;
        _ck(_v,3,0,currVal_0);
        const currVal_1:any = _co.isFortnightlyPayment;
        _ck(_v,6,0,currVal_1);
        const currVal_2:any = _co.isMonthlyPayment;
        _ck(_v,9,0,currVal_2);
      },(null as any));
}
function View_BillSmoothingFuelComponent_11(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                        Payments are due weekly.\n                    ']))],
      (null as any),(null as any));
}
function View_BillSmoothingFuelComponent_12(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                        Payments are due fortnightly.\n                    ']))],
      (null as any),(null as any));
}
function View_BillSmoothingFuelComponent_13(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                        Payments are due monthly.\n                    ']))],
      (null as any),(null as any));
}
function View_BillSmoothingFuelComponent_10(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),10,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵand(16777216,
      (null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_11)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_12)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_13)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.isWeeklyPayment;
        _ck(_v,3,0,currVal_0);
        const currVal_1:any = _co.isFortnightlyPayment;
        _ck(_v,6,0,currVal_1);
        const currVal_2:any = _co.isMonthlyPayment;
        _ck(_v,9,0,currVal_2);
      },(null as any));
}
function View_BillSmoothingFuelComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),41,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      8,'div',[['class','bs-fuel-first-row']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['',':'])),(_l()(),i1.ɵted((null as any),[' ','\n            '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),2,'md-icon',[['class','alert-success mat-icon'],
              ['role','img'],['svgIcon','icon-alert-success']],(null as any),(null as any),
              (null as any),i3.View_MdIcon_0,i3.RenderType_MdIcon)),i1.ɵdid(16384,
          (null as any),0,i4.MdPrefixRejector,[[2,i4.MATERIAL_COMPATIBILITY_MODE],
              i1.ElementRef],(null as any),(null as any)),i1.ɵdid(638976,(null as any),
          0,i5.MdIcon,[i1.Renderer2,i1.ElementRef,i5.MdIconRegistry,[8,(null as any)]],
          {svgIcon:[0,'svgIcon']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),7,'div',[['class','bs-fuel-second-row']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
          1,(null as any),View_BillSmoothingFuelComponent_2)),i1.ɵdid(16384,(null as any),
          0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_3)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          19,'div',[['class','bs-fuel-next-payment']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',
          [['class','bs-fuel-next-payment--first-row']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
          1,(null as any),View_BillSmoothingFuelComponent_4)),i1.ɵdid(16384,(null as any),
          0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_5)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),7,'div',[['class','bs-fuel-next-payment--second-row']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
          1,(null as any),View_BillSmoothingFuelComponent_6)),i1.ɵdid(16384,(null as any),
          0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_10)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n    ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_2:any = 'icon-alert-success';
    _ck(_v,9,0,currVal_2);
    const currVal_3:any = _co.nextPaymentAmount;
    _ck(_v,15,0,currVal_3);
    const currVal_4:any = _co.previousPaymentAmount;
    _ck(_v,18,0,currVal_4);
    const currVal_5:any = _co.nextPaymentDate;
    _ck(_v,26,0,currVal_5);
    const currVal_6:any = _co.previousPaymentDate;
    _ck(_v,29,0,currVal_6);
    const currVal_7:any = _co.fuelInformation.hasDirectDebit;
    _ck(_v,35,0,currVal_7);
    const currVal_8:boolean = !_co.fuelInformation.hasDirectDebit;
    _ck(_v,38,0,currVal_8);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.fuelInformation.fuel;
    _ck(_v,5,0,currVal_0);
    const currVal_1:any = _co.fuelInformation.heading;
    _ck(_v,6,0,currVal_1);
  });
}
function View_BillSmoothingFuelComponent_16(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
      (null as any),1,'div',[['class','bs-fuel-second-row']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                    Switch to Bill Smoothing and make fortnightly payments of $',
      '\n                '])),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','bs-fuel-third-row']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                    You can also choose weekly or monthly payments during setup.\n                '])),
      (_l()(),i1.ɵted((null as any),['\n            ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.fortnightlyPayment;
    _ck(_v,3,0,currVal_0);
  });
}
function View_BillSmoothingFuelComponent_15(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵand(16777216,(null as any),
      (null as any),1,(null as any),View_BillSmoothingFuelComponent_16)),i1.ɵdid(16384,
      (null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
      (null as any)),(_l()(),i1.ɵted((null as any),['\n        ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.fuelInformation.paymentOptions;
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
function View_BillSmoothingFuelComponent_18(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),10,'div',[['class',
      'bs-fuel-custom-text']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),
      i1.ɵeld(0,(null as any),(null as any),4,'div',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['Sorry, we can\'t switch you to Bill Smoothing unless your account balance is $0 or in credit. You can make a payment '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','bs-fuel-payment-modal-link']],
          (null as any),[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.openPaymentPopup()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['here'])),
      (_l()(),i1.ɵted((null as any),[', or chat with us now.'])),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,
          'div',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['Any online payments you make can take up to 2 business days to process.'])),
      (_l()(),i1.ɵted((null as any),['\n            ']))],(null as any),(null as any));
}
function View_BillSmoothingFuelComponent_17(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),5,'agl-alert',([] as any[]),
      (null as any),(null as any),(null as any),i6.View_AlertComponent_0,i6.RenderType_AlertComponent)),
      i1.ɵdid(114688,(null as any),0,i7.AlertComponent,[i8.DomSanitizer],{alertType:[0,
          'alertType'],heading:[1,'heading'],body:[2,'body']},(null as any)),(_l()(),
          i1.ɵted(0,['\n            '])),(_l()(),i1.ɵand(16777216,(null as any),0,
          1,(null as any),View_BillSmoothingFuelComponent_18)),i1.ɵdid(16384,(null as any),
          0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted(0,['\n        ']))],(_ck,_v) => {
    const currVal_0:any = _v.context.$implicit.typeAsString;
    const currVal_1:any = _v.context.$implicit.heading;
    const currVal_2:any = _v.context.$implicit.body;
    _ck(_v,1,0,currVal_0,currVal_1,currVal_2);
    const currVal_3:any = _v.context.$implicit.IsOverdueAlert;
    _ck(_v,4,0,currVal_3);
  },(null as any));
}
function View_BillSmoothingFuelComponent_14(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),13,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      4,'div',[['class','bs-fuel-first-row']],[[2,'bs-fuel-first-row--disabled',(null as any)]],
      (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',
      ([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['',':'])),(_l()(),i1.ɵted((null as any),[' ',
          '\n        '])),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_15)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_17)),
      i1.ɵdid(802816,(null as any),0,i2.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n    ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_3:boolean = !_co.hasDuplicateFuels;
    _ck(_v,9,0,currVal_3);
    const currVal_4:any = _co.fuelInformation.alerts;
    _ck(_v,12,0,currVal_4);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.fuelInformation.hasAlerts;
    _ck(_v,2,0,currVal_0);
    const currVal_1:any = _co.fuelInformation.fuel;
    _ck(_v,5,0,currVal_1);
    const currVal_2:any = _co.fuelInformation.heading;
    _ck(_v,6,0,currVal_2);
  });
}
export function View_BillSmoothingFuelComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',[['class',
      'bs-fuel-setup']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_BillSmoothingFuelComponent_1)),i1.ɵdid(16384,
          (null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_BillSmoothingFuelComponent_14)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:i9.BillSmoothingFuelComponent = _v.component;
    const currVal_0:any = _co.fuelInformation.hasBillSmoothing;
    _ck(_v,3,0,currVal_0);
    const currVal_1:boolean = !_co.fuelInformation.hasBillSmoothing;
    _ck(_v,6,0,currVal_1);
  },(null as any));
}
export function View_BillSmoothingFuelComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-billsmoothing-fuel',
      ([] as any[]),(null as any),(null as any),(null as any),View_BillSmoothingFuelComponent_0,
      RenderType_BillSmoothingFuelComponent)),i1.ɵdid(114688,(null as any),0,i9.BillSmoothingFuelComponent,
      [i10.BillSmoothingService,i11.PaymentService],(null as any),(null as any))],
      (_ck,_v) => {
        _ck(_v,1,0);
      },(null as any));
}
export const BillSmoothingFuelComponentNgFactory:i1.ComponentFactory<i9.BillSmoothingFuelComponent> = i1.ɵccf('agl-billsmoothing-fuel',
    i9.BillSmoothingFuelComponent,View_BillSmoothingFuelComponent_Host_0,{fuelInformation:'fuelInformation',
        hasDuplicateFuels:'hasDuplicateFuels'},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9iaWxsU21vb3RoaW5nL2JpbGxTbW9vdGhpbmdGdWVsL2JpbGxTbW9vdGhpbmdGdWVsLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L3BhZ2VzL3NldHRpbmdzL2JpbGxTbW9vdGhpbmcvYmlsbFNtb290aGluZ0Z1ZWwvYmlsbFNtb290aGluZ0Z1ZWwuY29tcG9uZW50LnRzIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9iaWxsU21vb3RoaW5nL2JpbGxTbW9vdGhpbmdGdWVsL2JpbGxTbW9vdGhpbmdGdWVsLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9iaWxsU21vb3RoaW5nL2JpbGxTbW9vdGhpbmdGdWVsL2JpbGxTbW9vdGhpbmdGdWVsLmNvbXBvbmVudC50cy5CaWxsU21vb3RoaW5nRnVlbENvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxkaXYgY2xhc3M9XCJicy1mdWVsLXNldHVwXCI+XHJcbiAgICA8ZGl2ICpuZ0lmPVwiZnVlbEluZm9ybWF0aW9uLmhhc0JpbGxTbW9vdGhpbmdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnMtZnVlbC1maXJzdC1yb3dcIj5cclxuICAgICAgICAgICAgPHNwYW4+e3tmdWVsSW5mb3JtYXRpb24uZnVlbH19Ojwvc3Bhbj4ge3tmdWVsSW5mb3JtYXRpb24uaGVhZGluZ319XHJcbiAgICAgICAgICAgIDxtZC1pY29uIGNsYXNzPVwiYWxlcnQtc3VjY2Vzc1wiIHN2Z0ljb249XCJpY29uLWFsZXJ0LXN1Y2Nlc3NcIj48L21kLWljb24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJzLWZ1ZWwtc2Vjb25kLXJvd1wiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibmV4dFBheW1lbnRBbW91bnRcIj5cclxuICAgICAgICAgICAgICAgIHt7ZnVlbEluZm9ybWF0aW9uLnBheW1lbnRTY2hlbWUuZnJlcXVlbmN5fX0gcGF5bWVudHMgb2YgJHt7bmV4dFBheW1lbnRBbW91bnR9fVxyXG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInByZXZpb3VzUGF5bWVudEFtb3VudFwiPlxyXG4gICAgICAgICAgICAgICAge3tmdWVsSW5mb3JtYXRpb24ucGF5bWVudFNjaGVtZS5mcmVxdWVuY3l9fSBwYXltZW50cyBvZiAke3twcmV2aW91c1BheW1lbnRBbW91bnR9fVxyXG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnMtZnVlbC1uZXh0LXBheW1lbnRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJzLWZ1ZWwtbmV4dC1wYXltZW50LS1maXJzdC1yb3dcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuZXh0UGF5bWVudERhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICBZb3VyIG5leHQgcGF5bWVudDoge3tuZXh0UGF5bWVudERhdGV9fVxyXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwicHJldmlvdXNQYXltZW50RGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIFlvdXIgbGFzdCBwYWlkIHBheW1lbnQ6IHt7cHJldmlvdXNQYXltZW50RGF0ZX19XHJcbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJicy1mdWVsLW5leHQtcGF5bWVudC0tc2Vjb25kLXJvd1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImZ1ZWxJbmZvcm1hdGlvbi5oYXNEaXJlY3REZWJpdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc1dlZWtseVBheW1lbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgV2Vla2x5IHBheW1lbnRzIGFyZSBkZWJpdGVkIGZyb20geW91ciBub21pbmF0ZWQgYWNjb3VudC5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNGb3J0bmlnaHRseVBheW1lbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgRm9ydG5pZ2h0bHkgcGF5bWVudHMgYXJlIGRlYml0ZWQgZnJvbSB5b3VyIG5vbWluYXRlZCBhY2NvdW50LlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc01vbnRobHlQYXltZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vbnRobHkgcGF5bWVudHMgYXJlIGRlYml0ZWQgZnJvbSB5b3VyIG5vbWluYXRlZCBhY2NvdW50LlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWZ1ZWxJbmZvcm1hdGlvbi5oYXNEaXJlY3REZWJpdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc1dlZWtseVBheW1lbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUGF5bWVudHMgYXJlIGR1ZSB3ZWVrbHkuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImlzRm9ydG5pZ2h0bHlQYXltZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBheW1lbnRzIGFyZSBkdWUgZm9ydG5pZ2h0bHkuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImlzTW9udGhseVBheW1lbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUGF5bWVudHMgYXJlIGR1ZSBtb250aGx5LlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2ICpuZ0lmPVwiIWZ1ZWxJbmZvcm1hdGlvbi5oYXNCaWxsU21vb3RoaW5nXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJzLWZ1ZWwtZmlyc3Qtcm93XCIgW2NsYXNzLmJzLWZ1ZWwtZmlyc3Qtcm93LS1kaXNhYmxlZF09XCJmdWVsSW5mb3JtYXRpb24uaGFzQWxlcnRzXCI+XHJcbiAgICAgICAgICAgIDxzcGFuPnt7ZnVlbEluZm9ybWF0aW9uLmZ1ZWx9fTo8L3NwYW4+IHt7ZnVlbEluZm9ybWF0aW9uLmhlYWRpbmd9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCIhaGFzRHVwbGljYXRlRnVlbHNcIj5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImZ1ZWxJbmZvcm1hdGlvbi5wYXltZW50T3B0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJzLWZ1ZWwtc2Vjb25kLXJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIFN3aXRjaCB0byBCaWxsIFNtb290aGluZyBhbmQgbWFrZSBmb3J0bmlnaHRseSBwYXltZW50cyBvZiAke3tmb3J0bmlnaHRseVBheW1lbnR9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnMtZnVlbC10aGlyZC1yb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICBZb3UgY2FuIGFsc28gY2hvb3NlIHdlZWtseSBvciBtb250aGx5IHBheW1lbnRzIGR1cmluZyBzZXR1cC5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YWdsLWFsZXJ0ICpuZ0Zvcj1cImxldCBhbGVydCBvZiBmdWVsSW5mb3JtYXRpb24uYWxlcnRzXCIgW2FsZXJ0VHlwZV09XCJhbGVydC50eXBlQXNTdHJpbmdcIiBbaGVhZGluZ109XCJhbGVydC5oZWFkaW5nXCIgW2JvZHldPVwiYWxlcnQuYm9keVwiPlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiYWxlcnQuSXNPdmVyZHVlQWxlcnRcIiBjbGFzcz1cImJzLWZ1ZWwtY3VzdG9tLXRleHRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXY+U29ycnksIHdlIGNhbid0IHN3aXRjaCB5b3UgdG8gQmlsbCBTbW9vdGhpbmcgdW5sZXNzIHlvdXIgYWNjb3VudCBiYWxhbmNlIGlzICQwIG9yIGluIGNyZWRpdC4gWW91IGNhbiBtYWtlIGEgcGF5bWVudCA8c3BhbiAoY2xpY2spPVwib3BlblBheW1lbnRQb3B1cCgpXCIgY2xhc3M9XCJicy1mdWVsLXBheW1lbnQtbW9kYWwtbGlua1wiPmhlcmU8L3NwYW4+LCBvciBjaGF0IHdpdGggdXMgbm93LjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5Bbnkgb25saW5lIHBheW1lbnRzIHlvdSBtYWtlIGNhbiB0YWtlIHVwIHRvIDIgYnVzaW5lc3MgZGF5cyB0byBwcm9jZXNzLjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2FnbC1hbGVydD5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuIiwiPGFnbC1iaWxsc21vb3RoaW5nLWZ1ZWw+PC9hZ2wtYmlsbHNtb290aGluZy1mdWVsPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNPWTtNQUFBO01BQXdDOzs7UUFBQTtRQUFBO1FBQUE7Ozs7b0JBR3hDO01BQUE7TUFBNEM7OztRQUFBO1FBQUE7UUFBQTs7OztvQkFNeEM7TUFBQTtNQUFzQzs7O1FBQUE7UUFBQTs7OztvQkFHdEM7TUFBQTtNQUEwQztVQUFBOztJQUFBO0lBQUE7Ozs7b0JBTXRDO01BQUEsd0VBQTZCO2FBQUE7Ozs7b0JBRzdCO01BQUEsd0VBQWtDO2FBQUE7Ozs7b0JBR2xDO01BQUEsd0VBQThCO2FBQUE7Ozs7b0JBUGxDO01BQUEsd0VBQTRDO2FBQUEsNENBQ3hDO01BQUE7YUFBQTtVQUFBLHdCQUVNO01BQ047YUFBQTtVQUFBLHdCQUVNO01BQ047YUFBQTtVQUFBLHdCQUVNOzs7UUFSRDtRQUFMLFdBQUssU0FBTDtRQUdLO1FBQUwsV0FBSyxTQUFMO1FBR0s7UUFBTCxXQUFLLFNBQUw7Ozs7b0JBS0E7TUFBQSx3RUFBNkI7YUFBQTs7OztvQkFHN0I7TUFBQSx3RUFBa0M7YUFBQTs7OztvQkFHbEM7TUFBQSx3RUFBOEI7YUFBQTs7OztvQkFQbEM7TUFBQSx3RUFBNkM7YUFBQSw0Q0FDekM7TUFBQTthQUFBO1VBQUEsd0JBRU07TUFDTjthQUFBO1VBQUEsd0JBRU07TUFDTjthQUFBO1VBQUEsd0JBRU07OztRQVJEO1FBQUwsV0FBSyxTQUFMO1FBR0s7UUFBTCxXQUFLLFNBQUw7UUFHSztRQUFMLFdBQUssU0FBTDs7OztvQkF6Q2hCO01BQUEsd0VBQThDO2FBQUEsZ0NBQzFDO01BQUE7TUFBQSw4QkFBK0I7TUFDM0I7VUFBQSwwREFBTTtVQUFBLFdBQWdDLHVEQUN0QztpQkFBQTtjQUFBO2NBQUEsNkRBQUE7VUFBQTsyQkFBQSxzQ0FBQTtVQUFBO1VBQUEsdUNBQXNFO01BQ3BFLCtDQUNOO1VBQUE7VUFBQSw0Q0FBZ0M7VUFBQSxxQkFDNUI7VUFBQSwyREFBQTtVQUFBO01BRWUsbURBQ2Y7VUFBQTthQUFBO1VBQUEsd0JBRWUsK0NBQ2I7aUJBQUEsZ0NBQ047VUFBQTtVQUFBLDRDQUFrQztVQUFBLHFCQUM5QjtVQUFBO1VBQUEsNENBQTZDO1VBQUEseUJBQ3pDO1VBQUEsMkRBQUE7VUFBQTtNQUVlLHVEQUNmO1VBQUE7YUFBQTtVQUFBLHdCQUVlO01BQ2IsbURBQ047VUFBQTtVQUFBLDBEQUE4QztVQUFBLHlCQUMxQztVQUFBLDJEQUFBO1VBQUE7TUFVTSx1REFDTjtVQUFBO2FBQUE7VUFBQSx3QkFVTTtNQUNKLCtDQUNKO1VBQUE7O0lBM0M2QjtJQUEvQixXQUErQixTQUEvQjtJQUdjO0lBQWQsWUFBYyxTQUFkO0lBR2M7SUFBZCxZQUFjLFNBQWQ7SUFNa0I7SUFBZCxZQUFjLFNBQWQ7SUFHYztJQUFkLFlBQWMsU0FBZDtJQUtLO0lBQUwsWUFBSyxTQUFMO0lBV0s7SUFBTCxZQUFLLFNBQUw7OztJQWhDRTtJQUFBO0lBQWdDO0lBQUE7Ozs7b0JBbUR0QztNQUFBLHdFQUE0QzthQUFBLHdDQUN4QztNQUFBO01BQUEsNENBQWdDO01BQUEsd0JBRTFCO01BQ047VUFBQTtNQUErQjtNQUV6Qjs7SUFMMEI7SUFBQTs7OztvQkFGeEM7TUFBQSx3RUFBZ0M7YUFBQSxvQ0FDNUI7TUFBQSwwRUFBQTtNQUFBO01BQUEsZUFPTTs7SUFQRDtJQUFMLFdBQUssU0FBTDs7OztvQkFVQTtNQUFBO01BQUEsZ0JBQThELHVEQUMxRDthQUFBO1VBQUEsNENBQUs7TUFBQTtNQUFvSDtVQUFBO1lBQUE7WUFBQTtZQUFNO2NBQUE7Y0FBQTtZQUFBO1lBQU47VUFBQSxnQ0FBc0U7TUFBVywyREFBNEI7VUFBQSx5QkFDdE87VUFBQTtVQUFBLGdCQUFLO01BQTZFOzs7b0JBSDFGO01BQUE7YUFBQTtVQUFBLG1FQUF1STtpQkFBQSx3QkFDbkk7VUFBQSw0REFBQTtVQUFBO01BR007SUFKOEM7SUFBaUM7SUFBMEI7SUFBbkgsV0FBd0QsVUFBaUMsVUFBMEIsU0FBbkg7SUFDUztJQUFMLFdBQUssU0FBTDs7OztvQkFmUjtNQUFBLHdFQUErQzthQUFBLGdDQUMzQztNQUFBO01BQUEsMERBQStGO01BQUEscUJBQzNGO01BQUE7TUFBTSx5Q0FBZ0M7VUFBQSxnQkFDcEMsK0NBQ047VUFBQTthQUFBO1VBQUEsd0JBU00sK0NBQ047aUJBQUE7YUFBQTs0QkFBQSx5Q0FLWTtVQUFBOztJQWZQO0lBQUwsV0FBSyxTQUFMO0lBVVc7SUFBWCxZQUFXLFNBQVg7OztJQWIrQjtJQUEvQixXQUErQixTQUEvQjtJQUNVO0lBQUE7SUFBZ0M7SUFBQTs7OztvQkFuRGxEO01BQUE7TUFBMkIsMkNBQ3ZCO1VBQUEseUVBQUE7VUFBQTtVQUFBLGVBK0NNLDJDQUNOO1VBQUE7YUFBQTtVQUFBLHdCQW9CTSx1Q0FDSjtVQUFBOztJQXJFRztJQUFMLFdBQUssU0FBTDtJQWdESztJQUFMLFdBQUssU0FBTDs7OztvQkNqREo7TUFBQTsyQ0FBQSxVQUFBO01BQUE7O1FBQUE7Ozs7OyJ9
