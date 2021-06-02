import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { SegmentedButtonComponent } from './segmentedButton/segmentedButton.component';

@Component({
    selector: 'agl-maui-segmented-buttons',
    templateUrl: './segmentedButtons.component.html',
    styleUrls: ['./segmentedButtons.component.scss']
})
export class SegmentedButtonsComponent implements AfterContentInit {
    @ContentChildren(SegmentedButtonComponent) public buttons: QueryList<SegmentedButtonComponent>;
    @Input() public value: string;
    @Output() public change: EventEmitter<string> = new EventEmitter<string>();

    public ngAfterContentInit() {
        this.buttons.forEach((button) => {
            this.subscribeToChanges(button);
        });
    }

    private subscribeToChanges(button) {
        button.selectedButtonChange.subscribe((value) => {
            this.change.emit(value);
            this.buttons.forEach((btn) => {
                if (btn.value !== value) {
                    btn.selected = false;
                }
            });
        });
    }
}
