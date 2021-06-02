import { Component, Input } from '@angular/core';
import { BillSmoothingFrequency, BillSmoothingFuelDisplayModel } from '../billSmoothing.model';

@Component({
    selector: 'agl-billsmoothing-setup-fuel',
    templateUrl: './billSmoothingSetupFuel.component.html',
    styleUrls: ['./billSmoothingSetupFuel.component.scss']
})
export class BillSmoothingSetupFuelComponent {
    public isOpen: boolean = false;
    public selectedDate: string;
    public selectedStart: string;
    public frequencies: BillSmoothingFrequency[] = [BillSmoothingFrequency.Weekly, BillSmoothingFrequency.Fortnightly, BillSmoothingFrequency.Monthly];
    public selectedFrequency: BillSmoothingFrequency;

    @Input() public fuelInfo: BillSmoothingFuelDisplayModel[];
    @Input() public isDirectDebit;

    public onNotify($event) {
        this.selectedFrequency = $event;
    }
}
