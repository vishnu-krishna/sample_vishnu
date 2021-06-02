
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MauiButtonModule } from '../../../../../maui/button';
import { MauiHeadingModule } from '../../../../../maui/heading';

import { PaymentExtensionWelcomeComponent } from './paymentExtensionWelcome.component';

@NgModule({
    declarations: [
        PaymentExtensionWelcomeComponent
    ],
    imports: [
        CommonModule,
        MauiButtonModule,
        MauiHeadingModule
    ],
    exports: [
        PaymentExtensionWelcomeComponent
    ],
    providers: [

    ]
})
export class PaymentExtensionWelcomeModule { }
