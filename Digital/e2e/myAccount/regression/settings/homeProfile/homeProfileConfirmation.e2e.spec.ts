import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile, PageHeader } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('home profile - "Confirmation page" test', () => {

    let context: Context;
    let homeProfile: HomeProfile;
    const energyInsightsUrl = 'https://campaign.agl.com.au/landing/residential/insights/';
    const energyInsightLinkText = 'Find out more here.';
    const thankYouBanner = 'Thank you for setting up your home profile';

    beforeAll(() => {
        context = new Context(browser.params.environment);
    });

    afterAll(() => {
        context.logout();
    });

    describe('with a User having a "Single Address"', () => {

        beforeAll(() => {
            const user = context.getUser(User.HOME_PROFILE);
            context.setWindowSize(e2e.screenSizes.desktop);
            context.authenticateAsUser(user);
            homeProfile = new HomeProfile(context);
        });

        describe('in a desktop viewport', () => {
            describe('when navigating to the Confirmation Page of Home Profile', () => {

                beforeAll(() => {
                    homeProfile.setFeatureFlag(true).then(() => {
                        homeProfile.navigateToPage(PageHeader.poolAndSpaHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                    });
                });

                describe('Verify confirmation page', () => {
                    it('should show the "Thank you for setting up your home profile" as the main banner on the page', () => {
                        expect(homeProfile.confirmationPage.thankYouBanner.getText()).toBe(thankYouBanner);
                    });

                    it('should take customer to Home Profile Landing page when "Close" button is clicked', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.closeButton);
                        expect(homeProfile.introPage.headerText()).toBe(PageHeader.landingPageHeader);
                    });

                });

            });
        });
    });
});
