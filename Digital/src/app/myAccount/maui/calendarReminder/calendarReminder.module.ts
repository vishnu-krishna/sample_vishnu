import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CalendarReminderComponent } from './calendarReminder.component';
import { MauiButtonModule } from '../button';
import { DropdownModule } from '../dropdown';
import { DeviceDetectorService } from '../../../shared/service/deviceDetector.service';

@NgModule({
    declarations: [
        CalendarReminderComponent
    ],
    imports: [
        CommonModule,
        MauiButtonModule,
        DropdownModule
    ],
    providers: [DeviceDetectorService],
    exports: [
        CalendarReminderComponent
    ]
})
export class MauiCalendarReminderModule { }
