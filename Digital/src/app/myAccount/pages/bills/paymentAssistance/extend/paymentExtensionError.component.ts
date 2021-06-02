import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'agl-payment-extension-error',
    templateUrl: './paymentExtensionError.component.html',
    styleUrls: ['./paymentExtensionError.component.scss']
})
export class PaymentExtensionErrorComponent {

    constructor(private router: Router) {}

    public goToOverview() {
        this.router.navigate(['/overview']);
    }
}
