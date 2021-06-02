import { Reason } from './reason';
import { UsageBreakdownBillPeriod } from './usageBreakdownBillPeriod';
import { EnergyInsightsIneligibleReason } from '../../../pages/settings/energyInsights/energyInsightsIneligibleReason.enum';

export class EnergyInsightsEligibilityContract {

    public contractNumber: number;
    public isEligible: boolean;
    public ineligibleReason?: Reason;
    public subscribedToMidBillEnergyBreakdown?: boolean = false;
    public subscribedToEndBillEnergyBreakdown?: boolean = false;
    public availableUsageBreakdownBillPeriods?: UsageBreakdownBillPeriod[] = [];
    public ineligibilityMessage?: string;
    public reasonForIneligibility: EnergyInsightsIneligibleReason = EnergyInsightsIneligibleReason.Unknown;

}
