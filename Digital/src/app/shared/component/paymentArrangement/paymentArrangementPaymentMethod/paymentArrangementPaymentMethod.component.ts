import { Component, Input } from '@angular/core';
import { PaymentArrangementPaymentMethodModel } from '../../../model/domain/paymentArrangement/paymentArrangementData.model';
@Component({
    selector: 'agl-payment-arrangement-payment-method',
    templateUrl: './paymentArrangementPaymentMethod.component.html',
    styleUrls: ['./paymentArrangementPaymentMethod.component.scss']
})
export class PaymentArrangementPaymentMethodComponent {
    @Input() public  paymentMethod: PaymentArrangementPaymentMethodModel;

    public getCreditCardExpiryText() {
        if (this.paymentMethod.expired) {
            return 'Expired';
        } else {
            return 'Expires';
        }
    }

    public getPaymentmethodText() {
        return this.paymentMethod.paymentType === 'bank' ? this.paymentMethod.paymentMethodType : '';
    }
}
