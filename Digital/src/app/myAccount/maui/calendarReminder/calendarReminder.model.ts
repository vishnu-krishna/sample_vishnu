import { CalendarType, CalendarFrequency } from './calendarReminder.enum';

export class CalendarReminderModel {
    title: string;
    startDate: string;
    calendarType: CalendarType;
    description: string;
    frequency?: CalendarFrequency;
    interval?: number;
    endDate?: string;
}
