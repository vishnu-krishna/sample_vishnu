import { browser, by, element, $, $$ } from 'protractor';
import { Context } from '../../../context';
import { ElementFinder } from 'protractor/built/element';

export class PaygPageObject {

     // payg bill messaging - right section
     public paygBillMessageLeftPanel = this.parentContainer.$('agl-bill-message-panel-payg');
     public paygBillPanelSubText = this.parentContainer.$('.bill-panel-message-panel__subtext');

     // payg message box icons - right section
     public tickInBoxIcon = this.parentContainer.$('#wid/bill---payg');
     public outOfCreditIcon = this.parentContainer.$('#No_Credit');
     public lowCreditIcon = this.parentContainer.$('#wd/billing/PAYG-lowBalance');

     // outstanding bill amount (right section - only in billing page)
     public paygOverdueAmountText = this.parentContainer.$('#payment-amount-text');

     // message under the prepaid balance (left section - only in billing page)
     public paygOutstandingBillsMessageLabel = this.parentContainer.$('#bill-panel-debit-dd-message');

     constructor(public parentContainer: ElementFinder) {
    }

    // prepaid balance - left section
    public paygHeadingForContract = (contract: number) => $(`#payg-heading-${contract}`);
    public prepaidBalanceForContract = (contract: number) => $(`#payg-amount-${contract}`);
    public prepaidBalanceDollarNumber = (contract: number) => this.prepaidBalanceForContract(contract).$(`#prepaid-debit-dollars`);
    public paygPrepaidDebitLabel = (contract: number) => this.prepaidBalanceForContract(contract).$(`#prepaid-debit-symbol`);
    public paygPrepaidNegativeSign = (contract: number) => this.prepaidBalanceForContract(contract).$(`#payg-prepaid-negative`);

    // payg bill panel prepaid balance contextual message - right section
    public paygBillPanelMsgHeader = (contract: number) => $(`#bill-panel-message-header-${contract}`);

    // payg overview page - right section ony with bills issued
    public paygBillIssuedPanel = (contract: number) => $(`#overview-bill-panel-${contract}`);
    public paygBillPanelBillIssuedText = (contract: number) => this.paygBillIssuedPanel(contract).$(`.bill-panel-title__title`);
    public paygBillDueAmount = (contract: number) => this.paygBillIssuedPanel(contract).$(`.bill-panel-text__heading-text.paymentAmount`);
    public paygBillDueMessage = (contract: number) => this.paygBillIssuedPanel(contract).$(`.bill-panel-text__heading-text.no-pad-content.bill-panel-text__red.payg`);
    public paygBillDueDate = (contract: number) => this.paygBillIssuedPanel(contract).$(`.bill-panel-text__subheading-text-dash`);
}
