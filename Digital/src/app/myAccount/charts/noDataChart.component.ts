import { Component, Input } from '@angular/core';
import { DayPluralPipe } from '../pipes/dayPlural.pipe';
import { ContractViewModel }  from '../services/account.service';

/**
 * No Data Component is used where no data is available to show
 *
 * @export
 * @class BarComponent
 */
@Component({
    selector: 'agl-no-data-chart',
    templateUrl: './noDataChart.component.html',
    styleUrls: ['./noDataChart.component.scss'],
})

export class NoDataChartComponent {
    @Input() public contract: ContractViewModel;

    get firstBillDue(): string {
        let pluralise = new DayPluralPipe();
        return this.contract.currentBillDaysUntilDue > 0 ? `in ${pluralise.transform(this.contract.currentBillDaysUntilDue.toString())}` : 'shortly';
    }
}
