import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillBottomNoticeComponent }        from './billBottomNotice.component';

describe('Bill Panel Bottom Notice Component (inline template)', () => {

  let comp: BillBottomNoticeComponent;
  let fixture: ComponentFixture<BillBottomNoticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
          BillBottomNoticeComponent
        ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillBottomNoticeComponent);
    comp = fixture.componentInstance;
  });

  it('should show direct debit message', () => {
    comp.type = { directDebit: true, newBillAndOverdue: false };
    fixture.detectChanges();
    expect(comp.showDDMessage).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.bill-panel-notice').textContent).toMatch('Your nominated account will be debited on the due date, however you can make a payment at anytime.');
  });

  it('should not show direct debit message if DD and overdue', () => {
    comp.type = { directDebit: true, overdue: true };
    fixture.detectChanges();
    expect(comp.showDDMessage).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.bill-panel-notice').textContent).toMatch('');
  });

  it('should not show direct debit message if DD,new bill and overdue', () => {
    comp.type = { directDebit: true, newBillAndOverdue: true };
    fixture.detectChanges();
    expect(comp.showDDMessage).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.bill-panel-notice').textContent).toMatch('');
  });

  it('should show the bill smoothing message', () => {
    comp.type = { billSmoothing: true };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.bill-panel-notice')).toBeDefined();
  });

});
