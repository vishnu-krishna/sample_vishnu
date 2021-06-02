/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './bills.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../node_modules/@angular/material/icon/typings/index.ngfactory';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/material/icon';
import * as i5 from '@angular/common';
import * as i6 from '../../dashboard/fuelTitle/fuelTitle.component.ngfactory';
import * as i7 from '../../../../../../src/app/myAccount/dashboard/fuelTitle/fuelTitle.component';
import * as i8 from './billPanel/billPanel.component.ngfactory';
import * as i9 from '../../../../../../src/app/myAccount/pages/bills/billPanel/billPanel.component';
import * as i10 from '../../../../../../src/app/myAccount/modal/modal.service';
import * as i11 from '../../../../../../src/app/shared/service/now.service';
import * as i12 from '../../../../../../src/app/myAccount/services/event.service';
import * as i13 from '../../../../../../src/app/shared/service/redLineApi.service';
import * as i14 from '../../../../../../src/app/myAccount/services/payment.service';
import * as i15 from '../../../../../../src/app/shared/messages/alertMessages';
import * as i16 from '../../../../../../src/app/myAccount/services/paymentScheme/paymentExtensionApplication.service';
import * as i17 from '../../../../../../src/app/myAccount/pages/bills/paymentAssistance/extend/services/paymentExtensionState.service';
import * as i18 from '../../../../../../src/app/myAccount/pages/bills/paymentAssistance/extend/eligibility/services/paymentExtensionFuelChip.service';
import * as i19 from '../../../../../../src/app/myAccount/services/featureFlag.service';
import * as i20 from '@angular/router';
import * as i21 from '../../../../../../src/app/myAccount/services/paymentScheme/paymentAssistanceChoose.service';
import * as i22 from '../../billhistory/billhistory.component.ngfactory';
import * as i23 from '../../../../../../src/app/myAccount/billhistory/billhistory.component';
import * as i24 from './billsButtonStack/billsButtonStack.component.ngfactory';
import * as i25 from '../../../../../../src/app/myAccount/pages/bills/billsButtonStack/billsButtonStack.component';
import * as i26 from '../../../../../../src/app/myAccount/services/account.service';
import * as i27 from '../../../../../../src/app/myAccount/services/contract/issmr.service';
import * as i28 from '../../../../../../src/app/myAccount/services/monthlyBilling.service';
import * as i29 from '../../../../../../src/app/shared/service/config.service';
import * as i30 from '../../dashboard/offerTile/offerTile.component.ngfactory';
import * as i31 from '../../../../../../src/app/myAccount/dashboard/offerTile/offerTile.component';
import * as i32 from '../../../../../../src/app/myAccount/services/contract/idecisioningApi.service';
import * as i33 from '../../dashboard/marketingTile/marketingTile.component.ngfactory';
import * as i34 from '../../../../../../src/app/myAccount/dashboard/marketingTile/marketingTile.component';
import * as i35 from '../../../../../../src/app/shared/service/content.service';
import * as i36 from '../../../../../../src/app/myAccount/pipes/addSpaces.pipe';
import * as i37 from '../../backToTop/backToTop.component.ngfactory';
import * as i38 from '../../../../../../src/app/myAccount/backToTop/backToTop.component';
import * as i39 from '../../../../../../src/app/myAccount/pages/bills/bills.component';
import * as i40 from '../../../../../../src/app/shared/service/document.service';
const styles_BillsComponent:any[] = [i0.styles];
export const RenderType_BillsComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_BillsComponent,data:{}});
function View_BillsComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class',
      'contract-state-pill__inactive']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['Inactive account']))],
      (null as any),(null as any));
}
function View_BillsComponent_5(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),2,'md-icon',[['class',
      'elec mat-icon'],['role','img'],['svgIcon','icon-elec-enabled']],(null as any),
      (null as any),(null as any),i2.View_MdIcon_0,i2.RenderType_MdIcon)),i1.ɵdid(16384,
      (null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
      (null as any),(null as any)),i1.ɵdid(638976,(null as any),0,i4.MdIcon,[i1.Renderer2,
      i1.ElementRef,i4.MdIconRegistry,[8,(null as any)]],{svgIcon:[0,'svgIcon']},(null as any))],
      (_ck,_v) => {
        const currVal_0:any = 'icon-elec-enabled';
        _ck(_v,2,0,currVal_0);
      },(null as any));
}
function View_BillsComponent_6(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),2,'md-icon',[['class',
      'gas mat-icon'],['role','img'],['svgIcon','icon-gas-enabled']],(null as any),
      (null as any),(null as any),i2.View_MdIcon_0,i2.RenderType_MdIcon)),i1.ɵdid(16384,
      (null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
      (null as any),(null as any)),i1.ɵdid(638976,(null as any),0,i4.MdIcon,[i1.Renderer2,
      i1.ElementRef,i4.MdIconRegistry,[8,(null as any)]],{svgIcon:[0,'svgIcon']},(null as any))],
      (_ck,_v) => {
        const currVal_0:any = 'icon-gas-enabled';
        _ck(_v,2,0,currVal_0);
      },(null as any));
}
function View_BillsComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),7,'span',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n                        '])),(_l()(),i1.ɵand(16777216,
      (null as any),(null as any),1,(null as any),View_BillsComponent_5)),i1.ɵdid(16384,
      (null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
      (null as any)),(_l()(),i1.ɵted((null as any),['\n                        '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillsComponent_6)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                    ']))],
      (_ck,_v) => {
        const currVal_0:any = _v.context.$implicit.isElectricity;
        _ck(_v,3,0,currVal_0);
        const currVal_1:any = _v.context.$implicit.isGas;
        _ck(_v,6,0,currVal_1);
      },(null as any));
}
function View_BillsComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),14,'div',[['class',
      'address-header']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),8,'div',[['class','number']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['Account no: ',
          '\n                    '])),i1.ɵppd(1),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_BillsComponent_3)),i1.ɵdid(16384,(null as any),
          0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_BillsComponent_4)),i1.ɵdid(802816,
          (null as any),0,i5.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,i1.IterableDiffers],
          {ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'div',[['class','address']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['',''])),(_l()(),i1.ɵted((null as any),['\n            ']))],(_ck,_v) => {
    const currVal_1:any = (<any>_v.parent).context.$implicit.allContractsAreRestricted;
    _ck(_v,6,0,currVal_1);
    const currVal_2:any = (<any>_v.parent).context.$implicit.contracts;
    _ck(_v,9,0,currVal_2);
  },(_ck,_v) => {
    const currVal_0:any = i1.ɵunv(_v,3,0,_ck(_v,4,0,i1.ɵnov((<any>(<any>_v.parent).parent),
        0),(<any>_v.parent).context.$implicit.accountNumber));
    _ck(_v,3,0,currVal_0);
    const currVal_3:any = (<any>_v.parent).context.$implicit.groupedAddress;
    _ck(_v,13,0,currVal_3);
  });
}
function View_BillsComponent_9(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),2,'md-icon',[['class',
      'elec mat-icon'],['role','img'],['svgIcon','icon-elec-enabled']],(null as any),
      (null as any),(null as any),i2.View_MdIcon_0,i2.RenderType_MdIcon)),i1.ɵdid(16384,
      (null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
      (null as any),(null as any)),i1.ɵdid(638976,(null as any),0,i4.MdIcon,[i1.Renderer2,
      i1.ElementRef,i4.MdIconRegistry,[8,(null as any)]],{svgIcon:[0,'svgIcon']},(null as any))],
      (_ck,_v) => {
        const currVal_0:any = 'icon-elec-enabled';
        _ck(_v,2,0,currVal_0);
      },(null as any));
}
function View_BillsComponent_10(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),2,'md-icon',[['class',
      'gas mat-icon'],['role','img'],['svgIcon','icon-gas-enabled']],(null as any),
      (null as any),(null as any),i2.View_MdIcon_0,i2.RenderType_MdIcon)),i1.ɵdid(16384,
      (null as any),0,i3.MdPrefixRejector,[[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],
      (null as any),(null as any)),i1.ɵdid(638976,(null as any),0,i4.MdIcon,[i1.Renderer2,
      i1.ElementRef,i4.MdIconRegistry,[8,(null as any)]],{svgIcon:[0,'svgIcon']},(null as any))],
      (_ck,_v) => {
        const currVal_0:any = 'icon-gas-enabled';
        _ck(_v,2,0,currVal_0);
      },(null as any));
}
function View_BillsComponent_11(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class',
      'contract-state-pill__inactive']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['Inactive account']))],
      (null as any),(null as any));
}
function View_BillsComponent_8(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),17,'div',[['class',
      'address-header']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),11,'div',[['class','number']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                        Account no: ','\n                        '])),
      i1.ɵppd(1),(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),
          View_BillsComponent_9)),i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,
          i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n                        '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_BillsComponent_10)),i1.ɵdid(16384,(null as any),
          0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n                        '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_BillsComponent_11)),i1.ɵdid(16384,
          (null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'div',[['class','address']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['',''])),(_l()(),i1.ɵted((null as any),['\n                ']))],(_ck,_v) => {
    const currVal_1:any = (<any>_v.parent).context.$implicit.isElectricity;
    _ck(_v,6,0,currVal_1);
    const currVal_2:any = (<any>_v.parent).context.$implicit.isGas;
    _ck(_v,9,0,currVal_2);
    const currVal_3:any = (<any>(<any>_v.parent).parent).context.$implicit.allContractsAreRestricted;
    _ck(_v,12,0,currVal_3);
  },(_ck,_v) => {
    const currVal_0:any = i1.ɵunv(_v,3,0,_ck(_v,4,0,i1.ɵnov((<any>(<any>(<any>_v.parent).parent).parent),
        0),(<any>(<any>_v.parent).parent).context.$implicit.accountNumber));
    _ck(_v,3,0,currVal_0);
    const currVal_4:any = (<any>_v.parent).context.$implicit.address;
    _ck(_v,16,0,currVal_4);
  });
}
function View_BillsComponent_12(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'contract-fuel__inactive']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['Inactive']))],(null as any),
      (null as any));
}
function View_BillsComponent_7(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),22,'div',[['class',
      'contract-container']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),
      i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillsComponent_8)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),16,'div',[['class','billing-container contract col-xs-12']],
          [[8,'id',0]],(null as any),(null as any),(null as any),(null as any))),(_l()(),
          i1.ɵted((null as any),['\n                    '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),10,'div',[['class','col-md-12 col-xs-12 no-pad']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          1,'agl-fuel-title',[['class','grouped-contract contract-fuel']],(null as any),
          (null as any),(null as any),i6.View_FuelTitleComponent_0,i6.RenderType_FuelTitleComponent)),
      i1.ɵdid(49152,(null as any),0,i7.FuelTitleComponent,([] as any[]),{contract:[0,
          'contract']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                        '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillsComponent_12)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n                        '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-bill-panel',([] as any[]),
          (null as any),(null as any),(null as any),i8.View_BillPanelComponent_0,i8.RenderType_BillPanelComponent)),
      i1.ɵdid(245760,(null as any),0,i9.BillPanelComponent,[i10.ModalService,i11.Now,
          i12.EventService,i13.RedLineApiService,i14.PaymentService,i15.AlertMessages,
          i16.IPaymentExtensionApplication,i17.IPaymentExtensionStateService,i18.IPaymentExtensionFuelChipService,
          i19.FeatureFlagService,i20.Router,i21.IPaymentAssistanceChooseService],{contract:[0,
          'contract'],address:[1,'address']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n                    '])),(_l()(),i1.ɵted((null as any),['\n                    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-bill-history',([] as any[]),
          (null as any),(null as any),(null as any),i22.View_BillhistoryComponent_0,
          i22.RenderType_BillhistoryComponent)),i1.ɵdid(114688,(null as any),0,i23.BillhistoryComponent,
          [i10.ModalService,i12.EventService,i11.Now,i13.RedLineApiService,i14.PaymentService,
              i10.ModalService],{contract:[0,'contract'],address:[1,'address']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵted((null as any),
          ['\n            ']))],(_ck,_v) => {
    const currVal_0:boolean = !(<any>_v.parent).context.$implicit.groupedAddress;
    _ck(_v,3,0,currVal_0);
    const currVal_2:any = _v.context.$implicit;
    _ck(_v,10,0,currVal_2);
    const currVal_3:any = (_v.context.$implicit.isRestricted && !(<any>_v.parent).context.$implicit.allContractsAreRestricted);
    _ck(_v,13,0,currVal_3);
    const currVal_4:any = _v.context.$implicit;
    const currVal_5:any = (<any>_v.parent).context.$implicit.groupedAddress;
    _ck(_v,16,0,currVal_4,currVal_5);
    const currVal_6:any = _v.context.$implicit;
    const currVal_7:any = (<any>_v.parent).context.$implicit.groupedAddress;
    _ck(_v,20,0,currVal_6,currVal_7);
  },(_ck,_v) => {
    const currVal_1:any = i1.ɵinlineInterpolate(1,'billing-container-',_v.context.$implicit.contractNumber,
        '');
    _ck(_v,5,0,currVal_1);
  });
}
function View_BillsComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',[['class',
      'account']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_BillsComponent_2)),i1.ɵdid(16384,
          (null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n\n            '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillsComponent_7)),
      i1.ɵdid(802816,(null as any),0,i5.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n        ']))],(_ck,_v) => {
    const currVal_0:any = _v.context.$implicit.groupedAddress;
    _ck(_v,3,0,currVal_0);
    const currVal_1:any = _v.context.$implicit.contracts;
    _ck(_v,6,0,currVal_1);
  },(null as any));
}
function View_BillsComponent_13(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',[['class',
      'col-md-12 col-xs-12 col-sm-6']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,
      (null as any),(null as any),1,'agl-bills-button-stack',([] as any[]),(null as any),
      (null as any),(null as any),i24.View_BillsButtonStackComponent_0,i24.RenderType_BillsButtonStackComponent)),
      i1.ɵdid(114688,(null as any),0,i25.BillsButtonStackComponent,[i19.FeatureFlagService,
          i26.AccountService,i27.ISsmrService,i28.MonthlyBillingService,i20.Router,
          i29.ConfigService],{isReadOnly:[0,'isReadOnly']},(null as any)),(_l()(),
          i1.ɵted((null as any),['\n        ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.isButtonStackReadOnly();
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
function View_BillsComponent_14(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-offer-tile',
      [['context','MyAccount_Billing_Page']],(null as any),(null as any),(null as any),
      i30.View_OfferTileComponent_0,i30.RenderType_OfferTileComponent)),i1.ɵdid(114688,
      (null as any),0,i31.OfferTileComponent,[i32.IDecisioningApiService],{context:[0,
          'context']},(null as any))],(_ck,_v) => {
    const currVal_0:any = 'MyAccount_Billing_Page';
    _ck(_v,1,0,currVal_0);
  },(null as any));
}
function View_BillsComponent_15(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-marketing-tile',
      ([] as any[]),(null as any),(null as any),(null as any),i33.View_MarketingTileComponent_0,
      i33.RenderType_MarketingTileComponent)),i1.ɵdid(114688,(null as any),0,i34.MarketingTileComponent,
      [i35.ContentService],(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export function View_BillsComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[i1.ɵpid(0,i36.AddSpacesPipe,([] as any[])),(_l()(),i1.ɵeld(0,(null as any),
      (null as any),25,'div',[['class','billing container']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',[['class','container col-md-9 col-sm-12 billing-left-panel'],
          ['id','billing-accounts']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_BillsComponent_1)),i1.ɵdid(802816,
          (null as any),0,i5.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,i1.IterableDiffers],
          {ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵted((null as any),['\n\n    '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),13,'div',[['class','container col-md-3 col-sm-12 billing-right-panel']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_BillsComponent_13)),i1.ɵdid(16384,(null as any),
          0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),7,'div',[['class','col-md-12 col-xs-12 col-sm-6 promo-area']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_BillsComponent_14)),i1.ɵdid(16384,
          (null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_BillsComponent_15)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),['\n\n    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-back-to-top',([] as any[]),
          (null as any),(null as any),(null as any),i37.View_BackToTopComponent_0,
          i37.RenderType_BackToTopComponent)),i1.ɵdid(49152,(null as any),0,i38.BackToTopComponent,
          ([] as any[]),(null as any),(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n\n'])),(_l()(),i1.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:i39.BillsComponent = _v.component;
    const currVal_0:any = _co.accounts;
    _ck(_v,6,0,currVal_0);
    const currVal_1:boolean = !_co.allContractsAreRestricted;
    _ck(_v,12,0,currVal_1);
    const currVal_2:any = _co.decisioningEnabled;
    _ck(_v,17,0,currVal_2);
    const currVal_3:any = _co.marketingTileEnabled;
    _ck(_v,20,0,currVal_3);
  },(null as any));
}
export function View_BillsComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-account-bills',
      ([] as any[]),(null as any),(null as any),(null as any),View_BillsComponent_0,
      RenderType_BillsComponent)),i1.ɵdid(114688,(null as any),0,i39.BillsComponent,
      [i26.IAccountServiceMA,i29.ConfigService,i40.DocumentService,i19.FeatureFlagService],
      (null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const BillsComponentNgFactory:i1.ComponentFactory<i39.BillsComponent> = i1.ɵccf('agl-account-bills',
    i39.BillsComponent,View_BillsComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9iaWxscy9iaWxscy5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9iaWxscy9iaWxscy5jb21wb25lbnQudHMiLCJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L3BhZ2VzL2JpbGxzL2JpbGxzLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9wYWdlcy9iaWxscy9iaWxscy5jb21wb25lbnQudHMuQmlsbHNDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCI8ZGl2IGNsYXNzPVwiYmlsbGluZyBjb250YWluZXJcIj5cclxuICAgIDxkaXYgaWQ9XCJiaWxsaW5nLWFjY291bnRzXCIgY2xhc3M9XCJjb250YWluZXIgY29sLW1kLTkgY29sLXNtLTEyIGJpbGxpbmctbGVmdC1wYW5lbFwiPlxyXG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGFjY291bnQgb2YgYWNjb3VudHNcIiBjbGFzcz1cImFjY291bnRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkZHJlc3MtaGVhZGVyXCIgKm5nSWY9XCJhY2NvdW50Lmdyb3VwZWRBZGRyZXNzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibnVtYmVyXCI+QWNjb3VudCBubzoge3thY2NvdW50LmFjY291bnROdW1iZXIgfCBhZ2xBZGRTcGFjZXN9fVxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYWNjb3VudC5hbGxDb250cmFjdHNBcmVSZXN0cmljdGVkXCIgY2xhc3M9XCJjb250cmFjdC1zdGF0ZS1waWxsX19pbmFjdGl2ZVwiPkluYWN0aXZlIGFjY291bnQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nRm9yPVwibGV0IGNvbnRyYWN0IG9mIGFjY291bnQuY29udHJhY3RzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtZC1pY29uICpuZ0lmPVwiY29udHJhY3QuaXNFbGVjdHJpY2l0eVwiIGNsYXNzPVwiZWxlY1wiIHN2Z0ljb249XCJpY29uLWVsZWMtZW5hYmxlZFwiPjwvbWQtaWNvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG1kLWljb24gKm5nSWY9XCJjb250cmFjdC5pc0dhc1wiIGNsYXNzPVwiZ2FzXCIgc3ZnSWNvbj1cImljb24tZ2FzLWVuYWJsZWRcIj48L21kLWljb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRkcmVzc1wiPnt7YWNjb3VudC5ncm91cGVkQWRkcmVzc319PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgY29udHJhY3Qgb2YgYWNjb3VudC5jb250cmFjdHNcIiBjbGFzcz1cImNvbnRyYWN0LWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkZHJlc3MtaGVhZGVyXCIgKm5nSWY9XCIhYWNjb3VudC5ncm91cGVkQWRkcmVzc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJudW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQWNjb3VudCBubzoge3thY2NvdW50LmFjY291bnROdW1iZXIgfCBhZ2xBZGRTcGFjZXN9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bWQtaWNvbiAqbmdJZj1cImNvbnRyYWN0LmlzRWxlY3RyaWNpdHlcIiBjbGFzcz1cImVsZWNcIiBzdmdJY29uPVwiaWNvbi1lbGVjLWVuYWJsZWRcIj48L21kLWljb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtZC1pY29uICpuZ0lmPVwiY29udHJhY3QuaXNHYXNcIiBjbGFzcz1cImdhc1wiIHN2Z0ljb249XCJpY29uLWdhcy1lbmFibGVkXCI+PC9tZC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFjY291bnQuYWxsQ29udHJhY3RzQXJlUmVzdHJpY3RlZFwiIGNsYXNzPVwiY29udHJhY3Qtc3RhdGUtcGlsbF9faW5hY3RpdmVcIj5JbmFjdGl2ZSBhY2NvdW50PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZGRyZXNzXCI+e3tjb250cmFjdC5hZGRyZXNzfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImJpbGxpbmctY29udGFpbmVyLXt7Y29udHJhY3QuY29udHJhY3ROdW1iZXJ9fVwiIGNsYXNzPVwiYmlsbGluZy1jb250YWluZXIgY29udHJhY3QgY29sLXhzLTEyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBjb2wteHMtMTIgbm8tcGFkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhZ2wtZnVlbC10aXRsZSBjbGFzcz1cImdyb3VwZWQtY29udHJhY3QgY29udHJhY3QtZnVlbFwiIFtjb250cmFjdF09XCJjb250cmFjdFwiPjwvYWdsLWZ1ZWwtdGl0bGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJjb250cmFjdC5pc1Jlc3RyaWN0ZWQgJiYgIWFjY291bnQuYWxsQ29udHJhY3RzQXJlUmVzdHJpY3RlZFwiIGNsYXNzPVwiY29udHJhY3QtZnVlbF9faW5hY3RpdmVcIj5JbmFjdGl2ZTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YWdsLWJpbGwtcGFuZWwgW2NvbnRyYWN0XT1cImNvbnRyYWN0XCIgW2FkZHJlc3NdPVwiYWNjb3VudC5ncm91cGVkQWRkcmVzc1wiPjwvYWdsLWJpbGwtcGFuZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGFnbC1iaWxsLWhpc3RvcnkgW2NvbnRyYWN0XT1cImNvbnRyYWN0XCIgW2FkZHJlc3NdPVwiYWNjb3VudC5ncm91cGVkQWRkcmVzc1wiPjwvYWdsLWJpbGwtaGlzdG9yeT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXIgY29sLW1kLTMgY29sLXNtLTEyIGJpbGxpbmctcmlnaHQtcGFuZWxcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGNvbC14cy0xMiBjb2wtc20tNlwiICpuZ0lmPVwiIWFsbENvbnRyYWN0c0FyZVJlc3RyaWN0ZWRcIj5cclxuICAgICAgICAgICAgPGFnbC1iaWxscy1idXR0b24tc3RhY2sgW2lzUmVhZE9ubHldPVwiaXNCdXR0b25TdGFja1JlYWRPbmx5KClcIj48L2FnbC1iaWxscy1idXR0b24tc3RhY2s+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBjb2wteHMtMTIgY29sLXNtLTYgcHJvbW8tYXJlYVwiPlxyXG4gICAgICAgICAgICA8YWdsLW9mZmVyLXRpbGUgKm5nSWY9XCJkZWNpc2lvbmluZ0VuYWJsZWRcIiBjb250ZXh0PVwiTXlBY2NvdW50X0JpbGxpbmdfUGFnZVwiPjwvYWdsLW9mZmVyLXRpbGU+XHJcbiAgICAgICAgICAgIDxhZ2wtbWFya2V0aW5nLXRpbGUgKm5nSWY9XCJtYXJrZXRpbmdUaWxlRW5hYmxlZFwiPjwvYWdsLW1hcmtldGluZy10aWxlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGFnbC1iYWNrLXRvLXRvcD48L2FnbC1iYWNrLXRvLXRvcD5cclxuXHJcbjwvZGl2PlxyXG4iLCI8YWdsLWFjY291bnQtYmlsbHM+PC9hZ2wtYWNjb3VudC1iaWxscz4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNLb0I7TUFBQTtNQUFBLDhCQUFzRjs7OztvQkFFbEY7TUFBQTtNQUFBLDJFQUFBO01BQUE7TUFBQSxvQ0FBQTtzQ0FBQTs7UUFBcUQ7UUFBckQsV0FBcUQsU0FBckQ7Ozs7b0JBQ0E7TUFBQTtNQUFBLDJFQUFBO01BQUE7TUFBQSxvQ0FBQTtzQ0FBQTs7UUFBNEM7UUFBNUMsV0FBNEMsU0FBNUM7Ozs7b0JBRko7TUFBQSx3RUFBaUQ7YUFBQSxnREFDN0M7TUFBQSwyRUFBQTtNQUFBO01BQUEsZUFBMkY7TUFDM0Y7YUFBQTtVQUFBLHdCQUFpRjs7UUFEeEU7UUFBVCxXQUFTLFNBQVQ7UUFDUztRQUFULFdBQVMsU0FBVDs7OztvQkFMWjtNQUFBO01BQTJELHVEQUN2RDtVQUFBO1VBQUEsOEJBQW9CO1VBQUEsdUNBQ2hCO1VBQUEsNkRBQUE7VUFBQTtNQUE2RywyREFDN0c7VUFBQSwyRUFBQTtVQUFBO1VBQUEsdUNBR087TUFDTCx1REFDTjtVQUFBO1VBQUEsNENBQXFCO1VBQUEsVUFBZ0M7SUFOM0M7SUFBTixXQUFNLFNBQU47SUFDTTtJQUFOLFdBQU0sU0FBTjs7SUFGZ0I7UUFBQTtJQUFBO0lBT0M7SUFBQTs7OztvQkFPYjtNQUFBO01BQUEsMkVBQUE7TUFBQTtNQUFBLG9DQUFBO3NDQUFBOztRQUFxRDtRQUFyRCxXQUFxRCxTQUFyRDs7OztvQkFDQTtNQUFBO01BQUEsMkVBQUE7TUFBQTtNQUFBLG9DQUFBO3NDQUFBOztRQUE0QztRQUE1QyxXQUE0QyxTQUE1Qzs7OztvQkFDQTtNQUFBO01BQUEsOEJBQXNGOzs7O29CQUw5RjtNQUFBO01BQTRELDJEQUN4RDtVQUFBO1VBQUEsMERBQW9CO1VBQUE7YUFBQSxJQUVoQjtVQUFBLCtCQUFBO3dCQUFBLG1DQUEyRjtVQUFBLGlDQUMzRjtVQUFBLDhEQUFBO1VBQUE7TUFBaUYsK0RBQ2pGO1VBQUEsNEVBQUE7VUFBQTtVQUFBLGVBQTZHO01BQzNHLDJEQUNOO1VBQUE7VUFBQSwwREFBcUI7VUFBQSxVQUEwQjtJQUpsQztJQUFULFdBQVMsU0FBVDtJQUNTO0lBQVQsV0FBUyxTQUFUO0lBQ007SUFBTixZQUFNLFNBQU47O0lBSmdCO1FBQUE7SUFBQTtJQU1DO0lBQUE7Ozs7b0JBS2pCO01BQUE7TUFBQSxnQkFBeUc7Ozs7b0JBYnJIO01BQUE7TUFBQSxnQkFBMkUsdURBQ3ZFO2FBQUE7YUFBQTtVQUFBLHdCQVFNO01BQ047VUFBQSx1RUFBcUc7aUJBQUEsNENBQ2pHO1VBQUE7VUFBQSwwREFBd0M7VUFBQSxpQ0FDcEM7VUFBQTtVQUFBO2FBQUE7VUFBQSw0QkFBOEY7TUFDOUY7YUFBQTtVQUFBLHdCQUF1SDtNQUN2SDtVQUFBO2FBQUE7OzsrRUFBQTtVQUFBLGtEQUEwRjtVQUFBLDZCQUN4RjtNQUNOO1VBQUE7NkNBQUEsVUFBQTtVQUFBOzhCQUFBO01BQThGLHVEQUM1RjtVQUFBO0lBaEJzQjtJQUE1QixXQUE0QixTQUE1QjtJQVcrRDtJQUF2RCxZQUF1RCxTQUF2RDtJQUNLO0lBQUwsWUFBSyxTQUFMO0lBQ2dCO0lBQXNCO0lBQXRDLFlBQWdCLFVBQXNCLFNBQXRDO0lBRWM7SUFBc0I7SUFBeEMsWUFBa0IsVUFBc0IsU0FBeEM7O0lBTkM7UUFBQTtJQUFMLFdBQUssU0FBTDs7OztvQkF0QlI7TUFBQTtNQUFzRCxtREFDbEQ7VUFBQSwyRUFBQTtVQUFBO1VBQUEsZUFTTSxxREFFTjtpQkFBQTthQUFBOzRCQUFBLHlDQWtCTTtVQUFBO0lBN0JzQjtJQUE1QixXQUE0QixTQUE1QjtJQVdLO0lBQUwsV0FBSyxTQUFMOzs7O29CQXVCSjtNQUFBO01BQUEsZ0JBQTZFLG1EQUN6RTtNQUFBO01BQUE7YUFBQTs7MkJBQUEsK0NBQXdGO2lCQUFBOztJQUFoRTtJQUF4QixXQUF3QixTQUF4Qjs7OztvQkFHQTtNQUFBO3FFQUFBLFVBQUE7TUFBQTtVQUFBO0lBQTJDO0lBQTNDLFdBQTJDLFNBQTNDOzs7O29CQUNBO01BQUE7MkNBQUEsVUFBQTtNQUFBO0lBQUE7Ozs7K0RBMUNaO01BQUE7TUFBQSw0Q0FBK0I7TUFDM0I7VUFBQTtVQUFBLGdCQUFtRiwrQ0FDL0U7VUFBQSwyRUFBQTtVQUFBO1VBQUEsdUNBK0JNO01BQ0osNkNBRU47VUFBQTtVQUFBO01BQThELCtDQUMxRDtVQUFBLDhEQUFBO1VBQUE7TUFFTSwrQ0FDTjtVQUFBO1VBQUE7TUFBcUQsbURBQ2pEO1VBQUEsNEVBQUE7VUFBQTtVQUFBLGVBQTZGLG1EQUM3RjtpQkFBQTthQUFBO1VBQUEsd0JBQXNFLCtDQUNwRTtpQkFBQSw0QkFDSjtNQUVOO1VBQUE7MkNBQUEsVUFBQTtVQUFBLDJDQUFtQztVQUFBLFdBRWpDOztJQTlDTztJQUFMLFdBQUssU0FBTDtJQW1DMEM7SUFBMUMsWUFBMEMsU0FBMUM7SUFJb0I7SUFBaEIsWUFBZ0IsU0FBaEI7SUFDb0I7SUFBcEIsWUFBb0IsU0FBcEI7Ozs7b0JDMUNaO01BQUE7K0JBQUEsVUFBQTtNQUFBO01BQUE7SUFBQTs7OzsifQ==