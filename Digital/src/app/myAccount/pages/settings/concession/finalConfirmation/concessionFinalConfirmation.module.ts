import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MauiIconListModule } from '../../../../maui/iconList';
import { MauiConfirmationBannerModule } from '../../../../maui/confirmationBanner';
import { ConcessionFinalConfirmationComponent } from './concessionFinalConfirmation.component';
import { MauiButtonModule } from '../../../../maui/button';
import { MauiContainerModule } from '../../../../maui/container';
import { CommonComponentsModule } from '../../../../modules/commonComponents.module';

@NgModule({
    imports: [
        CommonComponentsModule,
        CommonModule,
        MauiConfirmationBannerModule,
        MauiContainerModule,
        MauiIconListModule,
        MauiButtonModule
    ],
    exports: [
        ConcessionFinalConfirmationComponent,
    ],
    declarations: [
        ConcessionFinalConfirmationComponent
    ]
})
export class ConcessionFinalConfirmationModule {
}
