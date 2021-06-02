import { BillingFrequencyType } from './billingFrequencyType';
import { ContractMonthlyBillingModel } from './contractMonthlyBillingModel';

export class AccountMonthlyBillingModel {

    public contractMonthlyBillingModels: ContractMonthlyBillingModel[];
    public hasValidMobileNumber: boolean;

    get billingFrequencyFailed(): boolean {
        return this.contractMonthlyBillingModels.every((contract) => !contract.frequency);
    }

    get hasMonthlyBilling(): boolean {
        return this.contractMonthlyBillingModels.some((contract) => contract.frequency === BillingFrequencyType.FlexibleMonthly);
    }

    get areAllContractsInflight(): boolean {
        return this.contractMonthlyBillingModels.every((contract) => contract.contract.isInFlight);
    }

    get anyContractsPredictedAsEligibleForSetup(): boolean {
        return this.contractMonthlyBillingModels.some((x) => x.setupPredicted);
    }

    /**
     *  Property to check if any contract in the account is not in monthly billing
     */
    get hasNonMonthlyBillingContract(): boolean {
        return this.contractMonthlyBillingModels.some((x) => (x.frequency !== BillingFrequencyType.FlexibleMonthly));
    }

    constructor(
        public accountNumber: string,
        contractMonthlyBillingModels: ContractMonthlyBillingModel[] = []
    ) {
        this.contractMonthlyBillingModels = contractMonthlyBillingModels;
    }

}
