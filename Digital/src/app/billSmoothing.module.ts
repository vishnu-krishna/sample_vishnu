import { CommonModule }                   from '@angular/common';
import { NgModule }                       from '@angular/core';
import { FormsModule }                    from '@angular/forms';
import { RouterModule, Routes }           from '@angular/router';

import { CommonComponentsModule }         from './myAccount/modules/commonComponents.module';
import { CommonPipesModule }              from './myAccount/modules/commonPipes.module';
import { MyAccountMaterialModule } from './myAccount/modules/my-account.material.module';
import { BillSmoothingService }           from './myAccount/pages/settings/billSmoothing/billSmoothing.service';

// Bill smoothing components
import { BillSmoothingComponent } from './myAccount/pages/settings/billSmoothing/billSmoothing.component';
import { BillSmoothingChatButtonComponent } from './myAccount/pages/settings/billSmoothing/billSmoothingChatButton/billSmoothingChatButton.component';
import { BillSmoothingFuelComponent } from './myAccount/pages/settings/billSmoothing/billSmoothingFuel/billSmoothingFuel.component';
import { BillSmoothingMessageComponent } from './myAccount/pages/settings/billSmoothing/billSmoothingMessage/billSmoothingMessage.component';
import { BillSmoothingSetupButtonComponent } from './myAccount/pages/settings/billSmoothing/billSmoothingSetupButton/billSmoothingSetupButton.component';
import { SetUpBillSmoothingResultMessage } from './shared/messages/setUpBillSmoothingResultMessage';

// routes
export const ROUTES: Routes = [
    { path: '', component: BillSmoothingComponent }
];

@NgModule({
    declarations: [
        BillSmoothingComponent,
        BillSmoothingSetupButtonComponent,
        BillSmoothingFuelComponent,
        BillSmoothingMessageComponent,
        BillSmoothingChatButtonComponent
    ],
    imports: [
        CommonModule,
        CommonPipesModule,
        RouterModule.forChild(ROUTES),
        MyAccountMaterialModule,
        CommonComponentsModule,
        FormsModule
    ],
    providers: [
        BillSmoothingService,
        SetUpBillSmoothingResultMessage
    ]
})
export class BillSmoothingModule { }
