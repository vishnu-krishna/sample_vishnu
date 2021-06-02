import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RewardsAnalytics } from '../../rewards-analytics';

@Component({
    selector: 'agl-rewards-discounts',
    templateUrl: './rewards-discounts.component.html',
    styleUrls: ['./rewards-discounts.component.scss']
})
export class RewardsDiscountsComponent {
    private hideNavigation: boolean = false;

    constructor(private router: Router, private analytics: RewardsAnalytics) {}

    public viewBillsClick() {
        this.analytics.trackClickViewYourBills();
        this.router.navigate(['/bills']);
    }
    public backClick() {
        window.history.back();
    }
}
