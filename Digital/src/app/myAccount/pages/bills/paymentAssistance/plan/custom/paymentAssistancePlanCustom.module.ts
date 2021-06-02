import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingModule } from '../../../../../../shared/loaders/loading.module';
import { PaymentAssistancePlanCustomComponent } from './paymentAssistancePlanCustom.component';
import { PaymentAssistancePlanOptionsFrequencyModule } from '../optionsFrequency';
import { PaymentAssistancePlanOptionsTotalModule } from '../optionsTotal';
import { MauiHeadingModule } from '../../../../../maui/heading';
import { MauiFuelChipModule } from '../../../../../maui/fuelChip';
import { MauiButtonModule } from '../../../../../maui/button';
import { FuelChipService } from '../../services';
import { ReactiveFormsModule } from '@angular/forms';
import { MauiContainerModule } from '../../../../../maui/container';
import { MauiFlashMessageModule } from '../../../../../maui/flashMessage';
import { LinkModule } from '../../../../../../shared/component/link';
import { GenericStateService } from '../../../../../services/generics/genericState.service';
import { MauiSecondaryNavigationModule } from '../../../../../maui/secondaryNavigation';
import { IInstalmentPlanOptionsService, InstalmentPlanOptionsService } from '../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { PaymentAssistancePlanCustomAmountModule } from './customAmount/customAmount.module';
import { PaymentAssistancePlanOptionsHelperService } from '../options/services';
import { WebChatModule } from '../../../../../../shared/component/webChat/webChat.module';

@NgModule({
    declarations: [
        PaymentAssistancePlanCustomComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoadingModule,
        MauiHeadingModule,
        MauiFuelChipModule,
        MauiButtonModule,
        MauiContainerModule,
        MauiFlashMessageModule,
        MauiSecondaryNavigationModule,
        LinkModule,
        PaymentAssistancePlanOptionsFrequencyModule,
        PaymentAssistancePlanOptionsTotalModule,
        PaymentAssistancePlanCustomAmountModule,
        WebChatModule
    ],
    exports: [
        PaymentAssistancePlanCustomComponent
    ],
    providers: [
        FuelChipService,
        PaymentAssistancePlanOptionsHelperService,
        { provide: IInstalmentPlanOptionsService, useClass: InstalmentPlanOptionsService },
        { provide: 'paymentAssistancePlanOptionsStateService', useClass: GenericStateService }
    ]
})
export class PaymentAssistancePlanCustomModule { }
