/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './solarCheckDeregister.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/material/button';
import * as i5 from '@angular/cdk/platform';
import * as i6 from '@angular/cdk/a11y';
import * as i7 from '../../../../../shared/loaders/loading.component.ngfactory';
import * as i8 from '../../../../../../../../src/app/shared/loaders/loading.component';
import * as i9 from '@angular/common';
import * as i10 from '../../../../../../../../src/app/myAccount/pages/settings/solarCheck/deregister/solarCheckDeregister.component';
import * as i11 from '../../../../../../../../src/app/myAccount/modal/modal.service';
import * as i12 from '../../../../../../../../src/app/myAccount/services/contract/isolarCheck.service';
import * as i13 from '../../../../../../../../src/app/shared/service/dataLayer.service';
const styles_SolarCheckDeregisterComponent:any[] = [i0.styles];
export const RenderType_SolarCheckDeregisterComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_SolarCheckDeregisterComponent,data:{}});
function View_SolarCheckDeregisterComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,[['cancelButtonTopRight',1]],(null as any),4,
      'span',[['class','deregister__close-button'],['id','modal-close-button']],(null as any),
      [[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.closeModal()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
      i1.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['✕'])),(_l()(),i1.ɵted((null as any),['\n']))],(null as any),(null as any));
}
function View_SolarCheckDeregisterComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),36,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      4,'div',[['class','']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),1,'span',[['class','deregister__header']],(null as any),
      (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['Remove Solar Command Check'])),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵted((null as any),['\n\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'p',[['class','deregister__body']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            Are you sure you no longer want to receive information about the health of your solar system?\n        '])),
      (_l()(),i1.ɵted((null as any),['\n\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'p',[['class','deregister__body']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            If you change your mind you can always sign-up again.\n        '])),
      (_l()(),i1.ɵted((null as any),['\n\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),21,'div',[['class','deregister__action-bar row']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),8,'div',
          [['class','col-sm-6']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),5,'button',[['class','mat-accent mat-raised-button deregister__button mat-raised-button'],
              ['md-raised-button','']],[[8,'disabled',0]],[[(null as any),'click']],
              (_v,en,$event) => {
                var ad:boolean = true;
                var _co:any = _v.component;
                if (('click' === en)) {
                  const pd_0:any = ((<any>_co.attemptDeregistration()) !== false);
                  ad = (pd_0 && ad);
                }
                return ad;
              },i2.View_MdButton_0,i2.RenderType_MdButton)),i1.ɵdid(16384,(null as any),
          0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
          (null as any),(null as any)),i1.ɵdid(180224,[['okButton',4]],0,i4.MdButton,
          [i1.Renderer2,i1.ElementRef,i5.Platform,i6.FocusMonitor],(null as any),(null as any)),
      i1.ɵdid(16384,(null as any),0,i4.MdRaisedButtonCssMatStyler,([] as any[]),(null as any),
          (null as any)),i1.ɵprd(8448,(null as any),i3.MATERIAL_COMPATIBILITY_MODE,
          true,([] as any[])),(_l()(),i1.ɵted(0,['Confirm'])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),8,'div',[['class','col-sm-6']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),5,'button',[['class','mat-raised-button deregister__cancel-button deregister__button mat-raised-button'],
              ['md-raised-button','']],[[8,'disabled',0]],[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.closeModal()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i2.View_MdButton_0,i2.RenderType_MdButton)),i1.ɵdid(16384,(null as any),
          0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
          (null as any),(null as any)),i1.ɵdid(180224,[['cancelButton',4]],0,i4.MdButton,
          [i1.Renderer2,i1.ElementRef,i5.Platform,i6.FocusMonitor],(null as any),(null as any)),
      i1.ɵdid(16384,(null as any),0,i4.MdRaisedButtonCssMatStyler,([] as any[]),(null as any),
          (null as any)),i1.ɵprd(8448,(null as any),i3.MATERIAL_COMPATIBILITY_MODE,
          true,([] as any[])),(_l()(),i1.ɵted(0,['Cancel'])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵted((null as any),['\n    ']))],(null as any),(_ck,_v) => {
    const currVal_0:any = (i1.ɵnov(_v,20).disabled || (null as any));
    _ck(_v,18,0,currVal_0);
    const currVal_1:any = (i1.ɵnov(_v,30).disabled || (null as any));
    _ck(_v,28,0,currVal_1);
  });
}
function View_SolarCheckDeregisterComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-loader',[['loadingMessage',
      'Processing your request...'],['loadingSubMessage','We\'re sorry to see you leave.']],
      (null as any),(null as any),(null as any),i7.View_LoadingComponent_0,i7.RenderType_LoadingComponent)),
      i1.ɵdid(114688,(null as any),0,i8.LoadingComponent,([] as any[]),{loadingMessage:[0,
          'loadingMessage'],loadingSubMessage:[1,'loadingSubMessage'],fullScreen:[2,
          'fullScreen'],isLargeText:[3,'isLargeText']},(null as any))],(_ck,_v) => {
    const currVal_0:any = 'Processing your request...';
    const currVal_1:any = 'We\'re sorry to see you leave.';
    const currVal_2:any = false;
    const currVal_3:any = true;
    _ck(_v,1,0,currVal_0,currVal_1,currVal_2,currVal_3);
  },(null as any));
}
export function View_SolarCheckDeregisterComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_SolarCheckDeregisterComponent_1)),i1.ɵdid(16384,(null as any),0,i9.NgIf,
      [i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),
      i1.ɵted((null as any),['\n\n'])),(_l()(),i1.ɵeld(0,[['confirmationModal',1]],
      (null as any),7,'div',[['class','solar-check-deregister deregister dialog-container']],
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
      1,(null as any),View_SolarCheckDeregisterComponent_2)),i1.ɵdid(16384,(null as any),
      0,i9.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n    \n    '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_SolarCheckDeregisterComponent_3)),i1.ɵdid(16384,
          (null as any),0,i9.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵted((null as any),
          ['\n\n\n\n\n\n']))],(_ck,_v) => {
    var _co:i10.SolarCheckDeregisterComponent = _v.component;
    const currVal_0:boolean = !_co.isAwaitingDeregisterResponse;
    _ck(_v,1,0,currVal_0);
    const currVal_1:boolean = !_co.isAwaitingDeregisterResponse;
    _ck(_v,6,0,currVal_1);
    const currVal_2:any = _co.isAwaitingDeregisterResponse;
    _ck(_v,9,0,currVal_2);
  },(null as any));
}
export function View_SolarCheckDeregisterComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-solar-check-deregister',
      ([] as any[]),(null as any),(null as any),(null as any),View_SolarCheckDeregisterComponent_0,
      RenderType_SolarCheckDeregisterComponent)),i1.ɵdid(49152,(null as any),0,i10.SolarCheckDeregisterComponent,
      [i11.ModalService,i12.ISolarCheckService,i13.DataLayerService],(null as any),
      (null as any))],(null as any),(null as any));
}
export const SolarCheckDeregisterComponentNgFactory:i1.ComponentFactory<i10.SolarCheckDeregisterComponent> = i1.ɵccf('agl-solar-check-deregister',
    i10.SolarCheckDeregisterComponent,View_SolarCheckDeregisterComponent_Host_0,{registeredContract:'registeredContract',
        deregisterRequest:'deregisterRequest'},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9zb2xhckNoZWNrL2RlcmVnaXN0ZXIvc29sYXJDaGVja0RlcmVnaXN0ZXIuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvc2V0dGluZ3Mvc29sYXJDaGVjay9kZXJlZ2lzdGVyL3NvbGFyQ2hlY2tEZXJlZ2lzdGVyLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvc2V0dGluZ3Mvc29sYXJDaGVjay9kZXJlZ2lzdGVyL3NvbGFyQ2hlY2tEZXJlZ2lzdGVyLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9zb2xhckNoZWNrL2RlcmVnaXN0ZXIvc29sYXJDaGVja0RlcmVnaXN0ZXIuY29tcG9uZW50LnRzLlNvbGFyQ2hlY2tEZXJlZ2lzdGVyQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPHNwYW4gKm5nSWY9XCIhaXNBd2FpdGluZ0RlcmVnaXN0ZXJSZXNwb25zZVwiIGlkPVwibW9kYWwtY2xvc2UtYnV0dG9uXCIgY2xhc3M9XCJkZXJlZ2lzdGVyX19jbG9zZS1idXR0b25cIiAoY2xpY2spPVwiY2xvc2VNb2RhbCgpXCIgI2NhbmNlbEJ1dHRvblRvcFJpZ2h0PlxyXG4gICAgPHNwYW4+JiN4MjcxNTs8L3NwYW4+XHJcbjwvc3Bhbj5cclxuXHJcbjxkaXYgY2xhc3M9XCJzb2xhci1jaGVjay1kZXJlZ2lzdGVyIGRlcmVnaXN0ZXIgZGlhbG9nLWNvbnRhaW5lclwiICNjb25maXJtYXRpb25Nb2RhbD5cclxuICAgIDxkaXYgKm5nSWY9XCIhaXNBd2FpdGluZ0RlcmVnaXN0ZXJSZXNwb25zZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXJlZ2lzdGVyX19oZWFkZXJcIj5SZW1vdmUgU29sYXIgQ29tbWFuZCBDaGVjazwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPHAgY2xhc3M9XCJkZXJlZ2lzdGVyX19ib2R5XCI+XHJcbiAgICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugbm8gbG9uZ2VyIHdhbnQgdG8gcmVjZWl2ZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgaGVhbHRoIG9mIHlvdXIgc29sYXIgc3lzdGVtP1xyXG4gICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgPHAgY2xhc3M9XCJkZXJlZ2lzdGVyX19ib2R5XCI+XHJcbiAgICAgICAgICAgIElmIHlvdSBjaGFuZ2UgeW91ciBtaW5kIHlvdSBjYW4gYWx3YXlzIHNpZ24tdXAgYWdhaW4uXHJcbiAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGVyZWdpc3Rlcl9fYWN0aW9uLWJhciByb3dcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS02XCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1kLXJhaXNlZC1idXR0b24gY2xhc3M9XCJtYXQtYWNjZW50IG1hdC1yYWlzZWQtYnV0dG9uIGRlcmVnaXN0ZXJfX2J1dHRvblwiIChjbGljayk9XCJhdHRlbXB0RGVyZWdpc3RyYXRpb24oKVwiICNva0J1dHRvbj5Db25maXJtPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXNtLTZcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gbWQtcmFpc2VkLWJ1dHRvbiBjbGFzcz1cIm1hdC1yYWlzZWQtYnV0dG9uIGRlcmVnaXN0ZXJfX2NhbmNlbC1idXR0b24gZGVyZWdpc3Rlcl9fYnV0dG9uXCIgKGNsaWNrKT1cImNsb3NlTW9kYWwoKVwiICNjYW5jZWxCdXR0b24+Q2FuY2VsPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBcclxuICAgIDxhZ2wtbG9hZGVyICpuZ0lmPVwiaXNBd2FpdGluZ0RlcmVnaXN0ZXJSZXNwb25zZVwiIFtpc0xhcmdlVGV4dF09XCJ0cnVlXCIgbG9hZGluZ01lc3NhZ2U9XCJQcm9jZXNzaW5nIHlvdXIgcmVxdWVzdC4uLlwiIGxvYWRpbmdTdWJNZXNzYWdlPVwiV2UncmUgc29ycnkgdG8gc2VlIHlvdSBsZWF2ZS5cIiBbZnVsbFNjcmVlbl09XCJmYWxzZVwiID48L2FnbC1sb2FkZXI+XHJcbjwvZGl2PlxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsIjxhZ2wtc29sYXItY2hlY2stZGVyZWdpc3Rlcj48L2FnbC1zb2xhci1jaGVjay1kZXJlZ2lzdGVyPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ0FBO01BQUE7TUFBQTtRQUFBO1FBQUE7UUFBcUc7VUFBQTtVQUFBO1FBQUE7UUFBckc7TUFBQSxnQ0FBa0osMkNBQzlJO2FBQUE7VUFBQSw0Q0FBTTtNQUFBLFFBQWU7OztvQkFJckI7TUFBQSx3RUFBMkM7YUFBQSxnQ0FDdkM7TUFBQTtNQUFBLGdCQUFjLG1EQUNWO01BQUE7TUFBQSwwREFBaUM7TUFBQSxpQ0FBaUM7TUFDaEUsaURBRU47VUFBQTtVQUFBLDRDQUE0QjtVQUFBO01BRXhCLGlEQUVKO1VBQUE7VUFBQSw0Q0FBNEI7VUFBQTtNQUV4QixpREFFSjtVQUFBO1VBQUEsMERBQXdDO1VBQUEscUJBQ3BDO1VBQUE7VUFBQSxnQkFBc0IsdURBQ2xCO2lCQUFBO2NBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBaUY7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQWpGO2NBQUEscURBQUE7VUFBQTtVQUFBLG9DQUFBO1VBQUE7YUFBQTtVQUFBLHNCQUFBO1VBQUEsb0JBQTZILGdDQUFnQjtVQUFBLHFCQUMzSTtNQUNOO1VBQUE7TUFBc0IsdURBQ2xCO1VBQUE7Y0FBQTtVQUFBO1lBQUE7WUFBQTtZQUFnRztjQUFBO2NBQUE7WUFBQTtZQUFoRztVQUFBLHFEQUFBO1VBQUE7VUFBQSxvQ0FBQTtVQUFBO2FBQUE7VUFBQSxzQkFBQTtVQUFBLG9CQUFxSSwrQkFBZTtVQUFBLHFCQUNsSiwrQ0FDSjtpQkFBQTtJQUxFO0lBQUEsWUFBQSxTQUFBO0lBR0E7SUFBQSxZQUFBLFNBQUE7Ozs7b0JBS1o7TUFBQTtNQUFBO2FBQUE7VUFBQTtVQUFBO0lBQXNFO0lBQTRDO0lBQWtEO0lBQW5IO0lBQWpELFdBQXNFLFVBQTRDLFVBQWtELFVBQW5ILFNBQWpEOzs7O29CQTVCSjtNQUFBLDhDQUFBO01BQUEsc0VBRU87YUFBQSwwQkFFUDtNQUFBO01BQUEsd0VBQW1GO2FBQUEsNEJBQy9FO01BQUEsOERBQUE7TUFBQTtNQXFCTSxpREFFTjtVQUFBLDRFQUFBO1VBQUE7VUFBQSxlQUF1TSx1Q0FDck07VUFBQTs7SUE3QkE7SUFBTixXQUFNLFNBQU47SUFLUztJQUFMLFdBQUssU0FBTDtJQXVCWTtJQUFaLFdBQVksU0FBWjs7OztvQkM1Qko7TUFBQTs4Q0FBQSxVQUFBO01BQUE7TUFBQTs7OzsifQ==