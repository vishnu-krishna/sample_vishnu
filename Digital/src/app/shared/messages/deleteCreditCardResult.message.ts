import { BaseMessage } from './base.message';
export class DeleteCreditCardResult extends BaseMessage  {
    public isSuccessful: boolean;
    public creditCardNumber: string;
    public creditCardType: string;
}
