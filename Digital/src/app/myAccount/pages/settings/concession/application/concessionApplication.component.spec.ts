import { MatIconRegistry } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DomSanitizer, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpModule } from '@angular/http';
import { Mock } from 'ts-mocks';

import { ConcessionApplicationModule } from './concessionApplication.module';
import { ConcessionApplicationComponent } from './concessionApplication.component';
import { IConcessionApplicationService, SubmissionResult } from '../services/concessionApplication.service';
import { Concession } from '../concession';
import { IConcessionStateService } from '../services/concessionState.service';
import { ConcessionCard } from '../concessionCard';
import { DocumentService } from './../../../../../shared/service/document.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Concession Application Component', () => {
    let comp: ConcessionApplicationComponent;
    let fixture: ComponentFixture<ConcessionApplicationComponent>;
    let de: DebugElement;
    let applicationSubmitSpy: jasmine.Spy;

    beforeEach(() => {
        let mockConcessionApplicationService = new Mock<IConcessionApplicationService>();
        applicationSubmitSpy = mockConcessionApplicationService.setup((m) => m.submit)
                                                               .is(() => Observable.of(SubmissionResult.Success)).Spy;

        const routerStub = {
            navigate: (urls: string[]) => {
                throw new Error('not implemented');
            }
        };

        let mockConcessionStateService = new Mock<IConcessionStateService>();
        mockConcessionStateService.setup((m) => m.getCurrentConcession)
                            .is(() => {
                                let concessionCardMock = new Mock<ConcessionCard>();
                                concessionCardMock.setup((m) => m.iconName).is('icon-concession-unknown');

                                let concessionMock = new Mock<Concession>();
                                concessionMock.setup((m) => m.selectedCard).is(concessionCardMock.Object);
                                concessionMock.setup((m) => m.setCardNumber);

                                return concessionMock.Object;
                            });

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                ConcessionApplicationModule,
                HttpModule,  /* for use with Angular Material icons  */
                HttpClientTestingModule,
            ],
            providers: [
                { provide: IConcessionApplicationService, useValue: mockConcessionApplicationService.Object },
                { provide: IConcessionStateService, useValue: mockConcessionStateService.Object },
                { provide: Router, useValue: routerStub },
                DocumentService
            ]
        });

        fixture = TestBed.createComponent(ConcessionApplicationComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        let iconRegistry: MatIconRegistry = fixture.debugElement.injector.get(MatIconRegistry);
        let sanitizer: DomSanitizer = fixture.debugElement.injector.get(DomSanitizer);
        iconRegistry.addSvgIcon('icon-concession-unknown', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/cards/unknown.svg'));
    });

    function clickContinue() {
        fixture.detectChanges();
        let button = fixture.nativeElement.querySelector('.continue-or-cancel__cta-continue div');
        button.click();
    }

    it('should not call submit when only card number is entered', () => {
        let control = comp.cardNumberForm.get('cardNumber');
        control.setValue('some value');
        clickContinue();

        expect(applicationSubmitSpy).not.toHaveBeenCalled();
    });

    it('should not call submit when only t&c are checked', () => {
        comp.termsAndConditionChecked(true);
        clickContinue();

        expect(applicationSubmitSpy).not.toHaveBeenCalled();
    });

    it('should route to next step when card number is entered and t&c are checked', () => {
        let router = de.injector.get(Router);
        let routerSpy = spyOn(router, 'navigate');

        let control = comp.cardNumberForm.get('cardNumber');
        control.setValue('some value');
        comp.termsAndConditionChecked(true);

        clickContinue();

        expect(routerSpy).toHaveBeenCalledWith(['/settings/concession/confirmation']);
    });

    it('should not set any error message when submit application returns success', () => {
        applicationSubmitSpy.and.returnValue(Observable.of(SubmissionResult.Success));
        let router = de.injector.get(Router);
        let routerSpy = spyOn(router, 'navigate');

        let control = comp.cardNumberForm.get('cardNumber');
        control.setValue('some value');
        comp.termsAndConditionChecked(true);

        clickContinue();

        expect(applicationSubmitSpy).toHaveBeenCalled();
        expect(comp.submissionResult).toBeNull();
    });

    it('should display card format error message when submit application returns InvalidCardFormat', () => {
        applicationSubmitSpy.and.returnValue(Observable.of(SubmissionResult.InvalidCardFormat));

        let control = comp.cardNumberForm.get('cardNumber');
        control.setValue('some value');
        comp.termsAndConditionChecked(true);

        clickContinue();

        expect(comp.submissionResult).toBe(SubmissionResult.InvalidCardFormat);

        fixture.detectChanges();
        let el = de.query(By.css('.card-detail__form-card-number--error'));
        expect(el).toBeTruthy();
        expect(el.nativeElement.textContent).toContain('That looks like an invalid format');
    });

    let errorsDataMap = [
        [ SubmissionResult.CardFromDifferentRegionId, 'The concession card cannot be applied to your service address. Please provide a concession card from the same state as your service.' ],
        [ SubmissionResult.CardAlreadyInUse, 'The concession card number you provided is already in use' ],
        [ SubmissionResult.UnknownError, 'Sorry, we\'re unable to process your request right now. Please try again.' ]
    ];
    errorsDataMap.forEach((data) => {
        let expectedSubmissionResult = <SubmissionResult> data[0];
        let expectedContent = data[1];
        it(`should display an error message when submit application returns ${SubmissionResult[expectedSubmissionResult]}`, () => {
            applicationSubmitSpy.and.returnValue(Observable.of(expectedSubmissionResult));

            let control = comp.cardNumberForm.get('cardNumber');
            control.setValue('some value');
            comp.termsAndConditionChecked(true);

            clickContinue();

            expect(comp.submissionResult).toBe(expectedSubmissionResult);

            fixture.detectChanges();
            let el = de.query(By.css('.card-detail__submission-error'));
            expect(el).toBeTruthy();
            expect(el.nativeElement.textContent).toContain(expectedContent);
        });
    });
});
