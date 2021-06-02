import { Component } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-button',
    templateUrl: './showcaseButton.component.html',
    styleUrls: ['./showcaseButton.component.scss'],
})

export class ShowcaseButtonComponent {
    public codeUsage: string = `
    <!-- Default Button (Large Primary) -->
    <agl-maui-button (clicked)="doSomethingInParentComponent()">
        Primary Button
    </agl-maui-button>

    <!-- Small Secondary Button -->
    <agl-maui-button (clicked)="doSomethingInParentComponent()"
        type="secondary"
        size="small">
        Small Secondary Button
    </agl-maui-button>

    <!-- Button with Disabled state -->
    <!-- Typically used with T&C checkbox -->
    <agl-maui-button
        [disabled]="!isChecked"
        (clicked)="doSomethingInParentComponent()">
        Inactive
    </agl-maui-button>

    <!-- Button with Loading state -->
    <!-- Typically used when waiting for a response back from an api -->
    <agl-maui-button
        [loading]="!isLoading"
        (clicked)="doSomethingInParentComponent()">
        Inactive
    </agl-maui-button>

    <!-- Link -->
    <agl-maui-button
        type="link"
        [loading]="!isLoading"
        (clicked)="doSomethingInParentComponent()">
        Link
    </agl-maui-button>
    `;

    public showDisabledState: boolean;
    public showLoadingState: boolean;
    public isLoadingPrimaryLarge: boolean;
    public isLoadingPrimarySmall: boolean;
    public isLoadingSecondaryLarge: boolean;
    public isLoadingSecondarySmall: boolean;
    public isLoadingTertiaryLarge: boolean;
    public isLoadingTertiarySmall: boolean;
    public isLoadingLink: boolean;
    private timeOut: any;

    public toggleCheckBox() {
        this.showDisabledState = !this.showDisabledState;
    }

    public toggleLoadingButtons() {
        this.showLoadingState = !this.showLoadingState;
    }

    public submitButton(type: string) {
        console.log('parent detected child clicked');

        if (this.showLoadingState) {
            this.isLoadingPrimaryLarge = (type === 'primaryLarge');
            this.isLoadingPrimarySmall = (type === 'primarySmall');
            this.isLoadingSecondaryLarge = (type === 'secondaryLarge');
            this.isLoadingSecondarySmall = (type === 'secondarySmall');
            this.isLoadingTertiaryLarge = (type === 'tertiaryLarge');
            this.isLoadingTertiarySmall = (type === 'tertiarySmall');
            this.isLoadingLink = (type === 'link');
            this.mockWaitingTime();
        }
    }

    private mockWaitingTime() {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
            this.isLoadingPrimaryLarge = false;
            this.isLoadingPrimarySmall = false;
            this.isLoadingSecondaryLarge = false;
            this.isLoadingSecondarySmall = false;
            this.isLoadingTertiaryLarge = false;
            this.isLoadingTertiarySmall = false;
            this.isLoadingLink = false;
        }, 3000);
    }
}
