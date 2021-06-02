import { Component, Input } from '@angular/core';
import { PaymentAssistancePlanInstalmentsModel } from './models';

@Component({
    selector: 'agl-payment-assistance-plan-instalments',
    templateUrl: './instalments.component.html',
    styleUrls: ['./instalments.component.scss']
})
export class PaymentAssistancePlanInstalmentsComponent {
    @Input() instalmentsModel: PaymentAssistancePlanInstalmentsModel = { progressItems: [] };
    @Input() headerText: string;
}
