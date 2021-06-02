import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import { Context } from '../../context';
import { usage } from '../pageObjects/usage';
import { User } from '../../enums/enums';
import * as waits from '../../utilities/waits';
import { getEnvironmentApiEndpoints } from '../../utilities/environment';
import { DataService } from '../../services/dataService/dataService';
import { Account } from '../../models/account';
import { Contract } from '../../models/contract';
import * as stringParser from '../../utilities/stringParser';

let e2e = new ProtractorExtensions();

describe('smoke test', () => {

    let user: UsersEntity;
    let customerAccounts: Account[] = new Array<Account>();
    let context: Context;

    beforeAll(() => {
        context = new Context(browser.params.environment);
    });

    afterAll(() => {
        context.logout();
    });

    describe('with a typical user', () => {

        beforeAll(() => {
            user = context.getUser(User.WITH_USAGE_DATA);
            context.authenticateAsUser(user);

            getEnvironmentApiEndpoints().then((apiEndpoints) => {
                new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                    customerAccounts = accounts;
                });
            });
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            describe('should navigate to the usage page for electricity', () => {
                beforeAll(() => {
                    usage.usageMenuButton.click();
                    waits.waitForElement(usage.usageContainer);
                });

                it('should show the account selector', () => {
                    stringParser.formatAddress(customerAccounts[0].contracts[0].address).then((formattedAddress) => {
                        expect(usage.accountSelectorAddr.getText()).toContain(formattedAddress);
                    });
                });

                it('check address in the account selector drop-down', () => {
                    usage.accountSelector.click();
                    stringParser.formatAddress(customerAccounts[0].contracts[0].address).then((formattedAddress) => {
                        expect(usage.selectorDrpdwnAddr.getText()).toContain(formattedAddress);
                    });
                });

                it('check Electricity fuel selector', () => {
                    expect(usage.elecFuelSelector.getText()).toContain('ELECTRICITY');
                });

                it('check Electricity Usage text on the graph', () => {
                    expect(usage.elecGraphText.getText()).toContain('Electricity usage');
                });

                it('check Electricity Usage graph', () => {
                    waits.waitForVisibilityOf(usage.usageGraph);
                    expect(usage.usageGraph.isDisplayed()).toBeTruthy();
                });

                it('check Electricity Usage graph widget', () => {
                    waits.waitForVisibilityOf(usage.graphWidget);
                    expect(usage.graphWidget.isDisplayed()).toBeTruthy();
                });

                it('check view daily usage button', () => {
                    expect(usage.viewDailyUsageButton.isDisplayed()).toBeTruthy();
                });

                it('check view daily usage button text', () => {
                    expect(usage.viewDailyButtonText.getText()).toContain('VIEW DAILY USAGE');
                });

                it('check usage insight widget', () => {
                    expect(usage.mainInsightWidget.isDisplayed()).toBeTruthy();
                });

                // // Seperating this would be a good idea in the framework so that we can use it for single fuels
                it('check Gas fuel selector', () => {
                    expect(usage.gasFuelSelector.getText()).toContain('GAS');
                });

                it('click Gas fuel selector', () => {
                    usage.gasFuelSelector.click();
                });

                it('check Gas Usage text on the graph', () => {
                    expect(usage.gasGraphText.getText()).toContain('Gas usage');
                });

                it('check Gas Usage graph', () => {
                    expect(usage.usageGraph.isDisplayed()).toBeTruthy();
                });

                it('check Gas Usage graph widget', () => {
                    expect(usage.graphWidget.isDisplayed()).toBeTruthy();
                });

                it('check usage insight widget', () => {
                    expect(usage.mainInsightWidget.isDisplayed()).toBeTruthy();
                });

                it('check Meter info widget', () => {
                    expect(usage.meterInfoWidget.isDisplayed()).toBeTruthy();
                });

                it('check Meter info header text', () => {
                    expect(usage.meterInfoHeaderText.getText()).toContain('Meter information');
                });

                it('check Enter Meter Read button', () => {
                    expect(usage.enterMeterReadButton.isDisplayed()).toBeTruthy();
                });

                it('check Enter Meter Read text', () => {
                    expect(usage.meterReadButtonText.getText()).toContain('ENTER YOUR METER READ');
                });

                it('check How to read your meter link', () => {
                    expect(usage.howToReadMeterLink.getText()).toContain('How to read your meter');
                });
            });
        });
    });
});
