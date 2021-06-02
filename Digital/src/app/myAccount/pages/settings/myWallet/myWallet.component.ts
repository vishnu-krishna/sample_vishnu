import { Component, OnInit            } from '@angular/core';
import { Router                       } from '@angular/router';
import { IPaymentMethodsService       } from '../../../../myAccount/services/settings/paymentMethods.service.interface';
import { PaymentMethodName } from './../../../../shared/globals/paygConstants';

import { ModalService                 } from '../../../../myAccount/modal/modal.service';

import { IAccountServiceMA } from '../../../../myAccount/services/account.service';
import { AddPaymentMethodComponent    } from '../../../../shared/component/paymentMethods/addPaymentMethod.component';
import { AddBankAccountResultMessage  } from '../../../../shared/messages/addBankAccountResult.message';
import { AddCreditCardResultMessage   } from '../../../../shared/messages/addCreditCardResult.message';
import { DeleteCreditCardResult       } from '../../../../shared/messages/deleteCreditCardResult.message';
import { DeletePaymentMethodLinkPaymentArrangementResult } from '../../../../shared/messages/deletePaymentMethodLinkPaymentArrangementResult.message';
import { ApiService, ContactDetailModel } from '../../../../shared/service/api.service';
import { IMessageBusService           } from '../../../../shared/service/contract/imessageBus.service';
import {
    LocalAlertDismissablesModel,
    LocalStorageService
} from '../../../services/localStorage.service';
import { DeletePaymentMethodComponent } from './deletePaymentMethod/deletePaymentMethod.component';
import { ExpirationState, MyWalletService, MyWalletViewModel } from './myWallet.service';

import { DataLayerService } from '../../../../shared/service/dataLayer.service';

@Component({
    selector: 'agl-my-wallet',
    templateUrl: './myWallet.component.html',
    styleUrls: ['./myWallet.component.scss']

})
export class MyWalletComponent implements OnInit {
    public checked = false;
    public paymentMethods: MyWalletViewModel[];
    public getContactDetailsReady: boolean = false;
    public ready: boolean = false;
    public showWarning = true;
    public showContactUs: boolean;
    public hasPendingPayment: boolean = false;

    // For Add/Delete alert component:
    public containsLinks: boolean;
    public showAlertMessage: boolean;
    public alertMessageType: string;
    public alertMessageHeading: string;
    public alertMessageBody: string;
    public deletePaymentMethodSuccess: boolean;
    public deletePaymentMethodError: boolean;
    public deletePaymentMethodLinkDirectDebitError: boolean;
    public savePaymentMethodSuccess: boolean;
    public savePaymentMethodError: boolean;
    public ExpirationState: typeof ExpirationState = ExpirationState;

    constructor(
        private paymentMethodsService: IPaymentMethodsService,
        private modalService: ModalService,
        private router: Router,
        private messageBusService: IMessageBusService,
        private myWalletService: MyWalletService,
        private accountService: IAccountServiceMA,
        private apiService: ApiService,
        private localStorageService: LocalStorageService,
        private _dataLayer: DataLayerService
    ) { }

    public ngOnInit() {
        this.ready = false;
        this.router
            .routerState
            .root
            .queryParams
            .subscribe((params) => {
                let options: any = params;
                // Mock operation
                if (options.addCard === 'true') {
                    this.addNewCard();
                }
            });

        this.apiService.getContactDetail().subscribe(
            (data: ContactDetailModel) => {
                this.getContactDetailsReady = true;
                this.showContactUs = data.hasMultipleBusinessPartners;
                if (!data.hasMultipleBusinessPartners) {
                    this.renderPaymentMethods();
                    this.setPendingPaymentMessage();
                    this.messageBusListener();
                }
            },
            (err) => {
                console.error('ERROR: apiService.getContactDetail()', err);
                this.showContactUs = true;
                this.getContactDetailsReady = true;
            }
        );

        let storageKeys = this.localStorageService.getKeys();

        if (storageKeys) {
            if (storageKeys.localAlertDismissables.myWalletPaymentMethodWarning !== undefined) {
                this.showWarning = false;
            } else {
                this.showWarning = true;
            }
        }
    }

    public renderPaymentMethods() {
        this.myWalletService.getStoredPaymentMethods().subscribe(
            (paymentMethods) => {
                this.paymentMethods = paymentMethods;
                this.ready = true;
            },
            (error) => {
                console.error('An error occurred retrieving payment methods from the PaymentMethods service.', error);
            }
        );
    }

    public deletePaymentMethod(id: string) {
        let pmToDelete = this.paymentMethods.find((pm) => pm.id === id);
        let isLinkedToDirectDebit = !!pmToDelete.directDebitContractAccounts.length;
        let isLinkedToSmsPay = !!pmToDelete.oneTouchPayContractAccounts.length;
        let modalMessage;
        if (pmToDelete.isBankAccount && this.hasPendingPayment) {
            modalMessage = `Are you sure you want to remove your ${pmToDelete.title} ${pmToDelete.reference} from My Wallet? <br>
                            This ${pmToDelete.paymentMethodType} will no longer be available for online payments. <br><br>
                            If you made a payment using this bank account within the last two business days, removing it may result in your payment failing to process.`;
        } else {
            modalMessage = `Are you sure you want to remove your ${pmToDelete.title} ${pmToDelete.reference} from My Wallet? <br>
                            This ${pmToDelete.paymentMethodType} will no longer be available for online payments.`;
        }

        if (isLinkedToDirectDebit || isLinkedToSmsPay) {
            this.modalService.activate({
                title: ' ',
                cancelText: '',
                okText: '',
                modalType: 'component',
                component: DeletePaymentMethodComponent,
                componentData: pmToDelete,
                fullScreen: false
            });
        } else {
            this.modalService.activate({
                title: 'Delete this payment method?',
                message: modalMessage,
                cancelText: 'Keep',
                okText: 'Remove',
                modalType: 'normal',
                fullScreen: false
            }).then((confirmed) => {
                if (confirmed) {
                    this.paymentMethodsService.deletePaymentMethod(id).subscribe(
                        (data) => {
                            this.resetAlertMessageFlags();
                            this.renderPaymentMethods();
                            this.showAlertMessage = true;
                            this.deletePaymentMethodSuccess = true;
                            this.alertMessageType = 'success';
                            this.alertMessageBody = `Your ${pmToDelete.title} ending in ${pmToDelete.shortReference} has been removed from My Wallet.`;
                        },
                        (error) => {
                            console.error('Error within the deleteCard method', error);
                            this.resetAlertMessageFlags();
                            this.renderPaymentMethods();
                            this.showAlertMessage = true;
                            this.containsLinks = true;
                            this.deletePaymentMethodError = true;
                            this.alertMessageType = 'error';
                        }
                    );
                }
            });
        }

    }

    public addNewCard() {
        this.modalService.activate(
            {
                title: 'Add a payment method',
                cancelText: '',
                okText: '',
                modalType: 'component',
                component: AddPaymentMethodComponent,
                componentData: {
                    loadedFromMyWalletSettings: true,
                    isDirectDebit: false
                },
                fullScreen: true
            }
        );
    }

    public closedWarning(event: Boolean) {
        let closedKey = new LocalAlertDismissablesModel();
        closedKey.myWalletPaymentMethodWarning = false;
        this.localStorageService.addKey(closedKey);
    }

    public messageBusListener() {
        // Add cc message alert
        this.messageBusService.listen(AddCreditCardResultMessage).subscribe(
            (result) => {
                if (!result.paymentArrangementSetup) {
                    this.resetAlertMessageFlags();
                    this.renderPaymentMethods();
                    if (result.message.creditCardReference) {
                        let cardLastFourDigits = result.message.creditCardReference.match(/(\d{4})(?!.*\d)/g);
                        this.showAlertMessage = true;
                        this.alertMessageType = 'success';
                        this.alertMessageBody = `Your ${result.message.cardType} ending in ${cardLastFourDigits} has been added to My Wallet.`;
                        this._dataLayer.pushPaymentSuccess(`Payment outcome – Card success`, 'Add card', PaymentMethodName.SavedMethod);
                    }

                    if (result.message === 'error') {
                        this.showAlertMessage = true;
                        this.containsLinks = true;
                        this.alertMessageType = 'error';
                        this.alertMessageHeading = 'Sorry, we’re unable to process your request right now. Please try again later.';
                        this.savePaymentMethodError = true;
                    }
                }
            },
            (error) => {
                console.error('An error occurred retrieving the credit card details from the StoreCreditCardFormComponent', error);
            }
        );

        // Delete cc message alert
        this.messageBusService.listen(DeleteCreditCardResult).subscribe(
            (result) => {
                this.renderPaymentMethods();
                this.resetAlertMessageFlags();
                if (result.isSuccessful) {
                    this.showAlertMessage = true;
                    this.containsLinks = true;
                    this.deletePaymentMethodSuccess = true;
                    this.alertMessageType = 'success';
                    this.alertMessageBody = `Your ${result.creditCardType} ending in ${result.creditCardNumber} has been removed from My Wallet, and all associated payment arrangements linked to this ${result.creditCardType} have been cancelled.`;
                } else {
                    this.showAlertMessage = true;
                    this.containsLinks = true;
                    this.deletePaymentMethodError = true;
                    this.alertMessageHeading = 'Sorry, we’re unable to process your request right now. Please try again later.';
                    this.alertMessageType = 'error';
                }
            },
            (error) => {
                console.error('An error occurred deleting the credit card details from the StoreCreditCardFormComponent', error);
            }
        );

        // Delete cc link dd message alert
        this.messageBusService.listen(DeletePaymentMethodLinkPaymentArrangementResult).subscribe(
            (result) => {
                this.renderPaymentMethods();
                this.resetAlertMessageFlags();
                if (result.isSuccessful) {
                    this.showAlertMessage = true;
                    this.alertMessageType = 'success';
                    this.alertMessageBody = `Your ${result.oldPaymentMethodType} ending in ${result.oldPaymentMethodNumber} has been removed from My Wallet, and all associated payment arrangements have now been linked to ${result.newPaymentMethodType} ending in ${result.newPaymentMethodNumber}.`;
                } else {
                    this.showAlertMessage = true;
                    this.containsLinks = true;
                    this.deletePaymentMethodLinkDirectDebitError = true;
                    this.alertMessageBody = `Your ${result.oldPaymentMethodType} ending in ${result.oldPaymentMethodNumber} has been removed from My Wallet, but we are unable to link your payment arrangement to ${result.newPaymentMethodType} ending in ${result.newPaymentMethodNumber}.`;
                    this.alertMessageType = 'error';
                }
            },
            (error) => {
                console.error('An error occurred deleting and updating the credit card details from the StoreCreditCardFormComponent', error);
            }
        );

        // Add Bank Account message alert
        this.messageBusService.listen(AddBankAccountResultMessage).subscribe(
            (result) => {
                if (!result.paymentArrangementSetup) {
                    this.renderPaymentMethods();
                    this.resetAlertMessageFlags();
                    if (result.message.accountNumber) {
                        let accountLastFourDigits = result.message.accountNumber.match(/(\d{4})(?!.*\d)/g);
                        this.showAlertMessage = true;
                        this.alertMessageType = 'success';
                        this.alertMessageBody = `Your bank account ending in ${accountLastFourDigits} has been added to My Wallet.`;
                        this._dataLayer.pushPaymentSuccess(`Payment outcome – Account success`, 'Add Bank Account', PaymentMethodName.BankAccount);
                    }

                    if (result.message === 'error') {
                        this.showAlertMessage = true;
                        this.containsLinks = true;
                        this.alertMessageType = 'error';
                        this.alertMessageHeading = 'Sorry, we’re unable to process your request right now. Please try again later.';
                        this.savePaymentMethodError = true;
                    }
                }
            },
            (error) => {
                console.error('An error occurred retrieving the credit card details from the StoreCreditCardFormComponent', error);
            }
        );
    }

    private resetAlertMessageFlags() {
        this.showAlertMessage = false;
        this.containsLinks = false;
        this.alertMessageType = 'success';
        this.alertMessageHeading = '';
        this.alertMessageBody = '';
        this.deletePaymentMethodSuccess = false;
        this.deletePaymentMethodError = false;
        this.deletePaymentMethodLinkDirectDebitError = false;
        this.savePaymentMethodSuccess = false;
        this.savePaymentMethodError = false;
    }

    private setPendingPaymentMessage() {
        this.myWalletService.checkPendingPayments().subscribe((pendingPayment) => {
            this.hasPendingPayment = pendingPayment;
        });
    }
}
