import { Mock } from 'ts-mocks';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { HomeProfileNavigationService, HomeProfileUrls } from './homeProfileNavigation.service';

describe('Home Profile Navigation Service', () => {
    const routerStub = {
        navigate: () => {
            Promise.resolve(true);
        },
        navigated: false,
        url: ''
    };
    const mockPages = {
        homePageUrl: '/hp/intro',
        surveyCompletionPageUrl: '/hp/thankYou',
        surveyPageUrls: [
            '/hp/page1',
            '/hp/page2',
            '/hp/page3'
        ],
        editHomeProfileUrl: '/hp/edit',
        selectHomeProfileUrl: 'hp/select',
        title: 'Home profile'
    };
    const notHomeProfileUrl = '/not-homeprofile-page';
    let navigationService: HomeProfileNavigationService;

    const accountNumber = '111';
    const contractNumber = '222';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useValue: routerStub },
                { provide: HomeProfileUrls, useValue: mockPages },
                HomeProfileNavigationService
            ]
        });
        spyOn(routerStub, 'navigate').and.returnValue(Promise.resolve(true));
    });

    describe('currentPage', () => {

        it('should return a 1-based page number of the current HP survey page', () => {
            const page = 1;
            routerStub.url = `${mockPages.surveyPageUrls[page - 1]}/${accountNumber}/${contractNumber}`;
            navigationService = TestBed.get(HomeProfileNavigationService);
            expect(navigationService.currentPage).toBe(page);
        });

        it('should return 0 if on HP home/landing page since it is not part of the HP survey', () => {
            routerStub.url = mockPages.homePageUrl;
            navigationService = TestBed.get(HomeProfileNavigationService);
            expect(navigationService.currentPage).toBe(0);
        });

        it('should return 0 if on HP completion page since it is not part of the HP survey', () => {
            routerStub.url = mockPages.surveyCompletionPageUrl;
            navigationService = TestBed.get(HomeProfileNavigationService);
            expect(navigationService.currentPage).toBe(0);
        });

        it('should return 0 if on any other page', () => {
            routerStub.url = notHomeProfileUrl;
            navigationService = TestBed.get(HomeProfileNavigationService);
            expect(navigationService.currentPage).toBe(0);
        });
    });

    describe('totalPage', () => {

        it('should always return total number of HP survey pages', () => {
            routerStub.url = notHomeProfileUrl;
            navigationService = TestBed.get(HomeProfileNavigationService);
            expect(navigationService.totalPages).toBe(mockPages.surveyPageUrls.length);
        });
    });

    describe('isInSurvey()', () => {

        it('should return true if on any of the HP survey pages', () => {
            routerStub.url = `${mockPages.surveyPageUrls[0]}/${accountNumber}/${contractNumber}`;
            navigationService = TestBed.get(HomeProfileNavigationService);
            expect(navigationService.isInSurvey()).toBe(true);
            routerStub.url = `${mockPages.surveyPageUrls[mockPages.surveyPageUrls.length - 1]}/${accountNumber}/${contractNumber}`;
            navigationService = TestBed.get(HomeProfileNavigationService);
            expect(navigationService.isInSurvey()).toBe(true);
        });

        it('should return false if on HP home/landing page', () => {
            routerStub.url = mockPages.homePageUrl;
            navigationService = TestBed.get(HomeProfileNavigationService);
            expect(navigationService.isInSurvey()).toBe(false);
        });

        it('should return false if on HP completion page', () => {
            routerStub.url = mockPages.surveyCompletionPageUrl;
            navigationService = TestBed.get(HomeProfileNavigationService);
            expect(navigationService.isInSurvey()).toBe(false);
        });

        it('should return false if not in any of the HP pages', () => {
            routerStub.url = notHomeProfileUrl;
            navigationService = TestBed.get(HomeProfileNavigationService);
            expect(navigationService.isInSurvey()).toBe(false);
        });
    });

    describe('startClick()', () => {

        it('should always navigate to first page of HP survey', () => {
            navigationService = TestBed.get(HomeProfileNavigationService);
            navigationService.startHomeProfile(accountNumber, contractNumber);
            expect(routerStub.navigate).toHaveBeenCalledWith([`${mockPages.surveyPageUrls[0]}/${accountNumber}/${contractNumber}`]);
        });
    });

    describe('goToHomeProfileLanding()', () => {

        it('should navigate to HP home/landing page if currently on HP survey', () => {
            routerStub.url = `${mockPages.surveyPageUrls[0]}/${accountNumber}/${contractNumber}`;
            navigationService = TestBed.get(HomeProfileNavigationService);
            navigationService.goToHomeProfileLanding();
            expect(routerStub.navigate).toHaveBeenCalledWith([ mockPages.homePageUrl ]);
        });

        it('should navigate to HP home/landing page if currently on HP completion page', () => {
            routerStub.url = `${mockPages.surveyCompletionPageUrl}/${accountNumber}/${contractNumber}`;
            navigationService = TestBed.get(HomeProfileNavigationService);
            navigationService.goToHomeProfileLanding();
            expect(routerStub.navigate).toHaveBeenCalledWith([ mockPages.homePageUrl ]);
        });
    });

    describe('nextClick()', () => {

        it('should navigate to the next HP survey page if currently on HP survey', () => {
            const currentPage = 1;
            const nextPage = currentPage + 1;
            routerStub.url = `${mockPages.surveyPageUrls[currentPage - 1]}/${accountNumber}/${contractNumber}`;
            navigationService = TestBed.get(HomeProfileNavigationService);
            navigationService.nextPage(accountNumber, contractNumber);
            expect(routerStub.navigate).toHaveBeenCalledWith([`${mockPages.surveyPageUrls[nextPage - 1]}/${accountNumber}/${contractNumber}`]);
        });

        it('should navigate to completion page if currently on the last HP survey page', () => {
            routerStub.url = `${mockPages.surveyPageUrls[mockPages.surveyPageUrls.length - 1]}/${accountNumber}/${contractNumber}`;
            navigationService = TestBed.get(HomeProfileNavigationService);
            navigationService.nextPage(accountNumber, contractNumber);
            expect(routerStub.navigate).toHaveBeenCalledWith([`${mockPages.surveyCompletionPageUrl}/${accountNumber}/${contractNumber}`]);
        });
    });

    describe('backClick()', () => {

        it('should navigate to the HP home/landing page if currently on the first HP survey page', () => {
            routerStub.url = `${mockPages.surveyPageUrls[0]}/${accountNumber}/${contractNumber}`;
            navigationService = TestBed.get(HomeProfileNavigationService);
            navigationService.back();
            expect(routerStub.navigate).toHaveBeenCalledWith([mockPages.homePageUrl]);
        });

        it('should navigate to the previous page if currently on an HP survey page other than the first', () => {
            const currentPage = 2;
            const previousPage = currentPage - 1;
            routerStub.url = `${mockPages.surveyPageUrls[currentPage - 1]}/${accountNumber}/${contractNumber}`;
            navigationService = TestBed.get(HomeProfileNavigationService);
            navigationService.back(accountNumber, contractNumber);
            expect(routerStub.navigate).toHaveBeenCalledWith([`${mockPages.surveyPageUrls[previousPage - 1]}/${accountNumber}/${contractNumber}`]);
        });
    });

    describe('gotoSurveyPage()', () => {

        it('should navigate to the correct page URL if page is valid', () => {
            const lastPage = mockPages.surveyPageUrls.length;
            navigationService = TestBed.get(HomeProfileNavigationService);
            navigationService.gotoSurveyPage(lastPage, accountNumber, contractNumber);
            expect(routerStub.navigate).toHaveBeenCalledWith([`${mockPages.surveyPageUrls[lastPage - 1]}/${accountNumber}/${contractNumber}`]);
        });
    });

    describe('selectAddressForHomeProfile()', () => {

        it('should go to the addres selection page', () => {
            navigationService = TestBed.get(HomeProfileNavigationService);
            navigationService.selectAddressForHomeProfile();
            expect(routerStub.navigate).toHaveBeenCalledWith([mockPages.selectHomeProfileUrl]);
        });
    });

    describe('editHomeProfile()', () => {

        it('should go to the edit home profile page', () => {
            navigationService = TestBed.get(HomeProfileNavigationService);
            navigationService.editHomeProfile(accountNumber, contractNumber);
            expect(routerStub.navigate).toHaveBeenCalledWith([`${mockPages.editHomeProfileUrl}/${accountNumber}/${contractNumber}`]);
        });
    });
});
