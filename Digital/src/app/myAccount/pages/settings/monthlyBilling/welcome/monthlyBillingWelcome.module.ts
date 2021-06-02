
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoadingModule } from '../../../../../shared/loaders/loading.module';
import { MauiButtonModule } from '../../../../maui/button';
import { MauiHeadingModule } from '../../../../maui/heading';
import { MonthlyBillingWelcomeComponent } from './monthlyBillingWelcome.component';

export const ROUTES: Routes = [
    { path: '', component: MonthlyBillingWelcomeComponent }
];
@NgModule({
    declarations: [
        MonthlyBillingWelcomeComponent,
    ],
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        MauiButtonModule,
        MauiHeadingModule,
        LoadingModule
    ],
    exports: [
        MonthlyBillingWelcomeComponent
    ],
    providers: [

    ]
})
export class MonthlyBillingWelcomeModule { }
