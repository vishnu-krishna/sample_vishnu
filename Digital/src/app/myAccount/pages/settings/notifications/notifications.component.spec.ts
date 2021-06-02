
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { Mock } from 'ts-mocks/lib';
import { Observable } from 'rxjs/Observable';

import { NotificationsModule } from './notifications.module';
import { NotificationsComponent } from './notifications.component';
import { EnergyInsightsService } from '../../../services/energyInsights.service';
import { FeatureFlagService } from '../../../services/featureFlag.service';
import { ContractEnergyInsightsModel } from '../../../services/settings/model/contractEnergyInsightsModel';
import { ContractViewModel, AccountViewModel, IAccountServiceMA } from '../../../services/account.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { EnergyInsightsApiRepository } from '../../../repository/energyInsightsApi.repository';
import { BillDeliveryMethodType } from '../../../services/settings/model';
import { ISettingsService } from '../../../services/settings/settings.service.interface';
import { IContactDetailsStateService, ContactDetailsStateService } from '../contactDetails/contactDetailsState.service';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { DataLayerStubService } from './../../../../test/stubs/dataLayer.stub.service';
import { ContactDetailModel, BusinessPartnerModel } from './../../../../shared/service/api.service';
import { BillDeliveryContactDetailModel } from './../../../services/settings/model/billDeliveryContactDetailModel';
import { ApiService } from '../../../../shared/service/api.service';
import { EnergyInsightsEligibilityContract } from '../../../services/settings/model/energyInsightsEligibilityContract';

describe('Settings NotificationsComponent Tests', () => {

    let comp: NotificationsComponent;
    let fixture: ComponentFixture<NotificationsComponent>;
    let de: DebugElement;

    let mockEnergyInsightsService: Mock<EnergyInsightsService> = new Mock<EnergyInsightsService>();
    let mockAccountService = new Mock<IAccountServiceMA>();
    let mockFeatureFlagService: Mock<FeatureFlagService> = new Mock<FeatureFlagService>();
    let mockSettingsService: Mock<ISettingsService> = new Mock<ISettingsService>();
    const emptyMockService = {};

    let spies: {
        getFeatureFlag: jasmine.Spy,
        getAccounts: jasmine.Spy,
        getContractDetailsAndEligibility: jasmine.Spy,
        getBillDeliveryMethodPreferences: jasmine.Spy,
        verifyAccountDetails: jasmine.Spy
    } = {
        getFeatureFlag: null,
        getAccounts: null,
        getContractDetailsAndEligibility: null,
        getBillDeliveryMethodPreferences: null,
        verifyAccountDetails: null
    };

    beforeEach(() => {
        spies.getContractDetailsAndEligibility = mockEnergyInsightsService
            .setup((service: EnergyInsightsService) => service.getContractDetailsAndEligibility)
            .is(() => {
                return null;
            }).Spy;

        spies.verifyAccountDetails = mockEnergyInsightsService
            .setup((service: EnergyInsightsService) => service.verifySingleAccountDetails)
            .is(() => {
                return null;
            }).Spy;
        spies.getAccounts = mockAccountService
            .setup((service) => service.getAccounts)
            .is(() => {
                return null;
            }).Spy;

        spies.getAccounts = mockAccountService
            .setup((service) => service.getAccounts)
            .is(() => {
                return null;
            }).Spy;

        spies.getFeatureFlag = mockFeatureFlagService
            .setup((service: FeatureFlagService) => service.featureFlagged)
            .is(() => {
                return null;
            }).Spy;

        spies.getBillDeliveryMethodPreferences = mockSettingsService
            .setup((service: ISettingsService) => service.getBillDeliveryMethodPreferences)
            .is(() => {
                return null;
            }).Spy;

        TestBed.configureTestingModule({
            imports: [
                NotificationsModule,
                RouterTestingModule
            ],
            providers: [
                ConfigService,
                { provide: IAccountServiceMA, useValue: mockAccountService.Object },
                { provide: FeatureFlagService, useValue: mockFeatureFlagService.Object },
                { provide: EnergyInsightsService, useValue: mockEnergyInsightsService.Object },
                { provide: ISettingsService, useValue: mockSettingsService.Object },
                { provide: IContactDetailsStateService, useClass: ContactDetailsStateService },
                { provide: DataLayerService, useClass: DataLayerStubService }
            ]
        });

        fixture = TestBed.createComponent(NotificationsComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('Settings Notification component', () => {
        it('Header should be Notifications', () => {
            let headingElem = de.query(By.css('.main-card-header')).nativeElement;
            expect(headingElem.textContent).toBe('Notifications');
        });

        it('should display the eBilling section if feature flag is on', () => {
            // ACT
            spies.getFeatureFlag.and.returnValue(Observable.of(true));
            spies.getAccounts.and.returnValue(Observable.of([new AccountViewModel('123456')]));
            spies.getContractDetailsAndEligibility.and.returnValue(Observable.throw('Error - Method not mocked'));
            spies.getBillDeliveryMethodPreferences.and.returnValue(Observable.of(createBillDeliverySetupDetail()));
            spies.verifyAccountDetails.and.returnValue(true);
            fixture.detectChanges();

            // ASSERT
            let eBillingComponent = de.query(By.css('agl-settings-ebilling'));
            expect(eBillingComponent).toBeDefined();
        });

        it('should show the energy insights for eligible contract', () => {
            // SETUP
            let energyInsightsEligibility: EnergyInsightsEligibilityContract = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 98765,
                isEligible: true,
                subscribedToMidBillEnergyBreakdown: true,
                subscribedToEndBillEnergyBreakdown: true
            };
            let energyInsightsContractDetails = createEnergyInsightsContractDetailsData(energyInsightsEligibility);

            // ACT
            spies.getFeatureFlag.and.returnValue(Observable.of(true));
            spies.getAccounts.and.returnValue(Observable.of([new AccountViewModel('123456')]));
            spies.getContractDetailsAndEligibility.and.returnValue(Observable.of(energyInsightsContractDetails));
            spies.getBillDeliveryMethodPreferences.and.returnValue(Observable.throw('Error - Method not mocked'));
            fixture.detectChanges();

            // ASSERT
            let energyInsightsComponent = de.query(By.css('agl-settings-manage-energy-insights'));
            expect(energyInsightsComponent).toBeDefined();
        });

        it('should not display energy insights if feature flag is off', () => {
            // SETUP and ACT
            spies.getFeatureFlag.and.returnValue(Observable.of(false));
            spies.getAccounts.and.returnValue(Observable.of([new AccountViewModel('123456')]));
            spies.getBillDeliveryMethodPreferences.and.returnValue(Observable.throw('Error - Method not mocked'));
            spies.getContractDetailsAndEligibility.and.returnValue(Observable.throw('Error - Method not mocked'));
            fixture.detectChanges();

            // ASSERT
            let energyInsightsComponent = de.query(By.css('agl-settings-manage-energy-insights'));
            expect(energyInsightsComponent).toBeNull();

        });

        it('should not show the energy insights for ineligible contract', () => {
            // SETUP
            let energyInsightsEligibility: EnergyInsightsEligibilityContract = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 98765,
                isEligible: false
            };
            let contractEnergyInsightsModel = createEnergyInsightsContractDetailsData(energyInsightsEligibility);

            // ACT
            spies.getContractDetailsAndEligibility.and.returnValue(Observable.of(contractEnergyInsightsModel));
            spies.getBillDeliveryMethodPreferences.and.returnValue(Observable.throw('Error - Method not mocked'));
            spies.getFeatureFlag.and.returnValue(Observable.of(true));
            spies.getAccounts.and.returnValue(Observable.of([new AccountViewModel('123456')]));
            fixture.detectChanges();

            // ASSERT
            let energyInsightsComponent = de.query(By.css('agl-settings-manage-energy-insights'));
            expect(energyInsightsComponent).toBeNull();
        });

        it('should show flash message for contract that was previously eligible', () => {
            // SETUP
            let energyInsightsEligibility: EnergyInsightsEligibilityContract = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 98765,
                isEligible: false,
                subscribedToMidBillEnergyBreakdown: true,
                subscribedToEndBillEnergyBreakdown: true
            };
            let contractEnergyInsightsModel = createEnergyInsightsContractDetailsData(energyInsightsEligibility);

            // ACT
            spies.getAccounts.and.returnValue(Observable.of([new AccountViewModel('123456', [new ContractViewModel('98765')])]));
            spies.getContractDetailsAndEligibility.and.returnValue(Observable.of(contractEnergyInsightsModel));
            spies.getFeatureFlag.and.returnValue(Observable.of(Observable.of(true)));
            spies.getBillDeliveryMethodPreferences.and.returnValue(Observable.throw('Error - Method not mocked'));
            fixture.detectChanges();

            // ASSERT
            let energyInsightsComponent = de.query(By.css('agl-settings-manage-energy-insights'));
            let flashMessage = de.query(By.css('agl-maui-flash-message'));
            expect(energyInsightsComponent).toBeNull();
            expect(flashMessage).toBeDefined();
        });

        describe(`Communications section`, () => {
            it(`should not display account list for single account`, () => {
                // Act
                spies.getFeatureFlag.and.returnValue(Observable.of(true));
                spies.getAccounts.and.returnValue(Observable.of([new AccountViewModel('123456')]));
                spies.getBillDeliveryMethodPreferences.and.returnValue(Observable.throw('Error - Method not mocked'));
                spies.getContractDetailsAndEligibility.and.returnValue(Observable.throw('Error - Method not mocked'));
                fixture.detectChanges();
                // Assert
                expect(comp.accountList).toBeDefined();
                expect(de.query(By.css('.accounts'))).toBeNull();
            });

            it(`should interact correctly with multi-account`, () => {
                    // Arrange
                    let contract1: ContractViewModel = new ContractViewModel(`1121`);
                    contract1.fuelType = `gas`;
                    let contract2: ContractViewModel = new ContractViewModel(`2312`);
                    contract2.fuelType = `electricity`;
                    contract2.address = `89 A Street`;
                    let contract3: ContractViewModel = new ContractViewModel(`2316`);
                    contract3.address = `44 Negativegeared Cresent`;
                    let account1: AccountViewModel = new AccountViewModel(`123123`, [contract1]);
                    account1.groupedAddress = `42 Only Way`;
                    let account2: AccountViewModel = new AccountViewModel(`123124`, [contract2, contract3]);
                    account2.groupedAddress = ``;
                    // Act
                    spies.getFeatureFlag.and.returnValue(Observable.of(true));
                    spies.getAccounts.and.returnValue(Observable.of([account1, account2]));
                    spies.getBillDeliveryMethodPreferences.and.returnValue(Observable.throw('Error - Method not mocked'));
                    spies.getContractDetailsAndEligibility.and.returnValue(Observable.throw('Error - Method not mocked'));
                    fixture.detectChanges();
                    // Assert
                    expect(comp.accountList.length).toBe(2);
                    expect(de.query(By.css('.accounts'))).toBeDefined();
                    expect(comp.accountHasElectricity(comp.accountList[0])).toBeFalsy();
                    expect(comp.accountHasGas(comp.accountList[0])).toBeTruthy();
                    expect(comp.accountHasElectricity(comp.accountList[1])).toBeTruthy();
                    expect(comp.accountHasGas(comp.accountList[1])).toBeFalsy();
                    expect(comp.getAccountAddresses(account1)).toEqual([`42 Only Way`]);
                    expect(comp.getAccountAddresses(account2)).toEqual([`89 A Street`, `44 Negativegeared Cresent`]);
            });
        });
    });

    let createBillDeliverySetupDetail = (): BillDeliveryContactDetailModel[] => {
        // SETUP
        let businessPartnerModel: BusinessPartnerModel = {
            businessPartnerNumber: '1234',
            phone: '',
            mobile: '',
            hasDateOfBirth: false,
            email: 'tester@gmail.com',
            firstName: 'bob',
            lastName: 'john'
        };

        let contactDetail: ContactDetailModel = {
            hasMultipleBusinessPartners: false,
            businessPartners: [businessPartnerModel]
        };

        let billDeliveryContactDetailModel: BillDeliveryContactDetailModel[] = [{
            accountNumber: '123456',
            billDeliveryPreference: BillDeliveryMethodType.Email,
            contactDetails: contactDetail
        }];

        return billDeliveryContactDetailModel;
    };

    let createEnergyInsightsContractDetailsData = (energyInsightsEligibility?: EnergyInsightsEligibilityContract): ContractEnergyInsightsModel[] => {
         // SETUP
        if (energyInsightsEligibility) {
            energyInsightsEligibility = {
                ...new EnergyInsightsEligibilityContract(),
                contractNumber: 98765,
                isEligible: true,
                subscribedToMidBillEnergyBreakdown: false,
                subscribedToEndBillEnergyBreakdown: false
                };
        }

        let contractEnergyInsightsModel: ContractEnergyInsightsModel[] = [{
            accountNumber: '123456',
            contract: new ContractViewModel('98765'),
            energyInsightsEligibility: energyInsightsEligibility,
            email: 'johnny@gmail.com',
            address: '123 Bourke St, Docklands 3000'
        }];

        return contractEnergyInsightsModel;
    };
});
