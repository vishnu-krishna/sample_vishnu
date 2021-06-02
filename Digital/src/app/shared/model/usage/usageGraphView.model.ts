import { UsageGraphItemViewModel } from './usageGraphItemView.model';

/**
 * Data model that represents the data to be rendered for a usage graph
 */
export class UsageGraphViewModel {

    /**
     * An array of UsageGraphItemViewModels that represent that individual items of the graph
     */
    public graphItems: UsageGraphItemViewModel[];

    /**
     * The maximum height of the graph. This is the height of the highest graph item in the collection, plus padding
     */
    public graphCeilingValue: number;

    /**
     * An array of values for the y-axis labels
     */
    public yAxisLabels: string[];

    /**
     * A boolean flag indicating if any of the graph items in this collection contain a missing read
     */
    public hasMissingReads: boolean;

    constructor() {
        this.graphItems = [];
        this.yAxisLabels = new Array<string>(5);
    }
}
