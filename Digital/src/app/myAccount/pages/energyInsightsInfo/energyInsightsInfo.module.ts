import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnergyInsightsInfoComponent } from './energyInsightsInfo.component';
import { LoadingModule } from '../../../shared/loaders/loading.module';
import { MauiButtonModule } from '../../maui/button';
import { MauiContainerModule } from '../../maui/container';
import { MauiHeadingModule } from '../../maui/heading';
import { MauiSecondaryNavigationModule } from '../../maui/secondaryNavigation';

export const ROUTES: Routes = [
    { path: '', component: EnergyInsightsInfoComponent },
];

@NgModule({
    declarations: [
        EnergyInsightsInfoComponent
    ],
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        LoadingModule,
        MauiButtonModule,
        MauiContainerModule,
        MauiHeadingModule,
        MauiSecondaryNavigationModule,
    ],
    exports: [
        EnergyInsightsInfoComponent
    ]
})
export class EnergyInsightsInfoModule { }
