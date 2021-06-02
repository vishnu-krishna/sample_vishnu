import { StoreBankFormComponent } from '../../../../myAccount/forms/storeBankAccountForm/storeBankForm.component';
import { StoreCreditCardFormComponent } from '../../../../myAccount/forms/storeCreditCardForm/storeCreditCardForm.component';

import { ElementRef, Input, OnInit } from '@angular/core';
import { PaymentArrangementType } from '../../../../myAccount/common/enums';
import { ModalService } from '../../../../myAccount/modal/modal.service';
import { MyWalletViewModel } from '../../../../myAccount/pages/settings/myWallet/myWallet.service';
import { IMyWalletService } from '../../../../myAccount/pages/settings/myWallet/myWallet.service.interface';
import { DeleteSmsPayComponent } from '../../../../myAccount/pages/settings/smspay/deleteSmsPay/deleteSmsPay.component';
import { IAccountServiceMA } from '../../../../myAccount/services/account.service';
import { IPaymentMethodsService } from '../../../../myAccount/services/settings/paymentMethods.service.interface';
import { SetUpPaymentArrangementResultMessage } from '../../../messages/setUpPaymentArrangementResultMessage';
import { IMessageBusService } from '../../../service/contract/imessageBus.service';
import { AddPaymentMethodComponent } from '../../paymentMethods/addPaymentMethod.component';
import { PaymentArrangementSettingsViewModel } from '../paymentArrangement.settings.service';
import { IPaymentArrangementSettingsService } from '../paymentArrangement.settings.service.interface';
import { DeleteDirectDebitComponent } from './../../../../myAccount/pages/settings/directDebit/deleteDirectDebit/deleteDirectDebit.component';
import { AlertMessages } from './../../../messages/alertMessages';
import { IPaymentArrangementStateService } from './../paymentArrangementState.service';

const DirectDebitText: string = 'Direct Debit';
const SmsPayText: string = 'SMS Pay';

export abstract class PaymentArrangementButtonComponent implements OnInit {
    @Input() public isSingleView: boolean;
    @Input() public contractAccountNum: string;
    @Input() public hasDirectDebit: boolean;
    @Input() public hasSmsPay: boolean;
    @Input() public storedPaymentMethods: MyWalletViewModel[];
    @Input() public paymentMethodId: string;
    @Input() public paymentMethodType: PaymentArrangementSettingsViewModel;
    @Input() public isMultiAccount: boolean;

    public isShowOption: boolean = false;
    public chosenPaymentMethodId: string = '';
    public validPaymentMethods: MyWalletViewModel[];
    public hasValidPaymentMethods: boolean;
    public setUpButtonText: string;
    public hasPaypalSetUp: boolean = false;
    public confirmTitle: string;
    public confirmMessage: string;
    public cancelButtonText: string;
    public okButtonText: string;
    public isCheckBox: boolean = false;
    public typeText: string;

    constructor(
        public eRef: ElementRef,
        public modalService: ModalService,
        public paymentMethodService: IPaymentMethodsService,
        public alertMessage: AlertMessages,
        public messageBusService: IMessageBusService,
        public myWalletService: IMyWalletService,
        public accountService: IAccountServiceMA,
        public paymentArrangementService: IPaymentArrangementSettingsService,
        public setUpPaymentArrangementResultMessage: SetUpPaymentArrangementResultMessage,
        public type: PaymentArrangementType,
        public stateService: IPaymentArrangementStateService
    ) {}

    public ngOnInit() {
        this.typeText = this.type === PaymentArrangementType.DirectDebit ? DirectDebitText : SmsPayText;

        this.setUpButtonText = `Set up ${this.typeText}`;
        this.validPaymentMethods = this.myWalletService.getValidPaymentMethods(this.storedPaymentMethods);
        this.hasValidPaymentMethods = !!this.validPaymentMethods.length;
        if (this.paymentMethodType &&
            this.paymentMethodType.paymentArrangementPaymentMethodModel &&
            this.paymentMethodType.paymentArrangementPaymentMethodModel.paymentType === 'paypal') {
            this.setUpButtonText = 'change payment method';
            this.hasPaypalSetUp = true;
        }
    }

    public addPaymentMethod(contractAccountNumber: string, isSwitchPaymentArrangement: boolean = false) {
        let title: string = `Set up new ${this.typeText}`;

        if (this.hasDirectDebit || this.hasSmsPay) {
            title += ` payment method`;
        }

        this.modalService.activate({
            title,
            cancelText: '',
            okText: '',
            modalType: 'component',
            component: AddPaymentMethodComponent,
            fullScreen: true,
            componentData: {
                loadedFromDirectDebitSettings: true,
                isDirectDebit: this.type === PaymentArrangementType.DirectDebit,
                isSmsPay: this.type === PaymentArrangementType.SmsPay,
                contractAccountNumber: Number(contractAccountNumber),
                isSwitchPaymentArrangement: isSwitchPaymentArrangement
            }
        }).then((confirmed) => {
            this.alertMessage.successBody = `Your ${this.typeText} is now set up`;
            this.messageBusService.broadcast(this.alertMessage);
        });
    }

    public switchPaymentMethod(paymentArrangementPaymentMethod: MyWalletViewModel) {

        const paymentMethod = this.storedPaymentMethods.filter((pm) => {
            return pm.id === paymentArrangementPaymentMethod.id;
        });

        const paymentMethodRef = `${paymentMethod[0].title} xxxx${paymentMethod[0].shortReference}`;
        const isNewPaymentMethodCreditCard = paymentMethod[0].isCreditCard;

        if ((this.hasDirectDebit && this.type === PaymentArrangementType.DirectDebit) ||
            (this.hasSmsPay && this.type === PaymentArrangementType.SmsPay)) {

            let modalComponent: any;
            let componentData;
            let title = ' ';
            let fullScreen = false;

            switch (this.type) {
                case PaymentArrangementType.DirectDebit : {
                    modalComponent = DeleteDirectDebitComponent;
                    componentData = {
                        isMultiAccount: this.isMultiAccount,
                        paymentArrangementSettingsViewModel: this.paymentMethodType,
                        paymentArrangementPaymentMethodId: paymentArrangementPaymentMethod.id,
                        contractAccountNo: Number(this.contractAccountNum),
                        isSwitchingPaymentArrangements: true,
                        paymentMethodReference: paymentMethodRef,
                        isNewPaymentMethodCreditCard : isNewPaymentMethodCreditCard
                    };

                    break;
                }
                case PaymentArrangementType.SmsPay : {
                    modalComponent = DeleteSmsPayComponent,
                    componentData = {
                        isMultiAccount: this.isMultiAccount,
                        paymentArrangementSettingsViewModel: this.paymentMethodType,
                        paymentArrangementPaymentMethodId: paymentArrangementPaymentMethod.id,
                        contractAccountNo: Number(this.contractAccountNum),
                        isSwitchingPaymentArrangements: true,
                        paymentMethodReference: paymentMethodRef,
                        isNewPaymentMethodCreditCard : isNewPaymentMethodCreditCard
                    };
                    break;
                }
                default: {
                    modalComponent = null;
                    break;
                }
            }

            this.modalService.activate({
                title,
                cancelText: '',
                okText: '',
                modalType: 'component',
                component: modalComponent,
                componentData,
                fullScreen
            });

        } else {
            let modal;
            let termsAndConditionsHref;
            if (this.type === PaymentArrangementType.DirectDebit) {
                termsAndConditionsHref = 'https://www.agl.com.au/residential/help-and-support/billing-and-payments/bill-payment-options/direct-debit-terms-and-conditions';

                modal = this.modalService.activate({
                    title: `One last thing before we set up ${paymentMethodRef} ${this.typeText}`,
                    cancelText: 'no thanks',
                    okText: 'set up',
                    modalType: 'normal',
                    fullScreen: false,
                    showCheckboxConfirmation: true,
                    message: `I confirm that I have read and agree to the <a class='modal-link' href=${termsAndConditionsHref} target='_blank'>${this.typeText} terms and conditions</a>.`
                });
            } else if (this.type === PaymentArrangementType.SmsPay) {
                termsAndConditionsHref = 'http://www.agl.com.au/smspayterms';

                const modalComponent = paymentArrangementPaymentMethod.isBankAccount ? StoreBankFormComponent : StoreCreditCardFormComponent;

                const componentData = {
                    returnToPreviousPage: false,
                    isSwitchingPaymentArrangements: false,
                    data: {
                        isSmsPay: true,
                        contractAccountNumber: Number(this.contractAccountNum),
                        paymentArrangementPaymentMethodId: paymentArrangementPaymentMethod.id,
                        paymentMethodReference: paymentMethodRef
                    }
                };

                modal = this.modalService.activate({
                    title: `Set up new ${this.typeText}`,
                    cancelText: '',
                    okText: '',
                    modalType: 'component',
                    component: modalComponent,
                    componentData,
                    fullScreen: true
                });
            }
            modal.then((success) => {
                if (success) {
                    const contractAccountNumber = Number(this.contractAccountNum);
                    this.setUpPaymentArrangementResultMessage = new SetUpPaymentArrangementResultMessage();
                    this.setUpPaymentArrangementResultMessage.contractAccountNumber = contractAccountNumber;
                    this.setUpPaymentArrangementResultMessage.isSwitchPaymentArrangement = false;
                    this.stateService.isUpdatingPaymentArrangement = true;
                    this.stateService.updateStarted(this.contractAccountNum);
                    this.paymentMethodService.attachPaymentArrangementToPaymentMethod(paymentArrangementPaymentMethod.id, contractAccountNumber, this.type)
                        .finally(() => this.stateService.updateCompleted(this.contractAccountNum))
                        .subscribe(
                            (data) => {
                                this.messageBusService.broadcast(this.setUpPaymentArrangementResultMessage);
                            },
                            (error) => {
                                console.error(`Error within the add ${this.typeText} method`, error);
                                this.setUpPaymentArrangementResultMessage.message = 'error';
                                this.messageBusService.broadcast(this.setUpPaymentArrangementResultMessage);
                            }
                        );
                }
            });
        }
    }

    public hasAnyPaymentArrangements(): boolean {
        return this.hasDirectDebit || this.hasSmsPay;
    }

    public toggleOption() {
        this.isShowOption = !this.isShowOption;
    }

    public hideOption(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.isShowOption = false;
        }
    }

    public hasSavedPaymentMethodInWallet(): boolean {
        return this.storedPaymentMethods && !!this.storedPaymentMethods.length;
    }
}
