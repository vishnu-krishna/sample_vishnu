import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { settings } from '../pageObjects/settings';
import { User } from '../../enums/enums';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import * as waits from '../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('regression test - bill smoothing', () => {

    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let currentElectricityContract: FuelEntity;
    let currentGasContract: FuelEntity;
    let context: Context;

    beforeAll(() => {
        context = new Context(browser.params.environment);
    });

    afterAll(() => {
        context.logout();
    });

    describe('Logging in with default user', () => {

        beforeAll((done) => {
            user = context.getUser(User.BILLSMOOTHING);
            currentAccount = user.accounts[0];
            currentElectricityContract = currentAccount.contracts.electricity[0];
            currentGasContract = currentAccount.contracts.gas[0];
            context.authenticateAsUser(user).then(() => {
                done();
            });
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            describe('set up bill smoothing for the elec and gas weekly payment with the default date ', () => {

                it('should display manage account header link', () => {
                    expect(settings.manageAccountHeaderLink.isDisplayed()).toBe(true);
                });

                it('should display bill smoothing link on Manage Account', () => {
                    settings.manageAccountHeaderLink.click();
                    waits.waitForElement(element(settings.billsmoothing));
                    let ele = element(settings.billsmoothing);
                    expect(ele.getText()).toContain('Bill Smoothing');
                });

                it('should display bill smoothing set up button', () => {
                    waits.waitForVisibilityOf(element(settings.billsmoothing));
                    let ele = element(settings.billsmoothing);
                    ele.click();
                    waits.waitForElement(settings.billsmoothingpage.billSmoothingsetupButton);
                    expect(settings.billsmoothingpage.billSmoothingsetupButton.getText()).toContain('SET UP BILL SMOOTHING');
                });

                it('should display weekly payment frequency option', () => {
                    settings.billsmoothingpage.billSmoothingsetupButton.click();
                    expect(settings.billsmoothingpage.billSmoothingWeeklyRadioOption.isDisplayed()).toBe(true);
                });

                it('should display the set up start payment information', (done) => {
                    settings.billsmoothingpage.billSmoothingWeeklyRadioOption.click();
                    let ele1 = settings.billsmoothingpage.billSmoothingstartPaymentText;
                    settings.billsmoothingpage.billSmoothingWeeklyStartDateDropdown.getAttribute('value').then((value1) => {
                        settings.billsmoothingpage.billSmoothingWeeklyPaymentDueDropdown.getAttribute('value').then((value2) => {
                            expect(ele1.getText()).toContain(`Your first payment: ${value2} ${value1}`);
                            done();
                        });
                    });
                });

                it('should display the set up start payment sub information', (done) => {
                    let ele = settings.billsmoothingpage.billSmoothingstartPaymentsubText;
                    settings.billsmoothingpage.billSmoothingWeeklyPaymentDueDropdown.getAttribute('value').then((value) => {
                        expect(ele.getText()).toContain(`We will debit your nominated account every ${value}`);
                        done();
                    });
                });

                it('should display the save button', () => {
                    waits.waitForElement(settings.billsmoothingpage.billSmoothingWeeklySaveButton);
                    expect(settings.billsmoothingpage.billSmoothingWeeklySaveButton.isDisplayed()).toBe(true);
                });

                it('should display the close button', () => {
                    settings.billsmoothingpage.billSmoothingWeeklySaveButton.click();
                    waits.waitForInvisibilityOf(settings.billsmoothingpage.billSmoothingWeeklySaveButton);
                    let ele = element(settings.billsmoothingpage.billSmoothingcloseConfrimationButton);
                    expect(ele.isDisplayed()).toBe(true);
                });
            });

        });
    });
    describe('Logging in with default user', () => {

        beforeAll((done) => {
            user = context.getUser(User.BILLSMOOTHING);
            currentAccount = user.accounts[0];
            currentElectricityContract = currentAccount.contracts.electricity[0];
            currentGasContract = currentAccount.contracts.gas[0];
            context.authenticateAsUser(user).then(() => {
                done();
            });
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            describe('set up bill smoothing for the elec and gas weekly payment for the selected date ', () => {

                it('should display manage account header link', () => {
                    expect(settings.manageAccountHeaderLink.isDisplayed()).toBe(true);
                });

                it('should display bill smoothing link on Manage Account', () => {
                    settings.manageAccountHeaderLink.click();
                    waits.waitForElement(element(settings.billsmoothing));
                    let ele = element(settings.billsmoothing);
                    expect(ele.getText()).toContain('Bill Smoothing');
                });

                it('should display bill smoothing set up button', () => {
                    let ele = element(settings.billsmoothing);
                    ele.click();
                    waits.waitForElement(settings.billsmoothingpage.billSmoothingsetupButton);
                    expect(settings.billsmoothingpage.billSmoothingsetupButton.getText()).toContain('SET UP BILL SMOOTHING');
                });

                it('should display weekly payment frequency option', () => {
                    settings.billsmoothingpage.billSmoothingsetupButton.click();
                    expect(settings.billsmoothingpage.billSmoothingWeeklyRadioOption.isDisplayed()).toBe(true);
                });

                describe('after selecting weekly payment option', () => {
                    beforeAll(() => {
                        settings.billsmoothingpage.billSmoothingWeeklyRadioOption.click();
                    });

                    it('should display the correct set up start payment information', (done) => {
                        element(by.cssContainingText('option', 'Wednesday')).click();
                        element(by.cssContainingText('option', '24 May 2017')).click();
                        let ele1 = settings.billsmoothingpage.billSmoothingstartPaymentText;
                        settings.billsmoothingpage.billSmoothingWeeklyStartDateDropdown.getAttribute('value').then((value1) => {
                            settings.billsmoothingpage.billSmoothingWeeklyPaymentDueDropdown.getAttribute('value').then((value2) => {
                                expect(ele1.getText()).toContain(`Your first payment: ${value2} ${value1}`);
                                done();
                            });
                         });
                    });

                    it('should display the set up start payment sub information', (done) => {
                        let ele = settings.billsmoothingpage.billSmoothingstartPaymentsubText;
                        settings.billsmoothingpage.billSmoothingWeeklyPaymentDueDropdown.getAttribute('value').then((value) => {
                            expect(ele.getText()).toContain(`We will debit your nominated account every ${value}`);
                            done();
                        });
                    });

                    it('should display the save button', () => {
                        waits.waitForElement(settings.billsmoothingpage.billSmoothingWeeklySaveButton);
                        expect(settings.billsmoothingpage.billSmoothingWeeklySaveButton.isDisplayed()).toBe(true);
                    });

                });

                it('should display the close button', () => {
                    settings.billsmoothingpage.billSmoothingWeeklySaveButton.click();
                    waits.waitForInvisibilityOf(settings.billsmoothingpage.billSmoothingWeeklySaveButton);
                    let ele = element(settings.billsmoothingpage.billSmoothingcloseConfrimationButton);
                    expect(ele.isDisplayed()).toBe(true);

                    ele.click();
                    waits.waitForModalToDisappear(element(by.css('.dialog-container')));
                });
            });
        });
    });

});
