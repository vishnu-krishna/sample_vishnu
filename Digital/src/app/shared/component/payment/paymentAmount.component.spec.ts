import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MyAccountMaterialModule } from '../../../myAccount/modules/my-account.material.module';
import { PrePaymentBalanceTopUpUrgency } from '../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { PaymentContentModel } from '../../model/payment/paymentContent.model';
import { PaymentDetails } from '../../model/payment/paymentDetails.model';
import { IMessageBusService } from '../../service/contract/imessageBus.service';
import { AlertComponent } from '../alert/alert.component';
import { PaymentAmountComponent } from './paymentAmount.component';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { PaymentMethodName } from '../../globals/paygConstants';
import { PaymentAmountView } from '../../globals/paygConstants';
import { BonusBand } from '../../model/payment/bonusBand.model';
import { BonusEligible } from '../../model/payment/bonusEligible.model';
import { ApiService } from '../../service/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockMessageBusService {
    public name: string = 'MockMessageBusService';
}

describe('PaymentAmountComponent Component', () => {

    let component: PaymentAmountComponent;
    let fixture: ComponentFixture<PaymentAmountComponent>;
    let de: DebugElement;
    let content: PaymentContentModel = new PaymentContentModel();
    let bonusBands: BonusBand[] = getBonusBandData();
    let apiService: any;
    let bonusEligible: BonusEligible;
    let apiServiceStub = {
        getBonusEligible(contractNumber: string, paymentAmount: number): Observable<BonusEligible> {
            return Observable.of(bonusEligible);
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PaymentAmountComponent,
                AlertComponent
            ],
            providers: [
                { provide: IMessageBusService, useClass: MockMessageBusService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: ApiService, useValue: apiServiceStub }
            ],
            imports: [
                ReactiveFormsModule,
                HttpModule,
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ]
        });

        fixture = TestBed.createComponent(PaymentAmountComponent);
        apiService = fixture.debugElement.injector.get(ApiService);
        component = fixture.componentInstance;
        component.content = content;
    });

    describe('Payment Amount Tests', () => {
        describe('Payment Amount Initialisation', () => {
            it('should initialise correctly',
                () => {
                    let paymentDetails: PaymentDetails = new PaymentDetails();
                    paymentDetails.isPayg = false;
                    paymentDetails.amount = '20';

                    component.paymentDetails = paymentDetails;
                    fixture.detectChanges();

                    expect(component).toBeDefined();
                    expect(component.form).toBeDefined();
                }
            );
            it('should have a bonus band error when no bonus bands',
                () => {

                    let paymentDetails: PaymentDetails = new PaymentDetails();
                    paymentDetails.isPayg = true;
                    paymentDetails.amount = '20';

                    component.bonusBands = [];

                    component.paymentDetails = paymentDetails;
                    fixture.detectChanges();

                    expect(component.hasBonusBandError).toBeTruthy();
                }
            );
            it('should display the correct bonus band exception message - bonus band not available. ',
                () => {

                    let paymentDetails: PaymentDetails = new PaymentDetails();
                    paymentDetails.isPayg = true;
                    paymentDetails.amount = '20';
                    paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.Low;
                    component.prepaidBalanceUnavailable = false;

                    component.bonusBands = [];

                    component.paymentDetails = paymentDetails;
                    component.isBonusBandException = false;
                    component.getBonusUnavailableContent();
                    fixture.detectChanges();
                    expect(component.showBonusError).toBeTruthy();
                    expect(component.getBonusUnavailableContent).toMatch(`Top up as usual and we'll make sure any bonus you are eligible for is added to your account`);

                }
            );
            it('should display the correct bonus calculation exception message - bonus calculation. ',
                () => {

                    let paymentDetails: PaymentDetails = new PaymentDetails();
                    paymentDetails.isPayg = true;
                    paymentDetails.amount = '20';
                    paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.Low;
                    component.prepaidBalanceUnavailable = false;
                    component.paymentDetails = paymentDetails;
                    component.isBonusBandException = true;
                    component.bonusBands = bonusBands;
                    component.getBonusUnavailableContent();
                    fixture.detectChanges();
                    expect(component.getBonusUnavailableContent).toMatch(`Top up now and we'll make sure any bonus you are eligible for is added to your account`);

                }
            );
            it('should not have a bonus band error when there are bonus bands',
                () => {

                    let paymentDetails: PaymentDetails = new PaymentDetails();
                    paymentDetails.isPayg = true;
                    paymentDetails.amount = '20';

                    component.bonusBands = bonusBands;

                    component.paymentDetails = paymentDetails;
                    fixture.detectChanges();

                    expect(component.hasBonusBandError).toBeFalsy();
                }
            );
            it('should have sorted bonus bands when PAYG balance urgency is high',
                () => {

                    let paymentDetails: PaymentDetails = new PaymentDetails();
                    paymentDetails.isPayg = true;
                    paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.High;
                    paymentDetails.amount = '20';

                    component.bonusBands = bonusBands;
                    component.paymentDetails = paymentDetails;
                    fixture.detectChanges();

                    expect(component.bonusBandsSorted[0].bonus = 65).toBeTruthy();
                    expect(component.bonusBandsSorted[1].bonus = 35).toBeTruthy();
                    expect(component.bonusBandsSorted[2].bonus = 25).toBeTruthy();
                    expect(component.bonusBandsSorted[3].bonus = 15).toBeTruthy();
                    expect(component.bonusBandsSorted[4].bonus = 5).toBeTruthy();
                }
            );

        });

        describe('Payment Amount Validation', () => {
            it('Should return null when no selected method',
                () => {
                    let control = {
                        value: 30
                    };
                    expect(component.validateAmount(control)).toBeNull();
                }
            );
            it('Should be invalid when credit card amount is less than 10',
                () => {
                    component.selectedMethod = PaymentMethodName.CreditCard;
                    let control = {
                        value: 5
                    };
                    expect(component.validateAmount(control).validateAmount.valid).toBeFalsy();
                }
            );
            it('Should be invalid when credit card amount is greater than 100,000',
                () => {
                    component.selectedMethod = PaymentMethodName.CreditCard;
                    let control = {
                        value: 1000000
                    };
                    expect(component.validateAmount(control).validateAmount.valid).toBeFalsy();
                }
            );
            it('Should be valid when credit card amount is greater than 10 and less than 100,000',
                () => {
                    component.selectedMethod = PaymentMethodName.CreditCard;
                    let control = {
                        value: 100
                    };
                    expect(component.validateAmount(control)).toBeNull();
                }
            );
            it('Should be invalid when paypal amount is less than 10',
                () => {
                    component.selectedMethod = PaymentMethodName.PayPal;
                    let control = {
                        value: 5
                    };
                    expect(component.validateAmount(control).validateAmount.valid).toBeFalsy();
                }
            );
            it('Should be invalid when paypal amount is greater than 10,000',
                () => {
                    component.selectedMethod = PaymentMethodName.PayPal;
                    let control = {
                        value: 10001
                    };
                    expect(component.validateAmount(control).validateAmount.valid).toBeFalsy();
                }
            );
            it('Should be valid when paypal amount is greater than 10 and less than 10,000',
                () => {
                    component.selectedMethod = PaymentMethodName.PayPal;
                    let control = {
                        value: 100
                    };
                    expect(component.validateAmount(control)).toBeNull();
                }
            );
        });

        describe('Payment Amount Entry', () => {
            it('Should set correct decimal value when amount is null',
                () => {
                    let event = { target: { value: '' } };
                    component.onBlurNumberTwoDecimalInput(event);
                    expect(event.target.value).toBe('0.00');
                    expect(component.showBonusTopUp).toBeFalsy();
                }
            );
            it('Should set correct decimal value when amount is 0',
                () => {
                    let event = { target: { value: '0' } };
                    component.onBlurNumberTwoDecimalInput(event);
                    expect(event.target.value).toBe('0.00');
                    expect(component.showBonusTopUp).toBeFalsy();
                }
            );
            it('Should set correct decimal value when amount is greater than 0',
                () => {
                    let event = { target: { value: '21' } };
                    component.onBlurNumberTwoDecimalInput(event);
                    expect(event.target.value).toBe('21.00');
                    expect(component.showBonusTopUp).toBeFalsy();
                }
            );
            it('Should set correct decimal value when amount contains cents',
                () => {
                    let event = { target: { value: '31.24' } };
                    component.onBlurNumberTwoDecimalInput(event);
                    expect(event.target.value).toBe('31.24');
                    expect(component.showBonusTopUp).toBeFalsy();
                }
            );
            it('Should not show bonus top up when it is payg free text and no bonus bands',
                () => {
                    let event = { target: { value: '5' } };
                    component.currentView = PaymentAmountView.PAYGFreeText;
                    component.onBlurNumberTwoDecimalInput(event);
                    expect(component.showBonusTopUp).toBeFalsy();
                }
            );
            it('Should not show bonus top up when it is payg free text and amount is less than 5',
                () => {
                    let event = { target: { value: '5' } };
                    component.bonusBands = bonusBands;
                    component.currentView = PaymentAmountView.PAYGFreeText;
                    component.onBlurNumberTwoDecimalInput(event);
                    expect(component.showBonusTopUp).toBeFalsy();
                }
            );
            it('Should show correct top up amounts when it is payg free text and amount is greater than 10',
                () => {
                    let event = { target: { value: '15' } };
                    component.bonusBands = bonusBands;
                    component.currentView = PaymentAmountView.PAYGFreeText;
                    component.onBlurNumberTwoDecimalInput(event);

                    expect(component.showBonusTopUp).toBeTruthy();
                    expect(component.bonusMessageHasBeenDisplayed).toBeTruthy();
                    expect(component.topUpAmount).toBe('50');
                    expect(component.addBonusAmount).toBe(5);
                }
            );
            it('Should not show bonus if already been displayed and amount is greater than 10',
                () => {
                    let event = { target: { value: '15' } };
                    component.bonusBands = bonusBands;
                    component.currentView = PaymentAmountView.PAYGFreeText;
                    component.bonusMessageHasBeenDisplayed = true;
                    component.onBlurNumberTwoDecimalInput(event);

                    expect(component.showBonusTopUp).toBeFalsy();
                    expect(component.topUpAmount).toBe('');
                    expect(component.addBonusAmount).toBe(0);
                }
            );

            it('Should set bonus amount to be 0 when empty',
                () => {
                    let event = { target: { value: '' } };
                    component.currentView = PaymentAmountView.PAYGFreeText;
                    component.onKeyup(event);

                    expect(component.bonus).toBe('0');
                }
            );
        });

        describe('Component test', () => {
            describe('Product Swap Customer with Outstanding balance', () => {
                beforeEach(() => {
                    component.currentView = PaymentAmountView.PAYGFreeText;
                    component.paymentDetails = new PaymentDetails();
                    component.paymentDetails.showOutstandingBillPayg = true;
                    component.paymentDetails.outstandingBill = 23;
                    fixture.detectChanges();
                    de = fixture.debugElement;
                });
                it('should show payment amount description', () => {
                    const element = de.query(By.css('.payment-amount__description')).nativeElement;
                    expect(element.innerHTML).toContain('Pay the $23 owing from your old plan PLUS your first top-up amount.');
                });
                it('should hide bonus top up description', () => {
                    const element = de.query(By.css('.payment-amount__addbonus show'));
                    expect(element).toBeNull();
                });
                it('should show bonus outstanding message', () => {
                    const element = de.query(By.css('.payment-amount__bonus__outstanding')).nativeElement;
                    expect(element.innerHTML).toContain('Payments may take up to 2 business days to appear on your account balance. Bonus credit shown above won’t reflect any pending payments.');
                });
                it('should show bonus list', () => {
                    const element = de.query(By.css('.payment-amount__bonus-list'));
                    expect(element).toBeDefined();
                });
            });
        });
    });

    function getBonusBandData() {
        return [{
            bonus: 0.00,
            lowerBand: 0,
            upperBand: 49.99
        },
        {
            bonus: 5.00,
            lowerBand: 50,
            upperBand: 79.99
        }, {
            bonus: 15.00,
            lowerBand: 80,
            upperBand: 119.99
        }, {
            bonus: 25.00,
            lowerBand: 120.00,
            upperBand: 149.99
        }, {
            bonus: 35.00,
            lowerBand: 150.00,
            upperBand: 249.99
        }, {
            bonus: 65.00,
            lowerBand: 250.00,
            upperBand: 999999999
        }];

    }

});
