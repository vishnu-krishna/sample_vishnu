import { NgModule } from '@angular/core';
import { MauiHeadingModule } from '../../../../maui/heading';
import { MauiContainerModule } from '../../../../maui/container';
import { PaymentAssistanceChooseComponent } from './paymentAssistanceChoose.component';
import { MauiFuelChipModule } from '../../../../maui/fuelChip';
import { MauiIconListModule } from '../../../../maui/iconList';
import { MauiButtonModule } from '../../../../maui/button';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../../../../../shared/loaders/loading.module';
import { PaymentExtensionErrorModule } from '../extend/paymentExtensionError.module';
import { MauiFlashMessageModule } from '../../../../maui/flashMessage';
import { MauiSecondaryNavigationModule } from './../../../../maui/secondaryNavigation/secondaryNavigation.module';
import { PaymentAssistanceNavigationPersistedStateService, IPaymentAssistanceNavigationPersistedStateService } from './../services/paymentAssistanceNavigationPersistedState.service';

@NgModule({
    declarations: [
        PaymentAssistanceChooseComponent,
    ],
    imports: [
        CommonModule,
        MauiHeadingModule,
        MauiContainerModule,
        MauiIconListModule,
        MauiFuelChipModule,
        MauiButtonModule,
        MauiFlashMessageModule,
        MauiSecondaryNavigationModule,
        LoadingModule,
        PaymentExtensionErrorModule
    ],
    exports: [
        PaymentAssistanceChooseComponent
    ],
    providers: [
        { provide: IPaymentAssistanceNavigationPersistedStateService, useClass: PaymentAssistanceNavigationPersistedStateService }
    ]
})
export class PaymentAssistanceChooseModule { }
