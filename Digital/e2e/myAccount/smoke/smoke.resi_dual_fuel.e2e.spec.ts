import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { OverviewPage } from '../pageObjects/overviewPage';
import { OverviewTestHelper } from '../pageObjectsTestHelper/overviewTestHelper';
import { PaymentTestHelper } from '../pageObjectsTestHelper/paymentTestHelper';
import { BillingPage } from '../pageObjects/billingPage';
import { BillingTestHelper } from '../pageObjectsTestHelper/billingTestHelper';
import { PaymentPage } from '../pageObjects/paymentPage';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import { User } from '../../enums/enums';
import * as waits from '../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('smoke test', () => {

    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let currentElectricityContract: FuelEntity;
    let currentGasContract: FuelEntity;
    let context: Context;
    let overview: OverviewPage;
    let overviewTestHelper: OverviewTestHelper;
    let billing: BillingPage;
    let billingTestHelper: BillingTestHelper;

    beforeAll(() => {
        context = new Context(browser.params.environment);
        overview = new OverviewPage(context);
        overviewTestHelper = new OverviewTestHelper(overview);
        billing = new BillingPage(context);
        billingTestHelper = new BillingTestHelper(billing);
    });

    describe('with a single account, dual fuel user', () => {

        beforeAll(() => {
            user = context.getUser(User.Default);
            currentAccount = user.accounts[0];
            currentElectricityContract = currentAccount.contracts.electricity[0];
            currentGasContract = currentAccount.contracts.gas[0];
            context.authenticateAsUser(user);
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            describe('in the overview screen', () => {
                beforeAll(() => {
                    overview.navigate();
                });

                it('should show the correct user name', () => {
                    overviewTestHelper.AssertDashboardFirstnameText(user.firstName);
                });

                it('should check the side panel links are displayed', () => {
                    overviewTestHelper.AssertDashboardSidePanelLinks();
                });

                it('should click the payment button and display the payment modal', () => {
                    let paymentPage = new PaymentPage();
                    overview.makeAPaymentForContract(currentElectricityContract.number);
                    let paymentTestHelper = new PaymentTestHelper(paymentPage);
                    paymentTestHelper.AssertInitialPaymentModalVisibility();
                    paymentPage.closeModal();
                });
            });

            describe('in the billing screen', () => {
                beforeAll(() => {
                    billing.navigate();
                    waits.waitForElement(billing.billingContainer);
                });

                it('should show the account header with mailing address', () => {
                    billingTestHelper.AssertUserAccountCount(1);
                    billingTestHelper.AssertBillingAccountHeader(0, currentAccount.numberFormatted, currentAccount.addressFormatted);
                });

                it('should show electricity section', () => {
                    billingTestHelper.AssertFuelContractHeader(currentElectricityContract.number, 'Electricity');
                });

                it('should show gas section', () => {
                    billingTestHelper.AssertFuelContractHeader(currentGasContract.number, 'Gas');
                });

                it('should show online services section', () => {
                    billingTestHelper.AssertBillingSidePanelLinks(3, true);
                });
            });
        });
    });
});
