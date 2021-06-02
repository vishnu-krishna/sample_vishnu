import { Component, Inject, Input, OnInit } from '@angular/core';
import { RadioButtonGroupComponent } from '../radioButtonGroup.component';

@Component({
    selector: 'agl-maui-radio-button',
    templateUrl: './radioButton.component.html',
    styleUrls: ['./radioButton.component.scss'],
})

export class RadioButtonComponent implements  OnInit {

    @Input() public value: string;
    @Input() public checked: boolean = false;
    public name: string;
    public selected: boolean = false;

    constructor(@Inject(RadioButtonGroupComponent) private radioButtonGroup: RadioButtonGroupComponent) {}

    public ngOnInit(): void {
        this.checked = this.isSelected();
        this.name = this.radioButtonGroup.name;
    }

    public onChange = ($event) => {
        this.radioButtonGroup.itemChanged(this.value);
    }

    public isSelected(): boolean {
        return this.radioButtonGroup.selectedValue === this.value;
    }

}
