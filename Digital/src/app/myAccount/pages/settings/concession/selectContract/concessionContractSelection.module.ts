import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcessionContractSelectionComponent } from './concessionContractSelection.component';

import { MauiButtonModule } from '../../../../maui/button';
import { MauiHeadingModule } from './../../../../maui/heading';
import { ContinueOrCancelModule } from '../continueOrCancel/continueOrCancel.module';
import { MauiIconListModule } from '../../../../maui/iconList';
import { CommonComponentsModule } from '../../../../modules/commonComponents.module';
import { MauiContainerModule } from '../../../../maui/container';
import { MauiConfirmationBannerModule } from '../../../../maui/confirmationBanner';
import { MauiCheckboxGroupModule } from '../../../../maui/checkboxGroup';
import { MauiCheckboxModule } from './../../../../maui/checkbox';
import { MauiFlashMessageModule } from '../../../../maui/flashMessage';
import { CommonPipesModule } from '../../../../modules/commonPipes.module';

@NgModule({
    imports: [
        CommonModule,
        MauiButtonModule,
        MauiHeadingModule,
        ContinueOrCancelModule,
        CommonComponentsModule,
        MauiConfirmationBannerModule,
        MauiContainerModule,
        MauiIconListModule,
        MauiButtonModule,
        MauiCheckboxGroupModule,
        MauiFlashMessageModule,
        CommonPipesModule,
        MauiCheckboxModule,
        MauiFlashMessageModule
    ],
    exports: [
        ConcessionContractSelectionComponent,
    ],
    declarations: [
        ConcessionContractSelectionComponent
    ]
})
export class ConcessionContractSelectionModule {
}
