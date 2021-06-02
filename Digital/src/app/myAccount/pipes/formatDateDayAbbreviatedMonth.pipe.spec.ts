import { FormatDateDayAbbreviatedMonthPipe } from './formatDateDayAbbreviatedMonth.pipe';

describe('FormatDateDayAbbreviatedMonthPipe Pipe', () => {

    const pipe = new FormatDateDayAbbreviatedMonthPipe();

    const dateAsString = '2018-05-30';
    const date = new Date(dateAsString);
    const expectedFormattedDate = '30 May';

    describe(`When the input is a string '${dateAsString}'`, () => {
        it('should return a formatted date as a string', () => {
            expect(pipe.transform(dateAsString)).toBe(expectedFormattedDate);
        });
    });

    describe(`When the input is a date '${date}'`, () => {
        it('should return a formatted date as a string', () => {
            expect(pipe.transform(date)).toBe(expectedFormattedDate);
        });
    });
});
