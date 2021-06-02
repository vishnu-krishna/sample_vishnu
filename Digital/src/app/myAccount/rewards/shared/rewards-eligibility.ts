import { FromJSON, JSONMapper } from './json-mapper';

export class RewardsEligibility implements FromJSON {
    public isEligible: boolean = false;
    public hasRedeemableOffers: boolean = false;

    public fromJSON(json: any) {
        JSONMapper.fromJSON(json, this);
    }
}
