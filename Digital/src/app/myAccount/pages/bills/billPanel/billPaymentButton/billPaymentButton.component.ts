import { Component, Input, OnInit } from '@angular/core';
import { PrePaymentBalanceTopUpUrgency } from '../../../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { PaygContentModel } from '../../../../../shared/model/domain/paygContent.model';
import { ContentService } from '../../../../../shared/service/content.service';
import {
    DataLayerService,
    EventAction,
    EventCategory,
    EventLabel,
    ModalName
} from '../../../../../shared/service/dataLayer.service';
import { ContractViewModel } from '../../../../services/account.service';
import { PaymentService } from '../../../../services/payment.service';
import { BillTypes } from '../billPanel.component';

@Component({
    selector: 'agl-bill-payment-button',
    templateUrl: './billPaymentButton.component.html',
    styleUrls: ['./billPaymentButton.component.scss']
})
export class BillPaymentButtonComponent implements OnInit {
    @Input() public type: BillTypes;
    @Input() public contract: ContractViewModel;
    @Input() public address;

    public amount;
    public buttonText;
    public content: PaygContentModel;
    public isLoading: boolean = false;

    constructor(
        private _contentService: ContentService,
        private _paymentService: PaymentService,
        private _dataLayer: DataLayerService
    ) { }

    public ngOnInit() {
        this._contentService.getContent().subscribe((result) => {
            if (result.selfService !== undefined &&
                result.selfService.payg !== undefined) {
                this.content = result.selfService.payg;
            }
        });

        if (this.contract.isPayg) {
            this._dataLayer.pushPaygButton();
            this.buttonText = this.content.buttonText[PrePaymentBalanceTopUpUrgency[this.contract.paygBand]];
        } else {
            if (this.type.overdue) {
                this.amount = this.contract.paymentOverdue;
                // Overdue with a debit...
                if (this.type.hasDebit) {
                    this.amount = (this.contract.currentBalance + this.contract.paymentOverdue);
                }
                this.buttonText = 'Pay Now';
            } else if (this.type.hasCredit) {
                this.amount = 0;
                this.buttonText = 'Make a payment';
            } else {
                this.amount = this.contract.currentBalance;
                this.buttonText = 'Make a payment';
            }

            // If no address comes through, take the contract address
            if (!this.address) {
                this.address = this.contract.address;
            }
        }

        if (this.contract.isBillSmoothingV2) {
            const paymentScheme = this.contract.paymentScheme;
            this.amount = paymentScheme.nextPayment ?
                          paymentScheme.nextPayment.amount :
                          paymentScheme.previousPayment.amount;
        }

        if (this.contract.pendingPaymentAmount > 0) {
            this.amount = 0;
        } else {
            this.amount = this.type.hasCredit ? 0 : this.amount;
        }

        if (this.contract.instalmentPlan) {
            this.amount = this.contract.instalmentPlan.billing.getAmountToPay();
            this.buttonText = 'Make a payment';
        }
    }

    /**
     * Opens the payment popup.
     */
    public openPaymentPopup() {
        this._dataLayer.pushClickEvent(ModalName.None, EventCategory.AccountsPush, EventAction.ClickAction, EventLabel.MakePayment);
        this._paymentService.openPaymentModal(this.contract, this.amount, this.address).subscribe(
            (result) => {
                this.isLoading = false;
            });
    }
}
