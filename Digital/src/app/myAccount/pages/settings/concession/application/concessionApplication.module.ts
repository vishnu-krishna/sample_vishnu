import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConcessionApplicationComponent } from './concessionApplication.component';

import { CommonComponentsModule } from './../../../../modules/commonComponents.module';
import { MyAccountMaterialModule } from './../../../../modules/my-account.material.module';

import { MauiButtonModule } from '../../../../maui/button';
import { MauiContainerModule } from './../../../../maui/container';
import { MauiFlashMessageModule } from './../../../../maui/flashMessage';
import { MauiHeadingModule } from './../../../../maui/heading';
import { MauiTermsAndConditionsModule } from './../../../../maui/termsAndConditions';
import { ContinueOrCancelModule } from '../continueOrCancel/continueOrCancel.module';

@NgModule({
    imports: [
        CommonModule,
        CommonComponentsModule,
        ReactiveFormsModule,
        MauiButtonModule,
        MauiContainerModule,
        MauiFlashMessageModule,
        MauiHeadingModule,
        MauiTermsAndConditionsModule,
        MyAccountMaterialModule,
        ContinueOrCancelModule
    ],
    exports: [
        ConcessionApplicationComponent,
        ContinueOrCancelModule
    ],
    declarations: [
        ConcessionApplicationComponent
    ]
})
export class ConcessionApplicationModule {
}
