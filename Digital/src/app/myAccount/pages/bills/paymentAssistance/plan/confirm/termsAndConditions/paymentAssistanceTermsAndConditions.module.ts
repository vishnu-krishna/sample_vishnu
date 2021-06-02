import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MauiButtonModule } from '../../../../../../maui/button';
import { MauiLightBoxModule } from '../../../../../../maui/lightBox';
import { PaymentAssistanceTermsAndConditionsComponent } from './paymentAssistanceTermsAndConditions.component';
import { LinkModule } from '../../../../../../../shared/component/link';

@NgModule({
    declarations: [
        PaymentAssistanceTermsAndConditionsComponent
    ],
    imports: [
        CommonModule,
        MauiButtonModule,
        MauiLightBoxModule,
        LinkModule
    ],
    exports: [
        PaymentAssistanceTermsAndConditionsComponent
    ]
})

export class PaymentAssistanceTermsAndConditionsModule { }
