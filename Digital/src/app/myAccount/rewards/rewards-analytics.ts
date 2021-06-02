import { Injectable } from '@angular/core';

import { DataLayerService, EventAction, EventCategory, EventLabel, ModalName } from '../../shared/service/dataLayer.service';

@Injectable()
export class RewardsAnalytics {

    constructor(private dataLayer: DataLayerService) { }

    public trackClickDiscountsLearnMore() {
        this.trackClick(EventLabel.RewardsDiscountsLearnMore);
    }

    public trackClickFlybuysViewDetails() {
        this.trackClick(EventLabel.RewardsFlybuysViewDetails);
    }

    public trackClickRedeemOffer() {
        this.trackClick(EventLabel.RewardsRedeemOffer);
    }

    public trackClickOfferTC() {
        this.trackClick(EventLabel.RewardsOfferTermsAndConditions);
    }

    public trackClickViewYourBills() {
        this.trackClick(EventLabel.RewardsDiscountsViewYourBills);
    }

    public trackClickFlybuysTransactionsSeeMore() {
        this.trackClick(EventLabel.RewardsFlybuysTransactionsSeeMore);
    }

    public trackClickFlybuysTransactionsSeeLess() {
        this.trackClick(EventLabel.RewardsFlybuysTransactionsSeeLess);
    }

    public trackClickAglRewardsActivation() {
        this.trackClick(EventLabel.ActivateAglRewards);
    }

    public trackClickBenefitsTermsConditions() {
        this.trackClick(EventLabel.ShowAglRewardsTermsConditions);
    }

    public trackNavigateToBenefitInAglRewards(event: any) {
        this.trackEvent(EventLabel.ShowBenefitInAglRewards, event, EventAction.ClickAction);
    }

    public trackBenefitsDisplayed(event: any) {
        this.trackEvent(EventLabel.ShowBenefitsInMyAccount, event, EventAction.ShowBenefits);
    }

    public trackNavigateToAglRewardsError() {
        this.trackClick(EventLabel.LoadAglRewardsWebsiteError);
    }

    public trackNavigateToAglRewards() {
        this.trackClick(EventLabel.NavigateToAGLRewards);
    }

    protected trackClick(label: EventLabel) {
        this.dataLayer.pushClickEvent(ModalName.None, EventCategory.Rewards, EventAction.ClickAction, label);
    }

    protected trackEvent(label: EventLabel, event: any, eventAction: EventAction) {
        try {
            this.dataLayer.pushEvent(ModalName.None, EventCategory.AglRewards, eventAction, label, event);
        } catch (error) {
            console.error(error);
        }
    }
}

export class RewardsAnalyticsMock extends RewardsAnalytics {

    constructor() {
        super(null);
    }

    protected trackClick(label: EventLabel) {
        // do nothing in the mock
    }

    protected trackEvent(label: EventLabel, event: any, eventAction: EventAction) {
        // do nothing in the mock
    }
}
