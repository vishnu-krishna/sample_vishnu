import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPaymentMethodsService } from '../../services/settings/paymentMethods.service.interface';

import { PaymentArrangementContent } from '../../../shared/model/domain/paymentArrangement/paymentArrangementContent.model';

@Component({
    selector: 'agl-store-paypal-form',
    templateUrl: './storePaypalForm.component.html',
    styleUrls: ['./storePaypalForm.component.scss']
})
export class StorePaypalFormComponent implements OnInit {
    @Input() public data;
    @Output() public returnToPreviousPage = new EventEmitter();
    public content: PaymentArrangementContent;
    public paypalLoading: boolean = false;

    constructor(
        private paymentMethodService: IPaymentMethodsService
    ) { }

    public ngOnInit() {
        this.content = new PaymentArrangementContent();
        this.content.paypalDescription = 'AGL does not charge a fee when you pay by PayPal';
        this.content.paymentArrangementTermsAndConditionCheckBox = 'I confirm that I have read and agree to the <a target=\"_blank\" href=\"https://www.agl.com.au/residential/help-and-support/billing-and-payments/bill-payment-options/direct-debit-terms-and-conditions">Direct Debit terms and conditions.</a>';
        this.content.paypalButtonLabelText = 'Proceed To Paypal';
        this.content.paypalPaymentCondition = '<p>Payments submitted before 6pm AEST will reach your account by the next business day.</p>' +
            '<p>Any payments submitted after 6pm AEST will take up to 2 business day to reach your account. ' +
            'If you have paid your outstanding bills in full, you can disregard any payment reminder notices during this period</p>';

    }

    public goBack() {
        this.returnToPreviousPage.emit(true);
    }

    public setupPaypal() {
        let url = location.toString();
        if (url.indexOf('?') > -1) {
            url = url.slice(0, url.indexOf('?'));
        }
        let data = {
            ReturnUrl: url + '?paypal=1',
            CancelUrl: url + '?paypal=0',
            ContractAccountNumber: this.data.contractAccountNumber
        };
        this.paypalLoading = true;
        this.paymentMethodService.getPaypalToken(data).subscribe(
            (response) => {
                localStorage.setItem('selfService.payPalDDContractNumber', `${this.data.contractAccountNumber}`);
                window.location.href = response;
            }
        );
    }
}
