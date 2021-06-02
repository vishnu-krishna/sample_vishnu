// import { ProtractorExtensions } from '../../src/app/shared/e2e/protractor.extensions';

// /*
// * The generic class for Omm extensions. This class is using both Common protractor extensions and Vas protractor extensions
// */
// export class OmmProtractorExtensions {
//     private protractorExtensions: ProtractorExtensions;
//     constructor(
//         protractorExtensions: ProtractorExtensions,
//     ) {
//         this.protractorExtensions = new ProtractorExtensions();
//     }

//     /**
//      * Method used to open a page in current browser
//      * @param url:string  url to be loaded
//      * @param size:string  Mobile/Desktop
//      * @param ignoreSynchronization:boolean
//      */
//     public openPage(url: string, size: string, ignoreSynchronization = false) {
//         browser.manage().window().setPosition(0, 0);
//         browser.manage().window().setSize(this.protractorExtensions.screenSizes[size].x, this.protractorExtensions.screenSizes[size].y);
//         browser.ignoreSynchronization = ignoreSynchronization;
//         browser.get(url);
//     }

//     /**
//      * loads mock data
//      * @param path:path to mockdata
//      * @returns protractor.promise.Promise<string>
//      */
//     public loadOmmMockData(path: string): protractor.promise.Promise<string> {
//         return this.protractorExtensions.loadMockApiData(path);
//     }

//     // /**
//     //  * loads local sitecore data
//     //  * @returns protractor.promise.Promise<string>
//     //  */
//     // public getSitecoreData() {
//     //     return this.vasProtractorExtensions.getHttps('/svc/app/getcontent?app=OneMinuteMove');
//     // }

//     // /**
//     //  * method waits the execution till the passed element hides
//     //  * @param element:protractor.ElementFinder  
//     //  */
//     // public waitForElementToBeNotVisible(element: protractor.ElementFinder) {
//     //    this.vasProtractorExtensions.waitForElementToBeNotVisible(element);
//     // }

//     //  /**
//     //  * method waits the execution till the passed element visible
//     //  * @param element:protractor.ElementFinder  
//     //  */
//     // public waitForElementToBeVisible(element: protractor.ElementFinder) {
//     //      this.vasProtractorExtensions.waitForElementToBeVisible(element);
//     // }
// }
