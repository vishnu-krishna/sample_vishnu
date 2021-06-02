import { Account } from './../../models/account';
import { Contract } from './../../models/contract';
import { browser } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { OverviewPage } from '../pageObjects/overviewPage';
import { FeatureFlagTypes } from '../../../src/app/myAccount/services/featureFlag.constants';
import { PaymentPage } from '../pageObjects/paymentPage';
import { User } from '../../enums/enums';
import { OverviewAssertions } from '../pageObjectsAssertions/overviewAssertions';
import { PaymentAssertions } from '../pageObjectsAssertions/paymentAssertions';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import { getEnvironmentApiEndpoints } from '../../utilities/environment';
import { DataService } from '../../services/dataService/dataService';
import * as stringParser from '../../utilities/stringParser';
import * as waits from '../../utilities/waits';
import { SsmrPage } from '../pageObjects/ssmrPage';
import { usage } from '../pageObjects/usage';

import { BillingPage } from '../pageObjects/manageAccount/billingPage';

let e2e = new ProtractorExtensions();

describe('SSMR scenario tests', () => {
    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let elec: Contract;
    let gas: Contract;
    let context: Context;
    let overview: OverviewPage;
    let ssmrPage: SsmrPage;
    let billingPage: BillingPage;
    let overviewHelper: OverviewAssertions;
    let customerAccounts: Account[] = new Array<Account>();

    beforeAll(() => {
        context = new Context(browser.params.environment);
        overview = new OverviewPage(context);
        ssmrPage = new SsmrPage(context);
        billingPage = new BillingPage(context);
        overviewHelper = new OverviewAssertions(overview);
    });

    describe('as a residential customer with a single account, matching addresses, and dual fuel', () => {
        beforeEach(() => {
            user = context.getUser(User.Default);
            context.authenticateAsUser(user);

            getEnvironmentApiEndpoints().then((apiEndpoints) => {
                new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                    customerAccounts = accounts;
                    elec = accounts[0].contracts.find((contract) => contract.fuelType === 'Electricity');
                    gas = accounts[0].contracts.find((contract) => contract.fuelType === 'Gas');
                });
            });
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            it('it should see the customer name and SSMR banner', () => {
                overviewHelper.AssertDashboardFirstnameText(user.firstName);
                overviewHelper.AssertOptionalBannerVisibility(true, false);
            });

            it('it should click the overview SSMR banner CTA button and enter meter read', () => {
                waits.waitToBeClickable(overview.ssmrBannerButton);
                overview.ssmrBannerButton.click();
                waits.waitForSsmrModalToAppear(ssmrPage.ssmrModal);
                waits.waitToBeClickable(ssmrPage.contractGas);
                ssmrPage.contractGas.click();
                waits.waitToBeClickable(ssmrPage.safetyScreenContinueButton);
                ssmrPage.safetyScreenContinueButton.click();
                waits.waitToBeClickable(ssmrPage.multiMeterInfoContinueButton);
                ssmrPage.multiMeterInfoContinueButton.click();
                waits.waitToBeClickable(ssmrPage.multiRegisterContinueButton);
                ssmrPage.multiRegisterContinueButton.click();
                // Meter 1
                waits.waitToBeClickable(ssmrPage.meterEntryInput);
                    // Register 1
                ssmrPage.meterEntryInput.sendKeys('40000');
                ssmrPage.meterEntryContinueButton.click();
                    // Register 2
                ssmrPage.meterEntryInput.sendKeys('40001');
                ssmrPage.meterEntryContinueButton.click();
                // Meter 2
                waits.waitToBeClickable(ssmrPage.meterEntryInput);
                ssmrPage.meterEntryInput.sendKeys('610600');
                ssmrPage.meterEntryContinueButton.click();
                // Meter 3
                ssmrPage.meterEntryInput.sendKeys('2947223');
                ssmrPage.meterEntryContinueButton.click();
                // Meter 4
                    // Register 1
                ssmrPage.meterEntryInput.sendKeys('19471332');
                ssmrPage.meterEntryContinueButton.click();
                    // Register 2
                ssmrPage.meterEntryInput.sendKeys('19471332');
                ssmrPage.meterEntryContinueButton.click();

                waits.waitToBeClickable(ssmrPage.multiMeterSummaryContinueButton);
                ssmrPage.multiMeterSummaryContinueButton.click();

                waits.waitForVisibilityOf(ssmrPage.heading);
                expect(ssmrPage.heading.getText()).toContain('Thanks for your read');
            });

            it('it should click the Manage Account Billing SSMR link and enter meter read', () => {
                billingPage.navigateToManageAccount();
                waits.waitToBeClickable(billingPage.billingLink);
                billingPage.billingLink.click();

                waits.waitToBeClickable(billingPage.DefaultSsmrlink);
                billingPage.DefaultSsmrlink.click();

                waits.waitForSsmrModalToAppear(ssmrPage.ssmrModal);

                waits.waitToBeClickable(ssmrPage.contractGas);
                ssmrPage.contractGas.click();
                waits.waitToBeClickable(ssmrPage.safetyScreenContinueButton);
                ssmrPage.safetyScreenContinueButton.click();
                waits.waitToBeClickable(ssmrPage.multiMeterInfoContinueButton);
                ssmrPage.multiMeterInfoContinueButton.click();
                waits.waitToBeClickable(ssmrPage.multiRegisterContinueButton);
                ssmrPage.multiRegisterContinueButton.click();
                // Meter 1
                waits.waitToBeClickable(ssmrPage.meterEntryInput);
                    // Register 1
                ssmrPage.meterEntryInput.sendKeys('40000');
                ssmrPage.meterEntryContinueButton.click();
                    // Register 2
                ssmrPage.meterEntryInput.sendKeys('40001');
                ssmrPage.meterEntryContinueButton.click();
                // Meter 2
                waits.waitToBeClickable(ssmrPage.meterEntryInput);
                ssmrPage.meterEntryInput.sendKeys('610600');
                ssmrPage.meterEntryContinueButton.click();
                // Meter 3
                ssmrPage.meterEntryInput.sendKeys('2947223');
                ssmrPage.meterEntryContinueButton.click();
                // Meter 4
                    // Register 1
                ssmrPage.meterEntryInput.sendKeys('19471332');
                ssmrPage.meterEntryContinueButton.click();
                    // Register 2
                ssmrPage.meterEntryInput.sendKeys('19471332');
                ssmrPage.meterEntryContinueButton.click();

                waits.waitToBeClickable(ssmrPage.multiMeterSummaryContinueButton);
                ssmrPage.multiMeterSummaryContinueButton.click();

                waits.waitForVisibilityOf(ssmrPage.heading);
                expect(ssmrPage.heading.getText()).toContain('Thanks for your read');
            });
        });
    });

    describe('as a residential customer with dual accounts, matching addresses, and dual fuel', () => {
        beforeEach(() => {
            user = context.getUser(User.DUAL_ACCOUNT_SSMR);
            context.authenticateAsUser(user);

            getEnvironmentApiEndpoints().then((apiEndpoints) => {
                new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                    customerAccounts = accounts;
                    elec = accounts[0].contracts.find((contract) => contract.fuelType === 'Electricity');
                    gas = accounts[0].contracts.find((contract) => contract.fuelType === 'Gas');
                });
            });
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            it('it should click the Manage Account Billing SSMR link and enter meter read', () => {
                billingPage.navigateToManageAccount();
                waits.waitToBeClickable(billingPage.billingLink);
                billingPage.billingLink.click();

                waits.waitToBeClickable(billingPage.dualAccountSsmrlink);
                billingPage.dualAccountSsmrlink.click();

                waits.waitForSsmrModalToAppear(ssmrPage.ssmrModal);

                waits.waitToBeClickable(ssmrPage.contractFirstElec);
                ssmrPage.contractFirstElec.click();
                waits.waitToBeClickable(ssmrPage.safetyScreenContinueButton);
                ssmrPage.safetyScreenContinueButton.click();

                waits.waitToBeClickable(ssmrPage.multiRegisterContinueButton);
                ssmrPage.multiRegisterContinueButton.click();
                // Meter 1
                waits.waitToBeClickable(ssmrPage.meterEntryInput);
                    // Register 1
                ssmrPage.meterEntryInput.sendKeys('01690');
                ssmrPage.meterEntryContinueButton.click();
                    // Register 2
                ssmrPage.meterEntryInput.sendKeys('03642');
                ssmrPage.meterEntryContinueButton.click();
                    // Register 3
                ssmrPage.meterEntryInput.sendKeys('17241');
                ssmrPage.meterEntryContinueButton.click();

                waits.waitToBeClickable(ssmrPage.multiMeterSummaryContinueButton);
                ssmrPage.multiMeterSummaryContinueButton.click();

                waits.waitForVisibilityOf(ssmrPage.heading);
                expect(ssmrPage.heading.getText()).toContain(`Thanks for your read`);
            });
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            it('it should click the Usage SSMR link and enter meter read', () => {
                usage.usageMenuButton.click();
                waits.waitToBeClickable(usage.enterMeterReadButton);
                usage.enterMeterReadButton.click();

                waits.waitForSsmrModalToAppear(ssmrPage.ssmrModal);
                waits.waitToBeClickable(ssmrPage.contractFirstElec);
                ssmrPage.contractFirstElec.click();
                waits.waitToBeClickable(ssmrPage.safetyScreenContinueButton);
                ssmrPage.safetyScreenContinueButton.click();

                waits.waitToBeClickable(ssmrPage.multiRegisterContinueButton);
                ssmrPage.multiRegisterContinueButton.click();
                // Meter 1
                waits.waitToBeClickable(ssmrPage.meterEntryInput);
                    // Register 1
                ssmrPage.meterEntryInput.sendKeys('01690');
                ssmrPage.meterEntryContinueButton.click();
                    // Register 2
                ssmrPage.meterEntryInput.sendKeys('03642');
                ssmrPage.meterEntryContinueButton.click();
                    // Register 3
                ssmrPage.meterEntryInput.sendKeys('17241');
                ssmrPage.meterEntryContinueButton.click();

                waits.waitToBeClickable(ssmrPage.multiMeterSummaryContinueButton);
                ssmrPage.multiMeterSummaryContinueButton.click();

                waits.waitForVisibilityOf(ssmrPage.heading);
                expect(ssmrPage.heading.getText()).toContain(`Thanks for your read`);
            });
        });
    });
});
