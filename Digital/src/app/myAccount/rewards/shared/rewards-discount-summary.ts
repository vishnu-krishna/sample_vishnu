import { FromJSON, JSONMapper } from './json-mapper';
import { RewardsSummary } from './rewards-summary';

export class RewardsDiscountSummaryDetail implements FromJSON {
    public startDate: string = '';
    public totalDiscount: number = 0;

    public fromJSON(json: any) {
        JSONMapper.fromJSON(json, this);
    }
}

export class RewardsDiscountSummary extends RewardsSummary {
    public summary: RewardsDiscountSummaryDetail = new RewardsDiscountSummaryDetail();
}
