import { DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { SmmrStubService } from './../../../../../test/stubs/ssmr.stub.service';

import { ISsmrService } from '../../../../services/contract/issmr.service';

import { AttachPhotoComponent } from './attachPhoto.component';
import { AttachPhotoComponentModule } from './index';

describe('Meter Entry Component Tests', () => {

    let component: AttachPhotoComponent;

    let fixture: ComponentFixture<AttachPhotoComponent>;
    let element: DebugElement;

    let ssmrService: ISsmrService;
    let mockContract: any;
    let mockPhotoReading: any;
    const DEFAULT_NUMBER_OF_METERS: number = 4;
    const isMultiRegister: boolean = false;

    beforeEach(() => {

        // Configure the DI that we need for our component and tests
        TestBed.configureTestingModule({
            imports: [
                AttachPhotoComponentModule
            ],
            providers: [
                { provide: ISsmrService, useClass: SmmrStubService },
                { provide: MATERIAL_SANITY_CHECKS, useValue: false }
            ],
        });

        fixture = TestBed.createComponent(AttachPhotoComponent);
        component = fixture.componentInstance;
    });

    beforeEach(
        // These injections should mirror the constructor signiture of the component you are testing
        inject([ISsmrService], (_ssmrService: ISsmrService) => {

            // Get the newly injected instances of these components, and assign them to our class global variables
            ssmrService = _ssmrService;

            // Setup mock data that we need reset for each test
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

            mockPhotoReading = [
                { meterSerial: '1234', registers: [{ registerId: 'abcd', dialFormat: 5, lastMeterRead: '123456' }], isThumbnailAvailable: false },
                { meterSerial: '5678', registers: [{ registerId: 'efgh', dialFormat: 6, lastMeterRead: '789012' }], isThumbnailAvailable: false },
                { meterSerial: '9012', registers: [{ registerId: 'ijkl', dialFormat: 7, lastMeterRead: '345678' }], isThumbnailAvailable: false },
                { meterSerial: '3456', registers: [{ registerId: 'mnop', dialFormat: 8, lastMeterRead: '901234' }], isThumbnailAvailable: false }
            ];

            if (DEFAULT_NUMBER_OF_METERS <= 1) {
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
            mockContract.ssmrModel.meters.length = DEFAULT_NUMBER_OF_METERS;
            mockContract.meterCount = DEFAULT_NUMBER_OF_METERS;
            ssmrService.selectedContract = mockContract;

    }));

    describe('Attach Photo Component Tests', () => {
        describe('Attach Photo initialization', () => {
            it('Should setup Photo Readings with no thumbnails.', () => {
                element = fixture.debugElement;
                fixture.detectChanges();
                expect(component.ssmrService.selfServicePhotoReadings).toEqual(mockPhotoReading);
            });
        });

        describe('onClickSubmit()', () => {
            it('Should go to Submitting page when a photo is selected', () => {
                spyOn(component.ssmrService, 'goToStep');
                element = fixture.debugElement;
                fixture.detectChanges();
                component.isSubmitDisabled = false;
                component.onClickSubmit();
                expect(component.ssmrService.submissionType).toEqual('Photo');
                expect(component.ssmrService.goToStep).toHaveBeenCalledWith('Submitting');
            });
        });

        describe('validateFileType', () => {

            describe('when not defined', () => {
                it('should return false', () => {
                    expect(component.validateFileType(undefined)).toBeFalsy();
                });
            });
            describe('when valid', () => {
                it('should return true', () => {
                    component.VALID_FILE_TYPES.forEach((VALID_FILE_TYPE) => {
                        expect(component.validateFileType(VALID_FILE_TYPE)).toBeTruthy();
                    });
                });
            });
            describe('when invalid', () => {
                it('should return false', () => {
                    expect(component.validateFileType('text/html')).toBeFalsy();
                });
            });
        });

        describe('validateFileSize', () => {

            describe('when not defined', () => {
                it('should return false', () => {
                    expect(component.validateFileType(undefined)).toBeFalsy();
                });
            });
            describe('when less than file size limit', () => {
                it('should return true', () => {
                    component.VALID_FILE_TYPES.forEach((VALID_FILE_TYPE) => {
                        expect(component.validateFileSize(component.MAX_FILE_SIZE - 1)).toBeTruthy();
                    });
                });
            });
            describe('when equal to file size limit', () => {
                it('should return true', () => {
                    component.VALID_FILE_TYPES.forEach((VALID_FILE_TYPE) => {
                        expect(component.validateFileSize(component.MAX_FILE_SIZE)).toBeTruthy();
                    });
                });
            });
            describe('when greater than size limit', () => {
                it('should return true', () => {
                    component.VALID_FILE_TYPES.forEach((VALID_FILE_TYPE) => {
                        expect(component.validateFileSize(component.MAX_FILE_SIZE + 1)).toBeFalsy();
                    });
                });
            });
        });

        describe('hasFileError', () => {
            const STUB_FILE: File = new File([], '');
            let index = 0;

            beforeEach(() => {
                ssmrService = component.ssmrService;
                ssmrService.selfServicePhotoReadings = [];
            });

            describe('when the uploaded file does not exist', () => {
                it('should return true', () => {
                    expect(component.hasFileError(index)).toBeFalsy();
                });
            });

            describe('when the uploaded file is set', () => {
                beforeEach(() => {
                    ssmrService.selfServicePhotoReadings[index] = { fileMetadata: STUB_FILE };
                });

                describe('and the file is valid', () => {
                    beforeEach(() => {
                        spyOn(component, 'validateFileTypeAndSize').and.returnValue(true);
                    });

                    it('should return false', () => {
                        expect(component.hasFileError(index)).toBeFalsy();
                    });
                });
                describe('and the file is not valid', () => {
                    beforeEach(() => {
                        spyOn(component, 'validateFileTypeAndSize').and.returnValue(false);
                    });

                    it('should return true', () => {
                        expect(component.hasFileError(index)).toBeTruthy();
                    });
                });
            });
        });
    });
});
