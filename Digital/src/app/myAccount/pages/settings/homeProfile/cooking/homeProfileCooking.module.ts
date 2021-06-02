import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MauiButtonModule } from '../../../../maui/button/button.module';
import { MauiRadioButtonGroupModule } from '../../../../maui/radioButtonGroup/radioButtonGroup.module';
import { HomeProfileHeaderModule } from '../header/homeProfileHeader.module';
import { HomeProfileFooterModule } from '../footer/homeProfileFooter.module';
import { HomeProfileCookingComponent } from './homeProfileCooking.component';
import { LoadingModule } from './../../../../../shared/loaders/loading.module';

@NgModule({
    declarations: [
        HomeProfileCookingComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        MauiButtonModule,
        MauiRadioButtonGroupModule,
        HomeProfileHeaderModule,
        HomeProfileFooterModule
    ],
    exports: [
        HomeProfileCookingComponent
    ]
})
export class HomeProfileCookingModule { }
