export enum PaymentMethods {
    CreditCard,
    Paypal,
    BankAccount
}

export enum PaymentView {
    MakePayment,
    PAYGBonusSelect,
    PaymentSuccess
}

export enum PaymentAmountView {
    Default,
    PAYGDebit,
    PAYGBonusSelect,
    PAYGFreeText,

}
export class PaymentMethodName {
    public static CreditCard: string = 'Credit card';
    public static PayPal: string = 'PayPal';
    public static BankAccount: string = 'Bank Account';
    public static SavedMethod: string = 'savedMethod';
}

export class PaygProductAttribue {
    public static PaygProductAttributeId: string = 'ZPREPAY';
    public static PaygProductAttributeValue: string = '2';
}

export class MandatoryEBillingAttribue {
    public static AttributeId: string = 'Z_EBILLING';
    public static AttributeValue: string = '1';
}

export class MandatoryDirectDebitAttribue {
    public static AttributeId: string = 'Z_DIRECTDEBIT';
    public static AttributeValue: string = '1';
}
