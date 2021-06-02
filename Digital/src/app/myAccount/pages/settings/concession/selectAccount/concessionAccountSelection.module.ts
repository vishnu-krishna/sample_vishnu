import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MauiButtonModule } from '../../../../maui/button';
import { MauiContainerModule } from '../../../../maui/container';
import { MauiIconListModule } from '../../../../maui/iconList';
import { MauiConfirmationBannerModule } from '../../../../maui/confirmationBanner';
import { CommonComponentsModule } from '../../../../modules/commonComponents.module';
import { ConcessionAccountSelectionComponent } from './concessionAccountSelection.component';
import { MauiHeadingModule } from '../../../../maui/heading';
import { CommonPipesModule } from '../../../../modules/commonPipes.module';

@NgModule({
    imports: [
        CommonComponentsModule,
        CommonModule,
        MauiConfirmationBannerModule,
        MauiContainerModule,
        MauiIconListModule,
        MauiButtonModule,
        MauiHeadingModule,
        CommonPipesModule
    ],
    exports: [
        ConcessionAccountSelectionComponent,
    ],
    declarations: [
        ConcessionAccountSelectionComponent
    ]
})
export class ConcessionAccountSelectionModule {
}
