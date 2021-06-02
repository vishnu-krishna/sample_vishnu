import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MauiFuelChipModule } from './../../../../maui/fuelChip';
import { MauiHeadingModule } from './../../../../maui/heading';
import { MauiSecondaryNavigationModule } from './../../../../maui/secondaryNavigation';
import { HomeProfileEditComponent } from './homeProfileEdit.component';
import { MauiContainerModule } from '../../../../maui/container';
import { HomeProfileSectionModule } from '../section/homeProfileSection.module';

@NgModule({
    declarations: [
        HomeProfileEditComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        MauiHeadingModule,
        MauiSecondaryNavigationModule,
        MauiContainerModule,
        HomeProfileSectionModule
    ],
    exports: [
        HomeProfileEditComponent
    ]
})
export class HomeProfileEditModule { }
