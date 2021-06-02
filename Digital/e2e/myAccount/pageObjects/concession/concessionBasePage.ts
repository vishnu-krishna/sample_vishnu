import { $ } from "protractor";

export class ConcessionBasePage {

    private continueButton = $('.continue-or-cancel__cta-continue button');

    public clickContinue() {
        this.continueButton.click();
    }
}