/* tslint:disable:no-access-missing-member */

import { Component, OnInit } from '@angular/core';

import { ContentService } from '../../../../shared/service/content.service';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { FeatureFlagTypes } from '../../../services/featureFlag.service';
import { IMyWalletService } from '../myWallet/myWallet.service.interface';

import { IAccountServiceMA } from '../../../../myAccount/services/account.service';
import { ApiService, ContactDetailModel } from '../../../../shared/service/api.service';
import { ModalService } from '../../../modal/modal.service';
import { DeleteDirectDebitComponent } from './deleteDirectDebit/deleteDirectDebit.component';

import { ActivatedRoute } from '@angular/router';

import { IPaymentMethodsService } from '../../../services/settings/paymentMethods.service.interface';

import { IPaymentArrangementSettingsService } from '../../../../shared/component/paymentArrangement/paymentArrangement.settings.service.interface';
import { ConfigService } from '../../../../shared/service/config.service';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';

import { PaymentArrangementComponent } from '../../../../shared/component/paymentArrangement/paymentArrangement.component';
import { PaymentArrangementSettingsViewModel } from '../../../../shared/component/paymentArrangement/paymentArrangement.settings.service';
import { IPaymentArrangementStateService } from '../../../../shared/component/paymentArrangement/paymentArrangementState.service';
import { PaymentArrangementType } from '../../../common/enums';

import { SurveyService } from '../../../services/survey.service';
import { IFeatureFlagService } from '../../../services/contract/ifeatureflag.service';

declare let leanengage: any;

@Component({
    selector: 'agl-directdebit',
    templateUrl: './directDebit.settings.component.html',
    styleUrls: ['./directDebit.settings.component.scss']
})
export class DirectDebitSettingsComponent extends PaymentArrangementComponent implements OnInit {

    public isDirectDebitEnabled: boolean;

    public paymentArrangementSetupSuccessHeader: string;
    public paymentArrangementSetupSuccessBody: string;
    public paymentArrangementUpdatedSuccessHeader: string;
    public paymentArrangementUpdatedSuccessBody: string;

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
        public surveyService: SurveyService
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
            PaymentArrangementType.DirectDebit,
            surveyService
        );

        this.paymentArrangementSetupSuccessHeader = ``;
        this.paymentArrangementSetupSuccessBody = `Your Direct Debit is now set up.`;
        this.paymentArrangementUpdatedSuccessHeader = ``;
        this.paymentArrangementUpdatedSuccessBody = `Your Direct Debit has been updated.`;

        this.directDebitUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/home/paymentoptions/direct-debit`;
    }

    public ngOnInit() {
        super.ngOnInit();
        this.isLoading = true;
        this.featureFlagService.featureFlagged(FeatureFlagTypes.directDebitEnabled)
        .subscribe(
            (featureIsEnabled: boolean) => {
                this.isDirectDebitEnabled = featureIsEnabled;
                this.apiService.getContactDetail()
                    .subscribe(
                        (data: ContactDetailModel) => {
                            this.showContactUs = data.hasMultipleBusinessPartners;
                            if (!data.hasMultipleBusinessPartners) {
                                this.messageBusListener();
                                this.aggregateModels();
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
            component: DeleteDirectDebitComponent,
            componentData: data,
            fullScreen: false
        });
    }

}
