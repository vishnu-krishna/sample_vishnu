import { browser, element, ElementFinder, $, $$, by } from 'protractor';
import * as protractor from 'protractor';
import * as waits from '../../../utilities/waits';

export const elements = {
    emailInputField: element(by.css('.styled-form__input--text')),
    nextButton: element(by.buttonText('Next')),
    passwordInputField: element(by.css('.identity-container__field--password')),
    loginButton: element(by.buttonText('Login'))
};

export function enterEmailAddress(emailAddress: string): protractor.promise.Promise<any> {
    waits.waitForVisibilityOf(elements.emailInputField);
    return elements.emailInputField.sendKeys(emailAddress);
}

export function clickNextButton(): protractor.promise.Promise<any> {
    return elements.nextButton.click();
}

export function enterPassword(password: string): protractor.promise.Promise<any> {
    waits.waitForVisibilityOf(elements.passwordInputField);
    return elements.passwordInputField.sendKeys(password);
}

export function clickLoginButton(): protractor.promise.Promise<any> {
    return elements.loginButton.click();
}
