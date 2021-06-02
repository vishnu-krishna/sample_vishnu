import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MauiButtonModule } from '../../../../maui/button/button.module';
import { SegmentedButtonsModule } from '../../../../maui/segmentedButtons/segmentedButtons.module';
import { MauiRadioButtonGroupModule } from '../../../../maui/radioButtonGroup/radioButtonGroup.module';
import { HomeProfileHeaderModule } from '../header/homeProfileHeader.module';
import { HomeProfileFooterModule } from '../footer/homeProfileFooter.module';
import { HomeProfileFridgeAndFreezerComponent } from './homeProfileFridgeAndFreezer.component';
import { LoadingModule } from './../../../../../shared/loaders/loading.module';

@NgModule({
    declarations: [
        HomeProfileFridgeAndFreezerComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        MauiButtonModule,
        SegmentedButtonsModule,
        MauiRadioButtonGroupModule,
        HomeProfileHeaderModule,
        HomeProfileFooterModule
    ],
    exports: [
        HomeProfileFridgeAndFreezerComponent
    ]
})
export class HomeProfileFridgeAndFreezerModule { }
