import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';
import { ConfigService } from '../service/config.service';
import { ContentService } from '../service/content.service';

/**
 * An HTTP client service for consumption of the AGL Web API.
 * Encapsulates the HTTP transportation mechanism and applies common configuration
 * requirements such as JSON serialisation and deserialisation.
 */
@Injectable()
export class PaypalApiService {

    private _isProxyPayPal: boolean = false;

    private _payPalBaseUrl: string = this._config.current.aglWebPaymentApiBaseUrl;
    private _getApiTokenUrl: string = this._payPalBaseUrl + '/api/paybypaypal/GetToken';
    private _setWebProfileUrl: string = this._payPalBaseUrl + '/api/paybypaypal/SetWebProfile';
    private _sendPaymentUrl: string = this._payPalBaseUrl + '/api/paybypaypal/SendPayment';
    private _executePaymentUrl: string = this._payPalBaseUrl + '/api/paybypaypal/ExecutePayment';

    /**
     * Creates an instance of ApiService.
     */
    constructor(
        private _http: Http,
        private _config: ConfigService,
        private _contentService: ContentService
    ) {

        this._contentService.load()
            .subscribe((content) => {
                this._isProxyPayPal = !!content.selfService.isProxyPayPal;

                // TODO:GD REMOVE ONCE PAYPAL CHANGES VERIFIED IN PROD
                if (!this._isProxyPayPal) {
                        this._payPalBaseUrl = this._config.current.aglPalPalApiBaseUrl;
                        this._getApiTokenUrl = this._config.current.aglSiteCoreWebsiteBaseUrl + this._config.current.aglPayPalTokenUrl; // From sitecore
                        this._setWebProfileUrl = this._payPalBaseUrl + 'payment-experience/web-profiles/';
                        this._sendPaymentUrl = this._payPalBaseUrl + 'payments/payment/';
                        this._executePaymentUrl = this._payPalBaseUrl + 'payments/payment/##/execute';
                }
            });
    }

    /**
     * Get the paypalApi token
     * @return {Observable} this object contains the access_token.
     */
    public getApiToken(): Observable<{}> {
        return this.getToken({ url: this._getApiTokenUrl });
    }

    /**
     * Setup the webprofile to send to paypal
     * @param  {Object}     webProfile Contains the relevent fields for paypal profile information.
     * @return {Observable}            This object contains information invluding the ID for the profile.
     */
    public setWebProfile(webProfile: Object): Observable<{}> {
        return this.post(this._setWebProfileUrl, webProfile);
    }

    /**
     * Send the payment through to paypal
     * @param  {Object}     paymentObject Contains the payment detail object, that includes sale price.
     * @param  {string}     profileId     The profileID of the webprofile (sets the image logo etc..)
     * @return {Observable}               Returns the URL's that we can use to redirect.
     */
    public sendPayment(paymentObject: any, profileId: string): Observable<{}> {
        paymentObject.experience_profile_id = profileId;
        return this.post(this._sendPaymentUrl, paymentObject);
    }

    /**
     * Executes the payment through paypal
     * @param  {string}     paymentId The payment ID from the URL string
     * @param  {string}     payerId   The payer ID from the URL string
     * @return {Observable}           The success or failure of the
     */
    public executePayment(paymentId: string, payerId: string): Observable<{}> {
        // TODO:GD TIDY UP ONCE PAYPAL CHANGES VERIFIED IN PROD

        return new Observable((observer: Observer<{}>) => {
            this._contentService.load()
                .subscribe((content) => {
                    this._isProxyPayPal = !!content.selfService.isProxyPayPal;

                    // TODO:GD Keep Start
                    let executePaymentUrl: string = this.getExecutePaymentUrl(paymentId);

                    let data: any = { payerId: payerId, paymentId: paymentId };

                    // TODO:GD REMOVE BLOCK
                    if (!this._isProxyPayPal) {
                        data = { payer_id: payerId };
                    }

                    // TODO:GD Reinstate
                    // return this.post(executePaymentUrl, data);

                    // TODO:GD Keep End
                    this.post(executePaymentUrl, data).subscribe((paymentData) => {
                        observer.next(paymentData);
                        observer.complete();

                    },
                     (error) => {
                        observer.error(error);
                    });
                });
        });
    }

    private post<T>(url: string, data: any): Observable<T> {

        let body = '{}';
        let authToken = localStorage.getItem('selfService.payPalAuthToken');

        body = JSON.stringify(data);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('authorization', authToken);
        headers.append('accept', 'application/json');
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this._http.post(url, body, options)
            .catch((err) => {
                return Observable.throw(err.json());
            })
            .map((response) =>
                <T> response.json());
    }

    // TODO:GD REMOVE ONCE PAYPAL CHANGES VERIFIED IN PROD
    private getExecutePaymentUrl(paymentId: string): string {
        return this._executePaymentUrl.replace('##', paymentId);
    }

    /**
     * Get token
     */
    private getToken<T>(data): Observable<T> {
        let body = JSON.stringify({});
        let options = new RequestOptions({ withCredentials: false });

        return this._http.post(data.url, body, options)
            .catch((err) => {
                return Observable.throw(err.json());
            })
            .map((response) =>
                <T> response.json());
    }

}
