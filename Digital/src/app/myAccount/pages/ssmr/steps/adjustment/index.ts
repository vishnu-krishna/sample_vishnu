import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonPipesModule }  from '../../../../modules/commonPipes.module';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';

import { AdjustmentComponent } from './adjustment.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MyAccountMaterialModule,
    CommonPipesModule
  ],
  exports: [
    AdjustmentComponent
  ],
  declarations: [ AdjustmentComponent ]
})
export class AdjustmentComponentModule {}
