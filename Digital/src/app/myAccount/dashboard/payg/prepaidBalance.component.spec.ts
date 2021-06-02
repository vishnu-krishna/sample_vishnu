import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolTipWhiteComponent } from '../../../shared/component/usagetooltip/tooltipWhite.component';
import { UsageTooltipComponent } from '../../../shared/component/usagetooltip/usageTooltip.component';
import { PaygView } from '../../../shared/globals/paygView';
import { PrePaymentBalanceTopUpUrgency } from '../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { ContentService } from '../../../shared/service/content.service';
import { MockContentService } from '../../../shared/testing/mockContentService';
import { ExtractBeforeDecimalPipe } from '../../pipes/extractBeforeDecimal.pipe';
import { ExtractDecimalPipe } from '../../pipes/extractDecimal.pipe';
import { ContractViewModel } from '../../services/account.service';
import { PrepaidBalanceComponent } from './prepaidBalance.component';

describe('PrepaidBalanceComponent', () => {

    let component: PrepaidBalanceComponent;
    let fixture: ComponentFixture<PrepaidBalanceComponent>;
    let debugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [
            PrepaidBalanceComponent,
            UsageTooltipComponent,
            ToolTipWhiteComponent,
            ExtractDecimalPipe,
            ExtractBeforeDecimalPipe,
          ],
          providers: [
            { provide: 'AppContentBranch', useValue: 'selfService' },
            { provide: ContentService, useClass: MockContentService },
          ]
        });
        fixture = TestBed.createComponent(PrepaidBalanceComponent);
        component = fixture.componentInstance;
      });

    it('should set the payg viewmodel balance to unavailable when the top up urgency is unavailable', async(() => {
      // Arrange
      component.contract = new ContractViewModel('333333333');
      component.contract.prepaidCharges = 12;
      component.contract.paygBand = PrePaymentBalanceTopUpUrgency.Unavailable;

      // Act
      component.ngOnInit();

      // Assert
      expect(component.paygView).toBe(PaygView.Unavailable);
    }));

    it('should set the payg viewmodel balance to debit when the balance is below zero', async(() => {
      // Arrange
      component.contract = new ContractViewModel('333333333');
      component.contract.paygBalance = -1;
      component.contract.prepaidCharges = 12;

      // Act
      component.ngOnInit();

      // Assert
      expect(component.paygView).toBe(PaygView.DebitBalance);
    }));

    it('should set the payg viewmodel balance to low when the top up urgency is medium', async(() => {
      // Arrange
      component.contract = new ContractViewModel('333333333');
      component.contract.paygBand = PrePaymentBalanceTopUpUrgency.Medium;
      component.contract.prepaidCharges = 12;

      // Act
      component.ngOnInit();

      // Assert
      expect(component.paygView).toBe(PaygView.LowBalance);
    }));

    it('should set the payg viewmodel balance to high as default', async(() => {
      // Arrange
      component.contract = new ContractViewModel('333333333');
      component.contract.prepaidCharges = 12;

      // Act
      component.ngOnInit();

      // Assert
      expect(component.paygView).toBe(PaygView.HighBalance);
    }));

    it('should set the prepaidCredit to CR when the prepaid charges are credit for product swap customers', async(() => {
      // Arrange
      component.contract = new ContractViewModel('333333333');
      component.contract.prepaidCharges = 47.33;
      component.contract.prepaidCredit = true;

      // Act
      component.ngOnInit();

      // Assert
      expect(component.prepaidCredit).toBe('CR');
    }));
});
