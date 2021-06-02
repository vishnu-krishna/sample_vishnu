import { browser, by, element, $, $$, promise } from 'protractor';
import { settings } from './../settings';
import { Context } from '../../../context';
import * as waits from '../../../utilities/waits';

export class SmsPayPage {
  public smsPayContainer = $('.sms-pay');
  public smsPayLink = $('.settings-desktop-left-menu--settings-smspay');
  public smsPayButton = $('.dd-button__button-with-wallet ');
  public smsPayDropDown = $('.show');
  public tandcCheckBox = $('.mat-checkbox-inner-container');
  public saveButton = $('.dd-credit-card__panel__save-button');
  public successContainer = $('.sms-pay-success');
  public successHeading = $('.sms-pay-success .heading');
  public closeSuccessModalButton = $('.close .dls-button');
  public flashMessageHeading = $('.alert__text--heading');
  public cancelSmsPay = $('#cancel-sms-pay');
  public mobileNumberContainer = $('.sms-pay__mobile-container--has-smspay-setup');
  public paymentArrangementDetails = $('.dd-payment__setup__description');
  public cancelSmspayModalHeader = $('.delete-dd__header');
  public flashMessageText = $('.alert__text--body');
  public cancelPopupButtonList: any;
  public cancelConfirmationButton: any;
  public paymentArrangementOptions: any;

  private currentContext: Context;

  constructor(context: Context) {
    this.currentContext = context;
  }

  public navigateToManageAccount(): void {
    settings.manageAccountHeaderLink.click();
  }

  public navigateToSmsPayPage(): void {
    this.navigateToManageAccount();
    waits.waitForVisibilityOf(this.smsPayLink);
    this.smsPayLink.click();
  }

  public smsPayLinkDisplayed(): promise.Promise<boolean> {
    return this.smsPayLink.isDisplayed();
  }

  public getSmsPayPaymentArrangementOptions(): void {
    this.paymentArrangementOptions = $$('ul.show li');
  }

  public getCancelConfirmationButton(): void {
    this.cancelPopupButtonList = $$('.delete-dd__button button');
    this.cancelConfirmationButton = this.cancelPopupButtonList.get(0);
  }
}
