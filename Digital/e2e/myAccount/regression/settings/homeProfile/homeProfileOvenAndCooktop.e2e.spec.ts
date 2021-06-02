import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile, PageHeader } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('home profile - "Oven and cooktop Page" test', () => {

    let context: Context;
    let homeProfile: HomeProfile;
    const ovenCooktopIcon = 'cooking';
    const currentPage = '6';
    const oven = 'Oven';
    const cooktop = 'Cooktop';
    const gas = 'Gas';
    const electric = 'Elec';
    const other = 'Other';
    const noGasOrOven = 'None';

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
            describe('when navigating to the Oven and cooktop Page of Home Profile', () => {

                beforeAll(() => {
                    homeProfile.setFeatureFlag(true).then(() => {
                        homeProfile.navigateToPage(PageHeader.ovenAndCooktopHeader);
                    });
                });

                describe('Navigate back and forth from Oven and cooktop page without filling any details', () => {
                    it('should go to NEXT page without selecting any option', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.otherElectricalItemsHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.ovenAndCooktopHeader);
                    });
                });

                describe('Verify initial state of the page', () => {
                    it('should have page progress bar showing correct page sequence', () => {
                        expect(homeProfile.questionnairePages.progressBar.isEnabled()).toBe(true);
                        expect(homeProfile.questionnairePages.getCurrentPageFromProgressBar()).toBe(currentPage);
                    });
                });

                describe('Filling the form tests', () => {
                    let initialOvenSelection = electric;
                    let newOvenSelection = noGasOrOven;
                    let newCooktopSelection = gas;
                    beforeAll(() => {
                        homeProfile.ovenAndCooktopPage.getOvenOrCooktopRadioButton(oven, initialOvenSelection).click();
                    });

                    it('should retain highlighted fields while returning from Other electrical items Page', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.otherElectricalItemsHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.ovenAndCooktopHeader);
                        expect(homeProfile.ovenAndCooktopPage.getOvenOrCooktopRadioButton(oven, initialOvenSelection).isSelected()).toBe(true);
                    });

                    it('should retain highlighted fields while returning to Oven and cooktop page after clicking Save and close button', () => {
                        homeProfile.ovenAndCooktopPage.getOvenOrCooktopRadioButton(oven, newOvenSelection).click();
                        homeProfile.ovenAndCooktopPage.getOvenOrCooktopRadioButton(cooktop, newCooktopSelection).click();
                        homeProfile.questionnairePages.clickButton(homeProfile.saveAndCloseButton);
                        expect(homeProfile.introPage.headerText()).toEqual(PageHeader.landingPageHeader);
                        homeProfile.introPage.clickQuestionnaireIcon(ovenCooktopIcon);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.ovenAndCooktopHeader);
                        expect(homeProfile.ovenAndCooktopPage.getOvenOrCooktopRadioButton(oven, initialOvenSelection).isSelected()).toBe(false);
                        expect(homeProfile.ovenAndCooktopPage.getOvenOrCooktopRadioButton(oven, newOvenSelection).isSelected()).toBe(true);
                        expect(homeProfile.ovenAndCooktopPage.getOvenOrCooktopRadioButton(cooktop, newCooktopSelection).isSelected()).toBe(true);
                    });

                });

            });
        });
    });
});
