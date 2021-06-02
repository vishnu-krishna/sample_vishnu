import * as moment from 'moment';

import { Now } from '../../../../../../../shared/service/now.service';
import { InstalmentOption, DateOptions, DateOption } from '../../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { InstalmentPlanFrequency } from '../../../../../../services/paymentScheme/paymentSchemeApi.service';
import { min } from 'rxjs/operator/min';
import { DateHelper } from '../../../../../../../shared/utils/dateHelper';
import { IsoWeekday } from '../../../../../../../shared/globals/localisation';

export class DateRange {
    constructor(public frequency: InstalmentPlanFrequency, public dates: DateOption[]) {}
}

export class DateRangeGenerator {
    private static readonly weekendDurationInDays: number = 2;

    constructor(private now: Now) {
    }

    public generate(suggestions: InstalmentOption[]): DateRange[] {
        const today = this.now.date();

        const dateRanges: DateRange[] = suggestions.map<DateRange>((suggestion) => {
            const dates = this.generateFrequencyStartDateRange(suggestion, today);
            return new DateRange(suggestion.frequency, dates);
        });

        return dateRanges;
    }

    private generateFrequencyStartDateRange(suggestion: InstalmentOption, today: moment.Moment): DateOption[] {
        const minDate = this.getStartOfDay(suggestion.minStartDate);
        const maxDate = this.getStartOfDay(suggestion.maxStartDate);

        let currentDate = minDate.clone();

        let dates: DateOption[] = new Array<DateOption>();

        while (currentDate.isSameOrBefore(maxDate)) {
            if (this.isFirstDate(dates) ||
                !this.isFirstDate(dates) && this.isMonday(currentDate)) {
                const disabledText = this.getWeekLabel(today, currentDate);
                const weeklyLabelIsDisabled = true;
                const weeklyLabelIsSelected = false;

                dates.push(new DateOption(disabledText, disabledText, weeklyLabelIsDisabled, weeklyLabelIsSelected));
            }

            let daysToAdd = 1;

            if (this.isWeekend(currentDate) && !this.isMonthlyFrequency(suggestion.frequency)) {
                if (DateHelper.isDay(currentDate, IsoWeekday.Saturday)) {
                    daysToAdd = DateRangeGenerator.weekendDurationInDays;
                }
            } else {
                const dayValue = DateHelper.toIsoDateString(currentDate);
                const dayText = this.getText(currentDate, today);
                const dayIsDisabled = false;
                const dayIsSelected = currentDate.isSame(minDate, 'day');

                dates.push(new DateOption(dayValue, dayText, dayIsDisabled, dayIsSelected));
            }

            currentDate.add(daysToAdd, 'day');
        }

        return dates;
    }

    private getText(currentDate: moment.Moment, today: moment.Moment): string {
        return currentDate.isSame(today, 'day') ? 'Today' : DateHelper.toHumanString(currentDate);
    }

    private isWeekend(currentDate: moment.Moment): boolean {
        return DateHelper.isWeekend(currentDate);
    }

    private isMonday(currentDate: moment.Moment): boolean {
        return DateHelper.isDay(currentDate, IsoWeekday.Monday);
    }

    private isMonthlyFrequency(frequency: InstalmentPlanFrequency) {
        return frequency === InstalmentPlanFrequency.Monthly;
    }

    private isFirstDate(dates: DateOption[]): boolean {
        return dates.length === 0;
    }

    private getWeekLabel(today: moment.Moment, currentDate: moment.Moment): string {
        const weekLabels: string[] = [ 'This week', 'Next week', 'In two weeks' ];

        return weekLabels[(currentDate.week() - today.week())];
    }

    private getStartOfDay(date: Date): moment.Moment {
        return moment(date).startOf('day');
    }
}
