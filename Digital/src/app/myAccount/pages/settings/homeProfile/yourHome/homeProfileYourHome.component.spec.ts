import { Observable } from 'rxjs/Observable';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IHomeProfileStateService, HomeProfileStatus } from '../homeProfileState.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileYourHomeComponent } from './homeProfileYourHome.component';
import { HomeProfileYourHomeModule } from './homeProfileYourHome.module';
import { HomeProfileViewModel, PropertyType } from '../homeProfileViewModel';
import { HomeProfileOptions } from '../homeProfileOptions';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeProfileService } from '../homeProfile.service';

describe('Home Profile YourHome Page', () => {

    let comp: HomeProfileYourHomeComponent;
    let fixture: ComponentFixture<HomeProfileYourHomeComponent>;

    let homeTypeInputs: HTMLElement[];
    let mockProfileService: Partial<HomeProfileService>;
    let mockStateService: Partial<IHomeProfileStateService>;

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
    const mockNavigationService = {
        currentPage: 1,
        totalPages: 8
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
                HomeProfileYourHomeModule,
                RouterTestingModule
            ],
            providers: [
                { provide: HomeProfileNavigationService, useValue: mockNavigationService },
                { provide: IHomeProfileStateService, useValue: mockStateService },
                { provide: HomeProfileService, useValue: mockProfileService }
            ]
        });

        fixture = TestBed.createComponent(HomeProfileYourHomeComponent);
        comp = fixture.componentInstance;
    });

    describe('without initial state', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should show 4 home types as radio buttons with correct labels', () => {
            homeTypeInputs = fixture.nativeElement.querySelectorAll('agl-maui-radio-button input[name=hometype]');

            // Assert
            expect(homeTypeInputs).toBeDefined();
            expect(homeTypeInputs.length).toBe(4);

            expect(homeTypeInputs[0].getAttribute('value')).toBe(PropertyType.House);
            expect(homeTypeInputs[1].getAttribute('value')).toBe(PropertyType.Townhouse);
            expect(homeTypeInputs[2].getAttribute('value')).toBe(PropertyType.Apartment);
            expect(homeTypeInputs[3].getAttribute('value')).toBe(PropertyType.Other);
        });

        it('should show the home type radio buttons as unchecked', () => {
            homeTypeInputs = fixture.nativeElement.querySelectorAll('agl-maui-radio-button input[name=hometype]');

            // Assert
            expect(homeTypeInputs[0].getAttribute('checked')).not.toBe('true');
            expect(homeTypeInputs[1].getAttribute('checked')).not.toBe('true');
            expect(homeTypeInputs[2].getAttribute('checked')).not.toBe('true');
            expect(homeTypeInputs[3].getAttribute('checked')).not.toBe('true');
        });

        it('should show the correct number of adults and children', () => {
            const segmentedButtons: HTMLElement[] = fixture.nativeElement.querySelectorAll('.homeprofile-yourhome__segmented-button');
            const [numberOfAdultsSegmentedButtons, numberOfChildrenSegmentedButtons] = segmentedButtons;

            const numberOfAdultsOptions = numberOfAdultsSegmentedButtons.querySelectorAll('agl-maui-segmented-button');
            const numberOfChildrenOptions = numberOfChildrenSegmentedButtons.querySelectorAll('agl-maui-segmented-button');

            expect(numberOfAdultsOptions[0].className).toBe('');
            expect(numberOfAdultsOptions[1].className).toBe('');
            expect(numberOfAdultsOptions[2].className).toBe('');
            expect(numberOfAdultsOptions[3].className).toBe('');
            expect(numberOfAdultsOptions[4].className).toBe('');

            expect(numberOfChildrenOptions[0].className).toBe('');
            expect(numberOfChildrenOptions[1].className).toBe('');
            expect(numberOfChildrenOptions[2].className).toBe('');
            expect(numberOfChildrenOptions[3].className).toBe('');
            expect(numberOfChildrenOptions[4].className).toBe('');
            expect(numberOfChildrenOptions[5].className).toBe('');
        });

        it('should update the property type correctly', () => {
            let propertyTypeRadios: HTMLElement[] = fixture.nativeElement.querySelectorAll('agl-maui-radio-button input[name=hometype]');
            propertyTypeRadios[0].click();
            fixture.detectChanges();

            expect(comp.homeProfile.propertyType === PropertyType.House);
        });
    });

    describe('with initial state', () => {
        let propertyTypeRadios: any;
        let profile: HomeProfileViewModel;

        beforeEach(() => {
            profile = mockData.profile;
            profile.propertyType = PropertyType.Apartment;
            profile.numberOfBedrooms = 5;
            profile.numberOfBathrooms = 2;
            profile.numberOfAdults = 2;
            profile.numberOfChildren = 3;

            mockStateService.homeProfile = profile;
            comp.homeProfile = profile;

            fixture.detectChanges();
            propertyTypeRadios = fixture.nativeElement.querySelectorAll('agl-maui-radio-button input[name=hometype]');
        });

        it('should show the selected home type', () => {
            expect(propertyTypeRadios[0].checked).toBe(false);
            expect(propertyTypeRadios[1].checked).toBe(false);
            expect(propertyTypeRadios[2].checked).toBe(true);
            expect(propertyTypeRadios[3].checked).toBe(false);
        });

        it('should show the segmented buttons for number of bedrooms and bathrooms', () => {
            const numberOfSegmentedButtons = 2;
            const roomsSelector = propertyTypeRadios[2].parentElement.parentElement.querySelectorAll('agl-maui-segmented-buttons');

            expect(roomsSelector.length).toBe(numberOfSegmentedButtons);
        });

        it('should show the correct options for number of bedrooms and bathrooms', () => {
            const numberOfBedroomOptions = 6;
            const numberOfBathroomOptions = 5;
            const roomsSelector = propertyTypeRadios[2].parentElement.parentElement.querySelectorAll('agl-maui-segmented-buttons');
            const bedroomsSelector = roomsSelector[0].querySelectorAll('agl-maui-segmented-button');
            const bathroomsSelector = roomsSelector[1].querySelectorAll('agl-maui-segmented-button');

            expect(bedroomsSelector.length).toBe(numberOfBedroomOptions);
            expect(bathroomsSelector.length).toBe(numberOfBathroomOptions);
        });

        it('should show the correct number of adults and children', () => {
            const segmentedButtons = fixture.nativeElement.querySelectorAll('.homeprofile-yourhome__segmented-button');
            const numberOfAdultsSegmentedButtons = segmentedButtons[2];
            const numberOfChildrenSegmentedButtons = segmentedButtons[3];

            const numberOfAdultsOptions = numberOfAdultsSegmentedButtons.querySelectorAll('agl-maui-segmented-button');
            const numberOfChildrenOptions = numberOfChildrenSegmentedButtons.querySelectorAll('agl-maui-segmented-button');

            expect(numberOfAdultsOptions[0].className).toBe('');
            expect(numberOfAdultsOptions[1].className).toBe('selected');
            expect(numberOfAdultsOptions[2].className).toBe('');
            expect(numberOfAdultsOptions[3].className).toBe('');
            expect(numberOfAdultsOptions[4].className).toBe('');

            expect(numberOfChildrenOptions[0].className).toBe('');
            expect(numberOfChildrenOptions[1].className).toBe('');
            expect(numberOfChildrenOptions[2].className).toBe('');
            expect(numberOfChildrenOptions[3].className).toBe('selected');
            expect(numberOfChildrenOptions[4].className).toBe('');
            expect(numberOfChildrenOptions[5].className).toBe('');
        });
    });

    describe('unit tests', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should update number of bedrooms correctly', () => {
            comp.homeProfile.numberOfBedrooms = 1;
            comp.setNumberOfBedrooms('2');

            expect(comp.homeProfile.numberOfBedrooms).toBe(2);
        });

        it('should update number of bathrooms correctly', () => {
            comp.homeProfile.numberOfBathrooms = 1;
            comp.setNumberOfBathrooms('2');

            expect(comp.homeProfile.numberOfBathrooms).toBe(2);
        });

        it('should update number of adults correctly', () => {
            comp.homeProfile.numberOfAdults = null;
            comp.setNumberOfAdults('2');

            expect(comp.homeProfile.numberOfAdults).toBe(2);
        });

        it('should update number of children correctly', () => {
            comp.homeProfile.numberOfChildren = null;
            comp.setNumberOfChildren('2');

            expect(comp.homeProfile.numberOfChildren).toBe(2);
        });
    });
});
