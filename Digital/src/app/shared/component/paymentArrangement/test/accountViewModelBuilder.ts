import { ContractViewModel, AccountViewModel } from '../../../../myAccount/services/account.service';
import { InstalmentPlanBillingBuilder } from '../../../../myAccount/pages/bills/billPanel/test';
import { PaymentAssistancePlanInstalmentsModel } from '../../../../myAccount/pages/bills/paymentAssistance/plan/instalments';
import { InstalmentPlanData } from '../../../../myAccount/services/paymentScheme/instalmentPlan.service';
import { ContractViewModelBuilder } from './contractViewModelBuilder';

export class AccountViewModelBuilder {
    private readonly contracts: ContractViewModel[] = [];

    public constructor(private readonly contractAccountNumber: number) {}

    public addContract(contract: ContractViewModel): AccountViewModelBuilder {
        this.contracts.push(contract);

        return this;
    }

    public withContract(contractNumber: number): AccountViewModelBuilder {
        const contract = new ContractViewModelBuilder(this.contractAccountNumber, contractNumber)
            .build();

        this.addContract(contract);

        return this;
    }

    public withContractOnInstalmentPlan(contractNumber: number): AccountViewModelBuilder {
        const instalmentPlanBilling = new InstalmentPlanBillingBuilder().build();
        const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;
        const instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);

        const contract = new ContractViewModelBuilder(this.contractAccountNumber, contractNumber)
            .withInstalmentPlan(instalmentPlan)
            .build();

        this.addContract(contract);

        return this;
    }

    public build(): AccountViewModel {
        return <AccountViewModel> {
            accountNumber: this.contractAccountNumber.toString(),
            contracts: this.contracts,
            groupedAddress: undefined,
            allContractsAreRestricted: false,
            allContractsAreNewConnection: false,
            firstName: undefined,
            lastName: undefined,
            hasContractInWA: false
        };
    }
}
