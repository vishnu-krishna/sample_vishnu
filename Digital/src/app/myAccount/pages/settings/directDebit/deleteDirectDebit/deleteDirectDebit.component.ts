/* tslint:disable:no-access-missing-member */
import { Component, OnInit } from '@angular/core';
import { AccountDetailComponentModel } from '../../../../../myAccount/settings/accountDetail/accountDetail.component';
import { DeleteOrSwitchPaymentArrangementComponent } from '../../../../../shared/component/paymentArrangement/deleteOrSwitchPaymentArrangement/deleteOrSwitchPaymentArrangement.component';
import { PaymentArrangementSettingsViewModel } from '../../../../../shared/component/paymentArrangement/paymentArrangement.settings.service';
import { IPaymentArrangementStateService } from '../../../../../shared/component/paymentArrangement/paymentArrangementState.service';
import { DeletePaymentArrangementResultMessage } from '../../../../../shared/messages/deletePaymentArrangementResult.message';
import { SwitchPaymentArrangementResultMessage } from '../../../../../shared/messages/switchPaymentArrangementResult.message';
import { PaymentArrangementPaymentMethodModel } from '../../../../../shared/model/domain/paymentArrangement/paymentArrangementData.model';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { PaymentArrangementType } from '../../../../common/enums';
import { IModalComponent } from '../../../../modal/modal-loader.directive';
import { ModalService } from '../../../../modal/modal.service';
import { IPaymentMethodsService } from '../../../../services/settings/paymentMethods.service.interface';

@Component({
    selector: 'agl-delete-direct-debit',
    templateUrl: './deleteDirectDebit.component.html',
    styleUrls: ['./deleteDirectDebit.component.scss']

})
export class DeleteDirectDebitComponent extends DeleteOrSwitchPaymentArrangementComponent implements OnInit, IModalComponent {
    public args: any;
    public title: string = `Are you sure you'd like to cancel Direct Debit`;
    public description: string = `Your payment method will still be stored in My Wallet.`;
    public deleteButtonText: string = 'Cancel Direct Debit';
    public keepButtonText: string = 'Keep Direct Debit';
    public paymentArrangementSettingsViewModel: PaymentArrangementSettingsViewModel;
    public accountDetailModel: AccountDetailComponentModel;
    public paymentArrangementPaymentMethodModel: PaymentArrangementPaymentMethodModel;
    public isMultiAccount: boolean;
    public elecIcons: number[];
    public gasIcons: number[];
    public isLoading: boolean;
    public isSwitchingPaymentArrangements: boolean = false;
    public paymentMethodReference: string;
    public contractAccountNo: number;
    public paymentArrangementPaymentMethodId: string;
    public showMessage: boolean = false;
    public PaymentArrangementType: typeof PaymentArrangementType = PaymentArrangementType;
    public paymentMethodTypeString: string;
    public isNewPaymentMethodCreditCard: boolean = false;

    constructor(public modalService: ModalService,
                public paymentMethodService: IPaymentMethodsService,
                public messageBusService: IMessageBusService,
                public deletePaymentArrangementResult: DeletePaymentArrangementResultMessage,
                public switchPaymentArrangementResult: SwitchPaymentArrangementResultMessage,
                public stateService: IPaymentArrangementStateService
            ) {
                super(modalService, paymentMethodService, messageBusService, deletePaymentArrangementResult, switchPaymentArrangementResult, stateService
                );
    }

    public ngOnInit() {
        super.ngOnInit();
    }

    public getMessage() {
        this.paymentMethodTypeString = this.paymentArrangementPaymentMethodModel.paymentType === 'creditcard' ? 'Credit Card' : 'Bank Account';
        let shortReference = this.paymentArrangementPaymentMethodModel.reference.slice(-4);
        if (this.isSwitchingPaymentArrangements) {
            this.title = `Are you sure you'd like to change your payment method for Direct Debit`;
            this.description = `We'll continue to store your existing payment method, ${this.paymentMethodTypeString} ending in ${shortReference}, in My Wallet. You can access My Wallet anytime to remove it.`;
            this.keepButtonText = 'keep payment method';
            this.deleteButtonText = 'change payment method';
            this.isSwitchPaymentMethod =  true;
            this.showMessage = false;
            if (this.paymentArrangementPaymentMethodModel.paymentMethodType === 'PayPal') {
                this.description = `Your ${this.paymentArrangementPaymentMethodModel.reference} PayPal account will be removed. If you want to use PayPal in the future, it's easy to set it up again.`;
                this.keepButtonText = 'keep paypal';
            }
            this.title = this.isMultiAccount ? this.title + ' for this address:' : this.title + '?';
        } else {
            this.showMessage = true;
            if (this.paymentArrangementPaymentMethodModel.paymentMethodType === 'PayPal') {
                this.title = `Are you sure you want to cancel your Direct Debit for ${this.paymentArrangementPaymentMethodModel.reference} PayPal account`;
                this.description = `Your ${this.paymentArrangementPaymentMethodModel.reference} PayPal account will be removed. If you want to use PayPal in the future, it's easy to set it up again.`;
                this.deleteButtonText = 'Remove paypal and direct debit';
                this.keepButtonText = 'keep paypal and direct debit';
            } else {
                this.description = `We'll continue to store your existing payment method, ${this.paymentMethodTypeString} ending in ${shortReference}, in My Wallet. You can access My Wallet anytime to remove it.`;
            }
            this.title = this.isMultiAccount ? this.title + ' for this address?' : this.title + '?';
        }
    }

    public removeOrSwitchPaymentArrangement() {
        if (this.isSwitchingPaymentArrangements) {
            this.changePaymentMethod(PaymentArrangementType.DirectDebit);
        } else {
            this.removePaymentArrangement(PaymentArrangementType.DirectDebit);
        }
    }
}
