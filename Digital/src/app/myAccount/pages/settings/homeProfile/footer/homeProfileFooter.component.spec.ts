import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HomeProfileApiModel } from '../../../../services/homeProfile/homeProfileApi.service';
import { HomeProfileViewModel } from '../homeProfileViewModel';
import { HomeProfileStateMockService } from '../../../../services/mock/homeProfileState.mock.service';
import { IHomeProfileStateService, HomeProfileStateService } from '../homeProfileState.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileFooterModule } from './homeProfileFooter.module';
import { HomeProfileFooterComponent } from './homeProfileFooter.component';

describe('Home Profile Footer', () => {

    let fixture: ComponentFixture<HomeProfileFooterComponent>;
    let comp: HomeProfileFooterComponent;
    let mockStateService = new HomeProfileStateMockService();
    let mockNavigationService = {
        nextPage:  () => { throw new Error('No implemented'); },
        goToHomeProfileLanding: () => { throw new Error('No implemented'); }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HomeProfileFooterModule
            ],
            providers: [
                { provide: HomeProfileNavigationService, useValue: mockNavigationService },
                { provide: IHomeProfileStateService, useValue: mockStateService }
            ]
        });
        spyOn(mockNavigationService, 'nextPage');
        spyOn(mockNavigationService, 'goToHomeProfileLanding');
        fixture = TestBed.createComponent(HomeProfileFooterComponent);
        comp = fixture.componentInstance;
    });

    describe('component tests', () => {
        it('should show next and save buttons on footer', () => {
            fixture.detectChanges();

            // Assert
            let nextButton = fixture.nativeElement.querySelectorAll('agl-maui-button[data-test=next]');
            expect(nextButton).toBeDefined();
            expect(nextButton.length).toBe(1);
            let saveButton = fixture.nativeElement.querySelectorAll('agl-maui-button[data-test=save-and-close]');
            expect(saveButton).toBeDefined();
            expect(saveButton.length).toBe(1);
        });
    });

    describe('success scenarios', () => {
        beforeEach(() => {
            spyOn(mockStateService, 'saveProfile').and.returnValue(Observable.of(true));
        });

        describe('next()', () => {
            it('should save profile', () => {
                comp.next();
                expect(mockStateService.saveProfile).toHaveBeenCalled();
            });

            it('should go to next page', () => {
                comp.next();
                expect(mockNavigationService.nextPage).toHaveBeenCalled();
            });
        });

        describe('saveAndClose()', () => {
            it('should save profile', () => {
                comp.saveAndClose();
                expect(mockStateService.saveProfile).toHaveBeenCalled();
            });

            it('should close', () => {
                comp.saveAndClose();
                expect(mockNavigationService.goToHomeProfileLanding).toHaveBeenCalled();
            });
        });

        describe('isLoading()', () => {
            it('should return true if next is loading', () => {
                comp.isNextLoading = true;
                expect(comp.isLoading).toBe(true);
            });

            it('should return true if save and close is loading', () => {
                comp.isSaveAndCloseLoading = true;
                expect(comp.isLoading).toBe(true);
            });

            it('should return false if neither next nor save and close is loading', () => {
                comp.isNextLoading = false;
                comp.isSaveAndCloseLoading = false;
                expect(comp.isLoading).toBe(false);
            });
        });
    });

    describe('failure scenarios', () => {
        beforeEach(() => {
            spyOn(mockStateService, 'saveProfile').and.returnValue(Observable.throw('Any error'));
        });

        describe('next()', () => {
            it('should flag error', () => {
                comp.next();
                expect(comp.isError).toBe(true);
            });

            it('should not go to next page', () => {
                comp.next();
                expect(mockNavigationService.nextPage).not.toHaveBeenCalled();
            });
        });

        describe('saveAndClose()', () => {
            it('should flag error', () => {
                comp.next();
                expect(comp.isError).toBe(true);
            });

            it('should not close', () => {
                comp.saveAndClose();
                expect(mockNavigationService.goToHomeProfileLanding).not.toHaveBeenCalled();
            });
        });
    });
});
