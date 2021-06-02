export class FeatureIntro {
    public featureId: string;
    public startDate: string;
    public endDate: string;
    public priority: number;
    public content: FeatureIntroContent = new FeatureIntroContent();
    public hasViewed: boolean;
}

export class FeatureIntroContent {
    public heading: string;
    public description: string;
    public image: string;
    public negativeCtaText: string;
    public positiveCtaRoute: string;
    public positiveCtaText: string;
    public showCta: boolean;
}
