import { Inject, Injectable } from '@angular/core';
import * as moment from 'moment';

/**
 * Mockable date/time service via local storage.
 * Mocking time via local storage for automated tests is deprecated as it creates shared state
 * between the tests.
 */
@Injectable()
export class Now {
    constructor(
        @Inject('AppContentBranch')
        private appName: string) {
    }

    /**
     * Return the current date, or a mocked value override from local storage.
     * Mocking time via local storage for automated tests is deprecated as it creates shared state
     * between the tests.
     */
    public date(): moment.Moment {
        let mockDate = localStorage.getItem(`${this.appName}.mock.now`);
        let usingMockDate = (mockDate && moment(mockDate).isValid());
        if (usingMockDate) {
            console.warn(`Mocking the current date and time to: ${moment(mockDate).toISOString()}`);
        }
        let todayDate = usingMockDate ? moment(mockDate).startOf('day') : moment().startOf('day');
        return todayDate;
    }
}
