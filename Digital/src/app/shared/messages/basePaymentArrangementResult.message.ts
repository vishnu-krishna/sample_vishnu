import { BaseMessage } from './base.message';
export abstract class BasePaymentArrangementResultMessage extends BaseMessage  {
    public contractAccountNumber: Number;
    public isSwitchPaymentArrangement: boolean;
}
