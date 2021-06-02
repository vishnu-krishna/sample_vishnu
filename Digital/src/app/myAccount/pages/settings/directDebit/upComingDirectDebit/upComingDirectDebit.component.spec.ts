import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';

import { Observable } from 'rxjs/Observable';
import { PaymentArrangementContractDetails } from '../../../../../shared/model/domain/paymentArrangement/paymentArrangementData.model';
import { FormatDatePipe } from '../../../../pipes/formatDate.pipe';
import { FeatureFlagTypes } from '../../../../services/featureFlag.constants';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { UpComingDirectDebitComponent } from './upComingDirectDebit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AglCurrencyPipe } from '../../../../pipes/aglCurrency.pipe';

describe('Upcoming Bills Direct Debit Component', () => {
    let comp: UpComingDirectDebitComponent;
    let fixture: ComponentFixture<UpComingDirectDebitComponent>;
    let de: DebugElement;

    it('should return the correct icon', () => {
        comp = new UpComingDirectDebitComponent();
        expect(comp.getIcon('Electricity')).toBe('icon-elec-enabled');
        expect(comp.getIcon('Gas')).toBe('icon-gas-enabled');
    });

    describe('Component test', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    UpComingDirectDebitComponent,
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

            fixture = TestBed.createComponent(UpComingDirectDebitComponent);
            comp = fixture.componentInstance;
            comp.paymentDetails = [new PaymentArrangementContractDetails()];
        });

        describe('default mode', () => {
            it('should show balance in red when overdue in default mode', () => {
                spyOn(comp.paymentDetails[0], 'displayInDefaultMode').and.returnValue(true);
                comp.paymentDetails[0].isOverdue = true;

                fixture.detectChanges();
                de = fixture.debugElement;

                let overdueBalance = de.query(By.css('.upcoming__text__balance__amount-red')).nativeElement;
                let duedate = de.query(By.css('.upcoming__text__balance__duedate')).nativeElement;
                expect(overdueBalance).toBeDefined();
                expect(duedate).toBeDefined();
            });

            it('should show date where there is current balance and direct debit date in default mode', () => {
                const anyDueDate = new Date('2021-01-01');
                spyOn(comp.paymentDetails[0], 'displayInDefaultMode').and.returnValue(true);
                comp.paymentDetails[0].isCurrentBalance = true;
                comp.paymentDetails[0].dueDate = anyDueDate;

                fixture.detectChanges();
                de = fixture.debugElement;

                let date = de.query(By.css('.upcoming__text__balance__date'));
                expect(date).toBeDefined();
            });

            it('should show pending text when contract is pending in default mode', () => {
                spyOn(comp.paymentDetails[0], 'displayInDefaultMode').and.returnValue(true);
                comp.paymentDetails[0].isBillSmoothingV2 = false;
                comp.paymentDetails[0].extendedDueDate = false;
                comp.paymentDetails[0].isCurrentBalance = true;
                comp.paymentDetails[0].isPending = true;

                fixture.detectChanges();
                de = fixture.debugElement;

                let pending = de.query(By.css('.upcoming__text__pending')).nativeElement;
                expect(pending).toBeDefined();
            });

            it('should show overdue amount when in default mode', () => {
                const anyDueDate = new Date('2022-01-01');
                spyOn(comp.paymentDetails[0], 'displayInDefaultMode').and.returnValue(true);
                comp.paymentDetails[0].isCurrentBalance = true;
                comp.paymentDetails[0].dueDate = anyDueDate;
                comp.paymentDetails[0].isOverdue = true;
                fixture.detectChanges();

                let nativeElement = fixture.nativeElement.querySelector('.upcoming__text__balance__amount-red');
                expect(nativeElement.textContent).toContain('overdue');
            });
        });

        describe('bill smoothing mode', () => {
            it('should show fortnightly bill smoothing details when contract is in bill smoothing mode', () => {
                spyOn(comp.paymentDetails[0], 'displayInBillSmoothingMode').and.returnValue(true);
                const anyBillSmoothingAmount = 10;
                const anyBillSmoothingDate = new Date();
                comp.paymentDetails[0].billSmoothingAmount = anyBillSmoothingAmount;
                comp.paymentDetails[0].billSmoothingPreviousAmountUsed = true;
                comp.paymentDetails[0].billSmoothingDate = anyBillSmoothingDate;

                fixture.detectChanges();
                de = fixture.debugElement;

                let smoothing = de.query(By.css('.test__smoothing')).nativeElement;
                expect(smoothing).toBeDefined();
            });

            it('should not show fortnightly bill smoothing details when contract is not in bill smoothing mode', () => {
                spyOn(comp.paymentDetails[0], 'displayInDefaultMode').and.returnValue(true);

                fixture.detectChanges();
                de = fixture.debugElement;

                let smoothing = de.query(By.css('.test__smoothing'));
                expect(smoothing).toBeNull();
            });

            it('should show fortnightly bill smoothing date when next payment date is available', () => {
                spyOn(comp.paymentDetails[0], 'displayInBillSmoothingMode').and.returnValue(true);
                const anyBillSmoothingAmount = 10;
                const anyBillSmoothingDate = new Date();
                comp.paymentDetails[0].billSmoothingAmount = anyBillSmoothingAmount;
                comp.paymentDetails[0].billSmoothingPreviousAmountUsed = false;
                comp.paymentDetails[0].billSmoothingDate = anyBillSmoothingDate;

                fixture.detectChanges();
                de = fixture.debugElement;

                let smoothing = de.query(By.css('.test__smoothing-date'));
                expect(smoothing).toBeDefined();
            });

            it('should not show fortnightly bill smoothing date when next payment date is not available', () => {
                spyOn(comp.paymentDetails[0], 'displayInBillSmoothingMode').and.returnValue(true);
                const anyBillSmoothingAmount = 10;
                comp.paymentDetails[0].billSmoothingAmount = anyBillSmoothingAmount;
                comp.paymentDetails[0].billSmoothingPreviousAmountUsed = true;

                fixture.detectChanges();
                de = fixture.debugElement;

                let smoothing = de.query(By.css('.test__smoothing-date'));
                expect(smoothing).toBeNull();
            });
        });

        describe('payment extension', () => {
            it('should not show "original debit date" copy when in default mode', () => {
                const anyDueDate = new Date('2021-01-01');
                spyOn(comp.paymentDetails[0], 'displayInDefaultMode').and.returnValue(true);
                comp.paymentDetails[0].isCurrentBalance = true;
                comp.paymentDetails[0].dueDate = anyDueDate;
                fixture.detectChanges();

                let nativeElement = fixture.nativeElement.querySelector('.test_extended_due-date');
                expect(nativeElement).toBeNull();
            });

            it('should show extended debit date copy when in payment extension mode', () => {
                const anyDueDate = new Date('2021-01-01');
                const anyExtendedDueDate = new Date('2021-01-14');
                spyOn(comp.paymentDetails[0], 'displayInPaymentExtensionMode').and.returnValue(true);
                comp.paymentDetails[0].isCurrentBalance = true;
                comp.paymentDetails[0].dueDate = anyDueDate;
                comp.paymentDetails[0].extendedDueDate = anyExtendedDueDate;
                fixture.detectChanges();

                let nativeElement = fixture.nativeElement.querySelector('.test_extended_due-date');
                expect(nativeElement.textContent).toContain('Extended debit date');
            });

            it('should not show overdue amount when in payment extension mode', () => {
                const anyDueDate = new Date('2022-01-01');
                const anyExtendedDueDate = new Date('2021-01-14');
                spyOn(comp.paymentDetails[0], 'displayInPaymentExtensionMode').and.returnValue(true);
                comp.paymentDetails[0].isCurrentBalance = true;
                comp.paymentDetails[0].dueDate = anyDueDate;
                comp.paymentDetails[0].isOverdue = true;
                comp.paymentDetails[0].extendedDueDate = anyExtendedDueDate;
                fixture.detectChanges();

                let nativeElement = fixture.nativeElement.querySelector('.upcoming__text__balance__amount-red');
                expect(nativeElement).toBeNull();
            });
        });

        describe('instalment plan mode', () => {
            it('should show correct data when in instalment plan mode', () => {
                const anyDueDate = new Date('2022-01-01');
                const anyOverdueAmount = 10;
                const anyTotalAmountOwing = 20;
                spyOn(comp.paymentDetails[0], 'displayInInstalmentPlanMode').and.returnValue(true);
                comp.paymentDetails[0].isOverdue = true;
                comp.paymentDetails[0].overdueAmount = anyOverdueAmount;
                comp.paymentDetails[0].totalAmountOwing = anyTotalAmountOwing;
                comp.paymentDetails[0].dueDate = anyDueDate;
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
