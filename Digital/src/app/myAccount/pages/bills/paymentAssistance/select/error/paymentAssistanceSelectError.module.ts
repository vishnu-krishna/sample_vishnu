import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MauiButtonModule } from '../../../../../maui/button/index';
import { GenericErrorImageModule } from '../../../../../../shared/component/genericError/genericErrorImage/genericErrorImage.module';

import { PaymentAssistanceSelectErrorComponent } from './paymentAssistanceSelectError.component';

@NgModule({
    declarations: [
        PaymentAssistanceSelectErrorComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        GenericErrorImageModule,
        MauiButtonModule
    ],
    exports: [
        PaymentAssistanceSelectErrorComponent
    ]
})
export class PaymentAssistanceSelectErrorModule { }
