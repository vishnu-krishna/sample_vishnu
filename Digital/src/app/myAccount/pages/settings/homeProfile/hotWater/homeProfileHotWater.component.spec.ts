import { Observable } from 'rxjs/Observable';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IHomeProfileStateService, HomeProfileStatus } from '../homeProfileState.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileViewModel, HotWaterType } from '../homeProfileViewModel';
import { HomeProfileHotWaterComponent } from './homeProfileHotWater.component';
import { HomeProfileHotWaterModule } from './homeProfileHotWater.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeProfileService } from '../homeProfile.service';

describe('Home Profile HotWater Page', () => {

    let fixture: ComponentFixture<HomeProfileHotWaterComponent>;
    let comp: HomeProfileHotWaterComponent;

    let mockProfileService: Partial<HomeProfileService>;
    let mockStateService: Partial<IHomeProfileStateService>;

    const mockNavigationService = {
        currentPage: 1,
        totalPages: 8
    };
    const mockData = {
        addressContract: {
            address: '',
            accountId: '1',
            contractId: '1',
            fuelType: 'Elec',
            status: HomeProfileStatus.NotStarted
        },
        profile: new HomeProfileViewModel()
    };

    beforeEach(() => {
        mockProfileService = {
            createAddressContractModel: () => Observable.of(true),
            getUniqueAddresses: () => [],
            getContractForContractNumber: () => mockData.addressContract
        };

        mockStateService = {
            homeProfile: mockData.profile,
            initializeHomeProfile: (a, b, c) => Observable.of(true)
        };

        TestBed.configureTestingModule({
            imports: [
                HomeProfileHotWaterModule,
                RouterTestingModule
            ],
            providers: [
                { provide: HomeProfileService, useValue: mockProfileService },
                { provide: HomeProfileNavigationService, useValue: mockNavigationService },
                { provide: IHomeProfileStateService, useValue: mockStateService }
            ]
        });

        fixture = TestBed.createComponent(HomeProfileHotWaterComponent);
        comp = fixture.componentInstance;
        comp.homeProfile = mockData.profile;
    });

    describe('without initial state', () => {

        it('should have hot water type radio group with no selected option/value', () => {
            fixture.detectChanges();

            const selectedHotWaterType = fixture.nativeElement.querySelectorAll('agl-maui-radio-button-group input[name="hotWaterTypeRadioGroup"]:checked');
            expect(selectedHotWaterType.length).toBe(0);
        });

        it('should have 8 options for hot water type', () => {
            fixture.detectChanges();

            const hotwaterTypesInputs = fixture.nativeElement.querySelectorAll('agl-maui-radio-button-group input[name="hotWaterTypeRadioGroup"]');
            expect(hotwaterTypesInputs.length).toBe(8);
            expect(hotwaterTypesInputs[0].getAttribute('value')).toBe(HotWaterType.GasStorage);
            expect(hotwaterTypesInputs[1].getAttribute('value')).toBe(HotWaterType.GasInstantaneous);
            expect(hotwaterTypesInputs[2].getAttribute('value')).toBe(HotWaterType.ElectricStorage);
            expect(hotwaterTypesInputs[3].getAttribute('value')).toBe(HotWaterType.ElectricInstantaneous);
            expect(hotwaterTypesInputs[4].getAttribute('value')).toBe(HotWaterType.SolarElectricBoost);
            expect(hotwaterTypesInputs[5].getAttribute('value')).toBe(HotWaterType.SolarGasBoost);
            expect(hotwaterTypesInputs[6].getAttribute('value')).toBe(HotWaterType.HeatPumpStorage);
            expect(hotwaterTypesInputs[7].getAttribute('value')).toBe(HotWaterType.NotSure);
        });

    });

    describe('with initial state', () => {

        it('should show hot water type value', () => {
            let profile = mockData.profile;
            profile.hotWaterType = HotWaterType.GasStorage;
            comp.homeProfile = profile;
            fixture.detectChanges();

            // Assert
            const gasStorageHotWater = fixture.nativeElement.querySelector(`agl-maui-radio-button-group input[value="${profile.hotWaterType.toString()}"]`);
            expect(gasStorageHotWater.checked).toBe(true);
        });

    });

    describe('public methods test', () => {

        it('setHotWaterType() should set hot water type', () => {
            const hotWaterType = HotWaterType.ElectricInstantaneous;
            comp.setHotWaterType(hotWaterType);

            // Assert
            expect(comp.homeProfile.hotWaterType).toBe(hotWaterType);
        });

    });

});
