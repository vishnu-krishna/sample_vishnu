import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile, PageHeader } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('home profile - "Fridge and Freezer Page" test', () => {

    let context: Context;
    let homeProfile: HomeProfile;
    const currentPage = '5';
    const primary = 'primary';
    const secondary = 'secondary';
    const freezerOnly = 'Freezer';
    const topOrBottomMountFridge = 'TopOrBottomMount';
    const sideBySideFridge = 'SideBySide';
    const barFridge = 'Bar';
    const noFridge = 'None';

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
            describe('when navigating to the Fridge and freezer Page of Home Profile', () => {

                beforeAll(() => {
                    homeProfile.setFeatureFlag(true).then(() => {
                    homeProfile.navigateToPage(PageHeader.fridgeAndFreezerHeader);
                });
            });

                describe('Navigate back and forth from Fridge and freezers page without filling any details', () => {
                    it('should go to NEXT page without selecting any option', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.ovenAndCooktopHeader);
                    });

                    it('should have none of the option selected when navigating BACK to Fridge and freezers page', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.fridgeAndFreezerHeader);
                        expect(homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(topOrBottomMountFridge, primary).isSelected()).toBe(false);
                        expect(homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(sideBySideFridge, primary).isSelected()).toBe(false);
                        expect(homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(barFridge, primary).isSelected()).toBe(false);
                        expect(homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(freezerOnly, primary).isSelected()).toBe(false);
                        expect(homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(noFridge, primary).isSelected()).toBe(false);
                    });
                });

                describe('Verify initial state of the page', () => {
                    it('should have page progress bar showing correct page sequence', () => {
                        expect(homeProfile.questionnairePages.progressBar.isEnabled()).toBe(true);
                        expect(homeProfile.questionnairePages.getCurrentPageFromProgressBar()).toBe(currentPage);
                    });

                    it('"+ ADD ANOTHER FRIDGE/FREEZER" option should be disabled if no Primary Fridge is selected', () => {
                        expect(homeProfile.fridgeAndFreezerPage.isAddAnotherFridgeEnabled()).toBe(false);
                    });

                    it('"+ ADD ANOTHER FRIDGE/FREEZER" option should be enabled and clickable on selecting Primary Fridge', () => {
                        homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(freezerOnly, primary).click();
                        expect(homeProfile.fridgeAndFreezerPage.isAddAnotherFridgeEnabled()).toBe(true);
                        homeProfile.fridgeAndFreezerPage.getAddAnotherFridgeElement().click();
                        homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(freezerOnly, secondary).click();
                        expect(homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(freezerOnly, secondary).isSelected()).toBe(true);
                    });

                    it('"+ ADD ANOTHER FRIDGE/FREEZER" option should be disabled on Primary Fridge selected as No Fridge', () => {
                        homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(noFridge, primary).click();
                        expect(homeProfile.fridgeAndFreezerPage.isAddAnotherFridgeEnabled()).toBe(false);
                    });
                });

                describe('Filling the form tests', () => {
                    const initialPrimaryYears = '6-10';
                    const initialSecondaryYears = '11+';
                    const initialPrimaryFridge = topOrBottomMountFridge;
                    const initialSecondaryFridge = freezerOnly;

                    beforeAll(() => {
                        browser.executeScript('arguments[0].scrollIntoView();', homeProfile.questionnairePages.mainHeader.getWebElement());
                        homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(initialPrimaryFridge, primary).click();
                        homeProfile.fridgeAndFreezerPage.getFridgeTypeSegmentedButton(initialPrimaryFridge, primary, initialPrimaryYears).click();
                        homeProfile.fridgeAndFreezerPage.getAddAnotherFridgeElement().click();
                        homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(initialSecondaryFridge, secondary).click();
                        homeProfile.fridgeAndFreezerPage.getFridgeTypeSegmentedButton(initialSecondaryFridge, secondary, initialSecondaryYears).click();
                    });

                    it('should retain highlighted fields while returning from Oven and cooktop Page ', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.ovenAndCooktopHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.fridgeAndFreezerHeader);
                        expect(homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(initialPrimaryFridge, primary).isSelected()).toBe(true);
                        expect(homeProfile.fridgeAndFreezerPage.isFridgeTypeSegmentedButtonSelected(initialSecondaryFridge, secondary, initialSecondaryYears)).toBe(true);
                        expect(homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(initialSecondaryFridge, secondary).isSelected()).toBe(true);
                    });

                    it('should retain highlighted fields while returning from Hot water Page ', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.hotWaterHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.fridgeAndFreezerHeader);
                        expect(homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(initialPrimaryFridge, primary).isSelected()).toBe(true);
                        expect(homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(initialSecondaryFridge, secondary).isSelected()).toBe(true);
                        expect(homeProfile.fridgeAndFreezerPage.isFridgeTypeSegmentedButtonSelected(initialSecondaryFridge, secondary, initialSecondaryYears)).toBe(true);
                    });

                    it('should loose secondary fridge data on closing the secondary fridge container', () => {
                        homeProfile.fridgeAndFreezerPage.closeAnotherFridgeElement.click();
                        waits.waitForInvisibilityOf(homeProfile.fridgeAndFreezerPage.closeAnotherFridgeElement);
                        expect(homeProfile.fridgeAndFreezerPage.closeAnotherFridgeElement.isPresent()).toBe(false);
                        expect(homeProfile.fridgeAndFreezerPage.addAnotherFridgeParentElement.isPresent()).toBe(true);
                        homeProfile.fridgeAndFreezerPage.getAddAnotherFridgeElement().click();
                        expect(homeProfile.fridgeAndFreezerPage.getFridgeRadioButton(initialSecondaryFridge, secondary).isSelected()).toBe(false);
                    });
                });
            });
        });
    });
});
