import { Component } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-toggle',
    templateUrl: './showcaseToggle.component.html',
    styleUrls: ['./showcaseToggle.component.scss']
})
export class ShowcaseToggleComponent {
    public codeUsage: string = `
    <!-- Basic Toggle only setting true/false value -->
    <agl-maui-toggle
        [(toggleValue)]="toggleOn">
    </agl-maui-toggle>

    <!-- Toggle with a Loading State and toggle value bound to a property -->
    <agl-maui-toggle
        [(toggleValue)]="toggleValueToBeBoundTo"
        [isLoading]="loadingStateProperty"
        (toggleValueChange)="makeAPICallInParent($event)">
    </agl-maui-toggle>

    <!-- Unclickable/disabled toggle -->
    <agl-maui-toggle
        [(toggleValue)]="toggleValueToBeBoundTo"
        [isLoading]="loadingStateProperty"
        [isDisabled]="disabledProperty"
        (toggleValueChange)="makeAPICallInParent($event)">
    </agl-maui-toggle>
    `;

    private timeOut: any;
    public isLoading: boolean = false;
    public isBasicToggleOn: boolean = true;

    public alwaysOffToggleValue: boolean = false;
    public isAlwaysOffToggleLoading: boolean = false;

    public toggleWithSpinner(type: string) {
        this.isLoading = (type === 'withSpinner');
        this.isAlwaysOffToggleLoading = (type === 'isAlwaysOff');
        this.mockWaitingTime(type);
    }

    private mockWaitingTime(type: string) {
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
            if (type === 'isAlwaysOff') {
                this.alwaysOffToggleValue = false;
            }
            this.isLoading = false;
            this.isAlwaysOffToggleLoading = false;
        }, 3000);
    }
}
