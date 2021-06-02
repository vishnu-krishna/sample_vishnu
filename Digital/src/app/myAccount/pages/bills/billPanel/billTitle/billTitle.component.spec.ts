import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrePaymentBalanceTopUpUrgency } from '../../../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { BillViewModel, ContractViewModel } from '../../../../services/account.service';
import { BillTitleComponent } from './billTitle.component';

describe('Bill Panel Title Component (inline template)', () => {

    let title: DebugElement;
    let comp: BillTitleComponent;
    let fixture: ComponentFixture<BillTitleComponent>;
    let contract: ContractViewModel = new ContractViewModel('111111111', new Array<BillViewModel>());

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                BillTitleComponent
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BillTitleComponent);
        comp = fixture.componentInstance;
        contract.isPayg = false;
        comp.contract = contract;
        title = fixture.debugElement.query(By.css('.bill-panel-title__title'));
    });

    it('should show the correct direct debit title', () => {
        comp.type = { directDebit: true };
        contract.isPayg = false;
        comp.contract = contract;
        fixture.detectChanges();
        expect(title.nativeElement.textContent).toMatch('Direct Debit amount');
    });

    it('should show the correct title when direct debit + credit or bill smoothing + credit', () => {
        comp.type = { directDebit: true, hasCredit: true };
        contract.isPayg = false;
        comp.contract = contract;
        fixture.detectChanges();
        expect(title.nativeElement.textContent).toMatch('Account balance');
    });

    it('should show the correct title for bill paid / or has credit', () => {
        comp.type = { billPaid: true };
        contract.isPayg = false;
        comp.contract = contract;
        fixture.detectChanges();
        expect(title.nativeElement.textContent).toMatch('Account balance');
    });

    it('should show the correct title for bill paid AND overdue', () => {
        comp.type = { billPaid: true, overdue: true };
        contract.isPayg = false;
        comp.contract = contract;
        fixture.detectChanges();
        expect(title.nativeElement.textContent).toMatch('Please pay');
    });

    it('should show the correct title for no bills', () => {
        comp.type = { noBills: true };
        contract.isPayg = false;
        comp.contract = contract;
        fixture.detectChanges();
        expect(title.nativeElement.textContent).toMatch('Account balance');
    });

    it('should show a title when a specific title isn\'t needed', () => {
        comp.type = {};
        contract.isPayg = false;
        comp.contract = contract;
        fixture.detectChanges();
        expect(title.nativeElement.textContent).toMatch('Please pay');
    });

    it('should show correct title for PAYG - Bill Issued', () => {
        comp.type = { hasDebit: true, newBillAndOverdue: true, overdue: true };
        contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        comp.contract = contract;
        fixture.detectChanges();
        expect(title.nativeElement.textContent).toMatch('Bill Issued');
    });

    it('should not show  title for PAYG - FPDD scenario', () => {
        comp.type = { hasDebit: true, newBillAndOverdue: true, overdue: true };
        contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        comp.contract.paygPrepaymentEligibile = '2017-10-20T01:00:00Z';
        comp.contract = contract;
        fixture.detectChanges();
        expect(title.nativeElement.textContent).toMatch('');
    });

    it('should not show  title for PAYG - Product swap scenario', () => {
        comp.type = { hasDebit: true, newBillAndOverdue: true, overdue: true };
        contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        comp.contract.showOutstandingBillPayg = true;
        comp.contract = contract;
        fixture.detectChanges();
        expect(title.nativeElement.textContent).toMatch('');
    });

});
