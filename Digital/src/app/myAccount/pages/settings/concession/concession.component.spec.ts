import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';

import { FeatureFlagService } from '../../../services/featureFlag.service';
import { FeatureFlagMockService } from '../../../services/mock/featureflag.mock.service';
import { ConfigStubService } from '../../../../test/stubs/config.stub.service';
import { ConcessionComponent } from './concession.component';
import { IConcessionStatusService } from './services/concessionStatus.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '../../../../shared/service/config.service';
import { FeatureFlagTypes } from '../../../services/featureFlag.constants';
import { DocumentService } from '../../../../shared/service/document.service';
import { ConcessionModule } from './concession.module';
import { ConcessionApplied, ConcessionStatus, ConcessionNotAppliedFor, IneligibleForConcession, ConcessionRejected, ConcessionRejectedReasons } from './services/concessionStatus';
import { Mock } from 'ts-mocks';

describe('Concession Component', () => {
    const aeoBaseConcessionUrl = 'https://test-url';
    let fixture: ComponentFixture<ConcessionComponent>;
    let de: DebugElement;
    let fetchConcessionStatusDetailsSpy: jasmine.Spy;

    beforeEach(() => {
        let featureFlagMockService: FeatureFlagMockService = new FeatureFlagMockService();
        let mockConcessionStatusService = new Mock<IConcessionStatusService>();
        fetchConcessionStatusDetailsSpy = mockConcessionStatusService.setup((m) => m.fetchConcessionStatusDetails).Spy;

        let configStubService = new ConfigStubService();
        configStubService.current.aglSiteCoreWebsiteBaseUrl = aeoBaseConcessionUrl;

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                ConcessionModule
            ],
            providers: [
                { provide: ConfigService, useValue: configStubService },
                { provide: FeatureFlagService, useValue: featureFlagMockService },
                { provide: IConcessionStatusService, useValue: mockConcessionStatusService.Object },
                DocumentService
            ]
        });

        fixture = TestBed.createComponent(ConcessionComponent);
        de = fixture.debugElement;
    });

    describe('when feature flag is on', () => {
        beforeEach(() => {
            let featureFlagMockService = de.injector.get(FeatureFlagService);
            spyOn(featureFlagMockService, 'featureFlagged').and.callFake((arg) => {
                return Observable.of(arg === FeatureFlagTypes.applyForConcessionEnabled);
            });
        });

        function assertAddConcessionLinkDisplayed(shouldBeDisplayed: boolean): void {
            let link = de.query(By.css('.concession__add-link'));
            if (shouldBeDisplayed) {
                expect(link).toBeTruthy('concession__add-link should be displayed');
            } else {
                expect(link).toBeFalsy('concession__add-link should not be displayed');
            }
        }

        describe('and concession is applied', () => {
            it('should display link to add concession and card name ends with the word \'card\'', () => {
                let mockResults = new ConcessionApplied('333 333-333G', 'Health Care Card', false);
                fetchConcessionStatusDetailsSpy.and.returnValue(Observable.of(mockResults));
                fixture.detectChanges();

                assertAddConcessionLinkDisplayed(false);

                let link = de.query(By.css('.concession__add-link--disabled'));
                expect(link).toBeTruthy();

                let content = de.query(By.css('.concession__content'));
                expect(content).toBeTruthy();
                expect(content.nativeElement.textContent).toContain('You are currently receiving concession using your Health Care');
                let cardContent = de.query(By.css('.concession__content-applied-card-number'));
                expect(cardContent).toBeTruthy();
                expect(cardContent.nativeElement.textContent).toContain('no. 333 333-333G');
            });

            it('should display link to add concession and card name does not end with the word \'card\'', () => {
                let mockResults = new ConcessionApplied('333 333-333G', 'Gold Card for War Widows', false);
                fetchConcessionStatusDetailsSpy.and.returnValue(Observable.of(mockResults));
                fixture.detectChanges();

                assertAddConcessionLinkDisplayed(false);

                let cardContent = de.query(By.css('.concession__content-applied-card-number'));
                expect(cardContent).toBeTruthy();
                expect(cardContent.nativeElement.textContent).toContain('card no. 333 333-333G');
            });

            it('should display gas rebate information when customer in WA', () => {
                let mockResults = new ConcessionApplied('333 333-333G', 'Health Care Card', true);
                fetchConcessionStatusDetailsSpy.and.returnValue(Observable.of(mockResults));
                fixture.detectChanges();

                assertAddConcessionLinkDisplayed(false);

                let content = de.query(By.css('.concession__western-australia--info'));
                expect(content).toBeTruthy();
                expect(content.nativeElement.textContent).toContain('The Gas Concession Rebate isn\'t provided in Western Australia. However, adding your concession card means you');
            });
        });

        describe('and concession not applied', () => {
            it('should display link to add concession', () => {
                let mockResults = new ConcessionNotAppliedFor();
                fetchConcessionStatusDetailsSpy.and.returnValue(Observable.of(mockResults));
                fixture.detectChanges();

                assertAddConcessionLinkDisplayed(true);

                let content = de.query(By.css('.concession__content'));
                expect(content).toBeTruthy();
                expect(content.nativeElement.textContent).toContain('Concession card holders may be eligible for discounts.');
            });

            it('should display department for communities information when customer in SA', () => {
                let mockResults = new IneligibleForConcession(true, false);
                fetchConcessionStatusDetailsSpy.and.returnValue(Observable.of(mockResults));
                fixture.detectChanges();

                assertAddConcessionLinkDisplayed(false);

                let content = de.query(By.css('.concession__south-australia--info'));
                expect(content).toBeTruthy();
                expect(content.nativeElement.textContent).toContain('In South Australia, concessions are administered by the Department for Communities and Social Inclusion (DCSI).');
            });

            it('should show web chat component when multiple business partners', () => {
                let mockResults = new IneligibleForConcession(false, true);
                fetchConcessionStatusDetailsSpy.and.returnValue(Observable.of(mockResults));
                fixture.detectChanges();

                assertAddConcessionLinkDisplayed(false);
                expect(de.query(By.css('#LPConcessionMultipleBusinessPartners'))).toBeTruthy();
            });
        });

        describe('and concession is rejected', () => {
            let errorsDataMap = [
                [ ConcessionRejectedReasons.DetailsDidNotMatch, 'The concession details you provided doesn\'t match the details listed on your AGL account.', false ],
                [ ConcessionRejectedReasons.CouldNotBeValidated, 'The concession card details could not be validated.', false ],
                [ ConcessionRejectedReasons.IsIneligible, 'The concession card is ineligible. Please provide a valid concession card.', true ],
                [ ConcessionRejectedReasons.IsInvalid, 'The concession card is invalid. Please provide a valid concession card.', true ]
            ];
            errorsDataMap.forEach((data) => {
                let rejectedReason = <ConcessionRejectedReasons> data[0];
                let expectedContent = data[1];
                let canApplyForConcessionAgain = <boolean> data[2];

                it(`should display error when reason is ${ConcessionRejectedReasons[rejectedReason]}`, () => {
                    let mockResults = new ConcessionRejected(rejectedReason, canApplyForConcessionAgain);
                    fetchConcessionStatusDetailsSpy.and.returnValue(Observable.of(mockResults));
                    fixture.detectChanges();

                    assertAddConcessionLinkDisplayed(canApplyForConcessionAgain);

                    let content = de.query(By.css('.concession__rejected-application--warn'));
                    expect(content).toBeTruthy();
                    expect(content.nativeElement.textContent).toContain(expectedContent);

                    if (canApplyForConcessionAgain) {
                        expect(de.query(By.css('#LPConcessionRejected'))).toBeFalsy('#LPConcessionRejected should not be displayed');
                    } else {
                        expect(de.query(By.css('#LPConcessionRejected'))).toBeTruthy('#LPConcessionRejected should be displayed');
                    }
                });
            });
        });

        describe('and concession status service errors', () => {
            it('should display error message', () => {
                fetchConcessionStatusDetailsSpy.and.returnValue(Observable.throw('test error'));

                fixture.detectChanges();

                assertAddConcessionLinkDisplayed(false);

                let content = de.query(By.css('.concession__content--error'));
                expect(content).toBeTruthy();
                expect(content.nativeElement.textContent).toContain('Sorry we can\'t retrieve your data right now.');
            });
        });
    });

    describe('when feature flag is off', () => {
        beforeEach(() => {
            let featureFlagMockService = de.injector.get(FeatureFlagService);
            spyOn(featureFlagMockService, 'featureFlagged').and.returnValue(Observable.of(false));
        });

        it('should display link to aeo add concession', () => {
            fetchConcessionStatusDetailsSpy.and.returnValue(Observable.throw('should not be called'));
            fixture.detectChanges();

            let link = de.query(By.css('.concession__add-link'));
            expect(link).toBeTruthy();
            expect(link.nativeElement.getAttribute('href')).toBe(`${aeoBaseConcessionUrl}/aeo/home/myaccount/concession-cards`);

            let content = de.query(By.css('.concession__content'));
            expect(content).toBeTruthy();
            expect(content.nativeElement.textContent).toContain('Concession card holders may be eligible for discounts.');
        });
    });
});
