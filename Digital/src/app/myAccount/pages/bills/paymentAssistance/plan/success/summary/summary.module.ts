import { NgModule } from '@angular/core';
import { PaymentAssistancePlanSuccessSummaryComponent } from './summary.component';
import { CommonModule } from '@angular/common';
import { CommonPipesModule } from '../../../../../../modules/commonPipes.module';
import { FormatDatePipe } from '../../../../../../pipes/formatDate.pipe';

@NgModule({
    declarations: [
        PaymentAssistancePlanSuccessSummaryComponent,
    ],
    imports: [
        CommonModule,
        CommonPipesModule
    ],
    exports: [
        PaymentAssistancePlanSuccessSummaryComponent
    ],
    providers: [
        FormatDatePipe
    ]
})
export class PaymentAssistancePlanSuccessSummaryModule { }
