import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnergyInsightsSubscriptionComponent } from './energyInsightsSubscription.component';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '../../../../../shared/service/config.service';
import { IAccountServiceMA } from '../../../../services/account.service';
import { By } from '@angular/platform-browser';
import { MauiSecondaryNavigationModule } from '../../../../maui/secondaryNavigation';
import { MauiContainerModule } from '../../../../maui/container';
import { MauiToggleModule } from '../../../../maui/toggle';
import { LoadingModule } from '../../../../../shared/loaders/loading.module';
import { ApiService } from '../../../../../shared/service/api.service';
import { IApiRepository } from '../../../../../shared/repository/contract/iapi.repository';
import { Mock } from 'ts-mocks/lib';
import { EnergyInsightsService } from '../../../../services/energyInsights.service';
import { Observable } from 'rxjs/Observable';
import { EnergyInsightsGetContractDetailsAndEligibilityTestData } from '../../../../../test/testingData/energyInsights/energyInsights.getContractDetailsAndEligibility.testdata';
import { AccountsTestData } from '../../../../../test/testingData/accounts.testdata';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { MauiButtonModule } from '../../../../maui/button';
import { MauiFlashMessageModule } from '../../../../maui/flashMessage';
import { FeatureFlagTypes } from '../../../../services/featureFlag.constants';

let comp: EnergyInsightsSubscriptionComponent;
let fixture: ComponentFixture<EnergyInsightsSubscriptionComponent>;
let de: DebugElement;

describe('Energy Insights Component', () => {
    let mockEnergyInsightsService: Mock<EnergyInsightsService>;
    let mockAccountService: Mock<IAccountServiceMA>;
    let mockFeatureFlagService: Mock<FeatureFlagService>;
    let getEligibilityAndSubscriptionStatusSpy: jasmine.Spy;
    let setupEnergyInsightsSpy: jasmine.Spy;
    let getContractDetailsAndEligibilitySpy: jasmine.Spy;
    let verifyAccountDetailsSpy: jasmine.Spy;
    let getAccountsSpy: jasmine.Spy;
    let featureFlaggedSpy: jasmine.Spy;
    let shouldDisplayBackButtonSpy: jasmine.Spy;

    beforeAll(() => {
        mockEnergyInsightsService = new Mock<EnergyInsightsService>();
        mockAccountService = new Mock<IAccountServiceMA>();
        mockFeatureFlagService = new Mock<FeatureFlagService>();

        getEligibilityAndSubscriptionStatusSpy = mockEnergyInsightsService
            .setup((x) => x.getAccountStatus)
            .is(() => {
                return Observable.of(null);
            }).Spy;

        setupEnergyInsightsSpy = mockEnergyInsightsService
            .setup((x) => x.setupEnergyInsights)
            .is(() => {
                return Observable.of(null);
            }).Spy;

        getContractDetailsAndEligibilitySpy = mockEnergyInsightsService
            .setup((x) => x.getContractDetailsAndEligibility)
            .is(() => {
                return Observable.of(null);
            }).Spy;

        verifyAccountDetailsSpy = mockEnergyInsightsService
            .setup((x) => x.verifySingleAccountDetails)
            .is(() => {
                return null;
            }).Spy;

        getAccountsSpy = mockAccountService
            .setup((x) => x.getAccounts)
            .is(() => {
                return Observable.of(null);
            }).Spy;

        shouldDisplayBackButtonSpy = mockEnergyInsightsService
            .setup((x) => x.shouldDisplayBackButton)
            .is(() => {
                return null;
            }).Spy;

        featureFlaggedSpy = mockFeatureFlagService
            .setup((x) => x.featureFlagged)
            .is((featureFlagType: FeatureFlagTypes) => {
                switch (featureFlagType) {
                    case FeatureFlagTypes.energyInsightsEnabled:
                        return Observable.of(true);
                    case FeatureFlagTypes.contactDetailsEnabled:
                        return Observable.of(true);
                    default:
                        throw new Error(`Feature Flag: ${featureFlagType} Not mocked`);
                }
            }).Spy;
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                EnergyInsightsSubscriptionComponent,
            ],
            imports: [
                RouterTestingModule,
                MauiContainerModule,
                MauiToggleModule,
                MauiSecondaryNavigationModule,
                LoadingModule,
                MauiButtonModule,
                MauiFlashMessageModule,
            ],
            providers: [
                ConfigService,
                { provide: EnergyInsightsService, useValue: mockEnergyInsightsService.Object },
                { provide: IAccountServiceMA, useValue: mockAccountService.Object },
                { provide: FeatureFlagService, useValue: mockFeatureFlagService.Object },
                IApiRepository
            ]
        });

        fixture = TestBed.createComponent(EnergyInsightsSubscriptionComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('display', () => {
        it('should display secondary navigation toolbar', () => {
            AccountsTestData.ClintEastwood[0].contracts[0].fuelType = 'Electricity';
            AccountsTestData.ClintEastwood[0].contracts[0].isSmartMeter = true;
            getContractDetailsAndEligibilitySpy.and.returnValue(Observable.of(EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood));
            comp.energyInsightsService.selectedEnergyInsightsContract = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[0];
            fixture.detectChanges();
            let linkElement = de.query(By.css('agl-maui-secondary-navigation'));
            expect(linkElement).toBeDefined();
        });
        it('should display header', () => {
            AccountsTestData.ClintEastwood[0].contracts[0].fuelType = 'Electricity';
            AccountsTestData.ClintEastwood[0].contracts[0].isSmartMeter = true;
            comp.energyInsightsService.selectedEnergyInsightsContract = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[0];
            fixture.detectChanges();
            let headerElement = de.query(By.css('.energy-insights__header'));
            expect(headerElement.nativeElement.innerText).toMatch('Knowledge is power');
        });

        it('should display link to Learn More', () => {
            comp.energyInsightsService.selectedEnergyInsightsContract = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[0];
            fixture.detectChanges();
            let linkElement = de.query(By.css('.energy-insights__body .link-button'));
            expect(linkElement.nativeElement.innerText).toMatch('Learn more about Energy Insights');
        });

        it('should display primary link to Home Profile', () => {
            comp.energyInsightsService.selectedEnergyInsightsContract = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[0];
            fixture.detectChanges();
            let linkElement = de.query(By.css('.energy-insights-home-profile__button--primary agl-maui-button'));
            expect(linkElement.nativeElement.innerText).toMatch('SET UP YOUR HOME PROFILE');
        });

        it('should display no thanks link to Overview', () => {
            comp.energyInsightsService.selectedEnergyInsightsContract = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[0];
            fixture.detectChanges();
            let linkElement = de.query(By.css('.energy-insights-home-profile__button--secondary'));
            expect(linkElement.nativeElement.innerText).toMatch(`NO THANKS, I'M DONE`);
        });
    });

    describe('Contract- Subscription', () => {
        it('should display correct subscription for the contract - No Suscription', () => {
            AccountsTestData.ClintEastwood[0].contracts[0].fuelType = 'Electricity';
            AccountsTestData.ClintEastwood[0].contracts[0].isSmartMeter = true;
            comp.energyInsightsService.selectedEnergyInsightsContract = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[0];
            getContractDetailsAndEligibilitySpy.and.returnValue(Observable.of(EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood));
            de = fixture.debugElement;
            fixture.detectChanges();
            let toggleInput = de.queryAll(By.css('.maui-toggle--active__input'));
            expect(toggleInput[0].nativeElement.checked).toBe(false);
            expect(toggleInput[1].nativeElement.checked).toBe(false);
        });

        it('should display correct subscription for the contract - Mid bill Suscription', () => {
            AccountsTestData.ClintEastwood[0].contracts[0].fuelType = 'Electricity';
            AccountsTestData.ClintEastwood[0].contracts[0].isSmartMeter = true;
            comp.energyInsightsService.selectedEnergyInsightsContract = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwoodWithMidSubscription[0];
            de = fixture.debugElement;
            fixture.detectChanges();
            let toggleInput = de.queryAll(By.css('.maui-toggle--active__input'));
            expect(toggleInput[0].nativeElement.checked).toBe(true);
            expect(toggleInput[1].nativeElement.checked).toBe(false);
        });

        it('should display correct subscription for the contract - End bill Suscription', () => {
            AccountsTestData.ClintEastwood[0].contracts[0].fuelType = 'Electricity';
            AccountsTestData.ClintEastwood[0].contracts[0].isSmartMeter = true;
            comp.energyInsightsService.selectedEnergyInsightsContract = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwoodWithEndSubscription[0];
            de = fixture.debugElement;
            fixture.detectChanges();
            let toggleInput = de.queryAll(By.css('.maui-toggle--active__input'));
            expect(toggleInput[0].nativeElement.checked).toBe(false);
            expect(toggleInput[1].nativeElement.checked).toBe(true);
        });

        it('should display correct subscription for the contract - Both bill Suscription', () => {
            AccountsTestData.ClintEastwood[0].contracts[0].fuelType = 'Electricity';
            AccountsTestData.ClintEastwood[0].contracts[0].isSmartMeter = true;
            comp.energyInsightsService.selectedEnergyInsightsContract = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwoodWithBothSubscription[0];
            de = fixture.debugElement;
            fixture.detectChanges();
            let toggleInput = de.queryAll(By.css('.maui-toggle--active__input'));
            expect(toggleInput[0].nativeElement.checked).toBe(true);
            expect(toggleInput[1].nativeElement.checked).toBe(true);
        });
    });

    describe('Contract- Subscription interaction', () => {
        it('should toggle ON when clicking an non subscription', () => {
            AccountsTestData.ClintEastwood[0].contracts[0].fuelType = 'Electricity';
            AccountsTestData.ClintEastwood[0].contracts[0].isSmartMeter = true;
            comp.energyInsightsService.selectedEnergyInsightsContract = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[0];
            de = fixture.debugElement;
            fixture.detectChanges();
            let toggleInput = de.queryAll(By.css('.maui-toggle--active__input'));
            expect(toggleInput[0].nativeElement.checked).toBe(false);
            expect(toggleInput[1].nativeElement.checked).toBe(false);
            toggleInput[0].triggerEventHandler('click', null);
            fixture.detectChanges();

            expect(toggleInput[0].nativeElement.checked).toBe(true);
            expect(toggleInput[1].nativeElement.checked).toBe(false);
        });

        it('should toggle OFF when clicking an subscribed control', () => {
            AccountsTestData.ClintEastwood[0].contracts[0].fuelType = 'Electricity';
            AccountsTestData.ClintEastwood[0].contracts[0].isSmartMeter = true;
            comp.energyInsightsService.selectedEnergyInsightsContract = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[0];
            de = fixture.debugElement;
            fixture.detectChanges();
            let toggleInput = de.queryAll(By.css('.maui-toggle--active__input'));
            expect(toggleInput[0].nativeElement.checked).toBe(true);
            expect(toggleInput[1].nativeElement.checked).toBe(false);
            toggleInput[0].triggerEventHandler('click', null);
            fixture.detectChanges();

            expect(toggleInput[0].nativeElement.checked).toBe(false);
            expect(toggleInput[1].nativeElement.checked).toBe(false);
        });
    });
});
