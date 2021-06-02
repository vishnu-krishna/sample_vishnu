import { $ } from "protractor";
import * as waits from '../../../utilities/waits';

export class EnterYourCardNumberPage {

    private enterYourCardNumberField = $('.card-detail__form-card-number-textbox');
    private concessionConsentTermsCheckbox = $('.maui-terms-and-conditions-control__customcheckbox');

    public waitForEnterYourCardNumberPageToLoad() {
        waits.waitForVisibilityOf(this.enterYourCardNumberField);
    }

    public enterCardNumberAndAcceptConsent(cardNumber: string) {
        this.enterYourCardNumberField.sendKeys(cardNumber);
        this.concessionConsentTermsCheckbox.click();
    }
}