import * as moment from 'moment';
import { Now } from '../../src/app/shared/service/now.service';
import { browser, by, element, $, $$ } from 'protractor';
/**
 * Automated UI testing page object for My Account dashboard
 */
export class DashboardPaygObject {
    public _now: Now;
    public accounts = $('#dashboard-accounts').$$('.account');
    public billStripButtonOverview = $('#bill-strip-button');
    public toolTip = $('#info-tooltip-icon');
    public toolTipPopup = $('#tooltip-popup');

    public paygHeading = '#payg-heading';
    public paygAmount = '#payg-amount';
    public paygPrepaidAmountDollar = '#prepaid-debit-dollars';
    public paygPrepaidAmountCents = '#prepaid-debit-cents';
    public paygPrepaidDR = '#prepaid-debit-symbol';
    public paygPrepaidSign = '#payg-prepaid-negative';
    public overviewBillPanel = '#overview-bill-panel';
    public paypalPaymentButton = '#payment-paypal-button';
    public estimatedReadTooltip = '#estimated-tooltip';
    // components
    public billPanelTitle = 'agl-bill-title';
    public billPanelSubText = 'agl-bill-subtext';
    public billPanelPaymentAmount = 'agl-bill-payment-amount';
    public noDataChart = 'agl-no-data-chart';
    public fuelTitle = 'agl-fuel-title';
    public smartMeterChartComponent = 'agl-smart-meter-chart';
    // settings components
    public billFrequencySetting = 'agl-settings-monthly-billing-entrance';
    public billSmoothingSetting = 'agl-settings-bill-smoothing-temp';
    public emailBillingSetting = 'agl-settings-email-billing';
    public meterReadingSetting = 'agl-settings-meter-reading';
    public energyPlansSetting = 'agl-settings-energy-plans';

    public smartMeterCss = '.smart-meter-chart';
    public newConnectionCss = '.contract-fuel__new-connection';
    public contractInactiveCss = '.contract-fuel__inactive';

    public paygPrepaidSectionContent = $('.smart-meter-chart');
    public usagesChargesHeadingSection = $('#usages-charges-heading-section');
    public decimal = $('.decimal');
    public aglDesktopHeaderMenuBills = $('#agl-desktop-header-menubills');
    public billStripButtonSummary = $('#bill-strip-button-summary');

    // Payement page id's
    public paymentContainer = $('#payment-container');
    public alertText = $('.alert__text');
    public alertTextHeading = $('.alert__text--heading');
    public alertTextBody = $('.alert__text--body');
    //credit card id's
    public buttonDropdownListSelected = $('#button-dropdown-list-selected');
    public paymentCreditCard = $('#payment-credit-card');
    public creditCardVisaIcon = $('#direct-debit-credit-card-visa-icon');
    public buttonDropdownListChange = $('#button-dropdown-list-change');
    public cardNumberTextBox = $('#txtCreditCard');
    public cardHolderNumberlabel = element(by.css('body > div > div:nth-child(2) > form > div > div > div:nth-child(1) > label'));
    ///html/body/div/div[1]/form/div/div/div[1]/label
    public cardExpiryDatelabel = $('.payment-label-dls');
    public expiryMonth = $('#cboExpiryMonth');
    public expiryYear = $('#cboExpiryYear');
    //bonus topup id's:
    public addBonusAmount = $('#add-bonus-amount');
    public addBonusText = $('#addbonus-text');
    //debit scenario id's:
    public paymentAmountView = $('#payment-amount-view');
    public paymentAmountShow = $('#payment-amount-show');
    public paymentAmountBonusList = $('#payment-amount-bonus-list');
    public bonusTableHeader1 = $('#bonus-table-header1');
    public bonusTableHeader2 = $('#bonus-table-header2');
    //Payment successful page id's
    public paymentSuccessContainer = $('#payment-success-container');

    public paymentSuccessHeader = $('#payment-success-header');
    public paymentSuccessText = $('#payment-success-text');
    public paymentSuccessIcon = $('#payment-success-icon');
    public paymentSuccessHeaderText = $('#payment-success-header-text-desktop');
    public paymentSuccessAddress = $('#payment-success-address');
    public paymentSuccessAmount = $('#payment-success-payment-amount');
    public paymentSuccessPaymentDate = $('#payment-success-payment-date');
    public paymentSuccessPaymentType = $('#payment-success-payment-type');
    public paymentSuccessReceiptNumber = $('#payment-success-receipt-number');
    public paymentSuccessReferenceNumber = $('#payment-success-reference-number');
    public paymentSuccess = $('#payment-success-reference-number');
    public alertInfo = $('.alert alert--info');
    public paymentSuccessEmailLabel = $('#payment-success-email-label');
    public paymentSuccessEmailText = $('#payment-success-email-text');
    public paymentSuccessEmailButton = $('#payment-success-email-button');
    public emailLabel = $('#payment-success-email-label');
    public emailTextbox = $('#payment-success-email-text');
    public emailSendButton = $('#payment-success-email-button');
    public bonusPendingText = $('#payment-success-bonus-text');

    //billing page
    public prepaidAmount = $('.bill-panel-amount__value');
    public billHistoryLabel = $('.bill-history__header--heading');
    public billHistorySection = $('.bill-history__container');
    public debitText = $('.bill-panel-text');
    public debitAmount = $('.bill-panel-text__heading-text payg');
    public paymentPending = $('.bill-panel-amount__pending-payment');
    public debitIcon = $('#iconExp_bill');
    public makePaymentGasButton = $('.bill-panel-amount__button-container');

    public accountAddress = '#dashboard-address';
    public fuelTypeTitle = '#fuel-type-title';
    public accountNumber = '#dashboard-account-number';
    public debitPayg = '#bill-panel-amount-payg-debit';
    public subtextPayg = '#bill-panel-message-panel-subtext-payg';

    public paymentButton = '#payment-button';
    public billPanelMessageHeader = '#bill-panel-message-header';

    public getContracts = (accountIndex: number) => this.accounts.get(accountIndex).$$('.contract');
    public getAddressHeaders = (accountIndex: number) => this.accounts.get(accountIndex).$$('.address-header');

    public getOverviewChartPanel(contractNumber: string) {
        return $(`#overview-account-${contractNumber}`);
    };
    public getBillsPanel(contractNumber: string) {
        return $(`#billing-container-${contractNumber}`);
    };
    public getElement(elementName: string, contractNumber: string) {
        return $(`${elementName}-${contractNumber}`);
    }
    public getPAYGBalanceElement(elementName: string, contractNumber: string) {
        let balanceElement = $(`${this.paygAmount}-${contractNumber}`);
        return balanceElement.$(elementName);
    }
    public getPaymentDropdown(index: number) {
        return $(`#dropdown-button-${index.toString()}`);
    }

    public getIndexOfElement(elementName: string, index: number) {
        return $$(elementName).get(index);
    }
    public daysAway(untilDate: moment.Moment): number {
        let days: number = Math.abs(untilDate.diff(this._now.date(), 'days'));
        return days;
    }
    public getAddress(index: number) {
        let add = $$('.address').get(index).getText();
        console.log(add);
        return add;
    }
};

export const DashboardMockDefault = {
    'sitecore': 'e2e-content',
    'selfService.e2e': 'true',
    'syncdata/start': 'e2e-mocked',
    'syncdata/status': 'e2e-complete_success',
    'dashboard': 'e2e-contractDetails-6contracts_payg',
    'pendingpayments': 'e2e-pendingpayments-6contracts_payg',
    'payments': 'e2e-payments-6contracts_payg',
    'bills': 'e2e-billHistory-6contracts_payg',
    'accounts/list': '1xAccount-6xContract_payg',
    'lightMode': 'e2e-lightModefalse',
    'isNewSettings': 'true',
    'paygView': 'e2e-mock-multi-payg-contract'

};
