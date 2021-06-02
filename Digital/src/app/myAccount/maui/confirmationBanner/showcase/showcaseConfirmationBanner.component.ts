import { Component } from '@angular/core';

@Component({
    selector: 'agl-maui-showcase-confirmation-banner',
    templateUrl: './showcaseConfirmationBanner.component.html'
})

export class ShowcaseConfirmationBannerComponent {
    public codeUsage: string = `
        <agl-maui-confirmation-banner text="Your Electricity account is now on monthly billing" iconFileName="ICON.svg" [withOverlapContainer]="true|false">
        </agl-maui-confirmation-banner>
    `;
}
