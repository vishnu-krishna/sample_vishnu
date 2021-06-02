import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { User } from '../../../../enums/enums';
import { HomeProfile, PageHeader } from '../../../pageObjects/homeProfile';
import { settings } from '../../../pageObjects/settings';
import * as waits from '../../../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('home profile - "Pool and spa Page" test', () => {

    let context: Context;
    let homeProfile: HomeProfile;
    const poolSpaIcon = 'poolspa';
    const currentPage = '8';
    const pool = 'pool';
    const spa = 'spa';

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
            describe('when navigating to the pool and spa Page of Home Profile', () => {

                beforeAll(() => {
                    homeProfile.setFeatureFlag(true).then(() => {
                        homeProfile.navigateToPage(PageHeader.poolAndSpaHeader);
                    });
                });

                describe('Navigate back and forth from pool and spa page without filling any details', () => {
                    it('should go to Previous page without selecting any option', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.otherElectricalItemsHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.poolAndSpaHeader);
                    });
                });

                describe('Verify initial state of the page', () => {
                    it('should have page progress bar showing correct page sequence', () => {
                        expect(homeProfile.questionnairePages.progressBar.isEnabled()).toBe(true);
                        expect(homeProfile.questionnairePages.getCurrentPageFromProgressBar()).toBe(currentPage);
                    });
                });

                describe('Filling the form tests', () => {
                    const initialYouHavePool = 'No';
                    const initialYouHaveSpa = 'No';
                    const newPoolSelection = 'Yes';
                    const poolSize = 'size';
                    const size = 'Small';
                    const poolHeaterType = 'heatertype';
                    const heaterType = 'Gas';
                    const poolAge = 'age';
                    const age = 'UpTo5Yrs';
                    const newSpaSelection = 'Yes';
                    beforeAll(() => {
                        homeProfile.poolAndSpaPage.getPoolAndSpaSegmentedBtnByValue(pool, initialYouHavePool).click();
                        homeProfile.poolAndSpaPage.getPoolAndSpaSegmentedBtnByValue(spa, initialYouHaveSpa).click();
                    });

                    it('should retain highlighted fields while returning from Other Electrical Items Page', () => {
                        homeProfile.questionnairePages.clickButton(homeProfile.backButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.otherElectricalItemsHeader);
                        homeProfile.questionnairePages.clickButton(homeProfile.nextButton);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.poolAndSpaHeader);
                        expect(homeProfile.poolAndSpaPage.isPoolAndSpaSegmentedBtnSelected(pool, initialYouHavePool)).toBe(true);
                        expect(homeProfile.poolAndSpaPage.isPoolAndSpaSegmentedBtnSelected(spa, initialYouHaveSpa)).toBe(true);
                    });

                    it('should retain highlighted fields while returning to pool and spa page after clicking Save and close button', () => {
                        homeProfile.poolAndSpaPage.getPoolAndSpaSegmentedBtnByValue(pool, newPoolSelection).click();
                        homeProfile.poolAndSpaPage.getPoolSizeHeaterTypePoolAgeRadioButton(poolSize, size).click();
                        homeProfile.poolAndSpaPage.getPoolSizeHeaterTypePoolAgeRadioButton(poolHeaterType, heaterType).click();
                        homeProfile.poolAndSpaPage.getPoolSizeHeaterTypePoolAgeRadioButton(poolAge, age).click();
                        homeProfile.poolAndSpaPage.getPoolAndSpaSegmentedBtnByValue(spa, newSpaSelection).click();
                        homeProfile.questionnairePages.clickButton(homeProfile.saveAndCloseButton);
                        expect(homeProfile.introPage.headerText()).toEqual(PageHeader.landingPageHeader);
                        homeProfile.introPage.clickQuestionnaireIcon(poolSpaIcon);
                        expect(homeProfile.questionnairePages.getMainHeaderText()).toBe(PageHeader.poolAndSpaHeader);
                        expect(homeProfile.poolAndSpaPage.isPoolAndSpaSegmentedBtnSelected(pool, initialYouHavePool)).toBe(false);
                        expect(homeProfile.poolAndSpaPage.isPoolAndSpaSegmentedBtnSelected(pool, newPoolSelection)).toBe(true);
                        expect(homeProfile.poolAndSpaPage.getPoolSizeHeaterTypePoolAgeRadioButton(poolSize, size).isSelected()).toBe(true);
                        expect(homeProfile.poolAndSpaPage.getPoolSizeHeaterTypePoolAgeRadioButton(poolHeaterType, heaterType).isSelected()).toBe(true);
                        expect(homeProfile.poolAndSpaPage.getPoolSizeHeaterTypePoolAgeRadioButton(poolAge, age).isSelected()).toBe(true);
                    });

                });

            });
        });
    });
});
