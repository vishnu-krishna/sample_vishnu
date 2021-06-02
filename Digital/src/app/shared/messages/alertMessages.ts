import { BaseMessage } from './base.message';
export class AlertMessages extends BaseMessage {
    public successHeading: string;
    public successBody: string;
    public errorHeading: string;
    public errorBody: string;
    public paymentPendingHeading: string = 'Payment pending';
    public paymentPendingBody: string = 'Please allow up to 2 business days for your recent payment to update your balance.';
}
