/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from '../../../../../../../../../src/app/myAccount/pages/settings/solarCheck/systemDetails/updateProcess/solarCheckUpdateDetailsProcess.component';
import * as i2 from './solarCheckUpdateReason/solarCheckUpdateReason.component.ngfactory';
import * as i3 from '../../../../../../../../../src/app/myAccount/pages/settings/solarCheck/systemDetails/updateProcess/solarCheckUpdateReason/solarCheckUpdateReason.component';
import * as i4 from '../../../../../../../../../src/app/myAccount/modal/modal.service';
import * as i5 from '../update/solarCheckUpdateSystemDetails.component.ngfactory';
import * as i6 from '../../../../../../../../../src/app/myAccount/pages/settings/solarCheck/systemDetails/update/solarCheckUpdateSystemDetails.component';
import * as i7 from '../../../../../../../../../src/app/myAccount/services/contract/isolarCheck.service';
import * as i8 from '../../../../../../../../../src/app/shared/service/contract/imessageBus.service';
const styles_SolarCheckUpdateDetailsProcessComponent:any[] = ([] as any[]);
export const RenderType_SolarCheckUpdateDetailsProcessComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_SolarCheckUpdateDetailsProcessComponent,data:{}});
export function View_SolarCheckUpdateDetailsProcessComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'agl-solar-check-update-reason',
      ([] as any[]),[[2,'hide',(null as any)]],[[(null as any),'next']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:i1.SolarCheckUpdateDetailsProcessComponent = _v.component;
        if (('next' === en)) {
          const pd_0:any = ((<any>_co.handleNext($event)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i2.View_SolarCheckUpdateReasonComponent_0,i2.RenderType_SolarCheckUpdateReasonComponent)),
      i0.ɵdid(49152,(null as any),0,i3.SolarCheckUpdateReasonComponent,[i4.ModalService],
          (null as any),{next:'next'}),(_l()(),i0.ɵted((null as any),['\n'])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),1,'agl-settings-update-solar-system-details',
              ([] as any[]),[[2,'hide',(null as any)]],[[(null as any),'previous']],
              (_v,en,$event) => {
                var ad:boolean = true;
                var _co:i1.SolarCheckUpdateDetailsProcessComponent = _v.component;
                if (('previous' === en)) {
                  const pd_0:any = ((<any>_co.handlePrevious($event)) !== false);
                  ad = (pd_0 && ad);
                }
                return ad;
              },i5.View_SolarCheckUpdateSystemDetailsComponent_0,i5.RenderType_SolarCheckUpdateSystemDetailsComponent)),
      i0.ɵdid(49152,(null as any),0,i6.SolarCheckUpdateSystemDetailsComponent,[i7.ISolarCheckService,
          i4.ModalService,i8.IMessageBusService],{contractNumber:[0,'contractNumber'],
          scDetailsModel:[1,'scDetailsModel'],updateReason:[2,'updateReason']},{previous:'previous'})],
      (_ck,_v) => {
        var _co:i1.SolarCheckUpdateDetailsProcessComponent = _v.component;
        const currVal_2:any = _co.contractNumber;
        const currVal_3:any = _co.scDetailsModel;
        const currVal_4:any = _co.updateReason;
        _ck(_v,4,0,currVal_2,currVal_3,currVal_4);
      },(_ck,_v) => {
        var _co:i1.SolarCheckUpdateDetailsProcessComponent = _v.component;
        const currVal_0:any = _co.hideReason;
        _ck(_v,0,0,currVal_0);
        const currVal_1:any = _co.hideUpdate;
        _ck(_v,3,0,currVal_1);
      });
}
export function View_SolarCheckUpdateDetailsProcessComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'agl-solar-check-update-details-process',
      ([] as any[]),(null as any),(null as any),(null as any),View_SolarCheckUpdateDetailsProcessComponent_0,
      RenderType_SolarCheckUpdateDetailsProcessComponent)),i0.ɵdid(114688,(null as any),
      0,i1.SolarCheckUpdateDetailsProcessComponent,([] as any[]),(null as any),(null as any))],
      (_ck,_v) => {
        _ck(_v,1,0);
      },(null as any));
}
export const SolarCheckUpdateDetailsProcessComponentNgFactory:i0.ComponentFactory<i1.SolarCheckUpdateDetailsProcessComponent> = i0.ɵccf('agl-solar-check-update-details-process',
    i1.SolarCheckUpdateDetailsProcessComponent,View_SolarCheckUpdateDetailsProcessComponent_Host_0,
    {contractNumber:'contractNumber',scDetailsModel:'scDetailsModel'},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9zb2xhckNoZWNrL3N5c3RlbURldGFpbHMvdXBkYXRlUHJvY2Vzcy9zb2xhckNoZWNrVXBkYXRlRGV0YWlsc1Byb2Nlc3MuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvc2V0dGluZ3Mvc29sYXJDaGVjay9zeXN0ZW1EZXRhaWxzL3VwZGF0ZVByb2Nlc3Mvc29sYXJDaGVja1VwZGF0ZURldGFpbHNQcm9jZXNzLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvc2V0dGluZ3Mvc29sYXJDaGVjay9zeXN0ZW1EZXRhaWxzL3VwZGF0ZVByb2Nlc3Mvc29sYXJDaGVja1VwZGF0ZURldGFpbHNQcm9jZXNzLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9zb2xhckNoZWNrL3N5c3RlbURldGFpbHMvdXBkYXRlUHJvY2Vzcy9zb2xhckNoZWNrVXBkYXRlRGV0YWlsc1Byb2Nlc3MuY29tcG9uZW50LnRzLlNvbGFyQ2hlY2tVcGRhdGVEZXRhaWxzUHJvY2Vzc0NvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxhZ2wtc29sYXItY2hlY2stdXBkYXRlLXJlYXNvbiBbY2xhc3MuaGlkZV09J2hpZGVSZWFzb24nIChuZXh0KT0naGFuZGxlTmV4dCgkZXZlbnQpJz48L2FnbC1zb2xhci1jaGVjay11cGRhdGUtcmVhc29uPlxyXG48YWdsLXNldHRpbmdzLXVwZGF0ZS1zb2xhci1zeXN0ZW0tZGV0YWlscyBbY2xhc3MuaGlkZV09J2hpZGVVcGRhdGUnIChwcmV2aW91cyk9J2hhbmRsZVByZXZpb3VzKCRldmVudCknIFtjb250cmFjdE51bWJlcl09J2NvbnRyYWN0TnVtYmVyJyBbc2NEZXRhaWxzTW9kZWxdPSdzY0RldGFpbHNNb2RlbCcgW3VwZGF0ZVJlYXNvbl09J3VwZGF0ZVJlYXNvbic+PC9hZ2wtc2V0dGluZ3MtdXBkYXRlLXNvbGFyLXN5c3RlbS1kZXRhaWxzPiIsIjxhZ2wtc29sYXItY2hlY2stdXBkYXRlLWRldGFpbHMtcHJvY2Vzcz48L2FnbC1zb2xhci1jaGVjay11cGRhdGUtZGV0YWlscy1wcm9jZXNzPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNBQTtNQUFBO1FBQUE7UUFBQTtRQUF5RDtVQUFBO1VBQUE7UUFBQTtRQUF6RDtNQUFBO2FBQUE7VUFBQSw2QkFBcUgsdUNBQ3JIO2lCQUFBO2NBQUE7Y0FBQTtnQkFBQTtnQkFBQTtnQkFBb0U7a0JBQUE7a0JBQUE7Z0JBQUE7Z0JBQXBFO2NBQUE7YUFBQTsrQ0FBQTtVQUFBOzs7UUFBd0c7UUFBa0M7UUFBa0M7UUFBNUssV0FBd0csVUFBa0MsVUFBa0MsU0FBNUs7OztRQUQrQjtRQUEvQixXQUErQixTQUEvQjtRQUMwQztRQUExQyxXQUEwQyxTQUExQzs7OztvQkNEQTtNQUFBO3dEQUFBLFVBQUE7TUFBQTs7UUFBQTs7Ozs7In0=