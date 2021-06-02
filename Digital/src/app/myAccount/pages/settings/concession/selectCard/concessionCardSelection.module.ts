import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsModule } from './../../../../modules/commonComponents.module';
import { ConcessionCardSelectionComponent } from './concessionCardSelection.component';

import { MauiButtonModule } from '../../../../maui/button';
import { MauiContainerModule } from './../../../../maui/container';
import { MauiHeadingModule } from './../../../../maui/heading';
import { MauiFlashMessageModule } from './../../../../maui/flashMessage';
import { MauiRadioButtonGroupModule } from './../../../../maui/radioButtonGroup';
import { ContinueOrCancelModule } from '../continueOrCancel/continueOrCancel.module';
import { MyAccountMaterialModule } from './../../../../modules/my-account.material.module';

@NgModule({
    imports: [
        CommonComponentsModule,
        CommonModule,
        MauiButtonModule,
        MauiContainerModule,
        MauiHeadingModule,
        MauiRadioButtonGroupModule,
        MauiFlashMessageModule,
        MyAccountMaterialModule,
        ContinueOrCancelModule
    ],
    exports: [
        ConcessionCardSelectionComponent,
    ],
    declarations: [
        ConcessionCardSelectionComponent
    ]
})
export class ConcessionCardSelectionModule {
}
