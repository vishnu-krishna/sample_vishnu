
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { CommonComponentsModule } from '../../../modules/commonComponents.module';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';
import { MauiFlashMessageModule } from './../../../maui/flashMessage/flashMessage.module';

// Components
import { BillFrequencyComponent } from './billFrequency/billFrequency.component';
import { BillingComponent } from './billing.component';
import { BillSmoothingV1Component } from './billSmoothingV1/billSmoothingV1.component';
import { EBillingMultiBPWebChatModule } from './emailBilling/eBillingMultiBPWebChat/eBillingMultiBPWebChat.module';
import { EmailBillingComponent } from './emailBilling/emailBilling.component';
import { EnergyPlansComponent } from './energyPlans/energyPlans.component';
import { MeterReadingComponent } from './meterReading/meterReading.component';
import { MonthlyBillingEntranceComponent } from './monthlyBillingEntrance/monthlyBillingEntrance.component';

// routes
export const ROUTES: Routes = [
    { path: '', component: BillingComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        MyAccountMaterialModule,
        CommonComponentsModule,
        MauiFlashMessageModule,
        EBillingMultiBPWebChatModule
    ],
    declarations: [
        BillingComponent,
        EmailBillingComponent,
        MonthlyBillingEntranceComponent,
        BillFrequencyComponent,
        BillSmoothingV1Component,
        MeterReadingComponent,
        EnergyPlansComponent
    ]
})
export class BillingModule {}
