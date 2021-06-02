
import orderBy from 'lodash-es/orderBy';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Now } from '../../../../../../../shared/service/now.service';
import { ContractViewModel } from '../../../../../../services/account.service';
import { PaymentExtensionIneligibilityReasons } from '../../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../fuelChipData';

export abstract class FuelChipFilterService {
    constructor(private now: Now) {}

    public abstract filter(fuelChipDetails: FuelChipData[]): Observable<FuelChipData[]>;

    protected daysBeforeNow(date: Date): number {
        return this.now.date().diff(moment(date).startOf('day'), 'days');
    }

    protected daysAfterNow(date: Date): number {
        return moment(date).diff(this.now.date().startOf('day'), 'days');
    }

    protected daysAway(untilDate: moment.Moment): string {
        let days: number = Math.abs(untilDate.diff(this.now.date(), 'days'));
        let dayText = (days < 2) ? 'day' : 'days';
        return `${days} ${dayText}`;
    }

    protected sort(fuelChipData: FuelChipData[]): FuelChipData[] {
        return orderBy(fuelChipData, ['fuelType', 'contractNumber'], ['asc', 'asc']);
    }

    protected formatDate(date: Date): string {
        return moment(date).format('ddd DD MMM YYYY');
    }

    protected isAlreadyExtended(fuelChipData: FuelChipData, contract: ContractViewModel): boolean {
        return !fuelChipData.eligibility.isEligible
            && fuelChipData.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.AlreadyExtended
            && !!contract.extendedDueDate;
    }

    protected hasNoIssuedBill(fuelChipData: FuelChipData, contract: ContractViewModel): boolean {
        return !fuelChipData.eligibility.isEligible
            && (fuelChipData.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.NoIssuedBill
                ||
                (fuelChipData.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill && contract.currentBalance <= 0)
                ||
                (fuelChipData.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.Unknown && contract.paymentTotal <= 0)
               );
    }

    protected isBrokenAccountWithNoBill(fuelChipData: FuelChipData, contract: ContractViewModel): boolean {
        return !fuelChipData.eligibility.isEligible
            && fuelChipData.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.BrokenAccount
            && !contract.getNewestBill();
    }
}
