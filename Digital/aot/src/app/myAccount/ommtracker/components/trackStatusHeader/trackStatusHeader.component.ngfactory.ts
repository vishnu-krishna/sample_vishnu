/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './trackStatusHeader.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/material/icon';
import * as i5 from '@angular/common';
import * as i6 from '../whatHappensNext/whatHappensNext.component.ngfactory';
import * as i7 from '../../../../../../../src/app/myAccount/ommtracker/components/whatHappensNext/whatHappensNext.component';
import * as i8 from '../../../../../../../src/app/myAccount/ommtracker/components/trackStatusHeader/trackStatusHeader.component';
import * as i9 from '../../../../../../../src/app/shared/service/dataLayer.service';
const styles_TrackStatusHeaderComponent:any[] = [i0.styles];
export const RenderType_TrackStatusHeaderComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_TrackStatusHeaderComponent,data:{}});
function View_TrackStatusHeaderComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'status-header__subheader__text__wording  link'],['id','status-header-what-happens-next-link']],
      (null as any),[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.toggleContent(true)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['','']))],(null as any),
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.getSubText();
        _ck(_v,1,0,currVal_0);
      });
}
function View_TrackStatusHeaderComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),8,'div',[['class',
      'status-header__subheader__text']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),2,'md-icon',[['class','status-header__subheader__text__tooltip hover_tooltip mat-icon'],
          ['id','status-header-what-happens-next-icon'],['role','img'],['svgIcon',
              'icon-question-tooltip']],(null as any),[[(null as any),'click']],(_v,
          en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.toggleContent(true)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i2.View_MdIcon_0,i2.RenderType_MdIcon)),i1.ɵdid(16384,(null as any),0,i3.MdPrefixRejector,
          [[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],(null as any),(null as any)),
      i1.ɵdid(638976,(null as any),0,i4.MdIcon,[i1.Renderer2,i1.ElementRef,i4.MdIconRegistry,
          [8,(null as any)]],{svgIcon:[0,'svgIcon']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
          1,(null as any),View_TrackStatusHeaderComponent_2)),i1.ɵdid(16384,(null as any),
          0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n        ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = 'icon-question-tooltip';
    _ck(_v,4,0,currVal_0);
    const currVal_1:any = (_co.getSubText() !== '');
    _ck(_v,7,0,currVal_1);
  },(null as any));
}
function View_TrackStatusHeaderComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'status-header__subheader__text__wording']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['','']))],(null as any),
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.getSubText();
        _ck(_v,1,0,currVal_0);
      });
}
function View_TrackStatusHeaderComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',[['class',
      'status-header__subheader__text']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_TrackStatusHeaderComponent_4)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = (_co.getSubText() !== '');
        _ck(_v,3,0,currVal_0);
      },(null as any));
}
function View_TrackStatusHeaderComponent_5(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-what-happens-next',
      ([] as any[]),(null as any),[[(null as any),'clickClose']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('clickClose' === en)) {
          const pd_0:any = ((<any>_co.toggleContent(false)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i6.View_WhatHappensNextComponent_0,i6.RenderType_WhatHappensNextComponent)),
      i1.ɵdid(49152,(null as any),0,i7.WhatHappensNextComponent,([] as any[]),{whatHappensNextContent:[0,
          'whatHappensNextContent']},{clickClose:'clickClose'})],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.whatHappensNextContent;
    _ck(_v,1,0,currVal_0);
  },(null as any));
}
export function View_TrackStatusHeaderComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),20,'div',[['class',
      'status-header ']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          2,'md-icon',[['class','status-header__status--icon mat-icon'],['role','img']],
          (null as any),(null as any),(null as any),i2.View_MdIcon_0,i2.RenderType_MdIcon)),
      i1.ɵdid(16384,(null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],
          i1.ElementRef],(null as any),(null as any)),i1.ɵdid(638976,(null as any),
          0,i4.MdIcon,[i1.Renderer2,i1.ElementRef,i4.MdIconRegistry,[8,(null as any)]],
          {svgIcon:[0,'svgIcon']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'h1',[['class','status-header__status--text']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        ','\n    '])),(_l()(),i1.ɵted((null as any),
          ['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),10,'div',[['class',
          'status-header__subheader']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_TrackStatusHeaderComponent_1)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_TrackStatusHeaderComponent_3)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_TrackStatusHeaderComponent_5)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        \n    '])),
      (_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵted((null as any),['\n']))],
      (_ck,_v) => {
        var _co:i8.TrackStatusHeaderComponent = _v.component;
        const currVal_0:any = _co.getStatusIcon();
        _ck(_v,4,0,currVal_0);
        const currVal_2:any = (_co.trackerMode === _co.TrackerModeEnum.Track);
        _ck(_v,12,0,currVal_2);
        const currVal_3:any = (_co.trackerMode !== _co.TrackerModeEnum.Track);
        _ck(_v,15,0,currVal_3);
        const currVal_4:any = _co.isOpen;
        _ck(_v,18,0,currVal_4);
      },(_ck,_v) => {
        var _co:i8.TrackStatusHeaderComponent = _v.component;
        const currVal_1:any = _co.getStatusText();
        _ck(_v,7,0,currVal_1);
      });
}
export function View_TrackStatusHeaderComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-status-header',
      ([] as any[]),(null as any),(null as any),(null as any),View_TrackStatusHeaderComponent_0,
      RenderType_TrackStatusHeaderComponent)),i1.ɵdid(114688,(null as any),0,i8.TrackStatusHeaderComponent,
      [i9.DataLayerService],(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const TrackStatusHeaderComponentNgFactory:i1.ComponentFactory<i8.TrackStatusHeaderComponent> = i1.ɵccf('agl-status-header',
    i8.TrackStatusHeaderComponent,View_TrackStatusHeaderComponent_Host_0,{whatHappensNextContent:'whatHappensNextContent',
        headerStatus:'headerStatus',trackerMode:'trackerMode'},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9vbW10cmFja2VyL2NvbXBvbmVudHMvdHJhY2tTdGF0dXNIZWFkZXIvdHJhY2tTdGF0dXNIZWFkZXIuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvb21tdHJhY2tlci9jb21wb25lbnRzL3RyYWNrU3RhdHVzSGVhZGVyL3RyYWNrU3RhdHVzSGVhZGVyLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvb21tdHJhY2tlci9jb21wb25lbnRzL3RyYWNrU3RhdHVzSGVhZGVyL3RyYWNrU3RhdHVzSGVhZGVyLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9vbW10cmFja2VyL2NvbXBvbmVudHMvdHJhY2tTdGF0dXNIZWFkZXIvdHJhY2tTdGF0dXNIZWFkZXIuY29tcG9uZW50LnRzLlRyYWNrU3RhdHVzSGVhZGVyQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPGRpdiBjbGFzcz1cInN0YXR1cy1oZWFkZXIgXCI+XHJcbiAgICA8bWQtaWNvbiBbc3ZnSWNvbl09J2dldFN0YXR1c0ljb24oKScgY2xhc3M9XCJzdGF0dXMtaGVhZGVyX19zdGF0dXMtLWljb25cIj48L21kLWljb24+XHJcbiAgICA8aDEgY2xhc3M9XCJzdGF0dXMtaGVhZGVyX19zdGF0dXMtLXRleHRcIj5cclxuICAgICAgICB7e2dldFN0YXR1c1RleHQoKX19XHJcbiAgICA8L2gxPlxyXG4gICAgPGRpdiBjbGFzcz1cInN0YXR1cy1oZWFkZXJfX3N1YmhlYWRlclwiPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0cmFja2VyTW9kZSA9PT0gVHJhY2tlck1vZGVFbnVtLlRyYWNrXCIgY2xhc3M9XCJzdGF0dXMtaGVhZGVyX19zdWJoZWFkZXJfX3RleHRcIj5cclxuICAgICAgICAgICAgPG1kLWljb24gIHN2Z0ljb249J2ljb24tcXVlc3Rpb24tdG9vbHRpcCcgaWQ9XCJzdGF0dXMtaGVhZGVyLXdoYXQtaGFwcGVucy1uZXh0LWljb25cIiBjbGFzcz1cInN0YXR1cy1oZWFkZXJfX3N1YmhlYWRlcl9fdGV4dF9fdG9vbHRpcCBob3Zlcl90b29sdGlwXCIgKGNsaWNrKT1cInRvZ2dsZUNvbnRlbnQodHJ1ZSlcIj48L21kLWljb24+XHJcbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJnZXRTdWJUZXh0KCkgIT09ICcnXCIgaWQ9XCJzdGF0dXMtaGVhZGVyLXdoYXQtaGFwcGVucy1uZXh0LWxpbmtcIiBjbGFzcz1cInN0YXR1cy1oZWFkZXJfX3N1YmhlYWRlcl9fdGV4dF9fd29yZGluZyAgbGlua1wiIChjbGljayk9XCJ0b2dnbGVDb250ZW50KHRydWUpXCI+e3tnZXRTdWJUZXh0KCl9fTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0cmFja2VyTW9kZSAhPT0gVHJhY2tlck1vZGVFbnVtLlRyYWNrXCIgY2xhc3M9XCJzdGF0dXMtaGVhZGVyX19zdWJoZWFkZXJfX3RleHRcIj5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImdldFN1YlRleHQoKSAhPT0gJydcIiBjbGFzcz1cInN0YXR1cy1oZWFkZXJfX3N1YmhlYWRlcl9fdGV4dF9fd29yZGluZ1wiPnt7Z2V0U3ViVGV4dCgpfX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YWdsLXdoYXQtaGFwcGVucy1uZXh0ICpuZ0lmPVwiaXNPcGVuXCIgKGNsaWNrQ2xvc2UpPVwidG9nZ2xlQ29udGVudChmYWxzZSlcIiBbd2hhdEhhcHBlbnNOZXh0Q29udGVudF09XCJ3aGF0SGFwcGVuc05leHRDb250ZW50XCI+PC9hZ2wtd2hhdC1oYXBwZW5zLW5leHQ+XHJcbiAgICAgICAgXHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcbiIsIjxhZ2wtc3RhdHVzLWhlYWRlcj48L2FnbC1zdGF0dXMtaGVhZGVyPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDUVk7TUFBQTtNQUFBO1FBQUE7UUFBQTtRQUFpSTtVQUFBO1VBQUE7UUFBQTtRQUFqSTtNQUFBLGdDQUErSjs7O1FBQUE7UUFBQTs7OztvQkFGbks7TUFBQTtNQUFBLDhCQUEwRjtNQUN0RjtVQUFBO2NBQUE7bUJBQUE7UUFBQTtRQUFBO1FBQWtKO1VBQUE7VUFBQTtRQUFBO1FBQWxKO01BQUEsaURBQUE7VUFBQTthQUFBO1VBQUEsMERBQTBMO1VBQUEscUJBQzFMO1VBQUEsMkRBQUE7VUFBQTtNQUFxTDs7SUFEM0s7SUFBVixXQUFVLFNBQVY7SUFDSztJQUFMLFdBQUssU0FBTDs7OztvQkFHQTtNQUFBO01BQUEsOEJBQWlGOzs7UUFBQTtRQUFBOzs7O29CQURyRjtNQUFBO01BQUEsOEJBQTBGO01BQ3RGO2FBQUE7VUFBQSx3QkFBdUc7OztRQUFsRztRQUFMLFdBQUssU0FBTDs7OztvQkFFSjtNQUFBO1FBQUE7UUFBQTtRQUFzQztVQUFBO1VBQUE7UUFBQTtRQUF0QztNQUFBO2FBQUE7VUFBQTs7SUFBMEU7SUFBMUUsV0FBMEUsU0FBMUU7Ozs7b0JBYlI7TUFBQTtNQUE0QiwyQ0FDeEI7VUFBQTtVQUFBO2FBQUE7dUJBQUEsc0NBQUE7VUFBQTtVQUFBLHVDQUFtRjtNQUNuRjtVQUFBO01BQXdDLHdEQUVuQztVQUFBLGFBQ0w7VUFBQTtVQUFBLGdCQUFzQywrQ0FDbEM7VUFBQTthQUFBO1VBQUEsd0JBR00sK0NBQ047aUJBQUE7YUFBQTtVQUFBLHdCQUVNLCtDQUNOO2lCQUFBO2FBQUE7VUFBQSx3QkFBb0o7TUFFbEosdUNBQ0o7OztRQWZPO1FBQVQsV0FBUyxTQUFUO1FBS1M7UUFBTCxZQUFLLFNBQUw7UUFJSztRQUFMLFlBQUssU0FBTDtRQUd1QjtRQUF2QixZQUF1QixTQUF2Qjs7O1FBWG9DO1FBQUE7Ozs7b0JDRjVDO01BQUE7MkNBQUEsVUFBQTtNQUFBO0lBQUE7Ozs7OyJ9
