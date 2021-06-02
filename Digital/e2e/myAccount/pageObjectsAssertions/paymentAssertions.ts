import { $, by, element } from 'protractor';
import { PaymentPage } from '../pageObjects/paymentPage';
import { Context } from '../../context';
import * as waits from '../../utilities/waits';

export class PaymentAssertions {

    private readonly paymentModalHeader = 'Make a Payment';
    private readonly paymentModalReferenceLabel = 'Reference number';
    private readonly paymentMethodLabel = 'Pay with';

    // payment methods
    private readonly creditCard = 'CREDIT OR DEBIT CARD';
    private readonly payPal = 'PAYPAL';
    private readonly bankAccount = 'BANK ACCOUNT';

    constructor(public paymentPage: PaymentPage) {
    }

    public AssertPaymentAmountInputVisibility(isVisible: boolean = true) {
        expect(this.paymentPage.paymentAmountInputBox.isPresent()).toBe(isVisible, `payment amount in the modal visibility is expected to be: ${isVisible}`);
    }

    public AssertInitialPaymentModalVisibility(isVisible: boolean = true, bankAccountEnabled: boolean = false) {
        expect(this.paymentPage.paymentMethodsLabel.isPresent()).toBe(isVisible, `payment method label's visibility is expected to be: ${isVisible}`);
        expect(this.paymentPage.paymentMethodsLabel.getText()).toBe(this.paymentMethodLabel, `payment method's label is always expected to be: ${this.paymentMethodLabel}`);

        waits.waitForVisibilityOf(this.paymentPage.paymentMethodButton(0));
        expect(this.paymentPage.paymentMethodButton(0).isDisplayed()).toBe(isVisible, 'first payment method button must be displayed');
        expect(this.paymentPage.paymentMethodButton(1).isDisplayed()).toBe(isVisible, 'second payment method must be displayed');
        if (bankAccountEnabled) {
            expect(this.paymentPage.paymentMethodButton(2).isDisplayed()).toBe(isVisible, 'third payment method button must be displayed');
        }
    }

    public AssertPaymentMethodText(bankAccountEnabled: boolean = false) {
        expect(this.paymentPage.paymentMethodButton(0).getText()).toBe(this.creditCard, `first payment method text is always expected to be: ${this.creditCard}`);
        let secondButtonText = bankAccountEnabled ? this.bankAccount : this.payPal;
        expect(this.paymentPage.paymentMethodButton(1).getText()).toBe(secondButtonText, `second payment method text is expected to be: ${secondButtonText}`);
        expect(this.paymentPage.paymentMethodButton(2).getText()).toBe(this.payPal, `third payment method button text is expected to be: ${this.payPal}`);

    }

    public AssertPaymentModalHeader() {
        expect(this.paymentPage.getPaymentModalHeaderText()).toEqual(
            this.paymentModalHeader, `payment modal header is expected to be ${this.paymentModalHeader}`);
    }

    public AssertCustomerAndPaymentReference(fuelType: string, address: string, referenceNumber: number) {
        expect(this.paymentPage.paymentAddressLabel.getText()).toEqual(this.paymentModalAddressLabel(fuelType), `address label is expected to be: ${this.paymentModalAddressLabel(fuelType)}`);
        expect(this.paymentPage.paymentAddressText.getText()).toEqual(address, `customer address is expected to be ${address}`);
        expect(this.paymentPage.paymentReferenceLabel.getText()).toEqual(this.paymentModalReferenceLabel, `reference label text is expected to be ${this.paymentModalReferenceLabel}`);
        expect(this.paymentPage.paymentReferenceText.getText()).toEqual(referenceNumber, `payment reference number is expected to be: ${referenceNumber}`);
    }

    private paymentModalAddressLabel = (fuelType: string) => `You are paying for ${fuelType.toLowerCase()} at`;
}
