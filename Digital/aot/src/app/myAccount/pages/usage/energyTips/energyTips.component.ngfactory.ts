/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './energyTips.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../../node_modules/@angular/material/card/typings/index.ngfactory';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/material/card';
import * as i5 from '../../../../../../../src/app/myAccount/pages/usage/energyTips/energyTips.component';
import * as i6 from '@angular/common';
const styles_EnergyTipsComponent:any[] = [i0.styles];
export const RenderType_EnergyTipsComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_EnergyTipsComponent,data:{}});
function View_EnergyTipsComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'tips_info']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),[' ',' ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.tips[_co.currentTipIndex].infoExtended;
    _ck(_v,1,0,currVal_0);
  });
}
function View_EnergyTipsComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'tips_readMore']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.onClickInfoChange('moreInfo')) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),[' Read more.. ']))],
      (null as any),(null as any));
}
function View_EnergyTipsComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'tips_readMore']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.onClickInfoChange('lessInfo')) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),[' Read less ']))],
      (null as any),(null as any));
}
function View_EnergyTipsComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'tips_info']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),[' ',' ']))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.tips[_co.currentTipIndex2].infoExtended;
    _ck(_v,1,0,currVal_0);
  });
}
function View_EnergyTipsComponent_5(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'tips_readMore']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.onClickInfoChange2('moreInfo')) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),[' Read more.. ']))],
      (null as any),(null as any));
}
function View_EnergyTipsComponent_6(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'tips_readMore']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.onClickInfoChange2('lessInfo')) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),[' Read less ']))],
      (null as any),(null as any));
}
export function View_EnergyTipsComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),73,'md-card',[['class',
      'energy-saving-tips tempdls-card mat-card'],['id','EnergyTips']],[[2,'extend',
      (null as any)]],(null as any),(null as any),i2.View_MdCard_0,i2.RenderType_MdCard)),
      i1.ɵdid(16384,(null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],
          i1.ElementRef],(null as any),(null as any)),i1.ɵdid(49152,(null as any),
          0,i4.MdCard,([] as any[]),(null as any),(null as any)),(_l()(),i1.ɵted(0,
          ['\n  '])),(_l()(),i1.ɵeld(0,(null as any),0,1,'div',[['class','tempdls-card-header ']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['Energy saving tips'])),(_l()(),i1.ɵted(0,['\n  '])),
      (_l()(),i1.ɵeld(0,(null as any),0,3,'div',[['class','arrow-container']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          [' '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'img',[['src','svg/arrow_previous.svg']],
          (null as any),[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i5.EnergyTipsComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.onClickPreviousTip()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),[' '])),(_l()(),
          i1.ɵted(0,['\n    '])),(_l()(),i1.ɵeld(0,(null as any),0,27,'div',[['class',
          'tips-container tips-container-left']],(null as any),[[(null as any),'swipeLeft'],
          [(null as any),'swipeRight']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:i5.EnergyTipsComponent = _v.component;
        if (('swipeLeft' === en)) {
          const pd_0:any = ((<any>_co.swipeLeft()) !== false);
          ad = (pd_0 && ad);
        }
        if (('swipeRight' === en)) {
          const pd_1:any = ((<any>_co.swipeRight()) !== false);
          ad = (pd_1 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),[' \n      '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),3,'div',[['class','tips_icon']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),0,'img',[['width','80']],[[8,'src',4]],(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n      '])),
      (_l()(),i1.ɵted((null as any),['\n      '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'div',[['class','tips_title tempdls-heading-primary']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          [' ',''])),(_l()(),i1.ɵted((null as any),['\n      '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','tips_summary']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          [' ',' '])),(_l()(),i1.ɵted((null as any),['\n      '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','tips_question']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          [' Why should I do this? '])),(_l()(),i1.ɵted((null as any),['\n      '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','tips_info']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),[' ',' '])),(_l()(),i1.ɵted((null as any),['\n      '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_EnergyTipsComponent_1)),
      i1.ɵdid(16384,(null as any),0,i6.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n      '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_EnergyTipsComponent_2)),
      i1.ɵdid(16384,(null as any),0,i6.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n      '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_EnergyTipsComponent_3)),
      i1.ɵdid(16384,(null as any),0,i6.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
          i1.ɵted(0,['\n    '])),(_l()(),i1.ɵeld(0,(null as any),0,27,'div',[['class',
          'tips-container tips-container-right']],(null as any),[[(null as any),'swipeLeft'],
          [(null as any),'swipeRight']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:i5.EnergyTipsComponent = _v.component;
        if (('swipeLeft' === en)) {
          const pd_0:any = ((<any>_co.swipeLeft()) !== false);
          ad = (pd_0 && ad);
        }
        if (('swipeRight' === en)) {
          const pd_1:any = ((<any>_co.swipeRight()) !== false);
          ad = (pd_1 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),[' \n      '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),3,'div',[['class','tips_icon']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),0,'img',[['width','80']],[[8,'src',4]],(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n      '])),
      (_l()(),i1.ɵted((null as any),['\n      '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'div',[['class','tips_title tempdls-heading-primary']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['  ',' '])),(_l()(),i1.ɵted((null as any),['\n      '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','tips_summary']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          [' ',' '])),(_l()(),i1.ɵted((null as any),['\n      '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','tips_question']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          [' Why should I do this? '])),(_l()(),i1.ɵted((null as any),['\n      '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','tips_info']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),[' ',' '])),(_l()(),i1.ɵted((null as any),['\n      '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_EnergyTipsComponent_4)),
      i1.ɵdid(16384,(null as any),0,i6.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n      '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_EnergyTipsComponent_5)),
      i1.ɵdid(16384,(null as any),0,i6.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n      '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_EnergyTipsComponent_6)),
      i1.ɵdid(16384,(null as any),0,i6.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
          i1.ɵted(0,['\n  '])),(_l()(),i1.ɵeld(0,(null as any),0,2,'div',[['class',
          'arrow-container arrow-container__right']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          0,'img',[['src','svg/arrow_next.svg']],(null as any),[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:i5.EnergyTipsComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.onClickNextTip()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),[' '])),(_l()(),
          i1.ɵted(0,['\n'])),(_l()(),i1.ɵted((null as any),[' ']))],(_ck,_v) => {
    var _co:i5.EnergyTipsComponent = _v.component;
    const currVal_5:any = (_co.readMore === 'moreInfo');
    _ck(_v,32,0,currVal_5);
    const currVal_6:any = (_co.readMore === 'lessInfo');
    _ck(_v,35,0,currVal_6);
    const currVal_7:any = (_co.readMore === 'moreInfo');
    _ck(_v,38,0,currVal_7);
    const currVal_12:any = (_co.readMore2 === 'moreInfo');
    _ck(_v,61,0,currVal_12);
    const currVal_13:any = (_co.readMore2 === 'lessInfo');
    _ck(_v,64,0,currVal_13);
    const currVal_14:any = (_co.readMore2 === 'moreInfo');
    _ck(_v,67,0,currVal_14);
  },(_ck,_v) => {
    var _co:i5.EnergyTipsComponent = _v.component;
    const currVal_0:any = ((_co.readMore === 'moreInfo') || (_co.readMore2 === 'moreInfo'));
    _ck(_v,0,0,currVal_0);
    const currVal_1:any = i1.ɵinlineInterpolate(1,'',_co.tips[_co.currentTipIndex].icon,
        '');
    _ck(_v,16,0,currVal_1);
    const currVal_2:any = _co.tips[_co.currentTipIndex].title;
    _ck(_v,20,0,currVal_2);
    const currVal_3:any = _co.tips[_co.currentTipIndex].summary;
    _ck(_v,23,0,currVal_3);
    const currVal_4:any = _co.tips[_co.currentTipIndex].info;
    _ck(_v,29,0,currVal_4);
    const currVal_8:any = i1.ɵinlineInterpolate(1,'',_co.tips[_co.currentTipIndex2].icon,
        '');
    _ck(_v,45,0,currVal_8);
    const currVal_9:any = _co.tips[_co.currentTipIndex2].title;
    _ck(_v,49,0,currVal_9);
    const currVal_10:any = _co.tips[_co.currentTipIndex2].summary;
    _ck(_v,52,0,currVal_10);
    const currVal_11:any = _co.tips[_co.currentTipIndex2].info;
    _ck(_v,58,0,currVal_11);
  });
}
export function View_EnergyTipsComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-energy-tips',
      ([] as any[]),(null as any),(null as any),(null as any),View_EnergyTipsComponent_0,
      RenderType_EnergyTipsComponent)),i1.ɵdid(114688,(null as any),0,i5.EnergyTipsComponent,
      ([] as any[]),(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const EnergyTipsComponentNgFactory:i1.ComponentFactory<i5.EnergyTipsComponent> = i1.ɵccf('agl-energy-tips',
    i5.EnergyTipsComponent,View_EnergyTipsComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy91c2FnZS9lbmVyZ3lUaXBzL2VuZXJneVRpcHMuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvdXNhZ2UvZW5lcmd5VGlwcy9lbmVyZ3lUaXBzLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvcGFnZXMvdXNhZ2UvZW5lcmd5VGlwcy9lbmVyZ3lUaXBzLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy91c2FnZS9lbmVyZ3lUaXBzL2VuZXJneVRpcHMuY29tcG9uZW50LnRzLkVuZXJneVRpcHNDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8bWQtY2FyZCBpZD1cIkVuZXJneVRpcHNcIiAgY2xhc3M9XCJlbmVyZ3ktc2F2aW5nLXRpcHMgdGVtcGRscy1jYXJkXCIgW2NsYXNzLmV4dGVuZF09XCJyZWFkTW9yZSA9PT0gJ21vcmVJbmZvJyB8fCByZWFkTW9yZTIgPT09ICdtb3JlSW5mbydcIj5cclxuICA8ZGl2IGNsYXNzPVwidGVtcGRscy1jYXJkLWhlYWRlciBcIj5FbmVyZ3kgc2F2aW5nIHRpcHM8L2Rpdj5cclxuICA8ZGl2IGNsYXNzID0gXCJhcnJvdy1jb250YWluZXJcIj4gPGltZyBzcmM9XCJzdmcvYXJyb3dfcHJldmlvdXMuc3ZnXCIgKGNsaWNrKT1cIm9uQ2xpY2tQcmV2aW91c1RpcCgpXCI+IDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcyA9IFwidGlwcy1jb250YWluZXIgdGlwcy1jb250YWluZXItbGVmdFwiIChzd2lwZUxlZnQpPVwic3dpcGVMZWZ0KClcIiAoc3dpcGVSaWdodCk9XCJzd2lwZVJpZ2h0KClcIj4gXHJcbiAgICAgIDxkaXYgY2xhc3MgPSBcInRpcHNfaWNvblwiPlxyXG4gICAgICAgIDxpbWcgd2lkdGg9XCI4MFwiIHNyYz1cInt7IHRpcHNbY3VycmVudFRpcEluZGV4XS5pY29uIH19XCIgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3MgPSBcInRpcHNfdGl0bGUgdGVtcGRscy1oZWFkaW5nLXByaW1hcnlcIj4ge3sgdGlwc1tjdXJyZW50VGlwSW5kZXhdLnRpdGxlIH19PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3MgPSBcInRpcHNfc3VtbWFyeVwiPiB7eyB0aXBzW2N1cnJlbnRUaXBJbmRleF0uc3VtbWFyeSB9fSA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcyA9IFwidGlwc19xdWVzdGlvblwiPiBXaHkgc2hvdWxkIEkgZG8gdGhpcz8gPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3MgPSBcInRpcHNfaW5mb1wiPiB7eyB0aXBzW2N1cnJlbnRUaXBJbmRleF0uaW5mbyB9fSA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cInJlYWRNb3JlID09PSAnbW9yZUluZm8nXCIgY2xhc3MgPSBcInRpcHNfaW5mb1wiPiB7eyB0aXBzW2N1cnJlbnRUaXBJbmRleF0uaW5mb0V4dGVuZGVkIH19IDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwicmVhZE1vcmUgPT09ICdsZXNzSW5mbydcIiBjbGFzcyA9IFwidGlwc19yZWFkTW9yZVwiIChjbGljayk9XCJvbkNsaWNrSW5mb0NoYW5nZSgnbW9yZUluZm8nKVwiPiBSZWFkIG1vcmUuLiA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cInJlYWRNb3JlID09PSAnbW9yZUluZm8nXCIgY2xhc3MgPSBcInRpcHNfcmVhZE1vcmVcIiAoY2xpY2spPVwib25DbGlja0luZm9DaGFuZ2UoJ2xlc3NJbmZvJylcIj4gUmVhZCBsZXNzIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzID0gXCJ0aXBzLWNvbnRhaW5lciB0aXBzLWNvbnRhaW5lci1yaWdodFwiIChzd2lwZUxlZnQpPVwic3dpcGVMZWZ0KClcIiAoc3dpcGVSaWdodCk9XCJzd2lwZVJpZ2h0KClcIj4gXHJcbiAgICAgIDxkaXYgY2xhc3MgPSBcInRpcHNfaWNvblwiPlxyXG4gICAgICAgIDxpbWcgd2lkdGg9XCI4MFwiIHNyYz1cInt7IHRpcHNbY3VycmVudFRpcEluZGV4Ml0uaWNvbiB9fVwiIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzID0gXCJ0aXBzX3RpdGxlIHRlbXBkbHMtaGVhZGluZy1wcmltYXJ5XCI+ICB7eyB0aXBzW2N1cnJlbnRUaXBJbmRleDJdLnRpdGxlIH19IDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzID0gXCJ0aXBzX3N1bW1hcnlcIj4ge3sgdGlwc1tjdXJyZW50VGlwSW5kZXgyXS5zdW1tYXJ5IH19IDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzID0gXCJ0aXBzX3F1ZXN0aW9uXCI+IFdoeSBzaG91bGQgSSBkbyB0aGlzPyA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcyA9IFwidGlwc19pbmZvXCI+IHt7IHRpcHNbY3VycmVudFRpcEluZGV4Ml0uaW5mbyB9fSA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cInJlYWRNb3JlMiA9PT0gJ21vcmVJbmZvJ1wiIGNsYXNzID0gXCJ0aXBzX2luZm9cIj4ge3sgdGlwc1tjdXJyZW50VGlwSW5kZXgyXS5pbmZvRXh0ZW5kZWQgfX0gPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJyZWFkTW9yZTIgPT09ICdsZXNzSW5mbydcIiBjbGFzcyA9IFwidGlwc19yZWFkTW9yZVwiIChjbGljayk9XCJvbkNsaWNrSW5mb0NoYW5nZTIoJ21vcmVJbmZvJylcIj4gUmVhZCBtb3JlLi4gPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJyZWFkTW9yZTIgPT09ICdtb3JlSW5mbydcIiBjbGFzcyA9IFwidGlwc19yZWFkTW9yZVwiIChjbGljayk9XCJvbkNsaWNrSW5mb0NoYW5nZTIoJ2xlc3NJbmZvJylcIj4gUmVhZCBsZXNzIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcyA9IFwiYXJyb3ctY29udGFpbmVyIGFycm93LWNvbnRhaW5lcl9fcmlnaHRcIj48aW1nIHNyYz1cInN2Zy9hcnJvd19uZXh0LnN2Z1wiIChjbGljayk9XCJvbkNsaWNrTmV4dFRpcCgpXCI+IDwvZGl2PlxyXG48L21kLWNhcmQ+ICIsIjxhZ2wtZW5lcmd5LXRpcHM+PC9hZ2wtZW5lcmd5LXRpcHM+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNXTTtNQUFBO01BQXlEOztJQUFBO0lBQUE7Ozs7b0JBQ3pEO01BQUE7SUFBQTtJQUFBO0lBQTZEO01BQUE7TUFBQTtJQUFBO0lBQTdEO0VBQUEsZ0NBQXFHOzs7O29CQUNyRztNQUFBO0lBQUE7SUFBQTtJQUE2RDtNQUFBO01BQUE7SUFBQTtJQUE3RDtFQUFBLGdDQUFxRzs7OztvQkFVckc7TUFBQTtNQUEwRDs7SUFBQTtJQUFBOzs7O29CQUMxRDtNQUFBO0lBQUE7SUFBQTtJQUE4RDtNQUFBO01BQUE7SUFBQTtJQUE5RDtFQUFBLGdDQUF1Rzs7OztvQkFDdkc7TUFBQTtJQUFBO0lBQUE7SUFBOEQ7TUFBQTtNQUFBO0lBQUE7SUFBOUQ7RUFBQSxnQ0FBdUc7Ozs7b0JBekI3RztNQUFBO01BQUE7YUFBQTt1QkFBQSxzQ0FBQTtVQUFBLHVEQUF1STtVQUFBLFdBQ3JJO1VBQUE7TUFBa0MsdURBQXdCO01BQzFEO1VBQUEsMERBQStCO1VBQUEsUUFBQztVQUFBO1lBQUE7WUFBQTtZQUFrQztjQUFBO2NBQUE7WUFBQTtZQUFsQztVQUFBLGdDQUFpRSxzQ0FBTztpQkFBQSxnQkFDdEc7VUFBQTtVQUFBO1FBQUE7UUFBQTtRQUFrRDtVQUFBO1VBQUE7UUFBQTtRQUEwQjtVQUFBO1VBQUE7UUFBQTtRQUE1RTtNQUFBLGdDQUF3RztNQUN0RztVQUFBO01BQXlCLCtDQUN2QjtVQUFBO1VBQUEsOEJBQXlEO01BQ3JELDZDQUNOO1VBQUE7VUFBQSwwREFBa0Q7VUFBQSxXQUF3Qyw2Q0FDMUY7VUFBQTtVQUFBLDBEQUE0QjtVQUFBLFlBQTJDLDZDQUN2RTtVQUFBO1VBQUEsMERBQTZCO1VBQUEsOEJBQTZCO01BQzFEO1VBQUE7TUFBeUIsMENBQXdDO01BQ2pFO2FBQUE7VUFBQSx3QkFBeUcsNkNBQ3pHO2lCQUFBO2FBQUE7VUFBQSx3QkFBd0gsNkNBQ3hIO2lCQUFBO2FBQUE7VUFBQSx3QkFBc0gsMkNBQ2xIO2lCQUFBLGdCQUNOO1VBQUE7VUFBQTtRQUFBO1FBQUE7UUFBbUQ7VUFBQTtVQUFBO1FBQUE7UUFBMEI7VUFBQTtVQUFBO1FBQUE7UUFBN0U7TUFBQSxnQ0FBeUc7TUFDdkc7VUFBQTtNQUF5QiwrQ0FDdkI7VUFBQTtVQUFBLDhCQUEwRDtNQUN0RCw2Q0FDTjtVQUFBO1VBQUEsMERBQWtEO1VBQUEsYUFBMkMsNkNBQzdGO1VBQUE7VUFBQSwwREFBNEI7VUFBQSxZQUE0Qyw2Q0FDeEU7VUFBQTtVQUFBLDBEQUE2QjtVQUFBLDhCQUE2QjtNQUMxRDtVQUFBO01BQXlCLDBDQUF5QztNQUNsRTthQUFBO1VBQUEsd0JBQTJHLDZDQUMzRztpQkFBQTthQUFBO1VBQUEsd0JBQTBILDZDQUMxSDtpQkFBQTthQUFBO1VBQUEsd0JBQXdILDJDQUNwSDtpQkFBQSxjQUNSO1VBQUE7VUFBQSw4QkFBc0Q7VUFBQTtVQUFBO1lBQUE7WUFBQTtZQUE4QjtjQUFBO2NBQUE7WUFBQTtZQUE5QjtVQUFBLGdDQUF5RCxzQ0FBTztpQkFBQSxZQUM5Rzs7SUFqQkM7SUFBTCxZQUFLLFNBQUw7SUFDSztJQUFMLFlBQUssU0FBTDtJQUNLO0lBQUwsWUFBSyxTQUFMO0lBVUs7SUFBTCxZQUFLLFVBQUw7SUFDSztJQUFMLFlBQUssVUFBTDtJQUNLO0lBQUwsWUFBSyxVQUFMOzs7SUF6QjREO0lBQWxFLFdBQWtFLFNBQWxFO0lBS3dCO1FBQUE7SUFBaEIsWUFBZ0IsU0FBaEI7SUFFZ0Q7SUFBQTtJQUN0QjtJQUFBO0lBRUg7SUFBQTtJQU9QO1FBQUE7SUFBaEIsWUFBZ0IsU0FBaEI7SUFFZ0Q7SUFBQTtJQUN0QjtJQUFBO0lBRUg7SUFBQTs7OztvQkN0Qi9CO01BQUE7b0NBQUEsVUFBQTtNQUFBO0lBQUE7Ozs7In0=
