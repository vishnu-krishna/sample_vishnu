import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'agl-maui-confirmation-banner',
    templateUrl: './confirmationBanner.component.html',
    styleUrls: ['./confirmationBanner.component.scss']
})

export class ConfirmationBannerComponent {
    @Input() public text: string;
    @Input() public iconFileName: string;
    @Input()
    @HostBinding('class.with-overlap-container') public withOverlapContainer: boolean = true;

    public get iconFilePath(): string {
        const defaultFileName = 'success icon.svg';
        return `svg/maui/confirmationBanner/${this.iconFileName || defaultFileName}`;
    }
}
