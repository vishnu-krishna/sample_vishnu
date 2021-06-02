import { Component, Input } from '@angular/core';
import { MyWalletAccountDetailsModel } from '../deletePaymentMethod.component';

@Component({
    selector: 'agl-account-details-delete-payment-method',
    templateUrl: './accountDetails.deletePaymentMethod.component.html',
    styleUrls: ['./accountDetails.deletePaymentMethod.component.scss']
})

export class AccountDetailsDeletePaymentMethodComponent {
    @Input() public accountDetails: MyWalletAccountDetailsModel[];
    @Input() public paymentMethodType: string;
}
