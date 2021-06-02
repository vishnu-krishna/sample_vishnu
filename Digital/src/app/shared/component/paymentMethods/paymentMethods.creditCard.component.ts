import { Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CardType } from '../../../myAccount/services/settings/model/cardType';
import { PaymentMethodName } from '../../globals/paygConstants';
import { ConfigService } from '../../service/config.service';
import { IMessageBusService } from '../../service/contract/imessageBus.service';
import { PaymentValidators } from '../../validators/paymentValidators';

import { FeatureFlagService, FeatureFlagTypes } from '../../../myAccount/services/featureFlag.service';
import { ApiService, ContactDetailModel } from '../../service/api.service';

import * as moment from 'moment';
import { PaymentArrangementType } from '../../../myAccount/common/enums';
import { PaymentArrangementContent } from '../../model/domain/paymentArrangement/paymentArrangementContent.model';
import { DataLayerService } from '../../service/dataLayer.service';
import { IPaymentArrangementStateService } from '../paymentArrangement/paymentArrangementState.service';

@Component({
    selector: 'agl-directdebitcreditcard',
    templateUrl: './paymentMethods.creditCard.component.html',
    styleUrls: ['./paymentMethods.creditCard.component.scss']
})
export class PaymentMethodsCreditCardComponent implements OnInit {
    @Input() public content: PaymentArrangementContent;
    @Input() public paymentAmount;
    @Input() public myWallet;
    @Input() public isDirectDebit;
    @Input() public isSmsPay;
    @Input() public hideStoredCheckBox;
    @Input() public isSwitchingPaymentArrangements: boolean = false;
    @Output() public onCancel = new EventEmitter();
    @Output() public onSave = new EventEmitter<CreditCardFields>();

    public formSubmitted: boolean = false;
    public expiryDate: string;
    public expiryDateMonth: string;
    public isSaving: boolean = false;
    public genericError: boolean = false;
    public showMCcardLogo: boolean = true;
    public showVisacardLogo: boolean = true;
    public creditCardForm: FormGroup;
    public expiryDateForm: FormGroup;
    public months = this.returnMonths();
    public years = this.returnYears();
    public myWalletEnabled = false;
    public paymentArrangementType: PaymentArrangementType;
    public paymentArrangementString: string;
    // To access enum in HTML template
    public PaymentArrangementType = PaymentArrangementType;
    public isUserAgentIE = false;

    // iframe tricks
    @ViewChild('pciIframe') public pciIframe;
    public iframeSanitizedUrl: any;
    public iframeLoaded: boolean = false;
    public iframeError: boolean = false;
    public iframeErrorMessage: string = '';
    public receiveMessage: Function;
    public paymentSafetyMessage: string;
    public termsConditionsText: string;
    public termsConditionsLink: string;
    public mobileNumber: string;

    // Set save method, saveMethodOnly is the default option.
    @Input() public saveMethodOnly: boolean = true;
    @Input() public saveAndPay: boolean = false;
    public checked;

    private creditCardFields = new CreditCardFields();

    constructor(
        protected _api: ApiService,
        public _renderer: Renderer2,
        public _config: ConfigService,
        public _sanitizer: DomSanitizer,
        public _route: ActivatedRoute,
        public _messageBusService: IMessageBusService,
        public _featureFlagService: FeatureFlagService,
        private _formBuilder: FormBuilder,
        private _validators: PaymentValidators,
        private _apiService: ApiService,
        private _dataLayer: DataLayerService,
        public stateService: IPaymentArrangementStateService,
    ) {
            this.detectUserAgentIE();
            let frameUrl = `${this._config.current.PCIDSSURL}?${window.location.protocol}//${window.location.host}`;
            let iframeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(frameUrl);
            this.iframeSanitizedUrl = iframeUrl;
            this.receiveMessage = this._renderer.listen('window', 'message', (event) => {
                let data: any = event.data;
                if (data) {
                    this.creditCardFields.creditCardReference = null;
                }
                if (isNaN(parseInt(data, 0))) {
                    this.iframeError = true;
                    this.iframeErrorMessage = data;
                } else {
                    this.iframeError = false;
                    this.creditCardFields.creditCardReference = data;
                }

            });
        }

    public ngOnInit() {
        if (this.isDirectDebit) {
            this.paymentArrangementType = PaymentArrangementType.DirectDebit;
            this.paymentArrangementString = 'Direct Debit';
        } else if (this.isSmsPay) {
            this.paymentArrangementType = PaymentArrangementType.SmsPay;
            this.paymentArrangementString = 'SMS Pay';
        } else {
            this.paymentArrangementType = null;
        }

        if (this.isSmsPay && this.content.storedPaymentArrangementText) {
            this.creditCardForm = this._formBuilder.group({
                storeCardCheckbox: [],
                termsAndConditions: [null, [Validators.required, Validators.pattern('true')]]
            });
        } else {
            // Grouping for validation purposes.
            this.expiryDateForm = this._formBuilder.group({
                creditCardExpiryDateMonth: ['', [Validators.required]],
                creditCardExpiryDateYear: ['', [Validators.required]],
            }, {
                validator: this._validators.validateCombinedDate.bind(this.expiryDateForm)
            });

            this.creditCardForm = this._formBuilder.group({
                creditCardName: ['', Validators.required],
                // creditCardNumber: ['', [<any> CreditCardValidator.validateCCNumber]],
                storeCardCheckbox: [],
                termsAndConditions: [null, [Validators.required, Validators.pattern('true')]],
                expiryDateForm: this.expiryDateForm
            });
        }

        // On Load set the checkbox to checked.
        this._featureFlagService.featureFlagged(FeatureFlagTypes.myWalletEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                if (!this.hideStoredCheckBox) {
                    this.creditCardForm.get('storeCardCheckbox').setValue(featureIsEnabled);
                }
                this.myWalletEnabled = featureIsEnabled;
            }
        );

        // If isn't direct debit set the tickbox to be checked
        if (!this.isDirectDebit && !this.isSmsPay) {
            this.creditCardForm.get('termsAndConditions').setValue(true);
        }

        this._apiService.getContactDetail().subscribe(
            (data: ContactDetailModel) => {
                if (data && data.businessPartners) {
                    this.mobileNumber = data.businessPartners[0].mobile;
                }
            },
            (err) => {
                console.error('ERROR: apiService.getContactDetail()', err);
            }
        );

        this.setMessagesBasedOnPaymentType();
    }

    public setMessagesBasedOnPaymentType() {
        if (this.isDirectDebit) {
            this.paymentSafetyMessage = `Setting up Direct Debit will automatically save your bank account into My Wallet.`;
            this.termsConditionsText = `Direct Debit terms and Conditions`;
            this.termsConditionsLink = `https://www.agl.com.au/residential/help-and-support/billing-and-payments/bill-payment-options/direct-debit-terms-and-conditions`;
        } else if (this.isSmsPay) {
            this.paymentSafetyMessage = `New payment methods you set up here will be saved into My Wallet.`;
            this.termsConditionsText = 'SMS Pay terms and conditions';
            this.termsConditionsLink = `https://www.agl.com.au/smspayterms`;
        }
    }
    public showSmsPayDisclaimer(): boolean {
        return this.paymentArrangementType === PaymentArrangementType.SmsPay && this.stateService.hasSmsPaySetup;
    }

    public detectUserAgentIE() {
        let userAgent = navigator.userAgent;
        this.isUserAgentIE = userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1;
    }

    public getCardType(cardNumber: string) {
        // visa
        let re = new RegExp('^4');
        if (cardNumber.match(re) != null) {
            this.creditCardFields.cardType = CardType.Visa;
            this.showMCcardLogo = false;
            this.showVisacardLogo = true;
        }

        // Mastercard
        re = new RegExp('^5[1-5]');
        let reForTwoSeries = new RegExp('^2');
        if (cardNumber.match(re) != null || cardNumber.match(reForTwoSeries) != null) {
            this.creditCardFields.cardType = CardType.Master;
            this.showVisacardLogo = false;
            this.showMCcardLogo = true;
        }
    }

    public saveCreditCard() {

        if (this.isSmsPay && this.content.storedPaymentArrangementText) {
            this.onSave.emit();
            this.isSaving = true;
            return;
        }

        this.genericError = false;
        this.formSubmitted = true;

        // We strip any foreign symbols.
        // let ccNumber = this.creditCardForm.get('creditCardNumber').value.replace(/\D+/g, '');

        if (this.creditCardForm.valid && this.expiryDateForm.valid) {
            // Makes the loader appear
            this.isSaving = true;

            /**
             * We do some weird things here to get around the UX issue of showing an error within the
             * field when an error appears. basically we force another check of the box here, if it
             * comes back bad it will set itself back near the bottom.
             */
            this.iframeError = false;
            let iframeObject = {
                runFunction: 'generateToken'
            };
            let src = this._config.current.PCIDSSURL;
            this.pciIframe.nativeElement.contentWindow.postMessage(iframeObject, src);

            /**
             * Ok below is some hack af code.
             * This is implemented to get around the asynchronous
             * problem with having a pci compliant text box
             * within an iframe on a SPA, we need to set an interval
             * and check if we have gotten back the tokenized credit card
             * once we have then we can continue as normal.
             * I hate myself for writing this, please forgive me.
             */
            let pollPostMessage = 0;
            let pollingIntervalMs = 100;
            let pollPostMessageReceive = setInterval(() => {

                // If we get over 15 seconds, error.
                if (pollPostMessage > 150) {
                    this.formSubmitted = false;
                    this.isSaving = false;
                    this.iframeError = true;
                    clearInterval(pollPostMessageReceive);
                }

                // Skip this if Internet Explorer
                if (!this.isUserAgentIE) {
                    // iframe trickery for better UX.
                    if (this.iframeError) {
                        this.formSubmitted = false;
                        this.isSaving = false;
                        this._dataLayer.pushPaymentError('Payment outcome – Card validation error',  'Error occurred in validating a card', PaymentMethodName.SavedMethod, []);
                        clearInterval(pollPostMessageReceive);
                    }
                }

                if (this.creditCardFields.creditCardReference) {
                    // stop the interval
                    clearInterval(pollPostMessageReceive);
                    this.getCardType(this.creditCardFields.creditCardReference);
                    this.creditCardFields.paymentArrangementType = this.paymentArrangementType;
                    if (this.saveAndPay) {
                        // For the modal
                        this.isSaving = true;
                        this.creditCardFields.cardHolderName = this.creditCardForm.get('creditCardName').value;
                        this.creditCardFields.expiryDateMonth = this.expiryDateForm.get('creditCardExpiryDateMonth').value;
                        this.creditCardFields.expiryDateYear = this.expiryDateForm.get('creditCardExpiryDateYear').value;
                        this.creditCardFields.storeCardCheckbox = this.creditCardForm.get('storeCardCheckbox').value;
                        this.onSave.emit(this.creditCardFields);
                    } else {
                        // For my wallet
                        this.isSaving = true;
                        this.creditCardFields.cardHolderName = this.creditCardForm.get('creditCardName').value;
                        this.creditCardFields.expiryDateMonth = this.expiryDateForm.get('creditCardExpiryDateMonth').value;
                        this.creditCardFields.expiryDateYear = this.expiryDateForm.get('creditCardExpiryDateYear').value;
                        this.onSave.emit(this.creditCardFields);
                    }
                } else {
                    pollPostMessage++;
                }
            }, pollingIntervalMs);

            /**
             * Below is the get token functionality for a credit card field within the form itself.
             * works much better than the iframe solution however was parked due to some PCI
             * compliant things. I've left it commented out just for the future when they will
             * eventually want this functionality
             */
            // Generate Token
            // Returns a token that we can use for payments.
            // this._api.paymentApiGenerateToken(ccNumber, '/api/payment/tokenise?cardNumber=')
            // .subscribe((res: any) => {
            //     let token = res._body.replace(/"/g, '');
            //     this.creditCardFields.creditCardReference = token;
            //     this.getCardType(token);

            //     if (this.saveAndPay) {
            //         // For the modal
            //         this.isSaving = true;
            //         this.creditCardFields.cardHolderName = this.creditCardForm.get('creditCardName').value;
            //         this.creditCardFields.expiryDateMonth = this.expiryDateForm.get('creditCardExpiryDateMonth').value;
            //         this.creditCardFields.expiryDateYear = this.expiryDateForm.get('creditCardExpiryDateYear').value;
            //         this.creditCardFields.storeCardCheckbox = this.creditCardForm.get('storeCardCheckbox').value;
            //         this.onSave.emit(this.creditCardFields);
            //     } else {
            //         // For my wallet
            //         this.isSaving = true;
            //         this.creditCardFields.cardHolderName = this.creditCardForm.get('creditCardName').value;
            //         this.creditCardFields.expiryDateMonth = this.expiryDateForm.get('creditCardExpiryDateMonth').value;
            //         this.creditCardFields.expiryDateYear = this.expiryDateForm.get('creditCardExpiryDateYear').value;
            //         this.onSave.emit(this.creditCardFields);
            //     }
            // },
            // (error) => {
            //     this.isSaving = false;
            //     console.error('Error in paymentApiGeneratePayment', error);
            // });
        } else {
            this.touchFields();
        }

    }

    public removeListeners() {
        this.receiveMessage();
    }

    public touchFields() {
        this.creditCardForm.get('creditCardName').markAsTouched();
        // this.creditCardForm.get('creditCardNumber').markAsTouched();
        this.expiryDateForm.get('creditCardExpiryDateMonth').markAsTouched();
        this.expiryDateForm.get('creditCardExpiryDateYear').markAsTouched();
    }

    public isVisaCardValidated() {
        return !this.showVisacardLogo || !this.showMCcardLogo;
    }

    public convertExpDate(expData: string) {
        let month: string;
        let day: string;
        let mon = Number(expData.split('/')[0]);
        let year = Number((Number(expData.split('/')[1]) < 90) ? '20' + expData.split('/')[1] : '19' + expData.split('/')[1]);
        let date = new Date(year, mon, 0);
        if (mon <= 9) {
            month = '0' + mon.toString();
        } else { month = mon.toString(); }
        if (date.getDate() <= 9) {
            day = '0' + day;
        } else { day = date.getDate().toString(); }
        return [year, month, day].join('-');
    }

    public cancelPayment() {
        this.onCancel.emit();
    }

    public handleSapError(errorField: string) {
        switch (errorField) {
            case 'creditcardnumber':
                return true;
            default:
                return false;
        }
    }

    /**
     * Splits the CC number into 4 blocks of 4.
     *
     * @param {any} event
     *
     * @memberof PaymentMethodsCreditCardComponent
     */
    // public spitCCNumber(event) {
    //     this.creditCardForm.get('creditCardNumber').setValue(CreditCard.formatCardNumber(event));
    // }

    /**
     * Returns a list of months as MM
     *
     * @returns Array
     *
     * @memberOf PaymentMethodsCreditCardComponent
     */
    public returnMonths() {
        let count = 0;
        let months = [];
        while (count < 12) {
            let monthAsMM = moment().month(count++).format('MM');
            months.push(
                { value: monthAsMM, viewValue: monthAsMM }
            );
        }
        return months;
    }

    /**
     * Returns a list of years as YY from the current date + 20 superceeding years
     *
     * @returns Array
     *
     * @memberOf PaymentMethodsCreditCardComponent
     */
    public returnYears() {
        let dateStart = moment().toISOString();
        let dateEnd = moment().add(20, 'years');
        let years = moment(dateEnd).diff(dateStart, 'years');
        let yearsBetween = [];
        for (let year = 0; year < years; year++) {
            let yearAsYYYYY = moment(dateStart).add(year, 'year').format('YYYY');
            yearsBetween.push(
                { value: yearAsYYYYY, viewValue: yearAsYYYYY }
            );
        }
        return yearsBetween;
    }
}

export class CreditCardFields {
    public creditCardNumber: string = '';
    public cardType: CardType;
    public creditCardReference: string = '';
    public cardHolderName: string = '';
    public expiryDateMonth: string = '';
    public expiryDateYear: string = '';
    public expiryDate: string = '';
    public storeCardCheckbox: boolean;
    public paymentArrangementType?: PaymentArrangementType;
}
