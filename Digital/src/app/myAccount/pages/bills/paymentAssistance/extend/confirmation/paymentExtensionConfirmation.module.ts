import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MauiButtonModule } from '../../../../../maui/button';
import { MauiConfirmationBannerModule } from '../../../../../maui/confirmationBanner';
import { MauiContainerModule } from '../../../../../maui/container';
import { DropdownModule } from '../../../../../maui/dropdown';
import { MauiFuelChipModule } from '../../../../../maui/fuelChip';
import { MauiIconListModule } from '../../../../../maui/iconList';
import { CommonPipesModule } from '../../../../../modules/commonPipes.module';

import { PaymentExtensionConfirmationComponent } from './paymentExtensionConfirmation.component';
import { MauiCalendarReminderModule } from '../../../../../maui/calendarReminder';

@NgModule({
    declarations: [
        PaymentExtensionConfirmationComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        CommonPipesModule,
        MauiConfirmationBannerModule,
        MauiFuelChipModule,
        MauiContainerModule,
        MauiIconListModule,
        MauiButtonModule,
        MauiCalendarReminderModule
    ],
    exports: [
        PaymentExtensionConfirmationComponent
    ]
})
export class PaymentExtensionConfirmationModule { }
