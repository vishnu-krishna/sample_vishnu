import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { Observable } from 'rxjs/Observable';
import { Mock } from 'ts-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { BillPaymentButtonComponent } from '../billPaymentButton/billPaymentButton.component';
import { AlertMessages } from './../../../../../shared/messages/alertMessages';
import { BillPaymentAmountComponent } from './billPaymentAmount.component';
import { AlertComponent } from '../../../../../shared/component/alert/alert.component';
import { ToolTipWhiteComponent } from '../../../../../shared/component/usagetooltip/tooltipWhite.component';
import { UsageTooltipComponent } from '../../../../../shared/component/usagetooltip/usageTooltip.component';
import { ContentService } from '../../../../../shared/service/content.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { Now } from '../../../../../shared/service/now.service';
import { MockContentService } from '../../../../../shared/testing/mockContentService';
import { ModalService } from '../../../../modal/modal.service';
import { ContractViewModel } from '../../../../services/account.service';
import { EventService } from '../../../../services/event.service';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { FeatureFlagMockService } from '../../../../services/mock/featureflag.mock.service';
import { PaymentService } from '../../../../services/payment.service';
import { NowMock } from '../../../../services/mock';
import { BillDescriptionService } from '../../../../services/billDescription.service';
import { CommonPipesModule } from '../../../../modules/commonPipes.module';
import { BillBreakdownModule } from '../billBreakdown/billBreakdown.module';
import { EnergyInsightsService } from '../../../../services/energyInsights.service';
import { MockEnergyInsightsService } from '../../../../services/mock/energyInsights.mock.service';
import { BillPaymentInstalmentPlanComponent } from './instalmentPlan/billPaymentInstalmentPlan.component';
import { InstalmentPlanData } from '../../../../services/paymentScheme/instalmentPlan.service';
import { PaymentAssistancePlanInstalmentsModel } from '../../paymentAssistance/plan/instalments';
import { InstalmentPlanBillingBuilder } from '../test';
import { BillPanelTestDataBuilder } from '../billPanelTestDataBuilder';
import { FeatureFlagTypes } from './../../../../services/featureFlag.constants';

// Mock the services
class MockModalService {
    public mockName: string = 'Mocked Service';
}

class MockPaymentService {
    public mockName: string = 'Mocked Service';
}

class MockDataLayerService {
    public mockName: string = 'Mocked Service';

    public pushPayment() { return; }

    public pushOmmSuccess() { return; }

    public pushPaygButton() { return; }

    public pushError() { return; }
}

describe('Bill Payment Amount', () => {
    const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;
    const expectedNextBillDescription = 'dummy nextBillIssuedIn value';
    let comp: BillPaymentAmountComponent;
    let fixture: ComponentFixture<BillPaymentAmountComponent>;
    let nowMock: NowMock;

    beforeEach(() => {
        let mockBillDescriptionService = new Mock<BillDescriptionService>();
        mockBillDescriptionService.setup((m) => m.nextBillIssuedIn).is(() => expectedNextBillDescription);

        nowMock = new NowMock('');

        let featureFlaggedServiceMock: FeatureFlagMockService;
        featureFlaggedServiceMock = new FeatureFlagMockService();
        featureFlaggedServiceMock.setFeatureFlags([FeatureFlagTypes.payOnTimeDiscountFixEnabled, FeatureFlagTypes.paymentAssistanceEnabled]);

        TestBed.configureTestingModule({
            providers: [
                AlertMessages,
                { provide: 'AppContentBranch' },
                { provide: ModalService, useClass: MockModalService },
                { provide: PaymentService, useClass: MockPaymentService },
                { provide: ContentService, useClass: MockContentService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: DataLayerService, useClass: MockDataLayerService },
                { provide: FeatureFlagService, useValue: featureFlaggedServiceMock },
                { provide: Now, useValue: nowMock },
                { provide: BillDescriptionService, useValue: mockBillDescriptionService.Object },
                { provide: EnergyInsightsService, useClass: MockEnergyInsightsService },
            ],
            declarations: [
                BillPaymentAmountComponent,
                BillPaymentButtonComponent,
                BillPaymentInstalmentPlanComponent,
                AlertComponent,
                UsageTooltipComponent,
                ToolTipWhiteComponent,
            ],
            imports: [
                HttpModule,
                MyAccountMaterialModule,
                HttpClientTestingModule,
                CommonPipesModule,
                BillBreakdownModule,
                RouterTestingModule,
            ]
        });

        fixture = TestBed.createComponent(BillPaymentAmountComponent);
        comp = fixture.componentInstance;
    });

    describe('bill panel', () => {
        beforeEach(() => {
            comp.isDashboard = false;
            comp.isDefaultMode = false;
            comp.isAmountOnly = false;
            comp.contract = new ContractViewModel('111');
        });

        describe('not on bill smoothing', () => {
            it('should show payment amount with two decimal places', () => {
                comp.type = { billSmoothingV2: false, overdue: false };
                comp.contract.currentBalance = 40.6;
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__value').textContent).toMatch('40.60');
            });

            it('should have an additional class for showing an overdue amount', () => {
                comp.type = { billSmoothingV2: false, overdue: true };
                comp.contract.currentBalance = 40.6;
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__red')).toBeDefined();
            });

            it('should have an additional class for showing an credit amount and the value should not be negative', () => {
                comp.type = { billSmoothingV2: false, hasCredit: true };
                comp.contract.currentBalance = -40.6;
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__value').textContent).toMatch('40.60');
                expect(fixture.nativeElement.querySelector('.bill-panel-amount--has-credit').textContent).toMatch('Credit');
            });

            it('should do addition for newBillAndOverdue', () => {
                comp.type = { overdue: true, newBillAndOverdue: true, hasDebit: true };
                comp.contract.currentBalance = 30;
                comp.contract.paymentOverdue = 40;
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__value').textContent).toMatch('70.00');
            });

            it('should only show isAmountOnly', () => {
                comp.type = { overdue: true, newBillAndOverdue: true, hasDebit: true };
                comp.contract.currentBalance = 30;
                comp.contract.paymentOverdue = 40;
                comp.isDefaultMode = true;
                comp.isAmountOnly = true;
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__currency').textContent).toBeDefined();
            });

            describe('when on instalment plan', () => {
                beforeEach(() => {
                    comp.type = { hasInstalmentPlan: true, overdue: true };
                });

                describe('and there are NO overdue instalments', () => {
                    let expectedNextInstalmentDueAmount: number;

                    beforeEach(() => {
                        const instalmentPlanBilling = new InstalmentPlanBillingBuilder().build();

                        comp.contract.instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);
                        fixture.detectChanges();

                        expectedNextInstalmentDueAmount = instalmentPlanBilling.nextInstalment.dueAmount;
                    });

                    it('should override paymentAmount with amount of next instalment', () => {
                        expect(comp.paymentAmount).toBe(expectedNextInstalmentDueAmount);
                    });

                    it('should set overdue to false', () => {
                        expect(comp.type.overdue).toBeFalsy();
                    });
                });

                describe('and there are overdue instalments', () => {
                    let expectedPaymountAmount: number;

                    beforeEach(() => {
                        const instalmentPlanBilling = new InstalmentPlanBillingBuilder().withOverdueInstalments().build();

                        comp.contract.instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);
                        fixture.detectChanges();

                        expectedPaymountAmount = instalmentPlanBilling.nextInstalment.dueAmount + instalmentPlanBilling.overdueAmount;
                    });

                    it('should override paymentAmount with amount of next instalment + overdue instalments', () => {
                        expect(comp.paymentAmount).toBe(expectedPaymountAmount);
                    });

                    it('should set overdue to true', () => {
                        expect(comp.type.overdue).toBeTruthy();
                    });
                });
            });
        });

        describe('on bill smoothing', () => {
            it('should show payment amount without two decimal places', () => {
                comp.type = { billSmoothingV2: true, overdue: false };
                comp.contract.currentBalance = 40.6;
                comp.contract.paymentScheme = {
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
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__value').textContent).toMatch('20per week');
            });
        });
    });

    describe('overview panel', () => {
        const billPanelAmountOverdueTextSelector = '.bill-panel-amount__overdue-text';

        beforeEach(() => {
            comp.isDashboard = true;
            comp.isDefaultMode = false;
            comp.isAmountOnly = false;
            comp.contract = new ContractViewModel('333333333');
        });

        describe('when overdue and on overdue instalment plan', () => {
            it('should hide \'overdue by\'', () => {
                const instalmentPlanBilling = new InstalmentPlanBillingBuilder()
                    .withOverdueInstalments()
                    .build();

                const instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);

                BillPanelTestDataBuilder
                    .create()
                    .whenOverdue(1)
                    .andHasInstalmentPlan(instalmentPlan)
                    .assignTo((type) => comp.type = type, (contract) => comp.contract = contract);

                fixture.detectChanges();

                const overdueText = fixture.nativeElement.querySelector(billPanelAmountOverdueTextSelector);
                expect(overdueText).toBeNull();
            });
        });

        describe('not on bill smoothing', () => {
            it('should show \'overdue by\' for overdue and outOfBillPeriod', () => {
                comp.type = { overdue: true, newBillAndOverdue: false, hasDebit: false, outOfBillPeriod: true };
                comp.contract.currentBalance = 0;
                nowMock.setDate(2018, 2, 8);
                comp.contract.currentBillEndDate = new Date(2018, 2, 4);
                comp.contract.paymentOverdue = 40;
                comp.contract.dueDate = new Date(2018, 1, 10);
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__next-bill').textContent).toContain(expectedNextBillDescription);
                expect(fixture.nativeElement.querySelector(billPanelAmountOverdueTextSelector).textContent).toContain('Overdue by');
            });

            it('should show \'credit\' for account balance in credit', () => {
                comp.type = { overdue: false, newBillAndOverdue: false, hasDebit: false, hasCredit: true, outOfBillPeriod: true };
                comp.contract.currentBalance = 0;
                comp.contract.paymentOverdue = 0;
                nowMock.setDate(2018, 2, 8);
                comp.contract.currentBillEndDate = new Date(2018, 2, 10);
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.bill-panel-amount--has-credit').textContent).toMatch('Credit');
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__next-bill').textContent).toMatch(expectedNextBillDescription);
            });
        });

        describe('on bill smoothing', () => {
            beforeEach(() => {
                comp.contract.paymentScheme = {
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
            });

            it('should show payment amount without two decimal places and payment due text for not in directDebit but in billSmoothing scenario', () => {
                comp.type = { billSmoothingV2: true, overdue: false };
                comp.contract.currentBalance = 40.6;
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__value').textContent).toMatch('20per week');
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__next-bill').textContent).toContain('Due');
            });

            it('should show payment amount without two decimal places and Debited text for not in directDebit but in billSmoothing scenario', () => {
                comp.type = { billSmoothingV2: true, overdue: false, directDebit: true };
                comp.contract.currentBalance = 40.6;
                fixture.detectChanges();
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__value').textContent).toMatch('20per week');
                expect(fixture.nativeElement.querySelector('.bill-panel-amount__next-bill').textContent).toContain('Debited');
            });
        });
    });
});
