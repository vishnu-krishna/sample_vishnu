import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { MenuIndicatorMessage } from '../../../../shared/messages/menuIndicator.message';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { IRewardsService } from '../../services/contract/iRewards.service';
import { IRewardsEligibilityService } from '../../services/contract/iRewardsEligibility.service';
import { RewardsFlybuysSummary } from '../../shared/rewards-flybuys-summary';
import { RewardsDiscountSummary } from '../../shared/rewards-discount-summary';
import { RewardsOffer } from '../../shared/rewards-offer';
import { Benefit, BenefitsStatus } from '../../shared/benefit';
import { RewardsEligibility } from '../../shared/rewards-eligibility';
import { PageScroller } from '../../shared/page-scroller';
import { RewardsAnalytics } from '../../rewards-analytics';
import { ConfigService } from '../../../../shared/service/config.service';

@Component({
    selector: 'agl-rewards-main',
    templateUrl: './rewards.component.html',
    styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
    public isDataLoading: boolean = true;
    public flybuysSummary: RewardsFlybuysSummary = new RewardsFlybuysSummary();
    public discountSummary: RewardsDiscountSummary = new RewardsDiscountSummary();
    public offers: RewardsOffer[] = [];
    public offersErrorMessage: string = '';
    public currentOffer: RewardsOffer;
    public allOffersRedeemed: boolean = false; // used to immediately hide offers banner instead of animating it out with nothing showing
    public allOffersClosed: boolean = false; // used to immediately hide offers banner instead of animating it out with nothing showing
    public benefits: Benefit[] = [];

    // for rewards phase 2 status check when the customer is not eligible or api fails, the status is false - do not show the rewards section
    public isEligibleForBenefits: boolean = true;
    public isBenefitsActive: boolean = false;
    public benefitsLoadError: boolean = false;
    public isBenefitsActivateError: boolean = false;
    public isNavigationToAglRewardsError: boolean = false;

    constructor(private rewardsService: IRewardsService, public messageBus: IMessageBusService, private eligibilityService: IRewardsEligibilityService, private router: Router, private analytics: RewardsAnalytics, private configService: ConfigService) {   }

    public ngOnInit() {
        Observable.forkJoin(
            this.rewardsService.getFlybuysSummary(),
            this.rewardsService.getDiscountSummary(),
            this.loadBenefitsAndStatus()
        ).subscribe(([flybuysSummary, discountSummary, benefitsModel]) => {
            this.flybuysSummary = flybuysSummary;
            this.discountSummary = discountSummary;
            this.isBenefitsActive = benefitsModel.benefitsStatus;
            this.benefits = benefitsModel.benefitsTiles;
            this.isEligibleForBenefits = benefitsModel.benefitsEligibility;
            this.isDataLoading = false;

            this.loadOffers();
            this.recordAnalyitcsForBenefits(this.benefits);
        });
    }

    public showFlybuys(): boolean {
        return this.flybuysSummary.isActive();
    }

    public showDiscounts(): boolean {
        return this.discountSummary.isActive();
    }

    public onOfferClosed() {
        if (this.currentOffer.offerRedemmed) {
            let offers = this.offers.filter((o) => !o.offerRedemmed  || !o.offerClosed);
            if (offers.length > 0) {
                this.currentOffer =  offers[0];
            } else {
                this.currentOffer = null;
                this.allOffersClosed = true;
            }
        }
    }

    public onOfferRedeemed() {
        let redemmedOffers = this.offers.filter((o) => o.offerRedemmed);
        if (redemmedOffers && (redemmedOffers.length === this.offers.length)) {
            this.messageBus.broadcast(new MenuIndicatorMessage('Rewards', false));
            this.allOffersRedeemed = true;
        }
    }

    public activateBenefits() {
        this.rewardsService.activateBenefits().subscribe(() => {
            this.isBenefitsActive = true;
            PageScroller.scrollIntoViewFromTop('.benefits-container', 60, 1, 100);
            this.rewardsService.getBenefits().subscribe((benefits) => {
                this.benefits = benefits;
                this.isBenefitsActivateError = false;

                this.recordAnalyitcsForBenefits(this.benefits);
            }, (error) => {
                this.benefitsLoadError = true;
            });
        }, (error) => {
            this.isBenefitsActive = false;
            this.isBenefitsActivateError = true;
        });
    }

    public showBenefitsSection(): boolean {
        return this.isEligibleForBenefits && !this.benefitsLoadError;
    }

    public showActiveStaticBanner(): boolean {
        return (this.isEligibleForBenefits && this.isBenefitsActive && !this.benefitsLoadError);
    }

    public showBenefitsDashboard(): boolean {
        return (this.isBenefitsActive && this.benefits.length !== 0);
    }

    public showRewardsBanner(): boolean {
        return (!this.isEligibleForBenefits && !this.benefitsLoadError);
    }

    public navigateBackToRewards($event) {
        this.isBenefitsActivateError = false;
        this.isNavigationToAglRewardsError = false;
    }

    public showAglRewardsErrorPage() {
        this.isNavigationToAglRewardsError = true;
        this.analytics.trackNavigateToAglRewardsError();
    }

    public navigateToAglRewards(benefit: Benefit = null) {
        if (benefit) {
            this.analytics.trackNavigateToBenefitInAglRewards(this.getBenefitAnalyticsEvent(benefit));
        } else {
            this.analytics.trackNavigateToAglRewards();
        }

        let hWindow = window.open('', '_blank');
        hWindow.document.write(require('../../../static/agl-rewards.html'));
        this.rewardsService.getAglRewardsToken().subscribe((res) => {
            let url = benefit ? benefit.url : '';
            if (res.token) {
                let externalUrl = `${this.configService.current.aglRewardsExternalBaseUrl}${url}?token=${res.token}`;
                hWindow.location.href = encodeURI(externalUrl);
            } else {
                hWindow.close();
                this.showAglRewardsErrorPage();
            }
        }, (err) => {
            console.error(err);
            hWindow.close();
            if (err.status !== 401) {
                this.showAglRewardsErrorPage();
            }
        });
    }

    private loadOffers() {
        this.rewardsService.getOffers().subscribe((results) => {
            this.offers = results;
            if (this.offers && this.offers.length) {
                this.currentOffer = this.offers[0];
            }
        }, (error) => this.offers = []);
    }

    private loadBenefitsAndStatus(): Observable<BenefitsModel> {
        const result: BenefitsModel = new BenefitsModel();
        this.benefitsLoadError = false;

        return this.eligibilityService.isEligibleForBenefits().flatMap((isEligibleForBenefits) => {
            if (isEligibleForBenefits) {
                result.benefitsEligibility = isEligibleForBenefits;
                return this.rewardsService.getBenefitsStatus().flatMap((benefitsStatus) => {
                    if (benefitsStatus.isBenefitsStatusActive) {
                        return this.rewardsService.getBenefits().flatMap((benefits) => {
                            result.benefitsStatus = true;
                            result.benefitsTiles = benefits;
                            return Observable.of(result);
                        });
                    } else {
                        return Observable.of(result);
                    }
                }).catch( (error) => {
                    this.benefitsLoadError = true;
                    return Observable.of(result);
                });
            } else {
                return Observable.of(result);
            }
        });
    }

    private getBenefitAnalyticsEvent(benefit: Benefit) {
        return {
            benefitId: benefit.benefitId,
            title: benefit.title,
            segment: benefit.segment,
            category: benefit.category
         };
    }

    private recordAnalyitcsForBenefits(benefits: Benefit[]) {
        benefits.forEach((benefit) => {
           this.analytics.trackBenefitsDisplayed(this.getBenefitAnalyticsEvent(benefit));
        });
    }
}

class BenefitsModel {
    public benefitsEligibility: boolean = false;
    public benefitsStatus: boolean = false;
    public benefitsTiles: Benefit[] = [];
}
