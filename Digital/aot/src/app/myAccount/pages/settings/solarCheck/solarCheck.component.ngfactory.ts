/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './solarCheck.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../shared/component/alert/alert.component.ngfactory';
import * as i3 from '../../../../../../../src/app/shared/component/alert/alert.component';
import * as i4 from '@angular/platform-browser';
import * as i5 from '../../../../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i6 from '@angular/material/core';
import * as i7 from '@angular/material/button';
import * as i8 from '@angular/cdk/platform';
import * as i9 from '@angular/cdk/a11y';
import * as i10 from './systemDetails/solarCheckSystemDetails.component.ngfactory';
import * as i11 from '../../../../../../../src/app/myAccount/pages/settings/solarCheck/systemDetails/solarCheckSystemDetails.component';
import * as i12 from '../../../../../../../src/app/myAccount/services/contract/isolarCheck.service';
import * as i13 from '../../../../../../../src/app/myAccount/modal/modal.service';
import * as i14 from '../../../../../../../src/app/shared/service/contract/imessageBus.service';
import * as i15 from '../../../../../../../src/app/shared/service/dataLayer.service';
import * as i16 from '../../../../../../node_modules/@angular/material/card/typings/index.ngfactory';
import * as i17 from '@angular/material/card';
import * as i18 from '@angular/common';
import * as i19 from '../../../../../../../src/app/myAccount/pages/settings/solarCheck/solarCheck.component';
const styles_SolarCheckComponent:any[] = [i0.styles];
export const RenderType_SolarCheckComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_SolarCheckComponent,data:{}});
function View_SolarCheckComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'a',[['class',
      'deregister-button'],['id','shc-deregister']],[[2,'disabled',(null as any)]],
      [[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.deregister($event)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['Remove']))],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.isPendingRegistration;
        _ck(_v,0,0,currVal_0);
      });
}
function View_SolarCheckComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),8,'div',[['class',
      'pending']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),5,'agl-alert',[['alertType','inform']],(null as any),
          (null as any),(null as any),i2.View_AlertComponent_0,i2.RenderType_AlertComponent)),
      i1.ɵdid(114688,(null as any),0,i3.AlertComponent,[i4.DomSanitizer],{alertType:[0,
          'alertType']},(null as any)),(_l()(),i1.ɵted(0,['\n                        '])),
      (_l()(),i1.ɵeld(0,(null as any),0,1,'div',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['We are processing your registration. Once your registration is complete you can edit your system details.'])),
      (_l()(),i1.ɵted(0,['\n                    '])),(_l()(),i1.ɵted((null as any),
          ['\n                ']))],(_ck,_v) => {
    const currVal_0:any = 'inform';
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
function View_SolarCheckComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),14,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),
      (null as any),1,'div',[['class','message-text']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                        Want to find out if your system is working hard or hardly working?\n                    '])),
      (_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),8,'div',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          5,'button',[['class','register-button dls-button mat-raised-button'],['color',
              'accent'],['id','shc-sign-up'],['md-raised-button','']],[[8,'disabled',
              0]],[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.signUp($event)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i5.View_MdButton_0,i5.RenderType_MdButton)),i1.ɵdid(16384,(null as any),
          0,i6.MdPrefixRejector,[[2,i6.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
          (null as any),(null as any)),i1.ɵdid(180224,(null as any),0,i7.MdButton,
          [i1.Renderer2,i1.ElementRef,i8.Platform,i9.FocusMonitor],{color:[0,'color']},
          (null as any)),i1.ɵdid(16384,(null as any),0,i7.MdRaisedButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),i1.ɵprd(8448,(null as any),i6.MATERIAL_COMPATIBILITY_MODE,
          true,([] as any[])),(_l()(),i1.ɵted(0,['SIGN UP'])),(_l()(),i1.ɵted((null as any),
          ['\n                    '])),(_l()(),i1.ɵted((null as any),['\n                ']))],
      (_ck,_v) => {
        const currVal_1:any = 'accent';
        _ck(_v,9,0,currVal_1);
      },(_ck,_v) => {
        const currVal_0:any = (i1.ɵnov(_v,9).disabled || (null as any));
        _ck(_v,7,0,currVal_0);
      });
}
function View_SolarCheckComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),
      (null as any),1,'div',[['class','message-text']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                        Our daily solar health check, using your last 30 days of data, can help you to find out if your system is working hard or hardly working.\n                    '])),
      (_l()(),i1.ɵted((null as any),['\n                ']))],(null as any),(null as any));
}
function View_SolarCheckComponent_5(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),8,'div',[['class',
      'deregister-status']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),
      i1.ɵeld(0,(null as any),(null as any),5,'agl-alert',[['alertType','inform']],
          (null as any),(null as any),(null as any),i2.View_AlertComponent_0,i2.RenderType_AlertComponent)),
      i1.ɵdid(114688,(null as any),0,i3.AlertComponent,[i4.DomSanitizer],{alertType:[0,
          'alertType']},(null as any)),(_l()(),i1.ɵted(0,['\n                        '])),
      (_l()(),i1.ɵeld(0,(null as any),0,1,'div',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                            Processing request to remove Solar Command Check.\n                        '])),
      (_l()(),i1.ɵted(0,['\n                    '])),(_l()(),i1.ɵted((null as any),
          ['\n                ']))],(_ck,_v) => {
    const currVal_0:any = 'inform';
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
function View_SolarCheckComponent_6(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),8,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),
      (null as any),5,'agl-alert',[['alertType','inform']],(null as any),(null as any),
      (null as any),i2.View_AlertComponent_0,i2.RenderType_AlertComponent)),i1.ɵdid(114688,
      (null as any),0,i3.AlertComponent,[i4.DomSanitizer],{alertType:[0,'alertType']},
      (null as any)),(_l()(),i1.ɵted(0,['\n                        '])),(_l()(),i1.ɵeld(0,
      (null as any),0,1,'div',([] as any[]),(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                            Solar Command Check is unavailable when you have a solar battery.\n                        '])),
      (_l()(),i1.ɵted(0,['\n                    '])),(_l()(),i1.ɵted((null as any),
          ['\n                ']))],(_ck,_v) => {
    const currVal_0:any = 'inform';
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
function View_SolarCheckComponent_7(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),5,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),
      (null as any),2,'agl-alert',[['alertType','error'],['body','We couldn\'t remove Solar Command Check. Please give it another try.'],
          ['class','shc-deregistration-error'],['heading','Sorry, we seem to be experiencing a problem.']],
      (null as any),(null as any),(null as any),i2.View_AlertComponent_0,i2.RenderType_AlertComponent)),
      i1.ɵdid(114688,(null as any),0,i3.AlertComponent,[i4.DomSanitizer],{alertType:[0,
          'alertType'],heading:[1,'heading'],body:[2,'body']},(null as any)),(_l()(),
          i1.ɵted(0,['\n                    '])),(_l()(),i1.ɵted((null as any),['\n                ']))],
      (_ck,_v) => {
        const currVal_0:any = 'error';
        const currVal_1:any = 'Sorry, we seem to be experiencing a problem.';
        const currVal_2:any = 'We couldn\'t remove Solar Command Check. Please give it another try.';
        _ck(_v,3,0,currVal_0,currVal_1,currVal_2);
      },(null as any));
}
function View_SolarCheckComponent_8(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),2,'agl-settings-solar-system-details',
      ([] as any[]),(null as any),(null as any),(null as any),i10.View_SolarCheckSystemDetailsComponent_0,
      i10.RenderType_SolarCheckSystemDetailsComponent)),i1.ɵdid(114688,(null as any),
      0,i11.SolarCheckSystemDetailsComponent,[i12.ISolarCheckService,i13.ModalService,
          i14.IMessageBusService,i15.DataLayerService],{contractNumber:[0,'contractNumber'],
          isDisabled:[1,'isDisabled']},(null as any)),(_l()(),i1.ɵted((null as any),
      ['\n                ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.registeredContractNumber;
    const currVal_1:any = _co.isPendingRegistration;
    _ck(_v,1,0,currVal_0,currVal_1);
  },(null as any));
}
export function View_SolarCheckComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),42,'div',[['class',
      'settings-container']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),39,'div',[['class','row']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),36,'div',[['class','col-md-12']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),33,'md-card',[['class','mat-card']],(null as any),(null as any),
          (null as any),i16.View_MdCard_0,i16.RenderType_MdCard)),i1.ɵdid(16384,(null as any),
          0,i6.MdPrefixRejector,[[2,i6.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
          (null as any),(null as any)),i1.ɵdid(49152,(null as any),0,i17.MdCard,([] as any[]),
          (null as any),(null as any)),(_l()(),i1.ɵted(0,['\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),0,1,(null as any),View_SolarCheckComponent_1)),
      i1.ɵdid(16384,(null as any),0,i18.NgIf,[i1.ViewContainerRef,i1.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.ɵted(0,['\n                '])),
      (_l()(),i1.ɵeld(0,(null as any),0,4,'div',[['class','main-card-header']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          1,'div',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['Solar Command Check'])),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵted(0,['                \n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),0,1,(null as any),View_SolarCheckComponent_2)),
      i1.ɵdid(16384,(null as any),0,i18.NgIf,[i1.ViewContainerRef,i1.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.ɵted(0,['\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),0,1,(null as any),View_SolarCheckComponent_3)),
      i1.ɵdid(16384,(null as any),0,i18.NgIf,[i1.ViewContainerRef,i1.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.ɵted(0,['\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),0,1,(null as any),View_SolarCheckComponent_4)),
      i1.ɵdid(16384,(null as any),0,i18.NgIf,[i1.ViewContainerRef,i1.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.ɵted(0,['\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),0,1,(null as any),View_SolarCheckComponent_5)),
      i1.ɵdid(16384,(null as any),0,i18.NgIf,[i1.ViewContainerRef,i1.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.ɵted(0,['\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),0,1,(null as any),View_SolarCheckComponent_6)),
      i1.ɵdid(16384,(null as any),0,i18.NgIf,[i1.ViewContainerRef,i1.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.ɵted(0,['\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),0,1,(null as any),View_SolarCheckComponent_7)),
      i1.ɵdid(16384,(null as any),0,i18.NgIf,[i1.ViewContainerRef,i1.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.ɵted(0,['\n\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),0,1,(null as any),View_SolarCheckComponent_8)),
      i1.ɵdid(16384,(null as any),0,i18.NgIf,[i1.ViewContainerRef,i1.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.ɵted(0,['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n    '])),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:i19.SolarCheckComponent = _v.component;
    const currVal_0:any = _co.isSolarRegistered;
    _ck(_v,11,0,currVal_0);
    const currVal_1:any = _co.isPendingRegistration;
    _ck(_v,20,0,currVal_1);
    const currVal_2:any = _co.isSignupEligible;
    _ck(_v,23,0,currVal_2);
    const currVal_3:any = _co.isSolarRegistered;
    _ck(_v,26,0,currVal_3);
    const currVal_4:any = _co.isCurrentlyDeregistering;
    _ck(_v,29,0,currVal_4);
    const currVal_5:any = _co.hasBattery;
    _ck(_v,32,0,currVal_5);
    const currVal_6:any = _co.displaySystemDeregistrationErrorAlert();
    _ck(_v,35,0,currVal_6);
    const currVal_7:any = _co.isSolarRegistered;
    _ck(_v,38,0,currVal_7);
  },(null as any));
}
export function View_SolarCheckComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-settings-solar',
      ([] as any[]),(null as any),(null as any),(null as any),View_SolarCheckComponent_0,
      RenderType_SolarCheckComponent)),i1.ɵdid(114688,(null as any),0,i19.SolarCheckComponent,
      [i12.ISolarCheckService,i13.ModalService,i14.IMessageBusService],(null as any),
      (null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const SolarCheckComponentNgFactory:i1.ComponentFactory<i19.SolarCheckComponent> = i1.ɵccf('agl-settings-solar',
    i19.SolarCheckComponent,View_SolarCheckComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9zb2xhckNoZWNrL3NvbGFyQ2hlY2suY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvc2V0dGluZ3Mvc29sYXJDaGVjay9zb2xhckNoZWNrLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvc2V0dGluZ3Mvc29sYXJDaGVjay9zb2xhckNoZWNrLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9zb2xhckNoZWNrL3NvbGFyQ2hlY2suY29tcG9uZW50LnRzLlNvbGFyQ2hlY2tDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGNsYXNzPVwic2V0dGluZ3MtY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxyXG4gICAgICAgICAgICA8bWQtY2FyZD5cclxuICAgICAgICAgICAgICAgIDxhIGlkPVwic2hjLWRlcmVnaXN0ZXJcIiAqbmdJZj1cImlzU29sYXJSZWdpc3RlcmVkXCIgW2NsYXNzLmRpc2FibGVkXT1cImlzUGVuZGluZ1JlZ2lzdHJhdGlvblwiIGNsYXNzPVwiZGVyZWdpc3Rlci1idXR0b25cIiAoY2xpY2spPVwiZGVyZWdpc3RlcigkZXZlbnQpXCI+UmVtb3ZlPC9hPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1haW4tY2FyZC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlNvbGFyIENvbW1hbmQgQ2hlY2s8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc1BlbmRpbmdSZWdpc3RyYXRpb25cIiBjbGFzcz1cInBlbmRpbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YWdsLWFsZXJ0IGFsZXJ0VHlwZT1cImluZm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PldlIGFyZSBwcm9jZXNzaW5nIHlvdXIgcmVnaXN0cmF0aW9uLiBPbmNlIHlvdXIgcmVnaXN0cmF0aW9uIGlzIGNvbXBsZXRlIHlvdSBjYW4gZWRpdCB5b3VyIHN5c3RlbSBkZXRhaWxzLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYWdsLWFsZXJ0PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTaWdudXBFbGlnaWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlLXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgV2FudCB0byBmaW5kIG91dCBpZiB5b3VyIHN5c3RlbSBpcyB3b3JraW5nIGhhcmQgb3IgaGFyZGx5IHdvcmtpbmc/XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInNoYy1zaWduLXVwXCIgbWQtcmFpc2VkLWJ1dHRvbiBjbGFzcz1cInJlZ2lzdGVyLWJ1dHRvbiBkbHMtYnV0dG9uXCIgY29sb3I9XCJhY2NlbnRcIiAoY2xpY2spPVwic2lnblVwKCRldmVudClcIj5TSUdOIFVQPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc1NvbGFyUmVnaXN0ZXJlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZXNzYWdlLXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgT3VyIGRhaWx5IHNvbGFyIGhlYWx0aCBjaGVjaywgdXNpbmcgeW91ciBsYXN0IDMwIGRheXMgb2YgZGF0YSwgY2FuIGhlbHAgeW91IHRvIGZpbmQgb3V0IGlmIHlvdXIgc3lzdGVtIGlzIHdvcmtpbmcgaGFyZCBvciBoYXJkbHkgd29ya2luZy5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImlzQ3VycmVudGx5RGVyZWdpc3RlcmluZ1wiIGNsYXNzPVwiZGVyZWdpc3Rlci1zdGF0dXNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YWdsLWFsZXJ0IGFsZXJ0VHlwZT1cImluZm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUHJvY2Vzc2luZyByZXF1ZXN0IHRvIHJlbW92ZSBTb2xhciBDb21tYW5kIENoZWNrLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2FnbC1hbGVydD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImhhc0JhdHRlcnlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YWdsLWFsZXJ0IGFsZXJ0VHlwZT1cImluZm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU29sYXIgQ29tbWFuZCBDaGVjayBpcyB1bmF2YWlsYWJsZSB3aGVuIHlvdSBoYXZlIGEgc29sYXIgYmF0dGVyeS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hZ2wtYWxlcnQ+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJkaXNwbGF5U3lzdGVtRGVyZWdpc3RyYXRpb25FcnJvckFsZXJ0KClcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YWdsLWFsZXJ0IGNsYXNzPVwic2hjLWRlcmVnaXN0cmF0aW9uLWVycm9yXCIgYWxlcnRUeXBlPVwiZXJyb3JcIiBoZWFkaW5nPVwiU29ycnksIHdlIHNlZW0gdG8gYmUgZXhwZXJpZW5jaW5nIGEgcHJvYmxlbS5cIiBib2R5PVwiV2UgY291bGRuJ3QgcmVtb3ZlIFNvbGFyIENvbW1hbmQgQ2hlY2suIFBsZWFzZSBnaXZlIGl0IGFub3RoZXIgdHJ5LlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYWdsLWFsZXJ0PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGFnbC1zZXR0aW5ncy1zb2xhci1zeXN0ZW0tZGV0YWlscyAqbmdJZj1cImlzU29sYXJSZWdpc3RlcmVkXCIgW2NvbnRyYWN0TnVtYmVyXT1cInJlZ2lzdGVyZWRDb250cmFjdE51bWJlclwiIFtpc0Rpc2FibGVkXT1cImlzUGVuZGluZ1JlZ2lzdHJhdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgPC9hZ2wtc2V0dGluZ3Mtc29sYXItc3lzdGVtLWRldGFpbHM+XHJcbiAgICAgICAgICAgIDwvbWQtY2FyZD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuIiwiPGFnbC1zZXR0aW5ncy1zb2xhcj48L2FnbC1zZXR0aW5ncy1zb2xhcj4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNJZ0I7TUFBQTtNQUFBO1FBQUE7UUFBQTtRQUFvSDtVQUFBO1VBQUE7UUFBQTtRQUFwSDtNQUFBLGdDQUFpSjs7O1FB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
