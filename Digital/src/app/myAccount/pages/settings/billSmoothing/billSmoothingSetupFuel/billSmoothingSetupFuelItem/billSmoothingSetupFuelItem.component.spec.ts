import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

import { Observable, Subscriber } from 'rxjs';
import { MyAccountMaterialModule } from '../../../../../modules/my-account.material.module';

import { AlertComponent } from '../../../../../../shared/component/alert/alert.component';
import { ApiService } from '../../../../../../shared/service/api.service';
import { IMessageBusService } from '../../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../../../shared/service/dataLayer.service';
import { ApiStubService } from '../../../../../../test/stubs/api.stub.service';
import { IAccountServiceMA } from '../../../../../services/account.service';
import { TestData } from '../../billSmoothing.component.data';
import { BillSmoothingFrequency } from '../../billSmoothing.model';
import { BillSmoothingService } from '../../billSmoothing.service';
import { BillSmoothingSetupFuelItemComponent } from './billSmoothingSetupFuelItem.component';
import { MonthlyDatePickerComponent } from './monthlyDatePicker/monthlyDatePicker.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Bill Smoothing Setup Fuel Item Component', () => {
    let sut: BillSmoothingSetupFuelItemComponent;
    let fixture: ComponentFixture<BillSmoothingSetupFuelItemComponent>;
    let de: DebugElement;
    let accountService: any;
    let messageBusService: any;
    let billSmoothingService: any;
    let dataLayerService: any;

    beforeEach(() => {
        let iAccountServiceMAStub = {
            getAccounts: () => {
                throw new Error('iAccountServiceMAStub.getAccounts has not been mocked properly.');
            }
        };
        let DataLayerServiceStub = {
            pushNewPageEvent: () => {
                throw new Error('dataLayerServiceStub.pushNewPageEvent has not been mocked properly.');
            }
        };
        let BillSmoothingServiceStub = {
            getStartInformationSubtext: (frequency: BillSmoothingFrequency, isDirectDebit: boolean, selectedDay: string, selectedDateOrdinal: string): string => {
                throw new Error('BillSmoothingServiceStub.getStartInformationSubtext has not been mocked properly.');
            }
        };
        TestBed.configureTestingModule({
            declarations: [
                BillSmoothingSetupFuelItemComponent,
                MonthlyDatePickerComponent,
                AlertComponent
            ],
            imports: [
                FormsModule,
                MyAccountMaterialModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: ApiService, useClass: ApiStubService },
                { provide: IAccountServiceMA, useValue: accountService },
                { provide: IMessageBusService, useValue: messageBusService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false },
                { provide: BillSmoothingService, useValue: BillSmoothingServiceStub },
                { provide: DataLayerService, useValue: DataLayerServiceStub },
            ]
        });

        fixture = TestBed.createComponent(BillSmoothingSetupFuelItemComponent);
        sut = fixture.componentInstance;
        const fuelType = jasmine.createSpyObj('BillSmoothingFuelDisplayModel', ['contractAccountNumber']);
        fuelType.paymentOptions = [
            {
                frequency: 'Weekly',
                excludedDates: []
            }
        ];
        dataLayerService = fixture.debugElement.injector.get(DataLayerService);
        spyOn(dataLayerService, 'pushNewPageEvent').and.stub();
        sut.billSmoothingFuels = [fuelType];
        sut.frequency = BillSmoothingFrequency.Weekly;
        sut.selectedDate = '06 Sep 2017';
        de = fixture.debugElement;
    });

    describe('display error message when saving payment scheme pails', () => {
        it('should set isSavePaymentSchemeError to true if postBillSmoothingScheme API call fails', () => {
            // arrange
            const errorResponse = new Observable((observer: Subscriber<any>) => {
                observer.error({});
            });

            let apiService = fixture.debugElement.injector.get(ApiService);
            spyOn(apiService, 'postBillSmoothingScheme').and.returnValue(errorResponse);

            // act
            sut.savePaymentScheme();

            // assert
            expect(sut.isSavePaymentSchemeError).toBeTruthy();
        });

        it('should set isSavePaymentSchemeError to true if postBillSmoothingScheme API result status is unsuccessful', () => {
            // arrange
            const contractNumber = 123456;
            sut.billSmoothingFuels[0].contractNumber = contractNumber;
            const errorResponse = new Observable((observer: Subscriber<any>) => {
                observer.next({
                    results: [{
                        isSuccess: false,
                        contractNumber: contractNumber
                    }]
                });
            });

            let apiService = fixture.debugElement.injector.get(ApiService);
            spyOn(apiService, 'postBillSmoothingScheme').and.returnValue(errorResponse);

            // act
            sut.savePaymentScheme();

            // assert
            expect(sut.isSavePaymentSchemeError).toBeTruthy();
        });
    });

    describe('One elec and one gas', () => {
        beforeEach(() => {
            sut.billSmoothingFuels = TestData.oneAccountWithOneElecAndOneGas;
            sut.frequency = BillSmoothingFrequency.Weekly;
        });

        it('should generate the correct amount per fuel', () => {
            let amountPerFuels = sut.generateAmountPerFuel();

            expect(amountPerFuels.length).toBe(sut.billSmoothingFuels.length);
            expect(amountPerFuels[0].amount).toBe('13');
            expect(amountPerFuels[0].fuel).toBe('electricity');
            expect(amountPerFuels[1].amount).toBe('13');
            expect(amountPerFuels[1].fuel).toBe('gas');
        });

        it('should populate correct dates', () => {
            sut.selectedDay = 'Monday';

            const subtext = 'SUBTEXT';
            let bs: BillSmoothingService = fixture.debugElement.injector.get(BillSmoothingService);
            spyOn(bs, 'getStartInformationSubtext').and.returnValue(subtext);
            sut.populateWeeklyAndFortnightlyDates();

            let firstDate = new Date(sut.dates[0]);
            let lastDate = new Date(sut.dates[sut.dates.length - 1]);

            expect(sut.dates.length).not.toBe(0);
            expect(sut.dates).toContain(sut.selectedDate);
            expect(firstDate.getDay()).toBe(1);
            expect(lastDate.getDay()).toBe(1);
        });

        it('should update start information subtext', () => {
            // arrange
            const selectedDay = 'Tuesday';
            const frequency = 'Weekly';
            const isDirectDebit = true;
            const subtext = 'SUBTEXT';

            sut.selectedDay = selectedDay;
            sut.frequency = frequency;
            sut.isDirectDebit = isDirectDebit;
            let bs: BillSmoothingService = fixture.debugElement.injector.get(BillSmoothingService);
            spyOn(bs, 'getStartInformationSubtext').and.returnValue(subtext);

            // act
            sut.populateWeeklyAndFortnightlyDates();

            // assert
            expect(bs.getStartInformationSubtext).toHaveBeenCalledWith(frequency, isDirectDebit, selectedDay, null);
            expect(sut.startInformationSubtext).toBe(subtext);
        });
    });

});
