import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MauiRadioButtonGroupModule } from '../../../../maui/radioButtonGroup';
import { SegmentedButtonsModule } from '../../../../maui/segmentedButtons';
import { HomeProfileHeaderModule } from '../header/homeProfileHeader.module';
import { HomeProfileFooterModule } from '../footer/homeProfileFooter.module';
import { HomeProfilePoolAndSpaComponent } from './homeProfilePoolAndSpa.component';
import { LoadingModule } from './../../../../../shared/loaders/loading.module';

@NgModule({
    declarations: [
        HomeProfilePoolAndSpaComponent,
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
        HomeProfilePoolAndSpaComponent
    ]
})
export class HomeProfilePoolAndSpaModule { }
