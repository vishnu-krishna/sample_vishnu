/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './alert.component.scss.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/material/icon';
import * as i5 from '@angular/common';
import * as i6 from '../../../../../../src/app/shared/component/alert/alert.component';
import * as i7 from '@angular/platform-browser';
const styles_AlertComponent:any[] = [i0.styles];
export const RenderType_AlertComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:2,
    styles:styles_AlertComponent,data:{}});
function View_AlertComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),5,'div',[['class',
      'alert__icon']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),2,'md-icon',[['class','mat-icon'],['role','img']],(null as any),
          (null as any),(null as any),i2.View_MdIcon_0,i2.RenderType_MdIcon)),i1.ɵdid(16384,
          (null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],
              i1.ElementRef],(null as any),(null as any)),i1.ɵdid(638976,(null as any),
          0,i4.MdIcon,[i1.Renderer2,i1.ElementRef,i4.MdIconRegistry,[8,(null as any)]],
          {svgIcon:[0,'svgIcon']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = i1.ɵinlineInterpolate(1,'icon-alert-',_co.alertType,
            '');
        _ck(_v,4,0,currVal_0);
      },(null as any));
}
function View_AlertComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),3,'div',[['class',
      'alert-close']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.dismiss()) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵeld(0,(null as any),(null as any),2,
      'md-icon',[['class','mat-icon'],['role','img'],['svgIcon','icon-close']],(null as any),
      (null as any),(null as any),i2.View_MdIcon_0,i2.RenderType_MdIcon)),i1.ɵdid(16384,
      (null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
      (null as any),(null as any)),i1.ɵdid(638976,(null as any),0,i4.MdIcon,[i1.Renderer2,
      i1.ElementRef,i4.MdIconRegistry,[8,(null as any)]],{svgIcon:[0,'svgIcon']},(null as any))],
      (_ck,_v) => {
        const currVal_0:any = 'icon-close';
        _ck(_v,3,0,currVal_0);
      },(null as any));
}
function View_AlertComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),16,'div',([] as any[]),
      [[8,'className',0]],(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_AlertComponent_2)),i1.ɵdid(16384,(null as any),
          0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          10,'div',[['class','alert__text']],[[2,'pad-fix',(null as any)]],(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',[['class',
          'alert__text--heading']],[[2,'no-heading',(null as any)],[8,'innerHTML',
          1]],(null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',[['class',
          'alert__text--body']],[[2,'no-body',(null as any)],[8,'innerHTML',1]],(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,
          (null as any),View_AlertComponent_3)),i1.ɵdid(16384,(null as any),0,i5.NgIf,
          [i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),
          i1.ɵted((null as any),['\n        '])),i1.ɵncd((null as any),0),(_l()(),
          i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),['\n']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_1:boolean = !_co.showClose;
        _ck(_v,3,0,currVal_1);
        const currVal_7:any = (_co.showClose && !_co.dismissAlert);
        _ck(_v,12,0,currVal_7);
      },(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = i1.ɵinlineInterpolate(1,'alert alert--',_co.alertType,
            '');
        _ck(_v,0,0,currVal_0);
        const currVal_2:boolean = !!_co.showClose;
        _ck(_v,5,0,currVal_2);
        const currVal_3:boolean = !_co.heading;
        const currVal_4:any = _co.headingHtml;
        _ck(_v,7,0,currVal_3,currVal_4);
        const currVal_5:boolean = !_co.body;
        const currVal_6:any = _co.bodyHtml;
        _ck(_v,9,0,currVal_5,currVal_6);
      });
}
export function View_AlertComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_AlertComponent_1)),i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,
      i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),
      ['\n']))],(_ck,_v) => {
    var _co:i6.AlertComponent = _v.component;
    const currVal_0:boolean = !_co.dismissAlert;
    _ck(_v,1,0,currVal_0);
  },(null as any));
}
export function View_AlertComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-alert',([] as any[]),
      (null as any),(null as any),(null as any),View_AlertComponent_0,RenderType_AlertComponent)),
      i1.ɵdid(114688,(null as any),0,i6.AlertComponent,[i7.DomSanitizer],(null as any),
          (null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const AlertComponentNgFactory:i1.ComponentFactory<i6.AlertComponent> = i1.ɵccf('agl-alert',
    i6.AlertComponent,View_AlertComponent_Host_0,{alertType:'alertType',heading:'heading',
        body:'body',allowAllHtml:'allowAllHtml',isDismissible:'isDismissible'},{closeEvent:'closeEvent'},
    ['*']);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvYWxlcnQvYWxlcnQuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50L2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50L2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvYWxlcnQvYWxlcnQuY29tcG9uZW50LnRzLkFsZXJ0Q29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LS17e2FsZXJ0VHlwZX19XCIgKm5nSWY9XCIhZGlzbWlzc0FsZXJ0XCI+XHJcbiAgICA8ZGl2ICpuZ0lmPVwiIXNob3dDbG9zZVwiIGNsYXNzPVwiYWxlcnRfX2ljb25cIj5cclxuICAgICAgICA8bWQtaWNvbiBzdmdJY29uPVwiaWNvbi1hbGVydC17e2FsZXJ0VHlwZX19XCI+PC9tZC1pY29uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYWxlcnRfX3RleHRcIiBbY2xhc3MucGFkLWZpeF09XCIhIXNob3dDbG9zZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydF9fdGV4dC0taGVhZGluZ1wiIFtjbGFzcy5uby1oZWFkaW5nXT1cIiFoZWFkaW5nXCIgW2lubmVySFRNTF09XCJoZWFkaW5nSHRtbFwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbGVydF9fdGV4dC0tYm9keVwiIFtjbGFzcy5uby1ib2R5XT1cIiFib2R5XCIgW2lubmVySFRNTF09XCJib2R5SHRtbFwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93Q2xvc2UgJiYgIWRpc21pc3NBbGVydFwiIChjbGljayk9XCJkaXNtaXNzKClcIiBjbGFzcz1cImFsZXJ0LWNsb3NlXCI+PG1kLWljb24gc3ZnSWNvbj1cImljb24tY2xvc2VcIj48L21kLWljb24+PC9kaXY+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iLCI8YWdsLWFsZXJ0PjwvYWdsLWFsZXJ0PiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ0NJO01BQUE7TUFBNEMsK0NBQ3hDO1VBQUE7VUFBQSwyRUFBQTtVQUFBOzJCQUFBLHNDQUFBO1VBQUE7VUFBQSx1Q0FBc0Q7OztRQUE3QztZQUFBO1FBQVQsV0FBUyxTQUFUOzs7O29CQUtBO01BQUE7SUFBQTtJQUFBO0lBQXdDO01BQUE7TUFBQTtJQUFBO0lBQXhDO0VBQUEsZ0NBQWdGO01BQUE7TUFBQSwyRUFBQTtNQUFBO01BQUEsb0NBQUE7c0NBQUE7O1FBQVM7UUFBVCxXQUFTLFNBQVQ7Ozs7b0JBUHhGO01BQUE7TUFBOEQsMkNBQzFEO1VBQUEsNkRBQUE7VUFBQTtNQUVNLDJDQUNOO1VBQUE7VUFBQSw0Q0FBdUQ7VUFBQSxpQkFDbkQ7VUFBQTtVQUFBLDhEQUFnRztVQUFBLGlCQUNoRztVQUFBO1VBQUEsNENBQW9GO1VBQUEsaUJBQ3BGO1VBQUEsNkNBQUE7VUFBQSxzRUFBOEg7aUJBQUEsdUNBQzlILGtCQUF5QjtpQkFBQSw0QkFDdkI7OztRQVJEO1FBQUwsV0FBSyxTQUFMO1FBTVM7UUFBTCxZQUFLLFNBQUw7OztRQVBIO1lBQUE7UUFBTCxXQUFLLFNBQUw7UUFJNkI7UUFBekIsV0FBeUIsU0FBekI7UUFDc0M7UUFBOEI7UUFBaEUsV0FBa0MsVUFBOEIsU0FBaEU7UUFDK0I7UUFBd0I7UUFBdkQsV0FBK0IsVUFBd0IsU0FBdkQ7Ozs7b0JBTlI7TUFBQSwrQkFBQTtvQkFBQSxtQ0FVTTtNQUFBOztJQVZrQztJQUF4QyxXQUF3QyxTQUF4Qzs7OztvQkNBQTtNQUFBO2FBQUE7VUFBQTtJQUFBOzs7Ozs7In0=
