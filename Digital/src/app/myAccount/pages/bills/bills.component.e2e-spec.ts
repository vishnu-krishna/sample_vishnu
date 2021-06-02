/*
This script has billing page scenarios for E2E testing.
*/
import { $$, browser } from 'protractor';

import { ProtractorExtensions }                       from '../../../shared/e2e/protractor.extensions';
import { DashboardMockDefault, DashboardPageObject }  from '../../myAccount.e2e-pages';

let e2e = new ProtractorExtensions();
let page = new DashboardPageObject();

// TODO: TESTCLEANUP
xdescribe('Bills', () => {

    describe('Inactive Account Pill and Button Stack on Bills Tab', () => {

        let accountsWithContracts = require('../../../../public/_mockData/aglWebApi/accounts/list/e2e-2xAccount-2xContract-2xContract_Grouped.json');

        let mockDefaults = {
            'sitecore:file':        DashboardMockDefault['sitecore'],
            'syncdata/start:file':  DashboardMockDefault['syncdata/start'],
            'syncdata/status:file': DashboardMockDefault['syncdata/status'],
            'dashboard:file':       DashboardMockDefault['dashboard'],
            'pendingpayments:file': DashboardMockDefault['pendingpayments'],
            'payments:file':        DashboardMockDefault['payments'],
            'bills:file':           DashboardMockDefault['bills']
        };

        describe('With test data loaded from disk', () => {
            it('should have exactly 2 accounts', () => { expect(accountsWithContracts.length).toBe(2); });
            it('should have exactly 2 contracts in accounts[0]', () => { expect(accountsWithContracts[0].contracts.length).toBe(2); });
            it('should have exactly 2 accounts in accounts[1]', () => { expect(accountsWithContracts[1].contracts.length).toBe(2); });
        });

        // TODO: Replace with component tests when the UI refresh happens Q1 2017.
        describe('With a bunch of test cases', () => {
            let test = (testCase) => {
                accountsWithContracts[0].contracts[0].isRestricted = testCase.testData.a0c0;
                accountsWithContracts[0].contracts[1].isRestricted = testCase.testData.a0c1;
                accountsWithContracts[1].contracts[0].isRestricted = testCase.testData.a1c0;
                accountsWithContracts[1].contracts[1].isRestricted = testCase.testData.a1c1;

                let mockData = Object.assign({}, mockDefaults, { 'accounts/list:data': JSON.stringify(accountsWithContracts) });

                for (let screenSize of e2e.allScreenSizes.filter((ss) => ss !== 'tablet')) {
                    it(`should show correct UI for test case number ${testCase.number} on [${screenSize}]`, () => {
                        e2e.openPage('bills', screenSize, mockData);
                        if (testCase.pause) { browser.pause(); }
                        expect($$('#billing-accounts .account .contract-state-pill__inactive').count())
                            .toBe(testCase.expected.accountLevelInactivePillCount,
                                `Expectation for number of account-level inactive account pills failed in test case ${testCase.number}`);
                        expect($$('#billing-accounts .contract .contract-fuel__inactive').count())
                            .toBe(testCase.expected.fuelLevelInactivePillCount,
                                `Expectation for number of fuel-level inactive account pills failed in test case ${testCase.number}`);
                        expect($$('.button-stack a.read-only').count())
                            .toBe(testCase.expected.buttonCount,
                                `Expectation for number of read-only button stack buttons failed in test case ${testCase.number}`);
                    });
                }
            };

            let testCaseList = [
                { number: 1,  pause: 0, testData: { a0c0: false, a0c1: false, a1c0: false, a1c1: false }, expected: { accountLevelInactivePillCount: 0, fuelLevelInactivePillCount: 0, buttonCount: 0 } },
                { number: 2,  pause: 0, testData: { a0c0: false, a0c1: false, a1c0: false, a1c1: true  }, expected: { accountLevelInactivePillCount: 0, fuelLevelInactivePillCount: 1, buttonCount: 0 } },
                { number: 3,  pause: 0, testData: { a0c0: false, a0c1: false, a1c0: true,  a1c1: false }, expected: { accountLevelInactivePillCount: 0, fuelLevelInactivePillCount: 1, buttonCount: 0 } },
                { number: 4,  pause: 0, testData: { a0c0: false, a0c1: false, a1c0: true,  a1c1: true  }, expected: { accountLevelInactivePillCount: 1, fuelLevelInactivePillCount: 0, buttonCount: 0 } },
                { number: 5,  pause: 0, testData: { a0c0: false, a0c1: true,  a1c0: false, a1c1: false }, expected: { accountLevelInactivePillCount: 0, fuelLevelInactivePillCount: 1, buttonCount: 0 } },
                { number: 6,  pause: 0, testData: { a0c0: false, a0c1: true,  a1c0: false, a1c1: true  }, expected: { accountLevelInactivePillCount: 0, fuelLevelInactivePillCount: 2, buttonCount: 0 } },
                { number: 7,  pause: 0, testData: { a0c0: false, a0c1: true,  a1c0: true,  a1c1: false }, expected: { accountLevelInactivePillCount: 0, fuelLevelInactivePillCount: 2, buttonCount: 0 } },
                { number: 8,  pause: 0, testData: { a0c0: false, a0c1: true,  a1c0: true,  a1c1: true  }, expected: { accountLevelInactivePillCount: 1, fuelLevelInactivePillCount: 1, buttonCount: 0 } },
                { number: 9,  pause: 0, testData: { a0c0: true,  a0c1: false, a1c0: false, a1c1: false }, expected: { accountLevelInactivePillCount: 0, fuelLevelInactivePillCount: 1, buttonCount: 0 } },
                { number: 10, pause: 0, testData: { a0c0: true,  a0c1: false, a1c0: false, a1c1: true  }, expected: { accountLevelInactivePillCount: 0, fuelLevelInactivePillCount: 2, buttonCount: 0 } },
                { number: 11, pause: 0, testData: { a0c0: true,  a0c1: false, a1c0: true,  a1c1: false }, expected: { accountLevelInactivePillCount: 0, fuelLevelInactivePillCount: 2, buttonCount: 0 } },
                { number: 12, pause: 0, testData: { a0c0: true,  a0c1: false, a1c0: true,  a1c1: true  }, expected: { accountLevelInactivePillCount: 1, fuelLevelInactivePillCount: 1, buttonCount: 0 } },
                { number: 13, pause: 0, testData: { a0c0: true,  a0c1: true,  a1c0: false, a1c1: false }, expected: { accountLevelInactivePillCount: 2, fuelLevelInactivePillCount: 0, buttonCount: 0 } },
                { number: 14, pause: 0, testData: { a0c0: true,  a0c1: true,  a1c0: false, a1c1: true  }, expected: { accountLevelInactivePillCount: 2, fuelLevelInactivePillCount: 1, buttonCount: 0 } },
                { number: 15, pause: 0, testData: { a0c0: true,  a0c1: true,  a1c0: true,  a1c1: false }, expected: { accountLevelInactivePillCount: 2, fuelLevelInactivePillCount: 1, buttonCount: 0 } },
                { number: 16, pause: 0, testData: { a0c0: true,  a0c1: true,  a1c0: true,  a1c1: true  }, expected: { accountLevelInactivePillCount: 3, fuelLevelInactivePillCount: 0, buttonCount: 3 } }
            ];

            testCaseList
                // .filter((testCase) => testCase.number === 14)
                .forEach((testCase) => { test(testCase); });
        });
    });

    describe('Account And Contract Layout On Bills Page', () => {

        let path = 'bills';

        let DashboardMockDefaults = {
            'sitecore:file': 'e2e-content',
            'accounts/list:file': 'e2e-1xAccount-1xContract',
            'syncdata/start:file': 'e2e-mocked',
            'syncdata/status:file': 'e2e-complete_success',
            'dashboard:file': 'e2e-contractDetails',
            'pendingpayments:file': 'e2e-noPendingPayments',
            'payments:file': 'payments',
            'bills:file': 'e2e-billHistory_Empty'
        };

        let testLayout = (mockScenario: string) => {
            for (let screenSize of e2e.allScreenSizes) {
                it(`should see Contract Information in contract [${mockScenario}] on [${screenSize}]`, () => {
                    let mockData = (scenarioMockData) => Object.assign({}, DashboardMockDefaults, { 'accounts/list:file': `e2e-${mockScenario}` });
                    e2e.openPage(path, screenSize, mockData({ }));
                    browser.refresh();
                    if (mockScenario === '1xAccount-1xContract') {
                        page.bills.expectfirstContractContainsAccountNumber('Account no: 123 456 789');
                        page.bills.expectfirstContractContains('32 Brewery Ln, North Willoughby, Sydney, NSW 2023');
                        page.bills.expectfirstContractContainsFuelType('Electricity');
                    } else if (mockScenario === '1xAccount-2xContract') {
                        // Verify First Contract Account Details
                        page.bills.expectfirstContractContainsAccountNumber('Account no: 123 456 789');
                        page.bills.expectfirstContractContains('32/102 Cook St, Parramatta, Sydney, NSW 2150');
                        page.bills.expectfirstContractContainsFuelType('Gas');
                        // // Verify Second Contract Account Details
                        page.bills.expectSecondContractContainsAccountNumber('Account no: 123 456 789');
                        page.bills.expectSecondContractContains('32 Brewery Ln, North Willoughby, Sydney, NSW 2023');
                        page.bills.expectSecondContractContainsFuelType('Electricity');
                    } else if (mockScenario === '2xAccount-2xContract-2xContract_Grouped') {
                        page.bills.expectfirstContractContainsAccountNumber('Account no: 123 456 789');
                        page.bills.expectfirstContractContains('32 Brewery Ln, North Willoughby, Sydney, NSW 2023');
                        page.bills.expectfirstContractContainsFuelType('Electricity');
                        page.bills.expectSecondContractContainsAccountNumber('Account no: 123 456 789');
                        page.bills.expectSecondContractContains('32/102 Cook St, Parramatta, Sydney, NSW 2150');
                        page.bills.expectSecondContractContainsFuelType('Electricity');
                    }
                });
            }
        };
        testLayout('1xAccount-1xContract');
        testLayout('1xAccount-2xContract');
        testLayout('2xAccount-2xContract-2xContract_Grouped');
    });
});
