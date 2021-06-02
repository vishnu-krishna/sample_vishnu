import { DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { LoadingComponent } from '../../../../../shared/loaders/loading.component';
import { ConfigService } from '../../../../../shared/service/config.service';
import { MonthlyBillingGetMonthlyBillingInfoForAccountTestData } from '../../../../../test/testingData/monthlyBilling/monthlyBilling.getMonthlyBillingInfoForAccount.testdata';
import { MonthlyBillingEntranceBillingSettingsAccountViewModelTestData } from '../../../../../test/testingData/monthlyBilling/monthlyBillingEntrance.billingSettingsAccount.testdata';
import { MauiFlashMessageModule } from '../../../../maui/flashMessage';
import { IAccountServiceMA } from '../../../../services/account.service';
import { MonthlyBillingMockService } from '../../../../services/mock/monthlyBilling.mock.service';
import { MonthlyBillingService } from '../../../../services/monthlyBilling.service';
import { MonthlyBillingEntranceComponent } from './monthlyBillingEntrance.component';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { Mock } from 'ts-mocks/lib';

let comp: MonthlyBillingEntranceComponent;
let fixture: ComponentFixture<MonthlyBillingEntranceComponent>;
let de: DebugElement;
let monthlyBillingService;
let mockDataLayerService: Mock<DataLayerService> = new Mock<DataLayerService>();

describe('Monthly Billing Entrance Component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoadingComponent,
                MonthlyBillingEntranceComponent,
            ],
            imports: [
                RouterTestingModule,
                MauiFlashMessageModule,
            ],
            providers: [
                { provide: MonthlyBillingService, useClass: MonthlyBillingMockService },
                { provide: DataLayerService, useValue: mockDataLayerService.Object },
                ConfigService,
                IAccountServiceMA
            ]
        });

        fixture = TestBed.createComponent(MonthlyBillingEntranceComponent);
        comp = fixture.componentInstance;
        monthlyBillingService = fixture.debugElement.injector.get(MonthlyBillingService);
    });

    describe('Account with 1 contract', () => {
        describe('Monthly Billing is NOT set up', () => {
            it('should display correct message, and the Set up link', () => {
                spyOn(monthlyBillingService, 'getMonthlyBillingInfoForAccount')
                    .and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractQuarterly));
                spyOn(monthlyBillingService, 'getOrdinal')
                    .and.returnValue(null);
                spyOn(monthlyBillingService, 'createMessage')
                    .and.returnValue('Your electricity account is billed quarterly');

                comp.billingSettingsAccountViewModel =  MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.clintEastwood1Account1Contract;
                comp.billingSettingsAccountViewModel.account.contracts[0].fuelType = 'Electricity';
                comp.billingSettingsAccountViewModel.account.contracts[0].isInFlight = false;
                de = fixture.debugElement;
                fixture.detectChanges();
                let messageElement = de.query(By.css('.main-card-options__message'));
                let linkElement = de.query(By.css('.main-card-options__edit a'));
                expect(messageElement.nativeElement.innerText).toMatch('Your electricity account is billed quarterly');
                expect(linkElement.nativeElement.innerText).toMatch('Set up');
            });
        });
        describe('Monthly Billing is set up', () => {
            it('should display correct message, and the Manage link', () => {
                spyOn(monthlyBillingService, 'getMonthlyBillingInfoForAccount')
                    .and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood1ContractFlexibleMonthly));
                spyOn(monthlyBillingService, 'getOrdinal')
                    .and.returnValue('3rd');
                spyOn(monthlyBillingService, 'createMessage')
                .and.returnValue('Your electricity bills are issued on the 3rd of every month');
                comp.billingSettingsAccountViewModel =  MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.clintEastwood1Account1Contract;
                comp.billingSettingsAccountViewModel.account.contracts[0].fuelType = 'Electricity';
                comp.billingSettingsAccountViewModel.account.contracts[0].isInFlight = false;
                de = fixture.debugElement;
                fixture.detectChanges();
                let messageElement = de.query(By.css('.main-card-options__message'));
                let linkElement = de.query(By.css('.main-card-options__edit a'));
                expect(messageElement.nativeElement.innerText).toMatch('Your electricity bills are issued on the 3rd of every month');
                expect(linkElement.nativeElement.innerText).toMatch('Manage');
            });
        });
    });

    describe('Account with 2 contracts', () => {
        describe('Account with different fuel type', () => {
            describe('Monthly Billing is NOT set up', () => {
                it('should display correct message, and Set up link', () => {
                    spyOn(monthlyBillingService, 'getMonthlyBillingInfoForAccount')
                        .and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.ClintEastwood));
                    spyOn(monthlyBillingService, 'getOrdinal')
                        .and.returnValue(null);
                    spyOn(monthlyBillingService, 'createMessage')
                    .and.returnValue('Your electricity account is billed quarterly and your gas account is billed every two months.');
                    comp.billingSettingsAccountViewModel =  MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.clintEastwood1Account2Contracts;
                    comp.billingSettingsAccountViewModel.account.contracts[0].fuelType = 'Electricity';
                    comp.billingSettingsAccountViewModel.account.contracts[1].fuelType = 'Gas';
                    comp.billingSettingsAccountViewModel.account.contracts[0].isInFlight = false;
                    comp.billingSettingsAccountViewModel.account.contracts[1].isInFlight = false;
                    de = fixture.debugElement;
                    fixture.detectChanges();
                    let messageElement = de.query(By.css('.main-card-options__message'));
                    let linkElement = de.query(By.css('.main-card-options__edit a'));
                    expect(messageElement.nativeElement.innerText).toMatch('Your electricity account is billed quarterly and your gas account is billed every two months.');
                    expect(linkElement.nativeElement.innerText).toMatch('Set up');
                });
            });
            describe('Monthly Billing is set up for 1 contract', () => {
                it('should display correct message, and Manage link', () => {
                    spyOn(monthlyBillingService, 'getMonthlyBillingInfoForAccount')
                        .and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts1HasFlexibleMonthly));
                    spyOn(monthlyBillingService, 'getOrdinal')
                        .and.returnValue('3rd');
                    spyOn(monthlyBillingService, 'createMessage')
                        .and.returnValue('Your gas bills are issued on the 3rd of every month and your electricity account is billed quarterly.');
                    comp.billingSettingsAccountViewModel =  MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.clintEastwood1Account2Contracts;
                    comp.billingSettingsAccountViewModel.account.contracts[0].fuelType = 'Electricity';
                    comp.billingSettingsAccountViewModel.account.contracts[1].fuelType = 'Gas';
                    de = fixture.debugElement;
                    fixture.detectChanges();
                    let messageElement = de.query(By.css('.main-card-options__message'));
                    let linkElement = de.query(By.css('.main-card-options__edit a'));
                    expect(messageElement.nativeElement.innerText).toMatch('Your gas bills are issued on the 3rd of every month and your electricity account is billed quarterly.');
                    expect(linkElement.nativeElement.innerText).toMatch('Manage');
                });
            });
            describe('Monthly Billing is set up for 2 contracts', () => {
                it('should display correct message, and Manage link', () => {
                    spyOn(monthlyBillingService, 'getMonthlyBillingInfoForAccount')
                        .and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood2Contracts2HaveFlexibleMonthly));
                    spyOn(monthlyBillingService, 'getOrdinal')
                        .and.returnValues('3rd', '4th');
                    spyOn(monthlyBillingService, 'createMessage')
                        .and.returnValue('Your electricity bills are issued on the 3rd of every month. Your gas bills are issued on the 4th of every month.');
                    comp.billingSettingsAccountViewModel =  MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.clintEastwood1Account2Contracts;
                    comp.billingSettingsAccountViewModel.account.contracts[0].fuelType = 'Electricity';
                    comp.billingSettingsAccountViewModel.account.contracts[1].fuelType = 'Gas';
                    de = fixture.debugElement;
                    fixture.detectChanges();
                    let messageElement = de.query(By.css('.main-card-options__message'));
                    let linkElement = de.query(By.css('.main-card-options__edit a'));
                    expect(messageElement.nativeElement.innerText).toEqual('Your electricity bills are issued on the 3rd of every month. Your gas bills are issued on the 4th of every month.');
                    expect(linkElement.nativeElement.innerText).toMatch('Manage');
                });
            });
        });
    });

    describe('Account with more than 2 contracts', () => {
        describe('Monthly Billing is NOT set up', () => {
            describe('All contracts same fuel', () => {
                it('should display correct message, and Set up link', () => {
                    spyOn(monthlyBillingService, 'getMonthlyBillingInfoForAccount')
                        .and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.PeterPeluso));
                    spyOn(monthlyBillingService, 'getOrdinal')
                        .and.returnValue(null);
                    spyOn(monthlyBillingService, 'createMessage')
                        .and.returnValue('Set up monthly billing for your Electricity bills.');
                    comp.billingSettingsAccountViewModel =  MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.PeterPeluso;
                    comp.billingSettingsAccountViewModel.account.contracts[0].fuelType = 'Electricity';
                    comp.billingSettingsAccountViewModel.account.contracts[1].fuelType = 'Electricity';
                    comp.billingSettingsAccountViewModel.account.contracts[2].fuelType = 'Electricity';
                    comp.billingSettingsAccountViewModel.account.contracts[0].isInFlight = false;
                    comp.billingSettingsAccountViewModel.account.contracts[1].isInFlight = false;
                    comp.billingSettingsAccountViewModel.account.contracts[2].isInFlight = false;
                    de = fixture.debugElement;
                    fixture.detectChanges();
                    let messageElement = de.query(By.css('.main-card-options__message'));
                    let linkElement = de.query(By.css('.main-card-options__edit a'));
                    expect(messageElement.nativeElement.innerText).toMatch('Set up monthly billing for your Electricity bills.');
                    expect(linkElement.nativeElement.innerText).toMatch('Set up');
                });
            });
            describe('Some contracts are different fuels', () => {
                it('should display correct message, and Set up link', () => {
                    spyOn(monthlyBillingService, 'getMonthlyBillingInfoForAccount')
                        .and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.PeterPeluso));
                    spyOn(monthlyBillingService, 'getOrdinal')
                        .and.returnValue(null);
                    spyOn(monthlyBillingService, 'createMessage')
                        .and.returnValue('Set up monthly billing for your electricity and gas bills.');
                    comp.billingSettingsAccountViewModel =  MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.PeterPeluso;
                    comp.billingSettingsAccountViewModel.account.contracts[0].fuelType = 'Electricity';
                    comp.billingSettingsAccountViewModel.account.contracts[1].fuelType = 'Gas';
                    comp.billingSettingsAccountViewModel.account.contracts[1].fuelType = 'Gas';
                    de = fixture.debugElement;
                    fixture.detectChanges();
                    let messageElement = de.query(By.css('.main-card-options__message'));
                    let linkElement = de.query(By.css('.main-card-options__edit a'));
                    expect(messageElement.nativeElement.innerText).toMatch('Set up monthly billing for your electricity and gas bills.');
                    expect(linkElement.nativeElement.innerText).toMatch('Set up');
                });
            });
        });

        describe('Monthly Billing is set up', () => {
            describe('All contracts same fuel', () => {
                it('should display correct message, and Set up link', () => {
                    spyOn(monthlyBillingService, 'getMonthlyBillingInfoForAccount')
                        .and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood3Contracts1HasFlexibleMonthly));
                    spyOn(monthlyBillingService, 'getOrdinal')
                        .and.returnValue(null);
                    spyOn(monthlyBillingService, 'createMessage')
                        .and.returnValue('Manage the bill issue date for your Electricity bills.');
                    comp.billingSettingsAccountViewModel =  MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.PeterPeluso;
                    comp.billingSettingsAccountViewModel.account.contracts[0].fuelType = 'Electricity';
                    comp.billingSettingsAccountViewModel.account.contracts[1].fuelType = 'Electricity';
                    comp.billingSettingsAccountViewModel.account.contracts[2].fuelType = 'Electricity';
                    de = fixture.debugElement;
                    fixture.detectChanges();
                    let messageElement = de.query(By.css('.main-card-options__message'));
                    let linkElement = de.query(By.css('.main-card-options__edit a'));
                    expect(messageElement.nativeElement.innerText).toMatch('Manage the bill issue date for your Electricity bills.');
                    expect(linkElement.nativeElement.innerText).toMatch('Manage');
                });
            });
            describe('Some contracts are different fuels', () => {
                it('should display correct message, and Set up link', () => {
                    spyOn(monthlyBillingService, 'getMonthlyBillingInfoForAccount')
                        .and.returnValue(Observable.of(MonthlyBillingGetMonthlyBillingInfoForAccountTestData.clintEastwood3Contracts1HasFlexibleMonthly));
                    spyOn(monthlyBillingService, 'getOrdinal')
                        .and.returnValue(null);
                    spyOn(monthlyBillingService, 'createMessage')
                        .and.returnValue('Manage the bill issue date for your electricity and gas bills.');
                    comp.billingSettingsAccountViewModel =  MonthlyBillingEntranceBillingSettingsAccountViewModelTestData.PeterPeluso;
                    comp.billingSettingsAccountViewModel.account.contracts[0].fuelType = 'Electricity';
                    comp.billingSettingsAccountViewModel.account.contracts[1].fuelType = 'Gas';
                    comp.billingSettingsAccountViewModel.account.contracts[1].fuelType = 'Gas';
                    de = fixture.debugElement;
                    fixture.detectChanges();
                    let messageElement = de.query(By.css('.main-card-options__message'));
                    let linkElement = de.query(By.css('.main-card-options__edit a'));
                    expect(messageElement.nativeElement.innerText).toMatch('Manage the bill issue date for your electricity and gas bills.');
                    expect(linkElement.nativeElement.innerText).toMatch('Manage');
                });
            });
        });
    });

});
