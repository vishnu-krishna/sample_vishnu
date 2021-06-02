import { Component } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-day-of-month-picker',
    templateUrl: './showcaseDayOfMonthPicker.component.html'
})

export class ShowcaseDayOfMonthPickerComponent {
    public codeUsage: string = `
        <!--
            Use [dayOfMonth] number attribute to set default highlighted day of month.
            Use [excludedDays] array attribute to set excluded numbers.
            Use (select) event attribute to receive the day, which the user clicks.

            Examples:

            Highlight the 7th, exclude [29, 30, 31], and bind to select event
        -->
        <agl-maui-day-of-month-picker
            [dayOfMonth]="7"
            [excludedDays]="[29, 30, 31]"
            (select)="onSelect($event)"
        ></agl-maui-day-of-month-picker>

        <!--Defaults to today highlighted-->
        <agl-maui-day-of-month-picker (select)="onSelect($event)"></agl-maui-day-of-month-picker>

    `;

    public excludedDays = [29, 30, 31];
    public onSelectDay(day) {
        alert(`day selected: ${day}`);
    }
}
