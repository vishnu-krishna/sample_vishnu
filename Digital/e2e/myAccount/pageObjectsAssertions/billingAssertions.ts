import { BillingPage } from '../pageObjects/billingPage';
import { PaygAssertions } from './componentsAssertions/paygAssertions';

export class BillingAssertions {

    private readonly makeAPaymentText = `MAKE A PAYMENT`;

    constructor(private billing: BillingPage) {
    }

    public PaygAssertions = (contractNumber: number) => new PaygAssertions(this.billing.createPaygComponentForContract(contractNumber));

    public AssertUserAccountCount(numberOfAccounts: number) {
        expect(this.billing.accounts.count()).toBe(numberOfAccounts, 'expected number of accounts do not match');
    }

    public AssertBillingAccountHeader(accountIndex: number, accountNo: string, address: string) {
        expect(this.billing.accountNumber(accountIndex).getText()).toContain(accountNo, `expected account number for a dual fuel user doesn't match in billing`);
        expect(this.billing.accountAddress(accountIndex).getText()).toContain(address, `expected address for a dual fuel user does not match in billing`);
    }

    // TODO: Make Side Panel a Component
    public AssertBillingSidePanelLinks(sideLinkCount: number, hasBasicMeter: boolean = true) {
        expect(this.billing.buttonStackLinks.count()).toEqual(sideLinkCount, 'the number of side links is incorrect');
        expect(this.billing.getButtonStackLinkText(1)).toEqual('Set up Monthly Billing', `expected text 'Set up Monthly Billing' doesn't match ${this.billing.getButtonStackLinkText(0)}`);
        expect(this.billing.getButtonStackLinkText(2)).toEqual('Switch to eBilling', `expected text 'Switch to eBilling' doesn't match ${this.billing.getButtonStackLinkText(0)}`);

        if (hasBasicMeter) {
            expect(this.billing.getButtonStackLinkText(3)).toEqual('Enter a meter read', `expected text 'Enter a meter read' doesn't match ${this.billing.getButtonStackLinkText(2)}`);
            expect(this.billing.getButtonStackLinkText(4)).toEqual('View Plan', `expected text 'View plan' doesn't match ${this.billing.getButtonStackLinkText(1)}`);
        } else {
            expect(this.billing.getButtonStackLinkText(3)).toEqual('View Plan', `expected text 'View plan' doesn't match ${this.billing.getButtonStackLinkText(1)}`);
        }
    }

    public AssertDecisioningMarketingTileVisible() {
        expect(this.billing.decisioningMarketingTile.isDisplayed()).toBe(true, 'the marketing tile in the billing page is always expected');
    }

    public AssertFuelContractCount(numberOfContracts: number) {
        expect(this.billing.contracts.count()).toBe(numberOfContracts, 'expected number of contracts in the billing page do not match');
    }

    public AssertFuelContractHeader(contractNumber: number, fuelType: string) {
        expect(this.billing.billFuelTitle(contractNumber).getText()).toBe(fuelType, 'fuel type title do not match');
        expect(this.billing.billFuelTypeIcon(contractNumber, fuelType.toLowerCase()).isDisplayed()).toBe(true, `${fuelType} fuel type icon must be displayed in overview`);
    }

    public AssertPaymentAmountSectionVisibility(contractNumber: number, isDisplayed: boolean = true) {
        expect(this.billing.billPaymentHeader(contractNumber).isDisplayed()).toBe(isDisplayed, `expected the bill payment header to be displayed: ${isDisplayed}`);
        expect(this.billing.billPaymentAmount(contractNumber).isDisplayed()).toBe(isDisplayed, `expected the bill payment amount to be displayed: ${isDisplayed}`);
        this.AssertBillPaymentButton(contractNumber);
    }

    public AssertBillPaymentButton(contractNumber: number, isDisplayed: boolean = true, buttonText: string = this.makeAPaymentText) {
        expect(this.billing.billPaymentButton(contractNumber).isDisplayed()).toBe(isDisplayed, `expected the payment button in the billing page to be displayed: ${isDisplayed}`);
        expect(this.billing.billPaymentButton(contractNumber).getText()).toEqual(buttonText, `expected button text in the billing page is ${buttonText}`);
    }

    public AssertPaymentDueDateDetailsSectionVisibility(contractNumber: number, isDisplayed: boolean = true) {
        expect(this.billing.billDueInDays(contractNumber).isPresent()).toBe(isDisplayed, `expected the bill 'due in' days to be displayed: ${isDisplayed}`);
        expect(this.billing.billDueDateText(contractNumber).isPresent()).toBe(isDisplayed, `expected the bill due date to be displayed: ${isDisplayed}`);
        expect(this.billing.billPdfDownloadLink(contractNumber).isPresent()).toBe(isDisplayed, `expected the download PDF Bill link to be displayed: ${isDisplayed}`);
    }

    public AssertBillMessagingSection(contractNumber: number, mainMsg: string, subMsg: string) {
        expect(this.billing.billMainMsgsPanel(contractNumber).getText()).toContain(mainMsg, `expected the bill panel main message to be: ${mainMsg} for contract: ${contractNumber}`);
        expect(this.billing.billSubTextMsgPanel(contractNumber).getText()).toContain(subMsg, `expected the bill sub message to be: ${subMsg} for contract: ${contractNumber}`);
    }

    public AssertBillHistorySectionVisibility(contractNumber: number, index: number, isDisplayed: boolean = true) {
        expect(this.billing.billPeriodForIndex(contractNumber, index).isPresent()).toBe(isDisplayed, `bill history item index: ${index} bill period is expected to be displayed: ${isDisplayed}`);
        expect(this.billing.billDaysForIndex(contractNumber, index).isPresent()).toBe(isDisplayed, `bill history item index: ${index} days pill is expected to be displayed: ${isDisplayed}`);
        expect(this.billing.billPaymentStatusForIndex(contractNumber, index).isPresent()).toBe(isDisplayed, `bill history item index: ${index} payment status is expected to be displayed: ${isDisplayed}`);
        expect(this.billing.billAmountForIndex(contractNumber, index).isPresent()).toBe(isDisplayed, `bill history item index: ${index} amount is expected to be displayed: ${isDisplayed}`);
        expect(this.billing.billActivePdfLinkForIndex(contractNumber, index).isPresent()).toBe(isDisplayed, `bill history item index: ${index} pdf link is expected to be displayed: ${isDisplayed}`);
    }

    public AssertBillHistoryItemCount(contractNumber: number, expectedCount: number) {
        expect(this.billing.billHistoryItems(contractNumber).count()).toEqual(expectedCount, 'expected number of bill history items do not match');
    }
}
