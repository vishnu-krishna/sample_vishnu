import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { BillTypes } from '../billPanel.component';
import { FeatureFlagService, FeatureFlagTypes } from '../../../../services/featureFlag.service';
import { ContractViewModel } from '../../../../services/account.service';
import { InstalmentPlanBilling } from '../../../../services/paymentScheme/instalmentPlan.service';

class BillBreakdown {
    constructor(public readonly description: string,
                public readonly value: number,
                public readonly isWarning: boolean = false,
                public readonly pillText: string = '') {
        if (pillText && value) {
            throw new Error('only 1 of pillText/value can be set');
        }
    }
}

@Component({
    selector: 'agl-bill-breakdown',
    templateUrl: './billBreakdown.component.html',
    styleUrls: ['./billBreakdown.component.scss']
})
export class BillBreakdownComponent implements OnInit {
    @Input() public type: BillTypes;
    @Input() public contract: ContractViewModel;
    public breakdown: BillBreakdown[] = [];

    @HostBinding('class.isVisible')
    public get isVisible(): boolean {
        return this.breakdown.length > 0;
    }

    constructor(private featureFlagService: FeatureFlagService) {
    }

    public ngOnInit() {
        this.featureFlagService
            .getFeatureFlags([FeatureFlagTypes.payOnTimeDiscountFixEnabled, FeatureFlagTypes.paymentAssistanceEnabled])
            .subscribe((featureFlags: Map<FeatureFlagTypes, boolean>) => {
                const payOnTimeDiscountFixEnabled = featureFlags.get(FeatureFlagTypes.payOnTimeDiscountFixEnabled);
                const paymentAssistanceEnabled = featureFlags.get(FeatureFlagTypes.paymentAssistanceEnabled);

                if (payOnTimeDiscountFixEnabled || paymentAssistanceEnabled) {
                    this.resolveBillBreakdown(this.type, this.contract, payOnTimeDiscountFixEnabled, paymentAssistanceEnabled);
                }
            }
        );
    }

    private resolveBillBreakdown(billType: BillTypes, contract: ContractViewModel, payOnTimeDiscountFixEnabled: boolean, paymentAssistanceEnabled: boolean): void {
        const overdueDesc = 'Overdue balance';
        const currentDesc = 'Current balance';
        const potdDesc = 'Pay on time discount';
        const missedDesc = 'Missed';
        const overdueInstalmentsDesc = 'Overdue instalments';
        const nextInstalmentsDesc = 'Instalment ';

        // unless a specific scenario is catered for, this component will (and should) not be visible.

        if (billType.billSmoothing || billType.billSmoothingV2) {
            return;
        }

        // We don't show this component if payment assistance FF is disabled
        // Because we no longer know if they're on an instalment plan or not
        if (!paymentAssistanceEnabled) { return; }

        const instalmentPlan = contract.getInstalmentPlan();
        if (instalmentPlan) {
            if (!instalmentPlan.isOverdue()) { return; }

            this.breakdown.push(new BillBreakdown(overdueInstalmentsDesc, instalmentPlan.overdueAmount, true));

            if (instalmentPlan.nextInstalment) {
                this.breakdown.push(new BillBreakdown(nextInstalmentsDesc + instalmentPlan.nextInstalment.index, instalmentPlan.nextInstalment.dueAmount, false));
            }

            return;
        }

        // TODO remove this feature flag check once the initial zenith release is deployed (mid June 2018)
        if (!payOnTimeDiscountFixEnabled) { return; }

        if (contract.hasPayOnTimeDiscount && !contract.isCurrentBalanceExcludingPOTDAmountValid) {
            return;
        }

        if (billType.hasPaymentExtension) {
            if (contract.hasPayOnTimeDiscount) {
                this.breakdown.push(new BillBreakdown(potdDesc, 0, false, missedDesc));
            }
            return;
        }

        if (billType.overdue) {
            if (billType.paymentOverdueInDebit) { // overdue and new bill issued
                this.breakdown.push(new BillBreakdown(overdueDesc, contract.paymentOverdue, true));

                if (contract.hasPayOnTimeDiscount) {
                    this.breakdown.push(new BillBreakdown(currentDesc, contract.currentBalanceExcludingPOTDAmount));
                    this.breakdown.push(new BillBreakdown(potdDesc, this.formatPayOnTimeDiscountAmount(contract.payOnTimeDiscountAmount)));
                } else {
                    this.breakdown.push(new BillBreakdown(currentDesc, contract.currentBalance));
                }
            } else if (contract.hasPayOnTimeDiscount) {
                this.breakdown.push(new BillBreakdown(potdDesc, 0, false, missedDesc));
            }
            return;
        }

        if (billType.hasDebit) { // new bill issued/due
            if (contract.hasPayOnTimeDiscount) {
                this.breakdown.push(new BillBreakdown(currentDesc, contract.currentBalanceExcludingPOTDAmount));
                this.breakdown.push(new BillBreakdown(potdDesc, this.formatPayOnTimeDiscountAmount(contract.payOnTimeDiscountAmount)));
            }
            return;
        }
    }

    private formatPayOnTimeDiscountAmount(payOnTimeDiscountAmount: number): number {
        return -Math.abs(payOnTimeDiscountAmount); // we always add a negative in front of the potd value
    }
}
