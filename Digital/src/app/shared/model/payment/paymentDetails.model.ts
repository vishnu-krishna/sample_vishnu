import { PrePaymentBalanceTopUpUrgency } from '../../globals/prePaymentBalanceTopUpUrgency';
import { ReceiptDetail } from '../domain/receiptDetail.model';

export class PaymentDetails {
    public fuelType: string;
    public address: string;
    public contractNumber: string;
    public referenceNumber: string;
    public paygBand: PrePaymentBalanceTopUpUrgency;
    public isPayg: boolean;
    public paymentPending: boolean;
    public amount: string;
    public receiptDetail: ReceiptDetail;
    public savedCreditCard: boolean;
    public failureToSaveCreditCard: boolean;
    public prePaymentDate: string;
    public showOutstandingBillPayg: boolean;
    public outstandingBill: number;
}
