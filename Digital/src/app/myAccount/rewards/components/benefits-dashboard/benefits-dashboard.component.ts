import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Benefit } from '../../shared/benefit';

import { RewardsAnalytics } from '../../rewards-analytics';
@Component({
    selector: 'agl-benefits-dashboard',
    templateUrl: './benefits-dashboard.component.html',
    styleUrls: ['./benefits-dashboard.component.scss']
})
export class BenefitsDashboardComponent {
    @Input() public messageTitle = 'Welcome to your AGL Rewards experience!';
    @Input() public messageText = 'Check out the below benefits and start saving.';
    @Input() public benefits: Benefit[] = [];
    @Output() public aglRewardsClick = new EventEmitter<Benefit>();

    private activeBenefitTileIndex = 0;

    public activeBenefitTileChange(index: number) {
        this.activeBenefitTileIndex = index;
    }

    public isActive(index: number): boolean {
        return this.activeBenefitTileIndex === index;
    }

    public benefitImageUrlStyle(benefit: Benefit): string {
        return benefit.image ? 'url(' + benefit.image + ')' : '';
    }

    public navigateToAglRewards(benefit: Benefit = null) {
        this.aglRewardsClick.emit(benefit);
    }
}
