import { Account } from './../../models/account';
import { Contract } from './../../models/contract';
import { browser } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { OverviewPage } from '../pageObjects/overviewPage';
import { FeatureFlagTypes } from '../../../src/app/myAccount/services/featureFlag.constants';
import { PaymentPage } from '../pageObjects/paymentPage';
import { User } from '../../enums/enums';
import { OverviewAssertions } from '../pageObjectsAssertions/overviewAssertions';
import { PaymentAssertions } from '../pageObjectsAssertions/paymentAssertions';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import { getEnvironmentApiEndpoints } from '../../utilities/environment';
import { DataService } from '../../services/dataService/dataService';
import * as stringParser from '../../utilities/stringParser';
import { format } from 'url';

let e2e = new ProtractorExtensions();

describe('overview scenario tests', () => {
    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let elec: Contract;
    let gas: Contract;
    let context: Context;
    let overview: OverviewPage;
    let overviewAssertions: OverviewAssertions;
    let customerAccounts: Account[] = new Array<Account>();

    beforeAll(() => {
        context = new Context(browser.params.environment);
        overview = new OverviewPage(context);
        overviewAssertions = new OverviewAssertions(overview);
    });

    describe('as a residential customer with a single account, matching addresses, and dual fuel', () => {
        beforeAll(() => {
            context.setWindowSize(e2e.screenSizes.desktop);
            user = context.getUser(User.RESI_DUAL_FUEL_BILL_ISSUED);
            context.authenticateAsUser(user);

            getEnvironmentApiEndpoints().then((apiEndpoints) => {
                new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                    customerAccounts = accounts;
                    elec = accounts[0].contracts.find((contract) => contract.fuelType === 'Electricity');
                    gas = accounts[0].contracts.find((contract) => contract.fuelType === 'Gas');
                });
            });
            context.setFeatureFlag(FeatureFlagTypes.bankAccountPaymentEnabled, true);
        });

        it('it should see the customer name and SSMR banner', () => {
            overviewAssertions.AssertDashboardFirstnameText(user.firstName);
            overviewAssertions.AssertOptionalBannerVisibility(true, false);
        });

        it('it should see the side panel and marketing tile', () => {
            overviewAssertions.AssertDashboardSidePanelLinks();
        });

        it('it should only see a single account header and address, and two contracts', () => {
            let accountCount = (user.accounts as any[]).length;
            overviewAssertions.AssertNumberOfAccountsForCustomer(accountCount);

            stringParser.formatAccountNumber(customerAccounts[0].number).then((accountNumber) => {
                stringParser.formatAddress(customerAccounts[0].contracts[0].address).then((address) => {
                    overviewAssertions.AssertAccountHeader(0, accountNumber, address);
                    overviewAssertions.AssertFuelContractCount(2);
                });
            });
        });

        it('it should see the smart dashboard panel with billing information', () => {
            let contractNumber = elec.number;
            overviewAssertions.AssertContractFuelHeader(Number(contractNumber), elec.fuelType as string);
            overviewAssertions.AssertSmartMeterPanelVisibility(Number(contractNumber), true);
            // assert billing elements
            overviewAssertions.AssertBillingPanel(Number(contractNumber));
        });

        it('it should see the basic dashboard panel with billing information', () => {
            let contractNumber = gas.number;
            overviewAssertions.AssertContractFuelHeader(Number(contractNumber), gas.fuelType as string);
            overviewAssertions.AssertBasicMeterPanelVisibility(Number(contractNumber), true);
            // assert billing elements
            overviewAssertions.AssertBillingPanel(Number(contractNumber));
        });

        it('it should click the payment button and see the payment modal', () => {
            let paymentPage =  new PaymentPage();
            overview.makeAPaymentForContract(Number(elec.number));
            let paymentTestHelper = new PaymentAssertions(paymentPage);
            paymentTestHelper.AssertInitialPaymentModalVisibility(true, true);
            paymentTestHelper.AssertPaymentMethodText(true);
            paymentPage.closeModal();
        });
    });

    describe('as a residential customer with a single fuel and no first-month bill', () => {
        beforeAll(() => {
            context.setWindowSize(e2e.screenSizes.desktop);
            user = context.getUser(User.NO_FIRST_BILL_USER);
            context.authenticateAsUser(user);

            getEnvironmentApiEndpoints().then((apiEndpoints) => {
                new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                    customerAccounts = accounts;
                    elec = accounts[0].contracts.find((contract) => contract.fuelType === 'Electricity');
                });
            });
        });

        it('it should see the customer name and SSMR banner', () => {
            overviewAssertions.AssertDashboardFirstnameText(user.firstName);
            overviewAssertions.AssertOptionalBannerVisibility(true, false);
        });

        it('it should see the side panel and marketing tile', () => {
            overviewAssertions.AssertDashboardSidePanelLinks();
        });

        it('it should only see a single account header and address, and single elec contract', () => {
            let accountCount = (user.accounts as any[]).length;
            overviewAssertions.AssertNumberOfAccountsForCustomer(1);
            stringParser.formatAccountNumber(customerAccounts[0].number).then((accountNumber) => {
                stringParser.formatAddress(customerAccounts[0].contracts[0].address).then((address) => {
                    overviewAssertions.AssertAccountHeader(0, accountNumber, address);
                    overviewAssertions.AssertFuelContractCount(1);
                });
            });
        });

        it('it should see the no bills message for the electricity contract', () => {
            overviewAssertions.AssertNoBillsMesage(Number(elec.number), elec.fuelType as string);
            overviewAssertions.AssertSmartMeterPanelVisibility(Number(elec.number), false);
            overviewAssertions.AssertBasicMeterPanelVisibility(Number(elec.number), false);
        });
    });

    describe('as a residential customer with a single, smart, electricity fuel and bills issued', () => {
        beforeAll(() => {
            context.setWindowSize(e2e.screenSizes.desktop);
            user = context.getUser(User.RESI_SINGLE_FUEL_SMART_ELEC);
            context.authenticateAsUser(user);

            getEnvironmentApiEndpoints().then((apiEndpoints) => {
                new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                    customerAccounts = accounts;
                    elec = accounts[0].contracts.find((contract) => contract.fuelType === 'Electricity');
                });
            });
        });

        it('it should see the customer name and but not theSSMR banner', () => {
            overviewAssertions.AssertDashboardFirstnameText(user.firstName);
            overviewAssertions.AssertOptionalBannerVisibility(false, false);
        });

        it('it should see the side panel and marketing tile', () => {
            overviewAssertions.AssertDashboardSidePanelLinks();
        });

        it('it should only see a single account header and address, and single elec contract', () => {
            let accountCount = (user.accounts as any[]).length;
            overviewAssertions.AssertNumberOfAccountsForCustomer(1);
            stringParser.formatAccountNumber(customerAccounts[0].number).then((accountNumber) => {
                stringParser.formatAddress(customerAccounts[0].contracts[0].address).then((address) => {
                    overviewAssertions.AssertAccountHeader(0, accountNumber, address);
                    overviewAssertions.AssertFuelContractCount(1);
                    overviewAssertions.AssertContractFuelHeader(Number(elec.number), elec.fuelType as string, false);
                });
            });
        });

        it('it should see the smart meter dashboard and bills panel', () => {
            overviewAssertions.AssertSmartMeterPanelVisibility(Number(elec.number), true);
            overviewAssertions.AssertBasicMeterPanelVisibility(Number(elec.number), false);
            overviewAssertions.AssertBillingPanel(Number(elec.number));
            overviewAssertions.AssertOverviewBillPanelPaymentButton(Number(elec.number), true);
        });
    });

    describe('as a residential customer with a single, basic, gas fuel type', () => {
        beforeAll(() => {
            context.setWindowSize(e2e.screenSizes.desktop);
            user = context.getUser(User.SINGLE_FUEL_BASIC_GAS);
            context.authenticateAsUser(user);

            getEnvironmentApiEndpoints().then((apiEndpoints) => {
                new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                    customerAccounts = accounts;
                    gas = accounts[0].contracts.find((contract) => contract.fuelType === 'Gas');
                });
            });
        });

        it('it should see the customer name and but not the SSMR banner', () => {
            overviewAssertions.AssertDashboardFirstnameText(user.firstName);
            overviewAssertions.AssertOptionalBannerVisibility(true, false);
        });

        it('it should see the side panel and marketing tile', () => {
            overviewAssertions.AssertDashboardSidePanelLinks();
        });

        it('it should only see a single account header and address, and single gas contract', () => {
            let accountCount = (customerAccounts as any[]).length;
            overviewAssertions.AssertNumberOfAccountsForCustomer(1);
            stringParser.formatAccountNumber(customerAccounts[0].number).then((accountNumber) => {
                stringParser.formatAddress(customerAccounts[0].contracts[0].address).then((address) => {
                    overviewAssertions.AssertAccountHeader(0, accountNumber, address);
                    overviewAssertions.AssertFuelContractCount(1);
                    overviewAssertions.AssertContractFuelHeader(Number(gas.number), gas.fuelType as string, false);
                });
            });
        });

        it('it should see the basic meter dashboard and bills panel', () => {
            overviewAssertions.AssertSmartMeterPanelVisibility(Number(gas.number), false);
            overviewAssertions.AssertBasicMeterPanelVisibility(Number(gas.number), true);
            overviewAssertions.AssertBillingPanel(Number(gas.number));
            overviewAssertions.AssertOverviewBillPanelPaymentButton(Number(gas.number), true);
        });
    });

    describe(`Multi-account multi-contract, each account should have two fuels`, () => {
        beforeAll(() => {
            user = context.getUser(User.MULTI_ACCOUNT_MULTI_CONTRACT);
            context.authenticateAsUser(user);

            getEnvironmentApiEndpoints().then((apiEndpoints) => {
                new DataService(apiEndpoints.inflightAccountsList).getAccountsWithActiveContracts().then((accounts) => {
                    customerAccounts = accounts;
                });
            });
        });

        describe(`desktop viewport`, () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            it(`should have the correct number of accounts and contracts`, () => {
                overviewAssertions.AssertNumberOfAccountsForCustomer(2);
                overviewAssertions.AssertFuelContractCount(4);
            });

            it(`should have all account headers`, () => {
                customerAccounts.map((account, index) => {
                    stringParser.formatAccountNumber(account.number).then((accountNumber) => {
                        stringParser.formatAddress(account.contracts[0].address).then((address) => {
                            overviewAssertions.AssertAccountHeader(index, accountNumber, address);
                        });
                    });
                });
            });

            it(`should have all contract headers displayed`, () => {
                overviewAssertions.AssertContractFuelHeader(Number(customerAccounts[0].contracts[0].number), customerAccounts[0].contracts[0].fuelType as string);
                overviewAssertions.AssertContractFuelHeader(Number(customerAccounts[0].contracts[1].number), customerAccounts[0].contracts[1].fuelType as string);
                overviewAssertions.AssertContractFuelHeader(Number(customerAccounts[1].contracts[0].number), customerAccounts[1].contracts[0].fuelType as string);
                overviewAssertions.AssertContractFuelHeader(Number(customerAccounts[1].contracts[1].number), customerAccounts[1].contracts[1].fuelType as string);
            });
        });
    });
});
