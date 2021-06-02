import { browser, ElementFinder, By, promise } from 'protractor';

export function toPageTop() {
    return browser.executeScript('window.scrollTo(0,0)');
}

export function toPageBottom() {
    return browser.executeScript('window.scrollTo(0,document.body.scrollHeight)');
}

export function intoElementView(el: ElementFinder) {
    return browser.executeScript('arguments[0].scrollIntoView();', el.getWebElement());
}
