export class PaygContentModel {
    public isActive: boolean;
    public buttonText: Array<{ [band: string]: string }>;
    public contextualMessageHeader: Array<{ [band: string]: string }>;
    public contextualMessageContent: Array<{ [band: string]: string }>;
    public prepaidBalanceLabelText: string;
    public usageToolTipBody: string;
    public usageToolTipHeader: string;
    public estimatedReadTooltip: string;
    public directDebitMessage1: string;
    public directDebitMessage2: string;
    public highUrgencyTopupMessage: string;
}
