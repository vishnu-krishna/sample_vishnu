// THE TESTS IN THIS FILE ARE FAILING - THE FILE NEEDS TO BE UPDATED - PLEASE LEAVE IN

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

// import * as _ from 'lodash';
// import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
// import { DashboardPaygObject, DashboardMockDefault } from '../myAccount.e2e-payg';
// import * as moment from 'moment';

// let e2e = new ProtractorExtensions();
// let payg = new DashboardPaygObject();
// let now = new Date('2016-04-28');
// describe('Dashboard', () => {

//     let path = 'overview';

//     let mockData = {

//         'mock.businessPartner': 'AGL_PAYG049401DC19F1A8F80000C99D68E7'

//     };

//     e2e.openPage('/overview', 'desktop', mockData);

//     console.log(mockData);


//     describe('Eligible Pay G customer', () => {

//         describe('User have high credit balance who choose standard bonus to be paid  using Paypal', () => {

//             describe('To verify user with high credit navigates to Make a payment page when click on "Top Up" button  ', () => {
//                 it('Should click on the Top Up button ', () => {
//                     expect(payg.getBillStripButton(0).isPresent()).toBeTruthy();
//                     expect(payg.getBillStripButton(0).getText()).toBe('TOP UP');
//                     payg.getBillStripButton(0).click();
//                 });
//                 it('Should display Make a payment header text', () => {
//                     expect(payg.paymentContainer.isPresent()).toBeTruthy();
//                     expect(payg.paymentHeaderText.getText()).toBe('Make a Payment');
//                 });
//                 it('Should display the address of the customer', () => {
//                     expect(payg.paymentAddressLabel.isPresent()).toBeTruthy();
//                     expect(payg.paymentAddressLabel.getText()).toBe('You are paying for electricity at');
//                 });
//                 it('Should display reference number label ', () => {
//                     expect(payg.paymentReferenceLabel.isPresent()).toBeTruthy();
//                     expect(payg.paymentReferenceLabel.getText()).toBe('Reference number');
//                 });
//             });
//             describe('To verify the Make payment page for selection of standard bonus amount', () => {
//                 it('Should display the payment method label  ', () => {
//                     expect(payg.paygBonusHeaderText.isPresent()).toBeTruthy();
//                     expect(payg.paygBonusHeaderText.getText()).toBe('Payment amount');
//                 });
//                 it('Should display contextual message below payment amount header', () => {
//                     expect(payg.paygBonusHeaderMessage.isPresent()).toBeTruthy();
//                     expect(payg.paygBonusHeaderMessage.getText()).toBe('Bonus amounts may not include any pending payments');
//                 });
//                 it('Should display "Or enter another amount" link ', () => {
//                     expect(payg.paygBonusEnterAmountLink.isPresent()).toBeTruthy();
//                     expect(payg.paygBonusEnterAmountLink.getText()).toBe('Or enter another amount');
//                 });
//                 it('Should display all the standard bonus options', () => {
//                     expect(payg.bonusTopupAmount.isPresent()).toBeTruthy();
//                     expect(payg.bonusAmount.isPresent()).toBeTruthy();
//                     expect(payg.bonusSelectButton(0).isPresent()).toBeTruthy();
//                     payg.bonusSelectButton(0).click();
//                 });
//             });
//             //need to run and check if the logic works!!!!!!
//             describe('To verify the standard bonus bands on the make payment page  ', () => {

//                 it('Should display the top up amount ', () => {
//                     expect(payg.paygBonusTopupLowerband.isPresent()).toBeTruthy();
//                     expect(payg.topUpAmountValue(0).getText()).toBe('50');
//                 });
//                 it('Should display bonus amount', () => {
//                     expect(payg.bonusAmount.isPresent()).toBeTruthy();
//                     expect(payg.bonusAmountValue(0).getText()).toBe('get $5.00 bonus');
//                 });
//                 it('Should display select button to allow to select topup amount', () => {
//                     expect(payg.payPalButton.isPresent()).toBeTruthy();
//                     expect(payg.bonusSelectButton(0).getText()).toBe('select');
//                 });
//                 it('Should display the top up amount ', () => {
//                     expect(payg.paygBonusTopupLowerband.isPresent()).toBeTruthy();
//                     expect(payg.topUpAmountValue(0).getText()).toBe('80');
//                 });
//                 it('Should display bonus amount', () => {
//                     expect(payg.bonusAmount.isPresent()).toBeTruthy();
//                     expect(payg.bonusAmountValue(0).getText()).toBe('get $15.00 bonus');
//                 });
//                 it('Should display select button to allow to select topup amount', () => {
//                     expect(payg.payPalButton.isPresent()).toBeTruthy();
//                     expect(payg.bonusSelectButton(0).getText()).toBe('select');
//                 });
//                 it('Should display the top up amount ', () => {
//                     expect(payg.paygBonusTopupLowerband.isPresent()).toBeTruthy();
//                     expect(payg.topUpAmountValue(0).getText()).toBe('120');
//                 });
//                 it('Should display bonus amount', () => {
//                     expect(payg.bonusAmount.isPresent()).toBeTruthy();
//                     expect(payg.bonusAmountValue(0).getText()).toBe('get $25.00 bonus');
//                 });
//                 it('Should display select button to allow to select topup amount', () => {
//                     expect(payg.payPalButton.isPresent()).toBeTruthy();
//                     expect(payg.bonusSelectButton(0).getText()).toBe('select');
//                 });
//                 it('Should display the top up amount ', () => {
//                     expect(payg.paygBonusTopupLowerband.isPresent()).toBeTruthy();
//                     expect(payg.topUpAmountValue(0).getText()).toBe('150');
//                 });
//                 it('Should display bonus amount', () => {
//                     expect(payg.bonusAmount.isPresent()).toBeTruthy();
//                     expect(payg.bonusAmountValue(0).getText()).toBe('get $35.00 bonus');
//                 });
//                 it('Should display select button to allow to select topup amount', () => {
//                     expect(payg.payPalButton.isPresent()).toBeTruthy();
//                     expect(payg.bonusSelectButton(0).getText()).toBe('select');
//                 });
//                 it('Should display the top up amount ', () => {
//                     expect(payg.paygBonusTopupLowerband.isPresent()).toBeTruthy();
//                     expect(payg.topUpAmountValue(0).getText()).toBe('250');
//                 });
//                 it('Should display bonus amount', () => {
//                     expect(payg.bonusAmount.isPresent()).toBeTruthy();
//                     expect(payg.bonusAmountValue(0).getText()).toBe('get $65.00 bonus');
//                 });
//                 it('Should display select button to allow to select topup amount', () => {
//                     expect(payg.payPalButton.isPresent()).toBeTruthy();
//                     expect(payg.bonusSelectButton(0).getText()).toBe('select');
//                 });

//             });
//             describe('To verify the contextual text on the paypal page  ', () => {
//                 it('Should be able to verify the text below change link ', () => {
//                     payg.payPalButton.click();
//                     /*PayPal supports payments via bank transfer, credit card, debit card and AMEX. 
//                  The best thing is that we don’t charge any fees for payments via PayPal.
//                 And don’t worry if you don’t have an account, you can sign up at the same time. */
//                 });
//                 it('Should be able to verify the text below make payment button  ', () => {
//                     /*Payments submitted before 6pm AEST will reach your account by the next business day.
//                 Any payments submitted after 6pm AEST will take up to 2 business days to reach your account. 
//                 If you have paid your outstanding bills in full, you can disregard any payment reminder notices during this period. */
//                 });
//             });
//             describe('To make payment using paypal payment method  ', () => {
//                 it('Should display the change link ', () => {
//                     //change link
//                     expect(payg.paymentChangeLink.isPresent()).toBeTruthy();
//                     expect(payg.paymentChangeLink.getText()).toBe('Change');
//                 });
//                 it('Should be able to click on the make payment button  ', () => {
//                     expect(payg.makePaymentButton.isPresent()).toBeTruthy();
//                     expect(payg.makePaymentButton.getText()).toBe('MAKE PAYMENT');
//                     payg.makePaymentButton.click();
//                 });
//             });
//             // describe('To verify the payement sucessful page', () => {
//             //     it('Should display Payment successful section ', () => {
//             //         expect(payg.paymentSuccessContainer.isPresent()).toBeTruthy();
//             //         expect(payg.paymentSuccessHeader.isPresent()).toBeTruthy();
//             //         expect(payg.paymentSuccessText.isPresent()).toBeTruthy();
//             //         expect(payg.paymentSuccessText.isPresent()).toBe('Payment successful');
//             //         expect(payg.paymentSuccessIcon.isPresent()).toBeTruthy();
//             //         expect(payg.paymentSuccessFuelType.isPresent()).toBeTruthy();
//             //         expect(payg.paymentSuccessFuelType.isPresent()).toBe('for Electricity at');
//             //         expect(payg.paymentSuccessAddress.isPresent()).toBeTruthy();
//             //     });
//             //     it('Should display amount paid', () => {
//             //         expect(payg.paymentSuccessAmount.isPresent()).toBeTruthy();
//             //     });
//             //     it('Should display bonus amount paid', () => {
//             //         expect(payg.paymentSuccessBonusAmount.isPresent()).toBeTruthy();
//             //     });
//             //     it('Should display the payment success date', () => {
//             //         expect(payg.paymentSuccessPaymentDate.isPresent()).toBeTruthy();
//             //     });
//             //     it('Should display the payment method with payment details', () => {
//             //         expect(payg.paymentSuccessPaymentType.isPresent()).toBeTruthy();
//             //         //veify for the paypal word while verifying the payment type
//             //     });
//             //     it('Should display the Receipt number text and details', () => {
//             //         expect(payg.paymentSuccessReceiptNumber.isPresent()).toBeTruthy();
//             //     });
//             //     it('Should display the Reference number text and details', () => {
//             //         expect(payg.paymentSuccessReferenceNumber.isPresent()).toBeTruthy();
//             //     });
//             // });
//         });

//     });
// });
