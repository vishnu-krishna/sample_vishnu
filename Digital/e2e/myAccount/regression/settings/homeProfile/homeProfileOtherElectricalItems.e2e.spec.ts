import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile, PageHeader } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('home profile - "Other electrical items Page" test', () => {

    let context: Context;
    let homeProfile: HomeProfile;
    const electricalIcon = 'entertainment';
    const currentPage = '7';
    const television = 'television';
    const washingMachine = 'washing-machine';
    const clothesDryer = 'clothes-dryer';
    const dishwasher = 'dishwasher';
    const microwave = 'microwave';
    const electricVehicle = 'electric-vehicle';

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
            describe('when navigating to the Other electrical items Page of Home Profile', () => {

                beforeAll(() => {
                    homeProfile.setFeatureFlag(true).then(() => {
                        homeProfile.navigateToPage(PageHeader.otherElectricalItemsHeader);
                    });
                });

                describe('Navigate back and forth from Other electrical items page without filling any details', () => {
                    it('should go to NEXT page without selecting any option', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.poolAndSpaHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.otherElectricalItemsHeader);
                    });
                });

                describe('Verify initial state of the page', () => {
                    it('should have page progress bar showing correct page sequence', () => {
                        expect(homeProfile.questionnairePages.progressBar.isEnabled()).toBe(true);
                        expect(homeProfile.questionnairePages.getCurrentPageFromProgressBar()).toBe(currentPage);
                    });
                });

                describe('Filling the form tests', () => {
                    let initialNumOfTv = '2';
                    let initialYouHaveWashingMachine = 'Yes';
                    let initialYouHaveDishwasher = 'No';
                    let newNumOfTv = '3+';
                    let newYouHaveElectricVehicles = 'Yes';
                    beforeAll(() => {
                        homeProfile.otherElectricalItemsPage.getSegmentedBtnByValue(television, initialNumOfTv).click();
                        homeProfile.otherElectricalItemsPage.getSegmentedBtnByValue(washingMachine, initialYouHaveWashingMachine).click();
                        homeProfile.otherElectricalItemsPage.getSegmentedBtnByValue(dishwasher, initialYouHaveDishwasher).click();
                    });

                    it('should retain highlighted fields while returning from Pools and spa Page', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.poolAndSpaHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.otherElectricalItemsHeader);
                        expect(homeProfile.otherElectricalItemsPage.isSegmentedBtnSelected(television, initialNumOfTv)).toBe(true);
                        expect(homeProfile.otherElectricalItemsPage.isSegmentedBtnSelected(washingMachine, initialYouHaveWashingMachine)).toBe(true);
                        expect(homeProfile.otherElectricalItemsPage.isSegmentedBtnSelected(dishwasher, initialYouHaveDishwasher)).toBe(true);
                    });

                    it('should retain highlighted fields while returning to Other electrical items page after clicking Save and Close button', () => {
                        homeProfile.otherElectricalItemsPage.getSegmentedBtnByValue(television, newNumOfTv).click();
                        homeProfile.otherElectricalItemsPage.getSegmentedBtnByValue(electricVehicle, newYouHaveElectricVehicles).click();
                        homeProfile.questionnairePages.clickButton(homeProfile.saveAndCloseButton);
                        expect(homeProfile.introPage.headerText()).toEqual(PageHeader.landingPageHeader);
                        homeProfile.introPage.clickQuestionnaireIcon(electricalIcon);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.otherElectricalItemsHeader);
                        expect(homeProfile.otherElectricalItemsPage.isSegmentedBtnSelected(television, initialNumOfTv)).toBe(false);
                        expect(homeProfile.otherElectricalItemsPage.isSegmentedBtnSelected(television, newNumOfTv)).toBe(true);
                        expect(homeProfile.otherElectricalItemsPage.isSegmentedBtnSelected(washingMachine, initialYouHaveWashingMachine)).toBe(true);
                        expect(homeProfile.otherElectricalItemsPage.isSegmentedBtnSelected(dishwasher, initialYouHaveDishwasher)).toBe(true);
                        expect(homeProfile.otherElectricalItemsPage.isSegmentedBtnSelected(electricVehicle, newYouHaveElectricVehicles)).toBe(true);
                    });

                });

            });
        });
    });
});
