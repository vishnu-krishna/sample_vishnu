import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { MauiContainerModule } from '../../../maui/container';
import { MauiToggleModule } from '../../../maui/toggle';
import { MauiSecondaryNavigationModule } from '../../../maui/secondaryNavigation';
import { LoadingModule } from '../../../../shared/loaders/loading.module';
import { MauiButtonModule } from '../../../maui/button';
import { MauiFlashMessageModule } from '../../../maui/flashMessage';
import { EnergyInsightsChooseServiceComponent } from './chooseService/energyInsightsChooseService.component';
import { EnergyInsightsLandingComponent } from './landing/energyInsightsLanding.component';
import { EnergyInsightsSubscriptionComponent } from './subscription/energyInsightsSubscription.component';
import { MauiFuelChipModule } from '../../../maui/fuelChip';
import { MauiHeadingModule } from '../../../maui/heading';

export const ROUTES: Routes = [
    { path: '', component: EnergyInsightsLandingComponent },
    { path: 'services', component: EnergyInsightsChooseServiceComponent },
    { path: 'subscription', component: EnergyInsightsSubscriptionComponent },
];

@NgModule({
    declarations: [
        EnergyInsightsSubscriptionComponent,
        EnergyInsightsChooseServiceComponent,
        EnergyInsightsLandingComponent
    ],
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        LoadingModule,
        MauiContainerModule,
        MauiToggleModule,
        MauiSecondaryNavigationModule,
        MauiButtonModule,
        MauiFlashMessageModule,
        MauiFuelChipModule,
        MauiHeadingModule,
    ],
    exports: [
        EnergyInsightsSubscriptionComponent,
        EnergyInsightsChooseServiceComponent,
        EnergyInsightsLandingComponent
    ]
})
export class EnergyInsightsModule { }
