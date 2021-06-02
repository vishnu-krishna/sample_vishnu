import { ContractViewModel, BillViewModel } from './../../../../services/account.service';
import { DebugElement } from '@angular/core/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';
import { BillPanelInstalmentPlanBillPeriodComponent } from './instalmentPlanBillPeriod.component';
import { BillPanelInstalmentPlanBillPeriodModule } from './instalmentPlanBillPeriod.module';
import { InstalmentPlanBilling, InstalmentPlanData } from '../../../../services/paymentScheme/instalmentPlan.service';
import { InstalmentPlanBillingBuilder } from '../test';
import { PaymentAssistancePlanInstalmentsModel } from '../../paymentAssistance/plan/instalments';
import { NowMock } from '../../../../services/mock';
import { Now } from '../../../../../shared/service/now.service';

describe('Bill Panel Instalment Plan Bill Period Component', () => {

    let fixture: ComponentFixture<BillPanelInstalmentPlanBillPeriodComponent>;
    let comp: BillPanelInstalmentPlanBillPeriodComponent;
    let de: DebugElement;

    // Mock dates
    const dueDateDaysInFuture = 5;
    const nowMock: NowMock = new NowMock('');
    nowMock.setDate(2018, 3, 23);
    const startDate = nowMock.date().toDate();
    const endDate = moment(startDate).add(1, 'days').toDate();
    const dueDate = moment(startDate).add(dueDateDaysInFuture, 'days').toDate();
    const startDateAsString = moment(startDate).format('DD MMM');
    const endDateAsString = moment(endDate).format('DD MMM YYYY');
    const dueDateAsString = moment(dueDate).format('ddd DD MMM YYYY');

    const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;
    let contract: ContractViewModel;
    const instalmentPlanBilling = new InstalmentPlanBillingBuilder().build();

    const newCharges = 0;
    const totalDue = 0;
    const paymentTotal = 500;
    const projectedBill = 70.12;

    const bills = [new BillViewModel(newCharges, totalDue, startDate, dueDate, true, false, '', startDate, endDate)];

    // CSS Selectors
    const componentSelector = By.css('.bill-panel-instalment-plan-bill-period');
    const openBillPeriodRangeSelector = By.css('.bill-panel-instalment-plan-bill-period__open-bill--period-range');
    const openBillPeriodDaysToGoSelector = By.css('.bill-panel-instalment-plan-bill-period__open-bill--period--days-to-go');
    const openBillNewBillIssuedSelector = By.css('.bill-panel-instalment-plan-bill-period__open-bill--new-bill-issued');
    const noOpenBillPeriodRangeSelector = By.css('.bill-panel-instalment-plan-bill-period__no-open-bill--period-range');
    const noOpenBillPeriodDaysToGoSelector = By.css('.bill-panel-instalment-plan-bill-period__no-open-bill--period--days-to-go');
    const noOpenBillBillProjectionSelector = By.css('.bill-panel-instalment-plan-bill-period__no-open-bill--bill-projection');

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                BillPanelInstalmentPlanBillPeriodModule
            ],
            providers: [
                { provide: Now, useValue: nowMock },
                { provide: 'AppContentBranch', useValue: 'selfService' }
            ]
        });

        fixture = TestBed.createComponent(BillPanelInstalmentPlanBillPeriodComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        contract = new ContractViewModel();
        contract.currentBillStartDate = startDate;
        contract.currentBillEndDate = endDate;

        contract.instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);

    });

    describe('getInstalmentPlan()', () => {

        describe('returns an instalment plan', () => {

            it('should populate the instalmentPlan property', () => {
                // ARRANGE
                comp.contract = contract;

                // ACT
                fixture.detectChanges();

                // ASSERT
                expect(comp.instalmentPlan).toBeDefined();
            });

            it('should display the component', () => {
                // ARRANGE
                comp.contract = contract;

                // ACT
                fixture.detectChanges();

                // ASSERT
                const componentElement = de.query(componentSelector);
                expect(componentElement).toBeDefined();
            });

            it('should populate the contract get property', () => {
                // ARRANGE
                comp.contract = contract;

                // ACT
                fixture.detectChanges();

                // ASSERT
                expect(comp.contract).toEqual(contract);
            });

            describe('and has a newest bill', () => {

                beforeEach(() => {
                    contract.bills = bills;
                    contract.paymentTotal = paymentTotal;
                    comp.contract = contract;
                    fixture.detectChanges();
                });

                it('should populate the newestBill property', () => {
                    // ASSERT
                    expect(comp.newestBill).toBeDefined();
                });

                describe('range element', () => {
                    const rangeCopy = `${startDateAsString} to ${endDateAsString}`;
                    it(`should display '${rangeCopy}'`, () => {
                        // ASSERT
                        const openBillPeriodRangeElement = de.query(openBillPeriodRangeSelector);
                        expect(openBillPeriodRangeElement.nativeElement.textContent).toBe(rangeCopy);
                    });
                });

                describe('days to go element', () => {
                    const daysToGoCopy = `Due in ${dueDateDaysInFuture} days`;
                    it(`should display '${daysToGoCopy}'`, () => {
                        // ASSERT
                        const openBillPeriodDaysToGoElement = de.query(openBillPeriodDaysToGoSelector);
                        expect(openBillPeriodDaysToGoElement.nativeElement.textContent).toBe(daysToGoCopy);
                    });
                });

                describe('new bill issued element', () => {

                    const newBillIssuedCopy = `You've had a new bill issued. You just need to pay each instalment as planned, and be aware that the new bill of $${paymentTotal - instalmentPlanBilling.totalInstalmentPlanOwingBalance} will be due by ${dueDateAsString}, after your final instalment.`;
                    it(`should display '${newBillIssuedCopy}'`, () => {
                        // ACT
                        fixture.detectChanges();

                        // ASSERT
                        const openBillNewBillIssuedElement = de.query(openBillNewBillIssuedSelector);
                        expect(openBillNewBillIssuedElement.nativeElement.textContent.trim()).toBe(newBillIssuedCopy);
                    });

                });

            });

            describe('and does not have a newest bill', () => {

                beforeEach(() => {
                    // ARRANGE
                    spyOn(contract, 'getNewestBill').and.returnValue(null);
                    contract.paymentTotal = 0;
                    comp.contract = contract;

                    // ACT
                    fixture.detectChanges();
                });

                describe('range element', () => {
                    const rangeCopy = `${startDateAsString} to ${endDateAsString}`;
                    it(`should display '${rangeCopy}'`, () => {
                        // ASSERT
                        const noOpenBillPeriodRangeElement = de.query(noOpenBillPeriodRangeSelector);
                        expect(noOpenBillPeriodRangeElement.nativeElement.textContent).toBe(rangeCopy);
                    });
                });

                describe('days to go element', () => {

                    describe('contract.currentBillDaysUntilDue > 0', () => {
                        const daysToGoCopy = `${dueDateDaysInFuture} days to go`;
                        it(`should display '${daysToGoCopy}'`, () => {
                            // ARRANGE
                            spyOnProperty(comp.contract, 'currentBillDaysUntilDue').and.returnValue(dueDateDaysInFuture);

                            // ACT
                            fixture.detectChanges();

                            // ASSERT
                            const noOpenBillPeriodDaysToGoElement = de.query(noOpenBillPeriodDaysToGoSelector);
                            expect(noOpenBillPeriodDaysToGoElement.nativeElement.textContent).toBe(daysToGoCopy);
                        });
                    });

                    describe('contract.currentBillDaysUntilDue <= 0', () => {
                        it(`should not be populated`, () => {
                            // ARRANGE
                            spyOnProperty(comp.contract, 'currentBillDaysUntilDue').and.returnValue(0);

                            // ACT
                            fixture.detectChanges();

                            // ASSERT
                            const noOpenBillPeriodDaysToGoElement = de.query(noOpenBillPeriodDaysToGoSelector);
                            expect(noOpenBillPeriodDaysToGoElement).toBeNull();
                        });
                    });

                });

                describe('bill projection element', () => {
                    describe('when contract.isSmartMeter', () => {

                        describe('is true', () => {
                            const isSmartMeterCopy = `Bill projection $${projectedBill}`;
                            it(`should display '${isSmartMeterCopy}'`, () => {
                                // ARRANGE
                                comp.contract.isSmartMeter = true;
                                comp.contract.projectedBill = projectedBill;

                                // ACT
                                fixture.detectChanges();

                                // ASSERT
                                const noOpenBillBillProjectionElement = de.query(noOpenBillBillProjectionSelector);
                                expect(noOpenBillBillProjectionElement.nativeElement.textContent).toBe(isSmartMeterCopy);
                            });
                        });

                        describe('is false', () => {
                            it(`should not be populated`, () => {
                                // ASSERT
                                const noOpenBillBillProjectionElement = de.query(noOpenBillBillProjectionSelector);
                                expect(noOpenBillBillProjectionElement).toBeNull();
                            });
                        });

                    });
                });

            });
        });

        describe('does not return an instalment plan', () => {

            it('should not display the component', () => {
                // ASSERT
                const componentElement = de.query(componentSelector);
                expect(componentElement).toBeNull();
            });

        });
    });

});
