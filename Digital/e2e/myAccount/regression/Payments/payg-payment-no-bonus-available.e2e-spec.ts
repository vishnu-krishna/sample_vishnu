// TODO: This needs to be rewritten using page-objects, context, and scenario-based testing
/*
The dashboard component is the layout container for displaying a customer's
accounts, contracts and fuel panels. A customer may have multiple accounts,
and each account may contain multiple contracts. Each account should start a
new row and contracts may wrap down onto subsequent rows. Electricity contracts
are shown first, so for a typical account with both electricity and gas, the
electricity panel will be on the left and gas on the right. When all contracts
within an account have the same address, then only one address header is shown,
otherwise each account will have its own address header to show the address
associated with that contract.
*/

// import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
// import { DashboardPaygObject } from '../myAccount.e2e-payg';

// let e2e = new ProtractorExtensions();
// let payg = new DashboardPaygObject();
// let now = new Date('2016-04-28');
// describe('Dashboard', () => {

//     beforeAll(() => {
//         let mockData = {
//             'mock.businessPartner': 'AGL_PAYG049401DC19F1A8F80000C99D68E11',
//             'selfService.isFeatureFlagPayment': 'true'
//         };

//         e2e.openPage('/overview', 'desktop', mockData);

//         console.log(mockData);
//     });

//     // DSP-11963 :Bonus breakdown not available from API
//     describe('Eligible Pay G customer', () => {
//         describe('To verify payment page when Bonus breakdown not available  ', () => {
//             it('Should display the correct message when payg balance is in credit', () => {
//                 payg.getElement(payg.paymentButton, '111111111').click();
//                 expect(payg.bonusErrorMessage.isDisplayed()).toBeTruthy();
//                 expect(payg.alertText.isPresent()).toBeTruthy();
//                 expect(payg.bonusErrorMessageHeading.getText()).toBe('We can\'t calculate your bonus right now');
//                 expect(payg.bonusErrorMessageBody.getText()).toBe('Top as usual and we\'ll make sure any acquired bonus is added once your balance is in credit.');
//             });
//         });
//     });
// });

