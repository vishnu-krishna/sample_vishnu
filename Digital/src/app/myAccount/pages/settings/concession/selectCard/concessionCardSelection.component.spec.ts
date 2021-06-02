import { MatIconRegistry } from '@angular/material/icon';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Mock } from 'ts-mocks';

import { ConcessionCardSelectionComponent } from './concessionCardSelection.component';
import { ConcessionCardSelectionModule } from './concessionCardSelection.module';
import { Concession } from '../concession';
import { IConcessionStateService } from '../services/concessionState.service';
import { ConcessionCard } from '../concessionCard';
import { IssuerCards } from '../issuerCards';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Concession Card Selection Component', () => {
    let comp: ConcessionCardSelectionComponent;
    let fixture: ComponentFixture<ConcessionCardSelectionComponent>;
    let de: DebugElement;
    let setSelectedCardSpy: jasmine.Spy;

    function configureTestingModule(concession: Concession) {
        const routerStub = {
            navigate: (urls: string[]) => {
                throw new Error('not implemented');
            }
        };

        setSelectedCardSpy = spyOn(concession, 'setSelectedCard');

        let mockConcessionStateService = new Mock<IConcessionStateService>();
        mockConcessionStateService.setup((m) => m.getCurrentConcession)
                                  .is(() => concession);

        TestBed.configureTestingModule({
            imports: [
                ConcessionCardSelectionModule,
                HttpModule,  /* for use with Angular Material icons  */
                HttpClientTestingModule,
            ],
            providers: [
                { provide: IConcessionStateService, useValue: mockConcessionStateService.Object },
                { provide: Router, useValue: routerStub },
            ]
        });

        fixture = TestBed.createComponent(ConcessionCardSelectionComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        let iconRegistry: MatIconRegistry = fixture.debugElement.injector.get(MatIconRegistry);
        let sanitizer: DomSanitizer = fixture.debugElement.injector.get(DomSanitizer);
        iconRegistry.addSvgIcon('icon-concession-unknown', sanitizer.bypassSecurityTrustResourceUrl('svg/concession/cards/unknown.svg'));
    }

    describe('when session does not contain a selected card', () => {
        beforeEach(() => {
            configureTestingModule(TestData.ConcessionWithoutSelectedCard);
        });

        it('should show warning when card does not support selected fuel type', () => {
            fixture.detectChanges();
            let radioButtons = fixture.nativeElement.querySelectorAll('.select-card__details-row-label');

            // first select a card with no warning
            radioButtons[2].click();
            fixture.detectChanges();
            let warning = fixture.nativeElement.querySelector('.select-card__details-fuel-warning');
            expect(warning).toBeFalsy();

            // then select a card with a warning
            radioButtons[1].click();
            fixture.detectChanges();
            warning = fixture.nativeElement.querySelector('.select-card__details-fuel-warning');
            expect(warning).toBeTruthy();
            expect(warning.textContent).toContain('Concessions only apply to electricity for ACT Card name (with warning) card holders');
        });

        function clickContinue() {
            fixture.detectChanges();
            let button = fixture.nativeElement.querySelector('.continue-or-cancel__cta-continue div');
            button.click();
        }

        it('should not be able to click continue until card is selected', () => {
            let router = de.injector.get(Router);
            let routerSpy = spyOn(router, 'navigate');

            clickContinue();

            expect(routerSpy).not.toHaveBeenCalled();
        });

        it('should route to the next step and save selected card to session when continue is clicked', () => {
            let expectedCard = TestData.IssuerCards[0].cards[1];
            let router = de.injector.get(Router);
            let routerSpy = spyOn(router, 'navigate');

            fixture.detectChanges();
            let radioButton = fixture.nativeElement.querySelectorAll('.select-card__details-row-label')[1]; // second option
            radioButton.click();

            clickContinue();

            expect(comp.selectedValue).toBeTruthy();
            expect(comp.selectedValue).toBe(expectedCard.uniqueKey);
            expect(setSelectedCardSpy).toHaveBeenCalledWith(expectedCard);
            expect(routerSpy).toHaveBeenCalledWith(['/settings/concession/apply']);
        });
    });

    describe('when session contains a selected card', () => {
        beforeEach(() => {
            configureTestingModule(TestData.ConcessionWithSelectedCard);
        });

        it('should set the currently selected card', () => {
            expect(comp.selectedValue).toBeFalsy();

            comp.ngOnInit();

            expect(comp.selectedValue).toBeTruthy();
            expect(comp.selectedValue).toBe('test-key');
        });
    });
});

class TestData {
    static get ConcessionWithoutSelectedCard(): Concession {
        return <Concession> {
            selectedCard: undefined,
            setSelectedCard: (card: ConcessionCard) => { /* mocked */
            },
            fuelTypes: ['Electricity', 'Gas'],
            regionId: 'act',
            eligibleCards: this.IssuerCards
        };
    }

    static get ConcessionWithSelectedCard(): Concession {
        let mockCard = new Mock<ConcessionCard>();
        mockCard.setup((m) => m.uniqueKey).is('test-key');

        return <Concession> {
            selectedCard: mockCard.Object,
            setSelectedCard: (card: ConcessionCard) => { /* mocked */
            },
            fuelTypes: ['Electricity', 'Gas'],
            regionId: 'nsw'
        };
    }

    static get IssuerCards(): IssuerCards[] {
        let issuerCards = [
            new IssuerCards('Issuer 1', [
                new ConcessionCard('Issuer1', 'A', 'B', 'Card name', ['Gas', 'Electricity']),
                new ConcessionCard('Issuer1', 'A', 'C', 'Card name (with warning)', ['Electricity'])
            ]),
            new IssuerCards('Issuer 2', [
                new ConcessionCard('Issuer2', 'Z', 'Y', 'Card name', ['Gas', 'Electricity'])
            ])
        ];

        return issuerCards;
    }
}
