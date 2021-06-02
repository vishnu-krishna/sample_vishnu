import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-maui-dropdown-function',
    template: ``
})
export class DropdownFunctionComponent {
    @Input() public value: string;
    @Input() public text: string;
    @Input() public disabled: boolean;
    @Input() public selected: boolean;
}
