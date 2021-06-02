import { Component } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-checkbox',
    templateUrl: './showcaseCheckbox.component.html',
    styleUrls: ['./showcaseCheckbox.component.scss']
})
export class ShowcaseCheckboxComponent {
    public codeUsage: string = `
    <!-- Basic checkbox -->
    <agl-maui-checkbox
        label="Gummi bears"
        value="gummi-bears"
        (checked)="toggleCheckbox($event)">
    </agl-maui-checkbox>

    <!-- Full width basic checkbox -->
    <agl-maui-checkbox
        label="Gummi bears"
        value="gummi-bears"
        [isFullWidth]="true"
        (checked)="toggleCheckbox($event)">
    </agl-maui-checkbox>

    <!-- Checkbox with transcluded label -->
    <agl-maui-checkbox
        [isChecked]="true"
        (checked)="toggleCheckbox($event)">
        <div label>
            I confirm that I have read and agree to the
            <a (click)="showModal()">Direct Debit terms and Conditions</a>
        </div>
    </agl-maui-checkbox>

    <!-- Checkbox with transcluded content -->
    <agl-maui-checkbox
        label="Air conditioning"
        value="air-conditioning"
        [isFullWidth]="true"
        (checked)="toggleCheckbox()">
        <div content>
            <div>How many split systems?</div>
            <agl-maui-segmented-buttons [(value)]="selectedValue" (change)="setSelectedValue($event)">
                <agl-maui-segmented-button value="1" text="1"></agl-maui-segmented-button>
                <agl-maui-segmented-button value="2" text="2"></agl-maui-segmented-button>
                <agl-maui-segmented-button value="3" text="3"></agl-maui-segmented-button>
            </agl-maui-segmented-buttons>
        </div>
    </agl-maui-checkbox>
    `;

    public isFullWidth: boolean;
    public selectedValue: string;

    public toggleFullWidthCheckBox(): void {
        this.isFullWidth = !this.isFullWidth;
    }

    public toggleCheckbox(): boolean {
        return true;
    }

    public setSelectedValue(selectedValue: string): void {
        this.selectedValue = selectedValue;
    }

    public showModal(): void {
        event.preventDefault();
        alert('Display Terms and condition Modal');
    }
}
