/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './solarCheckStatus.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '../../../../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i4 from '@angular/material/core';
import * as i5 from '@angular/material/button';
import * as i6 from '@angular/cdk/platform';
import * as i7 from '@angular/cdk/a11y';
import * as i8 from '../../../../../../../src/app/myAccount/dashboard/solarCheck/solarCheckStatus/solarCheckStatus.component';
import * as i9 from '../../../../../../../src/app/myAccount/services/contract/isolarCheck.service';
import * as i10 from '../../../../../../../src/app/shared/service/config.service';
import * as i11 from '../../../../../../../src/app/myAccount/services/survey.service';
import * as i12 from '../../../../../../../src/app/shared/service/contract/imessageBus.service';
const styles_SolarCheckStatusComponent:any[] = [i0.styles];
export const RenderType_SolarCheckStatusComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_SolarCheckStatusComponent,data:{}});
function View_SolarCheckStatusComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),3,'div',[['class',
      'main-image']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),0,'img',[['status-icon','']],[[8,'src',4],[8,
              'alt',0]],(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = i1.ɵinlineInterpolate(1,'',_co.model.statusImage.src,'');
    const currVal_1:any = i1.ɵinlineInterpolate(1,'',_co.model.statusImage.altText,
        '');
    _ck(_v,2,0,currVal_0,currVal_1);
  });
}
function View_SolarCheckStatusComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'message-header message-block ']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['','']))],(null as any),
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.model.heading;
        _ck(_v,1,0,currVal_0);
      });
}
function View_SolarCheckStatusComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'message-details message-block']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                        ',
      '\n                    ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.model.details;
    _ck(_v,1,0,currVal_0);
  });
}
function View_SolarCheckStatusComponent_6(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),[' using your last ',' days of data.']))],(null as any),
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.model.daysOfData;
        _ck(_v,1,0,currVal_0);
      });
}
function View_SolarCheckStatusComponent_5(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',[['class',
      'message-details']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n                        Updated ',
      '\n                        '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
      1,(null as any),View_SolarCheckStatusComponent_6)),i1.ɵdid(16384,(null as any),
      0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n                    ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_1:any = _co.model.daysOfData;
    _ck(_v,3,0,currVal_1);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.model.latestDataDate;
    _ck(_v,1,0,currVal_0);
  });
}
function View_SolarCheckStatusComponent_7(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',[['class',
      'vertical-center']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),
      i1.ɵeld(0,(null as any),(null as any),1,'a',[['class','link-text'],['target',
          '_blank']],[[8,'href',4]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.promptSurvey()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['',''])),(_l()(),
      i1.ɵted((null as any),['\n                ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.model.link;
    _ck(_v,2,0,currVal_0);
    const currVal_1:any = _co.model.linkName;
    _ck(_v,3,0,currVal_1);
  });
}
function View_SolarCheckStatusComponent_8(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'a',[['class',
      'dls-button-override mat-raised-button'],['color','primary'],['md-raised-button',
      ''],['target','_blank']],[[8,'href',4],[1,'tabindex',0],[1,'disabled',0],[1,
      'aria-disabled',0]],[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>i1.ɵnov(_v,2)._haltDisabledEvents($event)) !== false);
      ad = (pd_0 && ad);
    }
    if (('click' === en)) {
      const pd_1:any = ((<any>_co.promptSurvey()) !== false);
      ad = (pd_1 && ad);
    }
    return ad;
  },i3.View_MdAnchor_0,i3.RenderType_MdAnchor)),i1.ɵdid(16384,(null as any),0,i4.MdPrefixRejector,
      [[2,i4.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],(null as any),(null as any)),
      i1.ɵdid(180224,(null as any),0,i5.MdAnchor,[i6.Platform,i7.FocusMonitor,i1.ElementRef,
          i1.Renderer2],{color:[0,'color']},(null as any)),i1.ɵdid(16384,(null as any),
          0,i5.MdRaisedButtonCssMatStyler,([] as any[]),(null as any),(null as any)),
      (_l()(),i1.ɵted(0,['\n                    ','\n                ']))],(_ck,_v) => {
    const currVal_4:any = 'primary';
    _ck(_v,2,0,currVal_4);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.model.link;
    const currVal_1:any = (i1.ɵnov(_v,2).disabled? (0 - 1): 0);
    const currVal_2:any = (i1.ɵnov(_v,2).disabled || (null as any));
    const currVal_3:any = i1.ɵnov(_v,2).disabled.toString();
    _ck(_v,0,0,currVal_0,currVal_1,currVal_2,currVal_3);
    const currVal_5:any = _co.model.linkName;
    _ck(_v,4,0,currVal_5);
  });
}
function View_SolarCheckStatusComponent_9(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                        '])),(_l()(),i1.ɵeld(0,(null as any),
      (null as any),1,'a',[['class','mob-link-text'],['target','_blank']],[[8,'href',
          4]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.promptSurvey()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['',''])),(_l()(),
      i1.ɵted((null as any),['\n                    ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.model.link;
    _ck(_v,2,0,currVal_0);
    const currVal_1:any = _co.model.linkName;
    _ck(_v,3,0,currVal_1);
  });
}
function View_SolarCheckStatusComponent_10(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'a',[['class',
      'dls-button-override mat-raised-button'],['color','primary'],['md-raised-button',
      ''],['target','_blank']],[[8,'href',4],[1,'tabindex',0],[1,'disabled',0],[1,
      'aria-disabled',0]],[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>i1.ɵnov(_v,2)._haltDisabledEvents($event)) !== false);
      ad = (pd_0 && ad);
    }
    if (('click' === en)) {
      const pd_1:any = ((<any>_co.promptSurvey()) !== false);
      ad = (pd_1 && ad);
    }
    return ad;
  },i3.View_MdAnchor_0,i3.RenderType_MdAnchor)),i1.ɵdid(16384,(null as any),0,i4.MdPrefixRejector,
      [[2,i4.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],(null as any),(null as any)),
      i1.ɵdid(180224,(null as any),0,i5.MdAnchor,[i6.Platform,i7.FocusMonitor,i1.ElementRef,
          i1.Renderer2],{color:[0,'color']},(null as any)),i1.ɵdid(16384,(null as any),
          0,i5.MdRaisedButtonCssMatStyler,([] as any[]),(null as any),(null as any)),
      (_l()(),i1.ɵted(0,['\n                        ','\n                    ']))],
      (_ck,_v) => {
        const currVal_4:any = 'primary';
        _ck(_v,2,0,currVal_4);
      },(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.model.link;
        const currVal_1:any = (i1.ɵnov(_v,2).disabled? (0 - 1): 0);
        const currVal_2:any = (i1.ɵnov(_v,2).disabled || (null as any));
        const currVal_3:any = i1.ɵnov(_v,2).disabled.toString();
        _ck(_v,0,0,currVal_0,currVal_1,currVal_2,currVal_3);
        const currVal_5:any = _co.model.linkName;
        _ck(_v,4,0,currVal_5);
      });
}
function View_SolarCheckStatusComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),71,'div',[['class',
      'col-md-12 solar-check-status']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),42,'div',[['class','upper-panel']],(null as any),
      (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),39,'div',([] as any[]),
      [[2,'status-checkSystem',(null as any)]],(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),6,'div',[['class','col icon hidden-xs']],[[2,'icon-check-response',
          (null as any)]],(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),3,'div',[['class','main-image']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          0,'img',([] as any[]),[[8,'src',4],[8,'alt',0]],(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',
          [['class','col status hidden-xs']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_SolarCheckStatusComponent_2)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),13,'div',[['class','col message']],[[2,'good',(null as any)]],
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),10,
          'div',[['class','message-pos']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_SolarCheckStatusComponent_3)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_SolarCheckStatusComponent_4)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_SolarCheckStatusComponent_5)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',
          [['class','col more-link hidden-xs']],[[2,'more-button',(null as any)]],
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
          1,(null as any),View_SolarCheckStatusComponent_7)),i1.ɵdid(16384,(null as any),
          0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_SolarCheckStatusComponent_8)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n    '])),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),24,'div',[['class','visible-xs solar-command-check-row lower-panel']],
          [[2,'status-checkSystem',(null as any)]],(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),6,'div',[['class','left-side col-xs-3']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),3,'div',
          [['class','mobile-status vertical-center']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),0,
          'img',[['status-icon','']],[[8,'src',4],[8,'alt',0]],(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),13,'div',
          [['class','col-xs-9 mobile-link']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),10,'div',[['class','mobile-more-detail-link']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),7,'div',[['class','vertical-center']],[[2,'more-button',(null as any)]],
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                    '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
          1,(null as any),View_SolarCheckStatusComponent_9)),i1.ɵdid(16384,(null as any),
          0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_SolarCheckStatusComponent_10)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_4:any = _co.model.statusImage;
    _ck(_v,17,0,currVal_4);
    const currVal_6:any = _co.model.heading;
    _ck(_v,25,0,currVal_6);
    const currVal_7:any = _co.model.details;
    _ck(_v,28,0,currVal_7);
    const currVal_8:any = _co.model.latestDataDate;
    _ck(_v,31,0,currVal_8);
    const currVal_10:any = _co.model.isShowLearnMoreLink;
    _ck(_v,38,0,currVal_10);
    const currVal_11:boolean = !_co.model.isShowLearnMoreLink;
    _ck(_v,41,0,currVal_11);
    const currVal_16:any = _co.model.isShowLearnMoreLink;
    _ck(_v,63,0,currVal_16);
    const currVal_17:boolean = !_co.model.isShowLearnMoreLink;
    _ck(_v,66,0,currVal_17);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.model.isCheckSystem;
    _ck(_v,4,0,currVal_0);
    const currVal_1:any = _co.model.isCheckSystem;
    _ck(_v,6,0,currVal_1);
    const currVal_2:any = i1.ɵinlineInterpolate(1,'',_co.model.solarImage.src,'');
    const currVal_3:any = i1.ɵinlineInterpolate(1,'',_co.model.solarImage.altText,
        '');
    _ck(_v,10,0,currVal_2,currVal_3);
    const currVal_5:any = _co.model.isGoodStatus;
    _ck(_v,20,0,currVal_5);
    const currVal_9:boolean = !_co.model.isShowLearnMoreLink;
    _ck(_v,35,0,currVal_9);
    const currVal_12:any = _co.model.isCheckSystem;
    _ck(_v,46,0,currVal_12);
    const currVal_13:any = i1.ɵinlineInterpolate(1,'',_co.model.statusImage.src,'');
    const currVal_14:any = i1.ɵinlineInterpolate(1,'',_co.model.statusImage.altText,
        '');
    _ck(_v,52,0,currVal_13,currVal_14);
    const currVal_15:boolean = !_co.model.isShowLearnMoreLink;
    _ck(_v,60,0,currVal_15);
  });
}
export function View_SolarCheckStatusComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),
      View_SolarCheckStatusComponent_1)),i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,
      i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),
      ['\n']))],(_ck,_v) => {
    var _co:i8.SolarCheckStatusComponent = _v.component;
    const currVal_0:any = (_co.model && _co.model.statusImage);
    _ck(_v,1,0,currVal_0);
  },(null as any));
}
export function View_SolarCheckStatusComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-solar-check-status',
      ([] as any[]),(null as any),(null as any),(null as any),View_SolarCheckStatusComponent_0,
      RenderType_SolarCheckStatusComponent)),i1.ɵdid(114688,(null as any),0,i8.SolarCheckStatusComponent,
      [i9.ISolarCheckService,i10.ConfigService,i11.SurveyService,i12.IMessageBusService],
      (null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const SolarCheckStatusComponentNgFactory:i1.ComponentFactory<i8.SolarCheckStatusComponent> = i1.ɵccf('agl-solar-check-status',
    i8.SolarCheckStatusComponent,View_SolarCheckStatusComponent_Host_0,{accounts:'accounts'},
    {},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9kYXNoYm9hcmQvc29sYXJDaGVjay9zb2xhckNoZWNrU3RhdHVzL3NvbGFyQ2hlY2tTdGF0dXMuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvZGFzaGJvYXJkL3NvbGFyQ2hlY2svc29sYXJDaGVja1N0YXR1cy9zb2xhckNoZWNrU3RhdHVzLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvZGFzaGJvYXJkL3NvbGFyQ2hlY2svc29sYXJDaGVja1N0YXR1cy9zb2xhckNoZWNrU3RhdHVzLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9kYXNoYm9hcmQvc29sYXJDaGVjay9zb2xhckNoZWNrU3RhdHVzL3NvbGFyQ2hlY2tTdGF0dXMuY29tcG9uZW50LnRzLlNvbGFyQ2hlY2tTdGF0dXNDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2ICpuZ0lmPVwibW9kZWwgJiYgbW9kZWwuc3RhdHVzSW1hZ2VcIiBjbGFzcz1cImNvbC1tZC0xMiBzb2xhci1jaGVjay1zdGF0dXNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJ1cHBlci1wYW5lbFwiPlxyXG4gICAgICAgIDxkaXYgW2NsYXNzLnN0YXR1cy1jaGVja1N5c3RlbV09XCJtb2RlbC5pc0NoZWNrU3lzdGVtXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgaWNvbiBoaWRkZW4teHNcIiBbY2xhc3MuaWNvbi1jaGVjay1yZXNwb25zZV09XCJtb2RlbC5pc0NoZWNrU3lzdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFpbi1pbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwie3ttb2RlbC5zb2xhckltYWdlLnNyY319XCIgYWx0PVwie3ttb2RlbC5zb2xhckltYWdlLmFsdFRleHR9fVwiPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHN0YXR1cyBoaWRkZW4teHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYWluLWltYWdlXCIgKm5nSWY9XCJtb2RlbC5zdGF0dXNJbWFnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3RhdHVzLWljb24gc3JjPVwie3ttb2RlbC5zdGF0dXNJbWFnZS5zcmN9fVwiIGFsdD1cInt7bW9kZWwuc3RhdHVzSW1hZ2UuYWx0VGV4dH19XCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgbWVzc2FnZVwiIFtjbGFzcy5nb29kXT1cIm1vZGVsLmlzR29vZFN0YXR1c1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtcG9zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtaGVhZGVyIG1lc3NhZ2UtYmxvY2sgXCIgKm5nSWY9XCJtb2RlbC5oZWFkaW5nXCI+e3ttb2RlbC5oZWFkaW5nfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVzc2FnZS1kZXRhaWxzIG1lc3NhZ2UtYmxvY2tcIiAqbmdJZj1cIm1vZGVsLmRldGFpbHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3ttb2RlbC5kZXRhaWxzfX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVzc2FnZS1kZXRhaWxzXCIgKm5nSWY9XCJtb2RlbC5sYXRlc3REYXRhRGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBVcGRhdGVkIHt7bW9kZWwubGF0ZXN0RGF0YURhdGV9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1vZGVsLmRheXNPZkRhdGFcIj4gdXNpbmcgeW91ciBsYXN0IHt7bW9kZWwuZGF5c09mRGF0YX19IGRheXMgb2YgZGF0YS48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgbW9yZS1saW5rIGhpZGRlbi14c1wiIFtjbGFzcy5tb3JlLWJ1dHRvbl09XCIhbW9kZWwuaXNTaG93TGVhcm5Nb3JlTGlua1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWNlbnRlclwiICpuZ0lmPVwibW9kZWwuaXNTaG93TGVhcm5Nb3JlTGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGluay10ZXh0XCIgW2hyZWZdPVwibW9kZWwubGlua1wiIChjbGljayk9XCJwcm9tcHRTdXJ2ZXkoKVwiIHRhcmdldD1cIl9ibGFua1wiPnt7bW9kZWwubGlua05hbWV9fTwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhbW9kZWwuaXNTaG93TGVhcm5Nb3JlTGlua1wiIChjbGljayk9XCJwcm9tcHRTdXJ2ZXkoKVwiIGNsYXNzPVwiZGxzLWJ1dHRvbi1vdmVycmlkZVwiIG1kLXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgW2hyZWZdPVwibW9kZWwubGlua1wiIHRhcmdldD1cIl9ibGFua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7bW9kZWwubGlua05hbWV9fVxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInZpc2libGUteHMgc29sYXItY29tbWFuZC1jaGVjay1yb3cgbG93ZXItcGFuZWxcIiBbY2xhc3Muc3RhdHVzLWNoZWNrU3lzdGVtXT1cIm1vZGVsLmlzQ2hlY2tTeXN0ZW1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibGVmdC1zaWRlIGNvbC14cy0zXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2JpbGUtc3RhdHVzIHZlcnRpY2FsLWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzdGF0dXMtaWNvbiBzcmM9XCJ7e21vZGVsLnN0YXR1c0ltYWdlLnNyY319XCIgYWx0PVwie3ttb2RlbC5zdGF0dXNJbWFnZS5hbHRUZXh0fX1cIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC14cy05IG1vYmlsZS1saW5rXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2JpbGUtbW9yZS1kZXRhaWwtbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZlcnRpY2FsLWNlbnRlclwiIFtjbGFzcy5tb3JlLWJ1dHRvbl09XCIhbW9kZWwuaXNTaG93TGVhcm5Nb3JlTGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJtb2RlbC5pc1Nob3dMZWFybk1vcmVMaW5rXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibW9iLWxpbmstdGV4dFwiIFtocmVmXT1cIm1vZGVsLmxpbmtcIiAoY2xpY2spPVwicHJvbXB0U3VydmV5KClcIiB0YXJnZXQ9XCJfYmxhbmtcIj57e21vZGVsLmxpbmtOYW1lfX08L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhbW9kZWwuaXNTaG93TGVhcm5Nb3JlTGlua1wiIGNsYXNzPVwiZGxzLWJ1dHRvbi1vdmVycmlkZVwiIChjbGljayk9XCJwcm9tcHRTdXJ2ZXkoKVwiIG1kLXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgW2hyZWZdPVwibW9kZWwubGlua1wiIHRhcmdldD1cIl9ibGFua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7e21vZGVsLmxpbmtOYW1lfX1cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcbiIsIjxhZ2wtc29sYXItY2hlY2stc3RhdHVzPjwvYWdsLXNvbGFyLWNoZWNrLXN0YXR1cz4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ1NnQjtNQUFBO01BQWtELDJEQUM5QztVQUFBO2NBQUE7TUFBcUY7O0lBQXBFO0lBQWdDO1FBQUE7SUFBakQsV0FBaUIsVUFBZ0MsU0FBakQ7Ozs7b0JBS0E7TUFBQTtNQUFBLDhCQUFpRTs7O1FBQUE7UUFBQTs7OztvQkFDakU7TUFBQTtNQUFBLDhCQUFpRTtNQUFBOztJQUFBO0lBQUE7Ozs7b0JBSzdEO01BQUEsd0VBQStCO2FBQUE7OztRQUFBO1FBQUE7Ozs7b0JBRm5DO01BQUE7TUFBQSxnQkFBMEQ7TUFBQSxnQ0FFdEQ7TUFBQSwwREFBQTtNQUFBO01BQXlGOztJQUFuRjtJQUFOLFdBQU0sU0FBTjs7O0lBRnNEO0lBQUE7Ozs7b0JBTzlEO01BQUE7TUFBQSxnQkFBK0QsMkRBQzNEO2FBQUE7VUFBQTtRQUFBO1FBQUE7UUFBeUM7VUFBQTtVQUFBO1FBQUE7UUFBekM7TUFBQSxnQ0FBa0Ysd0NBQXNCO2FBQUE7O0lBQW5GO0lBQXJCLFdBQXFCLFNBQXJCO0lBQWtGO0lBQUE7Ozs7b0JBRXRGO01BQUE7TUFBQTtNQUFB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