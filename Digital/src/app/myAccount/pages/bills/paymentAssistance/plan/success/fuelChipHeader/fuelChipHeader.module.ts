import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PaymentAssistancePlanSuccessFuelChipHeaderComponent } from './fuelChipHeader.component';
import { MauiFuelChipModule } from '../../../../../../maui/fuelChip';

@NgModule({
    declarations: [
        PaymentAssistancePlanSuccessFuelChipHeaderComponent,
    ],
    imports: [
        CommonModule,
        MauiFuelChipModule
    ],
    exports: [
        PaymentAssistancePlanSuccessFuelChipHeaderComponent
    ],
    providers: [
    ]
})
export class PaymentAssistancePlanSuccessFuelChipHeaderModule { }
