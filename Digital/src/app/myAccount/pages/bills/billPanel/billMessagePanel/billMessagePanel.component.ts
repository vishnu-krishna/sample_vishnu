import { Component, Input, OnInit }  from '@angular/core';
import { AccountService, ContractViewModel } from '../../../../services/account.service';
import { BillPanelComponent, BillTypes } from '../billPanel.component';

@Component({
    selector: 'agl-bill-message-panel',
    templateUrl: './billMessagePanel.component.html',
    styleUrls: ['./billMessagePanel.component.scss']
})
export class BillMessagePanelComponent implements OnInit {
    @Input() public type: BillTypes;
    @Input() public contract: ContractViewModel;

    public noBalance: boolean;
    public accountInCredit: boolean;

    public ngOnInit() {
        if (this.type.noBills) {
            this.noBalance = true;
        } else if (this.type.overdue && this.type.newBillAndOverdue) {
            // do nothing
        } else if (this.type.directDebit || this.type.billSmoothing) {
            // Bill is paid, then the bill is good.
            if (this.type.billPaid) {
                this.noBalance = true;
            }
            // Has Credit
            if (this.type.hasCredit) {
                this.accountInCredit = true;
            }
        } else if (this.type.newBillAndOverdue && this.type.overdue && this.type.billPaid) {
            // do nothing
        } else if (this.type.billPaid) {
            this.noBalance = true;
        } else if (this.type.hasCredit) {
            this.accountInCredit = true;
        }
    }
}
