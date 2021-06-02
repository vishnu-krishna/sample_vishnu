import * as moment from 'moment';

import { ContractUpcomingInstalment, UpcomingInstalment } from '../../../../myAccount/services/paymentScheme/instalmentPlan.service';

export class ContractUpcomingInstalmentBuilder {
    private upcomingInstalment: UpcomingInstalment;

    public constructor(private readonly contractAccountNumber: number, private readonly accountNumber: number = 0) {
        this.upcomingInstalment = new UpcomingInstalment(10, 20, moment().toDate());
    }

    public withoutUpcomingInstalment(): ContractUpcomingInstalmentBuilder {
        this.upcomingInstalment = undefined;
        return this;
    }

    public build(): ContractUpcomingInstalment {
        return new ContractUpcomingInstalment(this.contractAccountNumber, this.accountNumber, this.upcomingInstalment);
    }
}
