import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentArrangementType } from '../../../../../myAccount/common/enums';
import { ContentService } from '../../../../../shared/service/content.service';
import { PaymentArrangementContent } from '../../../../model/domain/paymentArrangement/paymentArrangementContent.model';
import { PaymentDetails } from '../../../../model/payment/paymentDetails.model';
import { ApiService, ContactDetailModel } from '../../../../service/api.service';
import { PaymentValidators } from '../../../../validators/paymentValidators';
import { IPaymentArrangementStateService } from '../../../paymentArrangement/paymentArrangementState.service';

@Component({
    selector: 'agl-payment-bankaccount',
    templateUrl: './payment.bankAccount.component.html',
    styleUrls: ['./payment.bankAccount.component.scss']
})
export class PaymentBankAccountComponent implements OnInit {
    @Input() public paymentDetails: PaymentDetails;
    @Input() public saveOnly;
    @Input() public myWalletSettings: boolean = false;
    @Input() public directDebitSettings: boolean = false;
    @Input() public isDirectDebit: boolean;
    @Input() public isSmsPay: boolean;
    @Input() public isSwitchingPaymentArrangements: boolean = false;
    @Input() public paymentMethodReference?: string;
    @Output() public onSave = new EventEmitter<BankAccountFields>();

    public content: PaymentArrangementContent;
    public bankAccountForm: FormGroup;
    public isSaving: boolean = false;
    public errorMakingPayment: boolean = false;
    public amountValid;
    public paymentAmount: number;
    public bonusAmount: number;
    public buttonWording: string = 'Make payment';
    public paymentArrangementType: PaymentArrangementType;
    // To access enum in HTML template
    public PaymentArrangementType = PaymentArrangementType;
    public paymentArrangementString: string;
    public paymentSafetyMessage: string;
    public termsConditionsText: string;
    public termsConditionLink: string;
    public mobileNumber: string;

    constructor(
        private _router: Router,
        private formBuilder: FormBuilder,
        private _validators: PaymentValidators,
        private _contentService: ContentService,
        private _apiService: ApiService,
        public stateService: IPaymentArrangementStateService,
    ) { }

    public ngOnInit() {
        if (this.isDirectDebit) {
            this.paymentArrangementType = PaymentArrangementType.DirectDebit;
            this.paymentArrangementString = 'Direct Debit';
        } else if (this.isSmsPay) {
            this.paymentArrangementType = PaymentArrangementType.SmsPay;
            this.paymentArrangementString = 'SMS Pay';
        } else {
            this.paymentArrangementType = null; // PaymentArrangementType is set to null when Bank account is added through my wallet
        }
        this._contentService.getContent().subscribe(
            (result) => {
                if (result.selfService !== undefined &&
                    result.selfService.directDebit !== undefined) {
                    this.content = result.selfService.directDebit;

                    // Change for my wallet
                    if (this.saveOnly) {
                        this.buttonWording = 'Save';
                    }

                    // Change for my direct debit settings entry point
                    if (this.directDebitSettings) {
                        this.buttonWording = 'Set up';
                    }
                }
            }
        );

        this._apiService.getContactDetail().subscribe(
            (data: ContactDetailModel) => {
                if (data && data.businessPartners) {
                    this.mobileNumber = data.businessPartners[0].mobile;
                }
            },
            (err) => {
                console.error('ERROR: apiService.getContactDetail()', err);
            }
        );

        if (this.isSmsPay && this.paymentMethodReference) {
            this.bankAccountForm = this.formBuilder.group({
                acceptanceCheckbox: [null, [Validators.required, Validators.pattern('true')]]
            });
        } else {
            this.bankAccountForm = this.formBuilder.group({
                accountHolderName: ['', Validators.required],
                bsb: ['', [Validators.required, this._validators.validateBsb]],
                accountNumber: ['', Validators.required],
                acceptanceCheckbox: [null, [Validators.required, Validators.pattern('true')]]
            });
        }

        if (!this.directDebitSettings) {
            this.bankAccountForm.get('acceptanceCheckbox').setValue(true);
        }
        this.setMessagesBasedOnPaymentType();
    }

    public setMessagesBasedOnPaymentType() {
        this.paymentSafetyMessage = `Setting up Direct Debit will automatically save your bank account into My Wallet.`;
        this.termsConditionsText = `Direct Debit terms and Conditions`;
        this.termsConditionLink = `https://www.agl.com.au/residential/help-and-support/billing-and-payments/bill-payment-options/direct-debit-terms-and-conditions`;
        if (this.isSmsPay) {
            this.paymentSafetyMessage = `New payment methods you set up here will be saved into My Wallet.`;
            this.termsConditionsText = 'SMS Pay terms and conditions';
            this.termsConditionLink = `https://www.agl.com.au/smspayterms`;
        }
    }

    public saveBankAccount() {

        if (this.isSmsPay && this.paymentMethodReference) {
            this.onSave.emit();
            this.isSaving = true;
            return;
        }

        if (this.bankAccountForm.valid) {
            this.isSaving = true;
            let bankAccountFields = new BankAccountFields();
            bankAccountFields.accountHolderName = this.bankAccountForm.get('accountHolderName').value;
            bankAccountFields.bsb = this.bankAccountForm.get('bsb').value;
            bankAccountFields.accountNumber = this.bankAccountForm.get('accountNumber').value;
            bankAccountFields.paymentArrangementType = this.paymentArrangementType;
            this.onSave.emit(bankAccountFields);
        } else {
            this.bankAccountForm.get('accountHolderName').markAsTouched();
            this.bankAccountForm.get('bsb').markAsTouched();
            this.bankAccountForm.get('terms').markAsTouched();
            this.bankAccountForm.get('accountNumber').markAsTouched();
        }
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

    public showSmsPayDisclaimer(): boolean {
        return this.paymentArrangementType === PaymentArrangementType.SmsPay && this.stateService.hasSmsPaySetup;
    }
}

export class BankAccountFields {
    public accountHolderName: string = '';
    public bsb: string = '';
    public accountNumber: string = '';
    public acceptanceCheckbox;
    public paymentArrangementType?: PaymentArrangementType;
}
