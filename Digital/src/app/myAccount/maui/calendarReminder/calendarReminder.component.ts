import { UrlService } from './../../services/url.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarType, CalendarFrequency } from './calendarReminder.enum';
import { CalendarReminderModel } from './calendarReminder.model';
import { DeviceDetectorService } from '../../../shared/service/deviceDetector.service';
import { TimeZone } from '../../../shared/globals/localisation';

// This component makes use of a third party service from addevent.com
// https://www.addevent.com
// Future developers do not necessarily need to be added to the addevent portal to do development as everyone uses same the AGL account client id
// Having said that you can log on to the site to see the analytics
// The client id is not displayed obviously on the site. It was obtained from the https://www.addevent.com/add-to-calendar-button page under the "client" parameter
//
// NOTE: On IOS devices, you will need to call the `add` function on a click event of a button or anchor,
// to prevent the default popup blocker from blocking the `window.open` of a 3rd party webpage.

@Component({
    selector: 'agl-maui-calendar-reminder',
    templateUrl: './calendarReminder.component.html',
    styleUrls: ['./calendarReminder.component.scss']
})
export class CalendarReminderComponent implements OnInit {

    @Input() public model: CalendarReminderModel;
    @Input() public icsFileName: string = 'AGL-bill-reminder';
    @Input() public timezone: TimeZone = TimeZone.AEST;
    @Output() public calendarSelected: EventEmitter<string> = new EventEmitter<string>();

    public selectedCalendarType: CalendarType;
    public isIOS: boolean;
    public CalendarType = CalendarType;
    public clientId: string = 'arohxvEKyzCXGBQPvmGM35825';
    private link: string;

    constructor(private deviceDetectorService: DeviceDetectorService) { }

    public ngOnInit() {
        this.isIOS = this.deviceDetectorService.isIOS;
    }

    public addEventToCalendar(calendarType: string): void {
        this.selectedCalendarType = CalendarType[calendarType];

        // if not an apple device (which will prevent auto-calendar opening)
        if (!this.isIOS) {
            this.openCalendarEvent();
        }

        this.calendarSelected.emit(this.link);
    }

    public openCalendarEvent(): void {

        if (!this.selectedCalendarType) {
            return;
        }
        this.model.calendarType = this.selectedCalendarType;
        this.link = this.add(this.model, this.icsFileName, this.timezone);
    }

    public add(calendarReminderModel: CalendarReminderModel, icsFileName: string, timezone: string): string {

        const link: string = this.createLink(calendarReminderModel, icsFileName, timezone);
        window.open(link);

        return link;
    }

    public createLink(calendarReminderModel: CalendarReminderModel, icsFileName: string, timezone: string): string {

        const linkParameters = {
            client: this.clientId,
            timezone: this.timezone,
            calname: this.icsFileName,
            start: calendarReminderModel.startDate,
            title: calendarReminderModel.title,
            service: calendarReminderModel.calendarType,
            description: calendarReminderModel.description
        };

        let url = 'https://www.addevent.com/dir/?' + Object.keys(linkParameters).map((key) => {
            const value = linkParameters[key];
            return `${key}=${encodeURIComponent(value)}`;
        }).join('&');

        if (this.isRecurringEvent(calendarReminderModel)) {
            // note End time of the event for the recurring event and it needs to be in the format  'T140000Z'
            url += `&recurring=FREQ=${encodeURIComponent(calendarReminderModel.frequency.toString().toUpperCase())};INTERVAL=${encodeURIComponent(calendarReminderModel.interval.toString())};UNTIL=${encodeURIComponent(calendarReminderModel.endDate)}`;
        }
        return url;
    }

    public isRecurringEvent(calendarReminderModel: CalendarReminderModel): boolean {
        return (!!calendarReminderModel.frequency && !!calendarReminderModel.interval && !!calendarReminderModel.endDate);
    }
}
