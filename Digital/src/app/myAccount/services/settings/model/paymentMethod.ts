import { Bank }              from './bank';
import { CreditCard }        from './creditCard';
import { PaymentMethodType } from './paymentMethodType';
import { Paypal }            from './paypal';

export class PaymentMethod {
    public id: string;
    public creditCard: CreditCard;
    public bank: Bank;
    public payPal: Paypal;
    public directDebitContractAccounts: number[];
    public oneTouchPayContractAccounts: number[];

    public get PaymentMethodType(): PaymentMethodType {
        if (this.creditCard && !this.bank && !this.payPal) {
            return PaymentMethodType.CreditCard;
        } else if (!this.creditCard && this.bank && !this.payPal) {
            return PaymentMethodType.BankAccount;
        } else if (!this.creditCard && !this.bank && this.payPal) {
            return PaymentMethodType.Paypal;
        }
        return PaymentMethodType.Unknown;
    }
}
