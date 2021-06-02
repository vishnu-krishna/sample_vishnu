import { Component, Input } from '@angular/core';
import { PaymentAssistancePlanSuccessFuelChipHeaderModel } from './models';
import { MauiFuelChipState } from '../../../../../../maui/fuelChip';

@Component({
    selector: 'agl-payment-assistance-plan-success-fuel-chip-header',
    templateUrl: './fuelChipHeader.component.html',
    styleUrls: ['./fuelChipHeader.component.scss']
})
export class PaymentAssistancePlanSuccessFuelChipHeaderComponent {
    @Input() fuelChipHeaderModel: PaymentAssistancePlanSuccessFuelChipHeaderModel = {
        fuelChip: null
    };

    public mauiFuelChipState = MauiFuelChipState;
}
