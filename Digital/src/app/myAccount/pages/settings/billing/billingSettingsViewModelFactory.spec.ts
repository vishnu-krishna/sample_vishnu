import { BillDeliveryContactDetailModel } from './../../../services/settings/model/billDeliveryContactDetailModel';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Mock } from 'ts-mocks';
import { BillDeliveryMethodType } from '../../../../myAccount/services/settings/model';
import { SettingsAggregateModel } from '../../../../myAccount/services/settings/model/settingsAggregateModel';
import { ISettingsService } from '../../../../myAccount/services/settings/settings.service.interface';
import { ApiService, BusinessPartnerModel, ContactDetailModel } from '../../../../shared/service/api.service';
import { UserInfo } from '../../../../shared/service/userInfo/userInfo';
import { AccountOwnerModel, AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../services/account.service';
import { BillingSettingsViewModelFactory } from './billingSettingsViewModelFactory';

class MockAccountService extends IAccountServiceMA {
    private _subject = new ReplaySubject<AccountViewModel[]>();
    constructor(accounts: AccountViewModel[]) {
        super();
        this.setAccounts(accounts);
    }

    public formatAddress(address: string): string {
        throw new Error('Method not implemented.');
    }
    public areAllAccountContractsRestricted(): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public getAccounts(): Observable<AccountViewModel[]> {
        return this._subject.first();
    }
    public setAccounts(accounts: AccountViewModel[]) {
        this._subject.next(accounts);
    }
    public getName(): Observable<AccountOwnerModel> {
        return Observable.from(null);
    }
    public refreshAccounts(): Observable<AccountViewModel[]> {
        return new ReplaySubject<AccountViewModel[]>().asObservable();
    }
    public isExcludedFromBillSmoothing(accountViewModels: AccountViewModel[]): boolean {
        return false;
    }
    public getAllActiveContracts(): Observable<string[]> {
        throw new Error('Method not implemented.');
    }
    public hasAnyContractInRegionId(regionId: string): Observable<boolean> {
        throw new Error('Method not implemented.');
    }
    public hasContractPayOnTimeDiscount(accounts: AccountViewModel[]): boolean {
        throw new Error('Method not implemented.');
    }
}

class MockSettingsService extends ISettingsService {
    private _subject = new ReplaySubject<SettingsAggregateModel>();
    constructor(settings: SettingsAggregateModel) {
        super();
        this.setSettings(settings);
    }
    public getSettings(): Observable<SettingsAggregateModel> {
        return this._subject.first();
    }
    public setSettings(settings: SettingsAggregateModel) {
        this._subject.next(settings);
    }
    public updateBillDeliveryMethodPreference(contractAccountNumber: string, deliveryMethod: BillDeliveryMethodType): Observable<any> {
        throw new Error('Not Implemented');
    }
    public getBillDeliveryMethodPreferences(): Observable<BillDeliveryContactDetailModel[]> {
        return Observable.of([new BillDeliveryContactDetailModel()]);
    }
}

describe('Billing Settings ViewModel Factory Test', () => {
    let mockApiService: Mock<ApiService>;
    let mockContactDetailModel: ContactDetailModel;
    let mockBusinessPartnerModel: BusinessPartnerModel;

    mockApiService = new  Mock<ApiService>();

    mockContactDetailModel = {
        hasMultipleBusinessPartners: false,
        businessPartners: [mockBusinessPartnerModel]
    };
    beforeAll(() => {
    mockApiService
    .setup((x) => x.getContactDetail)
    .is(() => Observable.of(mockContactDetailModel));
    });

    it('1 ContractAccount 2 Grouped Contracts Elec & Gas', () => {
        // Arrange
        let mockUserInfo = new UserInfo();
        let mockSettings = new SettingsAggregateModel();
        let mockAccounts = new Array<AccountViewModel>();

        let mockContractAccount = createContractAccountViewModel();
        mockAccounts.push(mockContractAccount);

        let factory = new BillingSettingsViewModelFactory(
            new MockAccountService(mockAccounts),
            new MockSettingsService(mockSettings),
            mockApiService.Object);

        // Act
        factory.getViewModel().subscribe((actual) => {
            // Assert
            expect(actual.items.length).toBe(1);
            expect(actual.items[0].accountDetailModel.supplyAddresses[0]).toBe(mockContractAccount.contracts[0].address);
            expect(actual.items[0].accountDetailModel.numberOfGasIcons).toBe(1);
            expect(actual.items[0].accountDetailModel.numberOfElectricityIcons).toBe(1);
            expect(actual.items[0].showAccountDetailComponent).toBeTruthy();
        });
    });

    it('1 ContractAccount 3 Grouped Contracts Elec, Elec & Gas', () => {
        // Arrange
        let mockUserInfo = new UserInfo();
        let mockSettings = new SettingsAggregateModel();
        let mockAccounts = new Array<AccountViewModel>();

        let contractAccount1 = createContractAccountViewModel();
        mockAccounts.push(contractAccount1);

        // Duplicating contract 0 to get 3 Contracts within this ContractAccount
        contractAccount1.contracts.push(contractAccount1.contracts[0]);

        let factory = new BillingSettingsViewModelFactory(
            new MockAccountService(mockAccounts),
            new MockSettingsService(mockSettings),
            mockApiService.Object);

        // Act
        factory.getViewModel().subscribe((actual) => {
            // Assert
            expect(actual.items.length).toBe(1, 'Number of BillingSettingsViewModel');
            expect(actual.items[0].accountDetailModel.supplyAddresses[0]).toBe(contractAccount1.contracts[0].address, 'Grouped Address');
            expect(actual.items[0].accountDetailModel.numberOfGasIcons).toBe(1, 'numberOfGasIcons');
            expect(actual.items[0].accountDetailModel.numberOfElectricityIcons).toBe(2, 'numberOfElectricityIcons');
            expect(actual.items[0].showAccountDetailComponent).toBeTruthy();
        });
    });

    it('1 ContractAccount 2 UnGrouped Contracts Elec & Gas', () => {
        // Arrange
        let mockUserInfo = new UserInfo();
        let mockSettings = new SettingsAggregateModel();
        let mockAccounts = new Array<AccountViewModel>();
        let contractAccount1 = createContractAccountViewModel();

        contractAccount1.groupedAddress = '';
        contractAccount1.contracts[1].address = 'Changed Address';

        mockAccounts.push(contractAccount1);

        let factory = new BillingSettingsViewModelFactory(
            new MockAccountService(mockAccounts),
            new MockSettingsService(mockSettings),
            mockApiService.Object);

        // Act
        factory.getViewModel().subscribe((actual) => {
            // Assert
            expect(actual.items.length).toBe(1, 'Number of BillingSettingsViewModel');
            expect(actual.items[0].accountDetailModel.supplyAddresses[0]).toBe(contractAccount1.contracts[0].address, 'Grouped Address');
            expect(actual.items[0].accountDetailModel.supplyAddresses[1]).toBe(contractAccount1.contracts[1].address, 'Grouped Address');
            expect(actual.items[0].accountDetailModel.numberOfGasIcons).toBe(1, 'numberOfGasIcons');
            expect(actual.items[0].accountDetailModel.numberOfElectricityIcons).toBe(1, 'numberOfElectricityIcons');
            expect(actual.items[0].showAccountDetailComponent).toBeTruthy();
        });
    });

    it('1 ContractAccount 1 Contract Gas', () => {
        // Arrange
        let mockUserInfo = new UserInfo();
        let mockSettings = new SettingsAggregateModel();
        let mockAccounts = new Array<AccountViewModel>();
        let contractAccount1 = createContractAccountViewModel();

        contractAccount1.groupedAddress = '';

        mockAccounts.push(contractAccount1);
        mockAccounts[0].contracts.pop();

        let factory = new BillingSettingsViewModelFactory(
            new MockAccountService(mockAccounts),
            new MockSettingsService(mockSettings),
            mockApiService.Object);

        // Act
        factory.getViewModel().subscribe((actual) => {
            // Assert
            expect(actual.items.length).toBe(1, 'Number of BillingSettingsViewModel');
            expect(actual.items[0].accountDetailModel.numberOfGasIcons).toBe(0, 'numberOfGasIcons');
            expect(actual.items[0].accountDetailModel.numberOfElectricityIcons).toBe(1, 'numberOfElectricityIcons');
            expect(actual.items[0].showAccountDetailComponent).toBeFalsy();
        });
    });

    it('1 ContractAccount with 1 Restricted Contract 1 Unrestricted Contract - should only show Unrestricted Contract fuel icon', () => {
        // Arrange
        let mockUserInfo = new UserInfo();
        let mockSettings = new SettingsAggregateModel();
        let mockAccounts = new Array<AccountViewModel>();
        let contractAccount1 = createContractAccountViewModel();

        contractAccount1.contracts[0].isRestricted = true;
        contractAccount1.contracts[1].isRestricted = false;

        mockAccounts.push(contractAccount1);

        let factory = new BillingSettingsViewModelFactory(
            new MockAccountService(mockAccounts),
            new MockSettingsService(mockSettings),
            mockApiService.Object);

        // Act
        factory.getViewModel().subscribe((actual) => {
            // Assert
            expect(actual.items.length).toBe(1, 'Number of BillingSettingsViewModel');
            expect(actual.items[0].accountDetailModel.supplyAddresses[0]).toBe(contractAccount1.contracts[0].address, 'Grouped Address');
            expect(actual.items[0].accountDetailModel.numberOfGasIcons).toBe(1, 'numberOfGasIcons');
            expect(actual.items[0].accountDetailModel.numberOfElectricityIcons).toBe(0, 'numberOfElectricityIcons');
            expect(actual.items[0].showAccountDetailComponent).toBeTruthy();
        });
    });

    it('2 ContractAccounts with 2 Contracts Respectively - Expect 2nd CA filtered because all its contracts are restricted', () => {
        // Arrange
        let mockUserInfo = new UserInfo();
        let mockSettings = new SettingsAggregateModel();
        let mockAccounts = new Array<AccountViewModel>();
        let contractAccount1 = createContractAccountViewModel();
        let contractAccount2 = createContractAccountViewModel();

        contractAccount2.contracts.forEach((c) => {
            c.isRestricted = true;
        });
        contractAccount1.contracts[0].isRestricted = true;

        mockAccounts.push(contractAccount1);
        mockAccounts.push(contractAccount2);

        let factory = new BillingSettingsViewModelFactory(
            new MockAccountService(mockAccounts),
            new MockSettingsService(mockSettings),
            mockApiService.Object);

        // Act
        factory.getViewModel().subscribe((actual) => {
            // Assert
            expect(actual.items.length).toBe(1, 'Number of BillingSettingsViewModel');
            expect(actual.items[0].accountDetailModel.supplyAddresses[0]).toBe(contractAccount1.contracts[0].address, 'Grouped Address');
            expect(actual.items[0].accountDetailModel.numberOfGasIcons).toBe(1, 'numberOfGasIcons');
            expect(actual.items[0].accountDetailModel.numberOfElectricityIcons).toBe(0, 'numberOfElectricityIcons');
            expect(actual.items[0].showAccountDetailComponent).toBeTruthy();
        });
    });

    it('2 Grouped ContractAccounts - expect both tiles to display', () => {
        // Arrange
        let mockUserInfo = new UserInfo();
        let mockSettings = new SettingsAggregateModel();
        let mockAccounts = new Array<AccountViewModel>();

        let contractAccount1 = createContractAccountViewModel();
        let contractAccount2 = createContractAccountViewModel();

        mockAccounts.push(contractAccount1);
        mockAccounts.push(contractAccount2);

        let factory = new BillingSettingsViewModelFactory(
            new MockAccountService(mockAccounts),
            new MockSettingsService(mockSettings),
            mockApiService.Object);

        // Act
        factory.getViewModel().subscribe((actual) => {
            // Assert
            expect(actual.items.length).toBe(2, 'Number of BillingSettingsViewModel');
            expect(actual.items[0].accountDetailModel.supplyAddresses.length).toBe(1);
            expect(actual.items[0].accountDetailModel.supplyAddresses[0]).toBe(contractAccount1.contracts[0].address, 'Grouped Address');
            expect(actual.items[0].accountDetailModel.numberOfGasIcons).toBe(1, 'numberOfGasIcons');
            expect(actual.items[0].accountDetailModel.numberOfElectricityIcons).toBe(1, 'numberOfElectricityIcons');
            expect(actual.items[0].showAccountDetailComponent).toBeTruthy();
            expect(actual.items[1].accountDetailModel.supplyAddresses.length).toBe(1);
            expect(actual.items[1].accountDetailModel.supplyAddresses[0]).toBe(contractAccount2.contracts[0].address, 'Grouped Address');
            expect(actual.items[1].accountDetailModel.numberOfGasIcons).toBe(1, 'numberOfGasIcons');
            expect(actual.items[1].accountDetailModel.numberOfElectricityIcons).toBe(1, 'numberOfElectricityIcons');
            expect(actual.items[1].showAccountDetailComponent).toBeTruthy();
        });
    });

    it('should show the monthly billing link for all bill smoothing customers', () => {
        // Arrange
        let mockUserInfo = new UserInfo();
        let mockSettings = new SettingsAggregateModel();
        let mockAccounts = new Array<AccountViewModel>();
        let contractAccount1 = createContractAccountViewModel();
        let contractAccount2 = createContractAccountViewModel();

        // Contract 1 - Bill Smoothing V2 Basic Meter
        contractAccount1.contracts[0].isBillSmoothingV2 = true;
        contractAccount1.contracts[0].isSmartMeter = false;

        // Contract 2 - Bill Smoothing V2 Smart Meter
        contractAccount1.contracts[1].isBillSmoothingV2 = true;
        contractAccount1.contracts[1].isSmartMeter = true;

        // Contract 3 - Bill Smoothing V1 Basic Meter
        contractAccount2.contracts[0].isBillSmoothing = true;
        contractAccount2.contracts[0].isSmartMeter = false;

        // Contract 4 - Bill Smoothing V1 Smart Meter
        contractAccount2.contracts[1].isBillSmoothing = true;
        contractAccount2.contracts[1].isSmartMeter = true;

        mockAccounts.push(contractAccount1);
        mockAccounts.push(contractAccount2);

        let factory = new BillingSettingsViewModelFactory(
            new MockAccountService(mockAccounts),
            new MockSettingsService(mockSettings),
            mockApiService.Object);

        // Act
        factory.getViewModel().subscribe((actual) => {
            // Assert
            for (let account of actual.items) {
                expect(account.showMonthlyBilling).toBe(true, `Account ${account.account.accountNumber} should be true`);
            }
        });
    });

    // Helper functions to setup test data:

    function createContractAccountViewModel(): AccountViewModel {
        let contractAccountViewModel = new AccountViewModel('123456789');
        let groupedAddress = '123 street st';
        contractAccountViewModel.groupedAddress = groupedAddress;

        let contract1 = createContractViewModel('12345', 'Electricity', groupedAddress);
        let contract2 = createContractViewModel('23456', 'Gas', groupedAddress);
        contractAccountViewModel.contracts.push(contract1);
        contractAccountViewModel.contracts.push(contract2);
        return contractAccountViewModel;
    }

    function createContractViewModel(contractId: string, fuelType: string, address?: string, isRestriced?: boolean): ContractViewModel {
        let contractViewModel = new ContractViewModel(contractId);
        contractViewModel.address = address ;
        contractViewModel.fuelType = fuelType;
        contractViewModel.isRestricted = isRestriced;
        return contractViewModel;
    }
});
