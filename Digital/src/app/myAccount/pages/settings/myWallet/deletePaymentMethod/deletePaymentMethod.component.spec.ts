import { DebugElement }                     from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule }                       from '@angular/http';
import { MatIconRegistry }                  from '@angular/material/icon';
import { MATERIAL_SANITY_CHECKS }           from '@angular/material/core';
import { By, DomSanitizer }                 from '@angular/platform-browser';
import { Observable }                       from 'rxjs/Observable';
import { DeleteCreditCardResult }           from '../../../../../shared/messages/deleteCreditCardResult.message';
import { DeletePaymentMethodLinkPaymentArrangementResult } from '../../../../../shared/messages/deletePaymentMethodLinkPaymentArrangementResult.message';
import { IMessageBusService }               from '../../../../../shared/service/contract/imessageBus.service';
import { ModalService }                     from '../../../../modal/modal.service';
import { CommonPipesModule }                from '../../../../modules/commonPipes.module';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { AccountViewModel, ContractViewModel, IAccountServiceMA } from '../../../../services/account.service';
import { IPaymentMethodsService }           from '../../../../services/settings/paymentMethods.service.interface';
import { IMyWalletService }                 from '../../myWallet/myWallet.service.interface';
import { TestData } from '../myWallet.component.data';
import { AccountDetailsDeletePaymentMethodComponent } from './accountDetails.deletePaymentMethod/accountDetails.deletePaymentMethod.component';
import { DeletePaymentMethodComponent }     from './deletePaymentMethod.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Settings MyWallet DeletePaymentMethodComponent Component', () => {
    let comp: DeletePaymentMethodComponent;
    let fixture: ComponentFixture<DeletePaymentMethodComponent>;
    let de: DebugElement;
    let argsData: any;
    let accountsService: any;
    let myWalletService: any;

    beforeEach(() => {
        argsData = {
            paymentMethodType: 'credit card',
            directDebitContractAccounts: [ 123456789 ],
            oneTouchPayContractAccounts: [],
            id: 'ZZZ6666',
            reference: 'xxxx xxxx xxxx 3456',
            shortReference: '3456',
            title: 'Visa',
            validPaymentMethods: []
        };

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
            },
            checkPendingPayments: () => {
                throw new Error('iMyWalletServiceStub.checkPendingPayments has not been mocked properly.');
            }
        };

        TestBed.configureTestingModule({
            declarations: [
                DeletePaymentMethodComponent,
                AccountDetailsDeletePaymentMethodComponent
            ],
            imports: [
                MyAccountMaterialModule,
                HttpModule,
                CommonPipesModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: IAccountServiceMA, useValue: iAccountServiceMAStub },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: IMyWalletService, useValue: iMyWalletServiceStub },
                IPaymentMethodsService,
                ModalService,
                IMessageBusService,
                DeleteCreditCardResult,
                DeletePaymentMethodLinkPaymentArrangementResult
            ]
        });

        fixture = TestBed.createComponent(DeletePaymentMethodComponent);
        comp = fixture.componentInstance;

        let iconRegistry: MatIconRegistry = fixture.debugElement.injector.get(MatIconRegistry);
        let sanitizer: DomSanitizer = fixture.debugElement.injector.get(DomSanitizer);
        iconRegistry.addSvgIcon('icon-elec-enabled', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_elec_enabled.svg'));
        iconRegistry.addSvgIcon('icon-gas-enabled', sanitizer.bypassSecurityTrustResourceUrl('svg/icon_gas_enabled.svg'));
        accountsService = fixture.debugElement.injector.get(IAccountServiceMA);
        myWalletService = fixture.debugElement.injector.get(IMyWalletService);
    });

    describe('When user has 1 direct debit service linked to a credit card', () => {

        // Scenario 1
        describe('Scenario 1 - with no other stored valid credit cards', () => {
            beforeEach(async(() => {
                spyOn(myWalletService, 'getStoredPaymentMethods').and.returnValue(Observable.of(TestData.noReturnedMethods));
                spyOn(myWalletService, 'getValidPaymentMethods').and.returnValue(TestData.noReturnedMethods);
                spyOn(myWalletService, 'checkPendingPayments').and.returnValue(Observable.of(false));
            }));

            // Scenario 1A
            describe('and has 1 direct debit CA linked and 1 CA overall', () => {
                it('should show options to completely delete card and cancel direct debit', () => {
                    // Arrange
                    let contractAccount = createContractAccountViewModel();
                    comp.args = argsData;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccount));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio'));
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown'));
                    let subBodyTextElm = de.query(By.css('.delete-pm__sub-body')).nativeElement;
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account'));
                    expect(radioButtonsElm).toBeFalsy();
                    expect(radioButtonsWithDropDownElm).toBe(null);
                    expect(accountDetailElm).toBe(null);
                    expect(subBodyTextElm.textContent).toBe(`You won't be able to use this credit card for any payment arrangements or online payments unless you add it back into your Wallet.`);
                });
            });

            // Scenario 1B
            describe('and has 1 direct debit CA linked and >1 CA overall', () => {
                it('should show options with account details to completely delete card and cancel direct debit', () => {
                    // Arrange
                    let contractAccounts = [];
                    let contractAccount1 = createContractAccountViewModel();
                    let contractAccount2 = createContractAccountViewModel();
                    contractAccount2.accountNumber = '987654321';
                    contractAccounts.push(contractAccount1);
                    contractAccounts.push(contractAccount2);
                    comp.args = argsData;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccounts));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio'));
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown'));
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account')).nativeElement;
                    let addressAccountNoElm = de.query(By.css('.accountdetails-pm__account--account-no')).nativeElement;
                    let addressElm = de.query(By.css('.accountdetails-pm__account--address')).nativeElement;
                    expect(radioButtonsElm).toBe(null);
                    expect(radioButtonsWithDropDownElm).toBe(null);
                    expect(accountDetailElm).not.toBe(null);
                    expect(addressAccountNoElm.textContent).toBe('Account no: 123 456 789');
                    expect(addressElm.textContent).toBe('123 Fake St');
                });
            });

            // Scenario 1B - edge scenario
            describe('and has 1 direct debit CA with >1 contract linked and >1 CA overall', () => {
                it('should show options with total number of debit debit CAs to completely delete card and cancel direct debits', () => {
                    // Arrange
                    let contractAccounts = [];
                    let contractAccount1 = createContractAccountViewModel();
                    let contractAccount2 = createContractAccountViewModel();
                    contractAccount1.groupedAddress = '';
                    contractAccount2.accountNumber = '987654321';
                    contractAccounts.push(contractAccount1);
                    contractAccounts.push(contractAccount2);
                    comp.args = argsData;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccounts));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio'));
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown'));
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account')).nativeElement;
                    let addressAccountNoElm = de.query(By.css('.accountdetails-pm__account--account-no')).nativeElement;
                    let addressElm = de.query(By.css('.accountdetails-pm__account--address')).nativeElement;
                    expect(radioButtonsElm).toBe(null);
                    expect(radioButtonsWithDropDownElm).toBe(null);
                    expect(accountDetailElm).not.toBe(null);
                    expect(addressAccountNoElm.textContent).toBe('Account no: 123 456 789');
                    expect(addressElm.textContent).toBe('and associated addresses');
                });
            });

            // Scenario 1C
            describe('and has >1 direct debit CA linked and >1 CA overall', () => {
                it('should show options with total number of debit debit CAs to completely delete card and cancel direct debits', () => {
                    // Arrange
                    let contractAccounts = [];
                    let contractAccount1 = createContractAccountViewModel();
                    let contractAccount2 = createContractAccountViewModel();
                    argsData.directDebitContractAccounts.push(987654321);
                    contractAccount2.accountNumber = '987654321';
                    contractAccounts.push(contractAccount1);
                    contractAccounts.push(contractAccount2);
                    comp.args = argsData;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccounts));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio'));
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown'));
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account')).nativeElement;

                    let subBodyTextElm = de.query(By.css('.delete-pm__sub-body'));
                    expect(radioButtonsElm).toBe(null);
                    expect(radioButtonsWithDropDownElm).toBe(null);
                    expect(accountDetailElm).not.toBe(null);
                    expect(subBodyTextElm.nativeElement.textContent).toBe(`You won't be able to use this credit card for any payment arrangements or online payments unless you add it back into your Wallet.`);
                });
            });
        });

        // Scenario 2
        describe('Scenario 2 - with 1 other stored valid credit card', () => {

            beforeEach(async(() => {
                spyOn(myWalletService, 'getStoredPaymentMethods').and.returnValue(Observable.of(TestData.singleValidMastercardCreditCard));
                spyOn(myWalletService, 'getValidPaymentMethods').and.returnValue(TestData.singleValidMastercardCreditCard);
                spyOn(myWalletService, 'checkPendingPayments').and.returnValue(Observable.of(false));
            }));

            // Scenario 2A
            describe('and has 1 direct debit CA linked and 1 CA overall', () => {
                it('should show options to link direct debit to another credit card and cancel direct debit', () => {
                    // Arrange
                    let contractAccount = createContractAccountViewModel();
                    comp.args = argsData;
                    comp.hasOnePaymentArrangement = true;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccount));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio')).nativeElement;
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown'));
                    let radioButtonWithRelinkOptionElm = de.query(By.css('.delete-pm__radio-relink')).nativeElement;
                    let subBodyTextElm = de.query(By.css('.delete-pm__sub-body'));
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account'));
                    expect(radioButtonsElm).not.toBe(null);
                    expect(radioButtonsWithDropDownElm).toBe(null);
                    expect(accountDetailElm).toBe(null);
                    expect(radioButtonWithRelinkOptionElm.textContent).toContain('Link my payment arrangement to my Mastercard xxxx 8742 instead');
                });
            });

            // Scenario 2B
            describe('and has 1 direct debit CA linked and >1 CA overall', () => {
                it('should show options with account details to completely delete card and cancel direct debit', () => {
                    // Arrange
                    let contractAccounts = [];
                    let contractAccount1 = createContractAccountViewModel();
                    let contractAccount2 = createContractAccountViewModel();
                    contractAccount2.accountNumber = '987654321';
                    contractAccounts.push(contractAccount1);
                    contractAccounts.push(contractAccount2);
                    comp.args = argsData;
                    comp.hasOnePaymentArrangement = true;
                    comp.hasMultipleCA = true;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccounts));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio')).nativeElement;
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown'));
                    let radioButtonWithRelinkOptionElm = de.query(By.css('.delete-pm__radio-relink')).nativeElement;
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account')).nativeElement;
                    let addressAccountNoElm = de.query(By.css('.accountdetails-pm__account--account-no')).nativeElement;
                    let addressElm = de.query(By.css('.accountdetails-pm__account--address')).nativeElement;
                    expect(radioButtonsElm).not.toBe(null);
                    expect(radioButtonsWithDropDownElm).toBe(null);
                    expect(accountDetailElm).not.toBe(null);
                    expect(addressAccountNoElm.textContent).toContain('Account no: 123 456 789');
                    expect(addressElm.textContent).toContain('123 Fake St');
                    expect(radioButtonWithRelinkOptionElm.textContent).toContain('Link my payment arrangement to my Mastercard xxxx 8742 instead');
                });
            });

            // Scenario 2B - edge scenario
            describe('and has 1 direct debit CA with >1 contract linked and >1 CA overall', () => {
                it('should show options with account details to completely delete card and cancel direct debit', () => {
                    // Arrange
                    let contractAccounts = [];
                    let contractAccount1 = createContractAccountViewModel();
                    let contractAccount2 = createContractAccountViewModel();
                    contractAccount1.groupedAddress = '';
                    contractAccount2.accountNumber = '987654321';
                    contractAccounts.push(contractAccount1);
                    contractAccounts.push(contractAccount2);
                    comp.args = argsData;
                    comp.hasOnePaymentArrangement = true;
                    comp.hasMultipleCA = true;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccounts));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio')).nativeElement;
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown'));
                    let radioButtonWithRelinkOptionElm = de.query(By.css('.delete-pm__radio-relink')).nativeElement;
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account')).nativeElement;
                    let addressAccountNoElm = de.query(By.css('.accountdetails-pm__account--account-no')).nativeElement;
                    let addressElm = de.query(By.css('.accountdetails-pm__account--address')).nativeElement;
                    expect(radioButtonsElm).not.toBe(null);
                    expect(radioButtonsWithDropDownElm).toBe(null);
                    expect(accountDetailElm).not.toBe(null);
                    expect(addressAccountNoElm.textContent).toContain('Account no: 123 456 789');
                    expect(addressElm.textContent).toContain('and associated addresses');
                    expect(radioButtonWithRelinkOptionElm.textContent).toContain('Link my payment arrangement to my Mastercard xxxx 8742 instead');
                });
            });

            // Scenario 2C
            describe('and has >1 direct debit CA linked and >1 CA overall', () => {
                it('should show options with num of direct debit CAs to completely delete card and cancel direct debit', () => {
                    // Arrange
                    argsData.directDebitContractAccounts.push(987654321);
                    let contractAccounts = [];
                    let contractAccount1 = createContractAccountViewModel();
                    let contractAccount2 = createContractAccountViewModel();
                    contractAccount2.accountNumber = '987654321';
                    contractAccounts.push(contractAccount1);
                    contractAccounts.push(contractAccount2);
                    comp.args = argsData;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccounts));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio')).nativeElement;
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown'));
                    let radioButtonWithRelinkOptionElm = de.query(By.css('.delete-pm__radio-relink')).nativeElement;
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account')).nativeElement;
                    let subBodyTextElm = de.query(By.css('.delete-pm__sub-body'));
                    expect(radioButtonsElm).not.toBe(null);
                    expect(radioButtonsWithDropDownElm).toBe(null);
                    expect(accountDetailElm).not.toBe(null);
                    expect(radioButtonWithRelinkOptionElm.textContent).toContain('Link my payment arrangements to my Mastercard xxxx 8742 instead');
                });
            });
        });

        // Scenario 3
        describe('Scenario 3 - with has >1 other stored valid credit card', () => {

            beforeEach(async(() => {
                spyOn(myWalletService, 'getStoredPaymentMethods').and.returnValue(Observable.of(TestData.multipleValidCreditCard));
                spyOn(myWalletService, 'getValidPaymentMethods').and.returnValue(TestData.multipleValidCreditCard);
                spyOn(myWalletService, 'checkPendingPayments').and.returnValue(Observable.of(false));
            }));

            // Scenario 3A
            describe('and has 1 direct debit CA linked and 1 CA overall', () => {
                it('should show options to link direct debit to another credit card and cancel direct debit', () => {
                    // Arrange
                    let contractAccount = createContractAccountViewModel();
                    comp.args = argsData;
                    comp.hasOnePaymentArrangement = true;
                    comp.showOtherPaymentMethods = false;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccount));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio')).nativeElement;
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown')).nativeElement;
                    let radioButtonWithRelinkOptionElm = de.query(By.css('.delete-pm__radio-relink')).nativeElement;
                    let showOtherPaymentMethodsBtn = de.query(By.css('.show-drop-down')).nativeElement;
                    let dropdownOption1 = de.query(By.css('.dropdown-0')).nativeElement;
                    let dropdownOption2 = de.query(By.css('.dropdown-1')).nativeElement;
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account'));

                    expect(radioButtonsElm).not.toBeNull('radio buttons');
                    expect(radioButtonsWithDropDownElm).not.toBeNull('radioButtonsWithDropDownElm menu');
                    expect(radioButtonWithRelinkOptionElm.textContent).toContain('Link my payment arrangement to another payment method instead');
                    expect(comp.showOtherPaymentMethods).toBeFalsy();
                    expect(accountDetailElm).toBe(null);
                    showOtherPaymentMethodsBtn.click();
                    fixture.detectChanges();
                    expect(comp.showOtherPaymentMethods).toBeTruthy();
                    expect(dropdownOption1.textContent).toContain('Mastercard xxxx 8742');
                    expect(dropdownOption2.textContent).toContain('Visa xxxx 7652');
                });
            });

            // Scenario 3B
            describe('and has 1 direct debit CA linked and >1 CA overall', () => {
                it('should show options with account details to completely delete card and cancel direct debit', () => {
                    // Arrange
                    let contractAccounts = [];
                    let contractAccount1 = createContractAccountViewModel();
                    let contractAccount2 = createContractAccountViewModel();
                    contractAccount2.accountNumber = '987654321';
                    contractAccounts.push(contractAccount1);
                    contractAccounts.push(contractAccount2);
                    comp.args = argsData;
                    comp.hasOnePaymentArrangement = true;
                    comp.hasMultipleCA = true;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccounts));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio')).nativeElement;
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown')).nativeElement;
                    let radioButtonWithRelinkOptionElm = de.query(By.css('.delete-pm__radio-relink')).nativeElement;
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account'));
                    let addressAccountNoElm = de.query(By.css('.accountdetails-pm__account--account-no')).nativeElement;
                    let addressElm = de.query(By.css('.accountdetails-pm__account--address')).nativeElement;
                    let showOtherPaymentMethodsBtn = de.query(By.css('.show-drop-down')).nativeElement;
                    let dropdownOption1 = de.query(By.css('.dropdown-0')).nativeElement;
                    let dropdownOption2 = de.query(By.css('.dropdown-1')).nativeElement;
                    expect(radioButtonsElm).not.toBeNull('radio buttons');
                    expect(radioButtonsWithDropDownElm).not.toBeNull('radioButtonsWithDropDownElm menu');
                    expect(radioButtonWithRelinkOptionElm.textContent).toContain('Link my payment arrangement to another payment method instead');
                    expect(accountDetailElm).not.toBe(null);
                    expect(addressAccountNoElm.textContent).toContain('Account no: 123 456 789');
                    expect(addressElm.textContent).toContain('123 Fake St');
                    expect(comp.showOtherPaymentMethods).toBeFalsy();
                    showOtherPaymentMethodsBtn.click();
                    fixture.detectChanges();
                    expect(comp.showOtherPaymentMethods).toBeTruthy();
                    expect(dropdownOption1.textContent).toContain('Mastercard xxxx 8742');
                    expect(dropdownOption2.textContent).toContain('Visa xxxx 7652');
                });
            });

            // Scenario 3B - edge scenario
            describe('and has 1 direct debit CA with >1 contract linked and >1 CA overall', () => {
                it('should show options with account details to completely delete card and cancel direct debit', () => {
                    // Arrange
                    let contractAccounts = [];
                    let contractAccount1 = createContractAccountViewModel();
                    let contractAccount2 = createContractAccountViewModel();
                    contractAccount1.groupedAddress = '';
                    contractAccount2.accountNumber = '987654321';
                    contractAccounts.push(contractAccount1);
                    contractAccounts.push(contractAccount2);
                    comp.args = argsData;
                    comp.hasOnePaymentArrangement = true;
                    comp.hasMultipleCA = true;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccounts));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio')).nativeElement;
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown')).nativeElement;
                    let radioButtonWithRelinkOptionElm = de.query(By.css('.delete-pm__radio-relink')).nativeElement;
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account')).nativeElement;
                    let addressAccountNoElm = de.query(By.css('.accountdetails-pm__account--account-no')).nativeElement;
                    let addressElm = de.query(By.css('.accountdetails-pm__account--address')).nativeElement;
                    let showOtherPaymentMethodsBtn = de.query(By.css('.show-drop-down')).nativeElement;
                    let dropdownOption1 = de.query(By.css('.dropdown-0')).nativeElement;
                    let dropdownOption2 = de.query(By.css('.dropdown-1')).nativeElement;
                    expect(radioButtonsElm).not.toBeNull('radio buttons');
                    expect(radioButtonsWithDropDownElm).not.toBeNull('radioButtonsWithDropDownElm menu');
                    expect(radioButtonWithRelinkOptionElm.textContent).toContain('Link my payment arrangement to another payment method instead');
                    expect(accountDetailElm).not.toBe(null);
                    expect(addressAccountNoElm.textContent).toContain('Account no: 123 456 789');
                    expect(addressElm.textContent).toContain('and associated addresses');
                    expect(comp.showOtherPaymentMethods).toBeFalsy();
                    showOtherPaymentMethodsBtn.click();
                    fixture.detectChanges();
                    expect(comp.showOtherPaymentMethods).toBeTruthy();
                    expect(dropdownOption1.textContent).toContain('Mastercard xxxx 8742');
                    expect(dropdownOption2.textContent).toContain('Visa xxxx 7652');
                });
            });

            // Scenario 3C
            describe('and has >1 direct debit CA linked and >1 CA overall', () => {
                it('should show options with num of direct debit CAs to completely delete card and cancel direct debit', () => {
                    // Arrange
                    argsData.directDebitContractAccounts.push(987654321);
                    let contractAccounts = [];
                    let contractAccount1 = createContractAccountViewModel();
                    let contractAccount2 = createContractAccountViewModel();
                    contractAccount2.accountNumber = '987654321';
                    contractAccounts.push(contractAccount1);
                    contractAccounts.push(contractAccount2);
                    comp.args = argsData;
                    comp.hasOnePaymentArrangement = true;
                    comp.hasMultipleCA = true;
                    spyOn(accountsService, 'getAccounts').and.returnValue(Observable.of(contractAccounts));
                    // Act
                    fixture.detectChanges();
                    de = fixture.debugElement;
                    // Assert
                    let radioButtonsElm = de.query(By.css('.delete-pm__radio')).nativeElement;
                    let radioButtonsWithDropDownElm = de.query(By.css('.delete-pm__radio-dropdown')).nativeElement;
                    let radioButtonWithRelinkOptionElm = de.query(By.css('.delete-pm__radio-relink')).nativeElement;
                    let accountDetailElm = de.query(By.css('.accountdetails-pm__account')).nativeElement;
                    let subBodyTextElm = de.query(By.css('.delete-pm__radio-header')).nativeElement;
                    let showOtherPaymentMethodsBtn = de.query(By.css('.show-drop-down')).nativeElement;
                    let dropdownOption1 = de.query(By.css('.dropdown-0')).nativeElement;
                    let dropdownOption2 = de.query(By.css('.dropdown-1')).nativeElement;
                    expect(radioButtonsElm).not.toBe(null);
                    expect(radioButtonsWithDropDownElm).not.toBe(null);
                    expect(accountDetailElm).not.toBe(null);
                    expect(radioButtonWithRelinkOptionElm.textContent).toContain('Link my payment arrangements to another payment method instead');
                    showOtherPaymentMethodsBtn.click();
                    fixture.detectChanges();
                    expect(comp.showOtherPaymentMethods).toBeTruthy();
                    expect(dropdownOption1.textContent).toContain('Mastercard xxxx 8742');
                    expect(dropdownOption2.textContent).toContain('Visa xxxx 7652');
                });
            });
        });
    });

    function createContractAccountViewModel(): AccountViewModel {
        let contractAccountViewModel = new AccountViewModel('123456789');
        let groupedAddress = '123 Fake St';
        contractAccountViewModel.groupedAddress = groupedAddress;

        let contract1 = createContractViewModel('12345', 'Electricity', groupedAddress);
        let contract2 = createContractViewModel('23456', 'Gas', groupedAddress);
        contractAccountViewModel.contracts.push(contract1);
        contractAccountViewModel.contracts.push(contract2);
        return contractAccountViewModel;
    }

    function createContractViewModel(contractId: string, fuelType: string, address?: string, isRestriced?: boolean): ContractViewModel {
        let contractViewModel = new ContractViewModel(contractId);
        contractViewModel.address = address ;
        contractViewModel.fuelType = fuelType;
        contractViewModel.isRestricted = isRestriced;
        return contractViewModel;
    }
});
