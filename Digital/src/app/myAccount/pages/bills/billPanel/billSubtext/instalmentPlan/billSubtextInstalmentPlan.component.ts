import { Component, Input, OnInit } from '@angular/core';

import { InstalmentPlanModel } from '../../billInstalmentPlanDescription/billInstalmentPlanDescription.component';
import { ContractViewModel } from '../../../../../services/account.service';

@Component({
    selector: 'agl-bill-subtext-instalment-plan',
    templateUrl: './billSubtextInstalmentPlan.component.html',
    styleUrls: ['./billSubtextInstalmentPlan.component.scss']
})
export class BillSubtextInstalmentPlanComponent implements OnInit {
    @Input() contract: ContractViewModel;

    public instalmentPlan: InstalmentPlanModel;
    public chargeDescription: string;

    ngOnInit(): void {
        const instalmentPlan = this.contract.getInstalmentPlan();

        if (instalmentPlan) {
            this.instalmentPlan = instalmentPlan;
            this.chargeDescription = instalmentPlan.isDirectDebit ? 'debited' : 'due';
        } else {
            this.instalmentPlan = undefined;
            this.chargeDescription = undefined;
        }
    }
}
