import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentArrangementType } from '../../../myAccount/common/enums';
import { PaymentArrangementContent } from '../../model/domain/paymentArrangement/paymentArrangementContent.model';
import { PaymentValidators } from '../../validators/paymentValidators';

@Component({
    selector: 'agl-bankaccount',
    templateUrl: './paymentMethods.bankAccount.component.html',
    styleUrls: ['./paymentMethods.bankAccount.component.scss']
})

export class PaymentMethodsBankAccountComponent implements OnInit {
    @Output() public onCancel = new EventEmitter();
    @Output() public onSave = new EventEmitter<BankAccountFields>();
    @Input() public content: PaymentArrangementContent;
    @Input() public isDirectDebit;
    @Input() public isSmsPay;
    @Input() public isSwitchingPaymentArrangements: boolean = false;

    public bankAccountForm: FormGroup;
    public isSaving: boolean = false;
    public paymentArrangementType: PaymentArrangementType;

    constructor(
        private _router: Router,
        private formBuilder: FormBuilder,
        private _validators: PaymentValidators) {
    }

    public ngOnInit() {
        if (this.isDirectDebit) {
            this.paymentArrangementType = PaymentArrangementType.DirectDebit;
        } else if (this.isSmsPay) {
            this.paymentArrangementType = PaymentArrangementType.SmsPay;
        } else {
            this.paymentArrangementType = null;
        }

        this.bankAccountForm = this.formBuilder.group({
            accountHolderName: ['', Validators.required],
            bsb: ['', [Validators.required, this._validators.validateBsb]],
            accountNumber: ['', Validators.required],
            terms: [null, [Validators.required, Validators.pattern('true')]]
        });
    }

    public saveBankAccount() {
        if (this.bankAccountForm.valid) {
            this.isSaving = true;
            let bankAccountFields = new BankAccountFields();
            bankAccountFields.paymentArrangementType = this.paymentArrangementType;
            bankAccountFields.accountHolderName = this.bankAccountForm.get('accountHolderName').value;
            bankAccountFields.bsb = this.bankAccountForm.get('bsb').value;
            bankAccountFields.accountName = this.bankAccountForm.get('accountNumber').value;
            this.onSave.emit(bankAccountFields);
        } else {
            this.bankAccountForm.get('accountHolderName').markAsTouched();
            this.bankAccountForm.get('bsb').markAsTouched();
            this.bankAccountForm.get('terms').markAsTouched();
            this.bankAccountForm.get('accountNumber').markAsTouched();
        }
    }

    public cancelPayment() {
        this.onCancel.emit();
    }
    public handleSapError(errorField: string) {
        switch (errorField) {
            case 'bsb':
                this.bankAccountForm.get('bsb').markAsTouched();
                this.bankAccountForm.get('bsb').errors['validateBsb'] = false;
                return true;
            default:
                return false;
        }
    }
}

export class BankAccountFields {
    public accountHolderName: string = '';
    public bsb: string = '';
    public accountName: string = '';
    public paymentArrangementType?: PaymentArrangementType;
}
