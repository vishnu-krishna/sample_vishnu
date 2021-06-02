import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPaymentArrangementStateService } from '../../../shared/component/paymentArrangement/paymentArrangementState.service';
import { PaymentMethodName } from '../../../shared/globals/paygConstants';
import { AddCreditCardResultMessage } from '../../../shared/messages/addCreditCardResult.message';
import { BasePaymentArrangementResultMessage } from '../../../shared/messages/basePaymentArrangementResult.message';
import { SetUpPaymentArrangementResultMessage } from '../../../shared/messages/setUpPaymentArrangementResultMessage';
import { SwitchPaymentArrangementResultMessage } from '../../../shared/messages/switchPaymentArrangementResult.message';
import { PaymentArrangementContent } from '../../../shared/model/domain/paymentArrangement/paymentArrangementContent.model';
import { IMessageBusService } from '../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../shared/service/dataLayer.service';
import { PaymentArrangementType } from '../../common/enums';
import { ModalService } from '../../modal/modal.service';
import { CreatePaymentMethodRequest } from '../../services/settings/model/createPaymentMethodRequest';
import { CreditCard } from '../../services/settings/model/creditCard';
import { IPaymentMethodsService } from '../../services/settings/paymentMethods.service.interface';

@Component({
    selector: 'agl-store-credit-card-form',
    templateUrl: './storeCreditCardForm.component.html',
    styleUrls: ['./storeCreditCardForm.component.scss']
})
export class StoreCreditCardFormComponent implements OnInit {

    public content: PaymentArrangementContent;
    @Input() public data;
    @Input() public isSwitchingPaymentArrangements: boolean = false;
    @Output() public returnToPreviousPage = new EventEmitter();

    constructor(
        private _paymentMethodService: IPaymentMethodsService,
        private _modal: ModalService,
        private _messageBusService: IMessageBusService,
        private _addCreditCardResultMessage: AddCreditCardResultMessage,
        public switchPaymentArrangementResult: SwitchPaymentArrangementResultMessage,
        private _dataLayer: DataLayerService,
        public stateService: IPaymentArrangementStateService
    ) { }

    public ngOnInit() {
        this.content = new PaymentArrangementContent();
        // Set the labels **no need for sitecore**.
        this.content.creditCardExpiresLabelText = 'Expiry date';
        this.content.creditCardExpiryDateError = 'A valid expiry is required';
        this.content.creditCardExpiryDateLabelText = 'Expiry date';
        this.content.creditCardExpiryDateRequired = 'A valid expiry is required';
        this.content.creditCardFootnote = '';
        this.content.creditCardInfoMessage = '';
        // CC Name
        this.content.creditCardNameOnCardError = 'Card holder name is required';
        this.content.creditCardNameOnCardLabelText = 'Card holder name';
        // CC Number
        this.content.creditCardNumberLabelText = 'Card number';
        this.content.creditCardNumberError = 'A valid card number is required';
        // Save button
        if (this.data.isDirectDebit || this.data.isSmsPay) {
            this.content.paymentArrangementSaveButtonText = 'SET UP';
        } else {
            this.content.paymentArrangementSaveButtonText = 'SAVE';
        }
        // Terms and Conditions
        this.content.paymentArrangementTermsAndConditionError = 'Please accept the terms and conditions';
        this.content.storedPaymentArrangementText = this.data.paymentMethodReference;
    }

    // taken from deleteOrSwitchPaymentArrangement.component.ts
    // TODO: refactor into service
    public changePaymentMethod(paymentArrangementType: PaymentArrangementType) {

        const contractNumber = this.data.contractAccountNumber;
        this.stateService.updateStarted(contractNumber);
        this.stateService.isUpdatingPaymentArrangement = true;
        let paymentArrangementResult: BasePaymentArrangementResultMessage;

        this._paymentMethodService.attachPaymentArrangementToPaymentMethod(this.data.paymentArrangementPaymentMethodId, contractNumber, paymentArrangementType)
            .finally(() => {
                this.stateService.updateCompleted(contractNumber);
                paymentArrangementResult.contractAccountNumber = contractNumber;
                this._messageBusService.broadcast(paymentArrangementResult);
                this._modal.close();
            })
            .subscribe(
            (data) => {
                if (this.data.paymentArrangementPaymentMethodId) {
                    paymentArrangementResult = new SwitchPaymentArrangementResultMessage();
                } else {
                    paymentArrangementResult = new SetUpPaymentArrangementResultMessage();
                }
                paymentArrangementResult.isSwitchPaymentArrangement = this.isSwitchingPaymentArrangements;
            },
            (error) => {
                if (this.data.paymentArrangementPaymentMethodId) {
                    console.error('Error within the store credit card - change payment method', error);
                    paymentArrangementResult = new SwitchPaymentArrangementResultMessage();
                } else {
                    console.error('Error within the store credit card - setup payment method', error);
                    paymentArrangementResult = new SetUpPaymentArrangementResultMessage();
                }
                paymentArrangementResult.message = 'error';
                paymentArrangementResult.isSwitchPaymentArrangement = this.isSwitchingPaymentArrangements;
            });
    }

    public saveCreditCard(event: CreditCard) {

        if (this.data.isSmsPay && this.data.paymentArrangementPaymentMethodId) {
            this.changePaymentMethod(PaymentArrangementType.SmsPay);
            return;
        }

        let newCreditCardRequest = new CreatePaymentMethodRequest();
        let creditCardPayment = new CreditCard();

        let name = event.cardHolderName;
        let cardType = event.cardType;
        let ref = event.creditCardReference;
        let expDateYearAsYYYY = new Date(event.expiryDateYear).getFullYear().toString().substr(-4);

        creditCardPayment.cardHolderName = name;
        creditCardPayment.cardType = cardType;
        creditCardPayment.creditCardReference = ref;
        creditCardPayment.expiryDate = `${expDateYearAsYYYY}-${event.expiryDateMonth}`;

        newCreditCardRequest.creditCard = creditCardPayment;
        const contractAccountNumber = !!this.data.contractAccountNumber ? Number(this.data.contractAccountNumber) : null;

        this._addCreditCardResultMessage = new AddCreditCardResultMessage();
        if (event.paymentArrangementType === PaymentArrangementType.DirectDebit) {
            newCreditCardRequest.directDebitContractAccount = contractAccountNumber;
            this._addCreditCardResultMessage.paymentArrangementSetup = true;
        } else if (event.paymentArrangementType === PaymentArrangementType.SmsPay) {
            newCreditCardRequest.oneTouchPayContractAccount = contractAccountNumber;
            this._addCreditCardResultMessage.paymentArrangementSetup = true;
        }
        this._addCreditCardResultMessage.contractAccountNumber = contractAccountNumber;
        this._addCreditCardResultMessage.isSwitchPaymentArrangement = this.data.isSwitchPaymentArrangement;
        this.stateService.isUpdatingPaymentArrangement = true;
        this.stateService.updateStarted(String(contractAccountNumber));

        this._paymentMethodService.createPaymentMethod(newCreditCardRequest)
        .finally(() => {
            this.stateService.updateCompleted(String(contractAccountNumber));
            this._messageBusService.broadcast(this._addCreditCardResultMessage);
            this._modal.close();
        })
        .subscribe(
            (data) => {
                this._addCreditCardResultMessage.message = creditCardPayment;
            },
            (error) => {
                console.error('Error within saveCreditCard', error);
                this._addCreditCardResultMessage.message = 'error';
                this._dataLayer.pushPaymentError(`Payment outcome – Card Failure`, 'Error occured while save the card', PaymentMethodName.CreditCard, [this.data.contractAccountNumber]);
                this._messageBusService.broadcast(this._addCreditCardResultMessage);
                this._modal.close();
            }
        );
    }

    public goBack() {
        this.returnToPreviousPage.emit(true);
    }

}
