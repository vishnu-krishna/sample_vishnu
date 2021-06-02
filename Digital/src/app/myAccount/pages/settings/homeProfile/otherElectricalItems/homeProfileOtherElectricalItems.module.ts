import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SegmentedButtonsModule } from '../../../../maui/segmentedButtons/segmentedButtons.module';
import { HomeProfileHeaderModule } from '../header/homeProfileHeader.module';
import { HomeProfileFooterModule } from '../footer/homeProfileFooter.module';
import { HomeProfileOtherElectricalItemsComponent } from './homeProfileOtherElectricalItems.component';
import { LoadingModule } from './../../../../../shared/loaders/loading.module';

@NgModule({
    declarations: [
        HomeProfileOtherElectricalItemsComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        LoadingModule,
        SegmentedButtonsModule,
        HomeProfileHeaderModule,
        HomeProfileFooterModule
    ],
    exports: [
        HomeProfileOtherElectricalItemsComponent
    ]
})
export class HomeProfileOtherElectricalItemsModule { }
