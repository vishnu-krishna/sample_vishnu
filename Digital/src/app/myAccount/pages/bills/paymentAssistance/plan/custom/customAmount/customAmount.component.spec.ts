import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { PaymentAssistancePlanCustomAmountComponent } from './customAmount.component';
import { DebugElement } from '@angular/core';
import { PaymentAssistancePlanCustomAmountModule } from './customAmount.module';
import { By } from '@angular/platform-browser';

const amountInputSelector = '.payment-assistance-plan-custom-amount__amount-input';
describe('Payment Assistance Plan Custom Amount Component', () => {

    let comp: PaymentAssistancePlanCustomAmountComponent;
    let fixture: ComponentFixture<PaymentAssistancePlanCustomAmountComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PaymentAssistancePlanCustomAmountModule]
        });

        fixture = TestBed.createComponent(PaymentAssistancePlanCustomAmountComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            comp.ngOnInit();
        });

        describe('when initialiseForm() is called', () => {
            it('should populate customPageForm property', () => {
                expect(comp.customPageForm).toBeDefined();
            });
        });

        describe('when setDollarSignVisible() is called', () => {
            it('should call amountHasDollarSign to false', () => {
                expect(comp.amountHasDollarSign).toBeFalsy();
            });
        });
    });

    describe('onAmountFocus()', () => {
        beforeEach(() => {
            comp.onAmountFocus();
        });
        it('should set amountHasDollarSign to true', () => {
            expect(comp.amountHasDollarSign).toBeTruthy();
        });

        it('should set amountErrorMessage to empty string', () => {
            expect(comp.amountErrorMessage).toBe('');
        });
    });

    describe('onAmountBlur', () => {
        it('should mark input touched', () => {
            // act
            fixture.detectChanges();
            const amountInput = de.query(By.css(amountInputSelector));
            amountInput.triggerEventHandler('blur', null);

            // assert
            expect(comp.customPageForm.get('amount').touched).toBe(true);
        });
    });

    describe('onKeyUpEnter', () => {
        beforeEach(() => {
            comp.ngOnInit();
            fixture.detectChanges();
        });

        it('should mark input touched', () => {
            // arrange
            const amountInput = de.query(By.css(amountInputSelector));

            // act
            amountInput.triggerEventHandler('keyup.enter', null);

            // assert
            expect(comp.customPageForm.get('amount').touched).toBe(true);
        });

        it('should call formValid.emit()', () => {
            // arrange
            const amountInput = de.query(By.css(amountInputSelector));
            spyOn(comp.formValid, 'emit');

            // act
            amountInput.triggerEventHandler('keyup.enter', null);

            // assert
            expect(comp.formValid.emit).toHaveBeenCalled();
        });

    });

    describe('Value change', () => {
        describe('when value changes', () => {
            it('call validations and handler', fakeAsync(() => {
                // arrange
                comp.customAmountModel.toValidate = true;
                spyOn(comp, 'invalidCharacterValidator').and.returnValue(null);
                spyOn(comp, 'amountValidationHandler').and.returnValue(null);
                const minAmountValidatorSpy = spyOn(comp, 'minAmountValidator').and.returnValue(null);
                const maxAmountValidatorSpy = spyOn(comp, 'maxAmountValidator').and.returnValue(null);

                fixture.detectChanges();
                minAmountValidatorSpy.calls.reset();
                maxAmountValidatorSpy.calls.reset();

                // // act
                let control = comp.customPageForm.get('amount');
                control.markAsTouched();
                control.setValue('abc');
                fixture.detectChanges();

                // Handle debounce on the input control
                tick(300);

                // assert
                expect(comp.invalidCharacterValidator).toHaveBeenCalledWith(control);
                expect(comp.amountValidationHandler).toHaveBeenCalledWith(control);
                expect(comp.minAmountValidator).toHaveBeenCalledWith(control);
                expect(comp.maxAmountValidator).toHaveBeenCalledWith(control);
            }));
        });

        describe('when invalid character entered', () => {
            it('should return invalid character validation error', () => {
                // arrange
                const value = 'abc';

                // Casting to any so we do not need to provide a complete Control object.
                const control: any = { value: value };

                // act
                const validationErrors = comp.invalidCharacterValidator(control);

                // assert
                expect(validationErrors['amount']).toBe(value);
            });

            it('should set invalid character error message', () => {
                // arrange
                const invalidCharacterErrorMessage = `One or more of the characters you've entered are invalid. You may only enter numeric characters and decimals ('.').`;
                const control: any = { touched: true, errors: { amount: '' } };

                // act
                comp.amountValidationHandler(control);

                // assert
                expect(comp.amountErrorMessage).toBe(invalidCharacterErrorMessage);
            });
        });

        describe('when amount is less than min amount', () => {
            beforeEach(() => {
                const minAmount = 40;
                comp.customAmountModel.instalmentMinAmount = minAmount;
            });
            it('should return min amount validation error', () => {
                // arrange
                const value = '30';
                const control: any = { value: value };

                // act
                const validationErrors = comp.minAmountValidator(control);

                // assert
                expect(validationErrors['minAmount']).toBe(value);
            });

            it('should set min amount error message (per fortnight)', () => {
                // arrange
                const minAmountErrorMessage = 'In order to pay this bill before your next bill on Invalid date, you need to pay a minimum of $40.00 per fortnight.';
                const control: any = { touched: true, errors: { minAmount: '' }, value: '11.11' };

                // act
                comp.amountValidationHandler(control);

                // assert
                expect(comp.amountErrorMessage).toBe(minAmountErrorMessage);
            });

            describe('when value is an integer', () => {
                it('should pad 2 decimal digits', () => {
                    // arrange
                    const control: any = { touched: true, errors: { minAmount: '' }, value: '11', patchValue: (value) => { return; } };
                    spyOn(control, 'patchValue').and.returnValue(null);

                    // act
                    comp.amountValidationHandler(control);

                    // assert
                    expect(control.patchValue).toHaveBeenCalledWith('11.00');
                });
            });
        });

        describe('when amount is greater than max amount', () => {
            const maxAmount = 40;
            const minAmount = 10;
            beforeEach(() => {
                comp.customAmountModel.instalmentMaxAmount = maxAmount;
                comp.customAmountModel.instalmentMinAmount = minAmount;
            });
            it('should return min amount validation error', () => {
                // arrange
                const value = '50';
                const control: any = { value: value };

                // act
                const validationErrors = comp.maxAmountValidator(control);

                // assert
                expect(validationErrors['maxAmount']).toBe(value);
            });

            it('should set max amount error message', () => {
                // arrange
                const maxAmountErrorMessage = `In order to set up an instalment plan online the maximum instalment amount you can enter is $${maxAmount}.00.`;
                const control: any = { touched: true, errors: { maxAmount: '' }, value: '11.11' };

                // act
                comp.amountValidationHandler(control);

                // assert
                expect(comp.amountErrorMessage).toBe(maxAmountErrorMessage);
            });
        });
    });
});
