import { Component } from '@angular/core';

import cloneDeep from 'lodash-es/cloneDeep';

@Component({
    selector: 'agl-maui-showcase-dropdown',
    templateUrl: './showcaseDropdown.component.html',
    styleUrls: ['./showcaseDropdown.component.scss']
})

export class ShowcaseDropdownComponent {
    public codeUsage: string = `
    <agl-maui-dropdown (notify)="handleNotify($event)">
        <agl-maui-dropdown-option text="Select a value" disabled="true" selected="true"></agl-maui-dropdown-option>
        <agl-maui-dropdown-option value="Card01" text="Visa xxxx 4242"></agl-maui-dropdown-option>
        <agl-maui-dropdown-option value="Card02" text="Visa xxxx 1234"></agl-maui-dropdown-option>
        <agl-maui-dropdown-option value="Card03" text="Mastercard xxxx 5678"></agl-maui-dropdown-option>
        <agl-maui-dropdown-option value="Card04" text="Bank account xxxx 1337"></agl-maui-dropdown-option>
        <agl-maui-dropdown-function value="AddCard" text="Add new method"></agl-maui-dropdown-function>
    </agl-maui-dropdown>`;

    public disabled: boolean = false;
    public hasError: boolean = false;

    public boundOptions = [
        { value: 'Value01', text: 'Value 01', disabled: false, selected: true },
        { value: 'Value02', text: 'Value 02', disabled: false, selected: false },
        { value: 'Value03', text: 'Value 03', disabled: false, selected: false },
    ];

    public toggleDisabled() {
        this.disabled = !this.disabled;
    }

    public toggleHasError() {
        this.hasError = !this.hasError;
    }

    public handleNotify(value): void {
        alert('notified with value: ' + value);
    }

    public handleBoundNotify(value) {
        console.log('Handle bound notify - selected value:', value);

        let boundOptions = cloneDeep(this.boundOptions);

        boundOptions.find((b) => b.selected).selected = false;
        boundOptions.find((b) => b.value === value).selected = true;

        this.boundOptions = boundOptions;
    }
}
