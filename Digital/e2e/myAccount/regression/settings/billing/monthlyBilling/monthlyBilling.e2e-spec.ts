import { browser, by, element, $, $$, promise } from 'protractor';
import { Context } from '../../../../../context';
import { Pages } from '../../../../../pages';
import { FeatureFlagTypes } from '../../../../../../src/app/myAccount/services/featureFlag.constants';
import { ProtractorExtensions } from '../../../../../../src/app/shared/e2e/protractor.extensions';
import { OverviewPage } from '../../../../pageObjects/overviewPage';
import { BillingPage } from '../../../../pageObjects/billingPage';
import { settings } from '../../../../pageObjects/settings';
import { MonthlyBillingPage } from '../../../../pageObjects/monthlyBillingPage';
import { User } from '../../../../../enums/enums';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../../models/environments';
import * as waits from '../../../../../utilities/waits';
import { WSAETIMEDOUT } from 'constants';

let e2e = new ProtractorExtensions();

describe('Monthly Billing Regression scenario tests', () => {

    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let currentElectricityContract: FuelEntity;
    let currentGasContract: FuelEntity;
    let context: Context;
    let overview: OverviewPage;
    let billing: BillingPage;
    let monthlybilling: MonthlyBillingPage;

    beforeAll(() => {
        context = new Context(browser.params.environment);
        billing = new BillingPage(context);
        monthlybilling = new MonthlyBillingPage(context);
        context.setWindowSize(e2e.screenSizes.desktop);
    });

    afterAll(() => {
        context.logout();
    });

    describe('as a user with Active Electricity and Gas Account', () => {
        describe('Scenario1 : Navigate and Setup Monthly Billing from Billing Page', () => {
            beforeAll(() => {
                // context = new Context(browser.params.environment);
                user = context.getUser(User.Default);
                currentAccount = user.accounts[0];
                currentElectricityContract = currentAccount.contracts.electricity[0];
                currentGasContract = currentAccount.contracts.gas[0];
                context.authenticateAsUser(user);
                context.setFeatureFlag(FeatureFlagTypes.monthlyBillingEnabled, true);
                billing.navigate();
                waits.waitForElement(billing.billingContainer);
            });
            it('Setup Monthly Billing link should exist in Billing Page', () => {
                expect(billing.getButtonStackLinkText(1)).toContain('Set up Monthly Billing', 'the monthly billing link in the side panel is not found');
            });
            it('navigate to monthly billing Page', () => {
                billing.navigateSetupMonthlyBilling();
                waits.waitForVisibilityOf(monthlybilling.chooseservicecontainer);
                expect(monthlybilling.monthlyBillingHeader.getText()).toContain('Monthly billing', 'the monthly billing Page is not loaded');
            });
            it('should be able to setup the monthly Billing by clicking on Fuel Electricity using index', () => {
                monthlybilling.ClickFuel(0);
                waits.waitForVisibilityOf(monthlybilling.chooseBillIssueDate);
                monthlybilling.termsncondcheckbox.click();
                monthlybilling.switchtomonthlyBillingbutton.click();
                waits.waitForVisibilityOf(monthlybilling.monthlyBillingConfirmationScreen);
                expect(monthlybilling.monthlyBillingElectricitySwitchedOn.getText()).toContain('Your electricity account is now on monthly billing', 'the Setup Monthly Billing is not sucessfull');
            });
            it('should be able to setup the monthly Billing by clicking on Fuel Gas using index', () => {
                monthlybilling.ClickFuel(0);
                waits.waitForVisibilityOf(monthlybilling.chooseBillIssueDate);
                monthlybilling.termsncondcheckbox.click();
                monthlybilling.switchtomonthlyBillingbutton.click();
                expect(monthlybilling.monthlyBillingGasSwitchedOn.getText()).toContain('Your gas account is now on monthly billing', 'the Setup Monthly Billing is not sucessfull');
            });
            it('should display Manage Link in Monthly Billing Section', () => {
                settings.manageAccountHeaderLink.click();
                waits.waitForElement(settings.settingsContainer);
                settings.billing.clickBillingLink();
                waits.waitForElement(settings.billing.billingContainer);
                expect(settings.manageAccountHeaderLink.isDisplayed()).toBe(true);
            });
            afterAll(() => {
                context.logout();
            });
        });

        describe('Scenario2 : Navigate and Setup Monthly Billing from Settings Page', () => {
            beforeAll(() => {
                user = context.getUser(User.Default);
                currentAccount = user.accounts[0];
                currentElectricityContract = currentAccount.contracts.electricity[0];
                currentGasContract = currentAccount.contracts.gas[0];
                context.authenticateAsUser(user);
                context.setFeatureFlag(FeatureFlagTypes.monthlyBillingEnabled, true);
                settings.manageAccountHeaderLink.click();
                waits.waitForElement(settings.settingsContainer);
                settings.billing.clickBillingLink();
                waits.waitForElement(settings.billing.billingContainer);
            });
            it('should display manage account header link', () => {
                expect(settings.manageAccountHeaderLink.isDisplayed()).toBe(true);
            });

            it('should display monthly Billing section on Manage Account Page', () => {
                 expect(settings.billing.monthlyBilling.getText()).toContain('Monthly billing');
            });

            it('should be able to navigate to Monthly Billing Page by Clicking link - Set up', () => {
                settings.billing.setupmonthlyBillinglink.click();
                waits.waitForVisibilityOf(monthlybilling.chooseservicecontainer);
                expect(monthlybilling.monthlyBillingHeader.getText()).toContain('Monthly billing', 'the monthly billing Page is not loaded');
            });

            it('should be able to setup the monthly Billing by clicking on Fuel Electricity using index', () => {
                monthlybilling.ClickFuel(0);
                waits.waitForVisibilityOf(monthlybilling.chooseBillIssueDate);
                monthlybilling.termsncondcheckbox.click();
                monthlybilling.switchtomonthlyBillingbutton.click();
                waits.waitForVisibilityOf(monthlybilling.monthlyBillingConfirmationScreen);
                expect(monthlybilling.monthlyBillingElectricitySwitchedOn.getText()).toContain('Your electricity account is now on monthly billing', 'the Setup Monthly Billing is not sucessfull');
            });
            it('should be able to setup the monthly Billing by clicking on Fuel Gas using index', () => {
                monthlybilling.ClickFuel(0);
                waits.waitForVisibilityOf(monthlybilling.chooseBillIssueDate);
                monthlybilling.termsncondcheckbox.click();
                monthlybilling.switchtomonthlyBillingbutton.click();
                expect(monthlybilling.monthlyBillingGasSwitchedOn.getText()).toContain('Your gas account is now on monthly billing', 'the Setup Monthly Billing is not sucessfull');
            });
            it('should display Manage Link in Monthly Billing Section', () => {
                settings.manageAccountHeaderLink.click();
                waits.waitForElement(settings.settingsContainer);
                settings.billing.clickBillingLink();
                waits.waitForElement(settings.billing.billingContainer);
                expect(settings.manageAccountHeaderLink.isDisplayed()).toBe(true);
            });
        });

        xdescribe('when Monthly Billing feature toggle is off', () => {
            beforeAll(() => {
                user = context.getUser(User.Default);
                currentAccount = user.accounts[0];
                currentElectricityContract = currentAccount.contracts.electricity[0];
                currentGasContract = currentAccount.contracts.gas[0];
                context.authenticateAsUser(user);
                context.setFeatureFlag(FeatureFlagTypes.monthlyBillingEnabled, false);
                overview.navigate();
                billing.navigate();
                waits.waitForElement(billing.billingContainer);
            });
            it('Monthly Billing link should NOT exist', () => {
                expect(billing.getButtonStackLinkText(1)).toContain('Switch to eBilling', 'the first side panel link is expected to be eBilling');
            });
        });
    });
});
