import { browser, $, $$, element, ElementFinder } from 'protractor';
import * as protractor from 'protractor';
import { getCurrentEnvironment } from './environment';
import { getTestDataForCurrentEnvironment } from './environment';
import { EnvironmentsList, EnvironmentsEntity } from '../models/environments';

export function navigateToUrl(url: string): protractor.promise.Promise<any> {
    return browser.get(url);
}

export function navigateToOnClick(el: ElementFinder): protractor.promise.Promise<any> {
    return el.click();
}

export function goToPage(page: string, prependPath: boolean = true): protractor.promise.Promise<any> {
    return getTestDataForCurrentEnvironment().then((environmentData) => {
        const actualPath = prependPath ? environmentData.path : '';
        const actualUrl = `${environmentData.baseURI}${actualPath}${page}`;

        console.log(`Navigating to: ${actualUrl}`);
        return browser.get(actualUrl);
    });
}
