import { Injectable } from '@angular/core';

import { DataLayerService, EventAction, EventCategory, EventLabel, ModalName } from '../../../shared/service/dataLayer.service';

@Injectable()
export class FeatureIntroAnalytics {

    constructor(private dataLayer: DataLayerService) { }

    public  dismissFeatureIntro(featureId: string) {
        this.trackEvent(EventLabel.FeatureIntroDismissFeature, featureId, EventAction.ClickAction);
    }

    public navigateToFeature(featureId: string) {
        this.trackEvent(EventLabel.FeatureIntroNavigateToFeature, featureId, EventAction.ClickAction);
    }

    public showFeatureIntro(featureId: string) {
        this.trackEvent(EventLabel.ShowFeatureIntro, featureId, EventAction.ShowFeatureIntro);
    }

    protected trackEvent(label: EventLabel, event: any, eventAction: EventAction) {
        try {
            this.dataLayer.pushEvent(ModalName.FeatureIntro, EventCategory.FeatureIntro, eventAction, label, event);
        } catch (error) {
            console.error(error);
        }
    }

}
