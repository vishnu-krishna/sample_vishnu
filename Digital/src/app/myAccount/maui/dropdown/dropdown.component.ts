import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { DropdownFunctionComponent } from './dropdownSelections/dropdownFunction.component';
import { DropdownOptionComponent } from './dropdownSelections/dropdownOption.component';

declare let window: any;

@Component({
    selector: 'agl-maui-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})

// using 'blur' event as well as 'change' due to 'change' event not firing in Safari on IOS devices
export class DropdownComponent {
    @ContentChildren(DropdownOptionComponent) public options: QueryList<DropdownOptionComponent>;
    @ContentChildren(DropdownFunctionComponent) public functions: QueryList<DropdownFunctionComponent>;
    @Output() public notify = new EventEmitter<string>();
    @Input() public disabled: boolean = false;
    @Input() public hasError: boolean = false;

    public onChange(target): void {
        let selectedOption = this.options.find((a) => a.value === target.value);
        let selectedFunction = this.functions.find((a) => a.value === target.value);
        if (selectedOption) {
            this.notify.emit(selectedOption.value);
        }
        if (selectedFunction) {
            this.notify.emit(selectedFunction.value);
        }
    }
}
