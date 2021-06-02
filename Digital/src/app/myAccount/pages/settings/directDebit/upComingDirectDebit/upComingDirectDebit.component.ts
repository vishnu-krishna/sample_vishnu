import { Component, Input } from '@angular/core';
import { FuelConnectionType } from '../../../../../shared/globals/oneMinuteMove/fuelType';

@Component({
   selector: 'agl-upcoming-direct-debit',
   templateUrl: './upComingDirectDebit.component.html',
   styleUrls: ['./upComingDirectDebit.component.scss']
})
export class UpComingDirectDebitComponent {
   @Input() public paymentDetails;

   public getIcon(fuelType: string): string {
       if (FuelConnectionType[fuelType] === FuelConnectionType.Electricity) {
           return 'icon-elec-enabled';
       } else if (FuelConnectionType[fuelType] === FuelConnectionType.Gas) {
           return 'icon-gas-enabled';
       }
   }
}
