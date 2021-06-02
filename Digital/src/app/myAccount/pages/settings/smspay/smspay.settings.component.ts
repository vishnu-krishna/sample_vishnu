/* tslint:disable:no-access-missing-member */
import { Component, OnInit } from '@angular/core';
import { IAccountServiceMA } from '../../../services/account.service';
import { PaymentArrangementSettingsViewModel } from './../../../../shared/component/paymentArrangement/paymentArrangement.settings.service';
import { SurveyType } from './../../../services/survey.service';
import { DeleteSmsPayComponent } from './deleteSmsPay/deleteSmsPay.component';
import { SMSPaySuccessComponent } from './smsPaySuccess/smsPaySuccess.component';

import { IPaymentMethodsService } from '../../../services/settings/paymentMethods.service.interface';
import { AccountDetailComponentModel } from '../../../settings/accountDetail/accountDetail.component';

import { ActivatedRoute, Router } from '@angular/router';
import { PaymentArrangementComponent } from '../../../../shared/component/paymentArrangement/paymentArrangement.component';
import { IPaymentArrangementSettingsService } from '../../../../shared/component/paymentArrangement/paymentArrangement.settings.service.interface';
import { IPaymentArrangementStateService } from '../../../../shared/component/paymentArrangement/paymentArrangementState.service';
import { ApiService, ContactDetailModel } from '../../../../shared/service/api.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { ContentService } from '../../../../shared/service/content.service';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { PaymentArrangementType } from '../../../common/enums';
import { ModalService } from '../../../modal/modal.service';
import { FeatureFlagService } from '../../../services/featureFlag.service';
import { IMyWalletService } from '../myWallet/myWallet.service.interface';

import { BasePaymentArrangementResultMessage } from '../../../../shared/messages/basePaymentArrangementResult.message';

import { IDecisioningService } from '../../../services/contract/idecisioning.service';
import { FeatureFlagTypes } from '../../../services/featureFlag.constants';
import { SurveyService } from '../../../services/survey.service';

declare let leanengage: any;
declare let lpTag;

@Component({
    selector: 'agl-settings-smspay',
    templateUrl: './smspay.settings.component.html',
    styleUrls: [ './smspay.settings.component.scss' ]
})
export class SMSPaySettingsComponent extends PaymentArrangementComponent implements OnInit {

    public isUpdatingPaymentArrangement: boolean = false;
    public mobileNumber: string;
    public isSMSPayEnabled: boolean;
    public isContactDetailsEnabled: boolean = false;

    public paymentArrangementSetupSuccessHeader: string;
    public paymentArrangementSetupSuccessBody: string;
    public paymentArrangementUpdatedSuccessHeader: string;
    public paymentArrangementUpdatedSuccessBody: string;

    public mobileNumberInvalidHeading: string = `We don't have a valid mobile contact number for you`;

    // LivePerson Chat Injection
    public mobileNumberInvalidBody: string = `<span id="smspayupdatemobilenew"></span>`;

    public mobileNumberValid: boolean;
    public VALID_MOBILE_PHONE_NUMBER_REGEX = new RegExp('(0|\\+61)4[0-9]{8}');

    constructor(
        public featureFlagService: FeatureFlagService,
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
        public configService: ConfigService,
        public surveyService: SurveyService,
        public decisioningService: IDecisioningService,
        public router: Router
    ) {
        super(
            featureFlagService,
            contentService,
            paymentArrangementService,
            myWalletService,
            messageBusService,
            modalService,
            accountService,
            apiService,
            paymentMethodService,
            route,
            config,
            _dataLayer,
            stateService,
            PaymentArrangementType.SmsPay,
            surveyService
        );

        this.paymentArrangementSetupSuccessHeader = `You've successfully set up SMS Pay`;
        this.paymentArrangementSetupSuccessBody = `We'll text you a few days before payment is due, simply reply "Pay" and we'll debit your account on the due date.`;

        this.paymentArrangementUpdatedSuccessHeader = `You've successfully updated SMS Pay with a new payment method`;
        this.paymentArrangementUpdatedSuccessBody = ``;

        this.directDebitUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/home/paymentoptions/direct-debit`;
    }

    public ngOnInit() {
        super.ngOnInit();
        this.isLoading = true;

        this.decisioningService.isSmsPayEntryPointAvailableForCustomer()
        .finally(() => {
            // TODO investigate is this is even required - web chat components are doing their own scans for lpTag.newPage
            if (lpTag && lpTag.newPage) {
                lpTag.newPage(document.URL);
            }
        }).subscribe(
                (featureIsEnabled: boolean) => {
                    this.isSMSPayEnabled = featureIsEnabled;
                    this.apiService.getContactDetail()
                        .subscribe(
                            (data: ContactDetailModel) => {
                                // we do not handle sms pay customers with multi BP
                                this.showContactUs = data.hasMultipleBusinessPartners;

                                if (!data.hasMultipleBusinessPartners) {
                                    this.messageBusListener();
                                    this.aggregateModels();

                                    if (data.businessPartners && data.businessPartners.length) {
                                        this.mobileNumber = data.businessPartners[0].mobile;
                                        this.mobileNumberValid = this.isMobileNumberValid(this.mobileNumber);
                                    }

                                } else {
                                    this.isLoading = false;
                                }
                            },
                            (err) => {
                                console.error('ERROR: apiService.getContactDetail()', err);
                                this.showContactUs = true;
                                this.isLoading = false;
                            }
                        );
                }
            );

        this.featureFlagService.featureFlagged(FeatureFlagTypes.contactDetailsEnabled).subscribe((result) => {
            this.isContactDetailsEnabled = result;
        });
    }

    public updateContactDetails() {
        this.router.navigate(['/settings/contactdetails', 'SMSPay']);
    }

    public isMobileNumberValid(value: string): boolean {
        const mobileNumber = value.replace(/\s/g, '');
        return !!mobileNumber.match(this.VALID_MOBILE_PHONE_NUMBER_REGEX);
    }

    public cancelPaymentArrangement(paymentArrangementSettingsViewModel: PaymentArrangementSettingsViewModel) {
        let data = {
            paymentArrangementSettingsViewModel,
            isMultiAccount: this.isMultiAccount
        };
        this.modalService.activate({
            title: ' ',
            cancelText: '',
            okText: '',
            modalType: 'component',
            component: DeleteSmsPayComponent,
            componentData: data,
            fullScreen: false
        });
    }

    public hasNonRestrictedContracts(account: AccountDetailComponentModel) {
        if (account && account.contracts) {
            return account.contracts.some((contract) => !contract.isRestricted);
        } else {
            return false;
        }
    }

    public setAddPAAlertMessage(result: BasePaymentArrangementResultMessage) {
        if (result.message !== 'error') {

            if (!result.isSwitchPaymentArrangement) {
                setTimeout(() => {
                    let account = this.viewModel.find((x) => +x.accountDetailModel.contractAccountNumber === result.contractAccountNumber);
                    let data = {
                        mobileNumber: this.mobileNumber,
                        account: account
                    };
                    this.modalService.activate({
                        title: ' ',
                        cancelText: '',
                        okText: '',
                        modalType: 'component',
                        component: SMSPaySuccessComponent,
                        componentData: data,
                        fullScreen: true
                    }).then((value) => {
                        this.surveyService.showFeedbackSurvey(SurveyType.smsPaySurvey);
                        this.resetAlertMessageFlags();

                        if (result.message !== 'error') {
                            this.alertMessageType = 'success';
                            this.alertMessageHeader = this.paymentArrangementSetupSuccessHeader;
                            this.alertMessageBody = this.paymentArrangementSetupSuccessBody;
                        }
                        this.showAddPAAlertMessage = true;
                        this.updatedContractAccountNumber = result.contractAccountNumber;
                        this.aggregateModels(result.contractAccountNumber);
                    });
                }, 500);
            } else {
                this.surveyService.showFeedbackSurvey(SurveyType.smsPaySurvey);
                this.resetAlertMessageFlags();
                this.alertMessageHeader = this.paymentArrangementUpdatedSuccessHeader;
                this.alertMessageBody = this.paymentArrangementUpdatedSuccessBody;
                this.showAddPAAlertMessage = true;
                this.updatedContractAccountNumber = result.contractAccountNumber;
                this.aggregateModels(result.contractAccountNumber);
            }

        } else {
            this.resetAlertMessageFlags();
            // Show Error Panel Message if not 200 response result from API
            this.updatedContractAccountNumber = result.contractAccountNumber;
            this.alertMessageType = 'error';
            this.alertMessageHeader = 'Sorry, we’re unable to process your request right now. Please try again later.';
            this.showAddPAErrorMessage = true;
        }
    }
}
