import { Component, EventEmitter, Input, Output } from '@angular/core';

export class YesNoModel {
    public isYes: boolean;
    public isInFlight: boolean;
}

@Component({
    selector: 'agl-yes-no-switch',
    templateUrl: './yesNoSwitch.component.html',
    styleUrls: ['./yesNoSwitch.component.scss']
})
export class YesNoSwitchComponent {
    @Input() public yesNoModel: YesNoModel;
    @Input() public isDisabled: boolean = false;
    @Output() public switchChanged = new EventEmitter<boolean>();
    public toggleSwitch() {
        this.yesNoModel.isYes = this.yesNoModel.isYes ? false : true;
        this.yesNoModel.isInFlight = true;
        this.switchChanged.emit(this.yesNoModel.isYes);
    }
}
