import { TestBed, ComponentFixture } from '@angular/core/testing';

import { CommonPipesModule } from './../../../../../modules/commonPipes.module';
import { BillPaymentInstalmentPlanComponent } from './billPaymentInstalmentPlan.component';
import { InstalmentPlanBilling, OverdueInstalment, InstalmentPlanData } from '../../../../../services/paymentScheme/instalmentPlan.service';
import { PaymentAssistancePlanInstalmentsModel } from '../../../paymentAssistance/plan/instalments';
import { InstalmentPlanBillingBuilder } from '../../test';
import { ContractViewModelBuilder } from '../../../../../../shared/component/paymentArrangement/test';

describe('BillPaymentInstalmentPlanComponent', () => {
    const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;

    let fixture: ComponentFixture<BillPaymentInstalmentPlanComponent>;
    let comp: BillPaymentInstalmentPlanComponent;

    let expectedTotalInstalmentPlanOwingBalance: number;

    const contractAccountNumber: number = 1;
    const contractNumber: number = 2;

    const instalmentPlanOwingBalanceSelector = '.instalment-plan__owing-balance';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonPipesModule
            ],
            declarations: [
                BillPaymentInstalmentPlanComponent
            ]
        });

        fixture = TestBed.createComponent(BillPaymentInstalmentPlanComponent);
        comp = fixture.componentInstance;

        expectedTotalInstalmentPlanOwingBalance = -1;
    });

    describe('when set instalmentPlan', () => {
        describe('and there are NO overdue instalments', () => {
            beforeEach(() => {
                const instalmentPlanBilling = new InstalmentPlanBillingBuilder().build();
                comp.contract = new ContractViewModelBuilder(contractAccountNumber, contractNumber)
                    .withInstalmentPlan(new InstalmentPlanData(instalmentPlanBilling, progressTracker))
                    .build();
                fixture.detectChanges();

                expectedTotalInstalmentPlanOwingBalance = instalmentPlanBilling.totalInstalmentPlanOwingBalance;
            });

            it ('should display owing balance', () => {
                const owingBalance = fixture.nativeElement.querySelector(instalmentPlanOwingBalanceSelector);
                expect(owingBalance.textContent).toContain(`$${expectedTotalInstalmentPlanOwingBalance}`);
            });
        });
    });
});
