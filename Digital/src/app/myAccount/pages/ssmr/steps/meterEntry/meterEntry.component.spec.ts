import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';

import { ISsmrService } from '../../../../services/contract/issmr.service';

import { MeterEntryComponentModule } from './index';
import { MeterEntryComponent } from './meterEntry.component';

describe('Meter Entry Component Tests', () => {

    let component: MeterEntryComponent;
    let fixture: ComponentFixture<MeterEntryComponent>;
    let element: DebugElement;

    let ssmrServiceStub: any;
    let mockContract: any;
    const DEFAULT_NUMBER_OF_METERS: number = 4;

    beforeEach(() => {

        mockContract = {
            meterCount: DEFAULT_NUMBER_OF_METERS,
            ssmrModel: {
                meters: [
                    { meterSerial: '1234', registers: [{ registerId: 'abcd', dialFormat: 5, lastMeterRead: '123456' }] },
                    { meterSerial: '5678', registers: [{ registerId: 'efgh', dialFormat: 6, lastMeterRead: '789012' }] },
                    { meterSerial: '9012', registers: [{ registerId: 'ijkl', dialFormat: 7, lastMeterRead: '345678' }] },
                    { meterSerial: '3456', registers: [{ registerId: 'mnop', dialFormat: 8, lastMeterRead: '901234' }] }
                ]
            }
        };

        ssmrServiceStub = {
            selectedContract: mockContract,
            selfServiceMeterReadings: [],
            meterEntryIndex: 0,
            registerEntryIndex: 0,
            isMultiRegister: (meter) => meter && meter.registers && meter.registers.length > 1,
            // tslint:disable-next-line:no-empty
            goToStep: () => {},
            // tslint:disable-next-line:no-empty
            reloadMeterEntryPage: () => {
            }
        };
        // { meterSerial: '1234', registers: [{ reading: '11111' }] }
    });

    // max registers set at 3
    const createComponent = (numberOfMeters: number = DEFAULT_NUMBER_OF_METERS, isMultiRegister: boolean = false) => {

        if (numberOfMeters <= 1) {
            if (isMultiRegister) {
                mockContract.ssmrModel.meters[0].registers.push({ meterSerial: '0011', registers: [{ registerId: 'aass', dialFormat: 5, lastMeterRead: '12345678' }] });
                mockContract.ssmrModel.meters[0].registers.push({ meterSerial: '0022', registers: [{ registerId: 'ccdd', dialFormat: 5, lastMeterRead: '123456780' }] });
            }
        } else {
            if (isMultiRegister) {
                mockContract.ssmrModel.meters.forEach((meter) => {
                    meter.registers.push({ meterSerial: '0011', registers: [{ registerId: 'aabb', dialFormat: 5, lastMeterRead: '12345' }] });
                    meter.registers.push({ meterSerial: '0022', registers: [{ registerId: 'ccdd', dialFormat: 5, lastMeterRead: '12345' }] });
                });
            }
        }
        mockContract.ssmrModel.meters.length = numberOfMeters;
        mockContract.meterCount = numberOfMeters;
        ssmrServiceStub.selectedContract = mockContract;

        TestBed.configureTestingModule({
            imports: [
                MeterEntryComponentModule
            ],
            providers: [{ provide: ISsmrService, useValue: ssmrServiceStub },
                        { provide: MATERIAL_SANITY_CHECKS, useValue: false }]
        });

        fixture = TestBed.createComponent(MeterEntryComponent);
        component = fixture.componentInstance;
    };

    describe('initial state', () => {

        it('should set the contract', () => {
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.selectedContract).toEqual(mockContract);
        });

        describe('should set meterSerial to first meter', () => {
            it('should set meterSerial (by default)', () => {
                createComponent();

                element = fixture.debugElement;
                fixture.detectChanges();
                expect(component.meterSerial).toEqual('1234');
            });
        });
        describe('should set meterSerial to any meter', () => {
            it('should set meterSerial (explicitly)', () => {
                ssmrServiceStub.meterEntryIndex = 1;
                createComponent();

                element = fixture.debugElement;
                fixture.detectChanges();
                expect(component.meterSerial).toEqual('5678');
            });
        });

        it('should set registerId', () => {
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.registerIdExists).toBeTruthy();
        });

        it('should set numberOfDigitsinRegister correctly', () => {
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.numberOfDigitsinRegister).toEqual(5);
        });

        it('should set lastReadValue correctly', () => {
            createComponent();

            element = fixture.debugElement;
            fixture.detectChanges();
            expect(component.lastReadValue).toEqual('123456');
        });

        describe('getMeterHeading', () => {
            it('should set heading for one meter', () => {

                createComponent(1, false);

                element = fixture.debugElement;
                fixture.detectChanges();
                expect(component.getMeterHeading()).toEqual('Enter your meter read');
            });
            describe('multiple meters', () => {
                // beforeEach(() => {
                    // mockContract.meterCount = 4;
                // });
                it('should set heading for 2nd meter', () => {
                    ssmrServiceStub.meterEntryIndex = 1;

                    createComponent();

                    element = fixture.debugElement;
                    fixture.detectChanges();
                    expect(component.getMeterHeading()).toEqual('Meter 2');
                });
                it('should set heading for 3rd meter', () => {
                    ssmrServiceStub.meterEntryIndex = 2;

                    createComponent();

                    element = fixture.debugElement;
                    fixture.detectChanges();
                    expect(component.getMeterHeading()).toEqual('Meter 3');
                });
                it('should set heading for 4th meter', () => {
                    ssmrServiceStub.meterEntryIndex = 3;

                    createComponent();

                    element = fixture.debugElement;
                    fixture.detectChanges();
                    expect(component.getMeterHeading()).toEqual('Meter 4');
                });
            });
        });

        describe('getRegisterHeading', () => {
            describe('single register meters', () => {
                it('should set empty heading', () => {
                    createComponent(1, false);

                    element = fixture.debugElement;
                    fixture.detectChanges();

                    expect(component.getRegisterHeading()).toEqual('');
                });
            });
            describe('multiple register meters', () => {
                it('should set heading for 1st register', () => {
                    ssmrServiceStub.registerEntryIndex = 0;

                    createComponent(4, true);

                    element = fixture.debugElement;
                    fixture.detectChanges();

                    expect(component.getRegisterHeading()).toEqual('Register 1 of 3');
                });
                it('should set heading for 2nd register', () => {
                    ssmrServiceStub.registerEntryIndex = 1;

                    createComponent(4, true);

                    element = fixture.debugElement;
                    fixture.detectChanges();
                    expect(component.getRegisterHeading()).toEqual('Register 2 of 3');
                });
                it('should set heading for 3rd register', () => {
                    ssmrServiceStub.registerEntryIndex = 2;

                    createComponent(4, true);

                    element = fixture.debugElement;
                    fixture.detectChanges();
                    expect(component.getRegisterHeading()).toEqual('Register 3 of 3');
                });
            });
        });

        describe('skip meter', () => {
            it('should initially set isSkipMeterError to false', () => {
                createComponent();

                fixture.detectChanges();

                expect(component.isSkipMeterError).toBeFalsy();
            });

            describe('for non-multi-register', () => {
                it('should set the meter reading to empty', () => {
                    const index = ssmrServiceStub.meterEntryIndex;
                    createComponent();

                    fixture.detectChanges();
                    component.onClickSkipMeter();

                    expect(component.ssmrService.selfServiceMeterReadings[index]).toBeUndefined();
                });
            });

            describe('when it is the last step', () => {

                beforeEach(() => {
                    createComponent(4, false);
                    fixture.detectChanges();
                    component.meterSerial = '3456';
                    component.ssmrService.meterEntryIndex = 3;
                    spyOn(component.ssmrService, 'goToStep');
                });

                describe('when there is a valid reading', () => {

                    beforeEach(() => {
                        component.registerReadValue = '12345';
                        component.ssmrService.selfServiceMeterReadings =  [{
                            meterSerial: '1234',
                            registers: [
                                {
                                    registerId: 'abcd',
                                    reading: '12345'
                                }
                            ]
                        }];
                    });

                    it('should go to the summary page', () => {
                        component.onClickSkipMeter();
                        expect(component.ssmrService.goToStep).toHaveBeenCalledWith('Summary');
                    });
                    it('should not set the skip meter error flag', () => {
                        component.onClickSkipMeter();
                        expect(component.isSkipMeterError).toBeFalsy();
                    });
                });
                describe('when there is not valid reading', () => {
                    it('should not go to the summary page', () => {
                        component.ssmrService.selfServiceMeterReadings = [];
                        expect(component.ssmrService.goToStep).not.toHaveBeenCalled();
                    });

                    it('should set the skip meter error flag', () => {
                        component.onClickSkipMeter();
                        expect(component.isSkipMeterError).toBeTruthy();
                    });
                });
            });

            describe('when it is not the last step', () => {
                describe('when there is a valid reading', () => {
                    describe('for single-register meters', () => {

                        it('should increase the current step', () => {
                            createComponent();
                            fixture.detectChanges();

                            expect(component.ssmrService.meterEntryIndex).toEqual(0);
                            component.onClickSkipMeter();
                            expect(component.ssmrService.meterEntryIndex).toEqual(1);
                        });

                        it('should reload the meter entry page', () => {
                            createComponent();
                            fixture.detectChanges();
                            spyOn(component.ssmrService, 'reloadMeterEntryPage');

                            component.onClickSkipMeter();
                            expect(component.ssmrService.reloadMeterEntryPage).toHaveBeenCalled();
                        });
                    });
                });

                describe('when there is not a valid reading', () => {
                    it('should increase the current step', () => {
                        createComponent();
                        fixture.detectChanges();

                        expect(component.ssmrService.meterEntryIndex).toEqual(0);
                        component.onClickSkipMeter();
                        expect(component.ssmrService.meterEntryIndex).toEqual(1);
                    });
                });
            });
        });

        describe('formatLastRead', () => {
            beforeEach(() => {
                createComponent();
                fixture.detectChanges();
            });

            describe('for an empty read', () => {
                it('should return undefined', () => {
                    expect(component.formatLastRead('')).toBeUndefined();
                });
            });

            describe('for an valid read', () => {
                it('should trim the decimals and pad left', () => {
                    expect(component.formatLastRead('123.12')).toEqual('00123');
                });
                it('should call padLeftWithZeros', () => {
                    spyOn(component, 'padLeftWithZeros');
                    component.formatLastRead('123.12');
                    expect(component.padLeftWithZeros).toHaveBeenCalledWith('123', component.numberOfDigitsinRegister);
                });
            });

            describe('padLeftWithZeros', () => {
                it('should pad with 3 characters', () => {
                    expect(component.padLeftWithZeros('3', 3)).toEqual('003');
                });
                it('should pad with 10 characters', () => {
                    expect(component.padLeftWithZeros('9', 10)).toEqual('0000000009');
                });
                it('should pad no extra characters', () => {
                    expect(component.padLeftWithZeros('322', 3)).toEqual('322');
                });
            });
        });

        describe('onClickSubmit', () => {

            describe('error checking', () => {

                describe('when entered digits are less than required', () => {
                    beforeEach(() => {
                        createComponent();
                        fixture.detectChanges();
                    });

                    it('should set the failedValidation flag', () => {
                        component.registerReadValue = '123';

                        component.onClickSubmit();

                        expect(component.failedValidation).toBeTruthy();
                    });
                });
                describe('when any entered digit match \u2007', () => {
                    beforeEach(() => {
                        createComponent();
                        fixture.detectChanges();
                    });

                    it('should set the failedValidation flag', () => {
                        component.registerReadValue = '12' + component.INPUT_PLACEHOLDER_SPACE_CHAR;

                        component.onClickSubmit();

                        expect(component.failedValidation).toBeTruthy();
                    });
                });

                describe('when entered digits are correct', () => {
                    beforeEach(() => {
                        createComponent();
                        fixture.detectChanges();
                        component.registerReadValue = '12345';
                    });

                    it('should not set the failedValidation flag', () => {

                        component.onClickSubmit();

                        expect(component.failedValidation).toBeFalsy();
                    });
                    it('should update selfServiceMeterReading', () => {

                        component.ssmrService.selfServiceMeterReadings = [];

                        component.onClickSubmit();

                        const selfServiceMeterReading = {
                            meterSerial: component.meterSerial,
                            registers: [
                                {
                                    registerId: component.registerId,
                                    reading: component.registerReadValue
                                }
                            ]
                        };

                        expect(component.selfServiceMeterReading).toEqual(selfServiceMeterReading);
                        expect(component.ssmrService.selfServiceMeterReadings[0]).toEqual(selfServiceMeterReading);
                    });
                });
            });
            describe('when navigating away after submit', () => {
                describe('for multi-register meters', () => {
                    describe('for single meter readings', () => {
                        beforeEach(() => {
                            createComponent(1, true);
                            fixture.detectChanges();
                            spyOn(component.ssmrService, 'goToStep');
                            component.registerReadValue = '12345';
                        });
                        describe('when on the meter/register reading', () => {
                            describe('having at least one read entered', () => {
                                it('should navigate to the "Summary" page', () => {
                                    component.ssmrService.registerEntryIndex = 2;

                                    component.onClickSubmit();

                                    expect(component.ssmrService.goToStep).toHaveBeenCalledWith('Summary');
                                });
                            });
                        });
                    });

                    describe('for multi-meter readings', () => {
                        describe('when not on the last meter reading', () => {
                            describe('going to the next register', () => {
                                it('should increment registerEntryIndex', () => {
                                    createComponent(4, true);
                                    fixture.detectChanges();
                                    component.registerReadValue = '12345';
                                    expect(component.ssmrService.registerEntryIndex).toEqual(0);
                                    component.onClickSubmit();
                                    expect(component.ssmrService.registerEntryIndex).toEqual(1);
                                });
                            });
                            describe('going to the next meter', () => {
                                it('should increment meterEntryIndex', () => {
                                    createComponent(4, true);
                                    fixture.detectChanges();
                                    component.registerReadValue = '12345';
                                    component.ssmrService.registerEntryIndex = 2;
                                    expect(component.ssmrService.meterEntryIndex).toEqual(0);
                                    component.onClickSubmit();
                                    expect(component.ssmrService.meterEntryIndex).toEqual(1);
                                });
                            });
                            it('should set isSkipMeter to false', () => {
                                createComponent(4, true);
                                fixture.detectChanges();
                                component.registerReadValue = '12345';

                                component.onClickSubmit();
                                expect(component.isSkipMeterError).toBeFalsy();
                            });

                            it('should reload the meter entry page', () => {
                                createComponent(4, true);
                                fixture.detectChanges();
                                component.registerReadValue = '12345';

                                spyOn(component.ssmrService, 'reloadMeterEntryPage');

                                component.onClickSubmit();
                                expect(component.ssmrService.reloadMeterEntryPage).toHaveBeenCalled();
                            });
                        });
                        describe('when on the last meter/register reading', () => {
                            beforeEach(() => {
                                createComponent();
                                fixture.detectChanges();
                                spyOn(component.ssmrService, 'goToStep');
                                component.registerReadValue = '12345';
                            });
                            describe('having at least one read entered', () => {
                                it('should navigate to the "Submitting" page', () => {
                                    component.ssmrService.meterEntryIndex = 3;
                                    component.ssmrService.registerEntryIndex = 2;

                                    component.onClickSubmit();

                                    expect(component.ssmrService.goToStep).toHaveBeenCalledWith('Summary');
                                });
                            });
                        });
                    });
                });

                describe('for single-register meters', () => {
                    describe('for single meter readings', () => {
                        beforeEach(() => {
                            createComponent(1, false);
                            fixture.detectChanges();
                            spyOn(component.ssmrService, 'goToStep');
                            component.registerReadValue = '12345';
                        });
                        it('should navigate to the "Submitting" page', () => {
                            component.onClickSubmit();

                            expect(component.ssmrService.goToStep).toHaveBeenCalledWith('Submitting');
                        });
                    });

                    describe('for multi-meter readings', () => {
                        describe('when on the last meter reading', () => {
                            beforeEach(() => {
                                createComponent();
                                fixture.detectChanges();
                                spyOn(component.ssmrService, 'goToStep');
                                component.registerReadValue = '12345';
                            });
                            describe('having at least one read entered', () => {
                                it('should navigate to the "Submitting" page', () => {
                                    component.ssmrService.meterEntryIndex = 3;

                                    component.onClickSubmit();

                                    expect(component.ssmrService.goToStep).toHaveBeenCalledWith('Summary');
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
