import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { HomeProfileLandingComponent } from './homeProfileLanding.component';
import { HomeProfileLandingModule } from './homeProfileLanding.module';

import { HomeProfileViewModel } from './../homeProfileViewModel';
import { AddressContractViewModel } from './../homeProfile.service';
import { IHomeProfileStateService, HomeProfileStatus } from './../homeProfileState.service';
import { IHomeProfileMapper } from '../homeProfileMapper';
import { IHomeProfileApi } from '../../../../services/homeProfile/homeProfileApi.service';
import { IAccountServiceMA, ContractViewModel, AccountViewModel } from '../../../../services/account.service';
import { HomeProfileService } from '../homeProfile.service';
import { HomeProfileStateMockService } from '../../../../services/mock/homeProfileState.mock.service';
import { HomeProfileUrls, HomeProfileNavigationService } from '../homeProfileNavigation.service';
import { Mock } from 'ts-mocks';
import { VIEWPORT_RULER_PROVIDER_FACTORY } from '@angular/cdk/scrolling';

describe('Home Profile - Landing Page', () => {
    let fixture: ComponentFixture<HomeProfileLandingComponent>;
    let comp: HomeProfileLandingComponent;
    let de: DebugElement;

    let accountServiceStub: Partial<IAccountServiceMA>;
    let homeProfileServiceStub: any;

    const homeProfileStateServiceMock = new Mock<IHomeProfileStateService>();
    let spyOnHomeProfileStateService: {
        initializeHomeProfile: jasmine.Spy,
        saveProfile: jasmine.Spy
    };
    const homeProfileNavigationServiceMock = new Mock<HomeProfileNavigationService>();
    let spyOnHomeProfileNavigationService: {
        selectAddressForHomeProfile: jasmine.Spy,
        startHomeProfile: jasmine.Spy
    };
    const homeProfileServiceMock = new Mock<HomeProfileService>();
    let spyOnHomeProfileService: {
        createAddressContractModel: jasmine.Spy,
        getUniqueAddresses: jasmine.Spy,
        getContractForAddress: jasmine.Spy
    };

    const mockAddressContractSingle: AddressContractViewModel[] = [
        { address: 'a1', accountId: '100', contractId: '900', fuelType: 'elec', status: HomeProfileStatus.NotStarted }
    ];
    const mockAddressContractMulti: AddressContractViewModel[] = [
        { address: 'a1', accountId: '100', contractId: '900', fuelType: 'elec', status: HomeProfileStatus.NotStarted }
        , { address: 'a1', accountId: '100', contractId: '901', fuelType: 'gas', status: HomeProfileStatus.NotStarted }
        , { address: 'a2', accountId: '101', contractId: '902', fuelType: 'elec', status: HomeProfileStatus.NotStarted }
        , { address: 'a3', accountId: '101', contractId: '903', fuelType: 'elec', status: HomeProfileStatus.NotStarted }
    ];
    const mockAccountSingle: AccountViewModel[] = [
        new AccountViewModel(mockAddressContractSingle[0].accountId, [new ContractViewModel(mockAddressContractSingle[0].contractId)])
    ];
    const mockAccountMulti: AccountViewModel[] = [
        new AccountViewModel(mockAddressContractMulti[0].accountId, [
            new ContractViewModel(mockAddressContractMulti[0].contractId), new ContractViewModel(mockAddressContractMulti[1].contractId)]),
        new AccountViewModel(mockAddressContractMulti[2].accountId, [
            new ContractViewModel(mockAddressContractMulti[2].contractId), new ContractViewModel(mockAddressContractMulti[3].contractId)]),
    ];
    const mockAddressSingle: string[] = ['a1'];
    const mockAddressMulti: string[] = ['a1', 'a2', 'a3'];

    beforeEach(() => {
        spyOnHomeProfileStateService = {
            initializeHomeProfile: homeProfileStateServiceMock.setup((mockService) => mockService.initializeHomeProfile).is(() => Observable.of(true)).Spy,
            saveProfile: homeProfileStateServiceMock.setup((mockService) => mockService.saveProfile).is(() => Observable.of(true)).Spy
        };
        spyOnHomeProfileNavigationService = {
            selectAddressForHomeProfile: homeProfileNavigationServiceMock.setup((mockService) => mockService.selectAddressForHomeProfile).Spy,
            startHomeProfile: homeProfileNavigationServiceMock.setup((mockService) => mockService.startHomeProfile).Spy
        };
        accountServiceStub = {
            getAccounts: () => Observable.of(mockAccountSingle)
        };
        spyOnHomeProfileService = {
            createAddressContractModel: homeProfileServiceMock.setup((mockService) => mockService.createAddressContractModel).is(() => Observable.of(true)).Spy,
            getUniqueAddresses: homeProfileServiceMock.setup((mockService) => mockService.getUniqueAddresses).is(() => []).Spy,
            getContractForAddress: homeProfileServiceMock.setup((mockService) => mockService.getContractForAddress).is(() => null).Spy
        };

        TestBed.configureTestingModule({
            imports: [
                HomeProfileLandingModule,
            ],
            providers: [
                HomeProfileUrls,
                { provide: IHomeProfileStateService, useValue: homeProfileStateServiceMock.Object },
                { provide: HomeProfileNavigationService, useValue: homeProfileNavigationServiceMock.Object },
                { provide: IAccountServiceMA, useValue: accountServiceStub },
                { provide: HomeProfileService, useValue: homeProfileServiceMock.Object }
            ]
        });

        fixture = TestBed.createComponent(HomeProfileLandingComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        accountServiceStub = TestBed.get(IAccountServiceMA);
        homeProfileServiceStub = TestBed.get(HomeProfileService);
    });

    describe('Single Address', () => {
        beforeEach(() => {
            spyOn(accountServiceStub, 'getAccounts').and.returnValue(Observable.of(mockAccountSingle));
            homeProfileServiceStub.addressesContracts = mockAddressContractSingle;
            spyOnHomeProfileService.createAddressContractModel.and.returnValue(Observable.of(true));
            spyOnHomeProfileService.getUniqueAddresses.and.returnValue(mockAddressSingle);
            spyOnHomeProfileService.getContractForAddress.and.returnValue(mockAddressContractSingle[0]);
        });

        it('should be able to start survey', () => {
            spyOn(comp, 'isSingleAddress').and.returnValue(true);
            comp.startHomeProfile();
            expect(spyOnHomeProfileNavigationService.startHomeProfile).toHaveBeenCalled();
        });

        it('should return true while checking is single address', () => {
            comp.address = mockAddressContractSingle[0].address;
            expect(comp.isSingleAddress()).toBe(true);
        });

        describe('hasHomeProfile()', () => {
            it('should return correct false if has home profile', () => {
                const hasHomeProfile = comp.hasHomeProfile();
                expect(hasHomeProfile).toBe(false);
            });

            it('should return true if it has home profile', () => {
                homeProfileServiceStub.addressesContracts[0].status = HomeProfileStatus.Complete;
                const hasHomeProfile = comp.hasHomeProfile();
                expect(hasHomeProfile).toBe(true);
            });
        });

        it('should show loader when loading from api', () => {
            comp.isLoading = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.homeprofile-landing__loader')).toBeDefined();
        });

        it('should show error content when there is error', () => {
            comp.isError = true;
            fixture.detectChanges();
            expect(de.query(By.css('.homeprofile-landing__error')).nativeElement).toBeDefined();
        });

        it('should show home profile content where there is no error', () => {
            comp.isError = false;
            comp.isLoading = false;
            fixture.detectChanges();
            expect(de.query(By.css('agl-home-profile-section')).nativeElement).toBeDefined();
        });
    });

    describe('Multi Address', () => {
        beforeEach(() => {
            spyOn(accountServiceStub, 'getAccounts').and.returnValue(Observable.of(mockAccountMulti));
            spyOnHomeProfileService.createAddressContractModel.and.returnValue(Observable.of(true));
            spyOnHomeProfileService.getUniqueAddresses.and.returnValue(mockAddressMulti);
            spyOnHomeProfileService.getContractForAddress.and.returnValue(mockAddressContractMulti[0]);
            homeProfileServiceStub.addressesContracts = mockAddressContractMulti;
        });

        it('should be able to go to list addresses page', () => {
            spyOn(comp, 'isSingleAddress').and.returnValue(false);
            spyOnHomeProfileNavigationService.selectAddressForHomeProfile.and.stub();
            comp.startHomeProfile();
            expect(spyOnHomeProfileNavigationService.startHomeProfile).not.toHaveBeenCalled();
            expect(spyOnHomeProfileNavigationService.selectAddressForHomeProfile).toHaveBeenCalled();
        });

        it('should return false while checking is single address', () => {
            expect(comp.address).toBe('');
            expect(comp.isSingleAddress()).toBe(false);
        });
    });
});
