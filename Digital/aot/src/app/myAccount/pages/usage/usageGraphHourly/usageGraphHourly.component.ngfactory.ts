/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './usageGraphHourly.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '../../../../../../../src/app/myAccount/pages/usage/usageGraphHourly/usageGraphHourly.component';
import * as i4 from '../../../../../../../src/app/shared/service/contract/iusage.service';
import * as i5 from '../../../../../../../src/app/shared/service/contract/iusageRendering.service';
import * as i6 from '../../../../../../../src/app/shared/service/contract/imessageBus.service';
import * as i7 from '../../../../../../../src/app/shared/service/api.service';
import * as i8 from '../../../../../../../src/app/myAccount/services/account.service';
const styles_UsageGraphHourlyComponent:any[] = [i0.styles];
export const RenderType_UsageGraphHourlyComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_UsageGraphHourlyComponent,data:{}});
function View_UsageGraphHourlyComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',[['class',
      'usage-unavailable']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n        Sorry '])),(_l()(),
      i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','firstName']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['',''])),(_l()(),i1.ɵted((null as any),[', we can only show you hourly usage for up to 14 days.\n        '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'br',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),0,'br',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        Rest assured, we receive automated hourly reads from your very clever smart meter.\n    ']))],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.name.firstName;
        _ck(_v,3,0,currVal_0);
      });
}
function View_UsageGraphHourlyComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),9,'div',[['class',
      'usage-unavailable']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n        Sorry '])),(_l()(),
      i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','firstName']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['',''])),(_l()(),i1.ɵted((null as any),[', we can only show you up to three months of daily usage.\n        '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'br',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),0,'br',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        Don\'t panic, if you ever need this information you can always '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'br',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          [' contact us.\n    ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.name.firstName;
    _ck(_v,3,0,currVal_0);
  });
}
function View_UsageGraphHourlyComponent_5(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),9,'div',[['class',
      'dateRange']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                        '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),2,'div',[['class','dateRange--dayOfMonth']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['',''])),i1.ɵppd(2),(_l()(),i1.ɵted((null as any),
          ['\n                        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          2,'div',[['class','dateRange--dayOfWeek']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['',''])),i1.ɵppd(2),
      (_l()(),i1.ɵted((null as any),['\n                    ']))],(null as any),(_ck,
      _v) => {
    const currVal_0:any = i1.ɵunv(_v,3,0,_ck(_v,4,0,i1.ɵnov((<any>(<any>(<any>_v.parent).parent).parent),
        0),(((<any>_v.parent).context.$implicit == null)? (null as any): (<any>_v.parent).context.$implicit.startDateTime),
        'd'));
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = i1.ɵunv(_v,7,0,_ck(_v,8,0,i1.ɵnov((<any>(<any>(<any>_v.parent).parent).parent),
        0),(((<any>_v.parent).context.$implicit == null)? (null as any): (<any>_v.parent).context.$implicit.startDateTime),
        'E'));
    _ck(_v,7,0,currVal_1);
  });
}
function View_UsageGraphHourlyComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',[['class',
      'item']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.graphItemSelected(_v.context.$implicit)) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','graph']],[[4,
          'height','px'],[2,'secondary',(null as any)],[2,'estimatedRead',(null as any)]],
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n\n                    '])),(_l()(),i1.ɵted((null as any),['\n                    \n                    '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphHourlyComponent_5)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_3:any = _co.isDesktop();
        _ck(_v,6,0,currVal_3);
      },(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.calculateGraphItemSize(_v.context.$implicit);
        const currVal_1:any = (((_v.context.index > 5) && (_v.context.index < 12)) || (_v.context.index > 17));
        const currVal_2:any = ((_v.context.$implicit == null)? (null as any): ((_v.context.$implicit.usageDatum == null)? (null as any): _v.context.$implicit.usageDatum.estimatedRead));
        _ck(_v,2,0,currVal_0,currVal_1,currVal_2);
      });
}
function View_UsageGraphHourlyComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),109,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      1,'div',[['class','insight']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n            ','\n        '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),57,'div',[['class','times-of-day']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),12,'div',
          [['class','time-quadrant']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),3,'div',[['class','icon-container']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),0,'img',[['src','svg/usage_night-icon.svg']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),4,
          'div',[['class','time-quadrant__cost']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','time-of-day_dollar-sign']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['$ '])),(_l()(),i1.ɵted((null as any),['','\n                '])),
      (_l()(),i1.ɵted((null as any),['\n                Night\n            '])),(_l()(),
          i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),12,'div',[['class','time-quadrant secondary']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),3,
          'div',[['class','icon-container']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['       \n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'img',[['src','svg/usage_morning-icon.svg']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),4,
          'div',[['class','time-quadrant__cost']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','time-of-day_dollar-sign']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['$ '])),(_l()(),i1.ɵted((null as any),['','\n                '])),
      (_l()(),i1.ɵted((null as any),['\n                Morning\n            '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),12,'div',[['class','time-quadrant']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),3,
          'div',[['class','icon-container']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'img',[['src','svg/usage_noon-icon.svg']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),4,
          'div',[['class','time-quadrant__cost']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','time-of-day_dollar-sign']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['$ '])),(_l()(),i1.ɵted((null as any),['','\n                '])),
      (_l()(),i1.ɵted((null as any),['\n                Afternoon\n            '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),12,'div',[['class','time-quadrant secondary']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),3,
          'div',[['class','icon-container']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'img',[['src','svg/usage_evening-icon.svg']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),4,
          'div',[['class','time-quadrant__cost']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','time-of-day_dollar-sign']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['$ '])),(_l()(),i1.ɵted((null as any),['','\n                '])),
      (_l()(),i1.ɵted((null as any),['\n                Evening\n            '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),17,'div',
          [['class','yaxis']],[[2,'isGraphLoading',(null as any)]],(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            \n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',[['class','labelgroup']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'div',[['class','labelgroup__label']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['$',''])),(_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','labelgroup__label']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['$',''])),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),5,'div',[['class','gridlines']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),0,
          'div',[['class','gridlines__line']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',[['class','gridlines__line']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n\n        '])),(_l()(),i1.ɵted((null as any),['\n\n        '])),(_l()(),
          i1.ɵeld(0,[[2,0],['chartViewPort',1]],(null as any),7,'div',[['class','viewport'],
              ['id','viewport']],[[2,'isGraphLoading',(null as any)]],(null as any),
              (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n\n            '])),(_l()(),i1.ɵeld(0,[[1,0],['chartViewPortItems',1]],
          (null as any),4,'div',[['class','items']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphHourlyComponent_4)),
      i1.ɵdid(802816,(null as any),0,i2.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          16,'div',[['class','xaxis']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','label']],(null as any),
              (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['12am'])),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','label']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['6am'])),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','label']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['12pm'])),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','label']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['6pm'])),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','label']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['12am'])),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n    ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_9:any = ((_co.chartData == null)? (null as any): _co.chartData.graphItems);
    _ck(_v,88,0,currVal_9);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = ((_co.maxTimeOfDay == null)? (null as any): _co.maxTimeOfDay.message);
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = _co.timeOfDayUsage['night'];
    _ck(_v,18,0,currVal_1);
    const currVal_2:any = _co.timeOfDayUsage['morning'];
    _ck(_v,32,0,currVal_2);
    const currVal_3:any = _co.timeOfDayUsage['noon'];
    _ck(_v,46,0,currVal_3);
    const currVal_4:any = _co.timeOfDayUsage['evening'];
    _ck(_v,60,0,currVal_4);
    const currVal_5:any = _co.isGraphLoading;
    _ck(_v,64,0,currVal_5);
    const currVal_6:any = _co.yAxisLabels[1];
    _ck(_v,69,0,currVal_6);
    const currVal_7:any = _co.yAxisLabels[0];
    _ck(_v,72,0,currVal_7);
    const currVal_8:any = _co.isGraphLoading;
    _ck(_v,83,0,currVal_8);
  });
}
export function View_UsageGraphHourlyComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[i1.ɵpid(0,i2.DatePipe,[i1.LOCALE_ID]),i1.ɵqud(671088640,1,{chartViewPortItems:0}),
      i1.ɵqud(671088640,2,{chartViewPort:0}),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          10,'div',[['class','usage-graph']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphHourlyComponent_1)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphHourlyComponent_2)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_UsageGraphHourlyComponent_3)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:i3.UsageGraphHourlyComponent = _v.component;
    const currVal_0:any = _co.isNoHourly;
    _ck(_v,6,0,currVal_0);
    const currVal_1:any = _co.isNoDaily;
    _ck(_v,9,0,currVal_1);
    const currVal_2:any = _co.showHourlyGraph;
    _ck(_v,12,0,currVal_2);
  },(null as any));
}
export function View_UsageGraphHourlyComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-usage-graph-hourly',
      ([] as any[]),(null as any),(null as any),(null as any),View_UsageGraphHourlyComponent_0,
      RenderType_UsageGraphHourlyComponent)),i1.ɵdid(770048,(null as any),0,i3.UsageGraphHourlyComponent,
      [i4.IUsageService,i5.IUsageRenderingService,i6.IMessageBusService,i7.ApiService,
          i8.IAccountServiceMA],(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const UsageGraphHourlyComponentNgFactory:i1.ComponentFactory<i3.UsageGraphHourlyComponent> = i1.ɵccf('agl-usage-graph-hourly',
    i3.UsageGraphHourlyComponent,View_UsageGraphHourlyComponent_Host_0,{ContractAccount:'ContractAccount'},
    {},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy91c2FnZS91c2FnZUdyYXBoSG91cmx5L3VzYWdlR3JhcGhIb3VybHkuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvdXNhZ2UvdXNhZ2VHcmFwaEhvdXJseS91c2FnZUdyYXBoSG91cmx5LmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvdXNhZ2UvdXNhZ2VHcmFwaEhvdXJseS91c2FnZUdyYXBoSG91cmx5LmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy91c2FnZS91c2FnZUdyYXBoSG91cmx5L3VzYWdlR3JhcGhIb3VybHkuY29tcG9uZW50LnRzLlVzYWdlR3JhcGhIb3VybHlDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGNsYXNzPVwidXNhZ2UtZ3JhcGhcIj5cclxuICAgIDxkaXYgXHJcbiAgICAgICAgY2xhc3M9XCJ1c2FnZS11bmF2YWlsYWJsZVwiXHJcbiAgICAgICAgKm5nSWY9XCJpc05vSG91cmx5XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgU29ycnkgPHNwYW4gY2xhc3M9XCJmaXJzdE5hbWVcIj57e25hbWUuZmlyc3ROYW1lfX08L3NwYW4+LCB3ZSBjYW4gb25seSBzaG93IHlvdSBob3VybHkgdXNhZ2UgZm9yIHVwIHRvIDE0IGRheXMuXHJcbiAgICAgICAgPGJyPjxicj5cclxuICAgICAgICBSZXN0IGFzc3VyZWQsIHdlIHJlY2VpdmUgYXV0b21hdGVkIGhvdXJseSByZWFkcyBmcm9tIHlvdXIgdmVyeSBjbGV2ZXIgc21hcnQgbWV0ZXIuXHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgXHJcbiAgICAgICAgY2xhc3M9XCJ1c2FnZS11bmF2YWlsYWJsZVwiXHJcbiAgICAgICAgKm5nSWY9XCJpc05vRGFpbHlcIlxyXG4gICAgICAgID5cclxuICAgICAgICBTb3JyeSA8c3BhbiBjbGFzcz1cImZpcnN0TmFtZVwiPnt7bmFtZS5maXJzdE5hbWV9fTwvc3Bhbj4sIHdlIGNhbiBvbmx5IHNob3cgeW91IHVwIHRvIHRocmVlIG1vbnRocyBvZiBkYWlseSB1c2FnZS5cclxuICAgICAgICA8YnI+PGJyPlxyXG4gICAgICAgIERvbid0IHBhbmljLCBpZiB5b3UgZXZlciBuZWVkIHRoaXMgaW5mb3JtYXRpb24geW91IGNhbiBhbHdheXMgPGJyPiBjb250YWN0IHVzLlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2ICpuZ0lmPVwic2hvd0hvdXJseUdyYXBoXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImluc2lnaHRcIj5cclxuICAgICAgICAgICAge3ttYXhUaW1lT2ZEYXk/Lm1lc3NhZ2V9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lcy1vZi1kYXlcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtcXVhZHJhbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwic3ZnL3VzYWdlX25pZ2h0LWljb24uc3ZnXCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXF1YWRyYW50X19jb3N0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aW1lLW9mLWRheV9kb2xsYXItc2lnblwiPiQgPC9zcGFuPnt7dGltZU9mRGF5VXNhZ2VbJ25pZ2h0J119fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBOaWdodFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpbWUtcXVhZHJhbnQgc2Vjb25kYXJ5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbi1jb250YWluZXJcIj4gICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJzdmcvdXNhZ2VfbW9ybmluZy1pY29uLnN2Z1wiPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1xdWFkcmFudF9fY29zdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGltZS1vZi1kYXlfZG9sbGFyLXNpZ25cIj4kIDwvc3Bhbj57e3RpbWVPZkRheVVzYWdlWydtb3JuaW5nJ119fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBNb3JuaW5nXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1xdWFkcmFudFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJzdmcvdXNhZ2Vfbm9vbi1pY29uLnN2Z1wiPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1xdWFkcmFudF9fY29zdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGltZS1vZi1kYXlfZG9sbGFyLXNpZ25cIj4kIDwvc3Bhbj57e3RpbWVPZkRheVVzYWdlWydub29uJ119fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBBZnRlcm5vb25cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lLXF1YWRyYW50IHNlY29uZGFyeVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJzdmcvdXNhZ2VfZXZlbmluZy1pY29uLnN2Z1wiPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGltZS1xdWFkcmFudF9fY29zdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGltZS1vZi1kYXlfZG9sbGFyLXNpZ25cIj4kIDwvc3Bhbj57e3RpbWVPZkRheVVzYWdlWydldmVuaW5nJ119fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBFdmVuaW5nXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwieWF4aXNcIiBbY2xhc3MuaXNHcmFwaExvYWRpbmddPVwiaXNHcmFwaExvYWRpbmdcIiA+XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGFiZWxncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsZ3JvdXBfX2xhYmVsXCI+JHt7eUF4aXNMYWJlbHNbMV19fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsZ3JvdXBfX2xhYmVsXCI+JHt7eUF4aXNMYWJlbHNbMF19fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkbGluZXNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkbGluZXNfX2xpbmVcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkbGluZXNfX2xpbmVcIj48L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidmlld3BvcnRcIiBcclxuICAgICAgICAgICAgI2NoYXJ0Vmlld1BvcnQgXHJcbiAgICAgICAgICAgIFtjbGFzcy5pc0dyYXBoTG9hZGluZ109XCJpc0dyYXBoTG9hZGluZ1wiIFxyXG4gICAgICAgICAgICBpZD1cInZpZXdwb3J0XCIgPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1zXCIgXHJcbiAgICAgICAgICAgICAgICAjY2hhcnRWaWV3UG9ydEl0ZW1zIFxyXG4gICAgICAgICAgICAgICAgPlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHVzYWdlR3JhcGhJdGVtIG9mIGNoYXJ0RGF0YT8uZ3JhcGhJdGVtczsgbGV0IGkgPSBpbmRleDtcIlxyXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJncmFwaEl0ZW1TZWxlY3RlZCh1c2FnZUdyYXBoSXRlbSlcIlxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYXBoXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiY2FsY3VsYXRlR3JhcGhJdGVtU2l6ZSh1c2FnZUdyYXBoSXRlbSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3Muc2Vjb25kYXJ5XT1cIihpPjUmJmk8MTIpfHxpPjE3XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzLmVzdGltYXRlZFJlYWRdPVwidXNhZ2VHcmFwaEl0ZW0/LnVzYWdlRGF0dW0/LmVzdGltYXRlZFJlYWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlUmFuZ2VcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJpc0Rlc2t0b3AoKVwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGVSYW5nZS0tZGF5T2ZNb250aFwiPnt7dXNhZ2VHcmFwaEl0ZW0/LnN0YXJ0RGF0ZVRpbWUgfCBkYXRlOidkJ319PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlUmFuZ2UtLWRheU9mV2Vla1wiPnt7dXNhZ2VHcmFwaEl0ZW0/LnN0YXJ0RGF0ZVRpbWUgfCBkYXRlOidFJ319PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInhheGlzXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPjEyYW08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+NmFtPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPjEycG08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxhYmVsXCI+NnBtPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYWJlbFwiPjEyYW08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuIiwiPGFnbC11c2FnZS1ncmFwaC1ob3VybHk+PC9hZ2wtdXNhZ2UtZ3JhcGgtaG91cmx5PiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNDSTtNQUFBO01BQUEsZ0JBR0sscURBQ0s7YUFBQTtVQUFBLDBE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
