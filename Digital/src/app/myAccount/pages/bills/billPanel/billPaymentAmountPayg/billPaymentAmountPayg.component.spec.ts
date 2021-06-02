import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { BillPanelComponent } from '../billPanel.component';
import { BillPaymentButtonComponent } from '../billPaymentButton/billPaymentButton.component';
import { AlertMessages } from './../../../../../shared/messages/alertMessages';
import { BillPaymentAmountPaygComponent } from './billPaymentAmountPayg.component';

import { AlertComponent } from '../../../../../shared/component/alert/alert.component';
import { ToolTipWhiteComponent } from '../../../../../shared/component/usagetooltip/tooltipWhite.component';
import { UsageTooltipComponent } from '../../../../../shared/component/usagetooltip/usageTooltip.component';
import { PrePaymentBalanceTopUpUrgency } from '../../../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { ContentService } from '../../../../../shared/service/content.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { Now } from '../../../../../shared/service/now.service';
import { RedLineApiService } from '../../../../../shared/service/redLineApi.service';
import { MockContentService } from '../../../../../shared/testing/mockContentService';
import { PrepaidBalanceComponent } from '../../../../dashboard/payg/prepaidBalance.component';
import { ModalService } from '../../../../modal/modal.service';
import { ExtractBeforeDecimalPipe } from '../../../../pipes/extractBeforeDecimal.pipe';
import { ExtractDecimalPipe } from '../../../../pipes/extractDecimal.pipe';
import { SafeHtmlPipe } from '../../../../pipes/safeHtml.pipe';
import { ContractViewModel, IAccountServiceMA } from '../../../../services/account.service';
import { EventService } from '../../../../services/event.service';
import { PaymentService } from '../../../../services/payment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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

describe('Bill Payment Amount -PAYG', () => {
  let comp: BillPaymentAmountPaygComponent;
  let fixture: ComponentFixture<BillPaymentAmountPaygComponent>;

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
        BillPaymentAmountPaygComponent,
        BillPaymentButtonComponent,
        ExtractDecimalPipe,
        ExtractBeforeDecimalPipe,
        SafeHtmlPipe,
        AlertComponent,
        PrepaidBalanceComponent,
        UsageTooltipComponent,
        ToolTipWhiteComponent
      ],
      imports: [
        HttpModule,
        MyAccountMaterialModule,
        HttpClientTestingModule,
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPaymentAmountPaygComponent);
    comp = fixture.componentInstance;
  });

  it('should show contextual message for PAYG-High ,Bill Issued - Due', () => {
    comp.type = { hasDebit: true, pendingPayment: true };
    comp.contract = new ContractViewModel('333333333');
    comp.contract.currentBalance = 30;
    comp.contract.isPayg = true;
    comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
    comp.contract.prepaidCharges = 12;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#bill-panel-debit-message').textContent).toMatch('Looks like you have fallen behind.\nTop up to get back in credit and receive bonuses.');
  });

  it('should not show contextual message for PAYG-low', () => {
    comp.type = { hasDebit: true, pendingPayment: true };
    comp.contract = new ContractViewModel('333333333');
    comp.contract.currentBalance = 30;
    comp.contract.isPayg = true;
    comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Low;
    comp.contract.prepaidCharges = 12;
    fixture.detectChanges();
    expect(comp.isPaygDebit).toBeFalsy();
  });

  it('should show contextual message for PAYG-High,DirectDebit-overdue scenario ', () => {
    comp.type = { overdue: true, newBillAndOverdue: true, directDebit: true, pendingPayment: true };
    comp.contract = new ContractViewModel('333333333');
    comp.contract.currentBalance = 30;
    comp.contract.isPayg = true;
    comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
    comp.contract.prepaidCharges = 12;
    fixture.detectChanges();
    expect(comp.isPaygDebit).toBeFalsy();
    expect(comp.showOverdueDDMessage).toBeTruthy();
    expect(fixture.nativeElement.querySelector('#bill-panel-debit-dd-message').textContent.trim()).toMatch('Your account needs your attention. Check your Direct Debit details and make a payment to get back in credit.');
  });

  it('should not show contextual message for PAYG-High FPDD', () => {
    comp.type = { hasDebit: true, pendingPayment: true };
    comp.contract = new ContractViewModel('333333333');
    comp.contract.currentBalance = 30;
    comp.contract.isPayg = true;
    comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
    comp.contract.prepaidCharges = 12;
    comp.contract.paygPrepaymentEligibile = '2017-10-20T01:00:00Z';
    fixture.detectChanges();
    expect(comp.isPaygDebit).toBeFalsy();
    expect(comp.showOverdueDDMessage).toBeFalsy();
  });

  it('should not show contextual message for PAYG-High product swap', () => {
    comp.type = { hasDebit: true, pendingPayment: true };
    comp.contract = new ContractViewModel('333333333');
    comp.contract.currentBalance = 30;
    comp.contract.isPayg = true;
    comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
    comp.contract.prepaidCharges = 12;
    comp.contract.showOutstandingBillPayg = true;
    fixture.detectChanges();
    expect(comp.isPaygDebit).toBeFalsy();
    expect(comp.showOverdueDDMessage).toBeFalsy();
  });
});
