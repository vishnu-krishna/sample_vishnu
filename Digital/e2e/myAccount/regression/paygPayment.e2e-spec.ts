import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { OverviewPage } from '../pageObjects/overviewPage';
import { PaymentPage } from '../pageObjects/paymentPage';
import { browser } from 'protractor';
import { User } from '../../enums/enums';
import { FeatureFlagTypes } from '../../../src/app/myAccount/services/featureFlag.constants';
import { PaygAssertions } from '../pageObjectsAssertions/componentsAssertions/paygAssertions';
import { PaymentAssertions } from '../pageObjectsAssertions/paymentAssertions';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import { PaygPaymentAssertions } from '../pageObjectsAssertions/componentsAssertions/paygPaymentAssertions';
import * as waits from '../../utilities/waits';

let e2e = new ProtractorExtensions();

describe('payg payment regression scenario tests', () => {
    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let paygContract: FuelEntity;
    let context: Context;
    let overview: OverviewPage;
    let payment: PaymentPage;
    let paygPaymentTestHelper: PaygPaymentAssertions;
    let paymentTestHelper: PaymentAssertions;

    beforeAll(() => {
        context = new Context(browser.params.environment);
        overview = new OverviewPage(context);
        payment = new PaymentPage();
        paymentTestHelper = new PaymentAssertions(payment);
        paygPaymentTestHelper = new PaygPaymentAssertions(payment.paygPaymentComponent());
    });

    afterAll(() => {
        context.logout();
    });

    describe('as a payg customer with high credit balance who pays via PayPal', () => {
        beforeAll(() => {
            user = context.getUser(User.PAYG);
            currentAccount = user.accounts[0];
            paygContract = currentAccount.contracts.electricity[0];
            context.authenticateAsUser(user);
            context.setFeatureFlag(FeatureFlagTypes.bankAccountPaymentEnabled, true);
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
                overview.navigate();
                waits.waitForElement(overview.billPaymentButton(paygContract.number));
                overview.makeAPaymentForContract(paygContract.number);
            });

            it('it should display the correct header, address, and reference number', () => {
                waits.waitForVisibilityOf(payment.paymentAddressLabel);
                paymentTestHelper.AssertCustomerAndPaymentReference(paygContract.fuelType, currentAccount.addressFormatted, currentAccount.number + paygContract.number);
            });

            it('it should display the selection for standard bonus amount', () => {
                paygPaymentTestHelper.AssertBonusSelectionPageStaticLabels();
                paygPaymentTestHelper.AssertPaymentAmountSelectionVisibility(true);
            });

            it('it should select the first standard payment amount to receive $10 bonus', () => {
                payment.paygPaymentComponent().selectStandardPaymentAmount(0);
                paymentTestHelper.AssertInitialPaymentModalVisibility(true, true);
                paymentTestHelper.AssertPaymentMethodText(true);
                paymentTestHelper.AssertPaymentAmountInputVisibility(false);
                waits.waitForElement(payment.paygPaymentComponent().paymentAmountSelected);
                paygPaymentTestHelper.AssertPrepopulatedPaymentAmountSection('50', '10.00');

                // ensure the payment selection disappeared
                paygPaymentTestHelper.AssertPaymentAmountSelectionVisibility(false);
            });

            it ('it should be able to go back and enter their custom payment amount', () => {
                payment.paygPaymentComponent().clickChangePaymentAmountLink();

                // ensure we went back to the selection page
                paygPaymentTestHelper.AssertBonusSelectionPageStaticLabels();
                paygPaymentTestHelper.AssertPaymentAmountSelectionVisibility(true);

                payment.paygPaymentComponent().selectEnterOtherAmount();
                paymentTestHelper.AssertPaymentAmountInputVisibility(true);
                paygPaymentTestHelper.AssertCustomPaymentBonusSection(true);
                payment.enterPaymentAmount('10.58');
            });

            it('it should see the upsell message to top up more', () => {
                payment.loseFocusOnInputField();
                paygPaymentTestHelper.AssertCustomPaymentBonusSection(true, '0');
                paygPaymentTestHelper.AssertUpsellLinkForMoreBonus('50', '10');
            });

            it('it should see click the upsell message and have an updated bonus amount', () => {
                payment.paygPaymentComponent().selectUpsellLink();
                paygPaymentTestHelper.AssertCustomPaymentBonusSection(true, '10');
            });

            it('it should select PayPal as the payment method', () => {
                payment.selectPaymentMethod(2);
                expect(payment.paypalPaymentMethodInput.isDisplayed()).toBe(true, 'Paypal payment method readonly text input field is not displayed.');
                expect(payment.paypalPaymentMethodInput.getAttribute('value')).toEqual('PayPal', 'Payment method text did not match for Paypal.');
                expect(payment.paypalPaymentMethodInput.getAttribute('readonly')).toEqual('true', 'Paypal payment method text input field is not readonly');
                payment.closeModal();
            });
        });
    });
});
