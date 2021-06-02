import { $, $$ } from 'protractor';
import { ProtractorExtensions } from './../shared/e2e/protractor.extensions';

/**
 * Automated UI testing page object for My Account dashboard
 */
export class DashboardPageObject {
    public e2e = new ProtractorExtensions();

    public pilotBannerSitePreferenceCookie = 'AGL_beta_site_login';

    public pilotBanner = $('#pilot-banner');
    public pilotBannerTitle = $('#pilot-banner-title');
    public pilotBannerBody = $('#pilot-banner-body');
    public pilotBannerOldButton = this.e2e.$1('#pilot-banner-old-button');
    public pilotBannerBetaButton = this.e2e.$1('#pilot-banner-beta-button');

    public backToTop = $('#back-to-top');

    public accounts = $('#dashboard-accounts').$$('.overview');
    public billsAccounts = $('#billing-accounts').$$('.account');

    public firstContract = this.accounts.get(0).$$('.overview--account').get(0);
    public billsFirstContract  = this.billsAccounts.get(0).$$('.contract-container').get(0);
    public billsSecondContract = this.billsAccounts.get(0).$$('.contract-container').get(1);

    public billstriptitle = $('.bill-strip-date-title');
    public billstripdd = $('.content');
    public billsAddressHeader = $('.address-header');
    public billsAccountNumber = this.billsAddressHeader.$$('.number');
    public billsAddress = this.billsAddressHeader.$$('.address');
    public billsFirstFuel = $('.fuel-title');

    public billingFormPopup = $('agl-modal-confirm').$('.billing-address-modal');
    public billingForm = {
        addressHeader: $('agl-billing-form').$('.billing-address-modal__header'),
        address: $('agl-billing-form').$('.billing-address-modal__address'),
        reference: $('agl-billing-form').$('.billing-address-modal__reference'),
        amountInput: $('agl-billing-form').$('.billing-form__payment-amount--input'),
        tabs: $('agl-billing-form').$('.billing-form__tabs'),
        activeTab: $('agl-billing-form').$('.billing-form__tabs--link.active')
    };

    public billStrip = {
        amountRow: this.firstContract.$('.bill-panel-amount__value'),
        payBillButton: this.firstContract.$('.dls-button'),
        payBillLink: this.firstContract.$('.bill-strip__info').$('a'),
        paymentPopup: $('agl-modal-confirm').$('.dialog-container'),
        paymentPopupAmount: $('agl-modal-confirm').$('.billing-form__payment-amount--input'),

        expectAmount: (amountTitle, amount) => {
            expect(this.firstContract.$('.bill-strip-amount-title').getText()).toBe(amountTitle);
            expect(this.firstContract.$('.bill-strip-amount').getText()).toBe(amount);
        },
        expectDate: (dateTitle, date) => {
            expect(this.firstContract.$('#billStripDateTitle').getText()).toBe(dateTitle);
            expect(this.firstContract.$('#billStripDateDate').getText()).toBe(date);
        },
        expectRemainingBalance: (balanceTitle, amount) => {
            expect(this.firstContract.$('#pendingOverdueTitle').getText()).toBe(balanceTitle);
            expect(this.firstContract.$('#pendingOverdueAmount').getText()).toBe(amount);
        },
        expectTotalToPay: (balanceTitle, amount) => {
            expect(this.firstContract.$('#totalToPayTitle').getText()).toBe(balanceTitle);
            expect(this.firstContract.$('#totalToPayAmount').getText()).toBe(amount);
        },
        expectButton: (label, cssClass, icon?) => {
            expect(this.firstContract.$('.bill-strip__button').getText()).toBe(label);
            expect(this.e2e.hasClass(this.firstContract.$('.bill-strip__button'), cssClass)).toBeTruthy();
            if (icon) {
                expect(this.firstContract.$('.bill-strip__button').$('img.icon').isDisplayed()).toBeTruthy();
                expect(this.firstContract.$('.bill-strip__button').$('img.icon').getAttribute('src')).toMatch(`/${icon}.svg$`);
            }
        },
        expectOverdueHighlighting: () => {
            expect(this.e2e.hasClass(this.firstContract.$('.bill-strip-date'), 'overdue')).toBeTruthy();
            expect(this.e2e.hasClass(this.firstContract.$('.bill-strip-amount'), 'overdue')).toBeTruthy();
        },
        expectInfoContains: (text) => {
            expect(this.firstContract.$('.bill-strip__info').isDisplayed()).toBeTruthy();
            expect(this.firstContract.$('.bill-strip__info').getText()).toContain(text);
        },
        expectButtonHidden: () => {
            expect(this.firstContract.$('.bill-strip__button').isPresent()).toBeFalsy();
        }
    };

    public expandedBillStrip = {
        expectBreakdownHeader: (label) => {
            expect($('.bill-strip-expanded__right-container-billoverview').getText()).toBe(label);
        },
        expectBalanceHeaderAndAmount: (label, amount) => {
            expect($('#bill-table-first-header').getText()).toBe(label);
            expect($('#bill-table-first-amount').getText()).toBe(amount);
        },
        expectNewChargesHeaderAndAmount: (label, amount) => {
            expect($('#bill-table-second-header').getText()).toBe(label);
            expect($('#bill-table-second-amount').getText()).toBe(amount);
        },
        expectTotalToPayAndAmount: (label, amount) => {
            expect($('#bill-table-total-to-pay').getText()).toBe(label);
            expect($('#bill-table-total-to-pay-amount').getText()).toBe(amount);
        },
        expectTotalToPayAndAmountLeftPanel: (label, amount, pending?) => {
            expect($('.bill-strip-expanded__left-container-total-to-pay').getText()).toBe(label);
            if (pending) {
              expect($('.bill-strip-expanded__left-container-total-pending').getText()).toBe(amount);
            } else {
              expect($('.bill-strip-expanded__left-container-total').getText()).toBe(amount);
            }
        }
    };

    public bills = {
        expectfirstContractContainsAccountNumber: (accountnumber) => {
            expect(this.billsFirstContract.$('.address-header').isDisplayed()).toBeTruthy();
            expect(this.billsFirstContract.$('.number').getText()).toContain(accountnumber);
        },
        expectfirstContractContains: (text) => {
            expect(this.billsFirstContract.$('.address-header').isDisplayed()).toBeTruthy();
            expect(this.billsFirstContract.$('.address').getText()).toContain(text);
        },
        expectfirstContractContainsFuelType: (fuel) => {
            expect(this.billsFirstContract.$('.fuel-type-title').getText()).toContain(fuel);
        },
        expectSecondContractContainsAccountNumber: (accountnumber) => {
            expect(this.billsSecondContract.$('.address-header').isDisplayed()).toBeTruthy();
            expect(this.billsSecondContract.$('.number').getText()).toContain(accountnumber);
        },
        expectSecondContractContains: (text) => {
            expect(this.billsSecondContract.$('.address-header').isDisplayed()).toBeTruthy();
            expect(this.billsSecondContract.$('.address').getText()).toContain(text);
        },
        expectSecondContractContainsFuelType: (fuel) => {
            expect(this.billsSecondContract.$('.fuel-type-title').getText()).toContain(fuel);
        }
    };

    public billHistory = {
        expectDateRange: (dateRange: string) => {
            expect($$('.bill-history-bills__row--date').get(2).getText()).toBe(dateRange);
        },
        expectAmount: (amount: string) => {
            expect($$('.bill-history-bills__row--payment-amount').get(0).getText()).toBe(amount);
        },
        expectMobAmount: (amount: string) => {
            expect($$('.bill-history-bills__row--bottom-wrap').get(0).getText()).toBe(amount);
        },
        expectPayStatusText: (text: string) => {
            expect($$('.bill-history-bills__row--pay-status-paynow').get(0).getText()).toBe(text);
        },
        expectCreditAmount: (cssClass: string, amount: string) => {
            expect(this.e2e.hasClass($$('.bill-history-bills__row--payment-amount').get(1), cssClass)).toBeTruthy();
            expect($$('.bill-history-bills__row--payment-amount').get(1).getText()).toBe(amount);
        },
        expectCreditMobAmount: (cssClass: string, amount: string) => {
            expect(this.e2e.hasClass($$('.bill-history-bills__row--bottom-wrap').get(0), cssClass)).toBeTruthy();
            expect($$('.bill-history-bills__row--bottom-wrap').get(0).getText()).toBe(amount);
        },
    };
}

export const DashboardMockDefault = {
    'sitecore':         'e2e-content',
    'selfService.e2e':  'true',
    'syncdata/start':   'e2e-mocked',
    'syncdata/status':  'e2e-complete_success',
    'dashboard':        'e2e-contractDetails',
    'pendingpayments':  'e2e-noPendingPayments',
    'payments':         'e2e-payments_BalancePaid',
    'bills':            'e2e-billHistory',
    'accounts/list':    'e2e-1xAccount-1xContract',
    'lightMode':        'e2e-lightMode',
    'isNewSettings':    'true'
};

export class UsagePageObject {
    public accountSelector = {
        selectedAccount: {
            address: $('#account-selector-header-title')
        }
    };
    private e2e = new ProtractorExtensions();
}
