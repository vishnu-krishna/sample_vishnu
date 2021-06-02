import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentAssistancePlanSuccessComponent } from './paymentAssistancePlanSuccess.component';
import { MauiConfirmationBannerModule } from '../../../../../maui/confirmationBanner';
import { PaymentAssistancePlanSuccessFuelChipsModule } from './fuelChips';
import { PaymentAssistancePlanSuccessSummaryModule } from './summary';
import { FuelChipService } from '../../services';
import { LoadingModule } from '../../../../../../shared/loaders/loading.module';
import { MauiContainerModule } from '../../../../../maui/container';
import { PaymentAssistancePlanSuccessFuelChipHeaderModule } from './fuelChipHeader/fuelChipHeader.module';
import { MauiButtonModule } from '../../../../../maui/button';
import { MauiFlashMessageModule } from '../../../../../maui/flashMessage';
import { Now } from '../../../../../../shared/service/now.service';
import { PaymentAssistancePlanInstalmentsModule } from '../instalments';
import { MauiCalendarReminderModule } from '../../../../../maui/calendarReminder';
import { GenericStateService } from '../../../../../services/generics/genericState.service';
import { PaymentAssistancePlanConfirmStateModel } from '../confirm';
import { WebChatModule } from '../../../../../../shared/component/webChat/webChat.module';
import { LinkModule } from '../../../../../../shared/component/link';

@NgModule({
    declarations: [
        PaymentAssistancePlanSuccessComponent,
    ],
    imports: [
        CommonModule,
        MauiConfirmationBannerModule,
        MauiContainerModule,
        MauiButtonModule,
        LoadingModule,
        PaymentAssistancePlanSuccessFuelChipsModule,
        PaymentAssistancePlanInstalmentsModule,
        PaymentAssistancePlanSuccessSummaryModule,
        PaymentAssistancePlanSuccessFuelChipHeaderModule,
        MauiCalendarReminderModule,
        WebChatModule,
        LinkModule
    ],
    exports: [
        PaymentAssistancePlanSuccessComponent
    ],
    providers: [
        Now,
        FuelChipService,
        { provide: 'paymentAssistancePlanConfirmStateService', useClass: GenericStateService }
    ]
})
export class PaymentAssistancePlanSuccessModule { }
