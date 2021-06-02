import { UsageDataModel } from '../../model/usage/usageData.model';
import { UsageGraphViewModel } from '../../model/usage/usageGraphView.model';

export abstract class IUsageRenderingService {
    public abstract getChartDataFromUsageInfo( usageInfo: UsageDataModel, graphGranularity ): UsageGraphViewModel;
    public abstract calculateAverage(daysInSelectedPeriod: number, value: number);
    public abstract formatValueToString( value: number ): string;
}
