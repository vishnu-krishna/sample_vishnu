import { DebugElement }          from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule }             from '@angular/http';
import { MatIconRegistry }        from '@angular/material/icon';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { DomSanitizer }           from '@angular/platform-browser';
import { RouterTestingModule   }  from '@angular/router/testing';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';

import { Observable            } from 'rxjs/Observable';

import { AlertComponent }         from '../../../../shared/component/alert/alert.component';
import { LoadingComponent }       from '../../../../shared/loaders/loading.component';
import { ApiService }             from '../../../../shared/service/api.service';
import { IMessageBusService }     from '../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { MessageBusService }      from '../../../../shared/service/messageBus.service';
import { DataLayerStubService } from '../../../../test/stubs/dataLayer.stub.service';
import { ModalService }           from '../../../modal/modal.service';
import { IAccountServiceMA } from '../../../services/account.service';
import { LocalStorageService }    from '../../../services/localStorage.service';
import { IPaymentMethodsService } from '../../../services/settings/paymentMethods.service.interface';
import { MyWalletService }        from '../myWallet/myWallet.service';
import { MyWalletComponent }      from './myWallet.component';
import { TestData }               from './myWallet.component.data';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Settings MyWallet Component', () => {
    let comp: MyWalletComponent;
    let fixture: ComponentFixture<MyWalletComponent>;
    let de: DebugElement;
    let paymentMethodsServiceSpy: any;
    let apiServiceSpy: any;
    let dataLayerService: any;
    let mockAccountsData = [{
        contracts: [{}]
    }];

    beforeEach(() => {
        paymentMethodsServiceSpy = jasmine.createSpyObj('paymentMethodsServiceSpy', ['getPaymentMethods']);
        apiServiceSpy = jasmine.createSpyObj('apiServiceSpy', ['getContactDetail']);

        let iAccountServiceMAStub = {
            getAccounts: () => {
                throw new Error('iAccountServiceMAStub.getAccounts has not been mocked properly.');
            }
        };

        TestBed.configureTestingModule({
            declarations: [
                MyWalletComponent,
                AlertComponent,
                LoadingComponent
            ],
            imports: [
                MyAccountMaterialModule,
                RouterTestingModule,
                HttpModule,
                HttpClientTestingModule,
            ],
            providers: [
                ModalService,
                { provide: IPaymentMethodsService, useValue: paymentMethodsServiceSpy },
                { provide: IMessageBusService, useClass: MessageBusService },
                { provide: ApiService, useValue: apiServiceSpy },
                { provide: IAccountServiceMA, useValue: iAccountServiceMAStub },
                { provide: DataLayerService, useClass: DataLayerStubService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                LocalStorageService,
                MyWalletService
            ]
        });

        fixture = TestBed.createComponent(MyWalletComponent);
        comp = fixture.componentInstance;

        let accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(mockAccountsData));
        spyOn(dataLayerService, 'pushPaymentSuccess');

        let iconRegistry: MatIconRegistry = fixture.debugElement.injector.get(MatIconRegistry);
        let sanitizer: DomSanitizer = fixture.debugElement.injector.get(DomSanitizer);
        iconRegistry.addSvgIcon('icon-payment-method-add', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_payment_method_add.svg'));
        iconRegistry.addSvgIcon('icon-close-blue', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_close_blue.svg'));
        iconRegistry.addSvgIcon('icon-mastercard', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_mastercard.svg'));
        iconRegistry.addSvgIcon('icon-visa', sanitizer.bypassSecurityTrustResourceUrl('svg/ico-visa.svg'));
    });

    describe('When user has a single business partner', () => {
        xit('should show Visa Card', () => {
            // Arrange
            paymentMethodsServiceSpy.getPaymentMethods.and.returnValue(Observable.of(TestData.singleVisaCreditCard));
            apiServiceSpy.getContactDetail.and.returnValue(Observable.of(TestData.contactDetailForCustomerWithSingleBusinessPartner));
            // Act
            fixture.detectChanges();
            de = fixture.debugElement;
            // Assert
            expect(paymentMethodsServiceSpy.getPaymentMethods).toHaveBeenCalled();
        });
        xit('should show Mastercard', () => {
            // Arrange
            paymentMethodsServiceSpy.getPaymentMethods.and.returnValue(Observable.of(TestData.singleMastercardCreditCard));
            apiServiceSpy.getContactDetail.and.returnValue(Observable.of(TestData.contactDetailForCustomerWithSingleBusinessPartner));
            // Act
            fixture.detectChanges();
            // Assert
            de = fixture.debugElement;
            expect(paymentMethodsServiceSpy.getPaymentMethods).toHaveBeenCalled();
        });
        xit('shouldn\'t flag expired component', () => {
            // Arrange
            paymentMethodsServiceSpy.getPaymentMethods.and.returnValue(Observable.of(TestData.singleMastercardCreditCard));
            apiServiceSpy.getContactDetail.and.returnValue(Observable.of(TestData.contactDetailForCustomerWithSingleBusinessPartner));
            // Act
            fixture.detectChanges();
            // Assert
            de = fixture.debugElement;
            expect(de.nativeElement.getElementsByClassName('my-wallet--delete-method expired').length >= 1).toBeFalsy();
        });
    });
});
