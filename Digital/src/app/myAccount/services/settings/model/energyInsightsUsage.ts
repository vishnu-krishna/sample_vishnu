import { EnergyInsightsUsageBreakdown } from './energyInsightsUsageBreakdown';
import { EnergyInsightsUsageCategory } from './energyUsageCategories';

export class EnergyInsightsUsage {
    public totalUsageCost: number;
    public highestMeasuredUsageCategory: EnergyInsightsUsageCategory;
    public hasUsageAmount: boolean;
    public usageBreakdown: EnergyInsightsUsageBreakdown[];
}
