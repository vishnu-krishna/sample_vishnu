import { Component, Input } from '@angular/core';
import { CreatePaymentMethodRequest } from '../../../../../myAccount/services/settings/model/createPaymentMethodRequest';
import { CreditCard } from '../../../../../myAccount/services/settings/model/creditCard';
import { IPaymentMethodsService } from '../../../../../myAccount/services/settings/paymentMethods.service.interface';
import { PaymentMethodName, PaymentMethods, PaymentView } from '../../../../globals/paygConstants';
import { PaymentSuccessMessage } from '../../../../messages/paymentSuccess.message';
import { ReceiptDetail } from '../../../../model/domain/receiptDetail.model';
import { PaymentDetailsApiModel } from '../../../../model/payment/paymentApi.model';
import { ApiService } from '../../../../service/api.service';
import { IMessageBusService } from '../../../../service/contract/imessageBus.service';

import * as moment from 'moment';
import { PaymentArrangementContent } from '../../../../model/domain/paymentArrangement/paymentArrangementContent.model';
import { DataLayerService } from '../../../../service/dataLayer.service';

@Component({
    selector: 'agl-payment-creditcard',
    templateUrl: './payment.creditCard.component.html',
    styleUrls: ['./payment.creditCard.component.scss']
})
export class PaymentCreditCardComponent {
    @Input() public paymentDetails;
    @Input() public content;
    @Input() public hideStoredCheckBox;
    @Input() public isDirectDebit: boolean;
    @Input() public isSmsPay: boolean;

    public paymentAmount;
    public amountValid;
    public bonusAmount;
    public creditCardContent;
    public payment = new PaymentDetailsApiModel();
    public errorInPayment;

    private cardType;
    private name;
    private ref;
    private expDateYear;
    private expDateMonth;

    constructor(
        protected _api: ApiService,
        private paymentMethodService: IPaymentMethodsService,
        private messagebusService: IMessageBusService,
        private dataLayer: DataLayerService
    ) {
        this.creditCardContent = new PaymentArrangementContent();
        // Set the labels **no need for sitecore**.
        this.creditCardContent.creditCardExpiresLabelText = 'Expiry date';
        this.creditCardContent.creditCardExpiryDateError = 'A valid expiry is required';
        this.creditCardContent.creditCardExpiryDateLabelText = 'Expiry date';
        this.creditCardContent.creditCardExpiryDateRequired = 'A valid expiry is required';
        this.creditCardContent.creditCardFootnote = '';
        this.creditCardContent.creditCardInfoMessage = '';
        // CC Name
        this.creditCardContent.creditCardNameOnCardError = 'Card holder name is required';
        this.creditCardContent.creditCardNameOnCardLabelText = 'Card holder name';
        // CC Number
        this.creditCardContent.creditCardNumberLabelText = 'Card number';
        this.creditCardContent.creditCardNumberError = 'A valid card number is required';
        // Save button
        this.creditCardContent.paymentArrangementSaveButtonText = 'MAKE PAYMENT';
        // Terms and Conditions
        this.creditCardContent.paymentArrangementTermsAndConditionError = 'Please accept the terms and conditions';
    }

    public saveCreditCard(event: any) {
        this.name = event.cardHolderName;
        this.cardType = event.cardType;
        this.ref = event.creditCardReference;
        this.expDateYear = event.expiryDateYear;
        this.expDateMonth = event.expiryDateMonth;

        if (event.storeCardCheckbox) {
            this.generatePaymentToken(true);
        } else {
            this.generatePaymentToken();
        }
    }

    public generatePaymentToken(saveCreditCard?: boolean) {
        this.payment.amount = this.paymentAmount;
        this.payment.cccard = this.ref;
        this.payment.cvv = '000';
        this.payment.month = this.expDateMonth;
        this.payment.year = this.expDateYear.toString().substr(-2);
        this.payment.billReferenceNumber = this.paymentDetails.referenceNumber;
        this.payment.useTokenisedCard = true;

        if (this.paymentAmount >= 10) {
            this._api.paymentApiGenerateBillingReference(this.paymentDetails.referenceNumber, '/api/payment/generate?billingReferenceNumber=')
            .subscribe((value: string) => {
                this.payment.paymentToken = value;
                this.makePayment(saveCreditCard);
            },
            (error) => {
                this.errorInPayment = true;
                this.dataLayer.pushPaymentError('Payment outcome – Card Failure', 'Errorin PaymentApiGenerateBillingReference', PaymentMethodName.CreditCard, [this.paymentDetails.referenceNumber]);
                console.error('Error in PaymentApiGenerateBillingReference', error);
            });
        }
    }

    public makePayment(saveCreditCard?: boolean) {
        this._api.paymentApiGeneratePayment('/api/Payment', this.payment)
        .subscribe((data: any) => {
            let receiptDetail = new ReceiptDetail();
            receiptDetail.receiptNumber = data.ReceiptNo;
            receiptDetail.paymentAmount = this.paymentAmount;
            receiptDetail.creditCardType = this.cardType;
            receiptDetail.creditCardNumber = this.payment.cccard;
            receiptDetail.creditCardExpiry = `${this.payment.month}/${this.expDateYear}`;
            receiptDetail.paymentDate = moment().format('MMMM Do YYYY');
            receiptDetail.paymentMethod = PaymentMethods.CreditCard;
            receiptDetail.bonusAmount = this.bonusAmount;

            if (saveCreditCard) {
                let newCreditCardRequest = new CreatePaymentMethodRequest();
                let creditCardPayment = new CreditCard();
                let expDateYearAsYYYY =  this.expDateYear;

                creditCardPayment.cardHolderName = this.name;
                creditCardPayment.cardType = this.cardType;
                creditCardPayment.creditCardReference = this.payment.cccard;
                creditCardPayment.expiryDate = `${expDateYearAsYYYY}-${this.payment.month}`;

                newCreditCardRequest.creditCard = creditCardPayment;

                this.paymentMethodService.createPaymentMethod(newCreditCardRequest).subscribe(
                    (paymentServiceResponse) => {
                        // Update the recipet
                        receiptDetail.savedCreditCard = true;
                        let paymentSuccessMessage = new PaymentSuccessMessage(receiptDetail, PaymentView.PaymentSuccess);
                        this.messagebusService.broadcast(paymentSuccessMessage);
                    },
                    (error) => {
                        console.error('Error within saveCreditCard', error);
                        // Update the recipet
                        receiptDetail.failureToSaveCreditCard = true;
                        let paymentSuccessMessage = new PaymentSuccessMessage(receiptDetail, PaymentView.PaymentSuccess);
                        this.messagebusService.broadcast(paymentSuccessMessage);
                        this.dataLayer.pushPaymentError('Payment outcome – Card Failure', 'Error occurred while saving the credit card', PaymentMethodName.CreditCard, []);
                    }
                );
            } else {
                let paymentSuccessMessage = new PaymentSuccessMessage(receiptDetail, PaymentView.PaymentSuccess);
                this.messagebusService.broadcast(paymentSuccessMessage);
            }
        },
        (error) => {
            this.errorInPayment = true;
            this.dataLayer.pushPaymentError('Payment outcome – Card Failure', 'Error occurred while make payment using card', PaymentMethodName.CreditCard, []);
            console.error('Error in makePayment credit card paymentApiGeneratePayment', error);
        });
    }

}
