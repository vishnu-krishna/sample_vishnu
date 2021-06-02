import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingModule } from '../../../../../../shared/loaders/loading.module';
import { PaymentAssistancePlanOptionsComponent } from './paymentAssistancePlanOptions.component';
import { PaymentAssistancePlanOptionsFrequencyModule } from '../optionsFrequency';
import { PaymentAssistancePlanOptionsTotalModule } from '../optionsTotal';
import { MauiHeadingModule } from '../../../../../maui/heading';
import { MauiFuelChipModule } from '../../../../../maui/fuelChip';
import { MauiButtonModule } from '../../../../../maui/button';
import { FuelChipService } from '../../services';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentAssistancePlanOptionsSuggestionsModule } from './suggestions';
import { MauiContainerModule } from '../../../../../maui/container';
import { MauiFlashMessageModule } from '../../../../../maui/flashMessage';
import { LinkModule } from '../../../../../../shared/component/link';
import { GenericStateService } from '../../../../../services/generics/genericState.service';
import { MauiSecondaryNavigationModule } from '../../../../../maui/secondaryNavigation';
import { PaymentAssistancePlanOptionsHelperService } from './services';

@NgModule({
    declarations: [
        PaymentAssistancePlanOptionsComponent,
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
        PaymentAssistancePlanOptionsSuggestionsModule
    ],
    exports: [
        PaymentAssistancePlanOptionsComponent
    ],
    providers: [
        FuelChipService,
        PaymentAssistancePlanOptionsHelperService,
        { provide: 'paymentAssistancePlanOptionsStateService', useClass: GenericStateService }
    ]
})
export class PaymentAssistancePlanOptionsModule { }
