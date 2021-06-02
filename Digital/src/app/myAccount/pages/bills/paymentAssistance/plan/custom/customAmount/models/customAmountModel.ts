import { FrequencyOption } from './../../../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export interface PaymentAssistancePlanCustomAmountModel {
    frequency: string;
    amount: number;
    amountInput: string;
    instalmentMinAmount: number;
    instalmentMaxAmount: number;
    disabled: boolean;
    currentBillEndDate: Date;
    placeholder: string;
    toValidate: boolean;
}
