import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { BillDateModule } from './billDate.module';
import { BillDateComponent, Pill, PillType } from './billDate.component';
import { FeatureFlagService, FeatureFlagTypes } from '../../../../services/featureFlag.service';
import { FeatureFlagMockService } from '../../../../services/mock';
import { BillPanelTestDataBuilder } from '../billPanelTestDataBuilder';
import { Mock } from 'ts-mocks';
import { BillDescriptionService } from '../../../../services/billDescription.service';
import * as moment from 'moment';

describe('Bill Date Component', () => {
    const expectedPaymentMethodDueInDays = 'due in 1234 test days';
    let comp: BillDateComponent;
    let fixture: ComponentFixture<BillDateComponent>;
    let featureFlagSpy: jasmine.Spy;

    beforeEach(() => {
        let mockBillDescriptionService = new Mock<BillDescriptionService>();
        mockBillDescriptionService.setup((m) => m.paymentMethodDueInDays)
                                  .is(() => Observable.of(expectedPaymentMethodDueInDays));
        mockBillDescriptionService.setup((m) => m.dateRangeDescription)
                                  .is((from: Date, to: Date) => `mocked: ${moment(from).format('DD MMM')} to ${moment(to).format('DD MMM YYYY')}`);

        TestBed.configureTestingModule({
            imports: [
                BillDateModule
            ],
            providers: [
                { provide: FeatureFlagService, useClass: FeatureFlagMockService },
                { provide: BillDescriptionService, useValue: mockBillDescriptionService.Object }
            ]
        });

        fixture = TestBed.createComponent(BillDateComponent);
        comp = fixture.componentInstance;

        let featureFlagMockService = fixture.debugElement.injector.get(FeatureFlagService);
        featureFlagSpy = spyOn(featureFlagMockService, 'featureFlagged');
    });

    function assertComponentProperties(dateRangeDescription: string, pill: Pill) {
        expect(comp.isVisible).toBe(true, 'isVisible');
        expect(comp.dateRangeDescription).toBe(dateRangeDescription, 'dateRangeDescription');
        if (pill) {
            expect(comp.pill.pillType).toBe(pill.pillType, 'pill type');
            expect(comp.pill.text).toBe(pill.text, 'pill text');
        } else {
            expect(comp.pill.pillType).toBe(PillType.hidden, 'pill type');
            expect(comp.pill.text).toBe('', 'pill text');
        }
    }

    beforeEach(() => {
        featureFlagSpy.and.callFake((arg) => {
            return Observable.of(arg === FeatureFlagTypes.payOnTimeDiscountFixEnabled);
        });
        comp.showPill = true;
    });

    describe('when bill is due', () => {
        describe('and not on direct debit', () => {
            it('should be visible with due date pill', () => {
                BillPanelTestDataBuilder.create()
                                        .whenBillIsDue(51.70)
                                        .andHasNewestBillBetweenDates(new Date(2017, 1, 1), new Date(2017, 1, 28))
                                        .assignTo((t) => comp.type = t, (c) => comp.contract = c);

                fixture.detectChanges();

                assertComponentProperties('mocked: 01 Feb to 28 Feb 2017', new Pill(PillType.notDirectDebit, expectedPaymentMethodDueInDays));
            });
        });

        describe('and on direct debit', () => {
            beforeEach(() => {
                BillPanelTestDataBuilder.create()
                                        .whenBillIsDue(55.70)
                                        .andHasNewestBillBetweenDates(new Date(2018, 3, 1), new Date(2018, 3, 30))
                                        .andOnDirectDebit()
                                        .assignTo((t) => comp.type = t, (c) => comp.contract = c);
            });

            it('should be visible with debited date pill', () => {
                fixture.detectChanges();

                assertComponentProperties('mocked: 01 Apr to 30 Apr 2018', new Pill(PillType.directDebit, expectedPaymentMethodDueInDays));
            });

            it('should display all expected dom elements when show pill is true', () => {
                comp.showPill = true;
                fixture.detectChanges();

                expect(comp.isVisible).toBe(true);

                expect(fixture.nativeElement.querySelector('.bill-date__heading').textContent).toBe('Bill period');
                expect(fixture.nativeElement.querySelector('.bill-date__details-date-range').textContent).toBe('mocked: 01 Apr to 30 Apr 2018');

                let pillElement = fixture.nativeElement.querySelector('.bill-date__details-pill');
                expect(pillElement.textContent).toContain(expectedPaymentMethodDueInDays);
            });

            it('should not display the pill text when show pill is false', () => {
                comp.showPill = false;
                fixture.detectChanges();

                expect(comp.isVisible).toBe(true);

                let pillElement = fixture.nativeElement.querySelector('.bill-date__details-pill');
                expect(pillElement).toBeFalsy('bill-date__details-pill');
            });
        });

        it('isVisible should be false if no bills are loaded (not an expected scenario)', () => {
            BillPanelTestDataBuilder.create()
                                    .whenBillIsDue(51.70)
                                    .butHasNoBillsIssued() // Not an expected scenario but we need to check the component handles it gracefully
                                    .assignTo((t) => comp.type = t, (c) => comp.contract = c);

            fixture.detectChanges();

            expect(comp.isVisible).toBe(false);
        });
    });

    describe('when overdue but no new bill issued', () => {
        it('should be visible with overdue pill', () => {
            BillPanelTestDataBuilder.create()
                                    .whenOverdue(10.22)
                                    .andHasNewestBillBetweenDates(new Date(2018, 3, 1), new Date(2018, 3, 30))
                                    .assignTo((t) => comp.type = t, (c) => comp.contract = c);

            fixture.detectChanges();

            assertComponentProperties('mocked: 01 Apr to 30 Apr 2018', new Pill(PillType.overdue, 'Overdue'));
        });
    });

    describe('when overdue and new bill issued', () => {
        it('should be visible with no pill', () => {
            BillPanelTestDataBuilder.create()
                                    .whenOverdue(13.22)
                                    .andHasNewestBillBetweenDates(new Date(2018, 3, 1), new Date(2018, 3, 30))
                                    .andNewBillIsIssued(55.70)
                                    .assignTo((t) => comp.type = t, (c) => comp.contract = c);

            fixture.detectChanges();

            // The pill should not be displayed as the bill dates are for the latest bill
            assertComponentProperties('mocked: 01 Apr to 30 Apr 2018', null);
        });
    });

    describe('when payment extension applied', () => {
        describe('and not on direct debit', () => {
            it('should be visible with due date pill', () => {
                BillPanelTestDataBuilder.create()
                                        .whenBillIsDue(55.70)
                                        .andHasNewestBillBetweenDates(new Date(2018, 3, 1), new Date(2018, 3, 30))
                                        .andHasPaymentExtension(new Date(2030, 1, 1))
                                        .assignTo((t) => comp.type = t, (c) => comp.contract = c);

                fixture.detectChanges();

                assertComponentProperties('mocked: 01 Apr to 30 Apr 2018', new Pill(PillType.notDirectDebit, expectedPaymentMethodDueInDays));
            });
        });

        describe('and on direct debit', () => {
            it('should be visible with debited date pill', () => {
                BillPanelTestDataBuilder.create()
                                        .whenBillIsDue(55.70)
                                        .andHasNewestBillBetweenDates(new Date(2018, 3, 1), new Date(2018, 3, 30))
                                        .andHasPaymentExtension(new Date(2030, 1, 1))
                                        .andOnDirectDebit()
                                        .assignTo((t) => comp.type = t, (c) => comp.contract = c);
                fixture.detectChanges();

                assertComponentProperties('mocked: 01 Apr to 30 Apr 2018', new Pill(PillType.directDebit, expectedPaymentMethodDueInDays));
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
            comp.showPill = false;

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

    // TODO: remove these tests once the payOnTimeDiscountFixEnabled feature flag is removed
    describe('when pay on time discount feature flag', () => {
        beforeEach(() => {
            // scenario that shows the component when the feature flag is on (bill is due)
            BillPanelTestDataBuilder.create()
                                    .whenBillIsDue(51.70)
                                    .andHasNewestBillBetweenDates(new Date(2017, 1, 1), new Date(2017, 1, 28))
                                    .assignTo((t) => comp.type = t, (c) => comp.contract = c);
        });

        it('is on then isVisible should be true', () => {
            featureFlagSpy.and.callFake((arg) => {
                return Observable.of(arg === FeatureFlagTypes.payOnTimeDiscountFixEnabled);
            });

            fixture.detectChanges();

            expect(comp.isVisible).toBe(true);
        });

        it('if off then isVisible should be false', () => {
            featureFlagSpy.and.callFake((arg) => {
                return Observable.of(arg !== FeatureFlagTypes.payOnTimeDiscountFixEnabled);
            });

            fixture.detectChanges();

            expect(comp.isVisible).toBe(false);
        });
    });
});
