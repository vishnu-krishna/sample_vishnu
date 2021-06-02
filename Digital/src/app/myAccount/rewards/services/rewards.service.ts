import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { IRewardsApiService } from './contract/iRewardsApi.service';
import { RewardsDiscountSummary } from '../shared/rewards-discount-summary';
import { RewardsFlybuysSummary } from '../shared/rewards-flybuys-summary';
import { RewardsFlybuysTransaction } from '../shared/rewards-flybuys-transaction';
import { RewardsOffer } from '../shared/rewards-offer';
import { RewardsOfferRedemption } from '../shared/rewards-offer-redemption';
import { Benefit, BenefitsStatus } from '../shared/benefit';

@Injectable()
export class RewardsService {
    private readonly discountSummaryUrl = '/v1/discounts/summary';
    private readonly flybuysSummaryUrl = '/v1/flybuys/summary';
    private readonly flybuysUrl = '/v1/flybuys';
    private readonly offersUrl = '/v1/offers';
    private readonly benefitsStatusUrl = '/v1/benefits/status';
    private readonly benefitsActivateUrl = '/v1/benefits/activate';
    private readonly benefitsUrl = '/v1/benefits';
    private readonly benefitsTokenUrl = '/v1/benefits/token';

    constructor(private api: IRewardsApiService) { }

    public getDiscountSummary(): Observable<RewardsDiscountSummary> {
        let result = new RewardsDiscountSummary();

        return this.api.get(this.discountSummaryUrl).map((responseJson) => {
            result.fromJSON(responseJson);
            return result;
        }).catch((err) => {
            console.error(err);
            return Observable.of(result);
        });
    }

    public getFlybuysSummary(): Observable<RewardsFlybuysSummary> {
        let result = new RewardsFlybuysSummary();

        return this.api.get(this.flybuysSummaryUrl).map((responseJson) => {
            result.fromJSON(responseJson);
            return result;
        }).catch((err) => {
            console.error(err);
            return Observable.of(result);
        });
    }

    public getFlybuys(): Observable<RewardsFlybuysTransaction[]> {
        return this.api.get(this.flybuysUrl).map((responseJson) => {
            let results: RewardsFlybuysTransaction[] = [];
            if (responseJson) {
                results = responseJson.map((flybuyJson) => {
                    let transaction = new RewardsFlybuysTransaction();
                    transaction.fromJSON(flybuyJson);
                    return transaction;
                });
            }
            return results;
        }).catch((err) => {
            console.error(err);
            return Observable.throw(err);
        });
    }

    public getOffers(): Observable<RewardsOffer[]> {
        return this.api.get(this.offersUrl).map((responseJson) => {
            let results: RewardsOffer[] = [];
            if (responseJson) {
                results = responseJson.map((json) => {
                    let offer = new RewardsOffer();
                    offer.fromJSON(json);
                    return offer;
                });
            }
            return results;
        }).catch((err) => {
            console.error(err);
            return Observable.throw(err);
        });
    }

    public redeemOffer(offerId): Observable<RewardsOfferRedemption> {
        return this.api.post(`${this.offersUrl}/${offerId}/redemption`, null).map((responseJson) => {
            let result: RewardsOfferRedemption;
            if (responseJson) {
                let redemptionResult = new RewardsOfferRedemption();
                redemptionResult.fromJSON(responseJson);
                return redemptionResult;
            }
            return result;
        }).catch((err) => {
            console.error(err);
            return Observable.throw(err);
        });
    }

    public getBenefitsStatus(): Observable<BenefitsStatus> {
        return this.api.get(this.benefitsStatusUrl).map((responseJson) => {
            return responseJson;
        }).catch((err) => {
            console.error(err);
            return Observable.throw(err);
        });
    }

    public activateBenefits(): Observable<boolean> {
        return this.api.put(this.benefitsActivateUrl, null).map( () => {
            return true;
        });
    }

    public getBenefits(): Observable<Benefit[]> {
        return this.api.get(this.benefitsUrl).map((responseJsonres) => {
            return responseJsonres;
        }).catch((err) => {
            console.error(err);
            return Observable.throw(err);
        });
    }

    public getAglRewardsToken(): Observable<string> {
        return this.api.post(this.benefitsTokenUrl, {}).map((responseJsonres) => {
            return responseJsonres;
        }).catch((error) => {
            console.error(error);
            return Observable.throw(error);
        });
    }
}
