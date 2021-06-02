import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillBreakdownComponent } from './billBreakdown.component';
import { CommonPipesModule } from '../../../../modules/commonPipes.module';

@NgModule({
    declarations: [
        BillBreakdownComponent
    ],
    imports: [
        CommonModule,
        CommonPipesModule
    ],
    exports: [
        BillBreakdownComponent
    ]
})
export class BillBreakdownModule {
}
