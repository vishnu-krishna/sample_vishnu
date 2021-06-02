import { browser, by, element, $, $$ } from 'protractor';
import { Context } from '../../context';
import { Pages } from '../../pages';
import { FeatureFlagTypes } from '../../../src/app/myAccount/services/featureFlag.constants';
import { OverviewPage } from '../pageObjects/overviewPage';
import { BillingPage } from '../pageObjects/billingPage';
import { User } from '../../enums/enums';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import * as waits from '../../utilities/waits';

xdescribe('monthly billingfeature flag check', () => {

    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let currentElectricityContract: FuelEntity;
    let currentGasContract: FuelEntity;
    let context: Context;
    let overview: OverviewPage;
    let billing: BillingPage;

    beforeAll(() => {
        context = new Context(browser.params.environment);
        overview = new OverviewPage(context);
        billing = new BillingPage(context);
    });
    describe('with the default user', () => {
        beforeAll(() => {
            user = context.getUser(User.Default);
            currentAccount = user.accounts[0];
            currentElectricityContract = currentAccount.contracts.electricity[0];
            currentGasContract = currentAccount.contracts.gas[0];
            context.authenticateAsUser(user);
        });
        // Pending: This is taken out due to P3 stacking bug - should be back when Obsidian merges MB in.
        xdescribe('when Monthly Billing feature toggle is on', () => {
            beforeAll(() => {
                context.setFeatureFlag(FeatureFlagTypes.monthlyBillingEnabled, true);
                billing.navigate();
                waits.waitForElement(billing.billingContainer);
            });
            describe('on the billing page', () => {
                it('Monthly Billing link should exist', () => {
                    expect(billing.getButtonStackLinkText(1)).toContain('Set up Monthly Billing', 'the monthly billing link in the side panel is not found');
                });
            });
        });
        describe('when Monthly Billing feature toggle is off', () => {
            beforeAll(() => {
                context.setFeatureFlag(FeatureFlagTypes.monthlyBillingEnabled, false);
                overview.navigate();
                billing.navigate();
                waits.waitForElement(billing.billingContainer);
            });
            it('Monthly Billing link should NOT exist', () => {
                expect(billing.getButtonStackLinkText(1)).toContain('Switch to eBilling', 'the first side panel link is expected to be eBilling');
            });
        });
    });
});
