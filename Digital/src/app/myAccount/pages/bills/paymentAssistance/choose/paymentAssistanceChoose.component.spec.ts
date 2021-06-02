import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import * as moment from 'moment';
import { PaymentAssistanceChooseModule } from './paymentAssistanceChoose.module';
import { IPaymentExtensionStateService } from '../extend/services/paymentExtensionState.service';
import { FuelChipData } from '../extend/eligibility/fuelChipData';
import { IPaymentExtensionFuelChipService } from '../extend/eligibility/services/paymentExtensionFuelChip.service';
import { IAccountServiceMA, AccountViewModel, ContractViewModel } from '../../../../services/account.service';
import { Observable } from 'rxjs/Observable';
import { PaymentAssistanceChooseComponent } from './paymentAssistanceChoose.component';
import { DebugElement } from '@angular/core';
import { MauiFuelChipFuelType } from '../../../../maui/fuelChip';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ClassifiedFuelChips } from '../extend/eligibility/services/fuelChipClassification.service';
import { ConfigService } from '../../../../../shared/service/config.service';
import { PaymentExtensionContractEligibility, PaymentExtensionIneligibilityReasons, PaymentExtensionAvailableDate } from '../../../../services/paymentScheme/paymentExtensionEligibility.service';
import { Now } from '../../../../../shared/service/now.service';
import { InstalmentPlanOptionsMockService } from '../../../../services/mock/instalmentPlanOption.mock.service';
import { IInstalmentPlanOptionsService } from '../../../../services/paymentScheme/instalmentPlanOptions.service';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { Mock } from 'ts-mocks/lib';
import { IPaymentAssistanceNavigationPersistedStateService } from '../services';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { DataLayerStubService } from '../../../../../test/stubs/dataLayer.stub.service';

describe('PaymentAssistanceChooseComponent', () => {
    let instalmentPlanOptionsService = new InstalmentPlanOptionsMockService();
    let comp: PaymentAssistanceChooseComponent;
    let fixture: ComponentFixture<PaymentAssistanceChooseComponent>;
    let de: DebugElement;
    let router: Router;
    let dataLayerService: DataLayerService;
    const contractAccountNumber = '111';
    const contractNumber = '121212';

    const paymentAssistanceNavigationPersistedStateMockService = new Mock<IPaymentAssistanceNavigationPersistedStateService>();
    let paymentAssistanceNavigationPersistedStateServiceSetState: jasmine.Spy;
    let paymentAssistanceNavigationPersistedStateServiceGetState: jasmine.Spy;

    beforeEach(() => {
        const paymentExtensionStateService = {
            getSelectedFuelChip: (): FuelChipData => {
                throw new Error('getSelectedFuelChip is not implemented');
            },
            initNewSession: (selectedContractNumber: string, eligibleFuelChips: FuelChipData[]) => {
                throw new Error('initNewSession is not implemented');
            }
        };
        const fuelChipService = {
            init: () => {
                throw new Error('init is not implemented');
            }
        };
        const accountService = {
            getAccounts: (): Observable<AccountViewModel[]> => {
                throw new Error('getAccounts is not implemented');
            }
        };

        const routeParams = {
            contractNumber: contractNumber
        };

        const activatedRouteStub = {
            get params(): Observable<{}> {
                return Observable.of(routeParams);
            }
        };

        const configService = {
            current: null
        };

        const nowService = {
            date: () => {
                throw new Error('date is not implemented');
            }
        };

        paymentAssistanceNavigationPersistedStateServiceSetState = paymentAssistanceNavigationPersistedStateMockService
            .setup((x) => x.setState).Spy;

        paymentAssistanceNavigationPersistedStateServiceGetState = paymentAssistanceNavigationPersistedStateMockService
            .setup((x) => x.getState)
            .is(() => null).Spy;

        TestBed.configureTestingModule({
            imports: [
                PaymentAssistanceChooseModule,
                RouterTestingModule.withRoutes([
                    { path: 'bills/paymentassistance/extend/confirm/:contractAccountNumber/:contractNumber', redirectTo: '' },
                    { path: 'bills/paymentassistance/plan/options/:contractAccountNumber/:contractNumber', redirectTo: '' },
                ])
            ],
            providers: [
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: IPaymentExtensionStateService, useValue: paymentExtensionStateService },
                { provide: IPaymentExtensionFuelChipService, useValue: fuelChipService },
                { provide: IAccountServiceMA, useValue: accountService },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: ConfigService, useValue: configService },
                { provide: Now, useValue: nowService },
                { provide: IInstalmentPlanOptionsService, useValue: instalmentPlanOptionsService },
                { provide: IPaymentAssistanceNavigationPersistedStateService, useValue: paymentAssistanceNavigationPersistedStateMockService.Object },
                { provide: DataLayerService, useClass: DataLayerStubService }

            ]
        });
        fixture = TestBed.createComponent(PaymentAssistanceChooseComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;

        this.router = TestBed.get(Router);
        dataLayerService = TestBed.get(DataLayerService);
    });

    describe('When ngOnInit is called', () => {
        describe('When PaymentExtensionStateService returns selected fuel chip', () => {
            it('should handle fuel chip from service', () => {
                // arrange
                const fuelChipFromService = new FuelChipData('11', '111', MauiFuelChipFuelType.Gas, null, null, null);
                const paymentExtensionStateService = de.injector.get(IPaymentExtensionStateService);
                spyOn(paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(fuelChipFromService);
                spyOn(comp, 'populatePageContent').and.returnValue(null);

                // act
                comp.ngOnInit();

                // assert
                expect(comp.populatePageContent).toHaveBeenCalledWith(fuelChipFromService);
            });
        });

        describe('When PaymentExtensionStateService does not return selected fuel chip', () => {
            it('should handle fuel chip from init function', async(() => {
                // arrange
                const selectedFuelChipData = new FuelChipData('22', contractNumber, MauiFuelChipFuelType.Gas, null, null, null);
                const fuelChips = new ClassifiedFuelChips([selectedFuelChipData], null, null, null);

                const paymentExtensionStateService = de.injector.get(IPaymentExtensionStateService);
                const fuelChipService = de.injector.get(IPaymentExtensionFuelChipService);
                spyOn(paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(null);
                spyOn(fuelChipService, 'init').and.returnValue(Observable.of(fuelChips));
                spyOn(paymentExtensionStateService, 'initNewSession').and.returnValue(selectedFuelChipData);
                spyOn(comp, 'populatePageContent').and.returnValue(null);

                // act
                comp.ngOnInit();

                // assert
                expect(paymentExtensionStateService.initNewSession).toHaveBeenCalledWith(contractNumber, fuelChips.eligibleFuelChips);
                expect(comp.populatePageContent).toHaveBeenCalledWith(fuelChips.eligibleFuelChips[0]);
            }));
        });
    });

    describe('When populatePageContent is called', () => {
        let selectedContract: ContractViewModel;
        let totalAmountDue: number;
        let fuelChipData: FuelChipData;
        let fourteenDaysExtension: PaymentExtensionAvailableDate;

        beforeEach(() => {
            selectedContract = new ContractViewModel(contractNumber);
            const sevenDaysExtension = new PaymentExtensionAvailableDate(7, new Date('2018-02-27'));
            fourteenDaysExtension = new PaymentExtensionAvailableDate(14, new Date('2018-03-06'));
            totalAmountDue = 10;
            const eligibility = new PaymentExtensionContractEligibility(contractNumber, true, null, totalAmountDue, null, [
                sevenDaysExtension, fourteenDaysExtension
            ]);
            fuelChipData = new FuelChipData('22', contractNumber, MauiFuelChipFuelType.Gas, null, eligibility, null);

            const now = new Date('2018-02-10');
            const nowService = de.injector.get(Now);
            spyOn(nowService, 'date').and.returnValue(moment(now));
            spyOn(comp, 'ngOnInit').and.returnValue(null);
        });

        it('should show subheading with due date from latest NOT null extension option', () => {
            // arrange
            selectedContract = new ContractViewModel(contractNumber);
            const sevenDaysExtension = new PaymentExtensionAvailableDate(7, new Date('2018-02-27'));
            const fourteenDaysExtensionWithNullDueDate = new PaymentExtensionAvailableDate(14, null);
            totalAmountDue = 10;
            const eligibility = new PaymentExtensionContractEligibility(contractNumber, true, null, totalAmountDue, null, [
                sevenDaysExtension, fourteenDaysExtensionWithNullDueDate
            ]);
            const fuelChipDataWithNullDueDate = new FuelChipData('22', contractNumber, MauiFuelChipFuelType.Gas, null, eligibility, null);

            const currentBillEndDate = new Date('2018-02-28');
            const oneOtherContract = new ContractViewModel('1111');
            oneOtherContract.fuelType = 'Gas';
            oneOtherContract.currentBillEndDate = currentBillEndDate;
            const oneOtherContractAccount = new AccountViewModel('111', [selectedContract, oneOtherContract]);

            const accountService = de.injector.get(IAccountServiceMA);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([oneOtherContractAccount]));

            // act
            comp.populatePageContent(fuelChipDataWithNullDueDate);
            fixture.detectChanges();

            // assert
            const subHeading = fixture.nativeElement.querySelector('.payment-assistance-choose__subheading');
            expect(subHeading.innerText).toContain(`Based on your current financial situation, are you confident that you are able to pay $${totalAmountDue} within ${sevenDaysExtension.numberOfDays} days (${moment(sevenDaysExtension.dueDate).format('DD MMM YYYY')})?`);
        });

        it('should have selected fuel chip', () => {
            // arrange
            const currentBillEndDate = new Date('2018-02-28');
            const oneOtherContract = new ContractViewModel('1111');
            oneOtherContract.fuelType = 'Gas';
            oneOtherContract.currentBillEndDate = currentBillEndDate;
            const oneOtherContractAccount = new AccountViewModel('111', [selectedContract, oneOtherContract]);

            const accountService = de.injector.get(IAccountServiceMA);
            spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([oneOtherContractAccount]));

            // act
            comp.populatePageContent(fuelChipData);

            // assert
            expect(comp.selectedFuelChip).toBeDefined();
        });

        describe(`Pay on time discount`, () => {
            describe(`When selected contract has pay on time discount`, () => {
                it(`should show pay on time discount message`, () => {
                    // arrange
                    selectedContract.hasPayOnTimeDiscount = true;
                    const account = new AccountViewModel('111', [selectedContract]);

                    const accountService = de.injector.get(IAccountServiceMA);
                    spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([account]));

                    // act
                    comp.populatePageContent(fuelChipData);

                    // assert
                    expect(comp.selectedContract.hasPayOnTimeDiscount).toBe(true);
                });
            });

            describe(`When selected contract hasn't pay on time discount`, () => {
                it(`should not show pay on time discount message`, () => {
                    // arrange
                    selectedContract.hasPayOnTimeDiscount = false;
                    const account = new AccountViewModel('111', [selectedContract]);

                    const accountService = de.injector.get(IAccountServiceMA);
                    spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([account]));

                    // act
                    comp.populatePageContent(fuelChipData);

                    // assert
                    expect(comp.selectedContract.hasPayOnTimeDiscount).toBe(false);
                });
            });
        });

        describe(`When single other contract in the contract's account`, () => {
            describe('current bill end date is within latest extension period', () => {
                it('should load content with important message', () => {
                    // arrange
                    const currentBillEndDate = new Date('2018-02-28');
                    const oneOtherContract = new ContractViewModel('1111');
                    oneOtherContract.fuelType = 'Gas';
                    oneOtherContract.currentBillEndDate = currentBillEndDate;
                    const oneOtherContractAccount = new AccountViewModel('111', [selectedContract, oneOtherContract]);

                    const accountService = de.injector.get(IAccountServiceMA);
                    spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([oneOtherContractAccount]));

                    // act
                    comp.populatePageContent(fuelChipData);
                    fixture.detectChanges();

                    // assert
                    const subHeading = fixture.nativeElement.querySelector('.payment-assistance-choose__subheading');
                    expect(subHeading.innerText).toContain(`Based on your current financial situation, are you confident that you are able to pay $${totalAmountDue} within ${fourteenDaysExtension.numberOfDays} days (${moment(fourteenDaysExtension.dueDate).format('DD MMM YYYY')})?`);
                    expect(comp.paymentExtensionMessage).toBe(`Extend your bill due date for up to ${fourteenDaysExtension.numberOfDays} business days.`);
                    expect(comp.instalmentPlanMessage).toBe(`Split up your bill into smaller instalments.`);
                    const importantDiv = fixture.nativeElement.querySelector('.payment-assistance-choose__tertiary-message');
                    expect(importantDiv.innerText).toContain(`It looks like you also have your ${oneOtherContract.fuelType} bill issued within this period, so please keep this, and other finances you have to pay in mind.`);
                });
            });
            describe('current bill end date is out of latest extension period', () => {
                it('should not load important message', () => {
                    // arrange
                    const currentBillEndDate = new Date('2018-03-28');
                    const oneOtherContract = new ContractViewModel('1111');
                    oneOtherContract.fuelType = 'Gas';
                    oneOtherContract.currentBillEndDate = currentBillEndDate;
                    const oneOtherContractAccount = new AccountViewModel('111', [selectedContract, oneOtherContract]);

                    const accountService = de.injector.get(IAccountServiceMA);
                    spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([oneOtherContractAccount]));

                    // act
                    comp.populatePageContent(fuelChipData);
                    fixture.detectChanges();

                    // assert
                    const importantDiv = fixture.nativeElement.querySelector('.payment-assistance-choose__tertiary-message');
                    expect(importantDiv).toBeNull();
                });
            });
        });

        describe(`When multiple other contracts in the contract's account`, () => {
            describe('one of the current bill end dates is within latest extension period', () => {
                it('should load content with important message', () => {
                    // arrange
                    const currentBillEndDateWithin = new Date('2018-02-28');
                    const otherContractWithBillDateWithin1 = new ContractViewModel('1111');
                    otherContractWithBillDateWithin1.fuelType = 'Gas';
                    otherContractWithBillDateWithin1.currentBillEndDate = currentBillEndDateWithin;
                    const otherContractWithBillDateWithin2 = new ContractViewModel('3333');
                    otherContractWithBillDateWithin2.fuelType = 'Electricity';
                    otherContractWithBillDateWithin2.currentBillEndDate = currentBillEndDateWithin;
                    const currentBillEndDateOutside = new Date('2018-03-28');
                    const otherContractWithBillDateOutside = new ContractViewModel('2222');
                    otherContractWithBillDateOutside.fuelType = 'Electricity';
                    otherContractWithBillDateOutside.currentBillEndDate = currentBillEndDateOutside;
                    const oneOtherContractAccount = new AccountViewModel('111', [selectedContract, otherContractWithBillDateWithin1, otherContractWithBillDateWithin2, otherContractWithBillDateOutside]);

                    const accountService = de.injector.get(IAccountServiceMA);
                    spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([oneOtherContractAccount]));

                    // act
                    comp.populatePageContent(fuelChipData);
                    fixture.detectChanges();

                    // assert
                    const subHeading = fixture.nativeElement.querySelector('.payment-assistance-choose__subheading');
                    expect(subHeading.innerText).toContain(`Based on your current financial situation, are you confident that you are able to pay $${totalAmountDue} within ${fourteenDaysExtension.numberOfDays} days (${moment(fourteenDaysExtension.dueDate).format('DD MMM YYYY')})?`);
                    expect(comp.paymentExtensionMessage).toBe(`Extend your bill due date for up to ${fourteenDaysExtension.numberOfDays} business days.`);
                    expect(comp.instalmentPlanMessage).toBe(`Split up your bill into smaller instalments.`);
                    const importantDiv = fixture.nativeElement.querySelector('.payment-assistance-choose__tertiary-message');
                    expect(importantDiv.innerText).toContain(`It looks like you also have other bills issued within this period, so please keep these, and other finances you have to pay in mind.`);
                });
            });
            describe('both current bill end dates are out of latest extension period', () => {
                it('should not load important message', () => {
                    // arrange
                    const currentBillEndDateOutside1 = new Date('2018-03-24');
                    const otherContractWithBillDateOutside1 = new ContractViewModel('1111');
                    otherContractWithBillDateOutside1.fuelType = 'Gas';
                    otherContractWithBillDateOutside1.currentBillEndDate = currentBillEndDateOutside1;
                    const currentBillEndDateOutside2 = new Date('2018-03-28');
                    const otherContractWithBillDateOutside2 = new ContractViewModel('2222');
                    otherContractWithBillDateOutside2.fuelType = 'Electricity';
                    otherContractWithBillDateOutside2.currentBillEndDate = currentBillEndDateOutside2;
                    const oneOtherContractAccount = new AccountViewModel('111', [selectedContract, otherContractWithBillDateOutside1, otherContractWithBillDateOutside2]);
                    const accountService = de.injector.get(IAccountServiceMA);
                    spyOn(accountService, 'getAccounts').and.returnValue(Observable.of([oneOtherContractAccount]));

                    // act
                    comp.populatePageContent(fuelChipData);
                    fixture.detectChanges();

                    // assert
                    const importantDiv = fixture.nativeElement.querySelector('.payment-assistance-choose__tertiary-message');
                    expect(importantDiv).toBeNull();
                });
            });
        });
    });

    describe(`'That wasn't supposed to happen flash message'`, () => {

        beforeEach(() => {
            comp.selectedFuelChip = new FuelChipData(contractAccountNumber, contractNumber, MauiFuelChipFuelType.Gas, null, null, null);
            comp.selectedContract = new ContractViewModel(contractNumber);
            comp.selectedContract.hasPayOnTimeDiscount = false;
            const paymentExtensionStateService = de.injector.get(IPaymentExtensionStateService);
            spyOn(paymentExtensionStateService, 'getSelectedFuelChip').and.returnValue(true);
            spyOn(comp, 'populatePageContent').and.returnValue(null);
        });

        describe('navigatePlanOptions() is called', () => {

            it('should reset showSetUpInstalmentsError to false', () => {
                // ARRANGE
                comp.showSetUpInstalmentsError = true;
                spyOn(instalmentPlanOptionsService, 'getInstalmentOptions').and.returnValue(Observable.of([]));

                // ACT
                comp.navigatePlanOptions();
                fixture.detectChanges();

                // ASSERT
                expect(comp.showSetUpInstalmentsError).toBeFalsy();
            });

            it('should call getInstalmentOptions()', () => {
                // ARRANGE
                spyOn(instalmentPlanOptionsService, 'getInstalmentOptions').and.returnValue(Observable.of([]));

                // ACT
                comp.navigatePlanOptions();
                fixture.detectChanges();

                // ASSERT
                expect(instalmentPlanOptionsService.getInstalmentOptions).toHaveBeenCalled();
            });

            describe('getInstalmentOptions() is called', () => {

                describe('will return instalment options if populated', () => {
                    it('should navigate to the payment assistance options page', () => {
                        // ARRANGE
                        spyOn(instalmentPlanOptionsService, 'getInstalmentOptions').and.returnValue(Observable.of([]));
                        spyOn(this.router, 'navigate');

                        // ACT
                        comp.navigatePlanOptions();
                        fixture.detectChanges();

                        // ASSERT
                        expect(this.router.navigate).toHaveBeenCalledWith([`/bills/paymentassistance/plan/options/${contractAccountNumber}/${contractNumber}`], Object({ queryParamsHandling: 'preserve' }));
                    });
                });

                describe('will throw an error if something goes wrong', () => {
                    beforeEach(() => {
                        spyOn(instalmentPlanOptionsService, 'getInstalmentOptions').and.returnValue(Observable.throw(new Error('Test error')));
                        spyOn(dataLayerService, 'pushPaymentAssistanceErrorEvent');

                        // ACT
                        comp.navigatePlanOptions();
                        fixture.detectChanges();

                    });

                    it('should display the flash message', () => {

                        // ASSERT
                        expect(comp.showSetUpInstalmentsError).toBeTruthy();
                    });

                    it('should call pushPaymentAssistanceErrorEvent of the datalayer service for analytics', () => {
                        // ARRANGE
                        const apiErrorPoint: string = 'instalmentPlanOptionsService.getInstalmentOptions';

                        // ASSERT
                        expect(dataLayerService.pushPaymentAssistanceErrorEvent).toHaveBeenCalledWith(apiErrorPoint, jasmine.any(String), jasmine.any(String));
                    });

                });
            });
        });

        describe('navigateExtendConfirm() is called', () => {
            it('should reset showSetUpInstalmentsError to false', () => {
                // ARRANGE
                comp.showSetUpInstalmentsError = true;

                // ACT
                comp.navigateExtendConfirm();
                fixture.detectChanges();

                // ASSERT
                expect(comp.showSetUpInstalmentsError).toBeFalsy();
            });

            it('should call paymentAssistanceNavigationPersistedStateService.setState()', () => {
                // ACT
                comp.navigateExtendConfirm();

                // ASSERT
                expect(paymentAssistanceNavigationPersistedStateServiceSetState).toHaveBeenCalled();
            });

        });
    });
});
