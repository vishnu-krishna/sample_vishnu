import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcessionConfirmDetailsComponent } from './concessionConfirmDetails.component';
import { CommonComponentsModule } from './../../../../modules/commonComponents.module';

import { MauiButtonModule } from '../../../../maui/button/index';
import { MauiContainerModule } from './../../../../maui/container';
import { MauiHeadingModule } from './../../../../maui/heading';
import { ContinueOrCancelModule } from '../continueOrCancel/continueOrCancel.module';
import { MauiFlashMessageModule } from '../../../../maui/flashMessage';

@NgModule({
    imports: [
        CommonComponentsModule,
        CommonModule,
        MauiButtonModule,
        MauiContainerModule,
        MauiHeadingModule,
        ContinueOrCancelModule,
        MauiFlashMessageModule
    ],
    exports: [
        ConcessionConfirmDetailsComponent,
    ],
    declarations: [
        ConcessionConfirmDetailsComponent
    ]
})
export class ConcessionConfirmDetailsModule {
}
