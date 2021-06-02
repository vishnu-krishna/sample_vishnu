import { UsageDatumModel } from './usageDatum.model';

export class UsageDataModel {
    public account: string;
    public contract: string;
    public costs: UsageDatumModel[];
    public consumption: UsageDatumModel[];
    public hasNoBill: boolean;
}
