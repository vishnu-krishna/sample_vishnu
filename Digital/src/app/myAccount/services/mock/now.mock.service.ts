import { Inject } from '@angular/core';
import * as moment from 'moment';
import { Now } from './../../../shared/service/now.service';

export class NowMock extends Now {
    private now: moment.Moment;

    // NOTE: If you do not use setDate the mock will default to today, this can lead to unexpected date based unit test issues
    constructor(@Inject('AppContentBranch') appName: string, now: moment.Moment = moment().startOf('day')) {
        super(appName);

        this.now = now;
    }

    public date(): moment.Moment {
        // return immutable this.now
        return this.now.clone();
    }

    public setDate(year: number, monthOffsetStartingFromZero: number, day: number): void {
        this.now = moment(new Date(year, monthOffsetStartingFromZero, day)).startOf('day');
    }
}
