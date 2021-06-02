/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './billSmoothingSetupModal.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/material/icon';
import * as i5 from '@angular/common';
import * as i6 from '../billSmoothingSetupFuel/billSmoothingSetupFuel.component.ngfactory';
import * as i7 from '../../../../../../../../src/app/myAccount/pages/settings/billSmoothing/billSmoothingSetupFuel/billSmoothingSetupFuel.component';
import * as i8 from '../billSmoothingSetupSuccessful/billSmoothingSetupSuccessful.component.ngfactory';
import * as i9 from '../../../../../../../../src/app/myAccount/pages/settings/billSmoothing/billSmoothingSetupSuccessful/billSmoothingSetupSuccessful.component';
import * as i10 from '../../../../../../../../src/app/myAccount/modal/modal.service';
import * as i11 from '../../../../../../../../src/app/myAccount/pages/settings/billSmoothing/billSmoothing.service';
import * as i12 from '../../../../../../../../src/app/shared/service/dataLayer.service';
import * as i13 from '../../../../../../../../src/app/myAccount/pipes/addSpaces.pipe';
import * as i14 from '../../../../../../../../src/app/myAccount/pipes/addressFormatter.pipe';
import * as i15 from '../../../../../../../../src/app/myAccount/pages/settings/billSmoothing/billSmoothingSetupModal/billSmoothingSetupModal.component';
import * as i16 from '../../../../../../../../src/app/shared/service/contract/imessageBus.service';
const styles_BillSmoothingSetupModalComponent:any[] = [i0.styles];
export const RenderType_BillSmoothingSetupModalComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_BillSmoothingSetupModalComponent,data:{}});
function View_BillSmoothingSetupModalComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),2,'md-icon',[['class',
      'icon mat-icon'],['role','img'],['svgIcon','icon-elec-enabled']],(null as any),
      (null as any),(null as any),i2.View_MdIcon_0,i2.RenderType_MdIcon)),i1.ɵdid(16384,
      (null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
      (null as any),(null as any)),i1.ɵdid(638976,(null as any),0,i4.MdIcon,[i1.Renderer2,
      i1.ElementRef,i4.MdIconRegistry,[8,(null as any)]],{svgIcon:[0,'svgIcon']},(null as any))],
      (_ck,_v) => {
        const currVal_0:any = 'icon-elec-enabled';
        _ck(_v,2,0,currVal_0);
      },(null as any));
}
function View_BillSmoothingSetupModalComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),2,'md-icon',[['class',
      'icon mat-icon'],['role','img'],['svgIcon','icon-gas-enabled']],(null as any),
      (null as any),(null as any),i2.View_MdIcon_0,i2.RenderType_MdIcon)),i1.ɵdid(16384,
      (null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
      (null as any),(null as any)),i1.ɵdid(638976,(null as any),0,i4.MdIcon,[i1.Renderer2,
      i1.ElementRef,i4.MdIconRegistry,[8,(null as any)]],{svgIcon:[0,'svgIcon']},(null as any))],
      (_ck,_v) => {
        const currVal_0:any = 'icon-gas-enabled';
        _ck(_v,2,0,currVal_0);
      },(null as any));
}
function View_BillSmoothingSetupModalComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),19,'div',[['class',
      'setup-details']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),12,'div',[['class','account-details']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),3,
          'div',[['class','account-no']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          2,'strong',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['Account No: ',''])),i1.ɵppd(1),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_BillSmoothingSetupModalComponent_3)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillSmoothingSetupModalComponent_4)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),2,'div',[['class','address']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['',''])),i1.ɵppd(1),(_l()(),i1.ɵted((null as any),['\n        ']))],(_ck,
      _v) => {
    var _co:any = _v.component;
    const currVal_1:boolean = !!_co.acctInfo.numberOfElectricityIcons;
    _ck(_v,10,0,currVal_1);
    const currVal_2:boolean = !!_co.acctInfo.numberOfGasIcons;
    _ck(_v,13,0,currVal_2);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = i1.ɵunv(_v,6,0,_ck(_v,7,0,i1.ɵnov((<any>(<any>_v.parent).parent),
        0),_co.acctInfo.contractAccountNumber));
    _ck(_v,6,0,currVal_0);
    const currVal_3:any = i1.ɵunv(_v,17,0,_ck(_v,18,0,i1.ɵnov((<any>(<any>_v.parent).parent),
        1),_co.address));
    _ck(_v,17,0,currVal_3);
  });
}
function View_BillSmoothingSetupModalComponent_6(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),6,'div',[['class',
      'select-fuel']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.generateEstimates(_v.context.$implicit.value)) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',[['class','setup-radio-button fuel-radio']],
          [[2,'setup-radio-button-selected',(null as any)]],(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','fuel-text']],
          [[2,'fuel-text-selected',(null as any)]],(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['For ',''])),(_l()(),i1.ɵted((null as any),
          ['\n            ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.isSelected(_v.context.$implicit.value);
    _ck(_v,2,0,currVal_0);
    const currVal_1:any = _co.isSelected(_v.context.$implicit.value);
    _ck(_v,4,0,currVal_1);
    const currVal_2:any = _v.context.$implicit.viewValue;
    _ck(_v,5,0,currVal_2);
  });
}
function View_BillSmoothingSetupModalComponent_5(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',[['class',
      'setup-fuel-picker']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵand(16777216,
      (null as any),(null as any),1,(null as any),View_BillSmoothingSetupModalComponent_6)),
      i1.ɵdid(802816,(null as any),0,i5.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n        ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.fuelTypes;
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
function View_BillSmoothingSetupModalComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),22,'div',[['class',
      'bs-modal']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          1,'div',[['class','bs-modal-header']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        Set up Bill Smoothing\n    '])),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          16,'div',[['class','bs-modal-content']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillSmoothingSetupModalComponent_2)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillSmoothingSetupModalComponent_5)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),4,'div',[['class','setup payment-schedule']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'agl-billsmoothing-setup-fuel',([] as any[]),(null as any),
          (null as any),(null as any),i6.View_BillSmoothingSetupFuelComponent_0,i6.RenderType_BillSmoothingSetupFuelComponent)),
      i1.ɵdid(49152,(null as any),0,i7.BillSmoothingSetupFuelComponent,([] as any[]),
          {fuelInfo:[0,'fuelInfo']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'div',[['class','setup footer-content']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            These figures are estimates based on your historical usage over 12 months. If you haven\'t been with us for 12 months, they\n            are based on the historical usage of other, similar customers.\n        '])),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),['\n']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.hasMultiAccount;
        _ck(_v,8,0,currVal_0);
        const currVal_1:any = _co.displayRadioButtons;
        _ck(_v,11,0,currVal_1);
        const currVal_2:any = _co.selectedValue;
        _ck(_v,16,0,currVal_2);
      },(null as any));
}
function View_BillSmoothingSetupModalComponent_7(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-billsmoothing-setup-successful',
      ([] as any[]),(null as any),(null as any),(null as any),i8.View_BillSmoothingSetupSuccessfulComponent_0,
      i8.RenderType_BillSmoothingSetupSuccessfulComponent)),i1.ɵdid(114688,(null as any),
      0,i9.BillSmoothingSetupSuccessfulComponent,[i10.ModalService,i11.BillSmoothingService,
          i12.DataLayerService],{billDeliveryMethodType:[0,'billDeliveryMethodType'],
          isDirectDebit:[1,'isDirectDebit'],setUpBillSmoothingResultMessage:[2,'setUpBillSmoothingResultMessage'],
          accountNumber:[3,'accountNumber']},(null as any))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.billDeliveryMethodType;
    const currVal_1:any = _co.acctInfo.isDirectDebit;
    const currVal_2:any = _co.setUpBillSmoothingResultMessage;
    const currVal_3:any = _co.acctInfo.contractAccountNumber;
    _ck(_v,1,0,currVal_0,currVal_1,currVal_2,currVal_3);
  },(null as any));
}
export function View_BillSmoothingSetupModalComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[i1.ɵpid(0,i13.AddSpacesPipe,([] as any[])),i1.ɵpid(0,i14.AddressFormatterPipe,
      ([] as any[])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_BillSmoothingSetupModalComponent_1)),i1.ɵdid(16384,(null as any),0,i5.NgIf,
      [i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),
      i1.ɵted((null as any),['\n\n'])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
      1,(null as any),View_BillSmoothingSetupModalComponent_7)),i1.ɵdid(16384,(null as any),
      0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any))],
      (_ck,_v) => {
        var _co:i15.BillSmoothingSetupModalComponent = _v.component;
        const currVal_0:boolean = !_co.setupSuccessful;
        _ck(_v,3,0,currVal_0);
        const currVal_1:any = _co.setupSuccessful;
        _ck(_v,6,0,currVal_1);
      },(null as any));
}
export function View_BillSmoothingSetupModalComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-billsmoothing-setup-modal',
      ([] as any[]),(null as any),(null as any),(null as any),View_BillSmoothingSetupModalComponent_0,
      RenderType_BillSmoothingSetupModalComponent)),i1.ɵdid(114688,(null as any),0,
      i15.BillSmoothingSetupModalComponent,[i11.BillSmoothingService,i10.ModalService,
          i16.IMessageBusService,i12.DataLayerService],(null as any),(null as any))],
      (_ck,_v) => {
        _ck(_v,1,0);
      },(null as any));
}
export const BillSmoothingSetupModalComponentNgFactory:i1.ComponentFactory<i15.BillSmoothingSetupModalComponent> = i1.ɵccf('agl-billsmoothing-setup-modal',
    i15.BillSmoothingSetupModalComponent,View_BillSmoothingSetupModalComponent_Host_0,
    {},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9iaWxsU21vb3RoaW5nL2JpbGxTbW9vdGhpbmdTZXR1cE1vZGFsL2JpbGxTbW9vdGhpbmdTZXR1cE1vZGFsLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L3BhZ2VzL3NldHRpbmdzL2JpbGxTbW9vdGhpbmcvYmlsbFNtb290aGluZ1NldHVwTW9kYWwvYmlsbFNtb290aGluZ1NldHVwTW9kYWwuY29tcG9uZW50LnRzIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9iaWxsU21vb3RoaW5nL2JpbGxTbW9vdGhpbmdTZXR1cE1vZGFsL2JpbGxTbW9vdGhpbmdTZXR1cE1vZGFsLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9iaWxsU21vb3RoaW5nL2JpbGxTbW9vdGhpbmdTZXR1cE1vZGFsL2JpbGxTbW9vdGhpbmdTZXR1cE1vZGFsLmNvbXBvbmVudC50cy5CaWxsU21vb3RoaW5nU2V0dXBNb2RhbENvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxkaXYgY2xhc3M9XCJicy1tb2RhbFwiICpuZ0lmPVwiIXNldHVwU3VjY2Vzc2Z1bFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImJzLW1vZGFsLWhlYWRlclwiPlxyXG4gICAgICAgIFNldCB1cCBCaWxsIFNtb290aGluZ1xyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYnMtbW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJoYXNNdWx0aUFjY291bnRcIiBjbGFzcz1cInNldHVwLWRldGFpbHNcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjY291bnQtZGV0YWlsc1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjY291bnQtbm9cIj48c3Ryb25nPkFjY291bnQgTm86IHt7YWNjdEluZm8uY29udHJhY3RBY2NvdW50TnVtYmVyIHwgYWdsQWRkU3BhY2VzfX08L3N0cm9uZz48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxtZC1pY29uICpuZ0lmPVwiISFhY2N0SW5mby5udW1iZXJPZkVsZWN0cmljaXR5SWNvbnNcIiBjbGFzcz1cImljb25cIiBzdmdJY29uPVwiaWNvbi1lbGVjLWVuYWJsZWRcIj48L21kLWljb24+XHJcbiAgICAgICAgICAgICAgICA8bWQtaWNvbiAqbmdJZj1cIiEhYWNjdEluZm8ubnVtYmVyT2ZHYXNJY29uc1wiIGNsYXNzPVwiaWNvblwiIHN2Z0ljb249XCJpY29uLWdhcy1lbmFibGVkXCI+PC9tZC1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkZHJlc3NcIj57e2FkZHJlc3MgfCBhZ2xBZGRyZXNzRm9ybWF0dGVyfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dXAtZnVlbC1waWNrZXJcIiAqbmdJZj1cImRpc3BsYXlSYWRpb0J1dHRvbnNcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdC1mdWVsXCIgKGNsaWNrKT1cImdlbmVyYXRlRXN0aW1hdGVzKGZ1ZWxUeXBlLnZhbHVlKVwiICpuZ0Zvcj1cImxldCBmdWVsVHlwZSBvZiBmdWVsVHlwZXNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR1cC1yYWRpby1idXR0b24gZnVlbC1yYWRpb1wiIFtjbGFzcy5zZXR1cC1yYWRpby1idXR0b24tc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChmdWVsVHlwZS52YWx1ZSlcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnVlbC10ZXh0XCIgW2NsYXNzLmZ1ZWwtdGV4dC1zZWxlY3RlZF09XCJpc1NlbGVjdGVkKGZ1ZWxUeXBlLnZhbHVlKVwiPkZvciB7e2Z1ZWxUeXBlLnZpZXdWYWx1ZX19PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dXAgcGF5bWVudC1zY2hlZHVsZVwiPlxyXG4gICAgICAgICAgICA8YWdsLWJpbGxzbW9vdGhpbmctc2V0dXAtZnVlbCBbZnVlbEluZm9dPVwic2VsZWN0ZWRWYWx1ZVwiPjwvYWdsLWJpbGxzbW9vdGhpbmctc2V0dXAtZnVlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic2V0dXAgZm9vdGVyLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgVGhlc2UgZmlndXJlcyBhcmUgZXN0aW1hdGVzIGJhc2VkIG9uIHlvdXIgaGlzdG9yaWNhbCB1c2FnZSBvdmVyIDEyIG1vbnRocy4gSWYgeW91IGhhdmVuJ3QgYmVlbiB3aXRoIHVzIGZvciAxMiBtb250aHMsIHRoZXlcclxuICAgICAgICAgICAgYXJlIGJhc2VkIG9uIHRoZSBoaXN0b3JpY2FsIHVzYWdlIG9mIG90aGVyLCBzaW1pbGFyIGN1c3RvbWVycy5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjxhZ2wtYmlsbHNtb290aGluZy1zZXR1cC1zdWNjZXNzZnVsICpuZ0lmPVwic2V0dXBTdWNjZXNzZnVsXCIgW3NldFVwQmlsbFNtb290aGluZ1Jlc3VsdE1lc3NhZ2VdPVwic2V0VXBCaWxsU21vb3RoaW5nUmVzdWx0TWVzc2FnZVwiXHJcbiAgICBbYmlsbERlbGl2ZXJ5TWV0aG9kVHlwZV09XCJiaWxsRGVsaXZlcnlNZXRob2RUeXBlXCIgW2lzRGlyZWN0RGViaXRdPVwiYWNjdEluZm8uaXNEaXJlY3REZWJpdFwiXHJcbiAgICBbYWNjb3VudE51bWJlcl09XCJhY2N0SW5mby5jb250cmFjdEFjY291bnROdW1iZXJcIj48L2FnbC1iaWxsc21vb3RoaW5nLXNldHVwLXN1Y2Nlc3NmdWw+IiwiPGFnbC1iaWxsc21vb3RoaW5nLXNldHVwLW1vZGFsPjwvYWdsLWJpbGxzbW9vdGhpbmctc2V0dXAtbW9kYWw+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDUWdCO01BQUE7TUFBQSwyRUFBQTtNQUFBO01BQUEsb0NBQUE7c0NBQUE7O1FBQWtFO1FBQWxFLFdBQWtFLFNBQWxFOzs7O29CQUNBO01BQUE7TUFBQSwyRUFBQTtNQUFBO01BQUEsb0NBQUE7c0NBQUE7O1FBQTBEO1FBQTFELFdBQTBELFNBQTFEOzs7O29CQUpSO01BQUE7TUFBbUQsbURBQy9DO1VBQUE7VUFBQSw0Q0FBNkI7VUFBQSx5QkFDekI7VUFBQTtVQUFBLDhCQUF3QjtVQUFBO1VBQUEsZ0JBQVE7TUFBNEUsdURBQzVHO1VBQUE7YUFBQTtVQUFBLHdCQUF3RztNQUN4RzthQUFBO1VBQUEsd0JBQStGO01BQzdGLG1EQUNOO1VBQUE7VUFBQSw0Q0FBcUI7VUFBQSxxQkFBdUM7OztJQUgvQztJQUFULFlBQVMsU0FBVDtJQUNTO0lBQVQsWUFBUyxTQUFUOzs7SUFGZ0M7UUFBQTtJQUFBO0lBSWY7UUFBQTtJQUFBOzs7O29CQUdyQjtNQUFBO0lBQUE7SUFBQTtJQUF5QjtNQUFBO01BQUE7SUFBQTtJQUF6QjtFQUFBLGdDQUF3RztNQUNwRztVQUFBO1VBQUEsOEJBQWtIO01BQ2xIO1VBQUE7VUFBQSxnQkFBZ0YsNENBQWlDO1VBQUE7O0lBRHRFO0lBQTNDLFdBQTJDLFNBQTNDO0lBQ3dCO0lBQXhCLFdBQXdCLFNBQXhCO0lBQWdGO0lBQUE7Ozs7b0JBSHhGO01BQUE7TUFBQSxnQkFBMkQsbURBQ3ZEO01BQUE7YUFBQTs0QkFBQSx5Q0FHTTtVQUFBOztJQUgrRDtJQUFyRSxXQUFxRSxTQUFyRTs7OztvQkFkWjtNQUFBO01BQStDLDJDQUMzQztVQUFBO1VBQUEsOEJBQTZCO01BRXZCLDJDQUNOO1VBQUE7VUFBQSw4QkFBOEI7TUFDMUI7YUFBQTtVQUFBLHdCQU9NLCtDQUNOO2lCQUFBO2FBQUE7VUFBQSx3QkFLTSwrQ0FDTjtpQkFBQTtjQUFBO01BQW9DLG1EQUNoQztVQUFBO1VBQUE7YUFBQTtVQUFBLHlDQUF3RjtNQUN0RiwrQ0FDTjtVQUFBO1VBQUEsNENBQWtDO1VBQUE7TUFHNUIsMkNBQ0o7OztRQXJCRztRQUFMLFdBQUssU0FBTDtRQVErQjtRQUEvQixZQUErQixTQUEvQjtRQU9rQztRQUE5QixZQUE4QixTQUE5Qjs7OztvQkFTWjtNQUFBO3lEQUFBLFVBQUE7TUFBQTs4QkFBQTtVQUFBO1VBQUE7O0lBQ0k7SUFBa0Q7SUFETTtJQUV4RDtJQUZKLFdBQ0ksVUFBa0QsVUFETSxVQUV4RCxTQUZKOzs7OztxQkE3QkE7TUFBQSxpREFBQTtNQUFBLHNFQTJCTTthQUFBLDBCQUVOO01BQUEsaUVBQUE7TUFBQTs7O1FBN0JzQjtRQUF0QixXQUFzQixTQUF0QjtRQTZCb0M7UUFBcEMsV0FBb0MsU0FBcEM7Ozs7b0JDN0JBO01BQUE7aURBQUEsVUFBQTsyQ0FBQTtxREFBQTs7UUFBQTs7Ozs7In0=
