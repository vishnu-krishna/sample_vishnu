import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';

@Component({
    selector: 'agl-maui-radio-button-group',
    templateUrl: './radioButtonGroup.component.html',
    styleUrls: ['./radioButtonGroup.component.scss']
})

@Injectable()
export class RadioButtonGroupComponent {
    @Input() public selectedValue = '';
    @Output() public selectedValueChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() public name = '';

    public itemChanged(value) {
        this.selectedValue = value;
        this.selectedValueChange.emit(value);
    }
}
