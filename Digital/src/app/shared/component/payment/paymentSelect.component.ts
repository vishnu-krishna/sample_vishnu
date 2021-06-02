import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { FeatureFlagService, FeatureFlagTypes } from '../../../myAccount/services/featureFlag.service';
import { Bank } from '../../../myAccount/services/settings/model/bank';
import { CreatePaymentMethodRequest } from '../../../myAccount/services/settings/model/createPaymentMethodRequest';
import { PaymentMethod } from '../../../myAccount/services/settings/model/paymentMethod';
import { IPaymentMethodsService } from '../../../myAccount/services/settings/paymentMethods.service.interface';
import { PaymentRequest } from '../../../myAccount/services/storedPaymentsApi/model/paymentRequest';
import { BankAccountFields } from '../../../shared/component/payment/paymentMethods/bankAccount/payment.bankAccount.component';
import { PrePaymentBalanceTopUpUrgency } from '../../../shared/globals/prePaymentBalanceTopUpUrgency';
import { PaymentMethods, PaymentView } from '../../globals/paygConstants';
import { PaymentAmountView, PaymentMethodName } from '../../globals/paygConstants';
import { PaymentSuccessMessage } from '../../messages/paymentSuccess.message';
import { ReceiptDetail } from '../../model/domain/receiptDetail.model';
import { BonusBand } from '../../model/payment/bonusBand.model';
import { PaymentContentModel } from '../../model/payment/paymentContent.model';
import { PaymentDetails } from '../../model/payment/paymentDetails.model';
import { ApiService, ContactDetailModel } from '../../service/api.service';
import { ContentService } from '../../service/content.service';
import { IMessageBusService } from '../../service/contract/imessageBus.service';
import { DataLayerService } from '../../service/dataLayer.service';
import { PaymentAmountComponent } from './paymentAmount.component';
import { PaymentBankAccountComponent } from './paymentMethods/bankAccount/payment.bankAccount.component';
import { PaymentCreditCardComponent } from './paymentMethods/creditCard/payment.creditCard.component';
import { PaymentPaypalComponent } from './paymentMethods/paypal/payment.paypal.component';

@Component({
    selector: 'agl-payment-select',
    templateUrl: './paymentSelect.component.html',
    styleUrls: ['./paymentSelect.component.scss']
})
export class PaymentSelectComponent implements OnInit, AfterViewChecked {
    @Input() public paymentDetails: PaymentDetails;
    @Input() public bonusBands: BonusBand[];
    @Input() public isDirectDebit: boolean;
    @Input() public isSmsPay: boolean;

    @ViewChild('paymentAmount') public paymentAmountView: PaymentAmountComponent;
    @ViewChild('creditCardView') public creditCardView: PaymentCreditCardComponent;
    @ViewChild('paypalView') public paypalView: PaymentPaypalComponent;
    @ViewChild('bankAccountView') public bankAccountView: PaymentBankAccountComponent;

    public content: PaymentContentModel;
    public paymentMethods: Array<{ name: string, value: string }> = [
        { name: 'Credit or debit card', value: PaymentMethodName.CreditCard },
        { name: 'Bank Account', value: PaymentMethodName.BankAccount },
        { name: 'PayPal', value: PaymentMethodName.PayPal }
    ];
    public selectedMethod: string = '';
    public PaymentMethod = PaymentMethodName;
    public paymentAmount: number;
    public bonusAmount: number;
    public isPAYGBonusSelect: boolean = false;
    public hideStoredMethods: boolean = false;
    public hideStoredCheckBox: boolean = false;
    public validPaymentAmount;
    public newPaymentMethod: boolean = false;
    public isMyWalletEnabled: Boolean = false;
    public storedMethodActive: Boolean = false;
    public paymentsLoaded: Boolean = false;
    public multiBPChecked: boolean = false;
    public bankAccount = new Bank();
    public todaysDate;

    constructor(
        private contentService: ContentService,
        private featureFlagService: FeatureFlagService,
        private apiService: ApiService,
        private cdRef: ChangeDetectorRef,
        private paymentMethodService: IPaymentMethodsService,
        private api: ApiService,
        private messageBusService: IMessageBusService,
        private _dataLayer: DataLayerService) {
    }

    public ngOnInit() {
        this.todaysDate = moment().format('MMMM Do YYYY');

        this.featureFlagService.featureFlagged(FeatureFlagTypes.myWalletEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.isMyWalletEnabled = featureIsEnabled;
            }
        );

        this.featureFlagService.featureFlagged(FeatureFlagTypes.newCreditCardPaymentEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.newPaymentMethod = featureIsEnabled;
            }
        );

        this.contentService.getContent().subscribe((result) => {
            if (result.selfService !== undefined &&
                result.selfService.payment !== undefined) {
                this.content = result.selfService.payment;
            }
        });

        if (this.paymentDetails.paygBand === PrePaymentBalanceTopUpUrgency.High || this.paymentDetails.paygBand === PrePaymentBalanceTopUpUrgency.Unavailable) {
            this.paymentAmountView.currentView = PaymentAmountView.PAYGDebit;
        }
    }

    // triggered when amount text box is validated
    public onUpdateAmount(value: { amount: number; valid: boolean }) {
        setTimeout(() => {
            if (this.creditCardView) {
                this.creditCardView.paymentAmount = value.amount;
                this.creditCardView.amountValid = value.valid;
                this.creditCardView.bonusAmount = parseInt(this.paymentAmountView.bonus, 0);
            } else if (this.paypalView) {
                this.paypalView.paymentAmount = value.amount;
                this.paypalView.amountValid = value.valid;
                this.paypalView.bonusAmount = parseInt(this.paymentAmountView.bonus, 0);
            } else if (this.bankAccountView) {
                this.bankAccountView.paymentAmount = value.amount;
                this.bankAccountView.amountValid = value.valid;
                this.bankAccountView.bonusAmount = parseInt(this.paymentAmountView.bonus, 0);
            }
            this.validPaymentAmount = { amount: value.amount, valid: value.valid };
        }, 0);
    }

    // triggered when the user selects a payg set amount from the bonus select page
    public onSelectPAYGAmount(amount: number) {
        this.isPAYGBonusSelect = amount > 0;
        if (this.paymentAmountView) {
            if (amount === -1) {
                this.paymentAmountView.currentView = PaymentAmountView.PAYGFreeText;
            } else {
                this.paymentAmountView.currentView = PaymentAmountView.PAYGBonusSelect;
                this.paymentAmountView.setAmount(amount);
                this.onUpdateAmount({ amount: amount, valid: true });
                this.paymentAmount = amount;
            }
        }
    }

    // Gets triggered when the user selects a payment method from one of the buttons
    public selectMethod(value: string) {
        this.selectedMethod = value;
        this.paymentAmountView.selectedMethod = value;

        if (this.selectedMethod === null) {
            this.hideStoredMethods = false;
        } else if (this.selectedMethod !== 'Stored') {
            this.hideStoredMethods = true;
        }

        if (this.paymentAmountView.currentView === PaymentAmountView.PAYGBonusSelect) {
            // payg bonus is displayed instead of the textbox
            this.onUpdateAmount({ amount: this.paymentAmount, valid: true });
        } else {
            // textbox is displayed
            this.paymentAmountView.form.controls['amount'].updateValueAndValidity();
        }
    }

    /**
     * Common method for a selected stored payment method
     * Couldn't reuse the other component due to being limited to a singular list (non-dynamic).
     * @param {any} event
     *
     * @memberOf PaymentSelectComponent
     */
    public selectedStoredMethod(event) {
        let storedMethod = 'Stored';
        this.paymentAmountView.selectedMethod = storedMethod;

        if (this.paymentAmountView.currentView === PaymentAmountView.PAYGBonusSelect) {
            // payg bonus is displayed instead of the textbox
            this.onUpdateAmount({ amount: this.paymentAmount, valid: true });
        } else {
            // textbox is displayed
            this.paymentAmountView.form.controls['amount'].updateValueAndValidity();
        }
        this.bonusAmount = parseInt(this.paymentAmountView.bonus, 0);
    }

    public selectedStoredMethodActive(event) {
        if (!event) {
            this.paymentAmountView.selectedMethod = null;
            this.paymentAmountView.form.controls['amount'].updateValueAndValidity();
        }

        this.storedMethodActive = event;
    }

    public selectedStoredMethodLoaded(event) {
        this.paymentsLoaded = event;

        this.apiService.getContactDetail().finally(() => this.multiBPChecked = true).subscribe(
            (data: ContactDetailModel) => {
                if (data.hasMultipleBusinessPartners) {
                    this.hideStoredCheckBox = true;
                    this.paymentMethods =  [
                        { name: 'Credit or debit card', value: PaymentMethodName.CreditCard },
                        { name: 'PayPal', value: PaymentMethodName.PayPal }
                    ];
                }
            },
            (err) => {
                console.error('ERROR: apiService.getContactDetail()', err);
            }
        );
    }

    public get showOneOffPaymentMethods() {
        return !(this.isMyWalletEnabled) || (!this.storedMethodActive && this.paymentsLoaded);
    }

    public get showStoredPaymentMethods() {
        return this.isMyWalletEnabled === true && !this.hideStoredMethods;
    }

    public saveAndPayBankAccount(event: BankAccountFields) {
        if (this.bankAccountView.amountValid) {
            let newBankAccountRequest = new CreatePaymentMethodRequest();
            this.bankAccount.accountHolderName = event.accountHolderName;
            this.bankAccount.accountNumber = event.accountNumber;
            this.bankAccount.bsb = event.bsb;
            newBankAccountRequest.bank = this.bankAccount;
            this.paymentMethodService.createPaymentMethod(newBankAccountRequest).subscribe(
                (data) => {
                    this.getPaymentMethods();
                },
                (error) => {
                    this.bankAccountView.errorMakingPayment = true;
                    this.bankAccountView.isSaving = false;
                    this._dataLayer.pushPaymentError('Payment outcome – Account Failure', 'Error within save and make payment Account', PaymentMethodName.SavedMethod, []);
                    console.error('Error within saveAndPayBankAccount', error);
                }
            );
        } else {
            // Stop the button from spinning
            this.bankAccountView.isSaving = false;
        }
    }

    public ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    private getPaymentMethods() {
        this.paymentMethodService.getPaymentMethods().subscribe(
            (paymentMethods) => {
                paymentMethods.map((pm: PaymentMethod) => {
                    if (pm.bank) {
                        // Lets sanatise the number portions first so they always match even if
                        // we get crazy responses for BSB's like 12-12-12 instead of 123-456
                        // We get only the last 4 digits of the account number in the returned data
                        // so lets handle that too.
                        const methodAccountNumber = pm.bank.accountNumber.replace(/\D+/g, '').substr(-4);
                        const enteredAccountNumber = this.bankAccount.accountNumber.replace(/\D+/g, '').substr(-4);
                        const methodBSB = pm.bank.bsb.replace(/\D+/g, '');
                        const enteredBSB = this.bankAccount.bsb.replace(/\D+/g, '');
                        const matchAccountNumber = (methodAccountNumber === enteredAccountNumber);
                        const matchBSB = (methodBSB === enteredBSB);
                        const matchName = (pm.bank.accountHolderName === this.bankAccount.accountHolderName);

                        if (matchAccountNumber && matchBSB && matchName) {
                            this.makeBankPayment(pm.id);
                        }
                    }
                });
            },
            (error) => {
                this.bankAccountView.errorMakingPayment = true;
                this.bankAccountView.isSaving = false;
                console.error('Error within getPaymentMethods', error);
            }
        );
    }

    private makeBankPayment(id: string) {
        let amount = Number(this.validPaymentAmount.amount);
        let paymentRequest = new PaymentRequest();
        paymentRequest.amount = amount;
        paymentRequest.contractNumber = Number(this.paymentDetails.contractNumber);

        this.api.storedPaymentApiGeneratePayment(`/paymentMethods/${id}/payments`, paymentRequest)
            .subscribe((value: any) => {
                let receiptDetail = new ReceiptDetail();
                receiptDetail.paymentMethod = PaymentMethods.BankAccount;
                receiptDetail.paymentAmount = amount;
                receiptDetail.paymentDate = this.todaysDate;
                receiptDetail.receiptNumber = value.transactionReference;
                receiptDetail.bonusAmount = parseInt(this.paymentAmountView.bonus, 0);
                let paymentSuccessMessage = new PaymentSuccessMessage(receiptDetail, PaymentView.PaymentSuccess);
                this.messageBusService.broadcast(paymentSuccessMessage);
            },
            (error) => {
                this.bankAccountView.isSaving = false;
                this.bankAccountView.errorMakingPayment = true;
                this._dataLayer.pushPaymentError('Payment outcome – Account Failure', 'Error in make payment stored account', PaymentMethodName.SavedMethod, []);
                console.error('Error in makeBankPayment StoredPaymentApiGeneratePayment', error);
            });
    }
}
