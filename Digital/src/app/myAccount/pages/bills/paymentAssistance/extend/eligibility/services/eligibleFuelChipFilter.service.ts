import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Now } from '../../../../../../../shared/service/now.service';
import { FuelChipMessage, MauiFuelChipState, MauiSecondaryMessageStatusType } from '../../../../../../maui/fuelChip/index';
import { FuelChipData } from '../fuelChipData';
import { FuelChipFilterService } from './fuelChipFilter.service';
import { AglCurrencyPipe } from '../../../../../../pipes/aglCurrency.pipe';

@Injectable()
export class EligibleFuelChipFilterService extends FuelChipFilterService {
    constructor(now: Now, private currencyPipe: AglCurrencyPipe) {
        super(now);
    }
    public filter(fuelChipDetails: FuelChipData[]): Observable<FuelChipData[]> {
        let results: FuelChipData[] = [];

        fuelChipDetails.forEach((fuelChipDetail) => {
            if (fuelChipDetail.eligibility.isEligible) {
                let daysOverdue: number = this.daysBeforeNow(fuelChipDetail.eligibility.dueDate);
                const primaryMessage = `Total to pay: ${this.currencyPipe.transform(fuelChipDetail.eligibility.totalAmountDue)}`;
                let secondaryMessage = '';
                let secondaryStatus;

                if (daysOverdue > 0) {
                    secondaryMessage = `Overdue by ${daysOverdue} day` + (daysOverdue === 1 ? '' : 's');
                    secondaryStatus = MauiSecondaryMessageStatusType.Warning;
                } else {
                    secondaryMessage = `Due ${this.formatDate(fuelChipDetail.eligibility.dueDate)}`;
                }

                fuelChipDetail.setClassification(MauiFuelChipState.PreSetup,
                    new FuelChipMessage(primaryMessage, undefined,
                        secondaryMessage, secondaryStatus));
                results.push(fuelChipDetail);
            }
        });

        return Observable.of(this.sort(results));
    }
}
