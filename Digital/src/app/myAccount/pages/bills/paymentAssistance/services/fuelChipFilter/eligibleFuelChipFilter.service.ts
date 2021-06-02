import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FuelChipDataModel } from '../../models';
import { MauiFuelChipState, FuelChipMessage, MauiSecondaryMessageStatusType } from '../../../../../maui/fuelChip';
import { FuelChipFilterService } from './fuelChipFilter.service';
import { Now } from '../../../../../../shared/service/now.service';
import { AglCurrencyPipe } from '../../../../../pipes/aglCurrency.pipe';

@Injectable()
export class EligibleFuelChipFilterService extends FuelChipFilterService {
    constructor(now: Now, private currencyPipe: AglCurrencyPipe) {
        super(now);
    }
    public filter(fuelChipDetails: FuelChipDataModel[]): Observable<FuelChipDataModel[]> {

        const eligibleFuelChipData = fuelChipDetails.reduce((results: FuelChipDataModel[], fuelChipDetail: FuelChipDataModel) => {

            if (fuelChipDetail.eligibility.isEligible) {
                let daysOverdue: number = this.daysBeforeNow(fuelChipDetail.eligibility.dueDate);
                const primaryMessage = `Total to pay: ${this.currencyPipe.transform(fuelChipDetail.eligibility.totalAmountDue)}`;
                let secondaryMessage: string;
                let secondaryStatus: MauiSecondaryMessageStatusType;

                if (daysOverdue > 0) {
                    secondaryMessage = `Overdue by ${daysOverdue} day` + (daysOverdue === 1 ? '' : 's');
                    secondaryStatus = MauiSecondaryMessageStatusType.Warning;
                } else {
                    secondaryMessage = `Due ${this.formatDate(fuelChipDetail.eligibility.dueDate)}`;
                }

                fuelChipDetail.setClassification(MauiFuelChipState.PreSetup,
                    new FuelChipMessage(primaryMessage, undefined,
                        secondaryMessage, secondaryStatus));

                return results.concat(fuelChipDetail);
            } else {
                return results;
            }

        }, []);

        return Observable.of(this.sort(eligibleFuelChipData));
    }
}
