import { BillViewModel } from './../../../../services/account.service';
import { Component, Input } from '@angular/core';
import * as moment from 'moment';

import { InstalmentPlanBilling } from '../../../../services/paymentScheme/instalmentPlan.service';
import { ContractViewModel } from '../../../../services/account.service';
import { Now } from '../../../../../shared/service/now.service';

@Component({
    selector: 'agl-bill-panel-instalment-plan-bill-period',
    templateUrl: './instalmentPlanBillPeriod.component.html',
    styleUrls: ['./instalmentPlanBillPeriod.component.scss']
})
export class BillPanelInstalmentPlanBillPeriodComponent {

    @Input()
    public set contract(contract: ContractViewModel) {
        this.contractModel = contract;
        this.instalmentPlan = this.getInstalmentPlan(contract);

        this.newestBill = contract ? contract.getNewestBill() : null;
        if (this.newestBill) {
            this.newestBillDueInDays = this.getNewestBillDueInDays(this.newestBill.dueDate);
        }

        this.paidAmount = contract.paymentTotal - this.instalmentPlan.totalInstalmentPlanOwingBalance;
    }

    public get contract(): ContractViewModel {
        return this.contractModel;
    }

    public instalmentPlan: InstalmentPlanBilling;
    public newestBill: BillViewModel;
    public newestBillDueInDays: number;
    public paidAmount: number;

    private contractModel: ContractViewModel;

    constructor(
        private now: Now
    ) {}

    private getInstalmentPlan(contract: ContractViewModel): InstalmentPlanBilling {
        return (contract && contract.instalmentPlan && contract.instalmentPlan.billing) ? contract.instalmentPlan.billing : undefined;
    }

    private getNewestBillDueInDays(date: Date): number {
        const today = this.now.date();
        return moment(date).diff(moment(today), 'days');
    }
}
