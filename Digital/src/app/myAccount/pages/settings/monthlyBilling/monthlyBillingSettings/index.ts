import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { MonthlyBillingSettingsComponent } from './monthlyBilling.settings.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MyAccountMaterialModule
  ],
  exports: [
    MonthlyBillingSettingsComponent
  ],
  declarations: [ MonthlyBillingSettingsComponent ]
})
export class MonthlyBillingSettingsComponentModule {}
