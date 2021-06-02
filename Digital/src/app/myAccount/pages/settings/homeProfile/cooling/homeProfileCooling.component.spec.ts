import { DebugElement, getDebugNode } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { IHomeProfileStateService, HomeProfileStatus } from '../homeProfileState.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileCoolingComponent } from './homeProfileCooling.component';
import { HomeProfileCoolingModule } from './homeProfileCooling.module';
import { HomeProfileViewModel } from '../homeProfileViewModel';
import { SegmentedButtonsComponent } from '../../../../maui/segmentedButtons/segmentedButtons.component';
import { SegmentedButtonsModule } from '../../../../maui/segmentedButtons/segmentedButtons.module';
import { HomeProfileService } from '../homeProfile.service';

describe('Home Profile Cooling Page', () => {

    let fixture: ComponentFixture<HomeProfileCoolingComponent>;
    let comp: HomeProfileCoolingComponent;
    let el: HTMLElement;
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
                HomeProfileCoolingModule,
                RouterTestingModule
            ],
            providers: [
                { provide: HomeProfileService, useValue: mockProfileService },
                { provide: HomeProfileNavigationService, useValue: mockNavigationService },
                { provide: IHomeProfileStateService, useValue: mockStateService },
            ]
        });

        fixture = TestBed.createComponent(HomeProfileCoolingComponent);
        comp = fixture.componentInstance;
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

        it('should update hasDuctedAirConditioning correctly', () => {
            comp.homeProfile = mockData.profile;
            comp.setHasDuctedAirconCooling('false');

            expect(comp.homeProfile.hasDuctedAirconCooling).toBe(false);
        });

        it('should update hasDuctedEvaporativeCooling correctly', () => {
            comp.homeProfile = mockData.profile;
            comp.setHasDuctedEvaporativeCooling('false');

            expect(comp.homeProfile.hasDuctedAirconCooling).toBe(false);
        });
    });
});
