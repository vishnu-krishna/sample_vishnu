import { ContactDetailsPage } from '../pageObjects/contactDetails';
import { ElementFinder, browser } from 'protractor';
import { BasePageObjectAssertions } from './basePageObjectAssertions';

export class ContactDetailsAssertions extends BasePageObjectAssertions{

    constructor(private contactDetails: ContactDetailsPage) {
        super();
    }

    public assertAllErrorsOnPage(isError: boolean = true) {
        this.assertMobileErrorsOnPage(isError);
        this.assertEmailErrorsOnPage(isError);
    }

    public assertMobileErrorsOnPage(isError: boolean = true) {
        expect(this.contactDetails.mobileErrorMessage().isPresent()).toBe(isError, `Mobile error must be ${isError}`);
    }

    public assertEmailErrorsOnPage(isError: boolean = true) {
        expect(this.contactDetails.emailErrorMessage().isPresent()).toBe(isError, `Email error must be ${isError}`);
    }

    public checkSuccessMessage() {
        expect(this.contactDetails.successMessage.isPresent()).toBe(true);
    }
}
