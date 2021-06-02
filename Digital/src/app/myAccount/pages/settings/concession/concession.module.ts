import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ConcessionComponent } from './concession.component';
import { MauiFlashMessageModule } from '../../../maui/flashMessage';
import { WebChatModule } from '../../../../shared/component/webChat/webChat.module';

@NgModule({
    declarations: [
        ConcessionComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MauiFlashMessageModule,
        WebChatModule
    ],
    exports: [
        ConcessionComponent
    ],
    providers: []
})
export class ConcessionModule {
}
