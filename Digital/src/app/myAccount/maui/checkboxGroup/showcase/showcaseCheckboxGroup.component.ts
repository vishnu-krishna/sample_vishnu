import { Component } from '@angular/core';
import { CheckboxOptions } from '../../checkbox/checkbox.component';

@Component({
    selector: 'agl-maui-showcase-checkbox-group',
    templateUrl: './showcaseCheckboxGroup.component.html',
    styleUrls: ['./showcaseCheckboxGroup.component.scss']
})
export class ShowcaseCheckboxGroupComponent {
    public codeUsage: string = `
    <agl-maui-checkbox-group (checked)="checkBoxSelected($event)">
        <agl-maui-checkbox label="one" value="one" [isFullWidth]="true"></agl-maui-checkbox>
        <agl-maui-checkbox label="two" value="two" [isFullWidth]="true"></agl-maui-checkbox>
        <agl-maui-checkbox label="three" value="three" [isFullWidth]="true"></agl-maui-checkbox>
    </agl-maui-checkbox-group>

    <agl-maui-checkbox-group (checked)="checkBoxSelected($event)">
        <agl-maui-checkbox
            *ngFor="let option of checkboxOptions"
            label="{{option.label}}"
            value="{{option.value}}"
            [isChecked]="option.isChecked"
            [isFullWidth]="option.isFullWidth">
        </agl-maui-checkbox>
    </agl-maui-checkbox-group>
    `;

    public checkboxOptions: CheckboxOptions[] = [
        {
            label: 'Air conditioning',
            value: 'air-conditioning',
            isChecked: false,
            isFullWidth: true
        },
        {
            label: 'Evaporative cooling',
            value: 'evaporative-cooling',
            isChecked: false,
            isFullWidth: true
        },
        {
            label: 'Fans',
            value: 'fans',
            isChecked: false,
            isFullWidth: true
        },
    ];

    public checkBoxSelected(selected: string[]): string[] {
        return selected;
    }
}
