import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { MauiButtonModule } from '../../maui/button';
import { CommonComponentsModule } from '../../modules/commonComponents.module';
import { CommonPipesModule } from '../../modules/commonPipes.module';

// Components
import { MyAccountMaterialModule } from '../../modules/my-account.material.module';
import { AlreadySmartMeterComponent } from './alreadySmartMeter/alreadySmartMeter.component';
import { EnergyTipsComponent } from './energyTips/energyTips.component';
import { MeterReadComponent } from './meterRead/meterRead.component';
import { QuickLinksComponent } from './quicklinks/quicklinks.component';
import { UsageComponent } from './usage.component';
import { UsageGraphDailyComponent } from './usageGraphDaily/usageGraphDaily.component';
import { UsageGraphHourlyComponent } from './usageGraphHourly/usageGraphHourly.component';
import { UsageGraphMonthlyAndBasicComponent } from './usageGraphMonthlyAndBasic/usageGraphMonthlyAndBasic.component';
import { UsageLegalMessageComponent } from './usageLegalMessage/usageLegalMessage.component';
import { UsageModalComponent } from './usageModal/usageModal.component';
import { MauiTooltipModule } from '../../maui/tooltip/tooltip.module';

// routes
export const ROUTES: Routes = [
    { path: '', component: UsageComponent },
    { path: 'meterreadcheck', component: AlreadySmartMeterComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonComponentsModule,
        CommonPipesModule,
        CommonModule,
        MatCardModule,
        MauiButtonModule,
        MyAccountMaterialModule,
        MauiTooltipModule
    ],
    exports: [
        MauiTooltipModule
    ],
    declarations: [
        UsageComponent,
        MeterReadComponent,
        QuickLinksComponent,
        UsageGraphMonthlyAndBasicComponent,
        UsageGraphDailyComponent,
        UsageGraphHourlyComponent,
        UsageLegalMessageComponent,
        UsageModalComponent,
        EnergyTipsComponent,
        AlreadySmartMeterComponent
    ]
})
export class UsageModule {}
