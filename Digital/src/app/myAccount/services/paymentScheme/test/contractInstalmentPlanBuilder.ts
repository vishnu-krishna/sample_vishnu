import { InstalmentPlan, PaymentArrangementInstalmentPlans } from '../paymentSchemeApi.service';
import { InstalmentPlanBuilder } from './instalmentPlanBuilder';

export class ContractInstalmentPlanBuilder {
    private instalmentPlans: InstalmentPlan[] = [];

    public constructor(private contractNumber: number, instalmentDates: Date[] = []) {
        if (instalmentDates.length > 0) {
            this.instalmentPlans = [new InstalmentPlanBuilder(instalmentDates).build()];
        }
    }

    public addInstalmentPlan(instalmentPlan: InstalmentPlan): ContractInstalmentPlanBuilder {
        this.instalmentPlans.push(instalmentPlan);

        return this;
    }

    public build(): PaymentArrangementInstalmentPlans {
        return {
            contractNumber: this.contractNumber,
            instalmentPlans: this.instalmentPlans
        };
    }
}
