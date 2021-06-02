/* tslint:disable:no-access-missing-member */
import { OnInit } from '@angular/core';
import { PaymentArrangementType } from '../../../../myAccount/common/enums';
import { IModalComponent } from '../../../../myAccount/modal/modal-loader.directive';
import { ModalService } from '../../../../myAccount/modal/modal.service';
import { IPaymentMethodsService } from '../../../../myAccount/services/settings/paymentMethods.service.interface';
import { AccountDetailComponentModel } from '../../../../myAccount/settings/accountDetail/accountDetail.component';
import { DeletePaymentArrangementResultMessage } from '../../../messages/deletePaymentArrangementResult.message';
import { SwitchPaymentArrangementResultMessage } from '../../../messages/switchPaymentArrangementResult.message';
import { PaymentArrangementPaymentMethodModel } from '../../../model/domain/paymentArrangement/paymentArrangementData.model';
import { IMessageBusService } from '../../../service/contract/imessageBus.service';
import { PaymentArrangementSettingsViewModel } from '../paymentArrangement.settings.service';
import { IPaymentArrangementStateService } from '../paymentArrangementState.service';

export abstract class DeleteOrSwitchPaymentArrangementComponent implements OnInit, IModalComponent {
    public args: any;
    public abstract title: string;
    public abstract  description: string;
    public abstract deleteButtonText: string;
    public abstract keepButtonText: string;
    public paymentArrangementSettingsViewModel: PaymentArrangementSettingsViewModel;
    public accountDetailModel: AccountDetailComponentModel;
    public paymentArrangementPaymentMethodModel: PaymentArrangementPaymentMethodModel;
    public isMultiAccount: boolean;
    public elecIcons: number[];
    public gasIcons: number[];
    public isLoading: boolean;
    public isSwitchPaymentMethod: boolean = false;
    public paymentMethodReference: string;
    public contractAccountNo: number;
    public paymentArrangementPaymentMethodId: string;
    public showMessage: boolean = false;

    constructor(public modalService: ModalService,
                public paymentMethodService: IPaymentMethodsService,
                public messageBusService: IMessageBusService,
                public deletePaymentArrangementResult: DeletePaymentArrangementResultMessage,
                public switchPaymentArrangementResult: SwitchPaymentArrangementResultMessage,
                public stateService: IPaymentArrangementStateService
            ) {
    }

    public ngOnInit() {
        this.paymentArrangementSettingsViewModel = this.args.paymentArrangementSettingsViewModel;
        this.accountDetailModel = this.paymentArrangementSettingsViewModel.accountDetailModel;
        this.paymentArrangementPaymentMethodModel = this.paymentArrangementSettingsViewModel.paymentArrangementPaymentMethodModel;
        this.elecIcons = new Array<number>(this.accountDetailModel.numberOfElectricityIcons).fill(1);
        this.gasIcons = new Array<number>(this.accountDetailModel.numberOfGasIcons).fill(1);
        this.getMessage();
    }

    public abstract getMessage();

    public removePaymentArrangement(paymentArrangementType: PaymentArrangementType) {
        this.isLoading = true;
        let paymentMethodId = this.paymentArrangementSettingsViewModel.paymentArrangementPaymentMethodModel.id;
        let contractAccountNumber = Number(this.accountDetailModel.contractAccountNumber);
        this.stateService.isUpdatingPaymentArrangement = true;
        this.stateService.updateStarted(this.accountDetailModel.contractAccountNumber);
        this.paymentMethodService.removePaymentArrangementFromPaymentMethod(paymentMethodId, contractAccountNumber, paymentArrangementType)
            .finally(() => this.stateService.updateCompleted(this.accountDetailModel.contractAccountNumber))
            .subscribe(
                (data) => {
                    this.deletePaymentArrangementResult.isSuccessful = true;
                    this.deletePaymentArrangementResult.contractAccountNumber = contractAccountNumber;
                    this.messageBusService.broadcast(this.deletePaymentArrangementResult);
                    this.modalService.close();

                },
                (error) => {
                    console.error('Error within the remove payment arrangement method', error);
                    this.deletePaymentArrangementResult.isSuccessful = false;
                    this.deletePaymentArrangementResult.contractAccountNumber = contractAccountNumber;
                    this.messageBusService.broadcast(this.deletePaymentArrangementResult);
                    this.modalService.close();
                }
            );
    }

    public changePaymentMethod(paymentArrangementType: PaymentArrangementType) {
        this.isLoading = true;

        this.stateService.isUpdatingPaymentArrangement = true;
        this.stateService.updateStarted(this.accountDetailModel.contractAccountNumber);
        this.switchPaymentArrangementResult = new SwitchPaymentArrangementResultMessage();

        this.paymentMethodService.attachPaymentArrangementToPaymentMethod(this.paymentArrangementPaymentMethodId, this.contractAccountNo, paymentArrangementType)
            .finally(() => this.stateService.updateCompleted(this.accountDetailModel.contractAccountNumber))
            .subscribe(
            (data) => {
                this.switchPaymentArrangementResult.contractAccountNumber = this.contractAccountNo;
                this.switchPaymentArrangementResult.isSwitchPaymentArrangement = true;
                this.messageBusService.broadcast(this.switchPaymentArrangementResult);
                this.modalService.close();
            },
            (error) => {
                console.error('Error within the change payment method', error);
                this.switchPaymentArrangementResult.message = 'error';
                this.switchPaymentArrangementResult.contractAccountNumber = this.contractAccountNo;
                this.messageBusService.broadcast(this.switchPaymentArrangementResult);
                this.modalService.close();
            }
            );
    }

    public closeModal() {
        this.modalService.close();
    }

    public isAccountWithMultiAddresses(): boolean {
        return this.accountDetailModel.supplyAddresses.length > 1;
    }
}
