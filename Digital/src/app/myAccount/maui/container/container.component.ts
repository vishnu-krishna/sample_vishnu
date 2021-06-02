import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-maui-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})

export class ContainerComponent {
    @Input() public hasShadow: boolean = true;
}
