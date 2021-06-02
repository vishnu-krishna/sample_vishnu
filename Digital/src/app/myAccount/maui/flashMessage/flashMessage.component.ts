import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FlashMessageType } from './flashMessageType.enum';

@Component({
    selector: 'agl-maui-flash-message',
    templateUrl: './flashMessage.component.html',
    styleUrls: ['./flashMessage.component.scss'],
})
export class FlashMessageComponent {
    @Input() public accordion: boolean;
    @Input() public accordionExpanded: boolean;
    @Input() public dismissable: boolean;
    @Input() public type: FlashMessageType;
    @Output() public dismiss = new EventEmitter();

    public dismissed: boolean = false;
    public FlashMessageType = FlashMessageType;

    public onDismiss() {
        this.dismissed = true;
        this.dismiss.emit();
    }

    public toggleExpanded() {
        this.accordionExpanded = !this.accordionExpanded;
    }
}
