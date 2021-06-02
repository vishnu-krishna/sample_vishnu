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
import { getEnvironmentApiEndpoints } from '../../../../../utilities/environment';
import { DataService } from '../../../../../services/dataService/dataService';
import { Account } from './../../../../../models/account';
import { Contract } from './../../../../../models/contract';
import * as _ from 'lodash';

let e2e = new ProtractorExtensions();

describe('Mandatory Monthly Billing Regression scenario tests', () => {

    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let currentElectricityContract: FuelEntity;
    let currentGasContract: FuelEntity;
    let context: Context;
    let overview: OverviewPage;
    let billing: BillingPage;
    let monthlybilling: MonthlyBillingPage;
    let customerAccounts: Account[] = new Array<Account>();
    let elec: Contract;
    let gas: Contract;

    beforeAll(() => {
        context = new Context(browser.params.environment);
        billing = new BillingPage(context);
        monthlybilling = new MonthlyBillingPage(context);
        context.setWindowSize(e2e.screenSizes.desktop);

    });

    afterAll(() => {
        context.logout();
    });

    describe('as an essential user with Active Electricity Account', () => {
        describe('Scenario1 :Verify monthly billing is mandatory for essential ', () => {
            beforeAll(() => {
                user = context.getUser(User.WITH_ESSENTIAL_PRODUCT);
                context.authenticateAsUser(user);
                getEnvironmentApiEndpoints().then((apiEndpoints) => {
                    new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                        customerAccounts = accounts;
                        console.debug(customerAccounts);
                        elec = _.find(accounts[0].contracts, (contract) => contract.fuelType === 'Electricity');
                    });
                });

                context.setFeatureFlag(FeatureFlagTypes.monthlyBillingEnabled, true);
            });

            it('should not see cancel monthly billing link', () => {
                settings.manageAccountHeaderLink.click();
                waits.waitForElement(settings.settingsContainer);
                settings.billing.clickBillingLink();
                waits.waitForElement(settings.billing.billingContainer);
                settings.billing.clickManageMonthlyBillingLink();
                waits.waitForElement(settings.billing.mandatoryMonthlyBillingMsg);
                expect(settings.billing.mandatoryMonthlyBillingMsg.getText()).toContain('required');
            });
        });

    });
});
