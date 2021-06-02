import { Component, Input } from '@angular/core';

import { InstalmentPlanBilling } from '../../../../../services/paymentScheme/instalmentPlan.service';
import { ContractViewModel } from '../../../../../services/account.service';

@Component({
    selector: 'agl-bill-payment-instalment-plan',
    templateUrl: './billPaymentInstalmentPlan.component.html',
    styleUrls: ['./billPaymentInstalmentPlan.component.scss']
})
export class BillPaymentInstalmentPlanComponent {
    @Input()
    public set contract(contract: ContractViewModel) {
        this.contractModel = contract;

        this.totalInstalmentPlanOwingBalance = undefined;

        const instalmentPlan = contract.getInstalmentPlan();

        if (instalmentPlan) {
            this.totalInstalmentPlanOwingBalance = instalmentPlan.totalInstalmentPlanOwingBalance;
        }
    }

    public get contract(): ContractViewModel {
        return this.contractModel;
    }

    public totalInstalmentPlanOwingBalance: number;

    private contractModel: ContractViewModel;
}
