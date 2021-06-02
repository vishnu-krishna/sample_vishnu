import { Observable } from 'rxjs/Rx';

import { RewardsDiscountSummary } from '../../shared/rewards-discount-summary';
import { RewardsFlybuysSummary } from '../../shared/rewards-flybuys-summary';
import { RewardsOffer } from '../../shared/rewards-offer';
import { RewardsOfferRedemption } from '../../shared/rewards-offer-redemption';
import { Benefit, BenefitsStatus } from '../../shared/benefit';

export abstract class IRewardsService {
    public abstract getDiscountSummary(): Observable<RewardsDiscountSummary>;
    public abstract getFlybuysSummary(): Observable<RewardsFlybuysSummary>;
    public abstract getFlybuys(): Observable<any>;
    public abstract getOffers(): Observable<RewardsOffer[]>;
    public abstract redeemOffer(offerId): Observable<RewardsOfferRedemption>;
    public abstract getBenefitsStatus(): Observable<BenefitsStatus>;
    public abstract activateBenefits(): Observable<any>;
    public abstract getBenefits(): Observable<Benefit[]>;
    public abstract getAglRewardsToken(): Observable<any>;
}
