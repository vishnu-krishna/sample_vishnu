import { InstalmentPlanData } from '../../../../myAccount/services/paymentScheme/instalmentPlan.service';
import { ContractViewModel, BillViewModel } from '../../../../myAccount/services/account.service';

export class ContractViewModelBuilder {
    private instalmentPlan: InstalmentPlanData;
    private bills: BillViewModel[] = [];

    constructor(private readonly contractAccountNumber: number, private readonly contractNumber: number) {}

    public withInstalmentPlan(instalmentPlan: InstalmentPlanData): ContractViewModelBuilder {
        this.instalmentPlan = instalmentPlan;

        return this;
    }

    public build(): ContractViewModel {
        const contract = new ContractViewModel(this.contractNumber.toString());
        contract.accountNumber = this.contractAccountNumber.toString();
        contract.instalmentPlan = this.instalmentPlan;
        contract.bills = this.bills;
        return contract;
    }
}
