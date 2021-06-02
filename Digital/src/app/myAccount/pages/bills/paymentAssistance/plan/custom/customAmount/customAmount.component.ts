import { Component, Output, EventEmitter, Input, ViewChildren, OnInit } from '@angular/core';
import { PaymentAssistancePlanCustomAmountModel } from './models';
import { FormGroup, AbstractControl, ValidationErrors, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AglCurrencyPipe } from '../../../../../../pipes/aglCurrency.pipe';
import { AglValidators } from '../../../../../../../shared/validators/aglValidators';
import { timer } from 'rxjs/observable/timer';
import * as moment from 'moment';

@Component({
    selector: 'agl-payment-assistance-plan-custom-amount',
    templateUrl: './customAmount.component.html',
    styleUrls: ['./customAmount.component.scss']
})
export class PaymentAssistancePlanCustomAmountComponent implements OnInit {
    public amountHasDollarSign = false;
    public amountErrorMessage = '';
    public customPageForm: FormGroup;

    @ViewChildren('amount') amountInput;

    @Input() customAmountModel: PaymentAssistancePlanCustomAmountModel = {
        frequency: 'Fortnightly',
        amount: 0,
        amountInput: '',
        placeholder: '',
        instalmentMinAmount: 0,
        instalmentMaxAmount: 0,
        disabled: false,
        currentBillEndDate: null,
        toValidate: true
    };

    @Output() formValid = new EventEmitter<{isFormValid: boolean, amount: number}>();
    @Output() keyUpEnter = new EventEmitter<void>();

    constructor(
        private formBuilder: FormBuilder
    ) {}

    public ngOnInit() {
        this.initialiseForm();
        this.setDollarSignVisible(false);
    }

    public onAmountFocus = (): void => {
        this.customAmountModel.toValidate = false;
        this.setDollarSignVisible(true);
        this.amountErrorMessage = '';
    }

    public onAmountBlur = (): void => {
        const shouldShowDollarSign = this.customAmountModel.amountInput.length > 0;
        this.setDollarSignVisible(shouldShowDollarSign);
        this.validateAmount();
        const isFormValid = this.isFormValid();
        this.formValid.emit({ isFormValid: isFormValid, amount: this.getAmountValue() });

    }

    public onKeyUpEnter = (): void => {
        this.validateAmount();
        const isFormValid = this.isFormValid();
        this.formValid.emit({ isFormValid: isFormValid, amount: this.getAmountValue() });
        if (isFormValid) {
            this.keyUpEnter.emit();
        }
    }

    // the function is for trimming extra decimals and remove the last "."
    // for example, 1.99999 => 1.99, 1. => 1
    public getFormattedValueForComparison = (value: any): Number => {
        const formattedValue = AglValidators.trimLastDot(value).match(/^(0|([1-9]\d*))($|\.(\d{2}|\d{1}))/)[0];

        return Number(formattedValue);
    }

    public amountValidationHandler = (control: AbstractControl): void => {
        const currentBillEndDateFormatted = moment(this.customAmountModel.currentBillEndDate).startOf('day').format('DD MMM YYYY');
        const frequencyNoun = this.extractNounFromFrequencyAdjective(this.customAmountModel.frequency);
        const minAmountErrorMessage = `In order to pay this bill before your next bill on ${currentBillEndDateFormatted}, you need to pay a minimum of ${new AglCurrencyPipe().transform(this.customAmountModel.instalmentMinAmount)} per ${frequencyNoun}.`;
        const maxAmountErrorMessage = `In order to set up an instalment plan online the maximum instalment amount you can enter is ${new AglCurrencyPipe().transform(this.customAmountModel.instalmentMaxAmount)}.`;
        const validationMessageLookup = {
            amount: `One or more of the characters you've entered are invalid. You may only enter numeric characters and decimals ('.').`,
            minAmount: minAmountErrorMessage,
            maxAmount: maxAmountErrorMessage
        };

        if ((control.touched || control.dirty)) {
            let formatAmount = true;

            if (control.errors) {
                const firstError = Object.keys(control.errors)[0]; // just show the 1st error
                this.amountErrorMessage = validationMessageLookup[firstError];
                if (firstError === 'amount') {
                    formatAmount = false;
                }
            } else {
                if (AglValidators.isNullOrEmpty(control.value)) {
                    this.setDollarSignVisible(false);
                    this.formValid.emit({ isFormValid: false, amount: null });
                } else {
                    this.formValid.emit({ isFormValid: true, amount: this.getAmountValue() });
                }
                this.amountErrorMessage = '';
            }

            if (formatAmount && !AglValidators.isNullOrEmpty(control.value)) {
                // format decimal places of the value
                const formattedValue = this.getFormattedValueForComparison(control.value).toFixed(2);
                if (formattedValue !== control.value) {
                    control.patchValue(formattedValue);
                }
            }
        }
    }

    public invalidCharacterValidator = (control: AbstractControl): ValidationErrors => {
        let value = AglValidators.removeLeadingOrTrailingSpace(control.value || '');

        return AglValidators.isDecimalValid(AglValidators.trimLastDot(value)) ? null : {
            amount: control.value
        };
    }

    public minAmountValidator = (control: AbstractControl): ValidationErrors => {
        // we treat invalid characters as valid, so it delegates invalid character validation to amount validator
        if (AglValidators.isNullOrEmpty(control.value) || !AglValidators.isDecimalValid(control.value)) {
            return null;
        }

        const formattedValue = this.getFormattedValueForComparison(control.value);
        return (formattedValue < this.customAmountModel.instalmentMinAmount) ? {
            minAmount: control.value
        } : null;
    }

    public maxAmountValidator = (control: AbstractControl): ValidationErrors => {
        // we treat invalid characters as valid, so it delegates invalid character validation to amount validator
        if (AglValidators.isNullOrEmpty(control.value) || !AglValidators.isDecimalValid(control.value)) {
            return null;
        }

        const formattedValue = this.getFormattedValueForComparison(control.value);
        return (formattedValue > this.customAmountModel.instalmentMaxAmount) ? {
            maxAmount: control.value
        } : null;
    }

    private initialiseForm = (): void => {
        this.customPageForm = this.formBuilder.group({
            amount: new FormControl({ value: null, disabled: this.customAmountModel.disabled }, Validators.compose([
                this.invalidCharacterValidator,
                this.minAmountValidator.bind(this),
                this.maxAmountValidator.bind(this)
            ]))
        });

        const control = this.customPageForm.get('amount');

        control.valueChanges
        .filter(() => this.customAmountModel.toValidate)
        // changing start date/frequency and onblur function both trigger validation. changing start date/frequency sets value to "", we want to validate when value set has finished.
        .debounce(() => timer(200))
        .subscribe((val) => {
            this.blurAmountInputIfValueBlank(val);
            this.amountValidationHandler.call(this, control);
            this.customAmountModel.toValidate = false;
        });
    }

    private isFormValid = (): boolean => {
        return this.customPageForm.valid;
    }

    private setDollarSignVisible = (isDollarSign: boolean): void => {
        this.amountHasDollarSign = isDollarSign;
    }

    private validateAmount = (): void => {
        this.customAmountModel.toValidate = true;
        let control = this.customPageForm.get('amount');
        control.markAsTouched();
        control.updateValueAndValidity();
    }

    private blurAmountInputIfValueBlank = (value: any) => {
        if (value.length === 0) {
            this.amountInput.first.nativeElement.blur();
        }
    }

    private getAmountValue(): number {
        const amountValueAsString = this.customPageForm.controls['amount'].value;
        const amount = Number.parseFloat(amountValueAsString);
        return Number.isNaN(amount) ? null : amount;
    }

    private extractNounFromFrequencyAdjective = (text: string) => text.slice(0, -2).toLowerCase();
}
