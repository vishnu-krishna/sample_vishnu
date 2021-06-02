import { browser } from 'protractor';
import * as protractor from 'protractor';

export const localStorage = {
    clearStorage: (): protractor.promise.Promise<any> => {
        return browser.executeScript('window.localStorage.clear();');
    },
    removeFromStorage: (key: string): protractor.promise.Promise<any> => {
        const script: string = `window.localStorage.removeItem('${key}');`;
        return browser.executeScript(script);
    },
    addToStorage: (key: string, value: string): protractor.promise.Promise<any> => {
        const script: string = `window.localStorage.setItem('${key}', '${value}');`;
        return browser.executeScript(script);
    },
    getFromStorage: (key: string): protractor.promise.Promise<string> => {
        const script: string = `window.localStorage.getItem('${key}');`;
        return browser.executeScript(script);
    }
};

export const sessionStorage = {
    getStorageItem: (key: string): protractor.promise.Promise<string> => {
        return browser.executeScript(`return window.sessionStorage.getItem('${key}');`);
    }
};
