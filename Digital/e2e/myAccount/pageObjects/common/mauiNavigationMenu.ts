import { $ } from "protractor";

export class MauiNavigationMenu {

    private backButton = $('.desktop .maui-navigation__back-option-text');

    // TODO:
    // need to replace all existing usages with the below method
    // can be used only for desktop view. Can cover mobile view, if needed
    public clickBackButton() {
        this.backButton.click();
    }
}