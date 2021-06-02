import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillDateComponent } from './billDate.component';
import { CommonPipesModule } from '../../../../modules/commonPipes.module';

@NgModule({
    declarations: [
        BillDateComponent
    ],
    imports: [
        CommonModule,
        CommonPipesModule
    ],
    exports: [
        BillDateComponent
    ]
})
export class BillDateModule {
}
