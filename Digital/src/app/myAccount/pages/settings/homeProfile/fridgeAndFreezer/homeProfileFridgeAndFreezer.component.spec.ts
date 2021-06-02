import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { IHomeProfileStateService, HomeProfileStatus } from '../homeProfileState.service';
import { HomeProfileFridgeAndFreezerComponent } from './homeProfileFridgeAndFreezer.component';
import { HomeProfileFridgeAndFreezerModule } from './homeProfileFridgeAndFreezer.module';
import { HomeProfileViewModel, FridgeType, FridgeAge } from '../homeProfileViewModel';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileService } from '../homeProfile.service';

describe('Home Profile Fridge and Freezer Page', () => {

    let fixture: ComponentFixture<HomeProfileFridgeAndFreezerComponent>;
    let comp: HomeProfileFridgeAndFreezerComponent;
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
                HomeProfileFridgeAndFreezerModule,
                RouterTestingModule
            ],
            providers: [
                { provide: HomeProfileService, useValue: mockProfileService },
                { provide: IHomeProfileStateService, useValue: mockStateService },
                { provide: HomeProfileNavigationService, useValue: mockNavigationService }
            ]
        });

        fixture = TestBed.createComponent(HomeProfileFridgeAndFreezerComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        comp.homeProfile = mockData.profile;
    });

    it('should show secondary fridge when user add it', async(() => {
        comp.setMainFridgeType(FridgeType.TopOrBottomMount);
        comp.showSecondaryFridgeDisplay();

        fixture.detectChanges();

        expect(de.query(By.css('.homeprofile-fridge__secondary-fridge')).nativeElement).toBeDefined();
        expect(de.query(By.css('.homeprofile-fridge__add-secondary-fridge'))).toBeNull();
    }));

    it('should not show secondary fridge when user hide it', async(() => {
        comp.hideSecondaryFridgeDisplay();

        fixture.detectChanges();

        expect(de.query(By.css('.homeprofile-fridge__secondary-fridge'))).toBeNull();
        expect(de.query(By.css('.homeprofile-fridge__add-secondary-fridge')).nativeElement).toBeDefined();
    }));

    describe('When secondary fridge is expanded', () => {
        beforeEach(() => {
            comp.homeProfile.hasSecondaryFridge = true;
        });

        it('should hide secondary fridge when user doesnt have main fridge', async(() => {
            const noFridge = FridgeType.None;
            comp.setMainFridgeType(noFridge);

            fixture.detectChanges();

            expect(de.query(By.css('.homeprofile-fridge__secondary-fridge'))).toBeNull();
            expect(de.query(By.css('.homeprofile-fridge__add-secondary-fridge')).nativeElement).toBeDefined();
        }));

        it('should not hide secondary fridge when user has main fridge', async(() => {
            const freezerOnly = FridgeType.Freezer;
            comp.setMainFridgeType(freezerOnly);

            fixture.detectChanges();

            expect(de.query(By.css('.homeprofile-fridge__secondary-fridge')).nativeElement).toBeDefined();
            expect(de.query(By.css('.homeprofile-fridge__add-secondary-fridge'))).toBeNull();
        }));
    });

    describe('Unit tests', () => {

        it('should set the main fridge type correctly', () => {
            comp.setMainFridgeType(FridgeType.Freezer);

            expect(comp.homeProfile.mainFridgeType).toBe(FridgeType.Freezer);
            expect(comp.homeProfile.mainFridgeAge).toBeNull();
        });

        it('should set the secodary fridge type correctly', () => {
            comp.setSecondaryFridgeType(FridgeType.Bar);

            expect(comp.homeProfile.secondaryFridgeType).toBe(FridgeType.Bar);
            expect(comp.homeProfile.secondaryFridgeAge).toBeNull();
        });

        it('should set the main fridge age correctly', () => {
            comp.setMainFridgeAge(FridgeAge.From6To10Yrs);

            expect(comp.homeProfile.mainFridgeAge).toBe(FridgeAge.From6To10Yrs);
        });

        it('should set the secondary fridge age correctly', () => {
            comp.setSecondaryFridgeAge(FridgeAge.MoreThan10Yrs);

            expect(comp.homeProfile.secondaryFridgeAge).toBe(FridgeAge.MoreThan10Yrs);
        });
    });
});
