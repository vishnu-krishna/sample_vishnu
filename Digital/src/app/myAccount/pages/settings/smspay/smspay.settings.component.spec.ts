import { DebugElement } from '@angular/core';
import { By, DomSanitizer } from '@angular/platform-browser';
import { ApiStubService } from '../../../../test/stubs/api.stub.service';
import { AlertMessages } from './../../../../shared/messages/alertMessages';
import { ConfigStubService } from './../../../../test/stubs/config.stub.service';
import { FeatureFlagMockService } from './../../../services/mock/featureflag.mock.service';
import { SMSPaySettingsComponent } from './smspay.settings.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

import { HttpModule } from '@angular/http';
import { MatIconRegistry } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { IAccountServiceMA } from '../../../../myAccount/services/account.service';
import { ApiService } from '../../../../shared/service/api.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { ContentService } from '../../../../shared/service/content.service';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { ModalService } from '../../../modal/modal.service';
import { FeatureFlagService } from '../../../services/featureFlag.service';
import { IPaymentMethodsService } from '../../../services/settings/paymentMethods.service.interface';
import { IMyWalletService } from '../myWallet/myWallet.service.interface';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestData } from '../../../../shared/component/paymentArrangement/paymentArrangement.component.data';
import { PaymentArrangementSettingsViewModel } from '../../../../shared/component/paymentArrangement/paymentArrangement.settings.service';
import { IPaymentArrangementSettingsService } from '../../../../shared/component/paymentArrangement/paymentArrangement.settings.service.interface';
import { SetUpPaymentArrangementResultMessage } from '../../../../shared/messages/setUpPaymentArrangementResultMessage';
import { SwitchPaymentArrangementResultMessage } from '../../../../shared/messages/switchPaymentArrangementResult.message';
import { DataLayerService } from '../../../../shared/service/dataLayer.service';
import { DataLayerStubService } from '../../../../test/stubs/dataLayer.stub.service';
import { ModalServiceStub } from '../../../../test/stubs/modal.stub.service';
import { SurveyServiceStub } from '../../../../test/stubs/survey.stub.service';
import { SurveyService } from '../../../services/survey.service';
import { SMSPayModule } from './smspay.module';

import { Mock } from 'ts-mocks';
import { IPaymentArrangementStateService } from '../../../../shared/component/paymentArrangement/paymentArrangementState.service';
import { DocumentService } from '../../../../shared/service/document.service';
import { IDecisioningService } from '../../../services/contract/idecisioning.service';
import { ContactDetailsStateService, IContactDetailsStateService } from '../contactDetails/contactDetailsState.service';

describe('SMS Pay component', () => {
    let comp: SMSPaySettingsComponent;
    let fixture: ComponentFixture<SMSPaySettingsComponent>;
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
    let mockDecisioningService: Mock<IDecisioningService>;
    let stateService: any;

    describe('Component tests', () => {
        beforeEach(() => {
            (window as any).lpTag = {
                newPage: () => {
                    return;
                }
            };
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
                    throw new Error('aa.listen has not been mocked properly.');
                }
            };

            mockDecisioningService = new Mock<IDecisioningService>();
            mockDecisioningService.setup((x) => x.isSmsPayEntryPointAvailableForCustomer).is(() => Observable.of(true));

            TestBed.configureTestingModule({
                declarations: [],
                imports: [
                    SMSPayModule,
                    HttpModule,
                    RouterTestingModule
                ],
                providers: [
                    { provide: FeatureFlagService, useClass: FeatureFlagMockService },
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
                    { provide: IDecisioningService, useValue: mockDecisioningService.Object },
                    { provide: IAccountServiceMA, useValue: iaccountServiceStub },
                    { provide: IContactDetailsStateService, useClass: ContactDetailsStateService },
                    IPaymentMethodsService,
                    AlertMessages,
                    SwitchPaymentArrangementResultMessage,
                    SetUpPaymentArrangementResultMessage,
                    PaymentArrangementSettingsViewModel,
                    ContentService,
                    ConfigService,
                    DocumentService
                ]
            });

            fixture = TestBed.createComponent(SMSPaySettingsComponent);
            comp = fixture.componentInstance;

            featureFlagService = fixture.debugElement.injector.get(FeatureFlagService);
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
                    spyOn(messageBusService, 'listen').and.returnValue(Observable.of({ isSuccessful: true }));
                    comp.apiService.businessPartnerNumber = [];
                    comp.apiService.accountLoadedStatus = new ReplaySubject(1);
                    comp.apiService.contactLoadedStatus = new ReplaySubject(1);
                    comp.isSingleView = true;
                });

                describe('with no mobile number', () => {
                    beforeEach(() => {
                        spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestData.contactWithSingleBPButNoMobileNumber));
                    });

                    it('should show intro text when sms pay is not setup', () => {
                        spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.singleSmsPaySettingViewModelWithNoSmsPay));

                        fixture.detectChanges();
                        de = fixture.debugElement;

                        let introText = de.query(By.css('.pa-settings__sign-up-message > .smspay-text')).nativeElement;
                        expect(introText).toBeDefined();
                        expect(introText.textContent).toContain('Select your preferred payment method and we\'ll text you a few days');
                    });
                });

                describe('with mobile number', () => {
                    beforeEach(() => {
                        spyOn(apiService, 'getContactDetail').and.returnValue(Observable.of(TestData.contactWithSingleBPAndMobileNumber));
                    });

                    it('should show intro text when sms pay is not setup', () => {
                        spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.singleSmsPaySettingViewModelWithNoSmsPay));

                        fixture.detectChanges();
                        de = fixture.debugElement;

                        let introText = de.query(By.css('.pa-settings__sign-up-message > .smspay-text')).nativeElement;
                        expect(introText).toBeDefined();
                        expect(introText.textContent).toContain('Select your preferred payment method and we\'ll text you on 0400 000 333 a few days');
                    });

                    it('should show cancel next to header for single account', () => {
                        spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.singleSmsPaySettingViewModelWithSmsPay));

                        fixture.detectChanges();
                        de = fixture.debugElement;

                        let cancelButton = de.query(By.css('.pa-settings__header-cta')).nativeElement;
                        expect(cancelButton).toBeDefined();
                    });

                    describe('with a valid mobile number', () => {
                        it('should show set up button when SMS Pay is not setup', () => {
                            spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.singleSmsPaySettingViewModelWithNoSmsPay));

                            fixture.detectChanges();
                            de = fixture.debugElement;

                            comp.mobileNumberValid = true;
                            fixture.detectChanges();

                            let setupButton = de.query(By.css('.pa-settings__set-up-button')).nativeElement;
                            expect(setupButton).toBeDefined();
                        });

                        it('should show update mobile number link', () => {
                            spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.singleSmsPaySettingViewModelWithNoSmsPay));

                            fixture.detectChanges();
                            de = fixture.debugElement;

                            comp.mobileNumberValid = true;
                            fixture.detectChanges();

                            let updateButton = de.query(By.css('.sms-pay__mobile-container-update-mobile-link')).nativeElement;
                            expect(updateButton).toBeDefined();
                        });
                    });

                    describe('with an invalid mobile number', () => {
                        it('should show Add mobile number link', () => {
                            spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.singleSmsPaySettingViewModelWithNoSmsPay));

                            fixture.detectChanges();
                            de = fixture.debugElement;

                            comp.mobileNumberValid = false;
                            fixture.detectChanges();

                            let addMobileNumberButton = de.query(By.css('.sms-pay__mobile-container-add-mobile-link')).nativeElement;
                            expect(addMobileNumberButton).toBeDefined();
                        });

                        it('should not show set up button when SMS Pay is not setup', () => {
                            spyOn(paymentArrangementSettingsService, 'getPaymentArrangementViewModel').and.returnValue(Observable.of(TestData.singleSmsPaySettingViewModelWithNoSmsPay));

                            fixture.detectChanges();
                            de = fixture.debugElement;

                            comp.mobileNumberValid = false;
                            fixture.detectChanges();

                            let setupButton = de.query(By.css('.pa-settings__set-up-button'));
                            expect(setupButton).toBe(null);
                        });
                    });
                });
            });
        });

        describe('mobile number validation for sms pay', () => {
            describe('is not valid', () => {
                describe('when not 10 digits', () => {
                    it('should set mobileNumberValid to false', () => {
                        expect(comp.isMobileNumberValid('040411122')).toBeFalsy();
                    });
                });
                describe('when not all numeric', () => {
                    it('should set mobileNumberValid to false', () => {
                        expect(comp.isMobileNumberValid('040411122a')).toBeFalsy();
                    });
                });
                describe('when not starting with "04"', () => {
                    it('should set mobileNumberValid to false', () => {
                        expect(comp.isMobileNumberValid('0304111222')).toBeFalsy();
                    });
                });
                describe('with invalid +14 international format', () => {
                    it('should set mobileNumberValid to false', () => {
                        expect(comp.isMobileNumberValid('+1404111222')).toBeFalsy();
                    });
                });
                describe('with spaces', () => {
                    it('should set mobileNumberValid to false', () => {
                        expect(comp.isMobileNumberValid('0408 123-222')).toBeFalsy();
                    });
                });
                describe('with hiphens', () => {
                    it('should set mobileNumberValid to false', () => {
                        expect(comp.isMobileNumberValid('0408-123-222')).toBeFalsy();
                    });
                });
                describe('with spaces and hiphens', () => {
                    it('should set mobileNumberValid to false', () => {
                        expect(comp.isMobileNumberValid('1800 123-222')).toBeFalsy();
                    });
                });
                describe('with brackets', () => {
                    it('should set mobileNumberValid to false', () => {
                        expect(comp.isMobileNumberValid('(03) 9310 1234')).toBeFalsy();
                    });
                });
            });
            describe('is valid', () => {
                describe('with spaces', () => {
                    it('should set mobileNumberValid to true', () => {
                        expect(comp.isMobileNumberValid('0404 111 222')).toBeTruthy();
                    });
                    it('should set mobileNumberValid to true', () => {
                        expect(comp.isMobileNumberValid('0404   111  222')).toBeTruthy();
                    });
                });
                describe('with no spaces', () => {
                    it('should set mobileNumberValid to true', () => {
                        expect(comp.isMobileNumberValid('0404111222')).toBeTruthy();
                    });
                });
                describe('with +614 international format', () => {
                    it('should set mobileNumberValid to true', () => {
                        expect(comp.isMobileNumberValid('+61404111222')).toBeTruthy();
                    });
                });
            });
        });
    });
});
