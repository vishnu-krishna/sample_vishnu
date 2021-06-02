import { Observable } from 'rxjs/Rx';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { state } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { Mock } from 'ts-mocks/lib';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import * as moment from 'moment';

import { Now } from '../../../../../../shared/service/now.service';
import { IAccountServiceMA, AccountViewModel, ContractViewModel } from '../../../../../services/account.service';
import { IPaymentExtensionEligibility, PaymentExtensionContractEligibility } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { InstalmentPlanFrequency, PaymentArrangementInstalmentSummary, PaymentArrangementInstalmentSummaryItem } from '../../../../../services/paymentScheme/paymentSchemeApi.service';
import { DataLayerStubService } from '../../../../../../test/stubs/dataLayer.stub.service';
import { DataLayerService, ModalName, EventCategory, EventAction, EventLabel } from '../../../../../../shared/service/dataLayer.service';
import { MauiFuelChipFuelType, MauiFuelChipFuelContext } from '../../../../../maui/fuelChip';

import { FuelChipDataModel } from '../../models';
import { InstalmentStatus, PaymentAssistancePlanInstalmentsProgressItem } from '../instalments';
import { FuelChipData } from '../../extend/eligibility/fuelChipData';
import { FuelChipClassificationService, IFuelChipClassificationService, FuelChipService, ClassifiedFuelChips } from '../../services';
import { PaymentAssistancePlanSuccessModule } from './paymentAssistancePlanSuccess.module';
import { PaymentAssistancePlanSuccessComponent } from './paymentAssistancePlanSuccess.component';
import { IPaymentExtensionStateService } from '../../extend/services/paymentExtensionState.service';
import { CalendarReminderModel } from '../../../../../maui/calendarReminder';
import { PaymentService } from '../../../../../services/payment.service';
import { ISettingsService } from '../../../../../services/settings/settings.service.interface';
import { IPaymentMethodsService } from '../../../../../services/settings/paymentMethods.service.interface';
import { PromoTileType } from './paymentAssistancePlanSuccess.component.enum';
import { Spied } from '../../../../../services/generics/tsmocks/spied.type';
import { PaymentAssistancePlanConfirmStateModel } from '../confirm/models';
import { GenericStateServiceMockFactory } from './../../../../../services/generics/tsmocks/genericState.service.tsmock';
import { GenericStateService } from './../../../../../services/generics/genericState.service';
import { EBillingBuilder, PaymentMethodBuilder } from './paymentAssistancePlanSuccessTestDataBuilder';
import { SurveyService, SurveyType } from '../../../../../services/survey.service';
import { DocumentService } from '../../../../../../shared/service/document.service';
import { By } from '@angular/platform-browser';

describe('Payment Assistance Plan Success Component', () => {

    // Test seed
    const accountNumber = '1200000000';
    const contractNumber = '1211111111';
    const address = 'test address';
    const contract = new ContractViewModel(contractNumber);
    contract.address = address;
    const accounts = [
        new AccountViewModel(accountNumber, [contract])
    ];
    const amount = 10;
    const paymentExtensionContractEligibility = new PaymentExtensionContractEligibility(contractNumber, true);
    const fuelChipData = new FuelChipDataModel(accountNumber, contractNumber, MauiFuelChipFuelType.Electricity, [], paymentExtensionContractEligibility, MauiFuelChipFuelContext.None);
    const today = new Date('2018-03-27');
    const todayFormatted = moment(today).format('YYYY-MM-DD');
    const tomorrow = moment(today).add(1, 'days').toDate();
    const tomorrowFormatted = moment(tomorrow).format('YYYY-MM-DD');
    const paymentArrangementInstalmentSummaryItemToday: PaymentArrangementInstalmentSummaryItem = {
        instalmentDate: todayFormatted,
        instalmentAmount: amount
    };
    const paymentArrangementInstalmentSummaryItemTomorrow: PaymentArrangementInstalmentSummaryItem = {
        instalmentDate: tomorrowFormatted,
        instalmentAmount: amount
    };

    const paymentArrangementInstalmentSummary: PaymentArrangementInstalmentSummary = { instalments: [paymentArrangementInstalmentSummaryItemToday] };
    const paymentAssistancePlanConfirmState: PaymentAssistancePlanConfirmStateModel = {
        accountNumber: accountNumber,
        contractNumber: contractNumber,
        frequency: InstalmentPlanFrequency.Weekly,
        totalDue: amount,
        startDate: today,
        paymentArrangementInstalmentSummary: paymentArrangementInstalmentSummary
    };
    // Create a wrapper for services that are not called under test
    const emptyMockService = {};
    const emptyClassifiedFuelChips: ClassifiedFuelChips = {
        eligibleFuelChips: [],
        alreadyExtendedFuelChips: [],
        ineligibleFuelChips: []
    };

    const settingsWithEBilling = EBillingBuilder.create().whenOnEBilling().builder();
    const settingsWithoutEBilling = EBillingBuilder.create().whenNOtOnEBilling().builder();
    const paymentMethodsWithSMSPay = PaymentMethodBuilder.create().whenOnSmsPay().builder();
    const paymentMethodsWithoutSMSPay = PaymentMethodBuilder.create().whenNotOnSmsPay().builder();

    let comp: PaymentAssistancePlanSuccessComponent;
    let fixture: ComponentFixture<PaymentAssistancePlanSuccessComponent>;

    let route: ActivatedRoute;
    let router: Router;
    let dataLayerService: DataLayerService;

    let accountMockService: Mock<IAccountServiceMA>;
    let accountServiceGetAccountsSpy: jasmine.Spy;

    let fuelChipMockService: Mock<FuelChipService>;
    let fuelChipServiceInitSpy: jasmine.Spy;
    let fuelChipServiceGetFuelChipSpy: jasmine.Spy;

    let paymentMockService: Mock<PaymentService>;
    let paymentServiceOpenPaymentModal: jasmine.Spy;

    const confirmStateServiceMockFactory = new GenericStateServiceMockFactory<PaymentAssistancePlanConfirmStateModel>();
    let confirmStateServiceMock: Spied<GenericStateService<PaymentAssistancePlanConfirmStateModel>>;

    let paymentExtensionStateMockService: Mock<IPaymentExtensionStateService>;
    let paymentExtensionStateServiceClearSelectedFuelChip: jasmine.Spy;

    let settingsMockService: Mock<ISettingsService>;
    let settingsServiceGetSettings: jasmine.Spy;

    let paymentMethodsMockService: Mock<IPaymentMethodsService>;
    let paymentMethodsServiceGetPaymentMethods: jasmine.Spy;

    let showFeedbackSurveySpy: jasmine.Spy;

    const routes: Routes = [
        { path: 'overview', redirectTo: '' },
        { path: 'bills', redirectTo: '' },
        { path: 'bills/paymentassistance/plan/choose/:contractAccountNumber/:contractNumber', redirectTo: '' }
    ];

    const routeParams = {
        contractAccountNumber: accountNumber,
        contractNumber: contractNumber
    };

    let activatedRouteStub = {
        get params(): Observable<{}> {
            return Observable.of(routeParams);
        }
    };

    beforeAll(() => {
        // Mock the Now date
        localStorage.setItem('selfService.mock.now', `${todayFormatted}T00:00:00`);
    });

    beforeEach(() => {

        // Account Service typesafe mock
        accountMockService = new Mock<IAccountServiceMA>();
        accountServiceGetAccountsSpy = accountMockService
            .setup((x) => x.getAccounts)
            .is(() => {
                return Observable.of(null);
            }).Spy;

        // Fuel Service typesafe mock
        fuelChipMockService = new Mock<FuelChipService>();
        fuelChipServiceInitSpy = fuelChipMockService
            .setup((x) => x.init)
            .is(() => {
                return Observable.of(emptyClassifiedFuelChips);
            }).Spy;

        fuelChipServiceGetFuelChipSpy = fuelChipMockService
            .setup((x) => x.getFuelChip)
            .is(() => {
                return null;
            }).Spy;

        paymentMockService = new Mock<PaymentService>();
        paymentServiceOpenPaymentModal = paymentMockService
            .setup((x) => x.openPaymentModal)
            .is(() => Observable.of(null))
            .Spy;

        paymentExtensionStateMockService = new Mock<IPaymentExtensionStateService>();
        paymentExtensionStateServiceClearSelectedFuelChip = paymentExtensionStateMockService
            .setup((x) => x.clearSelectedFuelChip).Spy;

        confirmStateServiceMock = confirmStateServiceMockFactory.createMock();

        paymentExtensionStateMockService = new Mock<IPaymentExtensionStateService>();
        paymentExtensionStateServiceClearSelectedFuelChip = paymentExtensionStateMockService
            .setup((x) => x.clearSelectedFuelChip).Spy;

        settingsMockService = new Mock<ISettingsService>();
        settingsServiceGetSettings = settingsMockService
            .setup((x) => x.getSettings)
            .is(() => Observable.of(null))
            .Spy;

        paymentMethodsMockService = new Mock<IPaymentMethodsService>();
        paymentMethodsServiceGetPaymentMethods = paymentMethodsMockService
            .setup((x) => x.getPaymentMethods)
            .is(() => Observable.of(null))
            .Spy;

        const surveyMockService = new Mock<SurveyService>();
        showFeedbackSurveySpy = surveyMockService
            .setup((x) => x.showFeedbackSurvey)
            .Spy;

        TestBed.configureTestingModule({
            declarations: [
            ],
            imports: [
                PaymentAssistancePlanSuccessModule,
                RouterTestingModule.withRoutes(routes)
            ],
            providers: [
                Now,
                { provide: IAccountServiceMA, useValue: accountMockService.Object },
                { provide: IPaymentExtensionEligibility, useValue: emptyMockService },
                { provide: IFuelChipClassificationService, useClass: FuelChipClassificationService },
                { provide: PaymentService, useValue: paymentMockService.Object },
                { provide: DataLayerService, useClass: DataLayerStubService },
                { provide: FuelChipService, useValue: fuelChipMockService.Object },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: 'paymentAssistancePlanConfirmStateService', useValue: confirmStateServiceMock },
                { provide: 'AppContentBranch', useValue: 'selfService' },
                { provide: IPaymentExtensionStateService, useValue: paymentExtensionStateMockService.Object },
                { provide: ISettingsService, useValue: settingsMockService.Object },
                { provide: IPaymentMethodsService, useValue: paymentMethodsMockService.Object },
                { provide: SurveyService, useValue: surveyMockService.Object },
                DocumentService
            ]
        });

        fixture = TestBed.createComponent(PaymentAssistancePlanSuccessComponent);
        comp = fixture.componentInstance;

        route = TestBed.get(ActivatedRoute);
        router = TestBed.get(Router);
        dataLayerService = TestBed.get(DataLayerService);
    });

    describe('ngOnInit()', () => {

        describe('routeParms', () => {

            it('should set accountNumber property', () => {

                // ARRANGE
                spyOn(comp, 'createCalendarReminder');
                // ACT

                comp.ngOnInit();

                // ASSERT
                expect(comp.accountNumber).toBe('1200000000');
            });

            it('should set contractNumber property', () => {
                // ARRANGE
                spyOn(comp, 'createCalendarReminder');

                // ACT
                comp.ngOnInit();

                // ASSERT
                expect(comp.contractNumber).toBe('1211111111');
            });

        });

        describe('fuelChipService.init', () => {
            it('should set showLoader to false', () => {
                // ARRANGE
                spyOn(comp, 'createCalendarReminder');

                // ACT
                comp.ngOnInit();

                // ASSERT
                expect(comp.showLoader).toBeFalsy();
            });

            it('should call createModels', () => {
                // ARRANGE
                spyOn(comp, 'createModels');
                spyOn(comp, 'createCalendarReminder');

                // ACT
                comp.ngOnInit();

                // ASSERT
                expect(comp.createModels).toHaveBeenCalledWith(accountNumber, contractNumber, emptyClassifiedFuelChips);
            });

            it('should show chat button', () => {
                // ARRANGE
                spyOn(comp, 'createModels');
                spyOn(comp, 'createCalendarReminder');

                // ACT
                comp.ngOnInit();
                fixture.detectChanges();

                // assert
                const chatButton = fixture.debugElement.query(By.css('[chatButtonId=LPPaymentAssistanceSuccess]'));
                expect(chatButton).toBeTruthy();
            });

            describe('getPromoTileType', () => {

                it('should call getPromoTileType', () => {

                    // ARRANGE
                    settingsServiceGetSettings.and.returnValue(Observable.of(settingsWithoutEBilling));
                    paymentMethodsServiceGetPaymentMethods.and.returnValue(Observable.of(paymentMethodsWithSMSPay));

                    spyOn(comp, 'getPromoTileType');
                    spyOn(comp, 'createModels');
                    spyOn(comp, 'createCalendarReminder');

                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.getPromoTileType).toHaveBeenCalledWith(settingsWithoutEBilling, paymentMethodsWithSMSPay, accountNumber);
                });

                it('should set promoTileToBeDisplayed to none when customer has ebilling and smsPay', () => {
                    // ARRANGE
                    settingsServiceGetSettings.and.returnValue(Observable.of(settingsWithEBilling));
                    paymentMethodsServiceGetPaymentMethods.and.returnValue(Observable.of(paymentMethodsWithSMSPay));
                    spyOn(comp, 'createModels');
                    spyOn(comp, 'createCalendarReminder');

                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.promoTileToBeDisplayed).toEqual(PromoTileType.none);
                });

                it('should set promoTileToBeDisplayed to ebilling when customer does not have ebilling and has smsPay', () => {
                    // ARRANGE
                    settingsServiceGetSettings.and.returnValue(Observable.of(settingsWithoutEBilling));
                    paymentMethodsServiceGetPaymentMethods.and.returnValue(Observable.of(paymentMethodsWithSMSPay));
                    spyOn(comp, 'createModels');
                    spyOn(comp, 'createCalendarReminder');

                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.promoTileToBeDisplayed).toEqual(PromoTileType.eBilling);
                });

                it('should set promoTileToBeDisplayed to ebilling when customer does not have ebilling and does not have smsPay', () => {
                    // ARRANGE
                    settingsServiceGetSettings.and.returnValue(Observable.of(settingsWithoutEBilling));
                    paymentMethodsServiceGetPaymentMethods.and.returnValue(Observable.of(paymentMethodsWithoutSMSPay));
                    spyOn(comp, 'createModels');
                    spyOn(comp, 'createCalendarReminder');

                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.promoTileToBeDisplayed).toEqual(PromoTileType.eBilling);
                });

                it('should set promoTileToBeDisplayed to smsPay when customer has ebilling and does not have smsPay', () => {
                    // ARRANGE
                    settingsServiceGetSettings.and.returnValue(Observable.of(settingsWithEBilling));
                    paymentMethodsServiceGetPaymentMethods.and.returnValue(Observable.of(paymentMethodsWithoutSMSPay));
                    spyOn(comp, 'createModels');
                    spyOn(comp, 'createCalendarReminder');

                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.promoTileToBeDisplayed).toEqual(PromoTileType.smsPay);
                });
            });
        });

        describe('makeAPaymentClicked()', () => {

            beforeEach(() => {
                // ARRANGE
                Object.assign(comp, {
                    accountNumber: accountNumber,
                    contractNumber: contractNumber,
                    firstInstalmentAmount: amount
                });

                accountServiceGetAccountsSpy.and.returnValue(Observable.of(accounts));
                spyOn(comp, 'openPaymentModal');
                spyOn(dataLayerService, 'pushPaymentAssistancePaymentMadeEvent');

                // ACT
                comp.makeAPaymentClicked();

            });

            it('should call openPaymentModal()', () => {

                // ASSERT
                expect(comp.openPaymentModal).toHaveBeenCalledWith(accounts, accountNumber, contractNumber, amount);

            });

            it('should call pushPaymentAssistancePaymentMadeEvent of the datalayer service for analytics', () => {

                // ASSERT
                expect(dataLayerService.pushPaymentAssistancePaymentMadeEvent).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(String));
            });

        });

        describe('goToOverviewClicked()', () => {

            it(`should navigate to '/overview'`, () => {
                // ARRANGE
                spyOn(router, 'navigate');

                // ACT
                comp.goToOverviewClicked();

                // ASSERT
                expect(router.navigate).toHaveBeenCalledWith(['/overview']);
            });
        });

        describe('onFuelChipSelected()', () => {

            it(`should call paymmentExtensionStateService.clearSelectedFuelChip()`, () => {
                // ARRANGE
                spyOn(router, 'navigate');

                // ACT
                comp.onFuelChipSelected({
                    accountNumber: accountNumber,
                    contractNumber: contractNumber
                });

                // ASSERT
                expect(paymentExtensionStateServiceClearSelectedFuelChip).toHaveBeenCalled();
            });

            it(`should navigate to '/bills/paymentassistance/choose/:accountNumber/:contractNumber'`, () => {
                // ARRANGE
                spyOn(router, 'navigate');

                // ACT
                comp.onFuelChipSelected({
                    accountNumber: accountNumber,
                    contractNumber: contractNumber
                });

                // ASSERT
                expect(router.navigate).toHaveBeenCalledWith([`/bills/paymentassistance/choose/${accountNumber}/${contractNumber}`], { queryParamsHandling: 'preserve' });
            });
        });

        describe('openPaymentModal()', () => {

            beforeEach(() => {
                // ARRANGE
                spyOn(comp, 'getAccountContract').and.returnValue(contract);
                spyOn(dataLayerService, 'pushClickEvent');
                paymentServiceOpenPaymentModal.and.returnValue(Observable.of(true));

                // ACT
                comp.openPaymentModal(accounts, accountNumber, contractNumber, amount);
            });

            it('should call getAccountPaymentContract()', () => {
                expect(comp.getAccountContract).toHaveBeenCalledWith(accounts, accountNumber, contractNumber);
            });

            it('should call dataLayerService.pushClickEvent()', () => {
                expect(dataLayerService.pushClickEvent).toHaveBeenCalledWith(ModalName.None, EventCategory.AccountsPush, EventAction.ClickAction, EventLabel.MakePayment);
            });

            it('should call paymentService.openPaymentModal()', () => {
                expect(paymentServiceOpenPaymentModal).toHaveBeenCalledWith(contract, amount, address);
            });

            it('should set showMakeAPaymentLoading flag to false', () => {
                expect(comp.showMakeAPaymentLoading).toBeFalsy();
                expect(comp.hasShownPaymentSurvey).toBe(true);
            });
        });

        describe('getAccountContract()', () => {
            it('should return the specified contract', () => {
                // ACT
                const accountContract = comp.getAccountContract(accounts, accountNumber, contractNumber);

                // ASSERT
                expect(accountContract).toEqual(contract);
            });
        });

        describe('createModels()', () => {

            beforeEach(() => {
                // ARRANGE
                fuelChipServiceGetFuelChipSpy.and.returnValue(fuelChipData);
                spyOn(comp, 'createFuelChipsModel').and.returnValue({ classifiedFuelChips: emptyClassifiedFuelChips });
                spyOn(comp, 'createFuelChipHeaderModel').and.returnValue(fuelChipData);
            });

            it('should call fuelChipService.getFuelChip()', () => {
                // ACT
                comp.createModels(accountNumber, contractNumber, emptyClassifiedFuelChips);

                // ASSERT
                expect(fuelChipServiceGetFuelChipSpy).toHaveBeenCalledWith(accountNumber, contractNumber);
            });

            it('should call createFuelChipsModel()', () => {
                // ACT
                comp.createModels(accountNumber, contractNumber, emptyClassifiedFuelChips);

                // ASSERT
                expect(comp.createFuelChipsModel).toHaveBeenCalledWith(emptyClassifiedFuelChips);
            });

            it('should set fuelChipsModel', () => {
                // ACT
                comp.createModels(accountNumber, contractNumber, emptyClassifiedFuelChips);

                // ASSERT
                expect(comp.fuelChipsModel).toBeDefined();
            });

            it('should call createFuelChipHeaderModel()', () => {
                // ACT
                comp.createModels(accountNumber, contractNumber, emptyClassifiedFuelChips);

                // ASSERT
                expect(comp.createFuelChipHeaderModel).toHaveBeenCalledWith(fuelChipData);
            });

            it('should set fuelChipHeaderModel', () => {
                // ACT
                comp.createModels(accountNumber, contractNumber, emptyClassifiedFuelChips);

                // ASSERT
                expect(comp.fuelChipHeaderModel).toBeDefined();
            });

            describe('checkEligibleFuelChipsExist()', () => {

                it('should call checkEligibleFuelChipsExist()', () => {
                    // ARRANGE
                    spyOn(comp, 'checkEligibleFuelChipsExist');

                    // ACT
                    comp.createModels(accountNumber, contractNumber, emptyClassifiedFuelChips);

                    // ASSERT
                    expect(comp.checkEligibleFuelChipsExist).toHaveBeenCalled();
                });

                it('should set hasEligibleFuelChips property (true)', () => {
                    // ARRANGE
                    spyOn(comp, 'checkEligibleFuelChipsExist').and.returnValue(true);

                    // ACT
                    comp.createModels(accountNumber, contractNumber, emptyClassifiedFuelChips);

                    // ASSERT
                    expect(comp.hasEligibleFuelChips).toBeTruthy();
                });

            });

            describe('paymentAssistancePlanConfirmStateService.hasState()', () => {

                describe('is true', () => {

                    beforeEach(() => {
                        // ARRANGE
                        confirmStateServiceMock.hasState.and.returnValue(true);
                        confirmStateServiceMock.getState.and.returnValue(paymentAssistancePlanConfirmState);
                        spyOn(comp, 'createStateBasedModels');
                    });

                    it('paymentAssistancePlanConfirmStateService.getState() is called', () => {
                        // ACT
                        comp.createModels(accountNumber, contractNumber, emptyClassifiedFuelChips);

                        // ASSERT
                        expect(confirmStateServiceMock.getState).toHaveBeenCalled();
                    });

                    it('createStateBasedModels() is called', () => {
                        // ACT
                        comp.createModels(accountNumber, contractNumber, emptyClassifiedFuelChips);

                        // ASSERT
                        expect(comp.createStateBasedModels).toHaveBeenCalledWith(paymentAssistancePlanConfirmState);
                    });

                });

                describe('is false', () => {

                    it(`should navigate to '/bills'`, () => {
                        // ARRANGE
                        confirmStateServiceMock.hasState.and.returnValue(false);
                        spyOn(router, 'navigate');

                        // ACT
                        comp.createModels(accountNumber, contractNumber, emptyClassifiedFuelChips);

                        // ASSERT
                        expect(router.navigate).toHaveBeenCalledWith(['/bills']);
                    });
                });
            });
        });

        describe('checkEligibleFuelChipsExist()', () => {

            it('should return true when there are eligible fuel chips', () => {
                // ACT
                const classifiedFuelChips: ClassifiedFuelChips = {
                    ...emptyClassifiedFuelChips,
                    eligibleFuelChips: [fuelChipData]
                };
                const checkEligibleFuelChipsExist = comp.checkEligibleFuelChipsExist(classifiedFuelChips);

                // ASSERT
                expect(checkEligibleFuelChipsExist).toBeTruthy();
            });

            it('should return false when there are NO eligible fuel chips', () => {
                // ACT
                const checkEligibleFuelChipsExist = comp.checkEligibleFuelChipsExist(emptyClassifiedFuelChips);

                // ASSERT
                expect(checkEligibleFuelChipsExist).toBeFalsy();
            });

        });

        describe('isDateToday()', () => {

            it('should return true when the date is today', () => {
                // ACT
                const isDateToday = comp.isDateToday(today);

                // ASSERT
                expect(isDateToday).toBeTruthy();
            });

            it('should return false when the date is NOT today', () => {
                // ACT
                const isDateTotal = comp.isDateToday(tomorrow);

                // ASSERT
                expect(isDateTotal).toBeFalsy();
            });

            it('should return true when the date is NOT defined', () => {
                // ACT
                const isDateToday = comp.isDateToday(undefined);

                // ASSERT
                expect(isDateToday).toBeTruthy();
            });
        });

        describe('createFuelChipHeaderModel()', () => {

            it('should create the model', () => {
                // ACT
                const model = comp.createFuelChipHeaderModel(fuelChipData);
                // ASSERT
                expect(model.fuelChip).toEqual(fuelChipData);
            });
        });

        describe('createFuelChipsModel()', () => {
            it('should create the model', () => {
                // ACT
                const model = comp.createFuelChipsModel(emptyClassifiedFuelChips);

                // ASSERT
                expect(model).toEqual({ classifiedFuelChips: emptyClassifiedFuelChips });
            });
        });

        describe('createInstalmentsModel()', () => {
            it('should create the model', () => {
                // ACT
                const model = comp.createInstalmentsModel(paymentArrangementInstalmentSummary.instalments);

                // ASSERT
                expect(model).toBeDefined();
            });
        });

        describe('mapPaymentArrangementInstalmentSummaryItems()', () => {

            it('should have 2 progress items', () => {
                // ACT
                const items = comp.mapPaymentArrangementInstalmentSummaryItems([paymentArrangementInstalmentSummaryItemToday, paymentArrangementInstalmentSummaryItemToday]);

                // ASSERT
                expect(items.length).toBe(2);
            });

            it('should set the instalment status to Due for the first item', () => {
                // ACT
                const items = comp.mapPaymentArrangementInstalmentSummaryItems([paymentArrangementInstalmentSummaryItemToday, paymentArrangementInstalmentSummaryItemTomorrow]);

                // ASSERT
                expect(items[0]).toEqual(new PaymentAssistancePlanInstalmentsProgressItem(amount, today, InstalmentStatus.Due));
            });

            it('should set the instalment status to Upcoming for the second item', () => {
                // ACT
                const items = comp.mapPaymentArrangementInstalmentSummaryItems([paymentArrangementInstalmentSummaryItemToday, paymentArrangementInstalmentSummaryItemTomorrow]);

                // ASSERT
                expect(items[1]).toEqual(new PaymentAssistancePlanInstalmentsProgressItem(amount, tomorrow, InstalmentStatus.Upcoming));
            });
        });

        describe('createSummaryModel()', () => {
            it('should create the model', () => {
                // ACT
                const model = comp.createSummaryModel(paymentAssistancePlanConfirmState, today);

                // ASSERT
                expect(model).toEqual({
                    totalDue: amount,
                    frequency: InstalmentPlanFrequency.Weekly,
                    startDate: today,
                    firstInstalmentDue: today
                });
            });
        });

        describe('createStateBasedModels()', () => {

            it('should set firstInstalmentAmount to 10', () => {
                // ACT
                comp.createStateBasedModels(paymentAssistancePlanConfirmState);

                // ASSERT
                expect(comp.firstInstalmentAmount).toEqual(amount);
            });

            it('should populate the instalmentModel', () => {
                // ACT
                comp.createStateBasedModels(paymentAssistancePlanConfirmState);

                // ASSERT
                expect(comp.instalmentsModel).toBeDefined();
            });

            it('should populate the summaryModel', () => {
                // ACT
                comp.createStateBasedModels(paymentAssistancePlanConfirmState);

                // ASSERT
                expect(comp.summaryModel).toBeDefined();
            });

            it('should set showMakeAPayment to true', () => {
                // ACT
                comp.createStateBasedModels(paymentAssistancePlanConfirmState);

                // ASSERT
                expect(comp.showMakeAPayment).toBeTruthy();
            });
        });

        describe('getFirstInstalmentDate()', () => {

            it('should return the instalmentDate when there is instalments', () => {
                // ACT
                const date = comp.getFirstInstalmentDate(paymentArrangementInstalmentSummary.instalments);

                // ASSERT
                expect(date).toEqual(today);
            });

            it('should return null when there are NO instalments', () => {
                // ACT
                const date = comp.getFirstInstalmentDate([]);

                // ASSERT
                expect(date).toBeNull();
            });
        });

        describe('getFirstInstalmentAmount()', () => {

            it('should return the instalment amount when there is instalments', () => {
                // ACT
                const firstInstalmentAmount = comp.getFirstInstalmentAmount(paymentArrangementInstalmentSummary.instalments);

                // ASSERT
                expect(firstInstalmentAmount).toEqual(amount);
            });

            it('should return 0 when there are NO instalments', () => {
                // ACT
                const firstInstalmentAmount = comp.getFirstInstalmentAmount([]);

                // ASSERT
                expect(firstInstalmentAmount).toBe(0);
            });
        });

        describe('analytics tracking', () => {
            it('add analytics tracking event when adding calendar event', () => {
                // arrange
                const link = 'DUMMY LINK';
                spyOn(dataLayerService, 'trackAddCalendarReminderEvent');

                // act
                comp.calendarSelected(link);

                // assert
                expect(dataLayerService.trackAddCalendarReminderEvent).toHaveBeenCalledWith(link, jasmine.any(String), jasmine.any(String));
            });
        });
    });

    describe('shouldShowSurveyOnNavigateAway', () => {
        it('should return true when no eligible fuel chips and payment is not made', () => {
            // arrange
            comp.hasEligibleFuelChips = false;
            comp.hasShownPaymentSurvey = false;

            // act
            const result = comp.shouldShowSurvey();

            // assert
            expect(result).toBe(true);
        });

        it('should return false when there is eligible fuel chips', () => {
            // arrange
            comp.hasEligibleFuelChips = true;

            // act
            const result = comp.shouldShowSurvey();

            // assert
            expect(result).toBe(false);
        });

        it('should return false when is no eligible fuel chips and payment is made', () => {
            // arrange
            comp.hasEligibleFuelChips = false;
            comp.hasShownPaymentSurvey = true;

            // act
            const result = comp.shouldShowSurvey();

            // assert
            expect(result).toBe(false);
        });
    });

    describe('triggerLeanEngageSurvey', () => {
        it('should show instalment plan survey when survey popup check passes', () => {
            // arrange
            spyOn(comp, 'shouldShowSurvey').and.returnValue(true);

            // act
            comp.triggerLeanEngageSurvey();

            // assert
            expect(showFeedbackSurveySpy).toHaveBeenCalledWith(SurveyType.instalmentPlanSuccess);
        });

        it('should not show instalment plan survey when survey popup check fails', () => {
            // arrange
            spyOn(comp, 'shouldShowSurvey').and.returnValue(false);

            // act
            comp.triggerLeanEngageSurvey();

            // assert
            expect(showFeedbackSurveySpy).not.toHaveBeenCalled();
        });
    });

    describe('page navigate away', () => {
        it('should try show survey', ((done) => {
            // arrange
            const anyUrl = 'overview';
            spyOn(comp, 'createCalendarReminder');
            spyOn(comp, 'triggerLeanEngageSurvey');

            // act
            comp.ngOnInit();
            router.navigate([anyUrl]).then(() => {
                // assert
                expect(comp.triggerLeanEngageSurvey).toHaveBeenCalled();
                done();
            });
        }));
    });
});
