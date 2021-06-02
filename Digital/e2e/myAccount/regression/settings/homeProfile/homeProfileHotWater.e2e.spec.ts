import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile, PageHeader } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('home profile - "Hot Water Page" test', () => {

    let context: Context;
    let homeProfile: HomeProfile;
    const hotWaterIcon = 'hotwater';
    const currentPage = '4';

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
            describe('when navigating to the "Hot water" Page of Home Profile', () => {
                beforeAll(() => {
                    homeProfile.setFeatureFlag(true).then(() => {
                        homeProfile.navigateToPage(PageHeader.hotWaterHeader);
                    });
                });

                describe('Navigate back and forth from `Hot water` page without filling any details', () => {
                    it('should go to NEXT page without selecting any option', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.fridgeAndFreezerHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.hotWaterHeader);
                    });
                });

                describe('Verify initial state of the page', () => {
                    it('should have page progress bar showing correct page sequence', () => {
                        expect(homeProfile.questionnairePages.progressBar.isEnabled()).toBe(true);
                        expect(homeProfile.questionnairePages.getCurrentPageFromProgressBar()).toBe(currentPage);
                    });
                });

                describe('Filling the form tests', () => {
                    const gasStorage = 'GasStorage';
                    const solarElectricBoost = 'SolarElectricBoost';
                    const notSure = 'NotSure';

                    beforeAll(() => {
                        homeProfile.hotWaterPage.getHotWaterTypeRadioButton(gasStorage).click();
                        homeProfile.hotWaterPage.getHotWaterTypeRadioButton(solarElectricBoost).click();
                    });

                    it('should retain highlighted fields while returning from Fridge And Freezer Page', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.fridgeAndFreezerHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        // verify previous page
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.heatingHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.hotWaterHeader);
                        expect(homeProfile.hotWaterPage.getHotWaterTypeRadioButton(solarElectricBoost).isSelected()).toBe(true);
                    });

                    it('should retain highlighted fields while returning to Hot Water page after clicking `Save and Close` button', () => {
                        homeProfile.hotWaterPage.getHotWaterTypeRadioButton(notSure).click();
                        homeProfile.questionnairePages.clickButton(homeProfile.saveAndCloseButton);
                        expect(homeProfile.introPage.headerText()).toEqual(PageHeader.landingPageHeader);
                        homeProfile.introPage.clickQuestionnaireIcon(hotWaterIcon);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.hotWaterHeader);
                        expect(homeProfile.hotWaterPage.getHotWaterTypeRadioButton(gasStorage).isSelected()).toBe(false);
                        expect(homeProfile.hotWaterPage.getHotWaterTypeRadioButton(solarElectricBoost).isSelected()).toBe(false);
                        expect(homeProfile.hotWaterPage.getHotWaterTypeRadioButton(notSure).isSelected()).toBe(true);
                    });

                });

            });
        });
    });
});
