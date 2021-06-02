/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '../shared/style/agltheme.scss.ngstyle';
import * as i1 from './style/app.scss.ngstyle';
import * as i2 from '../shared/style/dls.scss.ngstyle';
import * as i3 from '@angular/core';
import * as i4 from '@angular/router';
import * as i5 from '../shared/component/genericError/genericError.component.ngfactory';
import * as i6 from '../../../../src/app/shared/component/genericError/genericError.component';
import * as i7 from '../../../../src/app/shared/service/api.service';
import * as i8 from '../../../../src/app/shared/service/dataLayer.service';
import * as i9 from './menu/mobileMenu.component.ngfactory';
import * as i10 from '../../../../src/app/myAccount/menu/mobileMenu.component';
import * as i11 from '@angular/http';
import * as i12 from '../../../../src/app/shared/service/content.service';
import * as i13 from '../../../../src/app/myAccount/services/account.service';
import * as i14 from '../../../../src/app/myAccount/services/contract/isolarCheckOffer.service';
import * as i15 from '../../../../src/app/myAccount/services/featureFlag.service';
import * as i16 from '../../../../src/app/myAccount/rewards/services/contract/iRewardsEligibility.service';
import * as i17 from '../../../../src/app/myAccount/services/contract/idecisioning.service';
import * as i18 from '../../../../src/app/shared/service/contract/imessageBus.service';
import * as i19 from '../../../../src/app/myAccount/pages/settings/homeProfile/homeProfileEligibility.service';
import * as i20 from './headerAuthorised/headerAuthorised.component.ngfactory';
import * as i21 from '../../../../src/app/myAccount/headerAuthorised/headerAuthorised.component';
import * as i22 from '../../../../src/app/shared/service/config.service';
import * as i23 from '../../../../src/app/myAccount/services/contract/iauthenticationEvent.service';
import * as i24 from '../../../../src/app/myAccount/services/secondaryNavigation.service';
import * as i25 from '@angular/common';
import * as i26 from './footer/footer.component.ngfactory';
import * as i27 from '../../../../src/app/myAccount/footer/footer.component';
import * as i28 from './modal/modal.component.ngfactory';
import * as i29 from '../../../../src/app/myAccount/modal/modal.component';
import * as i30 from '../../../../src/app/myAccount/modal/modal.service';
import * as i31 from '../../../../src/app/shared/service/deviceDetector.service';
import * as i32 from './pages/ssmr/ssmr.component.ngfactory';
import * as i33 from '../../../../src/app/myAccount/pages/ssmr/ssmr.component';
import * as i34 from '../../../../src/app/myAccount/services/contract/issmr.service';
import * as i35 from './featureIntro/featureIntros.component.ngfactory';
import * as i36 from '../../../../src/app/myAccount/featureIntro/featureIntros.component';
import * as i37 from '../../../../src/app/myAccount/featureIntro/services/featureIntro.service';
import * as i38 from '../../../../src/app/myAccount/featureIntro/services/featureIntro-analytics';
import * as i39 from '../../../../src/app/myAccount/myAccount.component';
import * as i40 from 'angulartics2/dist/providers/gtm/angulartics2-gtm';
import * as i41 from '@angular/platform-browser';
import * as i42 from '@angular/material/icon';
const styles_MyAccountComponent:any[] = [i0.styles,i1.styles,i2.styles];
export const RenderType_MyAccountComponent:i3.RendererType2 = i3.ɵcrt({encapsulation:2,
    styles:styles_MyAccountComponent,data:{}});
function View_MyAccountComponent_1(_l:any):i3.ɵViewDefinition {
  return i3.ɵvid(0,[(_l()(),i3.ɵeld(0,(null as any),(null as any),4,'div',([] as any[]),
      [[8,'className',0],[2,'push-toleft',(null as any)],[2,'mg-fix',(null as any)],
          [2,'full-screen',(null as any)]],[[(null as any),'click']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:any = _v.component;
        if (('click' === en)) {
          const pd_0:any = ((<any>_co.closeMobileMenu()) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),(_l()(),i3.ɵted((null as any),['\n    '])),(_l()(),
      i3.ɵeld(16777216,(null as any),(null as any),1,'router-outlet',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      i3.ɵdid(212992,(null as any),0,i4.RouterOutlet,[i4.ChildrenOutletContexts,i3.ViewContainerRef,
          i3.ComponentFactoryResolver,[8,(null as any)],i3.ChangeDetectorRef],(null as any),
          (null as any)),(_l()(),i3.ɵted((null as any),['\n']))],(_ck,_v) => {
    _ck(_v,3,0);
  },(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = i3.ɵinlineInterpolate(1,'app-wrapper ',_co.browserClass,
        '');
    const currVal_1:any = i3.ɵnov((<any>_v.parent),2).isOpen;
    const currVal_2:any = _co.isNewLogo;
    const currVal_3:any = _co.isFullscreenRoute();
    _ck(_v,0,0,currVal_0,currVal_1,currVal_2,currVal_3);
  });
}
function View_MyAccountComponent_2(_l:any):i3.ɵViewDefinition {
  return i3.ɵvid(0,[(_l()(),i3.ɵeld(0,(null as any),(null as any),0,'div',[['class',
      'dls-menu-overlay']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.closeMobileMenu()) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any)))],(null as any),(null as any));
}
function View_MyAccountComponent_3(_l:any):i3.ɵViewDefinition {
  return i3.ɵvid(0,[(_l()(),i3.ɵeld(0,(null as any),(null as any),1,'agl-generic-error',
      ([] as any[]),(null as any),(null as any),(null as any),i5.View_GenericErrorComponent_0,
      i5.RenderType_GenericErrorComponent)),i3.ɵdid(49152,(null as any),0,i6.GenericErrorComponent,
      [i7.ApiService,i8.DataLayerService],(null as any),(null as any))],(null as any),
      (null as any));
}
export function View_MyAccountComponent_0(_l:any):i3.ɵViewDefinition {
  return i3.ɵvid(0,[i3.ɵqud(402653184,1,{_mobileMenu:0}),(_l()(),i3.ɵeld(0,(null as any),
      (null as any),1,'agl-mobile-menu',([] as any[]),(null as any),(null as any),
      (null as any),i9.View_MobileMenuComponent_0,i9.RenderType_MobileMenuComponent)),
      i3.ɵdid(114688,[[1,4],['mobileMenu',4]],0,i10.MobileMenuComponent,[i11.Http,
          i12.ContentService,i7.ApiService,i4.Router,i13.IAccountServiceMA,i14.ISolarCheckOfferService,
          i15.FeatureFlagService,i16.IRewardsEligibilityService,i17.IDecisioningService,
          i18.IMessageBusService,i19.HomeProfileEligibilityService],(null as any),
          (null as any)),(_l()(),i3.ɵted((null as any),['\n\n'])),(_l()(),i3.ɵeld(0,
          (null as any),(null as any),1,'agl-app-header',([] as any[]),[[2,'modalShown',
              (null as any)]],(null as any),(null as any),i20.View_HeaderAuthorisedComponent_0,
          i20.RenderType_HeaderAuthorisedComponent)),i3.ɵdid(114688,(null as any),
          0,i21.HeaderAuthorisedComponent,[i4.Router,i12.ContentService,i22.ConfigService,
              i23.IAuthenticationEventService,i24.SecondaryNavigationService],{menu:[0,
              'menu']},(null as any)),(_l()(),i3.ɵted((null as any),['\n\n'])),(_l()(),
          i3.ɵeld(0,(null as any),(null as any),0,'div',[['class','mobile mobile-padding']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i3.ɵted((null as any),['\n'])),(_l()(),i3.ɵeld(0,(null as any),(null as any),
          0,'div',[['class','desktop desktop-padding']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i3.ɵted((null as any),
          ['\n\n'])),(_l()(),i3.ɵted((null as any),['\n'])),(_l()(),i3.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_MyAccountComponent_1)),
      i3.ɵdid(16384,(null as any),0,i25.NgIf,[i3.ViewContainerRef,i3.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i3.ɵted((null as any),['\n\n'])),
      (_l()(),i3.ɵand(16777216,(null as any),(null as any),1,(null as any),View_MyAccountComponent_2)),
      i3.ɵdid(16384,(null as any),0,i25.NgIf,[i3.ViewContainerRef,i3.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i3.ɵted((null as any),['\n\n'])),
      (_l()(),i3.ɵand(16777216,(null as any),(null as any),1,(null as any),View_MyAccountComponent_3)),
      i3.ɵdid(16384,(null as any),0,i25.NgIf,[i3.ViewContainerRef,i3.TemplateRef],
          {ngIf:[0,'ngIf']},(null as any)),(_l()(),i3.ɵted((null as any),['\n\n'])),
      (_l()(),i3.ɵeld(0,(null as any),(null as any),1,'agl-app-footer',[['id','aglAppFooter']],
          [[2,'modalShown',(null as any)]],(null as any),(null as any),i26.View_FooterComponent_0,
          i26.RenderType_FooterComponent)),i3.ɵdid(49152,(null as any),0,i27.FooterComponent,
          ([] as any[]),(null as any),(null as any)),(_l()(),i3.ɵted((null as any),
          ['\n\n'])),(_l()(),i3.ɵeld(0,(null as any),(null as any),1,'agl-modal-confirm',
          ([] as any[]),(null as any),(null as any),(null as any),i28.View_ModalComponent_0,
          i28.RenderType_ModalComponent)),i3.ɵdid(180224,(null as any),0,i29.ModalComponent,
          [i30.ModalService,i3.Injector,i25.Location,i31.DeviceDetectorService],(null as any),
          (null as any)),(_l()(),i3.ɵted((null as any),['\n'])),(_l()(),i3.ɵeld(0,
          (null as any),(null as any),1,'agl-ssmr-modal',([] as any[]),[[8,'hidden',
              0],[2,'transition1',(null as any)]],(null as any),(null as any),i32.View_SSMRComponent_0,
          i32.RenderType_SSMRComponent)),i3.ɵdid(49152,(null as any),0,i33.SSMRComponent,
          [i34.ISsmrService],(null as any),(null as any)),(_l()(),i3.ɵted((null as any),
          ['\n\n'])),(_l()(),i3.ɵeld(0,(null as any),(null as any),1,'agl-feature-intros',
          ([] as any[]),(null as any),(null as any),(null as any),i35.View_FeatureIntrosComponent_0,
          i35.RenderType_FeatureIntrosComponent)),i3.ɵdid(114688,(null as any),0,i36.FeatureIntrosComponent,
          [i37.FeatureIntroService,i30.ModalService,i16.IRewardsEligibilityService,
              i38.FeatureIntroAnalytics],(null as any),(null as any))],(_ck,_v) => {
    var _co:i39.MyAccountComponent = _v.component;
    _ck(_v,2,0);
    const currVal_1:any = i3.ɵnov(_v,2);
    _ck(_v,5,0,currVal_1);
    const currVal_2:boolean = !_co.apiSyncError;
    _ck(_v,13,0,currVal_2);
    const currVal_3:any = i3.ɵnov(_v,2).isOpen;
    _ck(_v,16,0,currVal_3);
    const currVal_4:any = _co.apiSyncError;
    _ck(_v,19,0,currVal_4);
    _ck(_v,31,0);
  },(_ck,_v) => {
    var _co:i39.MyAccountComponent = _v.component;
    const currVal_0:boolean = !_co.showHeader();
    _ck(_v,4,0,currVal_0);
    const currVal_5:boolean = !_co.showFooter();
    _ck(_v,21,0,currVal_5);
    const currVal_6:boolean = !_co.ssmrService.showSSMR;
    const currVal_7:any = _co.ssmrService.transition1;
    _ck(_v,27,0,currVal_6,currVal_7);
  });
}
export function View_MyAccountComponent_Host_0(_l:any):i3.ɵViewDefinition {
  return i3.ɵvid(0,[(_l()(),i3.ɵeld(0,(null as any),(null as any),1,'agl-account-app',
      ([] as any[]),(null as any),[[(null as any),'click'],['window','keydown']],(_v,
          en,$event) => {
        var ad:boolean = true;
        if (('click' === en)) {
          const pd_0:any = ((<any>i3.ɵnov(_v,1).onClick()) !== false);
          ad = (pd_0 && ad);
        }
        if (('window:keydown' === en)) {
          const pd_1:any = ((<any>i3.ɵnov(_v,1).keyboardInput()) !== false);
          ad = (pd_1 && ad);
        }
        return ad;
      },View_MyAccountComponent_0,RenderType_MyAccountComponent)),i3.ɵdid(114688,(null as any),
      0,i39.MyAccountComponent,[i11.Http,i7.ApiService,i4.Router,i31.DeviceDetectorService,
          i40.Angulartics2GoogleTagManager,i22.ConfigService,i12.ContentService,i41.DomSanitizer,
          i42.MdIconRegistry,i34.ISsmrService,i23.IAuthenticationEventService,i15.FeatureFlagService],
      (null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const MyAccountComponentNgFactory:i3.ComponentFactory<i39.MyAccountComponent> = i3.ɵccf('agl-account-app',
    i39.MyAccountComponent,View_MyAccountComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9teUFjY291bnQuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvbXlBY2NvdW50LmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvbXlBY2NvdW50LmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9teUFjY291bnQuY29tcG9uZW50LnRzLk15QWNjb3VudENvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxhZ2wtbW9iaWxlLW1lbnUgI21vYmlsZU1lbnU+PC9hZ2wtbW9iaWxlLW1lbnU+XHJcblxyXG48YWdsLWFwcC1oZWFkZXIgW2NsYXNzLm1vZGFsU2hvd25dPVwiIXNob3dIZWFkZXIoKVwiIFttZW51XT1cIm1vYmlsZU1lbnVcIj48L2FnbC1hcHAtaGVhZGVyPlxyXG5cclxuPGRpdiBjbGFzcz1cIm1vYmlsZSBtb2JpbGUtcGFkZGluZ1wiPjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwiZGVza3RvcCBkZXNrdG9wLXBhZGRpbmdcIj48L2Rpdj5cclxuXHJcbjwhLS0gVE9ETzogUmVtb3ZlIGNsYXNzIGJpbmRpbmcgbWctZml4IGFmdGVyIDIxc3QgQXByaWwgLS0+XHJcbjxkaXYgKm5nSWY9XCIhYXBpU3luY0Vycm9yXCJcclxuICAgICBjbGFzcz1cImFwcC13cmFwcGVyIHt7YnJvd3NlckNsYXNzfX1cIlxyXG4gICAgIFtjbGFzcy5wdXNoLXRvbGVmdF09XCJtb2JpbGVNZW51LmlzT3BlblwiXHJcbiAgICAgW2NsYXNzLm1nLWZpeF09XCJpc05ld0xvZ29cIlxyXG4gICAgIFtjbGFzcy5mdWxsLXNjcmVlbl09XCJpc0Z1bGxzY3JlZW5Sb3V0ZSgpXCJcclxuICAgICAoY2xpY2spPVwiY2xvc2VNb2JpbGVNZW51KClcIj5cclxuICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cclxuPC9kaXY+XHJcblxyXG48ZGl2ICpuZ0lmPVwibW9iaWxlTWVudS5pc09wZW5cIiAoY2xpY2spPVwiY2xvc2VNb2JpbGVNZW51KClcIiBjbGFzcz1cImRscy1tZW51LW92ZXJsYXlcIj48L2Rpdj5cclxuXHJcbjxhZ2wtZ2VuZXJpYy1lcnJvciAqbmdJZj1cImFwaVN5bmNFcnJvclwiPjwvYWdsLWdlbmVyaWMtZXJyb3I+XHJcblxyXG48YWdsLWFwcC1mb290ZXIgW2NsYXNzLm1vZGFsU2hvd25dPVwiIXNob3dGb290ZXIoKVwiIGlkPVwiYWdsQXBwRm9vdGVyXCI+PC9hZ2wtYXBwLWZvb3Rlcj5cclxuXHJcbjxhZ2wtbW9kYWwtY29uZmlybT48L2FnbC1tb2RhbC1jb25maXJtPlxyXG48YWdsLXNzbXItbW9kYWwgW2hpZGRlbl09XCIhc3NtclNlcnZpY2Uuc2hvd1NTTVJcIiBbY2xhc3MudHJhbnNpdGlvbjFdPVwic3NtclNlcnZpY2UudHJhbnNpdGlvbjFcIj48L2FnbC1zc21yLW1vZGFsPlxyXG5cclxuPGFnbC1mZWF0dXJlLWludHJvcz48L2FnbC1mZWF0dXJlLWludHJvcz4iLCI8YWdsLWFjY291bnQtYXBwPjwvYWdsLWFjY291bnQtYXBwPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDUUE7TUFBQTtVQUFBO1FBQUE7UUFBQTtRQUtLO1VBQUE7VUFBQTtRQUFBO1FBTEw7TUFBQSxnQ0FLaUMsMkNBQzdCO2FBQUE7VUFBQTthQUFBO3NDQUFBO1VBQUEsZUFBK0I7SUFBL0I7OztJQUxDO1FBQUE7SUFDQTtJQUNBO0lBQ0E7SUFKTCxXQUNLLFVBQ0EsVUFDQSxVQUNBLFNBSkw7Ozs7b0JBU0E7TUFBQTtJQUFBO0lBQUE7SUFBK0I7TUFBQTtNQUFBO0lBQUE7SUFBL0I7RUFBQTs7O29CQUVBO01BQUE7eUNBQUEsVUFBQTtNQUFBOzs7O3lEQW5CQTtNQUFBO01BQUE7YUFBQTs7O2tFQUFBO1VBQUEsZUFBK0MseUNBRS9DO1VBQUE7Y0FBQTtrREFBQSxVQUFBO1VBQUE7NEVBQUE7Y0FBQSx3QkFBd0YseUNBRXhGO2lCQUFBO2NBQUE7TUFBeUMsdUNBQ3pDO1VBQUE7VUFBQSw0Q0FBMkM7VUFBQSxXQUVnQix1Q0FDM0Q7VUFBQTthQUFBO1VBQUEsaUNBT007TUFFTjthQUFBO1VBQUEsaUNBQTBGO01BRTFGO2FBQUE7VUFBQSxpQ0FBNEQ7TUFFNUQ7VUFBQTt3Q0FBQSxVQUFBO1VBQUEsMkNBQXNGO1VBQUEsV0FFdEY7VUFBQTt1Q0FBQSxVQUFBO1VBQUE7VUFBQSxlQUF1Qyx1Q0FDdkM7VUFBQTtjQUFBO3NDQUFBLFVBQUE7VUFBQSxnREFBZ0g7VUFBQSxXQUVoSDtVQUFBOytDQUFBLFVBQUE7VUFBQTt1Q0FBQTs7SUExQkE7SUFFbUQ7SUFBbkQsV0FBbUQsU0FBbkQ7SUFNSztJQUFMLFlBQUssU0FBTDtJQVNLO0lBQUwsWUFBSyxTQUFMO0lBRW1CO0lBQW5CLFlBQW1CLFNBQW5CO0lBT0E7OztJQXhCZ0I7SUFBaEIsV0FBZ0IsU0FBaEI7SUFtQmdCO0lBQWhCLFlBQWdCLFNBQWhCO0lBR2dCO0lBQWlDO0lBQWpELFlBQWdCLFVBQWlDLFNBQWpEOzs7O29CQ3hCQTtNQUFBO21CQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO1VBQUE7VUFBQTtRQUFBO1FBQUE7TUFBQSxtRUFBQTtNQUFBOztvR0FBQTtNQUFBO0lBQUE7Ozs7In0=