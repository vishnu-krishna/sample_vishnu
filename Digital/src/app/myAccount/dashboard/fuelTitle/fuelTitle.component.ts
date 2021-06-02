import { Component, Input }  from '@angular/core';
import { ContractViewModel } from '../../services/account.service';

@Component({
    selector: 'agl-fuel-title',
    templateUrl: './fuelTitle.component.html',
    styleUrls: ['./fuelTitle.component.scss'],
})
export class FuelTitleComponent {
    @Input() public contract: ContractViewModel;
}
