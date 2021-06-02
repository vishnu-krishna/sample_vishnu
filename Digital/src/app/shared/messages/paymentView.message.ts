import { PaymentView } from '../globals/paygConstants';
import { BaseMessage } from './base.message';

export class PaymentViewMessage extends BaseMessage {

    public paymentView: PaymentView = PaymentView.MakePayment;

    constructor(paymentView: PaymentView) {
        super();
        this.paymentView = paymentView;
    }
}
