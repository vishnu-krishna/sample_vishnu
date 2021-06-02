import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GenericErrorImageModule } from '../../../../../shared/component/genericError/genericErrorImage/genericErrorImage.module';
import { MauiButtonModule } from '../../../../maui/button/index';

import { PaymentExtensionErrorComponent } from './paymentExtensionError.component';

@NgModule({
    declarations: [
        PaymentExtensionErrorComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        GenericErrorImageModule,
        MauiButtonModule
    ],
    exports: [
        PaymentExtensionErrorComponent
    ]
})
export class PaymentExtensionErrorModule { }
