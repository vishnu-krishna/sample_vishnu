import { PaymentArrangementType } from '../../../common/enums';
import { CardType } from './cardType';

export class CreditCard {
    public cardType: CardType;
    public creditCardReference: string;
    public expiryDateMonth: string;
    public expiryDateYear: string;
    public expiryDate: string;
    public cardHolderName: string;
    public paymentArrangementType?: PaymentArrangementType; // When a credit card is add through my wallet, the payment arrangement will be null.
}
