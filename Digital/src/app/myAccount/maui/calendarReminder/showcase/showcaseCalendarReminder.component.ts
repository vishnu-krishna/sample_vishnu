import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { InstalmentPlanFrequency } from '../../../services/paymentScheme/paymentSchemeApi.service';
import { CalendarReminderModel } from '../calendarReminder.model';
import { CalendarFrequency } from '../calendarReminder.enum';

@Component({
    selector: 'agl-maui-showcase-calendar-reminder',
    templateUrl: './showcaseCalendarReminder.component.html',
    styleUrls: ['./showcaseCalendarReminder.component.scss'],
})

export class ShowcaseCalendarReminderComponent implements OnInit {
    public codeUsage: string = `
        <agl-maui-calendar-reminder
            [model]="calendarReminderModelRecurring" (reminderlink)="getLink($event)">
        </agl-maui-calendar-reminder>
    `;

    public calendarReminderModelRecurring: CalendarReminderModel = new CalendarReminderModel();
    public calendarReminderModelOneOff: CalendarReminderModel = new CalendarReminderModel();
    public link: string;

    public ngOnInit() {

        // note the '%208:00' relates to the time of the event ie 8am
        const startDate = moment().format('YYYY/MM/DD') + '%208:00';
        // note the 'T140000Z' relates to the end time of the event ie 8am for the recurring event and it needs to be in the format
        const endDate = moment().add(4, 'week').format('YYYYMMDD') + 'T140000Z';

        this.calendarReminderModelOneOff.title = `AGL Gas bill due`;
        this.calendarReminderModelOneOff.description = `A one off reminder to keep you on track`;
        this.calendarReminderModelOneOff.startDate = startDate;

        this.calendarReminderModelRecurring.title = `AGL Gas bill due`;
        this.calendarReminderModelRecurring.description = `A recurring reminder to keep you on track`;
        this.calendarReminderModelRecurring.startDate = startDate;
        this.calendarReminderModelRecurring.endDate = endDate;
        this.calendarReminderModelRecurring.frequency = CalendarFrequency.Weekly;
        this.calendarReminderModelRecurring.interval = 2;
    }
    public calendarSelected(value) {
        this.link = value;
    }
}
