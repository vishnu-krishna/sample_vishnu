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
import * as _ from 'lodash';

let e2e = new ProtractorExtensions();

describe('Essential Regression scenario tests', () => {

    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let context: Context;
    let overview: OverviewPage;
    let notifications: NotificationsPage;
    let elec: Contract;
    let gas: Contract;
    let customerAccounts: Account[] = new Array<Account>();
    beforeAll(() => {
        context = new Context(browser.params.environment);
        notifications = new NotificationsPage(context);
        context.setWindowSize(e2e.screenSizes.desktop);
    });

    afterAll(() => {
        context.logout();
    });

    describe('as a user with essential product with mandatory direct debit', () => {
        describe('Scenario1 :Verify the option to cancel direct debit is not present', () => {
            beforeAll(() => {
                user = context.getUser(User.WITH_ESSENTIAL_PRODUCT);
                context.authenticateAsUser(user);
                getEnvironmentApiEndpoints().then((apiEndpoints) => {
                    new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                        customerAccounts = accounts;
                        console.debug(customerAccounts);
                        elec = _.find(accounts[0].contracts, (contract) => contract.fuelType === 'Electricity');
                        gas = _.find(accounts[0].contracts, (contract) => contract.fuelType === 'Gas');
                    });
                });

                context.setFeatureFlag(FeatureFlagTypes.directDebitEnabled, true);
                settings.manageAccountHeaderLink.click();
                waits.waitForVisibilityOf(settings.directDebit.directDebitLink);
                settings.directDebit.clickDirectdDebit();
            });

            it('user should not be able to cancel direct debit on essential product', () => {
                expect(settings.directDebit.cancelDirectDebitLink.isPresent()).toBe(false);
            });

        });
    });
});
