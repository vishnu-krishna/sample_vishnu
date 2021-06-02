import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Mock } from 'ts-mocks/lib';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { PaymentAssistancePlanOptionsStateModel } from './models/paymentAssistancePlanOptionsStateModel';
import { PaymentAssistancePlanOptionsSuggestionsModel } from './suggestions/models/suggestionsModel';
import { PaymentAssistancePlanOptionsFrequencyModel } from './../optionsFrequency/models/optionsFrequencyModel';
import { DateRangeGenerator } from './../optionsFrequency/dateRangeGenerator/dateRangeGenerator';
import { BillViewModel, ContractViewModel, AccountViewModel, IAccountServiceMA } from './../../../../../services/account.service';
import { PaymentAssistancePlanOptionsTotalModel } from './../optionsTotal/models/optionsTotalModel';
import { PaymentArrangementInstalmentSuggestion, IPaymentSchemeApi, PaymentSchemeApiService, InstalmentPlanFrequency } from './../../../../../services/paymentScheme/paymentSchemeApi.service';
import { PaymentAssistancePlanOptionsComponent } from './paymentAssistancePlanOptions.component';
import { PaymentAssistancePlanOptionsModule } from './paymentAssistancePlanOptions.module';
import { FuelChipService, ClassifiedFuelChips } from '../../services';
import { GetPaymentArrangementInstalmentPlanOptionsParams, InstalmentPlanParameters } from '../../../../../services/paymentScheme/paymentSchemeApi.service';
import { FuelChipDataModel } from '../../models';
import { MauiFuelChipFuelType, MauiFuelChipFuelContext } from '../../../../../maui/fuelChip';
import { PaymentAssistancePlanOptionsRouteParamsModel } from './models';
import { InstalmentOption, IInstalmentPlanOptionsService, FrequencyOption, DateOption } from '../../../../../services/paymentScheme/instalmentPlanOptions.service';
import { DateHelper } from '../../../../../../shared/utils/dateHelper';
import { FuelChipData } from '../../extend/eligibility/fuelChipData';
import { GenericStateService } from '../../../../../services/generics/genericState.service';
import { GenericStateServiceMockFactory } from './../../../../../services/generics/tsmocks/genericState.service.tsmock';
import { Spied } from '../../../../../services/generics/tsmocks/spied.type';
import { NowMock } from '../../../../../services/mock';
import { Now } from '../../../../../../shared/service/now.service';
import { PaymentExtensionContractEligibility } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { IInstalmentPlanSummaryService, InstalmentPlanSummaryResults } from '../../../../../services/paymentScheme/instalmentPlanSummary.service';
import { cloneDeep } from 'lodash';
import { DataLayerService } from '../../../../../../shared/service/dataLayer.service';
import { DataLayerStubService } from '../../../../../../test/stubs/dataLayer.stub.service';

describe('Payment Assistance Plan Options Component', () => {
    // Mock dates
    const nowMock: NowMock = new NowMock('');
    nowMock.setDate(2018, 3, 23);
    const today = nowMock.date().toDate();
    const tomorrow = moment(today).add(1, 'days').toDate();
    const tomorrowAsString = moment(tomorrow).format('YYYY-MM-DD');

    const dateRangeGenerator = new DateRangeGenerator(nowMock);

    // Test seed
    const accountNumber = '1200000000';
    const contractNumber = '1211111111';
    const totalAmountDue = 500;
    const paymentExtensionContractEligibility = new PaymentExtensionContractEligibility(contractNumber, true, null, totalAmountDue, tomorrow);
    const fuelChipData = new FuelChipDataModel(accountNumber, contractNumber, MauiFuelChipFuelType.Electricity, null, paymentExtensionContractEligibility, MauiFuelChipFuelContext.None);
    const classifiedFuelChips = new ClassifiedFuelChips([fuelChipData], [], []);
    const address = 'test address';
    const bill = new BillViewModel(totalAmountDue, totalAmountDue, today, tomorrow, false, false, null, null, tomorrow);
    const contract = new ContractViewModel(contractNumber, [bill]);
    contract.address = address;
    contract.currentBillEndDate = tomorrow;
    const accounts = [
        new AccountViewModel(accountNumber, [contract])
    ];
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
    const frequencyOptions = [
        frequencyOptionWeekly,
        frequencyOptionFortnightly,
        frequencyOptionMonthly
    ];

    let instalmentOptions: InstalmentOption[];
    let dateOptionsWeekly: DateOption[];
    let dateOptionsFortnightly: DateOption[];

    let comp: PaymentAssistancePlanOptionsComponent;
    let fixture: ComponentFixture<PaymentAssistancePlanOptionsComponent>;
    let de: DebugElement;

    const routeParams = {
        contractAccountNumber: accountNumber,
        contractNumber: contractNumber
    };

    const cancelDestinationUrl = '/overview';
    const activatedRouteStub = {
        get params(): Observable<{}> {
            return Observable.of(routeParams);
        },
        snapshot: null
    };

    const maxSuggestionsToShow = 3;
    const customInstalmentPlanValue = 99999;
    let router: Router;
    let activatedRoute: ActivatedRoute;

    // Typesafe mocks
    const accountMockService = new Mock<IAccountServiceMA>();
    let accountServiceGetAccountsSpy: jasmine.Spy;
    const fuelChipMockService = new Mock<FuelChipService>();
    let fuelChipServiceInitSpy: jasmine.Spy;
    let fuelChipServiceGetFuelChipSpy: jasmine.Spy;
    const instalmentPlanOptionsMockService = new Mock<IInstalmentPlanOptionsService>();
    let instalmentPlanOptionsServiceGetInstalmentOptions: jasmine.Spy;
    const instalmentPlanSummaryMockService = new Mock<IInstalmentPlanSummaryService>();
    let instalmentPlanSummaryServiceInitInstalmentPlanSummary: jasmine.Spy;
    const optionsStateServiceMockFactory = new GenericStateServiceMockFactory<PaymentAssistancePlanOptionsStateModel>();
    let optionsStateServiceMock: Spied<GenericStateService<PaymentAssistancePlanOptionsStateModel>>;

    const routes: Routes = [
        { path: 'overview', redirectTo: '' },
        { path: 'bills', redirectTo: '' },
        { path: 'bills/paymentassistance/plan/confirm/:contractAccountNumber/:contractNumber/:frequency/:startDate/:instalmentAmount', redirectTo: '' },
        { path: 'bills/paymentassistance/plan/custom/:contractAccountNumber/:contractNumber', redirectTo: '' }
    ];

    let dataLayerService: DataLayerService;

    beforeEach(() => {
        instalmentOptions = [
            instalmentOptionWeekly,
            instalmentOptionFortnightly,
            instalmentOptionMonthly
        ];

        Object.assign(activatedRouteStub, {
            snapshot: {
                queryParams: {
                    cancelDestinationUrl: cancelDestinationUrl
                }
            }
        });

        const dateRange = dateRangeGenerator.generate(instalmentOptions);
        dateOptionsWeekly = dateRange[0].dates;
        dateOptionsFortnightly = dateRange[1].dates;

        // Typesafe mocks
        accountServiceGetAccountsSpy = accountMockService
            .setup((x) => x.getAccounts)
            .is(() => {
                return Observable.of(accounts);
            }).Spy;

        fuelChipServiceInitSpy = fuelChipMockService
            .setup((x) => x.init)
            .is(() => {
                return Observable.of(classifiedFuelChips);
            }).Spy;

        fuelChipServiceGetFuelChipSpy = fuelChipMockService
            .setup((x) => x.getFuelChip)
            .is(() => {
                return fuelChipData;
            }).Spy;

        instalmentPlanOptionsServiceGetInstalmentOptions = instalmentPlanOptionsMockService
            .setup((x) => x.getInstalmentOptions)
            .is((contractNumberParam: string, params: GetPaymentArrangementInstalmentPlanOptionsParams) => {
                return Observable.of(instalmentOptions);
            }).Spy;

        instalmentPlanSummaryServiceInitInstalmentPlanSummary = instalmentPlanSummaryMockService
            .setup((x) => x.initInstalmentPlanSummary)
            .is((instalmentPlanParameters: InstalmentPlanParameters) => {
                return Observable.of(null);
            }).Spy;

        optionsStateServiceMock = optionsStateServiceMockFactory.createMock();

        // Configure testing module
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes(routes),
                PaymentAssistancePlanOptionsModule
            ],
            providers: [
                { provide: Now, useValue: nowMock },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: FuelChipService, useValue: fuelChipMockService.Object },
                { provide: IAccountServiceMA, useValue: accountMockService.Object },
                { provide: IInstalmentPlanOptionsService, useValue: instalmentPlanOptionsMockService.Object },
                { provide: IInstalmentPlanSummaryService, useValue: instalmentPlanSummaryMockService.Object },
                { provide: 'paymentAssistancePlanOptionsStateService', useValue: optionsStateServiceMock },
                { provide: DataLayerService, useClass: DataLayerStubService }
            ]
        });

        fixture = TestBed.createComponent(PaymentAssistancePlanOptionsComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        router = TestBed.get(Router);
        activatedRoute = TestBed.get(ActivatedRoute);
        dataLayerService = TestBed.get(DataLayerService);
    });

    describe('ngOnInit()', () => {

        describe('component property routeParmsModel', () => {

            describe('when cancelDestinationUrl is in the url parameters', () => {

                it('should be populated with accountNumber and contractNumber', () => {
                    // ACT
                    comp.ngOnInit();
                    fixture.detectChanges();

                    // ASSERT
                    expect(comp.routeParamsModel).toEqual(<PaymentAssistancePlanOptionsRouteParamsModel> {
                        accountNumber: accountNumber,
                        contractNumber: contractNumber,
                        cancelDestinationUrl: cancelDestinationUrl
                    });
                });

            });

            describe('when cancelDestinationUrl is NOT in the url parameters', () => {

                it('should be populated with accountNumber and contractNumber', () => {
                    // ARRANGE
                    activatedRoute.snapshot.queryParams['cancelDestinationUrl'] = null;

                    // ACT
                    comp.ngOnInit();
                    fixture.detectChanges();

                    // ASSERT
                    expect(comp.routeParamsModel).toEqual(<PaymentAssistancePlanOptionsRouteParamsModel> {
                        accountNumber: accountNumber,
                        contractNumber: contractNumber,
                        cancelDestinationUrl: null
                    });
                });

            });

        });

        describe('component property optionsTotalModel', () => {
            it(`should be populated with totalAmountDue: '${totalAmountDue}', fuelType: '${MauiFuelChipFuelType.Electricity}', currentBillEndDate: ${tomorrow}`, () => {
                // ACT
                comp.ngOnInit();
                fixture.detectChanges();

                // ASSERT
                expect(comp.optionsTotalModel).toEqual(<PaymentAssistancePlanOptionsTotalModel> {
                    totalAmountDue: totalAmountDue,
                    fuelType: MauiFuelChipFuelType.Electricity,
                    currentBillEndDate: tomorrow
                });
            });
        });

        describe('component property subheading', () => {

            describe('when there is a single instalmentOption', () => {
                const copy = 'Let us know how much you are able to pay each week.';
                it(`should be '${copy}'`, () => {
                    // ARRANGE
                    instalmentOptions = [instalmentOptionWeekly];

                    // ACT
                    comp.ngOnInit();
                    fixture.detectChanges();

                    // ASSERT
                    expect(comp.subheading).toBe(copy);
                });
            });

            describe('when there multiple instalmentOptions', () => {
                const copy = 'Let us know how often and how much you are able to pay.';
                it(`should be '${copy}'`, () => {
                    // ACT
                    comp.ngOnInit();
                    fixture.detectChanges();

                    // ASSERT
                    expect(comp.subheading).toBe(copy);
                });
            });
        });

        describe('component property optionsFrequencyModel', () => {

            beforeEach(() => {
                // ACT
                comp.ngOnInit();
                fixture.detectChanges();
            });

            describe('has property dateOptions', () => {
                it('should be set to the fortnightly dateOptions', () => {
                    // ASSERT
                    expect(comp.optionsFrequencyModel.dateOptions).toEqual(dateOptionsFortnightly);
                });
            });

            describe('has property selectedFrequencyOption', () => {
                it('should be set to the fortnightly frequencyOption', () => {
                    // ASSERT
                    expect(comp.optionsFrequencyModel.selectedFrequencyOption).toEqual(frequencyOptionFortnightly);
                });
            });

            describe('has property frequencyOptions', () => {
                it('should be set to weekly, fortnightly and monthly FrequencyOptions', () => {
                    // ASSERT
                    expect(comp.optionsFrequencyModel.frequencyOptions).toEqual(frequencyOptions);
                });
            });

            describe('has property dateOptionsDisabled', () => {
                it('should be false', () => {
                    // ASSERT
                    expect(comp.optionsFrequencyModel.dateOptionsDisabled).toBeFalsy();
                });
            });

            describe('has property dateOptionsHasError', () => {
                it('should be false', () => {
                    // ASSERT
                    expect(comp.optionsFrequencyModel.dateOptionsHasError).toBeFalsy();
                });
            });

            describe('has property showFrequencyOptions', () => {
                it('should be true', () => {
                    // ASSERT
                    expect(comp.optionsFrequencyModel.showFrequencyOptions).toBeTruthy();
                });
            });
        });

        describe('component property suggestionsModel', () => {
            it('should be populated with fortnightly suggestions', () => {
                // ACT
                comp.ngOnInit();
                fixture.detectChanges();

                // ASSERT
                expect(comp.suggestionsModel).toEqual({
                    selectedNumberOfInstalments: null,
                    instalmentSuggestions: instalmentSuggestions,
                    frequencyOption: frequencyOptionFortnightly,
                    maxSuggestionsToShow: 3
                });
            });
        });

        describe('component property fuelChip', () => {
            it(`should be the fuelchip with an accountNumber: '${accountNumber}', contractNumber: '${contractNumber}`, () => {
                // ACT
                comp.ngOnInit();
                fixture.detectChanges();

                // ARRANGE
                expect(comp.fuelChip).toEqual(fuelChipData);
            });
        });

        describe('paymentAssistancePlanOptionsStateService has state', () => {

            beforeEach(() => {
                optionsStateServiceMock.getState.and.returnValue(<PaymentAssistancePlanOptionsStateModel> {
                    accountNumber: accountNumber,
                    contractNumber: contractNumber,
                    frequency: frequencyOptionWeekly.value,
                    startDate: today,
                    instalmentMinAmount: instalmentMinAmount
                });
            });

            describe('component property optionsFrequencyModel', () => {

                beforeEach(() => {
                    // ACT
                    comp.ngOnInit();
                    fixture.detectChanges();
                });

                describe('has property dateOptions', () => {
                    it('should be set to the weekly dateOptions', () => {
                        // ASSERT
                        expect(comp.optionsFrequencyModel.dateOptions).toEqual(dateOptionsWeekly);
                    });
                });

                describe('has property selectedFrequencyOption', () => {
                    it('should be set to the weekly frequencyOption', () => {
                        // ASSERT
                        expect(comp.optionsFrequencyModel.selectedFrequencyOption.value).toBe(frequencyOptionWeekly.value);
                    });
                });

            });

        });
    });

    describe('onContinueButtonClicked()', () => {

        describe(`when 'I want to create my own custom instalment plan' is selected and continue is clicked`, () => {

            it('should navigate to the custom screen', () => {
                // ARRANGE
                spyOn(router, 'navigate');

                // ACT
                comp.ngOnInit();
                fixture.detectChanges();
                comp.suggestionsModel.selectedNumberOfInstalments = customInstalmentPlanValue;
                comp.onContinueButtonClicked();

                // ASSERT
                expect(router.navigate).toHaveBeenCalledWith([`/bills/paymentassistance/plan/custom/${accountNumber}/${contractNumber}`], { queryParamsHandling: 'preserve' });
            });

            it('should set the state with the details from the currently selected frequency/start date options', () => {
                // ACT
                comp.ngOnInit();
                fixture.detectChanges();
                comp.suggestionsModel.selectedNumberOfInstalments = customInstalmentPlanValue;

                const clonedInitialInstalmentOptions = cloneDeep(comp.initialInstalmentOptions);
                clonedInitialInstalmentOptions[1] = alternativeInstalmentOptionFortnightly;
                comp.initialInstalmentOptions = clonedInitialInstalmentOptions;

                comp.onContinueButtonClicked();

                // ASSERT
                expect(optionsStateServiceMock.setState).toHaveBeenCalledWith({
                    accountNumber: accountNumber,
                    contractNumber: contractNumber,
                    frequency: frequencyOptionFortnightly.value,
                    startDate: today,
                    instalmentMinAmount: instalmentMinAmount
                });
            });

        });

        describe(`when an instalment plan is selected with instalmentAmount: '${instalmentSuggestion1.instalmentAmount}' and numberOfInstalments: '${instalmentSuggestion1.numberOfInstalments}' and continue is clicked`, () => {

            beforeEach(() => {
                // ARRANGE
                spyOn(router, 'navigate');
                spyOn(dataLayerService, 'pushPaymentAssistanceErrorEvent');

                // ACT
                comp.ngOnInit();
                fixture.detectChanges();
                comp.onSelectedNumberOfInstalmentsChanged(instalmentSuggestion1.numberOfInstalments);
                fixture.detectChanges();
            });

            describe('when instalmentPlanSummaryService.initInstalmentPlanSummary() is called', () => {

                it(`should pass the parameters as an object with frequency: '${frequencyOptionFortnightly.value}', instalmentAmount: '${instalmentSuggestion1.instalmentAmount}', startDate: '${today}'`, () => {
                    // ACT
                    comp.onContinueButtonClicked();
                    fixture.detectChanges();

                    // ASSERT
                    expect(instalmentPlanSummaryServiceInitInstalmentPlanSummary).toHaveBeenCalledWith({
                        contractNumber: contractNumber,
                        frequency: frequencyOptionFortnightly.value,
                        instalmentAmount: instalmentSuggestion1.instalmentAmount,
                        startDate: today
                    });
                });

                describe('and does not return an error', () => {

                    beforeEach(() => {
                        // ARRANGE
                        const instalmentPlanSummaryResults = new InstalmentPlanSummaryResults(null, null);
                        instalmentPlanSummaryServiceInitInstalmentPlanSummary.and.returnValue(Observable.of(instalmentPlanSummaryResults));

                        // ACT
                        comp.onContinueButtonClicked();
                        fixture.detectChanges();
                    });

                    it('should navigate to the confirm screen', () => {
                        // ARRANGE
                        const formattedTodayDate: string = DateHelper.toIsoDateString(moment(today));

                        // ASSERT
                        expect(router.navigate).toHaveBeenCalledWith([`/bills/paymentassistance/plan/confirm/options/${accountNumber}/${contractNumber}/${frequencyOptionFortnightly.value.toLowerCase()}/${formattedTodayDate}/${instalmentSuggestion1.instalmentAmount}/5`],
                            { queryParamsHandling: 'preserve' });
                    });

                    it('should set continueButtonLoading property to false', () => {
                        // ASSERT
                        expect(comp.continueButtonLoading).toBeFalsy();
                    });

                });

                describe('and returns an error', () => {

                    beforeEach(() => {
                        // ARRANGE
                        instalmentPlanSummaryServiceInitInstalmentPlanSummary.and.returnValue(Observable.throw('error'));

                        // ACT
                        comp.onContinueButtonClicked();
                    });

                    it('should set showInstalmentsError property to true', () => {
                        expect(comp.showInstalmentsError).toBeTruthy();
                    });

                    it('should set continueButtonLoading property to false', () => {
                        expect(comp.continueButtonLoading).toBeFalsy();
                    });

                    it('should call pushPaymentAssistanceErrorEvent of the datalayer service for analytics', () => {
                        // ARRANGE
                        const apiErrorPoint: string = 'instalmentPlanSummaryService.initInstalmentPlanSummary';

                        // ASSERT
                        expect(dataLayerService.pushPaymentAssistanceErrorEvent).toHaveBeenCalledWith(apiErrorPoint, jasmine.any(String), jasmine.any(String));
                    });
                });

            });
        });

    });

    describe('onCancelClicked()', () => {

        describe(`when cancelDestinationUrl is set to '${cancelDestinationUrl}'`, () => {

            it(`should navigate to ${cancelDestinationUrl}`, () => {
                // ARRANGE
                spyOn(router, 'navigate');

                // ACT
                comp.ngOnInit();
                fixture.detectChanges();
                comp.onCancelClicked();
                fixture.detectChanges();

                // ASSERT
                expect(router.navigate).toHaveBeenCalledWith([cancelDestinationUrl]);
            });
        });

        describe(`when cancelDestinationUrl is NOT set`, () => {

            it(`should navigate to '/bills'`, () => {
                // ARRANGE
                spyOn(router, 'navigate');

                // ACT
                comp.ngOnInit();
                fixture.detectChanges();
                comp.routeParamsModel.cancelDestinationUrl = null;
                comp.onCancelClicked();
                fixture.detectChanges();

                // ASSERT
                expect(router.navigate).toHaveBeenCalledWith(['/bills']);
            });
        });

    });

    describe('onFrequencyOptionChanged()', () => {

        describe('when the frequencyOption changes to Weekly', () => {

            beforeEach(() => {
                // ACT
                comp.ngOnInit();
                fixture.detectChanges();
                comp.onFrequencyOptionChanged(frequencyOptionWeekly, contractNumber);
                fixture.detectChanges();
            });

            it('should update the optionsFrequency model', () => {
                // ASSERT
                expect(comp.optionsFrequencyModel).toEqual(<PaymentAssistancePlanOptionsFrequencyModel> {
                    dateOptions: dateOptionsWeekly,
                    selectedFrequencyOption: frequencyOptionWeekly,
                    frequencyOptions: frequencyOptions,
                    dateOptionsDisabled: false,
                    dateOptionsHasError: false,
                    showFrequencyOptions: true
                });
            });

            it('should update the suggestions model', () => {
                // ASSERT
                expect(comp.suggestionsModel).toEqual(<PaymentAssistancePlanOptionsSuggestionsModel> {
                    selectedNumberOfInstalments: null,
                    instalmentSuggestions: instalmentSuggestions,
                    frequencyOption: frequencyOptionWeekly,
                    maxSuggestionsToShow: maxSuggestionsToShow
                });
            });

        });

    });

    describe('onDateOptionChanged()', () => {

        describe('when the dateOptions changes to tomorrow', () => {

            beforeEach(() => {
                // ACT
                comp.ngOnInit();
                fixture.detectChanges();
                comp.onDateOptionChanged(tomorrowAsString, contractNumber);
                fixture.detectChanges();
            });

            it('should update the optionsFrequency model', () => {
                // ARRANGE
                dateOptionsFortnightly[1].selected = false;
                dateOptionsFortnightly[2].selected = true;

                // ASSERT
                expect(comp.optionsFrequencyModel).toEqual(<PaymentAssistancePlanOptionsFrequencyModel> {
                    dateOptions: dateOptionsFortnightly,
                    selectedFrequencyOption: frequencyOptionFortnightly,
                    frequencyOptions: frequencyOptions,
                    dateOptionsDisabled: false,
                    dateOptionsHasError: false,
                    showFrequencyOptions: true
                });
            });

            it('should update the suggestions model', () => {
                // ASSERT
                expect(comp.suggestionsModel).toEqual(<PaymentAssistancePlanOptionsSuggestionsModel> {
                    selectedNumberOfInstalments: null,
                    instalmentSuggestions: instalmentSuggestions,
                    frequencyOption: frequencyOptionFortnightly,
                    maxSuggestionsToShow: maxSuggestionsToShow
                });
            });

        });

        describe('when the dateOptions changes to tomorrow and reloadInstalmentOptions() returns an error', () => {

            beforeEach(() => {
                // ARRANGE
                spyOn(comp, 'reloadInstalmentOptions').and.returnValue(Observable.throw('error'));
                spyOn(dataLayerService, 'pushPaymentAssistanceErrorEvent');

                // ACT
                comp.ngOnInit();
                fixture.detectChanges();
                comp.onDateOptionChanged(tomorrowAsString, contractNumber);
                fixture.detectChanges();
            });

            describe('component property optionsFrequencyModel', () => {
                it('should set dateOptionsHasError to true', () => {
                    // ASSERT
                    expect(comp.optionsFrequencyModel.dateOptionsHasError).toBeTruthy();
                });

                it('should reset selected start date back to today', () => {
                    // ASSERT
                    expect(comp.optionsFrequencyModel.dateOptions[1].selected).toBeTruthy();
                    expect(comp.optionsFrequencyModel.dateOptions[2].selected).toBeFalsy();
                });

            });

            describe('data analytics', () => {

                it('should call pushPaymentAssistanceErrorEvent of the datalayer service for analytics', () => {
                    // ARRANGE
                    const apiErrorPoint: string = 'reloadInstalmentOptions';

                    // ASSERT
                    expect(dataLayerService.pushPaymentAssistanceErrorEvent).toHaveBeenCalledWith(apiErrorPoint, jasmine.any(String), jasmine.any(String));
                });
            });

        });
    });
});
