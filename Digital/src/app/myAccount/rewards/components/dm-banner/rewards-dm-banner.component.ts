import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { RewardsAnalytics } from '../../rewards-analytics';
import { IRewardsService } from '../../services/contract/iRewards.service';
import { RewardsOffer } from '../../shared/rewards-offer';
import { RewardsOfferRedemption } from '../../shared/rewards-offer-redemption';
import { RewardsDMBTermsConditionsComponent } from './terms-conditions/rewards-dmb-terms-conditions.component';

@Component({
    selector: 'agl-rewards-dm-banner',
    templateUrl: './rewards-dm-banner.component.html',
    styleUrls: ['./rewards-dm-banner.component.scss']
})
export class RewardsDMBannerComponent {
    @Input() public offer: RewardsOffer = new RewardsOffer();
    @Input() public errorMessage: string = '';
    @Output() public offerRedemmed = new EventEmitter();
    @Output() public offerClosed = new EventEmitter();
    public redmeptionDetails: RewardsOfferRedemption;
    public redeemingOffer: boolean = false; // for showing on ui that something is happening / need to wait

    constructor(public dialog: MatDialog, private rewardsService: IRewardsService, private analytics: RewardsAnalytics) {}

    public closeClicked() {
        this.offer.offerClosed = true;
        this.redmeptionDetails = null;
        this.errorMessage = '';
        this.offerClosed.emit();
    }

    public redeemOffer() {
        this.analytics.trackClickRedeemOffer();

        this.redeemingOffer = true;
        this.offer.redemptionAttempted = true;
        this.rewardsService.redeemOffer(this.offer.offerId)
        .finally(() => {
            this.offerRedemmed.emit();
            this.redeemingOffer = false;
        })
        .subscribe((result) => {
            this.offer.offerRedemmed = true;
            this.redmeptionDetails = result;
        },
        (err) => {
            this.errorMessage = "We're sorry for the inconvenience, but your Rewards offer is currently unavailable. Please check back soon.";
        });
    }

    public showBanner(): boolean {
        return !!this.offer || !!this.errorMessage;
    }

    public viewTermsAndConditions() {
        this.analytics.trackClickOfferTC();

        this.dialog.open(RewardsDMBTermsConditionsComponent, {
            data: this.offer,
            panelClass: 'agl-dialog--mobile-full-screen'
        });
    }
}
