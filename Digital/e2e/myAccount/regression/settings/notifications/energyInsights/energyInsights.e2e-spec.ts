import { browser, by, element, $, $$, promise } from 'protractor';

import { Account } from './../../../../../models/account';
import { Contract } from './../../../../../models/contract';
import { Context } from '../../../../../context';
import { Pages } from '../../../../../pages';
import { FeatureFlagTypes } from '../../../../../../src/app/myAccount/services/featureFlag.constants';
import { ProtractorExtensions } from '../../../../../../src/app/shared/e2e/protractor.extensions';
import { OverviewPage } from '../../../../pageObjects/overviewPage';
import { settings } from '../../../../pageObjects/settings';
import { NotificationsPage } from '../../../../pageObjects/manageAccount/notifications';
import { User } from '../../../../../enums/enums';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../../models/environments';
import { getEnvironmentApiEndpoints } from '../../../../../utilities/environment';
import { DataService } from '../../../../../services/dataService/dataService';
import * as waits from '../../../../../utilities/waits';
import { WSAETIMEDOUT } from 'constants';
import { EnergyInsightsInfoPage } from '../../../../pageObjects/energyInsightsInfoPage';

let e2e = new ProtractorExtensions();

describe('Energy Insights Regression scenario tests', () => {

    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let context: Context;
    let overview: OverviewPage;
    let notifications: NotificationsPage;
    let energyInsightsInfoPage: EnergyInsightsInfoPage;
    let elec: Contract;
    let gas: Contract;
    let customerAccounts: Account[] = new Array<Account>();
    beforeAll(() => {
        context = new Context(browser.params.environment);
        notifications = new NotificationsPage(context);
        energyInsightsInfoPage = new EnergyInsightsInfoPage();
        context.setWindowSize(e2e.screenSizes.desktop);
    });

    afterAll(() => {
        context.logout();
    });

    describe('as a user with Active Smart Electricity and Gas Account', () => {
        describe('Scenario1 : Subscribe EnergyInsights from ManageAccount Page for Single Account', () => {
            beforeAll(() => {
                user = context.getUser(User.WITH_USAGE_DATA);
                context.authenticateAsUser(user);
                getEnvironmentApiEndpoints().then((apiEndpoints) => {
                    new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                        customerAccounts = accounts;
                        elec = accounts[0].contracts.find((contract) => contract.fuelType === 'Electricity');
                        gas = accounts[0].contracts.find((contract) => contract.fuelType === 'Gas');
                    });
                });

                context.setFeatureFlag(FeatureFlagTypes.energyInsightsEnabled, true);
                context.setFeatureFlag(FeatureFlagTypes.manageNotificationsEnabled, true);
                waits.waitToBeClickable(settings.manageAccountHeaderLink);
                settings.manageAccountHeaderLink.click();
                waits.waitForElement(settings.settingsContainer);
                settings.notifications.clickNotificationsLink();
                waits.waitForVisibilityOf(notifications.notificationsContainer);
            });

            it('energy Insights Section should exist in Notifications Page', () => {
                expect(notifications.midBillUpdateClass.isDisplayed()).toBe(true, 'energy Insights Section is not displayed in Notification Page');
            });

            it('Subscribe for midbill update', () => {
                expect(notifications.midBillToggleChecked.isPresent()).toBe(false);
                notifications.clickMidBillToggle();
                waits.waitForVisibilityOf(notifications.midBillToggleChecked);
                expect(notifications.midBillToggleChecked.isPresent()).toBe(true);
            });

            it('Subscribe for energy Insights Report', () => {
                expect(notifications.eIToggleChecked.isPresent()).toBe(false);
                notifications.clickEnergyInsightsToggle();
                waits.waitForVisibilityOf(notifications.eIToggleChecked);
                expect(notifications.eIToggleChecked.isPresent()).toBe(true);
            });

            it('Verify if the midbill update is Subscribed', () => {
                waits.waitForVisibilityOf(notifications.midBillToggleChecked);
                expect(notifications.midBillToggleChecked.isPresent()).toBe(true, 'mid Bill Update is not Subscribed');
            });

            it('Verify if the energy Insights Reports is Subscribed', () => {
                waits.waitForVisibilityOf(notifications.eIToggleChecked);
                expect(notifications.eIToggleChecked.isPresent()).toBe(true, 'energy Insights Report is not Subscribed');
            });
        });

        describe('Scenario2 : Subscribe EnergyInsights from ManageAccount Page for Multiple Account Single Contract', () => {
            beforeAll(() => {
                user = context.getUser(User.MULTI_ACCOUNT_MULTI_CONTRACT);
                context.authenticateAsUser(user);
                getEnvironmentApiEndpoints().then((apiEndpoints) => {
                    new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                        customerAccounts = accounts;
                        elec = accounts[0].contracts.find((contract) => contract.fuelType === 'Electricity');
                        gas = accounts[0].contracts.find((contract) => contract.fuelType === 'Gas');
                    });
                });

                context.setFeatureFlag(FeatureFlagTypes.energyInsightsEnabled, true);
                context.setFeatureFlag(FeatureFlagTypes.manageNotificationsEnabled, true);
                waits.waitToBeClickable(settings.manageAccountHeaderLink);
                settings.manageAccountHeaderLink.click();
                waits.waitForElement(settings.settingsContainer);
                settings.notifications.clickNotificationsLink();
                waits.waitForVisibilityOf(notifications.notificationsContainer);
            });

            it('energy Insights Section should exist in Notifications Page', () => {
                expect(notifications.midBillUpdateClass.isDisplayed()).toBe(true, 'energy Insights Section is not displayed in Notification Page');
            });

            it('ebilling toggle is turned on for multi accounts', () => {
                expect(notifications.ebillContainer.isDisplayed()).toBe(true, 'eBill Container is  not present in notifications Page');
                notifications.clickEbillMauiToggle();
            });

            it('energyInsights midBill and Endbill toggle is turned on for multi accounts', () => {
                notifications.clickEnergyInsightsMauiToggle();
            });

            it('Verify if the midbill update is Subscribed', () => {
                notifications.checkEnergyInsightsMauiToggleStatus();
            });

            it('Verify if the energy Insights Reports is Subscribed', () => {
                notifications.checkEnergyInsightsMauiToggleStatus();
            });
        });

        describe('Multi account, Single eligible contract', () => {
                beforeAll(() => {
                    user = context.getUser(User.MULTI_ACCOUNT_SINGLE_CONTRACT_ELIGIBLE_ENERGY_INSIGHTS);
                    context.authenticateAsUser(user);
                    getEnvironmentApiEndpoints().then((apiEndpoints) => {
                        new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                            customerAccounts = accounts;
                            elec = accounts[0].contracts.find((contract) => contract.fuelType === 'Electricity');
                            gas = accounts[0].contracts.find((contract) => contract.fuelType === 'Gas');
                        });
                    });
                    context.setFeatureFlag(FeatureFlagTypes.energyInsightsEnabled, true);
                    context.setFeatureFlag(FeatureFlagTypes.manageNotificationsEnabled, true);
                    waits.waitToBeClickable(settings.manageAccountHeaderLink);
                    settings.manageAccountHeaderLink.click();
                    waits.waitForElement(settings.settingsContainer);
                    settings.notifications.clickNotificationsLink();
                    waits.waitForVisibilityOf(notifications.notificationsContainer);
                });

                it('should show account numbers', () => {
                    let AccountNumbers = notifications.energyInsightsAccountNumbers;
                    expect(AccountNumbers.get(0).getText()).toContain('Account no:');
                    expect(AccountNumbers.get(1).getText()).toContain('Account no:');
                });
            });

        describe('Multi account, Multiple eligible contract', () => {
            beforeAll(() => {
                user = context.getUser(User.MULTI_ACCOUNT_MULTI_CONTRACT_ELIGIBLE_ENERGY_INSIGHTS);
                context.authenticateAsUser(user);
                getEnvironmentApiEndpoints().then((apiEndpoints) => {
                    new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                        customerAccounts = accounts;
                        elec = accounts[0].contracts.find((contract) => contract.fuelType === 'Electricity');
                        gas = accounts[0].contracts.find((contract) => contract.fuelType === 'Gas');
                    });
                });

                context.setFeatureFlag(FeatureFlagTypes.energyInsightsEnabled, true);
                context.setFeatureFlag(FeatureFlagTypes.manageNotificationsEnabled, true);
                waits.waitToBeClickable(settings.manageAccountHeaderLink);
                settings.manageAccountHeaderLink.click();
                waits.waitForElement(settings.settingsContainer);
                settings.notifications.clickNotificationsLink();
                waits.waitForVisibilityOf(notifications.notificationsContainer);
            });

            it('should show contract numbers', () => {
                let contractNumbers = notifications.energyInsightsContractNumbers;
                expect(contractNumbers.get(0).getText()).toContain('Contract no: ');
                expect(contractNumbers.get(1).getText()).toContain('Contract no: ');
                expect(contractNumbers.get(2).getText()).toContain('Contract no: ');
            });
        });
    });

    describe('Bills Entry point to Energy Insights Usage Breakdown page', () => {
        describe('Single account', () => {
            beforeAll(() => {
                user = context.getUser(User.WITH_USAGE_DATA);
                context.authenticateAsUser(user);
                getEnvironmentApiEndpoints().then((apiEndpoints) => {
                    new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                        customerAccounts = accounts;
                        elec = accounts[0].contracts.find((contract) => contract.fuelType === 'Electricity');
                        gas = accounts[0].contracts.find((contract) => contract.fuelType === 'Gas');
                    });
                });

                context.setFeatureFlag(FeatureFlagTypes.energyInsightsEnabled, true);
                context.setFeatureFlag(FeatureFlagTypes.energyInsightsDisaggregationEnabled, true);
                context.setFeatureFlag(FeatureFlagTypes.manageNotificationsEnabled, true);
                // Navigate to Notifications before Bills to avoid ebill error
                settings.manageAccountHeaderLink.click();
                waits.waitForElement(settings.settingsContainer);
                settings.notifications.clickNotificationsLink();
                waits.waitForVisibilityOf(notifications.notificationsContainer);
                //
                waits.waitForElement(settings.billing.billingHeaderLink);
                settings.billing.billingHeaderLink.click();
                let firstEllipsesButton = settings.billing.ellipsesButtons.get(0);
                waits.waitForElement(firstEllipsesButton);
                firstEllipsesButton.click();
                waits.waitForVisibilityOf(settings.billing.ellipsesButtonContent);
                let viewUsageButton = settings.billing.ellipsesButtonContentRow.get(1);
                waits.waitForElement(viewUsageButton);
                viewUsageButton.click();
            });

            it('should navigate to EnergyInsights Usage Breakdown page and display Main Heading', () => {
                waits.waitForElement(energyInsightsInfoPage.mainHeading);
                expect(energyInsightsInfoPage.mainHeading.getText()).toEqual('Your energy use by appliance');
            });
        });
    });
});
