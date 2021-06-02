import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MauiRadioButtonGroupModule } from '../../../../maui/radioButtonGroup';
import { SegmentedButtonsModule } from '../../../../maui/segmentedButtons/segmentedButtons.module';
import { HomeProfileHeaderModule } from '../header/homeProfileHeader.module';
import { HomeProfileFooterModule } from '../footer/homeProfileFooter.module';
import { HomeProfileHotWaterComponent } from './homeProfileHotWater.component';
import { LoadingModule } from './../../../../../shared/loaders/loading.module';

@NgModule({
    declarations: [
        HomeProfileHotWaterComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        MauiRadioButtonGroupModule,
        SegmentedButtonsModule,
        HomeProfileHeaderModule,
        HomeProfileFooterModule
    ],
    exports: [
        HomeProfileHotWaterComponent
    ]
})
export class HomeProfileHotWaterModule { }
