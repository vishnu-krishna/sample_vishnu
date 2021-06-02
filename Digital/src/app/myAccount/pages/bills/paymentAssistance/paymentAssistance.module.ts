import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MauiButtonModule } from '../../../maui/button';
import { MauiHeadingModule } from '../../../maui/heading';
import { PaymentAssistanceChooseComponent } from './choose/paymentAssistanceChoose.component';
import { PaymentAssistanceChooseModule } from './choose/paymentAssistanceChoose.module';
import { PaymentExtensionApplicationComponent } from './extend/application/paymentExtensionApplication.component';
import { PaymentExtensionConfirmationComponent } from './extend/confirmation/paymentExtensionConfirmation.component';
import { PaymentExtensionEligibilityComponent } from './extend/eligibility/paymentExtensionEligibility.component';
import { PaymentExtensionRoutingGuard } from './extend/paymentExtensionRouting.guard';
import { PaymentExtensionsModule } from './extend/paymentExtensions.module';
import { PaymentAssistanceRoutingGuard } from './paymentAssistanceRouting.guard';
import { PaymentAssistanceWelcomeComponent } from './paymentAssistanceWelcome.component';
import { PaymentAssistancePlanConfirmComponent } from './plan/confirm/paymentAssistancePlanConfirm.component';
import { PaymentAssistancePlanConfirmModule } from './plan/confirm/paymentAssistancePlanConfirm.module';
import { PaymentAssistancePlanCustomComponent } from './plan/custom/paymentAssistancePlanCustom.component';
import { PaymentAssistancePlanCustomModule } from './plan/custom/paymentAssistancePlanCustom.module';
import { PaymentAssistancePlanOptionsComponent } from './plan/options/paymentAssistancePlanOptions.component';
import { PaymentAssistancePlanOptionsModule } from './plan/options/paymentAssistancePlanOptions.module';
import { PaymentAssistancePlanSuccessComponent } from './plan/success/paymentAssistancePlanSuccess.component';
import { PaymentAssistancePlanSuccessModule } from './plan/success/paymentAssistancePlanSuccess.module';
import { PaymentAssistanceSelectComponent } from './select/paymentAssistanceSelect.component';
import { PaymentAssistanceSelectModule } from './select/paymentAssistanceSelect.module';
import { MauiFuelChipModule } from '../../../maui/fuelChip';

export const ROUTES: Routes = [
    { path: 'select', component: PaymentAssistanceSelectComponent, canActivate: [PaymentAssistanceRoutingGuard] },
    { path: 'choose/:contractAccountNumber/:contractNumber', component: PaymentAssistanceChooseComponent, canActivate: [PaymentAssistanceRoutingGuard] },
    { path: 'plan', children: [

        { path: 'custom/:contractAccountNumber/:contractNumber', component: PaymentAssistancePlanCustomComponent },
        { path: 'confirm/custom/:contractAccountNumber/:contractNumber/:frequency/:startDate/:instalmentAmount', component: PaymentAssistancePlanConfirmComponent },
        { path: 'confirm/success/custom/:contractAccountNumber/:contractNumber', component: PaymentAssistancePlanSuccessComponent },

        { path: 'options/:contractAccountNumber/:contractNumber', component: PaymentAssistancePlanOptionsComponent },
        { path: 'confirm/options/:contractAccountNumber/:contractNumber/:frequency/:startDate/:instalmentAmount/:selectedNumberOfInstalments', component: PaymentAssistancePlanConfirmComponent },
        { path: 'confirm/success/options/:contractAccountNumber/:contractNumber', component: PaymentAssistancePlanSuccessComponent },

    ], canActivate: [ PaymentAssistanceRoutingGuard ] },
    { path: 'extend', children: [
        { path: 'select', component: PaymentExtensionEligibilityComponent },
        { path: 'confirm/:contractAccountNumber/:contractNumber', component: PaymentExtensionApplicationComponent },
        { path: 'success', component: PaymentExtensionConfirmationComponent },
    ], canActivate: [ PaymentExtensionRoutingGuard ] }
];

@NgModule({
    declarations: [
        PaymentAssistanceWelcomeComponent
    ],
    imports: [
        RouterModule.forChild(ROUTES),
        PaymentAssistanceSelectModule,
        PaymentAssistancePlanConfirmModule,
        PaymentAssistancePlanSuccessModule,
        PaymentAssistancePlanCustomModule,
        PaymentAssistancePlanOptionsModule,
        PaymentAssistanceChooseModule,
        PaymentExtensionsModule,
        CommonModule,
        MauiButtonModule,
        MauiHeadingModule,
        MauiFuelChipModule
    ],
    providers: [
        PaymentAssistanceRoutingGuard,
        PaymentExtensionRoutingGuard
    ]
})
export class PaymentAssistanceModule { }
