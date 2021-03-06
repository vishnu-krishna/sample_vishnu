/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './solarCheckUnsuitable.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../../../../src/app/myAccount/dashboard/solarCheck/solarCheckRegisterProcess/solarCheckUnsuitable/solarCheckUnsuitable.component';
import * as i3 from '../../../../../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i4 from '@angular/material/core';
import * as i5 from '@angular/material/button';
import * as i6 from '@angular/cdk/platform';
import * as i7 from '@angular/cdk/a11y';
import * as i8 from '../../../../../../../../src/app/myAccount/services/contract/isolarCheck.service';
import * as i9 from '../../../../../../../../src/app/myAccount/modal/modal.service';
import * as i10 from '../../../../../../../../src/app/shared/service/contract/imessageBus.service';
const styles_SolarCheckUnsuitableComponent:any[] = [i0.styles];
export const RenderType_SolarCheckUnsuitableComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_SolarCheckUnsuitableComponent,data:{}});
export function View_SolarCheckUnsuitableComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),86,'div',[['class',
      'solar-check-unsuitable agl-modal-body-overall-settings agl-modal-body']],(null as any),
      (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),6,'div',[['class',
      'row modal-navi no-horizontal-padding']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵeld(0,[['cancelButtonTopRight',1]],(null as any),3,'span',[['class',
          'close-button'],['id','solar-check-unsuitable-close-button']],(null as any),
          [[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.SolarCheckUnsuitableComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.closeModal()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'img',[['alt','Exit Solar Check registration'],
          ['src','svg/scc_modal_close.svg']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),9,'div',[['class','visible-xs row no-horizontal-padding']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),6,'div',[['class','center-image-horizontally-cropped-outer']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),3,'div',[['class','center-image-horizontally-cropped-inner']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),0,'img',[['alt','Solar Check Prerequisite Registration Step'],
              ['src','svg/scc-houseonhill-intro-mb-768px.svg']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),['    \n    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),56,'div',[['class','row prereq-content no-horizontal-padding']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),53,'div',[['class','battery-details-capture']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n\n            '])),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',[['class','content-area battery-title']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),4,'div',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','battery-title-text']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                        Nice one, you\'re really making the most of your solar energy.\n                    '])),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵted((null as any),['\n            \n            '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),16,'div',[['class','content-area option-button-outer-padding']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),13,'div',[['class','option-button-layout']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          10,'button',[['class','option-button-size option-button-button-padding option-button-yes mat-raised-button mat-warning option-button-selected mat-raised-button'],
              ['color','warning'],['md-raised-button','']],[[8,'disabled',0]],(null as any),
          (null as any),i3.View_MdButton_0,i3.RenderType_MdButton)),i1.ɵdid(16384,
          (null as any),0,i4.MdPrefixRejector,[[2,i4.MATERIAL_COMPATIBILITY_MODE],
              i1.ElementRef],(null as any),(null as any)),i1.ɵdid(180224,(null as any),
          0,i5.MdButton,[i1.Renderer2,i1.ElementRef,i6.Platform,i7.FocusMonitor],{color:[0,
              'color']},(null as any)),i1.ɵdid(16384,(null as any),0,i5.MdRaisedButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),i1.ɵprd(8448,(null as any),i4.MATERIAL_COMPATIBILITY_MODE,
          true,([] as any[])),(_l()(),i1.ɵted(0,['\n                        '])),(_l()(),
          i1.ɵeld(0,(null as any),0,0,'img',[['alt','Yes I have a battery'],['class',
              'option-button-yes-img-size'],['src','svg/scc_prereq_battery_yes_reverse.svg']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted(0,['\n                        '])),(_l()(),i1.ɵeld(0,(null as any),
          0,1,'div',[['class','option-button-text option-button-text-pos']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                            Yes, I do.\n                        '])),
      (_l()(),i1.ɵted(0,['\n                    '])),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',
          [['class','content-area info-message-padding']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,
          'div',[['class','info-message-font-details']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                    While Solar Command Check is for those without a battery, we\'re working on a solar monitoring service that will be perfect for you. So keep an eye out and in the meantime, enjoy the benefits of your solar battery.\n                '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),8,'div',
          [['class','content-area next-button-padding']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),5,
          'button',[['class','dls-button dls-button-override next-button mat-raised-button'],
              ['color','accent'],['md-raised-button','']],[[8,'disabled',0]],[[(null as any),
              'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.SolarCheckUnsuitableComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.closeModal()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i3.View_MdButton_0,i3.RenderType_MdButton)),i1.ɵdid(16384,(null as any),
          0,i4.MdPrefixRejector,[[2,i4.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
          (null as any),(null as any)),i1.ɵdid(180224,(null as any),0,i5.MdButton,
          [i1.Renderer2,i1.ElementRef,i6.Platform,i7.FocusMonitor],{color:[0,'color']},
          (null as any)),i1.ɵdid(16384,(null as any),0,i5.MdRaisedButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),i1.ɵprd(8448,(null as any),i4.MATERIAL_COMPATIBILITY_MODE,
          true,([] as any[])),(_l()(),i1.ɵted(0,['\n                    RETURN TO MY ACCOUNT\n                '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',
          [['class','link']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),1,'a',([] as any[]),(null as any),
              [[(null as any),'click']],(_v,en,$event) => {
                var ad:boolean = true;
                var _co:i2.SolarCheckUnsuitableComponent = _v.component;
                if (('click' === en)) {
                  const pd_0:any = ((<any>_co.previous()) !== false);
                  ad = (pd_0 && ad);
                }
                return ad;
              },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['I don\'t have a battery'])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),
          ['\n   \n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),6,'div',
          [['class','no-horizontal-padding']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),3,'div',[['class','visible-sm visible-md visible-lg visible-xl']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),0,'img',[['alt','Solar Check Prerequisite Registration Step'],
              ['src','svg/scc-houseonhill-intro-wd-tb-white.svg']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),
          ['\n'])),(_l()(),i1.ɵted((null as any),['\n']))],(_ck,_v) => {
    const currVal_1:any = 'warning';
    _ck(_v,42,0,currVal_1);
    const currVal_3:any = 'accent';
    _ck(_v,65,0,currVal_3);
  },(_ck,_v) => {
    const currVal_0:any = (i1.ɵnov(_v,42).disabled || (null as any));
    _ck(_v,40,0,currVal_0);
    const currVal_2:any = (i1.ɵnov(_v,65).disabled || (null as any));
    _ck(_v,63,0,currVal_2);
  });
}
export function View_SolarCheckUnsuitableComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-solar-check-unsuitable',
      ([] as any[]),(null as any),(null as any),(null as any),View_SolarCheckUnsuitableComponent_0,
      RenderType_SolarCheckUnsuitableComponent)),i1.ɵdid(49152,(null as any),0,i2.SolarCheckUnsuitableComponent,
      [i8.ISolarCheckService,i9.ModalService,i10.IMessageBusService],(null as any),
      (null as any))],(null as any),(null as any));
}
export const SolarCheckUnsuitableComponentNgFactory:i1.ComponentFactory<i2.SolarCheckUnsuitableComponent> = i1.ɵccf('agl-solar-check-unsuitable',
    i2.SolarCheckUnsuitableComponent,View_SolarCheckUnsuitableComponent_Host_0,{contract:'contract'},
    {next:'next',back:'back'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9kYXNoYm9hcmQvc29sYXJDaGVjay9zb2xhckNoZWNrUmVnaXN0ZXJQcm9jZXNzL3NvbGFyQ2hlY2tVbnN1aXRhYmxlL3NvbGFyQ2hlY2tVbnN1aXRhYmxlLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L2Rhc2hib2FyZC9zb2xhckNoZWNrL3NvbGFyQ2hlY2tSZWdpc3RlclByb2Nlc3Mvc29sYXJDaGVja1Vuc3VpdGFibGUvc29sYXJDaGVja1Vuc3VpdGFibGUuY29tcG9uZW50LnRzIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9kYXNoYm9hcmQvc29sYXJDaGVjay9zb2xhckNoZWNrUmVnaXN0ZXJQcm9jZXNzL3NvbGFyQ2hlY2tVbnN1aXRhYmxlL3NvbGFyQ2hlY2tVbnN1aXRhYmxlLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9kYXNoYm9hcmQvc29sYXJDaGVjay9zb2xhckNoZWNrUmVnaXN0ZXJQcm9jZXNzL3NvbGFyQ2hlY2tVbnN1aXRhYmxlL3NvbGFyQ2hlY2tVbnN1aXRhYmxlLmNvbXBvbmVudC50cy5Tb2xhckNoZWNrVW5zdWl0YWJsZUNvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxkaXYgY2xhc3M9XCJzb2xhci1jaGVjay11bnN1aXRhYmxlIGFnbC1tb2RhbC1ib2R5LW92ZXJhbGwtc2V0dGluZ3MgYWdsLW1vZGFsLWJvZHlcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3cgbW9kYWwtbmF2aSBuby1ob3Jpem9udGFsLXBhZGRpbmdcIj5cclxuICAgICAgICA8c3BhbiBpZD1cInNvbGFyLWNoZWNrLXVuc3VpdGFibGUtY2xvc2UtYnV0dG9uXCIgY2xhc3M9XCJjbG9zZS1idXR0b25cIiAoY2xpY2spPVwiY2xvc2VNb2RhbCgpXCIgI2NhbmNlbEJ1dHRvblRvcFJpZ2h0PlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cInN2Zy9zY2NfbW9kYWxfY2xvc2Uuc3ZnXCIgYWx0PVwiRXhpdCBTb2xhciBDaGVjayByZWdpc3RyYXRpb25cIj5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJ2aXNpYmxlLXhzIHJvdyBuby1ob3Jpem9udGFsLXBhZGRpbmdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyLWltYWdlLWhvcml6b250YWxseS1jcm9wcGVkLW91dGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXItaW1hZ2UtaG9yaXpvbnRhbGx5LWNyb3BwZWQtaW5uZXJcIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwic3ZnL3NjYy1ob3VzZW9uaGlsbC1pbnRyby1tYi03NjhweC5zdmdcIiBhbHQ9XCJTb2xhciBDaGVjayBQcmVyZXF1aXNpdGUgUmVnaXN0cmF0aW9uIFN0ZXBcIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj4gICAgXHJcbiAgICA8ZGl2IGNsYXNzPVwicm93IHByZXJlcS1jb250ZW50IG5vLWhvcml6b250YWwtcGFkZGluZ1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJiYXR0ZXJ5LWRldGFpbHMtY2FwdHVyZVwiPlxyXG5cclxuICAgICAgICAgICAgPCEtLXRpdGxlLS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LWFyZWEgYmF0dGVyeS10aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmF0dGVyeS10aXRsZS10ZXh0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5pY2Ugb25lLCB5b3UncmUgcmVhbGx5IG1ha2luZyB0aGUgbW9zdCBvZiB5b3VyIHNvbGFyIGVuZXJneS5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDwhLS15ZXMgYW5kIG5vIGJ1dHRvbnMtLT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnQtYXJlYSBvcHRpb24tYnV0dG9uLW91dGVyLXBhZGRpbmdcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcHRpb24tYnV0dG9uLWxheW91dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gbWQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cIndhcm5pbmdcIiBjbGFzcz1cIm9wdGlvbi1idXR0b24tc2l6ZSBvcHRpb24tYnV0dG9uLWJ1dHRvbi1wYWRkaW5nIG9wdGlvbi1idXR0b24teWVzIG1hdC1yYWlzZWQtYnV0dG9uIG1hdC13YXJuaW5nIG9wdGlvbi1idXR0b24tc2VsZWN0ZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJzdmcvc2NjX3ByZXJlcV9iYXR0ZXJ5X3llc19yZXZlcnNlLnN2Z1wiIGNsYXNzPVwib3B0aW9uLWJ1dHRvbi15ZXMtaW1nLXNpemVcIiBhbHQ9XCJZZXMgSSBoYXZlIGEgYmF0dGVyeVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3B0aW9uLWJ1dHRvbi10ZXh0IG9wdGlvbi1idXR0b24tdGV4dC1wb3NcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFllcywgSSBkby5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8IS0tY29weSB0ZXh0LS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50LWFyZWEgaW5mby1tZXNzYWdlLXBhZGRpbmdcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLW1lc3NhZ2UtZm9udC1kZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgV2hpbGUgU29sYXIgQ29tbWFuZCBDaGVjayBpcyBmb3IgdGhvc2Ugd2l0aG91dCBhIGJhdHRlcnksIHdlJ3JlIHdvcmtpbmcgb24gYSBzb2xhciBtb25pdG9yaW5nIHNlcnZpY2UgdGhhdCB3aWxsIGJlIHBlcmZlY3QgZm9yIHlvdS4gU28ga2VlcCBhbiBleWUgb3V0IGFuZCBpbiB0aGUgbWVhbnRpbWUsIGVuam95IHRoZSBiZW5lZml0cyBvZiB5b3VyIHNvbGFyIGJhdHRlcnkuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1hcmVhIG5leHQtYnV0dG9uLXBhZGRpbmdcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gbWQtcmFpc2VkLWJ1dHRvbiBjbGFzcz1cImRscy1idXR0b24gZGxzLWJ1dHRvbi1vdmVycmlkZSBuZXh0LWJ1dHRvblwiIGNvbG9yPVwiYWNjZW50XCIgKGNsaWNrKT1cImNsb3NlTW9kYWwoKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIFJFVFVSTiBUTyBNWSBBQ0NPVU5UXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaW5rXCI+XHJcbiAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwicHJldmlvdXMoKVwiPkkgZG9uJ3QgaGF2ZSBhIGJhdHRlcnk8L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgIFxyXG4gICAgPGRpdiBjbGFzcz1cIm5vLWhvcml6b250YWwtcGFkZGluZ1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ2aXNpYmxlLXNtIHZpc2libGUtbWQgdmlzaWJsZS1sZyB2aXNpYmxlLXhsXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwic3ZnL3NjYy1ob3VzZW9uaGlsbC1pbnRyby13ZC10Yi13aGl0ZS5zdmdcIiBhbHQ9XCJTb2xhciBDaGVjayBQcmVyZXF1aXNpdGUgUmVnaXN0cmF0aW9uIFN0ZXBcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuIiwiPGFnbC1zb2xhci1jaGVjay11bnN1aXRhYmxlPjwvYWdsLXNvbGFyLWNoZWNrLXVuc3VpdGFibGU+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQUE7TUFBQTtNQUFBLDBEQUFtRjtNQUFBLGFBQy9FO01BQUE7TUFBQSw4QkFBa0Q7TUFDOUM7VUFBQTtVQUFBO1lBQUE7WUFBQTtZQUFvRTtjQUFBO2NBQUE7WUFBQTtZQUFwRTtVQUFBLGdDQUFpSDtNQUM3RztVQUFBO1VBQUEsOEJBQXVFO01BQ3BFLDJDQUNMO01BQ047VUFBQTtNQUFrRCwrQ0FDOUM7VUFBQTtVQUFBO01BQXFELG1EQUNqRDtVQUFBO1VBQUE7TUFBcUQsdURBQ2pEO1VBQUE7Y0FBQTtVQUFBLDRDQUFtRztVQUFBLHFCQUNqRywrQ0FDSjtpQkFBQSw0QkFDSjtNQUNOO1VBQUE7TUFBc0QsK0NBQ2xEO1VBQUE7VUFBQSwwREFBcUM7VUFBQSx1QkFFckI7TUFDWjtVQUFBO01BQXdDLHVEQUNwQztVQUFBO1VBQUEsOEJBQUs7TUFDRDtVQUFBO01BQWdDO01BRTFCLHVEQUNKO1VBQUEscUJBQ0o7TUFFbUIsbURBQ3pCO1VBQUE7VUFBQTtNQUFzRCx1REFDbEQ7VUFBQTtVQUFBLDBEQUFrQztVQUFBLDZCQUM5QjtVQUFBO2NBQUE7VUFBQSxpRUFBQTtVQUFBOzJCQUFBLHNDQUFBO1VBQUE7Y0FBQSxnQ0FBQTtVQUFBLGtEQUFBO1VBQUEsb0JBQXdLLG1EQUNwSztpQkFBQTtjQUFBO2NBQUE7TUFBZ0gsbURBQ2hIO1VBQUE7VUFBQSwwREFBdUQ7VUFBQTtNQUVqRCwrQ0FDRDtVQUFBLHlCQUNQO01BQ0oscURBRVU7VUFBQSxxQkFDaEI7VUFBQTtVQUFBLDRDQUErQztVQUFBLHlCQUMzQztVQUFBO1VBQUEsNENBQXVDO1VBQUE7TUFFakMsbURBQ0o7VUFBQSx1QkFFTjtVQUFBO1VBQUEsNENBQThDO1VBQUEseUJBQzFDO1VBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtZQUEyRjtjQUFBO2NBQUE7WUFBQTtZQUEzRjtVQUFBLHFEQUFBO1VBQUE7VUFBQSxvQ0FBQTtVQUFBO1VBQUEsc0JBQUE7VUFBQSxrREFBQTtVQUFBLG9CQUFrSDtNQUV6RyxtREFDUDtVQUFBLHFCQUNOO1VBQUE7VUFBQSxnQkFBa0IsdURBQ2Q7aUJBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBRztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBSDtjQUFBLGdDQUF3QjtNQUEwQixtREFDaEQ7VUFBQSxpQkFDSiwyQ0FDSjtVQUFBLGtCQUVOO1VBQUE7VUFBQSw4QkFBbUM7TUFDL0I7VUFBQTtNQUF5RCxtREFDckQ7VUFBQTtjQUFBO1VBQUEsNENBQXNHO1VBQUEsaUJBQ3BHLDJDQUNKO1VBQUEsU0FDSjtJQWhDdUM7SUFBekIsWUFBeUIsU0FBekI7SUFpQndFO0lBQTVFLFlBQTRFLFNBQTVFOztJQWpCSTtJQUFBLFlBQUEsU0FBQTtJQWlCSjtJQUFBLFlBQUEsU0FBQTs7OztvQkM3Q2hCO01BQUE7OENBQUEsVUFBQTtNQUFBO01BQUE7Ozs7In0=
