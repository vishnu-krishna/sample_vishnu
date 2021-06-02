import { BaseMessage } from './base.message';
export class DeletePaymentArrangementResultMessage extends BaseMessage  {
    public isSuccessful: boolean;
    public contractAccountNumber: Number;
}
