import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PaymentAssistancePlanSuccessFuelChipsModel } from './models';
import { MauiFuelChipFuelContext } from '../../../../../../maui/fuelChip';

@Component({
    selector: 'agl-payment-assistance-plan-success-fuel-chips',
    templateUrl: './fuelChips.component.html',
    styleUrls: ['./fuelChips.component.scss']
})
export class PaymentAssistancePlanSuccessFuelChipsComponent {

    @Input() fuelChipsModel: PaymentAssistancePlanSuccessFuelChipsModel = {
        classifiedFuelChips: {
            eligibleFuelChips: [],
            alreadyExtendedFuelChips: [],
            ineligibleFuelChips: []
        }
    };

    @Output() fuelChipSelected = new EventEmitter<{accountNumber: string, contractNumber: string}>();

    public mauiFuelChipFuelContext = MauiFuelChipFuelContext;

    public onFuelChipSelected(contractNumber: string) {
        const selectedChip = this.fuelChipsModel.classifiedFuelChips.eligibleFuelChips.find((chip) => chip.contractNumber === contractNumber);
        this.fuelChipSelected.emit({ accountNumber: selectedChip.accountNumber, contractNumber: contractNumber });
    }

}
