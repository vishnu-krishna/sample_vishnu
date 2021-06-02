import { FromJSON, JSONMapper } from './json-mapper';

export class RewardsFlybuysTransaction implements FromJSON {
    public contractAccount: number = 0;
    public contractNumber: number = 0;
    public lineNumber: string = '';
    public extractionDate: string = '';
    public transactionDescription: string = '';
    public points: number = 0;
    public pointsTransactionType: FlybuysPointsTransactionType = FlybuysPointsTransactionType.Credit;

    public isCredit(): boolean {
        return this.pointsTransactionType === FlybuysPointsTransactionType.Credit;
    }

    get adjustedPoints(): number {
        let result = this.points;
        if (!this.isCredit()) {
            result *= -1;
        }
        return result;
    }

    public fromJSON(json: any) {
        JSONMapper.fromJSON(json, this, {
            pointsTransactionType: (value: any) => FlybuysPointsTransactionType[value]
        });
    }
}

export enum FlybuysPointsTransactionType {
    Debit,
    Credit
}
