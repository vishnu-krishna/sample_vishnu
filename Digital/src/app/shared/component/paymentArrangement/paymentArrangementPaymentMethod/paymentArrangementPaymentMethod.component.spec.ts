
import { PaymentMethod } from '../../../../myAccount/services/settings/model/paymentMethod';
import { PaymentArrangementPaymentMethodModel } from '../../../model/domain/paymentArrangement/paymentArrangementData.model';
import { PaymentArrangementPaymentMethodComponent } from './paymentArrangementPaymentMethod.component';

describe('Direct Debit Payment Method Component', () => {
    let sut: PaymentArrangementPaymentMethodComponent;

    beforeEach(() => {
        sut = new PaymentArrangementPaymentMethodComponent();
        sut.paymentMethod = new PaymentArrangementPaymentMethodModel(new PaymentMethod(), null);
    });

    it('should return "Expired" text when expired', () => {
        sut.paymentMethod.expired = true;

        let expiryText = sut.getCreditCardExpiryText();

        expect(expiryText).toBe('Expired');
    });

    it('should return "Expires" text if not expired', () => {
        sut.paymentMethod.expired = false;

        let expiryText = sut.getCreditCardExpiryText();

        expect(expiryText).toBe('Expires');
    });

    it('should return "bank" for payment method type when payment type is bank', () => {
        sut.paymentMethod.paymentType = 'bank';
        sut.paymentMethod.paymentMethodType = 'bank';

        let paymentMethodType = sut.getPaymentmethodText();

        expect(paymentMethodType).toBe(sut.paymentMethod.paymentMethodType);
    });

    it('should return blank for payment method type when payment type is not bank', () => {
        sut.paymentMethod.paymentType = 'credit';
        sut.paymentMethod.paymentMethodType = 'credit';

        let paymentMethodType = sut.getPaymentmethodText();

        expect(paymentMethodType).toBe('');
    });
});
