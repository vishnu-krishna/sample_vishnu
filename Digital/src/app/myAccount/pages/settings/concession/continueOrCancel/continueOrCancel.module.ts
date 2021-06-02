import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MauiButtonModule } from '../../../../maui/button/index';
import { ContinueOrCancelComponent } from './continueOrCancel.component';

@NgModule({
    imports: [
        CommonModule,
        MauiButtonModule
    ],
    exports: [
        ContinueOrCancelComponent,
    ],
    declarations: [
        ContinueOrCancelComponent
    ]
})
export class ContinueOrCancelModule {
}
