import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentAssistancePlanOptionsSuggestionsComponent } from './suggestions.component';
import { MauiRadioButtonGroupModule } from '../../../../../../maui/radioButtonGroup';
import { CommonPipesModule } from '../../../../../../modules/commonPipes.module';
import { MauiChevronMenuModule } from '../../../../../../maui/chevronMenu';

@NgModule({
    declarations: [
        PaymentAssistancePlanOptionsSuggestionsComponent,
    ],
    imports: [
        CommonModule,
        MauiRadioButtonGroupModule,
        MauiChevronMenuModule,
        CommonPipesModule
    ],
    exports: [
        PaymentAssistancePlanOptionsSuggestionsComponent
    ],
    providers: [
    ]
})
export class PaymentAssistancePlanOptionsSuggestionsModule { }
