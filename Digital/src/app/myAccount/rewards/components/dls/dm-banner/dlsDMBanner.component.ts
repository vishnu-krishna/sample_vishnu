import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'agl-dls-dm-banner',
    templateUrl: './dlsDMBanner.component.html',
    styleUrls: ['./dlsDMBanner.component.scss']
})
export class DLSDMBannerComponent {
    @Input() public title: string = '';
    @Input() public description: string = '';

    @Input() public showSuccess: boolean = false;
    @Input() public errorMessage: string = '';

    @Output() public close = new EventEmitter();

    public closeClicked() {
        this.close.emit();
    }
}
