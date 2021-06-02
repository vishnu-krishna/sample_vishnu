import { Component, Input, OnInit } from '@angular/core';

import { InstalmentPlanBilling } from '../../../../services/paymentScheme/instalmentPlan.service';

@Component({
    selector: 'agl-bill-instalment-plan-description',
    templateUrl: './billInstalmentPlanDescription.component.html',
    styleUrls: ['./billInstalmentPlanDescription.component.scss']
})
export class BillInstalmentPlanDescriptionComponent implements OnInit {
    @Input()
    public instalmentPlan: InstalmentPlanModel;

    public isOverdue: boolean;
    public chargeDescription: string;

    ngOnInit(): void {
        this.isOverdue = this.instalmentPlan && this.instalmentPlan.isOverdue();

        if (this.instalmentPlan) {
            this.chargeDescription = this.instalmentPlan.isDirectDebit ? 'debited' : 'due';
        } else {
            this.chargeDescription = undefined;
        }
    }
}

export class InstalmentPlanModel extends InstalmentPlanBilling {
    constructor(instalmentPlan: InstalmentPlanBilling, public isDirectDebit: boolean) {
        super(
            instalmentPlan.nextInstalment,
            instalmentPlan.totalInstalmentPlanOwingBalance,
            instalmentPlan.overdueAmount);
    }
}
