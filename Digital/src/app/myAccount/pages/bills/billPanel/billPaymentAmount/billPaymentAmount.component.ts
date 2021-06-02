import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DisplayMessages } from '../../../../../shared/globals/displayMessages';
import { ContentService } from '../../../../../shared/service/content.service';
import { Now } from '../../../../../shared/service/now.service';
import { ContractViewModel } from '../../../../services/account.service';
import { BillTypes } from '../billPanel.component';
import { AlertMessages } from './../../../../../shared/messages/alertMessages';
import { BillDescriptionService } from '../../../../services/billDescription.service';

@Component({
    selector: 'agl-bill-payment-amount',
    templateUrl: './billPaymentAmount.component.html',
    styleUrls: ['./billPaymentAmount.component.scss']
})
export class BillPaymentAmountComponent implements OnInit {

    @Input() public type: BillTypes;
    @Input() public contract: ContractViewModel;
    @Input() public address;
    @Input() public isAmountOnly;
    @Input() public isDashboard;
    public paymentAmount;
    public overdueAmount;
    public newAmount;
    public buttonText;
    public overdueNewChargesSubtext;
    public billIssuedIn;
    public isDefaultMode = false;
    public paygDebitMessage: string;
    public isPaygDebit: Boolean;
    public isPaygLowCredit: Boolean;
    public amountUnavailable: Boolean;
    public paymentPendingMessage = DisplayMessages.PAYMENT_PENDING;
    public amountClass: string;
    public nextPayment: string;
    public billSmoothingFrequency: string;
    public overdueByText: string;
    public readonly creditText: string = 'Credit';

    constructor(
        private now: Now,
        private contentService: ContentService,
        private billDescriptionService: BillDescriptionService,
        public alertMessages: AlertMessages
    ) { }

    public ngOnInit() {
        this.contentService.getContent().subscribe((result) => {
            if (result.selfService !== undefined) {
                if (result.selfService.payg !== undefined) {
                    this.paygDebitMessage = result.selfService.payg.highUrgencyTopupMessage;
                }
            }
        });

        if (this.type.overdue) {
            this.paymentAmount = this.contract.paymentOverdue;
            this.setOverdueText(this.contract.dueDate);
            // Overdue with a debit...
            if (this.type.hasDebit) {
                this.paymentAmount = (this.contract.paymentOverdue + this.contract.currentBalance);
                this.overdueNewChargesSubtext = true;
                this.overdueAmount = this.contract.paymentOverdue;
                this.newAmount = this.contract.currentBalance;
            }
        } else if (this.type.directDebit && this.type.hasCredit) {
            this.paymentAmount = Math.abs(this.contract.currentBalance);
        } else {
            this.paymentAmount = this.contract.currentBalance;

            // Remove negative
            if (this.type.hasCredit) {
                this.paymentAmount = Math.abs(this.contract.currentBalance);
            }

            // No payments / no balance
            if (!this.paymentAmount) {
                this.paymentAmount = 0;
            }
        }

        // If no address comes through, take the contract address
        if (!this.address) {
            this.address = this.contract.address;
        }

        if (this.type.outOfBillPeriod || this.type.billPaid) {
            this.billIssuedIn = this.billDescriptionService.nextBillIssuedIn(
                this.contract.currentBillEndDate,
                'Your next bill will be issued soon',
                'Your next bill is on the way',
                'Next bill issued in'
             );
        }

        if (this.isAmountOnly) {
            this.isDefaultMode = true;
        }

        if (this.type.billSmoothingV2) {
            let paymentScheme = this.contract.paymentScheme;

            this.billSmoothingFrequency = `per ${paymentScheme.frequency.slice(0, -2).toLowerCase()}`;

            if (paymentScheme.nextPayment) {
                this.paymentAmount = Math.abs(paymentScheme.nextPayment.amount);
                let billSmoothingDueMessage = this.type.directDebit ? 'Debited' : 'Due';
                let nextPaymentDate = moment(paymentScheme.nextPayment.date).format('ddd DD MMM YYYY');
                this.billIssuedIn = `${billSmoothingDueMessage} - ${nextPaymentDate}`;

            } else {
                this.paymentAmount = Math.abs(paymentScheme.previousPayment.amount);
                this.billIssuedIn = '';
            }
        }

        if (this.contract.instalmentPlan) {
            this.paymentAmount = this.contract.instalmentPlan.billing.getAmountToPay();
            this.type.overdue = this.contract.instalmentPlan.billing.isOverdue();
        }
    }

    private setOverdueText(dueDate: Date) {
        const difference = moment(this.now.date()).diff(dueDate, 'days');
        if (difference > 0) {
            this.overdueByText = `Overdue by ${difference} day${(difference === 1) ? '' : 's'}`;
        }
    }
}
