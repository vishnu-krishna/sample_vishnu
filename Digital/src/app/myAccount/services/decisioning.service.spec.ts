import { async, inject, TestBed } from '@angular/core/testing';
import { empty, HashMap, set } from '@typed/hashmap';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Mock } from 'ts-mocks';
import { ApiService, BusinessPartnerModel, ContactDetailModel } from './../../shared/service/api.service';
import { Now } from './../../shared/service/now.service';
import { AccountViewModel, IAccountServiceMA } from './account.service';
import { IDecisioningService } from './contract/idecisioning.service';
import { DecisioningService } from './decisioning.service';
import { FeatureFlagTypes } from './featureFlag.constants';
import { FeatureFlagService } from './featureFlag.service';
import { LocalAlertDismissablesModel, LocalStorageModel, LocalStorageService } from './localStorage.service';
import { PaymentMethod } from './settings/model/paymentMethod';
import { IPaymentMethodsService } from './settings/paymentMethods.service.interface';

describe('Decisioning Service', () => {

    let subject: IDecisioningService;

    // Mock Containers
    let mockApiService: Mock<ApiService>;
    let mockAccountService: Mock<IAccountServiceMA>;
    let mockPaymentMethodsService: Mock<IPaymentMethodsService>;
    let mockLocalStorageService: Mock<LocalStorageService>;
    let mockFeatureFlagService: Mock<FeatureFlagService>;
    let mockNowService: Mock<Now>;

    // Spies
    let smsPayFeatureFlagSpy: jasmine.Spy;
    let getAccountsSpy: jasmine.Spy;
    let nowDateSpy: jasmine.Spy;
    let localStorageGetKeys: jasmine.Spy;

    let mockBusinessPartnerModel: BusinessPartnerModel;
    let mockContactDetailModel: ContactDetailModel;
    let mockLocalStorageModel: LocalStorageModel;
    let mockLocalAlertDismissables: LocalAlertDismissablesModel;
    let mockSmsPayBannerClose: HashMap<string, Boolean>;

    mockSmsPayBannerClose = empty<string, Boolean>();
    mockSmsPayBannerClose = set('7013149351', true, mockSmsPayBannerClose);
    mockLocalAlertDismissables = { isSmsPayBannerClose : mockSmsPayBannerClose };
    mockLocalStorageModel = { localAlertDismissables: mockLocalAlertDismissables };

    mockContactDetailModel = {
        hasMultipleBusinessPartners: false,
        businessPartners: [mockBusinessPartnerModel]
    };

    beforeAll(() => {

        // Create mocks
        mockApiService = new Mock<ApiService>();
        mockAccountService = new Mock<IAccountServiceMA>();
        mockPaymentMethodsService = new Mock<IPaymentMethodsService>();
        mockLocalStorageService = new Mock<LocalStorageService>();
        mockFeatureFlagService = new Mock<FeatureFlagService>();
        mockNowService = new Mock<Now>();

        // Setup the methods we need to spy on for these tests
        smsPayFeatureFlagSpy = mockFeatureFlagService
            .setup((x) => x.featureFlagged)
            .is(
                (featureFlagType: FeatureFlagTypes) => {
                    if (featureFlagType === FeatureFlagTypes.smsPayEnabled) {
                        return Observable.of(true);
                    } else {
                        return Observable.of(false);
                    }
                }
            ).Spy;

        getAccountsSpy = mockAccountService
            .setup((x) => x.getAccounts)
            .is(() => {
                return Observable.of(null);
            }).Spy;

        nowDateSpy = mockNowService
            .setup((x) => x.date)
            .is(() => {
                return moment();
            }).Spy;

        localStorageGetKeys = mockLocalStorageService
            .setup((x) => x.getKeys)
            .is(() => {
                return mockLocalStorageModel;
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
                    provide: IAccountServiceMA,
                    useValue: mockAccountService.Object
                },
                {
                    provide: IPaymentMethodsService,
                    useValue: mockPaymentMethodsService.Object
                },
                {
                    provide: LocalStorageService,
                    useValue: mockLocalStorageService.Object
                },
                {
                    provide: FeatureFlagService,
                    useValue: mockFeatureFlagService.Object
                },
                {
                    provide: Now,
                    useValue: mockNowService.Object
                },
                {
                    provide: IDecisioningService,
                    useClass: DecisioningService,
                    deps: [
                        ApiService,
                        IAccountServiceMA,
                        IPaymentMethodsService,
                        LocalStorageService,
                        FeatureFlagService,
                        Now
                    ]
                }
            ]
        });
    });

    beforeEach(
        inject([
            IDecisioningService,
        ], (
            decisioningService: IDecisioningService
        ) => {
            subject = decisioningService;
        }));

    describe(`Should have a decisioning service with its dependencies that we can test with`, () => {
        it(`Should be defined`, () => {
            expect(subject).toBeDefined();
        });
    });

    describe('checkSmsPayBannerClosedByUser', () => {
        it('show sms pay banner when local storage value is not present', async(() => {
            let account = [new AccountViewModel('123123')];
            subject.accountList = account;
            let result = subject.checkSmsPayBannerClosedByUser();
            expect(result).toBeFalsy();
        }));

        it('should show smsPay banner local storage have the different account number for sms pay banner', async(() => {
            let account = [new AccountViewModel('11123')];
            subject.accountList = account;
            let result = subject.checkSmsPayBannerClosedByUser();
            expect(result).toBeFalsy();
        }));

        it('should not show smsPay banner when local storage have the same account number key for sms pay banner', async(() => {
            let account = [new AccountViewModel('7013149351')];
            subject.accountList = account;
            let result = subject.checkSmsPayBannerClosedByUser();
            expect(result).toBeTruthy();
        }));
    });

    describe('validateBannerVisibility', () => {
        it('do not show sms pay banner when all the accounts are in sms pay - 1 Account scenario', async(() => {
            let account = [new AccountViewModel('123123')];
            let smspayAccountList: number[] = [123123];
            subject.accountList = account;
            subject.smsPayAccountNumberList = smspayAccountList;
            let result = subject.validateBannerVisibility();
            expect(result).toBeFalsy();
        }));

        it('do not show sms pay banner when all the accounts are in sms pay - multiple Account scenario', async(() => {
            let account = [new AccountViewModel('123123'), new AccountViewModel('123124'), new AccountViewModel('123125')];
            let smspayAccountList: number[] = [123123, 123124, 123125];
            subject.accountList = account;
            subject.smsPayAccountNumberList = smspayAccountList;
            let result = subject.validateBannerVisibility();
            expect(result).toBeFalsy();
        }));

        it('show sms pay banner when all the accounts are in sms pay - 1 Account scenario', async(() => {
            let account = [new AccountViewModel('123123')];
            let smspayAccountList: number[] = [123124];
            subject.accountList = account;
            subject.smsPayAccountNumberList = smspayAccountList;
            let result = subject.validateBannerVisibility();
            expect(result).toBeTruthy();
        }));

        it('show sms pay banner when all the accounts are in sms pay - multiple Account scenario', async(() => {
            let account = [new AccountViewModel('123123'), new AccountViewModel('123124'), new AccountViewModel('123125')];
            let smspayAccountList: number[] = [123123, 123124];
            subject.accountList = account;
            subject.smsPayAccountNumberList = smspayAccountList;
            let result = subject.validateBannerVisibility();
            expect(result).toBeTruthy();
        }));
    });

    describe('getSmsPayAccountNumberList', () => {
        it('get the list of account numbers with one touch pay - single payment method' , async(() => {
            let paymentMethods = [new PaymentMethod()];
            paymentMethods[0].oneTouchPayContractAccounts = [123123, 123124];
            subject.getSmsPayAccountNumberList(paymentMethods);
            expect(subject.smsPayAccountNumberList).toEqual(paymentMethods[0].oneTouchPayContractAccounts);
        }));

        it('get the list of account numbers with one touch pay - Multi payment method' , async(() => {
            let paymentMethod1 = new PaymentMethod();
            paymentMethod1.oneTouchPayContractAccounts = [123123, 123124];
            let paymentMethod2 = new PaymentMethod();
            paymentMethod2.oneTouchPayContractAccounts = [123125, 123126];
            let paymentMethods = [paymentMethod1, paymentMethod2];
            let smsPayAccountList = paymentMethod1.oneTouchPayContractAccounts.concat(paymentMethod2.oneTouchPayContractAccounts);
            subject.getSmsPayAccountNumberList(paymentMethods);
            expect(subject.smsPayAccountNumberList).toEqual(smsPayAccountList);
        }));
    });

    describe('SMS Entry point for customers', () => {

        it('Should return FALSE if there are no accounts', async(() => {
            subject.isSmsPayEntryPointAvailableForCustomer().subscribe((result) => {
                expect(result).toBe(false);
            });
        }));

        // Extensive use of FOR loops below to help us test all 80 scenarios

        for (let flagCount = 0; flagCount <= 1; flagCount++) {

            let featureFlag: boolean = (flagCount === 1);

            /*
                Helper to use with scenarios that would be TRUE if the feature flag was ON (The tests
                would normally expect true, but if the feature flag is OFF then they always expect FALSE)
            */
            let expectedResultWithFlagOff: boolean = (!featureFlag ? false : true);

            describe(`With the feature flag set to ${featureFlag}`, () => {

                describe(`Before the launch date of 22/11/2017 with the feature flag set to: ${featureFlag}`, () => {

                    for (let count = 0; count <= 9; count++ ) {
                        it(`Should return false for an account number ending in ${count}`, async(() => {
                            smsPayFeatureFlagSpy.and.returnValue(Observable.of(featureFlag));
                            let fakeData: AccountViewModel[] = [
                                new AccountViewModel(`12345${count}`)
                            ];
                            nowDateSpy.and.returnValue(moment('2017-10-19T00:00:00'));
                            getAccountsSpy.and.returnValue(Observable.of(fakeData));
                            subject.isSmsPayEntryPointAvailableForCustomer().subscribe((result) => {
                                expect(result).toBe(false);
                            });
                        }));
                    }

                });

                describe(`For 10% of customers on 27/11/2017 (between 22/11/2017 and 06/12/2017) with the feature flag set to: ${featureFlag}`, () => {

                    it(`Should return ${expectedResultWithFlagOff} for an account number ending in 0`, async(() => {
                        smsPayFeatureFlagSpy.and.returnValue(Observable.of(featureFlag));
                        let fakeData: AccountViewModel[] = [
                            new AccountViewModel(`123450`)
                        ];
                        nowDateSpy.and.returnValue(moment('2017-11-27T00:00:00'));
                        getAccountsSpy.and.returnValue(Observable.of(fakeData));
                        subject.isSmsPayEntryPointAvailableForCustomer().subscribe((result) => {
                            expect(result).toBe(expectedResultWithFlagOff);
                        });
                    }));

                    for (let count = 1; count <= 9; count++ ) {
                        it(`Should return false for an account number ending in ${count}`, async(() => {
                            smsPayFeatureFlagSpy.and.returnValue(Observable.of(featureFlag));
                            let fakeData: AccountViewModel[] = [
                                new AccountViewModel(`12345${count}`)
                            ];
                            nowDateSpy.and.returnValue(moment('2017-11-27T00:00:00'));
                            getAccountsSpy.and.returnValue(Observable.of(fakeData));
                            subject.isSmsPayEntryPointAvailableForCustomer().subscribe((result) => {
                                expect(result).toBe(false);
                            });
                        }));
                    }

                });

                describe(`For 50% of customers on 25/12/2017 (between 06/12/2017 and 12/01/2018) with the feature flag set to: ${featureFlag}`, () => {

                    for (let count = 0; count < 5; count++ ) {
                        it(`Should return ${expectedResultWithFlagOff} for an account number ending in ${count}`, async(() => {
                            smsPayFeatureFlagSpy.and.returnValue(Observable.of(featureFlag));
                            let fakeData: AccountViewModel[] = [
                                new AccountViewModel(`12345${count}`)
                            ];
                            nowDateSpy.and.returnValue(moment('2017-12-25T00:00:00'));
                            getAccountsSpy.and.returnValue(Observable.of(fakeData));
                            subject.isSmsPayEntryPointAvailableForCustomer().subscribe((result) => {
                                expect(result).toBe(expectedResultWithFlagOff);
                            });
                        }));
                    }

                    for (let count = 5; count <= 9; count++ ) {
                        it(`Should return false for an account number ending in ${count}`, async(() => {
                            smsPayFeatureFlagSpy.and.returnValue(Observable.of(featureFlag));
                            let fakeData: AccountViewModel[] = [
                                new AccountViewModel(`12345${count}`)
                            ];
                            nowDateSpy.and.returnValue(moment('2017-12-25T00:00:00'));
                            getAccountsSpy.and.returnValue(Observable.of(fakeData));
                            subject.isSmsPayEntryPointAvailableForCustomer().subscribe((result) => {
                                expect(result).toBe(false);
                            });
                        }));
                    }

                });

                describe(`For 100% of customers after 10/01/2018 with the feature flag set to: ${featureFlag}`, () => {

                    for (let count = 0; count <= 9; count++ ) {
                        it(`Should return ${expectedResultWithFlagOff} for an customers (account number ending in ${count})`, async(() => {
                            smsPayFeatureFlagSpy.and.returnValue(Observable.of(featureFlag));
                            let fakeData: AccountViewModel[] = [
                                new AccountViewModel(`12345${count}`)
                            ];
                            nowDateSpy.and.returnValue(moment('2018-01-26T00:00:00'));
                            getAccountsSpy.and.returnValue(Observable.of(fakeData));
                            subject.isSmsPayEntryPointAvailableForCustomer().subscribe((result) => {
                                expect(result).toBe(expectedResultWithFlagOff);
                            });
                        }));
                    }

                });

            });

        }

    });

});
