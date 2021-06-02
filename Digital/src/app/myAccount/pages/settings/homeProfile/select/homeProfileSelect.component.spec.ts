import { HomeProfileService, AddressContractViewModel } from './../homeProfile.service';
import { Observable } from 'rxjs/Observable';
import { HomeProfileNavigationService } from './../homeProfileNavigation.service';
import { HomeProfileSelectComponent } from './homeProfileSelect.component';
import { HomeProfileSelectModule } from './homeProfileSelect.module';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Mock } from 'ts-mocks';
import { IHomeProfileStateService, HomeProfileStatus } from '../homeProfileState.service';
import { By } from '@angular/platform-browser';

describe('Home Profile Select component', () => {

    let fixture: ComponentFixture<HomeProfileSelectComponent>;
    let comp: HomeProfileSelectComponent;

    const homeProfileServiceMock = new Mock<HomeProfileService>();
    let spyOnHomeProfileService: {
        createAddressContractModel: jasmine.Spy,
        getUniqueAddresses: jasmine.Spy,
        getContractForAddress: jasmine.Spy
    };

    const homeProfileNavigationServiceMock = new Mock<HomeProfileNavigationService>();
    let spyOnHomeProfileNavigationService: {
        back: jasmine.Spy
    };

    const homeProfileStateServiceMock = new Mock<IHomeProfileStateService>();

    beforeEach(() => {
        spyOnHomeProfileNavigationService = {
            back: homeProfileNavigationServiceMock.setup((mockService) => mockService.back).Spy
        };

        spyOnHomeProfileService = {
            createAddressContractModel: homeProfileServiceMock.setup((mockService) => mockService.createAddressContractModel).is(() => Observable.of(true)).Spy,
            getUniqueAddresses: homeProfileServiceMock.setup((mockService) => mockService.getUniqueAddresses).is(() => []).Spy,
            getContractForAddress: homeProfileServiceMock.setup((mockService) => mockService.getContractForAddress).is(() => null).Spy,
        };

        TestBed.configureTestingModule({
            imports: [
                HomeProfileSelectModule,
            ],
            providers: [
                { provide: HomeProfileService, useValue: homeProfileServiceMock.Object },
                { provide: IHomeProfileStateService, useValue: homeProfileStateServiceMock.Object },
                { provide: HomeProfileNavigationService, useValue: homeProfileNavigationServiceMock.Object }
            ]
        });
        fixture = TestBed.createComponent(HomeProfileSelectComponent);
        comp = fixture.componentInstance;
    });

    it('should create address contract model on init', async(() => {
        comp.ngOnInit();
        spyOnHomeProfileService.getUniqueAddresses.and.stub();
        expect(spyOnHomeProfileService.createAddressContractModel).toHaveBeenCalled();
    }));

    it ('should call navigation service on back click', () => {
        comp.backClick();

        expect(spyOnHomeProfileNavigationService.back).toHaveBeenCalled();
    });

    describe('grouping addresses', () => {
        beforeEach(() => {
            spyOnHomeProfileService.getUniqueAddresses.and.returnValue(['address1', 'address2', 'address3']);
        });

        describe('some contracts have started, some havent', () => {
            beforeEach(() => {
                spyOnHomeProfileService.getContractForAddress.and.callFake((address: string) => {
                    if (address === 'address1') {
                        return createAddressContractViewModel(address, '111', '1112', HomeProfileStatus.NotStarted);
                    } else if (address === 'address2') {
                        return createAddressContractViewModel(address, '111', '1113', HomeProfileStatus.NotStarted);
                    } else {
                        return createAddressContractViewModel(address, '111', '1114', HomeProfileStatus.Incomplete);
                    }
                });
            });
            it('should group not started addresses correctly', async(() => {
                comp.ngOnInit();

                expect(comp.notStartedAddressContracts.length).toBe(2);
            }));

            it('should group already started addresses correctly', async(() => {
                comp.ngOnInit();

                expect(comp.alreadyStartedAddressContracts.length).toBe(1);
            }));

            it('should render correctly', async(() => {
                fixture.detectChanges();

                const contractsAlreadyStarted = fixture.nativeElement.querySelectorAll('[data-test="contracts-already-started"]');
                const contractsNotStarted = fixture.nativeElement.querySelectorAll('[data-test="contracts-not-started"]');
                expect(contractsAlreadyStarted.length).toBe(1);
                expect(contractsNotStarted.length).toBe(1);
            }));
        });

        describe('all contracts havent started', () => {
            beforeEach(() => {
                spyOnHomeProfileService.getContractForAddress.and.callFake((address: string) => {
                    if (address === 'address1') {
                        return createAddressContractViewModel(address, '111', '1112', HomeProfileStatus.NotStarted);
                    } else if (address === 'address2') {
                        return createAddressContractViewModel(address, '222', '1113', HomeProfileStatus.NotStarted);
                    } else {
                        return createAddressContractViewModel(address, '333', '1114', HomeProfileStatus.NotStarted);
                    }
                });
            });
            it('should group not started addresses correctly', async(() => {
                comp.ngOnInit();

                expect(comp.notStartedAddressContracts.length).toBe(3);
            }));

            it('should group already started addresses correctly', async(() => {
                comp.ngOnInit();

                expect(comp.alreadyStartedAddressContracts.length).toBe(0);
            }));

            it('should render correctly', async(() => {
                fixture.detectChanges();

                const contractsAlreadyStarted = fixture.nativeElement.querySelectorAll('[data-test="contracts-already-started"]');
                const contractsNotStarted = fixture.nativeElement.querySelectorAll('[data-test="contracts-not-started"]');
                expect(contractsAlreadyStarted.length).toBe(0);
                expect(contractsNotStarted.length).toBe(1);
            }));
        });

        describe('all contracts have started', () => {
            beforeEach(() => {
                spyOnHomeProfileService.getContractForAddress.and.callFake((address: string) => {
                    if (address === 'address1') {
                        return createAddressContractViewModel(address, '111', '1112', HomeProfileStatus.Incomplete);
                    } else if (address === 'address2') {
                        return createAddressContractViewModel(address, '111', '1113', HomeProfileStatus.Incomplete);
                    } else {
                        return createAddressContractViewModel(address, '111', '1114', HomeProfileStatus.Incomplete);
                    }
                });
            });
            it('should group not started addresses correctly', async(() => {
                comp.ngOnInit();

                expect(comp.notStartedAddressContracts.length).toBe(0);
            }));

            it('should group already started addresses correctly', async(() => {
                comp.ngOnInit();

                expect(comp.alreadyStartedAddressContracts.length).toBe(3);
            }));

            it('should render correctly', async(() => {
                fixture.detectChanges();

                const contractsAlreadyStarted = fixture.nativeElement.querySelectorAll('[data-test="contracts-already-started"]');
                const contractsNotStarted = fixture.nativeElement.querySelectorAll('[data-test="contracts-not-started"]');
                expect(contractsAlreadyStarted.length).toBe(1);
                expect(contractsNotStarted.length).toBe(0);
            }));
        });
    });
});

function createAddressContractViewModel(address: string, accountId: string, contractId: string, status: HomeProfileStatus): AddressContractViewModel {
    return  {
        address: address,
        accountId: accountId,
        contractId: contractId,
        fuelType: 'elec',
        status: status
    };
}
