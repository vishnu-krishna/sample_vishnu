
import { Subscription } from 'rxjs/Subscription';
import { PaymentArrangementType } from './../../../myAccount/common/enums';
import { SurveyType } from './../../../myAccount/services/survey.service';
import { SurveyService } from './../../../myAccount/services/survey.service';

import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ModalService } from '../../../myAccount/modal/modal.service';
import { IMyWalletService } from '../../../myAccount/pages/settings/myWallet/myWallet.service.interface';
import { IAccountServiceMA } from '../../../myAccount/services/account.service';
import { IPaymentMethodsService } from '../../../myAccount/services/settings/paymentMethods.service.interface';
import { AddPayPalResultMessage } from '../../messages/addPayPal.message';
import { PaymentArrangementContent } from '../../model/domain/paymentArrangement/paymentArrangementContent.model';
import { ApiService } from '../../service/api.service';
import { ConfigService } from '../../service/config.service';
import { ContentService } from '../../service/content.service';
import { IMessageBusService } from '../../service/contract/imessageBus.service';
import { DataLayerService } from '../../service/dataLayer.service';
import { PaymentArrangementSettingsViewModel } from './paymentArrangement.settings.service';
import { IPaymentArrangementSettingsService } from './paymentArrangement.settings.service.interface';

import { AddBankAccountResultMessage } from '../../messages/addBankAccountResult.message';
import { AddCreditCardResultMessage } from '../../messages/addCreditCardResult.message';
import { DeletePaymentArrangementResultMessage } from '../../messages/deletePaymentArrangementResult.message';
import { SetUpPaymentArrangementResultMessage } from '../../messages/setUpPaymentArrangementResultMessage';
import { SwitchPaymentArrangementResultMessage } from '../../messages/switchPaymentArrangementResult.message';

import * as apiModel from '../../../myAccount/services/settings/model';

import { IPaymentArrangementStateService } from './paymentArrangementState.service';
import { IFeatureFlagService } from '../../../myAccount/services/contract/ifeatureflag.service';

declare let leanengage: any;

export abstract class PaymentArrangementComponent implements OnInit, OnDestroy {
    public isFeatureFlagSettings: boolean;
    public content: PaymentArrangementContent;
    public viewModel: PaymentArrangementSettingsViewModel[];
    public hasDirectDebitSetup: boolean;
    public isMandatoryDirectDebit: boolean;
    public hasSmsPaySetup: boolean;
    public isSingleView: boolean;
    public storedPaymentMethods;
    public isLoading: boolean = true; // Generic isLoading
    public loadingDueToChangesInAccount: Number = 0; // Shows the account number that has was updated, triggering a reload of payment info.
    public showContactUs: boolean;
    public showDeleteDDAlertMessage: boolean = false;
    public showAddPAAlertMessage: boolean = false;
    public showAddPAErrorMessage: boolean = false;
    public nameId: string;
    public alertMessageType: string;
    public alertMessageHeader: string;
    public alertMessageBody: string;
    public addPayPalMessage: AddPayPalResultMessage;
    public updatedContractAccountNumber: Number;
    public isMultiAccount: boolean = false;
    public paygNoDDSetBodyMessage: string = 'If you set up Direct Debit, we\'ll only debit from this account whenever there\'s a bill owing and your balance is in debit.';
    public paygNoDDSetHeaderMessage: string = 'You\'re on the AGL Prepaid plan for electricity';
    public paygWithDDSetBodyMessage: string = 'We\'ll only debit from this account whenever there\'s a bill owing and your balance is in debit.';
    public paygWithDDSetHeaderMessage: string = 'You\'re on the AGL Prepaid plan for your electricity';
    public abstract paymentArrangementSetupSuccessHeader: string;
    public abstract paymentArrangementSetupSuccessBody: string;
    public abstract paymentArrangementUpdatedSuccessHeader: string;
    public abstract paymentArrangementUpdatedSuccessBody: string;

    public directDebitUrl: string;
    public paymentArrangementType: PaymentArrangementType;

    protected subscriptions: Subscription[] = [];

    constructor(
        public featureFlagService: IFeatureFlagService,
        public contentService: ContentService,
        public paymentArrangementService: IPaymentArrangementSettingsService,
        public myWalletService: IMyWalletService,
        public messageBusService: IMessageBusService,
        public modalService: ModalService,
        public accountService: IAccountServiceMA,
        public apiService: ApiService,
        public paymentMethodService: IPaymentMethodsService,
        public route: ActivatedRoute,
        public config: ConfigService,
        public _dataLayer: DataLayerService,
        public stateService: IPaymentArrangementStateService,
        public type: PaymentArrangementType,
        public surveyService: SurveyService
    ) {
        this.directDebitUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/home/paymentoptions/direct-debit`;
        this.paymentArrangementType = type;
    }

    public ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            let payPalReturnValue = params['paypal'];
            let token = params['token'];
            if (token && payPalReturnValue === '1') {
                // this means that the user clicked on the paypal agreement button
                this.savePaypal(token);
            } else if (token && payPalReturnValue === '0') {
                // this means that the user cancelled the paypal agreement
                history.replaceState(null, null, location.pathname);
            }
        });
    }

    public isUpdatingAccount(account: string) {
        // We are updating the account IF there is an explicit read/write action on that account, or we are refreshing payments from API due to a change in this account
        return ((this.stateService.isUpdatingAccount(account)) || (this.loadingDueToChangesInAccount.toString() === account));
    }

    public abstract cancelPaymentArrangement(paymentArrangementSettingsViewModel: PaymentArrangementSettingsViewModel);

    public ngOnDestroy() {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    // Pass in the number of an account, if the reason we are reloading is due to changes made on that account
    protected aggregateModels(updatedAccount: Number = 0) {
        if (updatedAccount && updatedAccount !== 0) {
            this.loadingDueToChangesInAccount = updatedAccount;
        }
        Observable.forkJoin(
            this.paymentArrangementService.getPaymentArrangementViewModel(this.paymentArrangementType),
            this.myWalletService.getStoredPaymentMethods()
        ).finally(
            () => {
                if (this.loadingDueToChangesInAccount === updatedAccount) {
                    this.loadingDueToChangesInAccount = 0;
                }
                this.stateService.isUpdatingPaymentArrangement = false;
            }
            )
            .subscribe(
            ([paymentArrangementSettingsViewModels, myWalletModels]) => {
                this.renderPaymentArrangementAccounts(paymentArrangementSettingsViewModels);
                this.storedPaymentMethods = myWalletModels;
                this.isLoading = false;
            },
            (err) => {
                this.isLoading = false;
                this.showContactUs = true;
            }
        );
    }

    protected renderPaymentArrangementAccounts(viewModel: PaymentArrangementSettingsViewModel[]) {
        this.viewModel = viewModel;
        this.isSingleView = viewModel.length === 1;
        this.isMultiAccount = this.viewModel.length > 1;
        this.setDisplayMessage(viewModel);
    }

    protected setDisplayMessage(viewModel: PaymentArrangementSettingsViewModel[]) {
        this.hasDirectDebitSetup = viewModel.some((vm) => vm.hasDirectDebitPaymentArrangement === true);
        this.hasSmsPaySetup = viewModel.some((vm) => vm.hasSmsPayPaymentArrangement === true);
        this.isMandatoryDirectDebit = viewModel.some((vm) => vm.isMandatoryDirectDebit === true);
        this.stateService.hasDirectDebitSetup = this.hasDirectDebitSetup;
        this.stateService.hasSmsPaySetup = this.hasSmsPaySetup;
    }

    protected messageBusListener() {

        this.subscriptions.push(this.messageBusService.listen(DeletePaymentArrangementResultMessage).subscribe(
            (result) => {
                this.resetAlertMessageFlags();
                if (result.isSuccessful) {
                    this.alertMessageType = 'success';
                    this.alertMessageBody = 'Your payment arrangement has been cancelled.';
                    this.accountService.refreshAccounts();
                } else {
                    this.alertMessageType = 'error';
                    this.alertMessageBody = 'Sorry, we’re unable to process your request right now. Please try again later.';
                }
                this.updatedContractAccountNumber = result.contractAccountNumber;
                this.showDeleteDDAlertMessage = true;
                this.aggregateModels(result.contractAccountNumber);
            },
            (error) => {
                console.error('An error occurred deleting the payment arrangement contract accounts', error);
            }
        ));

        this.subscriptions.push(this.messageBusService.listen(AddCreditCardResultMessage).subscribe(
            (result: AddCreditCardResultMessage) => {
                if (result.paymentArrangementSetup) {
                    if (result.isSwitchPaymentArrangement === false) {
                        this.showFeedbackSurvey();
                    }
                    this.setAddPAAlertMessage(result);
                    if (result.message !== 'error') {
                        this._dataLayer.pushPaymentSuccess(`Payment outcome – Card success` , 'Use card');
                    }
                }
            },
            (error) => {
                console.error('An error occurred retrieving the credit card details from the StoreCreditCardFormComponent', error);
            }
        ));

        this.subscriptions.push(this.messageBusService.listen(AddBankAccountResultMessage).subscribe(
            (result: AddBankAccountResultMessage) => {
                if (result.paymentArrangementSetup) {
                    if (result.isSwitchPaymentArrangement === false) {
                        this.showFeedbackSurvey();
                    }
                    this.setAddPAAlertMessage(result);
                    if (result.message !== 'error') {
                        this._dataLayer.pushPaymentSuccess(`Payment outcome – Account success`, 'Use Bank Account');
                    }
                }
            },
            (error) => {
                console.error('An error occurred retrieving the credit card details from the StoreCreditCardFormComponent', error);
            }
        ));

        this.subscriptions.push(this.messageBusService.listen(SwitchPaymentArrangementResultMessage).subscribe(
            (result: SwitchPaymentArrangementResultMessage) => {
                if (result.isSwitchPaymentArrangement === false) {
                    this.showFeedbackSurvey();
                }
                this.setAddPAAlertMessage(result);
                if (result.isSwitchPaymentArrangement && result.message !== 'error') {
                    this._dataLayer.pushPaymentSuccess(`Payment outcome – payment arrangement updated`, 'account or card');
                } else {
                    this._dataLayer.pushPaymentError(`Payment outcome – payment arrangement failure`, 'Error occured while set up the directdebit');
                }
            },
            (error) => {
                console.error('An error occurred retrieving the credit card details from the StoreCreditCardFormComponent', error);
            }
        ));

        this.subscriptions.push(this.messageBusService.listen(SetUpPaymentArrangementResultMessage).subscribe(
            (result: SetUpPaymentArrangementResultMessage) => {
                if (result.isSwitchPaymentArrangement === false) {
                    this.showFeedbackSurvey();
                }
                this.setAddPAAlertMessage(result);
                if (result.message !== 'error') {
                    this._dataLayer.pushPaymentSuccess(`Payment outcome – directdebit setup`, 'account or card');
                } else {
                    this._dataLayer.pushPaymentError(`Payment outcome – directdebit Failure`, 'Error occured while set up the directdebit');
                }
            },
            (error) => {
                console.error('An error occurred retrieving the credit card details from the StoreCreditCardFormComponent', error);
            }
        ));
    }

    protected setAddPAAlertMessage(result) {
        this.resetAlertMessageFlags();
        if (result.message !== 'error') {
            this.alertMessageType = 'success';
            this.alertMessageHeader = this.paymentArrangementSetupSuccessHeader;
            this.alertMessageBody = this.paymentArrangementSetupSuccessBody;
            if (result.isSwitchPaymentArrangement) {
                this.alertMessageHeader = this.paymentArrangementUpdatedSuccessHeader;
                this.alertMessageBody = this.paymentArrangementUpdatedSuccessBody;
            }
            this.showAddPAAlertMessage = true;
            this.accountService.refreshAccounts();
        } else {
            this.alertMessageType = 'error';
            this.alertMessageHeader = 'Sorry, we’re unable to process your request right now. Please try again later.';
            this.showAddPAErrorMessage = true;
        }
        this.updatedContractAccountNumber = result.contractAccountNumber;
        this.aggregateModels(Number(result.contractAccountNumber));
    }

    protected resetAlertMessageFlags() {
        this.showDeleteDDAlertMessage = false;
        this.showAddPAAlertMessage = false;
        this.showAddPAErrorMessage = false;
        this.alertMessageType = 'success';
        this.alertMessageBody = '';
        this.alertMessageHeader = '';
        this.updatedContractAccountNumber = null;
    }

    protected savePaypal(token) {
        let saveComplete = false;
        let newPaypalRequest = new apiModel.CreatePaymentMethodRequest();
        newPaypalRequest.payPal = {
            token: token
        };
        let payPalDDContractNumber: any = JSON.parse(localStorage.getItem('selfService.payPalDDContractNumber'));
        let contractAccountNumber = !!payPalDDContractNumber ? Number(payPalDDContractNumber) : null;
        newPaypalRequest.directDebitContractAccount = contractAccountNumber;

        this.paymentMethodService.createPaymentMethod(newPaypalRequest).subscribe(
            (response) => {
            history.replaceState(null, null, location.pathname);
            localStorage.removeItem('selfService.payPalDDContractNumber');
            this.addPayPalMessage = new AddPayPalResultMessage();
            this.addPayPalMessage.message = newPaypalRequest;
            this.addPayPalMessage.contractAccountNumber = contractAccountNumber;
            this.addPayPalMessage.isSwitchPaymentArrangement = this.viewModel.filter((contractAccount) => {
                return Number(contractAccount.accountDetailModel.contractAccountNumber) === contractAccountNumber;
            })[0].hasDirectDebitPaymentArrangement;
            if (!this.addPayPalMessage.isSwitchPaymentArrangement) {
                this.showFeedbackSurvey();
            }
            this.setAddPAAlertMessage(this.addPayPalMessage);
            this._dataLayer.pushPaymentSuccess(`Payment outcome – paypal success`, 'Use PayPal');
            },
            (error) => {
                console.error('Error within saveCreditCard', error);
                history.replaceState(null, null, location.pathname);
                localStorage.removeItem('selfService.payPalDDContractNumber');
                this.addPayPalMessage = new AddPayPalResultMessage();
                this.addPayPalMessage.message = 'error';
                this.addPayPalMessage.contractAccountNumber = contractAccountNumber;
                this.setAddPAAlertMessage(this.addPayPalMessage);
                this._dataLayer.pushPaymentError(`Payment outcome – Paypal Failure`, 'Error occured while set up the directdebit using paypal');
            }
        );
    }

    protected showFeedbackSurvey() {
        if (this.paymentArrangementType === PaymentArrangementType.DirectDebit) {
            this.surveyService.showFeedbackSurvey(SurveyType.myAccountDDSurvey);
        }
    }
}
