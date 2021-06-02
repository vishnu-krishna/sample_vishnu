import { DebugElement } from '@angular/core';
import { async, ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { Mock } from 'ts-mocks';
import { LoadingComponent } from '../../../../../shared/loaders/loading.component';
import { ApiService } from '../../../../../shared/service/api.service';
import { ConfigService } from '../../../../../shared/service/config.service';
import { ApiStubService } from '../../../../../test/stubs/api.stub.service';
import { MonthlyBillingGetMonthlyBillingInfoForAccountTestData } from '../../../../../test/testingData/monthlyBilling/monthlyBilling.getMonthlyBillingInfoForAccount.testdata';
import { ContainerComponent } from '../../../../maui/container/container.component';
import { MauiFlashMessageModule } from '../../../../maui/flashMessage/index';
import { FuelChipComponent } from '../../../../maui/fuelChip/fuelChip.component';
import { FuelChipFooterComponent } from '../../../../maui/fuelChip/fuelChipFooter/fuelChipFooter.component';
import { FuelChipMessageComponent } from '../../../../maui/fuelChip/fuelChipMessage/fuelChipMessage.component';
import { HeadingComponent } from '../../../../maui/heading/heading.component';
import { MauiSecondaryNavigationComponent } from '../../../../maui/secondaryNavigation/secondaryNavigation.component';
import { AddSpacesPipe } from '../../../../pipes/addSpaces.pipe';
import { IAccountServiceMA } from '../../../../services/account.service';
import { MonthlyBillingService } from '../../../../services/monthlyBilling.service';
import { AccountMonthlyBillingModel } from '../../../../services/settings/model/accountMonthlyBillingModel';
import { BillingFrequencyType } from '../../../../services/settings/model/billingFrequencyType';
import { CancelMonthlyBillingResponse } from '../../../../services/settings/model/cancelMonthlyBillingResponse';
import { MonthlyBillingChooseServiceComponent } from './chooseService.component';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';

let comp: MonthlyBillingChooseServiceComponent;
let fixture: ComponentFixture<MonthlyBillingChooseServiceComponent>;
let de: DebugElement;
let monthlyBillingService;

describe('Monthly Billing - Choose your service ', () => {

    let mockMonthlyBillingService: Mock<MonthlyBillingService>;
    let mockDataLayerService: Mock<DataLayerService> = new Mock<DataLayerService>();
    let getMonthlyBillingInfoForAccountSpy: jasmine.Spy;
    let getMonthlyBillingInfoWithEligibilitySpy: jasmine.Spy;
    let cancelMonthlyBillingSpy: jasmine.Spy;

    let getOrdinalSpy: jasmine.Spy;

    beforeAll(() => {
        mockMonthlyBillingService = new Mock<MonthlyBillingService>();

        getMonthlyBillingInfoForAccountSpy = mockMonthlyBillingService
            .setup((x) => x.getMonthlyBillingInfoForAccount)
            .is(() => {
                return Observable.of(null);
            }).Spy;

        getMonthlyBillingInfoWithEligibilitySpy = mockMonthlyBillingService
            .setup((x) => x.getMonthlyBillingInfoWithEligibility)
            .is(() => {
                return Observable.of(null);
            }).Spy;

        getOrdinalSpy = mockMonthlyBillingService
            .setup((x) => x.getOrdinal)
            .is(() => {
                return null;
            }).Spy;

        cancelMonthlyBillingSpy = mockMonthlyBillingService
        .setup((x) => x.cancelMonthlyBilling)
            .is(() => {
                return null;
            }).Spy;

        mockDataLayerService
            .setup((x) => x.pushSingleEvents)
            .is(() => {
                return;
            });
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MonthlyBillingChooseServiceComponent,
                FuelChipComponent,
                HeadingComponent,
                MauiSecondaryNavigationComponent,
                ContainerComponent,
                LoadingComponent,
                FuelChipMessageComponent,
                FuelChipFooterComponent,
                AddSpacesPipe,
            ],
            imports: [RouterTestingModule,
                MauiFlashMessageModule],
            providers: [
                { provide: MonthlyBillingService, useValue: mockMonthlyBillingService.Object },
                { provide: ApiService, useClass: ApiStubService },
                { provide: DataLayerService, useValue: mockDataLayerService.Object },
                ConfigService,
                IAccountServiceMA
            ]
        });
        fixture = TestBed.createComponent(MonthlyBillingChooseServiceComponent);
        comp = fixture.componentInstance;
    });

    describe('Pre- set up scenario', () => {
        it(`Should fill the 2 separate list based on the bill frequency`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.ClintEastwood));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.ClintEastwood;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            de = fixture.debugElement;
            fixture.detectChanges();
            expect(comp.nonMonthlyBillingContractList.length).toEqual(2);
            expect(comp.monthlyBillingContractList.length).toEqual(0);
        }));

        it(`Should show the correct message for contract with Quarterly bill frequency`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.ClintEastwood));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.ClintEastwood;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            de = fixture.debugElement;
            fixture.detectChanges();
            let messageElement = de.query(By.css('.maui-fuel-chip__primary-status-with-address'));
            expect(comp.nonMonthlyBillingContractList.length).toEqual(2);
            expect(comp.monthlyBillingContractList.length).toEqual(0);
            expect(messageElement.nativeElement.innerText).toEqual('Your account is billed quarterly');
        }));

        it(`Should show the correct message for contract with bimonthly bill frequency`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.ClintEastwood));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.ClintEastwood;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            de = fixture.debugElement;
            fixture.detectChanges();
            let messageElement = de.queryAll(By.css('.maui-fuel-chip__primary-status-with-address'));
            expect(comp.nonMonthlyBillingContractList.length).toEqual(2);
            expect(comp.monthlyBillingContractList.length).toEqual(0);
            expect(messageElement[1].nativeElement.innerText).toEqual('Your account is billed every two months');
        }));

        it(`Should show the correct message for contract with monthly`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton.contractMonthlyBillingModels[0].contract.fuelType = 'Electricity';
            MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton.contractMonthlyBillingModels[1].contract.fuelType = 'Electricity';
            MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton.contractMonthlyBillingModels[2].contract.fuelType = 'Electricity';
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            de = fixture.debugElement;
            fixture.detectChanges();
            let messageElement = de.queryAll(By.css('.maui-fuel-chip__primary-status-without-address'));
            expect(comp.nonMonthlyBillingContractList.length).toEqual(3);
            expect(comp.monthlyBillingContractList.length).toEqual(0);
            expect(messageElement[2].nativeElement.innerText).toEqual('Your account is billed monthly');
        }));

        it(`Should show the correct message for all the contract with 3 different - non monthly billing frequencies `, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton.contractMonthlyBillingModels[0].contract.fuelType = 'Electricity';
            MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton.contractMonthlyBillingModels[1].contract.fuelType = 'Electricity';
            MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton.contractMonthlyBillingModels[2].contract.fuelType = 'Electricity';
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            de = fixture.debugElement;
            fixture.detectChanges();
            let messageElement = de.queryAll(By.css('.maui-fuel-chip__primary-status-without-address'));
            expect(comp.nonMonthlyBillingContractList.length).toEqual(3);
            expect(comp.monthlyBillingContractList.length).toEqual(0);
            expect(messageElement[0].nativeElement.innerText).toEqual('Your account is billed quarterly');
            expect(messageElement[1].nativeElement.innerText).toEqual('Your account is billed every two months');
            expect(messageElement[2].nativeElement.innerText).toEqual('Your account is billed monthly');
        }));
    });

    describe('Post set up scenario', () => {
        it(`Should fill the 2 separate list based on the bill frequency`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            getOrdinalSpy.and.returnValue('5th');
            de = fixture.debugElement;
            fixture.detectChanges();
            expect(comp.nonMonthlyBillingContractList.length).toEqual(1);
            expect(comp.monthlyBillingContractList.length).toEqual(1);
        }));
        it(`show the monthlybilling contract first then the non monthly billing contracts - 2 Contracts - 1 Flexible monthly 1 non Flexible Frequency`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            getOrdinalSpy.and.returnValue('5th');
            de = fixture.debugElement;
            fixture.detectChanges();
            let messageElement = de.queryAll(By.css('.maui-fuel-chip__primary-status-with-address'));
            expect(comp.nonMonthlyBillingContractList.length).toEqual(1);
            expect(comp.monthlyBillingContractList.length).toEqual(1);
            expect(messageElement[0].nativeElement.innerText).toEqual('Your bill is issued on the 5th of every month');
            expect(messageElement[1].nativeElement.innerText).toEqual('Your account is billed quarterly');
        }));
        it(`show the monthlybilling contract first then the non monthly billing contracts  - 4 Contracts - 2 Flexible monthly 2 non Flexible Frequency`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood4ContractsWith2FlexibleMonthlyBilling));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood4ContractsWith2FlexibleMonthlyBilling;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            getOrdinalSpy.and.returnValue('8th');
            de = fixture.debugElement;
            fixture.detectChanges();
            let messageElement = de.queryAll(By.css('.maui-fuel-chip__primary-status-with-address'));
            expect(comp.nonMonthlyBillingContractList.length).toEqual(2);
            expect(comp.monthlyBillingContractList.length).toEqual(2);
            expect(messageElement[0].nativeElement.innerText).toEqual('Your bill is issued on the 8th of every month');
            getOrdinalSpy.and.returnValue('21st');
            fixture.detectChanges();
            expect(messageElement[1].nativeElement.innerText).toEqual('Your bill is issued on the 21st of every month');
            expect(messageElement[2].nativeElement.innerText).toEqual('Your account is billed quarterly');
            expect(messageElement[3].nativeElement.innerText).toEqual('Your account is billed monthly');
        }));

        it(`show Cancel monthly billing button for contract with Flexible monthly billing contract`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            getOrdinalSpy.and.returnValue('5th');
            de = fixture.debugElement;
            fixture.detectChanges();
            let cancelButtonElement = de.query(By.css('.maui-fuel-chip__cancel-details-container'));
            let changeButtonElement = de.query(By.css('.maui-fuel-chip__primary-status-link-with-address'));
            expect(cancelButtonElement.nativeElement.innerText).toEqual('CANCEL MONTHLY BILLING');
        }));
    });
    describe('Change billing date scenario', () => {
        it(`should not show flash message when coming to choose service page`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            getOrdinalSpy.and.returnValue('5th');
            comp.monthlyBillingService.dateModifiedContractNumber = '';
            de = fixture.debugElement;
            fixture.detectChanges();
            let flashMessageComponentElement = de.query(By.css('.change-date'));
            expect(flashMessageComponentElement).toBeNull();
        }));

        it(`show flash message when the date of the bill is changed`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            getOrdinalSpy.and.returnValue('5th');
            comp.monthlyBillingService.dateModifiedContractNumber = '9101163496';
            de = fixture.debugElement;
            fixture.detectChanges();
            let flashMessageComponentElement = de.query(By.css('.change-date'));
            let flashMessageElement = de.query(By.css('.maui-flash-message__subheading')).children[0];
            expect(flashMessageComponentElement.nativeElement.innerText).not.toBeNull();
            expect(flashMessageElement.nativeElement.innerText).toEqual('You’ve successfully updated your monthly billing preferences. It can take up to 24 hours for your new billing preference to reflect in My Account and the App.');
        }));
    });

    describe('Cancel monthly billing date scenario', () => {
        it(`should not show flash message when coming to choose service page`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            getOrdinalSpy.and.returnValue('5th');
            comp.monthlyBillingService.cancelledContractNumber = '';
            de = fixture.debugElement;
            fixture.detectChanges();
            let flashMessageComponentElement = de.query(By.css('.cancel-monthly-billing'));
            expect(flashMessageComponentElement).toBeNull();
        }));

        it(`show flash message when the date of the bill is changed`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            getOrdinalSpy.and.returnValue('5th');
            comp.monthlyBillingService.cancelledContractNumber = '9101004976';
            de = fixture.debugElement;
            fixture.detectChanges();
            let flashMessageComponentElement = de.query(By.css('.cancel-monthly-billing'));
            expect(flashMessageComponentElement.nativeElement).not.toBeNull();
        }));

        it(`show flash message when the date of the bill is changed`, async(() => {
            // arrange
            let mockCancelMonthlyBillingResponse: CancelMonthlyBillingResponse = new CancelMonthlyBillingResponse();
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel = new AccountMonthlyBillingModel('90428798');
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly;
            mockCancelMonthlyBillingResponse.frequency = BillingFrequencyType.BiMonthly;
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(mockAccountMonthlyBillingModel));
            getOrdinalSpy.and.returnValue('5th');
            cancelMonthlyBillingSpy.and.returnValue(Observable.of(mockCancelMonthlyBillingResponse));
            comp.cancelMonthlyBilling(mockAccountMonthlyBillingModel.contractMonthlyBillingModels[1]);
            let flashMessageComponentElement = de.query(By.css('.cancel-monthly-billing'));
            expect(flashMessageComponentElement.nativeElement).not.toBeNull();
            expect(comp.nonMonthlyBillingContractList.length).toEqual(2);
            expect(comp.monthlyBillingContractList.length).toEqual(0);
        }));
    });

    describe('Multi contract display sequence scenario', () => {
        it(`should not show flash message when coming to choose service page`, async(() => {
            // arrange
            getMonthlyBillingInfoWithEligibilitySpy.and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton));
            let mockAccountMonthlyBillingModel: AccountMonthlyBillingModel;
            mockAccountMonthlyBillingModel = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton;
            MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton.contractMonthlyBillingModels[0].contract.fuelType = 'Electricity';
            MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton.contractMonthlyBillingModels[1].contract.fuelType = 'Electricity';
            MonthlyBillingGetMonthlyBillingInfoForAccountTestData.EmmaPaton.contractMonthlyBillingModels[2].contract.fuelType = 'Electricity';
            comp.monthlyBillingService.selectedMonthlyBillingAccount = mockAccountMonthlyBillingModel;
            getOrdinalSpy.and.returnValue('5th');
            comp.monthlyBillingService.cancelledContractNumber = '';
            de = fixture.debugElement;
            fixture.detectChanges();
            let flashMessageComponentElement = de.query(By.css('.cancel-monthly-billing'));
            expect(flashMessageComponentElement).toBeNull();
        }));
    });
});
