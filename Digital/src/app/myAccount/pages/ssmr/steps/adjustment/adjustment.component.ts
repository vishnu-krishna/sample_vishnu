import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { ISsmrService } from '../../../../services/contract/issmr.service';
import { ContractDisplayViewModel } from '../../../../model/ssmr/contractDisplayView.model';
import { SelfServiceReadingResponse } from '../../../../../shared/service/api.service';
import { SsmrScreenCode } from '../../../../services/ssmr.service';
import { PaymentService } from '../../../../services/payment.service';

@Component({
    selector: 'agl-ssmr-adjustment',
    templateUrl: './adjustment.component.html',
    styleUrls: ['./adjustment.component.scss']
})
export class AdjustmentComponent implements OnInit {
    public invoiceDueDate: string;
    public screenCode: SsmrScreenCode;
    public selectedContract: ContractDisplayViewModel;
    public adjustmentHeading: string;
    public adjustmentMessage: string;
    public numberOfDaysTillNextBill: string;
    public selfServiceReadingResponse: SelfServiceReadingResponse; // Meter reading data received from API.
    public billingHeading: string;
    public billingHeadingOriginal: string;
    public currentBillAmount: number;
    public amountNumber: string;
    public amountDecimal: string;
    public amountOriginal = {
        number: '',
        decimal: ''
    };
    public amountCredit = {
        number: '',
        decimal: ''
    };
    public currentBillStartDate: Date;
    public currentBillEndDate: Date;
    public currentBillDateString: string;
    public isDirectDebit: boolean = false;
    public isOverDue: boolean = false;
    public daysUntilDue: string = '';
    public accountBalance: string;
    public overDueHeading: string;
    public isInCredit: boolean;
    public postAdjustmentIsCredit: boolean = false;
    public postAdjustmentCredit: string = '';
    public projectedBillAmount: string;
    public dailyUsage: string;
    public weeklyUsage: string;
    public creditHeading: string;
    public payButtonMessage: string;
    public paymentAmount: number;
    public isAccountBalancePositive: boolean;
    public projectedBillStartDate: Date;
    public projectedBillEnddate: Date;
    public projectedBillDateString: string;
    public isEntrySkipped: boolean = false;

    constructor(
        public ssmrService: ISsmrService,
        public paymentService: PaymentService
    ) {
    }

    public ngOnInit() {
        this.selectedContract = this.ssmrService.selectedContract;
        this.selfServiceReadingResponse = this.ssmrService.selfServiceReadingResponse;
        if (this.selectedContract.isDirectDebit) {
            this.isDirectDebit = true;
        }
        this.screenCode = this.ssmrService.screenCode;
        this.isAnyMeterSkipped();
        if (this.ssmrService.submissionType  === 'Photo') {
            this.adjustmentHeading = 'Thanks!';
            this.adjustmentMessage = `We'll review your meter reads and photos, and get back to you via email shortly.`;
        } else if  (this.selectedContract.isBillSmoothing) {
            this.adjustmentHeading = 'Thanks for your read';
            this.adjustmentMessage = `Your meter read was taken within two days of your bill creation date, so we’ll use this to calculate your next bill.`;
            this.billingHeading = 'Latest charges';
            this.buildBill();
        } else if ( this.screenCode === 'SSMR_ADJ1' || this.screenCode === 'SSMR_ADJ3') {
            this.adjustmentHeading = 'Your revised charges';
            this.adjustmentMessage = 'Great news, your meter read is lower than expected so we’ve adjusted your total to pay.';
            this.billingHeading = 'Revised total to pay';
            this.billingHeadingOriginal = 'Original total';

            if ( this.numberOfDaysTillNextBillExists(this.selfServiceReadingResponse)) {
                this.numberOfDaysTillNextBill = this.selfServiceReadingResponse.numberOfDaysTillNextBill;
            } else {
                this.numberOfDaysTillNextBill = '';
            }
            if ( this.preAdjustmentBalanceExists(this.selfServiceReadingResponse) ) {
                let preAdjustmentBalance = this.selfServiceReadingResponse.adjustment.preAdjustmentBalance;
                this.buildAmountToShow(preAdjustmentBalance, this.amountOriginal);
            } else {
                this.buildAmountToShow(0);
            }
            if ( this.postAdjustmentBalanceExists(this.selfServiceReadingResponse) ) {
                let postAdjustmentBalance = this.selfServiceReadingResponse.adjustment.postAdjustmentBalance;
                if (postAdjustmentBalance < 0) {
                    this.postAdjustmentCredit = Math.abs(postAdjustmentBalance).toString();
                    this.postAdjustmentIsCredit = true;
                    this.buildAmountToShow(0);
                    this.payButtonMessage = 'MAKE A PAYMENT';
                } else {
                    this.buildAmountToShow(postAdjustmentBalance);
                    this.payButtonMessage = 'PAY NOW';
                    this.paymentAmount = postAdjustmentBalance;
                }
            } else {
                this.buildAmountToShow(0);
            }
            if (this.adjustmentStartDateExists(this.selfServiceReadingResponse) &&
                this.adjustmentEndDateExists(this.selfServiceReadingResponse) ) {
                this.currentBillStartDate = this.selfServiceReadingResponse.adjustment.startDate;
                this.currentBillEndDate = this.selfServiceReadingResponse.adjustment.endDate;
                this.currentBillDateString = this.buildBillDateString( this.currentBillStartDate, this.currentBillEndDate );
            }
            if ( this.invoiceDueDateExists(this.selfServiceReadingResponse)) {
                this.invoiceDueDate = this.buildDueDateString(this.selfServiceReadingResponse.invoiceDueDate);
            } else {
                this.invoiceDueDate = '';
            }
        } else if ( this.screenCode === 'SSMR_ADJ2') {
            this.adjustmentHeading = `Credit applied`;
            this.adjustmentMessage = `Great news, your meter read is lower than expected so we've credited your account.`;
            this.billingHeading = 'Current bill period';
            this.creditHeading = 'Your account will be credited';
            this.buildBill();
            if ( this.postAdjustmentBalanceExists(this.selfServiceReadingResponse) ) {
                let postAdjustmentBalance = this.selfServiceReadingResponse.adjustment.postAdjustmentBalance;
                if (postAdjustmentBalance < 0) {
                    this.postAdjustmentIsCredit = true;
                }
                this.buildAmountToShow(Math.abs(postAdjustmentBalance), this.amountCredit);
                this.paymentAmount = postAdjustmentBalance;
                this.payButtonMessage = 'PAY NOW';

            } else {
                this.buildAmountToShow(0);
                this.payButtonMessage = 'MAKE A PAYMENT';

            }

            if ( this.projectedBillAmountExists(this.selfServiceReadingResponse)) {
                this.projectedBillAmount = this.selfServiceReadingResponse.projectedBill.amount.toFixed(2);
            }

            if (this.dailyUsageExists(this.selfServiceReadingResponse)) {
                this.dailyUsage = this.selfServiceReadingResponse.dailyUsage;
                this.weeklyUsage = (+this.dailyUsage * 7).toFixed(2);
            }

            if (this.projectedBillStartDateExists(this.selfServiceReadingResponse) &&
                this.projectedBillEndDateExists(this.selfServiceReadingResponse) ) {
                this.currentBillStartDate = this.selfServiceReadingResponse.projectedBill.startDate;
                this.currentBillEndDate = this.selfServiceReadingResponse.projectedBill.endDate;
                this.currentBillDateString = this.buildBillDateString( this.currentBillStartDate, this.currentBillEndDate );
            }
        } else if  (this.screenCode === 'SSMR_NSBD1') {
            this.adjustmentHeading = 'Your bill is on the way';
            this.adjustmentMessage = `Your meter read was taken within two days of your bill creation date, so we’ll use this to calculate your next bill.`;
            this.billingHeading = '*Projected bill';
            this.buildBill();

            if (this.projectedBillAmountExists(this.selfServiceReadingResponse)) {
                this.currentBillAmount = this.selfServiceReadingResponse.projectedBill.amount;
                this.paymentAmount = this.selfServiceReadingResponse.projectedBill.amount;
                this.payButtonMessage = 'PAY NOW';
            } else {
                this.currentBillAmount = 0;
                this.payButtonMessage = 'MAKE A PAYMENT';
            }
            this.buildAmountToShow(this.currentBillAmount);

            if (this.projectedBillStartDateExists(this.selfServiceReadingResponse) &&
                this.projectedBillEndDateExists(this.selfServiceReadingResponse) ) {
                this.currentBillStartDate = this.selfServiceReadingResponse.projectedBill.startDate;
                this.currentBillEndDate = this.selfServiceReadingResponse.projectedBill.endDate;
                this.currentBillDateString = this.buildBillDateString( this.currentBillStartDate, this.currentBillEndDate );
            }

        } else if (this.screenCode === 'SSMR_NSBD2') {
            this.adjustmentHeading = 'Your bill is on the way';
            this.adjustmentMessage = `Your meter read was taken within two days of your bill creation date, so we’ll use this to calculate your next bill.`;
            this.billingHeading = '*Projected bill';
            this.overDueHeading = 'PLUS OVERDUE CHARGES OF';
            this.buildBill();

            if (this.projectedBillAmountExists(this.selfServiceReadingResponse) && this.accountBalanceExists(this.selfServiceReadingResponse)) {
                this.currentBillAmount = this.selfServiceReadingResponse.projectedBill.amount;
                this.paymentAmount = this.selfServiceReadingResponse.projectedBill.amount + this.selfServiceReadingResponse.accountBalance;
                this.payButtonMessage = 'PAY NOW';
            } else {
                this.currentBillAmount = 0;
                this.payButtonMessage = 'MAKE A PAYMENT';
            }
            this.buildAmountToShow(this.currentBillAmount);

            if (this.projectedBillStartDateExists(this.selfServiceReadingResponse) &&
                this.projectedBillEndDateExists(this.selfServiceReadingResponse) ) {
                this.currentBillStartDate = this.selfServiceReadingResponse.projectedBill.startDate;
                this.currentBillEndDate = this.selfServiceReadingResponse.projectedBill.endDate;
                this.currentBillDateString = this.buildBillDateString( this.currentBillStartDate, this.currentBillEndDate );
            }
        } else if ( this.screenCode === 'SSMR_PROJ1' ) {
            this.adjustmentHeading = 'Thanks for your read';
            this.adjustmentMessage = 'Your meter read is what we expected. You’re now able to see your costs to date and a projection of your current billing cycle.';
            this.billingHeading = 'Current bill period';
            this.buildBill();

            if ( this.projectedBillAmountExists(this.selfServiceReadingResponse)) {
                this.projectedBillAmount = this.selfServiceReadingResponse.projectedBill.amount.toFixed(2);
            }

            if (this.dailyUsageExists(this.selfServiceReadingResponse)) {
                this.dailyUsage = this.selfServiceReadingResponse.dailyUsage;
                this.weeklyUsage = (+this.dailyUsage * 7).toFixed(2);
            }

            if (this.projectedBillStartDateExists(this.selfServiceReadingResponse) &&
                this.projectedBillEndDateExists(this.selfServiceReadingResponse) ) {
                this.currentBillStartDate = this.selfServiceReadingResponse.projectedBill.startDate;
                this.currentBillEndDate = this.selfServiceReadingResponse.projectedBill.endDate;
                this.currentBillDateString = this.buildBillDateString( this.currentBillStartDate, this.currentBillEndDate );
            }

        } else if ( this.screenCode === 'SSMR_PROJ2') {
            this.adjustmentHeading = 'Thanks for your read';
            this.adjustmentMessage = 'Your meter read is what we expected. <br> This ensures that your current charges are accurate.';
            this.billingHeading = 'Total to pay';

            if ( this.numberOfDaysTillNextBillExists(this.selfServiceReadingResponse)) {
                this.numberOfDaysTillNextBill = this.selfServiceReadingResponse.numberOfDaysTillNextBill;
            } else {
                this.numberOfDaysTillNextBill = '';
            }
            if (this.accountBalanceExists(this.selfServiceReadingResponse)) {
                let accountBalance: number = +this.selfServiceReadingResponse.accountBalance;
                if (accountBalance < 0 ) {
                    this.isInCredit = true;
                    this.billingHeading = 'Account in Credit';
                    accountBalance = Math.abs(accountBalance);
                    this.payButtonMessage = 'MAKE A PAYMENT';
                } else {
                    this.paymentAmount = accountBalance;
                    this.payButtonMessage = 'PAY NOW';
                }
                this.buildAmountToShow(accountBalance);
            } else {
                this.buildAmountToShow(0);
            }

            if (this.lastInvoiceStartDateExists(this.selfServiceReadingResponse) &&
                this.lastInvoiceEndDateExists(this.selfServiceReadingResponse) ) {
                this.currentBillStartDate = this.selfServiceReadingResponse.lastInvoice.startDate;
                this.currentBillEndDate = this.selfServiceReadingResponse.lastInvoice.endDate;
                this.currentBillDateString = this.buildBillDateString( this.currentBillStartDate, this.currentBillEndDate );
            }
            if ( this.invoiceDueDateExists(this.selfServiceReadingResponse)) {
                this.invoiceDueDate = this.buildDueDateString(this.selfServiceReadingResponse.invoiceDueDate);
            } else {
                this.invoiceDueDate = '';
            }
        } else if ( this.screenCode === 'SSMR_PROJ3') {
            this.adjustmentHeading = 'Thanks for your read';

            if (this.accountBalanceExists(this.selfServiceReadingResponse)) {
                if ( this.selfServiceReadingResponse.accountBalance <= 0) { // Do behavior like PROJ1.
                    this.adjustmentMessage = `By providing your meter read, you're now able to see your costs to date and a projection of your current billing cycle.`;
                    this.isAccountBalancePositive = false;
                    this.billingHeading = 'Current bill period';
                    this.buildBill();

                    if ( this.projectedBillAmountExists(this.selfServiceReadingResponse)) {
                        this.projectedBillAmount = this.selfServiceReadingResponse.projectedBill.amount.toFixed(2);
                    }

                    if (this.dailyUsageExists(this.selfServiceReadingResponse)) {
                        this.dailyUsage = this.selfServiceReadingResponse.dailyUsage;
                        this.weeklyUsage = (+this.dailyUsage * 7).toFixed(2);
                    }

                    if (this.projectedBillStartDateExists(this.selfServiceReadingResponse) &&
                        this.projectedBillEndDateExists(this.selfServiceReadingResponse) ) {
                        this.currentBillStartDate = this.selfServiceReadingResponse.projectedBill.startDate;
                        this.currentBillEndDate = this.selfServiceReadingResponse.projectedBill.endDate;
                        this.currentBillDateString = this.buildBillDateString( this.currentBillStartDate, this.currentBillEndDate );
                    }
                } else { // Do behavior like Proj2
                    this.adjustmentMessage = 'Providing your meter read ensures that your current charges are accurate and lets you see a projection of your next bill.';
                    this.isAccountBalancePositive = true;

                    this.billingHeading = 'Total to pay';
                    if ( this.numberOfDaysTillNextBillExists(this.selfServiceReadingResponse)) {
                        this.numberOfDaysTillNextBill = this.selfServiceReadingResponse.numberOfDaysTillNextBill;
                    } else {
                        this.numberOfDaysTillNextBill = '';
                    }
                    if (this.accountBalanceExists(this.selfServiceReadingResponse)) {
                        let accountBalance: number = +this.selfServiceReadingResponse.accountBalance;
                        if (accountBalance < 0 ) {
                            this.isInCredit = true;
                            this.billingHeading = 'Account in Credit';
                            accountBalance = Math.abs(accountBalance);
                            this.payButtonMessage = 'MAKE A PAYMENT';
                        } else {
                            this.paymentAmount = accountBalance;
                            this.payButtonMessage = 'PAY NOW';
                        }
                        this.buildAmountToShow(accountBalance);
                    } else {
                        this.buildAmountToShow(0);
                    }

                    if (this.lastInvoiceStartDateExists(this.selfServiceReadingResponse) &&
                        this.lastInvoiceEndDateExists(this.selfServiceReadingResponse) ) {
                        this.currentBillStartDate = this.selfServiceReadingResponse.lastInvoice.startDate;
                        this.currentBillEndDate = this.selfServiceReadingResponse.lastInvoice.endDate;
                        this.currentBillDateString = this.buildBillDateString( this.currentBillStartDate, this.currentBillEndDate );
                    }
                    if ( this.invoiceDueDateExists(this.selfServiceReadingResponse)) {
                        this.invoiceDueDate = this.buildDueDateString(this.selfServiceReadingResponse.invoiceDueDate);
                    } else {
                        this.invoiceDueDate = '';
                    }

                    if ( this.projectedBillStartDateExists(this.selfServiceReadingResponse) &&
                        this.projectedBillEndDateExists(this.selfServiceReadingResponse) &&
                        this.projectedBillAmountExists(this.selfServiceReadingResponse)) {
                        this.projectedBillAmount = this.selfServiceReadingResponse.projectedBill.amount.toFixed(2);
                        this.projectedBillStartDate = this.selfServiceReadingResponse.projectedBill.startDate;
                        this.projectedBillEnddate = this.selfServiceReadingResponse.projectedBill.endDate;
                        this.projectedBillDateString = this.buildNextBillDateString(this.projectedBillStartDate, this.projectedBillEnddate);
                    }
                }
            }
        }
    }
    public isAnyMeterSkipped() {
        this.isEntrySkipped = this.selectedContract.meterCount !== this.ssmrService.selfServiceMeterReadings.length;
        if (!this.isEntrySkipped) { // Checking is any register inside the meter is skipped
            this.ssmrService.selfServiceMeterReadings.forEach((meter) => {
                if (!this.isEntrySkipped) {
                    if (meter) {
                        this.isEntrySkipped = meter.registers.some((register) => {
                            if (register) {
                                return register.reading === undefined;
                            }
                        });
                    } else {
                        this.isEntrySkipped = true;
                    }
                }
            });
        }
    }

    public onClickPayNow() {
        if (this.paymentAmount > 0) { // In Debit. Pre-populate amount owing.
            this.ssmrService.onClickClose(true, true); // Close and don't show survey.
            this.paymentService.openPaymentModal(this.selectedContract.contract, this.paymentAmount).subscribe();
        } else { // Amount to pay is blank.
            this.ssmrService.onClickClose(true, true); // Close and don't show survey.
            this.paymentService.openPaymentModal(this.selectedContract.contract).subscribe();
        }
    }

    public onClickCloseButton() {
        this.ssmrService.onClickClose(false);
    }

    public numberOfDaysTillNextBillExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('numberOfDaysTillNextBill')) {
            return true;
        } else {
            return false;
        }
    }

    public currentBillStartDateExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('currentBill') && response.currentBill.hasOwnProperty('startDate')) {
            return true;
        } else {
            return false;
        }
    }

    public currentBillEndDateExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('currentBill') && response.currentBill.hasOwnProperty('endDate')) {
            return true;
        } else {
            return false;
        }
    }

    public projectedBillStartDateExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('projectedBill') && response.projectedBill.hasOwnProperty('startDate')) {
            return true;
        } else {
            return false;
        }
    }

    public projectedBillEndDateExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('projectedBill') && response.projectedBill.hasOwnProperty('endDate')) {
            return true;
        } else {
            return false;
        }
    }

    public lastInvoiceStartDateExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('lastInvoice') && response.lastInvoice.hasOwnProperty('startDate')) {
            return true;
        } else {
            return false;
        }
    }

    public lastInvoiceEndDateExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('lastInvoice') && response.lastInvoice.hasOwnProperty('endDate')) {
            return true;
        } else {
            return false;
        }
    }

    public  adjustmentStartDateExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('adjustment') && response.adjustment.hasOwnProperty('startDate')) {
            return true;
        } else {
            return false;
        }
    }

    public  adjustmentEndDateExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('adjustment') && response.adjustment.hasOwnProperty('endDate')) {
            return true;
        } else {
            return false;
        }
    }

    public accountBalanceExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('accountBalance')) {
            return true;
        } else {
            return false;
        }
    }

    public currentBillAmountExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('currentBill') && response.currentBill.hasOwnProperty('amount')) {
            return true;
        } else {
            return false;
        }
    }

    public invoiceDueDateExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('invoiceDueDate')) {
            return true;
        } else {
            return false;
        }
    }

    public preAdjustmentBalanceExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('adjustment') && response.adjustment.hasOwnProperty('preAdjustmentBalance')) {
            return true;
        } else {
            return false;
        }
    }
    public postAdjustmentBalanceExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('adjustment') && response.adjustment.hasOwnProperty('postAdjustmentBalance')) {
            return true;
        } else {
            return false;
        }
    }

    public projectedBillAmountExists( response: SelfServiceReadingResponse): boolean {
         if ( response && response.hasOwnProperty('projectedBill') && response.projectedBill.hasOwnProperty('amount')) {
            return true;
        } else {
            return false;
        }
    }

    public dailyUsageExists( response: SelfServiceReadingResponse): boolean {
        if ( response && response.hasOwnProperty('dailyUsage')) {
            return true;
        } else {
            return false;
        }
    }

    public buildBill() {
        if ( this.numberOfDaysTillNextBillExists(this.selfServiceReadingResponse)) {
            this.numberOfDaysTillNextBill = this.selfServiceReadingResponse.numberOfDaysTillNextBill;
        } else {
            this.numberOfDaysTillNextBill = '';
        }

        if (this.currentBillAmountExists(this.selfServiceReadingResponse)) {
            this.currentBillAmount = this.selfServiceReadingResponse.currentBill.amount;
            this.payButtonMessage = 'PAY NOW';
        } else {
            this.currentBillAmount = 0;
            this.payButtonMessage = 'MAKE A PAYMENT';
        }
        this.buildAmountToShow(this.currentBillAmount);

        if (this.currentBillStartDateExists(this.selfServiceReadingResponse) &&
            this.currentBillEndDateExists(this.selfServiceReadingResponse) ) {
            this.currentBillStartDate = this.selfServiceReadingResponse.currentBill.startDate;
            this.currentBillEndDate = this.selfServiceReadingResponse.currentBill.endDate;
            this.currentBillDateString = this.buildBillDateString( this.currentBillStartDate, this.currentBillEndDate );
        }
        if ( this.invoiceDueDateExists(this.selfServiceReadingResponse)) {
            this.invoiceDueDate = this.buildDueDateString(this.selfServiceReadingResponse.invoiceDueDate);
        } else {
            this.invoiceDueDate = '';
        }

        if (this.accountBalanceExists(this.selfServiceReadingResponse)) {
            this.isAccountInCredit();
            this.accountBalance = Math.abs(this.selfServiceReadingResponse.accountBalance).toString(); // To get the amount if it have cr at the end of it
        }
        this.paymentAmount = +this.accountBalance + this.currentBillAmount;
    }

    public buildBillDateString( billStartDate: Date, billEndDate: Date): string {
        if ( billStartDate && billEndDate) {
            let startDate = moment(billStartDate);
            let endDate = moment(billEndDate);

            let startDateFormat = (startDate.year() === endDate.year() ? 'D MMM' : 'D MMM YYYY');

            let billDateString = startDate.format(startDateFormat) + ' - ' + endDate.format('D MMM YYYY');

            return billDateString;
        } else {
            return '';
        }
    }

    public buildNextBillDateString( billStartDate: Date, billEndDate: Date): string {
        if ( billStartDate && billEndDate) {
            let startDate = moment(billStartDate);
            let endDate = moment(billEndDate);

            let startDateFormat = (startDate.year() === endDate.year() ? 'D MMM' : 'D MMM YYYY');

            let billDateString = startDate.format(startDateFormat) + ' to ' + endDate.format('D MMM YYYY');

            return billDateString;
        } else {
            return '';
        }
    }

    public buildDueDateString( invoiceDueDate: Date): string {
        if ( invoiceDueDate ) {
            let invoiceDueDateString = moment(invoiceDueDate).format('ddd D MMM YYYY');
            this.checkOverDue(invoiceDueDate);
            return invoiceDueDateString;
        } else {
            return '';
        }
    }
    public checkOverDue(date: Date) {
        if ( date ) {
            let now = moment().startOf('day');
            this.daysUntilDue = now.diff(date, 'days').toString();
            this.isOverDue = +this.daysUntilDue <= 0 ? false : true ;
            this.daysUntilDue = Math.abs(+this.daysUntilDue).toString();
        } else {
            this.isOverDue = false;
        }
    }

    public isAccountInCredit() {
        this.isInCredit = this.selfServiceReadingResponse.accountBalance < 0 ? true : false;
    }

    public buildAmountToShow(amount: number, dest?: any ) {
        if (amount && dest) {
            dest.number = amount.toString().split('.')[0];
            dest.decimal = amount.toFixed(2).split('.')[1];
        } else if (amount) {
            this.amountNumber = amount.toString().split('.')[0];
            this.amountDecimal = amount.toFixed(2).split('.')[1];
        } else {
            this.amountNumber = '0';
            this.amountDecimal = '00';
        }
    }

    public showScreenCode( screenCode: SsmrScreenCode ) {
        if (this.selectedContract && this.selectedContract.isBillSmoothing) { // Return false if contract has Bill Smoothing.
            return false;
        } else { // Otherwise return true if screenCode matches this.screenCode.
            return this.screenCode === screenCode;
        }
    }
}
