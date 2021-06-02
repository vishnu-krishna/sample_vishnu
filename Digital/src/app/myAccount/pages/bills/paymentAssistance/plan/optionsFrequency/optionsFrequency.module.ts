import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SegmentedButtonsModule } from '../../../../../maui/segmentedButtons';
import { DropdownModule } from '../../../../../maui/dropdown';
import { LinkModule } from '../../../../../../shared/component/link';

import { PaymentAssistancePlanOptionsFrequencyComponent } from './optionsFrequency.component';

@NgModule({
    declarations: [
        PaymentAssistancePlanOptionsFrequencyComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SegmentedButtonsModule,
        DropdownModule,
        LinkModule
    ],
    exports: [
        PaymentAssistancePlanOptionsFrequencyComponent
    ],
    providers: [
    ]
})
export class PaymentAssistancePlanOptionsFrequencyModule { }
