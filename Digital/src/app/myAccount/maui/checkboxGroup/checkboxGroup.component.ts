import { AfterContentInit, Component, ContentChildren, EventEmitter, Output, QueryList } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
    selector: 'agl-maui-checkbox-group',
    templateUrl: './checkboxGroup.component.html',
    styleUrls: ['./checkboxGroup.component.scss']
})
export class CheckboxGroupComponent implements AfterContentInit {
    @ContentChildren(CheckboxComponent) public checkboxes: QueryList<CheckboxComponent>;
    @Output() public checked: EventEmitter<string[]> = new EventEmitter<string[]>();
    private checkedItems: string[] = [];

    public ngAfterContentInit(): void {
        this.checkboxes.forEach((checkbox, index) => {
            if (checkbox.isChecked) { this.checkedItems.push(checkbox.value); }
            this.subscribeToChanges(checkbox);
        });
        this.checked.emit(this.checkedItems);
    }

    private subscribeToChanges(checkbox): void {
        checkbox.checked.subscribe((isChecked: boolean) => {
            const checkedItem = this.checkedItems.indexOf(checkbox.value);
            isChecked ? this.checkedItems.push(checkbox.value) : this.checkedItems.splice(checkedItem, 1);
            this.checked.emit(this.checkedItems);
        });
    }
}
