// import { $, by, element } from 'protractor';
// import { Context } from '../../context';

// // DEPRECATED - use the overviewPage instead
// // leaving this here for future reference, i.e. payg elements, smsPay elements
// // TODO: create pageObjects for them then delete this file!
// export const overview = {
//     homepage: {
//         // Ask Why is this seperate?
//         navigate: (context: Context) => context.goToPage('/'),
//     },
//     header: $('agl-app-header'),
//     firstName: (user) => element(by.cssContainingText('.agl-desktop-header-user__name', user.firstName)),
//     navigate: (context: Context) => {
//         context.goToPage('/overview');
//     },
//     addPlanText: by.linkText('Add plan'),
//     changePlanText: by.linkText('Change plan'),
//     addPropertyText: by.linkText('Add property'),
//     inputBoxPymntModal: $('#payment-amount-input'),
//     bankAccountButton: $('#dropdown-button-0'),
//     creditCardButton: $('#dropdown-button-0'),
//     payPalButton: $('#dropdown-button-1'),
//     closeButtnPaymentModal: $('#modal-close-button'),
//     // CONTACT_US: 'https://www.agl.com.au/residential/contact-us',
//     // HELP: 'https:/ ww.agl.com.au/residential/help-and-support',
//     payg: {
//         paygHeading: $('#payg-heading-{{contract.contractNumber}}'),
//         tooltipheading: $('#usages-charges-heading-section'),
//         toolTip: $('#tooltip-section'),
//         toolTipPopup: $('#tooltip-popup display'),
//         paygPrepaidAmountDollar: $('#prepaid-debit-dollars'),
//         paygPrepaidAmountCents: $('#prepaid-debit-cents'),
//         contextualmsg: $('#bill-panel-message-header'),
//         billPanelTitle: by.xpath('//*[@id="overview-bill-panel-444444444"]/div/agl-bill-title/div/div'),
//         billPanelAmount: by.xpath('//*[@id="overview-bill-panel-444444444"]/div/agl-bill-subtext/div/div/div[1]'),
//         billPanelText: by.xpath('//*[@id="overview-bill-panel-444444444"]/div/agl-bill-subtext/div/div/div[2]'),
//         billPanelDate: by.xpath('//*[@id="overview-bill-panel-444444444"]/div/agl-bill-subtext/div/div/div[3]'),
//         billPanelHeading: by.xpath('//*[@id="overview-bill-panel-555555555"]/div/agl-bill-title/div/div'),
//         billAmount: $('#bill-panel-amount-value'),
//     },
//     smsPay: {
//         smsPayBanner: $('.sms-banner'),
//         smsPayBannerIcon: $('.sms-banner .sms-banner__icon'),
//         smsPayIsHere: $('.sms-banner .sms-banner__text-header'),
//         smsPaySubText: $('.sms-banner__text .sms-banner__text-subtext'),
//         smsPayButton: $('.sms-banner__cta-button.mat-raised-button.mat-primary'),
//         smsPayClose: $('.sms-banner__close.material-icons.hidden-xs'),
//     },

// };
