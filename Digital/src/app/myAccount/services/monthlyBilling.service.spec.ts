
import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { Mock } from 'ts-mocks';

import { Observable } from 'rxjs/Observable';
import { setTimeout } from 'timers';
import { AccountsTestData } from '../../test/testingData/accounts.testdata';
import { MonthlyBillingBillDateOptions } from '../../test/testingData/monthlyBilling/monthlyBilling.billDateOptions.testdata';
import { MonthlyBillingGetBillingFrequenciesTestData } from '../../test/testingData/monthlyBilling/monthlyBilling.getBillingFrequencies.testdata';
import { MonthlyBillingGetElegibilityTestData } from '../../test/testingData/monthlyBilling/monthlyBilling.getElegibility.testdata';
import { IAccountServiceMA } from './account.service';
import { MonthlyBillingService } from './monthlyBilling.service';
import { AccountMonthlyBillingModel } from './settings/model/accountMonthlyBillingModel';
import { BillDateOption } from './settings/model/billDateOption';
import { BillingFrequency } from './settings/model/billingFrequency';
import { BillingFrequencyType } from './settings/model/billingFrequencyType';
import { MonthlyBillingEligibility } from './settings/model/monthlyBillingEligibility';
import { SetupMonthlyBillingRequest } from './settings/model/setupMonthlyBillingRequest';
import { ISettingsApi } from './settings/settingsApi.service.interface';

describe (`Monthly Billing Service`, () => {

    let subject: MonthlyBillingService = null;
    let backend: MockBackend = null;

    let mockSettingsApiService: Mock<ISettingsApi>;
    let mockAccountService: Mock<IAccountServiceMA>;

    let getCallSpy: jasmine.Spy;
    let postCallSpy: jasmine.Spy;
    let deleteCallSpy: jasmine.Spy;
    let getContractsSpy: jasmine.Spy;
    let getAccountsSpy: jasmine.Spy;

    beforeAll(() => {

        mockSettingsApiService = new Mock<ISettingsApi>();
        mockAccountService = new Mock<IAccountServiceMA>();

        getCallSpy = mockSettingsApiService
            .setup((x) => x.get)
            .is(() => {
                return Observable.of(null);
            }).Spy;
        postCallSpy = mockSettingsApiService
            .setup((x) => x.post)
            .is(() => {
                return Observable.of(null);
            }).Spy;
        deleteCallSpy = mockSettingsApiService
            .setup((x) => x.delete)
            .is(() => {
                return Observable.of(null);
            }).Spy;
        getContractsSpy = mockAccountService
            .setup((x) => x.getAllActiveContracts)
            .is(() => {
                return Observable.of(null);
            }).Spy;
        getAccountsSpy = mockAccountService
            .setup((x) => x.getAccounts)
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
                    provide: ISettingsApi,
                    useValue: mockSettingsApiService.Object
                },
                {
                    provide: IAccountServiceMA,
                    useValue: mockAccountService.Object
                },
                {
                    provide: MonthlyBillingService,
                    useClass: MonthlyBillingService,
                    deps: [
                        ISettingsApi,
                        IAccountServiceMA
                    ]
                }
            ]
        });
    });

    beforeEach(inject([MonthlyBillingService], (_monthlyBillingService: MonthlyBillingService) => {
        subject = _monthlyBillingService;
    }));

    it(`Monthly Billing service should initalise with all required dependencies`, () => {
        expect(subject).toBeDefined();
    });

    describe(`Test 'checkEligibility'`, () => {

        it(`Should make the call to check eligiblity and return the correct data for account 9101004976`, async(() => {

            let expected: MonthlyBillingEligibility[] =
            [
                {
                    contractNumber: 9101004976,
                    setup: {
                        isEligible: true
                    },
                    cancellation: {
                        isEligible: true
                    }
                },
                {
                    contractNumber: 9101163496,
                    setup: {
                        isEligible: true
                    },
                    cancellation: {
                        isEligible: true
                    }
                }
            ];

            getAccountsSpy.and.returnValue(Observable.of(AccountsTestData.ClintEastwood));
            getCallSpy.and.returnValue(Observable.of(expected));

            subject.checkEligibility('9101004976').subscribe(
                (results: MonthlyBillingEligibility[]) => {

                    expect(results).toBeDefined();
                    expect(results.length).toBe(2);

                    // Test the contract 9101004976
                    expect(results[0].contractNumber).toBe(9101004976);
                    expect(results[0].setup).toBeDefined();
                    expect(results[0].setup.isEligible).toEqual(true);
                    expect(results[0].cancellation).toBeDefined();
                    expect(results[0].cancellation.isEligible).toEqual(true);

                    // Test the contract 9101163496
                    expect(results[1].contractNumber).toBe(9101163496);
                    expect(results[1].setup).toBeDefined();
                    expect(results[1].setup.isEligible).toEqual(true);
                    expect(results[1].cancellation).toBeDefined();
                    expect(results[1].cancellation.isEligible).toEqual(true);
                }
            );
        }));

    });

    describe(`Eligibility predictions`, () => {

        it(`Should indicate that the customer 'Clint Eastwood' is predicted as eligible if any account/contract is predicted as eligible`, async(() => {
            getAccountsSpy.and.returnValue(Observable.of(AccountsTestData.ClintEastwood));
            let eligibilitySpy: jasmine.Spy = spyOn(subject, 'checkEligibility').and.returnValue(Observable.of(MonthlyBillingGetElegibilityTestData.ClintEastwood));
            let billingFreqSpy: jasmine.Spy = spyOn(subject, 'getBillingFrequencies').and.returnValue(Observable.of(MonthlyBillingGetBillingFrequenciesTestData.ClintEastwood));
            subject.isCustomerPredictedAsEligible()
                .subscribe((x) => {
                    expect(x).toBe(true);
                }
            );
        }));

        it(`Should indicate that the customer 'Rod Binnington' is predicted as eligible if any account/contract is predicted as eligible`, async(() => {
            getAccountsSpy.and.returnValue(Observable.of(AccountsTestData.RodBinnington));
            let eligibilitySpy: jasmine.Spy = spyOn(subject, 'checkEligibility').and.returnValue(Observable.of(MonthlyBillingGetElegibilityTestData.RodBinnington));
            let billingFreqSpy: jasmine.Spy = spyOn(subject, 'getBillingFrequencies').and.returnValue(Observable.of(MonthlyBillingGetBillingFrequenciesTestData.RodBinnington));
            subject.isCustomerPredictedAsEligible()
                .subscribe((x) => {
                    expect(x).toBe(true);
                }
            );
        }));

        it(`Should indicate that the customer 'Zoe Hannah', as a WAS Gas customer, is predicted as ineligible`, async(() => {
            getAccountsSpy.and.returnValue(Observable.of(AccountsTestData.ZoeHannah));
            let eligibilitySpy: jasmine.Spy = spyOn(subject, 'checkEligibility').and.returnValue(Observable.of(MonthlyBillingGetElegibilityTestData.ZoeHannah));
            let billingFreqSpy: jasmine.Spy = spyOn(subject, 'getBillingFrequencies').and.returnValue(Observable.of(MonthlyBillingGetBillingFrequenciesTestData.ZoeHannah));
            subject.isCustomerPredictedAsEligible()
                .subscribe((x) => {
                    expect(x).toBe(false);
                }
            );
        }));

    });

    describe(`Test 'getMonthlyBillingInfoWithEligibility'`, () => {

        it(`Should return the combined model of data (with additional eligibility) for the account 90428798`, async(() => {
            // arrange
            let eligibilitySpy: jasmine.Spy = spyOn(subject, 'checkEligibility').and.returnValue(Observable.of(MonthlyBillingGetElegibilityTestData.ClintEastwood));
            let billingFreqSpy: jasmine.Spy = spyOn(subject, 'getBillingFrequencies').and.returnValue(Observable.of(MonthlyBillingGetBillingFrequenciesTestData.ClintEastwood));
            let inforForAccountSpy: jasmine.Spy = spyOn(subject, 'getMonthlyBillingInfoForAccount').and.callThrough();

            let expected: MonthlyBillingEligibility = {
                contractNumber: 9101004976,
                setup: {
                    isEligible: true
                },
                cancellation: {
                    isEligible: true
                }
            };

            subject.getMonthlyBillingInfoWithEligibility(AccountsTestData.ClintEastwood[0])
                .finally(() => {
                    expect(eligibilitySpy).toHaveBeenCalledTimes(1);
                    expect(inforForAccountSpy).toHaveBeenCalledTimes(1);
                    expect(inforForAccountSpy).toHaveBeenCalledWith(AccountsTestData.ClintEastwood[0]);
                    expect(subject.checkEligibility).toHaveBeenCalledWith('90428798');
                    expect(subject.getBillingFrequencies).toHaveBeenCalledWith('90428798');
                })
                .subscribe(
                    (result: AccountMonthlyBillingModel) => {
                        expect(result).toBeDefined();
                        expect(result.accountNumber).toBe('90428798');
                        expect(result.contractMonthlyBillingModels.length).toBe(2);
                        expect(result.contractMonthlyBillingModels[0].frequency).toBe(BillingFrequencyType.Quarterly);
                        expect(result.contractMonthlyBillingModels[0].preferredDayOfMonth).toBe(null);
                        expect(result.contractMonthlyBillingModels[0].cancellation.isEligible).toBe(true);
                        expect(result.contractMonthlyBillingModels[0].setup.isEligible).toBe(true);

                    }
                );
        }));

        it(`Should return the combined model of data for the account 90428798`, async(() => {
            // arrange
            let eligibilitySpy: jasmine.Spy = spyOn(subject, 'checkEligibility').and.returnValue(Observable.of(MonthlyBillingGetElegibilityTestData.ClintEastwood));
            let billingFreqSpy: jasmine.Spy = spyOn(subject, 'getBillingFrequencies').and.returnValue(Observable.of(MonthlyBillingGetBillingFrequenciesTestData.ClintEastwood));
            let inforForAccountSpy: jasmine.Spy = spyOn(subject, 'getMonthlyBillingInfoForAccount').and.callThrough();

            let expected: MonthlyBillingEligibility = {
                contractNumber: 9101004976,
                setup: {
                    isEligible: true
                },
                cancellation: {
                    isEligible: true
                }
            };

            subject.getMonthlyBillingInfoWithEligibility(AccountsTestData.ClintEastwood[0])
                .finally(() => {
                    expect(eligibilitySpy).toHaveBeenCalledTimes(1);
                    expect(inforForAccountSpy).toHaveBeenCalledTimes(1);
                    expect(inforForAccountSpy).toHaveBeenCalledWith(AccountsTestData.ClintEastwood[0]);
                    expect(subject.checkEligibility).toHaveBeenCalledWith('90428798');
                    expect(subject.getBillingFrequencies).toHaveBeenCalledWith('90428798');
                })
                .subscribe(
                    (result: AccountMonthlyBillingModel) => {
                        expect(result).toBeDefined();
                        expect(result.accountNumber).toBe('90428798');
                        expect(result.contractMonthlyBillingModels.length).toBe(2);
                        expect(result.contractMonthlyBillingModels[0].frequency).toBe(BillingFrequencyType.Quarterly);
                        expect(result.contractMonthlyBillingModels[0].preferredDayOfMonth).toBe(null);
                        expect(result.contractMonthlyBillingModels[0].cancellation.isEligible).toBe(true);
                        expect(result.contractMonthlyBillingModels[0].setup.isEligible).toBe(true);

                    }
                );
        }));

    });

    describe(`Test 'getMonthlyBillingInfoForAccount'`, () => {

        it(`Should make the call to getMonthlyBillingInfoForAccount for the account 90428798`, async(() => {
            // arrange
            let eligibilitySpy: jasmine.Spy = spyOn(subject, 'checkEligibility').and.returnValue(Observable.of(MonthlyBillingGetElegibilityTestData.ClintEastwood));
            let billingFreqSpy: jasmine.Spy = spyOn(subject, 'getBillingFrequencies').and.returnValue(Observable.of(MonthlyBillingGetBillingFrequenciesTestData.ClintEastwood));

            let expected: MonthlyBillingEligibility = {
                contractNumber: 9101004976,
                setup: {
                    isEligible: true
                },
                cancellation: {
                    isEligible: true
                }
            };

            subject.getMonthlyBillingInfoForAccount(AccountsTestData.ClintEastwood[0])
                .finally(() => {
                    expect(eligibilitySpy).toHaveBeenCalledTimes(0);
                    expect(subject.getBillingFrequencies).toHaveBeenCalledWith('90428798');
                })
                .subscribe(
                    (result: AccountMonthlyBillingModel) => {
                        expect(result).toBeDefined();
                        expect(result.accountNumber).toBe('90428798');
                        expect(result.contractMonthlyBillingModels.length).toBe(2);
                        expect(result.contractMonthlyBillingModels[0].frequency).toBe(BillingFrequencyType.Quarterly);
                        expect(result.contractMonthlyBillingModels[0].preferredDayOfMonth).toBe(null);
                        expect(result.contractMonthlyBillingModels[0].cancellation).toBeFalsy();
                        expect(result.contractMonthlyBillingModels[0].setup).toBeFalsy();
                    }
                );
        }));

        it(`Should make the call to getMonthlyBillingInfoForAccount for account 90428798, but return ineligible for a contract as it does not have matching eligibility data`, async(() => {
            // arrange
            let eligibilitySpy: jasmine.Spy = spyOn(subject, 'checkEligibility').and.returnValue(Observable.of(MonthlyBillingGetElegibilityTestData.ClintEastwood));
            let billingFreqSpy: jasmine.Spy = spyOn(subject, 'getBillingFrequencies').and.returnValue(Observable.of(MonthlyBillingGetBillingFrequenciesTestData.ClintEastwood));

            let expected: MonthlyBillingEligibility = {
                contractNumber: 9101004976,
                setup: {
                    isEligible: true
                },
                cancellation: {
                    isEligible: true
                }
            };

            subject.getMonthlyBillingInfoForAccount(AccountsTestData.ClintEastwood[0])
                .finally(() => {
                    expect(eligibilitySpy).toHaveBeenCalledTimes(0);
                    expect(subject.getBillingFrequencies).toHaveBeenCalledWith('90428798');
                })
                .subscribe(
                    (result: AccountMonthlyBillingModel) => {
                        expect(result).toBeDefined();
                        expect(result.accountNumber).toBe('90428798');
                        expect(result.contractMonthlyBillingModels.length).toBe(2);
                        expect(result.contractMonthlyBillingModels[0].frequency).toBe(BillingFrequencyType.Quarterly);
                        expect(result.contractMonthlyBillingModels[0].preferredDayOfMonth).toBe(null);
                        expect(result.contractMonthlyBillingModels[0].cancellation).toBeFalsy();
                        expect(result.contractMonthlyBillingModels[0].setup).toBeFalsy();
                    }
                );
        }));

    });

    describe(`Test 'setupMonthlyBilling'`, () => {

        it(`Should make the call to setup monthly billing for contract 9101004976`, async(() => {

            postCallSpy.calls.reset();
            deleteCallSpy.calls.reset();
            getCallSpy.calls.reset();

            postCallSpy.and.returnValue(Observable.of(null));
            let setupMonthlyBillingSpy: jasmine.Spy = spyOn(subject, 'setupMonthlyBilling').and.callThrough();

            let expectedtModel: SetupMonthlyBillingRequest = new SetupMonthlyBillingRequest();
            expectedtModel.preferredDayOfMonth = 4;

            subject
                .setupMonthlyBilling('9101004976', 4).subscribe(
                    (result: any) => {
                        expect(getCallSpy).toHaveBeenCalledTimes(0);
                        expect(deleteCallSpy).toHaveBeenCalledTimes(0);
                        expect(setupMonthlyBillingSpy).toHaveBeenCalledWith('9101004976', 4);
                        expect(postCallSpy).toHaveBeenCalledWith(`/v2/contracts/9101004976/monthlyBilling`, expectedtModel);
                    },
                    (error: any) => {
                        fail();
                    }
            );

        }));

        it(`Should throw an error if the supplied contract number is invalid`, async(() => {

            postCallSpy.calls.reset();
            deleteCallSpy.calls.reset();
            getCallSpy.calls.reset();

            postCallSpy.and.returnValue(Observable.of(null));
            let setupMonthlyBillingSpy: jasmine.Spy = spyOn(subject, 'setupMonthlyBilling').and.callThrough();

            let expectedtModel: SetupMonthlyBillingRequest = new SetupMonthlyBillingRequest();
            expectedtModel.preferredDayOfMonth = 4;

            subject
                .setupMonthlyBilling(null, 4).subscribe(
                    (result: any) => {
                        fail();
                    },
                    (error: any) => {
                        expect(getCallSpy).toHaveBeenCalledTimes(0);
                        expect(deleteCallSpy).toHaveBeenCalledTimes(0);
                        expect(postCallSpy).toHaveBeenCalledTimes(0);
                    }
            );

        }));

        it(`Should throw an error if the supplied preferredDayOfMonth is invalid`, async(() => {

                postCallSpy.calls.reset();
                deleteCallSpy.calls.reset();
                getCallSpy.calls.reset();

                postCallSpy.and.returnValue(Observable.of(null));
                let setupMonthlyBillingSpy: jasmine.Spy = spyOn(subject, 'setupMonthlyBilling').and.callThrough();

                let expectedtModel: SetupMonthlyBillingRequest = new SetupMonthlyBillingRequest();
                expectedtModel.preferredDayOfMonth = 4;

                subject
                    .setupMonthlyBilling('9101004976', <any> `4th`).subscribe(
                        (result: any) => {
                            fail();
                        },
                        (error: any) => {
                            expect(getCallSpy).toHaveBeenCalledTimes(0);
                            expect(deleteCallSpy).toHaveBeenCalledTimes(0);
                            expect(postCallSpy).toHaveBeenCalledTimes(0);
                        }
                );

            }));

    });

    describe(`Test 'cancelMonthlyBilling'`, () => {

        it(`Should send a DELETE request with the correct parameters`, async(() => {

            postCallSpy.calls.reset();
            deleteCallSpy.calls.reset();
            getCallSpy.calls.reset();

            deleteCallSpy.and.returnValue(Observable.of(null));
            let cancelMonthlyBillingSpy: jasmine.Spy = spyOn(subject, 'cancelMonthlyBilling').and.callThrough();

            subject
                .cancelMonthlyBilling('9101004976')
                    .finally(() => {
                        expect(getCallSpy).toHaveBeenCalledTimes(0);
                        expect(postCallSpy).toHaveBeenCalledTimes(0);
                    })
                    .subscribe(
                        (result: any) => {
                            expect(cancelMonthlyBillingSpy).toHaveBeenCalledWith('9101004976');
                            expect(deleteCallSpy).toHaveBeenCalledWith(`/v2/contracts/9101004976/monthlyBilling`);
                        },
                        (error: any) => {
                            fail();
                        }
                    );

        }));

        it(`Should NOT send a DELETE request if an invalid contract number is provided`, async(() => {

            postCallSpy.calls.reset();
            deleteCallSpy.calls.reset();
            getCallSpy.calls.reset();

            deleteCallSpy.and.returnValue(Observable.of(null));
            let cancelMonthlyBillingSpy: jasmine.Spy = spyOn(subject, 'cancelMonthlyBilling').and.callThrough();

            subject
                .cancelMonthlyBilling('9101Clint976')
                    .finally(() => {
                        expect(getCallSpy).toHaveBeenCalledTimes(0);
                        expect(postCallSpy).toHaveBeenCalledTimes(0);
                        expect(deleteCallSpy).toHaveBeenCalledTimes(0);
                    })
                    .subscribe(
                        (result: any) => {
                            fail();
                        },
                        (error: any) => {
                            expect(cancelMonthlyBillingSpy).toHaveBeenCalledWith('9101Clint976');
                        }
                    );

        }));

    });

    describe(`Test 'getBillDateOptions'`, () => {

        it(`Should return the correct data for contract 90428798`, async(() => {

            getCallSpy.calls.reset();
            getCallSpy.and.returnValue(Observable.of(MonthlyBillingBillDateOptions.ClintEastWood));
            let getBillingFrequenciesSpy: jasmine.Spy = spyOn(subject, 'getBillDateOptions').and.callThrough();

            subject
                .getBillDateOptions('9101004976')
                .subscribe(
                    (result: BillDateOption[]) => {
                        expect(result.length).toBe(3);

                        expect(result[0].dayOfMonth).toBe(1);
                        expect(result[0].billDates.length).toBe(3);
                        expect(result[0].billDates[0].issueDate).toEqual(new Date('2017-10-10'));
                        expect(result[0].billDates[0].dueDate).toEqual(new Date('2017-10-21'));

                        expect(result[1].dayOfMonth).toBe(2);
                        expect(result[1].billDates.length).toBe(3);

                        expect(result[2].dayOfMonth).toBe(3);
                        expect(result[2].billDates.length).toBe(3);
                    }
                );

        }));

        it(`Should throw an error if the we don't pass a value for the contract number parameter`, (done) => {

            getCallSpy.calls.reset();
            getCallSpy.and.returnValue(Observable.of(null));

            subject.getBillDateOptions(null)
                .subscribe(
                    (result: any) => {
                        fail();
                    },
                    (error: any) => {
                        expect(error).toBe(`Contract Number was empty`);
                        expect(getCallSpy).toHaveBeenCalledTimes(0);
                        done();
                    }
                );

        });

        it(`Should throw an error if the contract number passed is not a valid number`, (done) => {

            getCallSpy.calls.reset();
            getCallSpy.and.returnValue(Observable.of(null));

            subject.getBillDateOptions('ClintEastWood')
                .subscribe(
                    (result: any) => {
                        fail();
                    },
                    (error: any) => {
                        expect(error).toBe(`Contract Number was not a valid number`);
                        expect(getCallSpy).toHaveBeenCalledTimes(0);
                        done();
                    }
                );

        });

    });

    describe(`Test 'getBillingFrequencies'`, () => {

        it(`Should return the correct data for contract account 90428798`, async(() => {

            getCallSpy.calls.reset();
            getCallSpy.and.returnValue(Observable.of(MonthlyBillingGetBillingFrequenciesTestData.ClintEastwood));
            let getBillingFrequenciesSpy: jasmine.Spy = spyOn(subject, 'getBillingFrequencies').and.callThrough();

            subject
                .getBillingFrequencies('90428798')
                .subscribe(
                    (result: BillingFrequency[]) => {
                        expect(getBillingFrequenciesSpy).toHaveBeenCalledWith('90428798');
                        expect(getBillingFrequenciesSpy).toHaveBeenCalledTimes(1);
                        expect(getCallSpy).toHaveBeenCalledTimes(1);
                        expect(result).toBeDefined();
                        expect(result.length).toBe(2);

                        expect(result[0].contractNumber).toBe(9101004976);
                        expect(result[0].frequency).toBe(BillingFrequencyType.Quarterly);

                        expect(result[1].contractNumber).toBe(9101163496);
                        expect(result[1].frequency).toBe(BillingFrequencyType.Quarterly);
                    },
                    (error: any) => {
                        fail();
                    }
                );

        }));

        it(`Should throw an error if the we don't pass a value for the contract account number parameter`, (done) => {

            subject.getBillingFrequencies(null)
                .subscribe(
                    (result: any) => {
                        fail();
                    },
                    (error: any) => {
                        expect(error).toBe(`Contract Account Number was empty`);
                        done();
                    }
                );

        });

        it(`Should throw an error if the contract account number passed is not a valid number`, (done) => {

            subject.getBillingFrequencies('ClintEastWood')
                .subscribe(
                    (result: any) => {
                        fail();
                    },
                    (error: any) => {
                        expect(error).toBe(`Contract Account Number was not a valid number`);
                        done();
                    }
                );

        });

        it(`Should only call the underlying GET method once even when it is called multiple times (caching)`, async(() => {

            getCallSpy.calls.reset();
            getCallSpy.and.returnValue(Observable.of(MonthlyBillingGetBillingFrequenciesTestData.ClintEastwood));
            let getBillingFrequenciesSpy: jasmine.Spy = spyOn(subject, 'getBillingFrequencies').and.callThrough();

            subject
                .getBillingFrequencies('90428798')
                .subscribe(
                    (result: BillingFrequency[]) => {
                        expect(getBillingFrequenciesSpy).toHaveBeenCalledWith('90428798');
                        expect(getBillingFrequenciesSpy).toHaveBeenCalledTimes(1);
                        expect(getCallSpy).toHaveBeenCalledTimes(1);
                    }
            );

            setTimeout(() => {
                subject
                    .getBillingFrequencies('90428798')
                    .subscribe(
                        (result: BillingFrequency[]) => {
                            expect(getBillingFrequenciesSpy).toHaveBeenCalledWith('90428798');
                            expect(getBillingFrequenciesSpy).toHaveBeenCalledTimes(2);
                            expect(getCallSpy).toHaveBeenCalledTimes(1);
                        }
                );
            }, 50);

            setTimeout(() => {
                subject
                    .getBillingFrequencies('90428798')
                    .subscribe(
                        (result: BillingFrequency[]) => {
                            expect(getBillingFrequenciesSpy).toHaveBeenCalledWith('90428798');
                            expect(getBillingFrequenciesSpy).toHaveBeenCalledTimes(3);
                            expect(getCallSpy).toHaveBeenCalledTimes(1);
                        }
                );
            }, 100);

        }));

    });

});
