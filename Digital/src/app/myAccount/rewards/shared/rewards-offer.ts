import { FromJSON, JSONMapper } from './json-mapper';

export class RewardsOffer implements FromJSON {
    public offerId: string = '';
    public contractAccount: number = null;
    public contractNumber: number = null;
    public validFrom: string = '';
    public validTo: string = '';
    public offerValue: number = 0;
    public offerValueType: string = '';
    // local property to help keep track of what offer has been successfully redemeed
    public offerRedemmed: boolean = false;
    public offerClosed: boolean = false;
    public redemptionAttempted: boolean = false;
    public content: RewardsOfferContent = new RewardsOfferContent();

    public fromJSON(json: any) {
        JSONMapper.fromJSON(json, this);
    }
}

export class RewardsOfferContent implements FromJSON {
    public heading: string = '';
    public description: string = '';
    public iconUri: string = '';
    public callToAction: string = '';
    public termsAndConditions: RewardsOfferTermsAndCondition = new RewardsOfferTermsAndCondition();

    public fromJSON(json: any) {
        JSONMapper.fromJSON(json, this);
    }
}

export class RewardsOfferTermsAndCondition implements FromJSON {
    public description: string = '';

    public fromJSON(json: any) {
        JSONMapper.fromJSON(json, this);
    }
}
