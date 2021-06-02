import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigService } from './../../../../shared/service/config.service';
import { ConfigStubService } from './../../../../test/stubs/config.stub.service';

import { Component, DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AddSpacesPipe } from '../../../../myAccount/pipes/addSpaces.pipe';
import { FeatureFlagService } from '../../../../myAccount/services/featureFlag.service';
import { BillDeliveryMethodType } from '../../../../myAccount/services/settings/model';
// Immediate dependent components and pipes referenced by BillingComponent's template
import { AccountDetailComponent } from '../../../../myAccount/settings/accountDetail/accountDetail.component';
import { AlertComponent } from '../../../../shared/component/alert/alert.component';
import { LoadingComponent } from '../../../../shared/loaders/loading.component';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { DataLayerStubService } from '../../../../test/stubs/dataLayer.stub.service';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';
import { AddressFormatterPipe } from '../../../pipes/addressFormatter.pipe';
import { ISsmrService } from '../../../services/contract/issmr.service';
import { ContactDetailsStateMockService } from '../../../services/mock/contactDetailsState.mock.service';
import { FeatureFlagMockService } from '../../../services/mock/featureflag.mock.service';
import { SsmrMockService } from '../../../services/mock/ssmr.mock.service';
// Service dependencies of BillingComponent
import { ISettingsService } from '../../../services/settings/settings.service.interface';
import { IContactDetailsStateService } from '../contactDetails/contactDetailsState.service';
import { ContactDetailsUpdateConfirmationModule } from '../contactDetails/contactDetailsUpdateConfirmation/contactDetailsUpdateConfirmation.module';
import { MauiFlashMessageModule } from './../../../maui/flashMessage/flashMessage.module';
import { BillFrequencyComponent } from './billFrequency/billFrequency.component';
// Test Subject
import { BillingComponent } from './billing.component';
// Various required model objects
import { BillingSettingsViewModel } from './billingSettingsViewModel';
import { BillingSettingsViewModelFactory } from './billingSettingsViewModelFactory';
import { BillingSettingsViewModelItem } from './billingSettingsViewModelItem';
import { BillDeliveryModeChangedEventArgs } from './emailBilling/billDeliveryModeChangedEventArgs';
import { EBillingMultiBPWebChatModule } from './emailBilling/eBillingMultiBPWebChat/eBillingMultiBPWebChat.module';
import { EmailBillingComponent } from './emailBilling/emailBilling.component';
import { EmailBillingComponentModel } from './emailBilling/emailBillingComponentModel';
import { EnergyPlansComponent } from './energyPlans/energyPlans.component';
import { MeterReadingComponent } from './meterReading/meterReading.component';
import { MonthlyBillingEntranceComponent } from './monthlyBillingEntrance/monthlyBillingEntrance.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({ selector: 'agl-settings-bill-smoothing-v1', template: `` })
    export class BillSmoothingV1Component {
}

describe('Settings Billing BillingComponent Tests', () => {
    let comp: BillingComponent;
    let fixture: ComponentFixture<BillingComponent>;
    let de: DebugElement;

    let createViewModel = (contractAccountNumber = '123456789',
                           emailAddress = 'john.smith@hotmail.com',
                           initialDeliveryMethod = BillDeliveryMethodType.Postal) => {
        let emailBillingComponentModel =
            new EmailBillingComponentModel(
                contractAccountNumber,
                emailAddress,
                false,
                1,
                initialDeliveryMethod);
        let billingSettingsViewModelItem = new BillingSettingsViewModelItem();
        billingSettingsViewModelItem.emailBillingModel = emailBillingComponentModel;
        let billingSettingsViewModel = new BillingSettingsViewModel();
        billingSettingsViewModel.items.push(billingSettingsViewModelItem);
        return billingSettingsViewModel;
    };

    beforeEach(() => {
        let billingSettingsViewModelFactoryStub = {
            getViewModel(): ReplaySubject<BillingSettingsViewModel> {
                throw new Error('You need to use a jasmine spy to replace this implementation of getViewModel');
            }
        };
        let settingsServiceStub = {
            updateBillDeliveryMethodPreference(contractAccountNumber: string, deliveryMethod: BillDeliveryMethodType): Observable<any> {
                throw new Error('You need to use a jasmine spy to replace this implementation of updateBillDeliveryMethodPreference');
            }
        };
        let featureFlagServiceStub = {
            featureFlagged(manageAccountEnabled): Observable<boolean> {
                throw new Error('You need to use a jasmine spy to replace this implementation of manageAccountEnabled');
            }
        };
        let contactDetailsStateMockService = new ContactDetailsStateMockService();
        contactDetailsStateMockService.canNotifyOfSuccessfulUpdate = () => false; // not applicable to tests in this outer/wrapper component

        TestBed.configureTestingModule({
            declarations: [
                BillingComponent, // The Test Subject. Angular made me include all the others.
                AccountDetailComponent,
                AddSpacesPipe,
                AlertComponent,
                AddSpacesPipe,
                MonthlyBillingEntranceComponent,
                BillFrequencyComponent,
                BillSmoothingV1Component,
                EmailBillingComponent,
                EnergyPlansComponent,
                MeterReadingComponent,
                LoadingComponent,
                AddressFormatterPipe
            ],
            imports: [
                MyAccountMaterialModule,
                HttpModule,
                MauiFlashMessageModule,
                RouterTestingModule,
                MauiFlashMessageModule,
                EBillingMultiBPWebChatModule,
                ContactDetailsUpdateConfirmationModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: ISsmrService, useClass: SsmrMockService },
                { provide: BillingSettingsViewModelFactory, useValue: billingSettingsViewModelFactoryStub },
                { provide: ISettingsService,                useValue: settingsServiceStub },
                { provide: FeatureFlagService,              useClass: FeatureFlagMockService },
                { provide: ConfigService, useClass: ConfigStubService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: IContactDetailsStateService, useValue: contactDetailsStateMockService },
                { provide: DataLayerService, useClass: DataLayerStubService }

            ]
        });
        fixture = TestBed.createComponent(BillingComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should transition the view model to failed state if the Bill Delivery Mode could NOT be saved', () => {
        // SETUP TEST DATA
        let contractAccountNumber = '123456789';
        let emailAddress = 'john.smith@hotmail.com';
        let initialDeliveryMethod = BillDeliveryMethodType.Postal;
        let requestedDeliveryMethod = BillDeliveryMethodType.Email;
        let eventArgs = new BillDeliveryModeChangedEventArgs(contractAccountNumber, requestedDeliveryMethod);
        let billingSettingsViewModel = createViewModel(contractAccountNumber, emailAddress, initialDeliveryMethod);

        // ARRANGE
        // (1) Make the featureFlagService spy return true when isFeatureFlagSettings is called.
        // (2) Make the viewModelFactory spy return billingSettingsViewModel when create is called.
        // (3) Make the settingsService spy  return success when updateBillDeliveryMethodPreference is called
        // (4) Spy on the emailBillingModels transition methods so we can assert they were called/not called later.
        let featureFlagService = de.injector.get(FeatureFlagService);
        spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));
        let billingSettingsViewModelFactory = de.injector.get(BillingSettingsViewModelFactory);
        spyOn(billingSettingsViewModelFactory, 'getViewModel').and.returnValue(Observable.of(billingSettingsViewModel));
        let settingsService = de.injector.get(ISettingsService);
        spyOn(settingsService, 'updateBillDeliveryMethodPreference').and
            .returnValue(Observable.throw({ status: 500, message: 'Test Framework Failure' }));
        let emailBillingModel = billingSettingsViewModel.items[0].emailBillingModel;
        spyOn(emailBillingModel, 'beginTransition').and.callThrough();
        spyOn(emailBillingModel, 'endTransition').and.callThrough();
        spyOn(emailBillingModel, 'failTransition').and.callThrough();

        // ACT
        // Cause ngOnInit to run in the test subject component and the template to be rendered once
        fixture.detectChanges();
        // Manually invoke the handler for the BillDeliveryModeChanged event, supplying the appropriate event args.
        comp.onBillDeliveryModeChanged(eventArgs);
        // Wait for async operations to complete.
        fixture.detectChanges();

        // ASSERT
        expect(settingsService.updateBillDeliveryMethodPreference)
            .toHaveBeenCalledWith(contractAccountNumber, requestedDeliveryMethod);
        expect(emailBillingModel.beginTransition)
            .toHaveBeenCalledTimes(1);
        expect(emailBillingModel.endTransition)
            .not.toHaveBeenCalled();
        expect(emailBillingModel.failTransition)
            .toHaveBeenCalledTimes(1);
    });
    it('should transition the view model to completed state if the Bill Delivery Mode could be saved', () => {
        // SETUP TEST DATA
        let contractAccountNumber = '123456789';
        let emailAddress = 'john.smith@hotmail.com';
        let initialDeliveryMethod = BillDeliveryMethodType.Postal;
        let requestedDeliveryMethod = BillDeliveryMethodType.Email;
        let eventArgs = new BillDeliveryModeChangedEventArgs(contractAccountNumber, requestedDeliveryMethod);
        let billingSettingsViewModel = createViewModel(contractAccountNumber, emailAddress, initialDeliveryMethod);

        // ARRANGE
        // (1) Make the featureFlagService spy return true when isFeatureFlagSettings is called.
        // (2) Make the viewModelFactory spy return billingSettingsViewModel when create is called.
        // (3) Make the settingsService spy  return success when updateBillDeliveryMethodPreference is called.
        // (4) Spy on the emailBillingModels transition methods so we can assert they were called/not called.
        let featureFlagService = de.injector.get(FeatureFlagService);
        spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));
        let billingSettingsViewModelFactory = de.injector.get(BillingSettingsViewModelFactory);
        spyOn(billingSettingsViewModelFactory, 'getViewModel').and.returnValue(Observable.of(billingSettingsViewModel));
        let settingsService = de.injector.get(ISettingsService);
        spyOn(settingsService, 'updateBillDeliveryMethodPreference').and.returnValue(Observable.of({}));
        let emailBillingModel = billingSettingsViewModel.items[0].emailBillingModel;
        spyOn(emailBillingModel, 'beginTransition').and.callThrough();
        spyOn(emailBillingModel, 'endTransition').and.callThrough();
        spyOn(emailBillingModel, 'failTransition').and.callThrough();

        // ACT
        // Cause ngOnInit to run in the test subject component
        fixture.detectChanges();
        // Manually invoke the handler for the BillDeliveryModeChanged event, supplying the appropriate event args.
        comp.onBillDeliveryModeChanged(eventArgs);
        // Wait for async operations to complete.
        fixture.detectChanges();

        // ASSERT
        expect(settingsService.updateBillDeliveryMethodPreference)
            .toHaveBeenCalledWith(contractAccountNumber, requestedDeliveryMethod);
        expect(emailBillingModel.beginTransition)
            .toHaveBeenCalledTimes(1);
        expect(emailBillingModel.endTransition)
            .toHaveBeenCalledTimes(1);
        expect(emailBillingModel.failTransition)
            .not.toHaveBeenCalled();
    });

    it('should hide monthly item if showMonthlyBilling is false', () => {
        // arrange
        const emailModel = new EmailBillingComponentModel('123456789', 'john.smith@hotmail.com', false, 1, BillDeliveryMethodType.Postal);
        const item = new BillingSettingsViewModelItem();
        item.emailBillingModel = emailModel;
        item.showMonthlyBilling = false;
        const model = new BillingSettingsViewModel();
        model.items.push(item);
        let featureFlagService = de.injector.get(FeatureFlagService);
        spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));
        let billingSettingsViewModelFactory = de.injector.get(BillingSettingsViewModelFactory);
        spyOn(billingSettingsViewModelFactory, 'getViewModel').and.returnValue(Observable.of(model));

        // act
        fixture.detectChanges();

        // assert
        let frequencyElem = de.query(By.css('agl-settings-monthly-billing-entrance'));
        expect(frequencyElem).toBe(null);
    });

    it('should not hide bill smoothing panel if Bill Smoothing V2 is turned off', () => {
        // arrange
        const emailModel = new EmailBillingComponentModel('123456789', 'john.smith@hotmail.com', false, 1, BillDeliveryMethodType.Postal);
        const item = new BillingSettingsViewModelItem();
        item.emailBillingModel = emailModel;
        const model = new BillingSettingsViewModel();
        model.items.push(item);
        let featureFlagService = de.injector.get(FeatureFlagService);
        spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));
        let billingSettingsViewModelFactory = de.injector.get(BillingSettingsViewModelFactory);
        spyOn(billingSettingsViewModelFactory, 'getViewModel').and.returnValue(Observable.of(model));

        // act
        fixture.detectChanges();
        comp.billSmoothingV2Enabled = false;
        fixture.detectChanges();

        // assert
        let billSmoothingElem = de.query(By.css('agl-settings-bill-smoothing-v1'));
        expect(billSmoothingElem).not.toBeNull();
    });
});
