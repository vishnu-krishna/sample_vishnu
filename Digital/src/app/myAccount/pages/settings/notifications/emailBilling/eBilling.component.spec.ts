import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Mock } from 'ts-mocks/lib';
import { Observable } from 'rxjs/Observable';

import { AccountViewModel, ContractViewModel } from '../../../../services/account.service';
import { BillDeliveryContactDetailModel } from './../../../../services/settings/model/billDeliveryContactDetailModel';
import { BillDeliveryMethodType } from '../../../../services/settings/model';
import { BusinessPartnerModel, ContactDetailModel } from './../../../../../shared/service/api.service';
import { ConfigStubService } from '../../../../../test/stubs/config.stub.service';
import { ConfigService } from './../../../../../shared/service/config.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { DataLayerStubService } from '../../../../../test/stubs/dataLayer.stub.service';
import { EBillingComponent } from './eBilling.component';
import { EBillingComponentModel } from './eBillingComponentModel';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { IContactDetailsStateService, ContactDetailsStateService } from '../../contactDetails/contactDetailsState.service';
import { ISettingsService } from '../../../../services/settings/settings.service.interface';
import { NotificationsModule } from '../notifications.module';
import { DocumentService } from '../../../../../shared/service/document.service';

describe('Ebilling Component Tests', () => {
    let comp: EBillingComponent;
    let fixture: ComponentFixture<EBillingComponent>;
    let de: DebugElement;

    let mockSettingsService: Mock<ISettingsService> = new Mock<ISettingsService>();
    let mockFeatureFlagService: Mock<FeatureFlagService> = new Mock<FeatureFlagService>();

    let spies: {
        getFeatureFlag: jasmine.Spy,
        updateBillDeliveryMethodPreference: jasmine.Spy
    } = {
        getFeatureFlag: null,
        updateBillDeliveryMethodPreference: null
    };

    beforeEach(() => {
        spies.getFeatureFlag = mockFeatureFlagService
            .setup((service: FeatureFlagService) => service.featureFlagged)
            .is(() => {
                return Observable.of(false);
            }).Spy;

        spies.updateBillDeliveryMethodPreference = mockSettingsService
            .setup((service: ISettingsService) => service.updateBillDeliveryMethodPreference)
            .is(() => {
                return null;
            }).Spy;

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                NotificationsModule
            ],
            providers: [
                { provide: ISettingsService, useValue: mockSettingsService.Object },
                { provide: FeatureFlagService, useValue: mockFeatureFlagService.Object },
                ConfigService,
                DocumentService,
                { provide: IContactDetailsStateService, useClass: ContactDetailsStateService },
                { provide: DataLayerService, useClass: DataLayerStubService }
            ]
        });

        fixture = TestBed.createComponent(EBillingComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('For the different bill delivery method types', () => {
        it(`should show an error flash messsage if the delivery method is 'Not Applicable'`, () => {
            // ARRANGE
            comp.eBillingModels = [createEbillingComponentModel('123456', BillDeliveryMethodType.NotApplicable)];

            // ACT
            fixture.detectChanges();

            const flashMessageError = de.query(By.css('.maui-flash-message--Error'));
            const dismissIcon = de.query(By.css(`.maui-flash-message__dismiss`));
            const toggleElement = de.query(By.css('.main-card-options__toggle'));

            // ASSERT
            expect(flashMessageError).toBeDefined();
            expect(toggleElement).toBeNull();
            expect(dismissIcon).toBeNull();
        });

        it(`should show an error flash messsage if the delivery method is 'BPayView'`, () => {
            // ARRANGE
            comp.eBillingModels = [createEbillingComponentModel('123456', BillDeliveryMethodType.BPayView)];

            // ACT
            fixture.detectChanges();

            const flashMessageElement = de.query(By.css('.maui-flash-message--Inform'));
            const dismissIcon = de.query(By.css(`.maui-flash-message__dismiss`));
            const toggleElement = de.query(By.css('.main-card-options__toggle'));

            // ASSERT
            expect(flashMessageElement).toBeDefined();
            expect(toggleElement).toBeNull();
            expect(dismissIcon).toBeNull();
        });

        it(`should show the email information with the toggle switched ON if the delivery method is 'Email'`, () => {
            // ARRANGE
            comp.eBillingModels = [createEbillingComponentModel('123456', BillDeliveryMethodType.Email)];
            de = fixture.debugElement;

            // ACT
            fixture.detectChanges();

            let flashMessageElement = de.query(By.css('.ebill-container__message'));
            let toggleElement = de.query(By.css('.main-card-options__toggle'));
            let updateContactDetails = de.query(By.css('.main-card-options__toggle__link'));
            let billDeliveryMessage = de.query(By.css('.main-card-options__toggle__label'));
            let toggle = de.query(By.css('.maui-toggle--active'));
            let toggleInput = de.query(By.css('.maui-toggle--active__input'));

            // ASSERT
            expect(flashMessageElement).toBeNull();
            expect(toggleElement).toBeDefined();
            expect(billDeliveryMessage).toBeDefined();
            expect(billDeliveryMessage.nativeElement.innerText).toContain('bob.jane@gmail.com');
            expect(updateContactDetails).toBeNull();
            expect(toggle).toBeDefined();
            expect(toggleInput.nativeElement.checked).toBe(true);
        });

        it(`should show the email information with the toggle switched OFF if the delivery method is 'Postal'`, () => {
            // ARRANGE
            comp.eBillingModels = [createEbillingComponentModel('123456', BillDeliveryMethodType.Postal)];

            // ACT
            fixture.detectChanges();

            // inform flash msg
            const flashMessageElement = de.query(By.css('.maui-flash-message--Inform'));
            const dismissIcon = de.query(By.css(`.maui-flash-message__dismiss`));
            // toggle
            const toggleElement = de.query(By.css('.main-card-options__toggle'));
            const toggle = de.query(By.css('.maui-toggle--active'));
            const toggleInput = de.query(By.css('.maui-toggle--active__input'));
            // email text
            const updateContactDetails = de.query(By.css('.main-card-options__toggle__link'));
            const billDeliveryMessage = de.query(By.css('.main-card-options__toggle__label'));

            // ASSERT
            expect(flashMessageElement).toBeDefined();
            expect(dismissIcon).toBeNull();
            expect(toggleElement).toBeDefined();
            expect(billDeliveryMessage).toBeDefined();
            expect(billDeliveryMessage.nativeElement.textContent).toContain('bob.jane@gmail.com');
            expect(updateContactDetails).toBeNull();
            expect(toggle).toBeDefined();
            expect(toggleInput.nativeElement.checked).toBe(false);
        });

        it(`should be able to turn on Email bill delivery preference from Postal`, () => {
            // ARRANGE
            comp.eBillingModels = [createEbillingComponentModel('123456', BillDeliveryMethodType.Postal)];

            fixture.detectChanges();
            const toggle = de.query(By.css('.maui-toggle--active'));
            const toggleInput = de.query(By.css('.maui-toggle--active__input'));
            const flashMessageInform = de.query(By.css('.maui-flash-message--Inform'));
            const flashMessageSuccess = de.query(By.css('.maui-flash-message--Success'));
            const dismissIcon = de.query(By.css(`.maui-flash-message__dismiss`));

            // ASSERT - eBill switched off initial state
            expect(toggleInput.nativeElement.checked).toBe(false);
            expect(flashMessageInform).toBeDefined();
            expect(flashMessageSuccess).toBeNull();
            expect(dismissIcon).toBeDefined();

            // ACT - toggle eBill
            spies.updateBillDeliveryMethodPreference.and.returnValue(Observable.of(true));
            toggleInput.triggerEventHandler('click', null);
            fixture.detectChanges();

            // ASSERT - eBill swtiched on state
            expect(toggleInput.nativeElement.checked).toBe(true);
            expect(flashMessageInform).toBeNull();
            expect(flashMessageSuccess).toBeDefined();
            expect(dismissIcon).toBeDefined();
        });
    });

    describe('contact details feature flag is turned on', () => {
        beforeEach(() => {
            spies.getFeatureFlag.and.returnValue(Observable.of(true));
        });

        it('should display the Update link for postal bill delivery method', () => {
            // ARRANGE
            comp.eBillingModels = [createEbillingComponentModel('123456', BillDeliveryMethodType.Postal)];

            // ACT
            fixture.detectChanges();

            const updateLink = de.query(By.css('.main-card-options__toggle__link'));
            const toggleInput = de.query(By.css('.maui-toggle--active__input'));
            const flashMessageInform = de.query(By.css('.maui-flash-message--Inform'));

            // ASSERT
            expect(toggleInput.nativeElement.checked).toBe(false);
            expect(flashMessageInform).toBeDefined();
            expect(updateLink).toBeDefined();
            expect(updateLink.nativeElement.innerText).toContain('Update');
            expect(updateLink.nativeElement.getAttribute('href')).toBe(`/settings/contactdetails/ebilling/${123456}`);
        });

        it('should disable toggle and display provide email address if email address is invalid', () => {
            // ARRANGE
            let businessPartners: BusinessPartnerModel[] = [{
                businessPartnerNumber: 'BP00001',
                phone: '0417 635 283',
                mobile: '0417 635 283',
                hasDateOfBirth: false,
                email: 'bob.jane@gmail......com',
                firstName: 'Bob',
                lastName: 'Jane',
            }];
            comp.eBillingModels = [createEbillingComponentModel('123456', BillDeliveryMethodType.Email, null, businessPartners)];

            // ACT
            fixture.detectChanges();

            const updateLink = de.query(By.css('.main-card-options__toggle__link'));
            const toggleInput = de.query(By.css('.maui-toggle--active__input'));
            const disabledToggle = de.query(By.css('.maui-toggle--disabled'));

            // ASSERT
            expect(toggleInput.nativeElement.checked).toBe(true);
            expect(disabledToggle).toBeDefined();
            expect(updateLink).toBeDefined();
            expect(updateLink.nativeElement.innerText).toContain('Please provide an email address');
        });

        it (`should prevent email address editing and show web chat when hasMultipleBusinessPartners true and 'Email' Bill Delivery Method`, () => {
            // ARRANGE
            let contactDetails: ContactDetailModel = {
                hasMultipleBusinessPartners: true,
                businessPartners: [{
                    businessPartnerNumber: 'BP00001',
                    phone: '0417 635 283',
                    mobile: '0417 635 283',
                    hasDateOfBirth: false,
                    email: 'bob.jane@gmail.com',
                    firstName: 'Bob',
                    lastName: 'Jane',
                }, {
                    businessPartnerNumber: 'BP00002',
                    phone: '0417 635 283',
                    mobile: '0417 635 283',
                    hasDateOfBirth: false,
                    email: 'jane.bob@testcom',
                    firstName: 'Jane',
                    lastName: 'Bob',
                }]
            };
            comp.eBillingModels = [createEbillingComponentModel('123456', BillDeliveryMethodType.Email, contactDetails)];

            // ACT
            fixture.detectChanges();

            // ASSERT
            const updateLink = de.query(By.css('.main-card-options__toggle__link'));
            const disabledToggle = de.query(By.css('.maui-toggle--disabled'));
            const webChat = de.query(By.css('agl-ebilling-multi-business-partner-web-chat'));

            expect(updateLink).toBeNull();
            expect(disabledToggle).toBeDefined();
            expect(webChat.nativeElement).toBeDefined();
        });

        it (`should not display the toggle if the contract is on Mandatory Ebilling`, () => {
            // ARRANGE
            let accountViewModel = new AccountViewModel('123456', [new ContractViewModel()]);
            accountViewModel.contracts[0].isMandatoryEBilling = true;
            comp.eBillingModels = [createEbillingComponentModel('123456', BillDeliveryMethodType.Email, null, null, accountViewModel)];

            // ACT
            fixture.detectChanges();

            // ASSERT
            const activeToggleComponent = de.query(By.css('.maui-toggle--active'));
            const disabledToggleComponent = de.query(By.css('.maui-toggle--disabled'));

            expect(activeToggleComponent).toBeNull();
            expect(disabledToggleComponent).toBeNull();
        });
    });

    let createEbillingComponentModel = (
        accountNumber: string = '123456',
        billDeliveryMethodType: BillDeliveryMethodType = BillDeliveryMethodType.Email,
        contactDetail: ContactDetailModel = null,
        businessPartners: BusinessPartnerModel[] = null,
        accountViewModel: AccountViewModel = null
        ): EBillingComponentModel => {

            if (businessPartners === null) {
                businessPartners = [{
                    businessPartnerNumber: 'BP00001',
                    phone: '0417 635 283',
                    mobile: '0417 635 283',
                    hasDateOfBirth: false,
                    email: 'bob.jane@gmail.com',
                    firstName: 'Bob',
                    lastName: 'Jane',
                }];
            }

            if (contactDetail === null) {
                contactDetail = {
                    hasMultipleBusinessPartners: false,
                    businessPartners: businessPartners
                };
            }

            if (accountViewModel === null) {
                accountViewModel = new AccountViewModel(accountNumber);
            }

            let billDeliveryContactDetailModel: BillDeliveryContactDetailModel = {
                accountNumber: accountNumber,
                billDeliveryPreference: billDeliveryMethodType,
                contactDetails: contactDetail,
            };

            return new EBillingComponentModel(billDeliveryContactDetailModel, accountViewModel);
    };
});
