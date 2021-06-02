import { browser } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { FeatureFlagTypes } from '../../../src/app/myAccount/services/featureFlag.constants';
import { User } from '../../enums/enums';
import { UsersEntity} from '../../models/environments';
import { settings } from '../pageObjects/settings';
import { ChooseAnAddress } from '../pageObjects/concession/chooseAnAddressPage';
import { ConcessionsAssertions } from '../pageObjectsAssertions/concessionsAssertions';
import { ChooseYourServicePage } from '../pageObjects/concession/chooseYourServicePage';
import { ConfirmYourDetailsPage } from '../pageObjects/concession/confirmYourDetailsPage';
import { SelectConcessionCardPage } from '../pageObjects/concession/selectConcessionCardPage';
import { EnterYourCardNumberPage } from '../pageObjects/concession/enterYourCardNumberPage';
import { MauiNavigationMenu } from '../pageObjects/common/mauiNavigationMenu';

let e2e = new ProtractorExtensions();

describe('Concessions scenario tests', () => {
    let user: UsersEntity;
    let context = new Context(browser.params.environment);
    let chooseAnAddress = new ChooseAnAddress();
    let chooseYourService = new ChooseYourServicePage();
    let confirmYourDetails = new ConfirmYourDetailsPage();
    let selectConcessionCard = new SelectConcessionCardPage();
    let enterYourCardNumber = new EnterYourCardNumberPage();
    let navigationMenu = new MauiNavigationMenu();
    let concessionsAssertions = new ConcessionsAssertions();

    describe('In a desktop viewport - ', () => {
        beforeAll(() => {
            context.setWindowSize(e2e.screenSizes.desktop);
        });

        describe('As a concession eligible vic customer with multiple contract accounts - ', () => {
            beforeAll(() => {
                user = context.getUser(User.CAN_APPLY_FOR_CONCESSION_WITH_MULTI_CONTRACT_ACCOUNTS);
                context.authenticateAsUser(user);
                context.setFeatureFlag(FeatureFlagTypes.applyForConcessionEnabled, true);
            });

            describe('Back button functionality for multiple contract accounts - ', () => {
                it('should display the concessions add link', () => {
                    settings.clickManageAccountsLink();
                    concessionsAssertions.shouldSeeConcessionsAddLink();
                });

                it('should route to choose an address page when the add link is clicked', () => {
                    settings.clickAddConcessionLink();
                    chooseAnAddress.waitForChooseAnAddressPageToLoad();
                });

                it('should display the right url in address bar - choose an address via manage account -> concession', () => {
                    concessionsAssertions.validateURL(context.buildUrl('/settings/concession/selectaccount'));
                });

                it('should display choose your service screen when first address is selected', () => {
                    chooseAnAddress.chooseFirstAddress();
                    chooseYourService.waitForChooseYourServicePageToLoad();
                });

                it('should display confirm your details screen when first service is selected', () => {
                    chooseYourService.chooseYourFirstService();
                    chooseYourService.clickContinue();
                    confirmYourDetails.waitForConfirmYourDetailsPageToLoad();
                });

                it('should display select your concession card screen when details are confirmed', () => {
                    confirmYourDetails.clickContinue();
                    selectConcessionCard.waitForSelectConcessionCardPageToLoad();
                });

                it('should display enter your card number screen when a concession card is selected', () => {
                    selectConcessionCard.selectConcessionCard('CTLK|HEALTHCARE');
                    selectConcessionCard.clickContinue();
                    enterYourCardNumber.waitForEnterYourCardNumberPageToLoad();
                });

                it('should return to select your concession card screen when back button is clicked', () => {
                    navigationMenu.clickBackButton();
                    selectConcessionCard.waitForSelectConcessionCardPageToLoad();
                });

                it('should return to confirm your details screen when back button is clicked', () => {
                    navigationMenu.clickBackButton();
                    confirmYourDetails.waitForConfirmYourDetailsPageToLoad();
                });

                it('should return to choose your service screen when back button is clicked', () => {
                    navigationMenu.clickBackButton();
                    chooseYourService.waitForChooseYourServicePageToLoad();
                });

                it('should return to choose an address screen when back button is clicked', () => {
                    navigationMenu.clickBackButton();
                    chooseAnAddress.waitForChooseAnAddressPageToLoad();
                });

                it('should return to manage account screen when back button is clicked', () => {
                    navigationMenu.clickBackButton();
                    concessionsAssertions.shouldSeeConcessionsAddLink();
                });
            });
        });

        describe('As a concession eligible vic customer with single contract account - ', () => {
            beforeAll(() => {
                user = context.getUser(User.CAN_APPLY_FOR_CONCESSION_WITH_SINGLE_CONTRACT_ACCOUNT);
                context.authenticateAsUser(user);
                context.setFeatureFlag(FeatureFlagTypes.applyForConcessionEnabled, true);
                settings.clickManageAccountsLink();
            });

            describe('Back button functionality for single contract account - ', () => {
                it('should display the concessions add link', () => {
                    concessionsAssertions.shouldSeeConcessionsAddLink();
                });

                it('should display choose your service screen when add link is clicked', () => {
                    settings.clickAddConcessionLink();
                    chooseYourService.waitForChooseYourServicePageToLoad();
                });

                it('should display confirm your details screen when first service is selected', () => {
                    chooseYourService.chooseYourFirstService();
                    chooseYourService.clickContinue();
                    confirmYourDetails.waitForConfirmYourDetailsPageToLoad();
                });

                it('should display select your concession card screen when details are confirmed', () => {
                    confirmYourDetails.clickContinue();
                    selectConcessionCard.waitForSelectConcessionCardPageToLoad();
                });

                it('should display enter your card number screen when a concession card is selected', () => {
                    selectConcessionCard.selectConcessionCard('CTLK|HEALTHCARE');
                    selectConcessionCard.clickContinue();
                    enterYourCardNumber.waitForEnterYourCardNumberPageToLoad();
                });

                it('should return to select your concession card screen when back button is clicked', () => {
                    navigationMenu.clickBackButton();
                    selectConcessionCard.waitForSelectConcessionCardPageToLoad();
                });

                it('should return to confirm your details screen when back button is clicked', () => {
                    navigationMenu.clickBackButton();
                    confirmYourDetails.waitForConfirmYourDetailsPageToLoad();
                });

                it('should return to choose your service screen when back button is clicked', () => {
                    navigationMenu.clickBackButton();
                    chooseYourService.waitForChooseYourServicePageToLoad();
                });

                it('should return to manage account screen when back button is clicked', () => {
                    navigationMenu.clickBackButton();
                    concessionsAssertions.shouldSeeConcessionsAddLink();
                });
            });
        });
   });
});