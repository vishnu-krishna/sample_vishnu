import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'agl-maui-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
    @Input() public label: string;
    @Input() public value: string;
    @Input() public isChecked: boolean;
    @Input() public isFullWidth: boolean;
    @Output() public checked: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('contentWrapper') public contentWrapper: ElementRef;

    public checkboxChange(): void {
        this.isChecked = !this.isChecked;
        this.checked.emit(this.isChecked);
    }

    public hasContent(): boolean {
        return this.contentWrapper.nativeElement.children.length > 0;
    }
}

// Allows strongly type ngFors
export interface CheckboxOptions {
    label: string;
    value: string;
    isChecked: boolean;
    isFullWidth: boolean;
}
