import { BonusBandApiModel } from './bonusBandApi.model';
export class BonusEligible {
    public isEligible: boolean;
    public reason: string;
    public currentBonusLevel: BonusBandApiModel;
    public nextBonusLevel: BonusBandApiModel;
}
