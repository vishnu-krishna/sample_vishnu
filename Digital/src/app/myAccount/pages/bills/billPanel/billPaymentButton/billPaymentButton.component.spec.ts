import { concat } from 'rxjs/operator/concat';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PrePaymentBalanceTopUpUrgency } from '../../../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { ContentService } from '../../../../../shared/service/content.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { Now } from '../../../../../shared/service/now.service';
import { RedLineApiService } from '../../../../../shared/service/redLineApi.service';
import { MockContentService } from '../../../../../shared/testing/mockContentService';
import { ModalService } from '../../../../modal/modal.service';
import { ExtractBeforeDecimalPipe } from '../../../../pipes/extractBeforeDecimal.pipe';
import { ExtractDecimalPipe } from '../../../../pipes/extractDecimal.pipe';
import { SafeHtmlPipe } from '../../../../pipes/safeHtml.pipe';
import { ContractViewModel, IAccountServiceMA } from '../../../../services/account.service';
import { EventService } from '../../../../services/event.service';
import { PaymentService } from '../../../../services/payment.service';
import { TestData } from '../../../settings/billSmoothing/billSmoothing.component.data';
import { InstalmentPlanBilling, InstalmentPlanData } from '../../../../services/paymentScheme/instalmentPlan.service';
import { AlertMessages } from './../../../../../shared/messages/alertMessages';
import { BillPaymentButtonComponent } from '../billPaymentButton/billPaymentButton.component';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { BillPanelComponent } from '../billPanel.component';
import { PaymentAssistancePlanInstalmentsModel } from '../../paymentAssistance/plan/instalments';
import { InstalmentPlanBillingBuilder } from '../test';

// Mock the services
class MockApiService {
    public mockName: string = 'Mocked Service';
}
class MockModalService {
    public mockName: string = 'Mocked Service';
}
class MockEventService {
    public mockName: string = 'Mocked Service';
}
class MockAccountService {
    public mockName: string = 'Mocked Service';
}
class MockBillPanelComponent {
    public mockName: string = 'Mocked Service';
}
class MockPaymentService {
    public mockName: string = 'Mocked Service';
}
class MockRedLineService {
    public mockName: string = 'Mocked Service';
}
class MockDataLayerService {
    public mockName: string = 'Mocked Service';
    public pushPayment() { return; }
    public pushOmmSuccess() { return; }
    public pushPaygButton() { return; }
    public pushError() { return; }
}

describe('Bill Payment button', () => {
    const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;

    let comp: BillPaymentButtonComponent;
    let fixture: ComponentFixture<BillPaymentButtonComponent>;

    const contractNumber = '132464798';
    const paymentButtonSelector = `#payment-button-${contractNumber}`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Now,
                AlertMessages,
                { provide: 'AppContentBranch' },
                { provide: ModalService, useClass: MockModalService },
                { provide: EventService, useClass: MockEventService },
                { provide: IAccountServiceMA, useClass: MockAccountService },
                { provide: BillPanelComponent, useClass: MockBillPanelComponent },
                { provide: PaymentService, useClass: MockPaymentService },
                { provide: RedLineApiService, useClass: MockRedLineService },
                { provide: ContentService, useClass: MockContentService },
                { provide: DataLayerService, useClass: MockDataLayerService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
            ],
            declarations: [
                BillPaymentButtonComponent,
                BillPaymentButtonComponent,
                ExtractDecimalPipe,
                ExtractBeforeDecimalPipe,
                SafeHtmlPipe
            ],
            imports: [
                MyAccountMaterialModule,
                HttpModule,
                HttpClientTestingModule,
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BillPaymentButtonComponent);
        comp = fixture.componentInstance;
    });

    describe('PAYG accounts', () => {

        it('should show correct button text for PAYG-High', () => {
            comp.type = { hasCredit: false };
            comp.contract = new ContractViewModel(contractNumber);
            comp.contract.currentBalance = 30;
            comp.contract.isPayg = true;
            comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector(paymentButtonSelector).textContent).toMatch('Top Up Immediately');
        });

        it('should show correct button text for PAYG-Medium', () => {
            comp.type = { hasCredit: false };
            comp.contract = new ContractViewModel(contractNumber);
            comp.contract.currentBalance = 30;
            comp.contract.isPayg = true;
            comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Medium;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector(paymentButtonSelector).textContent).toMatch('Top Up For Bonuses');
        });

        it('should show correct button text for PAYG-Low', () => {
            comp.type = { hasCredit: false };
            comp.contract = new ContractViewModel(contractNumber);
            comp.contract.currentBalance = 30;
            comp.contract.isPayg = true;
            comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Low;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector(paymentButtonSelector).textContent).toMatch('Top Up');
        });

        it('should show correct button text for PAYG-Prepaid unavailable', () => {
            comp.type = { hasCredit: false };
            comp.contract = new ContractViewModel(contractNumber);
            comp.contract.currentBalance = 30;
            comp.contract.isPayg = true;
            comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Unavailable;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector(paymentButtonSelector).textContent).toMatch('Top Up');
        });

    });

    describe('Bill Smoothing V2 accounts', () => {

        it('should show the next payment scheme amount', () => {
            const nextPaymentAmount = 47;
            comp.type = { hasCredit: false };
            comp.contract = new ContractViewModel(contractNumber);
            comp.contract.isBillSmoothingV2 = true;
            comp.contract.paymentScheme = TestData.paymentSchemeWithNextPayment;
            comp.contract.paymentScheme.nextPayment.amount = nextPaymentAmount;
            fixture.detectChanges();
            expect(comp.amount).toBe(nextPaymentAmount);
        });

        it('should show the previous payment scheme amount if next payment scheme is unavailable', () => {
            const previousPaymentAmount = 37;
            comp.type = { hasCredit: false };
            comp.contract = new ContractViewModel(contractNumber);
            comp.contract.isBillSmoothingV2 = true;
            comp.contract.paymentScheme = TestData.paymentSchemeWithoutNextPayment;
            comp.contract.paymentScheme.previousPayment.amount = previousPaymentAmount;
            fixture.detectChanges();
            expect(comp.amount).toBe(previousPaymentAmount);
        });

    });

    describe('when on instalment plan', () => {
        beforeEach(() => {
            comp.contract = new ContractViewModel(contractNumber);
            comp.type = { hasInstalmentPlan: true };
        });

        describe('and NO instalments are overdue', () => {
            let expectedAmount: number;

            beforeEach(() => {
                const instalmentPlanBilling = new InstalmentPlanBillingBuilder().build();

                comp.contract.instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);
                fixture.detectChanges();

                expectedAmount = instalmentPlanBilling.nextInstalment.dueAmount;
            });

            it('should set buttonText to: Make a payment', () => {
                expect(comp.buttonText).toBe('Make a payment');
            });

            it('should override amount with amount of next instalment', () => {
                expect(comp.amount).toBe(expectedAmount);
            });
        });

        describe('and there are overdue instalments', () => {
            let expectedAmount: number;

            beforeEach(() => {
                const instalmentPlanBilling = new InstalmentPlanBillingBuilder().withOverdueInstalments().build();

                comp.contract.instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);
                fixture.detectChanges();

                expectedAmount = instalmentPlanBilling.nextInstalment.dueAmount + instalmentPlanBilling.overdueAmount;
            });

            it('should override amount with amount of next instalment + overdue instalments', () => {
                expect(comp.amount).toBe(expectedAmount);
            });
        });
    });
});
