import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'agl-maui-segmented-button',
    templateUrl: './segmentedButton.component.html',
    styleUrls: ['./segmentedButton.component.scss'],
})

export class SegmentedButtonComponent {
    @Input() public value: string;
    @Input() public text: string;
    @Input() public textMobile: string;
    @Input() public selected: boolean;
    @Output() public selectedButtonChange: EventEmitter<string> = new EventEmitter<string>();

    @HostBinding('class.selected') public get isSelected(): boolean { return this.selected; }
    @HostListener('click') public toggleButton() {
        this.selected = true;
        this.selectedButtonChange.emit(this.value);
    }
}

// Allows strongly type ngFors
export interface SegmentedButtonOptions {
    value: string;
    text: string;
    textMobile?: string;
    selected: boolean;
}
