import { $, browser, ElementFinder } from 'protractor';
import { ContactDetailsAssertions } from '../pageObjectsAssertions/contactDetailsAssertions';
import { Context } from '../../context';
import * as waits from '../../utilities/waits';

export class ContactDetailsPage {

    public successMessage = $('.update-confirmation__flash-message');
    public submitButton = $('.contact-details__cta-submit');
    public backButton = $('.maui-navigation__back-option-text');

    // Contact Details Section and link
    public contactDetailsContainer = $('.contact-details');

    private contactDetailsAssertions = new ContactDetailsAssertions(this);
    private context = new Context(browser.params.environment);

    // Contact Details Input Section.
    public mobileInput = () => this.mobileNumberSection().$('.form-textbox');
    public emailInput = () => this.emailAddressSection().$('.form-textbox');
    public mobileErrorMessage = () => this.mobileNumberSection().$('.has-error');
    public emailErrorMessage = () => this.emailAddressSection().$('.has-error');

    public updateContactDetails() {
        this.submitButton.click();
    }

    public clearInput(field: string) {
        if (field === 'email') {
            this.context.clearFields(this.emailInput());
        } else if (field === 'mobile') {
            this.context.clearFields(this.mobileInput());
        }
    }

    public submitAndNavigateToPreviousPage(emailInput: string, mobileInput: string, element: ElementFinder, previousPageUrl: string) {
        this.addEmailInput(emailInput);
        this.contactDetailsAssertions.assertEmailErrorsOnPage(false);
        this.addMobileInput(mobileInput);
        this.contactDetailsAssertions.assertMobileErrorsOnPage(false);
        this.updateContactDetails();
        waits.waitForElement(element);
        this.contactDetailsAssertions.checkSuccessMessage();
        this.contactDetailsAssertions.validateURL(previousPageUrl);
    }

    public clickBackButton() {
        this.backButton.click();
    }

    public addMobileInput(input: string) {
        this.clearInput('mobile');
        this.mobileInput().sendKeys(input);
    }

    public addEmailInput(input: string) {
        this.clearInput('email');
        this.emailInput().sendKeys(input);
    }

    // Contact Details Form
    private formContainer = () => $('.contact-details__form-wrapper');
    private mobileNumberSection = () => this.formContainer().$('.contact-details__form-mobile-number');
    private emailAddressSection = () => this.formContainer().$('.contact-details__form-email-address');
}
