import { Component, Input, OnInit } from '@angular/core';
import { BillTypes } from '../billPanel.component';

@Component({
    selector: 'agl-bill-bottom-notice',
    templateUrl: './billBottomNotice.component.html',
    styleUrls: ['./billBottomNotice.component.scss']
})
export class BillBottomNoticeComponent implements OnInit {
    @Input() public type: BillTypes;
    public showMessage: boolean = false;
    public showDDMessage: boolean = false;

    public ngOnInit() {
        if (this.type.directDebit && !this.type.billSmoothing && !(this.type.newBillAndOverdue || this.type.overdue)) {
            this.showDDMessage = true;
        }

        if (this.type.billPaid || this.type.hasCredit) {
            this.showMessage = false;
        } else if (this.type.directDebit) {
            this.showMessage = true;
        }
    }
}
