import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { GenericErrorImageModule } from '../../../../shared/component/genericError/genericErrorImage/genericErrorImage.module';
import { MauiButtonModule } from '../../../maui/button';
import { MauiContainerModule } from '../../../maui/container';
import { MauiFlashMessageModule } from '../../../maui/flashMessage';
import { MauiHeadingModule } from '../../../maui/heading';
import { MauiSecondaryNavigationModule } from '../../../maui/secondaryNavigation';
import { CommonComponentsModule } from '../../../modules/commonComponents.module';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';
import { ContactDetailsComponent } from './contactDetails.component';

// routes
export const ROUTES: Routes = [
    { path: '', component: ContactDetailsComponent },
    { path: ':context', component: ContactDetailsComponent },
    { path: ':context/:contextId', component: ContactDetailsComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        CommonComponentsModule,
        CommonModule,
        ReactiveFormsModule,
        HttpModule,
        MauiButtonModule,
        MauiContainerModule,
        MauiFlashMessageModule,
        MauiHeadingModule,
        MauiSecondaryNavigationModule,
        MyAccountMaterialModule,
        GenericErrorImageModule
    ],
    exports: [],
    declarations: [
        ContactDetailsComponent
    ],
    providers: [
    ]
})
export class ContactDetailsModule {
}
