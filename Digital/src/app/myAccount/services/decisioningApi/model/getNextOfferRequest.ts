export class GetNextOfferRequest {
    constructor(public bpId: string, public channel: string, public componentId: string, public container: string, public pageId: string) {
        // constructor
    }
}

export enum OfferChannels {
    MyAccount = <any> 'MyAccount'
}

export enum OfferContainers {
    NextBestAction = <any> 'NextBestAction'
}

export enum OfferDirections {
    Inbound = <any> 'Inbound'
}

export enum OfferComponentIds {
    MyAccount_Sidebar_Right = <any> 'MyAccount_Sidebar_Right'
}

export class OfferInfo {
    public bpId: string;
    public interactionId: string;
    public channel: string;
    public direction: string;
    public offers: Offer[];
}

export class Offer {
    public businessGroup: string;
    public businessIssue: string;
    public propositionId: string;
    public businessName: string;
    public assetUrl: string;
    public ctaUrl: string;
    public ctaText: string;
    public displayHeading: string;
    public displayText: string;
    public rank: number;
}
