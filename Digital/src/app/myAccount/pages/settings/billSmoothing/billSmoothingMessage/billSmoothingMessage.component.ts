import { Component, Input } from '@angular/core';

@Component({
    selector: 'agl-billsmoothing-message',
    templateUrl: './billSmoothingMessage.component.html',
    styleUrls: ['./billSmoothingMessage.component.scss']
})
export class BillSmoothingMessageComponent {
    @Input() public hasDirectDebit: boolean;
}
