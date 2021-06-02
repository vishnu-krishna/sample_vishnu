
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { DebugElement } from '@angular/core';
import { Mock } from 'ts-mocks/lib';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReplaySubject } from 'rxjs';

import { InstalmentPlanData } from './../services/paymentScheme/instalmentPlan.service';
import { ContractViewModelBuilder } from './../../shared/component/paymentArrangement/test/contractViewModelBuilder';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../services/account.service';
import { DashboardComponent } from './dashboard.component';
import { AccountViewModelBuilder } from '../../shared/component/paymentArrangement/test';
import { PaymentAssistancePlanInstalmentsModel } from '../pages/bills/paymentAssistance/plan/instalments';
import { InstalmentPlanBillingBuilder } from '../pages/bills/billPanel/test';
import { Now } from '../../shared/service/now.service';
import { PaypalApiService } from '../../shared/service/paypalApi.service';
import { ConfigService } from '../../shared/service/config.service';
import { DeviceDetectorService } from '../../shared/service/deviceDetector.service';
import { ISsmrService } from '../services/contract/issmr.service';
import { IUrlService } from '../services/contract/iurl.service';
import { ModalService } from '../modal/modal.service';
import { ApiService } from '../../shared/service/api.service';
import { ContentService } from '../../shared/service/content.service';
import { FeatureFlagService, FeatureFlagTypes } from '../services/featureFlag.service';
import { OverviewModule } from './../modules/overview.module';
import { NowMock } from './../services/mock/now.mock.service';

describe('Dashboard Component', () => {
    let fixture: ComponentFixture<DashboardComponent>;
    let comp: DashboardComponent;
    let de: DebugElement;

    let router: Router;

    let nowMock: Now;
    let accountServiceGetAccountSpy: jasmine.Spy;
    let ssmrServiceShowModalSpy: jasmine.Spy;
    let ssmrServiceOnClickCloseSpy: jasmine.Spy;
    let urlServiceObserveOneUrlChangeSpy: jasmine.Spy;

    const aglPaymentAssistancePlanInstalmentsSelector = 'agl-payment-assistance-plan-instalments';

    const contractAccountNumber = 1;
    const contractNumber = 2;

    beforeEach(() => {
        nowMock = new NowMock('');

        const paypalApiService = new Mock<PaypalApiService>();
        const configService = new Mock<ConfigService>();

        const deviceDetectorService = new Mock<DeviceDetectorService>();
        deviceDetectorService.setup((x) => x.isIE).is(false);

        const ssmrService = new Mock<ISsmrService>();
        ssmrServiceShowModalSpy = ssmrService.setup((s) => s.showModal).Spy;
        ssmrServiceOnClickCloseSpy = ssmrService.setup((s) => s.onClickClose).Spy;

        const accountService = new Mock<IAccountServiceMA>();
        accountService.setup((s) => s.areAllAccountContractsRestricted).is(() => Observable.of(false));
        accountServiceGetAccountSpy = accountService.setup((s) => s.getAccounts).Spy;

        const urlService = new Mock<IUrlService>();
        urlServiceObserveOneUrlChangeSpy = urlService.setup((s) => s.observeOneUrlChange).Spy;

        const confirmService = new Mock<ModalService>();
        const apiService = new Mock<ApiService>();

        const contentService = new Mock<ContentService>();
        contentService.setup((s) => s.contentLoaded).is(new ReplaySubject(1));

        const featureFlagService = new Mock<FeatureFlagService>();
        featureFlagService
            .setup((s) => s.featureFlagged)
            .is((featureFlag: FeatureFlagTypes) => Observable.of(true));

        TestBed.configureTestingModule({
            imports: [
                OverviewModule,
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: Now, useValue: nowMock },
                { provide: PaypalApiService, useValue: paypalApiService.Object },
                { provide: ConfigService, useValue: configService.Object },
                { provide: DeviceDetectorService, useValue: deviceDetectorService.Object },
                { provide: ISsmrService, useValue: ssmrService.Object },
                { provide: IAccountServiceMA, useValue: accountService.Object },
                { provide: IUrlService, useValue: urlService.Object },
                { provide: ModalService, useValue: urlService.Object },
                { provide: ApiService, useValue: apiService.Object },
                { provide: ContentService, useValue: contentService.Object },
                { provide: FeatureFlagService, useValue: featureFlagService.Object },
            ]
        });

        fixture = TestBed.createComponent(DashboardComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        router = de.injector.get(Router);
    });

    it('should show bill smoothing with direct debit tooltip message', () => {
        // arrange
        let contract = new ContractViewModel();
        contract.isBillSmoothingV2 = true;
        contract.isDirectDebit = true;
        contract.paymentScheme = {
            contractNumber: 111,
            paymentSchemeNumber: 2222,
            startDate: null,
            endDate: null,
            frequency: 'weekly',
            nextPayment: {
              date: new Date(),
              amount: 20
            },
            previousPayment: null
          };

        let message = comp.generateBillSmoothingTooltip(contract);

        expect(message).toBe(`This is just an indication of your energy use. You’re on Bill Smoothing, so don’t worry too much about this. Your weekly payments of $20 will be debited automatically.`);
    });

    it('should show bill smoothing with manual payment tooltip message', () => {
        // arrange
        let contract = new ContractViewModel();
        contract.isBillSmoothingV2 = true;
        contract.isDirectDebit = false;
        contract.paymentScheme = {
            contractNumber: 111,
            paymentSchemeNumber: 2222,
            startDate: null,
            endDate: null,
            frequency: 'weekly',
            nextPayment: {
              date: new Date(),
              amount: 20
            },
            previousPayment: null
          };

        let message = comp.generateBillSmoothingTooltip(contract);

        expect(message).toBe(`This is an indication of your monthly energy use. You’re on Bill Smoothing, so don’t worry too much about this. You just need to continue making your weekly payments of $20.`);
    });

    it('should not show bill smoothing tooltip message', () => {
        // arrange
        let contract = new ContractViewModel();
        contract.isBillSmoothingV2 = false;

        let message = comp.generateBillSmoothingTooltip(contract);

        expect(message).toBe('');
    });

    it(`should not check basic meter when rdla is not meterread`, async(() => {
        spyOn(comp, 'hasBasicMeter');

        comp.popupSsmrModal('NOTmeterread');

        expect(comp.hasBasicMeter).not.toHaveBeenCalled();
    }));

    it(`should call ssmr service showModal when rdla is meterread and accounts have basic meter`, async(() => {
        spyOn(comp, 'hasBasicMeter').and.returnValue(Observable.of(true));
        ssmrServiceOnClickCloseSpy.and.returnValue(null);
        urlServiceObserveOneUrlChangeSpy.and.returnValue(Observable.of(true));

        comp.popupSsmrModal('meterread');

        expect(ssmrServiceShowModalSpy).toHaveBeenCalled();
        expect(urlServiceObserveOneUrlChangeSpy).toHaveBeenCalled();
        expect(ssmrServiceOnClickCloseSpy).toHaveBeenCalled();
    }));

    it(`should call router navigate when rdla is meterread and accounts have no basic meter`, async(() => {
        spyOn(comp, 'hasBasicMeter').and.returnValue(Observable.of(false));
        spyOn(router, 'navigate');

        comp.popupSsmrModal('meterread');

        expect(router.navigate).toHaveBeenCalledWith(['/usage/meterreadcheck']);
    }));

    it(`should return true when any contract is basic meter`, async(() => {
        const accounts = [
            {
                contracts: [
                    {
                        isSmartMeter: false
                    },
                    {
                        isSmartMeter: true
                    }
                ]
            },
            {
                contracts: [
                    {
                        isSmartMeter: true
                    },
                    {
                        isSmartMeter: true
                    }
                ]
            }
        ];
        accountServiceGetAccountSpy.and.returnValue(Observable.of(accounts));

        const hasBasicMeter = comp.hasBasicMeter();

        hasBasicMeter.subscribe((has) => {
            expect(has).toBe(true);
        });
    }));

    it(`should return false when all contracts are smart meter`, async(() => {
        const accounts = [
            {
                contracts: [
                    {
                        isSmartMeter: true
                    },
                    {
                        isSmartMeter: true
                    }
                ]
            },
            {
                contracts: [
                    {
                        isSmartMeter: true
                    },
                    {
                        isSmartMeter: true
                    }
                ]
            }
        ];
        accountServiceGetAccountSpy.and.returnValue(Observable.of(accounts));

        const hasBasicMeter = comp.hasBasicMeter();

        hasBasicMeter.subscribe((has) => {
            expect(has).toBe(false);
        });
    }));

    describe('when at least one instalmentPlan is present', () => {
        beforeEach(() => {
            const accounts = [
                new AccountViewModelBuilder(contractAccountNumber)
                    .withContractOnInstalmentPlan(contractNumber)
                    .build()
            ];

            accountServiceGetAccountSpy.and.returnValue(Observable.of(accounts));

            comp.ngOnInit();
        });

        it('should show progress tracker', () => {
            const progressTracker = fixture.nativeElement.querySelector(aglPaymentAssistancePlanInstalmentsSelector);

            expect(progressTracker).toBeDefined();
        });
    });

    describe('when NO instalmentPlan is present', () => {
        beforeEach(() => {
            const accounts = [
                new AccountViewModelBuilder(contractAccountNumber)
                    .withContract(contractNumber)
                    .build()
            ];

            accountServiceGetAccountSpy.and.returnValue(Observable.of(accounts));

            comp.ngOnInit();
        });

        it('should hide progress tracker', () => {
            const progressTracker = fixture.nativeElement.querySelector(aglPaymentAssistancePlanInstalmentsSelector);

            expect(progressTracker).toBeNull();
        });
    });
});
