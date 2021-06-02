import { Component, ElementRef, OnInit } from '@angular/core';
/* tslint:disable:no-access-missing-member */
import { IPaymentArrangementStateService } from './../../../../../shared/component/paymentArrangement/paymentArrangementState.service';
import { AlertMessages } from './../../../../../shared/messages/alertMessages';

import { IAccountServiceMA } from '../../../../../myAccount/services/account.service';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { ModalService } from '../../../../modal/modal.service';
import { IPaymentMethodsService } from '../../../../services/settings/paymentMethods.service.interface';
import { IMyWalletService } from '../../myWallet/myWallet.service.interface';

import { PaymentArrangementButtonComponent } from '../../../../../shared/component/paymentArrangement/paymentArrangementButton/paymentArrangementButton.component';
import { SetUpPaymentArrangementResultMessage } from '../../../../../shared/messages/setUpPaymentArrangementResultMessage';

import { IPaymentArrangementSettingsService } from '../../../../../shared/component/paymentArrangement/paymentArrangement.settings.service.interface';
import { PaymentArrangementType } from '../../../../common/enums';

@Component({
    selector: 'agl-direct-debit-button',
    templateUrl: '../../../../../shared/component/paymentArrangement/paymentArrangementButton/paymentArrangementButton.component.html',
    styleUrls: ['../../../../../shared/component/paymentArrangement/paymentArrangementButton/paymentArrangementButton.component.scss']
})
export class DirectDebitButtonComponent extends PaymentArrangementButtonComponent implements OnInit {

    public constructor(
        public eRef: ElementRef,
        public modalService: ModalService,
        public paymentMethodService: IPaymentMethodsService,
        public alertMessage: AlertMessages,
        public messageBusService: IMessageBusService,
        public myWalletService: IMyWalletService,
        public accountService: IAccountServiceMA,
        public paymentArrangementService: IPaymentArrangementSettingsService,
        public setUpPaymentArrangementResultMessage: SetUpPaymentArrangementResultMessage,
        public stateService: IPaymentArrangementStateService) {
            super(eRef, modalService, paymentMethodService, alertMessage, messageBusService,
                myWalletService, accountService, paymentArrangementService, setUpPaymentArrangementResultMessage,
                PaymentArrangementType.DirectDebit, stateService);
    }

}
