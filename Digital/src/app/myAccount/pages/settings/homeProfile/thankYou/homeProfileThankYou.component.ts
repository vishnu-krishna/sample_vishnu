import { Component, AfterViewInit } from '@angular/core';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { SurveyService, SurveyType, Survey } from '../../../../services/survey.service';

@Component({
    selector: 'agl-home-profile-thankyou',
    templateUrl: './homeProfileThankYou.component.html',
    styleUrls: ['./homeProfileThankYou.component.scss']
})
export class HomeProfileThankYouComponent implements AfterViewInit {
    constructor(private homeProfileNavigationService: HomeProfileNavigationService, public surveyService: SurveyService) {}

    public ngAfterViewInit() {
        this.surveyService.showFeedbackSurvey(SurveyType.homeProfile);
    }

    public close() {
        this.homeProfileNavigationService.goToHomeProfileLanding();
    }
}
