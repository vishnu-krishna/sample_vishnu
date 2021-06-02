import { NgModule } from '@angular/core';
import { LoadingModule } from './../../../../shared/loaders/loading.module';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CommonComponentsModule } from '../../../modules/commonComponents.module';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';
import { MauiFlashMessageModule } from './../../../maui/flashMessage/flashMessage.module';
import { NotificationsComponent } from './notifications.component';
import { AccountDetailComponent } from './../../../settings/accountDetail/accountDetail.component';
import { MauiTooltipModule } from './../../../maui/tooltip/tooltip.module';

import { LoadingComponent } from '../../../../shared/loaders/loading.component';
import { MauiToggleModule } from '../../../maui/toggle';
import { EnergyInsightsService } from '../../../services/energyInsights.service';
import { EnergyInsightsApiRepository } from '../../../repository/energyInsightsApi.repository';
import { ManageEnergyInsightsComponent } from './manageEnergyInsights/manageEnergyInsights.component';
import { ApiService } from '../../../../shared/service/api.service';
import { EBillingComponent } from './emailBilling/eBilling.component';
import { EBillingMultiBPWebChatModule } from '../billing/emailBilling/eBillingMultiBPWebChat/eBillingMultiBPWebChat.module';
import { CommonPipesModule } from '../../../modules/commonPipes.module';
import { ISettingsService } from '../../../services/settings/settings.service.interface';
import { FeatureFlagService } from '../../../services/featureFlag.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { ContactDetailsUpdateConfirmationModule } from '../contactDetails/contactDetailsUpdateConfirmation/contactDetailsUpdateConfirmation.module';
import { NotificationsRoutingGuard } from './notificationsRouting.guard';

export const ROUTES: Routes = [
    { path: '', component: NotificationsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonModule,
        MyAccountMaterialModule,
        CommonComponentsModule,
        LoadingModule,
        MauiToggleModule,
        MauiFlashMessageModule,
        MauiTooltipModule,
        EBillingMultiBPWebChatModule,
        ContactDetailsUpdateConfirmationModule,
        CommonPipesModule,
    ],
    declarations: [
        NotificationsComponent,
        ManageEnergyInsightsComponent,
        EBillingComponent,
    ],
    providers: [
        EnergyInsightsService,
        EnergyInsightsApiRepository,
        NotificationsRoutingGuard,
    ]
})
export class NotificationsModule {}
