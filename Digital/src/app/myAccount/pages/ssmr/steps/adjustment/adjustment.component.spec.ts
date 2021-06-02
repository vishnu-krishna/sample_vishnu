import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { SelfServiceReadingResponse } from '../../../../../shared/service/api.service';
import { ContractDisplayViewModel } from '../../../../model/ssmr/contractDisplayView.model';
import { DayPluralPipe } from '../../../../pipes/dayPlural.pipe';
import { ISsmrService } from '../../../../services/contract/issmr.service';
import { PaymentService } from '../../../../services/payment.service';
import { AdjustmentComponent } from './adjustment.component';
import { AdjustmentComponentModule } from './index';

class MockPaymentService {
    public mockName: string = 'Mocked Service';
}

describe('SSMR Adjustment Component Tests', () => {

    let component: AdjustmentComponent;
    let fixture: ComponentFixture<AdjustmentComponent>;
    let element: DebugElement;

    let ssmrServiceStub: any;
    let mockContract: any;
    let selfServiceReadingResponse: any;
    beforeEach(() => {

        mockContract = {
        };

        ssmrServiceStub = {
            selectedContract: mockContract,
            SelfServiceReadingResponse: selfServiceReadingResponse,
            selfServiceMeterReadings: [],
            meterEntryIndex: 0,
            registerEntryIndex: 0,
            isMultiRegister: (meter) => meter && meter.registers && meter.registers.length > 1
        };
    });

    let mockEligibleContract: ContractDisplayViewModel = {
        accountNumber: '7013149351',
        address: '106 Head Street, Brighton VIC 3186',
        contractNumber: '9133061126',
        eligibilityMessage: 'Smart meter read taken automatically.',
        fuelType: 'Electricity',
        isEligible: false,
        isSmartMeter: false,
        suggestPhotoUpload: false,
        isGas: false,
        isElectricity: true,
        isBillSmoothing: false,
        ssmrModel: {
            screenCode: 'SSMR_MRE',
            meters: [
                {
                    meterSerial: 'SSMR_MRE1',
                    registers: [
                        {
                            registerId: '001',
                            dialFormat: 8,
                            currentMeterRead: '1790824',
                            lastMeterRead: '12345678',
                            lastReadQuality: 'Actual Read by MDP',
                            lastReadDate: '28.11.2016'
                        }
                    ]
                }
            ],
            error: {
                internalError: {
                    errorNumber: '000'
                }
            }
        }
    };

    let mockSelfServiceReadingResponse: SelfServiceReadingResponse = {
        isSuccess: true,
        screenCode: 'SSMR_ADJ1',
        accountBalance: 777,
        invoiceDueDate: null,
        numberOfDaysTillNextBill: '2',
        currentBill: null,
        projectedBill: null,
        lastInvoice: null,
        adjustment: null
    };

    const createComponent = () => {
        TestBed.configureTestingModule({
            imports: [
                AdjustmentComponentModule
            ],
            providers: [
                { provide: ISsmrService, useValue: ssmrServiceStub },
                { provide: PaymentService, useClass: MockPaymentService, },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ],
        });

        fixture = TestBed.createComponent(AdjustmentComponent);
        component = fixture.componentInstance;
    };

    describe('User submits self service meter reads', () => {
        beforeEach(() => {
            ssmrServiceStub.selectedContract = mockEligibleContract;
            ssmrServiceStub.SelfServiceReadingResponse = mockSelfServiceReadingResponse;
            ssmrServiceStub.selectedContract = mockEligibleContract;
         });
        it('Adjustment scenario - Bill smoothing enabled user', () => {
            mockEligibleContract.isBillSmoothing = true;
            ssmrServiceStub.selectedContract = mockEligibleContract;
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.adjustmentHeading).toEqual('Thanks for your read');
            expect(component.adjustmentMessage).toEqual(`Your meter read was taken within two days of your bill creation date, so we’ll use this to calculate your next bill.`);
        });

        it('Adjustment scenario - User with screen code SSMR_ADJ1', () => {
            mockEligibleContract.isBillSmoothing = false;
            ssmrServiceStub.screenCode = 'SSMR_ADJ1';
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.adjustmentHeading).toEqual('Your revised charges');
            expect(component.adjustmentMessage).toEqual('Great news, your meter read is lower than expected so we’ve adjusted your total to pay.');
        });

        it('Adjustment scenario - User with screen code SSMR_ADJ2', () => {
            mockEligibleContract.isBillSmoothing = false;
            ssmrServiceStub.screenCode = 'SSMR_ADJ2';
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.adjustmentHeading).toEqual('Credit applied');
            expect(component.adjustmentMessage).toEqual(`Great news, your meter read is lower than expected so we've credited your account.`);
        });

        it('Adjustment scenario - User with screen code SSMR_ADJ3', () => {
            mockEligibleContract.isBillSmoothing = false;
            ssmrServiceStub.screenCode = 'SSMR_ADJ3';
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.adjustmentHeading).toEqual('Your revised charges');
            expect(component.adjustmentMessage).toEqual('Great news, your meter read is lower than expected so we’ve adjusted your total to pay.');
        });

        it('Adjustment scenario - User with screen code SSMR_NSBD1', () => {
            mockEligibleContract.isBillSmoothing = false;
            ssmrServiceStub.screenCode = 'SSMR_NSBD1';
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.adjustmentHeading).toEqual('Your bill is on the way');
            expect(component.adjustmentMessage).toEqual('Your meter read was taken within two days of your bill creation date, so we’ll use this to calculate your next bill.');
        });

        it('Adjustment scenario - User with screen code SSMR_NSBD2', () => {
            mockEligibleContract.isBillSmoothing = false;
            ssmrServiceStub.screenCode = 'SSMR_NSBD2';
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.adjustmentHeading).toEqual('Your bill is on the way');
            expect(component.adjustmentMessage).toEqual('Your meter read was taken within two days of your bill creation date, so we’ll use this to calculate your next bill.');
        });

        it('Adjustment scenario - User with screen code SSMR_PROJ1', () => {
            mockEligibleContract.isBillSmoothing = false;
            ssmrServiceStub.screenCode = 'SSMR_PROJ1';
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.adjustmentHeading).toEqual('Thanks for your read');
            expect(component.adjustmentMessage).toEqual('Your meter read is what we expected. You’re now able to see your costs to date and a projection of your current billing cycle.');
        });

        it('Adjustment scenario - User with screen code SSMR_PROJ2', () => {
            mockEligibleContract.isBillSmoothing = false;
            ssmrServiceStub.screenCode = 'SSMR_PROJ2';
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.adjustmentHeading).toEqual('Thanks for your read');
            expect(component.adjustmentMessage).toEqual('Your meter read is what we expected. <br> This ensures that your current charges are accurate.');
        });
    });

    // Agl Day plural pipe
    describe('aglDayPlural pipe tests', () => {
        let pipe: DayPluralPipe;

        beforeEach(() => {
            pipe = new DayPluralPipe();
        });

        it('Checking Pipe -Plural Day working for days is 1', () => {
            let value: any = '1';

            expect(pipe.transform(value)).toEqual('1 day');
        });

        it('Checking Pipe - Plural Day working for days is greater than 1', () => {
            let value: any = '2';

            expect(pipe.transform(value)).toEqual('2 days');
        });
        it('Checking Pipe - Plural Day working for days is null', () => {
            let value: any = null;

            expect(pipe.transform(value)).toEqual('');
        });
    });
});
