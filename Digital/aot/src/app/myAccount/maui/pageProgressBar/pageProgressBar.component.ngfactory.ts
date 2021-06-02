/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './pageProgressBar.component.scss.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '../../../../../../src/app/myAccount/maui/pageProgressBar/pageProgressBar.component';
const styles_MauiPageProgressBarComponent:any[] = [i0.styles];
export const RenderType_MauiPageProgressBarComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_MauiPageProgressBarComponent,data:{}});
function View_MauiPageProgressBarComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),13,'span',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      0,'span',[['class','maui-page-progress-bar__page-filler']],(null as any),(null as any),
      (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),0,'span',[['class','maui-page-progress-bar__page-current-marker']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),6,'span',[['label','']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['Page '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','maui-page-progress-bar__page-number']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['',''])),(_l()(),i1.ɵted((null as any),[' of '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class','maui-page-progress-bar__page-total']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['',''])),(_l()(),i1.ɵted((null as any),['\n        ']))],
      (null as any),(_ck,_v) => {
        var _co:any = _v.component;
        const currVal_0:any = (<any>_v.parent).context.$implicit;
        _ck(_v,9,0,currVal_0);
        const currVal_1:any = _co.total;
        _ck(_v,12,0,currVal_1);
      });
}
function View_MauiPageProgressBarComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),6,'span',[['class',
      'maui-page-progress-bar__page']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),i1.ɵdid(278528,(null as any),0,i2.NgClass,[i1.IterableDiffers,
      i1.KeyValueDiffers,i1.ElementRef,i1.Renderer],{klass:[0,'klass'],ngClass:[1,
      'ngClass']},(null as any)),i1.ɵpod({'maui-page-progress-bar__page-current':0}),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_MauiPageProgressBarComponent_3)),i1.ɵdid(16384,
          (null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},
          (null as any)),(_l()(),i1.ɵted((null as any),['\n    ']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = 'maui-page-progress-bar__page';
    const currVal_1:any = _ck(_v,2,0,(_v.context.$implicit === _co.current));
    _ck(_v,1,0,currVal_0,currVal_1);
    const currVal_2:any = (_v.context.$implicit === _co.current);
    _ck(_v,5,0,currVal_2);
  },(null as any));
}
function View_MauiPageProgressBarComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),4,'div',[['class',
      'maui-page-progress-bar']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),i1.ɵand(16777216,
      (null as any),(null as any),1,(null as any),View_MauiPageProgressBarComponent_2)),
      i1.ɵdid(802816,(null as any),0,i2.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n']))],(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.pageNumbers;
    _ck(_v,3,0,currVal_0);
  },(null as any));
}
function View_MauiPageProgressBarComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),0,'div',[['class',
      'maui-page-progress-bar--error']],(null as any),(null as any),(null as any),
      (null as any),(null as any)))],(null as any),(null as any));
}
export function View_MauiPageProgressBarComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵand(16777216,
      (null as any),(null as any),1,(null as any),View_MauiPageProgressBarComponent_1)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n'])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_MauiPageProgressBarComponent_4)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:i3.MauiPageProgressBarComponent = _v.component;
    const currVal_0:boolean = !_co.pageError;
    _ck(_v,2,0,currVal_0);
    const currVal_1:any = _co.pageError;
    _ck(_v,5,0,currVal_1);
  },(null as any));
}
export function View_MauiPageProgressBarComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'agl-maui-page-progress-bar',
      ([] as any[]),(null as any),(null as any),(null as any),View_MauiPageProgressBarComponent_0,
      RenderType_MauiPageProgressBarComponent)),i1.ɵdid(638976,(null as any),0,i3.MauiPageProgressBarComponent,
      ([] as any[]),(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const MauiPageProgressBarComponentNgFactory:i1.ComponentFactory<i3.MauiPageProgressBarComponent> = i1.ɵccf('agl-maui-page-progress-bar',
    i3.MauiPageProgressBarComponent,View_MauiPageProgressBarComponent_Host_0,{totalPages:'totalPages',
        currentPage:'currentPage'},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9tYXVpL3BhZ2VQcm9ncmVzc0Jhci9wYWdlUHJvZ3Jlc3NCYXIuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvbWF1aS9wYWdlUHJvZ3Jlc3NCYXIvcGFnZVByb2dyZXNzQmFyLmNvbXBvbmVudC50cyIsIm5nOi8vL0M6L0FHTC5EaWdpdGFsLkFwcHMvc3JjL2FwcC9teUFjY291bnQvbWF1aS9wYWdlUHJvZ3Jlc3NCYXIvcGFnZVByb2dyZXNzQmFyLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovQUdMLkRpZ2l0YWwuQXBwcy9zcmMvYXBwL215QWNjb3VudC9tYXVpL3BhZ2VQcm9ncmVzc0Jhci9wYWdlUHJvZ3Jlc3NCYXIuY29tcG9uZW50LnRzLk1hdWlQYWdlUHJvZ3Jlc3NCYXJDb21wb25lbnRfSG9zdC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbIiAiLCJcclxuPGRpdiAqbmdJZj1cIiFwYWdlRXJyb3JcIiBjbGFzcz1cIm1hdWktcGFnZS1wcm9ncmVzcy1iYXJcIj5cclxuICAgIDxzcGFuICpuZ0Zvcj1cImxldCBwYWdlTnVtYmVyIG9mIHBhZ2VOdW1iZXJzXCIgY2xhc3M9XCJtYXVpLXBhZ2UtcHJvZ3Jlc3MtYmFyX19wYWdlXCJcclxuICAgICAgICBbbmdDbGFzc109XCJ7ICdtYXVpLXBhZ2UtcHJvZ3Jlc3MtYmFyX19wYWdlLWN1cnJlbnQnOiBwYWdlTnVtYmVyID09PSBjdXJyZW50IH1cIj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cInBhZ2VOdW1iZXIgPT09IGN1cnJlbnRcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXVpLXBhZ2UtcHJvZ3Jlc3MtYmFyX19wYWdlLWZpbGxlclwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXVpLXBhZ2UtcHJvZ3Jlc3MtYmFyX19wYWdlLWN1cnJlbnQtbWFya2VyXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBsYWJlbD5QYWdlIDxzcGFuIGNsYXNzPVwibWF1aS1wYWdlLXByb2dyZXNzLWJhcl9fcGFnZS1udW1iZXJcIj57e3BhZ2VOdW1iZXJ9fTwvc3Bhbj4gb2YgPHNwYW4gY2xhc3M9XCJtYXVpLXBhZ2UtcHJvZ3Jlc3MtYmFyX19wYWdlLXRvdGFsXCI+e3t0b3RhbH19PC9zcGFuPjwvc3Bhbj5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L3NwYW4+XHJcbjwvZGl2PlxyXG48ZGl2ICpuZ0lmPVwicGFnZUVycm9yXCIgY2xhc3M9XCJtYXVpLXBhZ2UtcHJvZ3Jlc3MtYmFyLS1lcnJvclwiPjwvZGl2PlxyXG4iLCI8YWdsLW1hdWktcGFnZS1wcm9ncmVzcy1iYXI+PC9hZ2wtbWF1aS1wYWdlLXByb2dyZXNzLWJhcj4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O29CQ0lRO01BQUEsd0VBQXFDO2FBQUEsb0NBQ2pDO01BQUE7TUFBQSw0Q0FBeUQ7TUFDekQ7VUFBQTtNQUFpRSxtREFDakU7VUFBQTtVQUFBLDhCQUFZO01BQUs7VUFBQTtNQUFrRCx3Q0FBcUI7TUFBSTtVQUFBO01BQWlELHdDQUF1Qjs7O1FBQWpHO1FBQUE7UUFBMEU7UUFBQTs7OztvQkFMcko7TUFBQTtNQUFBLHVCQUFBO2tEQUFBO01BQUEsa0NBQ0k7TUFBK0UsK0NBQy9FO1VBQUEsMkVBQUE7VUFBQTtVQUFBLGVBSU87O0lBTmtDO0lBQ3pDO0lBREosV0FBNkMsVUFDekMsU0FESjtJQUVVO0lBQU4sV0FBTSxTQUFOOzs7O29CQUhSO01BQUE7TUFBQSxnQkFBdUQsMkNBQ25EO01BQUE7YUFBQTs0QkFBQSx5Q0FPTztVQUFBOztJQVBEO0lBQU4sV0FBTSxTQUFOOzs7O29CQVNKO01BQUE7TUFBQTs7O29CQVhBLHVDQUNBO01BQUE7YUFBQTtVQUFBLHdCQVNNLHVDQUNOO1VBQUE7YUFBQTtVQUFBLHdCQUFtRTs7SUFWOUQ7SUFBTCxXQUFLLFNBQUw7SUFVSztJQUFMLFdBQUssU0FBTDs7OztvQkNYQTtNQUFBOzZDQUFBLFVBQUE7TUFBQTtJQUFBOzs7OzsifQ==
