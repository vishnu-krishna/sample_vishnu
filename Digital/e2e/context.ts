import { Dashboard } from './models/dashboard';
import * as protractor from 'protractor';
import { browser, by, element, $, $$, ExpectedConditions, ElementFinder } from 'protractor';
import * as fs from 'fs';
import { Pages } from './pages';
import { OverviewPage } from '../e2e/myAccount/pageObjects/overviewPage';
import { FeatureFlagTypes, FeatureFlagKeyPrefix } from '../src/app/myAccount/services/featureFlag.constants';

import { EnvironmentsList, UsersEntity, EnvironmentsEntity } from './models/environments';
import { User } from './enums/enums';
import * as waits from './utilities/waits';
import { authenticate } from './services/authenticationService/authenticationService';
import { DataService } from './services/dataService/dataService';
import { localStorage } from './utilities/storage';
import { Environment, setEnvironment, getTestDataForCurrentEnvironment } from './utilities/environment';
import * as Login from './myAccount/pageObjects/common/loginPage';
import { bypassRecaptcha } from './services/recaptchsService/recaptchaService';

export type ScreenSize = 'desktop' | 'mobile' | 'tablet';

const EC = ExpectedConditions;

let environmentData: EnvironmentsEntity;

let dashboard: Dashboard[];

export class Context {

    public screenSizes: any = {
        desktop: { x: 1440, y: 900 },
        // 'tablet': { x: 991, y: 620 },
        mobile: { x: 375, y: 667 }
    };

    // public logs: any;
    private currentEnvironment: Environment;
    private overview: OverviewPage;

    public constructor(environment: Environment) {
        // this.logs = browserLogs(browser);
        setEnvironment(environment).then((env) => this.currentEnvironment = env);
        getTestDataForCurrentEnvironment().then((data) => environmentData = data);
        this.overview = new OverviewPage(this);
        // if (environment === 'production') {
        // this.logs.ignore(new RegExp('//api/v1/syncdata/start'));
        // this.logs.ignore(new RegExp('/v2/moves/eligibility?moveType=OneMinuteMove'));
        // }

        // this.controlFlow = protractor.promise.controlFlow();
    }

    public getUser(actor: User = User.Default): UsersEntity {
        let users = environmentData.users;
        return users.find((user) => user.name === User[actor]);
    }

    public authenticateAsUser(user: UsersEntity): protractor.promise.Promise<any> {
        browser.ignoreSynchronization = true;

        authenticate(user);

        return waits.waitForVisibilityOf(this.overview.accountForIndex(0));
    }

    public enterCredentials(user: any): protractor.promise.Promise<any> {

        return waits.waitForVisibilityOf(Login.elements.emailInputField).then(() => {
            return bypassRecaptcha().then(() => {
                console.info(`Logging in with '${user.email}'`);

                Login.enterEmailAddress(user.email);

                Login.clickNextButton();

                Login.enterPassword(user.password);

                return Login.clickLoginButton().then(() => {
                    console.info('Submitting login form ...');
                });
            });
        });
    }

    public logout() {
        waits.waitToBeClickable(element(by.css('.agl-desktop-header-user'))).then(() => {
            element(by.css('.agl-desktop-header-user')).click();

            waits.waitForVisibilityOf(element(by.linkText('Logout')));
            element(by.linkText('Logout')).click();

            // The following condition is temporary
            // and should be removed once we have a consistent logout page
            // across all environments
            if (this.currentEnvironment === 'local') {
                waits.waitForUrl(this.buildUrl('/mockidentity'));
            } else {
                waits.waitForVisibilityOf(Pages.homepage.myAccountLink);
            }
        });
    }

    public isLocalEnv(): boolean {
        return this.currentEnvironment === 'local';
    }

    public get allScreenSizes(): string[] {
        return Object.keys(this.screenSizes);
    }

    public setFeatureFlag(featureFlag: FeatureFlagTypes, isOn: boolean) {
        const key: string = `${FeatureFlagKeyPrefix}${featureFlag}`;
        const value: string = isOn.toString();
        console.log(`\nSetting feature flag ${featureFlag} to ${value}\n`);
        return localStorage.addToStorage(key, value);
    }

    public removeFeatureFlag(featureFlag: FeatureFlagTypes) {
        const key: string = `${FeatureFlagKeyPrefix}${featureFlag}`;
        return localStorage.removeFromStorage(key);
    }

    public setWindowSize(windowDimensions) {
        browser.manage().window().setPosition(0, 0);
        browser.manage().window().setSize(windowDimensions.x, windowDimensions.y);
    }

    public getWindowLocationQueryString(): protractor.promise.Promise<string> {
        return browser.executeScript(`return window.location.search;`);
    }

    public firstVisibleSelector(cssLocator: string): protractor.ElementFinder {
        return $$(cssLocator).filter((el) =>
            el.isDisplayed()
                .then((isDisplayed) => isDisplayed)
        ).first();
    }

    public scrollToElement(el: protractor.ElementFinder) {
        let scrollIntoView = (webElement) => webElement.scrollIntoView(false);
        return browser.executeScript(scrollIntoView, el.getWebElement());
    }

    public getVerticalScrollPosition(): protractor.promise.Promise<number> {
        return browser.executeScript<number>('return window.pageYOffset || document.documentElement.scrollTop;');
    }

    public hasClass(el, cssClass) {
        return el.getAttribute('class').then((classes) =>
            classes.split(' ').indexOf(cssClass) !== -1
        );
    }

    public clickIfPresent(el: protractor.ElementFinder) {
        waits.waitForVisibilityOf(el).then((p) => { if (p) { el.click(); } });
        // el.isPresent().then((p) => { if (p) { el.click(); } });
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

    public saveScreenshot(screenshot, filename) {
        let stream = fs.createWriteStream(filename);
        stream.write(new Buffer(screenshot, 'base64'));
        stream.end();
    }

    public buildUrl(page: string) {
        if (!this.currentEnvironment) {
            throw new Error('Error: No Environment specified.  Please call `setEnvironment` first.');
        }

        return `${environmentData.baseURI}${page}`;
    }

    public clearFields(el: ElementFinder) {
        el.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
        el.sendKeys(protractor.Key.BACK_SPACE);
        el.clear();
    }
}
