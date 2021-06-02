import { IDate } from './date.interface';

export interface ICalendarDay {
    dateObj: IDate;
    cmo: number;
    currDay: boolean;
    dayNbr: number;
    disabled: boolean;
}
