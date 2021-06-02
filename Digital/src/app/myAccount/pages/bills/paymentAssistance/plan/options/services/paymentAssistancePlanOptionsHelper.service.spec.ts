import { PaymentAssistancePlanOptionsRouteParamsModel } from './../models/routeParamsModel';
import cloneDeep  from 'lodash-es/cloneDeep';
import { PaymentAssistancePlanOptionsStateModel } from './../models/paymentAssistancePlanOptionsStateModel';
import { CancelMonthlyBillingResponse } from './../../../../../../services/settings/model/cancelMonthlyBillingResponse';
import { PaymentAssistancePlanOptionsHelperService } from './paymentAssistancePlanOptionsHelper.service';
import { TestBed } from '@angular/core/testing';
import { InstalmentOption, FrequencyOption, DateOption } from '../../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { InstalmentPlanFrequency, PaymentArrangementInstalmentSuggestion, GetPaymentArrangementInstalmentPlanOptionsParams } from '../../../../../../services/paymentScheme/paymentSchemeApi.service';
import { NowMock } from '../../../../../../services/mock';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { FuelChipDataModel } from '../../../models';
import { MauiFuelChipFuelType, MauiFuelChipFuelContext } from '../../../../../../maui/fuelChip';
import { PaymentExtensionContractEligibility } from '../../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { BillViewModel, ContractViewModel, AccountViewModel } from '../../../../../../services/account.service';
import { PaymentAssistancePlanOptionsSuggestionsModel } from '../suggestions/models';
import { MaxTimeOfDayModel } from '../../../../../usage/usageGraphHourly/usageGraphHourly.component';
import { DateRangeGenerator } from '../../optionsFrequency';
import { DateHelper } from '../../../../../../../shared/utils/dateHelper';

describe('Payment Assistance Plan Options Helper Service', () => {

    // Mock dates
    const nowMock: NowMock = new NowMock('');
    nowMock.setDate(2018, 3, 23);
    const today = nowMock.date().toDate();
    const tomorrow = moment(today).add(1, 'days').toDate();
    const todayPlus2Days = moment(today).add(2, 'days').toDate();
    const todayAsString = moment(today).format('YYYY-MM-DD');
    const tomorrowAsString = moment(tomorrow).format('YYYY-MM-DD');
    const tomorrowAsHumanString = DateHelper.toHumanString(moment(tomorrow));

    const accountNumber = '1200000000';
    const contractNumber = '1211111111';

    const instalmentSuggestion1: PaymentArrangementInstalmentSuggestion = {
        instalmentAmount: 100,
        numberOfInstalments: 5
    };
    const instalmentSuggestion2: PaymentArrangementInstalmentSuggestion = {
        instalmentAmount: 50,
        numberOfInstalments: 10
    };
    const instalmentSuggestions: PaymentArrangementInstalmentSuggestion[] = [
        instalmentSuggestion1,
        instalmentSuggestion2
    ];

    const instalmentMinAmount = 50;
    const instalmentMaxAmount = 500;

    const instalmentOptionWeekly = new InstalmentOption(InstalmentPlanFrequency.Weekly, today, tomorrow, instalmentSuggestions, instalmentMinAmount, instalmentMaxAmount);
    const instalmentOptionFortnightly = new InstalmentOption(InstalmentPlanFrequency.Fortnightly, today, tomorrow, instalmentSuggestions, instalmentMinAmount, instalmentMaxAmount);
    const alternativeInstalmentOptionFortnightly = new InstalmentOption(InstalmentPlanFrequency.Fortnightly, today, tomorrow, instalmentSuggestions, 0, instalmentMaxAmount);
    const instalmentOptionMonthly = new InstalmentOption(InstalmentPlanFrequency.Monthly, today, tomorrow, instalmentSuggestions, instalmentMinAmount, instalmentMaxAmount);

    const frequencyOptionWeekly = new FrequencyOption('Weekly', 'Weekly', false);
    const frequencyOptionFortnightly = new FrequencyOption('Fortnightly', 'Fortnightly', true);
    const frequencyOptionMonthly = new FrequencyOption('Monthly', 'Monthly', false);

    const routeParams = {
        contractAccountNumber: accountNumber,
        contractNumber: contractNumber
    };

    const activatedRouteStub = {
        get params(): Observable<{}> {
            return Observable.of(routeParams);
        },
        snapshot: null,
        url: null,
        queryParams: null,
        fragment: null,
        data: null,
        outlet: null,
        component: null,
        routeConfig: null,
        root: null,
        parent: null,
        firstChild: null,
        children: null,
        pathFromRoot: null,
        paramMap: null,
        queryParamMap: null
    };

    const overviewUrl = '/overview';
    const billsUrl = '/bills';

    const totalAmountDue = 500;
    const paymentExtensionContractEligibility = new PaymentExtensionContractEligibility(contractNumber, true, null, totalAmountDue, tomorrow);
    const fuelChipData = new FuelChipDataModel(accountNumber, contractNumber, MauiFuelChipFuelType.Electricity, null, paymentExtensionContractEligibility, MauiFuelChipFuelContext.None);
    const bill = new BillViewModel(totalAmountDue, totalAmountDue, today, tomorrow, false, false, null, null, tomorrow);
    const contract = new ContractViewModel(contractNumber, [bill]);
    contract.currentBillEndDate = tomorrow;
    const accounts = [
        new AccountViewModel(accountNumber, [contract])
    ];
    const unknownFrequencyOption = new FrequencyOption('unknown', 'unknown', false);
    const dateRangeGenerator = new DateRangeGenerator(nowMock);
    const instalmentOptions: InstalmentOption[] = [
        instalmentOptionWeekly,
        instalmentOptionFortnightly,
        instalmentOptionMonthly
    ];

    let sut: PaymentAssistancePlanOptionsHelperService;

    beforeEach(() => {

        Object.assign(activatedRouteStub, {
            snapshot: {
                queryParams: {
                    cancelDestinationUrl: overviewUrl
                }
            }
        });

        TestBed.configureTestingModule({
            providers: [
                PaymentAssistancePlanOptionsHelperService
            ]
        });

        sut = TestBed.get(PaymentAssistancePlanOptionsHelperService);

    });

    describe('getSubheading()', () => {

        describe('when instalmentOptions.length is 1', () => {
            const copy = 'Let us know how much you are able to pay each week.';
            it(`should return copy '${copy}'`, () => {
                expect(sut.getSubheading([instalmentOptionWeekly])).toBe(copy);
            });
        });

        describe('when instalmentOptions.length is NOT 1', () => {
            const copy = 'Let us know how often and how much you are able to pay.';
            it(`should return copy '${copy}'`, () => {
                expect(sut.getSubheading([instalmentOptionWeekly, instalmentOptionFortnightly])).toBe(copy);
            });
        });
    });

    describe('getCancelDestinationUrl()', () => {

        describe(`when cancelDestinationUrl is populated with '${overviewUrl}'`, () => {
            it(`should return '${overviewUrl}`, () => {
                expect(sut.getCancelDestinationUrl(overviewUrl)).toBe(overviewUrl);
            });
        });

        describe('when cancelDestiantion is not populated', () => {
            it(`should return '${billsUrl}'`, () => {
                expect(sut.getCancelDestinationUrl(null)).toBe(billsUrl);
            });

        });
    });

    describe('createRouteParamsModel()', () => {
        describe(`when cancelDestinationUrl is NOT populated`, () => {
            it('should return a model with the cancelDestination as null', () => {
                // ARRANGE
                activatedRouteStub.snapshot.queryParams['cancelDestinationUrl'] = null;
                // ASSERT
                expect(sut.createRouteParamsModel(activatedRouteStub, routeParams)).toEqual({
                    accountNumber: accountNumber,
                    contractNumber: contractNumber,
                    cancelDestinationUrl: null
                });
            });
        });

        describe(`when cancelDestinationUrl is populated with ${overviewUrl}`, () => {
            it(`should return a model with the cancelDestination as '${overviewUrl}`, () => {
                expect(sut.createRouteParamsModel(activatedRouteStub, routeParams)).toEqual({
                    accountNumber: accountNumber,
                    contractNumber: contractNumber,
                    cancelDestinationUrl: overviewUrl
                });
            });
        });
    });

    describe('createOptionsTotalModel()', () => {
        it(`should create the model with totalAmountDue: '${totalAmountDue}, fuelType: '${MauiFuelChipFuelType.Electricity}', currentBillEndDate: '${tomorrow}'`, () => {
            expect(sut.createOptionsTotalModel(fuelChipData, contract)).toEqual({
                totalAmountDue: totalAmountDue,
                fuelType: MauiFuelChipFuelType.Electricity,
                currentBillEndDate: tomorrow
            });
        });
    });

    describe('getContract()', () => {
        describe('when the contract is found', () => {
            it('should return the contract', () => {
                expect(sut.getContract(accounts, accountNumber, contractNumber)).toEqual(contract);
            });
        });

        describe('when the contract is NOT found', () => {
            it('should return undefined', () => {
                expect(sut.getContract(accounts, accountNumber, '')).toBeUndefined();
            });
        });
    });

    describe('getSelectedInstalmentPlanFrequency()', () => {
        describe('when optionsState', () => {
            describe(`is populated with a frequency of ${InstalmentPlanFrequency.Monthly}`, () => {
                it(`should return '${InstalmentPlanFrequency.Monthly}'`, () => {
                    const optionsState: PaymentAssistancePlanOptionsStateModel = {
                        accountNumber: accountNumber,
                        contractNumber: contractNumber,
                        frequency: InstalmentPlanFrequency.Monthly.toString(),
                        startDate: today,
                        instalmentMinAmount: instalmentMinAmount
                    };
                    expect(sut.getSelectedInstalmentPlanFrequency(null, optionsState)).toBe(InstalmentPlanFrequency.Monthly);
                });
            });
            describe('is NOT populated', () => {
                describe('when instalmentOptions.length > 1', () => {
                    it(`should return '${InstalmentPlanFrequency.Fortnightly}'`, () => {
                        expect(sut.getSelectedInstalmentPlanFrequency(instalmentOptions)).toBe(InstalmentPlanFrequency.Fortnightly);
                    });
                });
                describe('when instalmentOptions.length is 1', () => {
                    it(`should return '${InstalmentPlanFrequency.Weekly}'`, () => {
                        const instalmentOptionsSingleItem = [
                            instalmentOptionWeekly
                        ];
                        expect(sut.getSelectedInstalmentPlanFrequency(instalmentOptionsSingleItem)).toBe(InstalmentPlanFrequency.Weekly);
                    });
                });
            });

        });
    });

    describe('getFrequencyOptions()', () => {
        describe(`when instalmentPlanFrequency is ${InstalmentPlanFrequency.Fortnightly}`, () => {
            it(`should set the selected property of ${InstalmentPlanFrequency.Weekly} option to false, ${InstalmentPlanFrequency.Fortnightly} option to true`, () => {
                expect(sut.getFrequencyOptions(instalmentOptions, InstalmentPlanFrequency.Fortnightly)).toEqual([frequencyOptionWeekly, frequencyOptionFortnightly, frequencyOptionMonthly]);
            });
        });
    });

    describe('getSelectedFrequencyOption()', () => {
        describe(`when the '${InstalmentPlanFrequency.Fortnightly}' frequencyOption has its selected property set to true`, () => {
            it(`should return the '${InstalmentPlanFrequency.Fortnightly}' FrequencyOption`, () => {
                const frequencyOptions: FrequencyOption[] = [
                    frequencyOptionWeekly,
                    frequencyOptionFortnightly
                ];
                expect(sut.getSelectedFrequencyOption(frequencyOptions)).toEqual(frequencyOptionFortnightly);
            });
        });
    });

    describe('sortInstalmentSuggestionsByNumberOfInstalments()', () => {
        describe('when an instalmentOption is supplied', () => {
            it('should sort the instalmentSuggestions by the numberOfInstalments property', () => {
                const unorderedInstalmentOption: InstalmentOption = cloneDeep(instalmentOptionWeekly);
                unorderedInstalmentOption.instalmentSuggestions = [
                    instalmentSuggestion2,
                    instalmentSuggestion1
                ];
                const orderedPaymentArrangementInstalmentSuggestions: PaymentArrangementInstalmentSuggestion[] = [
                    instalmentSuggestion1,
                    instalmentSuggestion2
                ];

                expect(sut.sortInstalmentSuggestionsByNumberOfInstalments(unorderedInstalmentOption)).toEqual(orderedPaymentArrangementInstalmentSuggestions);
            });

        });

    });

    describe('getSelectedInstalmentOption()', () => {
        describe(`when frequencyOption of ${frequencyOptionWeekly.text} is passed`, () => {
            it(`should return the ${frequencyOptionWeekly.text} InstalmentOption`, () => {
                expect(sut.getSelectedInstalmentOption(instalmentOptions, frequencyOptionWeekly)).toEqual(instalmentOptionWeekly);
            });
        });
        describe(`when an unknown frequencyOption is passed`, () => {
            it(`should return undefined`, () => {
                expect(sut.getSelectedInstalmentOption(instalmentOptions, unknownFrequencyOption)).toBeUndefined();
            });
        });
    });

    describe('getSelectedSuggestionInstalmentAmount()', () => {
        describe(`when the selectedNumberOfInstalments is '${instalmentSuggestion1.numberOfInstalments}'`, () => {
            it(`should return an instalmentAmount of '${instalmentSuggestion1.instalmentAmount}'`, () => {
                const suggestionsModel: PaymentAssistancePlanOptionsSuggestionsModel = {
                    selectedNumberOfInstalments: instalmentSuggestion1.numberOfInstalments,
                    instalmentSuggestions: instalmentSuggestions,
                    frequencyOption: null,
                    maxSuggestionsToShow: null
                };
                expect(sut.getSelectedSuggestionInstalmentAmount(suggestionsModel)).toBe(instalmentSuggestion1.instalmentAmount);
            });
        });
        describe(`when the selectedNumberOfInstalments does not exist in the instalmentSuggestions`, () => {
            it(`should return undefined`, () => {
                const suggestionsModel: PaymentAssistancePlanOptionsSuggestionsModel = {
                    selectedNumberOfInstalments: null,
                    instalmentSuggestions: instalmentSuggestions,
                    frequencyOption: null,
                    maxSuggestionsToShow: null
                };
                expect(sut.getSelectedSuggestionInstalmentAmount(suggestionsModel)).toBeUndefined();
            });
        });
    });

    describe('updateDateOptions()', () => {
        describe(`when the value of '${frequencyOptionFortnightly.text}' is passed`, () => {
            it(`should set the selected property of the '${frequencyOptionFortnightly.text}' DateOption to true and rest to false`, () => {
                // ARRANGE
                const dateOptions: DateOption[] = [
                    new DateOption(frequencyOptionWeekly.text, frequencyOptionWeekly.text, false, true),
                    new DateOption(frequencyOptionFortnightly.text, frequencyOptionFortnightly.text, false, false),
                ];

                const expectedDateOptions: DateOption[] = [
                    new DateOption(frequencyOptionWeekly.text, frequencyOptionWeekly.text, false, false),
                    new DateOption(frequencyOptionFortnightly.text, frequencyOptionFortnightly.text, false, true),
                ];

                // ACT
                sut.updateDateOptions(dateOptions, frequencyOptionFortnightly.text);

                // ASSERT
                expect(dateOptions).toEqual(expectedDateOptions);
            });
        });

        describe(`when an unknown value is passed`, () => {
            it(`should set the selected property of all DateOptions to false`, () => {
                // ARRANGE
                let dateOptions: DateOption[] = [
                    new DateOption(frequencyOptionWeekly.text, frequencyOptionWeekly.text, false, true),
                    new DateOption(frequencyOptionFortnightly.text, frequencyOptionFortnightly.text, false, false),
                ];

                const expectedDateOptions: DateOption[] = [
                    new DateOption(frequencyOptionWeekly.text, frequencyOptionWeekly.text, false, false),
                    new DateOption(frequencyOptionFortnightly.text, frequencyOptionFortnightly.text, false, false),
                ];

                // ACT
                sut.updateDateOptions(dateOptions, '');

                // ASSERT
                expect(dateOptions).toEqual(expectedDateOptions);
            });
        });

    });

    describe('getInstalmentMinAmount()', () => {
        describe(`when a FrequencyOption of '${frequencyOptionWeekly.text}' is passed`, () => {
            it(`should return a instalmentMinAmount of '${instalmentOptionWeekly.instalmentMinAmount}'`, () => {
                expect(sut.getInstalmentMinAmount(instalmentOptions, frequencyOptionWeekly)).toBe(instalmentOptionWeekly.instalmentMinAmount);
            });
        });
        describe(`when a unknown FrequencyOption is passed`, () => {
            it(`should return undefined`, () => {
               expect(sut.getInstalmentMinAmount(instalmentOptions, unknownFrequencyOption)).toBeUndefined();
            });
        });
    });

    describe('getInstalmentMaxAmount()', () => {
        describe(`when a FrequencyOption of '${frequencyOptionWeekly.text}' is passed`, () => {
            it(`should return a instalmentMaxAmount of '${instalmentOptionWeekly.instalmentMaxAmount}'`, () => {
                expect(sut.getInstalmentMaxAmount(instalmentOptions, frequencyOptionWeekly)).toBe(instalmentOptionWeekly.instalmentMaxAmount);
            });
        });
        describe(`when a unknown FrequencyOption is passed`, () => {
            it(`should return undefined`, () => {
                expect(sut.getInstalmentMaxAmount(instalmentOptions, unknownFrequencyOption)).toBeUndefined();
            });
        });
    });

    describe('formatInstalmentAmountPlaceholder()', () => {
        describe('when the amount is 10', () => {
            const amount = 10;
            const copy = 'Min. $10.00';
            it(`should return '${copy}'`, () => {
                expect(sut.formatInstalmentAmountPlaceholder(amount)).toBe(copy);
            });
        });
    });

    describe('getSnapshotParam()', () => {
        describe(`when param doesn't exist`, () => {
            it(`should return undefined`, () => {
                expect(sut.getSnapshotParam(activatedRouteStub, '')).toBeUndefined();
            });
        });
        const param = 'cancelDestinationUrl';
        describe(`when param is '${param}'`, () => {
            it(`should return ${overviewUrl}`, () => {
                expect(sut.getSnapshotParam(activatedRouteStub, param)).toBe(overviewUrl);
            });
        });
        describe(`when the route.snapshot property is not populated`, () => {
            it(`should return null`, () => {
                activatedRouteStub.snapshot = undefined;
                expect(sut.getSnapshotParam(activatedRouteStub, param)).toBeNull();
            });
        });
    });

    describe('createInstalmentPlanOptionsParams()', () => {
        describe(`when a startDate of '${todayAsString} and frequency of ${frequencyOptionWeekly.value} is passed in`, () => {
            it(`should populate the model with suggestInstalments: 'true', startDate: '${today}', frequency: '${InstalmentPlanFrequency.Weekly}'`, () => {
                expect(sut.createInstalmentPlanOptionsParams(todayAsString, frequencyOptionWeekly)).toEqual(<GetPaymentArrangementInstalmentPlanOptionsParams> {
                    suggestInstalments: true,
                    startDate: today,
                    frequency: InstalmentPlanFrequency.Weekly
                });
            });
        });

    });

    describe('getSelectedDateOptionDate()', () => {
        describe('when the DateOption of today is selected', () => {
            it('should return today as Date', () => {
                let dateOptions: DateOption[] = [
                    new DateOption(todayAsString, todayAsString, false, true),
                    new DateOption(tomorrowAsString, tomorrowAsString, false, false),
                ];
                expect(sut.getSelectedDateOptionDate(dateOptions)).toEqual(today);
            });
        });
        describe('when the DateOptions do not have a DateOption with a selected property as true', () => {
            it('should return undefined', () => {
                let dateOptions: DateOption[] = [
                    new DateOption(todayAsString, todayAsString, false, false),
                    new DateOption(tomorrowAsString, tomorrowAsString, false, false),
                ];
                expect(sut.getSelectedDateOptionDate(dateOptions)).toBeUndefined();
            });
        });
    });

    describe('createCustomAmountModel()', () => {
        const placeholder = 'placeholder';
        beforeEach(() => {
            spyOn(sut, 'getInstalmentMaxAmount').and.returnValue(instalmentMaxAmount);
            spyOn(sut, 'formatInstalmentAmountPlaceholder').and.returnValue(placeholder);
        });

        describe('when optionsState', () => {
            describe(`is populated and has a property of instalmentMinAmount set to '${instalmentMinAmount}'`, () => {
                it(`should create the model with a instalmentMinAmount of '${instalmentMinAmount}'`, () => {
                    const optionsState: PaymentAssistancePlanOptionsStateModel = {
                        accountNumber: accountNumber,
                        contractNumber: contractNumber,
                        frequency: frequencyOptionWeekly.value,
                        startDate: today,
                        instalmentMinAmount: instalmentMinAmount
                    };
                    expect(sut.createCustomAmountModel(instalmentOptions, optionsState, frequencyOptionWeekly, today)).toEqual({
                        frequency: frequencyOptionWeekly.value,
                        amount: 0,
                        amountInput: '',
                        placeholder: placeholder,
                        instalmentMinAmount: instalmentMinAmount,
                        instalmentMaxAmount: instalmentMaxAmount,
                        disabled: false,
                        currentBillEndDate: today,
                        toValidate: true
                    });
                });
            });
            describe('is NOT populated', () => {
                it(`should create the model with a instalmentMinAmount of '${instalmentMinAmount + 1}'`, () => {
                    spyOn(sut, 'getInstalmentMinAmount').and.returnValue(instalmentMinAmount + 1);
                    expect(sut.createCustomAmountModel(instalmentOptions, null, frequencyOptionWeekly, today)).toEqual({
                        frequency: frequencyOptionWeekly.value,
                        amount: 0,
                        amountInput: '',
                        placeholder: placeholder,
                        instalmentMinAmount: instalmentMinAmount + 1,
                        instalmentMaxAmount: instalmentMaxAmount,
                        disabled: false,
                        currentBillEndDate: today,
                        toValidate: true
                    });
                });
            });
       });

    });

    describe('createOptionsFrequencyModel()', () => {
        const dateOptions = [new DateOption(todayAsString, todayAsString, false, true)];
        const frequencyOptions = [frequencyOptionWeekly, frequencyOptionFortnightly];
        beforeEach(() => {
            spyOn(sut, 'getSelectedInstalmentPlanFrequency').and.returnValue(InstalmentPlanFrequency.Weekly);
            spyOn(sut, 'getFrequencyOptions').and.returnValue(frequencyOptions);
            spyOn(sut, 'getSelectedFrequencyOption').and.returnValue(frequencyOptionWeekly);
            spyOn(sut, 'getDateOptions').and.returnValue(dateOptions);
        });
        it('should return the model', () => {
            expect(sut.createOptionsFrequencyModel(dateRangeGenerator, instalmentOptions, null)).toEqual({
                dateOptions: dateOptions,
                selectedFrequencyOption: frequencyOptionWeekly,
                frequencyOptions: frequencyOptions,
                dateOptionsDisabled: false,
                dateOptionsHasError: false,
                showFrequencyOptions: true
            });
        });
    });

    describe('getDateOptions()', () => {
        describe('when optionsState', () => {
            describe(`is populated with a property startDate set to '${tomorrow}'`, () => {
                it('should create 3 DateOptions for This week, today and tomorrow with tomorrow as selected', () => {
                    const optionsState: PaymentAssistancePlanOptionsStateModel = {
                        accountNumber: accountNumber,
                        contractNumber: contractNumber,
                        frequency: InstalmentPlanFrequency.Monthly.toString(),
                        startDate: tomorrow,
                        instalmentMinAmount: instalmentMinAmount
                    };
                    const expectedDateOptions: DateOption[] = [
                        new DateOption( 'This week',  'This week', true, false),
                        new DateOption(todayAsString, 'Today', false, false),
                        new DateOption(tomorrowAsString, tomorrowAsHumanString, false, true)
                    ];
                    expect(sut.getDateOptions(dateRangeGenerator, instalmentOptions, frequencyOptionWeekly, optionsState)).toEqual(expectedDateOptions);
                });
            });

            describe('is NOT populated', () => {
                it('should create 3 DateOptions for This week, today and tomorrow', () => {
                    const expectedDateOptions: DateOption[] = [
                        new DateOption( 'This week',  'This week', true, false),
                        new DateOption(todayAsString, 'Today', false, true),
                        new DateOption(tomorrowAsString, tomorrowAsHumanString, false, false)
                    ];
                    expect(sut.getDateOptions(dateRangeGenerator, instalmentOptions, frequencyOptionWeekly)).toEqual(expectedDateOptions);
                });
            });

        });

    });

    describe('createInstalmentPlanParameters()', () => {
        it(`should return a InstalmentPlanParameters model with contractNumber: '${contractNumber}, frequency: '${frequencyOptionWeekly.value}, instalmentAmount: '${instalmentMinAmount}, startDate: '${today}'`, () => {
            const paymentAssistancePlanOptionsRouteParamsModel: PaymentAssistancePlanOptionsRouteParamsModel = {
                accountNumber: accountNumber,
                contractNumber: contractNumber,
                cancelDestinationUrl: null
            };
            expect(sut.createInstalmentPlanParameters(paymentAssistancePlanOptionsRouteParamsModel, frequencyOptionWeekly.value, instalmentMinAmount, today)).toEqual({
                contractNumber: contractNumber,
                frequency: frequencyOptionWeekly.value,
                instalmentAmount: instalmentMinAmount,
                startDate: today
            });
        });
    });
});
