import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentAssistancePlanSuccessFuelChipsComponent } from './fuelChips.component';
import { MauiFuelChipModule } from '../../../../../../maui/fuelChip';
import { MauiContainerModule } from '../../../../../../maui/container';
import { MauiHeadingModule } from '../../../../../../maui/heading';

@NgModule({
    declarations: [
        PaymentAssistancePlanSuccessFuelChipsComponent,
    ],
    imports: [
        CommonModule,
        MauiFuelChipModule,
        MauiContainerModule,
        MauiHeadingModule
    ],
    exports: [
        PaymentAssistancePlanSuccessFuelChipsComponent
    ],
    providers: [
    ]
})
export class PaymentAssistancePlanSuccessFuelChipsModule { }
