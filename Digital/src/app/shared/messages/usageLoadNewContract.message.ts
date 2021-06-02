import { ContractViewModel } from '../../myAccount/services/account.service';
import { BaseMessage } from './base.message';

export class UsageLoadNewContractMessage extends BaseMessage {

    public Contract: ContractViewModel;

    constructor(contractNumber: ContractViewModel) {
        super();
        this.Contract = contractNumber;
    }
}
