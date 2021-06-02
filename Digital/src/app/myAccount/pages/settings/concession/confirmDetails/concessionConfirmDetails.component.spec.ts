import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ConcessionConfirmDetailsModule } from './concessionConfirmDetails.module';
import { ConcessionConfirmDetailsComponent } from './concessionConfirmDetails.component';
import { Concession } from '../concession';
import { IConcessionStateService } from '../services/concessionState.service';
import { DocumentService } from './../../../../../shared/service/document.service';
import { ConcessionCard } from '../concessionCard';
import { IssuerCards } from '../issuerCards';
import { Mock } from 'ts-mocks';
import { IConcessionCardService } from '../services/concessionCard.service';

describe('Concession Confirm Details Component', () => {
    let comp: ConcessionConfirmDetailsComponent;
    let fixture: ComponentFixture<ConcessionConfirmDetailsComponent>;
    let de: DebugElement;
    let fetchEligibleCardsSpy: jasmine.Spy;
    let concessionStateServiceMock: IConcessionStateService;

    beforeEach(() => {
        const routerStub = {
            navigate: (urls: string[]) => {
                throw new Error('not implemented');
            }
        };
        let mockConcessionCardService = new Mock<IConcessionCardService>();
        fetchEligibleCardsSpy = mockConcessionCardService.setup((m) => m.fetchEligibleCards)
                                                         .is(() => Observable.of(TestData.IssuerCards)).Spy;

        let mockConcessionStateService: IConcessionStateService = {
            getCurrentConcession(): Concession {
                throw new Error('not implemented');
            },
            initSession(): Observable<void> {
                return Observable.of();
            },
            clearSession(): void {
                throw new Error('not implemented');
            },
            hasSession: true
        };

        TestBed.configureTestingModule({
            imports: [
                ConcessionConfirmDetailsModule,
            ],
            providers: [
                { provide: IConcessionCardService, useValue: mockConcessionCardService.Object },
                { provide: IConcessionStateService, useValue: mockConcessionStateService },
                { provide: Router, useValue: routerStub },
                DocumentService
            ]
        });

        fixture = TestBed.createComponent(ConcessionConfirmDetailsComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        concessionStateServiceMock = de.injector.get(IConcessionStateService);
    });

    function resolveAddressLabel() {
        fixture.detectChanges();
        let labels = de.queryAll(By.css('.confirm-detail__details-row-label'));

        expect(labels.length).toBe(2);
        return labels[1].nativeElement.textContent;
    }

    it('should display address when only 1 address', () => {
        spyOn(concessionStateServiceMock, 'getCurrentConcession').and.returnValue(TestData.SingleAddressConcession);

        let addressLabel = resolveAddressLabel();
        expect(addressLabel).toBe('Address:');
    });

    it('should display addressed when multiple addresses', () => {
        spyOn(concessionStateServiceMock, 'getCurrentConcession').and.returnValue(TestData.MultiAddressConcession);

        let addressLabel = resolveAddressLabel();
        expect(addressLabel).toBe('Addresses:');
    });

    it('should display full name and address', () => {
        spyOn(concessionStateServiceMock, 'getCurrentConcession').and.returnValue(TestData.SingleAddressConcession);

        fixture.detectChanges();
        let values = de.queryAll(By.css('.confirm-detail__details-row-content'));
        let errorMessage = de.query(By.css('.confirm-detail__flash-message'));

        expect(errorMessage).toBeNull();
        expect(comp.continueButtonEnabled).toBe(true);

        expect(values.length).toBe(2);
        expect(values[0].nativeElement.textContent).toContain('Jill Smith');
        expect(values[1].nativeElement.textContent).toContain('1 Hill St');
    });

    it('should route to the next step when continue is clicked', () => {
        spyOn(concessionStateServiceMock, 'getCurrentConcession').and.returnValue(TestData.SingleAddressConcession);

        let router = de.injector.get(Router);
        let routerSpy = spyOn(router, 'navigate');

        fixture.detectChanges();
        let button = de.query(By.css('.continue-or-cancel__cta-continue div'));
        button.nativeElement.click();

        expect(routerSpy).toHaveBeenCalledWith(['/settings/concession/selectcard']);
    });

    it('should display error message when the cards are not loaded', () => {
        spyOn(concessionStateServiceMock, 'getCurrentConcession').and.returnValue(TestData.SingleAddressConcession);
        fetchEligibleCardsSpy.and.returnValue(Observable.of([]));
        fixture.detectChanges();

        let errorMessage = de.query(By.css('.confirm-detail__flash-message'));

        expect(errorMessage).toBeTruthy();
        expect(errorMessage.nativeElement.textContent.trim()).toBe(`Sorry, we're unable to process your request right now. Please try again.`);
        expect(comp.continueButtonEnabled).toBe(false);
    });
});

class TestData {
    static get SingleAddressConcession(): Concession {
        return <Concession> {
            accountHolderName: 'Jill Smith',
            uniqueAddresses: ['1 Hill St'],
            setEligibleCards: (issuerCards: IssuerCards[]) => { /* mocked */
            }
        };
    }

    static get MultiAddressConcession(): Concession {
        return <Concession> {
            accountHolderName: 'John Smith',
            uniqueAddresses: ['1 Hill St', '3 Hill St'],
            setEligibleCards: (issuerCards: IssuerCards[]) => { /* mocked */
            }
        };
    }

    static get IssuerCards(): IssuerCards[] {
        return [
            new IssuerCards('Issuer 1', [
                new ConcessionCard('Issuer1', 'A', 'B', 'Card name', ['Gas', 'Electricity']),
                new ConcessionCard('Issuer1', 'A', 'C', 'Card name', ['Electricity'])
            ]),
            new IssuerCards('Issuer 2', [
                new ConcessionCard('Issuer2', 'Z', 'Y', 'Card name', ['Gas', 'Electricity'])
            ])
        ];
    }
}
