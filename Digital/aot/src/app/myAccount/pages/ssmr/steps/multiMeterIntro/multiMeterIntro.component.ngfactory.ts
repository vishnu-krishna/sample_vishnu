/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './multiMeterIntro.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '../../../../../../../../src/app/myAccount/pages/ssmr/steps/multiMeterIntro/multiMeterIntro.component';
import * as i4 from '../../../../../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i5 from '@angular/material/core';
import * as i6 from '@angular/material/button';
import * as i7 from '@angular/cdk/platform';
import * as i8 from '@angular/cdk/a11y';
import * as i9 from '../../../../../../../../src/app/myAccount/services/contract/issmr.service';
const styles_MultiMeterIntroComponent:any[] = [i0.styles];
export const RenderType_MultiMeterIntroComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_MultiMeterIntroComponent,data:{}});
function View_MultiMeterIntroComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'img',[['class',
      'meter-info__icon'],['src','svg/icon_blue_elec_meter.svg']],(null as any),(null as any),
      (null as any),(null as any),(null as any)))],(null as any),(null as any));
}
function View_MultiMeterIntroComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'img',[['class',
      'meter-info__icon'],['src','svg/icon_blue_gas_meter.svg']],(null as any),(null as any),
      (null as any),(null as any),(null as any)))],(null as any),(null as any));
}
function View_MultiMeterIntroComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'meter-info__register']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n                    ','\n                ']))],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.getRegisterMessage((<any>_v.parent).context.$implicit);
        _ck(_v,1,0,currVal_0);
      });
}
function View_MultiMeterIntroComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),22,'div',[['class',
      'meter-info']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),10,'div',[['class','col-xs-3 col-sm-2']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                    '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
          1,(null as any),View_MultiMeterIntroComponent_2)),i1.ɵdid(16384,(null as any),
          0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_MultiMeterIntroComponent_3)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','meter-info__index']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['',''])),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),7,'div',[['class','col-xs-9 col-lg-10 meter-info__text']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                Meter no.\n                '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','meter-info__text--number']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),[' ',''])),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_MultiMeterIntroComponent_4)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n        ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = (((_co.selectedContract == null)? (null as any): _co.selectedContract.fuelType) === 'Electricity');
    _ck(_v,5,0,currVal_0);
    const currVal_1:any = (((_co.selectedContract == null)? (null as any): _co.selectedContract.fuelType) === 'Gas');
    _ck(_v,8,0,currVal_1);
    const currVal_4:any = _co.isMultiRegister(_v.context.$implicit);
    _ck(_v,20,0,currVal_4);
  },(_ck,_v) => {
    const currVal_2:any = (_v.context.index + 1);
    _ck(_v,11,0,currVal_2);
    const currVal_3:any = ((_v.context.$implicit == null)? (null as any): _v.context.$implicit.meterSerial);
    _ck(_v,17,0,currVal_3);
  });
}
export function View_MultiMeterIntroComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),34,'div',[['class',
      'multiMeterInfo']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          1,'div',[['class','header']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n        Multiple meters found\n    '])),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          5,'div',[['class','description']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        Your account has ',
          ' meters and you must enter at least one read.\n        If you skip a meter, we will use historical data to estimate your usage. \n        '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'br',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'br',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_MultiMeterIntroComponent_1)),
      i1.ɵdid(802816,(null as any),0,i2.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n     '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',[['class',
          'button__continue']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),4,'a',[['class','tempdls-button mat-raised-button'],
              ['color','accent'],['md-raised-button','']],[[1,'tabindex',0],[1,'disabled',
              0],[1,'aria-disabled',0]],[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i3.MultiMeterIntroComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,19)._haltDisabledEvents($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('click' === en)) {
              const pd_1:any = ((<any>_co.onClickMeterEntry()) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i4.View_MdAnchor_0,i4.RenderType_MdAnchor)),i1.ɵdid(16384,(null as any),
          0,i5.MdPrefixRejector,[[2,i5.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
          (null as any),(null as any)),i1.ɵdid(180224,(null as any),0,i6.MdAnchor,
          [i7.Platform,i8.FocusMonitor,i1.ElementRef,i1.Renderer2],{color:[0,'color']},
          (null as any)),i1.ɵdid(16384,(null as any),0,i6.MdRaisedButtonCssMatStyler,
          ([] as any[]),(null as any),(null as any)),(_l()(),i1.ɵted(0,['TAKE THE FIRST READ'])),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),['\n\n    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),9,'div',[['class','footer']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),6,'div',[['class',
          'footer__content']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),3,'a',[['href','https://www.agl.com.au/residential/help-and-support/how-to-read-your-meter'],
              ['target','_blank']],(null as any),(null as any),(null as any),(null as any),
              (null as any))),(_l()(),i1.ɵted((null as any),[' \n                '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'img',[['class','icon_size'],
          ['src','svg/help_icon.svg']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n               How to read your meter\n            '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n    '])),(_l()(),i1.ɵted((null as any),['\n\n']))],(_ck,_v) => {
    var _co:i3.MultiMeterIntroComponent = _v.component;
    const currVal_1:any = _co.selectedContract.ssmrModel.meters;
    _ck(_v,13,0,currVal_1);
    const currVal_5:any = 'accent';
    _ck(_v,19,0,currVal_5);
  },(_ck,_v) => {
    var _co:i3.MultiMeterIntroComponent = _v.component;
    const currVal_0:any = ((_co.selectedContract == null)? (null as any): ((_co.selectedContract.ssmrModel == null)? (null as any): ((_co.selectedContract.ssmrModel.meters == null)? (null as any): _co.selectedContract.ssmrModel.meters.length)));
    _ck(_v,6,0,currVal_0);
    const currVal_2:any = (i1.ɵnov(_v,19).disabled? (0 - 1): 0);
    const currVal_3:any = (i1.ɵnov(_v,19).disabled || (null as any));
    const currVal_4:any = i1.ɵnov(_v,19).disabled.toString();
    _ck(_v,17,0,currVal_2,currVal_3,currVal_4);
  });
}
export function View_MultiMeterIntroComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-ssmr-multi-meter-intro',
      ([] as any[]),(null as any),(null as any),(null as any),View_MultiMeterIntroComponent_0,
      RenderType_MultiMeterIntroComponent)),i1.ɵdid(114688,(null as any),0,i3.MultiMeterIntroComponent,
      [i9.ISsmrService],(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const MultiMeterIntroComponentNgFactory:i1.ComponentFactory<i3.MultiMeterIntroComponent> = i1.ɵccf('agl-ssmr-multi-meter-intro',
    i3.MultiMeterIntroComponent,View_MultiMeterIntroComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zc21yL3N0ZXBzL211bHRpTWV0ZXJJbnRyby9tdWx0aU1ldGVySW50cm8uY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvc3Ntci9zdGVwcy9tdWx0aU1ldGVySW50cm8vbXVsdGlNZXRlckludHJvLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvc3Ntci9zdGVwcy9tdWx0aU1ldGVySW50cm8vbXVsdGlNZXRlckludHJvLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9zc21yL3N0ZXBzL211bHRpTWV0ZXJJbnRyby9tdWx0aU1ldGVySW50cm8uY29tcG9uZW50LnRzLk11bHRpTWV0ZXJJbnRyb0NvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxkaXYgY2xhc3M9XCJtdWx0aU1ldGVySW5mb1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgICAgIE11bHRpcGxlIG1ldGVycyBmb3VuZFxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj5cclxuICAgICAgICBZb3VyIGFjY291bnQgaGFzIHt7c2VsZWN0ZWRDb250cmFjdD8uc3Ntck1vZGVsPy5tZXRlcnM/Lmxlbmd0aH19IG1ldGVycyBhbmQgeW91IG11c3QgZW50ZXIgYXQgbGVhc3Qgb25lIHJlYWQuXHJcbiAgICAgICAgSWYgeW91IHNraXAgYSBtZXRlciwgd2Ugd2lsbCB1c2UgaGlzdG9yaWNhbCBkYXRhIHRvIGVzdGltYXRlIHlvdXIgdXNhZ2UuIFxyXG4gICAgICAgIDxicj5cclxuICAgICAgICA8YnI+XHJcbiAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2ICBjbGFzcz1cIm1ldGVyLWluZm9cIiAqbmdGb3I9XCJsZXQgbWV0ZXIgb2Ygc2VsZWN0ZWRDb250cmFjdC5zc21yTW9kZWwubWV0ZXJzOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMyBjb2wtc20tMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJtZXRlci1pbmZvX19pY29uXCIgKm5nSWY9XCJzZWxlY3RlZENvbnRyYWN0Py5mdWVsVHlwZSA9PT0gJ0VsZWN0cmljaXR5J1wiIHNyYz1cInN2Zy9pY29uX2JsdWVfZWxlY19tZXRlci5zdmdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibWV0ZXItaW5mb19faWNvblwiICpuZ0lmPVwic2VsZWN0ZWRDb250cmFjdD8uZnVlbFR5cGUgPT09ICdHYXMnXCIgc3JjPVwic3ZnL2ljb25fYmx1ZV9nYXNfbWV0ZXIuc3ZnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtZXRlci1pbmZvX19pbmRleFwiPnt7aSsxfX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLXhzLTkgY29sLWxnLTEwIG1ldGVyLWluZm9fX3RleHRcIj5cclxuICAgICAgICAgICAgICAgIE1ldGVyIG5vLlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1ldGVyLWluZm9fX3RleHQtLW51bWJlclwiPiB7e21ldGVyPy5tZXRlclNlcmlhbH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWV0ZXItaW5mb19fcmVnaXN0ZXJcIiAqbmdJZj0gXCJpc011bHRpUmVnaXN0ZXIobWV0ZXIpXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7Z2V0UmVnaXN0ZXJNZXNzYWdlKG1ldGVyKX19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbl9fY29udGludWVcIj5cclxuICAgICAgICA8YSBtZC1yYWlzZWQtYnV0dG9uIGNvbG9yPVwiYWNjZW50XCIgY2xhc3M9XCJ0ZW1wZGxzLWJ1dHRvblwiIChjbGljayk9XCJvbkNsaWNrTWV0ZXJFbnRyeSgpXCI+VEFLRSBUSEUgRklSU1QgUkVBRDwvYT5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJmb290ZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyX19jb250ZW50XCI+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5hZ2wuY29tLmF1L3Jlc2lkZW50aWFsL2hlbHAtYW5kLXN1cHBvcnQvaG93LXRvLXJlYWQteW91ci1tZXRlclwiIHRhcmdldD1cIl9ibGFua1wiPiBcclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJpY29uX3NpemVcIiBzcmM9XCJzdmcvaGVscF9pY29uLnN2Z1wiPlxyXG4gICAgICAgICAgICAgICBIb3cgdG8gcmVhZCB5b3VyIG1ldGVyXHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuPC9kaXY+IiwiPGFnbC1zc21yLW11bHRpLW1ldGVyLWludHJvPjwvYWdsLXNzbXItbXVsdGktbWV0ZXItaW50cm8+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNZb0I7TUFBQTtNQUFBOzs7b0JBQ0E7TUFBQTtNQUFBOzs7b0JBTUo7TUFBQTtNQUFBLGdCQUFtRTs7O1FBQUE7UUFBQTs7OztvQkFUM0U7TUFBQTtNQUFnRyxtREFDNUY7VUFBQTtVQUFBLDRDQUErQjtVQUFBLDZCQUN2QjtVQUFBLHlEQUFBO1VBQUE7TUFBc0gsMkRBQ3RIO1VBQUE7YUFBQTtVQUFBLHdCQUE2RztNQUM3RztVQUFBO01BQWdDLHdDQUFjO01BQ2hELG1EQUNOO1VBQUE7VUFBQTtNQUFpRDtNQUU3QztVQUFBO01BQXNDLHlDQUE2QjtNQUNuRTthQUFBO1VBQUEsd0JBRU07TUFDSjs7SUFWZ0M7SUFBOUIsV0FBOEIsU0FBOUI7SUFDOEI7SUFBOUIsV0FBOEIsU0FBOUI7SUFNOEI7SUFBbEMsWUFBa0MsU0FBbEM7O0lBTG9DO0lBQUE7SUFJRTtJQUFBOzs7O29CQWxCdEQ7TUFBQTtNQUE0QiwyQ0FDeEI7VUFBQTtVQUFBLGdCQUFvQjtNQUVkLDJDQUNOO1VBQUE7VUFBQSw4QkFBeUI7VUFBQTtNQUdyQjtVQUFBLDBEQUFJO1VBQUEsaUJBQ0o7VUFBQTtNQUFJLDJDQUNGO01BQ0Y7YUFBQTs0QkFBQSx5Q0FhTTtVQUFBLGNBQ1Q7VUFBQTtVQUFBLGdCQUE4QiwrQ0FDM0I7VUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBMEQ7Y0FBQTtjQUFBO1lBQUE7WUFBMUQ7VUFBQSxxREFBQTtVQUFBO1VBQUEsb0NBQUE7VUFBQTtVQUFBLHNCQUFBO1VBQUEsMkNBQXdGO01BQXVCLDJDQUM3RztNQUVOO1VBQUEsMERBQW9CO1VBQUEsaUJBQ2hCO1VBQUE7VUFBQSxnQkFBNkIsbURBQ3pCO2lCQUFBO2NBQUE7Y0FBQSxnQkFBcUc7TUFDakc7VUFBQTtVQUFBLGdCQUErQztNQUUvQywrQ0FDRjtVQUFBLGFBQ0o7O0lBekJ1QjtJQUF6QixZQUF5QixTQUF6QjtJQWVvQjtJQUFwQixZQUFvQixTQUFwQjs7O0lBckJxQjtJQUFBO0lBcUJyQjtJQUFBO0lBQUE7SUFBQSxZQUFBLDZCQUFBOzs7O29CQ3pCUjtNQUFBO3lDQUFBLFVBQUE7TUFBQTtJQUFBOzs7OyJ9
