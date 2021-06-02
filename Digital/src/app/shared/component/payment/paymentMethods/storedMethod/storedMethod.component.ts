import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaymentMethodsService } from '../../../../../myAccount/services/settings/paymentMethods.service.interface';
import { PaymentMethodName, PaymentMethods, PaymentView } from '../../../../globals/paygConstants';
import { PaymentSuccessMessage } from '../../../../messages/paymentSuccess.message';
import { ReceiptDetail } from '../../../../model/domain/receiptDetail.model';
import { PaymentDetailsApiModel } from '../../../../model/payment/paymentApi.model';
import { PaymentDetails } from '../../../../model/payment/paymentDetails.model';
import { ApiService } from '../../../../service/api.service';
import { IMessageBusService } from '../../../../service/contract/imessageBus.service';
import { FeatureFlagService, FeatureFlagTypes } from './../../../../../myAccount/services/featureFlag.service';

import { MyWalletViewModel } from '../../../../../myAccount/pages/settings/myWallet/myWallet.service';
import { IMyWalletService } from '../../../../../myAccount/pages/settings/myWallet/myWallet.service.interface';

import { PaymentRequest } from '../../../../../myAccount/services/storedPaymentsApi/model/paymentRequest';

import * as moment from 'moment';
import { DataLayerService } from '../../../../service/dataLayer.service';

@Component({
    selector: 'agl-stored-method',
    templateUrl: './storedMethod.component.html',
    styleUrls: ['./storedMethod.component.scss']
})
export class StoredMethodPaymentComponent implements OnInit {
    @Output() public storeSelected = new EventEmitter();
    @Output() public storeSelectedActive = new EventEmitter();
    @Output() public storeSelectedLoaded = new EventEmitter();
    @Input() public paymentAmount;
    @Input() public bonusAmount;
    @Input() public paymentDetails: PaymentDetails;

    // Stored Method
    public methodSelected: boolean;
    public methodTitle: string;
    public methodMonth: string;
    public methodYear: string;
    public methodLabel: string;
    public methodCCRef: string;
    public isSaving: boolean;
    public cardsEmpty: boolean = true;
    public methodId: any;

    // Payment Success Variables
    public todaysDate;

    // Card Variables
    public cardsLoaded = false;
    public cardsFailedToLoad = false;
    public generalPaymentError = false;
    public paymentMethods: MyWalletViewModel[];

    // Text
    public transactionText = 'Transaction fee of 0.45% applies.';

    // Payment Model
    public payment = new PaymentDetailsApiModel();

    constructor(
        protected _api: ApiService,
        private messagebusService: IMessageBusService,
        private paymentMethodsService: IPaymentMethodsService,
        private myWalletService: IMyWalletService,
        private dataLayer: DataLayerService,
        private featureFlagService: FeatureFlagService
    ) { }

    public ngOnInit() {
        this.todaysDate = moment().format('MMMM Do YYYY');

        Observable.forkJoin(
            this.myWalletService.getStoredPaymentMethods(),
            this.featureFlagService.featureFlagged(FeatureFlagTypes.bankAccountPaymentEnabled)
        ).subscribe(
            (results) => {

                let paymentMethods = results[0];
                let isBankEnabled = results[1];

                if (!isBankEnabled) {
                    paymentMethods = paymentMethods.filter((item) => (!item.isBankAccount));
                }

                this.paymentMethods = this.myWalletService.getValidPaymentMethods(paymentMethods);
                this.cardsLoaded = true;
                this.storeSelectedLoaded.emit(true);
                this.cardsEmpty = false;
                if (this.paymentMethods.length === 0) { this.cardsEmpty = true; }
            },
            (error) => {
                this.cardsFailedToLoad = true;
                this.cardsEmpty = false;
                this.cardsLoaded = true;
                this.storeSelectedLoaded.emit(true);
                console.error('An error occurred retrieving payment methods from the PaymentMethods service.', error);
            }
        );
    }

    public selectedItem(item: StoredMethodModel) {
        if (item) {
            this.methodSelected = true;
            this.methodTitle = item.methodTitle;
            this.methodId = item.methodId;
            this.methodMonth = item.methodMonth;
            this.methodYear = item.methodYear;
            this.methodLabel = item.methodLabel;
            this.methodCCRef = item.methodCCRef;

            if (this.methodLabel === 'Bank account') {
                this.transactionText = 'No payment processing fees apply.';
            } else {
                this.transactionText = 'Transaction fee of 0.45% applies.';
            }
        }

        this.storeSelected.emit(item);
        this.storeSelectedActive.emit(true);
    }

    public changeMethod() {
        this.methodSelected = false;
        this.storeSelectedActive.emit(false);
    }

    public methodMakePayment() {
        if (this.paymentAmount.valid) {
            if (this.methodLabel === 'Bank account') {
                // Bank account flow
                this.makeBankAccountPayment();
            } else {
                // Credit Card Flow
                this.makeCreditCardPayment();
            }
        }
    }

    public makeCreditCardPayment() {
        if (!this.isSaving) {
            this.payment.amount = this.paymentAmount.amount;
            this.payment.cccard = this.methodCCRef;
            this.payment.cvv = '000';
            this.payment.month = this.methodMonth;
            this.payment.year = this.methodYear.substr(-2);
            this.payment.billReferenceNumber = this.paymentDetails.referenceNumber;
            this.payment.useTokenisedCard = true;

            this.isSaving = true;
            this._api.paymentApiGenerateBillingReference(this.paymentDetails.referenceNumber, '/api/payment/generate?billingReferenceNumber=')
                .subscribe((value: string) => {
                    this.payment.paymentToken = value;
                    this.makePayment();
                },
                (error) => {
                    this.isSaving = false;
                    this.generalPaymentError = true;
                    this.dataLayer.pushPaymentError('Payment outcome – Card Failure', 'Error occurred while make payment using stored card', PaymentMethodName.SavedMethod, []);
                    console.error('Error in PaymentApiGenerateBillingReference', error);
                });
        }
    }

    public makePayment() {
        this._api.paymentApiGeneratePayment('/api/payment', this.payment)
            .subscribe((data: any) => {
                let receiptDetail = new ReceiptDetail();
                receiptDetail.receiptNumber = data.ReceiptNo;
                receiptDetail.paymentAmount = this.paymentAmount.amount;
                receiptDetail.creditCardType = this.methodLabel;
                receiptDetail.creditCardNumber = this.payment.cccard;
                receiptDetail.creditCardExpiry = `${this.payment.month}/${this.payment.year}`;
                receiptDetail.paymentDate = this.todaysDate;
                receiptDetail.paymentMethod = PaymentMethods.CreditCard;
                receiptDetail.bonusAmount = this.bonusAmount;
                let paymentSuccessMessage = new PaymentSuccessMessage(receiptDetail, PaymentView.PaymentSuccess);
                this.messagebusService.broadcast(paymentSuccessMessage);
            },
            (error) => {
                this.isSaving = false;
                this.generalPaymentError = true;
                this.dataLayer.pushPaymentError('Payment outcome – Card Failure', 'Error occurred while make payment using stored card', PaymentMethodName.SavedMethod, []);
                console.error('Error in paymentApiGeneratePayment', error);
            });
    }

    public makeBankAccountPayment() {
        if (!this.isSaving) {
            this.isSaving = true;
            let paymentRequest = new PaymentRequest();
            paymentRequest.amount = Number(this.paymentAmount.amount);
            paymentRequest.contractNumber = Number(this.paymentDetails.contractNumber);

            this._api.storedPaymentApiGeneratePayment(`/paymentMethods/${this.methodId}/payments`, paymentRequest)
                .subscribe((value: any) => {
                    let receiptDetail = new ReceiptDetail();
                    receiptDetail.paymentMethod = PaymentMethods.BankAccount;
                    receiptDetail.paymentAmount = this.paymentAmount.amount;
                    receiptDetail.paymentDate = this.todaysDate;
                    receiptDetail.receiptNumber = value.transactionReference;
                    receiptDetail.bonusAmount = this.bonusAmount;
                    let paymentSuccessMessage = new PaymentSuccessMessage(receiptDetail, PaymentView.PaymentSuccess);
                    this.messagebusService.broadcast(paymentSuccessMessage);
                    this.isSaving = false;
                },
                (error) => {
                    this.isSaving = false;
                    this.generalPaymentError = true;
                    this.dataLayer.pushPaymentError('Payment outcome – Account Failure', 'Error occurred while make payment using stored account', PaymentMethodName.SavedMethod, []);
                    console.error('Error in StoredMethod StoredPaymentApiGeneratePayment', error);
                });
        }
    }
}

export class StoredMethodModel {
    public methodLabel: string;
    public methodId: any;
    public methodTitle: string;
    public methodMonth: string;
    public methodYear: string;
    public methodCCRef: string;
}
