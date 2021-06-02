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

//         describe('User have balance in debit which is paid using paypal', () => {

//             describe('To verify user with low credit navigates to Make a payment page when click on "Top Up Immeditely" button  ', () => {
//                 it('Should display Make a payment header text', () => {
//                     payg.getElement(payg.paymentButton, '333333333').click();
//                     expect(payg.modalHeader.getText()).toBe('Make a Payment');
//                 });
//                 it('Should display the correct address for the customer', () => {
//                     expect(payg.paymentAddressLabel.getText()).toBe('You are paying for electricity at');
//                     expect(payg.paymentAddressText.getText()).toBe('32/102 Cook St, Parramatta, Sydney, NSW 2150');
//                 });
//                 it('Should display correct reference number', () => {
//                     expect(payg.paymentReferenceLabel.getText()).toBe('Reference number');
//                     expect(payg.paymentReferenceText.getText()).toBe('123456789333333333');
//                 });
//             });
//             describe('To verify the Make payment page for entering the prepaid amount', () => {
//                 it('Should display the payment amount label  ', () => {
//                     expect(payg.paymentAmountLabel.isPresent()).toBeTruthy();
//                     expect(payg.paymentAmountLabel.getText()).toBe('Payment amount');
//                 });
//                 it('Should display contextual message below payment amount header', () => {
//                     expect(payg.paymentAmountDebitBonusText.isPresent()).toBeTruthy();
//                     expect(payg.paymentAmountDebitBonusText.getText()).toBe('Bonuses will be displayed when your balance is in credit');
//                 });
//                 it('Should display payment amount text box', () => {
//                     expect(payg.paymentAmountInput.isPresent()).toBeTruthy();
//                 });
//                 it('Should display view bonuses link', () => {
//                     expect(payg.paymentAmountView.isPresent()).toBeTruthy();
//                     expect(payg.paymentAmountView.getText()).toBe('View bonuses');
//                 });
//                 it('Should be able to click on the view bonuses link', () => {
//                     payg.paymentAmountView.click();
//                 });
//                 it('Should be able to see the hide bonuses link ', () => {
//                     expect(payg.paymentAmountShow.isPresent()).toBeTruthy();
//                     expect(payg.paymentAmountShow.getText()).toBe('Hide bonuses');
//                 });
//                 it('Should display the bonus table ', () => {
//                     expect(payg.paymentAmountBonusList.isPresent()).toBeTruthy();
//                     expect(payg.bonusTableHeader1.getText()).toBe('Pay');
//                     expect(payg.bonusTableHeader2.getText()).toBe('Bonus Credit');
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
//             });
//             describe('To verify the validation messages on the make payment page', () => {
//                 it('Should verify the validation message when amount less than $10', () => {
//                     // enter the payment amount
//                     payg.paymentAmountInput.sendKeys('5');
//                     payg.getPaymentDropdown(0).click();
//                     expect(payg.paymentAmountMinValidation.isPresent()).toBeTruthy();
//                     expect(payg.paymentAmountMinValidation.getText()).toBe('Enter an amount greater than $10.00');
//                 });
//                 it('Should verify the validation message for credit card when amount more than $100,000 ', () => {
//                     payg.paymentAmountInput.clear();
//                     payg.paymentAmountInput.sendKeys('1000000');
//                     // payg.creditCardButton.click();
//                     expect(payg.paymentAmountCcValidation.isPresent()).toBeTruthy();
//                     expect(payg.paymentAmountCcValidation.getText()).toBe('Enter an amount less than $100,000');
//                 });
//                 it('Should verify the validation message for paypal when amount more than $10,000 ', () => {
//                     payg.buttonDropdownListChange.click();
//                     payg.paymentAmountInput.clear();
//                     payg.paymentAmountInput.sendKeys('100000');
//                     payg.getPaymentDropdown(1).click();
//                     expect(payg.paymentAmountPaypalValidation.isDisplayed()).toBeTruthy();
//                     expect(payg.paymentAmountPaypalValidation.getText()).toBe('Enter an amount less than $10,000');
//                 });
//             });
//             describe('To make payment using paypal payment method  ', () => {
//                 it('Should display the change link ', () => {
//                     //change link
//                     payg.buttonDropdownListChange.click();
//                     payg.paymentAmountInput.clear();
//                     payg.paymentAmountInput.sendKeys('100');
//                     payg.getPaymentDropdown(1).click();
//                     expect(payg.buttonDropdownListChange.isPresent()).toBeTruthy();
//                     expect(payg.buttonDropdownListChange.getText()).toBe('Change');
//                 });
//                 it('Validate paypal payment button', () => {
//                     expect($(payg.paypalPaymentButton).isPresent()).toBeTruthy();
//                     expect($(payg.paypalPaymentButton).getText()).toBe('PAY BY PAYPAL');
//                 });
//             });
//         });
//     });
// });





