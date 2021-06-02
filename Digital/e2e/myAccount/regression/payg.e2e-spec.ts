import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { BillingPage } from '../pageObjects/billingPage';
import { OverviewPage } from '../pageObjects/overviewPage';
import { browser, $$ } from 'protractor';
import * as moment from 'moment';
import { User } from '../../enums/enums';
import { FuelEntity, AccountsEntity, UsersEntity } from '../../models/environments';
import { OverviewAssertions } from '../pageObjectsAssertions/overviewAssertions';
import { BillingAssertions } from '../pageObjectsAssertions/billingAssertions';
import * as waits from '../../utilities/waits';

let paygHighCreditMsg = 'Your account is looking good.';
let paygLowCreditMsg = `You're running out of credit.`;
let paygDebitBalanceMsg = `You've run out of credit.`;
let paygSubTextMsg = `Receive bonuses by topping up your account and keeping it in credit.`;
let paygTopUpButton = `TOP UP`;

// UI color treatment for prepaid balances
let debitColor = 'rgba(253, 51, 76, 1)';
let lowCreditColor = 'rgba(246, 166, 35, 1)';
let highCreditColor = 'rgba(44, 170, 24, 1)';

let e2e = new ProtractorExtensions();

describe('payg overview regression scenario tests', () => {
    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let paygContract: FuelEntity;
    let context: Context;
    let billing: BillingPage;
    let overview: OverviewPage;
    let overviewHelper: OverviewAssertions;
    let billingTestHelper: BillingAssertions;

    beforeAll(() => {
        context = new Context(browser.params.environment);
        overview = new OverviewPage(context);
        overviewHelper = new OverviewAssertions(overview);
        billing = new BillingPage(context);
        billingTestHelper = new BillingAssertions(billing);
    });

    afterAll(() => {
        context.logout();
    });

    describe('as a payg customer with a high credit balance - in a desktop view port', () => {
        beforeAll(() => {
            user = context.getUser(User.PAYG);
            currentAccount = user.accounts[0];
            paygContract = currentAccount.contracts.electricity[0];
            context.authenticateAsUser(user);
            context.setWindowSize(e2e.screenSizes.desktop);
        });

        it('it should see the static dashboard elements for a residential customer', () => {
            overviewHelper.AssertDashboardFirstnameText(user.firstName);
            overviewHelper.AssertOptionalBannerVisibility(true, false);
            overviewHelper.AssertDashboardSidePanelLinks();
        });

        it('it should correctly see the payg account number and address in overview', () => {
            overviewHelper.AssertAccountHeader(0, currentAccount.numberFormatted, currentAccount.addressFormatted);
        });

        it('it should correctly see the prepaid balance in high credit and contextual message', () => {
            waits.waitForVisibilityOf(overview.buttonStackLinks.first());
            AssertOverviewPagePaygElements(overviewHelper, paygContract, paygHighCreditMsg, true, highCreditColor);
        });

        it('it should not see the estimated reads tooltip', () => {
            overviewHelper.AssertEstimatedReadsTooltipVisibility(paygContract.number, false);
        });

        it('it should navigate to the billing page and see standard MyAccount elements', () => {
            billing.navigate();

            billingTestHelper.AssertBillingAccountHeader(0, currentAccount.numberFormatted, currentAccount.addressFormatted);
            billingTestHelper.AssertFuelContractHeader(paygContract.number, paygContract.fuelType);
            billingTestHelper.AssertBillHistorySectionVisibility(paygContract.number, 0, true);
            billingTestHelper.AssertBillHistoryItemCount(paygContract.number, 3);
        });

        it('it should see the high credit prepaid balance and contextual message in the billing page', () => {
            waits.waitForVisibilityOf($$('a[href="/settings/billing"]').last());
            AssertBillingPagePaygElements(billingTestHelper, paygContract, paygHighCreditMsg, true, highCreditColor);
        });

        it('it should stay on billing page and display the sub-messages in the billing panel', () => {
            let paygBillingTestHelper = billingTestHelper.PaygAssertions(paygContract.number);
            paygBillingTestHelper.AssertPaygBillPanelSubMessages(paygSubTextMsg, true);
        });
    });

    describe('as a payg customer with a low credit balance', () => {
        beforeAll(() => {
            user = context.getUser(User.PAYG);
            currentAccount = user.accounts[1];
            paygContract = currentAccount.contracts.electricity[0];
            context.authenticateAsUser(user);
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
                overview.navigate();
            });
        });

        it('it should correctly see the prepaid balance in credit and contextual message', () => {
            waits.waitForVisibilityOf(overview.buttonStackLinks.first());
            AssertOverviewPagePaygElements(overviewHelper, paygContract, paygLowCreditMsg, true, lowCreditColor);
        });

        it('it should see the estimated reads tooltip', () => {
            overviewHelper.AssertEstimatedReadsTooltipVisibility(paygContract.number, true);
        });

        it('it should navigate to the billing page and see the account header and sidelinks', () => {
            billing.navigate();
            billingTestHelper.AssertBillingAccountHeader(1, currentAccount.numberFormatted, currentAccount.addressFormatted);
        });

        it('it should see the low payg balance and get a warning that their credit is running low', () => {
            waits.waitForVisibilityOf($$('a[href="/settings/billing"]').last());
            AssertBillingPagePaygElements(billingTestHelper, paygContract, paygLowCreditMsg, true, lowCreditColor);
        });

        it('it should stay on billing page and display the sub-messages in the billing panel', () => {
            let paygBillingTestHelper = billingTestHelper.PaygAssertions(paygContract.number);
            paygBillingTestHelper.AssertPaygBillPanelSubMessages(paygSubTextMsg, true);
        });
    });

    describe('as a payg customer with a debit prepaid balance and no outstanding bill', () => {
        beforeAll(() => {
            user = context.getUser(User.PAYG);
            currentAccount = user.accounts[2];
            paygContract = currentAccount.contracts.electricity[0];
            context.authenticateAsUser(user);
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
                overview.navigate();
            });
        });

        it('it should correctly see the debit prepaid balance and out of credit message in overview', () => {
            waits.waitForVisibilityOf(overview.buttonStackLinks.first());
            AssertOverviewPagePaygElements(overviewHelper, paygContract, paygDebitBalanceMsg, true, debitColor, true);
        });

        it('it should navigate to the billing page and see standard MyAccount elements', () => {
            billing.navigate();
            billingTestHelper.AssertBillingAccountHeader(2, currentAccount.numberFormatted, currentAccount.addressFormatted);
        });

        it('it should see the debit prepaid balance and out of credit message', () => {
            waits.waitForVisibilityOf($$('a[href="/settings/billing"]').last());
            AssertBillingPagePaygElements(billingTestHelper, paygContract, paygDebitBalanceMsg, true, debitColor, true);
        });

        it('it should stay on billing page and display the sub-messages in the billing panel', () => {
            let paygBillingTestHelper = billingTestHelper.PaygAssertions(paygContract.number);
            paygBillingTestHelper.AssertPaygBillPanelSubMessages(paygSubTextMsg, true);
        });
    });

    describe('as a payg customer with a debit prepaid balance with an overdue bill', () => {
        beforeAll(() => {
            user = context.getUser(User.PAYG);
            currentAccount = user.accounts[3];
            paygContract = currentAccount.contracts.electricity[0];
            context.authenticateAsUser(user);
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
                overview.navigate();
            });
        });

        it('it should correctly see the debit prepaid balance and overdue bill details', () => {
            waits.waitForVisibilityOf(overview.buttonStackLinks.first());
            let paygOverviewHelper = overviewHelper.PaygAssertions(paygContract.number);
            paygOverviewHelper.AssertPrepaidBalanceAmount(paygContract.number, paygContract.prepaidBalanceFormatted, debitColor, true);
            paygOverviewHelper.AssertPaygPrepaidBalanceContextualMsg(paygContract.number, false, '');

            // bill section
            let billDueDate = new Date(paygContract.outstandingBill.duedate);
            let overdueMessage = `overdue by ${daysAway(moment(billDueDate))}`;
            let dueDate = `Due - ${moment(billDueDate).format('ddd D MMM YYYY')}`;

            paygOverviewHelper.AssertPaygBillIssuedSection(paygContract.number, paygContract.outstandingBill.amount, overdueMessage, dueDate);
            overviewHelper.AssertOverviewBillPanelPaymentButton(paygContract.number, true, paygTopUpButton);
        });

        it('it should navigate to the billing page and see standard MyAccount elements', () => {
            billing.navigate();
            billingTestHelper.AssertBillingAccountHeader(3, currentAccount.numberFormatted, currentAccount.addressFormatted);
        });

        it('it should see the debit prepaid balance in debit', () => {
            waits.waitForVisibilityOf($$('a[href="/settings/billing"]').last());
            let paygBillingTestHelper = billingTestHelper.PaygAssertions(paygContract.number);
            paygBillingTestHelper.AssertPrepaidBalanceHeadingIsVisible(paygContract.number);
            paygBillingTestHelper.AssertPrepaidBalanceAmount(paygContract.number, paygContract.prepaidBalanceFormatted, debitColor, true);
            paygBillingTestHelper.AssertPaygWithOverdueBillMsgIsVisible();
        });

        it('it should stay on billing page and display the sub-messages in the billing panel', () => {
            let paygBillingTestHelper = billingTestHelper.PaygAssertions(paygContract.number);
            paygBillingTestHelper.AssertBillPanelSubMessagesVisible(false);
            billingTestHelper.AssertPaymentDueDateDetailsSectionVisibility(paygContract.number, true);
        });
    });

    describe('as a payg customer with a restricted contract', () => {
        beforeAll(() => {
            user = context.getUser(User.PAYG);
            currentAccount = user.accounts[4];
            paygContract = currentAccount.contracts.electricity[0];
            context.authenticateAsUser(user);
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
                overview.navigate();
            });
        });

        it('it should see the smart dashboard and no prepaid balances', () => {
            waits.waitForVisibilityOf(new OverviewPage(context).buttonStackLinks.first());
            overviewHelper.AssertSmartMeterPanelVisibility(paygContract.number, true);
            overviewHelper.AssertContractFuelHeader(paygContract.number, paygContract.fuelType, true);
            overviewHelper.PaygAssertions(paygContract.number).AssertPaygHeaderIsVisible(paygContract.number, false);
        });
    });
});

function AssertOverviewPagePaygElements(overviewTestHelper: OverviewAssertions, paygContract: any, contextualMsg: string, isPaymentButtonDisplayed: boolean, balanceColor: string, balanceIsInDebit: boolean = false) {
    let paygOverviewHelper = overviewTestHelper.PaygAssertions(paygContract.number);
    paygOverviewHelper.AssertPrepaidBalanceAmount(paygContract.number, paygContract.prepaidBalanceFormatted, balanceColor, balanceIsInDebit);
    paygOverviewHelper.AssertPaygPrepaidBalanceContextualMsg(paygContract.number, true, contextualMsg);
    overviewTestHelper.AssertOverviewBillPanelPaymentButton(paygContract.number, isPaymentButtonDisplayed, paygTopUpButton);
}

function AssertBillingPagePaygElements(billingTestHelper: BillingAssertions, paygContract: any, contextualMsg: string, isPaymentButtonDisplayed: boolean, balanceColor: string, balanceIsInDebit: boolean = false) {
    let paygBillingTestHelper = billingTestHelper.PaygAssertions(paygContract.number);
    paygBillingTestHelper.AssertPrepaidBalanceHeadingIsVisible(paygContract.number);
    paygBillingTestHelper.AssertPrepaidBalanceAmount(paygContract.number, paygContract.prepaidBalanceFormatted, balanceColor, balanceIsInDebit);
    paygBillingTestHelper.AssertPaygPrepaidBalanceContextualMsg(paygContract.number, true, contextualMsg);
    billingTestHelper.AssertBillPaymentButton(paygContract.number, isPaymentButtonDisplayed, paygTopUpButton);
}

function daysAway(untilDate: moment.Moment): string {
    let days: number = Math.abs(untilDate.diff(moment.now(), 'days'));
    let plural = (days === 1) ? '' : 's';
    return `${days} day${plural}`;
}
