import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { FeatureFlagService, FeatureFlagTypes } from '../../../../services/featureFlag.service';
import { FeatureFlagMockService } from '../../../../services/mock';
import { BillPanelTestDataBuilder } from '../billPanelTestDataBuilder';
import { PaymentAssistancePlanInstalmentsModel } from '../../paymentAssistance/plan/instalments';
import { InstalmentPlanBillingBuilder } from './../test/instalmentPlanBillingBuilder';
import { InstalmentPlanData, InstalmentPlanBilling } from './../../../../services/paymentScheme/instalmentPlan.service';
import { BillBreakdownModule } from './billBreakdown.module';
import { BillBreakdownComponent } from './billBreakdown.component';

describe('Bill Breakdown Component', () => {
    let comp: BillBreakdownComponent;
    let fixture: ComponentFixture<BillBreakdownComponent>;
    let featureFlaggedServiceMock: FeatureFlagMockService;

    beforeEach(() => {
        featureFlaggedServiceMock = new FeatureFlagMockService();
        featureFlaggedServiceMock.setFeatureFlags([FeatureFlagTypes.payOnTimeDiscountFixEnabled, FeatureFlagTypes.paymentAssistanceEnabled]);

        TestBed.configureTestingModule({
            imports: [
                BillBreakdownModule
            ],
            providers: [
                { provide: FeatureFlagService, useValue: featureFlaggedServiceMock },
            ]
        });

        fixture = TestBed.createComponent(BillBreakdownComponent);
        comp = fixture.componentInstance;
    });

    function assertBreakdownLine(lineIdx: number, description: string, value: number, isWarning: boolean = false, pillText: string = '') {
        expect(comp.isVisible).toBe(true);
        expect(comp.breakdown[lineIdx].description).toBe(description, 'description');
        expect(comp.breakdown[lineIdx].value).toBe(value, 'value');
        expect(comp.breakdown[lineIdx].isWarning).toBe(isWarning, 'isWarning');
        expect(comp.breakdown[lineIdx].pillText).toBe(pillText, 'pillText');
    }

    describe('when bill is due', () => {
        it('isVisible should be false', () => {
            BillPanelTestDataBuilder.create()
                                    .whenBillIsDue(51.70)
                                    .assignTo((t) => comp.type = t, (c) => comp.contract = c);

            fixture.detectChanges();

            expect(comp.isVisible).toBe(false);
        });

        describe('and pay on time discount applicable', () => {
            let testBuilder: BillPanelTestDataBuilder;
            let expectedCurrentBalance: number;

            beforeEach(() => {
                testBuilder = BillPanelTestDataBuilder.create()
                                                      .whenBillIsDue(55.70)
                                                      .andHasPayOnTimeDiscount(10.15);

                expectedCurrentBalance = 55.70 + 10.15;
            });

            it('should contain \'Current balance\' and \'potd\' values', () => {
                testBuilder.assignTo((t) => comp.type = t, (c) => comp.contract = c);

                fixture.detectChanges();

                expect(comp.breakdown.length).toBe(2);
                assertBreakdownLine(0, 'Current balance', expectedCurrentBalance);
                assertBreakdownLine(1, 'Pay on time discount', -10.15);
            });

            describe('but pay on time discount details cannot be calculated (by the api)', () => {
                it('isVisible should be false', () => {
                    testBuilder.butCurrentBalanceExcludingPOTDAmountCannotBeCalculated()
                               .assignTo((t) => comp.type = t, (c) => comp.contract = c);

                    fixture.detectChanges();

                    expect(comp.isVisible).toBe(false);
                });
            });
        });
    });

    describe('when overdue but no new bill issued', () => {
        it('isVisible should be false', () => {
            BillPanelTestDataBuilder.create()
                                    .whenOverdue(10.22)
                                    .assignTo((t) => comp.type = t, (c) => comp.contract = c);

            fixture.detectChanges();

            expect(comp.isVisible).toBe(false);
        });

        describe('and pay on time discount applicable', () => {
            beforeEach(() => {
                BillPanelTestDataBuilder.create()
                                        .whenOverdue(10.22)
                                        .andHasPayOnTimeDiscount(10.15)
                                        .assignTo((t) => comp.type = t, (c) => comp.contract = c);
            });

            it('should contain \'potd\' missed', () => {
                fixture.detectChanges();

                expect(comp.breakdown.length).toBe(1);
                assertBreakdownLine(0, 'Pay on time discount', 0, false, 'Missed');
            });

            it('should display all expected dom elements', () => {
                fixture.detectChanges();

                expect(comp.isVisible).toBe(true);

                let rows = fixture.nativeElement.querySelectorAll('.bill-breakdown__row');
                expect(rows.length).toBe(1);
                expect(rows[0].querySelector('.bill-breakdown__row-description').textContent).toBe('Pay on time discount');
                expect(rows[0].querySelector('.bill-breakdown__row-value').textContent).toContain('Missed');
            });
        });
    });

    describe('when overdue and new bill issued', () => {
        it('should contain \'Overdue balance\' and \'Current balance\' values', () => {
            BillPanelTestDataBuilder.create()
                                    .whenOverdue(13.22)
                                    .andNewBillIsIssued(55.70)
                                    .assignTo((t) => comp.type = t, (c) => comp.contract = c);

            fixture.detectChanges();

            expect(comp.breakdown.length).toBe(2);
            assertBreakdownLine(0, 'Overdue balance', 13.22, true);
            assertBreakdownLine(1, 'Current balance', 55.70);
        });

        describe('and pay on time discount applicable', () => {
            let testBuilder: BillPanelTestDataBuilder;
            let expectedCurrentBalance: number;

            beforeEach(() => {
                testBuilder = BillPanelTestDataBuilder.create()
                                                      .whenOverdue(13.12)
                                                      .andNewBillIsIssued(55.70)
                                                      .andHasPayOnTimeDiscount(10.88);
                expectedCurrentBalance = 55.70 + 10.88;
            });

            it('should contain \'Overdue balance\', \'Current balance\' and \'potd\' values', () => {
                testBuilder.assignTo((t) => comp.type = t, (c) => comp.contract = c);

                fixture.detectChanges();

                expect(comp.breakdown.length).toBe(3);
                assertBreakdownLine(0, 'Overdue balance', 13.12, true);
                assertBreakdownLine(1, 'Current balance', expectedCurrentBalance);
                assertBreakdownLine(2, 'Pay on time discount', -10.88);
            });

            it('should display all expected dom elements', () => {
                testBuilder.assignTo((t) => comp.type = t, (c) => comp.contract = c);

                fixture.detectChanges();

                expect(comp.isVisible).toBe(true);

                let rows = fixture.nativeElement.querySelectorAll('.bill-breakdown__row');
                expect(rows.length).toBe(3);
                expect(rows[0].querySelector('.bill-breakdown__row-description').textContent).toBe('Overdue balance');
                expect(rows[0].querySelector('.bill-breakdown__row-value').textContent).toContain('$13.12');
                expect(rows[1].querySelector('.bill-breakdown__row-description').textContent).toBe('Current balance');
                expect(rows[1].querySelector('.bill-breakdown__row-value').textContent).toContain(`$${expectedCurrentBalance}`);
                expect(rows[2].querySelector('.bill-breakdown__row-description').textContent).toBe('Pay on time discount');
                expect(rows[2].querySelector('.bill-breakdown__row-value').textContent).toContain('-$10.88');
            });

            describe('but pay on time discount details cannot be calculated (by the api)', () => {
                it('isVisible should be false', () => {
                    testBuilder.butCurrentBalanceExcludingPOTDAmountCannotBeCalculated()
                               .assignTo((t) => comp.type = t, (c) => comp.contract = c);

                    fixture.detectChanges();

                    expect(comp.isVisible).toBe(false);
                });
            });
        });
    });

    describe('when payment extension applied', () => {
        it('isVisible should be false', () => {
            BillPanelTestDataBuilder.create()
            .whenBillIsDue(55.70)
            .andHasPaymentExtension(new Date(2030, 1, 1))
            .assignTo((t) => comp.type = t, (c) => comp.contract = c);

            fixture.detectChanges();

            expect(comp.isVisible).toBe(false);
        });

        describe('and pay on time discount applicable', () => {
            it('should contain \'potd\' missed', () => {
                BillPanelTestDataBuilder.create()
                                        .whenBillIsDue(55.70)
                                        .andHasPaymentExtension(new Date(2030, 1, 1))
                                        .andHasPayOnTimeDiscount(10.88)
                                        .assignTo((t) => comp.type = t, (c) => comp.contract = c);

                fixture.detectChanges();

                expect(comp.breakdown.length).toBe(1);
                assertBreakdownLine(0, 'Pay on time discount', 0, false, 'Missed');
            });
        });
    });

    describe('when on instalment plan', () => {
        describe('and instalment plan is not overdue', () => {
            it('isVisible should be false', () => {
                const instalmentPlanBilling = new InstalmentPlanBillingBuilder().build();
                const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;
                const instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);

                BillPanelTestDataBuilder.create()
                                        .whenBillIsDue(instalmentPlan.billing.totalInstalmentPlanOwingBalance)
                                        .andHasInstalmentPlan(instalmentPlan)
                                        .assignTo((type) => comp.type = type, (contract) => comp.contract = contract);

                fixture.detectChanges();

                expect(comp.isVisible).toBe(false);
            });
        });

        describe('and instalment plan is overdue', () => {
            describe('and there is a next instalment', () => {
                let instalmentPlanBilling: InstalmentPlanBilling;

                beforeEach(() => {
                    instalmentPlanBilling = new InstalmentPlanBillingBuilder()
                        .withOverdueInstalments()
                        .build();

                    const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;
                    const instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);

                    BillPanelTestDataBuilder.create()
                                            .whenBillIsDue(instalmentPlan.billing.totalInstalmentPlanOwingBalance)
                                            .andHasInstalmentPlan(instalmentPlan)
                                            .assignTo((type) => comp.type = type, (contract) => comp.contract = contract);

                    fixture.detectChanges();
                });

                it('isVisible should be true', () => {
                    expect(comp.isVisible).toBe(true);
                });

                it('should contain \'Overdue instalments\' and \'Next instalment\' values', () => {
                    expect(comp.breakdown.length).toBe(2);
                    assertBreakdownLine(0, 'Overdue instalments', instalmentPlanBilling.overdueAmount, true);
                    assertBreakdownLine(1, `Instalment ${instalmentPlanBilling.nextInstalment.index}`, instalmentPlanBilling.nextInstalment.dueAmount);
                });
            });

            describe('and there is no next instalment', () => {
                let instalmentPlanBilling: InstalmentPlanBilling;

                beforeEach(() => {
                    instalmentPlanBilling = new InstalmentPlanBillingBuilder()
                        .withOverdueInstalments()
                        .withoutNextInstalment()
                        .build();

                    const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;
                    const instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);

                    BillPanelTestDataBuilder.create()
                                            .whenBillIsDue(instalmentPlan.billing.totalInstalmentPlanOwingBalance)
                                            .andHasInstalmentPlan(instalmentPlan)
                                            .assignTo((type) => comp.type = type, (contract) => comp.contract = contract);

                    fixture.detectChanges();
                });

                it('isVisible should be true', () => {
                    expect(comp.isVisible).toBe(true);
                });

                it('should contain \'Overdue instalments\' values', () => {
                    expect(comp.breakdown.length).toBe(1);
                    assertBreakdownLine(0, 'Overdue instalments', instalmentPlanBilling.overdueAmount, true);
                });
            });
        });
    });

    describe('when zero balance', () => {
        it('isVisible should be false', () => {
            BillPanelTestDataBuilder.create()
                                    .withZeroBalance()
                                    .assignTo((t) => comp.type = t, (c) => comp.contract = c);

            fixture.detectChanges();

            expect(comp.isVisible).toBe(false);
        });
    });

    describe('when in credit', () => {
        it('isVisible should be false', () => {
            BillPanelTestDataBuilder.create()
                                    .whenInCredit(88.20)
                                    .assignTo((t) => comp.type = t, (c) => comp.contract = c);

            fixture.detectChanges();

            expect(comp.isVisible).toBe(false);
        });
    });

    describe('when on bill smoothing', () => {
        it('isVisible should be false when bill smoothing v1', () => {
            BillPanelTestDataBuilder.create()
                                    .whenOnBillSmoothingV1()
                                    .assignTo((t) => comp.type = t, (c) => comp.contract = c);

            fixture.detectChanges();

            expect(comp.isVisible).toBe(false);
        });

        it('isVisible should be false when bill smoothing v2', () => {
            BillPanelTestDataBuilder.create()
                                    .whenOnBillSmoothingV1()
                                    .assignTo((t) => comp.type = t, (c) => comp.contract = c);

            fixture.detectChanges();

            expect(comp.isVisible).toBe(false);
        });
    });

    // TODO: remove some of these tests once the payOnTimeDiscountFixEnabled feature flag is removed
    describe('when payment assistance feature flag', () => {
        describe('is ON', () => {
            beforeEach(() => {
                featureFlaggedServiceMock.setFeatureFlags([FeatureFlagTypes.paymentAssistanceEnabled]);
            });

            let instalmentPlanBilling: InstalmentPlanBilling;

            describe('and has overdue instalment plan with pay on time discount bill breakdown', () => {
                beforeEach(() => {
                    instalmentPlanBilling = new InstalmentPlanBillingBuilder()
                        .withOverdueInstalments()
                        .build();

                    const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;
                    const instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);

                    BillPanelTestDataBuilder.create()
                                            .whenBillIsDue(55.70)
                                            .andHasPayOnTimeDiscount(10.15)
                                            .andHasInstalmentPlan(instalmentPlan)
                                            .assignTo((t) => comp.type = t, (c) => comp.contract = c);
                });

                it('then isVisible should be true', () => {
                    fixture.detectChanges();

                    expect(comp.isVisible).toBe(true);
                });

                describe('and when pay on time discount feature flag is ON', () => {
                    beforeEach(() => {
                        featureFlaggedServiceMock.setFeatureFlags([FeatureFlagTypes.paymentAssistanceEnabled, FeatureFlagTypes.payOnTimeDiscountFixEnabled]);
                    });

                    it('then should not display pay on time discount', () => {
                        fixture.detectChanges();

                        expect(comp.breakdown.length).toBe(2);
                        assertBreakdownLine(0, 'Overdue instalments', instalmentPlanBilling.overdueAmount, true);
                        assertBreakdownLine(1, `Instalment ${instalmentPlanBilling.nextInstalment.index}`, instalmentPlanBilling.nextInstalment.dueAmount);
                    });
                });
            });
        });

        describe('is OFF', () => {
            describe('and when pay on time discount feature flag is ON', () => {
                beforeEach(() => {
                    featureFlaggedServiceMock.setFeatureFlags([FeatureFlagTypes.payOnTimeDiscountFixEnabled]);
                });

                describe('and when data should warrant displaying bill breakdown', () => {
                    beforeEach(() => {
                        BillPanelTestDataBuilder.create()
                                                .whenBillIsDue(55.70)
                                                .andHasPayOnTimeDiscount(10.15)
                                                .assignTo((t) => comp.type = t, (c) => comp.contract = c);
                    });

                    it('then isVisible should be false ', () => {
                        fixture.detectChanges();

                        expect(comp.isVisible).toBe(false);
                    });
                });
            });
        });
    });
});
