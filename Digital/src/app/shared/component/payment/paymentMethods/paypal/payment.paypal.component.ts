import { Component, Input } from '@angular/core';
import { PaymentMethodName } from '../../../../globals/paygConstants';
import { PaymentContentModel } from '../../../../model/payment/paymentContent.model';
import { PaymentDetails } from '../../../../model/payment/paymentDetails.model';
import { ConfigService } from '../../../../service/config.service';
import { PaypalApiService } from '../../../../service/paypalApi.service';

import { IMessageBusService } from '../../../../service/contract/imessageBus.service';
import { DataLayerService } from '../../../../service/dataLayer.service';

@Component({
    selector: 'agl-payment-paypal',
    templateUrl: './payment.paypal.component.html',
    styleUrls: ['./payment.paypal.component.scss']
})
export class PaymentPaypalComponent {

    @Input() public paymentDetails: PaymentDetails;
    @Input() public content: PaymentContentModel;

    // Set properties
    public paymentAmount: any;
    public amountValid: Boolean = false;
    public buttonDisabled: Boolean = false;
    public currentPage = window.location.href.replace('/bills', '/overview');
    public bonusAmount: number;
    public hasError: Boolean;
    public errorMessageHeader: string = 'Paypal Error';
    public errorMessage: string = 'There seems to be an error with your paypal transaction.  Please try again later.';
    public paypalLoading: Boolean;

    // Name needs to be unique so just generating a random one
    public profileName = Math.random().toString(36).substring(7);

    constructor(
        private _config: ConfigService,
        private _api: PaypalApiService,
        private _messageBusService: IMessageBusService,
        private _dataLayer: DataLayerService) { }

    /**
     * When a user clicks Pay by PayPal this function is called.
     */
    public payByPayPal() {
        // Code validation step
        if (this.amountValid) {
            this.paypalConfiguration();
            this.buttonDisabled = true;
        }
    }

    /**
     * Configure paypal using our own API
     * @return object paypal config
     */
    private paypalConfiguration() {
        /**
         * The relevent payment details for paypal.
         * @type {Object}
         */
        this.paypalLoading = true;
        this.hasError = false;

        // set off a timeout to make sure that it is not taking too long
        setTimeout(() => {
            if (this.paypalLoading) {
                this.showError();
            }
        }, 10000);
        let paymentDetails = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url: this.currentPage + '?successpp=true',
                cancel_url: this.currentPage + '?cancelpp=true'
            },
            transactions: [{
                amount: {
                    total: this.paymentAmount,
                    currency: 'AUD',
                    details: {
                        shipping: '0'
                    }
                },
                description: `${this.paymentDetails.fuelType}|${this.paymentDetails.address}`,
                custom: `${this.paymentDetails.referenceNumber}`
            }],
            experience_profile_id: '',
        };

        /**
         * Sets the profile for PayPal, including logo's etc..
         * @type {Object}
         */
        let webProfile = {
            name: this.profileName,
            presentation: {
                brand_name: 'AGL',
                logo_image: 'https://www.agl.com.au/-/media/Project/Primary/Logos/AGL_Logo_primary.png',
                locale_code: 'AU'
            },
            input_fields: {
                no_shipping: 1
            }
        };

        // Get the API and follow the rest of the functionality.
        try {
            this._api.getApiToken().subscribe((token) => {
                let resultForToken: any = token;
                // Set authToken in localStorage.
                localStorage.setItem('selfService.payPalAuthToken', 'Bearer ' + resultForToken.access_token);

                // Set the webapi profile
                this._api.setWebProfile(webProfile).subscribe((content) => {
                    let webProfileContent: any = content;

                    // Once the api profile is set, make the payment and redirect the user.
                    this._api.sendPayment(paymentDetails, webProfileContent.id).subscribe((details) => {
                        let paymentDetailObject: any = details;
                        if (paymentDetailObject.payer.payment_method.toLowerCase() === 'paypal') {
                            let redirectUrl = this.currentPage + this._config.current.sitecoreApiBaseUrl;
                            // tslint:disable-next-line:prefer-for-of
                            for (let i = 0; i < paymentDetailObject.links.length; i++) {
                                let link = paymentDetailObject.links[i];
                                if (link.method === 'REDIRECT') {
                                    redirectUrl = link.href + '&useraction=commit';
                                }
                            }
                            // Store reference locally (cannot store elsewhere)
                            let paypalDetails = {
                                referenceNumber: this.paymentDetails.referenceNumber,
                                contractNumber: this.paymentDetails.contractNumber,
                                isPayg: this.paymentDetails.isPayg,
                                paygBand: this.paymentDetails.paygBand,
                                bonusAmount: this.bonusAmount,
                                fuelType: this.paymentDetails.fuelType,
                                address: this.paymentDetails.address,
                                prePaymentDate: this.paymentDetails.prePaymentDate,
                                showOutstandingBillPayg : this.paymentDetails.showOutstandingBillPayg
                            };
                            localStorage.setItem('selfService.payPal', JSON.stringify(paypalDetails));
                            window.location.href = redirectUrl;
                        }
                    });
                });
            }
            );
        } catch (err) {
            this.showError();
        }
    }

    private showError() {
        this._dataLayer.pushPaymentError('Payment outcome – paypal Failure', 'Error occurred while make payment using paypal', PaymentMethodName.PayPal, []);
        this.hasError = true;
        this.paypalLoading = false;
    }

}
