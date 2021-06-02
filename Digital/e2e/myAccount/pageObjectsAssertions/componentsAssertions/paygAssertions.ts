import { concat } from 'rxjs/operator/concat';
import { PaygPageObject } from '../../pageObjects/components/paygPageObject';
import * as waits from '../../../utilities/waits';
import { browser, $ } from 'protractor';

export class PaygAssertions {

    private readonly paygPrepaidBalanceLabel = `Prepaid balance`;
    private readonly paygDirectDebitSubText = `We’ll only direct debit from this account if and when a bill is due and your balance is in debit.`;

    constructor(private payg: PaygPageObject) {
    }

    public AssertPaygHeaderIsVisible(contract: number, isVisible: boolean) {
        expect(this.payg.paygHeadingForContract(contract).isPresent()).toBe(isVisible, `payg header is expected to be: ${isVisible}`);
    }

    public AssertPrepaidBalanceHeadingIsVisible(contract: number) {
        this.AssertPaygHeaderIsVisible(contract, true);
        expect(this.payg.paygHeadingForContract(contract).isDisplayed()).toBe(true, `payg prepaid balance is expected to always be displayed`);
        expect(this.payg.paygHeadingForContract(contract).getText()).toEqual(this.paygPrepaidBalanceLabel, `expected the prepaid balance label to be: ${this.paygPrepaidBalanceLabel}`);
    }

    public AssertPrepaidBalanceAmount(contract: number, prepaidBalance: string, balanceColor: string, isInDebit: boolean = false) {
        expect(this.payg.prepaidBalanceForContract(contract).getText()).toEqual(prepaidBalance, `expected prepaid balance does not match ${prepaidBalance}`);
        expect(this.payg.prepaidBalanceDollarNumber(contract).getCssValue('color')).toBe(balanceColor, `expected prepaid balance color is: ${balanceColor}`);

        if (isInDebit) {
            expect(this.payg.paygPrepaidDebitLabel(contract).isDisplayed()).toBe(true, 'prepaid balance DR label should be displayed for a debit amount');
            expect(this.payg.paygPrepaidNegativeSign(contract).isDisplayed()).toBe(true, 'prepaid balance negative sign should be displayed for a debit amount');
        }
    }

    public AssertPaygPrepaidBalanceContextualMsg(contract: number, isVisible: boolean, message: string) {
        expect(this.payg.paygBillPanelMsgHeader(contract).isPresent()).toBe(isVisible, `payg contextual message's visibility is expected to be: ${isVisible}`);
        if (isVisible) {
            expect(this.payg.paygBillPanelMsgHeader(contract).getText()).toEqual(message, `payg main contextual message is expected to be ${message}`);
        }
    }

    public AssertBillPanelSubMessagesVisible(isVisible: boolean) {
        expect(this.payg.paygBillPanelSubText.isPresent()).toBe(isVisible, `the bill panel sub messages' visibility is expected to be: ${isVisible}`);
    }

    public AssertPaygBillPanelSubMessages(message: string, isDirectDebit: boolean = false) {
        expect(this.payg.paygBillPanelSubText.getText()).toEqual(isDirectDebit ? message + `\n${this.paygDirectDebitSubText}` : message);
    }

    // <-- Section: Bill is issued for a PAYG customer -->
    public AssertPaygBillAmountDue(billAmount: string) {
        expect(this.payg.paygOverdueAmountText.getText()).toEqual(billAmount, `expected outstanding bill amount to be: ${billAmount}`);
    }

    public AssertPaygBillIssuedSection(contract: number, billDueAmount: string, billDueMessage: string, billDueDate: string) {
        expect(this.payg.paygBillPanelBillIssuedText(contract).isDisplayed()).toBe(true, `bill issued text is expected to be displayed`);
        expect(this.payg.paygBillDueAmount(contract).getText()).toEqual(billDueAmount, `expected bill due amount to be: ${billDueAmount}`);
        expect(this.payg.paygBillDueMessage(contract).getText()).toEqual(billDueMessage, `expected the bill due message to be: ${billDueMessage}`);
        expect(this.payg.paygBillDueDate(contract).getText()).toEqual(billDueDate, `expected the bill due date to be: ${billDueDate}`);
    }

    public AssertPaygWithOverdueBillMsgIsVisible() {
        expect(this.payg.paygOutstandingBillsMessageLabel.isDisplayed()).toBe(true, 'payg with outstanding bill message must be displayed');
        expect(this.payg.paygOutstandingBillsMessageLabel.getText()).toBe('Your account needs your attention. Check your Direct Debit details and make a payment to get back in credit.', 'payg with outstanding bill message must be displayed');
    }
}
