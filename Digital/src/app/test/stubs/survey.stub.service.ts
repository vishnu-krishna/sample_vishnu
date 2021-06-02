import { Injectable } from '@angular/core';
import { Survey, SurveyEventType, SurveyType } from '../../myAccount/services/survey.service';

@Injectable()
export class SurveyServiceStub {
    public start(survey: Survey) {
        throw new Error('Not Implemented');
    }

    public trackEvent(surveyEventType: SurveyEventType) {
        throw new Error('Not Implemented');
    }

    public triggerSurvey(surveyType: SurveyType) {
        throw new Error('Not Implemented');
    }

    public showFeedbackSurvey(surveyType: SurveyType) {
        throw new Error('Not Implemented');
    }
}
