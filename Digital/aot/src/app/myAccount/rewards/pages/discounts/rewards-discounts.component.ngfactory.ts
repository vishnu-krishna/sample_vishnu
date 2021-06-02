/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './rewards-discounts.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../../../../../../src/app/myAccount/rewards/pages/discounts/rewards-discounts.component';
import * as i3 from '../../../maui/secondaryNavigation/secondaryNavigation.component.ngfactory';
import * as i4 from '../../../../../../../src/app/myAccount/maui/secondaryNavigation/secondaryNavigation.component';
import * as i5 from '../../../maui/button/button.component.ngfactory';
import * as i6 from '../../../../../../../src/app/myAccount/maui/button/button.component';
import * as i7 from '@angular/router';
import * as i8 from '../../../../../../../src/app/myAccount/rewards/rewards-analytics';
const styles_RewardsDiscountsComponent:any[] = [i0.styles];
export const RenderType_RewardsDiscountsComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_RewardsDiscountsComponent,data:{}});
export function View_RewardsDiscountsComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),65,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      2,'agl-maui-secondary-navigation',[['display','true'],['displayBackButton','true'],
          ['hideNavigation','hideNavigation'],['text','Your AGL discounts']],(null as any),
      [[(null as any),'clicked'],['window','scroll']],(_v,en,$event) => {
        var ad:boolean = true;
        var _co:i2.RewardsDiscountsComponent = _v.component;
        if (('window:scroll' === en)) {
          const pd_0:any = ((<any>i1.ɵnov(_v,3).onWindowScroll()) !== false);
          ad = (pd_0 && ad);
        }
        if (('clicked' === en)) {
          const pd_1:any = ((<any>_co.backClick()) !== false);
          ad = (pd_1 && ad);
        }
        return ad;
      },i3.View_MauiSecondaryNavigationComponent_0,i3.RenderType_MauiSecondaryNavigationComponent)),
      i1.ɵdid(49152,(null as any),0,i4.MauiSecondaryNavigationComponent,([] as any[]),
          {text:[0,'text'],display:[1,'display'],displayBackButton:[2,'displayBackButton']},
          {clicked:'clicked'}),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
          i1.ɵted((null as any),['\n           '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),58,'div',[['class','tile__content']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                   '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          1,'h2',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['What to look for on your bill'])),
      (_l()(),i1.ɵted((null as any),['\n                   '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'p',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['Our calculation includes the following (where they apply to your energy plan):'])),
      (_l()(),i1.ɵted((null as any),[' \n                   '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),39,'div',[['class','ul--split']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                       '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          17,'ul',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n                           '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),2,'li',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['Guaranteed discount (%)'])),(_l()(),i1.ɵted((null as any),['\n                           '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),2,'li',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['Pay on Time discount (%)'])),(_l()(),i1.ɵted((null as any),['\n                           '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),2,'li',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['Direct debit reward (%)'])),(_l()(),i1.ɵted((null as any),['\n                           '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),2,'li',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),1,'span',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['Double Up reward (%)'])),(_l()(),i1.ɵted((null as any),['\n                       '])),
      (_l()(),i1.ɵted((null as any),['\n                       '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),17,'ul',([] as any[]),(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                           '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          2,'li',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['Once Off account credit ($)'])),(_l()(),i1.ɵted((null as any),
          ['\n                           '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          2,'li',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['Ongoing account credit ($)'])),(_l()(),i1.ɵted((null as any),
          ['\n                           '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          2,'li',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['AGL bonus ($)'])),(_l()(),i1.ɵted((null as any),
          ['\n                           '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          2,'li',([] as any[]),(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',([] as any[]),
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['Prepaid bonus credit ($)'])),(_l()(),i1.ɵted((null as any),
          ['\n                       '])),(_l()(),i1.ɵted((null as any),['\n                   '])),
      (_l()(),i1.ɵted((null as any),['\n           \n                   '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),1,'p',([] as any[]),(null as any),
              (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['You\'ll find any applicable discounts or credits under the \'Credits\' or \'Previous balance and payments\' heading on the last page of your bill.'])),
      (_l()(),i1.ɵted((null as any),['\n           \n                   '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),5,'div',[['class','tile__buttons']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                       '])),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),2,'agl-maui-button',([] as any[]),(null as any),
          [[(null as any),'clicked']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:i2.RewardsDiscountsComponent = _v.component;
            if (('clicked' === en)) {
              const pd_0:any = ((<any>_co.viewBillsClick()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },i5.View_ButtonComponent_0,i5.RenderType_ButtonComponent)),i1.ɵdid(49152,
          (null as any),0,i6.ButtonComponent,([] as any[]),(null as any),{clicked:'clicked'}),
      (_l()(),i1.ɵted(0,['View your bills'])),(_l()(),i1.ɵted((null as any),['\n                   '])),
      (_l()(),i1.ɵted((null as any),['\n               '])),(_l()(),i1.ɵted((null as any),
          ['\n    ']))],(_ck,_v) => {
    const currVal_0:any = 'Your AGL discounts';
    const currVal_1:any = 'true';
    const currVal_2:any = 'true';
    _ck(_v,3,0,currVal_0,currVal_1,currVal_2);
  },(null as any));
}
export function View_RewardsDiscountsComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-rewards-discounts',
      ([] as any[]),(null as any),(null as any),(null as any),View_RewardsDiscountsComponent_0,
      RenderType_RewardsDiscountsComponent)),i1.ɵdid(49152,(null as any),0,i2.RewardsDiscountsComponent,
      [i7.Router,i8.RewardsAnalytics],(null as any),(null as any))],(null as any),
      (null as any));
}
export const RewardsDiscountsComponentNgFactory:i1.ComponentFactory<i2.RewardsDiscountsComponent> = i1.ɵccf('agl-rewards-discounts',
    i2.RewardsDiscountsComponent,View_RewardsDiscountsComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9yZXdhcmRzL3BhZ2VzL2Rpc2NvdW50cy9yZXdhcmRzLWRpc2NvdW50cy5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9yZXdhcmRzL3BhZ2VzL2Rpc2NvdW50cy9yZXdhcmRzLWRpc2NvdW50cy5jb21wb25lbnQudHMiLCJuZzovLy9DOi9BR0wuRGlnaXRhbC5BcHBzL3NyYy9hcHAvbXlBY2NvdW50L3Jld2FyZHMvcGFnZXMvZGlzY291bnRzL3Jld2FyZHMtZGlzY291bnRzLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9yZXdhcmRzL3BhZ2VzL2Rpc2NvdW50cy9yZXdhcmRzLWRpc2NvdW50cy5jb21wb25lbnQudHMuUmV3YXJkc0Rpc2NvdW50c0NvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxkaXY+XHJcbiAgICA8YWdsLW1hdWktc2Vjb25kYXJ5LW5hdmlnYXRpb25cclxuICAgICAgICAgZGlzcGxheT1cInRydWVcIlxyXG4gICAgICAgIGRpc3BsYXlCYWNrQnV0dG9uPVwidHJ1ZVwiXHJcbiAgICAgICAgaGlkZU5hdmlnYXRpb249XCJmYWxzZVwiXHJcbiAgICAgICAgdGV4dD1cIllvdXIgQUdMIGRpc2NvdW50c1wiXHJcbiAgICAgICAgaGlkZU5hdmlnYXRpb249XCJoaWRlTmF2aWdhdGlvblwiXHJcbiAgICAgICAgKGNsaWNrZWQpPSdiYWNrQ2xpY2soKSc+XHJcbiAgICA8L2FnbC1tYXVpLXNlY29uZGFyeS1uYXZpZ2F0aW9uPlxyXG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aWxlX19jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICA8aDI+V2hhdCB0byBsb29rIGZvciBvbiB5b3VyIGJpbGw8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgPHA+T3VyIGNhbGN1bGF0aW9uIGluY2x1ZGVzIHRoZSBmb2xsb3dpbmcgKHdoZXJlIHRoZXkgYXBwbHkgdG8geW91ciBlbmVyZ3kgcGxhbik6PC9wPiBcclxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1bC0tc3BsaXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Bhbj5HdWFyYW50ZWVkIGRpc2NvdW50ICglKTwvc3Bhbj48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4+UGF5IG9uIFRpbWUgZGlzY291bnQgKCUpPC9zcGFuPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48c3Bhbj5EaXJlY3QgZGViaXQgcmV3YXJkICglKTwvc3Bhbj48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4+RG91YmxlIFVwIHJld2FyZCAoJSk8L3NwYW4+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuPk9uY2UgT2ZmIGFjY291bnQgY3JlZGl0ICgkKTwvc3Bhbj48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4+T25nb2luZyBhY2NvdW50IGNyZWRpdCAoJCk8L3NwYW4+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuPkFHTCBib251cyAoJCk8L3NwYW4+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuPlByZXBhaWQgYm9udXMgY3JlZGl0ICgkKTwvc3Bhbj48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIDxwPllvdSdsbCBmaW5kIGFueSBhcHBsaWNhYmxlIGRpc2NvdW50cyBvciBjcmVkaXRzIHVuZGVyIHRoZSAnQ3JlZGl0cycgb3IgJ1ByZXZpb3VzIGJhbGFuY2UgYW5kIHBheW1lbnRzJyBoZWFkaW5nIG9uIHRoZSBsYXN0IHBhZ2Ugb2YgeW91ciBiaWxsLjwvcD5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aWxlX19idXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgPGFnbC1tYXVpLWJ1dHRvbiAoY2xpY2tlZCk9XCJ2aWV3QmlsbHNDbGljaygpXCI+VmlldyB5b3VyIGJpbGxzPC9hZ2wtbWF1aS1idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj4iLCI8YWdsLXJld2FyZHMtZGlzY291bnRzPjwvYWdsLXJld2FyZHMtZGlzY291bnRzPiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNBQTtNQUFBLHdFQUFLO2FBQUEsNEJBQ0Q7TUFBQTtVQUFBO01BQUE7UUFBQTtRQUFBO1FBQUE7VUFBQTtVQUFBO1FBQUE7UUFNSTtVQUFBO1VBQUE7UUFBQTtRQU5KO01BQUE7YUFBQTtVQUFBO1VBQUEscUJBTTRCLDJDQUNJO2lCQUFBLG1DQUN6QjtVQUFBO1VBQUEsNENBQTJCO1VBQUEsNEJBQ25CO1VBQUE7VUFBQSxnQkFBSTtNQUFrQywwREFDdEM7VUFBQTtVQUFBLDRDQUFHO1VBQUE7TUFBa0YsMkRBQ3JGO1VBQUE7VUFBQSwwREFBdUI7VUFBQSxnQ0FDbkI7VUFBQTtVQUFBLGdCQUFJO01BQ0E7VUFBQSwwREFBSTtVQUFBO1VBQUEsNENBQU07VUFBQSw4QkFBbUM7TUFDN0M7VUFBQSwwREFBSTtVQUFBO1VBQUEsNENBQU07VUFBQSwrQkFBb0M7TUFDOUM7VUFBQSwwREFBSTtVQUFBO1VBQUEsNENBQU07VUFBQSw4QkFBbUM7TUFDN0M7VUFBQSwwREFBSTtVQUFBO1VBQUEsNENBQU07VUFBQSwyQkFBZ0M7TUFDekMsOERBQ0w7VUFBQTtVQUFBLDRDQUFJO1VBQUEsb0NBQ0E7VUFBQTtVQUFBLGdCQUFJO1VBQUE7TUFBTSxnRUFBdUM7VUFBQSxvQ0FDakQ7VUFBQTtVQUFBLGdCQUFJO1VBQUE7TUFBTSwrREFBc0M7VUFBQSxvQ0FDaEQ7VUFBQTtVQUFBLGdCQUFJO1VBQUE7TUFBTSxrREFBeUI7VUFBQSxvQ0FDbkM7VUFBQTtVQUFBLGdCQUFJO1VBQUE7TUFBTSw2REFBb0M7VUFBQSxnQ0FDN0M7TUFDSCx1RUFFTjtpQkFBQTtjQUFBLDBEQUFHO1VBQUE7TUFBaUosdUVBRXBKO2lCQUFBO2NBQUE7TUFBMkIsOERBQ3ZCO1VBQUE7VUFBQTtZQUFBO1lBQUE7WUFBaUI7Y0FBQTtjQUFBO1lBQUE7WUFBakI7VUFBQSxtRUFBQTtVQUFBO01BQThDLHdDQUFpQztNQUM3RSxzREFDSjtVQUFBO0lBM0JiO0lBSEM7SUFDRDtJQUZKLFdBSUksVUFIQyxVQUNELFNBRko7Ozs7b0JDREo7TUFBQTswQ0FBQSxVQUFBO01BQUE7Ozs7In0=