import { TestBed, inject, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { Mock } from 'ts-mocks';
import { Observable } from 'rxjs/Observable';

import { EnergyInsightsApiRepository } from '../repository/energyInsightsApi.repository';
import { SetupEnergyInsightsRequest } from './settings/model/setupEnergyInsightsRequest';
import { ApiService, ContactDetailModel, BusinessPartnerModel } from '../../shared/service/api.service';
import { AccountsTestData } from '../../test/testingData/accounts.testdata';
import { UsageBreakdownBillPeriod } from './settings/model/usageBreakdownBillPeriod';
import { AccountViewModel, IAccountServiceMA } from './account.service';
import { EnergyInsightsService } from './energyInsights.service';
import { ContractEnergyInsightsModel } from './settings/model/contractEnergyInsightsModel';
import { EnergyInsightsEligibilityAccount } from './settings/model/energyInsightsEligibilityAccount';
import { EnergyInsightsEligibilityContract } from './settings/model/energyInsightsEligibilityContract';
import { EnergyInsightsUsage } from './settings/model/energyInsightsUsage';
import { EnergyInsightsUsageCategory } from './settings/model/energyUsageCategories';
import { EnergyInsightsUsageBreakdown } from './settings/model/energyInsightsUsageBreakdown';

describe(`Energy Insights Service`, () => {

    let subject: EnergyInsightsService = null;
    let backend: MockBackend = null;
    let mockApiService: Mock<ApiService> = new Mock<ApiService>();
    let mockEnergyInsightsRepository: Mock<EnergyInsightsApiRepository> = new Mock<EnergyInsightsApiRepository>();
    let mockAccountService = new Mock<IAccountServiceMA>();

    let spies: {
        eiRepogetEligibilityAndSubscriptionStatus: jasmine.Spy,
        setupEnergyInsights: jasmine.Spy,
        getContactDetail: jasmine.Spy,
        getAccounts: jasmine.Spy,
        eiRepogetUsageBreakdownForBilled: jasmine.Spy,
    } = {
        eiRepogetEligibilityAndSubscriptionStatus: null,
        setupEnergyInsights: null,
        getContactDetail: null,
        getAccounts: null,
        eiRepogetUsageBreakdownForBilled: null,
    };

    beforeEach(() => {
        spies.eiRepogetEligibilityAndSubscriptionStatus = mockEnergyInsightsRepository
            .setup((x) => x.getEligibilityAndSubscriptionStatus)
            .is(() => {
                return Observable.of(null);
            }).Spy;
        spies.setupEnergyInsights = mockEnergyInsightsRepository
            .setup((x) => x.setupEnergyInsights)
            .is(() => {
                return Observable.of(null);
            }).Spy;
        spies.getContactDetail = mockApiService
            .setup((x) => x.getContactDetail)
            .is(() => {
                return Observable.of(null);
            }).Spy;
        spies.getAccounts = mockAccountService
            .setup((x) => x.getAccounts)
            .is(() => {
                return Observable.of(null);
            }).Spy;
        spies.eiRepogetUsageBreakdownForBilled = mockEnergyInsightsRepository
            .setup((x) => x.getUsageBreakdownForBilled)
            .is(() => {
                return Observable.of(null);
            }).Spy;
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                {
                    provide: ApiService,
                    useValue: mockApiService.Object
                },
                {
                    provide: EnergyInsightsApiRepository,
                    useValue: mockEnergyInsightsRepository.Object
                },
                {
                    provide: IAccountServiceMA,
                    useValue: mockAccountService.Object
                },
                {
                    provide: EnergyInsightsService,
                    useClass: EnergyInsightsService,
                    deps: [
                        ApiService,
                        EnergyInsightsApiRepository,
                        IAccountServiceMA,
                    ]
                }
            ]
        });
    });

    beforeEach(inject([EnergyInsightsService], (_energyInsightsService: EnergyInsightsService) => {
        subject = _energyInsightsService;
    }));

    it(`Energy Insights service should initalise with all required dependencies`, () => {
        expect(subject).toBeDefined();
    });

    describe(`Test getUsageBreakdownForBilled on the energy insights service`, () => {

        let mockData: EnergyInsightsUsage = new EnergyInsightsUsage();
        mockData.highestMeasuredUsageCategory = EnergyInsightsUsageCategory.Heating;
        mockData.totalUsageCost = 100.00;
        mockData.hasUsageAmount = true;
        mockData.usageBreakdown = [
            {
                category: EnergyInsightsUsageCategory.Heating,
                usagePercentage: 75,
                usageAmount: 75
            },
            {
                category: EnergyInsightsUsageCategory.Cooking,
                usagePercentage: 25,
                usageAmount: 25
            }
        ];

        it(`Should call the repository with the correct params`, async(() => {

            spies.eiRepogetUsageBreakdownForBilled.and.returnValue(Observable.of(mockData));

            subject
                .getUsageBreakdownForBilled(`9101004976`, `2018-01-01`, `2018-01-31`)
                .subscribe((result: EnergyInsightsUsage) => {
                    expect(result.highestMeasuredUsageCategory).toBe(EnergyInsightsUsageCategory.Heating);
                    expect(result.hasUsageAmount).toBe(true);
                    expect(spies.eiRepogetUsageBreakdownForBilled).toHaveBeenCalledWith(`9101004976`, `2018-01-01`, `2018-01-31`);
                    expect(spies.eiRepogetUsageBreakdownForBilled).toHaveBeenCalledTimes(1);
                });
        }));

    });

    describe(`Get eligibility and subscription status`, () => {
        it(`Should make the call to getEligibilityAndSubscriptionStatus`, async(() => {
            let expected: EnergyInsightsEligibilityContract[] = [
                {
                    ...new EnergyInsightsEligibilityContract(),
                    contractNumber: 9101004976,
                    isEligible: true,
                    subscribedToMidBillEnergyBreakdown: true,
                    subscribedToEndBillEnergyBreakdown: true,
                    availableUsageBreakdownBillPeriods: [
                        {
                            billStartDate: '2018-01-01',
                            billEndDate: '2018-03-31'
                        }
                    ]
                },
                {
                    ...new EnergyInsightsEligibilityContract(),
                    contractNumber: 9101163496,
                    isEligible: false,
                    subscribedToMidBillEnergyBreakdown: false,
                    subscribedToEndBillEnergyBreakdown: false,
                    availableUsageBreakdownBillPeriods: []
                }
            ];
            spies.eiRepogetEligibilityAndSubscriptionStatus.and.returnValue(Observable.of(expected));
            subject.getAccountStatus('9101004976').subscribe(
                (result: EnergyInsightsEligibilityAccount) => {

                    expect(result.accountNumber).toBe('9101004976');

                    expect(result.contracts).toBeDefined();
                    expect(result.contracts.length).toBe(2);

                    // Test the contract 9101004976
                    expect(result.contracts[0].contractNumber).toBe(9101004976);
                    expect(result.contracts[0].isEligible).toBe(true);
                    expect(result.contracts[0].subscribedToMidBillEnergyBreakdown).toBe(true);
                    expect(result.contracts[0].subscribedToEndBillEnergyBreakdown).toBe(true);
                    expect(result.contracts[0].availableUsageBreakdownBillPeriods).toEqual([{
                        billStartDate: '2018-01-01',
                        billEndDate: '2018-03-31'
                    }]);

                    // Test the contract 9101163496
                    expect(result.contracts[1].contractNumber).toBe(9101163496);
                    expect(result.contracts[1].isEligible).toBe(false);
                    expect(result.contracts[1].subscribedToMidBillEnergyBreakdown).toBe(false);
                    expect(result.contracts[1].subscribedToEndBillEnergyBreakdown).toBe(false);
                    expect(result.contracts[1].availableUsageBreakdownBillPeriods).toEqual([]);
                }
            );
        }));
    });

    describe(`Setup energy insights`, () => {
        it(`Should make the call to setup Energy Insights for contract 9101004976, Mid is true and End is true`, async(() => {
            subject.setupEnergyInsights('9101004976', new SetupEnergyInsightsRequest(true, true)).subscribe(
                (result: any) => {
                    expect(spies.eiRepogetEligibilityAndSubscriptionStatus).toHaveBeenCalledTimes(0);
                    expect(spies.setupEnergyInsights).toHaveBeenCalledWith('9101004976', new SetupEnergyInsightsRequest(true, true));
                },
                (error: any) => {
                    fail();
                }
            );
        }));

        it(`Should make the call to setup Energy Insights for contract 9101004976, Mid is True`, async(() => {

            spies.setupEnergyInsights.and.returnValue(Observable.of(null));
            subject.setupEnergyInsights('9101004976', new SetupEnergyInsightsRequest(true)).subscribe(
                (result: any) => {
                    expect(spies.eiRepogetEligibilityAndSubscriptionStatus).toHaveBeenCalledTimes(0);
                    expect(spies.setupEnergyInsights).toHaveBeenCalledWith('9101004976', new SetupEnergyInsightsRequest(true));
                },
                (error: any) => {
                    fail();
                }
            );
        }));

        it(`Should throw an error if the supplied contract number is invalid`, async(() => {
            spies.setupEnergyInsights.and.callThrough();

            expect(() => subject.setupEnergyInsights(null, new SetupEnergyInsightsRequest(true, true))
                .subscribe()).toThrow(`contractNumber was empty`);
        }));
    });

    describe(`Test 'getContractDetailsAndEligibility()' for a single contract'`, () => {
        it(`Should make the call to getContractDetailsAndEligibility get the contactDetails and eligibility details`, async(() => {
            // ARRANGE
            let eligilibityModel: EnergyInsightsEligibilityContract[] = [
                createEnergyInsightsEligibility(9101004976, true),
                createEnergyInsightsEligibility(9101163496, false)
            ];
            AccountsTestData.ClintEastwood[0].contracts[0].fuelType = 'Electricity';
            AccountsTestData.ClintEastwood[0].contracts[0].isSmartMeter = true;

            // ACT
            spies.getContactDetail.and.returnValue(Observable.of(createContactDetailsData()));
            spies.eiRepogetEligibilityAndSubscriptionStatus.and.returnValue(Observable.of(eligilibityModel));
            spies.getAccounts.and.returnValue(Observable.of(AccountsTestData.ClintEastwood));

            // ASSERT
            subject.getContractDetailsAndEligibility().subscribe(
                (result: ContractEnergyInsightsModel[]) => {
                    expect(spies.eiRepogetEligibilityAndSubscriptionStatus).toHaveBeenCalledTimes(1);
                    expect(spies.eiRepogetEligibilityAndSubscriptionStatus).toHaveBeenCalledWith('90428798');
                    expect(spies.getContactDetail).toHaveBeenCalledTimes(1);
                    expect(spies.getAccounts).toHaveBeenCalledTimes(1);
                },
                (error: any) => {
                    fail();
                }
            );
        }));
    });

    describe((`Test 'getContractDetailsAndEligibility()' for a multi account customer`), () => {

        it(`Should make two calls to the energy insights service with both active accounts`, () => {
            // ARRANGE
            AccountsTestData.RichardMunt[0].contracts[0].fuelType = 'Electricity';
            AccountsTestData.RichardMunt[0].contracts[0].isSmartMeter = true;
            AccountsTestData.RichardMunt[1].contracts[0].fuelType = 'Electricity';
            AccountsTestData.RichardMunt[1].contracts[0].isSmartMeter = true;
            AccountsTestData.RichardMunt[2].contracts[0].fuelType = 'Electricity';
            AccountsTestData.RichardMunt[2].contracts[0].isSmartMeter = true;

            // ACT
            spies.getContactDetail.and.returnValue(Observable.of(createContactDetailsData()));

            spies.eiRepogetEligibilityAndSubscriptionStatus.and.callFake((accountNumber: string) => {
                let fakeModels: EnergyInsightsEligibilityContract[];
                switch (accountNumber) {
                    case `7016135894`: {
                        return Observable.of([
                            createEnergyInsightsEligibility(9139723699, true),
                            createEnergyInsightsEligibility(9139723694, false),
                        ]);
                    }
                    case `7029521254`: {
                        return Observable.of([
                            createEnergyInsightsEligibility(9401786227, true),
                            createEnergyInsightsEligibility(9401786228, false)
                        ]);
                    }
                    default: {
                        fail();
                    }
                }
            });

            spies.getAccounts.and.returnValue(Observable.of(AccountsTestData.RichardMunt));

            // ASSERT
            subject.getContractDetailsAndEligibility().subscribe(
                (result: ContractEnergyInsightsModel[]) => {

                    expect(result).toBeDefined();
                    expect(result.length).toBe(4);

                    expect(result[0].contract.contractNumber).toBe(`9139723699`);
                    expect(result[0].energyInsightsEligibility.contractNumber).toBe(9139723699);
                    expect(result[0].energyInsightsEligibility.isEligible).toBe(true);

                    expect(result[1].contract.contractNumber).toBe(`9139723694`);
                    expect(result[1].energyInsightsEligibility.contractNumber).toBe(9139723694);
                    expect(result[1].energyInsightsEligibility.isEligible).toBe(false);

                    expect(result[2].contract.contractNumber).toBe(`9401786227`);
                    expect(result[2].energyInsightsEligibility.contractNumber).toBe(9401786227);
                    expect(result[2].energyInsightsEligibility.isEligible).toBe(true);

                    expect(result[3].contract.contractNumber).toBe(`9401786228`);
                    expect(result[3].energyInsightsEligibility.contractNumber).toBe(9401786228);
                    expect(result[3].energyInsightsEligibility.isEligible).toBe(false);

                    expect(spies.eiRepogetEligibilityAndSubscriptionStatus).toHaveBeenCalledTimes(2);
                    expect(spies.eiRepogetEligibilityAndSubscriptionStatus).toHaveBeenCalledWith('7016135894');
                    expect(spies.eiRepogetEligibilityAndSubscriptionStatus).toHaveBeenCalledWith('7029521254');
                    expect(spies.getContactDetail).toHaveBeenCalledTimes(1);
                    expect(spies.getAccounts).toHaveBeenCalledTimes(1);
                },
                (error: any) => {
                    fail(`There was an error in the 'getContractDetailsAndEligibility' call, ${error}`);
                }
            );
        });
    });

    let createEnergyInsightsEligibility = (
            contractNumber: number,
            isEligible: boolean = false,
            midBillSubscription: boolean = false,
            endBillSubscription: boolean = false,
            usageBreakdownBillPeriods: UsageBreakdownBillPeriod[] = []): EnergyInsightsEligibilityContract => {

        let eligibility: EnergyInsightsEligibilityContract = {
            ...new EnergyInsightsEligibilityContract(),
            contractNumber: contractNumber,
            isEligible: isEligible,
            subscribedToMidBillEnergyBreakdown: midBillSubscription,
            subscribedToEndBillEnergyBreakdown: endBillSubscription,
            availableUsageBreakdownBillPeriods: usageBreakdownBillPeriods
        };

        return eligibility;
    };

    let createContactDetailsData = (contactDetail: ContactDetailModel = null): ContactDetailModel => {
        let businessPartner = {
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'clinteastwood@yahoo.com',
            businessPartnerNumber: '12345234',
            phone: '',
            mobile: '',
            hasDateOfBirth: false
        };

        if (contactDetail === null) {
            contactDetail = {
                hasMultipleBusinessPartners: false,
                businessPartners: [businessPartner]
            };
        }

        return contactDetail;
    };
});
