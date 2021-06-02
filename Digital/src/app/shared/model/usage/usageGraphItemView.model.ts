import { UsageDatumModel } from './usageDatum.model';

// A model representing an individual item in the graph
export class UsageGraphItemViewModel {

    public usageDatum: UsageDatumModel;

    public timeSpanTitle: string = '';
    public timeSpanTitleMobile: string = '';
    public timeSpanTitleInsight: string = '';
    public groupRange: string = '';
    public index: number;
    public barHeightMobile: number;
    public barHeightDesktop: number;

    // The date range for this paticular usage graph item
    public startDateTime: Date;
    public endDateTime: Date;

    public estimatedRead: boolean;

    // The cost and consumption values for this usage timespan
    public valueCost: number;
    public valueConsumption: number;

    // The average cost and consumtion values for this usage timespan
    public averageCost: string = '0.00';
    public averageConsumption: string = '0.00';

    public isFutureItemPlaceholder: boolean; // Only used for basic meter
    public incompleteData: boolean; // Used for monthly graphs to indicate that the month doesn't have a complete data set that it needs to calculate all values (Averages etc.)
    public isEndOfDataRangePlaceholder: boolean; // Used to indicate that this graph item is a UI placeholder at the ends of the data range

    public isFirstOfNewMonth: boolean = false; // Indicates if the graph item is the first item of a month

    public daysOfData: number = 0; // Indicates how many days of data we have in a monthly graph item

}
