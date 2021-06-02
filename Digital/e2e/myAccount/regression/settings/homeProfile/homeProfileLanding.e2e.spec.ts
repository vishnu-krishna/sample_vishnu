import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile, PageHeader } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('home profile - "Landing Page" tests', () => {

    let context;
    let homeProfile: HomeProfile;
    let contractAddressEntered;
    const expectedPrivacyPolicyUrl = 'https://www.agl.com.au/site-pages/privacy';
    const redirectedPrivacyPolicyUrl = 'https://www.agl.com.au/privacy-policy';
    const privacyPolicyLinkText = 'Read our Privacy Policy';

    beforeAll(() => {
        context = new Context(browser.params.environment);
    });

    afterAll(() => {
        context.logout();
    });

    describe('with a User having a "Single Address"', () => {

        beforeAll(() => {
            const user = context.getUser(User.HOME_PROFILE);
            const currentAccount = user.accounts[0];
            contractAddressEntered = currentAccount.addressFormatted;
            context.setWindowSize(e2e.screenSizes.desktop);
            context.authenticateAsUser(user);
            homeProfile = new HomeProfile(context);
        });

        describe('in a desktop viewport', () => {
            describe('when navigating to the Home Profile for a Single Address Customer', () => {
                beforeAll(() => {
                    homeProfile.setFeatureFlag(true).then(() => {
                        homeProfile.navigateToManageAccount();
                    });
                });

                describe('Entry Point to Home Profile from Manage Account', () => {
                    it('should show the "Home Profile" Link under MANAGE ACCOUNT tab', () => {
                        expect(homeProfile.homeProfileLinkDisplayed()).toBe(true);
                    });
                });

                describe('Verify Landing Page of Home Profile', () => {
                    it('should show the "Home Profile" header text on landing Page', () => {
                        homeProfile.navigateToHomeProfileIntroPage();
                        expect(homeProfile.introPage.headerText()).toEqual(PageHeader.landingPageHeader);
                    });

                    it('should show the "START HOME PROFILE" Button on Home Profile landing page', () => {
                        waits.waitForVisibilityOf(homeProfile.introPage.startOrManageHomeProfileButton);
                        expect(homeProfile.introPage.startOrManageHomeProfileButton.isDisplayed()).toBe(true);
                    });

                    it('should show the correct "Contract Address" on Home Profile Intro page', () => {
                        expect(homeProfile.introPage.getContractAddress()).toEqual(contractAddressEntered);
                    });

                    it('should show the "Read Our Privacy Policy" Link', () => {
                        expect(homeProfile.getUrlFromText(privacyPolicyLinkText)).toBe(expectedPrivacyPolicyUrl);
                    });

                    it('should take Customer to new window on clicking "Read Our Privacy Policy"', () => {
                        homeProfile.clickOnLinkWithText(privacyPolicyLinkText);
                        expect(homeProfile.getUrlFromNewWindow()).toContain(redirectedPrivacyPolicyUrl);
                    });

                    it('should show the "Home Profile" header text when customer returns to Home Profile from Privacy Policy Page', () => {
                        expect(homeProfile.introPage.headerText()).toEqual(PageHeader.landingPageHeader);
                    });
                });

            });
        });
    });
});
