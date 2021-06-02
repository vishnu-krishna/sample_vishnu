
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonPipesModule } from '../../../../../modules/commonPipes.module';

import { LoadingModule } from '../../../../../../shared/loaders/loading.module';
import { MauiButtonModule } from '../../../../../maui/button/index';
import { MauiContainerModule } from '../../../../../maui/container/index';
import { MauiFlashMessageModule } from '../../../../../maui/flashMessage/index';
import { MauiFuelChipModule } from '../../../../../maui/fuelChip/index';
import { MauiHeadingModule } from '../../../../../maui/heading/index';
import { MauiSecondaryNavigationModule } from '../../../../../maui/secondaryNavigation/index';
import { SegmentedButtonsModule } from '../../../../../maui/segmentedButtons/segmentedButtons.module';
import { MauiTermsAndConditionsModule } from '../../../../../maui/termsAndConditions/index';
import { MyAccountMaterialModule } from '../../../../../modules/my-account.material.module';
import { PaymentExtensionErrorModule } from '../paymentExtensionError.module';
import { PaymentExtensionApplicationComponent } from './paymentExtensionApplication.component';

import { IPaymentExtensionApplication, PaymentExtensionApplicationService } from '../../../../../services/paymentScheme/paymentExtensionApplication.service';
import { LinkModule } from '../../../../../../shared/component/link';
import { PaymentAssistanceNavigationPersistedStateService, IPaymentAssistanceNavigationPersistedStateService } from '../../services';

@NgModule({
    declarations: [
        PaymentExtensionApplicationComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        CommonPipesModule,
        MyAccountMaterialModule,
        LoadingModule,
        MauiSecondaryNavigationModule,
        MauiHeadingModule,
        SegmentedButtonsModule,
        MauiContainerModule,
        MauiButtonModule,
        MauiTermsAndConditionsModule,
        MauiFuelChipModule,
        MauiFlashMessageModule,
        PaymentExtensionErrorModule,
        LinkModule
    ],
    exports: [
        PaymentExtensionApplicationComponent
    ],
    providers: [
        { provide: IPaymentExtensionApplication, useClass: PaymentExtensionApplicationService },
        { provide: IPaymentAssistanceNavigationPersistedStateService, useClass: PaymentAssistanceNavigationPersistedStateService }
    ]
})
export class PaymentExtensionApplicationModule { }
