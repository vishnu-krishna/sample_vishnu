/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './horizontal-scroller.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '../../../../../../../src/app/myAccount/rewards/components/horizontal-scroller/horizontal-scroller.component';
const styles_HorizontalScrollerComponent:any[] = [i0.styles];
export const RenderType_HorizontalScrollerComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_HorizontalScrollerComponent,data:{}});
function View_HorizontalScrollerComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',[['class',
      'horizontal-scroller__indicator']],[[2,'active',(null as any)]],[[(null as any),
      'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.setActiveIndicator(_v.context.$implicit)) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any)))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = (_v.context.$implicit == _co.activeIndicator);
    _ck(_v,0,0,currVal_0);
  });
}
function View_HorizontalScrollerComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',[['class',
      'scroll-item-btn scroll-prev-item-btn']],(null as any),[[(null as any),'click']],
      (_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.showPreviousItem()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any)))],(null as any),(null as any));
}
function View_HorizontalScrollerComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',[['class',
      'scroll-item-btn scroll-next-item-btn']],(null as any),[[(null as any),'click']],
      (_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.showNextItem()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any)))],(null as any),(null as any));
}
function View_HorizontalScrollerComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),10,'div',[['class',
      'horizontal-scroller__indicators']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
      i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_HorizontalScrollerComponent_2)),
      i1.ɵdid(802816,(null as any),0,i2.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n\n    '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),
          View_HorizontalScrollerComponent_3)),i1.ɵdid(16384,(null as any),0,i2.NgIf,
          [i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),
          i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_HorizontalScrollerComponent_4)),i1.ɵdid(16384,
          (null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.indicators;
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = (_co.showNavButtons && (_co.activeIndicator != 0));
    _ck(_v,6,0,currVal_1);
    const currVal_2:any = (_co.showNavButtons && (_co.activeIndicator != (_co.indicatorCount - 1)));
    _ck(_v,9,0,currVal_2);
  },(null as any));
}
export function View_HorizontalScrollerComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[i1.ɵqud(402653184,1,{scrollerElement:0}),i1.ɵqud(402653184,2,{spacerLeftElement:0}),
      i1.ɵqud(402653184,3,{spacerRightElement:0}),i1.ɵqud(402653184,4,{scrollerItemsElement:0}),
      (_l()(),i1.ɵeld(0,[[1,0],['scroller',1]],(null as any),13,'div',[['class','horizontal-scroller__content']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          10,'div',[['class','horizontal-scroller__content-container']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵeld(0,[[2,0],['spacerLeft',1]],(null as any),
          0,'div',[['class','horizontal-scroller-spacer__left']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵeld(0,[[4,0],['scrollerItems',1]],(null as any),
          3,'div',[['class','horizontal-scroller__content-items']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),i1.ɵncd((null as any),0),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵeld(0,[[3,0],['spacerRight',1]],(null as any),0,'div',[['class','horizontal-scroller-spacer__right']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),['\n'])),
      (_l()(),i1.ɵted((null as any),['\n\n'])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_HorizontalScrollerComponent_1)),i1.ɵdid(16384,
          (null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any))],(_ck,_v) => {
    var _co:i3.HorizontalScrollerComponent = _v.component;
    const currVal_0:any = ((_co.indicatorCount > 0) && _co.isScrollable);
    _ck(_v,20,0,currVal_0);
  },(null as any));
}
export function View_HorizontalScrollerComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-horizontal-scroller',
      ([] as any[]),[[2,'mobile-only',(null as any)]],(null as any),(null as any),
      View_HorizontalScrollerComponent_0,RenderType_HorizontalScrollerComponent)),
      i1.ɵdid(4898816,(null as any),0,i3.HorizontalScrollerComponent,([] as any[]),
          (null as any),(null as any))],(null as any),(_ck,_v) => {
    const currVal_0:any = i1.ɵnov(_v,1).mobileOnly;
    _ck(_v,0,0,currVal_0);
  });
}
export const HorizontalScrollerComponentNgFactory:i1.ComponentFactory<i3.HorizontalScrollerComponent> = i1.ɵccf('agl-horizontal-scroller',
    i3.HorizontalScrollerComponent,View_HorizontalScrollerComponent_Host_0,{indicatorCount:'indicatorCount',
        scrollDuration:'scrollDuration',showNavButtons:'showNavButtons',mobileOnly:'mobileOnly'},
    {indicatorChanged:'indicatorChanged'},['*']);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9yZXdhcmRzL2NvbXBvbmVudHMvaG9yaXpvbnRhbC1zY3JvbGxlci9ob3Jpem9udGFsLXNjcm9sbGVyLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L3Jld2FyZHMvY29tcG9uZW50cy9ob3Jpem9udGFsLXNjcm9sbGVyL2hvcml6b250YWwtc2Nyb2xsZXIuY29tcG9uZW50LnRzIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9yZXdhcmRzL2NvbXBvbmVudHMvaG9yaXpvbnRhbC1zY3JvbGxlci9ob3Jpem9udGFsLXNjcm9sbGVyLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9yZXdhcmRzL2NvbXBvbmVudHMvaG9yaXpvbnRhbC1zY3JvbGxlci9ob3Jpem9udGFsLXNjcm9sbGVyLmNvbXBvbmVudC50cy5Ib3Jpem9udGFsU2Nyb2xsZXJDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGNsYXNzPVwiaG9yaXpvbnRhbC1zY3JvbGxlcl9fY29udGVudFwiICNzY3JvbGxlcj5cclxuICAgIDxkaXYgY2xhc3M9XCJob3Jpem9udGFsLXNjcm9sbGVyX19jb250ZW50LWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJob3Jpem9udGFsLXNjcm9sbGVyLXNwYWNlcl9fbGVmdFwiICNzcGFjZXJMZWZ0PjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJob3Jpem9udGFsLXNjcm9sbGVyX19jb250ZW50LWl0ZW1zXCIgI3Njcm9sbGVySXRlbXM+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaG9yaXpvbnRhbC1zY3JvbGxlci1zcGFjZXJfX3JpZ2h0XCIgI3NwYWNlclJpZ2h0PjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiBjbGFzcz1cImhvcml6b250YWwtc2Nyb2xsZXJfX2luZGljYXRvcnNcIiAqbmdJZj1cImluZGljYXRvckNvdW50ID4gMCAmJiBpc1Njcm9sbGFibGVcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJob3Jpem9udGFsLXNjcm9sbGVyX19pbmRpY2F0b3JcIiAqbmdGb3I9XCJsZXQgaW5kaWNhdG9yIG9mIGluZGljYXRvcnNcIiBbY2xhc3MuYWN0aXZlXT1cImluZGljYXRvciA9PSBhY3RpdmVJbmRpY2F0b3JcIiAoY2xpY2spPVwic2V0QWN0aXZlSW5kaWNhdG9yKGluZGljYXRvcilcIj48L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwic2Nyb2xsLWl0ZW0tYnRuIHNjcm9sbC1wcmV2LWl0ZW0tYnRuXCIgKGNsaWNrKT1cInNob3dQcmV2aW91c0l0ZW0oKVwiICpuZ0lmPVwic2hvd05hdkJ1dHRvbnMgJiYgYWN0aXZlSW5kaWNhdG9yICE9IDBcIj48L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJzY3JvbGwtaXRlbS1idG4gc2Nyb2xsLW5leHQtaXRlbS1idG5cIiAoY2xpY2spPVwic2hvd05leHRJdGVtKClcIiAqbmdJZj1cInNob3dOYXZCdXR0b25zICYmIGFjdGl2ZUluZGljYXRvciAhPSBpbmRpY2F0b3JDb3VudC0xXCI+PC9kaXY+XHJcbjwvZGl2PiIsIjxhZ2wtaG9yaXpvbnRhbC1zY3JvbGxlcj48L2FnbC1ob3Jpem9udGFsLXNjcm9sbGVyPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDV0k7TUFBQTtNQUFBO0lBQUE7SUFBQTtJQUErSDtNQUFBO01BQUE7SUFBQTtJQUEvSDtFQUFBOztJQUFpRjtJQUFqRixXQUFpRixTQUFqRjs7OztvQkFFQTtNQUFBO01BQUE7UUFBQTtRQUFBO1FBQWtEO1VBQUE7VUFBQTtRQUFBO1FBQWxEO01BQUE7OztvQkFDQTtNQUFBO01BQUE7UUFBQTtRQUFBO1FBQWtEO1VBQUE7VUFBQTtRQUFBO1FBQWxEO01BQUE7OztvQkFKSjtNQUFBO01BQUEsOEJBQXdGLDJDQUNwRjthQUFBO2FBQUE7NEJBQUEseUNBQTZLO1VBQUEsZUFFN0s7VUFBQSw0Q0FBQTtVQUFBLHNFQUFvSTtpQkFBQSw0QkFDcEk7VUFBQSwwRUFBQTtVQUFBO1VBQUEsZUFBK0k7O0lBSG5HO0lBQTVDLFdBQTRDLFNBQTVDO0lBRStFO0lBQS9FLFdBQStFLFNBQS9FO0lBQzJFO0lBQTNFLFdBQTJFLFNBQTNFOzs7Ozs7TUFkSjtVQUFBO01BQW9ELDJDQUNoRDtVQUFBO1VBQUEsMERBQW9EO1VBQUEsaUJBQ2hEO1VBQUE7VUFBQSw0Q0FBZ0U7VUFBQSxpQkFDaEU7VUFBQTtVQUFBLDRDQUErRDtVQUFBLDRCQUMzRCxrQkFBeUI7VUFBQSxpQkFDdkIsK0NBQ047aUJBQUE7Y0FBQTtNQUFrRSwyQ0FDaEU7TUFDSix5Q0FFTjtVQUFBLDBFQUFBO1VBQUE7VUFBQTs7SUFBNkM7SUFBN0MsWUFBNkMsU0FBN0M7Ozs7b0JDVkE7TUFBQTsrRUFBQTthQUFBO1VBQUE7SUFBQTtJQUFBLFdBQUEsU0FBQTs7Ozs7OyJ9