import * as moment from 'moment';
import { DateFormat, IsoWeekday } from '../globals/localisation';

export class DateHelper {

    public static toIsoDateString(date: moment.Moment): string {
        return date.format(DateFormat.IS0_8601);
    }

    public static toHumanString(date: moment.Moment): string {
        return date.format(DateFormat.HUMAN_FORMAT);
    }

    public static isDay(date: moment.Moment, day: IsoWeekday): boolean {
        return date.isoWeekday() === day;
    }

    public static isWeekend(date: moment.Moment): boolean {
        return date.isoWeekday() >= IsoWeekday.Saturday;
    }

    public static parseIsoDate(date: string): moment.Moment {
        return moment(date, DateFormat.IS0_8601);
    }
}
