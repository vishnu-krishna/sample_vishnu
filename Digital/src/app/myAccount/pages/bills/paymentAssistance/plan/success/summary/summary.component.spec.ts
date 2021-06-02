import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { PaymentAssistancePlanSuccessModule } from '../paymentAssistancePlanSuccess.module';
import { PaymentAssistancePlanSuccessSummaryComponent } from './summary.component';
import { InstalmentPlanFrequency } from '../../../../../../services/paymentScheme/paymentSchemeApi.service';

describe('Payment Assistance Plan Success Summary Component', () => {
    const totalToPaySelector = By.css(
        '.payment-assistance-plan-success-summary__total-due'
    );
    const instalmentsDueSelector = By.css(
        '.payment-assistance-plan-success-summary__instalments-due'
    );
    const firstInstalmentsDueSelector = By.css(
        '.payment-assistance-plan-success-summary__first-instalment-due'
    );

    const totalDue = 591.2;
    const totalDueFormatted = '$591.20';

    let comp: PaymentAssistancePlanSuccessSummaryComponent;
    let fixture: ComponentFixture<PaymentAssistancePlanSuccessSummaryComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PaymentAssistancePlanSuccessModule]
        });

        fixture = TestBed.createComponent(PaymentAssistancePlanSuccessSummaryComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('Default state', () => {

        it('should set total to pay to 0', () => {
            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(de.query(totalToPaySelector).nativeElement.innerHTML).toBe('$0.00');
        });

        it('should set instalments due to blank', () => {
            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(de.query(instalmentsDueSelector).nativeElement.innerHTML).toBe('');
        });

        it(`should set first instalment due to ''`, () => {
            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(de.query(firstInstalmentsDueSelector).nativeElement.innerHTML).toBe('');
        });

    });

    describe(`Total to pay is ${totalDue} (formatting to 2 decimal places)`, () => {

        it(`should display '${totalDueFormatted}'`, () => {
            // ARRANGE
            comp.summaryModel.totalDue = totalDue;

            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(de.query(totalToPaySelector).nativeElement.innerHTML).toBe(`${totalDueFormatted}`);
        });

    });

    describe('Instalments due', () => {

        describe('Frequency is Weekly and day is a Monday', () => {

            it(`should display 'Weekly on Mondays'`, () => {
                // ARRANGE
                comp.summaryModel = {
                    ...comp.summaryModel,
                    frequency: InstalmentPlanFrequency.Weekly,
                    startDate: new Date('2018-03-19')
                };

                // ACT
                fixture.detectChanges();

                // ASSERT
                expect(de.query(instalmentsDueSelector).nativeElement.innerHTML).toBe('Weekly on Mondays');
            });

        });

        describe('Frequency is Fortnightly and day is a Tuesday', () => {

            it(`should display 'Fortnightly on Tuesdays'`, () => {
                // ARRANGE
                comp.summaryModel = {
                    ...comp.summaryModel,
                    frequency: InstalmentPlanFrequency.Fortnightly,
                    startDate: new Date('2018-03-20')
                };

                // ACT
                fixture.detectChanges();

                // ASSERT
                expect(de.query(instalmentsDueSelector).nativeElement.innerHTML).toBe('Fortnightly on Tuesdays');
            });
        });

        describe('Frequency is Monthly and day is 1st of the month', () => {
            it(`should display 'Monthly on the 1st'`, () => {
                // ARRANGE
                comp.summaryModel = {
                    ...comp.summaryModel,
                    frequency: InstalmentPlanFrequency.Monthly,
                    startDate: new Date('2018-03-01')
                };

                // ACT
                fixture.detectChanges();

                // ASSERT
                expect(de.query(instalmentsDueSelector).nativeElement.innerHTML).toBe('Monthly on the 1st');
            });
        });

        describe('Frequency is Monthly and day is the 23rd of the month', () => {
            it(`should display 'Monthly on the 23rd'`, () => {
                // ARRANGE
                comp.summaryModel = {
                    ...comp.summaryModel,
                    frequency: InstalmentPlanFrequency.Monthly,
                    startDate: new Date('2018-03-23')
                };

                // ACT
                fixture.detectChanges();

                // ASSERT
                expect(de.query(instalmentsDueSelector).nativeElement.innerHTML).toBe('Monthly on the 23rd');
            });
        });

    });

    describe('First instalment due', () => {

        describe('is today', () => {
            it(`should display 'Today'`, () => {
                // ARRANGE
                comp.summaryModel.firstInstalmentDue = new Date();

                // ACT
                fixture.detectChanges();

                // ASSERT
                expect(de.query(firstInstalmentsDueSelector).nativeElement.innerHTML).toBe('Today');
            });
        });

        describe('is not today (01/01/2000)', () => {
            it(`should display 'Sat 01 Jan 2000'`, () => {
                // ARRANGE
                comp.summaryModel.firstInstalmentDue = new Date('2000-01-01');

                // ACT
                fixture.detectChanges();

                // ASSERT
                expect(de.query(firstInstalmentsDueSelector).nativeElement.innerHTML).toBe('Sat 01 Jan 2000');
            });
        });
    });
});
