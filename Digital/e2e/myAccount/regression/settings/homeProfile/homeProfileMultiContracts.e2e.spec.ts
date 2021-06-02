import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile, PageHeader } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';
import { headersToString } from 'selenium-webdriver/http';
import { first } from 'rxjs/operator/first';

let e2e = new ProtractorExtensions();

describe('home profile - "Multiple Address Customer" test', () => {

    let context: Context;
    let homeProfile: HomeProfile;
    let firstAddress;
    let secondAddress;
    const yourHomeIcon = 'yourhome';

    beforeAll(() => {
        context = new Context(browser.params.environment);
    });

    afterAll(() => {
        context.logout();
    });

    describe('with a User having "Multiple Address"', () => {

        beforeAll(() => {
            const user = context.getUser(User.HOME_PROFILE_MULTI_CONTRACT);
            const firstAccount = user.accounts[0];
            const secondAccount = user.accounts[1];
            firstAddress = firstAccount.addressFormatted;
            secondAddress = secondAccount.addressFormatted;
            context.setWindowSize(e2e.screenSizes.desktop);
            context.authenticateAsUser(user);
            homeProfile = new HomeProfile(context);
        });

        describe('in a desktop viewport', () => {
            describe('start Home Profile with one unused address', () => {
                beforeAll(() => {
                    homeProfile.setFeatureFlag(true).then(() => {
                        homeProfile.navigateToManageAccount();
                        homeProfile.navigateToHomeProfileIntroPage();
                        homeProfile.introPage.clickStartOrManageHomeProfileButton();
                    });
                });

                describe('Display FuelChip with Address - HP has not been started on any account', () => {
                    describe('Verify "address selection" page appears on starting home profile', () => {
                        it('should provide multiple addresses under `contract not started` heading to choose from', () => {
                            expect(homeProfile.chooseYourServicePage.isContractNotStartedForAddress(firstAddress)).toBe(true);
                            expect(homeProfile.chooseYourServicePage.isContractNotStartedForAddress(secondAddress)).toBe(true);
                        });
                    });
                });

                describe('Display list of accounts - HP has been started on at least one account', () => {
                    describe('Select Address without existing profile', () => {
                        it('should navigate to Your Home Page', () => {
                            homeProfile.chooseYourServicePage.clickAddress(firstAddress);
                            expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.yourHomeHeader);
                        });
                    });

                    describe('When Save and Close is clicked while filling home profile', () => {
                        it('should navigate to Home Profile Landing Page', () => {
                            homeProfile.questionnairePages.clickButton(homeProfile.saveAndCloseButton);
                            expect(homeProfile.introPage.headerText()).toEqual(PageHeader.landingPageHeader);
                        });
                        it('should show `MANAGE HOME PROFILE` button on home profile landing page', () => {
                            waits.waitForVisibilityOf(homeProfile.introPage.startOrManageHomeProfileButton);
                            expect(homeProfile.introPage.startOrManageHomeProfileButton.isDisplayed()).toBe(true);
                            expect(homeProfile.introPage.startOrManageHomeProfileButton.getText()).toBe('MANAGE HOME PROFILE');
                        });
                    });

                    describe('verify "MANAGE HOME PROFILE" conditions', () => {
                        beforeAll(() => {
                            homeProfile.introPage.clickStartOrManageHomeProfileButton();
                        });

                        it('should show previously selected address under `contract started` heading on Your Service Page', () => {
                            expect(homeProfile.chooseYourServicePage.isContractNotStartedForAddress(firstAddress)).toBe(false);
                            expect(homeProfile.chooseYourServicePage.isContractStartedForAddress(firstAddress)).toBe(true);
                        });
                        it('should show remaining addresses under `contract not started` heading on Your Service Page', () => {
                            expect(homeProfile.chooseYourServicePage.isContractNotStartedForAddress(secondAddress)).toBe(true);
                            expect(homeProfile.chooseYourServicePage.isContractStartedForAddress(secondAddress)).toBe(false);
                        });
                    });

                    describe('Select Address with existing profile', () => {
                        beforeAll(() => {
                            homeProfile.chooseYourServicePage.clickAddress(firstAddress);
                        });

                        it('should display Landing Page', () => {
                            expect(homeProfile.questionnairePages.getMainHeaderText()).toEqual('Your Home profile');
                        });
                        it('should navigate to Your Home on clicking `edit` icon', () => {
                            homeProfile.introPage.clickQuestionnaireIcon(yourHomeIcon);
                            expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.yourHomeHeader);
                        });
                    });
                });
            });
        });
    });
});
