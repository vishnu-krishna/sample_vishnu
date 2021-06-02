import { PaygPaymentPageObject } from '../../pageObjects/components/paygPaymentPageObject';
import { PaymentPage } from '../../pageObjects/paymentPage';

export class PaygPaymentAssertions {

    private readonly changeAmountText = 'Change';
    private readonly enterOtherAmountLabel = 'Or enter another amount';
    private readonly selectedAmountLabel = 'SELECTED';
    private readonly chooseStandardTopup = 'Choose a standard top up';

    constructor(private paygPayment: PaygPaymentPageObject) {
    }

    public AssertBonusSelectionPageStaticLabels() {
        expect(this.paygPayment.paygBonusHeaderText.isPresent()).toBe(true, `payg standard payment page should always have a header`);
        expect(this.paygPayment.paygBonusEnterAmountLink.isPresent()).toBe(true, `or enter other amount link should always be present`);
        expect(this.paygPayment.paygBonusEnterAmountLink.getText()).toBe(this.enterOtherAmountLabel, `or enter other amount link text should be ${this.enterOtherAmountLabel}`);
    }

    public AssertPaymentAmountSelectionVisibility(isVisible: boolean) {
        expect(this.paygPayment.bonusTopupAmount.isPresent()).toBe(isVisible, `expected the bonus top up amount visibility to be: ${isVisible}`);
        expect(this.paygPayment.bonusAmount.isPresent()).toBe(isVisible, `expected bonus amount's visibility to be: ${isVisible}`);
        expect(this.paygPayment.bonusSelectButton(0).isPresent()).toBe(isVisible, `expected the first standard payment amount to be :${isVisible}`);
    }

    public AssertPrepopulatedPaymentAmountSection(paymentAmount: string, bonusAmount: string) {
        // selected payment amount and bonus
        expect(this.paygPayment.paymentAmountSelected.isPresent()).toBe(true, `the selected payment amount must be present`);
        expect(this.paygPayment.paymentAmountSelected.getText()).toBe(paymentAmount, `the pre-populated payment about is expected to be: ${paymentAmount}`);
        expect(this.paygPayment.paygBonusForPayment.getText()).toBe(this.BonusAmountText(bonusAmount), `the expected bonus amount text is ${this.BonusAmountText(bonusAmount)}`);

        expect(this.paygPayment.paygPaymentAmountSelectedLabel.isPresent()).toBe(true, `the '${this.selectedAmountLabel}' label should always be present when a standard payment amount is selected`);
        expect(this.paygPayment.paygPaymentAmountSelectedLabel.getText()).toBe(this.selectedAmountLabel, `the selected label text should always be ${this.selectedAmountLabel}`);
        expect(this.paygPayment.paymentChangeLink.isPresent()).toBe(true, `the change link should always be present if a customer selected a payment amount`);
    }

    public AssertCustomPaymentBonusSection(isVisible: boolean, expectedBonus: string = '0') {
        expect(this.paygPayment.paymentAmountInputBonus.isPresent()).toBe(isVisible, `bonus amount's visibility is expected to be: ${isVisible}`);

        if (isVisible) {
            expect(this.paygPayment.paymentAmountInputBonus.getText()).toBe(this.CalculatedBonusAmountText(expectedBonus), `the expected bonus amount is ${this.CalculatedBonusAmountText(expectedBonus)}`);
        }
    }

    public AssertUpsellLinkForMoreBonus(paymentAmount: string, bonusAmount: string) {
        expect(this.paygPayment.upsellMessage.isPresent()).toBe(true, `the upsell message is expected to be visible`);
        expect(this.paygPayment.upsellMessage.getText()).toBe(this.UpsellMessageText(paymentAmount, bonusAmount), `the expected upsell message is incorrect`);
    }

    private BonusAmountText = (bonusAmount: string) => `get $${bonusAmount}\nbonus`;
    private CalculatedBonusAmountText = (bonusAmount: string) => `+ $${bonusAmount} bonus`;
    private UpsellMessageText = (paymentAmount: string, bonusAmount: string) => `Top up $${paymentAmount} to get a $${bonusAmount} bonus.`;
}
