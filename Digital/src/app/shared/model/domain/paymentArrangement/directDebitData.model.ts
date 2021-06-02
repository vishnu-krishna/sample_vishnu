import { PaymentArrangementType } from '../../../../myAccount/common/enums';
import { PaymentMethod } from '../../../../myAccount/services/settings/model/paymentMethod';
import { PaymentArrangementContractDetails, PaymentArrangementPaymentMethodModel } from './paymentArrangementData.model';

export class DirectDebitPaymentMethodModel extends PaymentArrangementPaymentMethodModel {
    public constructor(paymentMethod: PaymentMethod) {
        super(paymentMethod, PaymentArrangementType.DirectDebit);
        this.isDirectDebit = true;
    }
}

export class DirectDebitContractDetails extends PaymentArrangementContractDetails {
}
