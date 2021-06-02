import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeatureFlagService, FeatureFlagTypes } from '../../../myAccount/services/featureFlag.service';

@Component({
    selector: 'agl-button-dropdown',
    templateUrl: './buttonDropdown.component.html',
    styleUrls: ['./buttonDropdown.component.scss']
})
export class ButtonDropdownComponent implements OnInit {
    @Input() public list: Array<{ value: string, name: string }>;
    @Input() public name: string = 'list';
    @Output() public onSelect = new EventEmitter<string>();

    public selectedName: string = '';

    constructor(
        public _featureFlagService: FeatureFlagService) {
    }

    public selectButton(item: { value: string, name: string }) {
        this.selectedName = item.name;
        this.onSelect.emit(item.value);
    }

    public changeSelection() {
        this.selectedName = '';
        this.onSelect.emit(null);
    }

    public ngOnInit() {
        this._featureFlagService.featureFlagged(FeatureFlagTypes.bankAccountPaymentEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                if (!featureIsEnabled) {
                    this.list = this.list.filter((obj) => obj.name !== 'Bank Account');
                }
            }
        );
    }
}
