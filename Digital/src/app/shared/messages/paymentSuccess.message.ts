import { PaymentView } from '../globals/paygConstants';
import { ReceiptDetail } from '../model/domain/receiptDetail.model';
import { BaseMessage } from './base.message';

export class PaymentSuccessMessage extends BaseMessage {

    public receiptDetail: ReceiptDetail;
    public paymentView: PaymentView = PaymentView.PaymentSuccess;
    constructor(private _receiptDetail: ReceiptDetail, paymentView: PaymentView) {
        super();
        this.paymentView = paymentView;
        this.receiptDetail = _receiptDetail;
    }
}
