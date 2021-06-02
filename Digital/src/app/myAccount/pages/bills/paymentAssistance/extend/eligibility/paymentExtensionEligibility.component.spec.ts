import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DataLayerService } from '../../../../../../shared/service/dataLayer.service';
import { AccountOwnerModel, IAccountServiceMA } from '../../../../../services/account.service';
import { AccountMockService } from '../../../../../services/mock/account.mock.service';
import { PaymentExtensionFuelChipMockService } from '../../../../../services/mock/paymentExtensionFuelChip.mock.service';
import { PaymentExtensionStateMockService } from '../../../../../services/mock/paymentExtensionState.mock.service';
import { IPaymentExtensionStateService } from '../services/paymentExtensionState.service';
import { FuelChipData } from './fuelChipData';
import { PaymentExtensionEligibilityComponent } from './paymentExtensionEligibility.component';
import { PaymentExtensionEligibilityModule } from './paymentExtensionEligibility.module';
import { ClassifiedFuelChips } from './services/fuelChipClassification.service';
import { IPaymentExtensionFuelChipService } from './services/paymentExtensionFuelChip.service';
import { Mock } from 'ts-mocks/lib';
import { IPaymentAssistanceNavigationPersistedStateService } from '../../services';

describe('Payment extension eligibility component', () => {
    let comp: PaymentExtensionEligibilityComponent;
    let fixture: ComponentFixture<PaymentExtensionEligibilityComponent>;
    let de: DebugElement;
    let accountServiceSpy: any;
    let fuelChipServiceSpy: any;
    let paymentExtensionFuelChipMockService = new PaymentExtensionFuelChipMockService();
    let paymentExtensionStateMockService = new PaymentExtensionStateMockService();
    let accountMockService = new AccountMockService();
    let routerStub: any;

    const paymentAssistanceNavigationPersistedStateMockService = new Mock<IPaymentAssistanceNavigationPersistedStateService>();
    let paymentAssistanceNavigationPersistedStateServiceSetState: jasmine.Spy;
    let paymentAssistanceNavigationPersistedStateServiceGetState: jasmine.Spy;

    beforeEach(() => {
        routerStub = {
            navigate: jasmine.createSpy('navigate'),
        };
        const dataLayerService = {
            trackPaymentExtensionDogDoomError: (errorDescription: string) => {
                throw new Error('trackPaymentExtensionDogDoomError is not implemented');
            }
        };

        paymentAssistanceNavigationPersistedStateServiceSetState = paymentAssistanceNavigationPersistedStateMockService
            .setup((x) => x.setState).Spy;

        paymentAssistanceNavigationPersistedStateServiceGetState = paymentAssistanceNavigationPersistedStateMockService
            .setup((x) => x.getState)
            .is(() => null).Spy;

        TestBed.configureTestingModule({
            imports: [
                PaymentExtensionEligibilityModule
            ],
            providers: [
                { provide: IPaymentExtensionFuelChipService, useValue: paymentExtensionFuelChipMockService },
                { provide: IPaymentExtensionStateService, useValue: paymentExtensionStateMockService },
                { provide: IAccountServiceMA, useValue: accountMockService },
                { provide: Router, useValue: routerStub },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: DataLayerService, useValue: dataLayerService },
                { provide: IPaymentAssistanceNavigationPersistedStateService, useValue: paymentAssistanceNavigationPersistedStateMockService.Object }
            ]
        });

        fixture = TestBed.createComponent(PaymentExtensionEligibilityComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

    });

    describe('OnInit tests', () => {
        const firstName = 'Brock';
        const lastName = 'Lesnar';
        const accountOwnerModel = new AccountOwnerModel(firstName, lastName);
        const accountNumber = '111';
        const contractNumber = '123';
        let classifiedFuelChips: ClassifiedFuelChips;
        let accountMockServiceSpy: any;
        let paymentExtensionFuelChipMockServiceSpy: any;
        let dataLayerService: any;

        beforeEach(() => {
            accountMockServiceSpy = spyOn(accountMockService, 'getName').and.returnValue(Observable.of(accountOwnerModel));
            dataLayerService = de.injector.get(DataLayerService);
            spyOn(dataLayerService, 'trackPaymentExtensionDogDoomError').and.returnValue(null);
            spyOn(accountMockService, 'getAccounts').and.returnValue(Observable.of([]));
            spyOn(accountMockService, 'hasContractPayOnTimeDiscount').and.returnValue(false);
        });

        it('should call account service and fuel chip service once on init', async(() => {
            classifiedFuelChips = new ClassifiedFuelChips([], [], [], []);
            paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

            comp.ngOnInit();

            expect(accountMockServiceSpy).toHaveBeenCalledTimes(1);
            expect(paymentExtensionFuelChipMockServiceSpy).toHaveBeenCalledTimes(1);
        }));

        it('should set first name correctly', async(() => {
            classifiedFuelChips = new ClassifiedFuelChips([], [], [], []);
            paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

            comp.ngOnInit();

            expect(comp.firstName).toBe(firstName);
        }));

        it(`add analytics tracking event for dog doom error when no fuels found for this user`, async(() => {
            classifiedFuelChips = new ClassifiedFuelChips([], [], [], []);
            paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

            comp.ngOnInit();

            expect(dataLayerService.trackPaymentExtensionDogDoomError).toHaveBeenCalled();
        }));

        describe('Heading tests', () => {
            it('should set heading correctly when there is no bills to extend.', async(() => {
                classifiedFuelChips = new ClassifiedFuelChips([], [], [new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)], []);
                paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

                comp.ngOnInit();

                expect(comp.heading).toBe(`We can't currently extend the due date for these bills`);
            }));

            it('should set heading correctly when there are bills to extend', async(() => {
                classifiedFuelChips = new ClassifiedFuelChips([new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)], [], [], []);
                paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

                comp.ngOnInit();

                expect(comp.heading).toBe('Extend your bill due date.');
            }));

            it('should not set Ineligible subheading when there are only ineligible bills',  async(() => {
                classifiedFuelChips = new ClassifiedFuelChips([], [], [new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)], []);
                paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

                comp.ngOnInit();

                expect(comp.showIneligibleFuelChipSubHeading).toBe(false);
            }));

            it('should set Ineligible subheading when there are ineligible bills and eligible bills',  async(() => {
                classifiedFuelChips = new ClassifiedFuelChips([new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)],
                                                              [], [new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)], []);
                paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

                comp.ngOnInit();

                expect(comp.showIneligibleFuelChipSubHeading).toBe(true);
            }));

            it('should set Ineligible subheading when there are ineligible bills and alreadyExtended bills',  async(() => {
                classifiedFuelChips = new ClassifiedFuelChips([], [new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)],
                                                              [new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)], []);
                paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

                comp.ngOnInit();

                expect(comp.showIneligibleFuelChipSubHeading).toBe(true);
            }));

            it('should set Ineligible subheading when there are ineligible bills and noIssued bills',  async(() => {
                classifiedFuelChips = new ClassifiedFuelChips([], [], [new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)],
                                                              [new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)]);
                paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

                comp.ngOnInit();

                expect(comp.showIneligibleFuelChipSubHeading).toBe(true);
            }));

        });

        describe('Display tests', () => {
            it('should display eligible fuel chips', async(() => {
                classifiedFuelChips = new ClassifiedFuelChips([new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)], [], [], []);
                paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

                comp.ngOnInit();

                expect(comp.displayEligibleFuelChips).toBe(true);
                expect(comp.displayAlreadyExtendedFuelChips).toBe(false);
                expect(comp.displayIneligibleFuelChips).toBe(false);
                expect(comp.displayNoIssuedBillFuelChips).toBe(false);
            }));

            it('should display already extended fuel chips', async(() => {
                classifiedFuelChips = new ClassifiedFuelChips([], [new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)], [], []);
                paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

                comp.ngOnInit();

                expect(comp.displayEligibleFuelChips).toBe(false);
                expect(comp.displayAlreadyExtendedFuelChips).toBe(true);
                expect(comp.displayIneligibleFuelChips).toBe(false);
                expect(comp.displayNoIssuedBillFuelChips).toBe(false);
            }));

            it('should display ineligible fuel chips', async(() => {
                classifiedFuelChips = new ClassifiedFuelChips([], [], [new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)], []);
                paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

                comp.ngOnInit();

                expect(comp.displayEligibleFuelChips).toBe(false);
                expect(comp.displayAlreadyExtendedFuelChips).toBe(false);
                expect(comp.displayIneligibleFuelChips).toBe(true);
                expect(comp.displayNoIssuedBillFuelChips).toBe(false);
            }));

            it('should display no issued bill fuel chips', async(() => {
                classifiedFuelChips = new ClassifiedFuelChips([], [], [], [new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)]);
                paymentExtensionFuelChipMockServiceSpy = spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

                comp.ngOnInit();

                expect(comp.displayEligibleFuelChips).toBe(false);
                expect(comp.displayAlreadyExtendedFuelChips).toBe(false);
                expect(comp.displayIneligibleFuelChips).toBe(false);
                expect(comp.displayNoIssuedBillFuelChips).toBe(true);
            }));
        });
    });

    describe('OnFuelChipSelected tests', () => {
        const accountNumber = '111';
        const contractNumber = '123';
        let paymentExtensionStateMockServiceSpy: any;

        beforeEach(() => {
            paymentExtensionStateMockServiceSpy = spyOn(paymentExtensionStateMockService, 'initNewSession').and.stub();
            comp.classifiedFuelChips = new ClassifiedFuelChips([new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)], [], [], []);
        });

        it('should call paymentExtensionStateService initNewSession once', async(() => {
            comp.onFuelChipSelected(contractNumber);

            expect(paymentExtensionStateMockServiceSpy).toHaveBeenCalledTimes(1);
        }));

        it('should call paymentExtensionStateService initNewSession with the correct parameter', async(() => {
            comp.onFuelChipSelected(contractNumber);

            expect(paymentExtensionStateMockServiceSpy).toHaveBeenCalledWith(contractNumber, [new FuelChipData(accountNumber, contractNumber, undefined, [], undefined, undefined)]);
        }));

        it('should navigate to the correct path', async(() => {
            const route = '/bills/paymentassistance/extend/confirm/111/123';

            comp.onFuelChipSelected(contractNumber);

            expect(routerStub.navigate).toHaveBeenCalledWith([route]);
        }));

        it('should call paymentAssistanceNavigationPersistedStateService.setState()', () => {
            // ACT
            comp.onFuelChipSelected(contractNumber);

            // ASSERT
            expect(paymentAssistanceNavigationPersistedStateServiceSetState).toHaveBeenCalled();
        });

    });

    describe('Api error tests', () => {

        beforeEach(() => {
            const firstName = 'Brock';
            const lastName = 'Lesnar';
            const accountOwnerModel = new AccountOwnerModel(firstName, lastName);
            spyOn(accountMockService, 'getName').and.returnValue(Observable.of(accountOwnerModel));
            spyOn(accountMockService, 'getAccounts').and.returnValue(Observable.of([]));
            spyOn(accountMockService, 'hasContractPayOnTimeDiscount').and.returnValue(false);
        });

        it('should show error page if all contract accounts return error', async(() => {
            const dataLayerService = de.injector.get(DataLayerService);
            spyOn(dataLayerService, 'trackPaymentExtensionDogDoomError').and.returnValue(null);
            let classifiedFuelChips = new ClassifiedFuelChips([], [], [], []);
            spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

            comp.ngOnInit();

            expect(comp.showError).toBe(true);
        }));

        it('should show all contract accounts with no error', async(() => {
            let classifiedFuelChips = new ClassifiedFuelChips([new FuelChipData('123', '1', undefined, [], undefined, undefined)], [], [], []);

            spyOn(paymentExtensionFuelChipMockService, 'init').and.returnValue(Observable.of(classifiedFuelChips));

            comp.ngOnInit();

            expect(comp.showError).toBe(false);
        }));
    });

});
