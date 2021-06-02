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

    describe('as a user with essential product with mandatory billing', () => {
        describe('Scenario1 :Verify the option to change ebilling is not present', () => {
            beforeAll(() => {
                user = context.getUser(User.WITH_ESSENTIAL_PRODUCT);
                context.authenticateAsUser(user);
                getEnvironmentApiEndpoints().then((apiEndpoints) => {
                    new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                        customerAccounts = accounts;
                        elec = _.find(accounts[0].contracts, (contract) => contract.fuelType === 'Electricity');
                        gas = _.find(accounts[0].contracts, (contract) => contract.fuelType === 'Gas');
                    });
                });

                context.setFeatureFlag(FeatureFlagTypes.ebillEnabled, true);
                context.setFeatureFlag(FeatureFlagTypes.manageNotificationsEnabled, true);
                settings.manageAccountHeaderLink.click();
                waits.waitForElement(settings.settingsContainer);
                settings.notifications.clickNotificationsLink();
                waits.waitForVisibilityOf(notifications.notificationsContainer); 
            });

            it('user should not be able to update eblling method on essential product', () => {
                expect(notifications.ebillingToggle.isPresent()).toBe(false);
            });

        });
    });
});
