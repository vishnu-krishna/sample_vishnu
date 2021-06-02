import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProfileNavigationService, HomeProfileUrls } from '../homeProfileNavigation.service';
import { IHomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileSummaryService } from '../summary/homeProfileSummary.service';
import { HomeProfileSummaryComponent } from './homeProfileSummary.component';
import { HomeProfileSummaryModule } from './homeProfileSummary.module';
import { HomeProfileViewModel } from './../homeProfileViewModel';
import { HomeProfilePage } from './../homeProfileNavigation.service';
import { SurveyService } from '../../../../services/survey.service';
import { ConfigService } from '../../../../../shared/service/config.service';
import { SurveyServiceStub } from '../../../../../test/stubs/survey.stub.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

describe('Home Profile Summary Component', () => {

    let mockStateService = {
        homeProfile: new HomeProfileViewModel()
    };
    let mockNavigationService = {
        gotoSurveyPage:  (page: HomeProfilePage) => Promise.resolve(true),
    };
    let mockSummary = ['summary part 1', 'summary part 2'];
    let mockSummaryService = {
        forProfile: (profile: HomeProfileViewModel) => mockSummaryService,
        summarisePage: (page: HomeProfilePage) => mockSummary
    };
    let mockActivatedRoute = {
        snapshot : {
            params : {
                accountNumber: 111,
                contractNumber: 111222
            }
        }
    };
    let fixture: ComponentFixture<HomeProfileSummaryComponent>;
    let comp: HomeProfileSummaryComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HomeProfileSummaryModule,
                RouterTestingModule
            ],
            providers: [
                { provide: HomeProfileNavigationService, useValue: mockNavigationService },
                { provide: HomeProfileSummaryService, useValue: mockSummaryService },
                { provide: IHomeProfileStateService, useValue: mockStateService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        });

        spyOn(mockSummaryService, 'forProfile');
        spyOn(mockSummaryService, 'summarisePage');
        spyOn(mockNavigationService, 'gotoSurveyPage');
        fixture = TestBed.createComponent(HomeProfileSummaryComponent);
        comp = fixture.componentInstance;
    });

    describe('Component tests', () => {
        it('should show all sections of the home profile', () => {
            fixture.detectChanges();
            const sections = fixture.nativeElement.querySelectorAll('.homeprofile-summary__section');
            expect(sections.length).toBe(8);
        });

        it('should show correct section headings', () => {
            fixture.detectChanges();
            const sectionTitles = fixture.nativeElement.querySelectorAll('.homeprofile-summary__section-title');
            expect(sectionTitles.length).toBe(8);
            expect(sectionTitles[0].innerText).toContain('Your home');
            expect(sectionTitles[1].innerText).toContain('Cooling');
            expect(sectionTitles[2].innerText).toContain('Heating');
            expect(sectionTitles[3].innerText).toContain('Hot water');
            expect(sectionTitles[4].innerText).toContain('Fridge and freezer');
            expect(sectionTitles[5].innerText).toContain('Oven and cooktop');
            expect(sectionTitles[6].innerText).toContain('Other electrical items');
            expect(sectionTitles[7].innerText).toContain('Pool and spa');
        });

        it('should show summary on each section', () => {
            fixture.detectChanges();
            const summaries = fixture.nativeElement.querySelectorAll('.homeprofile-summary__section-summary');
            expect(summaries.length).toBe(8);
        });

        it('should show edit links on each section', () => {
            fixture.detectChanges();
            const editLinks = fixture.nativeElement.querySelectorAll('.homeprofile-summary__section-edit-link');
            expect(editLinks.length).toBe(8);
        });
    });

    describe('Test public methods', () => {
        describe('ngOnInit()', () => {
            it('should call HomeProfileSummaryService.forProfile()', () => {
                const testHomeProfile = new HomeProfileViewModel();
                mockStateService.homeProfile = testHomeProfile;
                comp.ngOnInit();
                expect(mockSummaryService.forProfile).toHaveBeenCalledWith(testHomeProfile);
            });

            it('should call HomeProfileSummaryService.summarisePage() for all the home profile sections', () => {
                comp.ngOnInit();
                expect(mockSummaryService.summarisePage).toHaveBeenCalledTimes(8);
            });
        });

        describe('edit()', () => {
            it('should call HomeProfileNavigationService.gotoSurveyPage', () => {
                const page = HomeProfilePage.Heating;
                comp.edit(page);
                expect(mockNavigationService.gotoSurveyPage).toHaveBeenCalledWith(page, 111, 111222);
            });
        });

    });
});
