import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Concession } from '../concession';
import { IConcessionStateService } from '../services/concessionState.service';
import { ConcessionFinalConfirmationComponent } from './concessionFinalConfirmation.component';
import { By } from '@angular/platform-browser';
import { ConcessionFinalConfirmationModule } from './concessionFinalConfirmation.module';

describe('Concession Final Confirmation Component', () => {
    let comp: ConcessionFinalConfirmationComponent;
    let fixture: ComponentFixture<ConcessionFinalConfirmationComponent>;
    let de: DebugElement;
    let concessionStateServiceMock: IConcessionStateService;

    function configureTestingBedModule(concession: Concession) {
        const routerStub = {
            navigate: (urls: string[]) => {
                throw new Error('not implemented');
            }
        };
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
                ConcessionFinalConfirmationModule
            ],
            providers: [
                { provide: IConcessionStateService, useValue: mockConcessionStateService },
                { provide: Router, useValue: routerStub },
            ]
        });

        fixture = TestBed.createComponent(ConcessionFinalConfirmationComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        concessionStateServiceMock = de.injector.get(IConcessionStateService);
        spyOn(concessionStateServiceMock, 'getCurrentConcession').and.returnValue(concession);
        spyOn(concessionStateServiceMock, 'clearSession');
    }

    describe('Final Confirmation Component', () => {
        it('should display address when only 1 address', () => {
            configureTestingBedModule(TestData.SingleAddressConcession);
            fixture.detectChanges();
            let addressLabel = de.query(By.css('.concession-final-confirmation__content-address-label'));

            expect(addressLabel.nativeElement.textContent.trim()).toBe('Address:');
        });

        it('should display addresses when multiple addresses', () => {
            configureTestingBedModule(TestData.MultiAddressConcession);

            fixture.detectChanges();
            let addressLabel = de.query(By.css('.concession-final-confirmation__content-address-label'));

            expect(addressLabel.nativeElement.textContent.trim()).toBe('Addresses:');
        });

        it('should route to settings page when close button is clicked', () => {
            configureTestingBedModule(TestData.MultiAddressConcession);

            let router = de.injector.get(Router);
            let routerSpy = spyOn(router, 'navigate');

            fixture.detectChanges();
            let element = de.query(By.css('agl-maui-button div'));
            element.nativeElement.click();

            expect(routerSpy).toHaveBeenCalledWith(['/settings/personal']);
        });

        it('should display the card issuer description returned from state service', () => {
            configureTestingBedModule(TestData.MultiAddressConcession);

            fixture.detectChanges();
            let element = de.query(By.css('.concession-final-confirmation__content-card-description'));
            expect(element.nativeElement.textContent.trim()).toBe(TestData.SingleAddressConcession.selectedCard.issuerDescription);
        });

        it('should display the card type description returned from state service', () => {
            configureTestingBedModule(TestData.MultiAddressConcession);

            fixture.detectChanges();
            let element = de.query(By.css('.concession-final-confirmation__content-card-type-description'));
            expect(element.nativeElement.textContent.trim()).toBe(TestData.SingleAddressConcession.selectedCard.cardDescription);
        });

        it('should display the card number returned from state service', () => {
            configureTestingBedModule(TestData.MultiAddressConcession);

            fixture.detectChanges();
            let element = de.query(By.css('.concession-final-confirmation__content-card-number'));
            expect(element.nativeElement.textContent.trim()).toBe(TestData.SingleAddressConcession.cardNumber);
        });
    });
});

class TestData {
    static get SingleAddressConcession(): Concession {
        return <Concession> {
            accountHolderName: 'John Smith',
            uniqueAddresses: ['1 Hill St'],
            selectedCard: {
                issuerDescription: 'Center Link',
                cardDescription: 'Health Care Card',
            },
            cardNumber: '111-111-11A'
        };
    }

    static get MultiAddressConcession(): Concession {
        return <Concession> {
            accountHolderName: 'John Smith',
            uniqueAddresses: ['1 Hill St', '3 Hill St'],
            selectedCard: {
                issuerDescription: 'Center Link',
                cardDescription: 'Health Care Card',
            },
            cardNumber: '111-111-11A'
        };
    }
}
