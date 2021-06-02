/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './rewards-flybuys.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../components/dls/link/dlsLink.component.ngfactory';
import * as i3 from '../../../../../../../src/app/myAccount/rewards/components/dls/link/dlsLink.component';
import * as i4 from '@angular/platform-browser';
import * as i5 from '../../../../shared/loaders/loading.component.ngfactory';
import * as i6 from '../../../../../../../src/app/shared/loaders/loading.component';
import * as i7 from '@angular/common';
import * as i8 from '../../components/webchat-rewards-error/webchat-rewards-error.component.ngfactory';
import * as i9 from '../../../../../../../src/app/myAccount/rewards/components/webchat-rewards-error/webchat-rewards-error.component';
import * as i10 from '../../../../shared/component/genericError/genericErrorImage/genericErrorImage.component.ngfactory';
import * as i11 from '../../../../../../../src/app/shared/component/genericError/genericErrorImage/genericErrorImage.component';
import * as i12 from '../../../../../../../src/app/shared/pipes/formatDate/formatDate.pipe';
import * as i13 from '../../../../../../../src/app/myAccount/rewards/pages/flybuys/rewards-flybuys.component';
import * as i14 from '../../../maui/secondaryNavigation/secondaryNavigation.component.ngfactory';
import * as i15 from '../../../../../../../src/app/myAccount/maui/secondaryNavigation/secondaryNavigation.component';
import * as i16 from '../../../../../../../src/app/myAccount/rewards/services/contract/iRewards.service';
import * as i17 from '../../../../../../../src/app/myAccount/rewards/rewards-analytics';
const styles_RewardsFlybuysComponent:any[] = [i0.styles];
export const RenderType_RewardsFlybuysComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_RewardsFlybuysComponent,data:{}});
function View_RewardsFlybuysComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),13,'div',[['class',
      'page__header']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),3,'div',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n                     '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'img',[['src','svg/flybuys.svg']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                 '])),(_l()(),i1.ɵted((null as any),
          ['\n                 '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          5,'p',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['Visit '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),2,'agl-dls-link',[['href','https://www.flybuys.com.au']],
          (null as any),(null as any),(null as any),i2.View_DLSLinkComponent_0,i2.RenderType_DLSLinkComponent)),
      i1.ɵdid(49152,(null as any),0,i3.DLSLinkComponent,[i4.DomSanitizer],{href:[0,
          'href']},(null as any)),(_l()(),i1.ɵted(0,['flybuys.com.au'])),(_l()(),i1.ɵted((null as any),
          [' to redeem your points.'])),(_l()(),i1.ɵted((null as any),['\n             ']))],
      (_ck,_v) => {
        const currVal_0:any = 'https://www.flybuys.com.au';
        _ck(_v,10,0,currVal_0);
      },(null as any));
}
function View_RewardsFlybuysComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-loader',([] as any[]),
      (null as any),(null as any),(null as any),i5.View_LoadingComponent_0,i5.RenderType_LoadingComponent)),
      i1.ɵdid(114688,(null as any),0,i6.LoadingComponent,([] as any[]),(null as any),
          (null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
function View_RewardsFlybuysComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),14,'tr',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),i1.ɵdid(278528,
      (null as any),0,i7.NgClass,[i1.IterableDiffers,i1.KeyValueDiffers,i1.ElementRef,
          i1.Renderer],{ngClass:[0,'ngClass']},(null as any)),i1.ɵpod({'debit-row':0}),
      (_l()(),i1.ɵted((null as any),['\n                             '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),2,'td',([] as any[]),(null as any),
              (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['',''])),i1.ɵppd(2),(_l()(),i1.ɵted((null as any),['\n                             '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),2,'td',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','transaction__description']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['',''])),(_l()(),i1.ɵted((null as any),['\n                             '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'td',[['class','flybuy-points']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['',''])),(_l()(),i1.ɵted((null as any),['\n                         ']))],
      (_ck,_v) => {
        const currVal_0:any = _ck(_v,2,0,!_v.context.$implicit.isCredit());
        _ck(_v,1,0,currVal_0);
      },(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_1:any = i1.ɵunv(_v,5,0,_ck(_v,6,0,i1.ɵnov((<any>(<any>_v.parent).parent),
            0),_v.context.$implicit.extractionDate,_co.DateFormat.SHORT_DATE_FORMAT));
        _ck(_v,5,0,currVal_1);
        const currVal_2:any = _v.context.$implicit.transactionDescription;
        _ck(_v,10,0,currVal_2);
        const currVal_3:any = _v.context.$implicit.adjustedPoints;
        _ck(_v,13,0,currVal_3);
      });
}
function View_RewardsFlybuysComponent_5(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),9,'agl-dls-link',
      [['class','transaction-list__action']],(null as any),[[(null as any),'click']],
      (_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.transactionListMoreOrLessClick()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },i2.View_DLSLinkComponent_0,i2.RenderType_DLSLinkComponent)),i1.ɵdid(49152,
      (null as any),0,i3.DLSLinkComponent,[i4.DomSanitizer],(null as any),(null as any)),
      (_l()(),i1.ɵted(0,['\n                     '])),(_l()(),i1.ɵeld(0,(null as any),
          0,1,'span',[['class','action__text']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['',''])),(_l()(),
          i1.ɵted(0,[' '])),(_l()(),i1.ɵeld(0,(null as any),0,2,'span',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      i1.ɵdid(278528,(null as any),0,i7.NgClass,[i1.IterableDiffers,i1.KeyValueDiffers,
          i1.ElementRef,i1.Renderer],{ngClass:[0,'ngClass']},(null as any)),i1.ɵpod({'down-arrow':0,
          'up-arrow':1}),(_l()(),i1.ɵted(0,['\n                 ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_1:any = _ck(_v,8,0,!_co.viewedAllTransactions(),_co.viewedAllTransactions());
    _ck(_v,7,0,currVal_1);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = (!_co.viewedAllTransactions()? 'See more': 'See less');
    _ck(_v,4,0,currVal_0);
  });
}
function View_RewardsFlybuysComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),14,'div',[['class',
      'page__content']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                 '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),8,'div',[['class','transactions-list']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                     '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          5,'table',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n                         '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),3,'tbody',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_RewardsFlybuysComponent_4)),
      i1.ɵdid(802816,(null as any),0,i7.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n                     '])),(_l()(),i1.ɵted((null as any),['\n                 '])),
      (_l()(),i1.ɵted((null as any),['\n                 '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_RewardsFlybuysComponent_5)),
      i1.ɵdid(16384,(null as any),0,i7.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n             ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = _co.filteredTransactions;
        _ck(_v,8,0,currVal_0);
        const currVal_1:any = _co.showMoreOrLessAction();
        _ck(_v,13,0,currVal_1);
      },(null as any));
}
function View_RewardsFlybuysComponent_7(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-rewards-error-webchat',
      [['chatButtonId','LPMyRewardsFBError']],(null as any),(null as any),(null as any),
      i8.View_WebchatRewardsErrorComponent_0,i8.RenderType_WebchatRewardsErrorComponent)),
      i1.ɵdid(4243456,(null as any),0,i9.WebchatRewardsErrorComponent,([] as any[]),
          {chatButtonId:[0,'chatButtonId']},(null as any))],(_ck,_v) => {
    const currVal_0:any = 'LPMyRewardsFBError';
    _ck(_v,1,0,currVal_0);
  },(null as any));
}
function View_RewardsFlybuysComponent_6(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),16,'div',[['class',
      'error-message']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'h3',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['That wasn\'t supposed to happen.'])),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'p',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['We\'re sorry for the inconvenience, but your flybuys transactions are currently unavailable. Please check back soon.'])),
      (_l()(),i1.ɵted((null as any),['\n\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),4,'div',[['class','error-image']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-generic-error-image',
          ([] as any[]),(null as any),(null as any),(null as any),i10.View_GenericErrorImageComponent_0,
          i10.RenderType_GenericErrorImageComponent)),i1.ɵdid(49152,(null as any),
          0,i11.GenericErrorImageComponent,([] as any[]),(null as any),(null as any)),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,
          (null as any),View_RewardsFlybuysComponent_7)),i1.ɵdid(16384,(null as any),
          0,i7.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n    ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.loadingError;
    _ck(_v,15,0,currVal_0);
  },(null as any));
}
export function View_RewardsFlybuysComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[i1.ɵpid(0,i12.FormatDatePipe,([] as any[])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),23,'div',([] as any[]),(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n   '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),5,'div',[['class','flybuys-navigation']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          2,'agl-maui-secondary-navigation',[['display','true'],['displayBackButton',
              'false'],['hideNavigation','hideNavigation'],['text','Flybuys transactions']],
          (null as any),[[(null as any),'clicked'],['window','scroll']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i13.RewardsFlybuysComponent = _v.component;
            if (('window:scroll' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,6).onWindowScroll()) !== false);
              ad = (pd_0 && ad);
            }
            if (('clicked' === en)) {
              const pd_1:any = ((<any>_co.backClick()) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i14.View_MauiSecondaryNavigationComponent_0,i14.RenderType_MauiSecondaryNavigationComponent)),
      i1.ɵdid(49152,(null as any),0,i15.MauiSecondaryNavigationComponent,([] as any[]),
          {text:[0,'text'],display:[1,'display'],displayBackButton:[2,'displayBackButton']},
          {clicked:'clicked'}),(_l()(),i1.ɵted((null as any),['\n '])),(_l()(),i1.ɵted((null as any),
          ['\n   '])),(_l()(),i1.ɵted((null as any),['\n   '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),10,'div',[['class','flybuys-content']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,
          (null as any),View_RewardsFlybuysComponent_1)),i1.ɵdid(16384,(null as any),
          0,i7.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n         \n             '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_RewardsFlybuysComponent_2)),
      i1.ɵdid(16384,(null as any),0,i7.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n         \n             '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_RewardsFlybuysComponent_3)),
      i1.ɵdid(16384,(null as any),0,i7.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n             \n   '])),
      (_l()(),i1.ɵted((null as any),['\n   '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_RewardsFlybuysComponent_6)),i1.ɵdid(16384,
          (null as any),0,i7.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:i13.RewardsFlybuysComponent = _v.component;
    const currVal_0:any = 'Flybuys transactions';
    const currVal_1:any = 'true';
    const currVal_2:any = 'false';
    _ck(_v,6,0,currVal_0,currVal_1,currVal_2);
    const currVal_3:boolean = !_co.loadingError;
    _ck(_v,13,0,currVal_3);
    const currVal_4:any = _co.loading;
    _ck(_v,16,0,currVal_4);
    const currVal_5:boolean = (!_co.loading && !_co.loadingError);
    _ck(_v,19,0,currVal_5);
    const currVal_6:any = _co.loadingError;
    _ck(_v,23,0,currVal_6);
  },(null as any));
}
export function View_RewardsFlybuysComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-rewards-flybuys',
      ([] as any[]),(null as any),(null as any),(null as any),View_RewardsFlybuysComponent_0,
      RenderType_RewardsFlybuysComponent)),i1.ɵdid(8503296,(null as any),0,i13.RewardsFlybuysComponent,
      [i16.IRewardsService,i17.RewardsAnalytics],(null as any),(null as any))],(_ck,
      _v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const RewardsFlybuysComponentNgFactory:i1.ComponentFactory<i13.RewardsFlybuysComponent> = i1.ɵccf('agl-rewards-flybuys',
    i13.RewardsFlybuysComponent,View_RewardsFlybuysComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9yZXdhcmRzL3BhZ2VzL2ZseWJ1eXMvcmV3YXJkcy1mbHlidXlzLmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L3Jld2FyZHMvcGFnZXMvZmx5YnV5cy9yZXdhcmRzLWZseWJ1eXMuY29tcG9uZW50LnRzIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9yZXdhcmRzL3BhZ2VzL2ZseWJ1eXMvcmV3YXJkcy1mbHlidXlzLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9yZXdhcmRzL3BhZ2VzL2ZseWJ1eXMvcmV3YXJkcy1mbHlidXlzLmNvbXBvbmVudC50cy5SZXdhcmRzRmx5YnV5c0NvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxkaXY+XHJcbiAgIDxkaXYgY2xhc3M9XCJmbHlidXlzLW5hdmlnYXRpb25cIj5cclxuICAgIDxhZ2wtbWF1aS1zZWNvbmRhcnktbmF2aWdhdGlvblxyXG4gICAgZGlzcGxheT1cInRydWVcIlxyXG4gICBkaXNwbGF5QmFja0J1dHRvbj1cImZhbHNlXCJcclxuICAgdGV4dD1cIkZseWJ1eXMgdHJhbnNhY3Rpb25zXCJcclxuICAgaGlkZU5hdmlnYXRpb249XCJoaWRlTmF2aWdhdGlvblwiXHJcbiAgIChjbGlja2VkKT0nYmFja0NsaWNrKCknPlxyXG4gPC9hZ2wtbWF1aS1zZWNvbmRhcnktbmF2aWdhdGlvbj5cclxuICAgPC9kaXY+XHJcbiAgIDxkaXYgY2xhc3M9XCJmbHlidXlzLWNvbnRlbnRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZV9faGVhZGVyXCIgKm5nSWY9XCIhbG9hZGluZ0Vycm9yXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cInN2Zy9mbHlidXlzLnN2Z1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPHA+VmlzaXQgPGFnbC1kbHMtbGluayBocmVmPVwiaHR0cHM6Ly93d3cuZmx5YnV5cy5jb20uYXVcIj5mbHlidXlzLmNvbS5hdTwvYWdsLWRscy1saW5rPiB0byByZWRlZW0geW91ciBwb2ludHMuPC9wPlxyXG4gICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICAgPGFnbC1sb2FkZXIgKm5nSWY9XCJsb2FkaW5nXCI+PC9hZ2wtbG9hZGVyPlxyXG4gICAgICAgICBcclxuICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhbG9hZGluZyAmJiAhbG9hZGluZ0Vycm9yXCIgY2xhc3M9XCJwYWdlX19jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRyYW5zYWN0aW9ucy1saXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDx0YWJsZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgdHJhbnNhY3Rpb24gb2YgZmlsdGVyZWRUcmFuc2FjdGlvbnNcIiBbbmdDbGFzc109XCJ7J2RlYml0LXJvdyc6ICF0cmFuc2FjdGlvbi5pc0NyZWRpdCgpfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57eyB0cmFuc2FjdGlvbi5leHRyYWN0aW9uRGF0ZSB8IGFnbEZvcm1hdERhdGU6RGF0ZUZvcm1hdC5TSE9SVF9EQVRFX0ZPUk1BVCB9fTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxkaXYgY2xhc3M9XCJ0cmFuc2FjdGlvbl9fZGVzY3JpcHRpb25cIj57eyB0cmFuc2FjdGlvbi50cmFuc2FjdGlvbkRlc2NyaXB0aW9uIH19PC9kaXY+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJmbHlidXktcG9pbnRzXCI+e3sgdHJhbnNhY3Rpb24uYWRqdXN0ZWRQb2ludHMgfX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICA8YWdsLWRscy1saW5rIGNsYXNzPVwidHJhbnNhY3Rpb24tbGlzdF9fYWN0aW9uXCIgKGNsaWNrKT1cInRyYW5zYWN0aW9uTGlzdE1vcmVPckxlc3NDbGljaygpXCIgKm5nSWY9XCJzaG93TW9yZU9yTGVzc0FjdGlvbigpXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFjdGlvbl9fdGV4dFwiPnt7ICF2aWV3ZWRBbGxUcmFuc2FjdGlvbnMoKSA/ICdTZWUgbW9yZScgOiAnU2VlIGxlc3MnIH19PC9zcGFuPiA8c3BhbiBbbmdDbGFzc109XCJ7J2Rvd24tYXJyb3cnOiAhdmlld2VkQWxsVHJhbnNhY3Rpb25zKCksICd1cC1hcnJvdyc6IHZpZXdlZEFsbFRyYW5zYWN0aW9ucygpfVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICA8L2FnbC1kbHMtbGluaz5cclxuICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgXHJcbiAgIDwvZGl2PlxyXG4gICA8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiICpuZ0lmPVwibG9hZGluZ0Vycm9yXCI+XHJcbiAgICAgICAgPGgzPlRoYXQgd2Fzbid0IHN1cHBvc2VkIHRvIGhhcHBlbi48L2gzPlxyXG4gICAgICAgIDxwPldlJ3JlIHNvcnJ5IGZvciB0aGUgaW5jb252ZW5pZW5jZSwgYnV0IHlvdXIgZmx5YnV5cyB0cmFuc2FjdGlvbnMgYXJlIGN1cnJlbnRseSB1bmF2YWlsYWJsZS4gUGxlYXNlIGNoZWNrIGJhY2sgc29vbi48L3A+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci1pbWFnZVwiPlxyXG4gICAgICAgICAgICA8YWdsLWdlbmVyaWMtZXJyb3ItaW1hZ2U+PC9hZ2wtZ2VuZXJpYy1lcnJvci1pbWFnZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YWdsLXJld2FyZHMtZXJyb3Itd2ViY2hhdCBjaGF0QnV0dG9uSWQ9XCJMUE15UmV3YXJkc0ZCRXJyb3JcIiAqbmdJZj1cImxvYWRpbmdFcnJvclwiPjwvYWdsLXJld2FyZHMtZXJyb3Itd2ViY2hhdD5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj4iLCI8YWdsLXJld2FyZHMtZmx5YnV5cz48L2FnbC1yZXdhcmRzLWZseWJ1eXM+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ1dRO01BQUE7TUFBZ0QsdURBQ3hDO1VBQUE7VUFBQSw4QkFBSztNQUNBO1VBQUE7TUFBNkIsd0RBQzNCO1VBQUEsMEJBQ047VUFBQTtVQUFBLGdCQUFHLDJDQUFNO1VBQUE7VUFBQTthQUFBO1VBQUEsd0JBQWdELHVDQUE2QjtVQUFBLDhCQUEyQjs7UUFBMUY7UUFBZCxZQUFjLFNBQWQ7Ozs7b0JBR2I7TUFBQTthQUFBO1VBQUE7SUFBQTs7OztvQkFLWTtNQUFBLCtFQUFBO01BQUE7cUJBQUEsZ0RBQXFEO01BQW1ELG9FQUNwRztpQkFBQTtjQUFBLDBEQUFJO1VBQUEscUJBQWtGO01BQ3RGO1VBQUEsMERBQUk7VUFBQTtVQUFBO01BQXNDLHdDQUFtRDtNQUM3RjtVQUFBO01BQTBCLHdDQUFxQzs7UUFIZDtRQUFyRCxXQUFxRCxTQUFyRDs7O1FBQ1E7WUFBQTtRQUFBO1FBQ3NDO1FBQUE7UUFDaEI7UUFBQTs7OztvQkFJdEM7TUFBQTtNQUFBO1FBQUE7UUFBQTtRQUErQztVQUFBO1VBQUE7UUFBQTtRQUEvQztNQUFBLHFFQUFBO01BQUE7TUFBMEgsZ0RBQ3RIO1VBQUE7VUFBQSw4QkFBMkIsd0NBQStEO2lCQUFBLFdBQUM7VUFBQTthQUFBO21DQUFBLGdEQUFNO1VBQUEsZUFBaUc7O0lBQWpHO0lBQU4sV0FBTSxTQUFOOzs7SUFBaEU7SUFBQTs7OztvQkFYbkM7TUFBQTtNQUE2RCx3REFDekQ7VUFBQTtVQUFBLDRDQUErQjtVQUFBLDhCQUMzQjtVQUFBO1VBQUEsZ0JBQU87TUFDSDtVQUFBO1VBQUE7YUFBQTs0QkFBQSx5Q0FJSztVQUFBLDhCQUNEO01BQ04sd0RBQ047VUFBQTthQUFBO1VBQUEsd0JBRWU7OztRQVRIO1FBQUosV0FBSSxTQUFKO1FBT2tGO1FBQTFGLFlBQTBGLFNBQTFGOzs7O29CQWFUO01BQUE7dUZBQUE7YUFBQTtVQUFBO0lBQTJCO0lBQTNCLFdBQTJCLFNBQTNCOzs7O29CQVBMO01BQUE7TUFBZ0QsK0NBQzNDO1VBQUE7VUFBQSw4QkFBSTtNQUFvQywrQ0FDeEM7VUFBQTtVQUFBLDhCQUFHO01BQXVILGlEQUUxSDtVQUFBO1VBQUEsNENBQXlCO1VBQUEscUJBQ3JCO1VBQUE7bURBQUEsVUFBQTtVQUFBO01BQW1ELCtDQUNqRDtVQUFBLGlCQUNOO1VBQUEsc0RBQUE7VUFBQTtNQUE4Rzs7SUFBakQ7SUFBN0QsWUFBNkQsU0FBN0Q7Ozs7Z0VBM0NSO01BQUE7TUFBQSw0Q0FBSztNQUNGO1VBQUE7TUFBZ0MsMkNBQy9CO1VBQUE7Y0FBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBS0Q7Y0FBQTtjQUFBO1lBQUE7WUFMQztVQUFBO2FBQUE7VUFBQTtVQUFBLHFCQUt1Qix3Q0FDTTtVQUFBLFlBQ3hCLDBDQUNOO1VBQUE7VUFBQSwwREFBNkI7VUFBQSxpQkFDeEI7VUFBQSxzREFBQTtVQUFBO01BS1csK0RBRU47VUFBQTthQUFBO1VBQUEsd0JBQXlDO01BRXpDO2FBQUE7VUFBQSx3QkFhTTtNQUVWLDBDQUNOO1VBQUEsc0VBQUE7VUFBQTtVQUFBLGVBUU87O0lBdkNQO0lBRkM7SUFDRDtJQUZDLFdBR0QsVUFGQyxVQUNELFNBRkM7SUFTOEI7SUFBMUIsWUFBMEIsU0FBMUI7SUFPaUI7SUFBWixZQUFZLFNBQVo7SUFFSztJQUFMLFlBQUssU0FBTDtJQWdCaUI7SUFBM0IsWUFBMkIsU0FBM0I7Ozs7b0JDcENIO01BQUE7d0NBQUEsVUFBQTtNQUFBOztJQUFBOzs7OyJ9
