// This e2e file is not in use (checked with Darmaine Cruz).
// For test scenario reference only

import { $, browser, element } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import { Context } from '../../context';
import { overview } from '../pageObjects/overview';
import { User } from '../../enums/enums';
import { getEnvironmentApiEndpoints } from '../../utilities/environment';
import { DataService } from '../../services/dataService/dataService';
import { Account } from '../../models/account';
import { Contract } from '../../models/contract';

let e2e = new ProtractorExtensions();
// Not all scenarios covered,further addition inprogress
describe('smoke test', () => {

    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let currentElectricityContract: Contract[];
    let context: Context;
    let bowserName;
    let customerAccounts: Account[] = new Array<Account>();
    beforeAll(() => {
        context = new Context(browser.params.environment);

    });

    describe('with a typical user', () => {

        beforeAll(() => {

            user = context.getUser(User.PAYG);
            context.authenticateAsUser(user);

            getEnvironmentApiEndpoints().then((apiEndpoints) => {
                new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                    customerAccounts = accounts;
                    currentElectricityContract = accounts[0].contracts.filter((contract) => contract.fuelType === 'Electricity');
                });
            });
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            describe('Eligible Pay G customer', () => {
                it('Should display heading as Prepaid balance on overview page', () => {
                    expect($(`#payg-heading-${currentElectricityContract[0].number}`).isDisplayed()).toBeTruthy();
                    expect($(`#payg-heading-${currentElectricityContract[0].number}`).getText()).toBe('Prepaid balance');
                });
                it('Should display the usage charges tool tip on click of icon', () => {
                    expect(overview.payg.toolTip.isPresent()).toBeTruthy();
                    overview.payg.toolTip.click();
                });

                it('Should display the correct prepaid balance amount when positive', () => {
                    expect($(`#payg-amount-${currentElectricityContract[0].number}`).getText()).toBe('$ 123.00');
                    expect((overview.payg.paygPrepaidAmountDollar).getText()).toBe('123');
                    expect((overview.payg.paygPrepaidAmountCents).getText()).toBe('.00');
                });

                it('Should display the correct prepaid balance amount when negative', () => {
                    expect($(`#payg-amount-${currentElectricityContract[2].number}`).getText()).toBe('-$ 20.00 DR');
                });

                it('Should display prepaid balance amount in black if payment status is High credit', () => {
                    expect($(`#payg-amount-${currentElectricityContract[1].number}`).getCssValue('color')).toBe('rgba(51, 51, 51, 1)');
                    expect((overview.payg.paygPrepaidAmountCents).getCssValue('color')).toBe('rgba(51, 51, 51, 1)');
                });
            });

            describe('To verify the right panel for PayG customer', () => {
                it('Should correct label on payment button for High Credit', () => {
                    expect($(`#payment-button-${currentElectricityContract[0].number}`).isPresent()).toBeTruthy();
                    expect($(`#payment-button-${currentElectricityContract[0].number}`).getText()).toBe('TOP UP');
                });
                it('Should show correct contextual message for High Credit', () => {
                    expect($(`#bill-panel-message-header-${currentElectricityContract[0].number}`).isPresent()).toBeTruthy();
                    expect($(`#bill-panel-message-header-${currentElectricityContract[0].number}`).getText()).toBe('Your account is looking good.');
                });
                it('Should correct label on payment button for Low Credit', () => {
                    expect($(`#payment-button-${currentElectricityContract[1].number}`).isPresent()).toBeTruthy();
                    expect($(`#payment-button-${currentElectricityContract[1].number}`).getText()).toBe('TOP UP FOR BONUSES');
                });
                it('Should show correct contextual message for Low Credit', () => {
                    expect($(`#bill-panel-message-header-${currentElectricityContract[1].number}`).isPresent()).toBeTruthy();
                    expect($(`#bill-panel-message-header-${currentElectricityContract[1].number}`).getText()).toBe('You\'re running out of credit.');
                });
                // Debit and bill not issued
                it('Should correct label on payment button for debit balance', () => {
                    expect($(`#payment-button-${currentElectricityContract[2].number}`).isPresent()).toBeTruthy();
                    expect($(`#payment-button-${currentElectricityContract[2].number}`).getText()).toBe('TOP UP IMMEDIATELY');
                });

                it('Should show correct contextual message for debit balance', () => {
                    expect($(`#bill-panel-message-header-${currentElectricityContract[2].number}`).isPresent()).toBeTruthy();
                    expect($(`#bill-panel-message-header-${currentElectricityContract[2].number}`).getText()).toBe('You\'ve run out of credit');
                });
                // Debit ,overdue and bill issued
                it('Should show bill issued', () => {
                    expect(element(overview.payg.billPanelTitle).getText()).toBe('Bill Issued');
                });
                it('Should show overdue amount', () => {
                    expect(element(overview.payg.billPanelAmount).getText()).toContain('$78.80');
                });
                it('Should show overdue days', () => {
                    expect(element(overview.payg.billPanelText).getText()).toContain('overdue by 119 days');
                });
                it('Should show bill due date', () => {
                    expect(element(overview.payg.billPanelDate).getText()).toContain('Due - Fri 28 Apr 2017');
                });
                it('Should show direct debit amount for non PAYG', () => {
                    expect(element(overview.payg.billPanelHeading).getText()).toBe('Direct Debit amount');
                    expect(overview.payg.billAmount.getText()).toContain('20.00');
                });
            });
        });

        it('should logout', () => {
            context.logout();
        });
    });
});
