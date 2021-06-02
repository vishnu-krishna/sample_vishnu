import { BillTypes } from './../../billPanel.component';
import { ContractViewModelBuilder } from './../../../../../../shared/component/paymentArrangement/test/contractViewModelBuilder';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as moment from 'moment';

import { DateHelper } from './../../../../../../shared/utils/dateHelper';
import { CommonPipesModule } from './../../../../../modules/commonPipes.module';
import { BillSubtextInstalmentPlanComponent } from './billSubtextInstalmentPlan.component';
import { ContractViewModel } from '../../../../../services/account.service';
import { MyAccountMaterialModule } from '../../../../../modules/my-account.material.module';
import { InstalmentPlanData, InstalmentPlanBilling } from '../../../../../services/paymentScheme/instalmentPlan.service';
import { PaymentAssistancePlanInstalmentsModel } from '../../../paymentAssistance/plan/instalments';
import { InstalmentPlanBillingBuilder } from '../../test';
import { BillPanelInstalmentPlanBillPeriodModule } from '../../instalmentPlanBillPeriod';
import { InstalmentPlanModel } from '../../billInstalmentPlanDescription/billInstalmentPlanDescription.component';
import { BillPanelTestDataBuilder } from '../../billPanelTestDataBuilder';

describe('BillSubtextInstalmentPlanComponent', () => {
    const progressTracker: PaymentAssistancePlanInstalmentsModel = undefined;
    let dummyType: BillTypes;

    let fixture: ComponentFixture<BillSubtextInstalmentPlanComponent>;
    let comp: BillSubtextInstalmentPlanComponent;

    let actualTextContent: string;
    let expectedInstalmentIndexCopy: string;
    let expectedDueDateCopy: string;

    const contractAccountNumber = 1;
    const contractNumber = 2;

    const subtextSelector = '.bill-panel-instalment-plan-message-panel__subtext';

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BillSubtextInstalmentPlanComponent
            ],
            imports: [
                CommonPipesModule,
                MyAccountMaterialModule,
                BillPanelInstalmentPlanBillPeriodModule
            ],
            providers: [
                { provide: 'AppContentBranch', useValue: 'selfService' }
            ]
        });

        fixture = TestBed.createComponent(BillSubtextInstalmentPlanComponent);
        comp = fixture.componentInstance;
    });

    describe('when last instalment is in the future', () => {
        describe('and when on Direct Debit', () => {
            let instalmentPlanBilling: InstalmentPlanBilling;

            beforeEach(() => {
                instalmentPlanBilling = new InstalmentPlanBillingBuilder()
                    .build();

                const instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);

                BillPanelTestDataBuilder
                    .create()
                    .andOnDirectDebit()
                    .andHasInstalmentPlan(instalmentPlan)
                    .assignTo((type) => dummyType = type, (contract) => comp.contract = contract);

                expectedInstalmentIndexCopy = `Instalment ${instalmentPlanBilling.nextInstalment.index}`;
                expectedDueDateCopy = DateHelper.toHumanString(moment(instalmentPlanBilling.nextInstalment.dueDate));

                comp.ngOnInit();
                fixture.detectChanges();

                actualTextContent = fixture.nativeElement.textContent;
            });

            it('should display instalment index copy', () => {
                expect(actualTextContent).toContain(expectedInstalmentIndexCopy);
            });

            it('should display debited', () => {
                expect(actualTextContent).toContain('debited');
            });

            it('should format date', () => {
                expect(actualTextContent).toContain(expectedDueDateCopy);
            });
        });

        describe('and when NOT on Direct Debit', () => {
            let instalmentPlanBilling: InstalmentPlanBilling;

            beforeEach(() => {
                instalmentPlanBilling = new InstalmentPlanBillingBuilder()
                    .build();

                const instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);

                BillPanelTestDataBuilder
                    .create()
                    .andHasInstalmentPlan(instalmentPlan)
                    .assignTo((type) => dummyType = type, (contract) => comp.contract = contract);

                expectedInstalmentIndexCopy = `Instalment ${instalmentPlanBilling.nextInstalment.index}`;
                expectedDueDateCopy = DateHelper.toHumanString(moment(instalmentPlanBilling.nextInstalment.dueDate));

                comp.ngOnInit();
                fixture.detectChanges();

                actualTextContent = fixture.nativeElement.textContent;
            });

            it('should display due', () => {
                expect(actualTextContent).toContain('due');
            });
        });
    });

    describe('when last instalment is in the past', () => {
        let instalmentPlanBilling: InstalmentPlanBilling;

        beforeEach(() => {
            instalmentPlanBilling = new InstalmentPlanBillingBuilder()
                .withOverdueInstalments()
                .withoutNextInstalment()
                .build();

            const instalmentPlan = new InstalmentPlanData(instalmentPlanBilling, progressTracker);

            BillPanelTestDataBuilder
                .create()
                .andHasInstalmentPlan(instalmentPlan)
                .assignTo((type) => dummyType = type, (contract) => comp.contract = contract);

            comp.ngOnInit();
            fixture.detectChanges();
        });

        it('should hide subtext', () => {
            const subtext = fixture.nativeElement.querySelector(subtextSelector);
            expect(subtext).toBeNull();
        });
    });
});
