import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RewardsAnalytics } from '../../rewards-analytics';
@Component({
    selector: 'agl-benefits-activation',
    templateUrl: './benefits-activation.component.html',
    styleUrls: ['./benefits-activation.component.scss']
})
export class BenefitsActivationComponent {
    public activatingBenefits = false;
    @Output() public activateBenefitsStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private router: Router, private analytics: RewardsAnalytics) {}

    public activateBenefits() {
        this.analytics.trackClickAglRewardsActivation();
        this.activatingBenefits = true;
        this.activateBenefitsStatus.emit(true);
    }

    public showTermsAndConditions() {
        this.analytics.trackClickBenefitsTermsConditions();
        this.router.navigateByUrl('rewards/benefits/termsandconditions');
    }
}
