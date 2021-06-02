import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DLSLinkComponent } from './dlsLink.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DLSLinkComponent
    ],
    exports: [
        DLSLinkComponent
    ]
})
export class DLSLinkModule { }
