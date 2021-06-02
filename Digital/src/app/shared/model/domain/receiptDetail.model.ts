import { PaymentMethods } from '../../globals/paygConstants';
export class ReceiptDetail {
    public receiptNumber: string;
    public paymentAmount: number;
    public creditCardType: string;
    public creditCardNumber: string;
    public creditCardExpiry: string;
    public paymentDate: string;
    public bonusAmount: number;
    public paymentMethod: PaymentMethods;
    public savedCreditCard: boolean;
    public failureToSaveCreditCard: boolean;
}
