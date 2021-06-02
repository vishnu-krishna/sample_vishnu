import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { Mock } from 'ts-mocks';

// Load the implementations that should be tested
import { ConfigService } from '../../shared/service/config.service';
import { IProductApiService } from '../../shared/service/contract/iproductApi.service';
import { Now } from '../../shared/service/now.service';
import { RedLineApiService } from '../../shared/service/redLineApi.service';
import { ModalService } from '../modal/modal.service';
import { BillViewModel, ContractViewModel } from '../services/account.service';
import { EventService } from '../services/event.service';
import { PaymentService } from '../services/payment.service';
import { EnergyInsightsService } from '../services/energyInsights.service';
import { MockEnergyInsightsService } from '../services/mock/energyInsights.mock.service';
import { BillHistoryComponent } from './billhistory.component';
import { BillDescriptionService } from '../services/billDescription.service';
import { InstalmentPlanData } from '../services/paymentScheme/instalmentPlan.service';
import { PaymentAssistancePlanInstalmentsModel } from '../pages/bills/paymentAssistance/plan/instalments';
import { InstalmentPlanBillingBuilder } from './../pages/bills/billPanel/test/instalmentPlanBillingBuilder';
import { ContractViewModelBuilder } from './../../shared/component/paymentArrangement/test/contractViewModelBuilder';

describe('BillHistory', () => {
    let fixture: ComponentFixture<BillHistoryComponent>;
    let comp: BillHistoryComponent;

    beforeEach(() => {
        let mockBillDescriptionService = new Mock<BillDescriptionService>();
        mockBillDescriptionService.setup((m) => m.nextBillIssuedIn).is(() => 'dummy nextBillIssuedIn value');

        TestBed.configureTestingModule({
            declarations: [
                BillHistoryComponent,
            ],
            imports: [
                HttpModule,
                RouterTestingModule,
            ],
            providers: [
                ModalService,
                EventService,
                RedLineApiService,
                ConfigService,
                PaymentService,
                IProductApiService,
                { provide: BillDescriptionService, useValue: mockBillDescriptionService.Object },
                { provide: 'AppContentBranch' },
                { provide: EnergyInsightsService, useClass: MockEnergyInsightsService },
            ]
        });

        fixture = TestBed.createComponent(BillHistoryComponent);
        comp = fixture.componentInstance;
    });

    describe('When number of bills is 0', () => {
        it('should show when the next bill is issued (in days)', async(() => {
            // ARRANGE
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
            let billsInTotal = 0;
            testModel.bills = new Array<BillViewModel>();
            for (let count = 0; count < billsInTotal; count++ ) {
                testModel.bills.push(new BillViewModel(0, 0, null, null, false, false, 'Paid', null, null));
            }
            comp.contract = testModel;
            // ACT
            comp.ngOnInit();
            // ASSERT
            expect(comp.thereAreNoBills()).toBeTruthy();
        }));
    });

    describe('When number of bills is 3 or less', () => {
        it('should not show "See More" button or "No more bills" message', async(() => {
            // ARRANGE
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
            let billsInTotal = 3;
            testModel.bills = new Array<BillViewModel>();
            for (let count = 0; count < billsInTotal; count++ ) {
                testModel.bills.push(new BillViewModel(0, 0, null, null, false, false, 'Paid', null, null));
            }
            comp.contract = testModel;
            // ACT
            comp.ngOnInit();
            // ASSERT
            // Show more button Div disappears, message is nested within.
            expect(comp.showMoreBillsButton()).toBeFalsy();
        }));
    });

    describe('When number of bills is 4 or more', () => {
        // Creating multiple bill total scenarios;
        let totalBillsScenario = [4, 15, 26];
        function addTest(totalBills) {
            let testName = 'should replace "See More" button with "No more bills" message when all ' + totalBills + ' bills are displayed';
            it(testName, async(() => {
                // ARRANGE
                let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
                let billsInTotal = totalBills;
                testModel.bills = new Array<BillViewModel>();
                for (let count = 0; count < billsInTotal; count++ ) {
                    testModel.bills.push(new BillViewModel(0, 0, null, null, false, false, 'Paid', null, null));
                }
                comp.contract = testModel;
                // ACT
                comp.ngOnInit();
                comp.showMoreBills();
                comp.showMoreBills();
                comp.showMoreBills();
                // ASSERT
                expect(comp.showMoreBillsButton()).toBeTruthy();
                expect(comp.loadAllBills).toBeTruthy();
            }));
        }
        for (let totalBills of totalBillsScenario) {
            addTest(totalBills);
        }
    });

    describe('When "Show More" button is clicked', () => {
        it('should show a full page of bills', async(() => {
            // ARRANGE
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
            let billsPerPage = comp.billsPerPage;
            testModel.bills = new Array<BillViewModel>();
            for (let count = 0; count < billsPerPage; count++ ) {
                testModel.bills.push(new BillViewModel(0, 0, null, null, false, false, 'Paid', null, null));
            }
            comp.contract = testModel;
            // ACT
            comp.ngOnInit();
            comp.showMoreBills();
            // ASSERT
            let expectedHeight = billsPerPage * comp.billWidgetHeight;
            expect(comp.height).toEqual(expectedHeight);
        }));

        it('should show all bills when "See More" button is clicked at least twice', async(() => {
            // ARRANGE
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
            let billsPerPage = comp.billsPerPage;
            let billsInTotal = billsPerPage * 1.5;
            testModel.bills = new Array<BillViewModel>();
            for (let count = 0; count < billsInTotal; count++ ) {
                testModel.bills.push(new BillViewModel(0, 0, null, null, false, false, 'Paid', null, null));
            }
            comp.contract = testModel;
            // ACT
            comp.ngOnInit();
            comp.showMoreBills();
            comp.showMoreBills();
            // ASSERT
            let expectedHeight = billsInTotal * comp.billWidgetHeight;
            expect(comp.height).toEqual(expectedHeight);
        }));
    });

    describe('When bill is in credit', () => {
        it('should show amount in credit', async(() => {
            // ARRANGE
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
            let billsInTotal = 1;
            testModel.bills = new Array<BillViewModel>();
            for (let count = 0; count < billsInTotal; count++ ) {
                testModel.bills.push(new BillViewModel(-10, -10, null, null, true, false, 'Paid', null, null));
            }
            comp.contract = testModel;
            // ACT
            comp.ngOnInit();
            comp.setBills(testModel.bills, 1);
            let filteredBills = comp.filteredBills[0];
            // ASSERT
            expect(comp.filteredBills).toBeDefined();
            expect(filteredBills.isInCredit).toBeTruthy();
        }));
    });

    describe('When bill smoothing is turned on', () => {
        it('should not show bill status', async(() => {
            // ARRANGE
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
            testModel.isBillSmoothing = true;
            testModel.isBillSmoothingV2 = true;

            let billsInTotal = 2;
            testModel.bills = new Array<BillViewModel>();
            for (let count = 0; count < billsInTotal; count++ ) {
                testModel.bills.push(new BillViewModel(-10, -10, null, null, true, false, '', null, null));
            }
            comp.contract = testModel;
            // // ACT
            comp.ngOnInit();
            let bill1 = comp.filteredBills[0];
            let bill2 = comp.filteredBills[1];
            // // ASSERT
            expect(bill1.billStatus).toBeFalsy();
            expect(bill2.billStatus).toBeFalsy();
        }));

        it('should show bill smoothing statement', async(() => {
            // ARRANGE
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
            testModel.isBillSmoothing = true;
            testModel.isBillSmoothingV2 = true;

            let billsInTotal = 2;
            testModel.bills = new Array<BillViewModel>();
            for (let count = 0; count < billsInTotal; count++ ) {
                testModel.bills.push(new BillViewModel(-10, -10, null, null, true, false, '', null, null));
            }

            // // ACT
            const showStatement = testModel.isBillSmoothingV2;

            // // ASSERT
            expect(showStatement).toBeTruthy();
        }));
    });

    describe('When "Total to pay" <= 0', () => {
        it('should show all bill status as "Paid"', async(() => {
            // ARRANGE
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
            testModel.currentBalance = -10;
            testModel.paymentOverdue = 0;

            let billsInTotal = 3;
            testModel.bills = new Array<BillViewModel>();
            for (let count = 0; count < billsInTotal; count++ ) {
                testModel.bills.push(new BillViewModel(5, 6, null, null, true, false, '', null, null));
            }
            comp.contract = testModel;
            // // ACT
            comp.ngOnInit();
            let bill1 = comp.filteredBills[0];
            let bill2 = comp.filteredBills[1];
            let bill3 = comp.filteredBills[2];
            // // ASSERT
            expect(bill1.billStatus).toBe('Paid');
            expect(bill2.billStatus).toBe('Paid');
            expect(bill3.billStatus).toBe('Paid');
        }));
    });

    describe('When "Total to pay" <= the latest bill', () => {
        it('should show "Pay now" for the latest bill and "Paid" for the rest', async(() => {
            // ARRANGE
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
            testModel.currentBalance = 10;
            testModel.paymentOverdue = 0;

            // let billsInTotal = 3;
            testModel.bills = new Array<BillViewModel>();
            for (let count = 0; count < 1; count++ ) {
                testModel.bills.push(new BillViewModel(10, 10, null, null, true, false, '', null, null));
            }
            for (let count = 0; count < 2; count++ ) {
                testModel.bills.push(new BillViewModel(20, 10, null, null, true, false, '', null, null));
            }
            comp.contract = testModel;
            // // ACT
            comp.ngOnInit();
            let bill1 = comp.filteredBills[0];
            let bill2 = comp.filteredBills[1];
            let bill3 = comp.filteredBills[2];
            // // ASSERT
            expect(bill1.billStatus).toBe('Pay now');
            expect(bill2.billStatus).toBe('Paid');
            expect(bill3.billStatus).toBe('Paid');
        }));
    });

    describe('When "Total to pay" > the latest bill', () => {
        it('should show not show any bill status', async(() => {
            // ARRANGE
            let testModel = new ContractViewModel('111111111', new Array<BillViewModel>());
            testModel.currentBalance = 10;
            testModel.paymentOverdue = 0;

            let billsInTotal = 3;
            testModel.bills = new Array<BillViewModel>();
            for (let count = 0; count < billsInTotal; count++ ) {
                testModel.bills.push(new BillViewModel(8, 10, null, null, true, false, '', null, null));
            }
            comp.contract = testModel;
            // // ACT
            comp.ngOnInit();
            let bill1 = comp.filteredBills[0];
            let bill2 = comp.filteredBills[1];
            let bill3 = comp.filteredBills[2];
            // // ASSERT
            expect(bill1.billStatus).toBe('');
            expect(bill2.billStatus).toBe('');
            expect(bill3.billStatus).toBe('');
        }));
    });

    describe('when on instalment plan', () => {
        const contractAccountNumber = 1;
        const contractNumber = 2;

        const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;

        it('should hide bill status', () => {
            // Arrange
            const instalmentPlanBilling = new InstalmentPlanBillingBuilder()
                .build();

            const instalmentPan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);

            let contract = new ContractViewModelBuilder(contractAccountNumber, contractNumber)
                .withInstalmentPlan(instalmentPan)
                .build();

            contract.bills.push(new BillViewModel(40, 30, null, null, true, false, '', null, null));
            contract.currentBalance = 20;
            contract.paymentOverdue = 10;

            comp.contract = contract;

            // Act
            comp.ngOnInit();

            // Assert
            const actualBill = comp.filteredBills[0];

            expect(actualBill.billStatus).toBe('');
        });
    });

});
