import { browser, by, element, $, $$ } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { BillingPage } from '../pageObjects/billingPage';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import { User } from '../../enums/enums';
import { BillingAssertions } from '../pageObjectsAssertions/billingAssertions';
import { getEnvironmentApiEndpoints } from '../../utilities/environment';
import { DataService } from '../../services/dataService/dataService';
import { Account } from '../../models/account';
import { Contract } from '../../models/contract';
import * as stringParser from '../../utilities/stringParser';

let e2e = new ProtractorExtensions();

// Given I am a user with "SSMR Enabled"
// When I login to "My Account"
// aeo links
// usage
// ssmr

describe('smoke test', () => {

    let user: UsersEntity;
    let currentElectricityContract: Contract;
    let currentGasContract: Contract;
    let context: Context;
    let billing: BillingPage;
    let billingTestHelper: BillingAssertions;
    let customerAccounts: Account[] = new Array<Account>();

    beforeAll(() => {
        context = new Context(browser.params.environment);
        billing = new BillingPage(context);
        billingTestHelper = new BillingAssertions(billing);
    });

    afterAll(() => {
        context.logout();
    });

    describe('with a typical user', () => {

        beforeAll(() => {
            user = context.getUser(User.Default);
            context.authenticateAsUser(user);

            getEnvironmentApiEndpoints().then((apiEndpoints) => {
                new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                    customerAccounts = accounts;
                    currentElectricityContract = accounts[0].contracts.find((contract) => contract.fuelType === 'Electricity');
                    currentGasContract = accounts[0].contracts.find((contract) => contract.fuelType === 'Gas');
                });
            });
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            describe('when navigating to the billing page', () => {

                beforeAll(() => {
                    billing.navigate();
                });

                it('should show the account number', () => {
                    billingTestHelper.AssertUserAccountCount(1);

                    stringParser.formatAccountNumber(customerAccounts[0].number).then((accountNumber) => {
                        stringParser.formatAddress(customerAccounts[0].contracts[0].address).then((address) => {
                            billingTestHelper.AssertBillingAccountHeader(0, accountNumber, address);
                        });
                    });
                });

                it('should show electricity section', () => {
                    billingTestHelper.AssertFuelContractHeader(+currentElectricityContract.number, 'Electricity');
                });

                it('should show gas section', () => {
                    billingTestHelper.AssertFuelContractHeader(+currentGasContract.number, 'Gas');
                });

                xit('should show online services section', () => {
                    pending(' potential bug - Enter Meter Read sidelink disappeared for an account with a basic meter');
                    billingTestHelper.AssertBillingSidePanelLinks(3, true);
                });
            });
        });
    });
});
