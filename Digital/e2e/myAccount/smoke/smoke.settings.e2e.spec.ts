import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { settings } from '../pageObjects/settings';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import { User } from '../../enums/enums';
import * as waits from '../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('smoke test', () => {

    let user: UsersEntity;
    let context: Context;

    beforeAll(() => {
        context = new Context(browser.params.environment);
    });

    afterAll(() => {
        // close modal if open
        // if #modal-close-button
        // context.logout();
        // browser.sleep(3000);
    });

    describe('with a typical user', () => {

        beforeAll(() => {
            user = context.getUser(User.Default);
            context.authenticateAsUser(user);
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            describe('should navigate to the manage account page', () => {
                beforeAll(() => {
                    settings.manageAccountHeaderLink.click();
                    waits.waitForElement(settings.settingsContainer);
                });

                it('check personal link on Manage Account', () => {
                    waits.waitForVisibilityOf(element(settings.personalHeaderText));
                    expect(element(settings.personalHeaderText).isDisplayed()).toBeTruthy();
                });

                // Need to confirm with the Rewards team if offers is feature flagged or not
                // If it is, then we can just test with a feature flag toggle
                xit('check offers link on Manage Account', () => {
                    expect(element(settings.offerLink).isDisplayed()).toBeTruthy();
                });

                it('check billing link on Manage Account', () => {
                    expect(element(settings.billing.billingLink).isDisplayed()).toBeTruthy();
                });

                it('check direct debit link on Manage Account', () => {
                    expect(element(settings.directDebitLink).isDisplayed()).toBeTruthy();
                });

                it('check My Wallet link on Manage Account', () => {
                    expect(settings.myWalletLink.isDisplayed()).toBeTruthy();
                });

                xit('check for the contact edit button', () => {
                    expect(settings.contactDetailsEdit.isDisplayed()).toBeTruthy();
                });

                xit('Should navigate to the contact details page', () => {
                    element(settings.contactDetailsEdit).click();
                });

                // Need to confirm with the Rewards team if offers is feature flagged or not
                // If it is, then we can just test with a feature flag toggle
                xit('click on the offers link on Manage Account', () => {
                    element(settings.offerLink).click();
                });

                xit('check for the flybuys link', () => {
                    expect(settings.flybuysLink.isDisplayed()).toBeTruthy();
                });

                xit('Should navigate to the contact details page', () => {
                    element(settings.flybuysLink).click();
                });

                describe('in my wallet', () => {
                    describe('should Add Payment method with credit card', () => {

                        beforeAll(() => {
                            settings.myWalletLink.click();
                            // TODO: waitFor
                            browser.sleep(3000);
                        });

                        it('check for the payment method button', () => {
                            const paymentmethod = element(settings.addPaymentMethodText);
                            expect(paymentmethod.getText()).toContain('ADD A PAYMENT METHOD');
                        });

                        it('click the payment method button', () => {
                            const paymentmethod = element(settings.addPaymentMethodText);
                            paymentmethod.click();
                            // TODO: waitFor
                            browser.sleep(3000);
                        });
                        it('click for the add card', () => {
                            // .add-payment-block--button
                            const AddCard = element(settings.addCardText);
                            AddCard.click();
                        });

                        it('enter the card holder name', () => {
                            // TODO: convert to page object
                            $('input[formcontrolname="creditCardName"]').sendKeys('Meera');
                        });
                    });
                });
            });
        });
    });
});
