import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IIntervalService, IntervalService } from '../../service/interval.service';
import { WebChatComponent } from './webChat.component';

@NgModule({
    declarations: [
        WebChatComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        WebChatComponent
    ],
    providers: [
        { provide: IIntervalService, useClass: IntervalService },
    ],
})
export class WebChatModule { }
