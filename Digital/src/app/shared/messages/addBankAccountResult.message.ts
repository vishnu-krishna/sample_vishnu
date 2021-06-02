import { BasePaymentArrangementResultMessage } from './basePaymentArrangementResult.message';

export class AddBankAccountResultMessage extends BasePaymentArrangementResultMessage {
    public paymentArrangementSetup: boolean;
}
