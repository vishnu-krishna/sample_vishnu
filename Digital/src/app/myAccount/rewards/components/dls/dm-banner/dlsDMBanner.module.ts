import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DLSLinkModule } from '../link/dlsLink.module';
import { DLSDMBannerComponent } from './dlsDMBanner.component';

@NgModule({
    imports: [
        CommonModule,
        DLSLinkModule
    ],
    declarations: [
        DLSDMBannerComponent
    ],
    exports: [
        DLSDMBannerComponent
    ]
})
export class DLSDMBannerModule { }
