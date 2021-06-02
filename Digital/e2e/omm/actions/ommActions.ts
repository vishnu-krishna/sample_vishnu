// import { OmmConfig } from '../configs/ommConfig';
// import { OmmProtractorExtensions } from '../omm.protractor.extensions';
// import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';

/**
 * all common actions
 */
// export class OmmActions {
//     private ommProtractorExtensions: OmmProtractorExtensions;
//     private protractorExtensions: ProtractorExtensions;
//     constructor(ommProtractorExtensions: OmmProtractorExtensions) {
//         this.ommProtractorExtensions = new OmmProtractorExtensions(this.protractorExtensions);
//     }

//     public searchAddress(address: string) {
//         $(OmmConfig.addressSearch.addressInput.id).sendKeys(address);
//     }
//     public searchAndSelectAddress(address: string): boolean {
//         this.searchAddress(address);
//         this.ommProtractorExtensions.waitForElementToBeVisible($(OmmConfig.addressSearch.accentProgressBar.selector));
//         if ($$(OmmConfig.addressSearch.addressLists.selector).get(0).isDisplayed()) {
//             $$(OmmConfig.addressSearch.addressLists.selector).get(0).click();
//             return true;
//         } else {
//             return false;
//         }
//     }
// };
