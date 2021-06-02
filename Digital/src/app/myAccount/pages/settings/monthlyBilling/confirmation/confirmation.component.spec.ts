import { DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '../../../../../shared/service/config.service';
import { MonthlyBillingGetMonthlyBillingInfoForAccountTestData } from '../../../../../test/testingData/monthlyBilling/monthlyBilling.getMonthlyBillingInfoForAccount.testdata';
import { MonthlyBillingEntranceBillingSettingsAccountViewModelTestData } from '../../../../../test/testingData/monthlyBilling/monthlyBillingEntrance.billingSettingsAccount.testdata';
import { MauiButtonModule } from '../../../../maui/button/button.module';
import { MauiConfirmationBannerModule } from '../../../../maui/confirmationBanner';
import { MauiContainerModule } from '../../../../maui/container';
import { MauiFuelChipModule } from '../../../../maui/fuelChip';
import { MauiIconListModule } from '../../../../maui/iconList/iconList.module';
import { MauiLightBoxModule } from '../../../../maui/lightBox/lightBox.module';
import { CommonComponentsModule } from '../../../../modules/commonComponents.module';
import { CommonPipesModule } from '../../../../modules/commonPipes.module';
import { IAccountServiceMA } from '../../../../services/account.service';
import { MonthlyBillingMockService } from '../../../../services/mock/monthlyBilling.mock.service';
import { MonthlyBillingService } from '../../../../services/monthlyBilling.service';
import { TermsAndConditionsMonthlyBillingComponent } from '../chooseDate/monthlyBillingTermsAndConditions/monthlyBillingTermsAndConditions.component';
import { UpcomingBillsMonthlyBillingComponent } from '../upcomingBills/upcomingBills.monthlyBilling.component';
import { MonthlyBillingConfirmationComponent } from './confirmation.component';

let comp: MonthlyBillingConfirmationComponent;
let fixture: ComponentFixture<MonthlyBillingConfirmationComponent>;
let de: DebugElement;
let monthlyBillingService;

xdescribe('Monthly Billing Entrance Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MonthlyBillingConfirmationComponent,
                TermsAndConditionsMonthlyBillingComponent,
                UpcomingBillsMonthlyBillingComponent,
                // FormatDateDayMonthPipe
            ],
            imports: [
                CommonComponentsModule,
                CommonPipesModule,
                MauiButtonModule,
                MauiConfirmationBannerModule,
                MauiContainerModule,
                MauiFuelChipModule,
                MauiIconListModule,
                MauiLightBoxModule,
                RouterTestingModule
            ],
            providers: [
                { provide: MonthlyBillingService, useClass: MonthlyBillingMockService },
                ConfigService,
                IAccountServiceMA
            ]
        });

        fixture = TestBed.createComponent(MonthlyBillingConfirmationComponent);
        comp = fixture.componentInstance;
        monthlyBillingService = fixture.debugElement.injector.get(MonthlyBillingService);
    });

    describe('Account with 1 contract', () => {
        describe('Referrer is ManageAccount', () => {
            it('should display confirmation details, and the CLOSE button', () => {

                // spyOn(monthlyBillingService, 'getMonthlyBillingInfoForAccount')
                //     .and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractFlexibleMonthly));
                spyOn(monthlyBillingService, 'getOrdinal')
                    .and.returnValue('3rd');
                comp.monthlyBillingService.selectedMonthlyBillingAccount = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractFlexibleMonthly;
                comp.monthlyBillingService.selectedMonthlyBillingContract = MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractFlexibleMonthly.contractMonthlyBillingModels[0];
                comp.monthlyBillingService.selectedMonthlyBillingContract.contract.fuelType =  'Electricity';
                comp.monthlyBillingService.currentAccount = MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.clintEastwood1Account1Contract.account;
                de = fixture.debugElement;
                fixture.detectChanges();
                let confirmationBannerElement = de.query(By.css('.maui-confirmation-banner-content-item'));
                // let linkElement = de.query(By.css('.main-card-options__edit a'));
                expect(confirmationBannerElement.nativeElement.innerText).toMatch('Your electricity account is now on monthly billing');
                // expect(linkElement.nativeElement.innerText).toMatch('Set up');
            });
        });
    });

});
