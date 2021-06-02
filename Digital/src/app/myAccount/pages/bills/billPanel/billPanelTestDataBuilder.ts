import { BillTypes } from './billPanel.component';
import { ContractViewModel, BillViewModel } from '../../../services/account.service';
import { InstalmentPlanData } from '../../../services/paymentScheme/instalmentPlan.service';

export class BillPanelTestDataBuilder {
    private constructor(private readonly billTypes: BillTypes,
                        private readonly contract: ContractViewModel) {
    }

    public static create(): BillPanelTestDataBuilder {
        let billTypes = <BillTypes> {};
        let contract = new ContractViewModel('123456789');

        return new BillPanelTestDataBuilder(billTypes, contract);
    }

    public whenOnBillSmoothingV1(): BillPanelTestDataBuilder {
        this.billTypes.billSmoothing = true;

        return this;
    }

    public whenOnBillSmoothingV2(): BillPanelTestDataBuilder {
        this.billTypes.billSmoothingV2 = true;

        return this;
    }

    public whenBillIsDue(billAmount: number): BillPanelTestDataBuilder {
        this.billTypes.hasDebit = true;
        this.contract.currentBalance = billAmount;

        return this;
    }

    public whenOverdue(overdueAmount: number): BillPanelTestDataBuilder {
        this.billTypes.overdue = true;
        this.billTypes.paymentOverdueInDebit = false;
        this.contract.paymentOverdue = overdueAmount;

        return this;
    }

    public withZeroBalance(): BillPanelTestDataBuilder {
        this.billTypes.billPaid = true;
        this.billTypes.hasDebit = false;
        this.billTypes.hasCredit = false;
        this.contract.paymentOverdue = 0;
        this.contract.currentBalance = 0;

        return this;
    }

    public whenInCredit(currentBalance: number): BillPanelTestDataBuilder {
        this.billTypes.hasCredit = true;
        this.contract.paymentOverdue = 0;
        this.contract.currentBalance = -Math.abs(currentBalance);

        return this;
    }

    public andNewBillIsIssued(billAmount: number): BillPanelTestDataBuilder {
        if (this.billTypes.hasCredit || this.billTypes.billPaid) {
            throw new Error('Invalid test data setup - scenario not catered for.');
        }

        this.billTypes.hasDebit = true;
        this.contract.currentBalance = billAmount;

        if (this.billTypes.overdue) {
            this.billTypes.paymentOverdueInDebit = true;
        }

        return this;
    }

    public andHasPaymentExtension(extendedUntil: Date): BillPanelTestDataBuilder {
        if (!this.contract.currentBalance) {
            throw new Error('Invalid test data setup');
        }

        this.billTypes.hasPaymentExtension = true;
        this.contract.extendedDueDate = extendedUntil;

        return this;
    }

    public andHasInstalmentPlan(instalmentPlan: InstalmentPlanData): BillPanelTestDataBuilder {
        this.billTypes.hasInstalmentPlan = true;
        this.contract.instalmentPlan = instalmentPlan;

        return this;
    }

    public andHasPayOnTimeDiscount(discountValue: number): BillPanelTestDataBuilder {
        this.contract.hasPayOnTimeDiscount = true;

        if (this.contract.currentBalance) {
            this.contract.payOnTimeDiscountAmount = discountValue;
            this.contract.currentBalanceExcludingPOTDAmount = this.contract.currentBalance + discountValue;
        }

        return this;
    }

    /**
     * SAP is only pushing the new potd values as new bills are issued to customers.
     * After that time all the data should be populated, however there are several SAP quirks that mean that it may never be pushed (or calculated) correctly.
     */
    public butCurrentBalanceExcludingPOTDAmountCannotBeCalculated(): BillPanelTestDataBuilder {
        this.contract.hasPayOnTimeDiscount = true;

        if (!this.contract.currentBalance) {
            throw new Error('Invalid test data setup');
        }

        this.contract.currentBalanceExcludingPOTDAmount = null; // this indicates that currentBalanceExcludingPOTDAmount cannot be calculated

        return this;
    }

    public andOnDirectDebit(): BillPanelTestDataBuilder {
        this.billTypes.directDebit = true;
        this.contract.isDirectDebit = true;

        return this;
    }

    public andHasNewestBillBetweenDates(from: Date, to: Date): BillPanelTestDataBuilder {
        this.contract.bills.push(new BillViewModel(0, 0, null, null, false, false, '', from, to));

        return this;
    }

    public butHasNoBillsIssued(): BillPanelTestDataBuilder {
        if (this.contract.bills && this.contract.bills.length) {
            throw new Error('Invalid test data setup - expected no bills to be set on the contract');
        }

        return this;
    }

    /** as javascript does not allow arguments to be passed by ref we must provide setter functions to copy composed test data */
    public assignTo(billTypeAssignment: (BillTypes) => void,
                    contractAssignment: (ContractViewModel) => void): void {
        billTypeAssignment(this.billTypes);
        contractAssignment(this.contract);
    }
}
