import { async, inject, TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Mock } from 'ts-mocks/lib';

import { AccountService, IAccountServiceMA } from '../../myAccount/services/account.service';
import { FeatureFlagService, FeatureFlagTypes } from '../../myAccount/services/featureFlag.service';
import { FeatureFlagMockService } from '../../myAccount/services/mock/featureflag.mock.service';
import { PaygAccountMockService } from '../../myAccount/services/mock/paygAccount.mock.service';
import { PaygAccountService } from '../../myAccount/services/paygAccount.service';
import { LoggerInterface } from '../../shared/instrumentation/logger.interface';
import { AccountApiModel, ApiService, BillApiModel, BillHistoryApiModel, BillSmoothingApiModel, ContractDetailApiModel, PaymentApiModel, PendingPaymentApiModel } from '../../shared/service/api.service';
import { IRedLineApiService } from '../../shared/service/contract/iredlineapi.service';
import { DataLayerService } from '../../shared/service/dataLayer.service';
import { ApiStubService } from '../../test/stubs/api.stub.service';
import { DataLayerStubService } from '../../test/stubs/dataLayer.stub.service';
import { PaymentStubService } from '../../test/stubs/payment.stub.service';
import { RedLineApiStubService } from '../../test/stubs/redlineApi.stub.service';
import { PaymentMethod } from './settings/model/paymentMethod';
import { PaymentMethodsService } from './settings/paymentMethods.service';
import { ProductAttributesStubService } from '../../test/stubs/productAttributes.stub.service';
import { ProductAttributesService } from './productAttributesService';
import { ProductApiService } from '../../shared/service/productApi.service';
import { IProductApiService } from '../../shared/service/contract/iproductApi.service';
import { PaymentArrangementInstalmentPlans, InstalmentPlanStatus, IPaymentSchemeApi, InstalmentPayment } from './paymentScheme/paymentSchemeApi.service';
import { PaymentSchemeApiStubService } from '../../test/stubs/paymentSchemeApi.stub';
import { InstalmentPlanService, ContractInstalmentPlan } from './paymentScheme/instalmentPlan.service';
import { PaymentAssistancePlanInstalmentsModel } from '../pages/bills/paymentAssistance/plan/instalments';
import { Now } from '../../shared/service/now.service';
import { NowMock } from './mock/now.mock.service';
import { AccountViewModel, ContractViewModel } from '../../myAccount/services/account.service';
import { EligibilityModel } from '../../shared/model/oneMinMove/eligibility.model';
import { BillSmoothingApiSchemeModel, ContractApiModel } from '../../shared/service/api.service';
import { PrintDocMappings, RedLineApiService } from '../../shared/service/redLineApi.service';

describe('Accounts Service', () => {

    let subject: IAccountServiceMA = null;
    let apiService: ApiService;
    let redlineService: IRedLineApiService;
    let paygAccountService: PaygAccountService;
    let logger: LoggerInterface;
    let dataLayerService: DataLayerService;
    let featureFlagService: FeatureFlagService;
    let paymentMethodService: PaymentMethodsService;
    let productAttributesService: ProductAttributesService;
    let instalmentPlanService: InstalmentPlanService;
    let featureFlagMockService: FeatureFlagMockService = new FeatureFlagMockService();

    // Spies
    let getBillSmoothingContractsSpy: jasmine.Spy;
    let getPaymentSpy: jasmine.Spy;
    let getInstalmentPlanSpy: jasmine.Spy;

    // Setup TestBed
    beforeEach(() => {
        const paymentSchemeApiService = new Mock<IPaymentSchemeApi>();
        getInstalmentPlanSpy = paymentSchemeApiService
            .setup((s) => s.getPaymentArrangementInstalmentPlans)
            .is(() => Observable.of(new Array<PaymentArrangementInstalmentPlans>())).Spy;

        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                { provide: Now, useValue: new NowMock('') },
                { provide: ApiService, useClass: ApiStubService, },
                { provide: PaygAccountService, useClass: PaygAccountMockService },
                { provide: RedLineApiService, useClass: RedLineApiStubService },
                { provide: LoggerInterface, useValue: LoggerInterface },
                { provide: DataLayerService, useClass: DataLayerStubService },
                { provide: FeatureFlagService, useValue: featureFlagMockService },
                { provide: PaymentMethodsService, useClass: PaymentStubService },
                { provide: ProductAttributesService, useClass: ProductAttributesStubService },
                { provide: InstalmentPlanService, useClass: InstalmentPlanService },
                { provide: IPaymentSchemeApi, useValue: paymentSchemeApiService.Object },
                {
                    provide: IAccountServiceMA,
                    useClass: AccountService,
                    deps: [ApiService,
                        RedLineApiService,
                        PaygAccountService,
                        LoggerInterface,
                        FeatureFlagService,
                        DataLayerService,
                        PaymentMethodsService,
                        ProductAttributesService,
                        InstalmentPlanService]
                }
            ]
        });
    });

    // Configure injections
    beforeEach(
        inject([
            IAccountServiceMA,
            ApiService,
            RedLineApiService,
            PaygAccountService,
            LoggerInterface,
            DataLayerService,
            PaymentMethodsService,
            ProductAttributesService,
            InstalmentPlanService
        ], (_accountService: IAccountServiceMA,
            _apiService: ApiService,
            _redlineService: RedLineApiService,
            _paygAccountService: PaygAccountService,
            _logger: LoggerInterface,
            _dataLayerService: DataLayerService,
            _paymentMethodService: PaymentMethodsService,
            _productAttributesService: ProductAttributesService
        ) => {
                subject = _accountService;
                apiService = _apiService;
                redlineService = _redlineService;
                paygAccountService = _paygAccountService;
                logger = _logger;
                dataLayerService = _dataLayerService;
                paymentMethodService = _paymentMethodService;
                productAttributesService = _productAttributesService;

                let mockPayments: PaymentApiModel[] = [];
                let mockPendingPayments: PendingPaymentApiModel[] = [];
                let mockEligibilityResult: EligibilityModel[] = [];
                let mockBillSmoothingApiModel: BillSmoothingApiModel = null;
                let mockDashboard: ContractDetailApiModel[] = [];
                let mockPaymentMethods: PaymentMethod[] = [];

                getPaymentSpy = spyOn(apiService, 'getPayments');
                getPaymentSpy.and.returnValue(Observable.of(mockPayments));
                spyOn(apiService, 'getPendingPayments').and.returnValue(Observable.of(mockPendingPayments));
                featureFlagMockService.setFeatureFlags([]);

                getBillSmoothingContractsSpy = spyOn(apiService, 'getBillSmoothingContracts');
                getBillSmoothingContractsSpy.and.returnValue(Observable.of(mockBillSmoothingApiModel));
            }));

    describe(`Tests for getAllActiveContracts`, () => {

        beforeEach(() => {
            spyOn(apiService, 'getDashboard').and.returnValue(Observable.of([]));
            spyOn(apiService, 'getBills').and.returnValue(Observable.of([]));
            spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
            spyOn(productAttributesService, 'processContractProductAttributes');
        });

        it(`Should return 2 contracts for a customer with 1 account, 2 contracts`, async(() => {

            let mockAccounts: AccountApiModel[] = [
                {
                    number: '7013136192',
                    firstName: 'Doug',
                    lastName: 'Hansen',
                    contracts: [
                        {
                            address: 'Unit|U4/6 Butler Street|NORTHCOTE VIC 3070',
                            accountNumber: '7013136192',
                            fuelType: 'Electricity',
                            nameId: 'AGL_E413049401DC19F1A8F80000C99D68E2',
                            number: '9400106800',
                            planName: 'Savers',
                            inFlight: false,
                            isRestricted: false,
                            hasElectricVehicle: false,
                            hasSolar: false,
                            solarCheckRegistered: false,
                            productId: '',
                            regionId: ''
                        },
                        {
                            address: 'U 4/6 Butler Street|NORTHCOTE VIC 3070',
                            accountNumber: '7013136192',
                            fuelType: 'Gas',
                            nameId: 'AGL_E413049401DC19F1A8F80000C99D68E2',
                            number: '9400115422',
                            planName: 'Savers',
                            inFlight: false,
                            isRestricted: false,
                            hasElectricVehicle: false,
                            hasSolar: false,
                            solarCheckRegistered: false,
                            productId: '',
                            regionId: ''
                        }
                    ]
                }
            ];

            spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

            subject.getAllActiveContracts()
                .subscribe(
                    (result: string[]) => {
                        expect(result).toEqual(
                            [
                                '9400106800',
                                '9400115422'
                            ]);
                    },
                    (error) => {
                        fail(error);
                    }
                );

        }));

        it(`Should return 2 contracts for a customer with 1 account, 2 contracts and 1 contract is restricted`, async(() => {

            let mockAccounts: AccountApiModel[] = [
                {
                    number: '7013136192',
                    firstName: 'Doug',
                    lastName: 'Hansen',
                    contracts: [
                        {
                            address: 'Unit|U4/6 Butler Street|NORTHCOTE VIC 3070',
                            accountNumber: '7013136192',
                            fuelType: 'Electricity',
                            nameId: 'AGL_E413049401DC19F1A8F80000C99D68E2',
                            number: '9400106800',
                            planName: 'Savers',
                            inFlight: false,
                            isRestricted: true,
                            hasElectricVehicle: false,
                            hasSolar: false,
                            solarCheckRegistered: false,
                            productId: '',
                            regionId: ''
                        },
                        {
                            address: 'U 4/6 Butler Street|NORTHCOTE VIC 3070',
                            accountNumber: '7013136192',
                            fuelType: 'Gas',
                            nameId: 'AGL_E413049401DC19F1A8F80000C99D68E2',
                            number: '9400115422',
                            planName: 'Savers',
                            inFlight: false,
                            isRestricted: false,
                            hasElectricVehicle: false,
                            hasSolar: false,
                            solarCheckRegistered: false,
                            productId: '',
                            regionId: ''
                        }
                    ]
                }
            ];

            spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

            subject.getAllActiveContracts()
                .subscribe(
                    (result: string[]) => {
                        expect(result).toEqual(
                            [
                                '9400115422'
                            ]);
                    },
                    (error) => {
                        fail(error);
                    }
                );

        }));

        it(`Should return 6 contracts for a customer with 3 accounts, each with 2 contracts`, async(() => {

            let mockAccounts: AccountApiModel[] = [
                {
                    number: '7018263504',
                    firstName: 'Iain',
                    lastName: 'Sanders',
                    contracts: [
                        {
                            address: '10 CREST DRIVE|ROSEBUD VIC 3939',
                            accountNumber: '7018263504',
                            fuelType: 'Gas',
                            nameId: 'AGL_0000C99D7ADE1EE492A42E1ADEF8A5A8',
                            number: '9400902585',
                            planName: 'Savers',
                            inFlight: false,
                            isRestricted: false,
                            hasElectricVehicle: false,
                            hasSolar: true,
                            solarCheckRegistered: false,
                            productId: '',
                            regionId: ''
                        },
                        {
                            address: '10 CREST DRIVE|ROSEBUD VIC 3939',
                            accountNumber: '7018263504',
                            fuelType: 'Electricity',
                            nameId: 'AGL_0000C99D7ADE1EE492A42E1ADEF8A5A8',
                            number: '9400921596',
                            planName: 'Savers',
                            inFlight: false,
                            isRestricted: false,
                            hasElectricVehicle: false,
                            hasSolar: false,
                            solarCheckRegistered: false,
                            productId: '',
                            regionId: ''
                        }
                    ]
                },
                {
                    number: '7014235472',
                    firstName: 'Iain',
                    lastName: 'Sanders',
                    contracts: [
                        {
                            address: '6 HOTHAM STREET|MOONEE PONDS VIC 3039',
                            accountNumber: '7014235472',
                            fuelType: 'Electricity',
                            nameId: 'AGL_0000C99D7ADE1EE492A42E1ADEF8A5A8',
                            number: '9401005102',
                            planName: 'Employee Freedom',
                            inFlight: false,
                            isRestricted: false,
                            hasSolar: false,
                            hasElectricVehicle: false,
                            solarCheckRegistered: false,
                            productId: '',
                            regionId: ''
                        },
                        {
                            address: '6 HOTHAM STREET|MOONEE PONDS VIC 3039',
                            accountNumber: '7014235472',
                            fuelType: 'Gas',
                            nameId: 'AGL_0000C99D7ADE1EE492A42E1ADEF8A5A8',
                            number: '9401005103',
                            planName: 'Employee Freedom',
                            inFlight: false,
                            isRestricted: false,
                            hasSolar: false,
                            hasElectricVehicle: false,
                            solarCheckRegistered: false,
                            productId: '',
                            regionId: ''
                        }
                    ]
                },
                {
                    number: '7035252860',
                    firstName: 'Iain',
                    lastName: 'Sanders',
                    contracts: [
                        {
                            address: 'U15/117 ALBION STREET|BRUNSWICK VIC 3056',
                            accountNumber: '7035252860',
                            fuelType: 'Electricity',
                            nameId: 'AGL_0000C99D7ADE1EE492A42E1ADEF8A5A8',
                            number: '9402766055',
                            planName: 'Employee Freedom',
                            inFlight: false,
                            isRestricted: false,
                            hasSolar: false,
                            hasElectricVehicle: false,
                            solarCheckRegistered: false,
                            productId: '',
                            regionId: ''
                        },
                        {
                            address: 'U15/117 ALBION STREET|BRUNSWICK VIC 3056',
                            accountNumber: '7035252860',
                            fuelType: 'Gas',
                            nameId: 'AGL_0000C99D7ADE1EE492A42E1ADEF8A5A8',
                            number: '9402766056',
                            planName: 'Employee Freedom',
                            inFlight: false,
                            isRestricted: false,
                            hasSolar: false,
                            hasElectricVehicle: false,
                            solarCheckRegistered: false,
                            productId: '',
                            regionId: ''
                        }
                    ]
                }
            ];

            spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

            subject.getAllActiveContracts()
                .subscribe(
                    (result: string[]) => {
                        expect(result).toEqual(
                            [
                                '9400921596',
                                '9400902585',
                                '9401005102',
                                '9401005103',
                                '9402766055',
                                '9402766056'
                            ]);
                    },
                    (error) => {
                        fail(error);
                    }
                );

        }));

    });

    describe('hasContractPayOnTimeDiscount', () => {

        describe('account with a contract with a pay on time discount', () => {

            it('should return that the pay on time discount is true', () => {

                // ARRANGE
                const mockContract = new ContractViewModel('1111');
                mockContract.hasPayOnTimeDiscount  = true;
                const mockAccounts = [
                    {
                        accountNumber: '',
                        groupedAddress: '',
                        allContractsAreNewConnection: false,
                        allContractsAreRestricted: false,
                        firstName: '',
                        lastName: '',
                        hasContractInWA: false,
                        contracts: [
                            mockContract
                        ]
                    }
                ];

                expect(subject.hasContractPayOnTimeDiscount(mockAccounts)).toBeTruthy();

            });

        });

        describe('account with a no contracts with a pay on time discount', () => {

            it('should return that the pay on time discount is false', () => {

                // ARRANGE
                const mockContract = new ContractViewModel('1111');
                const mockAccounts = [
                    {
                        accountNumber: '',
                        groupedAddress: '',
                        allContractsAreNewConnection: false,
                        allContractsAreRestricted: false,
                        firstName: '',
                        lastName: '',
                        hasContractInWA: false,
                        contracts: [
                            mockContract
                        ]
                    }
                ];

                expect(subject.hasContractPayOnTimeDiscount(mockAccounts)).toBeFalsy();

            });

        });

    });

    function returnMockAccounts(isFirstAccountRestricted: boolean, isSecondAccountRestricted: boolean) {
        let mockData: AccountApiModel[] = [
            {
                number: '7013136192',
                firstName: 'Doug',
                lastName: 'Hansen',
                contracts: [
                    {
                        address: 'Unit|U4/6 Butler Street|NORTHCOTE VIC 3070',
                        accountNumber: '7013136192',
                        fuelType: 'Electricity',
                        nameId: 'AGL_E413049401DC19F1A8F80000C99D68E2',
                        number: '9400106800',
                        planName: 'Savers',
                        inFlight: false,
                        isRestricted: isFirstAccountRestricted,
                        hasElectricVehicle: false,
                        hasSolar: false,
                        solarCheckRegistered: false,
                        productId: '',
                        regionId: ''
                    },
                    {
                        address: 'U 4/6 Butler Street|NORTHCOTE VIC 3070',
                        accountNumber: '7013136192',
                        fuelType: 'Gas',
                        nameId: 'AGL_E413049401DC19F1A8F80000C99D68E2',
                        number: '9400115422',
                        planName: 'Savers',
                        inFlight: false,
                        isRestricted: isSecondAccountRestricted,
                        hasElectricVehicle: false,
                        hasSolar: false,
                        solarCheckRegistered: false,
                        productId: '',
                        regionId: ''
                    }
                ]
            }
        ];
        return {
            mockData
        };
    }

    describe(`Tests for Restricted Contracts`, () => {

        beforeEach(() => {
            spyOn(apiService, 'getDashboard').and.returnValue(Observable.of([]));
            spyOn(apiService, 'getBills').and.returnValue(Observable.of([]));
            spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
            spyOn(productAttributesService, 'processContractProductAttributes');
        });

        it(`should return TRUE from areAllAccountContractsRestricted`, async(() => {

            spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(returnMockAccounts(true, true).mockData));

            subject.areAllAccountContractsRestricted()
                .subscribe(
                    (result: boolean) => {
                        expect(result).toBe(true);
                    },
                    (error) => {
                        fail(error);
                    }
                );
        }));

        it(`should return FALSE from areAllAccountContractsRestricted`, async(() => {

            spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(returnMockAccounts(false, false).mockData));

            subject.areAllAccountContractsRestricted()
                .subscribe(
                    (result: boolean) => {
                        expect(result).toBe(false);
                    },
                    (error) => {
                        fail(error);
                    }
                );
        }));
        it(`should return FALSE from the areAllAccountContractsRestricted when 1 contract's isRestricted property set to true and another set to false`, async(() => {

            spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(returnMockAccounts(true, false).mockData));

            subject.areAllAccountContractsRestricted()
                .subscribe(
                    (result: boolean) => {
                        expect(result).toBe(false);
                    },
                    (error) => {
                        fail(error);
                    }
                );
        }));
    });

    describe(`Tests for hasAnyContractInRegionId`, () => {

        beforeEach(() => {
            spyOn(apiService, 'getDashboard').and.returnValue(Observable.of([]));
            spyOn(apiService, 'getBills').and.returnValue(Observable.of([]));
            spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
            spyOn(productAttributesService, 'processContractProductAttributes');
        });

        it(`should return TRUE when both contracts in the requested region`, (done: DoneFn) => {
            let mockAccounts = returnMockAccounts(false, true).mockData;
            mockAccounts[0].contracts[0].regionId = 'Sa';
            mockAccounts[0].contracts[1].regionId = 'SA';

            spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

            subject.hasAnyContractInRegionId('sa')
                .subscribe((result: boolean) => {
                    expect(result).toBe(true);
                    done();
                });
        });

        it(`should return FALSE when neither contract is in the requested region`, (done: DoneFn) => {
            let mockAccounts = returnMockAccounts(false, true).mockData;
            mockAccounts[0].contracts[0].regionId = 'VIC';
            mockAccounts[0].contracts[1].regionId = 'NSW';

            spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

            subject.hasAnyContractInRegionId('sa')
                .subscribe((result: boolean) => {
                    expect(result).toBe(false);
                    done();
                });
        });

        it(`should return TRUE when 1 out of 2 contract's are in the requested region`, (done: DoneFn) => {
            let mockAccounts = returnMockAccounts(false, true).mockData;
            mockAccounts[0].contracts[0].regionId = 'VIC';
            mockAccounts[0].contracts[1].regionId = 'SA';

            spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));

            subject.hasAnyContractInRegionId('sa')
                .subscribe((result: boolean) => {
                    expect(result).toBe(true);
                    done();
                });
        });
    });

    describe('isExcludedFromBillSmoothing tests', () => {

        it('should return true when one of the account has contract in WA', () => {
            let accounts: AccountViewModel[] = [
                new AccountViewModel('111'),
                new AccountViewModel('222'),
                new AccountViewModel('333'),
            ];
            accounts[0].hasContractInWA = false;
            accounts[1].hasContractInWA = true;
            accounts[2].hasContractInWA = false;

            let hasContractInWA = subject.isExcludedFromBillSmoothing(accounts);

            expect(hasContractInWA).toBeTruthy();
        });

        it('should return true when all of the account has contract in WA', () => {
            let accounts: AccountViewModel[] = [
                new AccountViewModel('111'),
                new AccountViewModel('222'),
                new AccountViewModel('333'),
            ];
            accounts[0].hasContractInWA = true;
            accounts[1].hasContractInWA = true;
            accounts[2].hasContractInWA = true;

            let hasContractInWA = subject.isExcludedFromBillSmoothing(accounts);

            expect(hasContractInWA).toBeTruthy();
        });

        it('should return false when none of the account has contract in WA', () => {
            let accounts: AccountViewModel[] = [
                new AccountViewModel('111'),
                new AccountViewModel('222'),
                new AccountViewModel('333'),
            ];
            accounts[0].hasContractInWA = false;
            accounts[1].hasContractInWA = false;
            accounts[2].hasContractInWA = false;

            let hasContractInWA = subject.isExcludedFromBillSmoothing(accounts);

            expect(hasContractInWA).toBeFalsy();
        });
    });

    describe('getName tests', () => {

        it('should return AccountViewModel with firstName and lastName "My Profile" when they are not set', async(() => {
            let accounts = [
                new AccountViewModel('123')
            ];

            spyOn(subject, 'getAccounts').and.returnValue(Observable.of(accounts));

            let accountOwnerModels = subject.getName();

            accountOwnerModels.subscribe((accountOwnerModel) => {
                expect(accountOwnerModel.firstName).toBe('My Profile');
                expect(accountOwnerModel.lastName).toBe('My Profile');
            });
        }));

        it('should return AccountViewModel with firstName and lastName when they are set', async(() => {
            let accounts = [
                new AccountViewModel('123')
            ];
            accounts[0].firstName = 'John';
            accounts[0].lastName = 'Cena';

            spyOn(subject, 'getAccounts').and.returnValue(Observable.of(accounts));

            let accountOwnerModels = subject.getName();

            accountOwnerModels.subscribe((accountOwnerModel) => {
                expect(accountOwnerModel.firstName).toBe('John');
                expect(accountOwnerModel.lastName).toBe('Cena');
            });
        }));

        it('should return undefined when there is no account', async(() => {
            let accounts = [];

            spyOn(subject, 'getAccounts').and.returnValue(Observable.of(accounts));

            let accountOwnerModels = subject.getName();

            accountOwnerModels.subscribe((accountOwnerModel) => {
                expect(accountOwnerModel).toBeUndefined();
            });
        }));
    });

    describe('formatAddress tests', () => {
        it('should format correctly when address has 3 char state', () => {
            let unformattedAddress = '1   swaNSton st | mELbourne vic 3000';

            let formattedAddress = subject.formatAddress(unformattedAddress);

            expect(formattedAddress).toBe('1 Swanston St , Melbourne VIC 3000');
        });

        it('should format correctly when address has 2 char state', () => {
            let unformattedAddress = '137 Farnley Way, Duncraig wa 6023';

            let formattedAddress = subject.formatAddress(unformattedAddress);

            expect(formattedAddress).toBe('137 Farnley Way, Duncraig WA 6023');
        });

        it('should format correctly when address has no state', () => {
            let unformattedAddress = '137 Farnley Way, Duncraigwa 6023';

            let formattedAddress = subject.formatAddress(unformattedAddress);

            expect(formattedAddress).toBe('137 Farnley Way, Duncraigwa 6023');
        });
    });

    describe('getAccounts tests', () => {
        beforeEach(() => {
            spyOn(apiService, 'getDashboard').and.returnValue(Observable.of([]));
            spyOn(paygAccountService, 'getPaygDetails').and.returnValue(Observable.of({}));
        });

        describe('with bill smoothing feature flag OFF', () => {

            beforeEach(() => {
                spyOn(apiService, 'getBills').and.returnValue(Observable.of([]));
                spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
                spyOn(productAttributesService, 'processContractProductAttributes');
            });

            it('should return account with elec contract first', async(() => {
                let accounts = [
                    createAccountApiModel('111', [
                        createContractApiModel('111', '111777', false, 'Gas'),
                        createContractApiModel('111', '111888', false, 'Electricity')
                    ]),
                    createAccountApiModel('222', [
                        createContractApiModel('222', '222777', false, 'Electricity'),
                        createContractApiModel('222', '222888', false, 'Gas')
                    ])
                ];

                spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(accounts));

                let accountViewModelsObservable = subject.getAccounts();

                expect(getBillSmoothingContractsSpy).not.toHaveBeenCalled();

                accountViewModelsObservable.subscribe((accountViewModels) => {
                    expect(accountViewModels[0].accountNumber).toBe('111');
                    expect(accountViewModels[1].accountNumber).toBe('222');

                    expect(accountViewModels[0].contracts[0].contractNumber).toBe('111888');
                    expect(accountViewModels[0].contracts[1].contractNumber).toBe('111777');
                    expect(accountViewModels[1].contracts[0].contractNumber).toBe('222777');
                    expect(accountViewModels[1].contracts[1].contractNumber).toBe('222888');
                });
            }));

            it('should return account with active contract first', async(() => {
                let accounts = [
                    createAccountApiModel('111', [
                        createContractApiModel('111', '111888', true, 'Electricity'),
                        createContractApiModel('111', '111777', false, 'Gas')
                    ]),
                    createAccountApiModel('222', [
                        createContractApiModel('222', '222777', false, 'Electricity'),
                        createContractApiModel('222', '222888', true, 'Gas')
                    ])
                ];

                spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(accounts));

                let accountViewModelsObservable = subject.getAccounts();

                expect(getBillSmoothingContractsSpy).not.toHaveBeenCalled();

                accountViewModelsObservable.subscribe((accountViewModels) => {
                    expect(accountViewModels[0].accountNumber).toBe('111');
                    expect(accountViewModels[1].accountNumber).toBe('222');

                    expect(accountViewModels[0].contracts[0].contractNumber).toBe('111777');
                    expect(accountViewModels[0].contracts[1].contractNumber).toBe('111888');
                    expect(accountViewModels[1].contracts[0].contractNumber).toBe('222777');
                    expect(accountViewModels[1].contracts[1].contractNumber).toBe('222888');
                });
            }));

            it('should return active account first', async(() => {
                let accounts = [
                    createAccountApiModel('111', [
                        createContractApiModel('111', '111777', true, 'Gas'),
                        createContractApiModel('111', '111888', true, 'Electricity')
                    ]),
                    createAccountApiModel('222', [
                        createContractApiModel('222', '222777', false, 'Electricity'),
                        createContractApiModel('222', '222888', false, 'Gas')
                    ])
                ];

                spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(accounts));

                let accountViewModelsObservable = subject.getAccounts();

                expect(getBillSmoothingContractsSpy).not.toHaveBeenCalled();

                accountViewModelsObservable.subscribe((accountViewModels) => {
                    expect(accountViewModels[0].accountNumber).toBe('222');
                    expect(accountViewModels[1].accountNumber).toBe('111');
                });
            }));

            it('should return extended due date', async(() => {
                const accountNumber = '111';
                const contractNumber = '111777';
                const extendedDueDate = '31/12/2017';
                let accounts = [
                    createAccountApiModel(accountNumber, [
                        createContractApiModel(accountNumber, contractNumber, true, 'Gas'),
                    ]),
                ];
                const payments = [{
                    account: accountNumber,
                    contract: contractNumber,
                    overdue: 20,
                    currentBalance: 150,
                    totalPayment: 0,
                    extendedDueDate: extendedDueDate,
                    billSmoothing: true,
                    directDebit: true
                }];

                getPaymentSpy.and.returnValue(Observable.of(payments));

                spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(accounts));

                let accountViewModelsObservable = subject.getAccounts();

                accountViewModelsObservable.subscribe((accountViewModels) => {
                    const extendedDate = accountViewModels[0].contracts[0].extendedDueDate;
                    expect(extendedDate.getDate()).toBe(31);
                    expect(extendedDate.getMonth()).toBe(11);
                    expect(extendedDate.getFullYear()).toBe(2017);
                });
            }));
        });

        describe('with bill smoothing feature flag ON', () => {

            beforeEach(() => {
                featureFlagMockService.setFeatureFlags([FeatureFlagTypes.billSmoothingEnabled]);

                getBillSmoothingContractsSpy.and.callFake((accountNumber) => {
                    if (accountNumber === '111') {
                        return Observable.of(createBillSmoothingAccount(111,
                            [
                                createBillSmoothingApiSchemeModel(111777),
                                createBillSmoothingApiSchemeModel(111888)
                            ]
                        )).delay(300);
                    } else if (accountNumber === '222') {
                        return Observable.of(createBillSmoothingAccount(222, [])).delay(100);
                    }
                });

                spyOn(apiService, 'getBills').and.returnValue(Observable.of([]));
                spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
                spyOn(productAttributesService, 'processContractProductAttributes');
            });

            it('should return account with elec contract first', async(() => {
                let accounts = [
                    createAccountApiModel('111', [
                        createContractApiModel('111', '111777', false, 'Gas'),
                        createContractApiModel('111', '111888', false, 'Electricity')
                    ]),
                    createAccountApiModel('222', [
                        createContractApiModel('222', '222777', false, 'Electricity'),
                        createContractApiModel('222', '222888', false, 'Gas')
                    ])
                ];

                spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(accounts));

                let accountViewModelsObservable = subject.getAccounts();

                expect(getBillSmoothingContractsSpy).toHaveBeenCalledTimes(2);

                accountViewModelsObservable.subscribe((accountViewModels) => {
                    expect(accountViewModels[0].accountNumber).toBe('111');
                    expect(accountViewModels[1].accountNumber).toBe('222');

                    expect(accountViewModels[0].contracts[0].contractNumber).toBe('111888');
                    expect(accountViewModels[0].contracts[0].isBillSmoothingV2).toBe(true);
                    expect(accountViewModels[0].contracts[1].contractNumber).toBe('111777');
                    expect(accountViewModels[0].contracts[1].isBillSmoothingV2).toBe(true);

                    expect(accountViewModels[1].contracts[0].contractNumber).toBe('222777');
                    expect(accountViewModels[1].contracts[0].isBillSmoothingV2).toBe(false);
                    expect(accountViewModels[1].contracts[1].contractNumber).toBe('222888');
                    expect(accountViewModels[1].contracts[1].isBillSmoothingV2).toBe(false);
                });
            }));

            it('should return account with active contract first', async(() => {
                let accounts = [
                    createAccountApiModel('111', [
                        createContractApiModel('111', '111888', true, 'Electricity'),
                        createContractApiModel('111', '111777', false, 'Gas')
                    ]),
                    createAccountApiModel('222', [
                        createContractApiModel('222', '222777', false, 'Electricity'),
                        createContractApiModel('222', '222888', true, 'Gas')
                    ])
                ];

                spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(accounts));

                let accountViewModelsObservable = subject.getAccounts();

                expect(getBillSmoothingContractsSpy).toHaveBeenCalledTimes(2);

                accountViewModelsObservable.subscribe((accountViewModels) => {
                    expect(accountViewModels[0].accountNumber).toBe('111');
                    expect(accountViewModels[1].accountNumber).toBe('222');

                    expect(accountViewModels[0].contracts[0].contractNumber).toBe('111777');
                    expect(accountViewModels[0].contracts[0].isBillSmoothingV2).toBe(true);
                    expect(accountViewModels[0].contracts[1].contractNumber).toBe('111888');
                    expect(accountViewModels[0].contracts[1].isBillSmoothingV2).toBe(true);

                    expect(accountViewModels[1].contracts[0].contractNumber).toBe('222777');
                    expect(accountViewModels[1].contracts[0].isBillSmoothingV2).toBe(false);
                    expect(accountViewModels[1].contracts[1].contractNumber).toBe('222888');
                    expect(accountViewModels[1].contracts[1].isBillSmoothingV2).toBe(false);
                });
            }));

            it('should return active account first', async(() => {
                let accounts = [
                    createAccountApiModel('111', [
                        createContractApiModel('111', '111777', true, 'Gas'),
                        createContractApiModel('111', '111888', true, 'Electricity')
                    ]),
                    createAccountApiModel('222', [
                        createContractApiModel('222', '222777', false, 'Electricity'),
                        createContractApiModel('222', '222888', false, 'Gas')
                    ])
                ];

                spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(accounts));

                let accountViewModelsObservable = subject.getAccounts();

                expect(getBillSmoothingContractsSpy).toHaveBeenCalledTimes(2);

                accountViewModelsObservable.subscribe((accountViewModels) => {
                    expect(accountViewModels[0].accountNumber).toBe('222');
                    expect(accountViewModels[1].accountNumber).toBe('111');
                });
            }));
        });

        describe('with payment assistance instalment feature flag ON', () => {
            const accountNumber1 = '111';
            const accountNumber2 = '222';
            const contractNumber1 = '111777';
            const contractNumber2 = '111888';
            const contractNumber3 = '222777';
            const contractNumber4 = '222888';
            const accounts = [
                createAccountApiModel(accountNumber1, [
                    createContractApiModel(accountNumber1, contractNumber1, true, 'Gas'),
                    createContractApiModel(accountNumber1, contractNumber2, true, 'Electricity')
                ]),
                createAccountApiModel(accountNumber2, [
                    createContractApiModel(accountNumber2, contractNumber3, false, 'Electricity'),
                    createContractApiModel(accountNumber2, contractNumber4, false, 'Gas')
                ])
            ];

            beforeEach(() => {
                featureFlagMockService.setFeatureFlags([FeatureFlagTypes.paymentAssistanceEnabled]);

                spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(accounts));
                spyOn(apiService, 'getBills').and.returnValue(Observable.of([]));
                spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
                spyOn(productAttributesService, 'processContractProductAttributes');
            });

            it('should return accounts with active instalment plans', (done: DoneFn) => {
                getInstalmentPlanSpy.and.callFake((accountNumber) => {
                    if (accountNumber === accountNumber1) {
                        return Observable.of([createInstalmentPlans(Number(contractNumber1))]);
                    } else {
                        return Observable.of([createEmptyInstalmentPlans(Number(contractNumber2))]);
                    }
                });

                let accountViewModelsObservable = subject.getAccounts();

                accountViewModelsObservable.subscribe((accountViewModels) => {
                    expect(accountViewModels[0].contracts[0].instalmentPlan).not.toBeDefined();
                    expect(accountViewModels[0].contracts[1].instalmentPlan).not.toBeDefined();
                    expect(accountViewModels[1].contracts[0].instalmentPlan).not.toBeDefined();
                    expect(accountViewModels[1].contracts[1].instalmentPlan).toBeDefined();
                    done();
                });
            });
        });

        describe('with payment assistance instalment feature flag OFF', () => {
            beforeEach(() => {
                spyOn(apiService, 'getBills').and.returnValue(Observable.of([]));
                spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
                spyOn(productAttributesService, 'processContractProductAttributes');
            });

            it('should return no instalment plans', (done: DoneFn) => {
                let accounts = [
                    createAccountApiModel('111', [
                        createContractApiModel('111', '111777', true, 'Gas'),
                    ])
                ];

                spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(accounts));

                let accountViewModelsObservable = subject.getAccounts();

                accountViewModelsObservable.subscribe((accountViewModels) => {
                    expect(accountViewModels[0].contracts[0].instalmentPlan).not.toBeDefined();
                    done();
                });
            });
        });

        describe('redline api tests', () => {
            beforeEach(() => {
                let accounts = [
                    createAccountApiModel('111', [
                        createContractApiModel('111', '111777', false, 'Gas'),
                        createContractApiModel('111', '111888', false, 'Electricity')
                    ]),
                    createAccountApiModel('222', [
                        createContractApiModel('222', '222777', false, 'Electricity'),
                        createContractApiModel('222', '222888', false, 'Gas')
                    ])
                ];

                let bills = [
                    createBillHistoryApiModel('111', '111777', [createBillApiModel('111777001'), createBillApiModel('111777002')]),
                    createBillHistoryApiModel('111', '111888', [createBillApiModel('111888001')]),
                    createBillHistoryApiModel('222', '222777', []),
                    createBillHistoryApiModel('222', '222777', [])
                ];

                spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(accounts));
                spyOn(apiService, 'getBills').and.returnValue(Observable.of(bills));
                spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
                spyOn(productAttributesService, 'processContractProductAttributes');
            });

            it('should assign the correct FxPrintDoc to contract bills', async(() => {
                let redLineServiceSpy = spyOn(redlineService, 'getBillsForContract').and.callFake((contractNumber) => {
                    if (contractNumber === '111777') {
                        return Observable.of(<PrintDocMappings[]> [
                            { SapPrintDoc: '111777001', FxPrintDoc: '111777010' },
                            { SapPrintDoc: '111777002', FxPrintDoc: '111777020' }
                        ]);
                    } else if (contractNumber === '111888') {
                        return Observable.of(<PrintDocMappings[]> [
                            { SapPrintDoc: '111888001', FxPrintDoc: '111888010' }
                        ]);
                    }
                });

                let accountViewModelsObservable = subject.getAccounts();

                expect(redLineServiceSpy).toHaveBeenCalledTimes(2);

                accountViewModelsObservable.subscribe((accountViewModels) => {
                    expect(accountViewModels[0].contracts[0].contractNumber).toBe('111888');
                    expect(accountViewModels[0].contracts[1].contractNumber).toBe('111777');

                    expect(accountViewModels[1].contracts[0].contractNumber).toBe('222777');
                    expect(accountViewModels[1].contracts[1].contractNumber).toBe('222888');

                    expect(accountViewModels[0].contracts[0].bills[0].fxPrintDoc).toBe('111888010');
                    expect(accountViewModels[0].contracts[1].bills[0].fxPrintDoc).toBe('111777010');
                    expect(accountViewModels[0].contracts[1].bills[1].fxPrintDoc).toBe('111777020');
                });
            }));
        });
    });

    describe('getBillSmoothingContracts API', () => {
        beforeEach(() => {
            featureFlagMockService.setFeatureFlags([FeatureFlagTypes.billSmoothingEnabled]);

            let mockDashboard: any[] = [
                {
                    account: '7019079511',
                    contract: '9400307029',
                }
            ];

            let mockAccounts: AccountApiModel[] = [
                createAccountApiModel('7019079511', [
                    createContractApiModel('7019079511', '9400307029', false, 'Electricity'),
                    createContractApiModel('7019079511', '9400717466', false, 'Gas')
                ])
            ];

            spyOn(apiService, 'getDashboard').and.returnValue(Observable.of(mockDashboard));
            spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
            spyOn(apiService, 'getBills').and.returnValue(Observable.of([]));
            spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
            spyOn(productAttributesService, 'processContractProductAttributes');
        });

        it(`should assign payment schemes to correct contract of the account`, async(() => {
            expect(subject).toBeTruthy(`The Accounts service is missing`);
            expect(apiService).toBeTruthy(`The API Service dependency is missing`);
            expect(redlineService).toBeTruthy(`The Redline Service dependency is missing`);
            expect(paygAccountService).toBeTruthy(`The PAYG Account Service dependency is missing`);
            expect(dataLayerService).toBeTruthy(`The Data Layer Service dependency is missing`);

            let mockBillSmoothingApiModel: BillSmoothingApiModel = createBillSmoothingAccount(7019079511, [createBillSmoothingApiSchemeModel(9400717466)]);

            getBillSmoothingContractsSpy.and.returnValue(Observable.of(mockBillSmoothingApiModel));

            subject.getAccounts().subscribe(
                (result) => {
                    expect(result).toBeTruthy();
                    expect(result.length).toBe(1);
                    expect(result[0].accountNumber).toBe('7019079511');
                    expect(result[0].contracts[1].paymentScheme.contractNumber).toBe(9400717466);
                    expect(apiService.getBillSmoothingContracts).toHaveBeenCalled();

                },
                (error) => {
                    fail();
                }
            );

        }));

    });

    it(`should return 1 account, 1 contract for a customer that has 1 account, 1 contract`, async(() => {

        expect(subject).toBeTruthy(`The Accounts service is missing`);
        expect(apiService).toBeTruthy(`The API Service dependency is missing`);
        expect(redlineService).toBeTruthy(`The Redline Service dependency is missing`);
        expect(paygAccountService).toBeTruthy(`The PAYG Account Service dependency is missing`);
        expect(dataLayerService).toBeTruthy(`The Data Layer Service dependency is missing`);

        let mockDashboard: ContractDetailApiModel[] = [
            {
                account: '7019079511',
                contract: '9400307029',
                currentBillStartDate: new Date('2017-03-15T00:00:00'),
                currentBillEndDate: new Date('2017-04-15T00:00:00'),
                costToDate: 34.09,
                projectedBill: 81.47,
                usageCostThisWeek: 14.057138,
                usageCostLastWeek: 12.799916,
                usageThisWeek: '64.667',
                usageLastWeek: '61.655',
                balance: 0,
                dueDate: new Date('0001-01-01T00:00:00'),
                isSmartMeter: true,
                estimatedReads: false
            }
        ];

        let mockAccounts: AccountApiModel[] = [
            {
                number: '7019079511',
                firstName: 'Lauren',
                lastName: 'Ferguson',
                contracts: [
                    {
                        address: 'U C105/460 Victoria Street|BRUNSWICK VIC 3056',
                        accountNumber: '7019079511',
                        fuelType: 'Electricity',
                        nameId: 'AGL_0000C99DF8261ED582B680F41CDC4EDF',
                        number: '9400307029',
                        planName: 'Set and Forget',
                        inFlight: false,
                        isRestricted: false,
                        hasElectricVehicle: false,
                        hasSolar: false,
                        solarCheckRegistered: false,
                        productId: '',
                        regionId: ''
                    }
                ]
            }
        ];

        spyOn(apiService, 'getDashboard').and.returnValue(Observable.of(mockDashboard));
        spyOn(apiService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
        spyOn(apiService, 'getBills').and.returnValue(Observable.of([]));
        spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
        spyOn(productAttributesService, 'processContractProductAttributes');

        subject.getAccounts().subscribe(
            (result) => {
                expect(result).toBeTruthy();
                expect(result.length).toBe(1);
                expect(result[0].accountNumber).toBe('7019079511');
                expect(result[0].allContractsAreRestricted).toBe(false);
                expect(result[0].allContractsAreNewConnection).toBe(false);
                expect(result[0].groupedAddress).toBeUndefined();
                expect(result[0].contracts).toBeTruthy();
                expect(result[0].contracts.length).toBe(1);
                expect(result[0].contracts[0]).toBeTruthy();
                expect(result[0].contracts[0].accountNumber).toBe('7019079511');
                expect(result[0].contracts[0].address).toBe('U C105/460 Victoria Street, Brunswick VIC 3056');
                expect(result[0].contracts[0].addressRaw).toBe('U C105/460 Victoria Street|BRUNSWICK VIC 3056');
                expect(result[0].contracts[0].hasBillHistory).toBe(false);
                expect(result[0].contracts[0].hasElectricVehicle).toBe(false, `hasElectricVehicle`);
                expect(result[0].contracts[0].isElectricity).toBe(true, `isElectricity`);
                expect(result[0].contracts[0].isGas).toBe(false, `isGas`);
                expect(result[0].contracts[0].isSolar).toBe(false, `isSolar`);
            },
            (error) => {
                fail();
            }
        );

    }));

    it(`should format the address of a customer with 2 contracts at the same physical address, but with mis-matching addresses`, (done) => {

        // Check all dependencies are OK
        let depApiService: ApiService = TestBed.get(ApiService, null);
        let depRedlineService: RedLineApiService = TestBed.get(RedLineApiService, null);
        let depPaygAccountService: PaygAccountService = TestBed.get(PaygAccountService, null);

        expect(subject).toBeTruthy(`The Accounts service is missing`);
        expect(depApiService).toBeTruthy(`The API Service dependency is missing`);
        expect(depRedlineService).toBeTruthy(`The Redline Service dependency is missing`);
        expect(depPaygAccountService).toBeTruthy(`The PAYG Account Service dependency is missing`);
        expect(dataLayerService).toBeTruthy(`The Data Layer Service dependency is missing`);

        let mockDashboard: ContractDetailApiModel[] = [
            {
                account: '7013136192',
                contract: '9400106800',
                currentBillStartDate: new Date('2017-01-04T00:00:00'),
                currentBillEndDate: new Date('2017-02-04T00:00:00'),
                costToDate: 63.60,
                projectedBill: 120.16,
                usageCostThisWeek: 9.322548,
                usageCostLastWeek: 12.194106,
                usageThisWeek: '40.253',
                usageLastWeek: '52.654',
                balance: 0.0,
                dueDate: new Date('0001-01-01T00:00:00'),
                isSmartMeter: true,
                estimatedReads: false
            },
            {
                account: '7013136192',
                contract: '9400115422',
                currentBillStartDate: new Date('0001-01-01T00:00:00'),
                currentBillEndDate: new Date('2017-02-04T00:00:00'),
                costToDate: 0.0,
                projectedBill: 0.0,
                usageCostThisWeek: 7.949808,
                usageCostLastWeek: 7.192080,
                usageThisWeek: '382.34361128050656',
                usageLastWeek: '331.59129137576064',
                balance: 0.0,
                dueDate: new Date('0001-01-01T00:00:00'),
                isSmartMeter: false,
                estimatedReads: false
            }
        ];

        let mockAccounts: AccountApiModel[] = [
            {
                number: '7013136192',
                firstName: 'Doug',
                lastName: 'Hansen',
                contracts: [
                    {
                        address: 'Unit|U4/6 Butler Street|NORTHCOTE VIC 3070',
                        accountNumber: '7013136192',
                        fuelType: 'Electricity',
                        nameId: 'AGL_E413049401DC19F1A8F80000C99D68E2',
                        number: '9400106800',
                        planName: 'Savers',
                        inFlight: false,
                        isRestricted: false,
                        hasElectricVehicle: false,
                        hasSolar: false,
                        solarCheckRegistered: false,
                        productId: '',
                        regionId: ''
                    },
                    {
                        address: 'U 4/6 Butler Street|NORTHCOTE VIC 3070',
                        accountNumber: '7013136192',
                        fuelType: 'Gas',
                        nameId: 'AGL_E413049401DC19F1A8F80000C99D68E2',
                        number: '9400115422',
                        planName: 'Savers',
                        inFlight: false,
                        isRestricted: false,
                        hasElectricVehicle: false,
                        hasSolar: false,
                        solarCheckRegistered: false,
                        productId: '',
                        regionId: ''
                    }
                ]
            }
        ];

        spyOn(depApiService, 'getDashboard').and.returnValue(Observable.of(mockDashboard));
        spyOn(depApiService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
        spyOn(apiService, 'getBills').and.returnValue(Observable.of([]));
        spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
        spyOn(productAttributesService, 'processContractProductAttributes');

        subject.getAccounts().subscribe(
            (result) => {
                expect(result).toBeTruthy();
                expect(result.length).toBe(1);
                expect(result[0].accountNumber).toBe('7013136192');
                expect(result[0].allContractsAreRestricted).toBe(false);
                expect(result[0].allContractsAreNewConnection).toBe(false);
                expect(result[0].groupedAddress).toBeUndefined();
                expect(result[0].contracts).toBeTruthy();
                expect(result[0].contracts.length).toBe(2);

                expect(result[0].contracts[0]).toBeTruthy();
                expect(result[0].contracts[0].accountNumber).toBe('7013136192');
                expect(result[0].contracts[0].address).toBe('Unit, U4/6 Butler Street, Northcote VIC 3070');
                expect(result[0].contracts[0].addressRaw).toBe('Unit|U4/6 Butler Street|NORTHCOTE VIC 3070');
                expect(result[0].contracts[0].hasBillHistory).toBe(false);
                expect(result[0].contracts[0].hasElectricVehicle).toBe(false, `hasElectricVehicle`);
                expect(result[0].contracts[0].isElectricity).toBe(true, `isElectricity`);
                expect(result[0].contracts[0].isGas).toBe(false, `isGas`);
                expect(result[0].contracts[0].isSolar).toBe(false, `isSolar`);

                expect(result[0].contracts[1]).toBeTruthy();
                expect(result[0].contracts[1].accountNumber).toBe('7013136192');
                expect(result[0].contracts[1].address).toBe('U 4/6 Butler Street, Northcote VIC 3070');
                expect(result[0].contracts[1].addressRaw).toBe('U 4/6 Butler Street|NORTHCOTE VIC 3070');
                expect(result[0].contracts[1].hasBillHistory).toBe(false);
                expect(result[0].contracts[1].hasElectricVehicle).toBe(false, `hasElectricVehicle`);
                expect(result[0].contracts[1].isElectricity).toBe(false, `isElectricity`);
                expect(result[0].contracts[1].isSolar).toBe(false, `isSolar`);
                expect(result[0].contracts[1].isGas).toBe(true, `isGas`);

                done();
            },
            (error) => {
                fail();
            }
        );

    });

    it(`should format the address of a customer with 2 contracts at the same physical address and an identical address for both contracts`, (done) => {

                // Check all dependencies are OK
                let depApiService: ApiService = TestBed.get(ApiService, null);
                let depRedlineService: RedLineApiService = TestBed.get(RedLineApiService, null);
                let depPaygAccountService: PaygAccountService = TestBed.get(PaygAccountService, null);

                expect(subject).toBeTruthy(`The Accounts service is missing`);
                expect(depApiService).toBeTruthy(`The API Service dependency is missing`);
                expect(depRedlineService).toBeTruthy(`The Redline Service dependency is missing`);
                expect(depPaygAccountService).toBeTruthy(`The PAYG Account Service dependency is missing`);
                expect(dataLayerService).toBeTruthy(`The Data Layer Service dependency is missing`);

                let mockDashboard: ContractDetailApiModel[] = [
                    {
                        account: '23965742',
                        contract: '9400780769',
                        currentBillStartDate: new Date('2017-01-04T00:00:00'),
                        currentBillEndDate: new Date('2017-02-04T00:00:00'),
                        costToDate: 63.60,
                        projectedBill: 120.16,
                        usageCostThisWeek: 9.322548,
                        usageCostLastWeek: 12.194106,
                        usageThisWeek: '40.253',
                        usageLastWeek: '52.654',
                        balance: 0.0,
                        dueDate: new Date('0001-01-01T00:00:00'),
                        isSmartMeter: true,
                        estimatedReads: false
                    },
                    {
                        account: '23965742',
                        contract: '9400780910',
                        currentBillStartDate: new Date('0001-01-01T00:00:00'),
                        currentBillEndDate: new Date('2017-02-04T00:00:00'),
                        costToDate: 0.0,
                        projectedBill: 0.0,
                        usageCostThisWeek: 7.949808,
                        usageCostLastWeek: 7.192080,
                        usageThisWeek: '382.34361128050656',
                        usageLastWeek: '331.59129137576064',
                        balance: 0.0,
                        dueDate: new Date('0001-01-01T00:00:00'),
                        isSmartMeter: false,
                        estimatedReads: false
                    }
                ];

                let mockAccounts: AccountApiModel[] = [
                    {
                        number: '23965742',
                        firstName: 'Shahrukh',
                        lastName: 'Khan',
                        contracts: [
                            {
                                address: '55 FONGEO DRIVE|POINT COOK VIC 3030',
                                accountNumber: '23965742',
                                fuelType: 'Electricity',
                                nameId: 'AGL_E395B5CFC36FFEF18D470000C99D68E2',
                                number: '9400780769',
                                planName: 'Savers',
                                inFlight: false,
                                isRestricted: false,
                                hasElectricVehicle: false,
                                hasSolar: false,
                                solarCheckRegistered: false,
                                productId: '',
                                regionId: ''
                            },
                            {
                                address: '55 FONGEO DRIVE|POINT COOK VIC 3030',
                                accountNumber: '23965742',
                                fuelType: 'Gas',
                                nameId: 'AGL_E395B5CFC36FFEF18D470000C99D68E2',
                                number: '9400780910',
                                planName: 'Savers',
                                inFlight: false,
                                isRestricted: false,
                                hasElectricVehicle: false,
                                hasSolar: false,
                                solarCheckRegistered: false,
                                productId: '',
                                regionId: ''
                            }
                        ]
                    }
                ];

                spyOn(depApiService, 'getDashboard').and.returnValue(Observable.of(mockDashboard));
                spyOn(depApiService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
                spyOn(apiService, 'getBills').and.returnValue(Observable.of([]));
                spyOn(paymentMethodService, 'getPaymentMethods').and.returnValue(Observable.of([]));
                spyOn(productAttributesService, 'processContractProductAttributes');
                subject.getAccounts().subscribe(
                    (result) => {
                        expect(result).toBeTruthy();
                        expect(result.length).toBe(1);
                        expect(result[0].accountNumber).toBe('23965742');
                        expect(result[0].allContractsAreRestricted).toBe(false);
                        expect(result[0].allContractsAreNewConnection).toBe(false);
                        expect(result[0].contracts).toBeTruthy();
                        expect(result[0].contracts.length).toBe(2);
                        expect(result[0].groupedAddress).toBe('55 Fongeo Drive, Point Cook VIC 3030');

                        expect(result[0].contracts[0]).toBeTruthy();
                        expect(result[0].contracts[0].accountNumber).toBe('23965742');
                        expect(result[0].contracts[0].address).toBeFalsy();
                        expect(result[0].contracts[0].addressRaw).toBe('55 FONGEO DRIVE|POINT COOK VIC 3030');
                        expect(result[0].contracts[0].hasBillHistory).toBe(false);

                        expect(result[0].contracts[1]).toBeTruthy();
                        expect(result[0].contracts[1].accountNumber).toBe('23965742');
                        expect(result[0].contracts[1].address).toBeFalsy();
                        expect(result[0].contracts[1].addressRaw).toBe('55 FONGEO DRIVE|POINT COOK VIC 3030');
                        expect(result[0].contracts[1].hasBillHistory).toBe(false);

                        done();
                    },
                    (error) => {
                        fail();
                    }
                );

       });

});

function createBillHistoryApiModel(accountNumber: string, contractNumber: string, billApiModel: BillApiModel[]): BillHistoryApiModel {
    let billHistoryApiModel: BillHistoryApiModel = {
        account: accountNumber,
        contract: contractNumber,
        bills: billApiModel
    };
    return billHistoryApiModel;
}

function createBillApiModel(printDoc: string): BillApiModel {
    let billHistoryApiModel: BillApiModel = {
        billIssued: new Date(),
        newCharges: 12,
        totalDue: 23,
        dueDate: new Date(),
        isInCredit: true,
        isOverdue: true,
        billStatus: 'billStatus',
        printDoc: printDoc,
        startDate: new Date(),
        endDate: new Date()
    };
    return billHistoryApiModel;
}

function createAccountApiModel(accountNumber: string, contracts: ContractApiModel[]): AccountApiModel {
    let contractDetailApiModel: AccountApiModel = {
        number: accountNumber,
        contracts: contracts,
        firstName: 'John',
        lastName: 'Cena'
    };

    return contractDetailApiModel;
}

function createContractApiModel(accountNumber: string, contractNumber: string, isRestricted: boolean, fuelType: string): ContractApiModel {
    let contractApiModel: ContractApiModel = {
        accountNumber: accountNumber,
        number: contractNumber,
        fuelType: fuelType,
        isRestricted: isRestricted,
        address: 'address',
        nameId: 'nameId',
        planName: 'planName',
        inFlight: false,
        hasSolar: false,
        solarCheckRegistered: false,
        hasElectricVehicle: false,
        productId: 'productId',
        regionId: 'regionId',
    };

    return contractApiModel;
}

function createBillSmoothingAccount(accountNumber: number, paymentSchemes: BillSmoothingApiSchemeModel[]): BillSmoothingApiModel {
    let billSmoothingApiModel: BillSmoothingApiModel = {
        contractAccountNumber: accountNumber,
        paymentSchemes: paymentSchemes,
    };
    return billSmoothingApiModel;
}

function createBillSmoothingApiSchemeModel(contractNumber: number): BillSmoothingApiSchemeModel {
    let billSmoothingApiSchemeModel: BillSmoothingApiSchemeModel = {
        contractNumber: contractNumber,
        paymentSchemeNumber: 111,
        startDate: 'startDate',
        endDate: 'endDate',
        frequency: 'frequency',
        nextPayment: {
            date: new Date(),
            amount: 20
        },
        previousPayment: {
            date: new Date(),
            amount: 20
        }
    };

    return billSmoothingApiSchemeModel;
}

function createInstalmentPlans(contractNumber: number): PaymentArrangementInstalmentPlans {
    let paymentArrangementInstalmentPlans: PaymentArrangementInstalmentPlans = {
        contractNumber: contractNumber,
        instalmentPlans: [
            {
                instalments: [
                    {
                        instalmentDate: moment('2018-01-01').toDate(),
                        instalmentAmount: 20,
                        dueAmount: 20
                    },
                    {
                        instalmentDate: moment('2018-01-14').toDate(),
                        instalmentAmount: 20,
                        dueAmount: 20
                    },
                ],
                status: InstalmentPlanStatus.Open
            }
        ]
    };

    return paymentArrangementInstalmentPlans;
}

function createEmptyInstalmentPlans(contractNumber: number): PaymentArrangementInstalmentPlans {
    let paymentArrangementInstalmentPlans: PaymentArrangementInstalmentPlans = {
        contractNumber: contractNumber,
        instalmentPlans: []
    };

    return paymentArrangementInstalmentPlans;
}
