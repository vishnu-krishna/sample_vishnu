/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './headerAuthorised.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../src/app/myAccount/headerAuthorised/headerAuthorised.component';
import * as i3 from '../../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i4 from '@angular/material/core';
import * as i5 from '@angular/material/icon';
import * as i6 from '@angular/material/menu';
import * as i7 from '@angular/cdk/overlay';
import * as i8 from '@angular/cdk/bidi';
import * as i9 from '../../../../node_modules/@angular/material/menu/typings/index.ngfactory';
import * as i10 from '../maui/secondaryNavigation/secondaryNavigation.component.ngfactory';
import * as i11 from '../../../../../src/app/myAccount/maui/secondaryNavigation/secondaryNavigation.component';
import * as i12 from '../menu/desktopMenu.component.ngfactory';
import * as i13 from '../../../../../src/app/myAccount/menu/desktopMenu.component';
import * as i14 from '@angular/http';
import * as i15 from '../../../../../src/app/shared/service/content.service';
import * as i16 from '../../../../../src/app/shared/service/api.service';
import * as i17 from '@angular/router';
import * as i18 from '../../../../../src/app/myAccount/services/account.service';
import * as i19 from '../../../../../src/app/shared/service/config.service';
import * as i20 from '../../../../../src/app/myAccount/services/contract/isolarCheckOffer.service';
import * as i21 from '../../../../../src/app/myAccount/services/featureFlag.service';
import * as i22 from '../../../../../src/app/myAccount/rewards/services/contract/iRewardsEligibility.service';
import * as i23 from '../../../../../src/app/myAccount/services/contract/idecisioning.service';
import * as i24 from '../../../../../src/app/shared/service/contract/imessageBus.service';
import * as i25 from '../../../../../src/app/myAccount/services/contract/iauthenticationEvent.service';
import * as i26 from '../../../../../src/app/myAccount/services/secondaryNavigation.service';
import * as i27 from '../../../../../src/app/myAccount/pages/settings/homeProfile/homeProfileEligibility.service';
const styles_HeaderAuthorisedComponent:any[] = [i0.styles];
export const RenderType_HeaderAuthorisedComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_HeaderAuthorisedComponent,data:{}});
export function View_HeaderAuthorisedComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[i1.ɵqud(402653184,1,{_mobileHeader:0}),(_l()(),i1.ɵeld(0,[[1,0],
      ['mobileHeader',1]],(null as any),66,'header',([] as any[]),[[2,'push-toleft',
      (null as any)]],(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      60,'div',[['class','agl-mobile-wrapper mobile']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),53,'div',[['class','agl-mobile-header']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),2,'md-icon',[['class','agl-mobile-header-menu mat-icon'],['role',
              'img'],['svgIcon','icon-hamburger-menu']],(null as any),[[(null as any),
              'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.HeaderAuthorisedComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.openMenu()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i3.View_MdIcon_0,i3.RenderType_MdIcon)),i1.ɵdid(16384,(null as any),0,
          i4.MdPrefixRejector,[[2,i4.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],(null as any),
          (null as any)),i1.ɵdid(638976,(null as any),0,i5.MdIcon,[i1.Renderer2,i1.ElementRef,
          i5.MdIconRegistry,[8,(null as any)]],{svgIcon:[0,'svgIcon']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),3,'a',[['href','https://www.agl.com.au'],['target','_blank']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),0,'img',[['class','agl-mobile-header-agl-logo'],['src','svg/icon-header-mobile.svg']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(16777216,(null as any),(null as any),
          11,'div',[['aria-haspopup','true'],['class','agl-mobile-header-user']],(null as any),
          [[(null as any),'mousedown'],[(null as any),'keydown'],[(null as any),'click']],
          (_v,en,$event) => {
            var ad:boolean = true;
            if (('mousedown' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,17)._handleMousedown($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('keydown' === en)) {
              const pd_1:any = ((<any>i1.ɵnov(_v,17)._handleKeydown($event)) !== false);
              ad = (pd_1 && ad);
            }
            if (('click' === en)) {
              const pd_2:any = ((<any>i1.ɵnov(_v,17)._handleClick($event)) !== false);
              ad = (pd_2 && ad);
            }
            return ad;
          },(null as any),(null as any))),i1.ɵdid(4341760,(null as any),0,i6.MdMenuTrigger,
          [i7.Overlay,i1.ElementRef,i1.ViewContainerRef,i6.MD_MENU_SCROLL_STRATEGY,
              [2,i6.MdMenu],[8,(null as any)],[2,i8.Directionality]],{menu:[0,'menu']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),2,'md-icon',[['class','agl-mobile-header-user__person-icon mat-icon'],
              ['role','img'],['svgIcon','icon-person']],(null as any),(null as any),
              (null as any),i3.View_MdIcon_0,i3.RenderType_MdIcon)),i1.ɵdid(16384,
          (null as any),0,i4.MdPrefixRejector,[[2,i4.MATERIAL_COMPATIBILITY_MODE],
              i1.ElementRef],(null as any),(null as any)),i1.ɵdid(638976,(null as any),
          0,i5.MdIcon,[i1.Renderer2,i1.ElementRef,i5.MdIconRegistry,[8,(null as any)]],
          {svgIcon:[0,'svgIcon']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),3,'md-icon',[['class','agl-mobile-header-user__dropdown-icon mat-icon'],
          ['role','img']],(null as any),(null as any),(null as any),i3.View_MdIcon_0,
          i3.RenderType_MdIcon)),i1.ɵdid(16384,(null as any),0,i4.MdPrefixRejector,
          [[2,i4.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],(null as any),(null as any)),
      i1.ɵdid(638976,(null as any),0,i5.MdIcon,[i1.Renderer2,i1.ElementRef,i5.MdIconRegistry,
          [8,(null as any)]],(null as any),(null as any)),(_l()(),i1.ɵted(0,['arrow_drop_down'])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),28,'md-menu',
          [['class','agl-header-dropdown-menu__mob']],(null as any),(null as any),
          (null as any),i9.View_MdMenu_0,i9.RenderType_MdMenu)),i1.ɵdid(16384,(null as any),
          0,i4.MdPrefixRejector,[[2,i4.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
          (null as any),(null as any)),i1.ɵdid(1228800,[['menu',4]],1,i6.MdMenu,[i1.ElementRef,
          i6.MD_MENU_DEFAULT_OPTIONS],{classList:[0,'classList']},(null as any)),i1.ɵqud(603979776,
          2,{items:1}),(_l()(),i1.ɵted(0,['\n                '])),(_l()(),i1.ɵeld(0,
          (null as any),0,6,'a',[['class','mat-menu-item'],['href','https://www.agl.com.au/residential/help-and-support'],
              ['md-menu-item',''],['role','menuitem'],['target','_blank']],[[2,'mat-menu-item-highlighted',
              (null as any)],[2,'mat-menu-item-submenu-trigger',(null as any)],[1,
              'tabindex',0],[1,'aria-disabled',0],[1,'disabled',0]],[[(null as any),
              'click'],[(null as any),'mouseenter']],(_v,en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,35)._checkDisabled($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('mouseenter' === en)) {
              const pd_1:any = ((<any>i1.ɵnov(_v,35)._emitHoverEvent()) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i9.View_MdMenuItem_0,i9.RenderType_MdMenuItem)),i1.ɵdid(180224,[[2,4]],
          0,i6.MdMenuItem,[i1.ElementRef],(null as any),(null as any)),i1.ɵprd(8448,
          (null as any),i4.MATERIAL_COMPATIBILITY_MODE,true,([] as any[])),(_l()(),
          i1.ɵted(0,['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),0,
          1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['Help'])),(_l()(),i1.ɵted(0,
          ['\n                '])),(_l()(),i1.ɵted(0,['\n                '])),(_l()(),
          i1.ɵeld(0,(null as any),0,6,'a',[['class','mat-menu-item'],['href','https://www.agl.com.au/residential/contact-us'],
              ['md-menu-item',''],['role','menuitem'],['target','_blank']],[[2,'mat-menu-item-highlighted',
              (null as any)],[2,'mat-menu-item-submenu-trigger',(null as any)],[1,
              'tabindex',0],[1,'aria-disabled',0],[1,'disabled',0]],[[(null as any),
              'click'],[(null as any),'mouseenter']],(_v,en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,43)._checkDisabled($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('mouseenter' === en)) {
              const pd_1:any = ((<any>i1.ɵnov(_v,43)._emitHoverEvent()) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i9.View_MdMenuItem_0,i9.RenderType_MdMenuItem)),i1.ɵdid(180224,[[2,4]],
          0,i6.MdMenuItem,[i1.ElementRef],(null as any),(null as any)),i1.ɵprd(8448,
          (null as any),i4.MATERIAL_COMPATIBILITY_MODE,true,([] as any[])),(_l()(),
          i1.ɵted(0,['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),0,
          1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['Contact Us'])),(_l()(),i1.ɵted(0,
          ['\n                '])),(_l()(),i1.ɵted(0,['\n                '])),(_l()(),
          i1.ɵeld(0,(null as any),0,6,'a',[['class','mat-menu-item'],['md-menu-item',
              ''],['role','menuitem']],[[2,'mat-menu-item-highlighted',(null as any)],
              [2,'mat-menu-item-submenu-trigger',(null as any)],[1,'tabindex',0],[1,
                  'aria-disabled',0],[1,'disabled',0]],[[(null as any),'click'],[(null as any),
              'mouseenter']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.HeaderAuthorisedComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,51)._checkDisabled($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('mouseenter' === en)) {
              const pd_1:any = ((<any>i1.ɵnov(_v,51)._emitHoverEvent()) !== false);
              ad = (pd_1 && ad);
            }
            if (('click' === en)) {
              const pd_2:any = ((<any>_co.logout($event)) !== false);
              ad = (pd_2 && ad);
            }
            return ad;
          },i9.View_MdMenuItem_0,i9.RenderType_MdMenuItem)),i1.ɵdid(180224,[[2,4]],
          0,i6.MdMenuItem,[i1.ElementRef],(null as any),(null as any)),i1.ɵprd(8448,
          (null as any),i4.MATERIAL_COMPATIBILITY_MODE,true,([] as any[])),(_l()(),
          i1.ɵted(0,['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),0,
          1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['Logout'])),(_l()(),i1.ɵted(0,
          ['\n                '])),(_l()(),i1.ɵted(0,['\n            '])),(_l()(),
          i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),2,'agl-maui-secondary-navigation',
          ([] as any[]),(null as any),[[(null as any),'clicked'],['window','scroll']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.HeaderAuthorisedComponent = _v.component;
            if (('window:scroll' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,61).onWindowScroll()) !== false);
              ad = (pd_0 && ad);
            }
            if (('clicked' === en)) {
              const pd_1:any = ((<any>_co.secondaryNavigationService.backClick($event)) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i10.View_MauiSecondaryNavigationComponent_0,i10.RenderType_MauiSecondaryNavigationComponent)),
      i1.ɵdid(49152,(null as any),0,i11.MauiSecondaryNavigationComponent,([] as any[]),
          {text:[0,'text'],textMobile:[1,'textMobile'],display:[2,'display'],displayBackButton:[3,
              'displayBackButton']},{clicked:'clicked'}),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),
          ['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-desktop-menu',
          ([] as any[]),(null as any),(null as any),(null as any),i12.View_DesktopMenuComponent_0,
          i12.RenderType_DesktopMenuComponent)),i1.ɵdid(114688,(null as any),0,i13.DesktopMenuComponent,
          [i14.Http,i15.ContentService,i16.ApiService,i17.Router,i18.IAccountServiceMA,
              i19.ConfigService,i20.ISolarCheckOfferService,i21.FeatureFlagService,
              i22.IRewardsEligibilityService,i23.IDecisioningService,i24.IMessageBusService,
              i25.IAuthenticationEventService,i26.SecondaryNavigationService,i27.HomeProfileEligibilityService],
          (null as any),(null as any)),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),
          i1.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:i2.HeaderAuthorisedComponent = _v.component;
    const currVal_1:any = 'icon-hamburger-menu';
    _ck(_v,9,0,currVal_1);
    const currVal_2:any = i1.ɵnov(_v,31);
    _ck(_v,17,0,currVal_2);
    const currVal_3:any = 'icon-person';
    _ck(_v,21,0,currVal_3);
    _ck(_v,25,0);
    const currVal_4:any = 'agl-header-dropdown-menu__mob';
    _ck(_v,31,0,currVal_4);
    const currVal_20:any = _co.secondaryNavigationService.desktopText;
    const currVal_21:any = _co.secondaryNavigationService.mobileText;
    const currVal_22:any = _co.secondaryNavigationService.display;
    const currVal_23:any = _co.secondaryNavigationService.displayBack;
    _ck(_v,61,0,currVal_20,currVal_21,currVal_22,currVal_23);
    _ck(_v,66,0);
  },(_ck,_v) => {
    const currVal_0:any = i1.ɵnov(_v,31).isOpen;
    _ck(_v,1,0,currVal_0);
    const currVal_5:any = i1.ɵnov(_v,35)._highlighted;
    const currVal_6:any = i1.ɵnov(_v,35)._triggersSubmenu;
    const currVal_7:any = i1.ɵnov(_v,35)._getTabIndex();
    const currVal_8:any = i1.ɵnov(_v,35).disabled.toString();
    const currVal_9:any = (i1.ɵnov(_v,35).disabled || (null as any));
    _ck(_v,34,0,currVal_5,currVal_6,currVal_7,currVal_8,currVal_9);
    const currVal_10:any = i1.ɵnov(_v,43)._highlighted;
    const currVal_11:any = i1.ɵnov(_v,43)._triggersSubmenu;
    const currVal_12:any = i1.ɵnov(_v,43)._getTabIndex();
    const currVal_13:any = i1.ɵnov(_v,43).disabled.toString();
    const currVal_14:any = (i1.ɵnov(_v,43).disabled || (null as any));
    _ck(_v,42,0,currVal_10,currVal_11,currVal_12,currVal_13,currVal_14);
    const currVal_15:any = i1.ɵnov(_v,51)._highlighted;
    const currVal_16:any = i1.ɵnov(_v,51)._triggersSubmenu;
    const currVal_17:any = i1.ɵnov(_v,51)._getTabIndex();
    const currVal_18:any = i1.ɵnov(_v,51).disabled.toString();
    const currVal_19:any = (i1.ɵnov(_v,51).disabled || (null as any));
    _ck(_v,50,0,currVal_15,currVal_16,currVal_17,currVal_18,currVal_19);
  });
}
export function View_HeaderAuthorisedComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-app-header',
      ([] as any[]),(null as any),(null as any),(null as any),View_HeaderAuthorisedComponent_0,
      RenderType_HeaderAuthorisedComponent)),i1.ɵdid(114688,(null as any),0,i2.HeaderAuthorisedComponent,
      [i17.Router,i15.ContentService,i19.ConfigService,i25.IAuthenticationEventService,
          i26.SecondaryNavigationService],(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const HeaderAuthorisedComponentNgFactory:i1.ComponentFactory<i2.HeaderAuthorisedComponent> = i1.ɵccf('agl-app-header',
    i2.HeaderAuthorisedComponent,View_HeaderAuthorisedComponent_Host_0,{menu:'menu',
        isShown:'isShown'},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9oZWFkZXJBdXRob3Jpc2VkL2hlYWRlckF1dGhvcmlzZWQuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvaGVhZGVyQXV0aG9yaXNlZC9oZWFkZXJBdXRob3Jpc2VkLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvaGVhZGVyQXV0aG9yaXNlZC9oZWFkZXJBdXRob3Jpc2VkLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9oZWFkZXJBdXRob3Jpc2VkL2hlYWRlckF1dGhvcmlzZWQuY29tcG9uZW50LnRzLkhlYWRlckF1dGhvcmlzZWRDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8aGVhZGVyICNtb2JpbGVIZWFkZXIgW2NsYXNzLnB1c2gtdG9sZWZ0XT1cIm1lbnUuaXNPcGVuXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYWdsLW1vYmlsZS13cmFwcGVyIG1vYmlsZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhZ2wtbW9iaWxlLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8bWQtaWNvbiAoY2xpY2spPVwib3Blbk1lbnUoKVwiIGNsYXNzPVwiYWdsLW1vYmlsZS1oZWFkZXItbWVudVwiIHN2Z0ljb249XCJpY29uLWhhbWJ1cmdlci1tZW51XCI+PC9tZC1pY29uPlxyXG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cuYWdsLmNvbS5hdVwiIHRhcmdldD1cIl9ibGFua1wiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImFnbC1tb2JpbGUtaGVhZGVyLWFnbC1sb2dvXCIgc3JjPVwic3ZnL2ljb24taGVhZGVyLW1vYmlsZS5zdmdcIj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWdsLW1vYmlsZS1oZWFkZXItdXNlclwiIFttZE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnVcIj5cclxuICAgICAgICAgICAgICAgIDxtZC1pY29uIGNsYXNzPVwiYWdsLW1vYmlsZS1oZWFkZXItdXNlcl9fcGVyc29uLWljb25cIiBzdmdJY29uPVwiaWNvbi1wZXJzb25cIj48L21kLWljb24+XHJcbiAgICAgICAgICAgICAgICA8bWQtaWNvbiBjbGFzcz1cImFnbC1tb2JpbGUtaGVhZGVyLXVzZXJfX2Ryb3Bkb3duLWljb25cIj5hcnJvd19kcm9wX2Rvd248L21kLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8bWQtbWVudSAjbWVudT1cIm1kTWVudVwiIGNsYXNzPVwiYWdsLWhlYWRlci1kcm9wZG93bi1tZW51X19tb2JcIj5cclxuICAgICAgICAgICAgICAgIDxhIG1kLW1lbnUtaXRlbSBocmVmPVwiaHR0cHM6Ly93d3cuYWdsLmNvbS5hdS9yZXNpZGVudGlhbC9oZWxwLWFuZC1zdXBwb3J0XCIgdGFyZ2V0PVwiX2JsYW5rXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+SGVscDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDxhIG1kLW1lbnUtaXRlbSBocmVmPVwiaHR0cHM6Ly93d3cuYWdsLmNvbS5hdS9yZXNpZGVudGlhbC9jb250YWN0LXVzXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q29udGFjdCBVczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDxhIG1kLW1lbnUtaXRlbSAoY2xpY2spPVwibG9nb3V0KCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Mb2dvdXQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDwvbWQtbWVudT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YWdsLW1hdWktc2Vjb25kYXJ5LW5hdmlnYXRpb25cclxuICAgICAgICAgICAgW2Rpc3BsYXldPVwic2Vjb25kYXJ5TmF2aWdhdGlvblNlcnZpY2UuZGlzcGxheVwiXHJcbiAgICAgICAgICAgIFtkaXNwbGF5QmFja0J1dHRvbl09XCJzZWNvbmRhcnlOYXZpZ2F0aW9uU2VydmljZS5kaXNwbGF5QmFja1wiXHJcbiAgICAgICAgICAgIFt0ZXh0XT1cInNlY29uZGFyeU5hdmlnYXRpb25TZXJ2aWNlLmRlc2t0b3BUZXh0XCJcclxuICAgICAgICAgICAgW3RleHRNb2JpbGVdPVwic2Vjb25kYXJ5TmF2aWdhdGlvblNlcnZpY2UubW9iaWxlVGV4dFwiXHJcbiAgICAgICAgICAgIChjbGlja2VkKT1cInNlY29uZGFyeU5hdmlnYXRpb25TZXJ2aWNlLmJhY2tDbGljaygkZXZlbnQpXCI+XHJcbiAgICAgICAgPC9hZ2wtbWF1aS1zZWNvbmRhcnktbmF2aWdhdGlvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGFnbC1kZXNrdG9wLW1lbnU+PC9hZ2wtZGVza3RvcC1tZW51PlxyXG48L2hlYWRlcj5cclxuIiwiPGFnbC1hcHAtaGVhZGVyPjwvYWdsLWFwcC1oZWFkZXI+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyRENBQTtNQUFBO01BQUEsMEVBQXdEO2FBQUEsNEJBQ3BEO01BQUE7TUFBQSw0Q0FBdUM7TUFDbkM7VUFBQTtNQUErQixtREFDM0I7VUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO1lBQVM7Y0FBQTtjQUFBO1lBQUE7WUFBVDtVQUFBLGlEQUFBOzhCQUFBO1VBQUEsc0JBQUE7NEJBQUE7TUFBcUcsbURBQ3JHO1VBQUE7VUFBQTtNQUFpRCx1REFDN0M7VUFBQTtVQUFBO01BQXlFLG1EQUN6RTtVQUFBLHFCQUNKO1VBQUE7VUFBQTtVQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtVQUFBLHVDQUFBO1VBQUE7Y0FBQTtVQUFBLGVBQThELHVEQUMxRDtpQkFBQTtjQUFBO2NBQUEsNkRBQUE7VUFBQTsyQkFBQSxzQ0FBQTtVQUFBO1VBQUEsdUNBQXFGO01BQ3JGO1VBQUE7OEJBQUEsVUFBQTtVQUFBO2FBQUE7VUFBQSxnREFBdUQ7TUFBeUIsbURBQzlFO1VBQUEscUJBQ047VUFBQTtVQUFBLDZEQUFBO1VBQUE7VUFBQSxvQ0FBQTtvQ0FBQTtVQUFBLGFBQThELDJDQUMxRDtVQUFBO2NBQUE7Y0FBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtVQUFBLHlEQUFBO1VBQUEsb0VBQUE7VUFBQSxpRUFBMkY7aUJBQUEsZ0NBQ3ZGO1VBQUE7VUFBQSxnQkFBTSx5Q0FBVztVQUFBLHlCQUNqQiwyQ0FDSjtpQkFBQTtjQUFBO2NBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQSx5REFBQTtVQUFBLG9FQUFBO1VBQUEsaUVBQXFGO2lCQUFBLGdDQUNqRjtVQUFBO1VBQUEsZ0JBQU0sK0NBQWlCO1VBQUEseUJBQ3ZCLDJDQUNKO2lCQUFBO2NBQUE7Y0FBQTtrQkFBQTtjQUFBO1lBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBZ0I7Y0FBQTtjQUFBO1lBQUE7WUFBaEI7VUFBQSx5REFBQTtVQUFBLG9FQUFBO1VBQUEsaUVBQXlDO2lCQUFBLGdDQUNyQztVQUFBO1VBQUEsZ0JBQU0sMkNBQWE7VUFBQSx5QkFDbkIsdUNBQ0U7aUJBQUEsZ0NBQ1I7TUFDTjtVQUFBO1VBQUE7WUFBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFLSTtjQUFBO2NBQUE7WUFBQTtZQUxKO1VBQUE7YUFBQTtVQUFBO2NBQUEsMkNBSzZEO1VBQUEsaUJBQzdCLDJDQUM5QjtVQUFBLGFBQ047VUFBQTs2Q0FBQSxVQUFBO1VBQUE7Ozs4R0FBQTtVQUFBLDZCQUFxQyx1Q0FDaEM7aUJBQUE7O0lBN0JnRTtJQUE3RCxXQUE2RCxTQUE3RDtJQUlvQztJQUFwQyxZQUFvQyxTQUFwQztJQUN5RDtJQUFyRCxZQUFxRCxTQUFyRDtJQUNBO0lBRW9CO0lBQXhCLFlBQXdCLFNBQXhCO0lBZUE7SUFDQTtJQUhBO0lBQ0E7SUFGSixZQUdJLFdBQ0EsV0FIQSxXQUNBLFVBRko7SUFRSjs7SUEvQmtCO0lBQXRCLFdBQXNCLFNBQXRCO0lBWWdCO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQSxZQUFBLGlEQUFBO0lBR0E7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBLFlBQUEsc0RBQUE7SUFHQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUEsWUFBQSxzREFBQTs7OztvQkNsQmhCO01BQUE7MENBQUEsVUFBQTtNQUFBO3dDQUFBO0lBQUE7Ozs7OyJ9
