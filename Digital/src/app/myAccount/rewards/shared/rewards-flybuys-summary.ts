import { FromJSON, JSONMapper } from './json-mapper';
import { RewardsSummary } from './rewards-summary';

export class RewardsFlybuysSummaryDetail implements FromJSON {
    public totalPoints: number = 0;

    public fromJSON(json: any) {
        JSONMapper.fromJSON(json, this);
    }
}

export class RewardsFlybuysSummary extends RewardsSummary {
    public summary: RewardsFlybuysSummaryDetail = new RewardsFlybuysSummaryDetail();
}
