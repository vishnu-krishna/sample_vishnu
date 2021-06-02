import { Component, AfterViewInit } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-terms-and-conditions',
    templateUrl: './showcaseTermsAndConditions.component.html'
})

export class ShowcaseTermsandConditionsComponent implements AfterViewInit {
    private isInitialised = false;

    public codeUsage: string = `
        // Use isChecked = true to set the checkbox
        // Use 'checked' event emitter to capture the checkbox checked event

        2 Types of Terms and Conditions

        1) Terms and conditions opens in another tab when link is clicked.
        <agl-maui-terms-and-conditions (checked)="checkBoxChanged($event)">I confirm that I have read and agree to the <a href="https://www.agl.com.au/residential" target="_blank">Direct Debit terms and Conditions</a>
        </agl-maui-terms-and-conditions>

        2) Terms and conditions opens in a modal.(Checkbox is checked by default)
        <agl-maui-terms-and-conditions [isChecked]='true' (checked)="checkBoxChanged($event)">I confirm that I have read and agree to the <a (click)="showModal()">Direct Debit terms and Conditions</a>
        </agl-maui-terms-and-conditions>

    `;

    public ngAfterViewInit(): void {
        this.isInitialised = true;
    }

    public checkBoxChanged(checked: boolean) {
        if (this.isInitialised) {
            alert('Checkbox is checked:- ' + checked);
        }
    }

    public showModal() {
        alert('Terms and condition Modal');
    }
}
