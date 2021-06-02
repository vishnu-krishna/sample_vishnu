import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ButtonSize, ButtonType } from './button.enum';

@Component({
    selector: 'agl-maui-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() public type: ButtonType;
    @Input() public size: ButtonSize;
    @Input() public disabled: boolean;
    @Input() public loading: boolean;
    @Output() public clicked = new EventEmitter();
    @ViewChild('button') public button;

    public buttonClicked: boolean;

    // Button type
    public get isPrimary(): boolean { return (!this.type || this.type === ButtonType.primary); }
    public get isSecondary(): boolean { return this.type === ButtonType.secondary; }
    public get isTertiary(): boolean { return this.type === ButtonType.tertiary; }
    public get isLink(): boolean { return this.type === ButtonType.link; }
    public get isDisabled(): boolean { return this.disabled; }
    public get isLoading(): boolean { return this.loading; }

    // Button size
    public get isLarge(): boolean { return !this.size || this.size === ButtonSize.large; }
    public get isSmall(): boolean { return this.size === ButtonSize.small; }

    public onButtonClicked() {
        if (this.isDisabled || this.isLoading) {
            return;
        }

        this.clicked.emit();
        this.buttonClicked = true;

        if (!this.isLink) {
            this.removeFocusState();
        }
    }

    // This is to return button to its natural state as there is an extra accessibility requirement for the button to be in focus state when tabbed in.
    private removeFocusState() {
        this.button.nativeElement.blur();
    }
}
