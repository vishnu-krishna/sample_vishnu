import { Component, Input, OnInit } from '@angular/core';
import { PrePaymentBalanceTopUpUrgency } from '../../../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { ContractViewModel } from '../../../../services/account.service';
import { BillTypes } from '../billPanel.component';

@Component({
    selector: 'agl-bill-title',
    templateUrl: './billTitle.component.html',
    styleUrls: ['./billTitle.component.scss']
})
export class BillTitleComponent implements OnInit {

    @Input() public type: BillTypes;
    @Input() public contract: ContractViewModel;

    public title: string;

    // Constant Strings
    public directDebitTitle = 'Direct Debit amount';
    public accountBalanceTitle = 'Account balance';
    public totalTitle = 'Please pay';
    public paygBillingTitle = 'Bill Issued';
    public billSmoothingTitle = 'Bill Smoothing payment';

    public ngOnInit() {
        if (this.contract.isPayg) {
            if (this.contract.paygBand === PrePaymentBalanceTopUpUrgency.High && !this.contract.paygPrepaymentEligibile && !this.contract.showOutstandingBillPayg) {
                if (this.type.hasDebit || this.type.newBillAndOverdue || this.type.overdue) {
                    this.title = this.paygBillingTitle;
                }
                if (this.type.noBills) {
                    this.title = '';
                }
            }
        } else if (this.type.billSmoothingV2) {
            this.title = this.billSmoothingTitle;
        } else {
            if (this.type.directDebit) {
                this.title = this.directDebitTitle;
                if (this.type.directDebit && this.type.hasCredit) {
                    this.title = this.accountBalanceTitle;
                }
                if (this.type.billPaid) {
                    this.title = this.accountBalanceTitle;
                }
            } else if (this.type.billPaid || this.type.hasCredit) {
                this.title = this.accountBalanceTitle;
                if (this.type.billPaid && this.type.overdue) {
                    this.title = this.totalTitle;
                }
            } else if (this.type.noBills) {
                this.title = this.accountBalanceTitle;
            } else {
                this.title = this.totalTitle;
            }
        }
    }
}
