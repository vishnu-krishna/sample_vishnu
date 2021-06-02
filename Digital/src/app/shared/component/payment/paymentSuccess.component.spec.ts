import { DebugElement } from '@angular/core';
import {
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Mock } from 'ts-mocks';

import { DashboardComponent } from '../../../myAccount/dashboard/dashboard.component';
import { ModalService } from '../../../myAccount/modal/modal.service';
import { MyAccountMaterialModule } from '../../../myAccount/modules/my-account.material.module';
import { AccountOwnerModel, IAccountServiceMA } from '../../../myAccount/services/account.service';
import { IDecisioningService } from '../../../myAccount/services/contract/idecisioning.service';
import { EventService } from '../../../myAccount/services/event.service';
import { FeatureFlagService } from '../../../myAccount/services/featureFlag.service';
import { ApiStubService } from '../../../test/stubs/api.stub.service';
import { DataLayerStubService } from '../../../test/stubs/dataLayer.stub.service';
import { PaymentMethods } from '../../globals/paygConstants';
import { PrePaymentBalanceTopUpUrgency } from '../../globals/prePaymentBalanceTopUpUrgency';
import { AlertMessages } from '../../messages/alertMessages';
import { ReceiptDetail } from '../../model/domain/receiptDetail.model';
import { PaymentContentModel } from '../../model/payment/paymentContent.model';
import { PaymentDetails } from '../../model/payment/paymentDetails.model';
import { ApiService, EmailReceiptRequestModel } from '../../service/api.service';
import { ConfigService } from '../../service/config.service';
import { ContentService } from '../../service/content.service';
import { IMessageBusService } from '../../service/contract/imessageBus.service';
import { DataLayerService } from '../../service/dataLayer.service';
import { EmailReceiptService } from '../../service/email.receipt.service';
import { Now } from '../../service/now.service';
import { AlertComponent } from '../alert/alert.component';
import { CtaButtonModule } from '../ctaButton/index';
import { PaymentSmsPayBannerComponent } from './paymentSmsPayBanner/paymentSmsPayBanner.component';
import { PaymentSuccessComponent } from './paymentSuccess.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PaymentSuccessComponent', () => {
    let component: PaymentSuccessComponent;
    let dataLayerService: any;
    let contentService: any;
    let emailApi: any;
    let accountService: any;
    let apiService: any;
    let decisioningService: any;
    let fixture: ComponentFixture<PaymentSuccessComponent>;
    let debugElement: DebugElement;
    let mockDecisioningService: Mock<IDecisioningService>;

    let content: PaymentContentModel = new PaymentContentModel();
    class MockEventService {
        public mockName: string = 'Mocked Service';
    }
    class RouterStub {
        public navigate() {
            jasmine.createSpy('navigate');
        }
    }
    let mockPendingPaymentApiModel = {
        contractNumber: '',
        paymentDateTime: new Date(),
        amount: 0
    };
    let iApiServiceStub = {
        postPendingPayments: () => {
            throw new Error('iApiServiceStub.postPendingPayments has not been mocked properly.');
        }
    };
    let dashboardComponentStub = {
        showApiData: () => {
            throw new Error('dashboardComponentStub.showApiData has not been mocked properly.');
        }
    };
    let iAccountsServiceStub = {
        getName: () => {
            throw new Error('accountsServiceStub.getName has not been mocked properly.');
        }
    };
    let dummyModalService = {
        close: (): Promise<boolean> => {
            throw new Error('dummyModalService.activate has not been mocked properly.');
        }
    };

    let contentServiceStub = {
        getContent(): Observable<any> {
            return Observable.of({});
        }
    };

    let emailReceiptServiceStubService: any = {
        postEmail(data): Observable<{}> {
            return Observable.of({});
        }
    };

    let featureFlagServiceStubService = class {
        featureFlagged(data): Observable<boolean> {
            return Observable.of(false);
        }
    };

    beforeEach(() => {

        mockDecisioningService = new Mock<IDecisioningService>();

        mockDecisioningService
            .setup((x) => x.checkSmsPayBannerVisibility)
            .is(() => Observable.of());

        mockDecisioningService
            .setup((x) => x.isSmsPayEntryPointAvailableForCustomer)
            .is(() => Observable.of());

        TestBed.configureTestingModule({
            declarations: [
                PaymentSuccessComponent,
                AlertComponent,
                PaymentSmsPayBannerComponent
            ],

            providers: [
                { provide: 'AppContentBranch', useValue: 'selfService' },
                { provide: Router, useClass: RouterStub },
                { provide: ContentService, useValue: contentServiceStub },
                { provide: IAccountServiceMA, useValue: iAccountsServiceStub },
                { provide: DashboardComponent, useValue: dashboardComponentStub },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: ModalService, useValue: dummyModalService },
                { provide: EventService, useClass: MockEventService },
                { provide: DataLayerService, useClass: DataLayerStubService },
                { provide: EmailReceiptService, useValue: emailReceiptServiceStubService },
                { provide: FeatureFlagService, useClass: featureFlagServiceStubService },
                { provide: ApiService, useClass: ApiStubService },
                { provide: IDecisioningService, useValue: mockDecisioningService.Object },
                IMessageBusService,
                HttpModule,
                Now,
                ConfigService,
                AlertMessages
            ],
            imports: [
                ReactiveFormsModule,
                MyAccountMaterialModule,
                CtaButtonModule,
                HttpClientTestingModule,
            ]
        });
        // first create the fixture
        fixture = TestBed.createComponent(PaymentSuccessComponent);
        // create an instance of the component from the fixture
        component = fixture.componentInstance;
        dataLayerService = fixture.debugElement.injector.get(DataLayerService);
        apiService = fixture.debugElement.injector.get(ApiService);
        accountService = fixture.debugElement.injector.get(IAccountServiceMA);
        emailApi = fixture.debugElement.injector.get(EmailReceiptService);
        decisioningService = fixture.debugElement.injector.get(IDecisioningService);
        // add properties used by sub components
        // component.content = content;
        spyOn(dataLayerService, 'pushPaymentSuccess');
        spyOn(dataLayerService, 'pushPaymentError');
        spyOn(apiService, 'postPendingPayments').and.returnValue(Observable.of());
        spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of());
        spyOn(apiService, 'sendPaymentEmail').and.returnValue(Observable.of());
        spyOn(emailApi, 'postEmail').and.returnValue(Observable.of());
        let name = new AccountOwnerModel();
        spyOn(accountService, 'getName').and.returnValue(Observable.of());
    });
    it('should show the respective details for the credit card', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.contractNumber = '12345';
        paymentDetails.referenceNumber = '123456789';
        paymentDetails.amount = '107.69';

        let receiptDetail = new ReceiptDetail();
        receiptDetail.paymentDate = new Date().toString();
        receiptDetail.paymentAmount = parseFloat('107.69');
        receiptDetail.receiptNumber = '12345678910111213';
        receiptDetail.paymentMethod = PaymentMethods.CreditCard;
        receiptDetail.creditCardNumber = '12345678910111213';
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;
        component.emailAddress = 'test@gmail.com';
        fixture.detectChanges();

        expect(component.isDebit).toBeFalsy();
        expect(component.showBonusAmount()).toBeFalsy();
        expect(component.isDisplayBonusPending()).toBeFalsy();
        expect(component.getPaymentMethodDescription()).toContain('xxxx-1213');
        expect(component.getMaskedCreditCardNumber()).toContain('xxxx-1213');
        expect(fixture.nativeElement.querySelector('#payment-success-receipt-number').textContent).toMatch('Receipt number: 12345678910111213');
        expect(fixture.nativeElement.querySelector('#payment-success-reference-number').textContent).toMatch('Reference number: 123456789');
        expect(fixture.nativeElement.querySelector('#success-payment-pending-message').textContent).toMatch('Please allow up to 2 business days for your recent payment to update your balance.');
    });
    it('should show the respective details for the bank account', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.contractNumber = '12345';
        paymentDetails.referenceNumber = '123456789';
        paymentDetails.amount = '107.69';

        let receiptDetail = new ReceiptDetail();
        receiptDetail.paymentDate = new Date().toString();
        receiptDetail.paymentAmount = parseFloat('107.69');
        receiptDetail.receiptNumber = '12345678910111213';
        receiptDetail.paymentMethod = PaymentMethods.BankAccount;
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;

        fixture.detectChanges();
        expect(component.isDebit).toBeFalsy();
        expect(component.showBonusAmount()).toBeFalsy();
        expect(component.isDisplayBonusPending()).toBeFalsy();
        expect(component.getPaymentMethodDescription()).toContain('Bank account');
        expect(fixture.nativeElement.querySelector('#payment-success-receipt-number').textContent).toMatch('Receipt number: 12345678910111213');
        expect(fixture.nativeElement.querySelector('#payment-success-reference-number').textContent).toMatch('Reference number: 123456789');
        expect(fixture.nativeElement.querySelector('#success-payment-pending-message').textContent).toMatch('Please allow up to 2 business days for your recent payment to update your balance.');
    });
    it('should show the respective details for the paypal', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.contractNumber = '12345';
        paymentDetails.referenceNumber = '123456789';
        paymentDetails.amount = '107.69';

        let receiptDetail = new ReceiptDetail();
        receiptDetail.paymentDate = new Date().toString();
        receiptDetail.paymentAmount = parseFloat('107.69');
        receiptDetail.receiptNumber = '12345678910111213';
        receiptDetail.paymentMethod = PaymentMethods.Paypal;
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;

        fixture.detectChanges();
        expect(component.isDebit).toBeFalsy();
        expect(component.showBonusAmount()).toBeFalsy();
        expect(component.isDisplayBonusPending()).toBeFalsy();
        expect(component.getPaymentMethodDescription()).toContain('Paypal');
        expect(fixture.nativeElement.querySelector('#payment-success-receipt-number').textContent).toMatch('12345678910111213');
        expect(fixture.nativeElement.querySelector('#payment-success-reference-number').textContent).toMatch('123456789');
        expect(fixture.nativeElement.querySelector('#success-payment-pending-message').textContent).toMatch('Please allow up to 2 business days for your recent payment to update your balance.');
    });
    it('should show the Debit scenario for PAYG', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.isPayg = true;
        paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.High;

        let receiptDetail = new ReceiptDetail();
        receiptDetail.paymentMethod = PaymentMethods.CreditCard;
        receiptDetail.creditCardNumber = '12345678910111213';
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;

        fixture.detectChanges();
        expect(component.isDebit).toBe(true);
        expect(component.showBonusAmount()).toBeTruthy();
        expect(component.getBonusText()).toMatch('Checking bonus eligibility');
        expect(component.isDisplayBonusPending()).toBeTruthy();
    });

    it('should check the Credit scenario for PAYG -has bonus', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.fuelType = 'Electricty';
        paymentDetails.address = '1 Test Road';
        paymentDetails.contractNumber = '12345';
        paymentDetails.referenceNumber = '123456789';
        paymentDetails.amount = '107.69';
        paymentDetails.isPayg = true;
        paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.Low;

        let receiptDetail = new ReceiptDetail();
        receiptDetail.paymentDate = new Date().toString();
        receiptDetail.paymentAmount = parseFloat('107.69');
        receiptDetail.receiptNumber = '12345678910111213';
        receiptDetail.bonusAmount = 50;
        receiptDetail.paymentMethod = PaymentMethods.CreditCard;
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;

        expect(component.isDebit).toBeFalsy();
        expect(component.showBonusAmount()).toBeTruthy();
        expect(component.getBonusText()).toContain('$50 bonus credit');
        expect(component.isDisplayBonusPending()).toBeFalsy();
    });

    it('should check the Credit scenario for PAYG - No bonus', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.fuelType = 'Electricty';
        paymentDetails.address = '1 Test Road';
        paymentDetails.contractNumber = '12345';
        paymentDetails.referenceNumber = '123456789';
        paymentDetails.amount = '107.69';
        paymentDetails.isPayg = true;
        paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.Low;

        let receiptDetail = new ReceiptDetail();
        receiptDetail.paymentDate = new Date().toString();
        receiptDetail.paymentAmount = parseFloat('107.69');
        receiptDetail.receiptNumber = '12345678910111213';
        receiptDetail.bonusAmount = 0;
        receiptDetail.paymentMethod = PaymentMethods.CreditCard;
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;
        component.emailAddress = 'test@gmail.com';

        expect(component.isDebit).toBeFalsy();
        expect(component.showBonusAmount()).toBeFalsy();
        expect(component.isDisplayBonusPending()).toBeFalsy();
    });

    it('should check the Product swap scenario for PAYG -has bonus', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.fuelType = 'Electricty';
        paymentDetails.address = '1 Test Road';
        paymentDetails.contractNumber = '12345';
        paymentDetails.referenceNumber = '123456789';
        paymentDetails.amount = '107.69';
        paymentDetails.isPayg = true;
        paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.High;
        paymentDetails.showOutstandingBillPayg = true;

        let receiptDetail = new ReceiptDetail();
        receiptDetail.paymentDate = new Date().toString();
        receiptDetail.paymentAmount = parseFloat('107.69');
        receiptDetail.receiptNumber = '12345678910111213';
        receiptDetail.bonusAmount = 50;
        receiptDetail.paymentMethod = PaymentMethods.CreditCard;
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;

        expect(component.isDebit).toBeFalsy();
        expect(component.showBonusAmount()).toBeTruthy();
        expect(component.getBonusText()).toContain('$50 bonus credit');
        expect(component.isDisplayBonusPending()).toBeFalsy();
    });

    it('should check the Product swap scenario for PAYG -no bonus', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.fuelType = 'Electricty';
        paymentDetails.address = '1 Test Road';
        paymentDetails.contractNumber = '12345';
        paymentDetails.referenceNumber = '123456789';
        paymentDetails.amount = '107.69';
        paymentDetails.isPayg = true;
        paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.High;
        paymentDetails.showOutstandingBillPayg = true;

        let receiptDetail = new ReceiptDetail();
        receiptDetail.paymentDate = new Date().toString();
        receiptDetail.paymentAmount = parseFloat('107.69');
        receiptDetail.receiptNumber = '12345678910111213';
        receiptDetail.bonusAmount = 0;
        receiptDetail.paymentMethod = PaymentMethods.CreditCard;
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;

        expect(component.isDebit).toBeFalsy();
        expect(component.showBonusAmount()).toBeFalsy();
        expect(component.isDisplayBonusPending()).toBeFalsy();
    });

    it('verify the email template for bank account', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.fuelType = 'Electricty';
        paymentDetails.address = '1 Test Road';
        paymentDetails.contractNumber = '12345';
        paymentDetails.referenceNumber = '123456789';
        paymentDetails.amount = '107.69';

        let receiptDetail = new ReceiptDetail();
        receiptDetail.paymentDate = new Date().toString();
        receiptDetail.paymentAmount = parseFloat('107.69');
        receiptDetail.receiptNumber = '12345678910111213';
        receiptDetail.bonusAmount = 0;
        receiptDetail.paymentMethod = PaymentMethods.BankAccount;
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;
        component.emailAddress = 'test@gmail.com';
        component.emailForm = new FormGroup({ email: new FormControl('test@gmail.com', [], []) });
        component.emailReceipt = new EmailReceiptRequestModel();
        fixture.detectChanges();
        component.sendEmail();

        expect(component.emailForm.valid).toBeTruthy();
        expect(component.emailReceipt.subjectTemplate).toContain('SubjectBankAccount');
        expect(component.emailReceipt.emailTitleTemplate).toContain('EmailTitleBankAccount');
    });
    it('verify the email template for credit card -PAYG - No Bonus', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.referenceNumber = '123456789';
        paymentDetails.amount = '107.69';
        paymentDetails.isPayg = true;
        paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.Low;

        let receiptDetail = new ReceiptDetail();
        receiptDetail.paymentDate = new Date().toString();
        receiptDetail.paymentAmount = parseFloat('107.69');
        receiptDetail.receiptNumber = '12345678910111213';
        receiptDetail.bonusAmount = 0;
        receiptDetail.paymentMethod = PaymentMethods.CreditCard;
        receiptDetail.creditCardNumber = '12345678910111213';
        receiptDetail.creditCardType = 'Visa';
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;
        component.emailAddress = 'test@gmail.com';
        component.emailForm = new FormGroup({ email: new FormControl('test@gmail.com', [], []) });
        component.emailReceipt = new EmailReceiptRequestModel();
        fixture.detectChanges();
        component.sendEmail();

        expect(component.emailForm.valid).toBeTruthy();
        expect(component.emailReceipt.creditCardType).toContain('Visa');
        expect(component.emailReceipt.creditCardNumber).toContain('xxxx-1213');
        expect(component.emailReceipt.termsAndConditionsTemplate).toContain('TermsAndConditions');
        expect(component.emailReceipt.bonus).toBeUndefined();
    });
    it('verify the email template for credit card -PAYG with Bonus', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.referenceNumber = '123456789';
        paymentDetails.amount = '107.69';
        paymentDetails.isPayg = true;
        paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.Low;

        let receiptDetail = new ReceiptDetail();
        receiptDetail.bonusAmount = 50;
        receiptDetail.paymentMethod = PaymentMethods.CreditCard;
        receiptDetail.creditCardNumber = '12345678910111213';
        receiptDetail.creditCardType = 'Visa';
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;
        component.emailAddress = 'test@gmail.com';
        component.emailForm = new FormGroup({ email: new FormControl('test@gmail.com', [], []) });
        component.emailReceipt = new EmailReceiptRequestModel();
        fixture.detectChanges();
        component.sendEmail();

        expect(component.emailForm.valid).toBeTruthy();
        expect(component.emailReceipt.creditCardType).toContain('Visa');
        expect(component.emailReceipt.creditCardNumber).toContain('xxxx-1213');
        expect(component.emailReceipt.termsAndConditionsTemplate).toContain('TermsAndConditions');
        expect(component.emailReceipt.bonus).toContain('$50');

    });
    it('verify the email template for paypal - PAYG Debit scenario', () => {
        let paymentDetails = new PaymentDetails();
        paymentDetails.isPayg = true;
        paymentDetails.paygBand = PrePaymentBalanceTopUpUrgency.High;
        paymentDetails.referenceNumber = '123456789';
        component.emailAddress = 'test@gmail.com';
        component.emailForm = new FormGroup({ email: new FormControl('test@gmail.com', [], []) });
        component.emailReceipt = new EmailReceiptRequestModel();

        let receiptDetail = new ReceiptDetail();
        receiptDetail.paymentDate = new Date().toString();
        receiptDetail.paymentAmount = parseFloat('107.69');
        receiptDetail.receiptNumber = '12345678910111213';
        receiptDetail.paymentMethod = PaymentMethods.Paypal;
        receiptDetail.creditCardNumber = '12345678910111213';
        paymentDetails.receiptDetail = receiptDetail;
        component.paymentDetails = paymentDetails;
        fixture.detectChanges();
        component.sendEmail();

        expect(component.emailForm.valid).toBeTruthy();
        expect(component.emailReceipt.bonus).toBeUndefined();
        expect(component.emailReceipt.additionalTextTemplate).toContain('BonusDisclaimer');
    });
});
