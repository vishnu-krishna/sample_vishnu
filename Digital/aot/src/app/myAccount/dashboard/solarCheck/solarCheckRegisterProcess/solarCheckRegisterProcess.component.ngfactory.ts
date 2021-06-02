/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './solarCheckRegisterProcess.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../../../src/app/myAccount/dashboard/solarCheck/solarCheckRegisterProcess/solarCheckRegisterProcess.component';
import * as i3 from './solarCheckWelcome/solarCheckWelcome.component.ngfactory';
import * as i4 from '../../../../../../../src/app/myAccount/dashboard/solarCheck/solarCheckRegisterProcess/solarCheckWelcome/solarCheckWelcome.component';
import * as i5 from '../../../../../../../src/app/myAccount/modal/modal.service';
import * as i6 from './solarCheckPrerequisite/solarCheckPrerequisite.component.ngfactory';
import * as i7 from '../../../../../../../src/app/myAccount/dashboard/solarCheck/solarCheckRegisterProcess/solarCheckPrerequisite/solarCheckPrerequisite.component';
import * as i8 from '../../../../../../../src/app/myAccount/services/contract/isolarCheck.service';
import * as i9 from '../../../../../../../src/app/shared/service/dataLayer.service';
import * as i10 from '../../../../../../../src/app/shared/service/contract/imessageBus.service';
import * as i11 from './solarCheckUnsuitable/solarCheckUnsuitable.component.ngfactory';
import * as i12 from '../../../../../../../src/app/myAccount/dashboard/solarCheck/solarCheckRegisterProcess/solarCheckUnsuitable/solarCheckUnsuitable.component';
import * as i13 from './solarCheckSolarDetails/solarCheckSolarDetails.component.ngfactory';
import * as i14 from '../../../../../../../src/app/myAccount/dashboard/solarCheck/solarCheckRegisterProcess/solarCheckSolarDetails/solarCheckSolarDetails.component';
import * as i15 from '@angular/forms';
import * as i16 from './solarCheckRegister/solarCheckRegister.component.ngfactory';
import * as i17 from '../../../../../../../src/app/myAccount/dashboard/solarCheck/solarCheckRegisterProcess/solarCheckRegister/solarCheckRegister.component';
import * as i18 from '../../../../../../../src/app/myAccount/dashboard/solarCheck/solarCheckStatus/solarCheckStatusViewModelFactory';
const styles_SolarCheckRegisterProcessComponent:any[] = [i0.styles];
export const RenderType_SolarCheckRegisterProcessComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_SolarCheckRegisterProcessComponent,data:{}});
export function View_SolarCheckRegisterProcessComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-solar-check-welcome',
      ([] as any[]),[[2,'hide',(null as any)]],[[(null as any),'next']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:i2.SolarCheckRegisterProcessComponent = _v.component;
        if (('next' === en)) {
          const pd_0:any = ((<any>_co.handleNext($event)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i3.View_SolarCheckWelcomeComponent_0,i3.RenderType_SolarCheckWelcomeComponent)),
      i1.ɵdid(49152,(null as any),0,i4.SolarCheckWelcomeComponent,[i5.ModalService],
          (null as any),{next:'next'}),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),1,'agl-solar-check-prequisite',([] as any[]),
              [[2,'hide',(null as any)]],[[(null as any),'back'],[(null as any),'next']],
              (_v,en,$event) => {
                var ad:boolean = true;
                var _co:i2.SolarCheckRegisterProcessComponent = _v.component;
                if (('back' === en)) {
                  const pd_0:any = ((<any>_co.handlePrevious($event)) !== false);
                  ad = (pd_0 && ad);
                }
                if (('next' === en)) {
                  const pd_1:any = ((<any>_co.handleNext($event)) !== false);
                  ad = (pd_1 && ad);
                }
                return ad;
              },i6.View_SolarCheckPrerequisiteComponent_0,i6.RenderType_SolarCheckPrerequisiteComponent)),
      i1.ɵdid(49152,(null as any),0,i7.SolarCheckPrerequisiteComponent,[i8.ISolarCheckService,
          i5.ModalService,i9.DataLayerService,i10.IMessageBusService],{contract:[0,
          'contract']},{next:'next',back:'back'}),(_l()(),i1.ɵted((null as any),['\n'])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-solar-check-unsuitable',
          ([] as any[]),[[2,'hide',(null as any)]],[[(null as any),'back'],[(null as any),
              'next']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.SolarCheckRegisterProcessComponent = _v.component;
            if (('back' === en)) {
              const pd_0:any = ((<any>_co.handlePrevious($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('next' === en)) {
              const pd_1:any = ((<any>_co.handleNext($event)) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i11.View_SolarCheckUnsuitableComponent_0,i11.RenderType_SolarCheckUnsuitableComponent)),
      i1.ɵdid(49152,(null as any),0,i12.SolarCheckUnsuitableComponent,[i8.ISolarCheckService,
          i5.ModalService,i10.IMessageBusService],{contract:[0,'contract']},{next:'next',
          back:'back'}),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'agl-solar-check-solar-details',([] as any[]),[[2,'hide',
              (null as any)]],[[(null as any),'back'],[(null as any),'next']],(_v,
              en,$event) => {
            var ad:boolean = true;
            var _co:i2.SolarCheckRegisterProcessComponent = _v.component;
            if (('back' === en)) {
              const pd_0:any = ((<any>_co.handlePrevious($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('next' === en)) {
              const pd_1:any = ((<any>_co.handleNext($event)) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i13.View_SolarCheckSolarDetailsComponent_0,i13.RenderType_SolarCheckSolarDetailsComponent)),
      i1.ɵdid(114688,(null as any),0,i14.SolarCheckSolarDetailsComponent,[i5.ModalService,
          i8.ISolarCheckService,i15.FormBuilder,i10.IMessageBusService,i9.DataLayerService],
          {scDetailsModel:[0,'scDetailsModel'],isUpdate:[1,'isUpdate']},{next:'next',
              back:'back'}),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'agl-solar-check-register',([] as any[]),[[2,
              'hide',(null as any)]],[[(null as any),'back'],[(null as any),'next']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.SolarCheckRegisterProcessComponent = _v.component;
            if (('back' === en)) {
              const pd_0:any = ((<any>_co.handlePrevious($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('next' === en)) {
              const pd_1:any = ((<any>_co.handleNext($event)) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i16.View_SolarCheckRegisterComponent_0,i16.RenderType_SolarCheckRegisterComponent)),
      i1.ɵdid(49152,(null as any),0,i17.SolarCheckRegisterComponent,[i5.ModalService,
          i8.ISolarCheckService,i9.DataLayerService,i18.SolarCheckStatusViewModelFactory,
          i10.IMessageBusService],{contract:[0,'contract'],scDetailsModel:[1,'scDetailsModel']},
          {next:'next',back:'back'}),(_l()(),i1.ɵted((null as any),['\n']))],(_ck,
      _v) => {
    var _co:i2.SolarCheckRegisterProcessComponent = _v.component;
    const currVal_2:any = _co.contract;
    _ck(_v,4,0,currVal_2);
    const currVal_4:any = _co.contract;
    _ck(_v,7,0,currVal_4);
    const currVal_6:any = _co.scDetailsModel;
    const currVal_7:any = _co.isUpdate;
    _ck(_v,10,0,currVal_6,currVal_7);
    const currVal_9:any = _co.contract;
    const currVal_10:any = _co.scDetailsModel;
    _ck(_v,13,0,currVal_9,currVal_10);
  },(_ck,_v) => {
    var _co:i2.SolarCheckRegisterProcessComponent = _v.component;
    const currVal_0:any = _co.hideWelcome;
    _ck(_v,0,0,currVal_0);
    const currVal_1:any = _co.hidePrerequiste;
    _ck(_v,3,0,currVal_1);
    const currVal_3:any = _co.hideUnsuitable;
    _ck(_v,6,0,currVal_3);
    const currVal_5:any = _co.hideSolarDetails;
    _ck(_v,9,0,currVal_5);
    const currVal_8:any = _co.hideRegister;
    _ck(_v,12,0,currVal_8);
  });
}
export function View_SolarCheckRegisterProcessComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-solar-check-register-process',
      ([] as any[]),(null as any),(null as any),(null as any),View_SolarCheckRegisterProcessComponent_0,
      RenderType_SolarCheckRegisterProcessComponent)),i1.ɵdid(114688,(null as any),
      0,i2.SolarCheckRegisterProcessComponent,([] as any[]),(null as any),(null as any))],
      (_ck,_v) => {
        _ck(_v,1,0);
      },(null as any));
}
export const SolarCheckRegisterProcessComponentNgFactory:i1.ComponentFactory<i2.SolarCheckRegisterProcessComponent> = i1.ɵccf('agl-solar-check-register-process',
    i2.SolarCheckRegisterProcessComponent,View_SolarCheckRegisterProcessComponent_Host_0,
    {contract:'contract',scDetailsModel:'scDetailsModel'},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9kYXNoYm9hcmQvc29sYXJDaGVjay9zb2xhckNoZWNrUmVnaXN0ZXJQcm9jZXNzL3NvbGFyQ2hlY2tSZWdpc3RlclByb2Nlc3MuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvZGFzaGJvYXJkL3NvbGFyQ2hlY2svc29sYXJDaGVja1JlZ2lzdGVyUHJvY2Vzcy9zb2xhckNoZWNrUmVnaXN0ZXJQcm9jZXNzLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvZGFzaGJvYXJkL3NvbGFyQ2hlY2svc29sYXJDaGVja1JlZ2lzdGVyUHJvY2Vzcy9zb2xhckNoZWNrUmVnaXN0ZXJQcm9jZXNzLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9kYXNoYm9hcmQvc29sYXJDaGVjay9zb2xhckNoZWNrUmVnaXN0ZXJQcm9jZXNzL3NvbGFyQ2hlY2tSZWdpc3RlclByb2Nlc3MuY29tcG9uZW50LnRzLlNvbGFyQ2hlY2tSZWdpc3RlclByb2Nlc3NDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8YWdsLXNvbGFyLWNoZWNrLXdlbGNvbWUgW2NsYXNzLmhpZGVdPSdoaWRlV2VsY29tZScgKG5leHQpPSdoYW5kbGVOZXh0KCRldmVudCknPjwvYWdsLXNvbGFyLWNoZWNrLXdlbGNvbWU+XHJcbjxhZ2wtc29sYXItY2hlY2stcHJlcXVpc2l0ZSBbY2xhc3MuaGlkZV09J2hpZGVQcmVyZXF1aXN0ZScgKGJhY2spPSdoYW5kbGVQcmV2aW91cygkZXZlbnQpJyAobmV4dCk9J2hhbmRsZU5leHQoJGV2ZW50KScgW2NvbnRyYWN0XT0nY29udHJhY3QnPjwvYWdsLXNvbGFyLWNoZWNrLXByZXF1aXNpdGU+XHJcbjxhZ2wtc29sYXItY2hlY2stdW5zdWl0YWJsZSBbY2xhc3MuaGlkZV09J2hpZGVVbnN1aXRhYmxlJyAoYmFjayk9J2hhbmRsZVByZXZpb3VzKCRldmVudCknIChuZXh0KT0naGFuZGxlTmV4dCgkZXZlbnQpJyBbY29udHJhY3RdPSdjb250cmFjdCc+PC9hZ2wtc29sYXItY2hlY2stdW5zdWl0YWJsZT5cclxuPGFnbC1zb2xhci1jaGVjay1zb2xhci1kZXRhaWxzIFtjbGFzcy5oaWRlXT0naGlkZVNvbGFyRGV0YWlscycgKGJhY2spPSdoYW5kbGVQcmV2aW91cygkZXZlbnQpJyAobmV4dCk9J2hhbmRsZU5leHQoJGV2ZW50KScgW3NjRGV0YWlsc01vZGVsXT0nc2NEZXRhaWxzTW9kZWwnIFtpc1VwZGF0ZV09XCJpc1VwZGF0ZVwiPjwvYWdsLXNvbGFyLWNoZWNrLXNvbGFyLWRldGFpbHM+XHJcbjxhZ2wtc29sYXItY2hlY2stcmVnaXN0ZXIgW2NsYXNzLmhpZGVdPSdoaWRlUmVnaXN0ZXInIChiYWNrKT0naGFuZGxlUHJldmlvdXMoJGV2ZW50KScgKG5leHQpPSdoYW5kbGVOZXh0KCRldmVudCknIFtzY0RldGFpbHNNb2RlbF09J3NjRGV0YWlsc01vZGVsJyBbY29udHJhY3RdPSdjb250cmFjdCc+PC9hZ2wtc29sYXItY2hlY2stcmVnaXN0ZXI+XHJcbiIsIjxhZ2wtc29sYXItY2hlY2stcmVnaXN0ZXItcHJvY2Vzcz48L2FnbC1zb2xhci1jaGVjay1yZWdpc3Rlci1wcm9jZXNzPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDQUE7TUFBQTtRQUFBO1FBQUE7UUFBb0Q7VUFBQTtVQUFBO1FBQUE7UUFBcEQ7TUFBQTthQUFBO1VBQUEsNkJBQTBHLHVDQUMxRztpQkFBQTtjQUFBO2NBQUE7Z0JBQUE7Z0JBQUE7Z0JBQTJEO2tCQUFBO2tCQUFBO2dCQUFBO2dCQUFnQztrQkFBQTtrQkFBQTtnQkFBQTtnQkFBM0Y7Y0FBQTthQUFBO29FQUFBO1VBQUEsd0NBQTBLO01BQzFLO1VBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBMEQ7Y0FBQTtjQUFBO1lBQUE7WUFBZ0M7Y0FBQTtjQUFBO1lBQUE7WUFBMUY7VUFBQTthQUFBO2dEQUFBO1VBQUEsY0FBeUssdUNBQ3pLO1VBQUE7Y0FBQTt1QkFBQTtZQUFBO1lBQUE7WUFBK0Q7Y0FBQTtjQUFBO1lBQUE7WUFBZ0M7Y0FBQTtjQUFBO1lBQUE7WUFBL0Y7VUFBQTthQUFBOzBGQUFBO1VBQUE7Y0FBQSxjQUFtTix1Q0FDbk47VUFBQTtjQUFBO1VBQUE7WUFBQTtZQUFBO1lBQXNEO2NBQUE7Y0FBQTtZQUFBO1lBQWdDO2NBQUE7Y0FBQTtZQUFBO1lBQXRGO1VBQUE7YUFBQTs7Z0NBQUE7VUFBQSwyQkFBcU07OztJQUg5RTtJQUF2SCxXQUF1SCxTQUF2SDtJQUNzSDtJQUF0SCxXQUFzSCxTQUF0SDtJQUMySDtJQUFrQztJQUE3SixZQUEySCxVQUFrQyxTQUE3SjtJQUNvSjtJQUFsQztJQUFsSCxZQUFvSixVQUFsQyxVQUFsSDs7O0lBSnlCO0lBQXpCLFdBQXlCLFNBQXpCO0lBQzRCO0lBQTVCLFdBQTRCLFNBQTVCO0lBQzRCO0lBQTVCLFdBQTRCLFNBQTVCO0lBQytCO0lBQS9CLFdBQStCLFNBQS9CO0lBQzBCO0lBQTFCLFlBQTBCLFNBQTFCOzs7O29CQ0pBO01BQUE7bURBQUEsVUFBQTtNQUFBOztRQUFBOzs7OzsifQ==
