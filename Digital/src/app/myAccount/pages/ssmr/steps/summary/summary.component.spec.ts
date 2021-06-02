import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ISsmrService } from '../../../../services/contract/issmr.service';
import { SsmrService } from '../../../../services/ssmr.service';
import { SummaryComponent } from './summary.component';

describe('SSMR Component Tests', () => {
    let comp: SummaryComponent;
    let fixture: ComponentFixture<SummaryComponent>;
    let de: DebugElement;
    let ssmrService: SsmrService;

    let mockMeter;
    let ssmrServiceStub;

    ssmrServiceStub = {
        selfServiceMeterReadings: [{ meterSerial: '1234', registers: [{ reading: '11111' }] }],
        meterEntryIndex: 0
    };

    describe('Test component initial state', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [
                    SummaryComponent
                ],
                imports: [
                ],
                providers: [
                    { provide: ISsmrService, useValue: ssmrServiceStub },
                ]
            });
            fixture = TestBed.createComponent(SummaryComponent);
            comp = fixture.componentInstance;
        });

        it(`should return Register count as 0 when there are no value is sumbitted for a particular meter serial`, async(() => {

            mockMeter = {
                meterSerial: '1234',
                registers: [
                    {
                        currentMeterRead: '1790824',
                        dialFormat: '5',
                        lastMeterRead: '36346',
                        lastReadDate: '28.11.2016',
                        lastReadQuality: 'Actual Read by MDP',
                        registerId: '001'
                    },
                    {
                        currentMeterRead: '1790825',
                        dialFormat: '6',
                        lastMeterRead: '363465',
                        lastReadDate: '28.11.2016',
                        lastReadQuality: 'Actual Read by MDP',
                        registerId: '021'
                    }
                ]
            };
            comp.ssmrService.selfServiceMeterReadings = [{ meterSerial: '1234', registers: [] }];

            expect(comp.getRegisterMessage(mockMeter)).toEqual('Registers 0 of 2');
        }));

        it(`should return Register count as 1 when there is only one value sumbitted for a particular meter serial`, async(() => {

            mockMeter = {
                meterSerial: '1234',
                registers: [
                    {
                        currentMeterRead: '1790824',
                        dialFormat: '5',
                        lastMeterRead: '36346',
                        lastReadDate: '28.11.2016',
                        lastReadQuality: 'Actual Read by MDP',
                        registerId: '0001'
                    },
                    {
                        currentMeterRead: '1790825',
                        dialFormat: '6',
                        lastMeterRead: '363465',
                        lastReadDate: '28.11.2016',
                        lastReadQuality: 'Actual Read by MDP',
                        registerId: '021'
                    }
                ]
            };

            expect(comp.getRegisterMessage(mockMeter)).toEqual('Registers 1 of 2');
        }));

        it(`should return Register count as 2 when user submitted value for all registers sumbitted for a particular meter serial`, async(() => {

            mockMeter = {
                meterSerial: '1234',
                registers: [
                    {
                        currentMeterRead: '1790824',
                        dialFormat: '5',
                        lastMeterRead: '36346',
                        lastReadDate: '28.11.2016',
                        lastReadQuality: 'Actual Read by MDP',
                        registerId: '0001'
                    },
                    {
                        currentMeterRead: '1790825',
                        dialFormat: '6',
                        lastMeterRead: '363465',
                        lastReadDate: '28.11.2016',
                        lastReadQuality: 'Actual Read by MDP',
                        registerId: '021'
                    }
                ]
            };
            comp.ssmrService.selfServiceMeterReadings = [{
                meterSerial: '1234', registers: [
                    { registerId: '0001', reading: '11111' },
                    { registerId: '021', reading: '22222' }
                ]
            }];

            expect(comp.getRegisterMessage(mockMeter)).toEqual('Registers 2');
        }));
    });
});
