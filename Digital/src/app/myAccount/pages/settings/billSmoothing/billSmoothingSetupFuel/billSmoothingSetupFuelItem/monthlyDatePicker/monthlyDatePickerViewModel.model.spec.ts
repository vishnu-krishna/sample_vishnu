import * as moment from 'moment';

import { MonthlyDatePickerViewModel } from './monthlyDatePickerViewModel.model';

describe('monthly date picker view model', () => {

    it('dates are setup for month with 31 days', () => {
        // arrange
        const minDate = new Date(2017, 4, 1);
        const maxDate = new Date(2017, 5, 15);
        const excludedDates = [new Date(2017, 4, 12), new Date(2017, 4, 27)];
        const monthlyDatePickerViewModel = new MonthlyDatePickerViewModel(minDate, maxDate, excludedDates);

        testDatesSetup(minDate, maxDate, monthlyDatePickerViewModel);
    });

    it('dates are setup for month with 28 days', () => {
        // arrange
        const minDate = new Date(2017, 1, 1);
        const maxDate = new Date(2017, 2, 15);
        const excludedDates = [new Date(2017, 1, 12), new Date(2017, 1, 27)];
        const monthlyDatePickerViewModel = new MonthlyDatePickerViewModel(minDate, maxDate, excludedDates);

        testDatesSetup(minDate, maxDate, monthlyDatePickerViewModel);
    });

    it('dates are setup for less than 28 days range', () => {
        // arrange
        const minDate = new Date(2017, 1, 1);
        const maxDate = new Date(2017, 1, 18);
        const excludedDates = [new Date(2017, 1, 12), new Date(2017, 1, 15)];
        const monthlyDatePickerViewModel = new MonthlyDatePickerViewModel(minDate, maxDate, excludedDates);

        testDatesSetup(minDate, maxDate, monthlyDatePickerViewModel);
    });

    it('exclusion dates and date 29-31 are excluded', () => {
        // arrange
        const minDate = new Date(2017, 4, 1);
        const maxDate = new Date(2017, 5, 15);
        const excludedDates = [new Date(2017, 4, 12), new Date(2017, 4, 27)];
        const monthlyDatePickerViewModel = new MonthlyDatePickerViewModel(minDate, maxDate, excludedDates);
        const allExcludedDates = [new Date(2017, 4, 29), new Date(2017, 4, 30), new Date(2017, 4, 31)];
        allExcludedDates.push(...excludedDates);

        // act
        let excludedDatesAreCorrect = true;
        let nonExcludedDatesAreCorrect = true;
        for (let date of monthlyDatePickerViewModel.Dates) {
            const excludedDate = allExcludedDates.find((d) => d.getDate() === date.DateNumber);
            if (excludedDate && !date.IsExcluded) {
                excludedDatesAreCorrect = false;
            }
            if (!excludedDate && date.IsExcluded) {
                nonExcludedDatesAreCorrect = false;
            }
        }

        // assert
        expect(excludedDatesAreCorrect).toBeTruthy();
        expect(nonExcludedDatesAreCorrect).toBeTruthy();
    });

    it('when today + 14 is between 1 and 28, initial selected date is set to today + 14', () => {
        // arrange
        jasmine.clock().mockDate(new Date(2017, 4, 5)); // today + 14 is 19 May 2017
        const minDate = new Date(2017, 4, 1);
        const maxDate = new Date(2017, 5, 15);
        const excludedDates = [new Date(2017, 4, 12), new Date(2017, 4, 27)];

        // act
        const monthlyDatePickerViewModel = new MonthlyDatePickerViewModel(minDate, maxDate, excludedDates);

        // assert
        expect(monthlyDatePickerViewModel.SelectedDate.Date.month()).toBe(4);
        expect(monthlyDatePickerViewModel.SelectedDate.Date.date()).toBe(19);
    });

    it('when today + 14 is between 29 and 31, initial selected date is set to 1st of next month', () => {
        // arrange
        jasmine.clock().mockDate(new Date(2017, 4, 16)); // today + 14 is 30 May 2017
        const minDate = new Date(2017, 4, 10);
        const maxDate = new Date(2017, 5, 15);
        const excludedDates = [new Date(2017, 4, 12), new Date(2017, 4, 27)];

        // act
        const monthlyDatePickerViewModel = new MonthlyDatePickerViewModel(minDate, maxDate, excludedDates);

        // assert
        expect(monthlyDatePickerViewModel.SelectedDate.Date.month()).toBe(5);
        expect(monthlyDatePickerViewModel.SelectedDate.Date.date()).toBe(1);
    });

    it('when today + 14 is excluded date, initial selected date is not set', () => {
        // arrange
        jasmine.clock().mockDate(new Date(2017, 4, 5)); // today + 14 is 19 May 2017
        const minDate = new Date(2017, 4, 1);
        const maxDate = new Date(2017, 5, 15);
        const excludedDates = [new Date(2017, 4, 12), new Date(2017, 4, 19)];

        // act
        const monthlyDatePickerViewModel = new MonthlyDatePickerViewModel(minDate, maxDate, excludedDates);

        // assert
        expect(monthlyDatePickerViewModel.SelectedDate).toBeUndefined();
    });

    it('dates are ordered by date number', () => {
        // arrange
        const minDate = new Date(2017, 4, 1);
        const maxDate = new Date(2017, 5, 15);
        const excludedDates = [new Date(2017, 4, 12), new Date(2017, 4, 27)];
        const monthlyDatePickerViewModel = new MonthlyDatePickerViewModel(minDate, maxDate, excludedDates);

        // act
        let isOrdered = true;
        let previousDateNumber: number;
        for (let date of monthlyDatePickerViewModel.Dates) {
            if (previousDateNumber && (date.DateNumber <= previousDateNumber)) {
                if (date.DateNumber <= previousDateNumber) {
                    isOrdered = false;
                }
            }
            previousDateNumber = date.DateNumber;
        }

        expect(isOrdered).toBeTruthy();
    });

    function testDatesSetup(minDate: Date, maxDate: Date, monthlyDatePickerViewModel: MonthlyDatePickerViewModel) {
        // arrange
        const minDateM = moment(minDate).startOf('day');
        const lastDateInOneMonthM = minDateM.clone().add(1, 'month').add(-1, 'day');
        let maxDateM = moment(maxDate).startOf('day');
        maxDateM = lastDateInOneMonthM.isBefore(maxDateM) ? lastDateInOneMonthM : maxDateM;

        // act
        let areDatesSetup = true;
        for (let dateM = minDateM.clone(); dateM.isSameOrBefore(maxDateM); dateM.add(1, 'day')) {
            if (!monthlyDatePickerViewModel.Dates.find((d) => d.DateNumber === dateM.date())) {
                areDatesSetup = false;
            }
        }

        // assert
        expect(moment.duration(maxDateM.diff(minDateM)).as('days') + 1).toBe(monthlyDatePickerViewModel.Dates.length);
        expect(areDatesSetup).toBeTruthy();
    }
});
