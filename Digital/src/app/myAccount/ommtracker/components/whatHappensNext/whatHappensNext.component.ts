import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfoItem } from '../../../../shared/model/ommTracker/infoItem.model';

@Component({
    selector: 'agl-what-happens-next',
    templateUrl: './whatHappensNext.component.html',
    styleUrls: ['./whatHappensNext.component.scss']
})
export class WhatHappensNextComponent {
    @Input() public whatHappensNextContent: InfoItem[];
    @Output() public clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

    public closeModal() {
        this.clickClose.emit(true);
    }

    public getColValue() {
        let colNumber = 12;
        if (this.whatHappensNextContent && this.whatHappensNextContent.length > 1) {
            colNumber = Math.round(12 / this.whatHappensNextContent.length);
            if (colNumber < 4) {
                colNumber = 4;
            }
        }
        return colNumber;
    }

}
