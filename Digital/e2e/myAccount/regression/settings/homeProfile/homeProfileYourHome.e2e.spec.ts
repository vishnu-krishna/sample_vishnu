import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile, PageHeader } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';
import { hostElement } from '@angular/core/src/render3/instructions';

let e2e = new ProtractorExtensions();

describe('home profile - "Your Home page" tests', () => {

    const yourHomeIcon = 'yourhome';
    const house = 'House';
    const townhouse = 'Townhouse';
    const apartmentOrUnit = 'Apartment';
    const other = 'Other';
    const houseText = 'House';
    const townhouseText = 'Townhouse';
    const apartmentOrUnitText = 'Apartment/Unit';
    const otherText = 'Other';
    const currentPage = '1';
    let context: Context;
    let homeProfile: HomeProfile;

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
            describe('Navigate to "Your Home" page of Home Profile`s', () => {
                beforeAll(() => {
                    homeProfile.setFeatureFlag(true).then(() => {
                        homeProfile.navigateToPage(PageHeader.yourHomeHeader);
                    });
                });

                describe('Verify sequence of pages', () => {
                    it('should have page progress bar showing correct current page', () => {
                        expect(homeProfile.questionnairePages.progressBar.isDisplayed()).toBe(true);
                        expect(homeProfile.questionnairePages.getCurrentPageFromProgressBar()).toBe(currentPage);
                    });
                });

                describe('Navigate back and forth from Your Home page without filling any details', () => {
                    const numOfAdults = '2';
                    const numOfChildren = '2';

                    it('should go to NEXT page without selecting any option', () => {
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(0).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(1).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(2).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(3).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfAdultsElement(numOfAdults))).toBe(false);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfChildrenElement(numOfChildren))).toBe(false);
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.coolingHeader);
                    });

                    it('should have none of the option selected when navigating BACK to Your Home page', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.yourHomeHeader);
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(0).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(1).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(2).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(3).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfAdultsElement(numOfAdults))).toBe(false);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfAdultsElement(numOfChildren))).toBe(false);
                    });
                });

                describe('Verify default values when entering to Your home page', () => {
                    it('should show the "Your home" as the main heading', () => {
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toEqual(PageHeader.yourHomeHeader);
                    });

                    it('should show 4 Radio Buttons & Labels under "What kind of home do you live in?" - all de-selected', () => {
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().count()).toBe(4);
                        expect(homeProfile.yourHomePage.totalHomeProfileLabels.get(0).getText()).toBe(houseText);
                        expect(homeProfile.yourHomePage.totalHomeProfileLabels.get(1).getText()).toBe(townhouseText);
                        expect(homeProfile.yourHomePage.totalHomeProfileLabels.get(2).getText()).toBe(apartmentOrUnitText);
                        expect(homeProfile.yourHomePage.totalHomeProfileLabels.get(3).getText()).toBe(otherText);
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(0).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(1).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(2).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getAllHomeTypeOptions().get(3).isSelected()).toBe(false);
                    });

                    it('should show subsections "Number of adults?" and "Number of children?"', () => {
                        expect(homeProfile.yourHomePage.numberOfPeopleHeadings.count()).toBe(2);
                        expect(homeProfile.yourHomePage.numberOfPeopleHeadings.get(0).getText()).toBe('Number of adults?');
                        expect(homeProfile.yourHomePage.numberOfPeopleHeadings.get(1).getText()).toBe('Number of children?');
                    });

                });

                describe('Selecting "What kind of home do you live in?" tests', () => {
                    it('should highlight only 1 Radio Button at a time and should have 2 questions under each section', () => {
                        // Select House
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(house);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(house).count()).toBe(2);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(house).isSelected()).toBe(true);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(townhouse).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(apartmentOrUnit).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(other).isSelected()).toBe(false);

                        // Select Townhouse
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(townhouse);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(townhouse).count()).toBe(2);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(house).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(townhouse).isSelected()).toBe(true);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(apartmentOrUnit).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(other).isSelected()).toBe(false);

                        // Select Apartment/Unit
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(apartmentOrUnit);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(apartmentOrUnit).count()).toBe(2);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(house).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(townhouse).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(apartmentOrUnit).isSelected()).toBe(true);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(other).isSelected()).toBe(false);

                        // Select Other
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(other);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(other).count()).toBe(2);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(house).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(townhouse).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(apartmentOrUnit).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(other).isSelected()).toBe(true);
                    });

                    it('should not show number of bedrooms and bathrooms for unselected home types', () => {
                        // Select House
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(house);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(house).get(0).isDisplayed()).toBe(true);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(house).get(1).isDisplayed()).toBe(true);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(townhouse).get(0).isPresent()).toBe(false);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(apartmentOrUnit).get(0).isPresent()).toBe(false);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(other).get(0).isPresent()).toBe(false);

                        // Select Townhouse
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(townhouse);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(house).get(0).isPresent()).toBe(false);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(townhouse).get(0).isDisplayed()).toBe(true);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(townhouse).get(1).isDisplayed()).toBe(true);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(apartmentOrUnit).get(0).isPresent()).toBe(false);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(other).get(0).isPresent()).toBe(false);

                        // Select Apartment/Unit
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(apartmentOrUnit);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(house).get(0).isPresent()).toBe(false);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(townhouse).get(0).isPresent()).toBe(false);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(apartmentOrUnit).get(0).isDisplayed()).toBe(true);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(apartmentOrUnit).get(1).isDisplayed()).toBe(true);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(other).get(0).isPresent()).toBe(false);

                        // Select Other
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(other);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(house).get(0).isPresent()).toBe(false);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(townhouse).get(0).isPresent()).toBe(false);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(apartmentOrUnit).get(0).isPresent()).toBe(false);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(other).get(0).isDisplayed()).toBe(true);
                        expect(homeProfile.yourHomePage.questionLabelsUnderHomeTypeElement(other).get(1).isDisplayed()).toBe(true);

                    });

                    it('should highlight the right number of bedrooms and bathrooms on selection', () => {
                        const numOfBed = '3';   // Select Number of bedrooms as 3
                        const numOfBath = '4+'; // Select Number of bathrooms as 4+
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(house);
                        expect(homeProfile.yourHomePage.getNumberOfBedroomsElement(house, numOfBed).getText()).toBe(numOfBed);
                        homeProfile.yourHomePage.getNumberOfBedroomsElement(house, numOfBed).click();
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfBedroomsElement(house, numOfBed))).toBe(true);
                        expect(homeProfile.yourHomePage.getNumberOfBathroomsElement(house, numOfBath).getText()).toBe(numOfBath);
                        homeProfile.yourHomePage.getNumberOfBathroomsElement(house, numOfBath).click();
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfBathroomsElement(house, numOfBath))).toBe(true);
                    });

                    it('should highlight the right number of adults and children on selection', () => {
                        const numOfAdults = '2';    // Fill Number of Adults as 2
                        const numOfChildren = '5+'; // Fill Number of Children as 5+
                        expect(homeProfile.yourHomePage.getNumberOfAdultsElement(numOfAdults).getText()).toBe(numOfAdults);
                        homeProfile.yourHomePage.getNumberOfAdultsElement(numOfAdults).click();
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfAdultsElement(numOfAdults))).toBe(true);
                        expect(homeProfile.yourHomePage.getNumberOfChildrenElement(numOfChildren).getText()).toBe(numOfChildren);
                        homeProfile.yourHomePage.getNumberOfChildrenElement(numOfChildren).click();
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfChildrenElement(numOfChildren))).toBe(true);
                    });
                });

                describe('Filling the form tests', () => {

                    const initialBeds = '2';
                    const initialBaths = '3';
                    const initialAdults = '1';
                    const initialChildren = '1';
                    const newBeds = '1';
                    const newBaths = '1';
                    const newAdults = '5+';
                    const newChildren = '0';

                    beforeAll(() => {
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(townhouse);
                        homeProfile.yourHomePage.getNumberOfBedroomsElement(townhouse, initialBeds).click();
                        homeProfile.yourHomePage.getNumberOfBathroomsElement(townhouse, initialBaths).click();
                        homeProfile.yourHomePage.getNumberOfAdultsElement(initialAdults).click();
                        homeProfile.yourHomePage.getNumberOfChildrenElement(initialChildren).click();
                    });

                    it('should retain highlighted fields while returning from Cooling Page', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.coolingHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.yourHomeHeader);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(townhouse).isSelected()).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfBedroomsElement(townhouse, initialBeds))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfBathroomsElement(townhouse, initialBaths))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfAdultsElement(initialAdults))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfChildrenElement(initialChildren))).toBe(true);
                    });

                    it('should retain highlighted fields while returning from Intro Page', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        homeProfile.introPage.waitForIntroPage();
                        homeProfile.introPage.clickQuestionnaireIcon(yourHomeIcon);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.yourHomeHeader);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(townhouse).isSelected()).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfBedroomsElement(townhouse, initialBeds))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfBathroomsElement(townhouse, initialBaths))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfAdultsElement(initialAdults))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfChildrenElement(initialChildren))).toBe(true);
                    });

                    it('should retain the changed highlighted fields moving back and forth from Your Home Page', () => {
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(apartmentOrUnit);
                        homeProfile.yourHomePage.getNumberOfBedroomsElement(apartmentOrUnit, newBeds).click();
                        homeProfile.yourHomePage.getNumberOfBathroomsElement(apartmentOrUnit, newBaths).click();
                        homeProfile.yourHomePage.getNumberOfAdultsElement(newAdults).click();
                        homeProfile.yourHomePage.getNumberOfChildrenElement(newChildren).click();
                        homeProfile.questionnairePages.clickButton(homeProfile.saveAndCloseButton);
                        homeProfile.introPage.waitForIntroPage();
                        homeProfile.introPage.clickQuestionnaireIcon(yourHomeIcon);
                        homeProfile.questionnairePages.getMainHeaderText();
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(townhouse).isSelected()).toBe(false);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfAdultsElement(initialAdults))).toBe(false);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfAdultsElement(initialChildren))).toBe(false);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(apartmentOrUnit).isSelected()).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfBedroomsElement(apartmentOrUnit, newBeds))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfBathroomsElement(apartmentOrUnit, newBaths))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfAdultsElement(newAdults))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfChildrenElement(newChildren))).toBe(true);
                    });
                });

                describe('Verify that selection is retained when user click "Save and Close" button', () => {

                    const initialBeds = '2';
                    const initialBaths = '2';
                    const initialAdults = '3';
                    const initialChildren = '1';

                    beforeAll(() => {
                        homeProfile.yourHomePage.selectWhatKindOfHomeRadioButton(townhouse);
                        homeProfile.yourHomePage.getNumberOfBedroomsElement(townhouse, initialBeds).click();
                        homeProfile.yourHomePage.getNumberOfBathroomsElement(townhouse, initialBaths).click();
                        homeProfile.yourHomePage.getNumberOfAdultsElement(initialAdults).click();
                        homeProfile.yourHomePage.getNumberOfChildrenElement(initialChildren).click();
                    });

                    it('should go to Intro Page when save and close button is clicked', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.saveAndCloseButton);
                        expect(homeProfile.introPage.headerText()).toBe(PageHeader.landingPageHeader);
                    });

                    it('should retain the highlighted fields when user returns to Your Home after clicking save and close button within a session', () => {
                        homeProfile.introPage.clickQuestionnaireIcon(yourHomeIcon);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.yourHomeHeader);
                        expect(homeProfile.yourHomePage.getTypeOfHomeRadioBtnElement(townhouse).isSelected()).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfBedroomsElement(townhouse, initialBeds))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfBathroomsElement(townhouse, initialBaths))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfAdultsElement(initialAdults))).toBe(true);
                        expect(homeProfile.yourHomePage.isYourHomeSegmentedBtnSelected(homeProfile.yourHomePage.getNumberOfChildrenElement(initialChildren))).toBe(true);
                    });
                });

            });

        });

    });

});
