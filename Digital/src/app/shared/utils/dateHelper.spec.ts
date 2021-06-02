import * as moment from 'moment';

import { DateHelper } from './dateHelper';
import { IsoWeekday } from '../globals/localisation';

describe('Given Date Helper', () => {
    describe('toIsoDateString', () => {
        it('Should return ISO 8601 with truncated time', () => {
            // Arrange
            const date: moment.Moment = moment('2018-03-13');

            // Act
            const actualString = DateHelper.toIsoDateString(date);

            // Asert
            const expectedString = '2018-03-13';
            expect(actualString).toBe(expectedString);
        });
    });

    describe('toHumanString', () => {
        it('Should return nicely formatted date', () => {
            // Arrange
            const date = moment('2018-03-13');

            // Act
            const actualString = DateHelper.toHumanString(date);

            // Asert
            const expectedString = 'Tue 13 Mar 2018';
            expect(actualString).toBe(expectedString);
        });

        it('Should left-pad single digit day of month with 0', () => {
            // Arrange
            const date = moment('2018-03-08');

            // Act
            const actualString = DateHelper.toHumanString(date);

            // Asert
            const expectedDayOfMonthString = ' 08 ';
            expect(actualString).toContain(expectedDayOfMonthString);
        });
    });

    describe('isDay', () => {
        describe('Given Sunday as expected day', () => {
            describe('And given actual day is Saturday', () => {
                // Arrange
                const saturday: moment.Moment = moment('2018-03-17');

                it('Should return false', () => {
                    // Act
                    const isSunday = DateHelper.isDay(saturday, IsoWeekday.Sunday);

                    // Asert
                    expect(isSunday).toBeFalsy();
                });
            });

            describe('And given actual day is Sunday', () => {
                // Arrange
                const sunday: moment.Moment = moment('2018-03-18');

                it('Should return true', () => {
                    // Act
                    const isSunday = DateHelper.isDay(sunday, IsoWeekday.Sunday);

                    // Asert
                    expect(isSunday).toBeTruthy();
                });
            });

            describe('And given actual day is Monday', () => {
                // Arrange
                const monday: moment.Moment = moment('2018-03-19');

                it('Should return false', () => {
                    // Act
                    const isSunday = DateHelper.isDay(monday, IsoWeekday.Sunday);

                    // Asert
                    expect(isSunday).toBeFalsy();
                });
            });
        });

        describe('Given Saturday as expected day', () => {
            describe('And given actual day is Saturday', () => {
                // Arrange
                const saturday: moment.Moment = moment('2018-03-17');

                it('Should return true', () => {
                    // Act
                    const isSunday = DateHelper.isDay(saturday, IsoWeekday.Saturday);

                    // Asert
                    expect(isSunday).toBeTruthy();
                });
            });

            describe('And given actual day is Sunday', () => {
                // Arrange
                const sunday: moment.Moment = moment('2018-03-18');

                it('Should return false', () => {
                    // Act
                    const isSunday = DateHelper.isDay(sunday, IsoWeekday.Saturday);

                    // Asert
                    expect(isSunday).toBeFalsy();
                });
            });

            describe('And given actual day is Monday', () => {
                // Arrange
                const monday: moment.Moment = moment('2018-03-19');

                it('Should return false', () => {
                    // Act
                    const isSunday = DateHelper.isDay(monday, IsoWeekday.Saturday);

                    // Asert
                    expect(isSunday).toBeFalsy();
                });
            });
        });
    });

    describe('isWeekend', () => {
        describe('Given day is Saturday', () => {
            // Arrange
            const saturday: moment.Moment = moment('2018-03-17');

            it('Should return true', () => {
                // Act
                const isSunday = DateHelper.isWeekend(saturday);

                // Asert
                expect(isSunday).toBeTruthy();
            });
        });

        describe('Given day is Sunday', () => {
            // Arrange
            const saturday: moment.Moment = moment('2018-03-18');

            it('Should return true', () => {
                // Act
                const isSunday = DateHelper.isWeekend(saturday);

                // Asert
                expect(isSunday).toBeTruthy();
            });
        });

        describe('Given day is Monday', () => {
            // Arrange
            const saturday: moment.Moment = moment('2018-03-19');

            it('Should return false', () => {
                // Act
                const isSunday = DateHelper.isWeekend(saturday);

                // Asert
                expect(isSunday).toBeFalsy();
            });
        });

        describe('Given day is Friday', () => {
            // Arrange
            const saturday: moment.Moment = moment('2018-03-16');

            it('Should return false', () => {
                // Act
                const isSunday = DateHelper.isWeekend(saturday);

                // Asert
                expect(isSunday).toBeFalsy();
            });
        });
    });

    describe('parseIsoDate', () => {
        describe('Given date is valid', () => {
            it ('Should parse date', () => {
                // Arrange
                const date = '2018-03-16';
                const march = 2;

                // Act
                const actualDate = DateHelper.parseIsoDate(date);

                // Assert
                expect(actualDate.year()).toBe(2018);
                expect(actualDate.month()).toBe(march);
                expect(actualDate.date()).toBe(16);
            });
        });
    });
});
