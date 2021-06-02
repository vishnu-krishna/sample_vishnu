import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile, PageHeader } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';
import { headersToString } from 'selenium-webdriver/http';

let e2e = new ProtractorExtensions();

describe('home profile - "Cooling" Page test', () => {

    let context: Context;
    let homeProfile: HomeProfile;
    const coolingIcon = PageHeader.coolingHeader.toLowerCase();
    const currentPage = '2';
    const splitSystem = 'split-system';
    const ductedAc = 'ducted';
    const ductedEvaporativeCooling = 'evaporative';
    const fans = 'fans';

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
            describe('when navigating to the Cooling Page of Home Profile', () => {
                beforeAll(() => {
                    homeProfile.setFeatureFlag(true).then(() => {
                        homeProfile.navigateToPage(PageHeader.coolingHeader);
                    });
                });

                describe('Verify initial state of the page', () => {
                    it('should have page progress bar showing correct page sequence', () => {
                        expect(homeProfile.questionnairePages.progressBar.isEnabled()).toBe(true);
                        expect(homeProfile.questionnairePages.getCurrentPageFromProgressBar()).toBe(currentPage);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.coolingHeader);
                    });
                });

                describe('Navigate back and forth from Cooling page without filling any details', () => {
                    it('should go to NEXT page without selecting any option', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.heatingHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.coolingHeader);
                    });
                    it('should go to Previous page without selecting any option', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.yourHomeHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.coolingHeader);
                    });
                });

                describe('Filling the form tests', () => {
                    let initialSplitSystemAc = '1';
                    let initialDuctedAc = 'No';
                    let initialEvaporativeCooling = 'Yes';
                    let numberOfFans = '3+';
                    let newSplitSystemAc = '2';
                    let newDuctedAc = 'Yes';

                    beforeAll(() => {
                        homeProfile.coolingPage.getSegmentedBtnByValue(splitSystem, initialSplitSystemAc).click();
                        homeProfile.coolingPage.getSegmentedBtnByValue(ductedAc, initialDuctedAc).click();
                    });

                    it('should retain highlighted fields while returning from Heating Page', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.heatingHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.coolingHeader);
                        expect(homeProfile.coolingPage.isSegmentedBtnSelected(splitSystem, initialSplitSystemAc)).toBe(true);
                        expect(homeProfile.coolingPage.isSegmentedBtnSelected(ductedAc, initialDuctedAc)).toBe(true);
                    });

                    it('should retain highlighted fields while returning to Cooling page after clicking Save and Close button', () => {
                        homeProfile.coolingPage.getSegmentedBtnByValue(splitSystem, newSplitSystemAc).click();
                        homeProfile.coolingPage.getSegmentedBtnByValue(ductedAc, newDuctedAc).click();
                        homeProfile.coolingPage.getSegmentedBtnByValue(ductedEvaporativeCooling, initialEvaporativeCooling).click();
                        homeProfile.coolingPage.getSegmentedBtnByValue(fans, numberOfFans).click();

                        homeProfile.questionnairePages.clickButton(homeProfile.saveAndCloseButton);
                        expect(homeProfile.introPage.headerText()).toEqual(PageHeader.landingPageHeader);
                        homeProfile.introPage.clickQuestionnaireIcon(coolingIcon);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.coolingHeader);
                        expect(homeProfile.coolingPage.isSegmentedBtnSelected(splitSystem, initialSplitSystemAc)).toBe(false);
                        expect(homeProfile.coolingPage.isSegmentedBtnSelected(splitSystem, newSplitSystemAc)).toBe(true);
                        expect(homeProfile.coolingPage.isSegmentedBtnSelected(ductedAc, initialDuctedAc)).toBe(false);
                        expect(homeProfile.coolingPage.isSegmentedBtnSelected(ductedAc, newDuctedAc)).toBe(true);
                        expect(homeProfile.coolingPage.isSegmentedBtnSelected(ductedEvaporativeCooling, initialEvaporativeCooling)).toBe(true);
                        expect(homeProfile.coolingPage.isSegmentedBtnSelected(fans, numberOfFans)).toBe(true);
                    });
                });
            });
        });
    });
});
