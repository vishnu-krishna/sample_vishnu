import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MauiSecondaryNavigationComponent } from './secondaryNavigation.component';

@NgModule({
    declarations: [
        MauiSecondaryNavigationComponent
    ],
    exports: [
        MauiSecondaryNavigationComponent
    ],
    imports: [
        CommonModule
    ]
})
export class MauiSecondaryNavigationModule { }
