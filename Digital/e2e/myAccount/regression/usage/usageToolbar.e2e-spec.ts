// TODO: Consolidate all usage tests folder to 1 usage spec file covering multiple scenarios

// import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
// import { UsagePageObject } from '../../../src/app/myAccount/myAccount.e2e-pages';

// let e2e = new ProtractorExtensions();
// let usagePage = new UsagePageObject();

// describe('Usage - Toolbar', () => {

//     let path = 'usage';
//     let baseMockData = {
//         'sitecore:file': 'e2e-content',
//         'lightMode:file': 'e2e-lightModeFalse'
//     };

//     beforeAll(() => {

//     });

//     describe('User with single account should appear in the account drop down list', () => {

//         let scenarioData = {
//             'mock.businessPartner': 'AGL_0000C99D63321EE4A9A7063D466AFF09'
//         };

//         let mockData = Object.assign({}, baseMockData, scenarioData);

//         for (let screenSize of e2e.allScreenSizes) {
//             it(`Testing visibility of currently selected address for [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 if (screenSize === 'mobile') {
//                     expect(usagePage.accountSelector.selectedAccount.address.isDisplayed()).toBeFalsy();
//                 } else {
//                     expect(usagePage.accountSelector.selectedAccount.address.isDisplayed()).toBeTruthy();
//                 }
//             });
//         }

//     });
// });
