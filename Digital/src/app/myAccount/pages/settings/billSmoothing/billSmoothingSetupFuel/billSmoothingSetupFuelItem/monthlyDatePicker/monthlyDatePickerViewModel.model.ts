import * as moment from 'moment';
import { BillSmoothingService } from '../../../billSmoothing.service';

export class MonthlyDatePickerViewModel {
    private _dates: MonthlyDatePickerDateViewModel[];
    public get Dates(): MonthlyDatePickerDateViewModel[] {
        return this._dates;
    }

    public get SelectedDate(): MonthlyDatePickerDateViewModel {
        return this.Dates.find((d) => d.IsHighlighted);
    }

    public set SelectedDate(date: MonthlyDatePickerDateViewModel) {
        if (this.SelectedDate) {
            this.SelectedDate.IsHighlighted = false;
        }
        const newSelectedDate = this.Dates.find((d) => d.Date.isSame(date.Date));
        newSelectedDate.IsHighlighted = true;
    }

    constructor(private minDate: Date, private maxDate: Date, private excludeDates: Date[]) {
        this._dates = [];

        // iterate dates
        const minDateMoment = moment(minDate).startOf('day');
        const maxDateMoment = moment(maxDate).startOf('day');
        const defaultDate = this.getInitialDefaultDate();

        for (let dateMoment = minDateMoment.clone(); dateMoment.isSameOrBefore(maxDateMoment); dateMoment = dateMoment.add(1, 'day')) {
            if (dateMoment.isSame(minDateMoment, 'month') || (dateMoment.date() < minDateMoment.date())) {
                const dateViewModel = new MonthlyDatePickerDateViewModel (dateMoment.date(),
                defaultDate.isSame(dateMoment, 'day') && !this.isExcludedDate(dateMoment, excludeDates),
                this.isExcludedDate(dateMoment, excludeDates), dateMoment.clone());
                this._dates.push(dateViewModel);
            }
        }

        this._dates = this._dates.sort((date1: MonthlyDatePickerDateViewModel, date2: MonthlyDatePickerDateViewModel) => date1.DateNumber - date2.DateNumber);
    }

    private getInitialDefaultDate(): moment.Moment {
        const daysBuffer = 14;
        const februaryMonthStartDate = 1;
        const februaryMonthEndDate = 28;
        const nowMoment = moment();
        const todayPlus14DaysMoment = nowMoment.clone().add(daysBuffer, 'days').startOf('day');
        const dateOfMonth = todayPlus14DaysMoment.date();
        const firstDateOfNextMonth = todayPlus14DaysMoment.clone().add(1, 'month').startOf('month');

        let defaultDate: moment.Moment;
        if (februaryMonthStartDate <= dateOfMonth && dateOfMonth <= februaryMonthEndDate) {
            return todayPlus14DaysMoment;
        } else {
            return firstDateOfNextMonth;
        }
    }

    private isExcludedDate(date: moment.Moment, excludeDates: Date[]) {
        const excludeDateMoments = excludeDates.map((d) => moment(d));
        // if testing date is one of the excluded dates or among 29 to 31
        return excludeDateMoments.some((d) => d.isSame(date, 'day')) || [29, 30, 31].some((d) => d === date.date());
    }
}

export class MonthlyDatePickerDateViewModel {
    constructor(public DateNumber: number, public IsHighlighted: boolean, public IsExcluded: boolean, public Date: moment.Moment) {
    }

    public get Ordinal(): string {
        return BillSmoothingService.generateOrdinalDate(this.Date);
    }

    public get Full(): string {
        return BillSmoothingService.generateShortDate(this.Date);
    }

    public get Weekday(): string {
        return BillSmoothingService.generateDayFromDate(this.Date);
    }
}
