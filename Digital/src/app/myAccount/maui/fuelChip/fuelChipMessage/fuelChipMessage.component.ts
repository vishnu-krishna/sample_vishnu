import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MauiSecondaryMessageStatusType } from '../fuelChip.component.enum';

import { PrimaryMessageLink } from '../fuelChip.component.model';

// this component doesn't have a template as it is only being used to transmit message data from the child element. It can not be
// a full component with a template because you can only have one ng-content with a agl-maui-fuel-chip-message select on the page
// and the parent requires 2 ... one for each version of the address
@Component({
    selector: 'agl-maui-fuel-chip-message',
    template: ''
})

export class FuelChipMessageComponent {

    @Input() public primaryMessage: string;
    @Input() public primaryMessageLink: PrimaryMessageLink;
    @Input() public secondaryMessage: string;
    @Input() public secondaryMessageStatus: MauiSecondaryMessageStatusType;

    @Output() public linkClick: EventEmitter<string> = new EventEmitter<string>();

    public primaryMessageLinkClick(value: string) {
        this.linkClick.emit(value);
    }

}
