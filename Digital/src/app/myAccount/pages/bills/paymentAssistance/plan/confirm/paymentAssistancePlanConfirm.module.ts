import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentAssistancePlanConfirmComponent } from './paymentAssistancePlanConfirm.component';
import { MauiButtonModule } from '../../../../../maui/button';
import { MauiHeadingModule } from '../../../../../maui/heading';
import { MauiSecondaryNavigationModule } from '../../../../../maui/secondaryNavigation';
import { MauiContainerModule } from '../../../../../maui/container';
import { MauiLightBoxModule } from '../../../../../maui/lightBox';
import { MauiTermsAndConditionsModule } from '../../../../../maui/termsAndConditions';
import { IInstalmentPlanSummaryService, InstalmentPlanSummaryService } from '../../../../../services/paymentScheme/instalmentPlanSummary.service';
import { MauiFuelChipModule } from '../../../../../maui/fuelChip/index';
import { PaymentAssistanceTermsAndConditionsModule } from './termsAndConditions/paymentAssistanceTermsAndConditions.module';
import { MauiProgressTrackerModule } from '../../../../../maui/progressTracker';
import { CommonPipesModule } from '../../../../../modules/commonPipes.module';
import { LoadingModule } from '../../../../../../shared/loaders/loading.module';
import { MauiFlashMessageModule } from '../../../../../maui/flashMessage';
import { LinkModule } from '../../../../../../shared/component/link';
import { IPaymentSchemeApi, PaymentSchemeApiService } from '../../../../../services/paymentScheme/paymentSchemeApi.service';
import { FuelChipService } from '../../services';
import { PaymentAssistancePlanInstalmentsModule } from '../instalments';
import { GenericStateService } from '../../../../../services/generics/genericState.service';
import { PaymentAssistancePlanConfirmStateModel } from './models';
import { WebChatModule } from '../../../../../../shared/component/webChat/webChat.module';

@NgModule({
    declarations: [
        PaymentAssistancePlanConfirmComponent
    ],
    imports: [
        CommonModule,
        MauiSecondaryNavigationModule,
        MauiContainerModule,
        MauiButtonModule,
        MauiHeadingModule,
        MauiFuelChipModule,
        MauiTermsAndConditionsModule,
        MauiLightBoxModule,
        CommonPipesModule,
        LoadingModule,
        MauiProgressTrackerModule,
        MauiFlashMessageModule,
        MauiSecondaryNavigationModule,
        LinkModule,
        PaymentAssistanceTermsAndConditionsModule,
        PaymentAssistancePlanInstalmentsModule,
        WebChatModule
    ],
    exports: [
        PaymentAssistancePlanConfirmComponent
    ],
    providers: [
        FuelChipService,
        { provide: IInstalmentPlanSummaryService, useClass: InstalmentPlanSummaryService },
        { provide: 'paymentAssistancePlanConfirmStateService', useClass: GenericStateService }
    ]
})

export class PaymentAssistancePlanConfirmModule { }
