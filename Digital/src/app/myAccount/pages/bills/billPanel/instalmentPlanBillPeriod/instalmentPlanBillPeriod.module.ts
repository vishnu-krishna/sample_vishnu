import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BillPanelInstalmentPlanBillPeriodComponent } from './instalmentPlanBillPeriod.component';
import { CommonPipesModule } from '../../../../modules/commonPipes.module';
import { Now } from '../../../../../shared/service/now.service';

@NgModule({
    declarations: [
        BillPanelInstalmentPlanBillPeriodComponent
    ],
    imports: [
        CommonModule,
        CommonPipesModule
    ],
    exports: [
        BillPanelInstalmentPlanBillPeriodComponent
    ],
    providers: [
        Now
    ]
})
export class BillPanelInstalmentPlanBillPeriodModule { }
