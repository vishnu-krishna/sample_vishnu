import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';

import { TextMaskModule } from 'angular2-text-mask';

import { MeterEntryComponent } from './meterEntry.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    TextMaskModule,
    MyAccountMaterialModule
  ],
  exports: [
    MeterEntryComponent
  ],
  declarations: [ MeterEntryComponent ]
})
export class MeterEntryComponentModule {}
