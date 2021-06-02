
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { DataLayerService, PageRequireOptionalVariables } from '../../../../../../shared/service/dataLayer.service';
import { FuelChipContract, FuelChipContractAccountDetails, MauiFuelChipFuelContext, MauiFuelChipFuelType } from '../../../../../maui/fuelChip/index';
import { PaymentExtensionFuelChipMockService } from '../../../../../services/mock/paymentExtensionFuelChip.mock.service';
import { PaymentExtensionStateMockService } from '../../../../../services/mock/paymentExtensionState.mock.service';
import { IPaymentExtensionApplication } from '../../../../../services/paymentScheme/paymentExtensionApplication.service';
import { PaymentExtensionAvailableDate, PaymentExtensionContractEligibility, PaymentExtensionIneligibilityReasons } from '../../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { FuelChipData } from '../eligibility/fuelChipData';
import { IPaymentExtensionFuelChipService } from '../eligibility/services/paymentExtensionFuelChip.service';
import { IPaymentExtensionStateService } from '../services/paymentExtensionState.service';
import { PaymentExtensionApplicationComponent } from './paymentExtensionApplication.component';
import { PaymentExtensionApplicationModule } from './paymentExtensionApplication.module';
import { IAccountServiceMA } from '../../../../../services/account.service';
import { AccountMockService } from '../../../../../services/mock/account.mock.service';
import { Mock } from 'ts-mocks/lib';
import { IPaymentAssistanceNavigationPersistedStateService } from '../../services';
import { PaymentAssistanceNavigationStateModel } from '../../models';

class PaymentExtensionApplicationServiceMock {
    public submit(contractNumber: string, extendedDueDate: Date): Observable<boolean> {
        // this is here to allow the testing the return of both true and false values from the api call
        if (contractNumber === '1111') {
            return Observable.of(true);
        } else {
            return Observable.of(false);
        }
    }
}

describe('Payment Extension Component', () => {
    let comp: PaymentExtensionApplicationComponent;
    let fixture: ComponentFixture<PaymentExtensionApplicationComponent>;
    let de: DebugElement;
    let paymentExtensionStateService = new PaymentExtensionStateMockService();
    let paymentExtensionFuelChipService = new PaymentExtensionFuelChipMockService();
    let accountMockService: Mock<IAccountServiceMA>;
    let getAccountsSpy: jasmine.Spy;
    let hasContractPayOnTimeDiscountSpy: jasmine.Spy;

    beforeEach(() => {
        accountMockService = new Mock<IAccountServiceMA>();
        getAccountsSpy = accountMockService
            .setup((x) => x.getAccounts)
            .is(() => {
                return Observable.of(null);
            }).Spy;

        hasContractPayOnTimeDiscountSpy = accountMockService
            .setup((x) => x.hasContractPayOnTimeDiscount)
            .is(() => {
                return null;
            }).Spy;

        const router = {
            navigate: (urls: any[]) => {
                throw new Error('not implemented');
            }
        };

        const routeParams = {
            contractAccountNumber: '/111222333',
            contractNumber: '121212'
        };

        const activatedRouteStub = {
            get params(): Observable<{}> {
                return Observable.of(routeParams);
            }
        };

        const dataLayerService = {
            addOptionalPageVariableForTracking: (page: PageRequireOptionalVariables, key: string, value: string) => {
                throw new Error('addOptionalPageVariableForTracking is not implemented');
            },
            trackExtendingPaymentDueDateFailure: (message: string) => {
                throw new Error('trackExtendingPaymentDueDateFailure is not implemented');
            },
            trackPaymentExtensionDogDoomError: (errorDescription: string) => {
                throw new Error('trackPaymentExtensionDogDoomError is not implemented');
            }
        };

        TestBed.configureTestingModule({
            imports: [ PaymentExtensionApplicationModule, RouterTestingModule ],
            providers: [
                { provide: APP_BASE_HREF, useValue : '/' },
                { provide: IPaymentExtensionStateService, useValue: paymentExtensionStateService },
                { provide: IPaymentExtensionFuelChipService, useValue: paymentExtensionFuelChipService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: IPaymentExtensionApplication, useClass: PaymentExtensionApplicationServiceMock },
                { provide: Router, useValue: router },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: DataLayerService, useValue: dataLayerService },
                { provide: IAccountServiceMA, useValue: accountMockService.Object }
            ]
        });

        fixture = TestBed.createComponent(PaymentExtensionApplicationComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        // accountMockService = TestBed.get(IAccountServiceMA);
        getAccountsSpy.and.returnValue(Observable.of([]));
        hasContractPayOnTimeDiscountSpy.and.returnValue(false);
    });

    describe('Single Extension Option Available', () => {
        beforeEach(() => {
            // ARRANGE
            spyOn(paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(fuelChipDataWithSingleExtensionOption());

            // ACT
            fixture.detectChanges();
        });

        it('should display heading text', () => {
            // ASSERT
            const heading = de.query(By.css('.maui-heading__main'));
            expect(heading.nativeElement.innerHTML).toBe('Extend your bill due date');
        });

        it('should display subheading text', () => {
            // ASSERT
            const subheading = de.query(By.css('.maui-heading__sub'));
            expect(subheading.nativeElement.innerHTML).toBe('Your electricity bill due date will be extended by 7 days.');
        });

        it('should not show all unavailable options', () => {
            // ASSERT
            expect(comp.extensionDates.length).toBe(1);
        });

        it('should not display segmented buttons', () => {
            // ASSERT
            const segmentedButtons = fixture.nativeElement.querySelector('agl-maui-segmented-buttons');
            expect(segmentedButtons).toBeNull();
        });

        it('should display the call us message', () => {
            // ASSERT
            const callUsMessage = de.query(By.css('.opa-extend__call-us-header-message'));
            expect(callUsMessage.nativeElement.innerText).toMatch('If you need more time to pay, please call us on 131 245');
        });

        it('should display \'fueltype bill\' in summary header', () => {
            // ASSERT
            const title = de.query(By.css('.maui-fuel-chip__title'));
            expect(title.nativeElement.textContent).toMatch('Electricity bill');
        });

        it('should display amount due', () => {
            // ASSERT
            const amountDue = de.query(By.css('.opa-extend__summary-amount-due'));
            expect(amountDue.nativeElement.textContent).toMatch('60.00');
        });

        it('should display original due date', () => {
            // ASSERT
            const originalDueDate = de.query(By.css('.opa-extend__summary-original-due-date'));
            expect(originalDueDate.nativeElement.textContent).toMatch('Thu 04 Feb 2016');
        });

        it('should display extended due date', () => {
            // ASSERT
            const extendedDueDate = de.query(By.css('.opa-extend__summary-extended-due-date'));
            expect(extendedDueDate.nativeElement.textContent).toMatch('Thu 11 Feb 2016');
        });
    });

    describe('Multiple Extension Options Available', () => {
        let dataLayerService: DataLayerService;

        beforeEach(() => {
            // ARRANGE
            spyOn(paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(fuelChipDataWithMultipleExtensionOptions());
            dataLayerService = fixture.debugElement.injector.get(DataLayerService);
            spyOn(dataLayerService, 'addOptionalPageVariableForTracking');

            // ACT
            fixture.detectChanges();
        });

        it('should display heading text', () => {
            // ASSERT
            const heading = de.query(By.css('.maui-heading__main'));
            expect(heading.nativeElement.innerHTML).toBe('How much longer do you need?');
        });

        it('should display subheading text', () => {
            // ASSERT
            const subheading = de.query(By.css('.maui-heading__sub'));
            expect(subheading.nativeElement.innerHTML).toBe('Select how many more days you\'ll need to pay your electricity bill.');
        });

        it('should show all available options', () => {
            // ASSERT
            expect(comp.extensionDates.length).toBe(3);
        });

        it('should display segmented buttons with extension options', () => {
            // ASSERT
            const segmentedButtons = fixture.nativeElement.querySelector('agl-maui-segmented-buttons');
            const segmentedButton = fixture.nativeElement.querySelectorAll('agl-maui-segmented-button');
            expect(segmentedButtons).not.toBeNull();
            expect(segmentedButton.length).toBe(3);
        });

        it('should not display the call us message by default', () => {
            // ASSERT
            const segmentedButton = fixture.nativeElement.querySelector('.opa-extend__call-us-message');
            expect(segmentedButton).toBeNull();
        });

        it('should display the extended due date on selection', () => {
            // ACT
            comp.updateExtensionOptions('14');
            fixture.detectChanges();

            // ASSERT
            const extendedDueDate = de.query(By.css('.opa-extend__summary-extended-due-date'));
            expect(extendedDueDate.nativeElement.textContent).toMatch('Thu 18 Feb 2016');
        });

        it('should display the call us message when the max extension days option is selected', () => {
            // ACT
            comp.updateExtensionOptions('21');
            fixture.detectChanges();

            // ASSERT
            const extendedDueDate = de.query(By.css('.opa-extend__summary-extended-due-date'));
            expect(extendedDueDate.nativeElement.textContent).toMatch('Thu 25 Feb 2016');
            const segmentedButton = fixture.nativeElement.querySelector('.opa-extend__call-us-message');
            expect(segmentedButton).not.toBeNull();
        });
    });

    describe('Click of Payment Extension confirmation button', () => {
        let contractAccountDetails: FuelChipContractAccountDetails[];
        let paymentExtensionContractEligibility: PaymentExtensionContractEligibility;
        let fuelChipData: FuelChipData;
        let dataLayerService: DataLayerService;

        beforeEach(() => {
            dataLayerService = de.injector.get(DataLayerService);
            spyOn(dataLayerService, 'trackExtendingPaymentDueDateFailure');
            spyOn(dataLayerService, 'addOptionalPageVariableForTracking');
        });

        it('should not display the warning flash message when component is displayed ', () => {
            // ARRANGE
            contractAccountDetails = [
                new FuelChipContractAccountDetails('111222333', [
                    new FuelChipContract('121212', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC'),
                    new FuelChipContract('121213', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
                ])
            ];
            paymentExtensionContractEligibility = new PaymentExtensionContractEligibility('121212', true, PaymentExtensionIneligibilityReasons.None, 0,
                new Date(), [new PaymentExtensionAvailableDate(7, new Date())]);
            fuelChipData =  new FuelChipData('111111', '121212', MauiFuelChipFuelType.Electricity, contractAccountDetails, paymentExtensionContractEligibility, MauiFuelChipFuelContext.None);

            spyOn(paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(fuelChipData);

            // ACT
            fixture.detectChanges();

            // ASSERT

            expect(comp.showPaymentExtensionError).toBeFalsy();
            let nativeElement = fixture.nativeElement.querySelector('.opa-extend__payment-extension-error');
            expect(nativeElement).toBeNull();
        });

        it('should not display the warning flash message when component is displayed and the confirm button is clicked with a api result of true', () => {
            // ARRANGE
            contractAccountDetails = [
                new FuelChipContractAccountDetails('111222333', [
                    new FuelChipContract('121212', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC'),
                    new FuelChipContract('121213', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
                ])
            ];
            paymentExtensionContractEligibility = new PaymentExtensionContractEligibility('1111', true, PaymentExtensionIneligibilityReasons.None, 0, new Date(), [new PaymentExtensionAvailableDate(7, new Date())]);
            fuelChipData =  new FuelChipData('111222333', '1111', MauiFuelChipFuelType.Electricity, contractAccountDetails, paymentExtensionContractEligibility, MauiFuelChipFuelContext.None);

            spyOn(paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(fuelChipData);
            spyOn(paymentExtensionStateService, 'extensionCompleted').and.returnValue(Observable.of(true));
            const router = fixture.debugElement.injector.get(Router);
            spyOn(router, 'navigate').and.returnValue(null);
            comp.ngOnInit();

            // ACT
            fixture.detectChanges();
            comp.confirmExtension();
            fixture.detectChanges();

            // ASSERT
            expect(comp.showPaymentExtensionError).toBeFalsy();
            let nativeElement = fixture.nativeElement.querySelector('.opa-extend__payment-extension-error');
            expect(nativeElement).toBeNull();
            expect(paymentExtensionStateService.extensionCompleted).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalled();
        });

        it('should display the warning flash message when component is displayed and the confirm button is clicked with a api result of false', () => {
            // ARRANGE
            contractAccountDetails = [
                new FuelChipContractAccountDetails('111222333', [
                    new FuelChipContract('121212', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC'),
                    new FuelChipContract('121213', '123 Blyth St, Brunswick VIC 3056', MauiFuelChipFuelType.Gas, 'VIC')
                ])
            ];
            paymentExtensionContractEligibility = new PaymentExtensionContractEligibility('1111', true, PaymentExtensionIneligibilityReasons.None, 0,
                new Date(), [new PaymentExtensionAvailableDate(7, new Date())]);
            // remove the contract number to force a false to be returned from the the api call
            fuelChipData =  new FuelChipData('', '', MauiFuelChipFuelType.Electricity, contractAccountDetails, paymentExtensionContractEligibility, MauiFuelChipFuelContext.None);

            spyOn(paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(fuelChipData);

            // ACT
            fixture.detectChanges();
            comp.confirmExtension();
            fixture.detectChanges();

            // ASSERT
            expect(comp.showPaymentExtensionError).toBeTruthy();
            let nativeElement = fixture.nativeElement.querySelector('.opa-extend__payment-extension-error');
            expect(nativeElement).not.toBeNull();
        });

        it('should pass default extension period to analytics tracking when submitting payment extension successful', () => {
            // arrange
            const selectedOption = 14;
            const accountNumber = '1';
            const contractNumber = '2';
            const totalAmountDue = 10;
            const eligibility = new PaymentExtensionContractEligibility(contractNumber, true, PaymentExtensionIneligibilityReasons.None, totalAmountDue, new Date(), [new PaymentExtensionAvailableDate(selectedOption, new Date())]);
            fuelChipData = new FuelChipData(accountNumber, contractNumber, MauiFuelChipFuelType.Electricity, null, eligibility, null);
            spyOn(paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(fuelChipData);

            const paymentExtensionApplicationService = de.injector.get(IPaymentExtensionApplication);

            spyOn(paymentExtensionApplicationService, 'submit').and.returnValue(Observable.of(true));
            const paymentExtensionStateServiceInstance = de.injector.get(IPaymentExtensionStateService);
            spyOn(paymentExtensionStateServiceInstance, 'extensionCompleted').and.returnValue(Observable.of(false));
            comp.ngOnInit();

            // act
            comp.confirmExtension();

            // ASSERT
            expect(dataLayerService.addOptionalPageVariableForTracking).toHaveBeenCalledWith(PageRequireOptionalVariables.PaymentExtensionSuccess, 'user_extensionPeriod', selectedOption.toString());
        });

        it('should pass changed extension period to analytics tracking when submitting payment extension successful', () => {
            // arrange
            const selectedOption = 14;
            const changedSelectedOption = 21;
            const accountNumber = '1';
            const contractNumber = '2';
            const totalAmountDue = 10;
            const eligibility = new PaymentExtensionContractEligibility(contractNumber, true, PaymentExtensionIneligibilityReasons.None, totalAmountDue, new Date(), [new PaymentExtensionAvailableDate(selectedOption, new Date()), new PaymentExtensionAvailableDate(changedSelectedOption, new Date())]);
            fuelChipData = new FuelChipData(accountNumber, contractNumber, MauiFuelChipFuelType.Electricity, null, eligibility, null);
            spyOn(paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(fuelChipData);

            const paymentExtensionApplicationService = de.injector.get(IPaymentExtensionApplication);

            spyOn(paymentExtensionApplicationService, 'submit').and.returnValue(Observable.of(true));
            const paymentExtensionStateServiceInstance = de.injector.get(IPaymentExtensionStateService);
            spyOn(paymentExtensionStateServiceInstance, 'extensionCompleted').and.returnValue(Observable.of(false));
            comp.ngOnInit();
            comp.updateExtensionOptions(changedSelectedOption);

            // act
            comp.confirmExtension();

            // ASSERT
            expect(dataLayerService.addOptionalPageVariableForTracking).toHaveBeenCalledWith(PageRequireOptionalVariables.PaymentExtensionSuccess, 'user_extensionPeriod', changedSelectedOption.toString());
        });

        it('add analytics tracking event when submitting payment extension fails', async (() => {
            // arrange
            const accountNumber = '1';
            const contractNumber = '2';
            const totalAmountDue = 10;
            const eligibility = new PaymentExtensionContractEligibility(contractNumber, true, PaymentExtensionIneligibilityReasons.None, totalAmountDue);
            comp.fuelChipData = new FuelChipData(accountNumber, contractNumber, MauiFuelChipFuelType.Electricity, null, eligibility, null);

            const duedateUpdateFailureMessage = 'Failed to extend due date.';
            const paymentExtensionApplicationService = de.injector.get(IPaymentExtensionApplication);
            spyOn(paymentExtensionApplicationService, 'submit').and.returnValue(Observable.of(false));

            // act
            comp.confirmExtension();

            // assert
            expect(dataLayerService.trackExtendingPaymentDueDateFailure).toHaveBeenCalledWith(duedateUpdateFailureMessage);
        }));

        it('add analytics tracking event when updating account fails', async (() => {
            // arrange
            const selectedOption = 14;
            const accountNumber = '1';
            const contractNumber = '2';
            const totalAmountDue = 10;
            const eligibility = new PaymentExtensionContractEligibility(contractNumber, true, PaymentExtensionIneligibilityReasons.None, totalAmountDue);
            comp.fuelChipData = new FuelChipData(accountNumber, contractNumber, MauiFuelChipFuelType.Electricity, null, eligibility, null);
            comp.selectedOption = selectedOption;

            const accountUpdateFailureMessage = 'Failed to update account after extending due date.';
            const paymentExtensionApplicationService = de.injector.get(IPaymentExtensionApplication);

            spyOn(paymentExtensionApplicationService, 'submit').and.returnValue(Observable.of(true));
            const paymentExtensionStateServiceInstance = de.injector.get(IPaymentExtensionStateService);
            spyOn(paymentExtensionStateServiceInstance, 'extensionCompleted').and.returnValue(Observable.of(false));

            // act
            comp.confirmExtension();

            // assert
            expect(dataLayerService.trackExtendingPaymentDueDateFailure).toHaveBeenCalledWith(accountUpdateFailureMessage);
        }));

        it(`add analytics tracking event for dog doom error when can't select fuel with contract number`, () => {
            // ARRANGE
            const classifiedFuelChips = { eligibleFuelChips: null };
            spyOn(paymentExtensionFuelChipService, 'init').and.returnValue(Observable.of(classifiedFuelChips));
            spyOn(paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(null);
            spyOn(paymentExtensionStateService, 'initNewSession').and.returnValue(null);
            spyOn(dataLayerService, 'trackPaymentExtensionDogDoomError').and.returnValue(null);

            // ACT
            comp.ngOnInit();

            // ASSERT
            expect(dataLayerService.trackPaymentExtensionDogDoomError).toHaveBeenCalled();
        });
    });

    describe('Click of Payment Extension cancel link', () => {

        beforeEach(() => {
            comp.routeParamsModel = {
                accountNumber: null,
                contractNumber: null,
                cancelDestinationUrl: undefined
            };
        });

        it('should navigate back to the Overview page', () => {
            // ARRANGE
            comp.routeParamsModel.cancelDestinationUrl = '/overview';
            const router = fixture.debugElement.injector.get(Router);
            spyOn(router, 'navigate');

            // ACT
            comp.cancelClicked();

            // ASSERT
            expect(router.navigate).toHaveBeenCalledWith([`/overview`]);
        });

        it('should navigate back to the Billing page', () => {
            // ARRANGE
            comp.routeParamsModel.cancelDestinationUrl = '/bills';
            const router = fixture.debugElement.injector.get(Router);
            spyOn(router, 'navigate');

            // ACT
            comp.cancelClicked();

            // ASSERT
            expect(router.navigate).toHaveBeenCalledWith([`/bills`]);
        });

        it('should navigate back to the Bills page if entry point was from a deep link', () => {
            // ARRANGE
            const router = fixture.debugElement.injector.get(Router);
            spyOn(router, 'navigate');

            // ACT
            comp.cancelClicked();

            // ASSERT
            expect(router.navigate).toHaveBeenCalledWith([`/bills`]);
        });
    });

    // HELPER FUNCTIONS:
    function fuelChipDataWithSingleExtensionOption(): FuelChipData {
        return new FuelChipData(
            '111111',
            '123456',
            MauiFuelChipFuelType.Electricity,
            [
                new FuelChipContractAccountDetails(
                    '111111',
                    [
                        new FuelChipContract(
                            '123456',
                            '123 Test St',
                            MauiFuelChipFuelType.Electricity,
                            'VIC'
                        )
                    ]
                ),
            ],
            new PaymentExtensionContractEligibility(
                '123456',
                true,
                PaymentExtensionIneligibilityReasons.None,
                60,
                new Date('February 4, 2016 10:13:00'),
                [
                    new PaymentExtensionAvailableDate(7, new Date('February 11, 2016 10:13:00')),
                    new PaymentExtensionAvailableDate(14),
                    new PaymentExtensionAvailableDate(21)
                ]
            ),
            MauiFuelChipFuelContext.Bill
        );
    }

    function fuelChipDataWithMultipleExtensionOptions(): FuelChipData {
        return new FuelChipData(
            '111111',
            '123456',
            MauiFuelChipFuelType.Electricity,
            [
                new FuelChipContractAccountDetails(
                    '111111',
                    [
                        new FuelChipContract(
                            '123456',
                            '123 Test St',
                            MauiFuelChipFuelType.Electricity,
                            'VIC'
                        )
                    ]
                ),
            ],
            new PaymentExtensionContractEligibility(
                '123456',
                true,
                PaymentExtensionIneligibilityReasons.None,
                60,
                new Date('February 4, 2016 10:13:00'),
                [
                    new PaymentExtensionAvailableDate(7, new Date('February 11, 2016 10:13:00')),
                    new PaymentExtensionAvailableDate(14, new Date('February 18, 2016 10:13:00')),
                    new PaymentExtensionAvailableDate(21, new Date('February 25, 2016 10:13:00'))
                ]
            ),
            MauiFuelChipFuelContext.Bill
        );
    }
});
