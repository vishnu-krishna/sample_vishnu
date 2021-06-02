// import { OmmProtractorExtensions } from '../omm.protractor.extensions';
// import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
// import { VasProtractorExtensions } from '../../../e2e/vas/vas.protractor.extensions';
// import { OmmContentModel } from '../../../src/app/shared/model/oneMinMove/ommContent.model';
// import { OmmConfig } from '../configs/ommConfig';
// import { OmmActions } from '../actions/ommActions';
// import { OmmAddresses } from '../mock-data/ommAddresses';

// describe(' Scenario 1 - valid address ', () => {
//     let protractorExtensions: ProtractorExtensions;
//     let vasProtractorExtensions: VasProtractorExtensions;
//     let ommE2e = new OmmProtractorExtensions(protractorExtensions, vasProtractorExtensions);
//     let ommActions = new OmmActions(ommE2e);
//     let flow = protractor.promise.controlFlow();
//     let ommContentModel: OmmContentModel;
//     let path = '';
//     beforeAll(() => {
//         flow.execute(function () {
//             return ommE2e.getSitecoreData();
//         }).then(ommContent => {
//             ommContentModel = <OmmContentModel>ommContent;
//         });
//         ommE2e.openPage(path, 'desktop', false);
//     });

//     it(`should check  address search heading`, () => {
//         //Assert
//         expect($(OmmConfig.addressSearch.movingLbl.id).getText()).toBe(ommContentModel.oneMinuteMove.uiItems.lblMovingTo);
//     });

//     it(`should search for valid address`, () => {
//         //Action
//         ommActions.searchAddress(OmmAddresses.vicDualAddress);
//         ommE2e.waitForElementToBeVisible($(OmmConfig.addressSearch.accentProgressBar.selector));

//         //Assert
//         if ($$(OmmConfig.addressSearch.addressLists.selector).get(0).isDisplayed()) {
//             expect($$(OmmConfig.addressSearch.addressLists.selector).count()).toBeGreaterThan(0);
//         } else {
//             expect($(OmmConfig.addressSearch.errorProgressBar.selector).isDisplayed()).toBeTruthy();
//         }
//         expect($(OmmConfig.addressSearch.noAddrListedBtn.id).isDisplayed()).toBeTruthy();
//     });

//     it(`should select an address from address and go to confirm page`, () => {
//         //Action
//         let isQasListAvailable: boolean = ommActions.searchAndSelectAddress(OmmAddresses.vicDualAddress);

//         //Assert
//         if (!isQasListAvailable) {
//             expect($(OmmConfig.addressSearch.errorProgressBar.selector).isDisplayed()).toBeTruthy();
//         } else {
//             expect(browser.getCurrentUrl()).toMatch(/\/confirm-address-and-energy-types$/);
//         }
//     });
// });
