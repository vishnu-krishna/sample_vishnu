import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';

declare let lpTag;

@Component({
    selector: 'agl-rewards-error-webchat',
    templateUrl: './webchat-rewards-error.component.html',
    styleUrls: ['./webchat-rewards-error.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WebchatRewardsErrorComponent implements AfterViewInit {
    @Input() public chatButtonId: string;
    public contentNotLoaded: boolean = false;
    private readonly contentCheckWait = 5000;

    @ViewChild('rewardsChatButton') private chatButton: ElementRef;

    public ngAfterViewInit() {
        setTimeout(() => {
            if (lpTag && lpTag.newPage) {
                lpTag.newPage(document.URL);
            }
        }, 500);

        this.ensureChatButtonHasContent();
    }

    private ensureChatButtonHasContent() {
        // occasionally the webchat markup is not being injected
        // as a workaround we'll show some default content if this happens
        if (this.chatButton) {
            setTimeout(() => {
                let el = this.chatButton.nativeElement;
                if (el.children.length === 0) {
                    this.contentNotLoaded = true;
                }
            }, this.contentCheckWait);
        }
    }
}
