/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './featureIntroDetail.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../maui/button/button.component.ngfactory';
import * as i3 from '../../../../../../src/app/myAccount/maui/button/button.component';
import * as i4 from '@angular/common';
import * as i5 from '../../../../../../src/app/myAccount/featureIntro/featureIntroDetail/featureIntroDetail.component';
import * as i6 from '@angular/router';
const styles_FeatureIntroDetailComponent:any[] = [i0.styles];
export const RenderType_FeatureIntroDetailComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_FeatureIntroDetailComponent,data:{}});
function View_FeatureIntroDetailComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',[['class',
      'cta-spacer']],(null as any),(null as any),(null as any),(null as any),(null as any)))],
      (null as any),(null as any));
}
function View_FeatureIntroDetailComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),8,'div',[['class',
      'feature-intro-cta']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),2,'agl-maui-button',[['class','feature-intro-positive-cta']],
      (null as any),[[(null as any),'clicked']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('clicked' === en)) {
          const pd_0:any = ((<any>_co.ctaPositiveAction()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i2.View_ButtonComponent_0,i2.RenderType_ButtonComponent)),i1.ɵdid(49152,(null as any),
      0,i3.ButtonComponent,([] as any[]),(null as any),{clicked:'clicked'}),(_l()(),
      i1.ɵted(0,['',''])),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),1,'div',[['class','feature-intro-negative-cta']],
      (null as any),[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.ctaNegativeAction()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['',''])),(_l()(),
      i1.ɵted((null as any),['\n    ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.featureIntro.content.positiveCtaText;
    _ck(_v,4,0,currVal_0);
    const currVal_1:any = _co.featureIntro.content.negativeCtaText;
    _ck(_v,7,0,currVal_1);
  });
}
export function View_FeatureIntroDetailComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),6,'div',[['class',
      'intro-image']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          3,'div',[['class','image-wrapper']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'img',([] as any[]),[[8,'src',
          4]],(null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          [' \n    '])),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵted((null as any),
          ['\n'])),(_l()(),i1.ɵeld(0,(null as any),(null as any),13,'div',[['class',
          'intro-copy']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_FeatureIntroDetailComponent_1)),i1.ɵdid(16384,
          (null as any),0,i4.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','intro-heading']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        ','\n    '])),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),1,'p',([] as any[]),(null as any),
              (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        ','\n    '])),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_FeatureIntroDetailComponent_2)),
      i1.ɵdid(16384,(null as any),0,i4.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:i5.FeatureIntroDetailComponent = _v.component;
    const currVal_1:any = _co.featureIntro.content.showCta;
    _ck(_v,11,0,currVal_1);
    const currVal_4:any = _co.featureIntro.content.showCta;
    _ck(_v,20,0,currVal_4);
  },(_ck,_v) => {
    var _co:i5.FeatureIntroDetailComponent = _v.component;
    const currVal_0:any = _co.featureIntro.content.image;
    _ck(_v,4,0,currVal_0);
    const currVal_2:any = _co.featureIntro.content.heading;
    _ck(_v,14,0,currVal_2);
    const currVal_3:any = _co.featureIntro.content.description;
    _ck(_v,17,0,currVal_3);
  });
}
export function View_FeatureIntroDetailComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-feature-intro',
      ([] as any[]),[[2,'viewed',(null as any)]],(null as any),(null as any),View_FeatureIntroDetailComponent_0,
      RenderType_FeatureIntroDetailComponent)),i1.ɵdid(49152,(null as any),0,i5.FeatureIntroDetailComponent,
      [i6.Router],(null as any),(null as any))],(null as any),(_ck,_v) => {
    const currVal_0:any = i1.ɵnov(_v,1).hasViewed;
    _ck(_v,0,0,currVal_0);
  });
}
export const FeatureIntroDetailComponentNgFactory:i1.ComponentFactory<i5.FeatureIntroDetailComponent> = i1.ɵccf('agl-feature-intro',
    i5.FeatureIntroDetailComponent,View_FeatureIntroDetailComponent_Host_0,{featureIntro:'featureIntro'},
    {dismissFeatureIntro:'dismissFeatureIntro'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9mZWF0dXJlSW50cm8vZmVhdHVyZUludHJvRGV0YWlsL2ZlYXR1cmVJbnRyb0RldGFpbC5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9mZWF0dXJlSW50cm8vZmVhdHVyZUludHJvRGV0YWlsL2ZlYXR1cmVJbnRyb0RldGFpbC5jb21wb25lbnQudHMiLCJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L2ZlYXR1cmVJbnRyby9mZWF0dXJlSW50cm9EZXRhaWwvZmVhdHVyZUludHJvRGV0YWlsLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9mZWF0dXJlSW50cm8vZmVhdHVyZUludHJvRGV0YWlsL2ZlYXR1cmVJbnRyb0RldGFpbC5jb21wb25lbnQudHMuRmVhdHVyZUludHJvRGV0YWlsQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPGRpdiBjbGFzcz1cImludHJvLWltYWdlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaW1hZ2Utd3JhcHBlclwiPlxyXG4gICAgICAgIDxpbWcgW3NyY109XCJmZWF0dXJlSW50cm8uY29udGVudC5pbWFnZVwiIC8+IFxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwiaW50cm8tY29weVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImN0YS1zcGFjZXJcIiAqbmdJZj1cImZlYXR1cmVJbnRyby5jb250ZW50LnNob3dDdGFcIj48L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJpbnRyby1oZWFkaW5nXCI+XHJcbiAgICAgICAge3sgZmVhdHVyZUludHJvLmNvbnRlbnQuaGVhZGluZyB9fVxyXG4gICAgPC9kaXY+XHJcbiAgICA8cD5cclxuICAgICAgICB7eyBmZWF0dXJlSW50cm8uY29udGVudC5kZXNjcmlwdGlvbiB9fVxyXG4gICAgPC9wPlxyXG4gICAgPGRpdiBjbGFzcz1cImZlYXR1cmUtaW50cm8tY3RhXCIgKm5nSWY9XCJmZWF0dXJlSW50cm8uY29udGVudC5zaG93Q3RhXCI+XHJcbiAgICAgICAgPGFnbC1tYXVpLWJ1dHRvbiAoY2xpY2tlZCk9XCJjdGFQb3NpdGl2ZUFjdGlvbigpXCIgY2xhc3M9XCJmZWF0dXJlLWludHJvLXBvc2l0aXZlLWN0YVwiPnt7IGZlYXR1cmVJbnRyby5jb250ZW50LnBvc2l0aXZlQ3RhVGV4dCB9fTwvYWdsLW1hdWktYnV0dG9uPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmZWF0dXJlLWludHJvLW5lZ2F0aXZlLWN0YVwiIChjbGljayk9XCJjdGFOZWdhdGl2ZUFjdGlvbigpXCI+e3sgZmVhdHVyZUludHJvLmNvbnRlbnQubmVnYXRpdmVDdGFUZXh0IH19PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+IiwiPGFnbC1mZWF0dXJlLWludHJvPjwvYWdsLWZlYXR1cmUtaW50cm8+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNNSTtNQUFBOzs7O29CQU9BO01BQUE7TUFBQSxnQkFBb0UsK0NBQ2hFO01BQUE7TUFBQTtRQUFBO1FBQUE7UUFBaUI7VUFBQTtVQUFBO1FBQUE7UUFBakI7TUFBQSxtRUFBQTtNQUFBLHNFQUFvRjthQUFBLGFBQTRELCtDQUNoSjtNQUFBO01BQUE7UUFBQTtRQUFBO1FBQXdDO1VBQUE7VUFBQTtRQUFBO1FBQXhDO01BQUEsZ0NBQXNFLHdDQUFnRDthQUFBOztJQURsQztJQUFBO0lBQ2Q7SUFBQTs7OztvQkFmOUU7TUFBQTtNQUF5QiwyQ0FDckI7VUFBQTtVQUFBLDhCQUEyQjtNQUN2QjtVQUFBLDhEQUEwQztVQUFBLGNBQ3hDLHVDQUNKO1VBQUEsU0FDTjtVQUFBO01BQXdCLDJDQUNwQjtVQUFBLDBFQUFBO1VBQUE7VUFBQSxlQUFtRSwyQ0FDbkU7VUFBQTtVQUFBLDBEQUEyQjtVQUFBLDBCQUVyQiwyQ0FDTjtpQkFBQTtjQUFBLDBEQUFHO1VBQUEsMEJBRUMsMkNBQ0o7aUJBQUE7YUFBQTtVQUFBLHdCQUdNOztJQVZrQjtJQUF4QixZQUF3QixTQUF4QjtJQU8rQjtJQUEvQixZQUErQixTQUEvQjs7O0lBWFM7SUFBTCxXQUFLLFNBQUw7SUFLdUI7SUFBQTtJQUd4QjtJQUFBOzs7O29CQ1ZQO01BQUE7NENBQUEsVUFBQTtNQUFBO0lBQUE7SUFBQSxXQUFBLFNBQUE7Ozs7OyJ9