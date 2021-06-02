import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-ebilling-multi-business-partner-web-chat',
    templateUrl: 'eBillingMultiBPWebChat.component.html',
    styleUrls: ['eBillingMultiBPWebChat.component.scss']
})
export class EBillingMultiBPWebChatComponent {
    @Input() public sequenceId: boolean;
    @Input() public isEmptyOrInvalidEmailAddress: boolean;
}
