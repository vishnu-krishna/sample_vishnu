import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MauiButtonModule } from '../../../../maui/button/button.module';
import { MauiConfirmationBannerModule } from '../../../../maui/confirmationBanner/confirmationBanner.module';
import { MauiContainerModule } from '../../../../maui/container/container.module';
import { HomeProfileThankYouComponent } from './homeProfileThankYou.component';
import { HomeProfileSummaryModule } from '../summary/homeProfileSummary.module';

@NgModule({
    declarations: [
        HomeProfileThankYouComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        MauiButtonModule,
        MauiConfirmationBannerModule,
        MauiContainerModule,
        HomeProfileSummaryModule
    ],
    exports: [
        HomeProfileThankYouComponent
    ]
})
export class HomeProfileThankYouModule { }
