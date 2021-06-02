export class PaymentDetailsApiModel {
    public amount: number;
    public cccard: string;
    public month: string;
    public year: string;
    public cvv: string;
    public billReferenceNumber: string;
    public paymentToken: string;
    public useTokenisedCard: boolean;
    public account: string;
}
