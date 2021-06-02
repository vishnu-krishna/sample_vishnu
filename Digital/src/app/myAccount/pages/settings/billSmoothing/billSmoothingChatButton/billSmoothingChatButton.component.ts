import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'agl-billsmoothing-chat-button',
    templateUrl: './billSmoothingChatButton.component.html',
    styleUrls: ['./billSmoothingChatButton.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BillSmoothingChatButtonComponent {

    @Input() public chatButtonId: string;

}
