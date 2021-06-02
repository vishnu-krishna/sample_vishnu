/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './paygBonus.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/material/button';
import * as i5 from '@angular/cdk/platform';
import * as i6 from '@angular/cdk/a11y';
import * as i7 from '@angular/common';
import * as i8 from '../../../../../../../src/app/shared/component/payment/payg/paygBonus.component';
import * as i9 from '../../../../../../../src/app/shared/service/content.service';
const styles_PaygBonusComponent:any[] = [i0.styles];
export const RenderType_PaygBonusComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_PaygBonusComponent,data:{}});
function View_PaygBonusComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),23,'div',[['class',
      'bonus-box']],[[2,'show-box',(null as any)]],(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),
      i1.ɵeld(0,(null as any),(null as any),7,'div',[['class','bonus-box__topupamount'],
          ['id','payg-bonus-topup']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','bonus-box__topupamount__dollar'],
          ['id','payg-bonus-topup-dollar']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['$'])),(_l()(),
          i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'span',[['class','bonus-box__topupamount__value'],['id',
              'payg-bonus-topup-lowerband']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['',''])),(_l()(),
          i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,
          'div',[['class','bonus-box__bonusamount'],['id','payg-bonus-bonusamount']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['get $','.00 bonus '])),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),8,
          'div',[['class','']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),5,'button',[['class','bonus-box__button mat-raised-button'],
          ['color','primary'],['id','bill-strip-button-overview'],['md-raised-button',
              '']],[[8,'disabled',0]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.selectAmount(_v.context.$implicit.lowerBand)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i2.View_MdButton_0,i2.RenderType_MdButton)),i1.ɵdid(16384,(null as any),0,
          i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],(null as any),
          (null as any)),i1.ɵdid(180224,(null as any),0,i4.MdButton,[i1.Renderer2,
          i1.ElementRef,i5.Platform,i6.FocusMonitor],{color:[0,'color']},(null as any)),
      i1.ɵdid(16384,(null as any),0,i4.MdRaisedButtonCssMatStyler,([] as any[]),(null as any),
          (null as any)),i1.ɵprd(8448,(null as any),i3.MATERIAL_COMPATIBILITY_MODE,
          true,([] as any[])),(_l()(),i1.ɵted(0,['select'])),(_l()(),i1.ɵted((null as any),
          ['\n                '])),(_l()(),i1.ɵted((null as any),['\n            ']))],
      (_ck,_v) => {
        const currVal_4:any = 'primary';
        _ck(_v,18,0,currVal_4);
      },(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.bonusBandDisplay[_v.context.index];
        _ck(_v,0,0,currVal_0);
        const currVal_1:any = _v.context.$implicit.lowerBand;
        _ck(_v,8,0,currVal_1);
        const currVal_2:any = _v.context.$implicit.bonus;
        _ck(_v,12,0,currVal_2);
        const currVal_3:any = (i1.ɵnov(_v,18).disabled || (null as any));
        _ck(_v,16,0,currVal_3);
      });
}
function View_PaygBonusComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),5,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      0,'div',([] as any[]),[[8,'className',0]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.scrollToLeft()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',([] as any[]),[[8,'className',
          0]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.scrollToRight()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        ']))],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = i1.ɵinlineInterpolate(1,'image-arrow image-arrow__left image-arrow__left--',
            _co.displayLeftScroll,'');
        _ck(_v,2,0,currVal_0);
        const currVal_1:any = i1.ɵinlineInterpolate(1,'image-arrow image-arrow__right image-arrow__right--',
            _co.displayRightScroll,'');
        _ck(_v,4,0,currVal_1);
      });
}
export function View_PaygBonusComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[i1.ɵqud(402653184,1,{bonusBand:0}),(_l()(),i1.ɵeld(0,(null as any),
      (null as any),23,'div',[['class','payg-bonus'],['id','payg-bonus']],(null as any),
      (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),5,'div',[['class',
      'payg-bonus__header']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),1,'span',[['class','payg-bonus__header__text'],['id',
          'payg-bonus-header-text']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),[' Payment amount'])),(_l()(),
      i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          13,'div',[['class','payg-bonus__bands'],['id','payg-bonus-bands']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵeld(0,[[1,0],['bonusBand',1]],(null as any),
          4,'div',[['class','flex-container shorthand'],['id','payg-bonus-band-container']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_PaygBonusComponent_1)),
      i1.ɵdid(802816,(null as any),0,i7.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_PaygBonusComponent_2)),
      i1.ɵdid(16384,(null as any),0,i7.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n         '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','payg-bonus__link bluelink'],
          ['id','payg-bonus-enter-amount-link']],(null as any),[[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:i8.PaygBonusComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.selectAmount((0 - 1))) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            ',
          '\n        '])),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),
          ['\n'])),(_l()(),i1.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:i8.PaygBonusComponent = _v.component;
    const currVal_0:any = _co.bonusBands;
    _ck(_v,15,0,currVal_0);
    const currVal_1:any = _co.isScrollOverflowing;
    _ck(_v,19,0,currVal_1);
  },(_ck,_v) => {
    var _co:i8.PaygBonusComponent = _v.component;
    const currVal_2:any = _co.content.bonusEnterCustomAmountText;
    _ck(_v,22,0,currVal_2);
  });
}
export function View_PaygBonusComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-payg-bonus',
      ([] as any[]),(null as any),(null as any),(null as any),View_PaygBonusComponent_0,
      RenderType_PaygBonusComponent)),i1.ɵdid(114688,(null as any),0,i8.PaygBonusComponent,
      [i9.ContentService],(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const PaygBonusComponentNgFactory:i1.ComponentFactory<i8.PaygBonusComponent> = i1.ɵccf('agl-payg-bonus',
    i8.PaygBonusComponent,View_PaygBonusComponent_Host_0,{paymentDetails:'paymentDetails',
        bonusBands:'bonusBands'},{onSelectAmount:'onSelectAmount'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvcGF5bWVudC9wYXlnL3BheWdCb251cy5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvcGF5bWVudC9wYXlnL3BheWdCb251cy5jb21wb25lbnQudHMiLCJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudC9wYXltZW50L3BheWcvcGF5Z0JvbnVzLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvcGF5bWVudC9wYXlnL3BheWdCb251cy5jb21wb25lbnQudHMuUGF5Z0JvbnVzQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPGRpdiBpZD1cInBheWctYm9udXNcIiBjbGFzcz1cInBheWctYm9udXNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJwYXlnLWJvbnVzX19oZWFkZXJcIj5cclxuICAgICAgICA8c3BhbiBpZD1cInBheWctYm9udXMtaGVhZGVyLXRleHRcIiBjbGFzcz1cInBheWctYm9udXNfX2hlYWRlcl9fdGV4dFwiPiBQYXltZW50IGFtb3VudDwvc3Bhbj5cclxuICAgICAgICA8IS0tPGRpdiBpZD1cInBheWctYm9udXMtaGVhZGVyLW1lc3NhZ2VcIiBjbGFzcz1cInBheWctYm9udXNfX2hlYWRlcl9fbWVzc2FnZVwiPiBCb251cyBhbW91bnRzIG1heSBub3QgaW5jbHVkZSBhbnkgcGVuZGluZyBwYXltZW50czwvZGl2Pi0tPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGlkPVwicGF5Zy1ib251cy1iYW5kc1wiIGNsYXNzPVwicGF5Zy1ib251c19fYmFuZHNcIj5cclxuICAgICAgICA8ZGl2ICNib251c0JhbmQgaWQ9XCJwYXlnLWJvbnVzLWJhbmQtY29udGFpbmVyXCIgY2xhc3M9XCJmbGV4LWNvbnRhaW5lciBzaG9ydGhhbmRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvbnVzLWJveFwiIFtjbGFzcy5zaG93LWJveF09XCJib251c0JhbmREaXNwbGF5W2luZGV4XVwiICpuZ0Zvcj1cImxldCBib251c0JhbmQgb2YgYm9udXNCYW5kcyBsZXQgaW5kZXggPSBpbmRleFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cInBheWctYm9udXMtdG9wdXBcIiBjbGFzcz1cImJvbnVzLWJveF9fdG9wdXBhbW91bnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBpZD1cInBheWctYm9udXMtdG9wdXAtZG9sbGFyXCIgY2xhc3M9XCJib251cy1ib3hfX3RvcHVwYW1vdW50X19kb2xsYXJcIj4kPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwicGF5Zy1ib251cy10b3B1cC1sb3dlcmJhbmRcIiBjbGFzcz1cImJvbnVzLWJveF9fdG9wdXBhbW91bnRfX3ZhbHVlXCI+e3tib251c0JhbmQubG93ZXJCYW5kfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwYXlnLWJvbnVzLWJvbnVzYW1vdW50XCIgY2xhc3M9XCJib251cy1ib3hfX2JvbnVzYW1vdW50XCI+Z2V0ICR7e2JvbnVzQmFuZC5ib251c319LjAwIGJvbnVzIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJiaWxsLXN0cmlwLWJ1dHRvbi1vdmVydmlld1wiIChjbGljayk9XCJzZWxlY3RBbW91bnQoYm9udXNCYW5kLmxvd2VyQmFuZClcIiBjbGFzcz1cImJvbnVzLWJveF9fYnV0dG9uXCIgbWQtcmFpc2VkLWJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIj5zZWxlY3Q8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTY3JvbGxPdmVyZmxvd2luZ1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtYXJyb3cgaW1hZ2UtYXJyb3dfX2xlZnQgaW1hZ2UtYXJyb3dfX2xlZnQtLXt7ZGlzcGxheUxlZnRTY3JvbGx9fVwiIChjbGljayk9XCJzY3JvbGxUb0xlZnQoKVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtYXJyb3cgaW1hZ2UtYXJyb3dfX3JpZ2h0IGltYWdlLWFycm93X19yaWdodC0te3tkaXNwbGF5UmlnaHRTY3JvbGx9fVwiIChjbGljayk9XCJzY3JvbGxUb1JpZ2h0KClcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgPGRpdiBpZD1cInBheWctYm9udXMtZW50ZXItYW1vdW50LWxpbmtcIiBjbGFzcz1cInBheWctYm9udXNfX2xpbmsgYmx1ZWxpbmtcIiAoY2xpY2spPVwic2VsZWN0QW1vdW50KC0xKVwiPlxyXG4gICAgICAgICAgICB7e2NvbnRlbnQuYm9udXNFbnRlckN1c3RvbUFtb3VudFRleHR9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iLCI8YWdsLXBheWctYm9udXM+PC9hZ2wtcGF5Zy1ib251cz4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ09ZO01BQUE7TUFBQSxnQkFBeUgsdURBQ3JIO2FBQUE7VUFBQTtVQUFBLGdCQUEwRDtNQUN0RDtVQUFBO1VBQUEsOEJBQTBFLHNDQUFRO2lCQUFBLDRDQUNsRjtVQUFBO2NBQUE7VUFBQSw4QkFBNEUsd0NBQThCO2lCQUFBLHdDQUN4RztVQUFBLHlCQUNOO1VBQUE7VUFBQTtNQUFnRSx1REFBd0M7VUFBQSx5QkFDeEc7VUFBQTtVQUFBLGdCQUFjO01BQ1Y7VUFBQTtjQUFBO1FBQUE7UUFBQTtRQUF3QztVQUFBO1VBQUE7UUFBQTtRQUF4QztNQUFBLHFEQUFBOzhCQUFBO1VBQUEsc0JBQUE7bURBQUE7YUFBQTtVQUFBLHNCQUFBO1VBQUEsb0JBQ29CLCtCQUFlO1VBQUEseUJBQ2pDOztRQURFO1FBREosWUFDSSxTQURKOzs7UUFQZTtRQUF2QixXQUF1QixTQUF2QjtRQUdvRjtRQUFBO1FBRWhCO1FBQUE7UUFFNUQ7UUFBQSxZQUFBLFNBQUE7Ozs7b0JBS1o7TUFBQSx3RUFBaUM7YUFBQSxvQ0FDN0I7TUFBQTtRQUFBO1FBQUE7UUFBb0Y7VUFBQTtVQUFBO1FBQUE7UUFBcEY7TUFBQSxnQ0FBbUg7TUFDbkg7VUFBQTtRQUFBO1FBQUE7UUFBdUY7VUFBQTtVQUFBO1FBQUE7UUFBdkY7TUFBQSxnQ0FBdUg7OztRQURsSDtZQUFBO1FBQUwsV0FBSyxTQUFMO1FBQ0s7WUFBQTtRQUFMLFdBQUssU0FBTDs7Ozt1REFyQlo7TUFBQTtNQUFBLDBEQUF3QztNQUFBLGFBQ3BDO01BQUE7TUFBQSxnQkFBZ0MsK0NBQzVCO01BQUE7VUFBQTtNQUFBLGdCQUFtRSxvREFBc0I7YUFBQSxnQ0FDK0M7TUFDdEksMkNBQ047VUFBQTtVQUFBLDBEQUFxRDtVQUFBLGlCQUNqRDtVQUFBO1VBQUE7TUFBZ0YsbURBQzVFO1VBQUE7YUFBQTs0QkFBQSx5Q0FVTTtVQUFBLGlCQUNKLCtDQUNOO2lCQUFBO2FBQUE7VUFBQSx3QkFHTTtNQUNMO1VBQUE7VUFBQTtZQUFBO1lBQUE7WUFBeUU7Y0FBQTtjQUFBO1lBQUE7WUFBekU7VUFBQSxnQ0FBb0c7VUFBQSxnQkFFL0YsMkNBQ0o7VUFBQSxTQUNKOztJQXBCd0U7SUFBbEUsWUFBa0UsU0FBbEU7SUFZQztJQUFMLFlBQUssU0FBTDs7O0lBSXFHO0lBQUE7Ozs7b0JDdkI3RztNQUFBO21DQUFBLFVBQUE7TUFBQTtJQUFBOzs7OzsifQ==
