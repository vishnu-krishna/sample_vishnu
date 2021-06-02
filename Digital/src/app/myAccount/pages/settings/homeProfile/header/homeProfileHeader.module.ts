import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeProfileNavigationService } from '../homeProfileNavigation.service';

import { MauiHeadingModule } from '../../../../maui/heading';
import { MauiPageProgressBarModule } from '../../../../maui/pageProgressBar/pageProgressBar.module';
import { MauiSecondaryNavigationModule } from '../../../../maui/secondaryNavigation/secondaryNavigation.module';
import { HomeProfileHeaderComponent } from './homeProfileHeader.component';

@NgModule({
    declarations: [
        HomeProfileHeaderComponent
    ],
    imports: [
        CommonModule,
        MauiHeadingModule,
        MauiPageProgressBarModule,
        MauiSecondaryNavigationModule
    ],
    providers: [
        HomeProfileNavigationService
    ],
    exports: [
        HomeProfileHeaderComponent
    ]
})

export class HomeProfileHeaderModule { }
