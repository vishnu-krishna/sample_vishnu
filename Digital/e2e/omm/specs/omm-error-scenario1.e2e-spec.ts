// import { OmmProtractorExtensions } from '../omm.protractor.extensions';
// import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
// import { VasProtractorExtensions } from '../../../e2e/vas/vas.protractor.extensions';
// import { OmmContentModel } from '../../../src/app/shared/model/oneMinMove/ommContent.model';
// import { OmmConfig } from '../configs/ommConfig';
// import { OmmActions } from '../actions/ommActions';
// import { OmmAddresses } from '../mock-data/ommAddresses';


// describe(' Scenario 1 - Invalid address', () => {
//     let protractorExtensions: ProtractorExtensions;
//     let vasProtractorExtensions: VasProtractorExtensions;
//     let ommE2e = new OmmProtractorExtensions(protractorExtensions, vasProtractorExtensions);
//     let ommActions = new OmmActions(ommE2e);
//     let path = '';
//     beforeAll(() => {
//         ommE2e.openPage(path, 'desktop', false);
//     });

//     it(`should not list any address when enter an invalid address`, () => {
//         //Action
//         ommActions.searchAddress(OmmAddresses.invalidAddress);
//         ommE2e.waitForElementToBeVisible($(OmmConfig.addressSearch.errorProgressBar.selector));

//         //Assert
//         expect($$(OmmConfig.addressSearch.addressLists.selector).count()).toBe(0);
//         expect($(OmmConfig.addressSearch.noAddrListedBtn.id).isDisplayed()).toBeTruthy();
//     });

//     it(`should click 'MY ADDRESS ISN'T LISTED' button and display manual address page for  an invalid address`, () => {
//         //Action
//         ommActions.searchAddress(OmmAddresses.invalidAddress);
//         ommE2e.waitForElementToBeVisible($(OmmConfig.addressSearch.errorProgressBar.selector));
//         $(OmmConfig.addressSearch.noAddrListedBtn.id).click();
//         ommE2e.waitForElementToBeVisible($(OmmConfig.manualAddressSearch.manualAddressSearchForm.id));
        
//         //Assert
//         expect($(OmmConfig.manualAddressSearch.manualAddressUnitNumber.id).isDisplayed()).toBeTruthy();
//         expect($(OmmConfig.manualAddressSearch.manualAddressStreetNumber.id).isDisplayed()).toBeTruthy();
//         expect($(OmmConfig.manualAddressSearch.manualAddressStreetName.id).isDisplayed()).toBeTruthy();
//         expect($(OmmConfig.manualAddressSearch.manualAddressStreetType.id).isDisplayed()).toBeTruthy();
//         expect($(OmmConfig.manualAddressSearch.manualAddressSuburb.id).isDisplayed()).toBeTruthy();
//         expect($(OmmConfig.manualAddressSearch.manualAddressState.id).isDisplayed()).toBeTruthy();
//         expect($(OmmConfig.manualAddressSearch.manualAddressPostcode.id).isDisplayed()).toBeTruthy();
//     });
// });
