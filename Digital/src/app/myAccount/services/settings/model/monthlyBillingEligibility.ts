import { MonthlyBillingActionEligibility } from './monthlyBillingActionEligibility';

export class MonthlyBillingEligibility {

    public contractNumber: number;
    public setup?: MonthlyBillingActionEligibility;
    public cancellation?: MonthlyBillingActionEligibility;

}
