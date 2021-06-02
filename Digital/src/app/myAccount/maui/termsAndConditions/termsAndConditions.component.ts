import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
        selector: 'agl-maui-terms-and-conditions',
        templateUrl: './termsAndConditions.component.html',
        styleUrls: ['./termsAndConditions.component.scss']
})
export class TermsAndConditionsComponent implements OnChanges {
    @Input() public isChecked: boolean = false;

    // Event emitter for checkbox changes
    @Output() public checked: EventEmitter<boolean> = new EventEmitter<boolean>();

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.isChecked) {
            this.checked.emit(changes.isChecked.currentValue);
        }
    }

    public checkboxChange() {
        this.isChecked = !this.isChecked;
        this.checked.emit(this.isChecked);
    }
}
