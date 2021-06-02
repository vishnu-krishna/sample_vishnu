import { browser } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { FeatureFlagTypes } from '../../../src/app/myAccount/services/featureFlag.constants';
import { BillingPage } from '../pageObjects/billingPage';
import { User } from '../../enums/enums';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import { BillingAssertions } from '../pageObjectsAssertions/billingAssertions';
import { PaymentAssertions } from '../pageObjectsAssertions/paymentAssertions';
import { PaymentPage } from '../pageObjects/paymentPage';
import { MobileNavigationHelpers } from '../pageObjects/mobileNavigationHelpers';

let e2e = new ProtractorExtensions();

describe('billing scenario tests', () => {
    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let elec: FuelEntity;
    let gas: FuelEntity;
    let context: Context = new Context(browser.params.environment);
    let billing: BillingPage = new BillingPage(context);
    let billingHelper: BillingAssertions = new BillingAssertions(billing);
    let paymentPage = new PaymentPage();
    let paymentAssertions: PaymentAssertions = new PaymentAssertions(paymentPage);
    
    describe('as a residential customer with a single account, dual fuel, and bills issued', () => {
        beforeAll(() => {
            user = context.getUser(User.RESI_DUAL_FUEL_BILL_ISSUED);
            currentAccount = user.accounts[0];
            elec = currentAccount.contracts.electricity[0];
            gas = currentAccount.contracts.gas[0];
            context.authenticateAsUser(user);
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
                context.setFeatureFlag(FeatureFlagTypes.bankAccountPaymentEnabled, true);
                billing.navigate();
            });

            it ('it should see a single account header and two billing contract panels', () => {
                billingHelper.AssertUserAccountCount(1);
                billingHelper.AssertBillingAccountHeader(0, currentAccount.numberFormatted, currentAccount.addressFormatted);
                billingHelper.AssertFuelContractCount(2);
            });

            it ('it should show the electricity bills panel', () => {
                billingHelper.AssertFuelContractHeader(elec.number, elec.fuelType);
                billingHelper.AssertPaymentAmountSectionVisibility(elec.number, true);
                billingHelper.AssertPaymentDueDateDetailsSectionVisibility(elec.number, true);
                // bill history
                billingHelper.AssertBillHistoryItemCount(elec.number, 3);
                billingHelper.AssertBillHistorySectionVisibility(elec.number, 0, true);
            });

            it ('it should show the gas bills panel', () => {
                billingHelper.AssertFuelContractHeader(gas.number, gas.fuelType);
                billingHelper.AssertPaymentAmountSectionVisibility(gas.number, true);
                billingHelper.AssertPaymentDueDateDetailsSectionVisibility(gas.number, true);
                // bill history
                billingHelper.AssertBillHistoryItemCount(gas.number, 3);
                billingHelper.AssertBillHistorySectionVisibility(gas.number, 0, true);
            });

            it ('it should see the side links and marketing tile', () => {
                billingHelper.AssertBillingSidePanelLinks(5, true);
            });

            it ('it should initiate the payment flow when clicked on make a payment button', () => {
                billing.clickMakeAPaymentForContract(elec.number);
                paymentAssertions.AssertPaymentModalHeader();
                paymentPage.closeModal();
            }); 
        });
    });

    describe('as a residential customer with a single account, dual fuel, and bills issued', () => {
        beforeAll(() => {
            user = context.getUser(User.RESI_DUAL_FUEL_BILL_ISSUED);
            currentAccount = user.accounts[0];
            elec = currentAccount.contracts.electricity[0];
            gas = currentAccount.contracts.gas[0];
            context.authenticateAsUser(user);
        });

        describe('in a mobile viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.mobile);
                context.setFeatureFlag(FeatureFlagTypes.bankAccountPaymentEnabled, true);
                let mobileNavigationHelpers = new MobileNavigationHelpers();
                mobileNavigationHelpers.openBillingScreen();
            });

            it ('it should initiate the payment flow when clicked on make a payment button', () => {
                billing.clickMakeAPaymentForContract(elec.number);
                paymentAssertions.AssertPaymentModalHeader();
                paymentPage.closeModal();
            }); 
        });
    });
    
    describe('as a residential customer with a single fuel and no first-month bill issued', () => {
        beforeAll(() => {
            user = context.getUser(User.NO_FIRST_BILL_USER);
            currentAccount = user.accounts[0];
            elec = currentAccount.contracts.electricity[0];
            context.authenticateAsUser(user);
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
                billing = new BillingPage(context);
                billing.navigate();
                billingHelper = new BillingAssertions(billing);
            });
            
            it('it should only see a single account header and address, and single elec contract', () => {
                let accountCount = (user.accounts as any[]).length;
                billingHelper.AssertUserAccountCount(accountCount);
                billingHelper.AssertBillingAccountHeader(0, currentAccount.numberFormatted, currentAccount.addressFormatted);
                billingHelper.AssertFuelContractCount(1);
            });

            it ('it should only show the electricity bills panel without outstanding payment', () => {
                billingHelper.AssertFuelContractHeader(elec.number, elec.fuelType);
                billingHelper.AssertPaymentAmountSectionVisibility(elec.number, true);
                billingHelper.AssertPaymentDueDateDetailsSectionVisibility(elec.number, false);
                billingHelper.AssertBillMessagingSection(elec.number, 'Your account is looking good', 'your account will be in credit for your next bill.');
                // bill history
                billingHelper.AssertBillHistorySectionVisibility(elec.number, 0, false);
            });

            it ('it should see the side links and marketing tile', () => {
                billingHelper.AssertBillingSidePanelLinks(4, false);
            });

        });
    });
});
