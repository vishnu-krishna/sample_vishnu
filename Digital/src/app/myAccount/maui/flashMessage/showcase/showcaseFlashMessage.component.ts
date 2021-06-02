import { Component } from '@angular/core';
import * as MauiFlashMessage from '../index';

@Component({
    selector: 'agl-maui-showcase-flash-message',
    templateUrl: './showcaseFlashMessage.component.html'
})
export class ShowcaseFlashMessageComponent {

    public codeUsage: string = `
        <agl-maui-flash-message
            [type]="FlashMessageType.Inform | FlashMessageType.Error | FlashMessageType.Warning | FlashMessageType.Success"
            [dismissable]="true | false"
            (dismiss)="alert('dismissed')"
            [accordian]="true | false">
                <div heading>Welcome</div>
                <div subheading>To My Account</div>
                <div body>The best app ever</div>
        </agl-maui-flash-message>
    `;
    public FlashMessageType = MauiFlashMessage.FlashMessageType;

    public onDismiss() {
        alert('dismissed!');
    }
}
