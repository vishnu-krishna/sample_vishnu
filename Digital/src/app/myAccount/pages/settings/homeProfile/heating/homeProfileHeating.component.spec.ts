import { Observable } from 'rxjs/Observable';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, getDebugNode } from '@angular/core';

import { IHomeProfileStateService, HomeProfileStatus } from '../homeProfileState.service';
import { HomeProfileHeatingComponent } from './homeProfileHeating.component';
import { HomeProfileHeatingModule } from './homeProfileHeating.module';
import { HomeProfileViewModel, DuctedHeatingType, OtherHeatingType } from '../homeProfileViewModel';
import { SegmentedButtonsComponent } from '../../../../maui/segmentedButtons/segmentedButtons.component';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileService } from '../homeProfile.service';

describe('Home Profile Heating Page', () => {

    let fixture: ComponentFixture<HomeProfileHeatingComponent>;
    let comp: HomeProfileHeatingComponent;
    let router: any;
    let de: DebugElement;
    let segmentedButtonComponent: SegmentedButtonsComponent;

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
                HomeProfileHeatingModule,
                RouterTestingModule
            ],
            providers: [
                { provide: HomeProfileService, useValue: mockProfileService },
                { provide: IHomeProfileStateService, useValue: mockStateService },
                { provide: HomeProfileNavigationService, useValue: mockNavigationService },
            ]
        });
        fixture = TestBed.createComponent(HomeProfileHeatingComponent);
        comp = fixture.componentInstance;
        comp.homeProfile = mockData.profile;
    });

    describe('without initial state', () => {

        it('should have no selection on all segmented buttons', () => {

            fixture.detectChanges();

            let segmentedButtonsControls: HTMLElement[] = fixture.nativeElement.querySelectorAll('agl-maui-segmented-buttons');
            expect(segmentedButtonsControls.length).toBeGreaterThan(0);

            for (let control of segmentedButtonsControls) {
                de = <DebugElement> getDebugNode(control);
                segmentedButtonComponent = de.componentInstance;
                expect(segmentedButtonComponent.value).toBe(undefined);
            }
        });

    });

    describe('unit tests', () => {

        it('should set type of ducted heating correctly', () => {
            comp.setTypeOfDuctedHeating(DuctedHeatingType.Gas);
            expect(comp.homeProfile.typeOfDuctedHeating).toBe(DuctedHeatingType.Gas);
        });

        it('should set type of other heating correctly', () => {
            comp.setTypeOfOtherHeating(OtherHeatingType.Gas);
            expect(comp.homeProfile.typeOfOtherHeating).toBe(OtherHeatingType.Gas);
        });

        it('should set number of heating split system correctly', () => {
            comp.setNumberOfHeatingSplitSystems('1');
            expect(comp.homeProfile.numberOfHeatingSplitSystems).toBe(1);
        });

        it('should set number of portable elec heater correctly', () => {
            comp.setNumberOfPortableElecHeaters('1');
            expect(comp.homeProfile.numberOfPortableElecHeaters).toBe(1);
        });
    });
});
