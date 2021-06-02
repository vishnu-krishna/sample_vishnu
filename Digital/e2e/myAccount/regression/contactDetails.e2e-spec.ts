import { browser, element } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { FeatureFlagTypes } from '../../../src/app/myAccount/services/featureFlag.constants';
import { User } from '../../enums/enums';
import { ContactDetailsPage } from '../pageObjects/contactDetails';
import { settings } from '../pageObjects/settings';
import { ContactDetailsAssertions } from '../pageObjectsAssertions/contactDetailsAssertions';
import { UsersEntity } from '../../models/environments';
import * as waits from '../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('contact details scenario tests', () => {
    let user: UsersEntity;
    let context: Context;
    let contactDetails: ContactDetailsPage;
    let contactDetailsAssertions: ContactDetailsAssertions;

    beforeAll(() => {
        context = new Context(browser.params.environment);
        contactDetails = new ContactDetailsPage();
        contactDetailsAssertions = new ContactDetailsAssertions(contactDetails);
    });

    describe('as a customer who has both valid email address and mobile number', () => {
        beforeAll(() => {
            user = context.getUser(User.contactDetailsWillSucceed);
            context.authenticateAsUser(user);
            context.setFeatureFlag(FeatureFlagTypes.contactDetailsEnabled, true);
            context.setFeatureFlag(FeatureFlagTypes.smsPayEnabled, true);
            context.setFeatureFlag(FeatureFlagTypes.ebillEnabled, true);
            context.setFeatureFlag(FeatureFlagTypes.manageNotificationsEnabled, false);
            context.setWindowSize(e2e.screenSizes.desktop);
        });

        describe('Update contact details via manage account', () => {
            beforeAll(() => {
                settings.clickManageAccountsLink();
                waits.waitForElement(settings.settingsContainer);
            });

            it('should display the contact details edit link', () => {
                waits.waitForVisibilityOf(settings.contactDetailsEdit);
                contactDetailsAssertions.assertIsDisplayed(settings.contactDetailsEdit);
            });

            it('should route to contact details page when the edit link is clicked', () => {
                settings.clickContactDetailsEditFromSettingsPage();
                waits.waitForElement(contactDetails.contactDetailsContainer);
            });

            it('should display the right url in address bar - contact details via manage account', () => {
                contactDetailsAssertions.validateURL(context.buildUrl('/settings/contactdetails'));
            });

            it('should NOT display any errors on page when all the inputs are valid', () => {
                contactDetailsAssertions.assertAllErrorsOnPage(false);
            });

            it('should display mobile error when the mobile input is invalid', () => {
                contactDetails.addMobileInput('0405234');
                contactDetails.updateContactDetails();
                contactDetailsAssertions.assertMobileErrorsOnPage(true);
            });

            it('should display email error when the email input is invalid', () => {
                contactDetails.addEmailInput('bbc.abc');
                contactDetails.updateContactDetails();
                contactDetailsAssertions.assertEmailErrorsOnPage(true);
            });

            it('should NOT display mobile error when the mobile input is valid', () => {
                contactDetails.addMobileInput('0403095052');
                contactDetailsAssertions.assertMobileErrorsOnPage(false);
            });

            it('should NOT display email error when the email input is valid', () => {
                contactDetails.addEmailInput('a@b.com');
                contactDetailsAssertions.assertEmailErrorsOnPage(false);
            });

            it('should go back to the previous page after successful update of valid email address and mobile number', () => {
                contactDetails.submitAndNavigateToPreviousPage('valid-general@valid.com', '0403095052', settings.settingsContainer, context.buildUrl('/settings/personal'));
            });
        });

        // xdescribed until https://aglenergy.atlassian.net/browse/DSP-30167 has been resolved
        xdescribe('Update contact details via smspay link - valid mobile number already present', () => {
            beforeAll(() => {
                settings.smsPay.clickSmsPayLink();
            });

            it('should display the contact details edit link', () => {
                waits.waitForVisibilityOf(settings.smsPay.mobileIcon);
                contactDetailsAssertions.assertIsDisplayed(settings.smsPay.contactDetailsEdit);
            });

            it('should route to contact details page when the edit link is clicked', () => {
                settings.smsPay.clickContactDetailsEditFromSmsPay();
                waits.waitForElement(contactDetails.contactDetailsContainer);
            });

            it('should display the right url in address bar - contact details via smspay', () => {
                contactDetailsAssertions.validateURL(context.buildUrl('/settings/contactdetails/SMSPay'));
            });

            it('should NOT display any errors on page when all the inputs are valid', () => {
                contactDetailsAssertions.assertAllErrorsOnPage(false);
            });

            it('should display mobile error when the mandatory mobile input is cleared', () => {
                contactDetails.clearInput('mobile');
                contactDetailsAssertions.assertMobileErrorsOnPage(true);
            });

            it('should go back to the previous page after successful update of valid mobile number', () => {
                contactDetails.submitAndNavigateToPreviousPage('valid-sms@valid.com', '0403095053', settings.smsPay.smsPayContainer, context.buildUrl('/settings/smspay'));
            });
        });

        describe('Update contact details via ebilling link - valid email address already present', () => {
            beforeAll(() => {
                settings.billing.clickBillingLink();
                waits.waitForVisibilityOf(settings.billing.billingContainer);
            });

            it('should display the contact details edit link', () => {
                contactDetailsAssertions.assertIsDisplayed(element(settings.billing.contactDetailsAddViaBilling));
            });

            it('should route to contact details page when the edit link is clicked- via ebilling', () => {
                settings.billing.clickContactDetailsFromEbilling();
                waits.waitForElement(contactDetails.contactDetailsContainer);
            });

            it('should NOT display any errors on page when all the inputs are valid', () => {
                contactDetailsAssertions.assertAllErrorsOnPage(false);
            });

            it('should display email error when the mandatory email input is cleared', () => {
                contactDetails.clearInput('email');
                contactDetailsAssertions.assertEmailErrorsOnPage(true);
            });

            it('should go back to the previous page after successful update of valid email address', () => {
                contactDetails.submitAndNavigateToPreviousPage('valid-ebill@valid.com', '0403095057', settings.billing.billingContainer, context.buildUrl('/settings/billing'));
            });
        });
    });

    describe('as a customer who has both invalid email address and invalid mobile number', () => {
        beforeAll(() => {
            user = context.getUser(User.invalidContactDetails);
            context.authenticateAsUser(user);
            context.setFeatureFlag(FeatureFlagTypes.contactDetailsEnabled, true);
            context.setFeatureFlag(FeatureFlagTypes.smsPayEnabled, true);
            context.setFeatureFlag(FeatureFlagTypes.ebillEnabled, true);
        });

        describe('Update contact details via smspay link - mobile number NOT present', () => {
            beforeAll(() => {
                settings.clickManageAccountsLink();
                waits.waitForElement(settings.settingsContainer);
                settings.smsPay.clickSmsPayLink();
                waits.waitForVisibilityOf(settings.smsPay.smsPayContainer);
            });

            it('should display the contact details edit link', () => {
                contactDetailsAssertions.assertIsDisplayed(settings.smsPay.contactDetailsAdd);
            });

            it('should route to contact details page when the edit link is clicked', () => {
                settings.smsPay.clickContactDetailsAddFromSmsPay();
                waits.waitForElement(contactDetails.contactDetailsContainer);
            });

            it('should display mobile error when the mobile input is invalid', () => {
                contactDetailsAssertions.assertMobileErrorsOnPage(true);
            });

            it('should return to the previous page after successful update of valid email address and mobile number', () => {
                contactDetails.clickBackButton();
            });
        });

        describe('Update contact details via ebilling link - email address NOT present', () => {
            beforeAll(() => {
                settings.billing.clickBillingLink();
                waits.waitForElement(settings.billing.billingContainer);
            });

            it('should display the contact details edit link', () => {
                contactDetailsAssertions.assertIsDisplayed(element(settings.billing.contactDetailsAddViaBilling));
            });

            it('should route to contact details page when the edit link is clicked- via ebilling', () => {
                settings.billing.clickContactDetailsFromEbilling();
                waits.waitForElement(contactDetails.contactDetailsContainer);
            });

            it('should display email error when the email input is invalid', () => {
                contactDetailsAssertions.assertEmailErrorsOnPage(true);
            });

            it('should go back to the previous page after successful update of valid email address and mobile number', () => {
                contactDetails.submitAndNavigateToPreviousPage('valid@valid.com', '0403095053', settings.billing.billingContainer, context.buildUrl('/settings/billing'));
            });
        });
    });
});
