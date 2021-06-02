import { Component, Input, OnInit } from '@angular/core';
import { IModalComponent } from '../../../../app/myAccount/modal/modal-loader.directive';
import { ModalService } from '../../../myAccount/modal/modal.service';
import { FeatureFlagService, FeatureFlagTypes } from '../../../myAccount/services/featureFlag.service';

@Component({
    selector: 'agl-add-payment-method',
    templateUrl: './addPaymentMethod.component.html',
    styleUrls: ['./addPaymentMethod.component.scss']
})
export class AddPaymentMethodComponent implements OnInit, IModalComponent {
    @Input() public isDirectDebit: boolean;
    @Input() public isSmsPay: boolean;
    public args;
    public isShowPaymentMethods: boolean = true;
    public isShowCreditCard: boolean = false;
    public isShowBank: boolean = false;
    public isShowPaypal: boolean = false;
    public buttonTxtBank: string;
    public buttonTxtCC: string;
    public buttonTxtPaypal: string;
    public buttonTxtCCMobile: string;
    public enablePayPal: boolean;
    public enableBankAccount: boolean;

    constructor(
        private featureFlagService: FeatureFlagService,
        private modalService: ModalService,
    ) {}

    public ngOnInit() {
        this.buttonTxtCC = 'ADD CARD';
        this.buttonTxtBank = 'ADD BANK ACCOUNT';
        this.buttonTxtCCMobile = 'CREDIT OR DEBIT CARD';
        if (this.isDirectDebit) {
            this.buttonTxtBank = 'USE BANK ACCOUNT';
            this.buttonTxtCC = 'USE CARD';
            this.buttonTxtPaypal = 'USE PAYPAL';
            this.buttonTxtCCMobile = 'USE CREDIT OR DEBIT CARD';
        }

        this.featureFlagService.featureFlagged(FeatureFlagTypes.payPalDirectDebitEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.enablePayPal = featureIsEnabled;
            }
        );

        this.featureFlagService.featureFlagged(FeatureFlagTypes.bankAccountPaymentEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.enableBankAccount = featureIsEnabled;
            }
        );
    }

    public addCreditCard() {
        this.isShowPaymentMethods = false;
        this.isShowCreditCard = true;
    }

    public addBank() {
        this.isShowPaymentMethods = false;
        this.isShowBank = true;
    }

    public addPaypal() {
        this.isShowPaymentMethods = false;
        this.isShowPaypal = true;
    }

    public hideCreditCard() {
        this.isShowPaymentMethods = true;
        this.isShowCreditCard = false;
    }

    public hideBank() {
        this.isShowPaymentMethods = true;
        this.isShowBank = false;
    }

    public hidePaypal() {
        this.isShowPaymentMethods = true;
        this.isShowPaypal = false;
    }

    public canUseBankAccount(): boolean {
        // Bank account for direct debit is always allowed
        if (this.isDirectDebit || this.isSmsPay) {
            return true;
        }
        // If not Direct Debit (AKA Make a payment) then we refer to the feature flag
        return this.enableBankAccount;
    }

    public closeModal() {
        this.modalService.close();
    }
}
