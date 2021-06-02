import { PaymentAssistanceNavigationPersistedStateService, IPaymentAssistanceNavigationPersistedStateService } from './../services/paymentAssistanceNavigationPersistedState.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentAssistanceSelectComponent } from './paymentAssistanceSelect.component';
import { LoadingModule } from '../../../../../shared/loaders/loading.module';
import { MauiHeadingModule } from '../../../../maui/heading';
import { PaymentAssistanceSelectErrorModule } from './error/paymentAssistanceSelectError.module';
import { MauiContainerModule } from '../../../../maui/container';
import { MauiFuelChipModule } from '../../../../maui/fuelChip';
import { MauiButtonModule } from '../../../../maui/button';
import {
    IBillStatusDisplayService,
    BillStatusDisplayService } from './services';

import {
    IFuelChipService,
    FuelChipService,
    IFuelChipClassificationService,
    FuelChipClassificationService,
    EligibleFuelChipFilterService,
    AlreadyExtendedFuelChipFilterService,
    IneligibleFuelChipFilterService } from '../services';
import { MauiSecondaryNavigationModule } from '../../../../maui/secondaryNavigation';
import { WebChatModule } from '../../../../../shared/component/webChat/webChat.module';

@NgModule({
    declarations: [
        PaymentAssistanceSelectComponent,
    ],
    imports: [
        CommonModule,
        LoadingModule,
        MauiHeadingModule,
        MauiContainerModule,
        MauiFuelChipModule,
        MauiButtonModule,
        MauiSecondaryNavigationModule,
        PaymentAssistanceSelectErrorModule,
        WebChatModule
    ],
    exports: [
        PaymentAssistanceSelectComponent
    ],
    providers: [
        EligibleFuelChipFilterService,
        AlreadyExtendedFuelChipFilterService,
        IneligibleFuelChipFilterService,
        { provide: IFuelChipService, useClass: FuelChipService },
        { provide: IFuelChipClassificationService, useClass: FuelChipClassificationService },
        { provide: IBillStatusDisplayService, useClass: BillStatusDisplayService },
        { provide: IPaymentAssistanceNavigationPersistedStateService, useClass: PaymentAssistanceNavigationPersistedStateService }
    ]
})
export class PaymentAssistanceSelectModule { }
