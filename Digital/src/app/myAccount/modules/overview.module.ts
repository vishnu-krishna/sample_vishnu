import { CommonModule }                         from '@angular/common';
import { NgModule }                             from '@angular/core';
import { RouterModule }                         from '@angular/router';
import { MyAccountMaterialModule } from './my-account.material.module';

import { BillingModule }                        from './billing.module';
import { CommonComponentsModule }               from './commonComponents.module';
import { CommonPipesModule }                    from './commonPipes.module';
import { SolarCheckModule } from './solarCheck.module';

// All components relating to the overview page
import { BasicMeterChartComponent }   from '../charts/basicMeterChart.component';
import { ButtonStackComponent }       from '../dashboard/buttonStack/buttonStack.component';
import { DashboardComponent }         from '../dashboard/dashboard.component';
import { DashboardLoadingComponent }  from '../dashboard/dashboard.loading.component';
import { FuelTitleComponent }         from '../dashboard/fuelTitle/fuelTitle.component';
import { MarketingTileComponent }     from '../dashboard/marketingTile/marketingTile.component';

import { NoDataChartComponent }       from '../charts/noDataChart.component';
import { SmartMeterChartComponent }   from '../charts/smartMeterChart.component';
import { SmartMeterTooltipComponent } from '../charts/smartMeterTooltip.component';
import { ReSignComponent }            from '../dashboard/reSign/reSign.component';
import { SelfServiceMeterReadBannerComponent }   from '../dashboard/selfServiceMeterReadBanner/selfServiceMeterReadBanner.component';
import { SmsPayBannerComponent } from '../dashboard/smsPayBanner/smsPayBanner.component';
import { MauiProgressTrackerModule } from '../maui/progressTracker';
import { PaymentAssistancePlanInstalmentsModule } from '../pages/bills/paymentAssistance/plan/instalments';

@NgModule({
  declarations: [
        DashboardComponent,
        DashboardLoadingComponent,
        ReSignComponent,
        ButtonStackComponent,
        NoDataChartComponent,
        BasicMeterChartComponent,
        SmartMeterChartComponent,
        SmartMeterTooltipComponent,
        MarketingTileComponent,
        FuelTitleComponent,
        SelfServiceMeterReadBannerComponent,
        SmsPayBannerComponent
  ],
  exports: [
        FuelTitleComponent,
        ButtonStackComponent,
        MarketingTileComponent
  ],
  imports: [
        CommonModule,
        CommonComponentsModule,
        CommonPipesModule,
        RouterModule,
        MyAccountMaterialModule,
        BillingModule,
        SolarCheckModule,
        MauiProgressTrackerModule,
        PaymentAssistancePlanInstalmentsModule
  ],
  providers: [
      DashboardComponent
  ]
})
export class OverviewModule { }
