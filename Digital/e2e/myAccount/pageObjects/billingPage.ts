import { browser, by, element, $, $$ , promise } from 'protractor';
import { Context } from '../../context';
import { PaygPageObject } from './components/paygPageObject';
import * as waits from '../../utilities/waits';

export class BillingPage {
    // accounts and contracts
    public billingContainer = $('.billing-container');
    public accounts = $$('.address-header');
    public contracts = $$('.contract-container');
    public billingMenuLink = $('#agl-desktop-header-menu-bills');

    // side nav panel
    public buttonStackLinks = $$('.promo-card-item__action--link');
    public decisioningMarketingTile = $('agl-offer-tile');
    public defaultMarketingTile = $('agl-marketing-tile');

    private currentContext: Context;

    constructor(context: Context) {
        this.currentContext = context;
    }

    // account header
    public accountForIndex = (index: number) => this.accounts.get(index);
    public accountNumber = (index: number) => this.accountForIndex(index).$('.number');
    public accountAddress = (index: number) => this.accountForIndex(index).$('.address');
    // TODO: Fuel Icons

    // bill panel header
    public billContainer = (contract: number) => $(`#billing-container-${contract}`);
    public billFuelTitle = (contract: number) => this.billContainer(contract).$('#fuel-type-title');
    public billFuelTypeIcon = (contract: number, fuelType: string) => this.billContainer(contract).$(`#fuel-type-${fuelType}-icon`);

    // payment amount - left section
    public billPaymentHeader = (contract: number) => this.billContainer(contract).$('.bill-panel-title__title');
    public billPaymentAmount = (contract: number) => this.billContainer(contract).$('.bill-panel-amount').$('.bill-panel-amount__value');
    public billPaymentButton = (contract: number) => $(`#payment-button-${contract}`);

    // due date details - right section
    public billDueInDays = (contract: number) => this.billContainer(contract).$('#bill-panel-heading-text');
    public billDueDateText = (contract: number) => this.billContainer(contract).$('#bill-panel-subheading-text');
    public billPdfDownloadLink = (contract: number) => this.billContainer(contract).$('.bill-panel-text__pdf-open');

    // bills messaging - right section
    public billMainMsgsPanel = (contract: number) => this.billContainer(contract).$('#bill-panel-message-panel-title');
    public billSubTextMsgPanel = (contract: number) => this.billContainer(contract).$('#bill-panel-message-panel-subtext');

    // Bill History section
    public billIssuedMessaging = (contract: number) => this.billContainer(contract).$('.bill-issued--active');
    public billHistoryItems = (contract: number) => this.billContainer(contract).$('.bill-history-bills').$$('.bill-history-bills__row');
    public billPeriodForIndex = (contract: number, index: number) => this.billHistoryItems(contract).get(index).$('.bill-history-bills__row--date');
    public billDaysForIndex = (contract: number, index: number) => this.billHistoryItems(contract).get(index).$('.bill-history-bills__row--days-grey');
    public billPaymentStatusForIndex = (contract: number, index: number) => this.billHistoryItems(contract).get(index).$('.bill-history-bills__row--pay-status');
    public billAmountForIndex = (contract: number, index: number) => this.billHistoryItems(contract).get(index).$('.bill-history-bills__row--payment-amount');
    public billActivePdfLinkForIndex = (contract: number, index: number) => this.billHistoryItems(contract).get(index).$('.pdf-button');

 // monthlyBilling Link
    public getButtonStackLink  =  (index: number) => this.buttonStackLinks.get(index).$('a');
    // TODO: Button stack should be its own componenent
    public getButtonStackLinkText = (index: number) => this.buttonStackLinks.get(index).$('a').getText();

    public createPaygComponentForContract(contract: number): PaygPageObject {
        return new PaygPageObject(this.billContainer(contract));
    }

    public navigate() {
        this.billingMenuLink.click();
        waits.waitForElement(this.contracts.first());
    }
    
    public navigateSetupMonthlyBilling() {
        this.getButtonStackLink(1).click().then(( ) => promise.fulfilled());
    }

    public clickMakeAPaymentForContract(contractNumber: number): void {
        let el = this.billPaymentButton(contractNumber);
        this.currentContext.scrollToElement(el);
        waits.waitForVisibilityOf(el);
        el.click();
    }
}
