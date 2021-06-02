import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Mock } from 'ts-mocks';

import { LoadingComponent } from '../../../../../shared/loaders/loading.component';
import { ApiService } from '../../../../../shared/service/api.service';
import { ConfigService } from '../../../../../shared/service/config.service';
import { ApiStubService } from '../../../../../test/stubs/api.stub.service';
import { MonthlyBillingGetMonthlyBillingInfoForAccountTestData } from '../../../../../test/testingData/monthlyBilling/monthlyBilling.getMonthlyBillingInfoForAccount.testdata';
import { ContainerComponent } from '../../../../maui/container/container.component';
import { MauiFlashMessageModule } from '../../../../maui/flashMessage/index';
import { FuelChipComponent } from '../../../../maui/fuelChip/fuelChip.component';
import { FuelChipFooterComponent } from '../../../../maui/fuelChip/fuelChipFooter/fuelChipFooter.component';
import { FuelChipMessageComponent } from '../../../../maui/fuelChip/fuelChipMessage/fuelChipMessage.component';
import { HeadingComponent } from '../../../../maui/heading/heading.component';
import { MauiSecondaryNavigationComponent } from '../../../../maui/secondaryNavigation/secondaryNavigation.component';
import { AddSpacesPipe } from '../../../../pipes/addSpaces.pipe';
import { IAccountServiceMA } from '../../../../services/account.service';
import { AccountMonthlyBillingModel } from '../../../../services/settings/model/accountMonthlyBillingModel';
import { BillingFrequencyType } from '../../../../services/settings/model/billingFrequencyType';
import { CancelMonthlyBillingResponse } from '../../../../services/settings/model/cancelMonthlyBillingResponse';
import { EnergyInsightsChooseServiceComponent } from './energyInsightsChooseService.component';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { EnergyInsightsService } from '../../../../services/energyInsights.service';
import { EnergyInsightsGetContractDetailsAndEligibilityTestData } from '../../../../../test/testingData/energyInsights/energyInsights.getContractDetailsAndEligibility.testdata';

let comp: EnergyInsightsChooseServiceComponent;
let fixture: ComponentFixture<EnergyInsightsChooseServiceComponent>;
let de: DebugElement;

describe('Energy Insights - Choose your service ', () => {

    let mockEnergyInsightsService: Mock<EnergyInsightsService>;
    let mockDataLayerService: Mock<DataLayerService> = new Mock<DataLayerService>();
    let filterContractsSpy: jasmine.Spy;
    let shouldDisplayBackButtonSpy: jasmine.Spy;
    let hasPostSetupContractsSpy: jasmine.Spy;
    let hasPreSetupContractsSpy: jasmine.Spy;
    let hasIneligibleSetupContractsSpy: jasmine.Spy;

    let getOrdinalSpy: jasmine.Spy;

    beforeAll(() => {
        mockEnergyInsightsService = new Mock<EnergyInsightsService>();

        filterContractsSpy = mockEnergyInsightsService
            .setup((x) => x.filterContracts)
            .is(() => {
                return Observable.of(null);
            }).Spy;
        shouldDisplayBackButtonSpy = mockEnergyInsightsService
            .setup((x) => x.shouldDisplayBackButton)
            .is(() => {
                return null;
            }).Spy;
        hasPostSetupContractsSpy = mockEnergyInsightsService
            .setup((x) => x.hasPostSetupContracts)
            .is(() => {
                return null;
            }).Spy;
        hasPreSetupContractsSpy = mockEnergyInsightsService
            .setup((x) => x.hasPreSetupContracts)
            .is(() => {
                return null;
            }).Spy;
        hasIneligibleSetupContractsSpy = mockEnergyInsightsService
            .setup((x) => x.hasIneligibleContracts)
            .is(() => {
                return null;
            }).Spy;
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                EnergyInsightsChooseServiceComponent,
                FuelChipComponent,
                HeadingComponent,
                MauiSecondaryNavigationComponent,
                ContainerComponent,
                LoadingComponent,
                FuelChipMessageComponent,
                FuelChipFooterComponent,
                AddSpacesPipe,
            ],
            imports: [
                RouterTestingModule,
                MauiFlashMessageModule,
            ],
            providers: [
                { provide: EnergyInsightsService, useValue: mockEnergyInsightsService.Object },
                { provide: ApiService, useClass: ApiStubService },
                { provide: DataLayerService, useValue: mockDataLayerService.Object },
                ConfigService,
                IAccountServiceMA,
            ]
        });
        fixture = TestBed.createComponent(EnergyInsightsChooseServiceComponent);
        comp = fixture.componentInstance;
    });

    describe('Pre-setup scenario', () => {
        beforeEach(() => {
            let contracts = EnergyInsightsGetContractDetailsAndEligibilityTestData.IainSandersWithoutSubscription;
            comp.energyInsightsService.energyInsightsContracts = contracts;
            comp.energyInsightsService.energyInsightsContractsPostSetup = [];
            comp.energyInsightsService.energyInsightsContractsPreSetup = [
                contracts[0],
                contracts[2],
                contracts[4]
            ];

            comp.energyInsightsService.energyInsightsContractsIneligible = [
                contracts[1],
                contracts[3],
                contracts[5]
            ];
            hasPostSetupContractsSpy.and.returnValue(false);
            hasPreSetupContractsSpy.and.returnValue(true);
            hasIneligibleSetupContractsSpy.and.returnValue(true);
            de = fixture.debugElement;
            fixture.detectChanges();
        });

        it(`Should fill the 2 separate lists`, async(() => {
            expect(comp.hasPostSetupContracts).toBeFalsy();
            expect(comp.hasPreSetupContracts).toBeTruthy();
            expect(comp.hasIneligibleContracts).toBeTruthy();
        }));

        it(`Should display pre-setup fuelchip Message`, async(() => {
            let preMessageElem = fixture.debugElement.queryAll(By.css('.maui-table-cell.maui-fuel-chip__primary-status-without-address.maui-fuel-chip__primary-message-offset'))[0].nativeElement.textContent;

            expect(preMessageElem).toContain('Switch on to receive Energy Insights');

        }));

    });

    describe('Post-setup scenario', () => {
        beforeEach(() => {
            let contracts = EnergyInsightsGetContractDetailsAndEligibilityTestData.IainSandersWithSubscription;
            comp.energyInsightsService.energyInsightsContracts = contracts;
            comp.energyInsightsService.energyInsightsContractsPreSetup = [];
            comp.energyInsightsService.energyInsightsContractsPostSetup = [
                contracts[0],
                contracts[2],
                contracts[4]
            ];

            comp.energyInsightsService.energyInsightsContractsIneligible = [
                contracts[1],
                contracts[3],
                contracts[5]
            ];
            hasPreSetupContractsSpy.and.returnValue(false);
            hasPostSetupContractsSpy.and.returnValue(true);
            hasIneligibleSetupContractsSpy.and.returnValue(true);
            de = fixture.debugElement;
            fixture.detectChanges();
        });

        it(`Should fill the 2 separate lists based`, async(() => {
            expect(comp.hasPostSetupContracts).toBeTruthy();
            expect(comp.hasPreSetupContracts).toBeFalsy();
            expect(comp.hasIneligibleContracts).toBeTruthy();
        }));

        it(`Should display post-setup fuelchip Message`, async(() => {
            let preMessageElem = fixture.debugElement.queryAll(By.css('.maui-table-cell.maui-fuel-chip__primary-status-without-address.maui-fuel-chip__primary-message-offset'))[0].nativeElement.textContent;

            expect(preMessageElem).toContain(`You’ve subscribed to receive both Mid Bill update and Energy Insights report`);

        }));

    });

});
