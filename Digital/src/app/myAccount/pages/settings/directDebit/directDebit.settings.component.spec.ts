import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MatIconRegistry } from '@angular/material/icon';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By, DomSanitizer } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { MyAccountMaterialModule } from '../../../modules/my-account.material.module';
import { AlertMessages } from './../../../../shared/messages/alertMessages';
import { ApiStubService } from './../../../../test/stubs/api.stub.service';
import { ConfigStubService } from './../../../../test/stubs/config.stub.service';
import { FeatureFlagMockService } from './../../../services/mock/featureflag.mock.service';

import { IAccountServiceMA } from '../../../../myAccount/services/account.service';
import { ApiService } from '../../../../shared/service/api.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { ContentService } from '../../../../shared/service/content.service';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { ModalService } from '../../../modal/modal.service';
import { CommonComponentsModule } from '../../../modules/commonComponents.module';
import { CommonPipesModule } from '../../../modules/commonPipes.module';
import { FeatureFlagService } from '../../../services/featureFlag.service';

import { IPaymentMethodsService } from '../../../services/settings/paymentMethods.service.interface';
import { IMyWalletService } from '../myWallet/myWallet.service.interface';
import { DeleteDirectDebitComponent } from './deleteDirectDebit/deleteDirectDebit.component';
import { DirectDebitSettingsComponent } from './directDebit.settings.component';
import { DirectDebitButtonComponent } from './directDebitButton/directDebitButton.component';
import { UpComingDirectDebitComponent } from './upComingDirectDebit/upComingDirectDebit.component';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestData } from '../../../../shared/component/paymentArrangement/paymentArrangement.component.data';
import { PaymentArrangementSettingsViewModel } from '../../../../shared/component/paymentArrangement/paymentArrangement.settings.service';
import { IPaymentArrangementSettingsService } from '../../../../shared/component/paymentArrangement/paymentArrangement.settings.service.interface';
import { IPaymentArrangementStateService } from '../../../../shared/component/paymentArrangement/paymentArrangementState.service';
import { SetUpPaymentArrangementResultMessage } from '../../../../shared/messages/setUpPaymentArrangementResultMessage';
import { SwitchPaymentArrangementResultMessage } from '../../../../shared/messages/switchPaymentArrangementResult.message';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { DataLayerStubService } from '../../../../test/stubs/dataLayer.stub.service';
import { ModalServiceStub } from '../../../../test/stubs/modal.stub.service';
import { SurveyServiceStub } from '../../../../test/stubs/survey.stub.service';
import { SurveyService } from '../../../services/survey.service';
import { IFeatureFlagService } from '../../../services/contract/ifeatureflag.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Direct Debit settings component', () => {
    let comp: DirectDebitSettingsComponent;
    let fixture: ComponentFixture<DirectDebitSettingsComponent>;
    let de: DebugElement;
    let featureFlagService: any;
    let contentService: any;
    let paymentArrangementService: any;
    let accountService: any;
    let paymentMethodService: any;
    let route: any;
    let config: any;
    let apiService: any;
    let modalService: any;
    let paymentArrangementSettingsService: any;
    let myWalletService: any;
    let messageBusService: any;
    let dataLayerService: any;
    let stateService: any;

    describe('Component tests', () => {
        beforeEach(() => {
            let iDirectDebitSettingsServiceStub = {
                getPaymentArrangementViewModel: () => {
                    throw new Error('iDirectDebitSettingsServiceStub.getPaymentArrangementViewModel has not been mocked properly.');
                }
            };
            let iPaymentArrangementSettingsServiceStub = {
                getPaymentArrangementViewModel: () => {
                    throw new Error('iDirectDebitSettingsServiceStub.getPaymentArrangementViewModel has not been mocked properly.');
                }
            };
            let iPaymentArrangementStateServiceStub = {
                isUpdatingAccount: (account: string): boolean => {
                    throw new Error('isUpdatingAccount has not been mocked properly.');
                },
                updateStarted: (account: string) => {
                    throw new Error('updateStarted has not been mocked properly.');
                },
                updateCompleted: (account: string) => {
                    throw new Error('updateCompleted has not been mocked properly.');
                }
            };
            let iMyWalletServiceStub = {
                getStoredPaymentMethods: () => {
                    throw new Error('iMyWalletServiceStub.getStoredPaymentMethods has not been mocked properly.');
                },
                getValidPaymentMethods: () => {
                    throw new Error('iMyWalletServiceStub.getValidPaymentMethods has not been mocked properly.');
                }
            };
            let iMessageBusService = {
                listen: () => {
                    throw new Error('iMessageBusService.listen has not been mocked properly.');
                }
            };
            let iaccountServiceStub = {
                refreshAccounts: () => {
                    throw new Error('accountService.refreshAccounts has not been mocked properly.');
                }
            };

            TestBed.configureTestingModule({
                declarations: [
                    DirectDebitSettingsComponent,
                    DeleteDirectDebitComponent,
                    DirectDebitButtonComponent,
                    UpComingDirectDebitComponent
                ],
                imports: [
                    MyAccountMaterialModule,
                    CommonComponentsModule,
                    CommonPipesModule,
                    HttpModule,
                    RouterTestingModule,
                    HttpClientTestingModule,
                ],
                providers: [
                    { provide: IFeatureFlagService, useClass: FeatureFlagMockService },
                    { provide: ApiService, useClass: ApiStubService },
                    { provide: 'AppContentBranch', useValue: 'selfService' },
                    { provide: ModalService, useClass: ModalServiceStub },
                    { provide: IPaymentArrangementSettingsService, useValue: iPaymentArrangementSettingsServiceStub },
                    { provide: IPaymentArrangementStateService, useValue: iPaymentArrangementStateServiceStub },
                    { provide: IMyWalletService, useValue: iMyWalletServiceStub },
                    { provide: IMessageBusService, useValue: iMessageBusService },
                    { provide: DataLayerService, useClass: DataLayerStubService },
                    { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                    { provide: ConfigService, useClass: ConfigStubService },
                    { provide: SurveyService, useValue: SurveyServiceStub },
                    { provide: IAccountServiceMA, useValue: iaccountServiceStub },
                    IPaymentMethodsService,
                    AlertMessages,
                    SwitchPaymentArrangementResultMessage,
                    SetUpPaymentArrangementResultMessage,
                    PaymentArrangementSettingsViewModel,
                    ContentService,
                    ConfigService
                ]
            });

            fixture = TestBed.createComponent(DirectDebitSettingsComponent);
            comp = fixture.componentInstance;

            featureFlagService = fixture.debugElement.injector.get(IFeatureFlagService);
            apiService = fixture.debugElement.injector.get(ApiService);
            modalService = fixture.debugElement.injector.get(ModalService);
            paymentArrangementSettingsService = fixture.debugElement.injector.get(IPaymentArrangementSettingsService);
            myWalletService = fixture.debugElement.injector.get(IMyWalletService);
            messageBusService = fixture.debugElement.injector.get(IMessageBusService);
            dataLayerService = fixture.debugElement.injector.get(DataLayerService);
            stateService = fixture.debugElement.injector.get(IPaymentArrangementStateService);
            accountService = fixture.debugElement.injector.get(IAccountServiceMA);

            let iconRegistry: MatIconRegistry = fixture.debugElement.injector.get(MatIconRegistry);
            let sanitizer: DomSanitizer = fixture.debugElement.injector.get(DomSanitizer);
            iconRegistry.addSvgIcon('icon-elec-enabled', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_elec_enabled.svg'));
            iconRegistry.addSvgIcon('icon-gas-enabled', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_gas_enabled.svg'));

            spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));
            spyOn(modalService, 'activate');
            spyOn(myWalletService, 'getStoredPaymentMethods').and.returnValue(Observable.of(TestData.myWalletViewModels));
            spyOn(myWalletService, 'getValidPaymentMethods').and.returnValue(Observable.of(TestData.myWalletViewModels));
            spyOn(dataLayerService, 'pushPaymentSuccess');
            spyOn(dataLayerService, 'pushPaymentError');
            spyOn(stateService, 'isUpdatingAccount').and.returnValue(Observable.of(false));
            spyOn(accountService, 'refreshAccounts').and.returnValue(Observable.of({}));
        });

        describe('Modal', () => {
            it('should activate the modal on cancel', () => {
                comp.cancelPaymentArrangement(new PaymentArrangementSettingsViewModel());
                expect(modalService.activate).toHaveBeenCalled();
            });
        });

        describe('Single View Model', () => {
            describe('Single BP', () => {

                beforeEach(() => {
                    spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestData.contactWithSingleBP));
                    spyOn(messageBusService, 'listen').and.returnValue(Observable.of({ isSuccessful: true }));
                    comp.apiService.businessPartnerNumber = [];
                    comp.apiService.accountLoadedStatus = new ReplaySubject(1);
                    comp.apiService.contactLoadedStatus = new ReplaySubject(1);
                });

                it('should show cancel next to header for single account', () => {
                    spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.singleDirectDebitSettingViewModelWithDirectDebit));

                    fixture.detectChanges();
                    de = fixture.debugElement;

                    let cancelButton = de.query(By.css('.pa-settings__header-cta')).nativeElement;
                    expect(cancelButton).toBeDefined();
                });

                it('should show set up button when direct debit is not setup', () => {
                    spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.singleDirectDebitSettingViewModelWithNoDirectDebit));

                    fixture.detectChanges();
                    de = fixture.debugElement;

                    let setupButton = de.query(By.css('.pa-settings__set-up-button')).nativeElement;
                    expect(setupButton).toBeDefined();
                });

                it('should not show cancel direct debit for mandatory direct debit', () => {
                    spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.singleDirectDebitSettingViewModelWithMandatoryDirectDebit));

                    fixture.detectChanges();
                    de = fixture.debugElement;

                    let cancelButton = de.query(By.css('.pa-settings__header-cta'));
                    expect(cancelButton).toBe(null);
                });
            });

            describe('Multi BP', () => {
                beforeEach(() => {
                    comp.apiService.businessPartnerNumber = [];
                    comp.apiService.accountLoadedStatus = new ReplaySubject(1);
                    comp.apiService.contactLoadedStatus = new ReplaySubject(1);
                });

                it('should show contactUs when customer has multipleBP', () => {
                    spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestData.contactWithMultiBP));
                    spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.singleDirectDebitSettingViewModelWithNoDirectDebit));

                    fixture.detectChanges();
                    de = fixture.debugElement;

                    let errorDiv = de.query(By.css('.pa-settings__error')).nativeElement;
                    expect(errorDiv).toBeDefined();
                });
            });
        });

        describe('Multi View Models', () => {
            beforeEach(() => {
                spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestData.contactWithSingleBP));
                spyOn(messageBusService, 'listen').and.returnValue(Observable.of({ isSuccessful: true }));
                comp.apiService.businessPartnerNumber = [];
                comp.apiService.accountLoadedStatus = new ReplaySubject(1);
                comp.apiService.contactLoadedStatus = new ReplaySubject(1);
            });

            it('should show set up button when direct debit is not setup', () => {
                spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.multiDirectDebitSettingViewModelsWithNoDirectDebit));

                fixture.detectChanges();
                de = fixture.debugElement;

                let cancelButton = de.query(By.css('.pa-account__cta--link'));
                let setupButton = de.query(By.css('.pa-account__cta--button')).nativeElement;
                let changeButton = de.query(By.css('.pa-account__payment-method-button'));
                expect(cancelButton).toBe(null);
                expect(setupButton).toBeDefined();
                expect(changeButton).toBe(null);
            });

            it('should show change and delete button when direct debit is setup', () => {
                spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.multiDirectDebitSettingViewModelsWithDirectDebit));

                fixture.detectChanges();
                de = fixture.debugElement;

                let cancelButton = de.query(By.css('.pa-account__cta--link')).nativeElement;
                let setupButton = de.query(By.css('.pa-account__cta--button'));
                let changeButton = de.query(By.css('.pa-account__payment-method-button')).nativeElement;
                expect(cancelButton).toBeDefined();
                expect(setupButton).toBe(null);
                expect(changeButton).toBeDefined();
            });

            it('should not show cancel direct debit for mandatory direct debit ', () => {
                spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.multiDirectDebitSettingViewModelsWithMandatoryDirectDebit));

                fixture.detectChanges();
                de = fixture.debugElement;

                let cancelButton = de.query(By.css('.pa-account__cta--link'));
                let setupButton = de.query(By.css('.pa-account__cta--button'));
                let changeButton = de.query(By.css('.pa-account__payment-method-button')).nativeElement;
                expect(cancelButton).toBe(null);
                expect(setupButton).toBe(null);
                expect(changeButton).toBeDefined();
            });
        });
    });
});
