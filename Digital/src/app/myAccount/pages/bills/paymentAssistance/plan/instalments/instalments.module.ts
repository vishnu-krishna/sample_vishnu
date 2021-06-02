import { NgModule } from '@angular/core';

import { PaymentAssistancePlanInstalmentsComponent } from './instalments.component';
import { MauiProgressTrackerModule } from '../../../../../maui/progressTracker';
import { PaymentAssistancePlanInstalmentsLeftPaneModule } from './leftPane';
import { PaymentAssistancePlanInstalmentsRightPaneModule } from './rightPane';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        PaymentAssistancePlanInstalmentsComponent
    ],
    imports: [
        CommonModule,
        MauiProgressTrackerModule,
        PaymentAssistancePlanInstalmentsLeftPaneModule,
        PaymentAssistancePlanInstalmentsRightPaneModule,
    ],
    exports: [
        PaymentAssistancePlanInstalmentsComponent
    ],
    providers: [
    ]
})
export class PaymentAssistancePlanInstalmentsModule { }
