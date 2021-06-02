import { browser, ExpectedConditions, ElementFinder, until, By, promise } from 'protractor';

export function waitForVisibilityOf(el: ElementFinder) {
    return browser.wait(ExpectedConditions.visibilityOf(el), 20000);
}

export function waitForElement(el: ElementFinder) {
    return browser.wait(ExpectedConditions.presenceOf(el), 10000);
}

export function waitToBeClickable(el: ElementFinder) {
    return browser.wait(ExpectedConditions.elementToBeClickable(el), 10000);
}

export function waitForInvisibilityOf(el: ElementFinder) {
    return browser.wait(ExpectedConditions.invisibilityOf(el), 10000);
}

export function waitForUrl(targetUrl: string, timeoutMs = 10000) {
    return browser.wait(() => browser.driver.getCurrentUrl()
        .then((url) => (url === targetUrl)), timeoutMs);
}

export function waitForModalToDisappear(el: ElementFinder): promise.Promise<any> {
    let cb = (): promise.Promise<any> => {
        return el.getAttribute('style').then((style) => {
            if (style === 'opacity: 0; z-index: -1;') {
                return promise.fulfilled;
            }

            return cb();
        });
    };

    return cb();
}

export function waitForSsmrModalToAppear(el: ElementFinder): promise.Promise<any> {
    let cb = (y): promise.Promise<any> => {
        return el.getLocation().then((newY) => {
            if (newY.y !== y.y) {
                return cb(newY);
            }
            return promise.fullyResolved(y);
        });
    };

    return el.getLocation().then((location) => {
        return cb(location);
    });
}
