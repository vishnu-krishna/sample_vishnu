import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MauiButtonModule } from '../../../../maui/button/button.module';
import { SegmentedButtonsModule } from '../../../../maui/segmentedButtons/segmentedButtons.module';
import { HomeProfileHeaderModule } from '../header/homeProfileHeader.module';
import { HomeProfileFooterModule } from '../footer/homeProfileFooter.module';
import { HomeProfileCoolingComponent } from './homeProfileCooling.component';
import { LoadingModule } from './../../../../../shared/loaders/loading.module';

@NgModule({
    declarations: [
        HomeProfileCoolingComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        MauiButtonModule,
        SegmentedButtonsModule,
        HomeProfileHeaderModule,
        HomeProfileFooterModule
    ],
    exports: [
        HomeProfileCoolingComponent
    ]
})
export class HomeProfileCoolingModule { }
