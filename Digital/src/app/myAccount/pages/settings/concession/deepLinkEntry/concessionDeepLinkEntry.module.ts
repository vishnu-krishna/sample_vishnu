import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsModule } from '../../../../modules/commonComponents.module';
import { ConcessionDeepLinkEntryComponent } from './concessionDeepLinkEntry.component';

@NgModule({
    imports: [
        CommonComponentsModule,
        CommonModule
    ],
    exports: [
        ConcessionDeepLinkEntryComponent,
    ],
    declarations: [
        ConcessionDeepLinkEntryComponent
    ]
})
export class ConcessionDeepLinkEntryModule {
}
