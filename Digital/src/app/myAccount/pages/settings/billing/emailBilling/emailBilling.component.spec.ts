import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { MyAccountMaterialModule } from '../../../../modules/my-account.material.module';
import { EBillingMultiBPWebChatModule } from './eBillingMultiBPWebChat/eBillingMultiBPWebChat.module';

import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { AlertComponent } from '../../../../../shared/component/alert/alert.component';
import { ConfigService } from '../../../../../shared/service/config.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { DocumentService } from '../../../../../shared/service/document.service';
import { DataLayerStubService } from '../../../../../test/stubs/dataLayer.stub.service';
import { MauiFlashMessageModule } from '../../../../maui/flashMessage/flashMessage.module';
import { FeatureFlagService } from '../../../../services/featureFlag.service';
import { FeatureFlagMockService } from '../../../../services/mock/featureflag.mock.service';
import { BillDeliveryMethodType } from '../../../../services/settings/model/billDeliveryMethodType';
import { ContactDetailsStateService, IContactDetailsStateService } from '../../contactDetails/contactDetailsState.service';
import { ContactDetailsUpdateConfirmationModule } from '../../contactDetails/contactDetailsUpdateConfirmation/contactDetailsUpdateConfirmation.module';
import { BillDeliveryModeChangedEventArgs } from '../emailBilling/billDeliveryModeChangedEventArgs';
import { EmailBillingComponent } from '../emailBilling/emailBilling.component';
import { EmailBillingComponentModel } from '../emailBilling/emailBillingComponentModel';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * @deprecated: the new EBilling component should be used moving forward
 * The new Manage Account Information Architecture (IA) has the Notifications page which has the eBilling component using the Maui-Toggle
 */
describe('Settings Billing EmailBilling Component', () => {
    let comp: EmailBillingComponent;
    let fixture: ComponentFixture<EmailBillingComponent>;
    let de: DebugElement;
    let contractAccountNumber = '123456789';
    let emailAddress = 'john.smith@hotmail.com';

    describe('Test Component Reaction To Initial State', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    EmailBillingComponent,
                    AlertComponent,
                ],
                providers: [
                    ConfigService,
                    DocumentService,
                    { provide: FeatureFlagService, useClass: FeatureFlagMockService },
                    { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                    { provide: IContactDetailsStateService, useClass: ContactDetailsStateService },
                    { provide: DataLayerService, useClass: DataLayerStubService }
                ],
                imports: [
                    MyAccountMaterialModule,
                    HttpModule,
                    RouterTestingModule,
                    MauiFlashMessageModule,
                    EBillingMultiBPWebChatModule,
                    ContactDetailsUpdateConfirmationModule,
                    HttpClientTestingModule,
                ]
            });

            fixture = TestBed.createComponent(EmailBillingComponent);
            comp = fixture.componentInstance;
            fixture.componentInstance.ebillEnabled = true;
            let featureFlagService = fixture.debugElement.injector.get(FeatureFlagService);
            spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));
        });

        it('should show the \'Can\'t retrieve your data\' error message given an undefined Bill Delivery Method', () => {
            // Arrange
            comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, /* , NO 4TH ARG */);
            de = fixture.debugElement;
            // Act
            fixture.detectChanges();
            // Assert
            let alertElement = de.query(By.css('.alert.alert--error'));
            expect(alertElement).toBeDefined('alertElement');
            let headingElement = alertElement.query(By.css('.alert__text--heading'));
            let bodyElement = alertElement.query(By.css('.alert__text--body'));
            const expectedHeadingText = 'Sorry we can\'t retrieve your data right now.';
            const expectedBodyText = 'Please reload the page and try again.';
            expect(headingElement.nativeElement.textContent).toBe(expectedHeadingText, 'headingElement');
            expect(bodyElement.nativeElement.textContent).toBe(expectedBodyText, 'headingElement');
        });
        it('should show the \'Can\'t retrieve your ebill settings\' error message given NotApplicable Bill Delivery Method', () => {
            // Arrange
            comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.NotApplicable);
            de = fixture.debugElement;
            // Act
            fixture.detectChanges();
            // Assert
            let alertElement = de.query(By.css('.alert.alert--error'));
            expect(alertElement).toBeDefined('alertContainer');
            let headingElement = alertElement.query(By.css('.alert__text--heading'));
            let bodyElement = alertElement.query(By.css('.alert__text--body'));
            const expectedHeadingText = 'Sorry we can\'t retrieve your ebill settings.';
            const expectedBodyText = 'Please chat with us and we will be happy to help.';
            expect(headingElement.nativeElement.textContent).toBe(expectedHeadingText, 'headingElement');
            expect(bodyElement.nativeElement.textContent).toBe(expectedBodyText, 'headingElement');
        });
        it('should show the \'Please login to your bank\' info message given BPayView Bill Delivery Method', () => {
            // Arrange
            comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.BPayView);
            de = fixture.debugElement;
            // Act
            fixture.detectChanges();
            // Assert
            let alertElement = de.query(By.css('.alert.alert--inform'));
            expect(alertElement).toBeDefined('alertContainer');
            let headingElement = alertElement.query(By.css('.alert__text--heading'));
            let bodyElement = alertElement.query(By.css('.alert__text--body'));
            const expectedHeadingText = 'You are on BPayView.';
            const expectedBodyText = 'Please log into your banking institutions website to view your bill.';
            expect(headingElement.nativeElement.textContent).toBe(expectedHeadingText, 'headingElement');
            expect(bodyElement.nativeElement.textContent).toBe(expectedBodyText, 'headingElement');
        });

        let deliveryMethodsThatTheUserCannotChange = [BillDeliveryMethodType.NotApplicable, BillDeliveryMethodType.BPayView, undefined];
        let deliveryMethodsThatTheUserCanChange = [BillDeliveryMethodType.Postal, BillDeliveryMethodType.Email];

        deliveryMethodsThatTheUserCannotChange.forEach(
            (deliveryMethod) => {
                it('should NOT show the toggle buttons given the \'' + BillDeliveryMethodType[deliveryMethod] + '\' Bill Delivery Method', () => {
                    // Arrange
                    comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, deliveryMethod);
                    de = fixture.debugElement;
                    // Act
                    fixture.detectChanges();
                    // Assert
                    let buttonContainerElement = de.query(By.css('.paperless-bill-controls'));
                    expect(buttonContainerElement).toBeNull('buttonContainerElement');
                });
            });

        deliveryMethodsThatTheUserCanChange.forEach(
            (deliveryMethod) => {
                it('should show the toggle buttons given the \'' + BillDeliveryMethodType[deliveryMethod] + '\' Bill Delivery Method', () => {
                    // Arrange
                    comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, deliveryMethod);
                    de = fixture.debugElement;
                    // Act
                    fixture.detectChanges();
                    // Assert
                    let buttonContainerElement = de.query(By.css('.paperless-bill-controls'));
                    expect(buttonContainerElement).toBeDefined('buttonContainerElement');
                });
            });

        it('should show an info message about fees for paper bills given the \'Postal\' Bill Delivery Method', () => {
            // Arrange
            comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Postal);
            de = fixture.debugElement;
            // Act
            fixture.detectChanges();
            // Assert
            let container = de.query(By.css('.paperless-bill-off'));
            let line1 = container.query(By.css('.paperless-bill-off__note .line-1'));
            let line2 = container.query(By.css('.paperless-bill-off__note .line-2'));
            expect(line1.nativeElement.textContent).toBe('A $1.75 fee (inc GST) may be charged for each paper bill we mail you.');
            expect(line2.nativeElement.textContent).toBe('Switch to free paperless bills.');
        });

        it('should show a message about delivering bills to \'' + emailAddress + '\' given the \'Email\' Bill Delivery Method', () => {
            // Arrange
            comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Email);
            de = fixture.debugElement;
            // Act
            fixture.detectChanges();
            // Assert
            let container = de.query(By.css('.paperless-bill-email-address'));
            expect(container.nativeElement.textContent).toContain('Energy bills are delivered by email to:' + emailAddress);
            let link = de.query(By.css('.paperless-bill-on__edit-email-address'));
            expect(link.nativeElement.getAttribute('href')).toBe(`/settings/contactdetails/ebilling/${contractAccountNumber}`);
        });

        for (let value of ['', 'invalid.email@address@.com']) {
            it(`should show a message about adding an email address when email address is \'${value}\'`, () => {
                // Arrange
                comp.model = new EmailBillingComponentModel(contractAccountNumber, value, false, 1, BillDeliveryMethodType.Email);
                de = fixture.debugElement;
                // Act
                fixture.detectChanges();
                // Assert
                let container = de.query(By.css('.paperless-bill-email-address'));
                expect(container.nativeElement.textContent).toContain('Please provide an email address');

                let message = de.query(By.css('.paperless-bill__invalid-email'));
                expect(container.nativeElement).toBeTruthy();

                let link = de.query(By.css('.paperless-bill-on__edit-email-address'));
                expect(link.nativeElement.getAttribute('href')).toBe(`/settings/contactdetails/ebilling/${contractAccountNumber}`);
            });
        }

        it('should prevent email address editing and show web chat when hasMultipleBusinessPartners true and \'Postal\' Bill Delivery Method', () => {
            // Arrange
            comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, true, 1, BillDeliveryMethodType.Postal);
            de = fixture.debugElement;
            // Act
            fixture.detectChanges();
            // Assert
            let editLink = de.query(By.css('.paperless-bill-off__edit-email-address'));
            expect(editLink).toBeFalsy();

            let webChat = de.query(By.css('.paperless-bill-off__multi-bp-web-chat'));
            expect(webChat.nativeElement).toBeTruthy();
        });

        it('should prevent email address editing and show web chat when hasMultipleBusinessPartners true and \'Email\' Bill Delivery Method', () => {
            // Arrange
            comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, true, 1, BillDeliveryMethodType.Email);
            de = fixture.debugElement;
            // Act
            fixture.detectChanges();
            // Assert
            let editLink = de.query(By.css('.paperless-bill-on__edit-email-address'));
            expect(editLink).toBeFalsy();

            let webChat = de.query(By.css('.paperless-bill-on__multi-bp-web-chat'));
            expect(webChat.nativeElement).toBeTruthy();
        });

        it('should show the Off button selected given the \'Postal\' Bill Delivery Method', () => {
            // Arrange
            comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Postal);
            de = fixture.debugElement;
            // Act
            fixture.detectChanges();
            // Assert
            let toggleOff = de.query(By.css('.paperless-bill-toggle__off'));
            expect(toggleOff.classes['active']).toBeTruthy();
        });

        it('should show the On button selected given the \'Email\' Bill Delivery Method', () => {
            // Arrange
            comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Email);
            de = fixture.debugElement;
            // Act
            fixture.detectChanges();
            // Assert
            let toggleOff = de.query(By.css('.paperless-bill-toggle__on'));
            expect(toggleOff.nativeElement.classList).toContain('active');
        });

        it('should NOT show the toggle buttons given that ebilling is mandatory', () => {
            // Arrange
            comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Email, true);
            de = fixture.debugElement;
            // Act
            fixture.detectChanges();
            // Assert
            let buttonContainerElement = de.query(By.css('.paperless-bill-controls'));
            expect(buttonContainerElement).toBeNull('buttonContainerElement');
        });

    });

    describe('Interaction Tests', () => {
        describe('BillDeliveryModeChanged Event Emission', () => {
            beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [
                        EmailBillingComponent,
                        AlertComponent
                    ],
                    providers: [
                        ConfigService,
                        { provide: FeatureFlagService, useClass: FeatureFlagMockService },
                        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                        { provide: IContactDetailsStateService, useClass: ContactDetailsStateService },
                        { provide: DataLayerService, useClass: DataLayerStubService }
                    ],
                    imports: [
                        MyAccountMaterialModule,
                        RouterTestingModule,
                        MauiFlashMessageModule,
                        EBillingMultiBPWebChatModule,
                        ContactDetailsUpdateConfirmationModule
                    ]
                });

                fixture = TestBed.createComponent(EmailBillingComponent);
                comp = fixture.componentInstance;
                let featureFlagService = fixture.debugElement.injector.get(FeatureFlagService);
                spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));
            });

            it('should emit an event with the correct properties when On is clicked', () => {
                // Arrange
                let receivedEventArgs: BillDeliveryModeChangedEventArgs;
                comp.BillDeliveryModeChanged.subscribe(
                    (eventArgs: BillDeliveryModeChangedEventArgs) => {
                        receivedEventArgs = eventArgs;
                    }
                );
                comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Postal);
                // Act
                fixture.detectChanges();
                // Assert
                de = fixture.debugElement;
                let onButtonElement = de.query(By.css('.paperless-bill-toggle__on'));
                onButtonElement.triggerEventHandler('click', null);
                expect(receivedEventArgs).toBeDefined('receivedEventArgs');
                expect(receivedEventArgs.contractAccountNumber).toEqual(contractAccountNumber, 'receivedEventArgs.contractAccountNumber');
                expect(receivedEventArgs.billingPreference).toEqual(BillDeliveryMethodType.Email, 'receivedEventArgs.billingPreference');
            });
            it('should emit an event with the correct properties when Off is clicked', () => {
                // Arrange
                let receivedEventArgs: BillDeliveryModeChangedEventArgs;
                comp.BillDeliveryModeChanged.subscribe(
                    (eventArgs: BillDeliveryModeChangedEventArgs) => {
                        receivedEventArgs = eventArgs;
                    }
                );
                comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Email);
                // Act
                fixture.detectChanges();
                // Assert
                de = fixture.debugElement;
                let offButtonElement = de.query(By.css('.paperless-bill-toggle__off'));
                offButtonElement.triggerEventHandler('click', null);
                expect(receivedEventArgs).toBeDefined('receivedEventArgs');
                expect(receivedEventArgs.contractAccountNumber).toEqual(contractAccountNumber, 'receivedEventArgs.contractAccountNumber');
                expect(receivedEventArgs.billingPreference).toEqual(BillDeliveryMethodType.Postal, 'receivedEventArgs.billingPreference');
            });
            it('should emit an event with the correct properties when slider is slide right', () => {
                // Arrange
                let receivedEventArgs: BillDeliveryModeChangedEventArgs;
                comp.BillDeliveryModeChanged.subscribe(
                    (eventArgs: BillDeliveryModeChangedEventArgs) => {
                        receivedEventArgs = eventArgs;
                    }
                );
                comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Postal);
                // Act
                fixture.detectChanges();
                // Assert
                de = fixture.debugElement;
                let sliderElement = de.query(By.css('.paperless-bill-slider'));
                sliderElement.triggerEventHandler('change', null);
                fixture.detectChanges();
                expect(receivedEventArgs).toBeDefined('receivedEventArgs');
                expect(receivedEventArgs.contractAccountNumber).toEqual(contractAccountNumber, 'receivedEventArgs.contractAccountNumber');
                expect(receivedEventArgs.billingPreference).toEqual(BillDeliveryMethodType.Email, 'receivedEventArgs.billingPreference');
            });
            it('should emit an event with the correct properties when slider is slid left', () => {
                // Arrange
                let receivedEventArgs: BillDeliveryModeChangedEventArgs;
                comp.BillDeliveryModeChanged.subscribe(
                    (eventArgs: BillDeliveryModeChangedEventArgs) => {
                        receivedEventArgs = eventArgs;
                    }
                );
                comp.model = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Email);
                // Act
                fixture.detectChanges();
                // Assert
                de = fixture.debugElement;
                let sliderElement = de.query(By.css('.paperless-bill-slider'));
                sliderElement.triggerEventHandler('change', null);
                fixture.detectChanges();
                expect(receivedEventArgs).toBeDefined('receivedEventArgs');
                expect(receivedEventArgs.contractAccountNumber).toEqual(contractAccountNumber, 'receivedEventArgs.contractAccountNumber');
                expect(receivedEventArgs.billingPreference).toEqual(BillDeliveryMethodType.Postal, 'receivedEventArgs.billingPreference');
            });
        });
        describe('When button is Off and is then turned On', () => {
            beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [
                        EmailBillingComponent,
                        AlertComponent
                    ],
                    providers: [
                        ConfigService,
                        { provide: FeatureFlagService, useClass: FeatureFlagMockService },
                        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                        { provide: IContactDetailsStateService, useClass: ContactDetailsStateService },
                        { provide: DataLayerService, useClass: DataLayerStubService }
                    ],
                    imports: [
                        MyAccountMaterialModule,
                        RouterTestingModule,
                        MauiFlashMessageModule,
                        EBillingMultiBPWebChatModule,
                        ContactDetailsUpdateConfirmationModule,
                        HttpClientTestingModule,
                    ]
                });

                fixture = TestBed.createComponent(EmailBillingComponent);
                comp = fixture.componentInstance;
                let featureFlagService = fixture.debugElement.injector.get(FeatureFlagService);
                spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));
            });

            it('should turn On if change was persisted', () => {
                // Arrange
                let viewModel = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Postal);
                comp.model = viewModel;
                comp.BillDeliveryModeChanged.subscribe(
                    (eventArgs: BillDeliveryModeChangedEventArgs) => {
                        viewModel.beginTransition();
                        viewModel.endTransition(); // This persists the change
                    }
                );
                fixture.detectChanges();
                de = fixture.debugElement;
                let onButtonElement = de.query(By.css('.paperless-bill-toggle__on'));
                let offButtonElement = de.query(By.css('.paperless-bill-toggle__off'));
                // Act
                onButtonElement.triggerEventHandler('click', null);
                fixture.detectChanges();
                // Assert
                expect(offButtonElement.nativeElement.classList).not.toContain('active');
                expect(onButtonElement.nativeElement.classList).toContain('active');
            });
            it('should remain Off if change was NOT persisted', () => {
                // Arrange
                let viewModel = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Postal);
                comp.model = viewModel;
                comp.BillDeliveryModeChanged.subscribe(
                    (eventArgs: BillDeliveryModeChangedEventArgs) => {
                        viewModel.beginTransition();
                        viewModel.failTransition(); // This prevents the change persisting
                    }
                );
                fixture.detectChanges();
                de = fixture.debugElement;
                let onButtonElement = de.query(By.css('.paperless-bill-toggle__on'));
                let offButtonElement = de.query(By.css('.paperless-bill-toggle__off'));
                // Act
                onButtonElement.triggerEventHandler('click', null);
                fixture.detectChanges();
                // Assert
                expect(offButtonElement.nativeElement.classList).toContain('active');
                expect(onButtonElement.nativeElement.classList).not.toContain('active');

            });
            it('should show an error if change was NOT persisted', () => {
                // Arrange
                let viewModel = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Postal);
                comp.model = viewModel;
                comp.BillDeliveryModeChanged.subscribe(
                    (eventArgs: BillDeliveryModeChangedEventArgs) => {
                        viewModel.beginTransition();
                        viewModel.failTransition(); // This prevents the change persisting
                    }
                );
                fixture.detectChanges();
                de = fixture.debugElement;
                let onButtonElement = de.query(By.css('.paperless-bill-toggle__on'));
                // Act
                onButtonElement.triggerEventHandler('click', null);
                fixture.detectChanges();
                // Assert
                let alertElement = de.query(By.css('.alert.alert--error'));
                expect(alertElement).toBeDefined('alertElement');
                let headingElement = alertElement.query(By.css('.alert__text--heading'));
                let bodyElement = alertElement.query(By.css('.alert__text--body'));
                const expectedHeadingText = 'Well, that didn’t go to plan.';
                const expectedBodyText = 'Sorry, we couldn’t save your preference. Please give it another try.';
                expect(headingElement.nativeElement.textContent).toBe(expectedHeadingText, 'headingElement');
                expect(bodyElement.nativeElement.textContent).toBe(expectedBodyText, 'headingElement');
            });

            let testData = [
                ['blank', ''],
                ['invalid', 'invalid....@agl.com.au']
            ];
            for (let val of testData) {
                it(`should prevent turning on when email address is ${val[0]}`, () => {
                    comp.model = new EmailBillingComponentModel(contractAccountNumber, val[1], false, 1, BillDeliveryMethodType.Postal);
                    fixture.detectChanges();

                    de = fixture.debugElement;
                    let onButtonElement = de.query(By.css('.paperless-bill-toggle__on'));

                    expect(onButtonElement.nativeElement.classList).toContain('not-clickable');
                    expect(onButtonElement.nativeElement.classList).not.toContain('active');
                });
            }
        });
        describe('When button is On and is then turned Off', () => {
            beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [
                        EmailBillingComponent,
                        AlertComponent
                    ],
                    providers: [
                        ConfigService,
                        { provide: FeatureFlagService, useClass: FeatureFlagMockService },
                        { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                        { provide: IContactDetailsStateService, useClass: ContactDetailsStateService },
                        { provide: DataLayerService, useClass: DataLayerStubService }
                    ],
                    imports: [
                        MyAccountMaterialModule,
                        RouterTestingModule,
                        MauiFlashMessageModule,
                        EBillingMultiBPWebChatModule,
                        ContactDetailsUpdateConfirmationModule
                    ]
                });

                fixture = TestBed.createComponent(EmailBillingComponent);
                comp = fixture.componentInstance;
                let featureFlagService = fixture.debugElement.injector.get(FeatureFlagService);
                spyOn(featureFlagService, 'featureFlagged').and.returnValue(Observable.of(true));
            });

            it('should turn Off if change was persisted', () => {
                // Arrange
                let viewModel = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Email);
                comp.model = viewModel;
                comp.BillDeliveryModeChanged.subscribe(
                    (eventArgs: BillDeliveryModeChangedEventArgs) => {
                        viewModel.beginTransition();
                        viewModel.endTransition(); // This persists the change
                    }
                );
                fixture.detectChanges();
                de = fixture.debugElement;
                let onButtonElement = de.query(By.css('.paperless-bill-toggle__on'));
                let offButtonElement = de.query(By.css('.paperless-bill-toggle__off'));
                // Act
                offButtonElement.triggerEventHandler('click', null);
                fixture.detectChanges();
                // Assert
                expect(offButtonElement.nativeElement.classList).toContain('active');
                expect(onButtonElement.nativeElement.classList).not.toContain('active');
            });
            it('should remain On if change was NOT persisted', () => {
                // Arrange
                let viewModel = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Email);
                comp.model = viewModel;
                comp.BillDeliveryModeChanged.subscribe(
                    (eventArgs: BillDeliveryModeChangedEventArgs) => {
                        viewModel.beginTransition();
                        viewModel.failTransition(); // This prevents the change persisting
                    }
                );
                fixture.detectChanges();
                de = fixture.debugElement;
                let onButtonElement = de.query(By.css('.paperless-bill-toggle__on'));
                let offButtonElement = de.query(By.css('.paperless-bill-toggle__off'));
                // Act
                offButtonElement.triggerEventHandler('click', null);
                fixture.detectChanges();
                // Assert
                expect(offButtonElement.nativeElement.classList).not.toContain('active');
                expect(onButtonElement.nativeElement.classList).toContain('active');
            });
            it('should show an error if change was NOT persisted', () => {
                // Arrange
                let viewModel = new EmailBillingComponentModel(contractAccountNumber, emailAddress, false, 1, BillDeliveryMethodType.Postal);
                comp.model = viewModel;
                comp.BillDeliveryModeChanged.subscribe(
                    (eventArgs: BillDeliveryModeChangedEventArgs) => {
                        viewModel.beginTransition();
                        viewModel.failTransition(); // This prevents the change persisting
                    }
                );
                fixture.detectChanges();
                de = fixture.debugElement;
                let offButtonElement = de.query(By.css('.paperless-bill-toggle__off'));
                // Act
                offButtonElement.triggerEventHandler('click', null);
                fixture.detectChanges();
                // Assert
                let alertElement = de.query(By.css('.alert.alert--error'));
                expect(alertElement).toBeDefined('alertElement');
                let headingElement = alertElement.query(By.css('.alert__text--heading'));
                let bodyElement = alertElement.query(By.css('.alert__text--body'));
                const expectedHeadingText = 'Well, that didn’t go to plan.';
                const expectedBodyText = 'Sorry, we couldn’t save your preference. Please give it another try.';
                expect(headingElement.nativeElement.textContent).toBe(expectedHeadingText, 'headingElement');
                expect(bodyElement.nativeElement.textContent).toBe(expectedBodyText, 'headingElement');
            });
        });
    });
});
