import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile, PageHeader } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('home profile - "Heating Page" test', () => {

    let context: Context;
    let homeProfile: HomeProfile;
    const heatingIcon = PageHeader.heatingHeader.toLowerCase();
    const currentPage = '3';
    const otherHeatingGas = 'Gas';
    const otherHeatingElectricity = 'Elec';
    const otherHeatingWoodfire = 'Woodfire';
    const otherHeatingNone = 'None';
    const ducted = 'ducted';
    const splitSystem = 'split-system';
    const portableElectric = 'portable-electric';

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
            describe('when navigating to the Heating Page of Home Profile', () => {

                beforeAll(() => {
                    homeProfile.setFeatureFlag(true).then(() => {
                        homeProfile.navigateToPage(PageHeader.heatingHeader);
                    });
                });

                describe('Navigate back and forth from Heating page without filling any details', () => {
                    it('should go to NEXT page without selecting any option', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.hotWaterHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.heatingHeader);
                    });
                });

                describe('Verify initial state of the page', () => {
                    it('should have page progress bar showing correct page sequence', () => {
                        expect(homeProfile.questionnairePages.progressBar.isEnabled()).toBe(true);
                        expect(homeProfile.questionnairePages.getCurrentPageFromProgressBar()).toBe(currentPage);
                    });
                });

                describe('Filling the form tests', () => {
                    const ductedGas = 'Gas';
                    const ductedElectricity = 'Electricity';
                    let initialSplitSystem = '1';
                    let initialPortableElectric = '3+';
                    beforeAll(() => {
                        homeProfile.heatingPage.getSegmentedBtnByValue(ducted, ductedGas).click();
                        homeProfile.heatingPage.getSegmentedBtnByValue(splitSystem, initialSplitSystem).click();
                        homeProfile.heatingPage.getSegmentedBtnByValue(portableElectric, initialPortableElectric).click();
                    });

                    it('should retain highlighted fields while returning from Hot water Page', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.hotWaterHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.heatingHeader);
                        expect(homeProfile.heatingPage.isSegmentedBtnSelected(ducted, ductedGas)).toBe(true);
                        expect(homeProfile.heatingPage.isSegmentedBtnSelected(splitSystem, initialSplitSystem)).toBe(true);
                        expect(homeProfile.heatingPage.isSegmentedBtnSelected(portableElectric, initialPortableElectric)).toBe(true);
                    });

                    it('should retain highlighted fields while returning to Heating page after clicking Save and Close button', () => {
                        homeProfile.heatingPage.getSegmentedBtnByValue(ducted, ductedElectricity).click();
                        homeProfile.heatingPage.getOtherHeatingRadioButton(otherHeatingGas).click();
                        homeProfile.questionnairePages.clickButton(homeProfile.saveAndCloseButton);
                        expect(homeProfile.introPage.headerText()).toEqual(PageHeader.landingPageHeader);
                        homeProfile.introPage.clickQuestionnaireIcon(heatingIcon);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.heatingHeader);
                        expect(homeProfile.heatingPage.isSegmentedBtnSelected(ducted, ductedGas)).toBe(false);
                        expect(homeProfile.heatingPage.isSegmentedBtnSelected(ducted, ductedElectricity)).toBe(true);
                        expect(homeProfile.heatingPage.getOtherHeatingRadioButton(otherHeatingGas).isSelected()).toBe(true);
                        expect(homeProfile.heatingPage.isSegmentedBtnSelected(splitSystem, initialSplitSystem)).toBe(true);
                        expect(homeProfile.heatingPage.isSegmentedBtnSelected(portableElectric, initialPortableElectric)).toBe(true);
                    });

                });

            });
        });
    });
});
