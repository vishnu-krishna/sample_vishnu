// TODO: Consolidate all usage tests folder to 1 usage spec file covering multiple scenarios

// import { browser, by, element, $, $$ } from 'protractor';
// import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';

// let e2e = new ProtractorExtensions();

// // TODO: TESTCLEANUP
// describe('Usage', () => {
//     let path = 'usage';

//     let baseMockData = {
//         'sitecore:file': 'e2e-content',
//         'lightMode:file': 'e2e-lightModeFalse'
//     };

//     // Usage - History Widget
//     describe('When in usage for basic meter customer', () => {

//         let scenarioData = {
//             'mock.businessPartner': 'AGL_0000C99D63321EE4A9A7063D466AFF09'
//         };

//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`should show 'Usage-History' in the Usage page with relevant cases [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 $('#fuel-selector_container-fuels-fuel-gas').click();
//                 expect($('.usage-history').isDisplayed()).toBeTruthy();
//             });
//         }

//     });

//     // Usage - History - Graph area
//     describe('When in usage for basic meter customer', () => {

//         let scenarioData = {
//             'mock.businessPartner': 'AGL_0000C99D63321EE4A9A7063D466AFF09'
//         };

//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`should show 'Usage-History' graph [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 $('#fuel-selector_container-fuels-fuel-gas').click();
//                 expect($('#usage-graph-basicmonthly').isDisplayed()).toBeTruthy();
//                 expect($('.yaxis').isDisplayed()).toBeTruthy();
//             });
//         }

//     });

//     // Usage - Self Service
//     describe('When in usage for basic meter customer', () => {

//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B919757991F1B3400000C99D6332'
//         };

//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`should show 'Usage-Self Service - Meter Read' in the Usage page with relevant cases [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                // $('#fuel-selector_container-fuels-fuel-gas').click();
//                 expect($('.self-service').isDisplayed()).toBeTruthy();
//             });
//         }
//     });

//     // Usage - Energy saving tip
//     describe('When in usage for basic meter customer', () => {

//         let scenarioData = {
//             'mock.businessPartner': 'AGL_0000C99D63321EE4A9A7063D466AFF09'
//         };

//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`should show 'Usage-Energy saving' in the Usage page with relevant cases [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 $('#fuel-selector_container-fuels-fuel-gas').click();
//                 expect($('.energy-saving-tips').isDisplayed()).toBeTruthy();
//             });
//         }
//     });

//     // Usage - Feedback
//     describe('When in usage for basic meter customer', () => {

//         let scenarioData = {
//             'mock.businessPartner': 'AGL_0000C99D63321EE4A9A7063D466AFF09'
//         };

//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`should show 'Usage-Feedback' in the Usage page with relevant cases [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 $('#fuel-selector_container-fuels-fuel-gas').click();
//                 expect($('.feedback').isDisplayed()).toBeTruthy();
//             });
//         }
//     });

//     // Test to check whether frequency message for customer with different billing periods for desktop
//     describe('When in usage for basic meter customer', () => {
//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B919757991F1B3400000C99D6332'
//         };
//         let frequencyMsg = 'Not all bill periods are for the same duration of time, keep this in mind when comparing your usage.';
//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             if (screenSize === 'desktop') {
//                 it(`the frequency message show be displayed for desktop [${screenSize}]`, () => {
//                     e2e.openPage(path, screenSize, mockData);
//                     expect($('.usage-history__bill-freq-change__message').getText()).toBe(frequencyMsg);
//                 });
//             }
//         }
//     });

//     // Test to check whether frequency message for customer with different billing periods for desktop
//     describe('When in usage for basic meter customer', () => {
//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B919757991F1B3400000C99D6332'
//         };
//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             if (screenSize !== 'desktop') {
//                 it(`the frequency message not show for mobile and tablet [${screenSize}]`, () => {
//                     e2e.openPage(path, screenSize, mockData);
//                     expect($('.usage-history__bill-freq-change__message').isDisplayed()).toBeFalsy();
//                 });
//             }
//         }
//     });

//     // Test to check whether frequency message not showing after it is closed once
//     describe('When in usage for basic meter customer', () => {
//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B919757991F1B3400000C99D6332'
//         };
//         let frequencyMsg = 'Not all bill periods are for the same duration of time, keep this in mind when comparing your usage.';
//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             if (screenSize === 'desktop') {
//                 it(`the frequency message should be hidden once it is closed for desktop even after refresh [${screenSize}]`, () => {
//                     e2e.openPage(path, screenSize, mockData);
//                     expect($('.usage-history__bill-freq-change__message').getText()).toBe(frequencyMsg);
//                     e2e.clickIfPresent($('.usage-history__bill-freq-change__image'));
//                     browser.refresh();
//                     expect($('.usage-history__bill-freq-change__message').isPresent()).toBeFalsy();
//                 });
//             }
//         }
//     });
//         // Test to wether contract address is showing correctly
//     describe('When in usage for basic meter customer', () => {
//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E413049401DC19F1A8F80000C99D68E2'
//         };
//         let contractAddress = 'Unit, U4/6 Butler Street, Northcote VIC 3070';
//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`the Address of the default contract should be shown in the contract address selector [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 if (screenSize === 'mobile') {
//                     expect($('#account-selector-header-title').isDisplayed()).toBeFalsy();
//                 } else {
//                     expect($('#account-selector-header-title').isDisplayed()).toBeTruthy();
//                     expect($('#account-selector-header-title').getText()).toBe(contractAddress);
//                 }
//             });
//         }
//     });

//     // Test to wether the address drop down should be shown when clicking the address selector
//     describe('When in usage for basic meter customer', () => {
//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E413049401DC19F1A8F80000C99D68E2'
//         };
//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`the address drop down should be shown when clicking the address selector [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 expect($('.account-selector__items').isPresent()).toBeFalsy();
//                 e2e.clickIfPresent($('#account-selector-header'));
//                 expect($('.account-selector__items').isDisplayed()).toBeTruthy();
//             });
//         }
//     });

//     // Test to wether the address drop down should be shown when clicking the address selector
//     describe('When in usage for basic meter customer', () => {
//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E413049401DC19F1A8F80000C99D68E2'
//         };
//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`when selecting the address it should show corresponding Fuel in usage screen [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 expect($('.account-selector__items').isPresent()).toBeFalsy();
//                 e2e.clickIfPresent($('#account-selector-header'));
//                 let list = element.all(by.css('.account-selector__items .account-selector__items__item'));
//                 list.get(1).click();
//                 expect($('#fuel-selector_container-fuels-fuel-gas').isDisplayed()).toBeTruthy();
//                 expect($('#fuel-selector_container-fuels-fuel-elec').isDisplayed()).toBeFalsy();
//             });
//         }
//     });
// });
