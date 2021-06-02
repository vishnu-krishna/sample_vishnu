import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import * as moment from 'moment';

import { BillingModule } from '../../../../modules/billing.module';
import { InstalmentPlanBillingBuilder } from '../test';
import { AglCurrencyPipe } from './../../../../pipes/aglCurrency.pipe';
import { DateHelper } from './../../../../../shared/utils/dateHelper';
import { InstalmentPlanModel, BillInstalmentPlanDescriptionComponent } from './billInstalmentPlanDescription.component';

const instalmentPlan = new InstalmentPlanModel(new InstalmentPlanBillingBuilder().build(), false);
const expectedInstalmentIndexCopy = `Instalment ${instalmentPlan.nextInstalment.index}`;
const expectedDueDateCopy = DateHelper.toHumanString(moment(instalmentPlan.nextInstalment.dueDate));

const overdueInstalmentPlan = new InstalmentPlanModel(new InstalmentPlanBillingBuilder().withOverdueInstalments().build(), false);
const expectedNextInstalmentAmountCopy = new AglCurrencyPipe().transform(overdueInstalmentPlan.nextInstalment.dueAmount);
const expectedOverdueAmountCopy = new AglCurrencyPipe().transform(overdueInstalmentPlan.overdueAmount);

describe('BillInstalmentPlanDescriptionComponent', () => {
    let fixture: ComponentFixture<BillInstalmentPlanDescriptionComponent>;
    let comp: BillInstalmentPlanDescriptionComponent;
    let de: DebugElement;

    const billPanelInstalmentPlanMessagePanelTitleSelector = '.bill-panel-instalment-plan-message-panel__title';
    const billPanelInstalmentPlanMessagePanelSubtextSelector = '.bill-panel-instalment-plan-message-panel__subtext';
    const billPanelInstalmentPlanMessagePanelSubtextWarningSelector = '.bill-panel-instalment-plan-message-panel__subtext--warning';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BillingModule]
        });

        fixture = TestBed.createComponent(BillInstalmentPlanDescriptionComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('when instalmentPlan is undefined', () => {
        beforeEach(() => {
            comp.instalmentPlan = undefined;

            fixture.detectChanges();
        });

        it('should hide title', () => {
            const title = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelTitleSelector);

            expect(title).toBeNull();
        });

        it('should hide subtext', () => {
            const subtext = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelSubtextSelector);

            expect(subtext).toBeNull();
        });
    });

    describe('when instalmentPlan is defined and NOT overdue', () => {

        beforeEach(() => {
            comp.instalmentPlan = instalmentPlan;

            fixture.detectChanges();
        });

        it('should show title', () => {
            const title = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelTitleSelector);

            expect(title).toBeDefined();
        });

        it('should hide subtext', () => {
            const subtext = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelSubtextSelector);

            expect(subtext).toBeNull();
        });

        it(`title should contain next instalment index: ${expectedInstalmentIndexCopy}`, () => {
            const title = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelTitleSelector);

            expect(title.textContent).toContain(expectedInstalmentIndexCopy);
        });

        it(`title should contain next instalment due date: ${expectedDueDateCopy}`, () => {
            const title = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelTitleSelector);

            expect(title.innerHTML).toContain(expectedDueDateCopy);
        });

        describe('and when on direct debit', () => {
            beforeEach(() => {
                comp.instalmentPlan.isDirectDebit = true;
                comp.ngOnInit();

                fixture.detectChanges();
            });

            it('title should contain: debited', () => {
                const title = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelTitleSelector);

                expect(title.textContent).toContain('debited');
            });
        });

        describe('and when NOT on direct debit', () => {
            beforeEach(() => {
                comp.instalmentPlan.isDirectDebit = false;
                comp.ngOnInit();

                fixture.detectChanges();
            });

            it('title should contain: due', () => {
                const title = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelTitleSelector);

                expect(title.textContent).toContain('due');
            });
        });
    });

    describe('when instalmentPlan is defined AND overdue', () => {
        beforeEach(() => {
            comp.instalmentPlan = overdueInstalmentPlan;

            fixture.detectChanges();
        });

        it('should show title', () => {
            const title = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelTitleSelector);

            expect(title).toBeDefined();
        });

        it('should show subtext', () => {
            const subtext = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelSubtextSelector);

            expect(subtext).toBeDefined();
        });

        it(`subtext should contain next instalment amount: ${expectedNextInstalmentAmountCopy}`, () => {
            const subtext = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelSubtextSelector);

            expect(subtext.textContent).toContain(expectedNextInstalmentAmountCopy);
        });

        it(`warning should contain overdue amount: ${expectedOverdueAmountCopy}`, () => {
            const warning = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelSubtextWarningSelector);

            expect(warning.textContent).toContain(expectedOverdueAmountCopy);
        });

        describe('and when last instalment is in past', () => {
            beforeEach(() => {
                const instalmentBilling = new InstalmentPlanBillingBuilder()
                    .withOverdueInstalments()
                    .withoutNextInstalment()
                    .build();

                comp.instalmentPlan = new InstalmentPlanModel(instalmentBilling, false);

                fixture.detectChanges();
            });

            it('should hide title', () => {
                const title = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelTitleSelector);

                expect(title).toBeNull();
            });

            it('should show subtext', () => {
                const subtext = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelSubtextSelector);

                expect(subtext).toBeDefined();
            });

            it(`warning should contain overdue amount`, () => {
                const warning = fixture.nativeElement.querySelector(billPanelInstalmentPlanMessagePanelSubtextWarningSelector);

                expect(warning.textContent).toContain(expectedOverdueAmountCopy);
            });
        });
    });
});
