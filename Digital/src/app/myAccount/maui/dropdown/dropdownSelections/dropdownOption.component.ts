import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-maui-dropdown-option',
    template: ``
})
export class DropdownOptionComponent {
    @Input() public value: string;
    @Input() public text: string;
    @Input() public disabled: boolean;
    @Input() public selected: boolean;
}
