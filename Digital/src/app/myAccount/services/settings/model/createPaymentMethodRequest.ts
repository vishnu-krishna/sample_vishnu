import { Bank }            from '../model/bank';
import { CreditCard }      from '../model/creditCard';
import { PayPalAgreement } from '../model/payPalAgreement';

export class CreatePaymentMethodRequest {
    public directDebitContractAccount: number;
    public oneTouchPayContractAccount: number;
    public creditCard: CreditCard;
    public bank: Bank;
    public payPal: PayPalAgreement;
}
