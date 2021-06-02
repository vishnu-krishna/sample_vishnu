import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';
import { MyAccountMaterialModule } from '../../../myAccount/modules/my-account.material.module';

import { CtaButtonComponent } from './ctaButton.component';

@NgModule({
  imports: [
    CommonModule,
    MyAccountMaterialModule
  ],
  exports: [
    CtaButtonComponent
  ],
  declarations: [ CtaButtonComponent ]
})
export class CtaButtonModule {}
