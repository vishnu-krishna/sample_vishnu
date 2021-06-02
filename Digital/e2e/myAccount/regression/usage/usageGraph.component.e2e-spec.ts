// TODO: Consolidate all usage tests folder to 1 usage spec file covering multiple scenarios

// import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
// import { browser, by, element, $, $$ } from 'protractor';

// let e2e = new ProtractorExtensions();

// // TODO: TESTCLEANUP
// describe('Usage - Graph', () => {
//     let path = 'usage';
//     let baseMockData = {
//         'sitecore:file': 'e2e-content',
//         'lightMode:file': 'e2e-lightModeFalse'
//     };

//     // Usage - Chart
//     describe('When in usage for basic meter customer,', () => {

//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B7CDAFFF04F18C2A0000C99DF826'
//         };

//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`should show the Chart in the Usage page with relevant cases [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 expect($('.usage-graph').isDisplayed()).toBeTruthy();
//             });
//         }
//         for (let screenSize of e2e.allScreenSizes) {
//             if (screenSize === 'desktop') {
//                 it(`should show Scroll Arrows in the Usage page with relevant cases [${screenSize}]`, () => {
//                     e2e.openPage(path, screenSize, mockData);
//                     expect($('.controls--next').isDisplayed()).toBeTruthy();
//                     expect($('.controls--previous').isDisplayed()).toBeTruthy();
//                 });
//             }
//         }
//     });

//     // Test to check whether the first item is selected or not
//     describe('When in usage for basic meter customer,', () => {

//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B7CDAFFF04F18C2A0000C99DF826'
//         };

//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`the latest bill period should be selected [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 expect($('.dates').getText()).toBe('7 JUN - 13 JUL 2016');
//                 expect($('#GraphInsightTotalCost').getText()).toBe('153');
//                 expect($('#GraphInsightTotalConsumption').getText()).toBe('567');
//             });
//         }
//     });

//     // Test to check whether previous item is selected when clicking the left arrow in the graph
//     describe('When in usage for basic meter customer,', () => {

//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B7CDAFFF04F18C2A0000C99DF826'
//         };

//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`graph should show one of the previous item when clicking the previous arrow in the graph [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 if (screenSize === 'desktop') {
//                     e2e.clickIfPresent($('.controls--previous'));
//                     expect($('.dates').getText()).toBe('4 SEP - 3 DEC 2015');
//                     expect($('#GraphInsightTotalCost').getText()).toBe('567');
//                     expect($('#GraphInsightTotalConsumption').getText()).toBe('1,081');
//                 }
//             });
//         }
//     });

//     // Test to check whether next item from the default position is current bill period
//     describe('When in usage for basic meter customer,', () => {
//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B7CDAFFF04F18C2A0000C99DF826'
//         };
//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             if (screenSize === 'desktop') {// Need to remove this once the issue with arrows are fixed
//                 it(`the current bill period should be selected when clicking the next arrow in the graph [${screenSize}]`, () => {
//                     e2e.openPage(path, screenSize, mockData);
//                     e2e.clickIfPresent($('.controls--next'));
//                     expect($('.dates').getText()).toBe('14 JUL -');
//                     expect($('#GraphInsightTotalCostFuture').getText()).toBe('-');
//                 });
//             }
//         }
//     });

//     // Test to check whether the insight text message is showing when the gaph loads with data
//     describe('When in usage for basic meter customer', () => {
//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B919757991F1B3400000C99D6332'
//         };
//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`the insight text message is showing when the gaph loads with data [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 expect($('.insight-value-text').isDisplayed()).toBeTruthy();
//             });
//         }
//     });

//     // Test to check whether the insight text message is showing when the gaph loads with data
//     describe('When in usage for basic meter customer,', () => {
//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B919757991F1B3400000C99D6332' // If the account is changed then message which is used for validing should be changed accordingly.
//         };
//         let insightMsg = 'more than period before';
//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             it(`the insight text message is showing when the graph loads with data [${screenSize}]`, () => {
//                 e2e.openPage(path, screenSize, mockData);
//                 expect($('.insight-value-text').isDisplayed()).toBeTruthy();
//                 expect($('.insight-value-text').getText()).toBe(insightMsg);
//             });
//         }
//     });

//     // Test to check whether next item from the default position is current bill period and correct message is shown
//     describe('When in usage for basic meter customer,', () => {
//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B919757991F1B3400000C99D6332'
//         };
//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//             if (screenSize !== 'tablet') {// Need to remove this once the issue with arrows are fixed
//                 it(`next item from the default position is current bill period and correct message is shown [${screenSize}]`, () => {
//                     e2e.openPage(path, screenSize, mockData);
//                     if (screenSize === 'desktop') {
//                         e2e.clickIfPresent($('.controls--next'));
//                         expect($('.dates').getText()).toBe('31 JUL -');
//                         expect($('#GraphInsightTotalCostFuture').getText()).toBe('-');
//                     }
//                 });
//             }
//         }
//     });

//     // Test to check the message when the first item is selected
//     describe('When in usage for basic meter customer,', () => {
//         let scenarioData = {
//             'mock.businessPartner': 'AGL_E395B919757991F1B3400000C99D6332'
//         };
//         let mockData = Object.assign({}, baseMockData, scenarioData);
//         for (let screenSize of e2e.allScreenSizes) {
//              if (screenSize !== 'mobile') {
//                 it(`the select the first item in the graph and checking the correct msg[${screenSize}]`, () => {
//                     e2e.openPage(path, screenSize, mockData);
//                     e2e.firstVisibleSelector('.item').click();
//                     expect($('.dates').getText()).toBe('31 OCT - 30 NOV 2015');
//                 });
//             }
//         }
//     });

// });
