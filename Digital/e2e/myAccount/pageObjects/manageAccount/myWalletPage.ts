import { browser, by, element, $, $$ , promise } from 'protractor';
import { Context } from '../../../context';
import { PaygPageObject } from './../components/paygPageObject';
import * as waits from '../../../utilities/waits';

export class MyWalletPage {
    // accounts and contracts
    public myWalletContainer = $('.main-card-header');
    public AddaPaymethodHeader = $('.my-wallet__card.my-wallet--add-method');
    public myWalletsHeader = by.cssContainingText('span', 'My Wallet');
    public myWalletAddPaymentMethod = $$('.my-wallet--circle');
    public myWalletPlusIcon  = $('.PlusIcon');
    public paymentModalCloseButton = $('.agl-modal-body__close-button');
    public addCreditCardButton = element(by.id('add-card-button'));
    public creditcardform = $('.store-card-form');
    public creditcardname = element(by.css('[formcontrolname=creditCardName]'));
    public creditcardexpirymonth = element(by.css('[formcontrolname=creditCardExpiryDateMonth]'));
    public creditcardexpiryyear = element(by.css('[formcontrolname=creditCardExpiryDateYear]'));
    public creditcardnumber  =  $('#txtCreditCard');
    public ccformsavebutton = $('#save-card');
    public cccardtitle = $('.my-wallet__details-title');
    public ccexpiry = $('.my-wallet__expiry.ng-star-inserted');
    private currentContext: Context;
    constructor(context: Context) {
        this.currentContext = context;
    }
     // Add Payment Method
    public clickAddaPaymentMethod() {
        this.myWalletAddPaymentMethod.click();
    }

    public AddaPaymentMethodDisplayed(): promise.Promise<boolean> {
        waits.waitForVisibilityOf(this.AddaPaymethodHeader);
        return this.AddaPaymethodHeader.isDisplayed();
    }

    public clickAddCardButton() {
        waits.waitForVisibilityOf(this.addCreditCardButton);
        this.addCreditCardButton.click();
    }

    // Close Add a Payment Method Modal
    public closeAddPaymentMethodModal() {
        this.paymentModalCloseButton.click();
        waits.waitForVisibilityOf(this.AddaPaymethodHeader);
    }

    public setupcreditcardexpirymonth(month) {
        this.creditcardexpirymonth.element(by.cssContainingText('option', month)).click();
    }

    public setupcreditcardexpiryyear(year) {
        this.creditcardexpiryyear.element(by.cssContainingText('option', year)).click();
    }
}
