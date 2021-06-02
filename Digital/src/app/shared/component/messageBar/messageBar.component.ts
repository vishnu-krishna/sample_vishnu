import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-messagebar',
    templateUrl: './messageBar.component.html',
    styleUrls: ['./messageBar.component.scss']
})

export class MessageBarComponent {
    @Input() public messageText: string;

    public isVisible: boolean = true;
    public close() {
        this.isVisible = false;
    }
}
