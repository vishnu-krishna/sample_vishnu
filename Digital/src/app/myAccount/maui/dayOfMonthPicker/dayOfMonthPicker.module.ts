import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DayOfMonthPickerComponent } from './dayOfMonthPicker.component';

@NgModule({
    declarations: [
        DayOfMonthPickerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DayOfMonthPickerComponent
    ]
})
export class MauiDayOfMonthPickerModule { }
