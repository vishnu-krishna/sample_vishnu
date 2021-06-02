import { FromJSON, JSONMapper } from './json-mapper';

export class RewardsOfferRedemption implements FromJSON {
    public heading: string = '';
    public description: number = null;

    public fromJSON(json: any) {
        JSONMapper.fromJSON(json, this);
    }
}
