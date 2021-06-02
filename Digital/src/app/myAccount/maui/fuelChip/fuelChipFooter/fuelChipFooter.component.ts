import { Component, EventEmitter, Input, Output } from '@angular/core';

// this component doesn't have a template as it is only being used to transmit message data from the child element. It can not be
// a full component with a template because the component html wrapper tag destroys the css display:table

@Component({
    selector: 'agl-maui-fuel-chip-footer',
    template: ''
})

export class FuelChipFooterComponent {

    @Input() public tertiaryMessage: string;
    @Input() public cancelText: string;

    @Output() public cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();

    public fuelChipCancelClick() {
        this.cancelClick.emit();
    }

}
