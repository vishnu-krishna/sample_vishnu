import { Injectable } from '@angular/core';
import { IDateRange } from '../interfaces/date-range.interface';
import { IDate } from '../interfaces/date.interface';
import { IMonthLabels } from '../interfaces/month-labels.interface';
import { IMonth } from '../interfaces/month.interface';

@Injectable()
export class UtilService {
    public isDateValid(dateStr: string, dateFormat: string, minYear: number, maxYear: number, disableUntil: IDate, disableSince: IDate, disableWeekends: boolean, disableDays: IDate[], disableDateRange: IDateRange, monthLabels: IMonthLabels, enableDays: IDate[]): IDate {
        let returnDate: IDate = { day: 0, month: 0, year: 0 };
        let daysInMonth: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let isMonthStr: boolean = this.getDatePartIndex(dateFormat, 'mmm') !== -1;

        if (dateStr.length !== dateFormat.length) {
            return returnDate;
        }

        let separator: string = this.getDateFormatSeparator(dateFormat);

        let parts: string[] = dateStr.split(separator);
        if (parts.length !== 3) {
            return returnDate;
        }

        let day: number = this.parseDatePartNumber(dateFormat, dateStr, 'dd');
        let month: number = isMonthStr ? this.parseDatePartMonthName(dateFormat, dateStr, 'mmm', monthLabels) : this.parseDatePartNumber(dateFormat, dateStr, 'mm');
        let year: number = this.parseDatePartNumber(dateFormat, dateStr, 'yyyy');

        if (day !== -1 && month !== -1 && year !== -1) {
            if (year < minYear || year > maxYear || month < 1 || month > 12) {
                return returnDate;
            }

            let date: IDate = { year: year, month: month, day: day };

            if (this.isDisabledDay(date, disableUntil, disableSince, disableWeekends, disableDays, disableDateRange, enableDays)) {
                return returnDate;
            }

            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }

            if (day < 1 || day > daysInMonth[month - 1]) {
                return returnDate;
            }

            // Valid date
            return date;
        }
        return returnDate;
    }

    public getDateFormatSeparator(dateFormat: string): string {
        return dateFormat.replace(/[dmy]/g, '')[0];
    }

    public isMonthLabelValid(monthLabel: string, monthLabels: IMonthLabels): number {
        for (let key = 1; key <= 12; key++) {
            if (monthLabel.toLowerCase() === monthLabels[key].toLowerCase()) {
                return key;
            }
        }
        return -1;
    }

    public isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number {
        if (yearLabel >= minYear && yearLabel <= maxYear) {
            return yearLabel;
        }
        return -1;
    }

    public parseDatePartNumber(dateFormat: string, dateString: string, datePart: string): number {
        let pos: number = this.getDatePartIndex(dateFormat, datePart);
        if (pos !== -1) {
            let value: string = dateString.substring(pos, pos + datePart.length);
            if (!/^\d+$/.test(value)) {
                return -1;
            }
            return parseInt(value, 10);
        }
        return -1;
    }

    public parseDatePartMonthName(dateFormat: string, dateString: string, datePart: string, monthLabels: IMonthLabels): number {
        let pos: number = this.getDatePartIndex(dateFormat, datePart);
        if (pos !== -1) {
            return this.isMonthLabelValid(dateString.substring(pos, pos + datePart.length), monthLabels);
        }
        return -1;
    }

    public getDatePartIndex(dateFormat: string, datePart: string): number {
        return dateFormat.indexOf(datePart);
    }

    public parseDefaultMonth(monthString: string): IMonth {
        let month: IMonth = { monthTxt: '', monthNbr: 0, year: 0 };
        if (monthString !== '') {
            let split = monthString.split(monthString.match(/[^0-9]/)[0]);
            month.monthNbr = split[0].length === 2 ? parseInt(split[0], 10) : parseInt(split[1], 10);
            month.year = split[0].length === 2 ? parseInt(split[1], 10) : parseInt(split[0], 10);
        }
        return month;
    }

    public isDisabledDay(date: IDate, disableUntil: IDate, disableSince: IDate, disableWeekends: boolean, disableDays: IDate[], disableDateRange: IDateRange, enableDays: IDate[]): boolean {
        for (let obj of enableDays) {
            if (obj.year === date.year && obj.month === date.month && obj.day === date.day) {
                return false;
            }
        }

        let dateMs: number = this.getTimeInMilliseconds(date);
        if (this.isInitializedDate(disableUntil) && dateMs <= this.getTimeInMilliseconds(disableUntil)) {
            return true;
        }

        if (this.isInitializedDate(disableSince) && dateMs >= this.getTimeInMilliseconds(disableSince)) {
            return true;
        }

        if (disableWeekends) {
            let dayNbr = this.getDayNumber(date);
            if (dayNbr === 0 || dayNbr === 6) {
                return true;
            }
        }

        for (let obj of disableDays) {
            if (obj.year === date.year && obj.month === date.month && obj.day === date.day) {
                return true;
            }
        }

        if (this.isInitializedDate(disableDateRange.begin) && this.isInitializedDate(disableDateRange.end) && dateMs >= this.getTimeInMilliseconds(disableDateRange.begin) && dateMs <= this.getTimeInMilliseconds(disableDateRange.end)) {
            return true;
        }
        return false;
    }

    public getWeekNumber(date: IDate): number {
        let d: Date = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        d.setDate(d.getDate() + (d.getDay() === 0 ? -3 : 4 - d.getDay()));
        return Math.round(((d.getTime() - new Date(d.getFullYear(), 0, 4).getTime()) / 86400000) / 7) + 1;
    }

    public isMonthDisabledByDisableUntil(date: IDate, disableUntil: IDate): boolean {
        return this.isInitializedDate(disableUntil) && this.getTimeInMilliseconds(date) <= this.getTimeInMilliseconds(disableUntil);
    }

    public isMonthDisabledByDisableSince(date: IDate, disableSince: IDate): boolean {
        return this.isInitializedDate(disableSince) && this.getTimeInMilliseconds(date) >= this.getTimeInMilliseconds(disableSince);
    }

    public isInitializedDate(date: IDate): boolean {
        return date.year !== 0 && date.month !== 0 && date.day !== 0;
    }

    public getTimeInMilliseconds(date: IDate): number {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    }

    public getDayNumber(date: IDate): number {
        let d: Date = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
        return d.getDay();
    }

    public getDateString(date: IDate): string {
      let d: Date = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
      return d.toDateString();
    }
}
