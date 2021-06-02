import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { HomeProfileNavigationService, HomeProfileUrls } from '../homeProfileNavigation.service';
import { IHomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileSummaryService } from '../summary/homeProfileSummary.service';
import { HomeProfileThankYouComponent } from './homeProfileThankYou.component';
import { HomeProfileThankYouModule } from './homeProfileThankYou.module';
import { HomeProfileViewModel } from './../homeProfileViewModel';
import { SurveyService } from '../../../../services/survey.service';
import { ConfigService } from '../../../../../shared/service/config.service';
import { SurveyServiceStub } from '../../../../../test/stubs/survey.stub.service';

describe('Home Profile ThankYou Page', () => {

    let mockStateService = {
        homeProfile: new HomeProfileViewModel()
    };
    let fixture: ComponentFixture<HomeProfileThankYouComponent>;
    let router: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HomeProfileThankYouModule,
                RouterTestingModule
            ],
            providers: [
                HomeProfileNavigationService,
                HomeProfileUrls,
                HomeProfileSummaryService,
                { provide: IHomeProfileStateService, useValue: mockStateService },
                { provide: SurveyService, useClass: SurveyServiceStub },
            ]
        });

        fixture = TestBed.createComponent(HomeProfileThankYouComponent);
        let surveyService = fixture.debugElement.injector.get(SurveyService);

        spyOn(surveyService, 'showFeedbackSurvey');
        fixture = TestBed.createComponent(HomeProfileThankYouComponent);
    });

    it('should say "Thank you..." on the header banner', () => {
        fixture.detectChanges();

        // No checkbox should be selected
        let banner = fixture.nativeElement.querySelector('.homeprofile-thankyou-header');
        expect(banner.innerText.trim()).toBe('Thank you for setting up your home profile');
    });

    it('should show close button on the footer', () => {
        fixture.detectChanges();

        // No checkbox should be selected
        let closeButton = fixture.nativeElement.querySelector('.homeprofile-thankyou-footer__close-button');
        expect(closeButton).toBeDefined();
    });

});
