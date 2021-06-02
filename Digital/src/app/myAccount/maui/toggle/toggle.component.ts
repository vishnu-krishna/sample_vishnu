import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'agl-maui-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss']
})

export class ToggleComponent {
    @Input() public toggleValue: boolean = false;
    @Input() public isLoading: boolean = false;
    @Input() public isDisabled: boolean = false;
    @Output() public toggleValueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    public toggleChanged(): void {
        this.toggleValue = !this.toggleValue;
        this.toggleValueChange.emit(this.toggleValue);
    }

    public isActive(): boolean {
        return !this.isLoading && !this.isDisabled;
    }
}
