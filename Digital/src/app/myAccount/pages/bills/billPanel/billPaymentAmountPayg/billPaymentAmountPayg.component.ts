import { Component, Input, OnInit } from '@angular/core';
import { PrePaymentBalanceTopUpUrgency } from '../../../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { PaygContentModel } from '../../../../../shared/model/domain/paygContent.model';
import { ContentService } from '../../../../../shared/service/content.service';
import { ContractViewModel } from '../../../../services/account.service';
import { PaymentService } from '../../../../services/payment.service';
import { BillTypes } from '../billPanel.component';
import { AlertMessages } from './../../../../../shared/messages/alertMessages';

@Component({
    selector: 'agl-bill-payment-amount-payg',
    templateUrl: './billPaymentAmountPayg.component.html',
    styleUrls: ['./billPaymentAmountPayg.component.scss']
})
export class BillPaymentAmountPaygComponent implements OnInit {

    @Input() public type: BillTypes;
    @Input() public contract: ContractViewModel;
    @Input() public address;
    public paygContent: PaygContentModel;
    public amount: number;
    public isPaygDebit: boolean;
    public showOverdueDDMessage: boolean;
    public page: string = 'billing';

    constructor(
        private _paymentService: PaymentService,
        private _contentService: ContentService,
        public _alertMessages: AlertMessages
    ) { }

    public ngOnInit() {
        this._contentService.getContent().subscribe((result) => {
            if (result.selfService !== undefined &&
                result.selfService.payg !== undefined) {
                this.paygContent = result.selfService.payg;
            }
        });
        this.amount = 0;
        if (this.contract.isPayg) {
           if (this.contract.paygBand === PrePaymentBalanceTopUpUrgency.High && !this.contract.paygPrepaymentEligibile && !this.contract.showOutstandingBillPayg) {
               if (this.type.hasDebit || this.type.overdue || this.type.newBillAndOverdue) {
                   if (this.type.directDebit && (this.type.overdue || this.type.newBillAndOverdue)) {
                       this.showOverdueDDMessage = true;
                   } else {
                       this.isPaygDebit = true;
                   }
               }
           }
       }

    }
}
