import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'agl-maui-lightbox',
    templateUrl: './lightBox.component.html',
    styleUrls: ['./lightBox.component.scss']
})

export class LightBoxComponent {

    @Input() public title: string;
    @Input() public buttonPrimaryText: string;
    @Input() public buttonDismissText: string;
    @Input() public invokeText: string;

    @Output() public clickButtonPrimary = new EventEmitter();
    @Output() public clickButtonDismiss = new EventEmitter();

    public isLightBoxVisible: boolean = false;

    public onClickButtonPrimary(event: any) {
        this.clickButtonPrimary.emit();
    }

    public onClickButtonDismiss(event: any) {
        this.showLightBox(false);
        this.clickButtonDismiss.emit();
    }

    public showLightBox(value) {
        this.isLightBoxVisible = value;
        if (this.isLightBoxVisible === true) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
    }

}
