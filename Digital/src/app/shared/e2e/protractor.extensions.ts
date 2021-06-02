import * as fs from 'fs';
import { $$, browser } from 'protractor';
import * as protractor from 'protractor';
import * as req from 'request';
import { Guid } from '../utils/guid';

import { MockJWTService } from '../../myAccount/mockManager/mockJWT.service';

export class ProtractorExtensions {

    // shorthand aliases
    public $1 = this.firstVisibleSelector;

    public screenSizes = {
        desktop: { x: 1440, y: 900 },
        mobile: { x: 375, y: 667 }
    };
    // 'tablet': { x: 991, y: 620 },

    private payload = {
        'aud': 'https://aglsts.accesscontrol-website.windows.net/',
        'iss': 'AGL Azure',
        'nbf': 0,
        'exp': 0,
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/authenticationmethod': 'OAuth2',
        'http://identity.agl.com.au/claims/profileclaims/customertype': 'MM',
        'http://identity.agl.com.au/claims/profileclaims/betaeligible': 'True'
    };

    public get allScreenSizes(): string[] {
        return Object.keys(this.screenSizes);
    }

    public createMockToken(nameId: string) {

        console.log(`Creating e2e token for customer: ${nameId}`);

        let now = new Date();

        this.payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] = `fake-email@gmail.com`;
        this.payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] = nameId;
        this.payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/authenticationinstant'] = now.toISOString();
        this.payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mockserversessionid'] = Guid.newGuid();

        // Encode the fake token
        let mockToken = MockJWTService.encode(this.payload);

        // Save
        browser.executeScript(`sessionStorage.setItem('Bearer', '${mockToken}');`);
    }

    public openPage(url: string, size: string, mockData?: Object, cookies?: Object, ignoreSynchronization = false) {

        browser.manage().window().setPosition(0, 0);
        browser.manage().window().setSize(this.screenSizes[size].x, this.screenSizes[size].y);

        if (process.env.npm_lifecycle_script !== 'protractor protractor.e2e.conf.js') {
            browser.driver.get('https://localhost:8080/e2e-mock.html');
        } else {
            browser.driver.get('http://localhost/e2e-mock.html');
        }
        browser.executeScript('localStorage.clear();');
        browser.executeScript(`localStorage.setItem('selfService.disableAnimation', 'true');`);
        browser.executeScript(`localStorage.setItem('selfService.e2e', 'true');`);
        browser.executeScript(`localStorage.setItem('selfService.isPlaceholderShownOnBillsPage', 'false')`);
        browser.executeScript(`localStorage.setItem('appContainer', 'mock');`);
        browser.executeScript(`localStorage.setItem('myaccount.usagebeta', 'true');`);
        browser.executeScript(`localStorage.setItem('ng2-debug-containers', '')`); /* optional */
        browser.executeScript(`localStorage.setItem('selfService.mock.settings.getBillDeliveries:file', 'getBillDeliveries-200')`);
        browser.executeScript(`localStorage.setItem('selfService.mock.settings.postBillDeliveries:file', 'postBillDeliveries')`);
        browser.executeScript(`localStorage.setItem('selfService.mock.userInfo:data', '{"emailAddress": "mock@mock.com"}')`);
        browser.executeScript(`localStorage.setItem('selfService.mock.sitecore:file', 'e2e-content')`);

        if (mockData) {
            for (let key of Object.keys(mockData)) {
                // Business Partner level mocking
                if (key === 'mock.businessPartner') {
                    this.createMockToken(mockData[key]);
                } else if (key.startsWith('selfService')) {
                    browser.executeScript(`localStorage.setItem('${key}', '${mockData[key]}');`);
                } else {
                    browser.executeScript(`localStorage.setItem('selfService.mock.${key}', '${mockData[key]}');`);
                }
            }
        }

        browser.manage().deleteAllCookies();
        if (cookies) {
            for (let key of Object.keys(cookies)) {
                browser.manage().addCookie(key, cookies[key], '/', undefined, true, undefined);
            }
        }

        browser.ignoreSynchronization = ignoreSynchronization;
        browser.get(url);
    }
    public settingMock() {
        browser.executeScript(`localStorage.setItem('selfService.isFeatureFlagSettings', 'true')`);
    }
    public loadMockApiData(path: string): protractor.promise.Promise<any> {
        let deferred = protractor.promise.defer();
        if (process.env.npm_lifecycle_script !== 'protractor protractor.e2e.conf.js') {
            req.get(`https://localhost:8080/_mockData/aglWebApi/${path}`,
                { agentOptions: { rejectUnauthorized: false } },
                (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        deferred.fulfill(body);
                    } else {
                        deferred.reject(body);
                    }
                });
        } else {
            req.get(`http://localhost/_mockData/aglWebApi/${path}`,
                { agentOptions: { rejectUnauthorized: false } },
                (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        deferred.fulfill(body);
                    } else {
                        deferred.reject(body);
                    }
                });
        }
        return deferred.promise;
    }

    public firstVisibleSelector(cssLocator: string): protractor.ElementFinder {
        return $$(cssLocator).filter((elements) =>
            elements.isDisplayed()
                .then((isDisplayed) => isDisplayed)
        ).first();
    }

    public waitForUrl(targetUrl: string, timeoutMs = 5000) {
        browser.wait(() => browser.driver.getCurrentUrl()
            .then((url) => (url === targetUrl)), timeoutMs);
    }

    public scrollToElement(element2: protractor.ElementFinder) {
        let scrollIntoView = (webElement) => webElement.scrollIntoView(false);
        return browser.executeScript(scrollIntoView, element2.getWebElement());
    }

    public getVerticalScrollPosition(): protractor.promise.Promise<any> {
        return browser.executeScript<any>('return window.pageYOffset || document.documentElement.scrollTop;');
    }

    public formatDate(isoDate: string): string {
        return new Date(isoDate).toISOString().substr(0, 10);
    }

    public screenshot(spec, targetElement: protractor.ElementFinder = null) {
        this.scrollToElement(targetElement);
        // todo: remove path-illegal chars from description
        let sanitisedDescription = spec.result.fullName;
        let screenshotPath = `./e2e-screens/${sanitisedDescription}.png`;
        browser.takeScreenshot().then((s) => this.saveScreenshot(s, screenshotPath));
    }

    public saveScreenshot(data, filename) {
        let stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
    }

    public hasClass(element3, cssClass) {
        return element3.getAttribute('class').then((classes) =>
            classes.split(' ').indexOf(cssClass) !== -1
        );
    }

    public clickIfPresent(element4: protractor.ElementFinder) {
        element4.isPresent().then((p) => { if (p) { element4.click(); } });
    }

    public isRunningInCi() {
        let script = process.env.npm_lifecycle_script;

        if (script === 'protractor "protractor.e2e.conf.js"') {
            return true;
        } else {
            return false;
        }
    }
}
