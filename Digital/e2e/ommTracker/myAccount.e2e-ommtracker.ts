import * as moment from 'moment';
import { Now } from '../../src/app/shared/service/now.service';
import { browser, by, element, $, $$ } from 'protractor';
/**
 * Automated UI testing page object for My Account OMMTracker Links
 */
export class ommTrackerObject {
    public _now: Now;
    public jumpLinkButton = $('#jump-link-button');

    public checkNavigation(url) {
        browser.sleep(5000);
        browser.getAllWindowHandles().then(function (handles) {
            let newWindowHandle = handles[1]; // this is your new window
            browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.getCurrentUrl()).toMatch(browser.baseUrl + url);
            }).then(function () {
                browser.close(); //close the current browser
            }).then(function () {
                browser.switchTo().window(handles[0]) //Switch to previous tab
            });
        });
    }

}

export const DashboardMockDefault = {
    'sitecore': 'e2e-content',
    'selfService.e2e': 'true',
    'syncdata/start': 'e2e-mocked',
    'syncdata/status': 'e2e-complete_success',
    'dashboard': 'e2e-contractDetails-6contracts_payg',
    'pendingpayments': 'e2e-pendingpayments-6contracts_payg',
    'payments': 'e2e-payments-6contracts_payg',
    'bills': 'e2e-billHistory-6contracts_payg',
    'accounts/list': '1xAccount-6xContract_payg',
    'lightMode': 'e2e-lightModefalse',
    'isNewSettings': 'true',
    'paygView': 'e2e-mock-multi-payg-contract'

};
