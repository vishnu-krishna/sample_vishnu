import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { IHomeProfileStateService, HomeProfileStatus } from '../homeProfileState.service';
import { HomeProfileViewModel, FridgeType } from '../homeProfileViewModel';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileOtherElectricalItemsComponent } from './homeProfileOtherElectricalItems.component';
import { HomeProfileOtherElectricalItemsModule } from './homeProfileOtherElectricalItems.module';
import { HomeProfileService } from '../homeProfile.service';

describe('Home Profile Other Electrical Items Page', () => {

    let fixture: ComponentFixture<HomeProfileOtherElectricalItemsComponent>;
    let comp: HomeProfileOtherElectricalItemsComponent;
    let de: DebugElement;
    let router: any;

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
                HomeProfileOtherElectricalItemsModule,
                RouterTestingModule
            ],
            providers: [
                { provide: HomeProfileService, useValue: mockProfileService },
                { provide: IHomeProfileStateService, useValue: mockStateService },
                { provide: HomeProfileNavigationService, useValue: mockNavigationService }
            ]
        });

        fixture = TestBed.createComponent(HomeProfileOtherElectricalItemsComponent);
        comp = fixture.componentInstance;
        comp.homeProfile = mockData.profile;
        de = fixture.debugElement;
    });

    describe('Component tests', () => {
        it('should show the correct number of questions', () => {
            const totalQuestions = 6;

            fixture.detectChanges();

            const questions = fixture.nativeElement.querySelectorAll('div[data-test]');

            expect(questions.length).toBe(totalQuestions);
        });
    });

    describe('Unit tests', () => {
        beforeEach(() => {
            comp.homeProfile = new HomeProfileViewModel();
        });

        it('should update the number of tvs correctly', () => {
            const numberOfTvs = 3;

            comp.setNumberOfTelevisions(numberOfTvs.toString());

            expect(comp.homeProfile.numberOfTelevisions).toBe(numberOfTvs);
        });

        it('should update washing machine status correctly', () => {
            const hasWashingMachine = false;

            comp.setHasWashingMachine(hasWashingMachine.toString());

            expect(comp.homeProfile.hasWashingMachine).toBe(hasWashingMachine);
        });

        it('should update clothes dryer status correctly', () => {
            const hasClothesDryer = true;

            comp.setHasClothesDryer(hasClothesDryer.toString());

            expect(comp.homeProfile.hasClothesDryer).toBe(hasClothesDryer);
        });

        it('should update dishwasher status correctly', () => {
            const hasDishwasher = false;

            comp.setHasDishwasher(hasDishwasher.toString());

            expect(comp.homeProfile.hasDishwasher).toBe(hasDishwasher);
        });

        it('should update microwave status correctly', () => {
            const hasMicrowave = true;

            comp.setHasMicrowave(hasMicrowave.toString());

            expect(comp.homeProfile.hasMicrowave).toBe(hasMicrowave);
        });

        it('should update electric vehicle status correctly', () => {
            const hasElectricalVehicle = false;

            comp.setHasElectricVehicle(hasElectricalVehicle.toString());

            expect(comp.homeProfile.hasElectricalVehicle).toBe(hasElectricalVehicle);
        });
    });
});
