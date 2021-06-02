import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { PaymentArrangementContractDetails } from '../../../../../shared/model/domain/paymentArrangement/paymentArrangementData.model';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { FormatDatePipe } from '../../../../pipes/formatDate.pipe';
import { FeatureFlagTypes } from '../../../../services/featureFlag.constants';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { UpcomingBillsSmsPayComponent } from './upcomingBills.smspay.component';
import { ReplaySubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AglCurrencyPipe } from '../../../../pipes/aglCurrency.pipe';

describe('Upcoming Bills SMS Pay Component', () => {
    let comp: UpcomingBillsSmsPayComponent;
    let fixture: ComponentFixture<UpcomingBillsSmsPayComponent>;
    let de: DebugElement;

    it('should return the correct icon', () => {
        comp = new UpcomingBillsSmsPayComponent();
        expect(comp.getIcon('Electricity')).toBe('icon-elec-enabled');
        expect(comp.getIcon('Gas')).toBe('icon-gas-enabled');
    });

    describe('Component test', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    UpcomingBillsSmsPayComponent,
                    FormatDatePipe,
                    AglCurrencyPipe
                ],
                imports: [
                    MyAccountMaterialModule,
                    HttpClientTestingModule
                ],
                providers: [
                    PaymentArrangementContractDetails,
                    { provide: MATERIAL_SANITY_CHECKS, useValue: false }
                ]
            });

            fixture = TestBed.createComponent(UpcomingBillsSmsPayComponent);
            comp = fixture.componentInstance;
            comp.account = { upcomingPaymentArrangementModel: [new PaymentArrangementContractDetails()] };
        });

        describe('fuel types', () => {
            describe('for gas', () => {
                beforeEach(() => {
                    comp.account.upcomingPaymentArrangementModel[0].fuelType = 'Gas';

                    fixture.detectChanges();
                    de = fixture.debugElement;
                });
                it('should the fuel type header', () => {
                    const element = de.query(By.css('.upcoming__text__header')).nativeElement;
                    expect(element.innerHTML).toContain('Gas');
                });
            });
            describe('for electricity', () => {
                beforeEach(() => {
                    comp.account.upcomingPaymentArrangementModel[0].fuelType = 'Electricity';

                    fixture.detectChanges();
                    de = fixture.debugElement;
                });
                it('should the fuel type header', () => {
                    const element = de.query(By.css('.upcoming__text__header')).nativeElement;
                    expect(element.innerHTML).toContain('Electricity');
                });
            });
        });

        describe('default mode', () => {
            it('should show balance in red when overdue', () => {
                spyOn(comp.account.upcomingPaymentArrangementModel[0], 'displayInDefaultMode').and.returnValue(true);
                comp.account.upcomingPaymentArrangementModel[0].isOverdue = true;

                fixture.detectChanges();
                de = fixture.debugElement;

                const element = de.query(By.css('.upcoming__text__balance__amount-red')).nativeElement;
                expect(element).toBeDefined();
            });

            it('should show amount owing', () => {
                const totalAmountOwing = '55.20';
                spyOn(comp.account.upcomingPaymentArrangementModel[0], 'displayInDefaultMode').and.returnValue(true);
                comp.account.upcomingPaymentArrangementModel[0].totalAmountOwing = totalAmountOwing;

                fixture.detectChanges();
                de = fixture.debugElement;

                const element = de.query(By.css('.upcoming__text__balance__amount')).nativeElement;
                expect(element.innerHTML).toContain(totalAmountOwing);
            });

            it('should show date where there is current balance and due date', () => {
                const anyDuedate = '2021-01-01';
                spyOn(comp.account.upcomingPaymentArrangementModel[0], 'displayInDefaultMode').and.returnValue(true);
                comp.account.upcomingPaymentArrangementModel[0].isCurrentBalance = true;
                comp.account.upcomingPaymentArrangementModel[0].dueDate = anyDuedate;

                fixture.detectChanges();
                de = fixture.debugElement;

                const date = de.query(By.css('.upcoming__text__balance__date')).nativeElement;
                expect(date).toBeDefined();
            });
        });

        describe('bill smoothing mode', () => {
            it('should show bill smoothing when on bill smoothing', () => {
                const anyDate = new Date();
                const billSmoothingAmount = 10;
                const frequency = 'Weekly';
                spyOn(comp.account.upcomingPaymentArrangementModel[0], 'displayInBillSmoothingMode').and.returnValue(true);
                comp.account.upcomingPaymentArrangementModel[0].billSmoothingAmount = billSmoothingAmount;
                comp.account.upcomingPaymentArrangementModel[0].frequency = frequency;
                comp.account.upcomingPaymentArrangementModel[0].billSmoothingDate = anyDate;

                fixture.detectChanges();
                de = fixture.debugElement;

                const element = de.query(By.css('.bill-smoothing'));
                expect(element).toBeDefined('.bill-smoothing');
            });
        });

        describe('payment extension', () => {
            it('should not show extended due date copy when in default mode', () => {
                const anyDate = new Date();
                spyOn(comp.account.upcomingPaymentArrangementModel[0], 'displayInDefaultMode').and.returnValue(true);
                comp.account.upcomingPaymentArrangementModel[0].isCurrentBalance = true;
                comp.account.upcomingPaymentArrangementModel[0].dueDate = anyDate;
                fixture.detectChanges();

                let nativeElement = fixture.nativeElement.querySelector('.test_extended_duedate');
                expect(nativeElement).toBeNull();
            });

            it('should show extended due date copy when in payment extension mode', () => {
                const anyDate = new Date();
                spyOn(comp.account.upcomingPaymentArrangementModel[0], 'displayInPaymentExtensionMode').and.returnValue(true);
                comp.account.upcomingPaymentArrangementModel[0].isCurrentBalance = true;
                comp.account.upcomingPaymentArrangementModel[0].dueDate = anyDate;
                comp.account.upcomingPaymentArrangementModel[0].extendedDueDate = anyDate;
                fixture.detectChanges();

                let nativeElement = fixture.nativeElement.querySelector('.test_extended_duedate');
                expect(nativeElement.textContent).toContain('Extended due date');
            });

            it('should not show overdue amount when in payment extension mode', () => {
                const anyDate = new Date();
                spyOn(comp.account.upcomingPaymentArrangementModel[0], 'displayInPaymentExtensionMode').and.returnValue(true);
                comp.account.upcomingPaymentArrangementModel[0].isCurrentBalance = true;
                comp.account.upcomingPaymentArrangementModel[0].dueDate = anyDate;
                comp.account.upcomingPaymentArrangementModel[0].isOverdue = true;
                comp.account.upcomingPaymentArrangementModel[0].extendedDueDate = anyDate;
                fixture.detectChanges();

                let nativeElement = fixture.nativeElement.querySelector('.upcoming__text__balance__amount-red');
                expect(nativeElement).toBeNull();
            });
        });

        describe('instalment plan mode', () => {
            it('should show correct data when in instalment plan mode', () => {
                const anyDate = new Date();
                const overdueAmount = 10;
                const totalAmountOwing = 20;
                spyOn(comp.account.upcomingPaymentArrangementModel[0], 'displayInInstalmentPlanMode').and.returnValue(true);
                comp.account.upcomingPaymentArrangementModel[0].isOverdue = true;
                comp.account.upcomingPaymentArrangementModel[0].overdueAmount = overdueAmount;
                comp.account.upcomingPaymentArrangementModel[0].totalAmountOwing = totalAmountOwing;
                comp.account.upcomingPaymentArrangementModel[0].dueDate = anyDate;
                fixture.detectChanges();

                let overdue = fixture.nativeElement.querySelector('.upcoming__text__balance__amount-red');
                expect(overdue.textContent).toContain('overdue');
                let date = de.query(By.css('.upcoming__text__balance__date'));
                expect(date).toBeDefined();
                let due = de.query(By.css('.upcoming__text__balance__amount'));
                expect(due).toBeDefined();
            });
        });
    });
});
