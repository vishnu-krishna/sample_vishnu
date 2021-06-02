import { $, browser, by, element } from 'protractor';
import { ProtractorExtensions } from '../../../shared/e2e/protractor.extensions';
import { DashboardMockDefault } from '../../myAccount.e2e-pages';

let e2e = new ProtractorExtensions();

describe('Settings', () => {
    let path = 'settings';

    let DashboardMockDefaults = {
        'sitecore:file': DashboardMockDefault['sitecore'],
        'syncdata/start:file': DashboardMockDefault['syncdata/start'],
        'syncdata/status:file': DashboardMockDefault['syncdata/status'],
        'dashboard:file': DashboardMockDefault['dashboard'],
        'pendingpayments:file': DashboardMockDefault['pendingpayments'],
        'payments:file': DashboardMockDefault['payments'],
        'bills:file': DashboardMockDefault['bills'],
        'accounts/list:file': DashboardMockDefault['accounts/list'],
        'lightMode:file': DashboardMockDefault['lightMode'],
        'isNewSettings': DashboardMockDefault['isNewSettings']
    };

    let settingsContainer = by.css('.settings-container');
    let settingsContainerHeader = element(by.css('.main-card-header'));

    describe('When in Light Mode', () => {
        let scenarioData = {
            'accounts/list:file': 'e2e-2xAccount-2xContract-Unrestricted',
            'lightMode:file': 'e2e-lightMode'
        };
        let mockData = Object.assign({}, DashboardMockDefaults, scenarioData);
        for (let screenSize of e2e.allScreenSizes) {
            it(`should show 'My Account is undergoing maintenance' Page [${screenSize}]`, () => {
                e2e.openPage(path, screenSize, mockData);
                expect($('.lite-mode').isDisplayed()).toBeTruthy();
                expect($('.settings').isDisplayed()).toBeFalsy();
                expect($('.restricted').isPresent()).toBeFalsy();
            });
        }
    });

    describe('When not in Light Mode and All Fuels on All Accounts are Restricted', () => {
        let scenarioData = {
            'accounts/list:file': 'e2e-2xAccount-2xContract-All-Restricted',
            'lightMode:file': 'e2e-lightModeFalse'
        };
        let mockData = Object.assign({}, DashboardMockDefaults, scenarioData);

        for (let screenSize of e2e.allScreenSizes) {
            it(`should show restricted settings message [${screenSize}]`, () => {
                e2e.openPage(path, screenSize, mockData);
                expect($('.restricted').isDisplayed()).toBeTruthy();
                expect($('.settings').isDisplayed()).toBeFalsy();
            });
        }
    });

    describe('When not in Light Mode and One Or More Fuels are Not Restricted', () => {
        let scenarioData = {
            'accounts/list:file': 'e2e-2xAccount-2xContract-Some-Restricted',
            'lightMode:file': 'e2e-lightModeFalse'
        };
        let mockData = Object.assign({}, DashboardMockDefaults, scenarioData);
        for (let screenSize of e2e.allScreenSizes) {
            it(`should show settings [${screenSize}]`, () => {
                e2e.openPage(path, screenSize, mockData);
                expect($('.restricted').isPresent()).toBeFalsy();
                expect($('.settings').isDisplayed()).toBeTruthy();
            });
        }
    });

    describe('When in settings page', () => {
        let scenarioData = {
            'accounts/list:file': 'e2e-2xAccount-2xContract-Some-Restricted',
            'lightMode:file': 'e2e-lightModeFalse'
        };
        let mockData = Object.assign({}, DashboardMockDefaults, scenarioData);

        for (let screenSize of e2e.allScreenSizes) {
            if (screenSize === 'mobile') {
                it(`should redirect path to /settings/personal and not show left hand menu [${screenSize}]`, () => {
                    e2e.openPage(path, screenSize, mockData);
                    // This element shouldn't be visible
                    expect($('.settings-left-menu').isDisplayed()).toBeFalsy();
                    // Url should be settings/personal
                    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'settings/personal');
                });
            } else {
                it(`should redirect URL to settings/personal and show left hand menu [${screenSize}]`, () => {
                    e2e.openPage(path, screenSize, mockData);
                    // These two elements should be visible.
                    expect($('.settings-left-menu').isPresent()).toBeTruthy();
                    expect($('.settings-container').isPresent()).toBeTruthy();
                    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'settings/personal');
                });
            }
        }
    });

    describe('When clicked on "Personal" link on the left hand menu', () => {
        let scenarioData = {
            'accounts/list:file': 'e2e-2xAccount-2xContract-Some-Restricted',
            'lightMode:file': 'e2e-lightModeFalse'
        };
        let mockData = Object.assign({}, DashboardMockDefaults, scenarioData);
        for (let screenSize of e2e.allScreenSizes) {
            if (screenSize !== 'mobile') {
                it('should show settings/personal as the current route and correct placeholders', () => {
                    e2e.openPage(path, screenSize, mockData);
                    browser.wait(() => {
                        return browser.getCurrentUrl().then((url) => {
                            $('.settings-desktop-left-menu--settings-offers').click();
                            $('.settings-desktop-left-menu--settings-personal').click();
                            browser.isElementPresent(settingsContainer);
                            if (url === browser.baseUrl + 'settings/personal') {
                                return true;
                            }
                        });
                    }, 10000);
                    expect(browser.isElementPresent(settingsContainer)).toBeTruthy();
                    expect(settingsContainerHeader.getText()).toBe('Personal');
                });
            }
        }
    });

    describe('When clicked on "flyBuys and rewards" link on the left hand menu', () => {
        let scenarioData = {
            'accounts/list:file': 'e2e-2xAccount-2xContract-Some-Restricted',
            'lightMode:file': 'e2e-lightModeFalse'
        };
        let mockData = Object.assign({}, DashboardMockDefaults, scenarioData);
        for (let screenSize of e2e.allScreenSizes) {
            if (screenSize !== 'mobile') {
                it('should show settings/offers as the current route and correct placeholders', () => {
                    e2e.openPage(path, screenSize, mockData);
                    browser.wait(() => {
                        return browser.getCurrentUrl().then((url) => {
                            $('.settings-desktop-left-menu--settings-offers').click();
                            browser.isElementPresent(settingsContainer);
                            if (url === browser.baseUrl + 'settings/offers') {
                                return true;
                            }
                        });
                    }, 10000);
                    expect(browser.isElementPresent(settingsContainer)).toBeTruthy();
                    expect(settingsContainerHeader.getText()).toBe('flybuys and AGL Rewards');
                });
            }
        }
    });

    describe('When clicked on "Billing" link on the left hand menu', () => {
        let scenarioData = {
            'accounts/list:file': 'e2e-2xAccount-2xContract-Some-Restricted',
            'lightMode:file': 'e2e-lightModeFalse'
        };
        let mockData = Object.assign({}, DashboardMockDefaults, scenarioData);
        for (let screenSize of e2e.allScreenSizes) {
            if (screenSize !== 'mobile') {
                it('should show settings/billing as the current route and correct placeholders', () => {
                    e2e.openPage(path, screenSize, mockData);
                    browser.wait(() => {
                        return browser.getCurrentUrl().then((url) => {
                            $('.settings-desktop-left-menu--settings-billing').click();
                            browser.isElementPresent(settingsContainer);
                            if (url === browser.baseUrl + 'settings/billing') {
                                return true;
                            }
                        });
                    }, 10000);
                    expect(browser.isElementPresent(settingsContainer)).toBeTruthy();
                    expect(settingsContainerHeader.getText()).toBe('Billing');
                });
            }
        }
    });

    // describe('When clicked on "Direct Debit" link on the left hand menu', () => {
    //     let scenarioData = {
    //         'accounts/list:file': 'e2e-2xAccount-2xContract-Some-Restricted',
    //         'lightMode:file': 'e2e-lightModeFalse'
    //     };
    //     let mockData = Object.assign({}, DashboardMockDefaults, scenarioData);
    //     for (let screenSize of e2e.allScreenSizes) {
    //         if (screenSize !== 'mobile') {
    //             it('should show settings/directdebit as the current route and correct placeholders', () => {
    //                 e2e.openPage(path, screenSize, mockData);
    //                 browser.wait(() => {
    //                     return browser.getCurrentUrl().then((url) => {
    //                         $('.settings-desktop-left-menu--settings-directdebit').click();
    //                         browser.isElementPresent(settingsContainer);
    //                         if (url === browser.baseUrl + 'settings/directdebit') {
    //                             return true;
    //                         }
    //                     });
    //                 }, 10000);
    //                 expect(browser.isElementPresent(settingsContainer)).toBeTruthy();
    //                 expect(settingsContainerHeader.getText()).toBe('Direct debit');
    //             });
    //         }
    //     }
    // });
});
