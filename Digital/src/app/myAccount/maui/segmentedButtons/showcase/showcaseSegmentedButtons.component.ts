import { Component } from '@angular/core';
import { SegmentedButtonOptions } from '../index';

@Component({
    selector: 'agl-maui-showcase-segmented-buttons',
    templateUrl: './showcaseSegmentedButtons.component.html',
    styleUrls: ['./showcaseSegmentedButtons.component.scss'],
})

export class ShowcaseSegmentedButtonsComponent {
    public codeUsage: string = `
    // E.g. selectedValue = "Y";
    <agl-maui-segmented-buttons [(value)]="selectedValue" (change)="setSelectedValue($event)">
        <agl-maui-segmented-button
            value="Y"
            text="Yes"
            textMobile="Y"
            [selected]="true">
        </agl-maui-segmented-button>
        <agl-maui-segmented-button
            value="N"
            text="No"
            textMobile="N"
            [selected]="false">
        </agl-maui-segmented-button>
    </agl-maui-segmented-buttons>

    // If a for loop is prefered
    // Properties of segmentedButtonOptions are described in the interface 'SegmentedButtonOptions'
    <agl-maui-segmented-buttons [(value)]="selectedValue" (change)="setSelectedValue($event)">
        <agl-maui-segmented-button
            *ngFor="let option of segmentedButtonOptions"
            value="{{option.value}}"
            text="{{option.text}}"
            textMobile="{{option.textMobile}}"
            [selected]="option.selected">
        </agl-maui-segmented-button>
    </agl-maui-segmented-buttons>
    `;
    public selectedValueA: string = 'Y';
    public selectedValueB: string = '14';
    public selectedValueC: string = 'B';
    public selectedValueD: string = 'TH';

    public days: SegmentedButtonOptions[] = [
        {
            value: '7',
            text: '7 days',
            selected: false
        },
        {
            value: '14',
            text: '14 days',
            selected: true
        },
        {
            value: '21',
            text: '21 days',
            selected: false
        }
    ];

    public setSelectedValue($event) {
        // Do something
    }
}
