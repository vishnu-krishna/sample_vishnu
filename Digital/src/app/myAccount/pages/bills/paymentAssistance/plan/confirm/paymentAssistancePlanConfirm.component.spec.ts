import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, Params, Routes } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Mock } from 'ts-mocks/lib';
import * as moment from 'moment';

import { DateHelper } from './../../../../../../shared/utils/dateHelper';
import { PaymentExtensionContractEligibility } from './../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { BillDescriptionService } from './../../../../../services/billDescription.service';
import { PaymentArrangementInstalmentSummary, PaymentArrangementInstalmentSummaryItem } from './../../../../../services/paymentScheme/instalmentPlanSummary.service';
import { PaymentAssistancePlanConfirmStateModel } from './models/paymentAssistancePlanConfirmStateModel';
import { MauiFuelChipFuelType, FuelChipContractAccountDetails, FuelChipContract, MauiFuelChipFuelContext } from '../../../../../maui/fuelChip';
import { InstalmentStatus } from '../../../../../maui/progressTracker/showcase/exampleInstalmentProgressItem/instalmentProgressItem.model';
import { Now } from '../../../../../../shared/service/now.service';

import {
    InstalmentPlanFrequency,
    IPaymentSchemeApi,
    InstalmentPlanParameters,
    PaymentArrangementInstalmentSummary as PaymentArrangementInstalmentSummaryApi,
    PaymentArrangementInstalmentSummaryItem as PaymentArrangementInstalmentSummaryItemApi
} from '../../../../../services/paymentScheme/paymentSchemeApi.service';

import { FuelChipData } from '../../extend/eligibility/fuelChipData';
import { ClassifiedFuelChips } from '../../extend/eligibility/services/fuelChipClassification.service';
import { IPaymentExtensionStateService } from '../../extend/services/paymentExtensionState.service';
import { IPaymentExtensionFuelChipService } from '../../extend/eligibility/services/paymentExtensionFuelChip.service';

import {
    IFuelChipService,
    IFuelChipClassificationService,
    FuelChipClassificationService,
    EligibleFuelChipFilterService,
    IneligibleFuelChipFilterService,
    AlreadyExtendedFuelChipFilterService
} from '../../services';

import { PaymentAssistancePlanInstalmentsProgressItem } from '../instalments';

import { PaymentAssistancePlanConfirmModule } from './paymentAssistancePlanConfirm.module';
import { PaymentAssistanceTermsAndConditionsComponent } from './termsAndConditions/paymentAssistanceTermsAndConditions.component';
import { PaymentAssistancePlanConfirmComponent, InstalmentsModel } from './paymentAssistancePlanConfirm.component';
import { PaymentAssistancePlanConfirmRouteParamsModel } from './models';
import { AglCurrencyPipe } from '../../../../../pipes/aglCurrency.pipe';
import { GenericStateService } from '../../../../../services/generics/genericState.service';
import { Spied } from '../../../../../services/generics/tsmocks/spied.type';
import { GenericStateServiceMockFactory } from '../../../../../services/generics/tsmocks/genericState.service.tsmock';
import { InstalmentPlanSummaryMockService, NowMock, PaymentExtensionStateMockService } from '../../../../../services/mock';
import { IAccountServiceMA, ContractViewModel, AccountViewModel } from '../../../../../services/account.service';
import { IPaymentExtensionEligibility } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { InstalmentPlanSummaryResults, IInstalmentPlanSummaryService } from '../../../../../services/paymentScheme/instalmentPlanSummary.service';
import { DocumentService } from '../../../../../../shared/service/document.service';
import { DataLayerService } from '../../../../../../shared/service/dataLayer.service';
import { DataLayerStubService } from '../../../../../../test/stubs/dataLayer.stub.service';

let instalmentPlanSummaryService = new InstalmentPlanSummaryMockService();
let comp: PaymentAssistancePlanConfirmComponent;
let fixture: ComponentFixture<PaymentAssistancePlanConfirmComponent>;
let de: DebugElement;
let paymentExtensionStateService: IPaymentExtensionStateService;
let fuelChipService: IPaymentExtensionFuelChipService;

let accountServiceGetAccountsSpy: jasmine.Spy;
let accountServiceRefreshAccountsSpy: jasmine.Spy;

let paymentApiServiceSubmitPaymentArrangementInstalmentPlanSpy: jasmine.Spy;

let router: Router;
let activatedRoute: ActivatedRoute;
const contractAccountNumber = '140000';
const otherContractAccountNumber = '0001';
const contractNumber = '121212';
const otherContractNumber = '111111';
const instalmentAmount = 60;

const routeParams: PaymentAssistancePlanConfirmRouteParamsModel = {
    contractAccountNumber: contractAccountNumber,
    contractNumber: contractNumber,
    frequency: InstalmentPlanFrequency.Weekly,
    startDate: new Date('2018-03-16'),
    instalmentAmount: instalmentAmount,
    selectedNumberOfInstalments: 1
};

let activatedRouteStub = {
    get params(): Observable<{}> {
        return Observable.of(routeParams);
    }
};

const eligibility: PaymentExtensionContractEligibility = {
    contractNumber: '1422222222',
    isEligible: true,
    reasonForIneligibility: 0,
    totalAmountDue: 114.75,
    dueDate: moment('2017-12-08').toDate(),
    availableExtensionDates: [
        {
            numberOfDays: 7,
            dueDate: moment('2017-12-15').toDate()
        }
    ]
};

const selectedFuelChipData = new FuelChipData('22', contractNumber, MauiFuelChipFuelType.Gas, null, eligibility, null);
const fuelChips = new ClassifiedFuelChips([selectedFuelChipData], null, null, null);

const instalments: PaymentArrangementInstalmentSummaryItem[] = [{ instalmentDate: '1/1/2018', instalmentAmount: 60 }];
const InstalmentSummary: PaymentArrangementInstalmentSummary = new PaymentArrangementInstalmentSummary(instalments);
const instalmentPlanSummaryResults: InstalmentPlanSummaryResults = new InstalmentPlanSummaryResults(selectedFuelChipData, InstalmentSummary);

const contract = new ContractViewModel(contractNumber);
const otherContract = new ContractViewModel(otherContractNumber);
const accounts: AccountViewModel[] = [new AccountViewModel(contractAccountNumber, [contract])];
const multiAccountsSingleContract: AccountViewModel[] = [
    new AccountViewModel(contractAccountNumber, [contract]),
    new AccountViewModel(otherContractAccountNumber, [otherContract])
];
const singleAccountsMultiContract: AccountViewModel[] = [
    new AccountViewModel(contractAccountNumber, [contract, otherContract])
];
const multiAccountsMultiContract: AccountViewModel[] = [
    new AccountViewModel(contractAccountNumber, [contract, otherContract]),
    new AccountViewModel(otherContractAccountNumber, [otherContract, otherContract])
];
const singleAccountsSingleContract: AccountViewModel[] = [
    new AccountViewModel(contractAccountNumber, [contract])
];

let instalmentsModel: InstalmentsModel;
const instalmentsDueSelector = By.css(
    '.test-instalment-due'
);
const firstInstalmentsDueSelector = By.css(
    '.test-first-instalment-due'
);

let dataLayerService: DataLayerService;

// Mock dates
let nowMock: NowMock = new NowMock('');
nowMock.setDate(2018, 4, 14);
const today = nowMock.date().toDate();
const todayMinus2Days = moment(today).add(-2, 'days').toDate();
const yesterday = moment(today).add(-1, 'days').toDate();
const tomorrow = moment(today).add(1, 'days').toDate();
const todayPlus150Days = moment(today).add(150, 'days').toDate();
const todayPlus151Days = moment(today).add(151, 'days').toDate();

const todayFormatted = moment(today).format('DD MMM YYYY');
const todayDayOfWeekFormatted = moment(today).format('dddd');
const todayPlus1Formatted = moment(today).add(1, 'days').format('DD MMM YYYY');
const yesterdayPlus1Formatted = moment(yesterday).add(1, 'days').format('DD MMM YYYY');
const tomorrowPlus1Formatted = moment(tomorrow).add(1, 'days').format('DD MMM YYYY');
const todayPlus151DaysFormatted = moment(todayPlus150Days).add(1, 'days').format('DD MMM YYYY');

const paymentArrangementInstalmentSummaryNoInstalments: PaymentArrangementInstalmentSummary = {
    instalments: []
};

const confirmStateServiceMockFactory = new GenericStateServiceMockFactory<PaymentAssistancePlanConfirmStateModel>();
let confirmStateServiceMock: Spied<GenericStateService<PaymentAssistancePlanConfirmStateModel>>;

const confirmTextSelector = By.css('.payment-assistance-confirm__options-body-table-row');

// TODO Ideally we would use jasmine's spyOnProperty to mock activatedRouteStub get params on the injected ActivatedRoute
// Unfortunately the current version of jasmine only supports spyOn(methods) - not spyOnProperty().

describe('PaymentAssistanceConfirmComponent', () => {

    beforeEach(() => {

        const routeMock = {
            params: () => {
                throw new Error('init is not implemented');
            }
        };

        const fuelChipServiceMock = {
            init: () => {
                throw new Error('init is not implemented');
            }
        };

        const accountServiceMock = new Mock<IAccountServiceMA>();
        accountServiceGetAccountsSpy = accountServiceMock.setup((s) => s.getAccounts).Spy;
        accountServiceRefreshAccountsSpy = accountServiceMock.setup((s) => s.refreshAccounts).Spy;

        const paymentApiService = new Mock<IPaymentSchemeApi>();
        paymentApiServiceSubmitPaymentArrangementInstalmentPlanSpy = paymentApiService.setup((s) => s.submitPaymentArrangementInstalmentPlan).Spy;

        let instalmentPlanSummaryServiceMock = {
            initInstalmentPlanSummary: (): Observable<InstalmentPlanSummaryResults> => {
                throw new Error('initInstalmentPlanSummary is not implemented');
            },

            getInstalmentSummary: (): InstalmentPlanSummaryResults => {
                throw new Error('getInstalmentSummary is not implemented');
            },

            init: (): Observable<PaymentArrangementInstalmentSummary> => {
                throw new Error('init is not implemented');
            }
        };

        const configService = {
            current: null
        };

        // Create a wrapper for services that are not called under test
        const emptyMockService = {};

        const routes: Routes = [
            { path: 'bills/paymentassistance/plan/confirm/success/options/:contractAccountNumber/:contractNumber', redirectTo: '' }
        ];

        confirmStateServiceMock = confirmStateServiceMockFactory.createMock();

        TestBed.configureTestingModule({
            imports: [
                PaymentAssistancePlanConfirmModule,
                RouterTestingModule.withRoutes(routes)
            ],
            providers: [
                { provide: Now, useValue: nowMock },
                AglCurrencyPipe,
                EligibleFuelChipFilterService,
                AlreadyExtendedFuelChipFilterService,
                IneligibleFuelChipFilterService,
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: IPaymentExtensionStateService, useClass: PaymentExtensionStateMockService },
                { provide: IPaymentExtensionFuelChipService, useValue: fuelChipServiceMock },
                { provide: IAccountServiceMA, useValue: accountServiceMock.Object },
                { provide: IInstalmentPlanSummaryService, useValue: instalmentPlanSummaryServiceMock },
                { provide: IPaymentSchemeApi, useValue: paymentApiService.Object },
                { provide: IPaymentExtensionEligibility, useValue: emptyMockService },
                { provide: IFuelChipClassificationService, useClass: FuelChipClassificationService },
                { provide: 'AppContentBranch', useValue: 'selfService' },
                { provide: 'paymentAssistancePlanConfirmStateService', useValue: confirmStateServiceMock },
                { provide: BillDescriptionService, useValue: emptyMockService },
                { provide: DataLayerService, useClass: DataLayerStubService },
                DocumentService
            ]
        });
        fixture = TestBed.createComponent(PaymentAssistancePlanConfirmComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        this.fuelChipService = TestBed.get(IPaymentExtensionFuelChipService);
        this.paymentExtensionStateService = TestBed.get(IPaymentExtensionStateService);
        this.instalmentPlanSummaryService = TestBed.get(IInstalmentPlanSummaryService);
        this.router = TestBed.get(Router);
        dataLayerService = TestBed.get(DataLayerService);
    });

    describe('When ngOnInit is called', () => {

        describe('When PaymentExtensionStateService does not return selected fuel chip', () => {

            beforeEach(() => {
                accountServiceGetAccountsSpy.and.returnValue(Observable.of(accounts));
                spyOn(this.paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(null);
                spyOn(this.instalmentPlanSummaryService, 'getInstalmentSummary').and.returnValue(instalmentPlanSummaryResults);
                spyOn(this.paymentExtensionStateService, 'initNewSession').and.returnValue(selectedFuelChipData);
                spyOn(this.fuelChipService, 'init').and.returnValue(Observable.of(fuelChips));
                spyOn(comp, 'populateInstalmentsModel');
                spyOn(this.instalmentPlanSummaryService, 'initInstalmentPlanSummary').and.returnValue(Observable.of(instalmentPlanSummaryResults));

                // act
                comp.ngOnInit();
            });

            it('should call getAccounts', () => {
                expect(accountServiceGetAccountsSpy).toHaveBeenCalled();
            });

            it('should call getSelectedFuelChip', () => {
                expect(this.paymentExtensionStateService.getSelectedFuelChip).toHaveBeenCalled();
            });

            it('should call initInstalmentPlanSummary', () => {
                expect(this.instalmentPlanSummaryService.initInstalmentPlanSummary).toHaveBeenCalled();
            });

            it('should call populateInstalmentsModel', () => {
                expect(comp.populateInstalmentsModel).toHaveBeenCalled();
            });

        });

        describe('When PaymentExtensionStateService does return selected fuel chip', () => {

            beforeEach(() => {

                accountServiceGetAccountsSpy.and.returnValue(Observable.of(accounts));
                spyOn(this.paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(selectedFuelChipData);
                spyOn(this.instalmentPlanSummaryService, 'initInstalmentPlanSummary').and.returnValue(Observable.of(instalmentPlanSummaryResults));

                spyOn(this.paymentExtensionStateService, 'initNewSession').and.returnValue(selectedFuelChipData);
                spyOn(this.fuelChipService, 'init').and.returnValue(Observable.of(fuelChips));
                spyOn(comp, 'populateInstalmentsModel');

                spyOn(this.instalmentPlanSummaryService, 'getInstalmentSummary').and.returnValue(instalmentPlanSummaryResults);

                comp.ngOnInit();
            });

            it('should call getAccounts', () => {
                expect(accountServiceGetAccountsSpy).toHaveBeenCalled();
            });
            it('should call getSelectedFuelChip', () => {
                expect(this.paymentExtensionStateService.getSelectedFuelChip).toHaveBeenCalled();
            });

            it('should call getInstalmentSummary', () => {
                expect(this.instalmentPlanSummaryService.getInstalmentSummary).toHaveBeenCalled();
            });

            it('should call populateInstalmentsModel', () => {
                expect(comp.populateInstalmentsModel).toHaveBeenCalled();
            });

        });

        describe('When getRouteParams called ', () => {

            it('should return instalmentPlanParameters', () => {

                // act
                const result: InstalmentPlanParameters = comp.getInstalmentPlanParameters({
                    contractAccountNumber: contractAccountNumber,
                    contractNumber: contractNumber,
                    frequency: InstalmentPlanFrequency.Weekly,
                    startDate: new Date('2018-03-16'),
                    instalmentAmount: instalmentAmount,
                    selectedNumberOfInstalments: 1
                });

                let expectedResult: InstalmentPlanParameters = new InstalmentPlanParameters();
                Object.assign(expectedResult, {
                    accountNumber: contractAccountNumber,
                    contractNumber: contractNumber,
                    frequency: InstalmentPlanFrequency.Weekly,
                    instalmentAmount: instalmentAmount,
                    startDate: new Date('2018-03-16'),
                    firstInstalmentDue: '16 Mar 2018'
                });

                // assert
                expect(result).toEqual(expectedResult);
            });
        });

        describe('When populateInstalmentsModel called ', () => {

            it('should return InstalmentsModel', () => {
                // arrange
                let instalmentPlanParameters: InstalmentPlanParameters = {
                    accountNumber: contractAccountNumber,
                    contractNumber: contractNumber,
                    frequency: InstalmentPlanFrequency.Weekly,
                    instalmentAmount: instalmentAmount,
                    startDate: today,
                    firstInstalmentDue: todayFormatted
                };

                comp.currentBillEndDate = today;

                // act
                const result: InstalmentsModel = comp.populateInstalmentsModel(instalmentPlanSummaryResults, instalmentPlanParameters);
                let progressItems: PaymentAssistancePlanInstalmentsProgressItem[];
                progressItems = instalmentPlanSummaryResults.instalmentPlans.instalments.map(
                    (instalment) => new PaymentAssistancePlanInstalmentsProgressItem(instalment.instalmentAmount, new Date(instalment.instalmentDate), InstalmentStatus.Due)
                );

                let expectedResult: InstalmentsModel = new InstalmentsModel();
                Object.assign(expectedResult, {
                    progressItems: progressItems,
                    fuelChip: instalmentPlanSummaryResults.fuelChipData,
                    totalDue: String(instalmentPlanSummaryResults.fuelChipData.eligibility.totalAmountDue),
                    startDate: today,
                    frequency: InstalmentPlanFrequency.Weekly,
                    firstStartDate: new Date(instalmentPlanSummaryResults.instalmentPlans.instalments[0].instalmentDate),
                    instalmentsDueCopy: `Weekly on ${todayDayOfWeekFormatted}s`,
                    currentBillEndDateFormatted: `Don't stress. If you aren't confident that you can pay before your next bill is issued on ${todayPlus1Formatted}, there are still other options available.`,
                    isFirstStartDateToday: false
                });

                // assert
                expect(result).toEqual(expectedResult);
            });
        });

        describe('When getCurrentBillEndDate() is called', () => {

            let instalmentPlanParameters: InstalmentPlanParameters;

            beforeEach(() => {
                instalmentPlanParameters = {
                    accountNumber: contractAccountNumber,
                    contractNumber: contractNumber,
                    frequency: InstalmentPlanFrequency.Weekly,
                    instalmentAmount: instalmentAmount,
                    startDate: new Date('2018-03-16'),
                    firstInstalmentDue: '16 Mar 2018'
                };
            });

            it('should return null when account not found', () => {

                // act
                const date = comp.getCurrentBillEndDate([], instalmentPlanParameters);

                // assert
                expect(date).toBeNull();
            });

            it('should return null when contract not found', () => {

                // arrange
                instalmentPlanParameters.contractNumber = '0000';

                // act
                const date = comp.getCurrentBillEndDate(accounts, instalmentPlanParameters);
                // assert
                expect(date).toBeNull();
            });

            it('should return today when the contract is found and contract.currentBillEndDate is today', () => {

                // arrange
                contract.currentBillEndDate = today;

                // act
                const date = comp.getCurrentBillEndDate(accounts, instalmentPlanParameters);

                // assert
                expect(date).toEqual(today);
            });

        });
    });

    describe('When page is presented', () => {

        beforeEach(() => {
            spyOn(this.paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(null);
            spyOn(this.paymentExtensionStateService, 'initNewSession').and.returnValue(selectedFuelChipData);
            spyOn(this.fuelChipService, 'init').and.returnValue(Observable.of(fuelChips));
            accountServiceGetAccountsSpy.and.returnValue(Observable.of(accounts));
            spyOn(this.instalmentPlanSummaryService, 'initInstalmentPlanSummary').and.returnValue(Observable.of(instalmentPlanSummaryResults));
            // act
            comp.ngOnInit();
            fixture.detectChanges();
        });

        it('should show checkbox unchecked', () => {

            // arrange
            const checkBox = de.query(By.css('.maui-terms-and-conditions-control__checkbox-hide'));
            // assert
            expect(checkBox.nativeElement.checked).toBeFalsy();
        });

        it('should show button disabled (disabled when isTermConditionChecked is false)', () => {

            // act
            const button = de.query(By.css('.maui-button--disabled'));

            // assert
            expect(button).toBeDefined();
            expect(comp.isTermConditionChecked).toBeFalsy();
        });

        it('should show chat button', () => {
            const chatButton = de.query(By.css('[chatButtonId=LPPaymentAssistanceConfirm]'));
            expect(chatButton).toBeTruthy();
        });

        describe('When checkbox is clicked', () => {

            it('should show button enabled (enabled when isTermConditionChecked is true)', () => {

                // act
                const checkBox = de.query(By.css('.maui-terms-and-conditions-control__customcheckbox'));

                checkBox.triggerEventHandler('click', {});
                fixture.detectChanges();
                const enabledbutton = de.query(By.css('.maui-button maui-button--primary .maui-button--large'));

                // ASSERT
                expect(enabledbutton).toBeDefined();
                expect(comp.isTermConditionChecked).toBeTruthy();
            });
        });

        describe('When checkbox is not clicked', () => {

            it('should show isConfirmButtonEnabled = false', () => {

                // act
                const checkBox = fixture.nativeElement.querySelector('.maui-terms-and-conditions-control__checkbox-hide');
                checkBox.click();
                fixture.detectChanges();

                // check to see if the confirm button changes state
                const disabledbutton = de.query(By.css('.maui-button--disabled'));
                const enabledbutton = de.query(By.css('.maui-button maui-button--primary .maui-button--large'));

                // ASSERT
                expect(checkBox.checked).toBe(true);
                expect(enabledbutton).toBeDefined();
            });
        });

        describe('formatInstalmentsDue()', () => {
            describe('Frequency is Weekly and day is a Monday', () => {
                it(`should display 'Weekly on Mondays'`, () => {
                    // ACT
                    const copy = comp.formatInstalmentsDue(InstalmentPlanFrequency.Weekly, new Date('2018-03-19'));

                    // ASSERT
                    expect(copy).toBe('Weekly on Mondays');
                });
            });
            describe('Frequency is Fortnightly and day is a Tuesday', () => {
                it(`should display 'Fortnightly on Tuesdays'`, () => {
                    // ACT
                    const copy = comp.formatInstalmentsDue(InstalmentPlanFrequency.Fortnightly, new Date('2018-03-20'));

                    // ASSERT
                    expect(copy).toBe('Fortnightly on Tuesdays');

                });
            });
            describe('Frequency is Monthly and day is a 1', () => {
                it(`should display 'Monthly on the 1st'`, () => {
                    // ACT
                    const copy = comp.formatInstalmentsDue(InstalmentPlanFrequency.Monthly, new Date('2018-03-01'));

                    // ASSERT
                    expect(copy).toBe('Monthly on the 1st');
                });
            });
            describe('Frequency is Monthly and day is a 23', () => {
                it(`should display 'Monthly on the 23rd'`, () => {
                    // ACT
                    const copy = comp.formatInstalmentsDue(InstalmentPlanFrequency.Monthly, new Date('2018-03-23'));

                    // ASSERT
                    expect(copy).toBe('Monthly on the 23rd');
                });
            });
        });
        describe('First instalment due', () => {
            describe('is today', () => {
                it(`should display 'Today'`, () => {
                    // ARRANGE
                    comp.instalmentsModel.isFirstStartDateToday = true;
                    // ACT
                    fixture.detectChanges();
                    // ASSERT
                    expect(de.query(firstInstalmentsDueSelector).nativeElement.innerHTML).toBe('Today');
                });
            });
            describe('is not today (01/01/2000)', () => {
                it(`should display 'Sat 01 Jan 2000'`, () => {
                    // ARRANGE
                    comp.instalmentsModel.firstStartDate = new Date('2000-01-01');
                    // ACT
                    fixture.detectChanges();
                    // ASSERT
                    expect(de.query(firstInstalmentsDueSelector).nativeElement.innerHTML).toBe('Sat 01 Jan 2000');
                });
            });
        });

        describe('formatCurrentBillEndDate() when currentBillEndDate', () => {

            describe('is yesterday', () => {
                it('should display confirm text message with yesterday + 1 copy', () => {
                    const copy = comp.formatCurrentBillEndDate(yesterday);
                    expect(copy).toBe(`Don't stress. If you aren't confident that you can pay before your next bill is issued on ${todayFormatted}, there are still other options available.`);
                });
            });

            describe('is today', () => {
                it('should display confirm text message with today + 1 copy', () => {
                    const copy = comp.formatCurrentBillEndDate(today);
                    expect(copy).toBe(`Don't stress. If you aren't confident that you can pay before your next bill is issued on ${todayPlus1Formatted}, there are still other options available.`);
                });
            });

            describe('is tomorrow', () => {
                it('should display confirm text message with tomorrow + 1 copy', () => {
                    const copy = comp.formatCurrentBillEndDate(tomorrow);
                    expect(copy).toBe(`Don't stress. If you aren't confident that you can pay before your next bill is issued on ${tomorrowPlus1Formatted}, there are still other options available.`);
                });
            });

            describe('is today + 150 days', () => {
                it('should display confirm text message with today + 151 copy', () => {
                    const copy = comp.formatCurrentBillEndDate(todayPlus150Days);
                    expect(copy).toBe(`Don't stress. If you aren't confident that you can pay before your next bill is issued on ${todayPlus151DaysFormatted}, there are still other options available.`);
                });
            });

            describe('is today + 151 days', () => {
                it(`should show 'before your next bill is issued' copy`, () => {
                    const copy = comp.formatCurrentBillEndDate(todayPlus151Days);
                    expect(copy).toBe(`Don't stress. If you aren't confident that you can pay before your next bill is issued, there are still other options available.`);
                });
            });

            describe('is null', () => {
                it(`should show 'before your next bill is issued' copy`, () => {
                    const copy = comp.formatCurrentBillEndDate(null);
                    expect(copy).toBe(`Don't stress. If you aren't confident that you can pay, there are still other options available.`);
                });
            });

            describe('is today minus 2 days', () => {
                it(`should show 'before your next bill is issued' copy`, () => {
                    const copy = comp.formatCurrentBillEndDate(todayMinus2Days);
                    expect(copy).toBe(`Don't stress. If you aren't confident that you can pay, there are still other options available.`);
                });
            });
        });

    });

    describe('when Confirm button is clicked', () => {
        let expectedSummary: PaymentArrangementInstalmentSummaryApi;

        beforeEach(() => {
            accountServiceGetAccountsSpy.and.returnValue(Observable.of(accounts));
            spyOn(this.paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(null);
            spyOn(this.instalmentPlanSummaryService, 'initInstalmentPlanSummary').and.returnValue(Observable.of(instalmentPlanSummaryResults));
            spyOn(this.paymentExtensionStateService, 'initNewSession').and.returnValue(selectedFuelChipData);
            spyOn(this.fuelChipService, 'init').and.returnValue(Observable.of(fuelChips));
            spyOn(dataLayerService, 'pushPaymentAssistancePlanSetupEvent');

            expectedSummary = getSavedInstalmentPlan();

            accountServiceRefreshAccountsSpy.and.returnValue(Observable.of(accounts));

            comp.ngOnInit();
        });

        describe('when save success', () => {
            let instalmentPlanParameters: InstalmentPlanParameters;
            beforeEach(() => {
                paymentApiServiceSubmitPaymentArrangementInstalmentPlanSpy.and.returnValue(Observable.of(expectedSummary));
                instalmentPlanParameters = {
                    accountNumber: contractAccountNumber,
                    contractNumber: contractNumber,
                    frequency: InstalmentPlanFrequency.Weekly,
                    instalmentAmount: instalmentAmount,
                    startDate: routeParams.startDate,
                    firstInstalmentDue: null,
                    selectedNumberOfInstalments: 1
                };
            });

            it('should call paymentAssistancePlanConfirmStateService.setState()', () => {
                // ACT
                comp.confirmClicked();

                // ASSERT
                expect(confirmStateServiceMock.setState).toHaveBeenCalledWith({
                    accountNumber: contractAccountNumber,
                    contractNumber: contractNumber,
                    frequency: InstalmentPlanFrequency.Weekly,
                    totalDue: eligibility.totalAmountDue,
                    startDate: routeParams.startDate,
                    paymentArrangementInstalmentSummary: expectedSummary
                });
            });

            it('should set showInstalmentsError property to false', () => {
                expect(comp.showInstalmentsError).toBeFalsy();
            });

            it('should call pushPaymentAssistancePlanSetupEvent of the datalayer service for analytics', () => {
                // ARRANGE
                const apiErrorPoint: string = 'paymentSchemeApi.submitPaymentArrangementInstalmentPlan';

                // ACT
                comp.confirmClicked();

                // ASSERT
                expect(dataLayerService.pushPaymentAssistancePlanSetupEvent).toHaveBeenCalledWith(instalmentPlanParameters, jasmine.any(String), jasmine.any(String));
            });

            it('should refresh the accounts to reflect saved instalment plan', () => {
                // ACT
                comp.confirmClicked();

                // ASSERT
                expect(accountServiceRefreshAccountsSpy).toHaveBeenCalled();
            });

            describe('when refresh success', () => {
                beforeEach(() => {
                    accountServiceRefreshAccountsSpy.and.returnValue(Observable.of(accounts));
                });

                it('should navigate to /bills/paymentassistance/plan/confirm/success with params', () => {
                    // ARRANGE
                    spyOn(this.router, 'navigate');

                    // ACT
                    comp.confirmClicked();

                    // ASSERT
                    expect(this.router.navigate).toHaveBeenCalledWith([`/bills/paymentassistance/plan/confirm/success/options/${contractAccountNumber}/${contractNumber}`], Object({ queryParamsHandling: 'preserve' }));
                });

                it('should set continueButtonLoading property to false', () => {
                    expect(comp.isConfirmButtonLoading).toBeFalsy();
                });

            });

            describe('when refresh error', () => {
                beforeEach(() => {
                    accountServiceRefreshAccountsSpy.and.returnValue(Observable.throw('Error'));
                });

                it('should navigate to /bills/paymentassistance/plan/confirm/success with params', () => {
                    // ARRANGE
                    spyOn(this.router, 'navigate');

                    // ACT
                    comp.confirmClicked();

                    // ASSERT
                    expect(this.router.navigate).toHaveBeenCalledWith([`/bills/paymentassistance/plan/confirm/success/options/${contractAccountNumber}/${contractNumber}`], Object({ queryParamsHandling: 'preserve' }));
                });
            });
        });

        describe('and save error', () => {

            beforeEach(() => {

                // ARRANGE
                paymentApiServiceSubmitPaymentArrangementInstalmentPlanSpy.and.returnValue(Observable.throw('error'));
                spyOn(dataLayerService, 'pushPaymentAssistanceErrorEvent');

                // ACT
                comp.confirmClicked();
            });

            it('should set showInstalmentsError property to true', () => {
                expect(comp.showInstalmentsError).toBeTruthy();
            });

            it('should set continueButtonLoading property to false', () => {
                expect(comp.isConfirmButtonLoading).toBeFalsy();
            });

            it('should call pushPaymentAssistanceErrorEvent of the datalayer service for analytics', () => {
                // ARRANGE
                const apiErrorPoint: string = 'paymentSchemeApi.submitPaymentArrangementInstalmentPlan';

                // ASSERT
                expect(dataLayerService.pushPaymentAssistanceErrorEvent).toHaveBeenCalledWith(apiErrorPoint, jasmine.any(String), jasmine.any(String));
            });
        });
    });

});

function getSavedInstalmentPlan(): PaymentArrangementInstalmentSummaryApi {
    const startDate = moment(routeParams.startDate);

    const summaryItemOne = <PaymentArrangementInstalmentSummaryItemApi> {
        instalmentAmount: 25,
        instalmentDate: DateHelper.toIsoDateString(moment(startDate).add(7, 'day'))
    };

    const summaryItemTwo = <PaymentArrangementInstalmentSummaryItemApi> {
        instalmentAmount: 26,
        instalmentDate: DateHelper.toIsoDateString(moment(startDate).add(14, 'day'))
    };

    return <PaymentArrangementInstalmentSummaryApi> {
        instalments: [summaryItemOne, summaryItemTwo]
    };
}
