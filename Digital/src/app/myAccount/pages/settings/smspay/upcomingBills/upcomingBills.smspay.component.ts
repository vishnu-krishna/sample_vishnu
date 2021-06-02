import { Component, Input } from '@angular/core';
import { FuelConnectionType } from '../../../../../shared/globals/oneMinuteMove/fuelType';

@Component({
    selector: 'agl-upcoming-bills-smspay',
    templateUrl: './upcomingBills.smspay.component.html',
    styleUrls: [ './upcomingBills.smspay.component.scss' ]
})
export class UpcomingBillsSmsPayComponent {
    @Input() public account;

    public getIcon(fuelType: string): string {
        if (FuelConnectionType[fuelType] === FuelConnectionType.Electricity) {
            return 'icon-elec-enabled';
        } else if (FuelConnectionType[fuelType] === FuelConnectionType.Gas) {
            return 'icon-gas-enabled';
        }
     }
}
