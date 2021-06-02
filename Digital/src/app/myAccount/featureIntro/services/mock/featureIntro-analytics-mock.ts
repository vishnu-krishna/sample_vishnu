
import { EventAction, EventLabel } from '../../../../shared/service/dataLayer.service';
import { FeatureIntroAnalytics } from '../featureIntro-analytics';

export class FeatureIntroAnalyticsMock extends FeatureIntroAnalytics {

    constructor() {
        super(null);
    }

    protected trackEvent(label: EventLabel, event: any, eventAction: EventAction) {
        // do nothing in the mock
    }
}
