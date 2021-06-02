
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import orderBy from 'lodash-es/orderBy';
import { FuelChipDataModel } from '../../models';
import { Now } from '../../../../../../shared/service/now.service';
import { ContractViewModel } from '../../../../../services/account.service';
import { PaymentExtensionIneligibilityReasons } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';

export abstract class FuelChipFilterService {
    constructor(private now: Now) {}

    public abstract filter(fuelChipDetails: FuelChipDataModel[]): Observable<FuelChipDataModel[]>;

    protected daysBeforeNow(date: Date): number {
        return this.now.date().diff(moment(date).startOf('day'), 'days');
    }

    protected daysAfterNow(date: Date): number {
        return moment(date).diff(this.now.date().startOf('day'), 'days');
    }

    protected sort(fuelChipData: FuelChipDataModel[]): FuelChipDataModel[] {
        return orderBy(fuelChipData, ['fuelType', 'contractNumber'], ['asc', 'asc']);
    }

    protected formatDate(date: Date): string {
        return moment(date).format('ddd DD MMM YYYY');
    }

    protected isAlreadyExtended(fuelChipData: FuelChipDataModel, contract: ContractViewModel): boolean {
        return !fuelChipData.eligibility.isEligible
            && fuelChipData.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.AlreadyExtended;
    }

    protected hasNoIssuedBill(fuelChipData: FuelChipDataModel, contract: ContractViewModel): boolean {
        return !fuelChipData.eligibility.isEligible
            && (fuelChipData.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.NoIssuedBill
                || (fuelChipData.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.UnableToExtendOnlineOrNoIssuedBill
                    && contract.currentBalance <= 0));
    }

    protected isBrokenAccountWithNoBill(fuelChipData: FuelChipDataModel, contract: ContractViewModel): boolean {
        return !fuelChipData.eligibility.isEligible
            && fuelChipData.eligibility.reasonForIneligibility === PaymentExtensionIneligibilityReasons.BrokenAccount
            && !contract.getNewestBill();
    }
}
