import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'agl-maui-day-of-month-picker',
    templateUrl: './dayOfMonthPicker.component.html',
    styleUrls: ['./dayOfMonthPicker.component.scss'],
})
export class DayOfMonthPickerComponent implements OnInit {
    @Output() public select = new EventEmitter<number>();
    @Input() public dayOfMonth: number;
    @Input() public excludedDays: number[] = [];

    public days =
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    public selectedDay: number;

    public ngOnInit() {
        let day = this.dayOfMonth || Number(moment().format('D'));
        this.selectedDay = this.isExcluded(day) ? null : day;
    }

    public isExcluded( dayOfMonth: number) {
        return !!this.excludedDays.find((excludedDay) => excludedDay === dayOfMonth);
    }

    public onClickDay(dayOfMonth: number) {
        if (!this.isExcluded(dayOfMonth)) {
            this.selectedDay = dayOfMonth;
            this.select.emit(dayOfMonth);
        }
    }
}
