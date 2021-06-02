import { AccountDetailComponentModel } from '../../../../myAccount/settings/accountDetail/accountDetail.component';
import { PaymentArrangementPaymentMethodModel } from './paymentArrangementData.model';

export class PaymentArrangementResultModel {
    public contractAccountNumber: string;
    public accountDetails: AccountDetailComponentModel;
    public paymentArrangementData: PaymentArrangementPaymentMethodModel;
    public contracts: ContractData[];
    public paymentMethodReference: string;
    constructor() {
        this.accountDetails = new AccountDetailComponentModel();
    }
}

export class ContractData {
    public fuelType: string;
    public paymentOverdue: number;
    public paymentDueDate: Date;
    public currentBalance: number;
    public isDirectDebit: boolean;
    public isSmsPay: boolean;
}
