import { $, $$, by, element } from 'protractor';
import { indexDebugNode } from '@angular/core/src/debug/debug_node';
import { PaygPaymentPageObject } from './components/paygPaymentPageObject';
import { Context } from '../../context';
import * as waits from '../../utilities/waits';
import * as protractor from 'protractor';

export class PaymentPage {

    public closeButtonPaymentModal = $('#modal-close-button');

    // payment modal header
    private modalHeader = $('#agl-modal-header-text');
    public paymentHeaderText = $('.agl-modal-header__text');
    public paymentCustomerDetails = $('#payment-customer-details');
    public paymentAddressLabel = $('#payment-address-label');
    public paymentAddressText = $('#payment-address-text');
    public paymentReferenceLabel = $('#payment-reference-label');
    public paymentReferenceText = $('#payment-reference-text');

    // payment amount section
    public paymentAmount = $('#payment-amount');
    public paymentAmountLabel = $('#payment-amount-title');
    public paymentAmountInputBox = $('#payment-amount-input');

    // payment methods section
    public paymentMethodsLabel = $('#payment-methods-label');
    public paymentPaypalContent = $('#payment-paypal-content');
    public paymentAmountMinValidation = $('#payment-amount-min-validation');
    public paymentAmountCcValidation = $('#payment-amount-cc-validation');
    public paymentAmountPaypalValidation = $('#payment-amount-paypal-validation');

    public paymentMethodButton = (index: number) => $(`#dropdown-button-${index}`);
    public paypalPaymentMethodInput = $('#button-dropdown-list-selected');

    // ---- Components ---- //
    public paygPaymentComponent(): PaygPaymentPageObject {
        return new PaygPaymentPageObject();
    }

    public loseFocusOnInputField() {
        this.paymentMethodsLabel.click();
    }

    public enterPaymentAmount(paymentAmount: string) {
        this.paymentAmountInputBox.sendKeys(paymentAmount);
    }

    public selectPaymentMethod(index: number) {
        this.paymentMethodButton(index).click();
    }

    public closeModal() {
        return this.closeButtonPaymentModal.click().then(() => {
            return waits.waitForModalToDisappear(element(by.css('.dialog-container')))
                .then(() => {
                    console.log('Closed modal.');
            });
        });
    }

    public getPaymentModalHeaderText(): protractor.promise.Promise<string> {
        return waits.waitForVisibilityOf(this.modalHeader).then(() => {
            return this.modalHeader.getText();
        });
    }
}
