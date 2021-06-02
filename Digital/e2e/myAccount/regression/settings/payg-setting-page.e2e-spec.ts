// TODO: This needs to be rewritten using page-objects, context, and scenario-based testing
// This can be easily be included in a scenario for 'manage account' tests

// import { browser, by, element, $, $$ } from 'protractor';
// import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
// import { DashboardPaygObject } from '../myAccount.e2e-payg';

// let e2e = new ProtractorExtensions();
// let payg = new DashboardPaygObject();
// let now = new Date('2016-04-28');
// xdescribe('Settings', () => {

//     beforeAll(() => {
//         let path = 'settings/billing';

//         let mockData = {
//             'mock.businessPartner': 'AGL_PAYG049401DC19F1A8F80000C99D68E7'
//         };

//         e2e.openPage(path, 'desktop', mockData);
//         e2e.settingMock();
//     });
//     // turn off until settings page has been completed
//     describe('To verify the Billing menu for the payg customers.', () => {

//         it('Should not display the monthly billing option ', () => {
//             expect($(payg.billFrequencySetting).isPresent()).toBeFalsy();
//         });
//         it('Should not display the bill smoothing option ', () => {
//             expect($(payg.billSmoothingSetting).isPresent()).toBeFalsy();
//         });
//         it('Should display email Billing option ', () => {
//             expect($(payg.emailBillingSetting).isPresent()).toBeTruthy();
//         });
//         it('Should display energy plans option ', () => {
//             expect($(payg.energyPlansSetting).isPresent()).toBeTruthy();
//         });
//         it('Should display smart meter reading option ', () => {
//             expect($(payg.meterReadingSetting).isPresent()).toBeTruthy();
//         });
//     });
// });

