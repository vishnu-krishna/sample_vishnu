import { BaseMessage } from './base.message';
export class SetUpPaymentArrangementResultMessage extends BaseMessage  {
    public isSwitchPaymentArrangement: boolean;
    public contractAccountNumber: Number;
}
