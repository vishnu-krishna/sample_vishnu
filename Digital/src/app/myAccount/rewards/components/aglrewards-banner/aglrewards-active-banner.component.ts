import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'agl-rewards-active-banner',
    templateUrl: './aglrewards-active-banner.component.html',
    styleUrls: ['./aglrewards-active-banner.component.scss']
})
export class AGLRewardsActiveBannerComponent {
    @Output() public aglRewardsClick = new EventEmitter();

    public navigateToAglRewards() {
       this.aglRewardsClick.emit();
    }

}
