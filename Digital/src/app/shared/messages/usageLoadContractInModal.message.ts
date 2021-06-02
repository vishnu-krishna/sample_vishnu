import { ContractViewModel } from '../../myAccount/services/account.service';
import { BaseMessage } from './base.message';

export class UsageLoadContractInModalMessage extends BaseMessage {

    public Contract: ContractViewModel;
    public SelectedMonth: Date;

    constructor(
        contractNumber: ContractViewModel,
        selectedMonth: Date
    ) {
        super();
        this.Contract = contractNumber;
        this.SelectedMonth = selectedMonth;
    }
}
