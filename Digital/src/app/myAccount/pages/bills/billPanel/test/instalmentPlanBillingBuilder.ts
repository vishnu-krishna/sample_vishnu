import * as moment from 'moment';

import { InstalmentPlanBilling, NextInstalment } from '../../../../services/paymentScheme/instalmentPlan.service';

export class InstalmentPlanBillingBuilder {
    public static readonly defaultNextInstalmentDueAmount = 50.22;
    public static readonly defaultNextInstalmentDueDate = new Date('2018-05-18');
    public static readonly defaultNextInstalmentDueIndex = 4;
    public static readonly defaultOverdueAmount = 0;
    public static readonly overdueAmountWhenOverdue = 86.14;

    private overdueAmount = InstalmentPlanBillingBuilder.defaultOverdueAmount;
    private nextInstalment = new NextInstalment(
        InstalmentPlanBillingBuilder.defaultNextInstalmentDueAmount,
        InstalmentPlanBillingBuilder.defaultNextInstalmentDueDate,
        InstalmentPlanBillingBuilder.defaultNextInstalmentDueIndex
    );

    public withOverdueInstalments(): InstalmentPlanBillingBuilder {
        this.overdueAmount = InstalmentPlanBillingBuilder.overdueAmountWhenOverdue;

        return this;
    }

    public withoutNextInstalment(): InstalmentPlanBillingBuilder {
        this.nextInstalment = undefined;

        return this;
    }

    public build(): InstalmentPlanBilling {
        const nextInstalmentDueAmount = this.nextInstalment ?
            this.nextInstalment.dueAmount :
            0;

        return new InstalmentPlanBilling(
            this.nextInstalment,
            nextInstalmentDueAmount + this.overdueAmount,
            this.overdueAmount
        );
    }
}
