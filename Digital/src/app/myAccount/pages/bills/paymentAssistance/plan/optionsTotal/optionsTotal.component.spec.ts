import { element } from 'protractor';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import * as moment from 'moment';

import { PaymentAssistancePlanOptionsTotalModule } from './optionsTotal.module';
import { PaymentAssistancePlanOptionsTotalComponent } from './optionsTotal.component';
import { MauiFuelChipFuelType } from '../../../../../maui/fuelChip';
import { Now } from '../../../../../../shared/service/now.service';
import { NowMock } from '../../../../../services/mock/now.mock.service';

describe('Payment Assistance Plan Options Total Component', () => {
    let comp: PaymentAssistancePlanOptionsTotalComponent;
    let fixture: ComponentFixture<PaymentAssistancePlanOptionsTotalComponent>;
    let de: DebugElement;

    const nowMock: NowMock = new NowMock('');

    const totalAmountToPaySelector = By.css('.payment-assistance-plan-options-total__row-total-amount-due');
    const tipSelector = By.css('.payment-assistance-plan-options-total__tip');

    const amount = 100;
    const amountFormatted = '$100.00';
    const today = nowMock.date().toDate();
    const todayMinus2Days = moment(today).add(-2, 'days').toDate();
    const yesterday = moment(today).add(-1, 'days').toDate();
    const tomorrow = moment(today).add(1, 'days').toDate();
    const todayPlus150Days = moment(today).add(150, 'days').toDate();
    const todayPlus151Days = moment(today).add(151, 'days').toDate();

    const tomorrowPlus1Formatted = moment(tomorrow).add(1, 'days').format('DD MMM YYYY');
    const todayPlus151DaysFormatted = moment(todayPlus150Days).add(1, 'days').format('DD MMM YYYY');

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                PaymentAssistancePlanOptionsTotalModule
            ],
            providers: [
                { provide: Now, useValue: nowMock }
            ]
        });

        fixture = TestBed.createComponent(PaymentAssistancePlanOptionsTotalComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

    });

    describe(`Given the total amount due is ${amount}`, () => {

        it(`should display the total amount to pay as '${amountFormatted}'`, () => {
            // ARRANGE
            comp.optionsTotalModel.totalAmountDue = amount;

            // ACT
            fixture.detectChanges();

            // ASSERT
            const totalAmountToPayElement = de.query(totalAmountToPaySelector);
            expect(totalAmountToPayElement.nativeElement.innerHTML).toBe(amountFormatted);
        });

    });

    describe('Given fuelType is Electricity', () => {

        describe('and next bill issue date', () => {

            describe('is yesterday', () => {
                it('should display soon message in the tip section', () => {
                    // ARRANGE
                    comp.optionsTotalModel.currentBillEndDate = yesterday;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    const tipElement = de.query(tipSelector);
                    expect(tipElement.nativeElement.textContent).toMatch('Tip: We recommend you pay off this bill at least two weeks prior to your next bill is due to help stay on track. Your next Electricity bill will be issued soon.');
                });
            });

            describe('is today', () => {
                it('should display soon message in the tip section', () => {
                    // ARRANGE
                    comp.optionsTotalModel.currentBillEndDate = today;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    const tipElement = de.query(tipSelector);
                    expect(tipElement.nativeElement.textContent).toMatch('Tip: We recommend you pay off this bill at least two weeks prior to your next bill is due to help stay on track. Your next Electricity bill will be issued soon.');
                });
            });

            describe('is tomorrow', () => {
                it('should display current bill end date + 1 in the tip section', () => {
                    // ARRANGE
                    comp.optionsTotalModel.currentBillEndDate = tomorrow;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    const tipElement = de.query(tipSelector);
                    expect(tipElement.nativeElement.textContent).toMatch(`Tip: We recommend you pay off this bill at least two weeks prior to your next bill is due to help stay on track. Your next Electricity bill will be issued on ${tomorrowPlus1Formatted}.`);
                });
            });

            describe('is today + 150 days', () => {
                it('should display current bill end date + 151 in the tip section', () => {
                    // ARRANGE
                    comp.optionsTotalModel.currentBillEndDate = todayPlus150Days;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    const tipElement = de.query(tipSelector);
                    expect(tipElement.nativeElement.innerHTML).toBeDefined();
                    expect(tipElement.nativeElement.textContent).toMatch(`Tip: We recommend you pay off this bill at least two weeks prior to your next bill is due to help stay on track. Your next Electricity bill will be issued on ${todayPlus151DaysFormatted}.`);
                });
            });

            describe('is today + 151 days', () => {
                it('should NOT show the tip section', () => {
                    // ARRANGE
                    comp.optionsTotalModel.currentBillEndDate = todayPlus151Days;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    const tipElement = de.query(tipSelector);
                    expect(tipElement).toBeNull();
                });
            });

            describe('is null', () => {
                it('should NOT show the tip section', () => {
                    // ARRANGE
                    comp.optionsTotalModel.currentBillEndDate = null;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    const tipElement = de.query(tipSelector);
                    expect(tipElement).toBeNull();
                });
            });

            describe('is today minus 2 days', () => {
                it('should NOT show the tip section', () => {
                    // ARRANGE
                    comp.optionsTotalModel.currentBillEndDate = todayMinus2Days;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    const tipElement = de.query(tipSelector);
                    expect(tipElement).toBeNull();
                });
            });
        });

    });

    describe('Given fuelType is Gas and the next bill issue date is today', () => {

        it('should display soon message in the tip section for the fuel type of Gas', () => {
            // ARRANGE
            comp.optionsTotalModel = {
                ...comp.optionsTotalModel,
                currentBillEndDate: today,
                fuelType: MauiFuelChipFuelType.Gas
            };

            // ACT
            fixture.detectChanges();

            // ASSERT
            const tipElement = de.query(tipSelector);
            expect(tipElement.nativeElement.textContent).toMatch('Tip: We recommend you pay off this bill at least two weeks prior to your next bill is due to help stay on track. Your next Gas bill will be issued soon.');
        });

    });

});
