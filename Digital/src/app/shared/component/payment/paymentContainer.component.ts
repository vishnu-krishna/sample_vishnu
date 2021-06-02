import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentView } from '../../globals/paygConstants';
import { PrePaymentBalanceTopUpUrgency } from '../../globals/prePaymentBalanceTopUpUrgency';
import { PaymentSuccessMessage } from '../../messages/paymentSuccess.message';
import { PaymentViewMessage } from '../../messages/paymentView.message';
import { BonusBand } from '../../model/payment/bonusBand.model';
import { PaymentDetails } from '../../model/payment/paymentDetails.model';
import { IMessageBusService } from '../../service/contract/imessageBus.service';
import { DataLayerService } from './../../service/dataLayer.service';
import { PaymentSelectComponent } from './paymentSelect.component';
import { PaymentSuccessComponent } from './paymentSuccess.component';

declare let leanengage: any;

@Component({
    selector: 'agl-payment-form',
    templateUrl: './paymentContainer.component.html',
    styleUrls: ['./paymentContainer.component.scss']
})
export class PaymentContainerComponent implements OnInit {
    @ViewChild('paymentSelect') public paymentSelect: PaymentSelectComponent;
    @ViewChild('paymentSuccess') public paymentSuccess: PaymentSuccessComponent;
    public address: string;
    public fuelType: string;
    public reference: string;
    public contractNumber: string;
    public amount: string;
    public paygBand: PrePaymentBalanceTopUpUrgency;
    public isPayg: boolean;
    public data: {isSmsPay: boolean, isDirectDebit: boolean};
    public paymentPending: boolean;
    public currentView: PaymentView = PaymentView.MakePayment;
    public PaymentViewEnum = PaymentView;
    public paymentDetails: PaymentDetails = new PaymentDetails();
    public bonusBands: BonusBand[];
    public prePaymentDate: string;
    public showOutstandingBillPayg: boolean;
    public outstandingBill: number;

    constructor(
        private _messageBusService: IMessageBusService,
        private dataLayerService: DataLayerService) {
    }

    public ngOnInit() {
        this.isPayg = (this.paygBand != null);
        this.initialisePaymentDetails();
        if (this.paygBand != null) {
            // Sends information to the GA data layer.
            this.dataLayerService.pushSingleEvents({ PAYGvalue: this.checkPaygBand() });
            if (this.bonusBands.length > 0 && this.paygBand !== PrePaymentBalanceTopUpUrgency.Unavailable) {
                if (((this.paygBand === PrePaymentBalanceTopUpUrgency.High && this.prePaymentDate) || this.paygBand !== PrePaymentBalanceTopUpUrgency.High) && !this.showOutstandingBillPayg) {
                    this.currentView = PaymentView.PAYGBonusSelect;
                }
            }
        }
        this._messageBusService.listen(PaymentViewMessage).subscribe((view) => {
            this.currentView = view.paymentView;
        });
        this._messageBusService.listen(PaymentSuccessMessage).subscribe((result) => {
            this.paymentDetails.receiptDetail = result.receiptDetail;
            this.currentView = result.paymentView;
            /**
             * WARNING!
             * Below contains a dirty hack, please don't replicate.
             * This is in place due to a significantly different payment
             * successful page, TODO: get them to decide on consistency.
             */
            setTimeout(() => {
                let paymentPageElement = document.getElementById('agl-payment-success');
                let modalPadeElementId = document.getElementById('agl-modal-body-id');
                let modalWrapperElement = document.getElementById('agl-modal-wrapper-id');
                modalPadeElementId.appendChild(paymentPageElement);
                modalWrapperElement.style.display = 'none';
            }, 0);
        });
    }

    /**
     * sets the current view to make payment when the user selects a bonus amount.
     * @param  {number} amount
     */
    public onPAYGSelectAmount(amount: number) {
        this.currentView = PaymentView.MakePayment;
        setTimeout(() => {
            this.paymentSelect.onSelectPAYGAmount(amount);
        }, 0);
    }
    public changeView(view: PaymentView) {
        this.currentView = view;
    }

    /**
     * initialises the paymentDetails object
     */
    private initialisePaymentDetails() {
        this.paymentDetails.address = this.address;
        this.paymentDetails.fuelType = this.fuelType;
        this.paymentDetails.isPayg = this.isPayg;
        this.paymentDetails.paygBand = this.paygBand;
        this.paymentDetails.paymentPending = this.paymentPending;
        this.paymentDetails.contractNumber = this.contractNumber;
        this.paymentDetails.referenceNumber = this.reference;
        this.paymentDetails.prePaymentDate = this.prePaymentDate;
        if (!this.isPayg) {
            this.paymentDetails.amount = this.amount;
        }
        this.paymentDetails.showOutstandingBillPayg = this.showOutstandingBillPayg;
        this.paymentDetails.outstandingBill = this.outstandingBill;
    }

    private checkPaygBand() {
        switch (this.paymentDetails.paygBand) {
            case PrePaymentBalanceTopUpUrgency.High:
                return 'Debit';
            case PrePaymentBalanceTopUpUrgency.Medium:
                return 'Low Credit';
            case PrePaymentBalanceTopUpUrgency.Low:
                return 'High Credit';
            default:
                return '';
        }
    }
}
