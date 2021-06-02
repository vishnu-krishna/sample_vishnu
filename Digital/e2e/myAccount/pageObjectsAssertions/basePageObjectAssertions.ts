import { ElementFinder, browser } from "protractor";

export class BasePageObjectAssertions {

    public assertIsDisplayed(element: ElementFinder) {
        expect(element.isDisplayed()).toBe(true);
    }

    public validateURL(url: string) {
        expect(browser.getCurrentUrl()).toEqual(url);
    }
}