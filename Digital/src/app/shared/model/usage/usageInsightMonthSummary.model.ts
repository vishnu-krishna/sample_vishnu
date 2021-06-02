export class UsageInsightMonthSummary {
    public usageCostDifference: string; // eg $40
    public usageRemainingDays: number; // eg 15
    public comparisonPhrase: string; // eg 'more'
    public summary: string; // eg 'Hi Gemma... etc'
    public usageCostIcon: string;
    public isHighlightDisplayed: boolean; // This is to determine whether the left side message is shown or not
}
