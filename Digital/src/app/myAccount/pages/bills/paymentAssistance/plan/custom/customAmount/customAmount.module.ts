import { NgModule } from '@angular/core';
import { PaymentAssistancePlanCustomAmountComponent } from './customAmount.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        PaymentAssistancePlanCustomAmountComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        PaymentAssistancePlanCustomAmountComponent
    ],
    providers: [
    ]
})
export class PaymentAssistancePlanCustomAmountModule { }
