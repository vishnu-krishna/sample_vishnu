import { PayPalAgreement } from './../../../../myAccount/services/settings/model/payPalAgreement';

export class ApiDirectDebitModel {
    public directDebitReference: string;
    public contractAccountNumbers: Number[];
    public creditCard: CreditCardModel;
    public bank: BankAccountModel;
    public paypal: PaypalModel;
}

export class ApiDirectDebitSaveModel {
    public directDebitContractAccount: Number;
    public creditCard: CreditCardModel;
    public bank: BankAccountModel;
    public paypal: PayPalAgreement;
}

export class CreditCardModel {
    public cardType: string;
    public creditCardReference: string;
    public expiryDate: string;
    public cardHolderName: string;
}

export class BankAccountModel {
    public bsb: string;
    public accountNumber: string;
    public accountHolderName: string;
}
export class PaypalModel {
    public email: string;
}
