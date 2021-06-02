import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { IHomeProfileStateService, HomeProfileStatus } from '../homeProfileState.service';
import { HomeProfileCookingComponent } from './homeProfileCooking.component';
import { HomeProfileCookingModule } from './homeProfileCooking.module';
import { HomeProfileViewModel, CooktopType, OvenType } from '../homeProfileViewModel';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileService } from '../homeProfile.service';

describe('Home Profile Oven and Cooktop Page', () => {

    let fixture: ComponentFixture<HomeProfileCookingComponent>;
    let comp: HomeProfileCookingComponent;

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
                HomeProfileCookingModule,
                RouterTestingModule
            ],
            providers: [
                { provide: HomeProfileService, useValue: mockProfileService },
                { provide: IHomeProfileStateService, useValue: mockStateService },
                { provide: HomeProfileNavigationService, useValue: mockNavigationService }
            ]
        });

        fixture = TestBed.createComponent(HomeProfileCookingComponent);
        comp = fixture.componentInstance;
    });

    describe('without initial state', () => {
        it('should show 4 oven type radio buttons all unselected', () => {
            fixture.detectChanges();

            // Assert
            let ovenTypeGroup = fixture.nativeElement.querySelectorAll('agl-maui-radio-button-group[name="groupOvenType"]');
            expect(ovenTypeGroup).toBeDefined();
            expect(ovenTypeGroup.length).toBe(1);
            expect(ovenTypeGroup[0].getAttribute('ng-reflect-selected-value')).toBeFalsy();

            let ovenTypeInputs = fixture.nativeElement.querySelectorAll('input[type="radio"][name="groupOvenType"]');
            expect(ovenTypeInputs).toBeDefined();
            expect(ovenTypeInputs.length).toBe(4);
            expect(ovenTypeInputs[0].getAttribute('value')).toBe('Gas');
            expect(ovenTypeInputs[1].getAttribute('value')).toBe('Elec');
            expect(ovenTypeInputs[2].getAttribute('value')).toBe('Other');
            expect(ovenTypeInputs[3].getAttribute('value')).toBe('None');
            expect(ovenTypeInputs[0].checked).toBeFalsy();
            expect(ovenTypeInputs[1].checked).toBeFalsy();
            expect(ovenTypeInputs[2].checked).toBeFalsy();
            expect(ovenTypeInputs[3].checked).toBeFalsy();
        });

        it('should show 4 oven type radio buttons all unselected', () => {
            fixture.detectChanges();

            // Assert
            let cooktopTypeGroup = fixture.nativeElement.querySelectorAll('agl-maui-radio-button-group[name="groupCooktopType"]');
            expect(cooktopTypeGroup).toBeDefined();
            expect(cooktopTypeGroup.length).toBe(1);
            expect(cooktopTypeGroup[0].getAttribute('ng-reflect-selected-value')).toBeFalsy();

            let cooktopTypeInputs = fixture.nativeElement.querySelectorAll('input[type="radio"][name="groupCooktopType"]');
            expect(cooktopTypeInputs).toBeDefined();
            expect(cooktopTypeInputs.length).toBe(4);
            expect(cooktopTypeInputs[0].getAttribute('value')).toBe('Gas');
            expect(cooktopTypeInputs[1].getAttribute('value')).toBe('Elec');
            expect(cooktopTypeInputs[2].getAttribute('value')).toBe('Other');
            expect(cooktopTypeInputs[3].getAttribute('value')).toBe('None');
            expect(cooktopTypeInputs[0].checked).toBeFalsy();
            expect(cooktopTypeInputs[1].checked).toBeFalsy();
            expect(cooktopTypeInputs[2].checked).toBeFalsy();
            expect(cooktopTypeInputs[3].checked).toBeFalsy();
        });

        it('should show next and save buttons on footer', () => {
            fixture.detectChanges();

            // Assert
            let nextButton = fixture.nativeElement.querySelectorAll('.homeprofile-footer__navigation');
            expect(nextButton).toBeDefined();
            expect(nextButton.length).toBe(1);
        });
    });

    describe('with initial state', () => {

        beforeEach(() => {
            let profile = mockData.profile;
            profile.ovenType = OvenType.None;
            profile.cooktopType = CooktopType.Gas;
            comp.homeProfile = profile;
        });

        it('should show 4 oven type radio buttons with one selected', () => {
            fixture.detectChanges();

            // Assert
            let ovenTypeGroup = fixture.nativeElement.querySelectorAll('agl-maui-radio-button-group[name="groupOvenType"]');
            expect(ovenTypeGroup).toBeDefined();
            expect(ovenTypeGroup.length).toBe(1);
            expect(ovenTypeGroup[0].getAttribute('ng-reflect-selected-value')).toBe('None');

            let ovenTypeInputs = fixture.nativeElement.querySelectorAll('input[type="radio"][name="groupOvenType"]');
            expect(ovenTypeInputs).toBeDefined();
            expect(ovenTypeInputs.length).toBe(4);
            expect(ovenTypeInputs[0].getAttribute('value')).toBe('Gas');
            expect(ovenTypeInputs[1].getAttribute('value')).toBe('Elec');
            expect(ovenTypeInputs[2].getAttribute('value')).toBe('Other');
            expect(ovenTypeInputs[3].getAttribute('value')).toBe('None');
            expect(ovenTypeInputs[0].checked).toBeFalsy();
            expect(ovenTypeInputs[1].checked).toBeFalsy();
            expect(ovenTypeInputs[2].checked).toBeFalsy();
            expect(ovenTypeInputs[3].checked).toBeTruthy();
        });

        it('should show 4 cooktop type radio buttons with one selected', () => {
            fixture.detectChanges();

            // Assert
            let cooktopTypeGroup = fixture.nativeElement.querySelectorAll('agl-maui-radio-button-group[name="groupCooktopType"]');
            expect(cooktopTypeGroup).toBeDefined();
            expect(cooktopTypeGroup.length).toBe(1);
            expect(cooktopTypeGroup[0].getAttribute('ng-reflect-selected-value')).toBe('Gas');

            let cooktopTypeInputs = fixture.nativeElement.querySelectorAll('input[type="radio"][name="groupCooktopType"]');
            expect(cooktopTypeInputs).toBeDefined();
            expect(cooktopTypeInputs.length).toBe(4);
            expect(cooktopTypeInputs[0].getAttribute('value')).toBe('Gas');
            expect(cooktopTypeInputs[1].getAttribute('value')).toBe('Elec');
            expect(cooktopTypeInputs[2].getAttribute('value')).toBe('Other');
            expect(cooktopTypeInputs[3].getAttribute('value')).toBe('None');
            expect(cooktopTypeInputs[0].checked).toBeTruthy();
            expect(cooktopTypeInputs[1].checked).toBeFalsy();
            expect(cooktopTypeInputs[2].checked).toBeFalsy();
            expect(cooktopTypeInputs[3].checked).toBeFalsy();
        });

        it('should show next and save buttons on footer', () => {
            fixture.detectChanges();

            // Assert
            let nextButton = fixture.nativeElement.querySelectorAll('.homeprofile-footer__navigation');
            expect(nextButton).toBeDefined();
            expect(nextButton.length).toBe(1);
        });
    });
});
