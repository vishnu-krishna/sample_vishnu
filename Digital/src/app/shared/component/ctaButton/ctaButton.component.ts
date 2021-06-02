import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-cta-button',
    templateUrl: './ctaButton.component.html',
    styleUrls: ['./ctaButton.component.scss']
})
export class CtaButtonComponent  {
    @Input() public color: string;
    @Input() public clickFn: string;

    constructor(
    ) {
        // CtaButtonComponent Constructor
    }

}
