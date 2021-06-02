import { $, $$, by, element } from 'protractor';
import * as waits from '../../utilities/waits';

export const settings = {
    clickManageAccountsLink: () => {
        settings.manageAccountHeaderLink.click();
    },
    clickContactDetailsEditFromSettingsPage: () => {
        settings.contactDetailsEdit.click();
    },

    clickAddConcessionLink: () => {
        settings.concessionAddLink.click();
    },

    settingsContainer: $('.settings-container'),
    manageAccountHeaderLink: $('#agl-desktop-header-menu-settings'),
    usageHeaderLink: $('#agl-desktop-header-menu-usage'),
    personalHeaderText: by.linkText('Personal'),
    offerLink: by.linkText('Offers'),
    directDebitLink: by.linkText('Direct Debit'),
    directDebit:
    {
        directDebitLink: $('a.settings-desktop-left-menu--settings-directdebit'),
        cancelDirectDebitLink : $('#cancel-direct-debit'),
        clickDirectdDebit() {
            element(settings.directDebitLink).click();
            },

    },
    myWalletLink: $('.settings-desktop-left-menu--settings-mywallet'),
    addPaymentMethodText: by.cssContainingText('p', 'ADD A PAYMENT METHOD'),
    addCardText: by.cssContainingText('span', 'ADD CARD'),
    contactDetailsEdit: $('a.settings-container__contact-details-link'),
    concessionAddLink: $('.concession__add-link'),
    notifications: {
        notificationsLink: by.linkText('Notifications'),
        clickNotificationsLink: () => {
            element(settings.notifications.notificationsLink).click();
        }
    },
    billing: {
        billingLink: by.linkText('Billing'),
        billingHeaderLink: $('#agl-desktop-header-menu-bills'),
        contactDetailsAddViaBilling: by.css('.paperless-bill-on__edit-email-address'),
        billingContainer: $('.billing-container'),
        monthlyBilling : element(by.cssContainingText('h4', 'Monthly billing')),
        setupmonthlyBillinglink : element(by.linkText('Set up')),
        manageMonthlyBilling : by.linkText('Manage'),
        mandatoryMonthlyBillingMsg : $('div.maui-fuel-chip__last-secondary-status-message'),

        clickContactDetailsFromEbilling: () => {
            element(settings.billing.contactDetailsAddViaBilling).click();
        },
        clickBillingLink: () => {
            waits.waitForVisibilityOf(element(settings.billing.billingLink));
            element(settings.billing.billingLink).click();
        },
        ellipsesButtons: $$('.ellipses-button'),
        ellipsesButtonContent: $('.ellipses-button__content'),
        ellipsesButtonContentRow: $$('.ellipses-button-content__row'),
        clickManageMonthlyBillingLink: () => {
            waits.waitForVisibilityOf(element(settings.billing.manageMonthlyBilling));
            element(settings.billing.manageMonthlyBilling).click();
        },
    },
    smsPay: {
        smsPayTile: $('.settings-desktop-left-menu--settings-smspay'),
        smsPayLink: by.linkText('SMS Pay'),
        smsPayContainer: $('.pa-settings'),
        mobileIcon: $('.sms-pay__mobile-container-mobile-icon'),
        contactDetailsEdit: $('.sms-pay__mobile-container-update-mobile-link'),
        contactDetailsAdd: $('.sms-pay__mobile-container-add-mobile-link'),
        clickContactDetailsEditFromSmsPay: () => {
            settings.smsPay.contactDetailsEdit.click();
        },
        clickContactDetailsAddFromSmsPay: () => {
            settings.smsPay.contactDetailsAdd.click();
        },
        clickSmsPayLink: () => {
            element(settings.smsPay.smsPayLink).click();
        }
    },
    flybuysLink: $('#flybuys_link'),
    billsmoothing: by.css("a[class='settings-desktop-left-menu--settings-billsmoothing']"),
    pageSelector: by.className('settings'),
    modalCloseButton: $('#modal-close-button'),

    billsmoothingpage: {
        billSmoothingContainer: $('agl-settings-billsmoothing'),
        billSmoothingHeader: element(by.className('main-card-header')),
        introductionText: element(by.className('intro')),
        linkInIntroduction: element(by.className('link')),
        billSmoothingLinkTitle: element(by.className('bs-modal-header')),
        graphBox: $('#Rectangle'),
        graphHeader: $('#How-your-energy-cost'),
        graphHeaderForecast: $('#Forecast'),
        graphHeaderAmount: $('#Bill-Smoothing-amoun'),
        billSmoothingsetupButton: $('.bs-setup-button button span'),
        billSmoothingcloseConfrimationButton: by.cssContainingText('span', 'CLOSE'),
        // Weekly
        billSmoothingWeeklyRadioOption: $('.setup-fuel-Weekly'),
        billSmoothingWeeklyPaymentDueDropdown: $('.setup-selector-dropdown-payment-due-Weekly select'),
        billSmoothingWeeklyStartDateDropdown: $('.setup-selector-dropdown-start-date-Weekly select'),
        billSmoothingWeeklySaveButton: $('.setup-save-button-Weekly'),
        // Fortnightly
        billSmoothingFortnightlyRadioOption: $('.setup-fuel-Fortnightly'),
        billSmoothingFortnightlyPaymentDueDropdown: $('.setup-selector-dropdown-payment-due-Fortnightly'),
        billSmoothingFortnightlyStartDateDropdown: $('.setup-selector-dropdown-start-date-Fortnightly'),
        billSmoothingFortnightlySaveButton: $('.setup-save-button-Fortnightly'),

        // Monthly
        billSmoothingMonthlyRadioOption: $('.setup-fuel-Monthly'),
        billSmoothingMonthlyPaymentDueDropdown: $('.setup-selector-dropdown-payment-due-Monthly'),
        billSmoothingMonthlyStartDateDropdown: $('.setup-selector-dropdown-start-date-Monthly'),
        billSmoothingMonthlySaveButton: $('.setup-save-button-Monthly'),

        billSmoothingstartPaymentText: $('.setup-payment-start-information .start-information-text--bold'),
        billSmoothingstartPaymentsubText: $('.setup-payment-start-information .start-information-subtext'),
    },
        billSmoothingHeadingText: $('agl-settings-billsmoothing div.main-card-header')
};
