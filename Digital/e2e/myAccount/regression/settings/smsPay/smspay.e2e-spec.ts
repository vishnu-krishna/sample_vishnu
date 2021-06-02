import { browser, by, element, $, $$ , promise } from 'protractor';
import { ProtractorExtensions } from '../../../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../../../context';
import { Account } from './../../../../models/account';
import { FeatureFlagTypes } from '../../../../../src/app/myAccount/services/featureFlag.constants';
import { User } from '../../../../enums/enums';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../../../models/environments';
import { Contract } from './../../../../models/contract';
import { getEnvironmentApiEndpoints } from '../../../../utilities/environment';
import { DataService } from '../../../../services/dataService/dataService';
import * as stringParser from '../../../../utilities/stringParser';
import * as waits from '../../../../utilities/waits';
import { SmsPayPage } from '../../../pageObjects/manageAccount/smsPayPage';

let e2e = new ProtractorExtensions();

describe('SMS Pay Regression scenario tests', () => {
    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let smsPay: SmsPayPage;
    let elec: Contract;
    let gas: Contract;
    let context: Context;
    let customerAccounts: Account[] = new Array<Account>();

    beforeAll(() => {
        context = new Context(browser.params.environment);
        smsPay = new SmsPayPage(context);
    });

    describe('as a user with Active Electricity and Gas Account', () => {
        beforeAll(() => {
            context.setWindowSize(e2e.screenSizes.desktop);
            user = context.getUser(User.Default);
            context.authenticateAsUser(user);
            getEnvironmentApiEndpoints().then((apiEndpoints) => {
                new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                    customerAccounts[0] = accounts[0];
                });
            });
            context.setFeatureFlag(FeatureFlagTypes.smsPayEnabled, true);
            smsPay.navigateToSmsPayPage();
        });
        it('should show the "Sms Pay" Link under MANAGE ACCOUNT tab', () => {
            expect(smsPay.smsPayLinkDisplayed()).toBe(true);
        });

        it('should show the "Sms Pay" landing page and able to setup sms pay for the account', () => {
            waits.waitForVisibilityOf(smsPay.smsPayButton);
            smsPay.smsPayButton.click();
            waits.waitForVisibilityOf(smsPay.smsPayDropDown);
            smsPay.getSmsPayPaymentArrangementOptions();
            let firstPaymentOption = smsPay.paymentArrangementOptions.get(1);
            firstPaymentOption.click();
            waits.waitForVisibilityOf(smsPay.tandcCheckBox);
            smsPay.tandcCheckBox.click();
            smsPay.saveButton.click();
            waits.waitForVisibilityOf(smsPay.successContainer);
            expect(smsPay.successHeading.getText()).toEqual(`SMS Pay has been set up`);
            smsPay.closeSuccessModalButton.click();
            expect(smsPay.flashMessageHeading.getText()).toEqual(`You've successfully set up SMS Pay`);
            expect(smsPay.cancelSmsPay.isDisplayed()).toBeTruthy();
            expect(smsPay.paymentArrangementDetails.getText()).toEqual('xxxx xxxx xxxx 5100');
        });

        it(`should be able to cancel sms pay, once it is setup`, () => {
            waits.waitForModalToDisappear(element(by.css('.dialog-container')));
            waits.waitForVisibilityOf(smsPay.cancelSmsPay);
            smsPay.cancelSmsPay.click();
            waits.waitForVisibilityOf(smsPay.cancelSmspayModalHeader);
            smsPay.getCancelConfirmationButton();
            smsPay.cancelConfirmationButton.click();
            waits.waitForModalToDisappear(element(by.css('.dialog-container')));
            waits.waitForVisibilityOf(smsPay.flashMessageText);
            expect(smsPay.flashMessageText.getText()).toEqual('Your payment arrangement has been cancelled.');
        });
    });
});
