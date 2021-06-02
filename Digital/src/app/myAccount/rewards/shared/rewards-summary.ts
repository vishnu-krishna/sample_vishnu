import { FromJSON, JSONMapper } from './json-mapper';

export class RewardsSummary implements FromJSON {
    public isSummaryAvailable: boolean = false;
    public isAboveMinimumThreshold: boolean = false;

    public fromJSON(json: any) {
        JSONMapper.fromJSON(json, this);
    }

    public isActive(): boolean {
        return this.isSummaryAvailable && this.isAboveMinimumThreshold;
    }
}
