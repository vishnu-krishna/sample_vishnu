import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By, DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Mock } from 'ts-mocks/lib';
import * as moment from 'moment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoggerInterface } from '../../../../shared/instrumentation/logger.interface';
import { ApiService } from '../../../../shared/service/api.service';
import { ContentService } from '../../../../shared/service/content.service';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { Now } from '../../../../shared/service/now.service';
import { RedLineApiService } from '../../../../shared/service/redLineApi.service';
import { ModalService } from '../../../modal/modal.service';
import { BillingModule } from '../../../modules/billing.module';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';
import { ContractViewModel, BillViewModel } from '../../../services/account.service';
import { EventService } from '../../../services/event.service';
import { FeatureFlagTypes } from '../../../services/featureFlag.constants';
import { FeatureFlagService } from '../../../services/featureFlag.service';
import { FeatureFlagMockService } from '../../../services/mock/featureflag.mock.service';
import { PaygAccountService } from '../../../services/paygAccount.service';
import { PaymentService } from '../../../services/payment.service';
import { IPaymentExtensionApplication } from '../../../services/paymentScheme/paymentExtensionApplication.service';
import { PaymentExtensionContractEligibility, PaymentExtensionIneligibilityReasons } from '../../../services/paymentScheme/paymentExtensionEligibility.service';
import { IPaymentMethodsService } from '../../../services/settings/paymentMethods.service.interface';
import { FuelChipData } from '../paymentAssistance/extend/eligibility/fuelChipData';
import { ClassifiedFuelChips } from '../paymentAssistance/extend/eligibility/services/fuelChipClassification.service';
import { IPaymentExtensionFuelChipService } from '../paymentAssistance/extend/eligibility/services/paymentExtensionFuelChip.service';
import { BillPanelComponent, BillTypes } from './billPanel.component';
import { IPaymentExtensionStateService } from '../paymentAssistance/extend/services/paymentExtensionState.service';
import { ProductAttributesService } from '../../../services/productAttributesService';
import { EnergyInsightsService } from '../../../services/energyInsights.service';
import { MockEnergyInsightsService } from '../../../services/mock/energyInsights.mock.service';
import { BillDescriptionService } from '../../../services/billDescription.service';
import { IPaymentSchemeApi, PaymentSchemeApiService } from '../../../services/paymentScheme/paymentSchemeApi.service';
import { InstalmentPlanService, InstalmentPlanData } from '../../../services/paymentScheme/instalmentPlan.service';
import { PaymentAssistanceNavigationPersistedStateService, IPaymentAssistanceNavigationPersistedStateService } from './../paymentAssistance/services/paymentAssistanceNavigationPersistedState.service';
import { PaymentAssistancePlanInstalmentsModel } from '../paymentAssistance/plan/instalments';
import { InstalmentPlanModel } from './billInstalmentPlanDescription/billInstalmentPlanDescription.component';
import { InstalmentPlanBillingBuilder } from './test/instalmentPlanBillingBuilder';

describe('Bill Panel Component', () => {
    let paymentExtensionStateService: IPaymentExtensionStateService;
    let paymentExtensionFuelChipService: IPaymentExtensionFuelChipService;
    let featureFlagMockService: FeatureFlagMockService = new FeatureFlagMockService();
    let router: Router;

    const contractAccountNo1: string = '111111';
    let contract1: ContractViewModel;

    let classifiedFuelChips: ClassifiedFuelChips;

    const contentServiceMock = {
        getContent: () => Observable.of('')
    };

    let fixture: ComponentFixture<BillPanelComponent>;
    let comp: BillPanelComponent;
    let de: DebugElement;

    // Typesafe mocks
    let paymentExtensionFuelChipMockService: Mock<IPaymentExtensionFuelChipService>;
    let paymentExtensionFuelChipServiceInitSpy: jasmine.Spy;
    let paymentExtensionFuelChipServiceClassifiedFuelChipsSpy: jasmine.Spy;
    let nowMockService: Mock<Now>;
    let nowDateSpy: jasmine.Spy;
    const paymentAssistanceNavigationPersistedStateMockService = new Mock<IPaymentAssistanceNavigationPersistedStateService>();
    let paymentAssistanceNavigationPersistedStateServiceSetState: jasmine.Spy;

    const today = new Date();
    const tomorrow = moment(today).add(1, 'days').toDate();
    const yesterday = moment(today).add(-1, 'days').toDate();
    const todayMinus5Days = moment(today).add(-5, 'days').toDate();
    const billDueTomorrow = new BillViewModel(0, 0, todayMinus5Days, tomorrow, false, false, null, null, null);
    const billDueYesterday = new BillViewModel(0, 0, todayMinus5Days, yesterday, false, false, null, null, null);
    const billDueNullDate = new BillViewModel(0, 0, todayMinus5Days, null, false, false, null, null, null);

    beforeEach(() => {

        // Create a wrapper for services that are not called under test
        const emptyMockService = {};
        const paymentExtensionStateServiceMock = {
            initNewSession: (selectedContractNumber: string, eligibleFuelChips: FuelChipData[]) => {
                throw new Error('initNewSession is not implemented');
            }
        };

        // Setup Typesafe mocks
        paymentExtensionFuelChipMockService = new Mock<IPaymentExtensionFuelChipService>();
        paymentExtensionFuelChipServiceInitSpy = paymentExtensionFuelChipMockService
            .setup((x) => x.init)
            .is((accountNumber, contractNumber) => {
                return Observable.of(null);
            }).Spy;

        paymentExtensionFuelChipServiceClassifiedFuelChipsSpy = paymentExtensionFuelChipMockService
            .setup((x) => x.classifiedFuelChips).Spy;

        nowMockService = new Mock<Now>();
        nowDateSpy = nowMockService
            .setup((x) => x.date)
            .is(() => {
                return moment(today);
            }).Spy;

        paymentAssistanceNavigationPersistedStateServiceSetState = paymentAssistanceNavigationPersistedStateMockService
            .setup((x) => x.setState).Spy;

        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                MyAccountMaterialModule,
                BillingModule,
                // Mock setup for routes
                RouterTestingModule.withRoutes([
                    { path: 'bills/paymentassistance/extend/confirm/:contractAccountNumber/:contractNumber', redirectTo: '' },
                    { path: 'bills/paymentassistance/choose/:contractAccountNumber/:contractNumber', redirectTo: '' }
                ]),
                HttpClientTestingModule,
            ],
            providers: [
                ModalService,
                { provide: Now, useValue: nowMockService.Object },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: FeatureFlagService, useValue: featureFlagMockService },
                { provide: 'AppContentBranch', useValue: 'selfService' },
                { provide: EventService, useValue: emptyMockService },
                { provide: RedLineApiService, useValue: emptyMockService },
                { provide: PaymentService, useValue: emptyMockService },
                { provide: IPaymentExtensionStateService, useValue: paymentExtensionStateServiceMock },
                { provide: IPaymentExtensionFuelChipService, useValue: paymentExtensionFuelChipMockService.Object },
                { provide: ContentService, useValue: contentServiceMock },
                { provide: DataLayerService, useValue: emptyMockService },
                { provide: ApiService, useValue: emptyMockService },
                { provide: PaygAccountService, useValue: emptyMockService },
                { provide: LoggerInterface, useValue: emptyMockService },
                { provide: IPaymentMethodsService, useValue: emptyMockService },
                { provide: ProductAttributesService, useValue: emptyMockService },
                { provide: BillDescriptionService, useValue: emptyMockService },
                { provide: IPaymentSchemeApi, useValue: emptyMockService },
                InstalmentPlanService,
                { provide: IPaymentAssistanceNavigationPersistedStateService, useValue: paymentAssistanceNavigationPersistedStateMockService.Object },
                { provide: EnergyInsightsService, useClass: MockEnergyInsightsService },

                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });

        fixture = TestBed.createComponent(BillPanelComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        paymentExtensionStateService = TestBed.get(IPaymentExtensionStateService);
        paymentExtensionFuelChipService = TestBed.get(IPaymentExtensionFuelChipService);
        router = de.injector.get(Router);

        contract1 = new ContractViewModel('111');

        let iconRegistry: MatIconRegistry = fixture.debugElement.injector.get(MatIconRegistry);
        let sanitizer: DomSanitizer = fixture.debugElement.injector.get(DomSanitizer);
        iconRegistry.addSvgIcon('icon-tick-in-box', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_elec_enabled.svg'));
        comp.contract = contract1;
    });

    describe('ngOnInit()', () => {
        const extendedDueDate = moment().add(1, 'day').toDate();
        const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;
        const instalmentPlan = new InstalmentPlanBillingBuilder().build();
        let expectedInstalmentPlan: InstalmentPlanModel;

        beforeEach(() => {
            expectedInstalmentPlan = new InstalmentPlanModel(instalmentPlan, comp.contract.isDirectDebit);
        });

        describe('when on payment extension', () => {
            beforeEach(() => {
                featureFlagMockService.setFeatureFlags([FeatureFlagTypes.paymentAssistanceEnabled]);

                comp.contract.extendedDueDate = extendedDueDate;
                comp.contract.instalmentPlan = undefined;

                comp.ngOnInit();
            });

            it('should set hasPaymentExtension to true', () => {
                expect(comp.hasPaymentExtension).toBeTruthy();
            });

            it('should set currentInstalmentPlan to undefined', () => {
                expect(comp.currentInstalmentPlan).toBeUndefined();
            });
        });

        describe('when on instalment plan', () => {
            beforeEach(() => {
                featureFlagMockService.setFeatureFlags([FeatureFlagTypes.paymentAssistanceEnabled]);

                comp.contract.extendedDueDate = undefined;
                comp.contract.instalmentPlan = new InstalmentPlanData(instalmentPlan, progressTracker);

                comp.ngOnInit();
            });

            it('should set hasPaymentExtension to false', () => {
                expect(comp.hasPaymentExtension).toBeFalsy();
            });

            it('should set currentInstalmentPlan to expected value', () => {
                expect(comp.currentInstalmentPlan).toEqual(expectedInstalmentPlan);
            });
        });

        describe('when on instalment plan AND payment extension', () => {
            beforeEach(() => {
                featureFlagMockService.setFeatureFlags([FeatureFlagTypes.paymentAssistanceEnabled]);

                comp.contract.extendedDueDate = extendedDueDate;
                comp.contract.instalmentPlan = new InstalmentPlanData(instalmentPlan, progressTracker);

                comp.ngOnInit();
            });

            it('should set hasPaymentExtension to false', () => {
                expect(comp.hasPaymentExtension).toBeFalsy();
            });

            it('should set currentInstalmentPlan to expected value', () => {
                expect(comp.currentInstalmentPlan).toEqual(expectedInstalmentPlan);
            });
        });

        describe('when on neither instalment plan nor payment extension', () => {
            beforeEach(() => {
                featureFlagMockService.setFeatureFlags([FeatureFlagTypes.paymentAssistanceEnabled]);

                comp.contract.extendedDueDate = undefined;
                comp.contract.instalmentPlan = undefined;

                comp.ngOnInit();
            });

            it('should set hasPaymentExtension to false', () => {
                expect(comp.hasPaymentExtension).toBeFalsy();
            });

            it('should set currentInstalmentPlan to be undefiend', () => {
                expect(comp.currentInstalmentPlan).toBeUndefined();
            });
        });

        it('should call determineBillType() passing in the contract input parameter', () => {
            // ARRANGE
            featureFlagMockService.setFeatureFlags([]);
            spyOn(comp, 'determineBillType');

            // ACT
            comp.ngOnInit();

            // ASSERT
            expect(comp.determineBillType).toHaveBeenCalledWith(contract1);
        });

        it('should set the currentContract to the contract input paramter', () => {
            // ARRANGE
            featureFlagMockService.setFeatureFlags([]);

            // ACT
            comp.ngOnInit();

            // ASSERT
            expect(comp.currentContract).toBe(contract1);
        });

        describe('feature flags', () => {

            describe('when paymentExtensionEnabled feature flag is set and paymentAssistanceEnabled is NOT set', () => {

                beforeEach(() => {
                    featureFlagMockService.setFeatureFlags([FeatureFlagTypes.paymentExtensionEnabled]);
                });

                it('should set the showPaymentExtension flag to true', () => {
                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.showPaymentExtension).toBeTruthy();
                });

                it('should call getContractAccountEligibility()', () => {
                    // ARRANGE
                    spyOn(comp, 'getContractAccountEligibility');

                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.getContractAccountEligibility).toHaveBeenCalled();
                });

            });

            describe('when paymentExtensionEnabled feature flag is NOT set', () => {

                beforeEach(() => {
                    featureFlagMockService.setFeatureFlags([]);
                });

                it('should set the showPaymentExtension flag to false', () => {
                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.showPaymentExtension).toBeFalsy();
                });

                it('should NOT call getContractAccountEligibility()', () => {
                    // ARRANGE
                    spyOn(comp, 'getContractAccountEligibility');

                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.getContractAccountEligibility).not.toHaveBeenCalled();
                });

            });

            describe('when paymentExtensionEnabled feature flag is set and paymentAssistanceEnabled is set', () => {

                beforeEach(() => {
                    featureFlagMockService.setFeatureFlags([FeatureFlagTypes.paymentExtensionEnabled, FeatureFlagTypes.paymentAssistanceEnabled]);
                });

                it('should set the showPaymentExtension flag to false', () => {
                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.showPaymentExtension).toBeFalsy();
                });

                it('should set the showPaymentAssistance flag to true', () => {
                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.showPaymentAssistance).toBeTruthy();
                });

                it('should call getContractAccountEligibility()', () => {
                    // ARRANGE
                    spyOn(comp, 'getContractAccountEligibility');

                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.getContractAccountEligibility).toHaveBeenCalled();
                });

            });

            describe('when paymentAssistanceEnabled feature flag is set and paymentExtensionEnabled is NOT set', () => {

                beforeEach(() => {
                    featureFlagMockService.setFeatureFlags([FeatureFlagTypes.paymentAssistanceEnabled]);
                });

                it('should set the paymentAssistanceEnabled flag to true', () => {
                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.showPaymentAssistance).toBeTruthy();
                });

            });

            describe('when paymentAssistanceEnabled feature flag is NOT set', () => {

                beforeEach(() => {
                    featureFlagMockService.setFeatureFlags([]);
                });

                it('should set the showPaymentAssistance flag to false', () => {
                    // ACT
                    comp.ngOnInit();

                    // ASSERT
                    expect(comp.showPaymentAssistance).toBeFalsy();
                });

            });
        });
    });

    describe('determineBillType()', () => {

        describe('contract.pendingPaymentDate', () => {

            describe('is populated', () => {

                beforeEach(() => {
                    // ARRANGE
                    comp.contract.pendingPaymentDate = tomorrow;
                });

                describe('contract.billSmoothingV2 is true', () => {

                    it('should set billTypes.pendingPayment to false', () => {
                        // ARRANGE
                        contract1.isBillSmoothingV2 = true;

                        // ACT
                        const billTypes: BillTypes = comp.determineBillType(contract1);

                        // ASSERT
                        expect(billTypes.pendingPayment).toBeFalsy();
                    });

                });

                describe('contract.billSmoothingV2 is false', () => {

                    it('should set billTypes.pendingPayment to true', () => {
                        // ARRANGE
                        contract1.isBillSmoothingV2 = false;

                        // ACT
                        const billTypes: BillTypes = comp.determineBillType(contract1);

                        // ASSERT
                        expect(billTypes.pendingPayment).toBeTruthy();
                    });

                });

            });

            describe('is NOT populated', () => {

                it('should set billTypes.pendingPayment to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.pendingPayment).toBeUndefined();
                });
            });

        });

        describe('contract.isDataAvailable', () => {

            describe('is true', () => {

                it('should set billTypes.noBills to undefined', () => {
                    // ARRANGE
                    // Setting isDataAvailable to true - derived readonly property;
                    contract1.isInFlight = false;
                    contract1.bills = [billDueTomorrow];

                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.noBills).toBeUndefined();
                });
            });

            describe('is false', () => {

                it('should set billTypes.noBills to true', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.noBills).toBeTruthy();
                });

            });

        });

        describe('contract.paymentOverdue, contract.currentBalance', () => {

            describe('contract.paymentOverdue > 0', () => {

                beforeEach(() => {
                    contract1.paymentOverdue = 1;
                });

                it('should set billTypes.overdue to true', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.overdue).toBeTruthy();
                });

                describe('contract.currentBalance > 0', () => {

                    it('should set billTypes.paymentOverdueInDebit to true', () => {
                        // ARRANGE
                        contract1.currentBalance = 1;

                        // ACT
                        const billTypes: BillTypes = comp.determineBillType(contract1);

                        // ASSERT
                        expect(billTypes.overdue).toBeTruthy();
                    });
                });

                describe('contract.currentBalance <= 0', () => {

                    it('should set billTypes.paymentOverdueInDebit to undefined', () => {
                        // ARRANGE
                        contract1.currentBalance = 0;

                        // ACT
                        const billTypes: BillTypes = comp.determineBillType(contract1);

                        // ASSERT
                        expect(billTypes.paymentOverdueInDebit).toBeUndefined();
                    });

                });

            });

            describe('contract.currentBalance > 0', () => {

                beforeEach(() => {
                    contract1.currentBalance = 1;
                });

                it('should set billTypes.hasCredit to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.hasCredit).toBeUndefined();
                });

                it('should set billTypes.hasDebit to true', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.hasDebit).toBeTruthy();
                });

                describe('contract.paymentOverdue <= 0', () => {

                    it('should set billTypes.paymentOverdueInDebit to undefined', () => {
                        // ARRANGE
                        contract1.paymentOverdue = 0;

                        // ACT
                        const billTypes: BillTypes = comp.determineBillType(contract1);

                        // ASSERT
                        expect(billTypes.paymentOverdueInDebit).toBeUndefined();
                    });

                });

            });

            describe('contract.currentBalance < 0', () => {

                beforeEach(() => {
                    contract1.currentBalance = -1;
                });

                it('should set billTypes.hasCredit to true', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.hasCredit).toBeTruthy();
                });

                it('should set billTypes.hasDebit to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.hasDebit).toBeUndefined();
                });

            });

            describe('contract.currentBalance is 0', () => {

                beforeEach(() => {
                    contract1.currentBalance = 0;
                });
                it('should set billTypes.hasCredit to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.hasCredit).toBeUndefined();
                });

                it('should set billTypes.hasDebit to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.hasDebit).toBeUndefined();
                });

            });

        });

        describe('newestBill, contract.paymentOverdue', () => {

            describe('newestBill populated', () => {

                beforeEach(() => {
                    contract1.bills = [billDueTomorrow];
                });

                it('should set billTypes.noBills to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.noBills).toBeUndefined();
                });

                describe('contract.paymentOverdue > 0', () => {

                    it('should set billTypes.newBillAndOverdue to true', () => {
                        // ARRANGE
                        contract1.paymentOverdue = 1;

                        // ACT
                        const billTypes: BillTypes = comp.determineBillType(contract1);

                        // ASSERT
                        expect(billTypes.newBillAndOverdue).toBeTruthy();
                    });

                });

                describe('contract.paymentOverdue <= 0', () => {

                    it('should set billTypes.newBillAndOverdue to undefined', () => {
                        // ARRANGE
                        contract1.paymentOverdue = 0;

                        // ACT
                        const billTypes: BillTypes = comp.determineBillType(contract1);

                        // ASSERT
                        expect(billTypes.newBillAndOverdue).toBeUndefined();
                    });

                });

                describe('newestBill.dueDate', () => {

                    describe('dueDate if after today', () => {

                        it('should set billTypes.outOfBillPeriod to undefined', () => {
                            // ARRANGE
                            contract1.bills = [billDueTomorrow];

                            // ACT
                            const billTypes: BillTypes = comp.determineBillType(contract1);

                            // ASSERT
                            expect(billTypes.outOfBillPeriod).toBeUndefined();
                        });

                    });

                    describe('dueDate if NOT after today', () => {

                        it('should set billTypes.outOfBillPeriod to true', () => {
                            // ARRANGE
                            contract1.bills = [billDueYesterday];

                            // ACT
                            const billTypes: BillTypes = comp.determineBillType(contract1);

                            // ASSERT
                            expect(billTypes.outOfBillPeriod).toBeTruthy();
                        });

                    });

                    describe('dueDate is NOT populated', () => {

                        it('should set billTypes.outOfBillPeriod to undefined', () => {
                            // ARRANGE
                            contract1.bills = [billDueNullDate];

                            // ACT
                            const billTypes: BillTypes = comp.determineBillType(contract1);

                            // ASSERT
                            expect(billTypes.outOfBillPeriod).toBeUndefined();
                        });

                    });

                });

            });

            describe('newestBill is NOT populated', () => {

                beforeEach(() => {
                    contract1.bills = [];
                });

                it('should set billTypes.noBills to true', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.noBills).toBeTruthy();
                });

                it('should set billTypes.outOfBillPeriod to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.outOfBillPeriod).toBeUndefined();
                });

            });

        });

        describe('contract.paymentOverdue', () => {

            describe('is > 0', () => {

                beforeEach(() => {
                    contract1.paymentOverdue = 1;
                });

                describe('contract.billSmoothingV2 is true', () => {

                    it('should set billTypes.overdue to false', () => {
                        // ARRANGE
                        contract1.isBillSmoothingV2 = true;

                        // ACT
                        const billTypes: BillTypes = comp.determineBillType(contract1);

                        // ASSERT
                        expect(billTypes.overdue).toBeFalsy();

                    });

                });

                describe('contract.billSmoothingV2 is false', () => {

                    it('should set billTypes.overdue to true', () => {
                        // ARRANGE
                        contract1.isBillSmoothingV2 = false;

                        // ACT
                        const billTypes: BillTypes = comp.determineBillType(contract1);

                        // ASSERT
                        expect(billTypes.overdue).toBeTruthy();
                    });

                });

            });

            describe('is <= 0', () => {

                beforeEach(() => {
                    contract1.paymentOverdue = 0;
                });

                it('should set billTypes.overdue to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.overdue).toBeUndefined();
                });

                describe('newestBill, contract.currentBalance', () => {

                    describe('newestBill is populated', () => {

                        beforeEach(() => {
                            contract1.bills = [billDueTomorrow];
                        });

                        describe('contract.currentBalance is 0', () => {

                            it('should set billTypes.billPaid to true', () => {
                                // ARRANGE
                                contract1.currentBalance = 0;

                                // ACT
                                const billTypes: BillTypes = comp.determineBillType(contract1);

                                // ASSERT
                                expect(billTypes.billPaid).toBeTruthy();
                            });

                        });

                        describe('contract.currentBalance is NOT 0', () => {

                            it('should set billTypes.billPaid to undefined', () => {
                                // ARRANGE
                                contract1.currentBalance = 1;

                                // ACT
                                const billTypes: BillTypes = comp.determineBillType(contract1);

                                // ASSERT
                                expect(billTypes.billPaid).toBeUndefined();
                            });

                        });
                    });

                    describe('newestBill is NOT populated', () => {

                        it('should set billTypes.billPaid to undefined', () => {
                            // ARRANGE
                            contract1.bills = [];

                            // ACT
                            const billTypes: BillTypes = comp.determineBillType(contract1);

                            // ASSERT
                            expect(billTypes.billPaid).toBeUndefined();
                        });

                    });

                });

            });
        });

        describe('contract.isDirectDebit', () => {

            describe('contract.isDirectDebit is true', () => {

                beforeEach(() => {
                    contract1.isDirectDebit = true;
                });

                it('should set billTypes.directDebit to true', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.directDebit).toBeTruthy();
                });

            });

            describe('contract.isDirectDebit is false', () => {

                beforeEach(() => {
                    contract1.isDirectDebit = false;
                });

                it('should set billTypes.directDebit to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.directDebit).toBeUndefined();
                });

            });

        });

        describe('contract.isSmartMeter', () => {

            describe('is true', () => {

                it('should set billTypes.smartMeter to true', () => {
                    // ARRANGE
                    contract1.isSmartMeter = true;

                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.smartMeter).toBeTruthy();
                });
            });

            describe('is false', () => {

                it('should set billTypes.smartMeter to undefined', () => {
                    // ARRANGE
                    contract1.isSmartMeter = false;

                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.smartMeter).toBeUndefined();
                });

            });
        });

        describe('contract.isBillSmoothingV2', () => {

            describe('is true', () => {

                beforeEach(() => {
                    contract1.isBillSmoothingV2 = true;
                });

                it('should set billTypes.billSmoothingV2 to true', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.billSmoothingV2).toBeTruthy();
                });

                it('should set billTypes.overdue to false', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.overdue).toBeFalsy();
                });

                it('should set billTypes.pendingPayment to false', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.pendingPayment).toBeFalsy();
                });

                it('should set billTypes.hasCredit to false', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.hasCredit).toBeFalsy();
                });

            });

            describe('is false', () => {

                beforeEach(() => {
                    contract1.isBillSmoothingV2 = false;
                });

                it('should set billTypes.billSmoothingV2 to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.billSmoothingV2).toBeUndefined();
                });

                it('should set billTypes.overdue to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.overdue).toBeUndefined();
                });

                it('should set billTypes.pendingPayment to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.pendingPayment).toBeUndefined();
                });

                it('should set billTypes.hasCredit to undefined', () => {
                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.hasCredit).toBeUndefined();
                });

            });

        });

        describe('contract.isPayg', () => {

            describe('is true', () => {

                it('should set billTypes.isPayg to true', () => {
                    // ARRANGE
                    contract1.isPayg = true;

                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.isPayg).toBeTruthy();
                });

            });

            describe('is false', () => {

                it('should set billTypes.isPayg to undefined', () => {
                    // ARRANGE
                    contract1.isPayg = false;

                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.isPayg).toBeUndefined();
                });

            });

        });

        describe('contract.extendedDueDate', () => {

            describe('has value', () => {

                it('should set billTypes.hasPaymentExtension to true', () => {
                    // ARRANGE
                    contract1.extendedDueDate = new Date();

                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.hasPaymentExtension).toBeTruthy();
                });

            });

            describe('has no value', () => {

                it('should set billTypes.hasPaymentExtension to undefined', () => {
                    // ARRANGE
                    contract1.extendedDueDate = undefined;

                    // ACT
                    const billTypes: BillTypes = comp.determineBillType(contract1);

                    // ASSERT
                    expect(billTypes.hasPaymentExtension).toBeUndefined();
                });

            });

        });
    });

    describe('createNewPaymentExtensionSession()', () => {

        beforeEach(() => {
            spyOn(paymentExtensionStateService, 'initNewSession');
        });

        it('should call paymentExtensionStateService.initNewSession()', () => {
            // ACT
            comp.createNewPaymentExtensionSession();

            // ASSERT
            expect(paymentExtensionStateService.initNewSession).toHaveBeenCalledWith(contract1.contractNumber, undefined);
        });

        it('should call paymentAssistanceNavigationPersistedStateService.setState()', () => {
            // ARRANGE
            comp.showPaymentAssistance = true;

            // ACT
            comp.createNewPaymentExtensionSession();

            // ASSERT
            expect(paymentAssistanceNavigationPersistedStateServiceSetState).toHaveBeenCalled();
        });

    });

    describe('getContractAccountEligibility()', () => {

        describe('hasOpenBill is true', () => {

            beforeEach(() => {
                contract1.currentBalance = 1;
                contract1.paymentOverdue = 0;
            });

            describe('isNotExtended is true', () => {

                beforeEach(() => {
                    comp.billType = { hasPaymentExtension: undefined };
                });

                describe('paymentExtensionFuelChipService.init() is called', () => {

                    describe('returns no eligible fuel chips', () => {

                        it('should set contract.isEligibleForPaymentExtension to false', () => {
                            // ARRANGE
                            classifiedFuelChips = new ClassifiedFuelChips([], [], [], []);
                            paymentExtensionFuelChipServiceInitSpy.and.returnValue(Observable.of(classifiedFuelChips));

                            // ACT
                            comp.getContractAccountEligibility();

                            // ASSERT
                            expect(contract1.isEligibleForPaymentExtension).toBeFalsy();
                        });

                    });

                    describe('returns eligible fuel chips', () => {

                        it('should set contract.isEligibleForPaymentExtension to true', () => {
                            // ARRANGE
                            classifiedFuelChips = new ClassifiedFuelChips([new FuelChipData(contractAccountNo1, contract1.contractNumber, undefined, [], new PaymentExtensionContractEligibility(contract1.contractNumber, true), undefined)], [], [], []);
                            paymentExtensionFuelChipServiceInitSpy.and.returnValue(Observable.of(classifiedFuelChips));

                            // ACT
                            comp.getContractAccountEligibility();

                            // ASSERT
                            expect(contract1.isEligibleForPaymentExtension).toBeTruthy();
                        });

                    });

                });

            });

            describe('isNotExtended is false', () => {

                it('contract.isEligibleForPaymentExtension is undefined', () => {
                    // ARRANGE
                    comp.billType = { hasPaymentExtension: true };

                    // ACT
                    comp.getContractAccountEligibility();

                    // ASSERT
                    expect(contract1.isEligibleForPaymentExtension).toBeUndefined();
                });
            });

        });

        describe('hasOpenBill is false', () => {

            beforeEach(() => {
                contract1.currentBalance = 0;
                contract1.paymentOverdue = 0;
            });

        });

    });

    describe('visual check when the paymentAssistanceEnabled feature flag', () => {

        describe('is enabled', () => {

            beforeEach(() => {
                featureFlagMockService.setFeatureFlags([FeatureFlagTypes.paymentAssistanceEnabled]);
            });

            describe('the right panel', () => {
                it('should show a payment label of "See payment assistance options"', () => {
                    // ARRANGE
                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    expect(de.query(By.css('.bill-panel-information__right-panel .opa-link')).nativeElement.text).toBe('See payment assistance options');
                });

                it('should navigate to the payment assistance select page when the "See payment assistance options" link is clicked', () => {
                    // ARRANGE
                    spyOn(paymentExtensionStateService, 'initNewSession').and.returnValue(null);
                    classifiedFuelChips = new ClassifiedFuelChips([new FuelChipData(contractAccountNo1, contract1.contractNumber, undefined, [], new PaymentExtensionContractEligibility(contract1.contractNumber, true, PaymentExtensionIneligibilityReasons.None, 123.45, new Date('2017-05-16'), null), undefined)], [], [], []);
                    paymentExtensionFuelChipServiceClassifiedFuelChipsSpy.and.returnValue(classifiedFuelChips);

                    // ACT
                    fixture.detectChanges();
                    de.query(By.css('.bill-panel-information__right-panel .opa-link')).nativeNode.click();

                    // ASSERT
                    const href = de.query(By.css('.bill-panel-information__right-panel .opa-link')).nativeElement.getAttribute('href');
                    expect(href).toContain(`/bills/paymentassistance/choose/${contract1.accountNumber}/${contract1.contractNumber}`);
                });
            });

            describe('the dashboard panel', () => {
                it('should show a payment label of "See payment assistance options"', () => {
                    // ARRANGE
                    comp.contract.isPayg = false;
                    comp.isDashboard = true;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    expect(de.query(By.css('.bill-panel-dashboard--panel .opa-link')).nativeElement.text).toBe('See payment assistance options');
                });

                it('should navigate to the payment assistance select page when the "See payment assistance options" link is clicked', () => {
                    // ARRANGE
                    comp.contract.isPayg = false;
                    comp.isDashboard = true;
                    spyOn(paymentExtensionStateService, 'initNewSession').and.returnValue(null);
                    classifiedFuelChips = new ClassifiedFuelChips([new FuelChipData(contractAccountNo1, contract1.contractNumber, undefined, [], new PaymentExtensionContractEligibility(contract1.contractNumber, true, PaymentExtensionIneligibilityReasons.None, 123.45, new Date('2017-05-16'), null), undefined)], [], [], []);
                    paymentExtensionFuelChipServiceClassifiedFuelChipsSpy.and.returnValue(classifiedFuelChips);

                    // ACT
                    fixture.detectChanges();
                    de.query(By.css('.bill-panel-dashboard--panel .opa-link')).nativeNode.click();

                    // ASSERT
                    const href = de.query(By.css('.bill-panel-dashboard--panel .opa-link')).nativeElement.getAttribute('href');
                    expect(href).toContain(`/bills/paymentassistance/choose/${contract1.accountNumber}/${contract1.contractNumber}`);
                });
            });

        });

        describe('is NOT enabled', () => {

            beforeEach(() => {
                featureFlagMockService.setFeatureFlags([]);
            });

            describe('the right panel', () => {
                it('should show a payment label of "Set up a payment extension"', () => {
                    // ARRANGE
                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    expect(de.query(By.css('.bill-panel-information__right-panel .opa-link'))).toBeNull();
                });
            });

            describe('the dashboard panel', () => {
                it('should show a payment label of "Set up a payment extension"', () => {
                    // ARRANGE
                    comp.contract.isPayg = false;
                    comp.isDashboard = true;

                    // ACT
                    fixture.detectChanges();

                    // ASSERT
                    expect(de.query(By.css('.bill-panel-dashboard--panel .opa-link'))).toBeNull();
                });
            });

        });
    });

    describe('when on Dashboard', () => {
        const billPanelDashboardPanelInstalmentPlanTitleSelector = 'bill-panel-dashboard--panel-instalment-plan-title';
        const defaultPanelSelector = '.dashboard--not-payg';
        const paymentExtensionPanelSelector = '.dashboard--not-payg--payment-extension';
        const instalmentPlanPanelSelector = '.dashboard--not-payg--instalment-plan';
        const billDateComponentSelector = 'agl-bill-date';

        const extendedDueDate = moment().add(1, 'day').toDate();
        const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;
        const instalmentPlan = new InstalmentPlanBillingBuilder().build();

        beforeEach(() => {
            featureFlagMockService.setFeatureFlags([FeatureFlagTypes.paymentAssistanceEnabled]);
            comp.isDashboard = true;
        });

        describe('and when NOT on payg', () => {
            beforeEach(() => {
                comp.contract.isPayg = false;
            });

            describe('and when on payment extension and NOT on instalment plan', () => {
                beforeEach(() => {
                    comp.contract.extendedDueDate = extendedDueDate;
                    comp.contract.instalmentPlan = undefined;

                    fixture.detectChanges();
                });

                it('should show payment extension sub-panel', () => {
                    const paymentExtensionPanel = fixture.nativeElement.querySelector(paymentExtensionPanelSelector);
                    expect(paymentExtensionPanel).toBeDefined();
                });

                it('should show bill date component', () => {
                    const billDateComponent = fixture.nativeElement.querySelector(billDateComponentSelector);
                    expect(billDateComponent).toBeDefined();
                });

                it('should hide instalment plan sub-panel', () => {
                    const instalmentPlanPanel = fixture.nativeElement.querySelector(instalmentPlanPanelSelector);
                    expect(instalmentPlanPanel).toBeNull();
                });

                it('should hide instalment plan title', () => {
                    const instalmentPlanTitle = fixture.nativeElement.querySelector(billPanelDashboardPanelInstalmentPlanTitleSelector);
                    expect(instalmentPlanTitle).toBeNull();
                });

                it('should hide default sub-panel', () => {
                    const defaultPanel = fixture.nativeElement.querySelector(defaultPanelSelector);
                    expect(defaultPanel).toBeNull();
                });
            });

            describe('and when on instalment plan and NOT on payment extension', () => {
                beforeEach(() => {
                    comp.contract.extendedDueDate = undefined;
                    comp.contract.instalmentPlan = new InstalmentPlanData(instalmentPlan, progressTracker);

                    fixture.detectChanges();
                });

                it('should hide payment extension sub-panel', () => {
                    const paymentExtensionPanel = fixture.nativeElement.querySelector(paymentExtensionPanelSelector);
                    expect(paymentExtensionPanel).toBeNull();
                });

                it('should hide bill date component', () => {
                    const billDateComponent = fixture.nativeElement.querySelector(billDateComponentSelector);
                    expect(billDateComponent).toBeNull();
                });

                it('should show instalment plan sub-panel', () => {
                    const instalmentPlanPanel = fixture.nativeElement.querySelector(instalmentPlanPanelSelector);
                    expect(instalmentPlanPanel).toBeDefined();
                });

                it('should show instalment plan title', () => {
                    const instalmentPlanTitle = fixture.nativeElement.querySelector(billPanelDashboardPanelInstalmentPlanTitleSelector);
                    expect(instalmentPlanTitle).toBeDefined();
                });

                it('should hide default sub-panel', () => {
                    const defaultPanel = fixture.nativeElement.querySelector(defaultPanelSelector);
                    expect(defaultPanel).toBeNull();
                });

                it('should show instalment plan sub-panel', () => {
                    const instalmentPlanPanel = fixture.nativeElement.querySelector(instalmentPlanPanelSelector);
                    expect(instalmentPlanPanel).toBeDefined();
                });
            });

            describe('and when on payment extension AND instalment plan', () => {
                beforeEach(() => {
                    comp.contract.extendedDueDate = extendedDueDate;
                    comp.contract.instalmentPlan = new InstalmentPlanData(instalmentPlan, progressTracker);

                    fixture.detectChanges();
                });

                it('should hide payment extension sub-panel', () => {
                    const paymentExtensionPanel = fixture.nativeElement.querySelector(paymentExtensionPanelSelector);
                    expect(paymentExtensionPanel).toBeNull();
                });

                it('should hide bill date component', () => {
                    const billDateComponent = fixture.nativeElement.querySelector(billDateComponentSelector);
                    expect(billDateComponent).toBeNull();
                });

                it('should show instalment plan sub-panel', () => {
                    const instalmentPlanPanel = fixture.nativeElement.querySelector(instalmentPlanPanelSelector);
                    expect(instalmentPlanPanel).toBeDefined();
                });

                it('should show instalment plan title', () => {
                    const instalmentPlanTitle = fixture.nativeElement.querySelector(billPanelDashboardPanelInstalmentPlanTitleSelector);
                    expect(instalmentPlanTitle).toBeDefined();
                });

                it('should hide default sub-panel', () => {
                    const defaultPanel = fixture.nativeElement.querySelector(defaultPanelSelector);
                    expect(defaultPanel).toBeNull();
                });
            });

            describe('and when on neither payment extension nor instalment plan', () => {
                beforeEach(() => {
                    comp.contract.extendedDueDate = undefined;
                    comp.contract.instalmentPlan = undefined;

                    fixture.detectChanges();
                });

                it('should hide payment extension sub-panel', () => {
                    const paymentExtensionPanel = fixture.nativeElement.querySelector(paymentExtensionPanelSelector);
                    expect(paymentExtensionPanel).toBeNull();
                });

                it('should show bill date component', () => {
                    const billDateComponent = fixture.nativeElement.querySelector(billDateComponentSelector);
                    expect(billDateComponent).toBeDefined();
                });

                it('should hide instalment plan sub-panel', () => {
                    const instalmentPlanPanel = fixture.nativeElement.querySelector(instalmentPlanPanelSelector);
                    expect(instalmentPlanPanel).toBeNull();
                });

                it('should hide instalment plan title', () => {
                    const instalmentPlanTitle = fixture.nativeElement.querySelector(billPanelDashboardPanelInstalmentPlanTitleSelector);
                    expect(instalmentPlanTitle).toBeNull();
                });

                it('should show default sub-panel', () => {
                    const defaultPanel = fixture.nativeElement.querySelector(defaultPanelSelector);
                    expect(defaultPanel).toBeDefined();
                });
            });
        });
    });
});
