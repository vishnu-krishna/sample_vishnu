import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BankAccountFields } from '../../../shared/component/payment/paymentMethods/bankAccount/payment.bankAccount.component';
import { IPaymentArrangementStateService } from '../../../shared/component/paymentArrangement/paymentArrangementState.service';
import { PaymentMethodName } from '../../../shared/globals/paygConstants';
import { AddBankAccountResultMessage } from '../../../shared/messages/addBankAccountResult.message';
import { BasePaymentArrangementResultMessage } from '../../../shared/messages/basePaymentArrangementResult.message';
import { SetUpPaymentArrangementResultMessage } from '../../../shared/messages/setUpPaymentArrangementResultMessage';
import { SwitchPaymentArrangementResultMessage } from '../../../shared/messages/switchPaymentArrangementResult.message';
import { IMessageBusService } from '../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../shared/service/dataLayer.service';
import { PaymentArrangementType } from '../../common/enums';
import { ModalService } from '../../modal/modal.service';
import { Bank } from '../../services/settings/model/bank';
import { CreatePaymentMethodRequest } from '../../services/settings/model/createPaymentMethodRequest';
import { IPaymentMethodsService } from '../../services/settings/paymentMethods.service.interface';

@Component({
    selector: 'agl-store-bank-form',
    templateUrl: './storeBankForm.component.html',
    styleUrls: ['./storeBankForm.component.scss']
})
export class StoreBankFormComponent {
    @Input() public data;
    @Input() public isSwitchingPaymentArrangements: boolean = false;
    @Output() public returnToPreviousPage = new EventEmitter();

    constructor(
        private _paymentMethodService: IPaymentMethodsService,
        private _modal: ModalService,
        private _messageBusService: IMessageBusService,
        private _addBankAccountResultMessage: AddBankAccountResultMessage,
        public switchPaymentArrangementResult: SwitchPaymentArrangementResultMessage,
        private _dataLayer: DataLayerService,
        public stateService: IPaymentArrangementStateService
    ) { }

    public goBack() {
        this.returnToPreviousPage.emit(true);
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
                    console.error('Error within the store bank account - change payment method', error);
                    paymentArrangementResult = new SwitchPaymentArrangementResultMessage();
                } else {
                    console.error('Error within the store store bank account - setup payment method', error);
                    paymentArrangementResult = new SetUpPaymentArrangementResultMessage();
                }
                paymentArrangementResult.message = 'error';
                paymentArrangementResult.isSwitchPaymentArrangement = this.isSwitchingPaymentArrangements;
            });
    }

    public saveBankAccount(event: BankAccountFields) {

        if (this.data.isSmsPay && this.data.paymentArrangementPaymentMethodId) {
            this.changePaymentMethod(PaymentArrangementType.SmsPay);
            return;
        }

        let newBankAccountRequest = new CreatePaymentMethodRequest();
        let bankAccount = new Bank();
        bankAccount.accountHolderName = event.accountHolderName;
        bankAccount.accountNumber = event.accountNumber;
        bankAccount.bsb = event.bsb;
        const contractAccountNumber = !!this.data.contractAccountNumber ? Number(this.data.contractAccountNumber) : null;
        this._addBankAccountResultMessage = new AddBankAccountResultMessage();
        if (event.paymentArrangementType === PaymentArrangementType.DirectDebit) {
            newBankAccountRequest.directDebitContractAccount = contractAccountNumber;
            this._addBankAccountResultMessage.paymentArrangementSetup = true;
        } else if (event.paymentArrangementType === PaymentArrangementType.SmsPay) {
            newBankAccountRequest.oneTouchPayContractAccount = contractAccountNumber;
            this._addBankAccountResultMessage.paymentArrangementSetup = true;
        }
        newBankAccountRequest.bank = bankAccount;

        this._addBankAccountResultMessage.contractAccountNumber = contractAccountNumber;
        this._addBankAccountResultMessage.isSwitchPaymentArrangement =  this.data.isSwitchPaymentArrangement;

        this.stateService.isUpdatingPaymentArrangement = true;
        this.stateService.updateStarted(String(contractAccountNumber));

        this._paymentMethodService.createPaymentMethod(newBankAccountRequest)
        .finally(() => {
            this.stateService.updateCompleted(String(contractAccountNumber));
            this._messageBusService.broadcast(this._addBankAccountResultMessage);
            this._modal.close();
        })
        .subscribe(
            (data) => {
                this._addBankAccountResultMessage.message = bankAccount;
            },
            (error) => {
                console.error('Error within saveBankAccount', error);
                this._addBankAccountResultMessage.message = 'error';
                this._dataLayer.pushPaymentError(`Payment outcome – Account Failure`, 'Error occured while save the account', PaymentMethodName.BankAccount, [event.accountNumber]);
                this._messageBusService.broadcast(this._addBankAccountResultMessage);
                this._modal.close();
            }
        );
    }
}
