import { Component, Inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { CcPaymentUrlService } from '../../../../../myAccount/services/ccPaymentUrl.service';
import { EventService } from '../../../../../myAccount/services/event.service';

import { Now } from '../../../../../shared/service/now.service';
import { PaymentMethods, PaymentView } from '../../../../globals/paygConstants';
import { PageLoadingMessage } from '../../../../messages/pageLoading.message';
import { PaymentSuccessMessage } from '../../../../messages/paymentSuccess.message';
import { ReceiptDetail } from '../../../../model/domain/receiptDetail.model';
import { PaymentContentModel } from '../../../../model/payment/paymentContent.model';
import { PaymentDetails } from '../../../../model/payment/paymentDetails.model';
import { ApiService } from '../../../../service/api.service';
import { ConfigService } from '../../../../service/config.service';
import { IMessageBusService } from '../../../../service/contract/imessageBus.service';

import * as jwt_decode from 'jwt-decode';

@Component({
    selector: 'agl-iframe-payment-creditcard',
    templateUrl: './iframe.credit-card.component.html',
    styleUrls: ['./iframe.credit-card.component.scss']
})
export class IframeCreditCardComponent implements OnDestroy, OnInit {
    @Input() public paymentDetails: PaymentDetails;
    @Input() public content: PaymentContentModel;

    public iframeUrl: any;
    public iframeError = false;
    public iframeLoaded = false;
    public iframePaymentFailure = false;
    public iframeFailedToLoadInTime = false;
    public browserClass: string;
    public amountValid = true;
    public paymentAmount: number;
    public bonusAmount: number;

    private receiptNumber: string;
    private ccType: string;
    private ccNum: string;
    private ccExp: string;
    private todaysDate: string;
    private email: string;

    constructor(
        private _ccUrl: CcPaymentUrlService,
        private _sanitizer: DomSanitizer,
        private _renderer: Renderer2,
        private _eventService: EventService,
        private _api: ApiService,
        private _config: ConfigService,
        private _messagebusService: IMessageBusService,
        private _now: Now,
        @Inject(DOCUMENT) private _dom) {
        this.receiveMessage();
    }

    public ngOnInit() {
        this.iframeUrl = this._ccUrl.url;
        setTimeout(() => {
            if (this.iframeLoaded) {
                this.submitData();
                return;
            }
            this.iframeFailedToLoadInTime = true;
        }, this._ccUrl.timeout);
        this.todaysDate = this._now.date().format('DD MMM YYYY');

    }
    public ngOnDestroy() {
        this.receiveMessage();
    }
    public submitData() {
        if (this.iframeLoaded) {
            // Check the environment and switch based on that.
            let src = this._config.current.aglWebPaymentApiBaseUrl;
            let iframeElement = this._dom.querySelector('#paymentGateway');
            if (iframeElement != null) {
                iframeElement.contentWindow.postMessage('referenceNumber=' + this.paymentDetails.referenceNumber + '&referenceNumberValid=true&paymentAmount=' + this.paymentAmount + '&paymentAmountValid=' + this.amountValid, src);
            } else {
                this.iframePaymentFailure = true;
            }
        }
    }

    private receiveMessage() {
        this._renderer.listen('window', 'message', (event) => {
            let jsonData: any = this.deserialize(event.data);

            // String of 'true'
            if (jsonData.loaded === 'true') {
                this.sendBackgroundColor();
                this.iframeLoaded = true;
            }

            // Sets the class on the iframe window to make the height correct and not overflow.
            if (jsonData.className === 'with-error') {
                this.iframeError = true;
            } else {
                this.iframeError = false;
            }

            // Will show the loading message.
            if (jsonData.action === 'displayLoading') {
                this._messagebusService.broadcast(new PageLoadingMessage(true, this.content.paymentLoadingModalText));
            }

            // Show a error because the iframe said there was an error.
            if (jsonData.action === 'displayPaymentErrorModal') {
                this.iframePaymentFailure = true;
                this._messagebusService.broadcast(new PageLoadingMessage(false));
                if (localStorage.getItem('mockPayment') && localStorage.getItem('mockPayment') === 'true') {
                    this.iframePaymentFailure = false;
                    jsonData = {
                        action: 'hideLoading',
                        creditCardExpiry: '3/20',
                        creditCardType: 'VISA',
                        hashedCreditCardNumber: 'xx-1111',
                        paymentDate: '30-Mar-2017',
                        receiptNumber: '731587610+++'
                    };
                }
            }

            // Will hide the loading message, then show the result.
            if (jsonData.action === 'hideLoading') {
                this._messagebusService.broadcast(new PageLoadingMessage(false));
                this.receiptNumber = jsonData.receiptNumber.replace(/\D+/g, '');
                // this.paymentAmount = this.amount;
                this.ccType = jsonData.creditCardType;
                this.ccNum = jsonData.hashedCreditCardNumber;
                this.ccExp = jsonData.creditCardExpiry;
                this._eventService.payment(true);

                // Sets the email from the stored token
                let token = sessionStorage.getItem('Bearer');

                if (token) {
                    let emailAddress = jwt_decode(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
                    this.email = emailAddress;
                }

                let receiptDetail = new ReceiptDetail();
                receiptDetail.receiptNumber = this.receiptNumber;
                receiptDetail.paymentAmount = this.paymentAmount;
                receiptDetail.creditCardType = this.ccType;
                receiptDetail.creditCardNumber = this.ccNum;
                receiptDetail.creditCardExpiry = this.ccExp;
                receiptDetail.paymentDate = this.todaysDate;
                receiptDetail.bonusAmount = this.bonusAmount;
                receiptDetail.paymentMethod = PaymentMethods.CreditCard;
                let paymentSuccessMessage = new PaymentSuccessMessage(receiptDetail, PaymentView.PaymentSuccess);
                this._messagebusService.broadcast(paymentSuccessMessage);
            }

        });
    }

    private sendBackgroundColor() {
        // Check the environment and switch based on that.
        let src = this._config.current.aglWebPaymentApiBaseUrl;
        let iframeElement = this._dom.querySelector('#paymentGateway');
        if (iframeElement !== null) {
            iframeElement.contentWindow.postMessage('bgColor=#f5f5f5', src);
        }
    }

    private deserialize(params) {
        let Data = params.split('&');
        let i = Data.length;
        let Result = {};
        while (i--) {
            let Pair = decodeURIComponent(Data[i]).split('=');
            let Key = Pair[0];
            let Val = Pair[1];
            Result[Key] = Val;
        }
        return Result;
    }
}
