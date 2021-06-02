import * as moment from 'moment';

import { InstalmentOption, DateOptions, DateOption } from '../../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { InstalmentPlanFrequency } from '../../../../../../services/paymentScheme/paymentSchemeApi.service';
import { DateRangeGenerator, DateRange } from './dateRangeGenerator';
import { Now } from '../../../../../../../shared/service/now.service';
import { NowMock } from '../../../../../../services/mock/now.mock.service';

describe('Date Range Generator', () => {
    let sut: DateRangeGenerator;
    let nowMock: NowMock;

    beforeAll(() => {
        nowMock = new NowMock('');
        sut = new DateRangeGenerator(nowMock);
    });

    describe('When Weekly frequency', () => {
        const suggestions: InstalmentOption[] = [
            new InstalmentOption(InstalmentPlanFrequency.Weekly, moment('2018-03-09').toDate(), moment('2018-03-22').toDate(), null, 20, 100)
        ];

        let actualRange: DateRange[];
        let actualWeeklyDates: DateOption[];

        beforeAll(() => {
            // Arrange
            nowMock.setDate(2018, 2, 9);

            // Act
            actualRange = sut.generate(suggestions);

            // Assert
            actualWeeklyDates = actualRange.find((r) => r.frequency === InstalmentPlanFrequency.Weekly).dates;
        });

        it('Should set frequency to Weekly', () => {
            expect(actualRange.length).toBe(1);
            expect(actualWeeklyDates).toBeDefined();
        });

        it('Should disable first option and label it as "This week"', () => {
            const actualFirstDate = actualWeeklyDates[0];
            const expectedFirstDate: DateOption = new DateOptionBuilder('This week', 'This week')
                .withDisabled(true)
                .build();

            expect(actualFirstDate).toEqual(expectedFirstDate);
        });

        it('Should then set first date to today, display it as "Today" and select it', () => {
            const actualFirstDate = actualWeeklyDates[1];
            const expectedFirstDate: DateOption = new DateOptionBuilder('2018-03-09', 'Today')
                .withSelected(true)
                .build();

            expect(actualFirstDate).toEqual(expectedFirstDate);
        });

        it('Should then skip the first weekend and replace it with disabled "Next week"', () => {
            const actualFirstWeekend = actualWeeklyDates[2];
            const expectedFirstWeekend: DateOption = new DateOptionBuilder('Next week', 'Next week')
                .withDisabled(true)
                .withSelected(false)
                .build();

            expect(actualFirstWeekend).toEqual(expectedFirstWeekend);
        });

        it('Should then generate next week days', () => {
            const actualSecondWeek = actualWeeklyDates.slice(3, 8);
            const expectedSecondWeek: DateOption[] = [
                new DateOptionBuilder('2018-03-12', 'Mon 12 Mar 2018').build(),
                new DateOptionBuilder('2018-03-13', 'Tue 13 Mar 2018').build(),
                new DateOptionBuilder('2018-03-14', 'Wed 14 Mar 2018').build(),
                new DateOptionBuilder('2018-03-15', 'Thu 15 Mar 2018').build(),
                new DateOptionBuilder('2018-03-16', 'Fri 16 Mar 2018').build()
            ];

            expect(actualSecondWeek).toEqual(expectedSecondWeek);
        });

        it('Should then skip the second weekend and replace it with disabled "In two weeks"', () => {
            const actualSecondWeekend = actualWeeklyDates[8];
            const expectedSecondWeekend: DateOption = new DateOptionBuilder('In two weeks', 'In two weeks')
                .withDisabled(true)
                .build();

            expect(actualSecondWeekend).toEqual(expectedSecondWeekend);
        });

        it('Should then generate week days in two weeks with four days only', () => {
            const actualWeekInTwoWeeks = actualWeeklyDates.slice(9);
            const expectedWeekInTwoWeeks: DateOption[] = [
                new DateOptionBuilder('2018-03-19', 'Mon 19 Mar 2018').build(),
                new DateOptionBuilder('2018-03-20', 'Tue 20 Mar 2018').build(),
                new DateOptionBuilder('2018-03-21', 'Wed 21 Mar 2018').build(),
                new DateOptionBuilder('2018-03-22', 'Thu 22 Mar 2018').build()
            ];

            expect(actualWeekInTwoWeeks).toEqual(expectedWeekInTwoWeeks);
        });
    });

    describe('When Monthly frequency', () => {
        const suggestions: InstalmentOption[] = [
            new InstalmentOption(InstalmentPlanFrequency.Monthly, moment('2018-03-09').toDate(), moment('2018-03-22').toDate(), null, 20, 100)
        ];

        let actualRange: DateRange[];
        let actualMonthlyDates: DateOption[];

        beforeAll(() => {
            // Arrange
            nowMock.setDate(2018, 2, 9);

            // Act
            actualRange = sut.generate(suggestions);

            // Assert
            actualMonthlyDates = actualRange.find((r) => r.frequency === InstalmentPlanFrequency.Monthly).dates;
        });

        it('Should set frequency to Monthly', () => {
            expect(actualRange.length).toBe(1);
            expect(actualMonthlyDates).toBeDefined();
        });

        it('Should disable first option and label it "This week"', () => {
            const actualFirstDate = actualMonthlyDates[0];
            const expectedFirstDate: DateOption = new DateOptionBuilder('This week', 'This week')
                .withDisabled(true)
                .build();

            expect(actualFirstDate).toEqual(expectedFirstDate);
        });

        it('Should set first date to today, display it as "Today" and select it', () => {
            const actualFirstDate = actualMonthlyDates[1];
            const expectedFirstDate: DateOption = new DateOptionBuilder('2018-03-09', 'Today')
                .withSelected(true)
                .build();

            expect(actualFirstDate).toEqual(expectedFirstDate);
        });

        it('Should then include the first weekend', () => {
            const actualFirstWeekend = actualMonthlyDates.slice(2, 4);
            const expectedFirstWeekend: DateOption[] = [
                new DateOptionBuilder('2018-03-10', 'Sat 10 Mar 2018').build(),
                new DateOptionBuilder('2018-03-11', 'Sun 11 Mar 2018').build()
            ];

            expect(actualFirstWeekend).toEqual(expectedFirstWeekend);
        });

        it('Should then insert disabled "Next week"', () => {
            const actualNextWeek = actualMonthlyDates[4];
            const expectedNextWeek: DateOption = new DateOptionBuilder('Next week', 'Next week')
                .withDisabled(true)
                .build();

            expect(actualNextWeek).toEqual(expectedNextWeek);
        });

        it('Should then generate next full week (including weekend)', () => {
            const actualSecondWeek = actualMonthlyDates.slice(5, 12);
            const expectedSecondWeek: DateOption[] = [
                new DateOptionBuilder('2018-03-12', 'Mon 12 Mar 2018').build(),
                new DateOptionBuilder('2018-03-13', 'Tue 13 Mar 2018').build(),
                new DateOptionBuilder('2018-03-14', 'Wed 14 Mar 2018').build(),
                new DateOptionBuilder('2018-03-15', 'Thu 15 Mar 2018').build(),
                new DateOptionBuilder('2018-03-16', 'Fri 16 Mar 2018').build(),
                new DateOptionBuilder('2018-03-17', 'Sat 17 Mar 2018').build(),
                new DateOptionBuilder('2018-03-18', 'Sun 18 Mar 2018').build()
            ];

            expect(actualSecondWeek).toEqual(expectedSecondWeek);
        });

        it('Should then insert disabled "In two weeks"', () => {
            const actualInTwoWeeks = actualMonthlyDates[12];
            const expectedInTwoWeeks: DateOption = new DateOptionBuilder('In two weeks', 'In two weeks')
                .withDisabled(true)
                .build();

            expect(actualInTwoWeeks).toEqual(expectedInTwoWeeks);
        });

        it('Should then generate week days in two weeks with four days only', () => {
            const actualWeekInTwoWeeks = actualMonthlyDates.slice(13);
            const expectedWeekInTwoWeeks: DateOption[] = [
                new DateOptionBuilder('2018-03-19', 'Mon 19 Mar 2018').build(),
                new DateOptionBuilder('2018-03-20', 'Tue 20 Mar 2018').build(),
                new DateOptionBuilder('2018-03-21', 'Wed 21 Mar 2018').build(),
                new DateOptionBuilder('2018-03-22', 'Thu 22 Mar 2018').build()
            ];

            expect(actualWeekInTwoWeeks).toEqual(expectedWeekInTwoWeeks);
        });
    });

    describe('When frequency is Monthly and range is ending with Sunday', () => {
        const suggestions: InstalmentOption[] = [
            new InstalmentOption(InstalmentPlanFrequency.Monthly, moment('2018-03-09').toDate(), moment('2018-03-11').toDate(), null, 20, 100)
        ];

        let actualRange: DateRange[];
        let actualMonthlyDates: DateOption[];

        beforeAll(() => {
            // Arrange
            nowMock.setDate(2018, 2, 9);

            // Act
            actualRange = sut.generate(suggestions);

            // Assert
            actualMonthlyDates = actualRange.find((r) => r.frequency === InstalmentPlanFrequency.Monthly).dates;
        });

        it('Should set last option to Sunday', () => {
            const actualLastOption = actualMonthlyDates.slice(-1)[0];
            const expectedLastOption: DateOption = new DateOptionBuilder('2018-03-11', 'Sun 11 Mar 2018').build();

            expect(actualLastOption).toEqual(expectedLastOption);
        });
    });
});

class DateOptionBuilder {
    private disabled: boolean;
    private selected: boolean;

    constructor(private value: string, private text: string) {
        this.disabled = false;
        this.selected = false;
    }

    withDisabled(disabled): DateOptionBuilder {
        this.disabled = disabled;

        return this;
    }

    withSelected(selected): DateOptionBuilder {
        this.selected = selected;

        return this;
    }

    build(): DateOption {
        return new DateOption(this.value, this.text, this.disabled, this.selected);
    }
}
