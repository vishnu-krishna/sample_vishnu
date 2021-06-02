import { browser, by, element, $, $$, promise } from 'protractor';
import { Context } from '../../../../context';
import { Pages } from '../../../../pages';
import { Account } from './../../../../models/account';
import { FeatureFlagTypes } from '../../../../../src/app/myAccount/services/featureFlag.constants';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Contract } from './../../../../models/contract';
import { OverviewPage } from '../../../pageObjects/overviewPage';
import { BillingPage } from '../../../pageObjects/billingPage';
import { settings } from '../../../pageObjects/settings';
import { MyWalletPage } from '../../../pageObjects/manageAccount/myWalletPage';
import { User } from '../../../../enums/enums';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { getEnvironmentApiEndpoints } from '../../../../utilities/environment';
import { DataService } from '../../../../services/dataService/dataService';
import * as waits from '../../../../utilities/waits';
import { WSAETIMEDOUT } from 'constants';
import { find } from 'lodash';

let e2e = new ProtractorExtensions();

describe('My Wallet Regression scenario tests', () => {

    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let currentElectricityContract: FuelEntity;
    let currentGasContract: FuelEntity;
    let context: Context;
    let overview: OverviewPage;
    let billing: BillingPage;
    let myWallet: MyWalletPage;
    let elec: Contract;
    let gas: Contract;
    let customerAccounts: Account[] = new Array<Account>();

    beforeAll(() => {
        context = new Context(browser.params.environment);
        billing = new BillingPage(context);
        myWallet = new MyWalletPage(context);
        context.setWindowSize(e2e.screenSizes.desktop);
    });

    afterAll(() => {
        context.logout();
    });

    describe('as a user with Active Electricity and Gas Account', () => {
        describe('Scenario1 : Navigate and Add a Payment Method (Credit Card)', () => {
            beforeAll(() => {
                user = context.getUser(User.Default);
                context.authenticateAsUser(user);
                getEnvironmentApiEndpoints().then((apiEndpoints) => {
                    new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                        customerAccounts = accounts;
                        elec = find(accounts[0].contracts, (contract) => contract.fuelType === 'Electricity');
                        gas = find(accounts[0].contracts, (contract) => contract.fuelType === 'Gas');
                    });
                });
                settings.manageAccountHeaderLink.click();
                waits.waitForElement(settings.settingsContainer);
                settings.myWalletLink.click();
                waits.waitForElement(myWallet.myWalletContainer);
            });
            it('Add a Payment Method Button is displayed in MyWallet Page', () => {
                expect(myWallet.AddaPaymentMethodDisplayed()).toBe(true);
            });

            it('Click on Add a Payment Method', () => {
                myWallet.clickAddaPaymentMethod();
            });

            it('Add CreditCard Details', () => {
                myWallet.clickAddCardButton();
                expect(myWallet.creditcardform.isDisplayed()).toBe(true, 'Credit Card Form is not displayed');
                myWallet.creditcardname.sendKeys('testcard');
                browser.driver.switchTo().frame(0);
                waits.waitForVisibilityOf(myWallet.creditcardnumber);
                myWallet.creditcardnumber.sendKeys('4111 1111 1111 1111');
                browser.switchTo().defaultContent();
                browser.waitForAngular();
                myWallet.setupcreditcardexpirymonth('05');
                myWallet.setupcreditcardexpiryyear('2021');
                waits.waitToBeClickable(myWallet.ccformsavebutton);
                myWallet.ccformsavebutton.click();
            });

            it('Validate if the Credit Card added successfull', () => {
                waits.waitForInvisibilityOf(myWallet.ccformsavebutton);
                expect(myWallet.cccardtitle.getText()).toContain('Visa', 'Adding Payment Method Credit Card Failed');
                waits.waitForElement(myWallet.myWalletContainer);
                expect(myWallet.ccexpiry.getText()).toContain('05/21', 'Adding Payment Method Credit Card Failed');
            });
        });
    });
});
