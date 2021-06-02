import { Mock } from 'ts-mocks';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';

import { IAccountServiceMA } from '../../../services/account.service';
import { HomeProfileStatus } from './homeProfileState.service';
import { IHomeProfileApi, HomeProfileSummaryApiModel } from '../../../services/homeProfile/homeProfileApi.service';
import { HomeProfileService, AddressContractViewModel } from './homeProfile.service';
import { AccountViewModel, ContractViewModel } from './../../../services/account.service';

describe('Home Profile Service', () => {
    const accountServiceMock = new Mock<IAccountServiceMA>();
    const apiServiceMock = new Mock<IHomeProfileApi>();

    let spyOnHomeProfileApi: {
        getAccounts: jasmine.Spy,
        getProfiles: jasmine.Spy
    };

    let profileService: Partial<HomeProfileService>;
    let mockAddressContractMulti: AddressContractViewModel[];

    const createMockData = {
        contract: (contractId: string, contractAddress: string, contractFuel: string) => {
            const mockContract: Partial<ContractViewModel> = {
                contractNumber: contractId,
                address: contractAddress,
                fuelType: contractFuel
            };
            return mockContract;
        },
        profiles: (accountId: string, contractId: string) => {
            const summary: HomeProfileSummaryApiModel = {
                contractNumber: contractId, accountNumber: accountId, updatedUtc: new Date()
            };
            return summary;
        }
    };

    beforeEach(() => {
        spyOnHomeProfileApi = {
            getAccounts: accountServiceMock.setup((mockService) => mockService.getAccounts).is(() => Observable.of([])).Spy,
            getProfiles: apiServiceMock.setup((mockService) => mockService.getProfiles).is(() => Observable.of([])).Spy
        };

        mockAddressContractMulti = [
            { address: 'address1', accountId: '100', contractId: '900', fuelType: 'elec', status: HomeProfileStatus.NotStarted }
            , { address: 'address1', accountId: '100', contractId: '901', fuelType: 'gas', status: HomeProfileStatus.NotStarted }
            , { address: 'address2', accountId: '101', contractId: '902', fuelType: 'elec', status: HomeProfileStatus.NotStarted }
            , { address: 'address3', accountId: '101', contractId: '903', fuelType: 'elec', status: HomeProfileStatus.NotStarted }
        ];

        profileService = new HomeProfileService(accountServiceMock.Object, apiServiceMock.Object);
    });

    describe('creating model', () => {
        const mockAccounts = [{
            accountNumber: '100',
            contracts: [createMockData.contract('900', 'address1', 'elec'), createMockData.contract('901', 'address1', 'gas')]
        }, {
            accountNumber: '101',
            contracts: [createMockData.contract('902', 'address2', 'elec'), createMockData.contract('903', 'address3', 'elec')]
        }];
        const mockAccountsError = { status: 500 };
        const mockProfiles = [];
        const mockProfilesError = { status: 500 };

        it('should create valid model', async(() => {
            spyOnHomeProfileApi.getAccounts.and.returnValue(mockAccounts);
            spyOnHomeProfileApi.getProfiles.and.returnValue(mockProfiles);

            profileService.createAddressContractModel().subscribe((result: boolean) => {
                expect(result).toBe(true);
                expect(spyOnHomeProfileApi.getAccounts).toHaveBeenCalled();
                expect(spyOnHomeProfileApi.getProfiles).toHaveBeenCalled();
            }, (error) => {
                fail(`Expected operation to succeed, but it failed with error: \n${JSON.stringify(error)}`);
            });
        }));

        it('should throw error if it fails to get accounts', async(() => {
            spyOnHomeProfileApi.getAccounts.and.returnValue(mockAccountsError);
            spyOnHomeProfileApi.getProfiles.and.returnValue(mockProfiles);

            profileService.createAddressContractModel().subscribe((result: boolean) => {
                expect(result).toBe(false);
                expect(spyOnHomeProfileApi.getAccounts).toHaveBeenCalled();
                expect(spyOnHomeProfileApi.getProfiles).toHaveBeenCalled();
            }, (error) => {
                fail(`Expected operation to succeed, but it failed with error: \n${JSON.stringify(error)}`);
            });
        }));

        it('should throw error if it fails to get profiles', async(() => {
            spyOnHomeProfileApi.getAccounts.and.returnValue(mockAccounts);
            spyOnHomeProfileApi.getProfiles.and.returnValue(mockProfilesError);

            profileService.createAddressContractModel().subscribe((result: boolean) => {
                expect(result).toBe(false);
                expect(spyOnHomeProfileApi.getAccounts).toHaveBeenCalled();
                expect(spyOnHomeProfileApi.getProfiles).toHaveBeenCalled();
            }, (error) => {
                fail(`Expected operation to succeed, but it failed with error: \n${JSON.stringify(error)}`);
            });
        }));
    });

    describe('getting valid contract', () => {
        beforeEach(() => {
            profileService.addressesContracts = mockAddressContractMulti;
        });

        it('should return 1st contract when address is address1', () => {
            expect(profileService.getContractForAddress('address1')).toEqual(mockAddressContractMulti[0]);
        });

        it('should return 4th contract when address is address3', () => {
            expect(profileService.getContractForAddress('address3')).toEqual(mockAddressContractMulti[3]);
        });

        it('should return electricity contract when address1 has 2 contracts (gas, electricity)', () => {
            profileService.addressesContracts = mockAddressContractMulti.map((o, i) => {
                if (i === 0) { o.address = 'address0'; }
                if (i === 1 || i === 2 ) { o.address = 'address1'; }
                return o;
            });
            expect(profileService.getContractForAddress('address1')).toEqual(mockAddressContractMulti[2]);
        });

        it('should return 1st contract when all addresses address1 (electricity, gas, electricity, electricity)', () => {
            profileService.addressesContracts = mockAddressContractMulti.map((o) => {
                o.address = 'address1';
                return o;
            });
            expect(profileService.getContractForAddress('address1')).toEqual(mockAddressContractMulti[0]);
        });
    });

    describe('getting valid unique addresses', () => {
        beforeEach(() => {
            profileService.addressesContracts = mockAddressContractMulti;
        });

        it('should return 3 unique addresses', () => {
            expect(profileService.getUniqueAddresses()).toEqual(['address1', 'address2', 'address3']);
        });

        it('should return 2 unique address', () => {
            profileService.addressesContracts = mockAddressContractMulti.map((o, i) => {
                o.address = (i === 3) ? 'address2' : o.address;
                return o;
            });
            expect(profileService.getUniqueAddresses()).toEqual(['address1', 'address2']);
        });
    });
});
