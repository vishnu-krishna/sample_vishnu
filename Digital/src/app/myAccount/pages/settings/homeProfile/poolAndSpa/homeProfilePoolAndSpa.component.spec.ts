import { Observable } from 'rxjs/Observable';
import { DebugElement, getDebugNode } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IHomeProfileStateService, HomeProfileStatus } from '../homeProfileState.service';
import { HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { HomeProfileViewModel, PoolSize, PoolHeaterType, PoolPumpAge } from '../homeProfileViewModel';
import { HomeProfilePoolAndSpaComponent } from './homeProfilePoolAndSpa.component';
import { HomeProfilePoolAndSpaModule } from './homeProfilePoolAndSpa.module';
import { SegmentedButtonComponent } from '../../../../maui/segmentedButtons';
import { HomeProfileService } from '../homeProfile.service';

describe('Home Profile PoolAndSpa Page', () => {

    let fixture: ComponentFixture<HomeProfilePoolAndSpaComponent>;
    let comp: HomeProfilePoolAndSpaComponent;
    let de: DebugElement;
    let segmentedButton: SegmentedButtonComponent;

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
                HomeProfilePoolAndSpaModule,
                RouterTestingModule
            ],
            providers: [
                { provide: HomeProfileService, useValue: mockProfileService },
                { provide: HomeProfileNavigationService, useValue: mockNavigationService },
                { provide: IHomeProfileStateService, useValue: mockStateService }
            ]
        });

        fixture = TestBed.createComponent(HomeProfilePoolAndSpaComponent);
        comp = fixture.componentInstance;
        comp.homeProfile = mockData.profile;
    });

    describe('public methods test', () => {

        it('setHasPool() should set `has pool`', () => {
            comp.setHasPool('true');
            expect(comp.homeProfile.hasPool).toBe(true);
            comp.setHasPool('false');
            expect(comp.homeProfile.hasPool).toBe(false);
        });

        it('setHasSpa() should set `has spa`', () => {
            comp.setHasSpa('true');
            expect(comp.homeProfile.hasSpa).toBe(true);
            comp.setHasSpa('false');
            expect(comp.homeProfile.hasSpa).toBe(false);
        });

        it('setPoolSize() should set pool size', () => {
            comp.setPoolSize(PoolSize.Medium);
            expect(comp.homeProfile.poolSize).toBe(PoolSize.Medium);
        });

        it('setPoolHeaterFuelType() should set pool heater fuel type', () => {
            comp.setPoolHeaterFuelType(PoolHeaterType.Gas);
            expect(comp.homeProfile.poolHeaterType).toBe(PoolHeaterType.Gas);
        });

        it('setPoolPumpAge() should set pool pump age', () => {
            comp.setPoolPumpAge(PoolPumpAge.MoreThan10Yrs);
            expect(comp.homeProfile.poolPumpAge).toBe(PoolPumpAge.MoreThan10Yrs);
        });
    });

    describe('without initial state', () => {

        it('should show two questions: do you have a pool, and do you have a spa', () => {
            fixture.detectChanges();

            const mainQuestions = fixture.nativeElement.querySelectorAll('.homeprofile-poolandspa-questionnaire-item__question');
            expect(mainQuestions.length).toBe(2);
            expect(mainQuestions[0].innerText).toBe('Do you have a pool?');
            expect(mainQuestions[1].innerText).toBe('Do you have a spa?');
        });

        it('should have true/false input for `do you have a pool`', () => {
            fixture.detectChanges();

            const hasPoolOptions = fixture.nativeElement.querySelectorAll('[data-test="pool"] agl-maui-segmented-button');
            expect(hasPoolOptions.length).toBe(2);
            de = <DebugElement> getDebugNode(hasPoolOptions[0]);
            segmentedButton = de.componentInstance;
            expect(segmentedButton.value).toBe('true');
            de = <DebugElement> getDebugNode(hasPoolOptions[1]);
            segmentedButton = de.componentInstance;
            expect(segmentedButton.value).toBe('false');
        });

        it('should have true/false input for `do you have a spa`', () => {
            fixture.detectChanges();

            const hasSpaOptions = fixture.nativeElement.querySelectorAll('[data-test="spa"] agl-maui-segmented-button');
            expect(hasSpaOptions.length).toBe(2);
            de = <DebugElement> getDebugNode(hasSpaOptions[0]);
            segmentedButton = de.componentInstance;
            expect(segmentedButton.value).toBe('true');
            de = <DebugElement> getDebugNode(hasSpaOptions[1]);
            segmentedButton = de.componentInstance;
            expect(segmentedButton.value).toBe('false');
        });

    });

    describe('interaction - with pool selected', () => {
        let radioGroups;
        beforeEach(() => {
            comp.homeProfile.hasPool = true;
            fixture.detectChanges();
            radioGroups = fixture.nativeElement.querySelectorAll('[data-test="pool"] .homeprofile-poolandspa__radio-group');
        });

        it('should show related questions when `do you have a pool` is true', () => {
            const poolSubQuestions = fixture.nativeElement.querySelectorAll('[data-test="pool"] .homeprofile-poolandspa-questionnaire-item__sub-question');
            expect(poolSubQuestions.length).toBe(3);
            expect(poolSubQuestions[0].innerText).toBe('What size is your pool?');
            expect(poolSubQuestions[1].innerText).toBe('How is your pool heated?');
            expect(poolSubQuestions[2].innerText).toBe('How old is your pool pump?');
            expect(radioGroups.length).toBe(3);
        });

        it('should show pool size options', () => {
            const poolSizes = radioGroups[0].querySelectorAll('input[type="radio"]');
            expect(poolSizes.length).toBe(5);
            expect(poolSizes[0].getAttribute('value')).toBe(PoolSize.Small);
            expect(poolSizes[1].getAttribute('value')).toBe(PoolSize.Medium);
            expect(poolSizes[2].getAttribute('value')).toBe(PoolSize.Large);
            expect(poolSizes[3].getAttribute('value')).toBe(PoolSize.ExtraLarge);
            expect(poolSizes[4].getAttribute('value')).toBe(PoolSize.NotSure);
        });

        it('should show pool heater type options', () => {
            const poolHeaterType = radioGroups[1].querySelectorAll('input[type="radio"]');
            expect(poolHeaterType.length).toBe(5);
            expect(poolHeaterType[0].getAttribute('value')).toBe(PoolHeaterType.Solar);
            expect(poolHeaterType[1].getAttribute('value')).toBe(PoolHeaterType.Gas);
            expect(poolHeaterType[2].getAttribute('value')).toBe(PoolHeaterType.Elec);
            expect(poolHeaterType[3].getAttribute('value')).toBe(PoolHeaterType.None);
            expect(poolHeaterType[4].getAttribute('value')).toBe(PoolHeaterType.NotSure);
        });

        it('should show pool pump age options', () => {
            const poolPumpAge = radioGroups[2].querySelectorAll('input[type="radio"]');
            expect(poolPumpAge.length).toBe(4);
            expect(poolPumpAge[0].getAttribute('value')).toBe(PoolPumpAge.UpTo5Yrs);
            expect(poolPumpAge[1].getAttribute('value')).toBe(PoolPumpAge.From6To10Yrs);
            expect(poolPumpAge[2].getAttribute('value')).toBe(PoolPumpAge.MoreThan10Yrs);
            expect(poolPumpAge[3].getAttribute('value')).toBe(PoolPumpAge.NotSure);
        });
    });

    describe('with initial state', () => {
        let radioGroups;
        beforeEach(() => {
            comp.homeProfile.hasPool = true;
            comp.homeProfile.poolSize = PoolSize.Medium;
            comp.homeProfile.poolHeaterType = PoolHeaterType.Elec;
            comp.homeProfile.poolPumpAge = PoolPumpAge.From6To10Yrs;
            comp.homeProfile.hasSpa = false;
            fixture.detectChanges();
            radioGroups = fixture.nativeElement.querySelectorAll('[data-test="pool"] .homeprofile-poolandspa__radio-group');
        });

        it('should show `has pool` value', () => {
            const hasPoolOptions = fixture.nativeElement.querySelectorAll('[data-test="pool"] agl-maui-segmented-button');
            de = <DebugElement> getDebugNode(hasPoolOptions[0]); // Yes button
            segmentedButton = de.componentInstance;
            expect(segmentedButton.selected).toBe(comp.homeProfile.hasPool);
        });

        it('should show pool size value', () => {
            const selectedPoolSize = radioGroups[0].querySelector(`[name="homeprofile-poolandspa-pool-size"] input[type="radio"]:checked`);
            expect(selectedPoolSize.getAttribute('value')).toBe(comp.homeProfile.poolSize.toString());
        });

        it('should show pool heater type value', () => {
            const selectedPoolHeaterType = radioGroups[1].querySelector(`[name="homeprofile-poolandspa-pool-heatertype"] input[type="radio"]:checked`);
            expect(selectedPoolHeaterType.getAttribute('value')).toBe(comp.homeProfile.poolHeaterType.toString());
        });

        it('should show pool pump age value', () => {
            const selectedPoolPumpAge = radioGroups[2].querySelector(`[name="homeprofile-poolandspa-pool-age"] input[type="radio"]:checked`);
            expect(selectedPoolPumpAge.getAttribute('value')).toBe(comp.homeProfile.poolPumpAge.toString());
        });

        it('should show `has spa` value', () => {
            const hasSpaOptions = fixture.nativeElement.querySelectorAll('[data-test="spa"] agl-maui-segmented-button');
            de = <DebugElement> getDebugNode(hasSpaOptions[0]); // Yes button
            segmentedButton = de.componentInstance;
            expect(segmentedButton.selected).toBe(comp.homeProfile.hasSpa);
        });
    });

});
