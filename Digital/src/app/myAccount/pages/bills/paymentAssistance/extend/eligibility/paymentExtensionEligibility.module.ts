import { MauiSecondaryNavigationModule } from './../../../../../maui/secondaryNavigation/secondaryNavigation.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoadingModule } from '../../../../../../shared/loaders/loading.module';
import { MauiButtonModule } from '../../../../../maui/button/index';
import { MauiContainerModule } from '../../../../../maui/container/index';
import { MauiFuelChipModule } from '../../../../../maui/fuelChip/index';
import { MauiHeadingModule } from '../../../../../maui/heading/index';
import { PaymentExtensionErrorModule } from '../paymentExtensionError.module';

import { IPaymentExtensionEligibility, PaymentExtensionEligibilityService } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { PaymentExtensionEligibilityComponent } from './paymentExtensionEligibility.component';
import { AlreadyExtendedFuelChipFilterService } from './services/alreadyExtendedFuelChipFilter.service';
import { EligibleFuelChipFilterService } from './services/eligibleFuelChipFilter.service';
import { FuelChipClassificationService, IFuelChipClassificationService } from './services/fuelChipClassification.service';
import { IneligibleFuelChipFilterService } from './services/ineligibleFuelChipFilter.service';
import { NoIssuedBillFuelChipFilterService } from './services/noIssuedBillFuelChipFilter.service';
import { IPaymentExtensionFuelChipService, PaymentExtensionFuelChipService } from './services/paymentExtensionFuelChip.service';
import { AglCurrencyPipe } from '../../../../../pipes/aglCurrency.pipe';
import { IPaymentAssistanceNavigationPersistedStateService, PaymentAssistanceNavigationPersistedStateService } from '../../services';

@NgModule({
    declarations: [
        PaymentExtensionEligibilityComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        MauiHeadingModule,
        MauiContainerModule,
        MauiFuelChipModule,
        MauiButtonModule,
        LoadingModule,
        PaymentExtensionErrorModule,
        MauiSecondaryNavigationModule,
    ],
    exports: [
        PaymentExtensionEligibilityComponent
    ],
    providers: [
        { provide: IPaymentExtensionFuelChipService, useClass: PaymentExtensionFuelChipService },
        { provide: IFuelChipClassificationService, useClass: FuelChipClassificationService },
        { provide: IPaymentExtensionEligibility, useClass: PaymentExtensionEligibilityService },
        EligibleFuelChipFilterService,
        AlreadyExtendedFuelChipFilterService,
        IneligibleFuelChipFilterService,
        NoIssuedBillFuelChipFilterService,
        AglCurrencyPipe,
        { provide: IPaymentAssistanceNavigationPersistedStateService, useClass: PaymentAssistanceNavigationPersistedStateService }
    ]
})
export class PaymentExtensionEligibilityModule { }
