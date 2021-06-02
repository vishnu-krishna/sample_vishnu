import { browser, by, element, $, $$ } from 'protractor';
import { Context } from '../../../context';

export class PaygPaymentPageObject {

    // bonus information beside payment amount custom input box
    public paymentAmountInputBonus = $('#payment-amount-input-bonus');
    public paymentAmountBonusText = $('#payment-amount-bonus-text');
    public paymentAmountDebitBonusText = $('#payment-amount-debit-bonus-text');

    // bonus amount upsell message
    public upsellMessage = $('#add-bonus-text');
    public topUpMoreLink = $('#add-bonus-amount');

    // bonus error messages
    public bonusErrorMessage = $('#bonus-error');
    public bonusErrorMessageHeading = $('#bonus-error').$('.alert__text--heading');
    public bonusErrorMessageBody = $('#bonus-error').$('.alert__text--body');

    // navigation
    public paymentAmountPaygBack = $('#payment-amount-payg-back');

    // payg payment amount prepopulated (payments)
    public paymentAmountSelected = $('#payment-amount-paygfixed').$('#payment-select-amount-label');
    public paygBonusForPayment = $('#payment-amount-paygfixed').$('#payment-amount-paygfixed-bonus');
    public paygPaymentAmountSelectedLabel = $('#payment-amount-paygfixed-button');
    public paymentChangeLink = $('#payment-amount-paygfixed-change');

    // standard bonus selection (bonus breakdown)
    public paygBonusHeaderText = $('#payg-bonus-header-text');
    public paygBonusHeaderMessage = $('#payg-bonus-header-message');
    public bonusTopupAmount = $('#payg-bonus-topup');
    public bonusAmount = $('#payg-bonus-bonusamount');
    public paygBonusTopupLowerband = $('#payg-bonus-topup-lowerband');
    public paygBonusEnterAmountLink = $('#payg-bonus-enter-amount-link');

    // selection amount buttons
    public bonusSelectButton = (index: number) => $$('#bill-strip-button-overview').get(index);
    public topUpAmountValue = (index: number) => $$('#payg-bonus-topup-lowerband').get(index);
    public bonusAmountValue = (index: number) => $$('#payg-bonus-bonusamount').get(index);

    public selectStandardPaymentAmount(index: number) {
        this.bonusSelectButton(index).click();
    }

    public clickChangePaymentAmountLink() {
        this.paymentChangeLink.click();
    }

    public selectEnterOtherAmount() {
        this.paygBonusEnterAmountLink.click();
    }

    public selectUpsellLink() {
        this.topUpMoreLink.click();
    }
}
