import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MauiButtonModule } from '../../../../maui/button/button.module';
import { HomeProfileFooterComponent } from './homeProfileFooter.component';
import { MauiFlashMessageModule } from '../../../../maui/flashMessage/flashMessage.module';

@NgModule({
    declarations: [
        HomeProfileFooterComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MauiButtonModule,
        MauiFlashMessageModule
    ],
    exports: [
        HomeProfileFooterComponent
    ]
})
export class HomeProfileFooterModule { }
