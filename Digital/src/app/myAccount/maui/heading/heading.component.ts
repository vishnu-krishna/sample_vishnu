import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-maui-heading',
    templateUrl: './heading.component.html',
    styleUrls: ['./heading.component.scss']
})

export class HeadingComponent {
    @Input() public heading: string;
    @Input() public subheading: string;
}
