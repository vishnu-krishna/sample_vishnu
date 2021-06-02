// TODO: This needs to be rewritten using page-objects, context, and scenario-based testing

// /*
// The dashboard component is the layout container for displaying a customer's
// accounts, contracts and fuel panels. A customer may have multiple accounts,
// and each account may contain multiple contracts. Each account should start a
// new row and contracts may wrap down onto subsequent rows. Electricity contracts
// are shown first, so for a typical account with both electricity and gas, the
// electricity panel will be on the left and gas on the right. When all contracts
// within an account have the same address, then only one address header is shown,
// otherwise each account will have its own address header to show the address
// associated with that contract.
// */
// import { browser, by, element, $, $$ } from 'protractor';
// import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
// import { DashboardPaygObject } from '../myAccount.e2e-payg';

// let e2e = new ProtractorExtensions();
// let payg = new DashboardPaygObject();
// let now = new Date('2016-04-28');
// describe('Dashboard', () => {

//     beforeAll(() => {
//         let mockData = {

//             'mock.businessPartner': 'AGL_PAYG049401DC19F1A8F80000C99D68E7',
//             'selfService.isFeatureFlagPayment': 'true'

//         };
//         e2e.openPage('/overview', 'desktop', mockData);
//         console.log(mockData);
//     });

//     describe('Eligible Pay G customer', () => {

//         describe('User have low credit balance who choose custom entry bonus to be paid using paypal', () => {

//             describe('To verify user with low credit navigates to Make a payment page when click on "Top Up For Bonuses" button  ', () => {
//                 it('Should display Make a payment header text', () => {
//                     payg.getElement(payg.paymentButton, '222222222').click();
//                     expect(payg.modalHeader.getText()).toBe('Make a Payment');
//                 });
//                 it('Should display the correct address for the customer', () => {
//                     expect(payg.paymentAddressLabel.getText()).toBe('You are paying for electricity at');
//                     expect(payg.paymentAddressText.getText()).toBe('32/102 Cook St, Parramatta, Sydney, NSW 2150');
//                 });
//                 it('Should display correct reference number', () => {
//                     expect(payg.paymentReferenceLabel.getText()).toBe('Reference number');
//                     expect(payg.paymentReferenceText.getText()).toBe('123456789222222222');
//                 });
//                 it('Should display the payment amount label  ', () => {
//                     expect(payg.paygBonusHeaderText.isPresent()).toBeTruthy();
//                     expect(payg.paygBonusHeaderText.getText()).toBe('Payment amount');
//                 });
//                 it('Should click on the "Or enter another amount" link ', () => {
//                     expect(payg.paygBonusEnterAmountLink.isPresent()).toBeTruthy();
//                     expect(payg.paygBonusEnterAmountLink.getText()).toBe('Or enter another amount');
//                     payg.paygBonusEnterAmountLink.click();
//                 });
//                 it('Should navigate to previous page on click of "or choose a standard topup" link ', () => {
//                     expect(payg.paymentAmountPaygBack.isPresent()).toBeTruthy();
//                     payg.paymentAmountPaygBack.click();
//                 });
//                 it('Should display all the standard bonus options', () => {
//                     expect(payg.bonusTopupAmount.isPresent()).toBeTruthy();
//                     expect(payg.bonusAmount.isPresent()).toBeTruthy();
//                     expect(payg.bonusSelectButton(0).isPresent()).toBeTruthy();
//                     payg.bonusSelectButton(0).click();
//                     payg.paymentChangeLink.click();
//                     payg.paygBonusEnterAmountLink.click();
//                 });
//                 it('Should display payment amount text box', () => {
//                     expect(payg.paymentAmountInput.isPresent()).toBeTruthy();
//                 });
//                 it('Should display bonus amount text box ', () => {
//                     expect(payg.paymentAmountInputBonus.isPresent()).toBeTruthy();
//                 });
//             });
//             describe('To verify the validation messages on entering the amount beyond limit', () => {
//                 it('Should verify the validation message when amount less than $10', () => {

//                     payg.paymentAmountInput.sendKeys('5');
//                     payg.getPaymentDropdown(0).click();
//                     expect(payg.addBonusText.isDisplayed()).toBeFalsy();
//                     expect(payg.paymentAmountMinValidation.isPresent()).toBeTruthy();
//                     expect(payg.paymentAmountMinValidation.getText()).toBe('Enter an amount greater than $10.00');
//                 });
//                 it('Should verify the validation message for paypal when amount more than $10,000 ', () => {
//                     payg.paymentAmountInput.clear();
//                     payg.paymentAmountInput.sendKeys('100000');
//                     payg.buttonDropdownListChange.click();
//                     payg.getPaymentDropdown(1).click();
//                     expect(payg.paymentAmountPaypalValidation.isDisplayed()).toBeTruthy();
//                     expect(payg.paymentAmountPaypalValidation.getText()).toBe('Enter an amount less than $10,000');

//                 });
//                 it('Should verify the validation message for credit card when amount more than $100,000 ', () => {
//                     payg.buttonDropdownListChange.click();
//                     payg.paymentAmountInput.clear();
//                     payg.paymentAmountInput.sendKeys('100,0001');
//                     payg.getPaymentDropdown(0).click();
//                     expect(payg.paymentAmountCcValidation.isPresent()).toBeTruthy();
//                     expect(payg.paymentAmountCcValidation.getText()).toBe('Enter an amount less than $100,000');

//                 });
//             });
//             describe('To verify the message for top-up bonus eligibilty ', () => {
//                 it('Should verify the message that informs customer to top-up for bonus eligibility', () => {
//                     expect(payg.paymentAmountInput.isPresent()).toBeTruthy();
//                     payg.paymentAmountInput.clear();
//                     payg.paymentAmountInput.sendKeys('10.58');
//                     payg.buttonDropdownListChange.click();
//                     payg.getPaymentDropdown(1).click();

//                     expect(payg.addBonusText.isPresent()).toBeTruthy();
//                     expect(payg.addBonusAmount.isPresent()).toBeTruthy();
//                     expect(payg.addBonusText.getText()).toBe('Top up $50 to get a $10 bonus.');
//                     payg.addBonusAmount.click();
//                     payg.buttonDropdownListChange.click();
//                 });
//             });

//             describe('To verify the payment is done by using one of the payment amount  ', () => {
//                 it('Should display the payment amount label ', () => {
//                     expect(payg.paymentMethodsLabel.isPresent()).toBeTruthy();
//                     expect(payg.paymentMethodsLabel.getText()).toBe('Pay with');

//                 });
//                 it('Should display credit card option as payment method', () => {
//                     expect(payg.getPaymentDropdown(0).isPresent()).toBeTruthy();
//                     expect(payg.getPaymentDropdown(0).getText()).toBe('CREDIT CARD');
//                 });
//                 it('Should display paypal option as payment method', () => {
//                     expect(payg.getPaymentDropdown(1).isPresent()).toBeTruthy();
//                     expect(payg.getPaymentDropdown(1).getText()).toBe('PAYPAL');
//                 });
//                 it('Should display Payment amount label ', () => {
//                     expect(payg.paymentAmountLabel.isPresent()).toBeTruthy();
//                 });
//                 it('Should display the change link ', () => {
//                     // change link
//                     payg.getPaymentDropdown(1).click();
//                     //  browser.pause();
//                     expect(payg.buttonDropdownListChange.isPresent()).toBeTruthy();
//                     expect(payg.buttonDropdownListChange.getText()).toBe('Change');
//                     payg.buttonDropdownListChange.click();
//                 });

//                 it('Should enter the prepaid amount in the text box', () => {
//                     payg.paymentAmountInput.clear();
//                     payg.paymentAmountInput.sendKeys('100');
//                     expect(payg.paymentAmountInputBonus.isPresent()).toBeTruthy();
//                     expect(payg.paymentAmountInputBonus.getText()).toBe('+ $15 bonus');
//                     payg.getPaymentDropdown(1).click();
//                 });
//                 it('Validate paypal payment button', () => {
//                     expect($(payg.paypalPaymentButton).isPresent()).toBeTruthy();
//                     expect($(payg.paypalPaymentButton).getText()).toBe('PAY BY PAYPAL');
//                 });
//             });
//         });
//     });
// });
