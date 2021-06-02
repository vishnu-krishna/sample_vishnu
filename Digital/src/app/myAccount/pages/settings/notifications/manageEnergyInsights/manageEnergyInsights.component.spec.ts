import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { Mock } from 'ts-mocks/lib';
import { Observable } from 'rxjs/Observable';

import { MauiFlashMessageModule } from './../../../../maui/flashMessage/flashMessage.module';
import { NotificationsComponent } from '../notifications.component';
import { EnergyInsightsService } from '../../../../services/energyInsights.service';
import { ManageEnergyInsightsComponent } from './manageEnergyInsights.component';
import { MauiToggleModule } from '../../../../maui/toggle/toggle.module';
import { ContractEnergyInsightsModel } from '../../../../services/settings/model/contractEnergyInsightsModel';
import { ContractViewModel } from '../../../../services/account.service';
import { MauiTooltipModule } from '../../../../maui/tooltip';
import { ManageEnergyInsightsComponentModel } from './manageEnergyInsightsComponentModel';
import { CommonPipesModule } from '../../../../modules/commonPipes.module';
import { NotificationsModule } from '../notifications.module';
import { EnergyInsightsEligibilityContract } from '../../../../services/settings/model/energyInsightsEligibilityContract';
import { Reason } from '../../../../services/settings/model/reason';
import { EnergyInsightsIneligibleReason } from '../../energyInsights/energyInsightsIneligibleReason.enum';
import { EnergyInsightsGetContractDetailsAndEligibilityTestData } from '../../../../../test/testingData/energyInsights/energyInsights.getContractDetailsAndEligibility.testdata';

describe('Manage Energy Insights Component Tests', () => {

    let comp: ManageEnergyInsightsComponent;
    let fixture: ComponentFixture<ManageEnergyInsightsComponent>;
    let de: DebugElement;

    let mockEnergyInsightsService: Mock<EnergyInsightsService> = new Mock<EnergyInsightsService>();
    let setupEnergyInsightsSpy: jasmine.Spy = null;

    beforeEach(() => {
        this.setupEnergyInsightsSpy = mockEnergyInsightsService
            .setup((service: EnergyInsightsService) => service.setupEnergyInsights)
            .is(() => {
                return null;
            }).Spy;

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NotificationsModule
            ],
            providers: [
                { provide: EnergyInsightsService, useValue: mockEnergyInsightsService.Object }
            ]
        });

        fixture = TestBed.createComponent(ManageEnergyInsightsComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('Manage Energy Insights component for single contract', () => {
        it('should display correctly if there are no subscriptions', () => {
            // ARRANGE
            comp.energyInsightsSubscriptionModels = [new ManageEnergyInsightsComponentModel(createEnergyInsightsContractDetailsData())];

            // ACT
            fixture.detectChanges();

            // ASSERT
            let toggleInput = de.queryAll(By.css('.maui-toggle--active__input'));
            expect(toggleInput[0].nativeElement.checked).toBe(false);
            expect(toggleInput[1].nativeElement.checked).toBe(false);
        });

        it('should display the mid-bill subscription', () => {
            // ARRANGE
            let eligibility: EnergyInsightsEligibilityContract = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 98765,
                isEligible: true,
                subscribedToMidBillEnergyBreakdown: true,
                subscribedToEndBillEnergyBreakdown: false,
            };
            let contractEnergyInsightsModel: ContractEnergyInsightsModel = {
                accountNumber: '123456',
                contract: new ContractViewModel('98765'),
                energyInsightsEligibility: eligibility,
                email: 'johnny@gmail.com',
                address: '123 Bourke St, Docklands 3000'
            };
            comp.energyInsightsSubscriptionModels = [new ManageEnergyInsightsComponentModel(contractEnergyInsightsModel)];

            // ACT
            fixture.detectChanges();

            // ASSERT
            let toggleInput = de.queryAll(By.css('.maui-toggle--active__input'));
            expect(toggleInput[0].nativeElement.checked).toBe(true);
            expect(toggleInput[1].nativeElement.checked).toBe(false);
        });

        it('should display the end-bill subscription', () => {
            // ARRANGE
            let eligibility: EnergyInsightsEligibilityContract = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 98765,
                isEligible: true,
                subscribedToMidBillEnergyBreakdown: false,
                subscribedToEndBillEnergyBreakdown: true
            };
            comp.energyInsightsSubscriptionModels = [new ManageEnergyInsightsComponentModel(createEnergyInsightsContractDetailsData(eligibility))];

            // ACT
            fixture.detectChanges();

            // ASSERT
            let toggleInput = de.queryAll(By.css('.maui-toggle--active__input'));
            expect(toggleInput[0].nativeElement.checked).toBe(false);
            expect(toggleInput[1].nativeElement.checked).toBe(true);
        });

        it('should subscribe to the end-bill subscription', () => {
            // ARRANGE
            let eligibility: EnergyInsightsEligibilityContract = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 98765,
                isEligible: true,
                subscribedToMidBillEnergyBreakdown: true,
                subscribedToEndBillEnergyBreakdown: false
            };

            comp.energyInsightsSubscriptionModels = [new ManageEnergyInsightsComponentModel(createEnergyInsightsContractDetailsData(eligibility))];
            this.setupEnergyInsightsSpy.and.returnValue(Observable.of(true));

            // ACT
            fixture.detectChanges();

            // ASSERT
            let toggleInput = de.queryAll(By.css('.maui-toggle--active__input'));
            expect(toggleInput[0].nativeElement.checked).toBe(true);
            expect(toggleInput[1].nativeElement.checked).toBe(false);

            // ACT
            toggleInput[1].triggerEventHandler('click', null);
            fixture.detectChanges();

            // ASSERT
            expect(toggleInput[1].nativeElement.checked).toBe(true);
        });

        it('should unsubscribe to the mid-bill subscription', () => {
            // ARRANGE
            let eligibility: EnergyInsightsEligibilityContract = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 98765,
                isEligible: true,
                subscribedToMidBillEnergyBreakdown: true,
                subscribedToEndBillEnergyBreakdown: false
            };
            comp.energyInsightsSubscriptionModels = [new ManageEnergyInsightsComponentModel(createEnergyInsightsContractDetailsData(eligibility))];
            this.setupEnergyInsightsSpy.and.returnValue(Observable.of(true));

            // ACT
            fixture.detectChanges();

            // ASSERT
            let toggleInput = de.queryAll(By.css('.maui-toggle--active__input'));
            expect(toggleInput[0].nativeElement.checked).toBe(true);
            expect(toggleInput[1].nativeElement.checked).toBe(false);

            // ACT
            toggleInput[0].triggerEventHandler('click', null);
            fixture.detectChanges();

            // ASSERT
            expect(toggleInput[0].nativeElement.checked).toBe(false);
        });

        it('should show an information message if account not eligible', () => {
            // ARRANGE
            let ineligibilityReason: Reason = {
                message: 'Non-elec site. not eligible for energy insight registration',
                internal: {
                    id: 'ZIDM_ENERGY_INSIGHT',
                    number: '023',
                    description: 'Unable to Register for Energy Insights as your service is not active until 28102020. Please try again after this date'
                }
            };

            let eligibility: EnergyInsightsEligibilityContract = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 98765,
                isEligible: false,
                subscribedToMidBillEnergyBreakdown: true,
                subscribedToEndBillEnergyBreakdown: false,
                ineligibleReason: ineligibilityReason,
                reasonForIneligibility: EnergyInsightsIneligibleReason.ServiceNotActive,
                ineligibilityMessage: `Your energy account isn’t active yet. Please check back soon.`,
            };
            comp.energyInsightsSubscriptionModels = [new ManageEnergyInsightsComponentModel(createEnergyInsightsContractDetailsData(eligibility))];
            this.setupEnergyInsightsSpy.and.returnValue(Observable.of(true));

            // ACT
            fixture.detectChanges();

            // ASSERT
            let ineligibleFlashMessage = fixture.nativeElement.querySelector('.maui-flash-message__content').textContent;
            expect(ineligibleFlashMessage).toBeDefined();
            expect(ineligibleFlashMessage).toContain(`Your energy account isn’t active yet. Please check back soon.`);
        });

        it('Single Account with multiple eligible elec contracts should display contract number', () => {
            let contractEnergyInsightsModel: ContractEnergyInsightsModel = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[0];
            let contractEnergyInsightsModel2: ContractEnergyInsightsModel = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[1];
            let MEIModel1 = new ManageEnergyInsightsComponentModel(contractEnergyInsightsModel);
            let MEIModel2 = new ManageEnergyInsightsComponentModel(contractEnergyInsightsModel2);
            spyOnProperty(MEIModel1, 'accountNumber').and.returnValue(contractEnergyInsightsModel.accountNumber);
            spyOnProperty(MEIModel2, 'accountNumber').and.returnValue(contractEnergyInsightsModel2.accountNumber);
            spyOnProperty(MEIModel1, 'isElectricityContract').and.returnValue(true);
            spyOnProperty(MEIModel2, 'isElectricityContract').and.returnValue(true);

            let multiContract: ManageEnergyInsightsComponentModel[] = [
                MEIModel1,
                MEIModel2,
            ];
            comp.energyInsightsSubscriptionModels = multiContract;

            fixture.detectChanges();
            let contractNumberElement = de.query(By.css('.energy-insights__contract-number')).nativeElement.innerText;
            expect(contractNumberElement).toContain('Contract');
        });
    });

    describe('Manage Energy insights component for multiple eligible contracts', () => {

        it('should display both eligible contracts with the correct subscription toggles', () => {
            // SETUP
            let eligibleContract1 = createEnergyInsightsContractDetailsData();

            let eligibility: EnergyInsightsEligibilityContract = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 91222333,
                isEligible: true,
                subscribedToMidBillEnergyBreakdown: true,
                subscribedToEndBillEnergyBreakdown: false
            };

            let contractEnergyInsightsModel: ContractEnergyInsightsModel = {
                accountNumber: '123456',
                contract: new ContractViewModel('91222333'),
                energyInsightsEligibility: eligibility,
                email: 'johnny@gmail.com',
                address: '123 Bourke St, Docklands 3000'
            };

            let multiContract: ManageEnergyInsightsComponentModel[] = [
            new ManageEnergyInsightsComponentModel(eligibleContract1),
            new ManageEnergyInsightsComponentModel(contractEnergyInsightsModel)
            ];

            comp.energyInsightsSubscriptionModels = multiContract;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let energyInsightsToggleContainer = de.queryAll(By.css('.main-card-options__container'));
            let toggleInputs = de.queryAll(By.css('.maui-toggle--active__input'));

            expect(energyInsightsToggleContainer.length).toBe(2);
            expect(toggleInputs.length).toBe(4);
            expect(toggleInputs[0].nativeElement.checked).toBe(false);
            expect(toggleInputs[1].nativeElement.checked).toBe(false);
            expect(toggleInputs[2].nativeElement.checked).toBe(true);
            expect(toggleInputs[3].nativeElement.checked).toBe(false);
        });

        it('Multiple Accounts with single eligible elec contract should display account number', () => {
            let contractEnergyInsightsModel: ContractEnergyInsightsModel = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[0];
            contractEnergyInsightsModel.accountNumber = '90428799';
            let contractEnergyInsightsModel2: ContractEnergyInsightsModel = EnergyInsightsGetContractDetailsAndEligibilityTestData.ClintEastwood[1];
            let MEIModel1 = new ManageEnergyInsightsComponentModel(contractEnergyInsightsModel);
            let MEIModel2 = new ManageEnergyInsightsComponentModel(contractEnergyInsightsModel2);
            spyOnProperty(MEIModel1, 'accountNumber').and.returnValue(contractEnergyInsightsModel.accountNumber);
            spyOnProperty(MEIModel2, 'accountNumber').and.returnValue(contractEnergyInsightsModel2.accountNumber);
            spyOnProperty(MEIModel1, 'isElectricityContract').and.returnValue(true);
            spyOnProperty(MEIModel2, 'isElectricityContract').and.returnValue(true);

            let multiContract: ManageEnergyInsightsComponentModel[] = [
                MEIModel1,
                MEIModel2,
            ];
            comp.energyInsightsSubscriptionModels = multiContract;

            fixture.detectChanges();
            let accountNumberElement = de.query(By.css('.energy-insights__account-number')).nativeElement.innerText;
            expect(accountNumberElement).toContain('Account');
        });

    });

    describe('Manage energy insights for eligible and ineligble accounts', () => {

        it('should display toggles for eligible account and a flash message for ineligble account', () => {
            // SETUP
            let eligibleContract = createEnergyInsightsContractDetailsData();

            let ineligibilityReason: Reason = {
                message: 'Non-elec site. not eligible for energy insight registration',
                internal: {
                    id: 'ZIDM_ENERGY_INSIGHT',
                    number: '023',
                    description: 'Unable to Register for Energy Insights as your service is not active until 28102020. Please try again after this date'
                }
            };

            let ineligibility: EnergyInsightsEligibilityContract = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 91222333,
                isEligible: false,
                subscribedToMidBillEnergyBreakdown: false,
                subscribedToEndBillEnergyBreakdown: false,
                ineligibleReason: ineligibilityReason,
                reasonForIneligibility: EnergyInsightsIneligibleReason.ServiceNotActive,
                ineligibilityMessage: `Your energy account isn’t active yet. Please check back soon.`,
            };

            let contractEnergyInsightsModel: ContractEnergyInsightsModel = {
                accountNumber: '456789',
                contract: new ContractViewModel('91222333'),
                energyInsightsEligibility: ineligibility,
                email: 'johnny@gmail.com',
                address: '123 Bourke St, Docklands 3000'
            };

            let multiContract: ManageEnergyInsightsComponentModel[] = [
            new ManageEnergyInsightsComponentModel(eligibleContract),
            new ManageEnergyInsightsComponentModel(contractEnergyInsightsModel)
            ];

            comp.energyInsightsSubscriptionModels = multiContract;

            // ACT
            fixture.detectChanges();

            // ASSERT
            let energyInsightsToggleContainer = de.queryAll(By.css('.main-card-options__container'));
            let toggleInputs = de.queryAll(By.css('.maui-toggle--active__input'));

            expect(energyInsightsToggleContainer.length).toBe(2);
            expect(toggleInputs.length).toBe(2);
            expect(toggleInputs[0].nativeElement.checked).toBe(false);
            expect(toggleInputs[1].nativeElement.checked).toBe(false);

            let ineligibleFlashMessage = fixture.nativeElement.querySelector('.maui-flash-message__content').textContent;

            expect(ineligibleFlashMessage).toBeDefined();
            expect(ineligibleFlashMessage).toContain(`Your energy account isn’t active yet. Please check back soon.`);
        });
    });

    let createEnergyInsightsContractDetailsData = (energyInsightsEligibility: EnergyInsightsEligibilityContract = null): ContractEnergyInsightsModel => {
        // SETUP
        if (energyInsightsEligibility === null) {
            energyInsightsEligibility = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 98765,
                isEligible: true,
                subscribedToMidBillEnergyBreakdown: false,
                subscribedToEndBillEnergyBreakdown: false,
            };
        }

        let contractEnergyInsightsModel: ContractEnergyInsightsModel = {
            accountNumber: '123456',
            contract: new ContractViewModel('98765'),
            energyInsightsEligibility: energyInsightsEligibility,
            email: 'johnny@gmail.com',
            address: '123 Bourke St, Docklands 3000'
        };

        return contractEnergyInsightsModel;
   };

});
