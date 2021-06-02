/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './tooltip.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../../src/app/myAccount/maui/tooltip/tooltip.component';
import * as i3 from '@angular/common';
const styles_TooltipComponent:any[] = [i0.styles];
export const RenderType_TooltipComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_TooltipComponent,data:{}});
export function View_TooltipComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[i1.ɵqud(402653184,1,{tooltip:0}),i1.ɵqud(402653184,2,{tooltipTrigger:0}),
      (_l()(),i1.ɵeld(0,[[2,0],['tooltipTrigger',1]],(null as any),15,'div',([] as any[]),
          (null as any),[[(null as any),'mouseover'],[(null as any),'touchstart']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.TooltipComponent = _v.component;
            if (('mouseover' === en)) {
              const pd_0:any = ((<any>_co.loadTooltip(i1.ɵnov(_v,6),i1.ɵnov(_v,2))) !== false);
              ad = (pd_0 && ad);
            }
            if (('touchstart' === en)) {
              const pd_1:any = ((<any>_co.loadTooltip(i1.ɵnov(_v,6),i1.ɵnov(_v,2))) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),
      i1.ɵncd((null as any),0),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
          i1.ɵeld(0,[[1,0],['tooltip',1]],(null as any),10,'div',([] as any[]),(null as any),
              (null as any),(null as any),(null as any),(null as any))),i1.ɵdid(278528,
          (null as any),0,i3.NgClass,[i1.IterableDiffers,i1.KeyValueDiffers,i1.ElementRef,
              i1.Renderer],{klass:[0,'klass'],ngClass:[1,'ngClass']},(null as any)),
      i1.ɵpod({'tooltip--right-align':0,'tooltip--left-align':1,'tooltip--shown':2}),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'div',[['class','tooltip__text']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                ','\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),2,'div',
          [['class','tooltip__arrow']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),i1.ɵdid(278528,(null as any),0,i3.NgClass,[i1.IterableDiffers,
          i1.KeyValueDiffers,i1.ElementRef,i1.Renderer],{klass:[0,'klass'],ngClass:[1,
          'ngClass']},(null as any)),i1.ɵpod({'tooltip__arrow--right-align':0,'tooltip__arrow--left-align':1}),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),['\n']))],
      (_ck,_v) => {
        var _co:i2.TooltipComponent = _v.component;
        const currVal_0:any = i1.ɵinlineInterpolate(1,'tooltip tooltip--',_co.positionClass,
            '');
        const currVal_1:any = _ck(_v,8,0,_co.rightAlign,_co.leftAlign,_co.showTooltip);
        _ck(_v,7,0,currVal_0,currVal_1);
        const currVal_3:any = 'tooltip__arrow';
        const currVal_4:any = _ck(_v,15,0,_co.rightAlign,_co.leftAlign);
        _ck(_v,14,0,currVal_3,currVal_4);
      },(_ck,_v) => {
        var _co:i2.TooltipComponent = _v.component;
        const currVal_2:any = _co.tooltipBody;
        _ck(_v,11,0,currVal_2);
      });
}
export function View_TooltipComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-maui-tooltip',
      ([] as any[]),(null as any),[[(null as any),'focusout'],[(null as any),'mouseleave'],
          [(null as any),'touchend']],(_v,en,$event) => {
        var ad:boolean = true;
        if (('focusout' === en)) {
          const pd_0:any = ((<any>i1.ɵnov(_v,1).turnOffTooltip()) !== false);
          ad = (pd_0 && ad);
        }
        if (('mouseleave' === en)) {
          const pd_1:any = ((<any>i1.ɵnov(_v,1).turnOffTooltip()) !== false);
          ad = (pd_1 && ad);
        }
        if (('touchend' === en)) {
          const pd_2:any = ((<any>i1.ɵnov(_v,1).mobileLiftDelay()) !== false);
          ad = (pd_2 && ad);
        }
        return ad;
      },View_TooltipComponent_0,RenderType_TooltipComponent)),i1.ɵdid(114688,(null as any),
      0,i2.TooltipComponent,([] as any[]),(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const TooltipComponentNgFactory:i1.ComponentFactory<i2.TooltipComponent> = i1.ɵccf('agl-maui-tooltip',
    i2.TooltipComponent,View_TooltipComponent_Host_0,{tooltipBody:'tooltipBody',position:'position'},
    {},['*']);
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9tYXVpL3Rvb2x0aXAvdG9vbHRpcC5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9tYXVpL3Rvb2x0aXAvdG9vbHRpcC5jb21wb25lbnQudHMiLCJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L21hdWkvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9tYXVpL3Rvb2x0aXAvdG9vbHRpcC5jb21wb25lbnQudHMuVG9vbHRpcENvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxkaXYgI3Rvb2x0aXBUcmlnZ2VyIChtb3VzZW92ZXIpPVwibG9hZFRvb2x0aXAodG9vbHRpcCwgdG9vbHRpcFRyaWdnZXIpXCIgKHRvdWNoc3RhcnQpPVwibG9hZFRvb2x0aXAodG9vbHRpcCwgdG9vbHRpcFRyaWdnZXIpXCI+XHJcbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICA8ZGl2ICN0b29sdGlwXHJcbiAgICAgICAgY2xhc3M9XCJ0b29sdGlwIHRvb2x0aXAtLXt7cG9zaXRpb25DbGFzc319XCJcclxuICAgICAgICBbbmdDbGFzc109XCJ7XHJcbiAgICAgICAgICAgICd0b29sdGlwLS1yaWdodC1hbGlnbic6IHJpZ2h0QWxpZ24sXHJcbiAgICAgICAgICAgICd0b29sdGlwLS1sZWZ0LWFsaWduJzogbGVmdEFsaWduLFxyXG4gICAgICAgICAgICAndG9vbHRpcC0tc2hvd24nOiBzaG93VG9vbHRpcFxyXG4gICAgICAgIH1cIlxyXG4gICAgPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcF9fdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAge3t0b29sdGlwQm9keX19XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbHRpcF9fYXJyb3dcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie1xyXG4gICAgICAgICAgICAgICAgICAgICd0b29sdGlwX19hcnJvdy0tcmlnaHQtYWxpZ24nOiByaWdodEFsaWduLFxyXG4gICAgICAgICAgICAgICAgICAgICd0b29sdGlwX19hcnJvdy0tbGVmdC1hbGlnbic6IGxlZnRBbGlnblxyXG4gICAgICAgICAgICAgICAgfVwiXHJcbiAgICAgICAgICAgID48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj4iLCI8YWdsLW1hdWktdG9vbHRpcD48L2FnbC1tYXVpLXRvb2x0aXA+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7TUNBQTtVQUFBO1VBQUE7WUFBQTtZQUFBO1lBQXFCO2NBQUE7Y0FBQTtZQUFBO1lBQW1EO2NBQUE7Y0FBQTtZQUFBO1lBQXhFO1VBQUEsZ0NBQTRIO2FBQ3hILGtCQUF5QiwyQ0FDekI7aUJBQUE7Y0FBQSxpRUFBQTtVQUFBO3lCQUFBO2FBRUk7TUFLSCxtREFDTztVQUFBO1VBQUEsNENBQTJCO1VBQUEsMENBRXJCO1VBQUEscUJBQ047VUFBQTtVQUFBLHVCQUFBO3NEQUFBO1VBQUEsa0NBQ0k7TUFJRywyQ0FDVDs7O1FBaEJGO1lBQUE7UUFDQTtRQUZKLFdBQ0ksVUFDQSxTQUZKO1FBV2E7UUFDRDtRQURKLFlBQUssVUFDRCxTQURKOzs7UUFIMkI7UUFBQTs7OztvQkNWdkM7TUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO1VBQUE7VUFBQTtRQUFBO1FBQUE7VUFBQTtVQUFBO1FBQUE7UUFBQTtNQUFBLCtEQUFBO01BQUE7SUFBQTs7Ozs7In0=
