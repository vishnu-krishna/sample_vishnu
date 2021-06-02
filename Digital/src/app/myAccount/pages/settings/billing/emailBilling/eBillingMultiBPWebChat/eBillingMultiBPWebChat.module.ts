import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WebChatModule } from '../../../../../../shared/component/webChat/webChat.module';
import { MauiFlashMessageModule } from '../../../../../maui/flashMessage/flashMessage.module';
import { EBillingMultiBPWebChatComponent } from './eBillingMultiBPWebChat.component';

@NgModule({
    imports: [
        CommonModule,
        MauiFlashMessageModule,
        WebChatModule
    ],
    exports: [
        EBillingMultiBPWebChatComponent
    ],
    declarations: [
        EBillingMultiBPWebChatComponent
    ],
    providers: [],
})
export class EBillingMultiBPWebChatModule { }
