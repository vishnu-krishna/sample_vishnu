/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './usageGraphDaily.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '../../../../../../../src/app/myAccount/pages/usage/usageGraphDaily/usageGraphDaily.component';
import * as i4 from '../../../../../../../src/app/shared/service/contract/iusage.service';
import * as i5 from '../../../../../../../src/app/shared/service/contract/iusageRendering.service';
import * as i6 from '../../../../../../../src/app/shared/service/contract/imessageBus.service';
import * as i7 from '../../../../../../../src/app/shared/service/api.service';
import * as i8 from '../../../../../../../src/app/myAccount/services/account.service';
const styles_UsageGraphDailyComponent:any[] = [i0.styles];
export const RenderType_UsageGraphDailyComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_UsageGraphDailyComponent,data:{}});
function View_UsageGraphDailyComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),6,'div',[['class',
      'controls--previous']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.scrollLeft()) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),3,':svg:svg',[['height','12'],
          ['width','8']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),0,':svg:polygon',[['points','0,6 8,0 8,12'],['style','fill:#0000ff;']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n        ']))],(null as any),(null as any));
}
function View_UsageGraphDailyComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),6,'div',[['class',
      'controls--previous']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),3,':svg:svg',[['height','12'],['width','8']],(null as any),
      (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),0,':svg:polygon',
      [['points','0,6 8,0 8,12'],['style','fill: #E8E8E8;']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n        ']))],(null as any),(null as any));
}
function View_UsageGraphDailyComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),6,'div',[['class',
      'controls--next']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.scrollRight()) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),3,':svg:svg',[['height','12'],
          ['width','8']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),0,':svg:polygon',[['points','8,6 0,0 0,12'],['style','fill:#0000ff;']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n        ']))],(null as any),(null as any));
}
function View_UsageGraphDailyComponent_5(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),6,'div',[['class',
      'controls--next']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),3,':svg:svg',[['height','12'],['width','8']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),0,
          ':svg:polygon',[['points','8,6 0,0 0,12'],['style','fill: #E8E8E8;']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵted((null as any),['\n        ']))],(null as any),
      (null as any));
}
function View_UsageGraphDailyComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),13,'div',[['class',
      'controls']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_UsageGraphDailyComponent_2)),i1.ɵdid(16384,
          (null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_UsageGraphDailyComponent_3)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphDailyComponent_4)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphDailyComponent_5)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    ']))],(_ck,
      _v) => {
    var _co:any = _v.component;
    const currVal_0:boolean = !_co.isScrollLeftDisabled;
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = _co.isScrollLeftDisabled;
    _ck(_v,6,0,currVal_1);
    const currVal_2:boolean = !_co.isScrollRightDisabled;
    _ck(_v,9,0,currVal_2);
    const currVal_3:any = _co.isScrollRightDisabled;
    _ck(_v,12,0,currVal_3);
  },(null as any));
}
function View_UsageGraphDailyComponent_7(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),9,'div',[['class',
      'dateRange--tabletandsmaller']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),
      i1.ɵeld(0,(null as any),(null as any),2,'div',[['class','dateRange--dayOfWeek']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['',''])),i1.ɵppd(2),(_l()(),i1.ɵted((null as any),
          ['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          2,'div',[['class','dateRange--dayOfMonth']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['',''])),i1.ɵppd(2),(_l()(),i1.ɵted((null as any),['\n                ']))],
      (null as any),(_ck,_v) => {
        const currVal_0:any = i1.ɵunv(_v,3,0,_ck(_v,4,0,i1.ɵnov((<any>(<any>_v.parent).parent),
            0),(((<any>_v.parent).context.$implicit == null)? (null as any): (<any>_v.parent).context.$implicit.startDateTime),
            'E'));
        _ck(_v,3,0,currVal_0);
        const currVal_1:any = i1.ɵunv(_v,7,0,_ck(_v,8,0,i1.ɵnov((<any>(<any>_v.parent).parent),
            0),(((<any>_v.parent).context.$implicit == null)? (null as any): (<any>_v.parent).context.$implicit.startDateTime),
            'd'));
        _ck(_v,7,0,currVal_1);
      });
}
function View_UsageGraphDailyComponent_8(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'graph']],[[2,'gas',(null as any)],[2,'elec',(null as any)],[2,'ripple',(null as any)],
      [2,'ripple2',(null as any)],[4,'height','px']],(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n                ']))],(null as any),
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = (((_co.activeContract == null)? (null as any): _co.activeContract.fuelType) === 'Gas');
        const currVal_1:any = (((_co.activeContract == null)? (null as any): _co.activeContract.fuelType) === 'Electricity');
        const currVal_2:any = _co.isDesktop();
        const currVal_3:boolean = !_co.isDesktop();
        const currVal_4:any = _co.calculateGraphItemSize((<any>_v.parent).context.$implicit);
        _ck(_v,0,0,currVal_0,currVal_1,currVal_2,currVal_3,currVal_4);
      });
}
function View_UsageGraphDailyComponent_9(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'estimated--read']],[[4,'bottom','px']],(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n                ']))],(null as any),
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = (_co.calculateGraphItemSize((<any>_v.parent).context.$implicit) + (_co.isDesktop()? 70: 42));
        _ck(_v,0,0,currVal_0);
      });
}
function View_UsageGraphDailyComponent_10(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'graph placeholder--new ripple']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                ']))],
      (null as any),(null as any));
}
function View_UsageGraphDailyComponent_11(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),9,'div',[['class',
      'dateRange--desktop']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),
      i1.ɵeld(0,(null as any),(null as any),2,'div',[['class','dateRange--dayOfMonth']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['',''])),i1.ɵppd(2),(_l()(),i1.ɵted((null as any),
          ['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          2,'div',[['class','dateRange--dayOfWeek']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['',''])),i1.ɵppd(2),
      (_l()(),i1.ɵted((null as any),['\n                ']))],(null as any),(_ck,_v) => {
    const currVal_0:any = i1.ɵunv(_v,3,0,_ck(_v,4,0,i1.ɵnov((<any>(<any>_v.parent).parent),
        0),(((<any>_v.parent).context.$implicit == null)? (null as any): (<any>_v.parent).context.$implicit.startDateTime),
        'd'));
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = i1.ɵunv(_v,7,0,_ck(_v,8,0,i1.ɵnov((<any>(<any>_v.parent).parent),
        0),(((<any>_v.parent).context.$implicit == null)? (null as any): (<any>_v.parent).context.$implicit.startDateTime),
        'E'));
    _ck(_v,7,0,currVal_1);
  });
}
function View_UsageGraphDailyComponent_12(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',[['class',
      'newMonthMarker']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','newMonthMarker--icon']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                    '])),(_l()(),i1.ɵted((null as any),['\n                ']))],
      (null as any),(null as any));
}
function View_UsageGraphDailyComponent_6(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),27,'div',[['class',
      'item']],[[2,'selected',(null as any)]],[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.graphItemSelected(_v.context.$implicit)) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphDailyComponent_7)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphDailyComponent_8)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphDailyComponent_9)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphDailyComponent_10)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                \n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphDailyComponent_11)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n\n                '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),6,'div',[['class','chevron']],
          [[8,'hidden',0]],(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),3,':svg:svg',[['height','9'],['width','18']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                        '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),0,':svg:polygon',[['points','0,9 9,0 18,9'],
              ['style','fill:#0000ff;']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵted((null as any),
          ['\n\n                '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
          1,(null as any),View_UsageGraphDailyComponent_12)),i1.ɵdid(16384,(null as any),
          0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n\n            ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_1:boolean = !_co.isDesktop();
    _ck(_v,3,0,currVal_1);
    const currVal_2:boolean = !((_v.context.$implicit == null)? (null as any): _v.context.$implicit.isEndOfDataRangePlaceholder);
    _ck(_v,6,0,currVal_2);
    const currVal_3:any = ((_v.context.$implicit == null)? (null as any): _v.context.$implicit.estimatedRead);
    _ck(_v,9,0,currVal_3);
    const currVal_4:any = ((_v.context.$implicit == null)? (null as any): _v.context.$implicit.isEndOfDataRangePlaceholder);
    _ck(_v,12,0,currVal_4);
    const currVal_5:any = _co.isDesktop();
    _ck(_v,15,0,currVal_5);
    const currVal_7:any = _v.context.$implicit.isFirstOfNewMonth;
    _ck(_v,26,0,currVal_7);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = (_v.context.$implicit === _co.selectedGraphItem);
    _ck(_v,0,0,currVal_0);
    const currVal_6:any = (_v.context.$implicit !== _co.selectedGraphItem);
    _ck(_v,17,0,currVal_6);
  });
}
export function View_UsageGraphDailyComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[i1.ɵpid(0,i2.DatePipe,[i1.LOCALE_ID]),i1.ɵqud(402653184,1,{chartViewPortItems:0}),
      i1.ɵqud(402653184,2,{chartViewPort:0}),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          2,'div',[['class','selected-day']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n    ','\n'])),
      i1.ɵppd(2),(_l()(),i1.ɵted((null as any),['\n\n'])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),43,'div',[['class','usage-graph']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n\n    '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),
          View_UsageGraphDailyComponent_1)),i1.ɵdid(16384,(null as any),0,i2.NgIf,
          [i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),
          i1.ɵted((null as any),['\n\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          25,'div',[['class','yaxis']],[[2,'isGraphLoading',(null as any)]],(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        \n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          13,'div',[['class','labelgroup']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','labelgroup__label']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['$',''])),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','labelgroup__label']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['$',''])),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','labelgroup__label']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['$',''])),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','labelgroup__label']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['$0'])),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵted((null as any),['\n\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),7,'div',[['class','gridlines']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',
          [['class','gridlines__line']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',[['class','gridlines__line']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),0,'div',[['class','gridlines__line']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵted((null as any),['\n\n    '])),(_l()(),i1.ɵted((null as any),
          ['\n\n    '])),(_l()(),i1.ɵeld(0,[[2,0],['chartViewPort',1]],(null as any),
          10,'div',[['class','viewport'],['id','viewport']],[[2,'isGraphLoading',(null as any)]],
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n\n        '])),(_l()(),i1.ɵeld(0,[[1,0],['chartViewPortItems',1]],(null as any),
          7,'div',[['class','items'],['id','usage-graph-daily']],[[4,'margin-left',
              'px'],[4,'width','px'],[2,'isPanning',(null as any)]],[[(null as any),
              'style.width.pxChange'],[(null as any),'panleft'],[(null as any),'panright'],
              [(null as any),'panend']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i3.UsageGraphDailyComponent = _v.component;
            if (('style.width.pxChange' === en)) {
              const pd_0:any = ((<any>(_co.chartViewPortItemsWidth = $event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('panleft' === en)) {
              const pd_1:any = ((<any>_co.pan($event)) !== false);
              ad = (pd_1 && ad);
            }
            if (('panright' === en)) {
              const pd_2:any = ((<any>_co.pan($event)) !== false);
              ad = (pd_2 && ad);
            }
            if (('panend' === en)) {
              const pd_3:any = ((<any>_co.panEnd($event)) !== false);
              ad = (pd_3 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n\n            '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphDailyComponent_6)),
      i1.ɵdid(802816,(null as any),0,i2.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',
          [['class','gunSight']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),
          i1.ɵted((null as any),['\n\n        '])),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵted((null as any),['\n\n']))],(_ck,_v) => {
    var _co:i3.UsageGraphDailyComponent = _v.component;
    const currVal_1:any = _co.isDesktop();
    _ck(_v,10,0,currVal_1);
    const currVal_10:any = ((_co.chartData == null)? (null as any): _co.chartData.graphItems);
    _ck(_v,44,0,currVal_10);
  },(_ck,_v) => {
    var _co:i3.UsageGraphDailyComponent = _v.component;
    const currVal_0:any = i1.ɵunv(_v,4,0,_ck(_v,5,0,i1.ɵnov(_v,0),((_co.selectedGraphItem == null)? (null as any): _co.selectedGraphItem.startDateTime),
        'EEEE, d MMMM y'));
    _ck(_v,4,0,currVal_0);
    const currVal_2:any = _co.isGraphLoading;
    _ck(_v,12,0,currVal_2);
    const currVal_3:any = _co.yAxisLabels[2];
    _ck(_v,17,0,currVal_3);
    const currVal_4:any = _co.yAxisLabels[1];
    _ck(_v,20,0,currVal_4);
    const currVal_5:any = _co.yAxisLabels[0];
    _ck(_v,23,0,currVal_5);
    const currVal_6:any = _co.isGraphLoading;
    _ck(_v,39,0,currVal_6);
    const currVal_7:any = _co.graphScrollOffset;
    const currVal_8:any = _co.chartViewPortItemsWidth;
    const currVal_9:any = _co.isPanning;
    _ck(_v,41,0,currVal_7,currVal_8,currVal_9);
  });
}
export function View_UsageGraphDailyComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-usage-graph-daily',
      ([] as any[]),(null as any),[['window','resize']],(_v,en,$event) => {
        var ad:boolean = true;
        if (('window:resize' === en)) {
          const pd_0:any = ((<any>i1.ɵnov(_v,1).onResize($event)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },View_UsageGraphDailyComponent_0,RenderType_UsageGraphDailyComponent)),i1.ɵdid(4440064,
      (null as any),0,i3.UsageGraphDailyComponent,[i4.IUsageService,i5.IUsageRenderingService,
          i6.IMessageBusService,i7.ApiService,i8.IAccountServiceMA],(null as any),
      (null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const UsageGraphDailyComponentNgFactory:i1.ComponentFactory<i3.UsageGraphDailyComponent> = i1.ɵccf('agl-usage-graph-daily',
    i3.UsageGraphDailyComponent,View_UsageGraphDailyComponent_Host_0,{ContractAccount:'ContractAccount'},
    {itemSelected:'itemSelected'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy91c2FnZS91c2FnZUdyYXBoRGFpbHkvdXNhZ2VHcmFwaERhaWx5LmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L3BhZ2VzL3VzYWdlL3VzYWdlR3JhcGhEYWlseS91c2FnZUdyYXBoRGFpbHkuY29tcG9uZW50LnRzIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy91c2FnZS91c2FnZUdyYXBoRGFpbHkvdXNhZ2VHcmFwaERhaWx5LmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy91c2FnZS91c2FnZUdyYXBoRGFpbHkvdXNhZ2VHcmFwaERhaWx5LmNvbXBvbmVudC50cy5Vc2FnZUdyYXBoRGFpbHlDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGNsYXNzPVwic2VsZWN0ZWQtZGF5XCI+XHJcbiAgICB7e3NlbGVjdGVkR3JhcGhJdGVtPy5zdGFydERhdGVUaW1lIHwgZGF0ZTonRUVFRSwgZCBNTU1NIHknfX1cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwidXNhZ2UtZ3JhcGhcIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHNcIiAqbmdJZj1cImlzRGVza3RvcCgpXCIgPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9scy0tcHJldmlvdXNcIiAqbmdJZj1cIiFpc1Njcm9sbExlZnREaXNhYmxlZFwiIChjbGljayk9XCJzY3JvbGxMZWZ0KClcIj5cclxuICAgICAgICAgICAgPHN2ZyBoZWlnaHQ9XCIxMlwiIHdpZHRoPVwiOFwiPlxyXG4gICAgICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPVwiMCw2IDgsMCA4LDEyXCIgc3R5bGU9XCJmaWxsOiMwMDAwZmY7XCIvPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHMtLXByZXZpb3VzXCIgKm5nSWY9XCJpc1Njcm9sbExlZnREaXNhYmxlZFwiID5cclxuICAgICAgICAgICAgPHN2ZyBoZWlnaHQ9XCIxMlwiIHdpZHRoPVwiOFwiPlxyXG4gICAgICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPVwiMCw2IDgsMCA4LDEyXCIgc3R5bGU9XCJmaWxsOiAjRThFOEU4O1wiLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzLS1uZXh0XCIgKm5nSWY9XCIhaXNTY3JvbGxSaWdodERpc2FibGVkXCIgKGNsaWNrKT1cInNjcm9sbFJpZ2h0KClcIj5cclxuICAgICAgICAgICAgPHN2ZyBoZWlnaHQ9XCIxMlwiIHdpZHRoPVwiOFwiPlxyXG4gICAgICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPVwiOCw2IDAsMCAwLDEyXCIgc3R5bGU9XCJmaWxsOiMwMDAwZmY7XCIvPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHMtLW5leHRcIiAqbmdJZj1cImlzU2Nyb2xsUmlnaHREaXNhYmxlZFwiID5cclxuICAgICAgICAgICAgPHN2ZyBoZWlnaHQ9XCIxMlwiIHdpZHRoPVwiOFwiPlxyXG4gICAgICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPVwiOCw2IDAsMCAwLDEyXCIgc3R5bGU9XCJmaWxsOiAjRThFOEU4O1wiLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwieWF4aXNcIiBbY2xhc3MuaXNHcmFwaExvYWRpbmddPVwiaXNHcmFwaExvYWRpbmdcIiA+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsZ3JvdXBfX2xhYmVsXCI+JHt7eUF4aXNMYWJlbHNbMl19fTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxncm91cF9fbGFiZWxcIj4ke3t5QXhpc0xhYmVsc1sxXX19PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbGdyb3VwX19sYWJlbFwiPiR7e3lBeGlzTGFiZWxzWzBdfX08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsZ3JvdXBfX2xhYmVsXCI+JDA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImdyaWRsaW5lc1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZGxpbmVzX19saW5lXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkbGluZXNfX2xpbmVcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWRsaW5lc19fbGluZVwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJ2aWV3cG9ydFwiIFxyXG4gICAgICAgICNjaGFydFZpZXdQb3J0IFxyXG4gICAgICAgIFtjbGFzcy5pc0dyYXBoTG9hZGluZ109XCJpc0dyYXBoTG9hZGluZ1wiIFxyXG4gICAgICAgIGlkPVwidmlld3BvcnRcIiA+XHJcblxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgICAgaWQ9XCJ1c2FnZS1ncmFwaC1kYWlseVwiIFxyXG4gICAgICAgICAgICBjbGFzcz1cIml0ZW1zXCIgXHJcbiAgICAgICAgICAgICNjaGFydFZpZXdQb3J0SXRlbXMgXHJcbiAgICAgICAgICAgIFtzdHlsZS5tYXJnaW4tbGVmdC5weF09XCJncmFwaFNjcm9sbE9mZnNldFwiIFxyXG4gICAgICAgICAgICBbKHN0eWxlLndpZHRoLnB4KV09XCJjaGFydFZpZXdQb3J0SXRlbXNXaWR0aFwiXHJcbiAgICAgICAgICAgIChwYW5sZWZ0KT1cInBhbigkZXZlbnQpXCIgKHBhbnJpZ2h0KT1cInBhbigkZXZlbnQpXCIgKHBhbmVuZCk9XCJwYW5FbmQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIFtjbGFzcy5pc1Bhbm5pbmddPVwiaXNQYW5uaW5nXCJcclxuICAgICAgICAgICAgPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIiBcclxuICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCB1c2FnZUdyYXBoSXRlbSBvZiBjaGFydERhdGE/LmdyYXBoSXRlbXM7IGxldCBpID0gaW5kZXg7XCJcclxuICAgICAgICAgICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJ1c2FnZUdyYXBoSXRlbSA9PT0gc2VsZWN0ZWRHcmFwaEl0ZW1cIiBcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJncmFwaEl0ZW1TZWxlY3RlZCh1c2FnZUdyYXBoSXRlbSlcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZVJhbmdlLS10YWJsZXRhbmRzbWFsbGVyXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCIhaXNEZXNrdG9wKClcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVSYW5nZS0tZGF5T2ZXZWVrXCI+e3t1c2FnZUdyYXBoSXRlbT8uc3RhcnREYXRlVGltZSB8IGRhdGU6J0UnfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZVJhbmdlLS1kYXlPZk1vbnRoXCI+e3t1c2FnZUdyYXBoSXRlbT8uc3RhcnREYXRlVGltZSB8IGRhdGU6J2QnfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFwaFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiIXVzYWdlR3JhcGhJdGVtPy5pc0VuZE9mRGF0YVJhbmdlUGxhY2Vob2xkZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5nYXNdPVwiYWN0aXZlQ29udHJhY3Q/LmZ1ZWxUeXBlPT09J0dhcydcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5lbGVjXT1cImFjdGl2ZUNvbnRyYWN0Py5mdWVsVHlwZT09PSdFbGVjdHJpY2l0eSdcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5yaXBwbGVdPVwiaXNEZXNrdG9wKClcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5yaXBwbGUyXT1cIiFpc0Rlc2t0b3AoKVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiY2FsY3VsYXRlR3JhcGhJdGVtU2l6ZSh1c2FnZUdyYXBoSXRlbSlcIlxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJlc3RpbWF0ZWQtLXJlYWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwidXNhZ2VHcmFwaEl0ZW0/LmVzdGltYXRlZFJlYWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtzdHlsZS5ib3R0b20ucHhdPVwiY2FsY3VsYXRlR3JhcGhJdGVtU2l6ZSh1c2FnZUdyYXBoSXRlbSkgKyAoaXNEZXNrdG9wKCkgPyA3MCA6IDQyKVwiPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoIHBsYWNlaG9sZGVyLS1uZXcgcmlwcGxlXCJcclxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInVzYWdlR3JhcGhJdGVtPy5pc0VuZE9mRGF0YVJhbmdlUGxhY2Vob2xkZXJcIiA+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVSYW5nZS0tZGVza3RvcFwiIFxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiaXNEZXNrdG9wKClcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVSYW5nZS0tZGF5T2ZNb250aFwiPnt7dXNhZ2VHcmFwaEl0ZW0/LnN0YXJ0RGF0ZVRpbWUgfCBkYXRlOidkJ319PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVSYW5nZS0tZGF5T2ZXZWVrXCI+e3t1c2FnZUdyYXBoSXRlbT8uc3RhcnREYXRlVGltZSB8IGRhdGU6J0UnfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGV2cm9uXCIgW2hpZGRlbl09XCJ1c2FnZUdyYXBoSXRlbSAhPT0gc2VsZWN0ZWRHcmFwaEl0ZW1cIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBoZWlnaHQ9XCI5XCIgd2lkdGg9XCIxOFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XCIwLDkgOSwwIDE4LDlcIiBzdHlsZT1cImZpbGw6IzAwMDBmZjtcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBcclxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInVzYWdlR3JhcGhJdGVtLmlzRmlyc3RPZk5ld01vbnRoXCJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm5ld01vbnRoTWFya2VyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5ld01vbnRoTWFya2VyLS1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImd1blNpZ2h0XCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuPC9kaXY+IiwiPGFnbC11c2FnZS1ncmFwaC1kYWlseT48L2FnbC11c2FnZS1ncmFwaC1kYWlseT4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDT1E7TUFBQTtJQUFBO0lBQUE7SUFBOEQ7TUFBQTtNQUFBO0lBQUE7SUFBOUQ7RUFBQSxnQ0FBcUY7TUFDakY7VUFBQTtNQUEyQix1REFDdkI7VUFBQTtVQUFBO01BQXNELG1EQUNwRDtVQUFBOzs7b0JBRVY7TUFBQTtNQUFBLGdCQUE4RCxtREFDMUQ7TUFBQTtNQUFBLDBEQUEyQjtNQUFBLHlCQUN2QjtNQUFBO01BQUEsNENBQXVEO01BQ3JEOzs7b0JBRVY7TUFBQTtJQUFBO0lBQUE7SUFBMkQ7TUFBQTtNQUFBO0lBQUE7SUFBM0Q7RUFBQSxnQ0FBbUY7TUFDL0U7VUFBQTtNQUEyQix1REFDdkI7VUFBQTtVQUFBO01BQXNELG1EQUNwRDtVQUFBOzs7b0JBRVY7TUFBQTtNQUEyRCxtREFDdkQ7VUFBQTtVQUFBLDBEQUEyQjtVQUFBLHlCQUN2QjtVQUFBO1VBQUEsMERBQXVEO1VBQUEscUJBQ3JEOzs7O29CQW5CZDtNQUFBO01BQTJDLCtDQUN2QztVQUFBLHVFQUFBO1VBQUE7VUFBQSxlQUlNLCtDQUNOO1VBQUE7YUFBQTtVQUFBLHdCQUlNLCtDQUNOO2lCQUFBO2FBQUE7VUFBQSx3QkFJTSwrQ0FDTjtpQkFBQTthQUFBO1VBQUEsd0JBSU07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