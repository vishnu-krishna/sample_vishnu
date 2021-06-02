import { DebugElement, Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarReminderComponent } from './calendarReminder.component';
import { MauiCalendarReminderModule } from './calendarReminder.module';
import { CalendarReminderModel } from './calendarReminder.model';
import { DeviceDetectorService } from '../../../shared/service/deviceDetector.service';
import { CalendarType, CalendarFrequency } from './calendarReminder.enum';
import * as moment from 'moment';
import { By } from '@angular/platform-browser';
import { TimeZone } from '../../../shared/globals/localisation';

@Component({
    selector: 'agl-test-wrapper-component',
    template: ` <agl-maui-calendar-reminder
                    [model]="calendarReminderModelOneOff"
                    (calendarSelected)="calendarSelected($event)">
                </agl-maui-calendar-reminder>`,
})
class OneOffTestWrapperComponent implements OnInit {

    public calendarReminderModelOneOff: CalendarReminderModel;

    ngOnInit() {
        let calendarReminderModelOneOff: CalendarReminderModel = new CalendarReminderModel();
        this.calendarReminderModelOneOff = calendarReminderModelOneOff;
    }

    public calendarSelected(link: string): string {
        return link;
    }
}

describe('Maui Calendar Reminder Component', () => {

    describe('Component test with a one of reminder', () => {
        let fixture: ComponentFixture<OneOffTestWrapperComponent>;
        let de: DebugElement;
        let comp: CalendarReminderComponent;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    MauiCalendarReminderModule
                ],
                declarations: [
                    OneOffTestWrapperComponent
                ]
            });

            fixture = TestBed.createComponent(OneOffTestWrapperComponent);
            de = fixture.debugElement;
            comp = de.children[0].componentInstance;
            fixture.detectChanges();
        });

        it('should have the correct number of options in the list', () => {

            // ARRANGE
            const selectElement = de.query(By.css('select')).nativeElement;

            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(selectElement.length).toBe(5);
        });

        it('should not show the "add reminder button" in desktop', () => {

            // ARRANGE
            const button = de.query(By.css('.maui-calendar-reminder__add'));

            // ACT
            fixture.detectChanges();

            // ASSERT
            expect(button).toBeNull();
        });

        it('should show the "add reminder button" button on ios', () => {

            // ARRANGE
            comp.isIOS = true;
            comp.selectedCalendarType = CalendarType.Google;

            // ACT
            fixture.detectChanges();
            const button = de.query(By.css('.maui-calendar-reminder__add')).nativeElement;

            // ASSERT
            expect(button).not.toBeNull();
        });

        it('should return the calendar link when addEventToCalendar is called', () => {

            // ARRANGE
            const link: string = 'avalidlink';
            spyOn(comp, 'add').and.returnValue(link);
            spyOn(comp, 'openCalendarEvent').and.callThrough();
            spyOn(comp.calendarSelected, 'emit');
            fixture.detectChanges();

            // ACT
            comp.addEventToCalendar('google');

            // ASSERT
            expect(comp.openCalendarEvent).toHaveBeenCalled();
            expect(comp.calendarSelected.emit).toHaveBeenCalledWith(link);
        });

    });

    describe('link construction', () => {
        let calendarReminderModelOneOff: CalendarReminderModel = new CalendarReminderModel();
        let calendarReminderModelRecurring: CalendarReminderModel = new CalendarReminderModel();

        let comp: CalendarReminderComponent;
        let fixture: ComponentFixture<CalendarReminderComponent>;
        let de: DebugElement;
        let linkPrefix = '';
        const start = moment().format('YYYY/MM/DD') + ' 8:00'; // note the ' 8:00' relates to the time of the event
        const endDate = moment().add(4, 'week').format('YYYYMMDD') + 'T140000Z';
        const title = `test Title`;
        const description = `test Body`;
        const linkSuffix = '&description=' + encodeURIComponent(description);

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [MauiCalendarReminderModule],
                providers: []
            });

            fixture = TestBed.createComponent(CalendarReminderComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            linkPrefix = 'https://www.addevent.com/dir/?client=' + comp.clientId + '&timezone=' + encodeURIComponent(comp.timezone) + '&calname=' + encodeURIComponent(comp.icsFileName) + '&start=' + encodeURIComponent(start) +  '&title=' + encodeURIComponent(title) + '&service=';
            calendarReminderModelOneOff.title = title;
            calendarReminderModelOneOff.description = description;
            calendarReminderModelOneOff.startDate = start;

        });

        describe('One off events', () => {
            it('should return the correct link for the apple Calendar', () => {
                // ARRANGE
                calendarReminderModelOneOff.calendarType = CalendarType.Apple;
                let link = comp.add(calendarReminderModelOneOff, comp.icsFileName, comp.timezone);

                // ACT
                fixture.detectChanges();

                // ASSERT
                const testResult = linkPrefix + CalendarType.Apple + linkSuffix;
                expect(link).toContain(testResult);
            });

            it('should return the correct link for the google Calendar', () => {
                // ARRANGE
                calendarReminderModelOneOff.calendarType = CalendarType.Google;
                let link = comp.add(calendarReminderModelOneOff, comp.icsFileName, comp.timezone);

                // ACT
                fixture.detectChanges();

                // ASSERT
                const testResult = linkPrefix + CalendarType.Google + linkSuffix;
                expect(link).toContain(testResult);
            });

            it('should return the correct link for the outlook Calendar', () => {
                // ARRANGE
                calendarReminderModelOneOff.calendarType = CalendarType.Outlook;
                let link = comp.add(calendarReminderModelOneOff, comp.icsFileName, comp.timezone);

                // ACT
                fixture.detectChanges();

                // ASSERT
                const testResult = linkPrefix + CalendarType.Outlook + linkSuffix;
                expect(link).toContain(testResult);
            });

            it('should return the correct link for the outlook.com Calendar', () => {
                // ARRANGE
                calendarReminderModelOneOff.calendarType = CalendarType.OutlookCom;
                let link = comp.add(calendarReminderModelOneOff, comp.icsFileName, comp.timezone);

                // ACT
                fixture.detectChanges();

                // ASSERT
                const testResult = linkPrefix + CalendarType.OutlookCom + linkSuffix;
                expect(link).toContain(testResult);
            });
        });
        describe('Recurring events', () => {
            beforeEach(() => {
                calendarReminderModelRecurring.startDate = start;
                calendarReminderModelRecurring.title = title;
                calendarReminderModelRecurring.description = description;
                calendarReminderModelRecurring.calendarType = CalendarType.Google;
                calendarReminderModelRecurring.endDate = endDate;
            });

            it('should return the correct link for a weekly frequency', () => {

                // Note a frequency of Fortnightly is not tested as it uses the weekly frequency with an interval of 2

                const recurringFrequency = CalendarFrequency.Weekly;
                const recurringInterval = 1;
                const recurringSuffix = `&recurring=FREQ=${recurringFrequency.toString().toLocaleUpperCase()};INTERVAL=${recurringInterval};UNTIL=${endDate}`;

                calendarReminderModelRecurring.frequency = recurringFrequency;
                calendarReminderModelRecurring.interval = recurringInterval;
                let link = comp.add(calendarReminderModelRecurring, comp.icsFileName, comp.timezone);
                let testResult = linkPrefix + CalendarType.Google + linkSuffix + recurringSuffix;
                // ACT
                fixture.detectChanges();

                // ASSERT
                expect(link).toEqual(testResult);
            });

            it('should return the correct link for a monthly frequency', () => {

                const recurringFrequency = CalendarFrequency.Monthly;
                const recurringInterval = 2;
                const recurringSuffix = `&recurring=FREQ=${recurringFrequency.toString().toLocaleUpperCase()};INTERVAL=${recurringInterval};UNTIL=${endDate}`;

                calendarReminderModelRecurring.frequency = recurringFrequency;
                calendarReminderModelRecurring.interval = recurringInterval;
                let link = comp.add(calendarReminderModelRecurring, comp.icsFileName, comp.timezone);
                let testResult = linkPrefix + CalendarType.Google + linkSuffix + recurringSuffix;
                // ACT
                fixture.detectChanges();

                // ASSERT
                expect(link).toEqual(testResult);
            });
        });
    });
});
