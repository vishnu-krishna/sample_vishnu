import { BasePaymentArrangementResultMessage } from './basePaymentArrangementResult.message';

export class AddCreditCardResultMessage extends BasePaymentArrangementResultMessage {
    public paymentArrangementSetup: boolean;
}
