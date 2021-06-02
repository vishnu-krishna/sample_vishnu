import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AlertMessages } from './../../../../shared/messages/alertMessages';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Now } from '../../../../shared/service/now.service';
import { ContractViewModel } from '../../../services/account.service';
import { IPaymentExtensionStateService } from '../paymentAssistance/extend/services/paymentExtensionState.service';
import { IPaymentExtensionFuelChipService } from '../paymentAssistance/extend/eligibility/services/paymentExtensionFuelChip.service';
import { ClassifiedFuelChips } from '../paymentAssistance/extend/eligibility/services/fuelChipClassification.service';
import { FuelChipData } from '../paymentAssistance/extend/eligibility/fuelChipData';
import { FeatureFlagService } from '../../../services/featureFlag.service';
import { FeatureFlagTypes } from '../../../services/featureFlag.constants';
import { IPaymentAssistanceNavigationPersistedStateService } from '../paymentAssistance/services';
import { InstalmentPlanModel } from './billInstalmentPlanDescription/billInstalmentPlanDescription.component';

declare let leanengage: any;

@Component({
    selector: 'agl-bill-panel',
    templateUrl: './billPanel.component.html',
    styleUrls: ['./billPanel.component.scss']
})
export class BillPanelComponent implements OnInit, OnDestroy {

    @Input() public contract: ContractViewModel;
    @Input() public address;
    // Input to identify if your coming from the dashboard into this component.
    // This is to reduce the amount of HTML in the dom.
    @Input() public isDashboard;

    public currentInstalmentPlan: InstalmentPlanModel;
    public hasPaymentExtension: boolean;
    public billType: BillTypes;
    public currentContract;
    public isEligibleForPaymentExtension: boolean;
    public showPaymentExtension = false;
    public showPaymentAssistance = false;
    private subscriptions: Subscription[] = [];
    private setPaymentAssistanceChooseBackUrl = () =>
        this.paymentAssistanceNavigationPersistedStateService.setState({
            chooseBackUrl: window.location.pathname,
            extensionApplicationBackUrl: window.location.pathname
        })

    constructor(private now: Now,
                public alertMessages: AlertMessages,
                public paymentExtensionStateService: IPaymentExtensionStateService,
                public paymentExtensionFuelChipService: IPaymentExtensionFuelChipService,
                public featureService: FeatureFlagService,
                public router: Router,
                private paymentAssistanceNavigationPersistedStateService: IPaymentAssistanceNavigationPersistedStateService) {}

    public ngOnInit() {
        this.billType = this.determineBillType(this.contract);
        this.currentContract = this.contract;
        this.currentInstalmentPlan = this.contract.getInstalmentPlan();
        this.hasPaymentExtension = this.contract.extendedDueDate && !this.currentInstalmentPlan;

        this.subscriptions.push(Observable.forkJoin(
            [
                this.featureService.featureFlagged(FeatureFlagTypes.paymentExtensionEnabled),
                this.featureService.featureFlagged(FeatureFlagTypes.paymentAssistanceEnabled)
            ]
        ).subscribe(([paymentExtensionEnabled, paymentAssistanceEnabled]) => {

            this.updatePaymentExtensionAssistanceVisibility(paymentExtensionEnabled, paymentAssistanceEnabled);

            if (paymentExtensionEnabled) {
                this.getContractAccountEligibility();
            }
        }));
    }

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    /**
     * Determine Bill Type
     * This will deterimne the status on the bill
     * @param {ContractViewModel} contract
     * @returns object
     * @memberOf BillPanelComponent
     */
    public determineBillType(contract: ContractViewModel): BillTypes {
        let billTypes: BillTypes = {};

        // Pending Payment
        if (contract.pendingPaymentDate) {
            billTypes.pendingPayment = true;
        }
        // No Bills aka new account;
        if (!this.contract.isDataAvailable) {
            billTypes.noBills = true;
        }

        let newestBill = this.contract.getNewestBill();

        // Payment is overdue and the current balance is positive
        if ((contract.paymentOverdue > 0) && (contract.currentBalance > 0)) {
            billTypes.paymentOverdueInDebit = true;
        }

        // New bill and is overdue
        if ((newestBill !== null) && (contract.paymentOverdue > 0)) {
            billTypes.newBillAndOverdue = true;
        }

        // Overdue Bill
        if ((contract.paymentOverdue > 0)) {
            billTypes.overdue = true;
        }

        // No current bills (no bills at all)
        if (newestBill == null) {
            billTypes.noBills = true;
        }

        // Direct Debit
        if (contract.isDirectDebit) {
            billTypes.directDebit = true;
        }

        // All Bills are paid
        if ((contract.paymentOverdue <= 0)) {
            if ((newestBill !== null) && (contract.currentBalance === 0)) {
                billTypes.billPaid = true;
            }
        }

        // Negative Balance account (Credit)
        if ((contract.currentBalance < 0)) {
            billTypes.hasCredit = true;
        }

        // Total to pay (Debit)
        if ((contract.currentBalance > 0)) {
            billTypes.hasDebit = true;
        }

        // Smart Meter
        if (contract.isSmartMeter) {
            billTypes.smartMeter = true;
        }

        // Out of bill period
        if (newestBill && newestBill.dueDate && !moment(newestBill.dueDate).isSameOrAfter(this.now.date())) {
            billTypes.outOfBillPeriod = true;
        }

        // Bill Smoothing
        if (contract.isBillSmoothingV2) {
            billTypes.billSmoothingV2 = true;
            billTypes.overdue = false;
            billTypes.pendingPayment = false;
            billTypes.hasCredit = false;
        }

        // PAYG
        if (contract.isPayg) {
            billTypes.isPayg = true;
        }

        // Payment extension
        if (this.contract.extendedDueDate) {
            billTypes.hasPaymentExtension = true;
        }

        if (this.contract.instalmentPlan) {
            billTypes.hasInstalmentPlan = true;
        }

        return billTypes;
    }

    public createNewPaymentExtensionSession() {
        this.setPaymentAssistanceChooseBackUrl();
        this.paymentExtensionStateService.initNewSession(this.contract.contractNumber, this.paymentExtensionFuelChipService.classifiedFuelChips.eligibleFuelChips);
    }

    public getContractAccountEligibility() {
        // TODO make private - should not be public just for unit tests
        const hasOpenBill = this.contract.currentBalance + this.contract.paymentOverdue > 0;
        const isNotExtended = !this.billType.hasPaymentExtension;
        if (hasOpenBill && isNotExtended) {
            this.paymentExtensionFuelChipService.init(this.contract.accountNumber, this.contract.contractNumber)
                .subscribe((fuelChips: ClassifiedFuelChips) => {
                    const eligibleFuelChip = fuelChips.eligibleFuelChips.find((fuelChip: FuelChipData) => fuelChip.contractNumber === this.contract.contractNumber);
                    if (eligibleFuelChip) {
                        this.contract.isEligibleForPaymentExtension = eligibleFuelChip.eligibility.isEligible;
                    }
                });
        }
    }

    private updatePaymentExtensionAssistanceVisibility(paymentExtensionEnabled: boolean, paymentAssistanceEnabled: boolean) {
        if (paymentExtensionEnabled && paymentAssistanceEnabled) {
            this.showPaymentExtension = !paymentExtensionEnabled;
            this.showPaymentAssistance = paymentAssistanceEnabled;
        } else {
            this.showPaymentExtension = paymentExtensionEnabled;
            this.showPaymentAssistance = paymentAssistanceEnabled;
        }
    }
}

export interface BillTypes {
    pendingPayment?: boolean;
    /** is overdue and has had a new/open bill issued. aka is already overdue and now has another bill due */
    paymentOverdueInDebit?: boolean;
    /** is overdue and has had at least one bill issued (not just an open bill) */
    newBillAndOverdue?: boolean;
    noBills?: boolean;
    directDebit?: boolean;
    billSmoothing?: boolean;
    billSmoothingV2?: boolean;
    billPaid?: boolean;
    hasCredit?: boolean;
    /** aka bill due. aka new bill issued */
    hasDebit?: boolean;
    overdue?: boolean;
    smartMeter?: boolean;
    /** is the last issued bill due today or in the past */
    outOfBillPeriod?: boolean;
    isPayg?: boolean;
    hasPaymentExtension?: boolean;
    hasInstalmentPlan?: boolean;
}
