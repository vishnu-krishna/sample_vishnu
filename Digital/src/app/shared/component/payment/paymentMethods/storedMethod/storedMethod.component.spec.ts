import { DebugElement }          from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule }                       from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { RouterTestingModule   } from '@angular/router/testing';
import { MyAccountMaterialModule } from '../../../../../myAccount/modules/my-account.material.module';

import { Observable            } from 'rxjs/Observable';

import { IMyWalletService }        from '../../../../../myAccount/pages/settings/myWallet/myWallet.service.interface';
import { IAccountServiceMA } from '../../../../../myAccount/services/account.service';
import { IPaymentMethodsService } from '../../../../../myAccount/services/settings/paymentMethods.service.interface';
import { AlertComponent }         from '../../../../../shared/component/alert/alert.component';
import { ApiService }             from '../../../../../shared/service/api.service';
import { IMessageBusService }     from '../../../../../shared/service/contract/imessageBus.service';
import { MessageBusService }      from '../../../../../shared/service/messageBus.service';
import { DataLayerStubService } from '../../../../../test/stubs/dataLayer.stub.service';
import { DataLayerService } from '../../../../service/dataLayer.service';
import { StoredMethodPaymentComponent }      from './storedMethod.component';
import { TestData } from './storedMethod.testData';
import { HttpClientTestingModule } from '@angular/common/http/testing';

xdescribe('Payment Modal - Stored method tests', () => {
    let comp: StoredMethodPaymentComponent;
    let fixture: ComponentFixture<StoredMethodPaymentComponent>;
    let de: DebugElement;
    let paymentMethodsServiceSpy: any;
    let accountsService;
    let myWalletService;
    let apiServiceSpy: any;
    let myWalletServiceSpy: any;
    let dataLayerService: any;
    let mockAccountsData = [{
        contracts: [{}]
    }];

    beforeEach(() => {
        paymentMethodsServiceSpy = jasmine.createSpyObj('paymentMethodsServiceSpy', ['getPaymentMethods']);
        apiServiceSpy = jasmine.createSpyObj('apiServiceSpy', ['getContactDetail']);
        myWalletServiceSpy = jasmine.createSpyObj('myWalletServiceSpy', ['getStoredPaymentMethods', 'getValidPaymentMethods']);

        let iAccountServiceMAStub = {
            getAccounts: () => {
                throw new Error('iAccountServiceMAStub.getAccounts has not been mocked properly.');
            }
        };
        let iMyWalletServiceStub = {
            getStoredPaymentMethods: () => {
                throw new Error('iMyWalletServiceStub.getStoredPaymentMethods has not been mocked properly.');
            },
            getValidPaymentMethods: (paymentMethods) => {
                throw new Error('iMyWalletServiceStub.getValidPaymentMethods has not been mocked properly.');
            }
        };

        TestBed.configureTestingModule({
            declarations: [
                StoredMethodPaymentComponent,
                AlertComponent
            ],
            imports: [
                MyAccountMaterialModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: ApiService, useValue: apiServiceSpy },
                { provide: IMessageBusService, useClass: MessageBusService },
                { provide: IPaymentMethodsService, useValue: paymentMethodsServiceSpy },
                { provide: IAccountServiceMA, useValue: iAccountServiceMAStub },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: IMyWalletService, useValue: iMyWalletServiceStub },
                { provide: DataLayerService, useClass: DataLayerStubService },
                HttpModule
            ]
        });

        fixture = TestBed.createComponent(StoredMethodPaymentComponent);
        comp = fixture.componentInstance;

        accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        myWalletService = fixture.debugElement.injector.get(IMyWalletService);
        dataLayerService = fixture.debugElement.injector.get(DataLayerService);
        spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(mockAccountsData));
        spyOn(dataLayerService, 'pushPaymentError');
    });

    describe('When a customer has no saved methods', () => {
        it('should\'nt show any buttons or the -or-', () => {
            spyOn(myWalletService, 'getStoredPaymentMethods').and.returnValue(Observable.of(TestData.noReturnedMethods));
            spyOn(myWalletService, 'getValidPaymentMethods').and.returnValue(TestData.noReturnedMethods);
            fixture.detectChanges();
            expect(comp.cardsEmpty).toBeTruthy();
        });
    });

    describe('When a customer has saved methods', () => {
        it('should show a VISA card with -or- underneath', () => {
            spyOn(myWalletService, 'getStoredPaymentMethods').and.returnValue(Observable.of(TestData.singleValidVisaCreditCard));
            spyOn(myWalletService, 'getValidPaymentMethods').and.returnValue(TestData.singleValidVisaCreditCard);
            fixture.detectChanges();
            let getButtonTitle = fixture.nativeElement.querySelectorAll('button')[0].innerText;
            expect(getButtonTitle).toBe('VISA 3456');
            expect(comp.cardsLoaded).toBeTruthy();
        });

        it('should show a MASTER card with -or- underneath', () => {
            spyOn(myWalletService, 'getStoredPaymentMethods').and.returnValue(Observable.of(TestData.singleValidMastercardCreditCard));
            spyOn(myWalletService, 'getValidPaymentMethods').and.returnValue(TestData.singleValidMastercardCreditCard);            fixture.detectChanges();
            let getButtonTitle = fixture.nativeElement.querySelectorAll('button')[0].innerText;
            expect(getButtonTitle).toBe('MASTERCARD 9012');
            expect(comp.cardsLoaded).toBeTruthy();
        });
    });

});
