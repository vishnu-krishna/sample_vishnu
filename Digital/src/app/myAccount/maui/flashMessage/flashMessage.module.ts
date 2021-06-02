import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlashMessageComponent } from './flashMessage.component';

@NgModule({
    declarations: [
        FlashMessageComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FlashMessageComponent
    ]
})
export class MauiFlashMessageModule { }
