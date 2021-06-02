import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MauiButtonModule } from '../../../../maui/button/button.module';
import { MauiHeadingModule } from '../../../../maui/heading/heading.module';
import { SegmentedButtonsModule } from '../../../../maui/segmentedButtons/segmentedButtons.module';
import { HomeProfileYourHomeComponent } from './homeProfileYourHome.component';
import { MauiRadioButtonGroupModule } from '../../../../maui/radioButtonGroup';
import { HomeProfileFooterModule } from '../footer/homeProfileFooter.module';
import { HomeProfileHeaderModule } from '../header/homeProfileHeader.module';
import { LoadingModule } from './../../../../../shared/loaders/loading.module';

@NgModule({
    declarations: [
        HomeProfileYourHomeComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        MauiButtonModule,
        MauiHeadingModule,
        SegmentedButtonsModule,
        MauiRadioButtonGroupModule,
        HomeProfileHeaderModule,
        HomeProfileFooterModule
    ],
    exports: [
        HomeProfileYourHomeComponent
    ]
})
export class HomeProfileYourHomeModule { }
