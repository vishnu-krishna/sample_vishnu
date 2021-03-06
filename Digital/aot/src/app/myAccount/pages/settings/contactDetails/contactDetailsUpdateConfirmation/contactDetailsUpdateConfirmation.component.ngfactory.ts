/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './contactDetailsUpdateConfirmation.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../maui/flashMessage/flashMessage.component.ngfactory';
import * as i3 from '../../../../../../../../src/app/myAccount/maui/flashMessage/flashMessage.component';
import * as i4 from '@angular/common';
import * as i5 from '../../../../../../../../src/app/myAccount/pages/settings/contactDetails/contactDetailsUpdateConfirmation/contactDetailsUpdateConfirmation.component';
import * as i6 from '../../../../../../../../src/app/myAccount/services/featureFlag.service';
import * as i7 from '../../../../../../../../src/app/shared/service/config.service';
import * as i8 from '../../../../../../../../src/app/myAccount/pages/settings/contactDetails/contactDetailsState.service';
import * as i9 from '../../../../../../../../src/app/shared/service/dataLayer.service';
const styles_ContactDetailsUpdateConfirmationComponent:any[] = [i0.styles];
export const RenderType_ContactDetailsUpdateConfirmationComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_ContactDetailsUpdateConfirmationComponent,data:{}});
function View_ContactDetailsUpdateConfirmationComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'a',[['class',
      'update-confirmation__login-details']],[[8,'href',4]],(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['View login details']))],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.loginDetailsUrl;
        _ck(_v,0,0,currVal_0);
      });
}
function View_ContactDetailsUpdateConfirmationComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),11,'agl-maui-flash-message',
      [['class','update-confirmation__flash-message'],['type','Success']],(null as any),
      [[(null as any),'dismiss']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('dismiss' === en)) {
          const pd_0:any = ((<any>(_co.contactDetailsConfirmationDismissed = true)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i2.View_FlashMessageComponent_0,i2.RenderType_FlashMessageComponent)),i1.ɵdid(49152,
      (null as any),0,i3.FlashMessageComponent,([] as any[]),{dismissable:[0,'dismissable'],
          type:[1,'type']},{dismiss:'dismiss'}),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵeld(0,(null as any),0,1,'div',[['heading','']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['',''])),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),
          1,4,'div',[['subheading','']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        This hasn\'t changed your existing login method.\n\n        '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_ContactDetailsUpdateConfirmationComponent_2)),
      i1.ɵdid(16384,(null as any),0,i4.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
          i1.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = true;
    const currVal_1:any = 'Success';
    _ck(_v,1,0,currVal_0,currVal_1);
    const currVal_3:boolean = !!_co.loginDetailsUrl;
    _ck(_v,9,0,currVal_3);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_2:any = _co.heading;
    _ck(_v,4,0,currVal_2);
  });
}
export function View_ContactDetailsUpdateConfirmationComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_ContactDetailsUpdateConfirmationComponent_1)),i1.ɵdid(16384,(null as any),
      0,i4.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any))],
      (_ck,_v) => {
        var _co:i5.ContactDetailsUpdateConfirmationComponent = _v.component;
        const currVal_0:any = _co.isVisible;
        _ck(_v,1,0,currVal_0);
      },(null as any));
}
export function View_ContactDetailsUpdateConfirmationComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-contact-details-update-confirmation',
      ([] as any[]),[[2,'isVisible',(null as any)]],(null as any),(null as any),View_ContactDetailsUpdateConfirmationComponent_0,
      RenderType_ContactDetailsUpdateConfirmationComponent)),i1.ɵdid(114688,(null as any),
      0,i5.ContactDetailsUpdateConfirmationComponent,[i6.FeatureFlagService,i7.ConfigService,
          i8.IContactDetailsStateService,i9.DataLayerService],(null as any),(null as any))],
      (_ck,_v) => {
        _ck(_v,1,0);
      },(_ck,_v) => {
        const currVal_0:any = i1.ɵnov(_v,1).isVisible;
        _ck(_v,0,0,currVal_0);
      });
}
export const ContactDetailsUpdateConfirmationComponentNgFactory:i1.ComponentFactory<i5.ContactDetailsUpdateConfirmationComponent> = i1.ɵccf('agl-contact-details-update-confirmation',
    i5.ContactDetailsUpdateConfirmationComponent,View_ContactDetailsUpdateConfirmationComponent_Host_0,
    {contextId:'contextId',confirmationType:'confirmationType'},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9jb250YWN0RGV0YWlscy9jb250YWN0RGV0YWlsc1VwZGF0ZUNvbmZpcm1hdGlvbi9jb250YWN0RGV0YWlsc1VwZGF0ZUNvbmZpcm1hdGlvbi5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9jb250YWN0RGV0YWlscy9jb250YWN0RGV0YWlsc1VwZGF0ZUNvbmZpcm1hdGlvbi9jb250YWN0RGV0YWlsc1VwZGF0ZUNvbmZpcm1hdGlvbi5jb21wb25lbnQudHMiLCJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L3BhZ2VzL3NldHRpbmdzL2NvbnRhY3REZXRhaWxzL2NvbnRhY3REZXRhaWxzVXBkYXRlQ29uZmlybWF0aW9uL2NvbnRhY3REZXRhaWxzVXBkYXRlQ29uZmlybWF0aW9uLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zZXR0aW5ncy9jb250YWN0RGV0YWlscy9jb250YWN0RGV0YWlsc1VwZGF0ZUNvbmZpcm1hdGlvbi9jb250YWN0RGV0YWlsc1VwZGF0ZUNvbmZpcm1hdGlvbi5jb21wb25lbnQudHMuQ29udGFjdERldGFpbHNVcGRhdGVDb25maXJtYXRpb25Db21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8YWdsLW1hdWktZmxhc2gtbWVzc2FnZSBjbGFzcz1cInVwZGF0ZS1jb25maXJtYXRpb25fX2ZsYXNoLW1lc3NhZ2VcIiAqbmdJZj1cImlzVmlzaWJsZVwiIHR5cGU9XCJTdWNjZXNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc21pc3NhYmxlXT1cInRydWVcIiAoZGlzbWlzcyk9XCJjb250YWN0RGV0YWlsc0NvbmZpcm1hdGlvbkRpc21pc3NlZCA9IHRydWVcIj5cclxuICAgIDxkaXYgaGVhZGluZz57eyBoZWFkaW5nIH19PC9kaXY+XHJcbiAgICA8ZGl2IHN1YmhlYWRpbmc+XHJcbiAgICAgICAgVGhpcyBoYXNuJ3QgY2hhbmdlZCB5b3VyIGV4aXN0aW5nIGxvZ2luIG1ldGhvZC5cclxuXHJcbiAgICAgICAgPGEgY2xhc3M9XCJ1cGRhdGUtY29uZmlybWF0aW9uX19sb2dpbi1kZXRhaWxzXCIgKm5nSWY9XCIhIWxvZ2luRGV0YWlsc1VybFwiIFtocmVmXT1cImxvZ2luRGV0YWlsc1VybFwiPlZpZXcgbG9naW4gZGV0YWlsczwvYT5cclxuICAgIDwvZGl2PlxyXG48L2FnbC1tYXVpLWZsYXNoLW1lc3NhZ2U+IiwiPGFnbC1jb250YWN0LWRldGFpbHMtdXBkYXRlLWNvbmZpcm1hdGlvbj48L2FnbC1jb250YWN0LWRldGFpbHMtdXBkYXRlLWNvbmZpcm1hdGlvbj4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ01RO01BQUE7TUFBQSw4QkFBaUc7OztRQUF6QjtRQUF4RSxXQUF3RSxTQUF4RTs7OztvQkFOUjtNQUFBO01BQUE7UUFBQTtRQUFBO1FBQzZDO1VBQUE7VUFBQTtRQUFBO1FBRDdDO01BQUEsK0VBQUE7TUFBQTtVQUFBLHNDQUNvRztNQUNoRztVQUFBLDRDQUFhO1VBQUEsVUFBbUIsMkNBQ2hDO1VBQUE7VUFBQSw4QkFBZ0I7TUFHWjthQUFBO1VBQUEsd0JBQXVILDJDQUNySDtpQkFBQTs7SUFOYztJQUQ2RDtJQUFyRixXQUN3QixVQUQ2RCxTQUFyRjtJQU1zRDtJQUE5QyxXQUE4QyxTQUE5Qzs7O0lBSlM7SUFBQTs7OztvQkFGakI7TUFBQSwwREFBQTtNQUFBOzs7UUFBbUU7UUFBbkUsV0FBbUUsU0FBbkU7Ozs7b0JDQUE7TUFBQTswREFBQSxVQUFBO01BQUE7NERBQUE7O1FBQUE7O1FBQUE7UUFBQSxXQUFBLFNBQUE7Ozs7OyJ9
