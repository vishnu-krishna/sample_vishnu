import { NgModule } from '@angular/core';
import { HomeProfileSelectComponent } from './homeProfileSelect.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MauiHeadingModule } from './../../../../maui/heading';
import { MauiSecondaryNavigationModule } from './../../../../maui/secondaryNavigation';
import { LoadingModule } from '../../../../../shared/loaders/loading.module';

@NgModule({
    declarations: [
        HomeProfileSelectComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        MauiHeadingModule,
        MauiSecondaryNavigationModule,
        LoadingModule
    ],
    exports: [
        HomeProfileSelectComponent
    ]
})
export class HomeProfileSelectModule { }
