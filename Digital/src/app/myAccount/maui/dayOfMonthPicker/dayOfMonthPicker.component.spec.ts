import { DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';
import { MauiDayOfMonthPickerModule } from './';
import { DayOfMonthPickerComponent } from './dayOfMonthPicker.component';

let comp: DayOfMonthPickerComponent;
let fixture: ComponentFixture<DayOfMonthPickerComponent>;
let de: DebugElement;

describe(`MAUI Day of Month Picker Component`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MauiDayOfMonthPickerModule]
        });
        fixture = TestBed.createComponent(DayOfMonthPickerComponent);
        comp = fixture.componentInstance;
    });

    describe(`Element display`, () => {

        it(`should display element`, () => {
            de = fixture.debugElement;
            let element = de.query(By.css('.day-of-month-picker'));
            expect(element).not.toBeNull('Day of Month Picker component should be displayed');
        });

        it(`should highlight today by default if no input dayOfMonth`, () => {
            let today = moment('2017-11-13').toDate();
            jasmine.clock().mockDate(today);
            fixture.detectChanges();
            de = fixture.debugElement;
            let element = de.query(By.css('.day-of-month-picker__calendar-item--highlight'));
            expect(element.nativeElement.innerHTML).toContain('13');
        });

        it(`should highlight selected input dayOfMonth by default`, () => {
            comp.dayOfMonth = 7;
            fixture.detectChanges();
            de = fixture.debugElement;
            let element = de.query(By.css('.day-of-month-picker__calendar-item--highlight'));
            expect(element.nativeElement.innerHTML).toContain('7');
        });

        it(`should exclude days in excludedDays input array`, () => {
            comp.dayOfMonth = 7;
            comp.excludedDays = [29];
            fixture.detectChanges();
            de = fixture.debugElement;
            let element = de.query(By.css('.day-of-month-picker__calendar-item--excluded'));
            expect(element.nativeElement.innerHTML).toContain('29');
        });

        it(`should not highlight today's day if it is an excluded day`, () => {
            let today = moment('2017-11-13').toDate();
            jasmine.clock().mockDate(today);
            comp.excludedDays = [13];
            fixture.detectChanges();
            de = fixture.debugElement;
            let element = de.query(By.css('.day-of-month-picker__calendar-item--highlight'));
            expect(element).toBeNull(`should not highlight today's day if it is an excluded day`);
        });
    });

    describe(`Interaction`, () => {
        it(`should emit day which is clicked`, () => {
            spyOn(comp.select, 'emit');
            comp.onClickDay(3);
            de = fixture.debugElement;
            fixture.detectChanges();
            expect(comp.select.emit).toHaveBeenCalledWith(3);
        });

        it(`should not emit day which is clicked if it is an excluded day`, () => {
            spyOn(comp.select, 'emit');
            comp.excludedDays = [3];
            comp.onClickDay(3);
            de = fixture.debugElement;
            fixture.detectChanges();
            expect(comp.select.emit).not.toHaveBeenCalledWith(3);
        });

    });
});
