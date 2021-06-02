import { Contracts } from './../../models/environments';
import { browser, by, element, $, $$, ExpectedConditions, promise } from 'protractor';
import { ProtractorExtensions } from '../../../src/app/shared/e2e/protractor.extensions';
import { Context } from '../../context';
import { OverviewPage } from '../pageObjects/overviewPage';
import { PaymentPage } from '../pageObjects/paymentPage';
import { UsersEntity, AccountsEntity, FuelEntity } from '../../models/environments';
import { User } from '../../enums/enums';
import { OverviewAssertions } from '../pageObjectsAssertions/overviewAssertions';
import { PaymentAssertions } from '../pageObjectsAssertions/paymentAssertions';
import { Pages } from '../../pages';
import { protractor } from 'protractor/built/ptor';
import { Account } from '../../models/account';
import { Contract } from '../../models/contract';
import { DataService } from '../../services/dataService/dataService';
import * as waits from '../../utilities/waits';
import { getEnvironmentApiEndpoints } from '../../utilities/environment';

let e2e = new ProtractorExtensions();

describe('smoke test', () => {

    let user: UsersEntity;
    let currentAccount: AccountsEntity;
    let currentElectricityContract: Contract;
    let currentGasContract: Contract;
    let context: Context;
    let overview: OverviewPage;
    let overviewTestHelper: OverviewAssertions;
    let customerAccounts: Account[] = new Array<Account>();

    beforeAll(() => {
        context = new Context(browser.params.environment);
        overview = new OverviewPage(context);
        overviewTestHelper = new OverviewAssertions(overview);
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

        // hasElectricity, hasGas
        // hasSolar
        // hasMultiMeter (contract, singleRegister)
        // hasSingleMeter (contract, singleRegister)
        // hasDirectDebit
        // paygUser
        // basic/smart

        xdescribe('in a mobile viewport', () => {

            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.mobile);
            });

            it('should show the correct name', () => {
                overview.navigate();
                overviewTestHelper.AssertDashboardFirstnameText(user.firstName);
            });
        });

        describe('in a desktop viewport', () => {
            beforeAll(() => {
                context.setWindowSize(e2e.screenSizes.desktop);
            });

            describe('on the overview', () => {

                it('should show the correct user name', () => {
                    waits.waitForVisibilityOf(overview.firstName);
                    overviewTestHelper.AssertDashboardFirstnameText(customerAccounts[0].firstName);
                });

                it('should show the standard 3 online services links', () => {
                    overviewTestHelper.AssertDashboardSidePanelLinks();
                });

                it('should click the payment button and display the payment modal', () => {
                    let paymentPage = new PaymentPage();
                    overview.makeAPaymentForContract(+currentElectricityContract.number);
                    let paymentTestHelper = new PaymentAssertions(paymentPage);
                    paymentTestHelper.AssertPaymentAmountInputVisibility(true);
                    paymentTestHelper.AssertInitialPaymentModalVisibility(true);
                    paymentPage.closeModal();
                });
            });
        });

        // TODO: Fill in the TODOs and then uncomment
        // describe('footer links', () => {
        //     it('should navigate to the privacy page', () => {
        //         // TODO:
        //     });
        //     it('should navigate to the legal notices page', () => {
        //         // TODO:
        //     });
        //     it('should navigate to the terms and conditions page', () => {
        //         // TODO:
        //     });
        // });
        // describe('payments', () => {
        //     // TODO:
        // });
    });
});
