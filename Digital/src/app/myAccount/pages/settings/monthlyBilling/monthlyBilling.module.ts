import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { CommonComponentsModule } from '../../../modules/commonComponents.module';
import { CommonPipesModule } from '../../../modules/commonPipes.module';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';

// Components
import { MauiButtonModule } from '../../../maui/button/index';
import { MauiConfirmationBannerModule } from '../../../maui/confirmationBanner/confirmationBanner.module';
import { MauiContainerModule } from '../../../maui/container/index';
import { MauiDayOfMonthPickerModule } from '../../../maui/dayOfMonthPicker/index';
import { MauiFlashMessageModule } from '../../../maui/flashMessage/index';
import { MauiFuelChipModule } from '../../../maui/fuelChip/index';
import { MauiHeadingModule } from '../../../maui/heading/index';
import { MauiIconListModule } from '../../../maui/iconList/iconList.module';
import { MauiLightBoxModule } from '../../../maui/lightBox/index';
import { MauiSecondaryNavigationModule } from '../../../maui/secondaryNavigation/index';
import { MauiTermsAndConditionsModule } from '../../../maui/termsAndConditions/index';
import { MonthlyBillingChooseDateComponent } from './chooseDate/chooseDate.component';
import { TermsAndConditionsMonthlyBillingComponent } from './chooseDate/monthlyBillingTermsAndConditions/monthlyBillingTermsAndConditions.component';
import { MonthlyBillingChooseServiceComponent } from './chooseService/chooseService.component';
import { MonthlyBillingConfirmationComponent } from './confirmation/confirmation.component';
import { MonthlyBillingRoutingGuard } from './monthlyBilling.guard';
import { MonthlyBillingSettingsComponentModule } from './monthlyBillingSettings/index';
import { MonthlyBillingSettingsComponent } from './monthlyBillingSettings/monthlyBilling.settings.component';
import { UpcomingBillsMonthlyBillingComponent } from './upcomingBills/upcomingBills.monthlyBilling.component';

// routes
export const ROUTES: Routes = [
    { path: '', component: MonthlyBillingSettingsComponent },
    { path: 'services', component: MonthlyBillingChooseServiceComponent, canActivate: [MonthlyBillingRoutingGuard] },
    { path: 'date', component: MonthlyBillingChooseDateComponent, canActivate: [MonthlyBillingRoutingGuard] },
    { path: 'confirmation', component: MonthlyBillingConfirmationComponent, canActivate: [MonthlyBillingRoutingGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        MyAccountMaterialModule,
        CommonComponentsModule,
        CommonPipesModule,
        MonthlyBillingSettingsComponentModule,
        MauiHeadingModule,
        MauiIconListModule,
        MauiFuelChipModule,
        MauiSecondaryNavigationModule,
        MauiContainerModule,
        MauiConfirmationBannerModule,
        MauiDayOfMonthPickerModule,
        MauiFlashMessageModule,
        MauiTermsAndConditionsModule,
        MauiLightBoxModule,
        MauiButtonModule
    ],
    declarations: [
        MonthlyBillingChooseDateComponent,
        MonthlyBillingChooseServiceComponent,
        MonthlyBillingConfirmationComponent,
        TermsAndConditionsMonthlyBillingComponent,
        UpcomingBillsMonthlyBillingComponent
    ],
    exports: [],
    providers: [
        MonthlyBillingRoutingGuard
    ],
    entryComponents: [
        MonthlyBillingSettingsComponent
    ]
})
export class MonthlyBillingModule {}
