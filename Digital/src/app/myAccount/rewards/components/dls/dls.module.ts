import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DLSDMBannerModule } from './dm-banner/dlsDMBanner.module';
import { DLSLinkModule } from './link/dlsLink.module';
import { DLSTileModule } from './tile/dlsTile.module';

@NgModule({
    imports: [
        FormsModule,
        DLSLinkModule,
        DLSTileModule,
        DLSDMBannerModule
    ],
    exports: [
        DLSLinkModule,
        DLSTileModule,
        DLSDMBannerModule
    ]
})
export class DLSModule { }
