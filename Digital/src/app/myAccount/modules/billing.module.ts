import { CommonModule }                   from '@angular/common';
import { NgModule }                       from '@angular/core';
import { RouterModule }                   from '@angular/router';
import { BillBottomNoticeComponent }      from '../pages/bills/billPanel/billBottomNotice/billBottomNotice.component';
import { BillMessagePanelComponent }      from '../pages/bills/billPanel/billMessagePanel/billMessagePanel.component';
import { BillMessagePanelPaygComponent }  from '../pages/bills/billPanel/billMessagePanelPayg/billMessagePanelPayg.component';
import { BillPanelComponent }             from '../pages/bills/billPanel/billPanel.component';
import { BillPaymentAmountComponent }     from '../pages/bills/billPanel/billPaymentAmount/billPaymentAmount.component';
import { BillPaymentAmountPaygComponent } from '../pages/bills/billPanel/billPaymentAmountPayg/billPaymentAmountPayg.component';
import { BillPaymentButtonComponent }     from '../pages/bills/billPanel/billPaymentButton/billPaymentButton.component';
import { BillSubtextComponent }           from '../pages/bills/billPanel/billSubtext/billSubtext.component';
import { BillTitleComponent }             from '../pages/bills/billPanel/billTitle/billTitle.component';
import { BillsButtonStackComponent } from '../pages/bills/billsButtonStack/billsButtonStack.component';
import { CommonComponentsModule }         from './commonComponents.module';
import { CommonPipesModule }              from './commonPipes.module';
import { MyAccountMaterialModule } from './my-account.material.module';
import { BillBreakdownModule } from './../pages/bills/billPanel/billBreakdown/billBreakdown.module';
import { BillPaymentInstalmentPlanComponent } from '../pages/bills/billPanel/billPaymentAmount/instalmentPlan/billPaymentInstalmentPlan.component';
import { BillSubtextInstalmentPlanComponent } from '../pages/bills/billPanel/billSubtext/instalmentPlan/billSubtextInstalmentPlan.component';
import { BillDateModule } from '../pages/bills/billPanel/billDate/billDate.module';
import { BillPanelInstalmentPlanBillPeriodModule } from '../pages/bills/billPanel/instalmentPlanBillPeriod';
import { BillInstalmentPlanDescriptionComponent } from './../pages/bills/billPanel/billInstalmentPlanDescription/billInstalmentPlanDescription.component';

@NgModule({
    declarations: [
        BillPanelComponent,
        BillPaymentAmountComponent,
        BillSubtextComponent,
        BillTitleComponent,
        BillBottomNoticeComponent,
        BillMessagePanelComponent,
        BillPaymentButtonComponent,
        BillMessagePanelPaygComponent,
        BillPaymentAmountPaygComponent,
        BillsButtonStackComponent,
        BillPaymentInstalmentPlanComponent,
        BillSubtextInstalmentPlanComponent,
        BillInstalmentPlanDescriptionComponent
    ],
    exports: [
        BillPanelComponent,
        BillsButtonStackComponent
    ],
    imports: [
        CommonModule,
        CommonPipesModule,
        RouterModule,
        MyAccountMaterialModule,
        CommonComponentsModule,
        BillBreakdownModule,
        BillDateModule,
        BillPanelInstalmentPlanBillPeriodModule
    ]
})
export class BillingModule { }
