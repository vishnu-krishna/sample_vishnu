import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MauiPageProgressBarComponent } from './pageProgressBar.component';

@NgModule({
    declarations: [
        MauiPageProgressBarComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MauiPageProgressBarComponent
    ]
})
export class MauiPageProgressBarModule { }
