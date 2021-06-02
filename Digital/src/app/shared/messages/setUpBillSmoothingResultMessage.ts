import { BaseMessage } from './base.message';
export class SetUpBillSmoothingResultMessage extends BaseMessage  {
    public startDate: Date;
    public saveResultDetails: SaveResultDetails[];
    public frequency: string;
}

interface SaveResultDetails {
    isSuccessful: boolean;
    fuel: string;
    amount: number;
}
