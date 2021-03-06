/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './desktopMenu.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '@angular/router';
import * as i3 from '@angular/common';
import * as i4 from './menuItem.component.ngfactory';
import * as i5 from '../../../../../src/app/myAccount/menu/menuItem.component';
import * as i6 from '../../../../../src/app/myAccount/pipes/convertCase.pipe';
import * as i7 from '@angular/material/menu';
import * as i8 from '@angular/cdk/overlay';
import * as i9 from '@angular/cdk/bidi';
import * as i10 from '../../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i11 from '@angular/material/core';
import * as i12 from '@angular/material/icon';
import * as i13 from '../../../../node_modules/@angular/material/menu/typings/index.ngfactory';
import * as i14 from '../../../../../src/app/myAccount/menu/desktopMenu.component';
import * as i15 from '../maui/secondaryNavigation/secondaryNavigation.component.ngfactory';
import * as i16 from '../../../../../src/app/myAccount/maui/secondaryNavigation/secondaryNavigation.component';
import * as i17 from '@angular/http';
import * as i18 from '../../../../../src/app/shared/service/content.service';
import * as i19 from '../../../../../src/app/shared/service/api.service';
import * as i20 from '../../../../../src/app/myAccount/services/account.service';
import * as i21 from '../../../../../src/app/shared/service/config.service';
import * as i22 from '../../../../../src/app/myAccount/services/contract/isolarCheckOffer.service';
import * as i23 from '../../../../../src/app/myAccount/services/featureFlag.service';
import * as i24 from '../../../../../src/app/myAccount/rewards/services/contract/iRewardsEligibility.service';
import * as i25 from '../../../../../src/app/myAccount/services/contract/idecisioning.service';
import * as i26 from '../../../../../src/app/shared/service/contract/imessageBus.service';
import * as i27 from '../../../../../src/app/myAccount/services/contract/iauthenticationEvent.service';
import * as i28 from '../../../../../src/app/myAccount/services/secondaryNavigation.service';
import * as i29 from '../../../../../src/app/myAccount/pages/settings/homeProfile/homeProfileEligibility.service';
const styles_DesktopMenuComponent:any[] = [i0.styles];
export const RenderType_DesktopMenuComponent:i1.RendererType2 = i1.??crt({encapsulation:0,
    styles:styles_DesktopMenuComponent,data:{'animation':[{type:7,name:'loadedState',
        definitions:[{type:0,name:'hidden',styles:{type:6,styles:{opacity:'0',display:'none'},
            offset:(null as any)},options:(undefined as any)},{type:0,name:'shown',
            styles:{type:6,styles:{opacity:'1'},offset:(null as any)},options:(undefined as any)},
            {type:1,expr:'* => *',animation:{type:4,styles:(null as any),timings:'.2s'},
                options:(null as any)}],options:{}}]}});
function View_DesktopMenuComponent_1(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[(_l()(),i1.??eld(0,(null as any),(null as any),17,'li',([] as any[]),
      [[8,'id',0]],(null as any),(null as any),(null as any),(null as any))),i1.??did(1720320,
      (null as any),2,i2.RouterLinkActive,[i2.Router,i1.ElementRef,i1.Renderer2,i1.ChangeDetectorRef],
      {routerLinkActive:[0,'routerLinkActive']},(null as any)),i1.??qud(603979776,1,
      {links:1}),i1.??qud(603979776,2,{linksWithHrefs:1}),i1.??pad(1),i1.??ppd(1),(_l()(),
      i1.??ted((null as any),['\n                        '])),(_l()(),i1.??eld(0,(null as any),
      (null as any),9,'a',([] as any[]),[[1,'target',0],[8,'href',4]],[[(null as any),
          'click']],(_v,en,$event) => {
        var ad:boolean = true;
        if (('click' === en)) {
          const pd_0:any = ((<any>i1.??nov(_v,8).onClick($event.button,$event.ctrlKey,
              $event.metaKey,$event.shiftKey)) !== false);
          ad = (pd_0 && ad);
        }
        return ad;
      },(null as any),(null as any))),i1.??did(671744,[[2,4]],0,i2.RouterLinkWithHref,
      [i2.Router,i2.ActivatedRoute,i3.LocationStrategy],{queryParams:[0,'queryParams'],
          routerLink:[1,'routerLink']},(null as any)),i1.??pad(1),(_l()(),i1.??ted((null as any),
      ['\n                            '])),(_l()(),i1.??eld(0,(null as any),(null as any),
      4,'span',[['class','agl-desktop-header-menu__menu-item-text']],(null as any),
      (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.??ted((null as any),
      ['\n                                '])),(_l()(),i1.??eld(0,(null as any),(null as any),
      1,'agl-menu-item',([] as any[]),(null as any),(null as any),(null as any),i4.View_MenuItemComponent_0,
      i4.RenderType_MenuItemComponent)),i1.??did(49152,(null as any),0,i5.MenuItemComponent,
      ([] as any[]),{menuItem:[0,'menuItem']},(null as any)),(_l()(),i1.??ted((null as any),
      ['\n                            '])),(_l()(),i1.??ted((null as any),['\n                        '])),
      (_l()(),i1.??ted((null as any),['\n                    ']))],(_ck,_v) => {
    const currVal_1:any = _ck(_v,4,0,'router-link-active');
    _ck(_v,1,0,currVal_1);
    const currVal_4:any = i1.??EMPTY_MAP;
    const currVal_5:any = _ck(_v,9,0,((_v.context.$implicit == null)? (null as any): _v.context.$implicit.route));
    _ck(_v,8,0,currVal_4,currVal_5);
    const currVal_6:any = _v.context.$implicit;
    _ck(_v,14,0,currVal_6);
  },(_ck,_v) => {
    const currVal_0:any = i1.??inlineInterpolate(1,'agl-desktop-header-menu',i1.??unv(_v,
        0,0,_ck(_v,5,0,i1.??nov((<any>_v.parent),0),((_v.context.$implicit == null)? (null as any): _v.context.$implicit.route))),
        '');
    _ck(_v,0,0,currVal_0);
    const currVal_2:any = i1.??nov(_v,8).target;
    const currVal_3:any = i1.??nov(_v,8).href;
    _ck(_v,7,0,currVal_2,currVal_3);
  });
}
export function View_DesktopMenuComponent_0(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[i1.??pid(0,i6.ConvertCasePipe,([] as any[])),i1.??pid(0,i3.LowerCasePipe,
      ([] as any[])),(_l()(),i1.??eld(0,(null as any),(null as any),82,'div',[['class',
      'agl-desktop-wrapper desktop']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.??ted((null as any),['\n    '])),(_l()(),i1.??eld(0,
      (null as any),(null as any),75,'div',[['class','agl-menu agl-desktop-header']],
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.??ted((null as any),['\n        '])),(_l()(),i1.??eld(0,(null as any),(null as any),
      72,'div',[['class','agl-desktop-header__container']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.??ted((null as any),['\n            '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),6,'div',[['class','agl-desktop-header-logo']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.??ted((null as any),['\n                '])),(_l()(),i1.??eld(0,(null as any),
          (null as any),3,'a',[['href','https://www.agl.com.au'],['target','_blank']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.??ted((null as any),['\n                    '])),(_l()(),i1.??eld(0,
          (null as any),(null as any),0,'img',[['class','agl-logo'],['src','svg/icon-header-desktop.svg']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.??ted((null as any),['\n                '])),(_l()(),i1.??ted((null as any),
          ['\n            '])),(_l()(),i1.??ted((null as any),['\n            '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),7,'div',[['class','agl-desktop-header-menu']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.??ted((null as any),['\n                '])),(_l()(),i1.??eld(0,(null as any),
          (null as any),4,'ul',[['class','agl-desktop-header-menu__tabs']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.??ted((null as any),
          ['\n                    '])),(_l()(),i1.??and(16777216,(null as any),(null as any),
          1,(null as any),View_DesktopMenuComponent_1)),i1.??did(802816,(null as any),
          0,i3.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,i1.IterableDiffers],{ngForOf:[0,
              'ngForOf']},(null as any)),(_l()(),i1.??ted((null as any),['\n                '])),
      (_l()(),i1.??ted((null as any),['\n            '])),(_l()(),i1.??ted((null as any),
          ['\n            '])),(_l()(),i1.??eld(16777216,(null as any),(null as any),
          22,'div',[['aria-haspopup','true'],['class','agl-desktop-header-user']],
          (null as any),[[(null as any),'mousedown'],[(null as any),'keydown'],[(null as any),
              'click']],(_v,en,$event) => {
            var ad:boolean = true;
            if (('mousedown' === en)) {
              const pd_0:any = ((<any>i1.??nov(_v,26)._handleMousedown($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('keydown' === en)) {
              const pd_1:any = ((<any>i1.??nov(_v,26)._handleKeydown($event)) !== false);
              ad = (pd_1 && ad);
            }
            if (('click' === en)) {
              const pd_2:any = ((<any>i1.??nov(_v,26)._handleClick($event)) !== false);
              ad = (pd_2 && ad);
            }
            return ad;
          },(null as any),(null as any))),i1.??did(4341760,(null as any),0,i7.MdMenuTrigger,
          [i8.Overlay,i1.ElementRef,i1.ViewContainerRef,i7.MD_MENU_SCROLL_STRATEGY,
              [2,i7.MdMenu],[8,(null as any)],[2,i9.Directionality]],{menu:[0,'menu']},
          (null as any)),(_l()(),i1.??ted((null as any),['\n                '])),(_l()(),
          i1.??ted((null as any),['\n                '])),(_l()(),i1.??eld(0,(null as any),
          (null as any),2,'md-icon',[['class','agl-desktop-header-user__person-icon mat-icon'],
              ['role','img'],['svgIcon','icon-person']],(null as any),(null as any),
          (null as any),i10.View_MdIcon_0,i10.RenderType_MdIcon)),i1.??did(16384,(null as any),
          0,i11.MdPrefixRejector,[[2,i11.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
          (null as any),(null as any)),i1.??did(638976,(null as any),0,i12.MdIcon,[i1.Renderer2,
          i1.ElementRef,i12.MdIconRegistry,[8,(null as any)]],{svgIcon:[0,'svgIcon']},
          (null as any)),(_l()(),i1.??ted((null as any),['\n                '])),(_l()(),
          i1.??eld(0,(null as any),(null as any),4,'span',[['class','agl-desktop-header-user__name']],
              [[2,'hide',(null as any)]],(null as any),(null as any),(null as any),
              (null as any))),i1.??pid(131072,i3.AsyncPipe,[i1.ChangeDetectorRef]),
      (_l()(),i1.??ted((null as any),['Hi ',''])),i1.??pid(131072,i3.AsyncPipe,[i1.ChangeDetectorRef]),
      i1.??ppd(1),(_l()(),i1.??ted((null as any),['\n                '])),(_l()(),i1.??eld(0,
          (null as any),(null as any),2,'span',[['class','agl-desktop-header-user__name']],
          [[2,'hide',(null as any)]],(null as any),(null as any),(null as any),(null as any))),
      i1.??pid(131072,i3.AsyncPipe,[i1.ChangeDetectorRef]),(_l()(),i1.??ted((null as any),
          ['Loading...'])),(_l()(),i1.??ted((null as any),['\n                '])),
      (_l()(),i1.??eld(0,(null as any),(null as any),3,'md-icon',[['class','agl-desktop-header-user__dropdown-icon mat-icon'],
          ['role','img']],(null as any),(null as any),(null as any),i10.View_MdIcon_0,
          i10.RenderType_MdIcon)),i1.??did(16384,(null as any),0,i11.MdPrefixRejector,
          [[2,i11.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],(null as any),(null as any)),
      i1.??did(638976,(null as any),0,i12.MdIcon,[i1.Renderer2,i1.ElementRef,i12.MdIconRegistry,
          [8,(null as any)]],(null as any),(null as any)),(_l()(),i1.??ted(0,['arrow_drop_down'])),
      (_l()(),i1.??ted((null as any),['\n            '])),(_l()(),i1.??ted((null as any),
          ['\n            '])),(_l()(),i1.??eld(0,(null as any),(null as any),28,'md-menu',
          [['class','agl-header-dropdown-menu']],(null as any),(null as any),(null as any),
          i13.View_MdMenu_0,i13.RenderType_MdMenu)),i1.??did(16384,(null as any),0,
          i11.MdPrefixRejector,[[2,i11.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
          (null as any),(null as any)),i1.??did(1228800,[['menu',4]],1,i7.MdMenu,[i1.ElementRef,
          i7.MD_MENU_DEFAULT_OPTIONS],{overlapTrigger:[0,'overlapTrigger'],classList:[1,
          'classList']},(null as any)),i1.??qud(603979776,3,{items:1}),(_l()(),i1.??ted(0,
          ['\n                '])),(_l()(),i1.??eld(0,(null as any),0,6,'a',[['class',
          'mat-menu-item'],['href','https://www.agl.com.au/residential/help-and-support'],
          ['md-menu-item',''],['role','menuitem'],['target','_blank']],[[2,'mat-menu-item-highlighted',
          (null as any)],[2,'mat-menu-item-submenu-trigger',(null as any)],[1,'tabindex',
          0],[1,'aria-disabled',0],[1,'disabled',0]],[[(null as any),'click'],[(null as any),
          'mouseenter']],(_v,en,$event) => {
        var ad:boolean = true;
        if (('click' === en)) {
          const pd_0:any = ((<any>i1.??nov(_v,55)._checkDisabled($event)) !== false);
          ad = (pd_0 && ad);
        }
        if (('mouseenter' === en)) {
          const pd_1:any = ((<any>i1.??nov(_v,55)._emitHoverEvent()) !== false);
          ad = (pd_1 && ad);
        }
        return ad;
      },i13.View_MdMenuItem_0,i13.RenderType_MdMenuItem)),i1.??did(180224,[[3,4]],0,
          i7.MdMenuItem,[i1.ElementRef],(null as any),(null as any)),i1.??prd(8448,
          (null as any),i11.MATERIAL_COMPATIBILITY_MODE,true,([] as any[])),(_l()(),
          i1.??ted(0,['\n                    '])),(_l()(),i1.??eld(0,(null as any),0,
          1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.??ted((null as any),['Help'])),(_l()(),i1.??ted(0,
          ['\n                '])),(_l()(),i1.??ted(0,['\n                '])),(_l()(),
          i1.??eld(0,(null as any),0,6,'a',[['class','mat-menu-item'],['href','https://www.agl.com.au/residential/contact-us'],
              ['md-menu-item',''],['role','menuitem'],['target','_blank']],[[2,'mat-menu-item-highlighted',
              (null as any)],[2,'mat-menu-item-submenu-trigger',(null as any)],[1,
              'tabindex',0],[1,'aria-disabled',0],[1,'disabled',0]],[[(null as any),
              'click'],[(null as any),'mouseenter']],(_v,en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i1.??nov(_v,63)._checkDisabled($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('mouseenter' === en)) {
              const pd_1:any = ((<any>i1.??nov(_v,63)._emitHoverEvent()) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i13.View_MdMenuItem_0,i13.RenderType_MdMenuItem)),i1.??did(180224,[[3,4]],
          0,i7.MdMenuItem,[i1.ElementRef],(null as any),(null as any)),i1.??prd(8448,
          (null as any),i11.MATERIAL_COMPATIBILITY_MODE,true,([] as any[])),(_l()(),
          i1.??ted(0,['\n                    '])),(_l()(),i1.??eld(0,(null as any),0,
          1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.??ted((null as any),['Contact Us'])),(_l()(),i1.??ted(0,
          ['\n                '])),(_l()(),i1.??ted(0,['\n                '])),(_l()(),
          i1.??eld(0,(null as any),0,6,'a',[['class','mat-menu-item'],['md-menu-item',
              ''],['role','menuitem']],[[2,'mat-menu-item-highlighted',(null as any)],
              [2,'mat-menu-item-submenu-trigger',(null as any)],[1,'tabindex',0],[1,
                  'aria-disabled',0],[1,'disabled',0]],[[(null as any),'click'],[(null as any),
              'mouseenter']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i14.DesktopMenuComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>i1.??nov(_v,71)._checkDisabled($event)) !== false);
              ad = (pd_0 && ad);
            }
            if (('mouseenter' === en)) {
              const pd_1:any = ((<any>i1.??nov(_v,71)._emitHoverEvent()) !== false);
              ad = (pd_1 && ad);
            }
            if (('click' === en)) {
              const pd_2:any = ((<any>_co.logout($event)) !== false);
              ad = (pd_2 && ad);
            }
            return ad;
          },i13.View_MdMenuItem_0,i13.RenderType_MdMenuItem)),i1.??did(180224,[[3,4]],
          0,i7.MdMenuItem,[i1.ElementRef],(null as any),(null as any)),i1.??prd(8448,
          (null as any),i11.MATERIAL_COMPATIBILITY_MODE,true,([] as any[])),(_l()(),
          i1.??ted(0,['\n                    '])),(_l()(),i1.??eld(0,(null as any),0,
          1,'span',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.??ted((null as any),['Logout'])),(_l()(),i1.??ted(0,
          ['\n                '])),(_l()(),i1.??ted(0,['\n            '])),(_l()(),
          i1.??ted((null as any),['\n        '])),(_l()(),i1.??ted((null as any),['\n    '])),
      (_l()(),i1.??ted((null as any),['\n    '])),(_l()(),i1.??eld(0,(null as any),(null as any),
          2,'agl-maui-secondary-navigation',([] as any[]),(null as any),[[(null as any),
              'clicked'],['window','scroll']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i14.DesktopMenuComponent = _v.component;
            if (('window:scroll' === en)) {
              const pd_0:any = ((<any>i1.??nov(_v,82).onWindowScroll()) !== false);
              ad = (pd_0 && ad);
            }
            if (('clicked' === en)) {
              const pd_1:any = ((<any>_co.secondaryNavigationService.backClick($event)) !== false);
              ad = (pd_1 && ad);
            }
            return ad;
          },i15.View_MauiSecondaryNavigationComponent_0,i15.RenderType_MauiSecondaryNavigationComponent)),
      i1.??did(49152,(null as any),0,i16.MauiSecondaryNavigationComponent,([] as any[]),
          {text:[0,'text'],textMobile:[1,'textMobile'],display:[2,'display'],displayBackButton:[3,
              'displayBackButton']},{clicked:'clicked'}),(_l()(),i1.??ted((null as any),
          ['\n    '])),(_l()(),i1.??ted((null as any),['\n'])),(_l()(),i1.??ted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:i14.DesktopMenuComponent = _v.component;
    const currVal_0:any = _co.mainMenu;
    _ck(_v,21,0,currVal_0);
    const currVal_1:any = i1.??nov(_v,51);
    _ck(_v,26,0,currVal_1);
    const currVal_2:any = 'icon-person';
    _ck(_v,31,0,currVal_2);
    _ck(_v,45,0);
    const currVal_6:any = false;
    const currVal_7:any = 'agl-header-dropdown-menu';
    _ck(_v,51,0,currVal_6,currVal_7);
    const currVal_23:any = _co.secondaryNavigationService.desktopText;
    const currVal_24:any = _co.secondaryNavigationService.mobileText;
    const currVal_25:any = _co.secondaryNavigationService.display;
    const currVal_26:any = _co.secondaryNavigationService.displayBack;
    _ck(_v,82,0,currVal_23,currVal_24,currVal_25,currVal_26);
  },(_ck,_v) => {
    var _co:i14.DesktopMenuComponent = _v.component;
    const currVal_3:boolean = !i1.??unv(_v,33,0,i1.??nov(_v,34).transform(_co.name));
    _ck(_v,33,0,currVal_3);
    var tmp_4_0:any = (null as any);
    const currVal_4:any = i1.??unv(_v,35,0,_ck(_v,37,0,i1.??nov(_v,1),(((tmp_4_0 = i1.??unv(_v,
        35,0,i1.??nov(_v,36).transform(_co.name))) == null)? (null as any): tmp_4_0.firstName)));
    _ck(_v,35,0,currVal_4);
    const currVal_5:any = i1.??unv(_v,39,0,i1.??nov(_v,40).transform(_co.name));
    _ck(_v,39,0,currVal_5);
    const currVal_8:any = i1.??nov(_v,55)._highlighted;
    const currVal_9:any = i1.??nov(_v,55)._triggersSubmenu;
    const currVal_10:any = i1.??nov(_v,55)._getTabIndex();
    const currVal_11:any = i1.??nov(_v,55).disabled.toString();
    const currVal_12:any = (i1.??nov(_v,55).disabled || (null as any));
    _ck(_v,54,0,currVal_8,currVal_9,currVal_10,currVal_11,currVal_12);
    const currVal_13:any = i1.??nov(_v,63)._highlighted;
    const currVal_14:any = i1.??nov(_v,63)._triggersSubmenu;
    const currVal_15:any = i1.??nov(_v,63)._getTabIndex();
    const currVal_16:any = i1.??nov(_v,63).disabled.toString();
    const currVal_17:any = (i1.??nov(_v,63).disabled || (null as any));
    _ck(_v,62,0,currVal_13,currVal_14,currVal_15,currVal_16,currVal_17);
    const currVal_18:any = i1.??nov(_v,71)._highlighted;
    const currVal_19:any = i1.??nov(_v,71)._triggersSubmenu;
    const currVal_20:any = i1.??nov(_v,71)._getTabIndex();
    const currVal_21:any = i1.??nov(_v,71).disabled.toString();
    const currVal_22:any = (i1.??nov(_v,71).disabled || (null as any));
    _ck(_v,70,0,currVal_18,currVal_19,currVal_20,currVal_21,currVal_22);
  });
}
export function View_DesktopMenuComponent_Host_0(_l:any):i1.??ViewDefinition {
  return i1.??vid(0,[(_l()(),i1.??eld(0,(null as any),(null as any),1,'agl-desktop-menu',
      ([] as any[]),(null as any),(null as any),(null as any),View_DesktopMenuComponent_0,
      RenderType_DesktopMenuComponent)),i1.??did(114688,(null as any),0,i14.DesktopMenuComponent,
      [i17.Http,i18.ContentService,i19.ApiService,i2.Router,i20.IAccountServiceMA,
          i21.ConfigService,i22.ISolarCheckOfferService,i23.FeatureFlagService,i24.IRewardsEligibilityService,
          i25.IDecisioningService,i26.IMessageBusService,i27.IAuthenticationEventService,
          i28.SecondaryNavigationService,i29.HomeProfileEligibilityService],(null as any),
      (null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const DesktopMenuComponentNgFactory:i1.ComponentFactory<i14.DesktopMenuComponent> = i1.??ccf('agl-desktop-menu',
    i14.DesktopMenuComponent,View_DesktopMenuComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9tZW51L2Rlc2t0b3BNZW51LmNvbXBvbmVudC5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L21lbnUvZGVza3RvcE1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9tZW51L2Rlc2t0b3BNZW51LmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9tZW51L2Rlc2t0b3BNZW51LmNvbXBvbmVudC50cy5EZXNrdG9wTWVudUNvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxkaXYgY2xhc3M9XCJhZ2wtZGVza3RvcC13cmFwcGVyIGRlc2t0b3BcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJhZ2wtbWVudSBhZ2wtZGVza3RvcC1oZWFkZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWdsLWRlc2t0b3AtaGVhZGVyX19jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnbC1kZXNrdG9wLWhlYWRlci1sb2dvXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cuYWdsLmNvbS5hdVwiIHRhcmdldD1cIl9ibGFua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJhZ2wtbG9nb1wiIHNyYz1cInN2Zy9pY29uLWhlYWRlci1kZXNrdG9wLnN2Z1wiPlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnbC1kZXNrdG9wLWhlYWRlci1tZW51XCI+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJhZ2wtZGVza3RvcC1oZWFkZXItbWVudV9fdGFic1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBtYWluTWVudVwiIGlkPVwiYWdsLWRlc2t0b3AtaGVhZGVyLW1lbnV7e2l0ZW0/LnJvdXRlIHwgYWdsQ29udmVydENhc2V9fVwiIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIlsncm91dGVyLWxpbmstYWN0aXZlJ11cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiW2l0ZW0/LnJvdXRlXVwiIFtxdWVyeVBhcmFtc109XCJ7fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZ2wtZGVza3RvcC1oZWFkZXItbWVudV9fbWVudS1pdGVtLXRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YWdsLW1lbnUtaXRlbSBbbWVudUl0ZW1dPVwiaXRlbVwiPjwvYWdsLW1lbnUtaXRlbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnbC1kZXNrdG9wLWhlYWRlci11c2VyXCIgW21kTWVudVRyaWdnZXJGb3JdPVwibWVudVwiPlxyXG4gICAgICAgICAgICAgICAgPCEtLTxtZC1pY29uIGNsYXNzPVwiYWdsLWRlc2t0b3AtaGVhZGVyLXVzZXJfX2ljb25cIj5wZXJzb248L21kLWljb24+LS0+XHJcbiAgICAgICAgICAgICAgICA8bWQtaWNvbiBjbGFzcz1cImFnbC1kZXNrdG9wLWhlYWRlci11c2VyX19wZXJzb24taWNvblwiIHN2Z0ljb249XCJpY29uLXBlcnNvblwiPjwvbWQtaWNvbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWdsLWRlc2t0b3AtaGVhZGVyLXVzZXJfX25hbWVcIiBbY2xhc3MuaGlkZV09XCIhKG5hbWUgfCBhc3luYylcIj5IaSB7eyhuYW1lIHwgYXN5bmMpPy5maXJzdE5hbWUgfCBsb3dlcmNhc2V9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWdsLWRlc2t0b3AtaGVhZGVyLXVzZXJfX25hbWVcIiBbY2xhc3MuaGlkZV09XCIobmFtZSB8IGFzeW5jKVwiPkxvYWRpbmcuLi48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8bWQtaWNvbiBjbGFzcz1cImFnbC1kZXNrdG9wLWhlYWRlci11c2VyX19kcm9wZG93bi1pY29uXCI+YXJyb3dfZHJvcF9kb3duPC9tZC1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPG1kLW1lbnUgI21lbnU9XCJtZE1lbnVcIiBbb3ZlcmxhcFRyaWdnZXJdPVwiZmFsc2VcIiBjbGFzcz1cImFnbC1oZWFkZXItZHJvcGRvd24tbWVudVwiPlxyXG4gICAgICAgICAgICAgICAgPGEgbWQtbWVudS1pdGVtIGhyZWY9XCJodHRwczovL3d3dy5hZ2wuY29tLmF1L3Jlc2lkZW50aWFsL2hlbHAtYW5kLXN1cHBvcnRcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5IZWxwPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPGEgbWQtbWVudS1pdGVtIGhyZWY9XCJodHRwczovL3d3dy5hZ2wuY29tLmF1L3Jlc2lkZW50aWFsL2NvbnRhY3QtdXNcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Db250YWN0IFVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPGEgbWQtbWVudS1pdGVtIChjbGljayk9XCJsb2dvdXQoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkxvZ291dDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPC9tZC1tZW51PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8YWdsLW1hdWktc2Vjb25kYXJ5LW5hdmlnYXRpb25cclxuICAgICAgICBbZGlzcGxheV09XCJzZWNvbmRhcnlOYXZpZ2F0aW9uU2VydmljZS5kaXNwbGF5XCJcclxuICAgICAgICBbZGlzcGxheUJhY2tCdXR0b25dPVwic2Vjb25kYXJ5TmF2aWdhdGlvblNlcnZpY2UuZGlzcGxheUJhY2tcIlxyXG4gICAgICAgIFt0ZXh0XT1cInNlY29uZGFyeU5hdmlnYXRpb25TZXJ2aWNlLmRlc2t0b3BUZXh0XCJcclxuICAgICAgICBbdGV4dE1vYmlsZV09XCJzZWNvbmRhcnlOYXZpZ2F0aW9uU2VydmljZS5tb2JpbGVUZXh0XCJcclxuICAgICAgICAoY2xpY2tlZCk9XCJzZWNvbmRhcnlOYXZpZ2F0aW9uU2VydmljZS5iYWNrQ2xpY2soJGV2ZW50KVwiPlxyXG4gICAgPC9hZ2wtbWF1aS1zZWNvbmRhcnktbmF2aWdhdGlvbj5cclxuPC9kaXY+XHJcbiIsIjxhZ2wtZGVza3RvcC1tZW51PjwvYWdsLWRlc2t0b3AtbWVudT4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNVb0I7TUFBQSw4RUFBQTtNQUFBO01BQUE7TUFBQSwwREFBK0YsV0FBN0QsSUFBeUc7YUFBQSxnREFDdkk7TUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO2NBQUE7VUFBQTtRQUFBO1FBQUE7TUFBQSx1Q0FBQTtNQUFBO1VBQUEsbURBQUcsSUFBZ0Q7TUFBQSxxQ0FDL0M7TUFBQTtNQUFBLDBEQUFzRDtNQUFBLHlDQUNsRDtNQUFBO3FDQUFBLFVBQUE7TUFBQSx1REFBaUQ7TUFBQSxxQ0FDOUM7TUFDUDtJ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
