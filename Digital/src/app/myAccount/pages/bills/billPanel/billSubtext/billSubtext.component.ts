import { Component, Input, OnInit } from '@angular/core';

import * as moment from 'moment';

import { PrePaymentBalanceTopUpUrgency } from '../../../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { Now } from '../../../../../shared/service/now.service';
import { RedLineApiService } from '../../../../../shared/service/redLineApi.service';
import { ContractViewModel } from '../../../../services/account.service';
import { FeatureFlagService, FeatureFlagTypes } from '../../../../services/featureFlag.service';
import { BillTypes } from '../billPanel.component';
import { ManageEnergyInsightsComponentModel } from '../../../settings/notifications/manageEnergyInsights/manageEnergyInsightsComponentModel';
import { EnergyInsightsService } from '../../../../services/energyInsights.service';
import { Router } from '@angular/router';

declare let leanengage: any;

@Component({
    selector: 'agl-bill-subtext',
    templateUrl: './billSubtext.component.html',
    styleUrls: ['./billSubtext.component.scss']
})
export class BillSubtextComponent implements OnInit {

    @Input() public type: BillTypes;
    @Input() public contract: ContractViewModel;
    @Input() public address;
    @Input() public isTextRowTwoOnly;
    @Input() public isBsDDLinks;
    @Input() public isHeaderMessageOnly;
    @Input() public isExtendedDueDate;
    @Input() public isDashboard;

    public headingTextLine1: string;
    public headingTextLine2: string;
    public headingSubText: string;
    public headingSubTextDate: string;
    public headingSubTextAdditional: string;
    public headingSubTextAdditionalDate: string;
    public iconPay: boolean;
    public iconDirectDebit: Boolean;
    public billPdfLoading;
    public billPdfLoadFailed;
    public billPdfDocExists;
    public isDefaultMode = false;
    public paygPaymentAmount: number;
    public iconOverdue: boolean = false;
    public overdueCharges: string;
    public newCharges: string;
    public showPaymentOverdueText: boolean = false;

    public showUsageLink: boolean = false;
    public energyInsightsEligibility: ManageEnergyInsightsComponentModel[] = [];
    public isEnergyInsightsDisagEnabled: boolean = false;

    private paymentAmount: number;
    private nextPaymentDate: string;

    constructor(private now: Now,
                private redLine: RedLineApiService,
                private featureService: FeatureFlagService,
                public energyInsightsService: EnergyInsightsService,
                public router: Router) {
    }

    public get showPayOnTimeDiscountAppliedText(): boolean {
        return this.contract.hasPayOnTimeDiscount && (this.type.hasDebit && !this.type.paymentOverdueInDebit) && this.contract.payOnTimeDiscountAmount > 0;
    }

    public get paymentExtensionApplied(): boolean {
        return !this.contract.extendedDueDate;
    }

    /** Despite being overdue, if a new bill is issued then the billSubText component is focused on the newly issued bill - not the previous overdue one */
    public get amountOwingIsAllOverdue(): boolean {
        return (this.type.newBillAndOverdue || this.type.overdue) && (!this.type.paymentOverdueInDebit || this.contract.isPayg);
    }

    /**
     * Creates a display for the long date format.
     *
     * @private
     * @param {(moment.Moment | Date)} date
     * @returns {string}
     *
     * @memberOf BillLeftSubtextComponent
     */
    public longDate(date: moment.Moment | Date): string {
        return moment(date).format('ddd D MMM YYYY');
    }

    public shouldShowUsageLink(): boolean {
        let hasUsageBreakdownData = false;
        let currentEIContract = this.energyInsightsService.energyInsightsEligibility.find((EIContract) => {
            return EIContract.contractNumber === this.contract.contractNumber;
        });
        if (currentEIContract) {
            hasUsageBreakdownData = currentEIContract.availableUsageBreakdownBillPeriods.length > 0;
        }
        return this.contract.currentBalance > 0 && hasUsageBreakdownData && this.isEnergyInsightsDisagEnabled;
    }

    public ngOnInit() {

        this.energyInsightsService.modelUpdated.subscribe(
            (model: ManageEnergyInsightsComponentModel[]) => {
                this.energyInsightsEligibility = model;
                this.isEnergyInsightsDisagEnabled = this.energyInsightsService.isEnergyInsightsDisagEnabled;
                this.showUsageLink = this.shouldShowUsageLink();
            }
        );

        this.billPdfDocExists = !!(this.contract.getNewestBill() && this.contract.getNewestBill().fxPrintDoc);
        let newestBill = this.contract.getNewestBill();
        this.isDefaultMode = this.isTextRowTwoOnly || this.isBsDDLinks || this.isHeaderMessageOnly;
        if (newestBill == null) {
            return;
        }

        this.featureService.featureFlagged(FeatureFlagTypes.paymentExtensionEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                let dueDate: Date;
                let originalDate: Date;

                if (featureIsEnabled && this.contract.extendedDueDate) {
                    dueDate = this.contract.extendedDueDate;
                    originalDate = newestBill.dueDate;
                } else {
                    dueDate = newestBill.dueDate;
                }

                this.assignContent(dueDate, originalDate);
            }
        );
    }

    /**
     * openBillPdfInNewWindow
     * Opens a PDF in a new window.
     * @memberOf BillRightSubtextComponent
     */
    public openBillPdfInNewWindow(): void {
        let bill = this.contract.getNewestBill();
        if (bill != null && bill.fxPrintDoc) {
            this.billPdfLoading = true;
            let hWindow = window.open('', '_blank');
            hWindow.document.write(require('../../../../static/pdf.html'));
            this.redLine.getBillPdfUrl(this.contract.contractNumber, bill.fxPrintDoc)
                .subscribe(
                    (url) => {
                        hWindow.document.location.href = url;
                    },
                    (err) => {
                        hWindow.close();
                        this.billPdfLoadFailed = true;
                        this.billPdfLoading = false;
                    },
                    () => {
                        this.billPdfLoading = false;
                    }
                );
        }
    }

    private daysAway(untilDate: moment.Moment, isOverdue: boolean): string {
        let days: number = Math.abs(untilDate.diff(this.now.date(), 'days'));
        if (days === 0) {
            return 'today';
        }
        let plural = (days === 1) ? '' : 's';
        return `${isOverdue ? 'by' : 'in'} ${days} day${plural}`;
    }

    private checkFirstPrepaymentOrProductSwapOutstandingBill(): boolean {
        return !(this.contract.paygBand === PrePaymentBalanceTopUpUrgency.High) || !!this.contract.paygPrepaymentEligibile || this.contract.showOutstandingBillPayg;
    }

    public onClickViewBill(): void {
        this.energyInsightsService.selectedContract = this.contract;
        this.router.navigate(['/energyinsights']);
    }

    private assignContent(dueDate: Date, originalDate: Date): void {
        if (this.contract.isPayg && this.checkFirstPrepaymentOrProductSwapOutstandingBill()) {
            // Payg with Medium and Low topup urgency
            this.headingTextLine1 = '';
            this.headingTextLine2 = '';
            this.headingSubText = '';
            this.iconDirectDebit = false;
        } else if (!this.contract.isPayg || (this.contract.isPayg && this.contract.paygBand === PrePaymentBalanceTopUpUrgency.High)) {
            // Payg with High topup urgency
            if (this.type.directDebit) {
                this.assignContentWhenDirectDebit(dueDate, originalDate);
            } else if (this.type.hasDebit) {
                this.assignContentWhenHasDebit(dueDate, originalDate);
            } else if (this.type.overdue) {
                this.assignContentWhenOverdue(dueDate, originalDate);
            }
        }

        // Bill Smoothing
        this.assignContentWhenBillSmoothingV2();

        this.assignNewChargesContent();
    }

    private assignNewChargesContent() {
        if (this.type.paymentOverdueInDebit) {
            this.overdueCharges = this.contract.paymentOverdue.toFixed(2);
            this.newCharges = this.contract.currentBalance.toFixed(2);
            this.showPaymentOverdueText = true;
        }
    }

    private assignContentWhenDirectDebit(dueDate: Date, originalDate: Date): void {
        this.iconDirectDebit = !this.type.noBills;
        if (this.type.hasDebit || this.type.paymentOverdueInDebit) {
            this.ifDirectDebitAndHasDebit(dueDate, originalDate);
        }
        if (this.amountOwingIsAllOverdue) {
            this.ifDirectDebitAndOverdue(dueDate, originalDate);
        }
        if (this.type.directDebit && this.type.hasCredit || this.type.billSmoothing && this.type.hasCredit || this.type.billPaid) {
            this.headingTextLine1 = '';
            this.headingTextLine2 = '';
            this.headingSubText = '';
            this.iconDirectDebit = false;
        }
    }

    /** already overdue and a new bill has been issued - direct debit */
    private ifDirectDebitAndHasDebit(dueDate: Date, originalDate: Date): void {
        this.headingTextLine1 = `Debited `;
        this.headingTextLine2 = `${this.daysAway(moment(dueDate), false)}`;
        if (originalDate) {
            this.setExtendedDateHeadingSubText(true, dueDate, originalDate);
        } else {
            this.headingSubText = `Direct Debit - ${this.longDate(dueDate)}`;
        }
        if (this.contract.isPayg) {
            this.paygPaymentAmount = this.contract.currentBalance;
        }
    }

    /** already overdue but no new bill has been issued */
    private ifDirectDebitAndOverdue(dueDate: Date, originalDate: Date): void {
        this.setOverdueText(dueDate);
        if (originalDate) {
            // Is this a valid scenario(overdue but no bill issued + payment extension.) for payment extensions? (Avi suggested it is not)
            this.setExtendedDateHeadingSubText(false, dueDate, originalDate);
        } else {
            this.headingSubText = `Due - ${this.longDate(dueDate)}`;
            this.iconDirectDebit = false;
            this.iconOverdue = true;
        }
        if (this.contract.isPayg) {
            this.paygPaymentAmount = this.contract.currentBalance + this.contract.paymentOverdue;
        }
    }

    /** a new bill has been issued */
    private assignContentWhenHasDebit(dueDate: Date, originalDate: Date): void {
        this.iconPay = true;
        this.headingTextLine1 = `Due `;
        this.headingTextLine2 = `${this.daysAway(moment(dueDate), false)}`;
        if (originalDate) {
            this.setExtendedDateHeadingSubText(false, dueDate, originalDate);
        } else {
            this.headingSubText = `Due - ${this.longDate(dueDate)}`;
        }
        if (this.contract.isPayg) {
            this.paygPaymentAmount = this.contract.currentBalance;
        }

        // Bill owing money and is overdue
        if (this.type.newBillAndOverdue) {
            this.assignContentWhenHasDebitAndOverdue(dueDate, originalDate);
        }
    }

    private assignContentWhenHasDebitAndOverdue(dueDate: Date, originalDate: Date): void {
        this.setOverdueText(dueDate);
        if (originalDate) {
            // Is this a valid scenario(overdue + bill issued + payment extension.) for payment extensions? (Avi suggested it is not)
            this.setExtendedDateHeadingSubText(false, dueDate, originalDate);
        } else {
            this.headingSubText = `Due - ${this.longDate(dueDate)}`;
        }
        if (this.contract.isPayg) {
            this.paygPaymentAmount = this.contract.currentBalance + this.contract.paymentOverdue;
        }
    }

    private assignContentWhenOverdue(dueDate: Date, originalDate: Date): void {
        this.setOverdueText(dueDate);
        if (originalDate) {
            this.setExtendedDateHeadingSubText(false, dueDate, originalDate);
        } else {
            this.headingSubText = `Due - ${this.longDate(dueDate)}`;
        }
        this.iconOverdue = this.amountOwingIsAllOverdue;
        if (this.contract.isPayg) {
            this.paygPaymentAmount = this.contract.currentBalance + this.contract.paymentOverdue;
        }
    }

    private assignContentWhenBillSmoothingV2(): void {
        if (!this.type.billSmoothingV2) {
            return;
        }

        let paymentScheme = this.contract.paymentScheme;
        let billSmoothingFrequency = paymentScheme.frequency.slice(0, -2).toLowerCase();
        let billSmoothingDueMessage = this.type.directDebit ? 'Direct Debit' : 'Due';

        if (paymentScheme.nextPayment) {
            this.paymentAmount = Math.abs(paymentScheme.nextPayment.amount);
            this.nextPaymentDate = moment(paymentScheme.nextPayment.date).format('ddd DD MMM YYYY');
        } else {
            this.paymentAmount = Math.abs(paymentScheme.previousPayment.amount);
            this.nextPaymentDate = moment(paymentScheme.previousPayment.date).format('ddd DD MMM YYYY');
        }
        this.headingSubText = `${billSmoothingDueMessage} - ${this.nextPaymentDate}`;
    }

    private setOverdueText(dueDate: Date) {
        const difference = Math.abs(moment(dueDate).diff(this.now.date(), 'days'));
        if (difference === 0) {
            this.headingTextLine1 = 'Due today';
        } else {
            if (this.type.paymentOverdueInDebit && !this.contract.isPayg) {
                // even though there is an overdue amount we show 'due in' as a new bill has been issued (with a new dueDate)
                this.headingTextLine1 = `Due `;
                this.headingTextLine2 = `${this.daysAway(moment(dueDate), false)}`;
            } else {
                this.headingTextLine1 = `Overdue `;
                this.headingTextLine2 = `${this.daysAway(moment(dueDate), true)}`;
            }
        }
    }

    private setExtendedDateHeadingSubText(isOnDirectDebit: boolean, dueDate: Date, originalDate: Date) {
        const dueOrDebit = isOnDirectDebit ? 'debit' : 'due';

        this.headingSubText = `Extended ${dueOrDebit} date`;
        this.headingSubTextDate = `${this.longDate(dueDate)}`;
        this.headingSubTextAdditional = `Original ${dueOrDebit} date`;
        this.headingSubTextAdditionalDate = `${this.longDate(originalDate)}`;
    }
}
