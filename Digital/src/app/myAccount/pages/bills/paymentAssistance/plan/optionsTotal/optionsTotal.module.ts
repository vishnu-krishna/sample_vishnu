import { CommonPipesModule } from './../../../../../modules/commonPipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentAssistancePlanOptionsTotalComponent } from './optionsTotal.component';

@NgModule({
    declarations: [
        PaymentAssistancePlanOptionsTotalComponent,
    ],
    imports: [
        CommonModule,
        CommonPipesModule
    ],
    exports: [
        PaymentAssistancePlanOptionsTotalComponent
    ],
    providers: [
    ]
})
export class PaymentAssistancePlanOptionsTotalModule { }
