import { Component, Input } from '@angular/core';
import { BillDateOption } from '../../../../services/settings/model/billDateOption';

@Component({
    selector: 'agl-monthly-billing-upcoming-bills',
    templateUrl: './upcomingBills.monthlyBilling.component.html',
    styleUrls: [ './upcomingBills.monthlyBilling.component.scss' ]
})

export class UpcomingBillsMonthlyBillingComponent {
    @Input() public selectedBillDate: BillDateOption;
}
