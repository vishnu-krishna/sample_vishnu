import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { Mock } from 'ts-mocks';
import { LoadingComponent } from '../../../../../shared/loaders/loading.component';
import { ConfigService } from '../../../../../shared/service/config.service';
import { MonthlyBillingGetMonthlyBillingInfoForAccountTestData } from '../../../../../test/testingData/monthlyBilling/monthlyBilling.getMonthlyBillingInfoForAccount.testdata';
import { MonthlyBillingEntranceBillingSettingsAccountViewModelTestData } from '../../../../../test/testingData/monthlyBilling/monthlyBillingEntrance.billingSettingsAccount.testdata';
import { ButtonComponent } from '../../../../maui/button/button.component';
import { ContainerComponent } from '../../../../maui/container/container.component';
import { DayOfMonthPickerComponent } from '../../../../maui/dayOfMonthPicker/dayOfMonthPicker.component';
import { FlashMessageComponent } from '../../../../maui/flashMessage/flashMessage.component';
import { HeadingComponent } from '../../../../maui/heading/heading.component';
import { LightBoxComponent } from '../../../../maui/lightBox/lightBox.component';
import { TermsAndConditionsComponent } from '../../../../maui/termsAndConditions/termsAndConditions.component';
import { FormatDateDayMonthPipe } from '../../../../pipes/formatDateDayMonth.pipe';
import { IAccountServiceMA } from '../../../../services/account.service';
import { MonthlyBillingService } from '../../../../services/monthlyBilling.service';
import { BillDateOption } from '../../../../services/settings/model/billDateOption';
import { UpcomingBillsMonthlyBillingComponent } from '../upcomingBills/upcomingBills.monthlyBilling.component';
import { MonthlyBillingChooseDateComponent } from './chooseDate.component';
import { TermsAndConditionsMonthlyBillingComponent } from './monthlyBillingTermsAndConditions/monthlyBillingTermsAndConditions.component';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';

let comp: MonthlyBillingChooseDateComponent;
let fixture: ComponentFixture<MonthlyBillingChooseDateComponent>;
let de: DebugElement;
let monthlyBillingService;

describe('Monthly Billing - Choose date', () => {

    let mockMonthlyBillingService: Mock<MonthlyBillingService>;
    let mockDataLayerService: Mock<DataLayerService> = new Mock<DataLayerService>();
    let getMonthlyBillingInfoForAccountSpy: jasmine.Spy;
    let getBillDateOptionsSpy: jasmine.Spy;

    let getOrdinal: jasmine.Spy;

    beforeAll(() => {
        mockMonthlyBillingService = new Mock<MonthlyBillingService>();

        getMonthlyBillingInfoForAccountSpy = mockMonthlyBillingService
        .setup((x) => x.getMonthlyBillingInfoForAccount)
        .is(() => {
            return Observable.of(null);
        }).Spy;

        getBillDateOptionsSpy = mockMonthlyBillingService
        .setup((x) => x.getBillDateOptions)
        .is(() => {
            return Observable.of(null);
        }).Spy;

        getOrdinal = mockMonthlyBillingService
            .setup((x) => x.getOrdinal)
            .is(() => {
                return null;
            }).Spy;
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MonthlyBillingChooseDateComponent,
                HeadingComponent,
                ContainerComponent,
                LoadingComponent,
                TermsAndConditionsMonthlyBillingComponent,
                TermsAndConditionsComponent,
                DayOfMonthPickerComponent,
                UpcomingBillsMonthlyBillingComponent,
                FlashMessageComponent,
                ButtonComponent,
                LightBoxComponent,
                FormatDateDayMonthPipe
            ],
            imports: [RouterTestingModule],
            providers: [
                { provide: MonthlyBillingService, useValue: mockMonthlyBillingService.Object },
                { provide: DataLayerService, useValue: mockDataLayerService.Object },
                ConfigService,
                IAccountServiceMA
            ]
        });
        fixture = TestBed.createComponent(MonthlyBillingChooseDateComponent);
        comp = fixture.componentInstance;
    });

    describe('Single account- Single contract scenario', () => {
        it(`Monthly Billing Pre setup - Heading, Subheading and button text check`, async(() => {
            // arrange
            comp.monthlyBillingService.selectedMonthlyBillingAccount = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractQuarterly;
            comp.monthlyBillingService.selectedMonthlyBillingContract = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractQuarterly.contractMonthlyBillingModels[0];
            comp.monthlyBillingService.selectedMonthlyBillingContract.contract.fuelType =  'Electricity';
            comp.monthlyBillingService.currentAccount = MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.clintEastwood1Account1Contract.account;
            comp.monthlyBillingService.billDateOptionList = [new BillDateOption()];
            de = fixture.debugElement;
            fixture.detectChanges();
            // Assert
            expect(comp.heading).toEqual('Choose your preferred bill issue date');
            expect(comp.subHeading).toEqual(`When would you like us to issue your electricity bill?`);
            expect(comp.submitButtonText).toEqual('Switch to Monthly Billing');

        }));

        it(`Monthly Billing Pre setup - selected date is current date and button status`, async(() => {
            // arrange
            comp.monthlyBillingService.selectedMonthlyBillingAccount = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractQuarterly;
            comp.monthlyBillingService.selectedMonthlyBillingContract = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractQuarterly.contractMonthlyBillingModels[0];
            comp.monthlyBillingService.selectedMonthlyBillingContract.contract.fuelType =  'Electricity';
            comp.monthlyBillingService.currentAccount = MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.clintEastwood1Account1Contract.account;
            comp.monthlyBillingService.billDateOptionList = [new BillDateOption()];
            de = fixture.debugElement;
            fixture.detectChanges();
            // Assert
            expect(comp.isSubmitButtonEnabled).toBeFalsy();
            expect(comp.selectedDate).toEqual(new Date().getDate());
            expect(comp.submitButtonText).toEqual('Switch to Monthly Billing');

        }));

        it(`Monthly Billing Post setup - Heading, Subheading and button text check`, async(() => {
            // arrange
            let billDateOption: BillDateOption = {
                dayOfMonth : 3,
                billDates: [
                    {
                    issueDate : new Date('2018-02-02'),
                    dueDate : new Date('2018-12-02'),
                },
                {
                    issueDate :  new Date('2018-03-02'),
                    dueDate :  new Date('2018-03-02'),
                },
                {
                    issueDate :  new Date('2018-04-02'),
                    dueDate :  new Date('2018-04-02'),
                }
            ]
            };

            getOrdinal.and.returnValue('3rd');

            comp.monthlyBillingService.selectedMonthlyBillingAccount = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractFlexibleMonthly;
            comp.monthlyBillingService.selectedMonthlyBillingContract = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractFlexibleMonthly.contractMonthlyBillingModels[0];
            comp.monthlyBillingService.selectedMonthlyBillingContract.contract.fuelType =  'Electricity';
            comp.monthlyBillingService.currentAccount = MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.clintEastwood1Account1Contract.account;
            comp.monthlyBillingService.billDateOptionList = [billDateOption];
            de = fixture.debugElement;
            fixture.detectChanges();
            let messageElement = de.queryAll(By.css('.upcoming-billings--issue-dates__dates--left'));
            expect(comp.heading).toEqual('Change your preferred bill issue date');
            expect(comp.subHeading).toEqual(`Your electricity bills are issued on the 3rd of every month`);
            expect(comp.submitButtonText).toEqual('Change');
            expect(messageElement[1].nativeElement.innerText).toEqual('2 February');
        }));
        it(`Check when selected date changes, the corresponding bill dates also changes`, async(() => {
            // arrange
            let billDateOption: BillDateOption = {
                dayOfMonth : 3,
                billDates: [
                    {
                    issueDate : new Date('2018-02-02'),
                    dueDate : new Date('2018-12-02'),
                },
                {
                    issueDate :  new Date('2018-03-02'),
                    dueDate :  new Date('2018-03-02'),
                },
                {
                    issueDate :  new Date('2018-04-02'),
                    dueDate :  new Date('2018-04-02'),
                }
            ]
            };

            let billDateOption1: BillDateOption = {
                dayOfMonth : 4,
                billDates: [
                    {
                    issueDate : new Date('2018-03-03'),
                    dueDate : new Date('2018-03-02'),
                },
                {
                    issueDate :  new Date('2018-04-02'),
                    dueDate :  new Date('2018-04-02'),
                },
                {
                    issueDate :  new Date('2018-05-02'),
                    dueDate :  new Date('2018-05-02'),
                }
            ]
            };

            getOrdinal.and.returnValue('3rd');

            comp.monthlyBillingService.selectedMonthlyBillingAccount = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractFlexibleMonthly;
            comp.monthlyBillingService.selectedMonthlyBillingContract = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractFlexibleMonthly.contractMonthlyBillingModels[0];
            comp.monthlyBillingService.selectedMonthlyBillingContract.contract.fuelType = 'Electricity';
            comp.monthlyBillingService.currentAccount = MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.clintEastwood1Account1Contract.account;
            comp.monthlyBillingService.billDateOptionList = [billDateOption, billDateOption1];
            de = fixture.debugElement;
            fixture.detectChanges();
            comp.onSelectDay(4);
            fixture.detectChanges();
            let messageElement = de.queryAll(By.css('.upcoming-billings--issue-dates__dates--left'));
            let dateElement = de.queryAll(By.css('.day-of-month-picker__calendar-item--highlight'));
            expect(comp.heading).toEqual('Change your preferred bill issue date');
            expect(comp.subHeading).toEqual(`Your electricity bills are issued on the 3rd of every month`);
            expect(comp.submitButtonText).toEqual('Change');
            expect(messageElement[1].nativeElement.innerText).toEqual('3 March');
            expect(messageElement[2].nativeElement.innerText).toEqual('2 April');
            expect(messageElement[3].nativeElement.innerText).toEqual('2 May');
        }));
    });
});
