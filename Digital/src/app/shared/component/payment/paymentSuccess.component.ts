/* tslint:disable:no-access-missing-member */
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailReceiptService } from '../../../shared/service/email.receipt.service';
import { Now } from '../../../shared/service/now.service';
import { PaymentMethods } from '../../globals/paygConstants';
import { PrePaymentBalanceTopUpUrgency } from '../../globals/prePaymentBalanceTopUpUrgency';
import { PaymentContentModel } from '../../model/payment/paymentContent.model';
import { PaymentDetails } from '../../model/payment/paymentDetails.model';
import { ContentService } from '../../service/content.service';
import { AglValidators } from '../../validators/aglValidators';
import { PaymentMethodName } from './../../globals/paygConstants';
import { AlertMessages } from './../../messages/alertMessages';

import { DashboardComponent } from '../../../myAccount/dashboard/dashboard.component';
import { ModalService } from '../../../myAccount/modal/modal.service';
import { IAccountServiceMA } from '../../../myAccount/services/account.service';
import { EventService } from '../../../myAccount/services/event.service';
import { ApiService, EmailReceiptRequestModel } from '../../../shared/service/api.service';
import { ConfigService } from '../../service/config.service';
import { FeatureFlagService } from './../../../myAccount/services/featureFlag.service';

import * as jwt_decode from 'jwt-decode';
import { IDecisioningService } from '../../../myAccount/services/contract/idecisioning.service';
import { DataLayerService } from '../../service/dataLayer.service';

declare let leanengage: any;

@Component({
  selector: 'agl-payment-success',
  templateUrl: './paymentSuccess.component.html',
  styleUrls: ['./paymentSuccess.component.scss']
})
export class PaymentSuccessComponent implements OnInit, AfterViewInit {
  @Input() public paymentDetails: PaymentDetails;
  public paygPaymentBonusAmountText: string;
  public isDebit: boolean = false;
  public emailAddress: string;

  public content: PaymentContentModel;
  public isSmsPayBannerEnabled: boolean = false;
  public emailReceipt: EmailReceiptRequestModel = new EmailReceiptRequestModel();
  public emailForm: FormGroup;
  public emailSubmitted: boolean = false;
  public emailSending: boolean = false;
  public email: string = '';
  public sendingSuccess: boolean = false;
  public sendingFailure: boolean = false;

  constructor(
    public _now: Now,
    public _contentService: ContentService,
    public _emailApi: EmailReceiptService,
    public _dashboard: DashboardComponent,
    public _accountService: IAccountServiceMA,
    public _config: ConfigService,
    public _modalService: ModalService,
    public _eventService: EventService,
    protected _api: ApiService,
    public alertMessages: AlertMessages,
    public dataLayer: DataLayerService,
    public featureService: FeatureFlagService,
    protected _decisioningService: IDecisioningService,
  ) {

  }

  public ngOnInit() {
    // get the content
    this._contentService.getContent().subscribe((result) => {
      if (result.selfService !== undefined &&
        result.selfService.payment !== undefined) {
        this.content = result.selfService.payment;
      }
    });

    this.dataLayer.pushPaymentSuccess(`Payment outcome – ${this.getPaymentType()} success`, 'Make a payment', PaymentMethodName.CreditCard);

    if (this.paymentDetails && this.paymentDetails.isPayg) {
      this.isDebit = this.paymentDetails.paygBand === PrePaymentBalanceTopUpUrgency.High || this.paymentDetails.paygBand === PrePaymentBalanceTopUpUrgency.Unavailable;
      if (this.paymentDetails.prePaymentDate || this.paymentDetails.showOutstandingBillPayg) {
        this.isDebit = false;
      }
    }

    this.getBonusText();

    // Group email validations
    this.emailForm = new FormGroup({
      email: new FormControl(this.emailAddress, [Validators.required, AglValidators.validateEmail])
    });

    setTimeout(() => {
      // TODO: DM this is a hack until the PAYG modal is consolidated with other modals
      if (document !== null && document.querySelector('#modal-close-button') !== null) {
        document.querySelector('#modal-close-button').classList.add('colour-light');
        document.querySelector('#modal-close-button').setAttribute('style', 'top: -40px; right: -10px;');
      }
    });

    this.sendPendingPayments();

    // Set email address from jwt
    let token = sessionStorage.getItem('Bearer');
    if (token) {
      let emailAddress = jwt_decode(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      this.email = emailAddress;
      this.emailForm.get('email').setValue(emailAddress);
    }
    console.warn(`isSmsPayEntryPointAvailableForCustomer()`);
    this._decisioningService.isSmsPayEntryPointAvailableForCustomer().subscribe(
        (featureIsEnabled: boolean) => {
            this.isSmsPayBannerEnabled = featureIsEnabled;
        }
    );
  }
  public ngAfterViewInit() {
     // LeanEngage below
    let leanAppId = this._config.current.leanEngageAppId;

    this._accountService.getName().subscribe((name) => {
    leanengage('start', { user_id: this.paymentDetails.referenceNumber, name: name.fullName, app_id: leanAppId });
    });
  }
  public showBonusAmount() {
    return this.paymentDetails && this.paymentDetails.isPayg &&
      (this.paymentDetails.receiptDetail.bonusAmount > 0 || this.isDebit);
  }

  public sendEmail() {
    this.emailSubmitted = true;

    // Don't send if no email is present or email isn't valid.
    if (this.emailForm.valid) {
      this.emailSubmitted = false;
      this.emailSending = true;
      this.postEmail();
      return;
    }
  }
  public getBonusText() {
    if (this.paymentDetails.isPayg && this.isDebit) {
      return 'Checking bonus eligibility';
    } else if (this.paymentDetails.isPayg) {
      return '$' + this.paymentDetails.receiptDetail.bonusAmount + ' bonus credit';
    }
  }

  public isDisplayBonusPending() {
    return this.paymentDetails.isPayg && this.isDebit;
  }

  public getPaymentMethodDescription() {
    if (this.paymentDetails.receiptDetail.paymentMethod === PaymentMethods.Paypal) {
      return 'Paypal';
    } else if (this.paymentDetails.receiptDetail.paymentMethod === PaymentMethods.BankAccount) {
      return 'Bank account';
    } else if (this.paymentDetails.receiptDetail.paymentMethod === PaymentMethods.CreditCard) {
      return this.paymentDetails.receiptDetail.creditCardType + ' xxxx-' + this.getLastFourDigits(this.paymentDetails.receiptDetail.creditCardNumber);
    }
  }

  public getMaskedCreditCardNumber() {
    return `xxxx-${this.getLastFourDigits(this.paymentDetails.receiptDetail.creditCardNumber)}`;
  }

  public closeModal() {
    this._modalService.close();
    this._eventService.payment(true);

    if (this.paymentDetails.isPayg) {
        this._eventService.paymentSuccess(true, 'payg');
    } else {
        this._eventService.paymentSuccess(true, 'non-payg');
    }
  }

  public getLastFourDigits(value: string) {
    if (value.length > 4) {
      return value.slice(value.length - 4);
    }

    return value;
  }

  public postEmail() {

    this.emailReceipt.referenceNumber = this.paymentDetails.referenceNumber;
    this.emailReceipt.receiptNumber = this.paymentDetails.receiptDetail.receiptNumber;
    this.emailReceipt.paymentAmount = this.paymentDetails.receiptDetail.paymentAmount;
    this.emailReceipt.paymentDate = this.paymentDetails.receiptDetail.paymentDate;

    if (this.paymentDetails.receiptDetail.paymentMethod === PaymentMethods.BankAccount) {
      this.emailReceipt.subjectTemplate = 'SubjectBankAccount';
      this.emailReceipt.emailTitleTemplate = 'EmailTitleBankAccount';
    }

    if (this.paymentDetails.receiptDetail.paymentMethod === PaymentMethods.CreditCard) {
      this.emailReceipt.creditCardType = this.paymentDetails.receiptDetail.creditCardType;
      this.emailReceipt.creditCardNumber = this.getMaskedCreditCardNumber();
      this.emailReceipt.creditCardExpiry = this.paymentDetails.receiptDetail.creditCardExpiry;
    }

    if (this.paymentDetails.isPayg) {
      if (this.paymentDetails.receiptDetail.bonusAmount > 0) {
        this.emailReceipt.bonus = '$' + this.paymentDetails.receiptDetail.bonusAmount;
      }

      if (this.isDebit) {
        this.emailReceipt.additionalTextTemplate = 'BonusDisclaimer';
      }

      this.emailReceipt.termsAndConditionsTemplate = 'TermsAndConditions';
    }

    this.emailSending = true;
    this.sendingFailure = false;
    this.sendingSuccess = false;

    this._api.sendPaymentEmail(this.emailReceipt)
      .subscribe(
      (res) => {
        this.sendingSuccess = true;
        this.emailSending = false;
      },
      (error) => {
        this.emailSending = false;
        this.sendingSuccess = false;
        this.sendingFailure = true;
      }
      );
  }

  public sendPendingPayments() {
    // Send the payment into pending payments.
    let date = new Date();
    let now = date.toISOString();
    let paymentInformation = {
      contractNumber: this.paymentDetails.contractNumber,
      paymentDateTime: now,
      amount: this.paymentDetails.receiptDetail.paymentAmount
    };
    localStorage.removeItem('selfService.payPal');
    if (!localStorage.getItem('appContainer') || localStorage.getItem('appContainer').toLowerCase() !== 'mock') {
      this._api.postPendingPayments(paymentInformation).subscribe((value) => {
        this._dashboard.showApiData();
      });
    }
  }

  public getPaymentType() {
    if (this.paymentDetails.receiptDetail.paymentMethod === PaymentMethods.Paypal) {
      return 'paypal';
    } else if (this.paymentDetails.receiptDetail.paymentMethod === PaymentMethods.BankAccount) {
      return 'account';
    } else if (this.paymentDetails.receiptDetail.paymentMethod === PaymentMethods.CreditCard) {
      return 'card';
    }
  }

  public setupSmsPayEventReceived() {
      this.closeModal();
  }
}
