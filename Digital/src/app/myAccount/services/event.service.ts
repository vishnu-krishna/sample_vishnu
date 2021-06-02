import { Injectable } from '@angular/core';
declare let leanengage: any;

@Injectable()
export class EventService {
    private paymentIsPaid = false;
    private isPaymentSuccess = false;

    /**
     * Payment, will return as a paymentaspaid.
     * @param  {boolean} paid has there been a payment
     * @return {boolean}       was the payment made
     */
    public payment(paid: boolean) {
        if (paid) {
            this.paymentIsPaid = true;
        } else {
            this.paymentIsPaid = false;
        }
    }

    public paymentSuccess(paid: boolean, type) {
        if (paid) {
            this.isPaymentSuccess = true;
            if (type === 'payg') {
                leanengage('triggerSurvey', 'my-account-v2-survey-pay-now', { customData: { version: 'payg' } });
            } else {
                leanengage('triggerSurvey', 'my-account-v2-survey-pay-now', { customData: { version: 'non-payg' } });
            }
        } else {
            this.isPaymentSuccess = false;
        }
    }

    /**
     * Get the payment, check if it was paid.
     * @return {boolean} true or false.
     */
    public getPayment() {
        return this.paymentIsPaid;
    }
}
