import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { AlertComponent } from '../../../../../shared/component/alert/alert.component';
import { ToolTipWhiteComponent } from '../../../../../shared/component/usagetooltip/tooltipWhite.component';
import { UsageTooltipComponent } from '../../../../../shared/component/usagetooltip/usageTooltip.component';
import { PrePaymentBalanceTopUpUrgency } from '../../../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { ContentService } from '../../../../../shared/service/content.service';
import { Now } from '../../../../../shared/service/now.service';
import { RedLineApiService } from '../../../../../shared/service/redLineApi.service';
import { MockContentService } from '../../../../../shared/testing/mockContentService';
import { PrepaidBalanceComponent } from '../../../../dashboard/payg/prepaidBalance.component';
import { ModalService } from '../../../../modal/modal.service';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { ExtractBeforeDecimalPipe } from '../../../../pipes/extractBeforeDecimal.pipe';
import { ExtractDecimalPipe } from '../../../../pipes/extractDecimal.pipe';
import { SafeHtmlPipe } from '../../../../pipes/safeHtml.pipe';
import { ContractViewModel, IAccountServiceMA } from '../../../../services/account.service';
import { EventService } from '../../../../services/event.service';
import { PaymentService } from '../../../../services/payment.service';
import { BillPanelComponent } from '../billPanel.component';
import { BillPaymentButtonComponent } from '../billPaymentButton/billPaymentButton.component';
import { AlertMessages } from './../../../../../shared/messages/alertMessages';
import { BillMessagePanelPaygComponent } from './billMessagePanelPayg.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AglCurrencyPipe } from '../../../../pipes/aglCurrency.pipe';

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

describe('Bill Message Panel -PAYG', () => {
    let comp: BillMessagePanelPaygComponent;
    let fixture: ComponentFixture<BillMessagePanelPaygComponent>;

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
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ],
            declarations: [
                BillMessagePanelPaygComponent,
                BillPaymentButtonComponent,
                ExtractDecimalPipe,
                ExtractBeforeDecimalPipe,
                SafeHtmlPipe,
                AlertComponent,
                PrepaidBalanceComponent,
                UsageTooltipComponent,
                ToolTipWhiteComponent,
                AglCurrencyPipe
            ],
            imports: [
                HttpModule,
                MyAccountMaterialModule,
                HttpClientTestingModule
            ]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BillMessagePanelPaygComponent);
        comp = fixture.componentInstance;
    });

    it('should show correct image contextual message for PAYG-High', () => {
        comp.type = { directDebit: false };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        fixture.detectChanges();
        expect(comp.showDDMessage).toBeFalsy();
        expect(comp.svgIconPayg).toMatch('icon-low-graph');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('You\'ve run out of credit');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__subtext').textContent).toMatch('Top up to get back in credit');
    });

    it('should show correct image contextual message for PAYG-Low', () => {
        comp.type = { directDebit: false };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Low;
        fixture.detectChanges();
        expect(comp.svgIconPayg).toMatch('icon-tick-in-box');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('Your account is looking good.');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__subtext').textContent).toMatch('Keep topping up so you stay in credit and receive bonuses.');
    });

    it('should show correct image contextual message for PAYG-Medium', () => {
        comp.type = { directDebit: false };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Medium;
        fixture.detectChanges();
        expect(comp.showDDMessage).toBeFalsy();
        expect(comp.svgIconPayg).toMatch('icon-thermometer');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('You\'re running out of credit.');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__subtext').textContent).toMatch('Don\'t forget to top up soon so you get a bonus.');
    });

    it('should show correct image contextual message for PAYG- prepaid unavailable', () => {
        comp.type = { directDebit: false };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Unavailable;
        fixture.detectChanges();
        expect(comp.showDDMessage).toBeFalsy();
        expect(comp.svgIconPayg).toMatch('icon-warning');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('Sorry your balance isn\'t available');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__subtext').textContent).toMatch('You can still top up your account, just allow 1-2 business days for your new balance to be displayed.');
    });

    it('should show correct image contextual message for PAYG-High Directdebit', () => {
        comp.type = { directDebit: true };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        fixture.detectChanges();
        expect(comp.showDDMessage).toBeTruthy();
        expect(comp.svgIconPayg).toMatch('icon-low-graph');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('You\'ve run out of credit');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__subtext').textContent).toBeDefined();
    });

    it('should show correct image contextual message for PAYG-Low Directdebit', () => {
        comp.type = { directDebit: true };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Low;
        fixture.detectChanges();
        expect(comp.showDDMessage).toBeTruthy();
        expect(comp.svgIconPayg).toMatch('icon-tick-in-box');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('Your account is looking good.');
    });

    it('should show correct image contextual message for PAYG-Medium Directdebit', () => {
        comp.type = { directDebit: true };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Medium;
        fixture.detectChanges();
        expect(comp.showDDMessage).toBeTruthy();
        expect(comp.svgIconPayg).toMatch('icon-thermometer');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('You\'re running out of credit.');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__subtext').textContent).toBeDefined();
    });

    it('should show correct image contextual message for PAYG- prepaid unavailable Directdebit', () => {
        comp.type = { directDebit: true };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Unavailable;
        fixture.detectChanges();
        expect(comp.showDDMessage).toBeFalsy();
        expect(comp.svgIconPayg).toMatch('icon-warning');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('Sorry your balance isn\'t available');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__subtext').textContent).toBeDefined();
    });

    it('should show correct image contextual message for PAYG- no bills', () => {
        comp.type = { directDebit: true, noBills: true };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Medium;
        fixture.detectChanges();
        expect(comp.showDDMessage).toBeTruthy();
        expect(comp.svgIconPayg).toMatch('icon-thermometer');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('You\'re running out of credit.');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__subtext').textContent).toBeDefined();
    });

    it('should show correct image contextual message for PAYG-Low no bills', () => {
        comp.type = { directDebit: false, noBills: true };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.Low;
        fixture.detectChanges();
        expect(comp.svgIconPayg).toMatch('icon-tick-in-box');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('Your account is looking good.');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__subtext').textContent).toMatch('Keep topping up so you stay in credit and receive bonuses.');
    });

    it('should show correct image contextual message for PAYG-High Directdebit -First PrePayment Due Date New Customer', () => {
        comp.type = { directDebit: true };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        comp.contract.paygPrepaymentEligibile = '2017-10-20T01:00:00Z';
        fixture.detectChanges();
        expect(comp.showDDMessage).toBeTruthy();
        expect(comp.svgIconPayg).toMatch('icon-low-graph');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('Top up by 20 Oct to maximise your first bonus credit.');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__subtext').textContent).toBeDefined();
    });
    it('should show correct image contextual message for PAYG-High-First PrePayment Due Date New Customer', () => {
        comp.type = { directDebit: false };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        comp.contract.paygPrepaymentEligibile = '2017-10-20T01:00:00Z';
        fixture.detectChanges();
        expect(comp.showDDMessage).toBe(false);
        expect(comp.svgIconPayg).toMatch('icon-low-graph');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__title').textContent).toMatch('Top up by 20 Oct to maximise your first bonus credit.');
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__subtext').textContent).toMatch('To get the best value out of your plan, keep your account topped up and in credit.');
    });
    it('should show static message for PAYG-First PrePayment Due Date Product Swap Customer', () => {
        comp.type = { directDebit: false };
        comp.contract = new ContractViewModel('333333333');
        comp.contract.currentBalance = 30;
        comp.contract.isPayg = true;
        comp.contract.paygBand = PrePaymentBalanceTopUpUrgency.High;
        comp.contract.paygPrepaymentEligibile = '2017-10-20T01:00:00Z';
        comp.contract.showOutstandingBillPayg = true;
        comp.contract.outstandingBill = 192.86;
        fixture.detectChanges();
        console.log(fixture.nativeElement.querySelectorAll('.bill-panel-message-panel__content .first'));
        expect(fixture.nativeElement.querySelector('.bill-panel-message-panel__heading').textContent).toMatch('Kickstart your new prepaid plan');
        expect(fixture.nativeElement.querySelector('.first').textContent).toContain(' Combine the $192.86 you owe from your old plan WITH ');
        expect(fixture.nativeElement.querySelector('.second').textContent).toContain(' The first top-up amount you choose from the bonus breakdown AND');
        expect(fixture.nativeElement.querySelector('.third').textContent).toContain(' Make one easy payment by 20 Oct to maximise your bonus credits');
    });
});
