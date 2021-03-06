/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './buttonDropdown.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../node_modules/@angular/material/button/typings/index.ngfactory';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/material/button';
import * as i5 from '@angular/cdk/platform';
import * as i6 from '@angular/cdk/a11y';
import * as i7 from '@angular/forms';
import * as i8 from '../../../../../../src/app/shared/component/buttonDropdown/buttonDropdown.component';
import * as i9 from '@angular/common';
import * as i10 from '../../../../../../src/app/myAccount/services/featureFlag.service';
const styles_ButtonDropdownComponent:any[] = [i0.styles];
export const RenderType_ButtonDropdownComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_ButtonDropdownComponent,data:{}});
function View_ButtonDropdownComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),5,'button',[['class',
      'button-dropdown__button long-button mat-raised-button'],['md-raised-button',
      '']],[[8,'id',0],[8,'disabled',0]],[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.selectButton(_v.context.$implicit)) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },i2.View_MdButton_0,i2.RenderType_MdButton)),i1.ɵdid(16384,(null as any),0,i3.MdPrefixRejector,
      [[2,i3.MATERIAL_COMPATIBILITY_MODE],i1.ElementRef],(null as any),(null as any)),
      i1.ɵdid(180224,(null as any),0,i4.MdButton,[i1.Renderer2,i1.ElementRef,i5.Platform,
          i6.FocusMonitor],(null as any),(null as any)),i1.ɵdid(16384,(null as any),
          0,i4.MdRaisedButtonCssMatStyler,([] as any[]),(null as any),(null as any)),
      i1.ɵprd(8448,(null as any),i3.MATERIAL_COMPATIBILITY_MODE,true,([] as any[])),
      (_l()(),i1.ɵted(0,['','']))],(null as any),(_ck,_v) => {
    const currVal_0:any = i1.ɵinlineInterpolate(1,'dropdown-button-',_v.context.index,
        '');
    const currVal_1:any = (i1.ɵnov(_v,2).disabled || (null as any));
    _ck(_v,0,0,currVal_0,currVal_1);
    const currVal_2:any = _v.context.$implicit.name;
    _ck(_v,5,0,currVal_2);
  });
}
export function View_ButtonDropdownComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),20,'div',[['class',
      'button-dropdown']],[[8,'id',0]],(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          11,'fieldset',[['id','button-dropdown__input']],[[8,'hidden',0]],(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),5,'input',
          [['class','button-dropdown__selection'],['readonly',''],['type','text']],
          [[8,'id',0],[2,'ng-untouched',(null as any)],[2,'ng-touched',(null as any)],
              [2,'ng-pristine',(null as any)],[2,'ng-dirty',(null as any)],[2,'ng-valid',
                  (null as any)],[2,'ng-invalid',(null as any)],[2,'ng-pending',(null as any)]],
          [[(null as any),'input'],[(null as any),'blur'],[(null as any),'compositionstart'],
              [(null as any),'compositionend']],(_v,en,$event) => {
            var ad:boolean = true;
            if (('input' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,5)._handleInput($event.target.value)) !== false);
              ad = (pd_0 && ad);
            }
            if (('blur' === en)) {
              const pd_1:any = ((<any>i1.ɵnov(_v,5).onTouched()) !== false);
              ad = (pd_1 && ad);
            }
            if (('compositionstart' === en)) {
              const pd_2:any = ((<any>i1.ɵnov(_v,5)._compositionStart()) !== false);
              ad = (pd_2 && ad);
            }
            if (('compositionend' === en)) {
              const pd_3:any = ((<any>i1.ɵnov(_v,5)._compositionEnd($event.target.value)) !== false);
              ad = (pd_3 && ad);
            }
            return ad;
          },(null as any),(null as any))),i1.ɵdid(16384,(null as any),0,i7.DefaultValueAccessor,
          [i1.Renderer2,i1.ElementRef,[2,i7.COMPOSITION_BUFFER_MODE]],(null as any),
          (null as any)),i1.ɵprd(1024,(null as any),i7.NG_VALUE_ACCESSOR,(p0_0:any) => {
        return [p0_0];
      },[i7.DefaultValueAccessor]),i1.ɵdid(671744,(null as any),0,i7.NgModel,[[8,(null as any)],
          [8,(null as any)],[8,(null as any)],[2,i7.NG_VALUE_ACCESSOR]],{model:[0,
          'model']},(null as any)),i1.ɵprd(2048,(null as any),i7.NgControl,(null as any),
          [i7.NgModel]),i1.ɵdid(16384,(null as any),0,i7.NgControlStatus,[i7.NgControl],
          (null as any),(null as any)),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','button-dropdown__change']],
          [[8,'id',0]],[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i8.ButtonDropdownComponent = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.changeSelection()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            Change\n        '])),
      (_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵted((null as any),['\n\n    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',([] as any[]),[[8,'id',
          0],[8,'hidden',0]],(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_ButtonDropdownComponent_1)),i1.ɵdid(802816,
          (null as any),0,i9.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,i1.IterableDiffers],
          {ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:i8.ButtonDropdownComponent = _v.component;
    const currVal_10:any = _co.selectedName;
    _ck(_v,7,0,currVal_10);
    const currVal_14:any = _co.list;
    _ck(_v,18,0,currVal_14);
  },(_ck,_v) => {
    var _co:i8.ButtonDropdownComponent = _v.component;
    const currVal_0:any = i1.ɵinlineInterpolate(1,'button-dropdown-',_co.name,'');
    _ck(_v,0,0,currVal_0);
    const currVal_1:any = (_co.selectedName == '');
    _ck(_v,2,0,currVal_1);
    const currVal_2:any = i1.ɵinlineInterpolate(1,'button-dropdown-',_co.name,'-selected');
    const currVal_3:any = i1.ɵnov(_v,9).ngClassUntouched;
    const currVal_4:any = i1.ɵnov(_v,9).ngClassTouched;
    const currVal_5:any = i1.ɵnov(_v,9).ngClassPristine;
    const currVal_6:any = i1.ɵnov(_v,9).ngClassDirty;
    const currVal_7:any = i1.ɵnov(_v,9).ngClassValid;
    const currVal_8:any = i1.ɵnov(_v,9).ngClassInvalid;
    const currVal_9:any = i1.ɵnov(_v,9).ngClassPending;
    _ck(_v,4,0,currVal_2,currVal_3,currVal_4,currVal_5,currVal_6,currVal_7,currVal_8,
        currVal_9);
    const currVal_11:any = i1.ɵinlineInterpolate(1,'button-dropdown-',_co.name,'-change');
    _ck(_v,11,0,currVal_11);
    const currVal_12:any = i1.ɵinlineInterpolate(1,'button-dropdown-',_co.name,'-options');
    const currVal_13:any = (_co.selectedName != '');
    _ck(_v,15,0,currVal_12,currVal_13);
  });
}
export function View_ButtonDropdownComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-button-dropdown',
      ([] as any[]),(null as any),(null as any),(null as any),View_ButtonDropdownComponent_0,
      RenderType_ButtonDropdownComponent)),i1.ɵdid(114688,(null as any),0,i8.ButtonDropdownComponent,
      [i10.FeatureFlagService],(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const ButtonDropdownComponentNgFactory:i1.ComponentFactory<i8.ButtonDropdownComponent> = i1.ɵccf('agl-button-dropdown',
    i8.ButtonDropdownComponent,View_ButtonDropdownComponent_Host_0,{list:'list',name:'name'},
    {onSelect:'onSelect'},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvYnV0dG9uRHJvcGRvd24vYnV0dG9uRHJvcGRvd24uY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50L2J1dHRvbkRyb3Bkb3duL2J1dHRvbkRyb3Bkb3duLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50L2J1dHRvbkRyb3Bkb3duL2J1dHRvbkRyb3Bkb3duLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnQvYnV0dG9uRHJvcGRvd24vYnV0dG9uRHJvcGRvd24uY29tcG9uZW50LnRzLkJ1dHRvbkRyb3Bkb3duQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPGRpdiBpZD1cImJ1dHRvbi1kcm9wZG93bi17e25hbWV9fVwiIGNsYXNzPVwiYnV0dG9uLWRyb3Bkb3duXCI+XHJcbiAgICA8ZmllbGRzZXQgaWQ9XCJidXR0b24tZHJvcGRvd25fX2lucHV0XCIgW2hpZGRlbl09XCJzZWxlY3RlZE5hbWUgPT0gJydcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImJ1dHRvbi1kcm9wZG93bi17e25hbWV9fS1zZWxlY3RlZFwiICBcclxuICAgICAgICAgICAgICAgY2xhc3M9XCJidXR0b24tZHJvcGRvd25fX3NlbGVjdGlvblwiIFtuZ01vZGVsXT1cInNlbGVjdGVkTmFtZVwiIHJlYWRvbmx5PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJidXR0b24tZHJvcGRvd24te3tuYW1lfX0tY2hhbmdlXCIgY2xhc3M9XCJidXR0b24tZHJvcGRvd25fX2NoYW5nZVwiIChjbGljayk9XCJjaGFuZ2VTZWxlY3Rpb24oKVwiPlxyXG4gICAgICAgICAgICBDaGFuZ2VcclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgPGRpdiBpZD1cImJ1dHRvbi1kcm9wZG93bi17e25hbWV9fS1vcHRpb25zXCIgIFtoaWRkZW5dPVwic2VsZWN0ZWROYW1lICE9ICcnXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBcclxuICAgICAgICAgICAgaWQ9XCJkcm9wZG93bi1idXR0b24te3tpbmRleH19XCIgXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIGxpc3Q7IGxldCBpbmRleCA9IGluZGV4XCIgXHJcbiAgICAgICAgICAgIGNsYXNzPVwiYnV0dG9uLWRyb3Bkb3duX19idXR0b24gbG9uZy1idXR0b25cIlxyXG4gICAgICAgICAgICBtZC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJzZWxlY3RCdXR0b24oaXRlbSlcIj57e2l0ZW0ubmFtZX19PC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+IiwiPGFnbC1idXR0b24tZHJvcGRvd24+PC9hZ2wtYnV0dG9uLWRyb3Bkb3duPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ1VRO01BQUE7TUFBQTtJQUFBO0lBQUE7SUFJcUI7TUFBQTtNQUFBO0lBQUE7SUFKckI7RUFBQSxxREFBQTtNQUFBO2FBQUE7eUJBQUEsc0NBQUE7VUFBQTthQUFBO01BSWtEO0lBSDlDO1FBQUE7SUFESjtJQUFBLFdBQ0ksVUFESixTQUFBO0lBSWtEO0lBQUE7Ozs7b0JBZDFEO01BQUE7TUFBMkQsMkNBQ3ZEO1VBQUE7VUFBQSw0Q0FBb0U7VUFBQSxpQkFDaEU7VUFBQTtVQUFBO2NBQUE7a0JBQUE7VUFBQTtjQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO1VBQUEsdUNBQUE7VUFBQTtVQUFBLHNCQUFBO1FBQUE7TUFBQSxvQ0FBQTtVQUFBO1VBQUEsZ0NBQUE7VUFBQSxxQkFBQTtVQUFBLDZCQUM0RTtNQUM1RTtVQUFBO1lBQUE7WUFBQTtZQUEwRTtjQUFBO2NBQUE7WUFBQTtZQUExRTtVQUFBLGdDQUFzRztNQUVoRywyQ0FDQztNQUVYO1VBQUE7TUFBMEUsK0NBQ3RFO1VBQUEsc0VBQUE7VUFBQTtVQUFBLHVDQUl3RTtNQUN0RTs7SUFad0M7SUFEMUMsV0FDMEMsVUFEMUM7SUFVSTtJQUZKLFlBRUksVUFGSjs7O0lBVkg7SUFBTCxXQUFLLFNBQUw7SUFDMEM7SUFBdEMsV0FBc0MsU0FBdEM7SUFDdUI7SUFBbkI7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQSxXQUFtQixVQUFuQjtRQUFBLFNBQUE7SUFFSztJQUFMLFlBQUssVUFBTDtJQUtDO0lBQXVDO0lBQTVDLFlBQUssV0FBdUMsVUFBNUM7Ozs7b0JDVEo7TUFBQTt3Q0FBQSxVQUFBO01BQUE7SUFBQTs7Ozs7In0=
