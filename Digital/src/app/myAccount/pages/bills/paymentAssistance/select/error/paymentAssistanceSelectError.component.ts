import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'agl-payment-assistance-select-error',
    templateUrl: './paymentAssistanceSelectError.component.html',
    styleUrls: ['./paymentAssistanceSelectError.component.scss']
})
export class PaymentAssistanceSelectErrorComponent {

    constructor(private router: Router) {}

    public goToOverview() {
        this.router.navigate(['/overview']);
    }
}
