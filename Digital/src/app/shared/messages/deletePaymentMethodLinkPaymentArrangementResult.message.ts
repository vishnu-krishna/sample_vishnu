import { BaseMessage } from './base.message';
export class DeletePaymentMethodLinkPaymentArrangementResult extends BaseMessage  {
    public isSuccessful: boolean;
    public oldPaymentMethodNumber: string;
    public oldPaymentMethodType: string;
    public newPaymentMethodNumber: string;
    public newPaymentMethodType: string;
}
