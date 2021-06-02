import { InstalmentPayment, InstalmentPlan, InstalmentPlanStatus } from '../paymentSchemeApi.service';
import { InstalmentBuilder } from './instalmentBuilder';

export class InstalmentPlanBuilder {
    private instalments = new Array<InstalmentPayment>();

    public constructor(instalmentDates: Date[] = []) {
        this.instalments = instalmentDates.map((instalmentDate) => new InstalmentBuilder(instalmentDate).build());
    }

    public addInstalment(instalment: InstalmentPayment): InstalmentPlanBuilder {
        this.instalments.push(instalment);
        return this;
    }

    public build(): InstalmentPlan {
        return {
            status: InstalmentPlanStatus.Open,
            instalments: this.instalments
        };
    }
}
