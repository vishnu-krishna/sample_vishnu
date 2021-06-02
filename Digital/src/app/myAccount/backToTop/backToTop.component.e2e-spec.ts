/*
The back-to-top component is an icon and text link appearing at the bottom of the page on mobile devices. Clicking the link will smoothly scroll the page back to the top. The component should automatically hide itself on larger screen sizes.
*/
import { browser } from 'protractor';
import { ProtractorExtensions } from '../../shared/e2e/protractor.extensions';
import { DashboardMockDefault, DashboardPageObject } from '../myAccount.e2e-pages';

let e2e = new ProtractorExtensions();
let page = new DashboardPageObject();

describe('Dashboard', () => {
    describe('Back to top', () => {

        let mockDefaults = {
            'sitecore:file':        'e2e-content',
            'syncdata/start:file':  DashboardMockDefault['syncdata/start'],
            'syncdata/status:file': DashboardMockDefault['syncdata/status'],
            'dashboard:file':       DashboardMockDefault['dashboard'],
            'pendingpayments:file': DashboardMockDefault['pendingpayments'],
            'payments:file':        DashboardMockDefault['payments'],
            'bills:file':           DashboardMockDefault['bills'],
            'accounts/list:file':        DashboardMockDefault['accounts/list'],
        };

        const path = '/overview';

        it(`should display icon and text link on mobile`, () => {
            e2e.openPage(path, 'mobile', mockDefaults);
            expect(page.backToTop.isDisplayed()).toBeTruthy();
            expect(page.backToTop.$$('.back-to-top__text').get(0).getText()).toBe('TOP');
            expect(page.backToTop.$$('.back-to-top__icon').get(0).isDisplayed()).toBeTruthy();
        });

        it(`should not display on desktop`, () => {
            e2e.openPage(path, 'desktop', mockDefaults);
            expect(page.backToTop.isDisplayed()).toBeFalsy();
        });

        it(`should scroll back to top of page when clicked`, () => {
            e2e.openPage(path, 'mobile', mockDefaults);
            e2e.scrollToElement(page.backToTop);
            expect(e2e.getVerticalScrollPosition()).toBeGreaterThan(0);
            page.backToTop.click();
            browser.wait(() => e2e.getVerticalScrollPosition().then((y) => y === 0), 5000);
            expect(e2e.getVerticalScrollPosition()).toBe(0);
        });
    });
});
