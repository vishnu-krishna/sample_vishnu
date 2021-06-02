import { async, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { ContractDisplayViewModel } from './../myAccount/model/ssmr/contractDisplayView.model';

import { Observable } from 'rxjs/Observable';

import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { IAccountServiceMA } from '../myAccount/services/account.service';
import { ISsmrService } from '../myAccount/services/contract/issmr.service';
import { AccountMockService } from '../myAccount/services/mock/account.mock.service';
import { SsmrService, SsmrStep } from '../myAccount/services/ssmr.service';
import { AccountApiModel, ApiService, SelfServiceEligibilityResponseApiModel } from '../shared/service/api.service';
import { ConfigService } from '../shared/service/config.service';
import { ApiStubService } from './stubs/api.stub.service';

describe('SSMR Service', () => {

    let ssmrService: ISsmrService = null;
    let apiService: ApiService = null;
    let accountService: IAccountServiceMA = null;
    let domSanitizer: DomSanitizer = null;
    let configService: ConfigService = null;
    let mockContract;
    const CONTRACT_WITH_PHOTO_UPLOAD_ERROR = {
        ssmrModel: {
            meters: [
                {
                    meterSerial: 'ELEC5678901234567a',
                    registers: [
                        {
                            currentMeterRead: '1790824',
                            dialFormat: '5',
                            lastMeterRead: '36346',
                            lastReadDate: '28.11.2016',
                            lastReadQuality: 'Actual Read by MDP',
                            registerId: '001'
                        }
                    ]
                }
            ],
            screenCode: 'SSMR_EX1',
            error: {
                internalError: {
                    errorNumber: '025'
                }
            }
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ConfigService, useClass: ConfigService },
                { provide: ApiService, useClass: ApiStubService },
                { provide: IAccountServiceMA, useClass: AccountMockService },
                {
                    provide: ISsmrService, useClass: SsmrService,
                    deps: [ApiService, IAccountServiceMA, ConfigService, DomSanitizer, Location]
                },
                Location,
                { provide: LocationStrategy, useClass: PathLocationStrategy },
                { provide: APP_BASE_HREF, useValue : '/' }
            ]
        });

        mockContract = {
            accountNumber: '7013149351',
            address: '106 Head Street, Brighton VIC 3186',
            contractNumber: '9133061126',
            eligibilityMessage: 'Smart meter read taken automatically.',
            fuelType: 'Electricity',
            isEligible: false,
            isSmartMeter: true,
            suggestPhotoUpload: false,

            ssmrModel: {
                screenCode: 'SSMR_MRE',
                error: null,
                meters: [
                    {
                        meterSerial: 'ELEC5678901234567a',
                        registers: [
                            {
                                currentMeterRead: '1790824',
                                dialFormat: '5',
                                lastMeterRead: '36346',
                                lastReadDate: '28.11.2016',
                                lastReadQuality: 'Actual Read by MDP',
                                registerId: '001'
                            }
                        ]
                    }
                ]
            }
        };

    });

    beforeEach(inject([ISsmrService, ApiService, IAccountServiceMA, ConfigService, DomSanitizer],
        (_ssmrService: ISsmrService, _apiService: ApiService, _accountService: IAccountServiceMA,
         _configService: ConfigService, _domSanitizer: DomSanitizer) => {
            ssmrService = _ssmrService;
            apiService = _apiService;
            accountService = _accountService;
            configService = _configService;
            domSanitizer = _domSanitizer;

            spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.callFake((param) => param);
        }));

    it(`should define SSMR Service and dependant mock services.`, async(() => {

        expect(accountService).toBeDefined();
        expect(apiService).toBeDefined();
        expect(ssmrService).toBeDefined(`Subject is not defined`);
        expect(configService).toBeDefined();
        expect(domSanitizer).toBeDefined();
        expect(location).toBeDefined();
    }));

    it(`should go to given step in the SSMR workflow. goToStep()`, async(() => {

        let steps: SsmrStep[] = ['Safety', 'ChooseService', 'MeterEntry', 'Submitting', 'Oops'];

        steps.forEach((item) => {
            ssmrService.goToStep(item);
            expect(ssmrService.currentStep).toBe(item);
        });

    }));

    it(`should determine if a contract is eligibile for SSMR. isEligible()`, async(() => {

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

        expect(ssmrService.isEligible(mockEligibleContract)).toBeTruthy();

        let mockIneligibleContract: ContractDisplayViewModel = {
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
            ssmrModel: {
                screenCode: 'SSMR_EX5',
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
                        errorNumber: '071'
                    }
                }
            }
        };

        expect(ssmrService.isEligible(mockIneligibleContract)).toBeFalsy();

    }));

    it(`should return Eligible Contract with single contract, single meter, and single register. getEligibleContracts()`, async(() => {

        let mockAccounts: AccountApiModel[] = [
            {
                number: '7019079511',
                firstName: 'Lauren',
                lastName: 'Ferguson',
                contracts: [
                    {
                        address: 'U C105/460 Victoria Street|BRUNSWICK VIC 3056',
                        accountNumber: '7019079511',
                        fuelType: 'Electricity',
                        nameId: 'AGL_0000C99DF8261ED582B680F41CDC4EDF',
                        number: '9400307029',
                        planName: 'Set and Forget',
                        inFlight: false,
                        isRestricted: false,
                        hasElectricVehicle: false,
                        hasSolar: false,
                        solarCheckRegistered: false,
                        productId: '',
                        regionId: ''
                    }
                ]
            }
        ];

        let mockSelfServiceEligibilityResponse: SelfServiceEligibilityResponseApiModel = {
            screenCode: 'SSMR_EX1',
            meters: [
                {
                    meterSerial: 'SSMR_MRE1',
                    registers: [
                        {
                            registerId: '001',
                            dialFormat: 5,
                            currentMeterRead: '1790824',
                            lastMeterRead: '02180',
                            lastReadQuality: 'Actual Read by MDP',
                            lastReadDate: '28.11.2016'
                        }
                    ]
                }
            ],
            error: {}
        };

        spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
        spyOn(apiService, 'getMetersForContract').and.returnValue(Observable.of(mockSelfServiceEligibilityResponse));

        ssmrService.getEligibleContracts().subscribe(
            (result) => {
                expect(result).toBeTruthy();
                expect(result.length).toBe(1);
                expect(result[0].isEligible).toBeFalsy();
                expect(result[0].ssmrModel).toBeTruthy();
                expect(result[0].ssmrModel.meters.length).toBe(1);
                expect(result[0].ssmrModel.meters[0].registers.length).toBe(1);
            }
        );
    }));

    it(`should not contain the restricted contract in the list of contacts to display in meter read`, async(() => {

        let mockAccounts: AccountApiModel[] = [
            {
                number: '7019079511',
                firstName: 'Lauren',
                lastName: 'Ferguson',
                contracts: [
                    {
                        address: 'U C105/460 Victoria Street|BRUNSWICK VIC 3056',
                        accountNumber: '7019079511',
                        fuelType: 'Electricity',
                        nameId: 'AGL_0000C99DF8261ED582B680F41CDC4EDF',
                        number: '9400307029',
                        planName: 'Set and Forget',
                        inFlight: false,
                        isRestricted: true,
                        hasElectricVehicle: false,
                        hasSolar: false,
                        solarCheckRegistered: false,
                        productId: '',
                        regionId: ''
                    }
                ]
            }
        ];

        let mockSelfServiceEligibilityResponse: SelfServiceEligibilityResponseApiModel = {
            screenCode: 'SSMR_EX1',
            meters: [
                {
                    meterSerial: 'SSMR_MRE1',
                    registers: [
                        {
                            registerId: '001',
                            dialFormat: 5,
                            currentMeterRead: '1790824',
                            lastMeterRead: '02180',
                            lastReadQuality: 'Actual Read by MDP',
                            lastReadDate: '28.11.2016'
                        }
                    ]
                }
            ],
            error: {}
        };

        spyOn(accountService, 'getAccounts').and.returnValue(Observable.of(mockAccounts));
        spyOn(apiService, 'getMetersForContract').and.returnValue(Observable.of(mockSelfServiceEligibilityResponse));
        ssmrService.loadEligibility();
        ssmrService.getEligibleContracts().subscribe(
            (result) => {
                expect(result).toBeTruthy();
                expect(result.length).toBe(0);
            }
        );
    }));

    describe('for non multi-register meters', () => {
        describe('when a meter is eligible', () => {
            it('should not showWebChatLink', () => {
                expect(ssmrService.showWebChat(mockContract)).toBeFalsy();
            });
            it('should not suggestPhotoUpload', () => {
                expect(ssmrService.suggestPhotoUpload(mockContract)).toBeFalsy();
            });
        });
        describe('when a meter eligibility error occurs (and matches suggest photo upload)', () => {
            it('should suggestPhotoUpload', () => {
                mockContract = CONTRACT_WITH_PHOTO_UPLOAD_ERROR;
                expect(ssmrService.suggestPhotoUpload(mockContract)).toBeTruthy();
            });
        });
    });

    describe('for multi-register meters', () => {
        describe('when a meter is eligible', () => {
            beforeEach(() => {
                mockContract.ssmrModel.meters[0].registers.push(mockContract.ssmrModel.meters[0].registers[0]);
            });
            it('should not showWebChatLink', () => {
                expect(ssmrService.showWebChat(mockContract)).toBeFalsy();
            });
            it('should not suggestPhotoUpload', () => {
                expect(ssmrService.suggestPhotoUpload(mockContract)).toBeFalsy();
            });
        });

        describe('when a meter eligibility error occurs (and matches suggest photo upload)', () => {
            beforeEach(() => {
                mockContract = CONTRACT_WITH_PHOTO_UPLOAD_ERROR;
                mockContract.ssmrModel.meters[0].registers.push(mockContract.ssmrModel.meters[0].registers[0]);
            });
            it('should showWebChatLink', () => {
                expect(ssmrService.showWebChat(mockContract)).toBeTruthy();
            });
            it('should not suggestPhotoUpload', () => {
                expect(ssmrService.suggestPhotoUpload(mockContract)).toBeFalsy();
            });
        });
    });

    it(`should return Eligibility Message reason if contract is ineligible. getEligibilityMessage()`, async(() => {

        ssmrService.ELIGIBILITY_ERROR_MESSAGES.forEach((item, i) => {
            mockContract = {
                accountNumber: '7013149351',
                address: '106 Head Street, Brighton VIC 3186',
                contractNumber: '9133061126',
                eligibilityMessage: 'Smart meter read taken automatically.',
                fuelType: 'Electricity',
                isEligible: false,
                isSmartMeter: true,
                ssmrModel: {
                    screenCode: item.screenCode,
                    error: {
                        internalError: {
                            errorNumber: item.errorNumber
                        }
                    }
                }
            };

            expect(ssmrService.getEligibilityMessage(mockContract)).toBe(item.message, `errorNumber: ${item.errorNumber}. message: ${item.message}`);
        });
    }));

    it(`should return Meter Read Error Message reason if submitted meter read is an error. getMeterReadErrorMessage()`, async(() => {

        ssmrService.METER_READ_ERROR_MESSAGES.forEach((item, i) => {
            ssmrService.selfServiceReadingResponse = {
                isSuccess: true,
                screenCode: item.screenCode,
                meters: [{
                    meterSerial: 'SSMR_MRE1',
                    photoUploadRequired: false,
                    registers: [{
                        registerId: '001',
                        reading: '',
                        isValid: true,
                        status: ''
                    }]
                }],
                error: {
                    internalError: {
                        errorNumber: item.errorNumber
                    }
                }
            };

            expect(ssmrService.getMeterReadErrorMessage()).toBe(item.message, `errorNumber: ${item.errorNumber}. message: ${item.message}`);
        });
    }));

    describe('reloadMeterEntryPage', () => {
        it('should clear the current step', () => {
            ssmrService.reloadMeterEntryPage();
            expect(ssmrService.currentStep).toBe(null);
        });

        it('should set current step to "Meter Entry"', fakeAsync(() => {
            ssmrService.reloadMeterEntryPage();
            tick(1);
            expect(ssmrService.currentStep).toBe('MeterEntry');
        }));
    });

    describe('isBackButtonAvailable', () => {
        it('should return false for initial steps', () => {
            ssmrService.BACK_BUTTON_DISABLED_STEPS.forEach((initialStep: SsmrStep) => {
                ssmrService.currentStep = initialStep;
                expect(ssmrService.isBackButtonAvailable()).toBeFalsy();
            });
        });
        it('should return true for non-initial steps', () => {
            ssmrService.currentStep = 'Summary';
            expect(ssmrService.isBackButtonAvailable()).toBeTruthy();
            ssmrService.currentStep = 'MultiRegisterOnboard';
            expect(ssmrService.isBackButtonAvailable()).toBeTruthy();
            ssmrService.currentStep = 'MeterEntry';
            expect(ssmrService.isBackButtonAvailable()).toBeTruthy();
        });
    });

    describe('isContractMultiRegister', () => {
        it('Should return false for single register contract', () => {
            expect(ssmrService.isContractMultiRegister(mockContract)).toBeFalsy();
        });
        it('Should return true for single register contract', () => {
            mockContract.ssmrModel.meters[0].registers.push(mockContract.ssmrModel.meters[0].registers[0]);
            expect(ssmrService.isContractMultiRegister(mockContract)).toBeTruthy();
        });
    });

    describe('isContractMultiMeter', () => {
        it('Should return false for single meter contract', () => {
            expect(ssmrService.isContractMultiMeter(mockContract)).toBeFalsy();
        });
        it('Should return true for multi meter contract', () => {
            mockContract.ssmrModel.meters.push(mockContract.ssmrModel.meters[0]);
            expect(ssmrService.isContractMultiMeter(mockContract)).toBeTruthy();
        });
    });

    describe('onClickBack', () => {
        describe('when current step is "Safety"', () => {
            it('Should not change the current step', () => {
                ssmrService.currentStep = 'ChooseService';
                ssmrService.onClickBack();
                expect(ssmrService.currentStep).toEqual('ChooseService');
            });
        });
        describe('when current step is not "Safety"', () => {
            describe('when current step is "ChooseService"', () => {
                it('Should set currentStep to Safety', () => {
                    ssmrService.currentStep = 'Safety';
                    ssmrService.onClickBack();
                    expect(ssmrService.currentStep).toEqual('ChooseService');
                });
            });
            describe('when current step is "MeterEntry"', () => {
                describe('when on the first meter entry', () => {
                    describe('for a multi-register reading', () => {
                        describe('for a multi-meter reading', () => {
                            it('Should set currentStep to MultiRegisterOnboard', () => {
                                ssmrService.meterEntryIndex = 0;
                                mockContract.ssmrModel.meters.push(mockContract.ssmrModel.meters[0]);
                                mockContract.ssmrModel.meters[0].registers.push(mockContract.ssmrModel.meters[0].registers[0]);
                                ssmrService.registerEntryIndex = 0;
                                ssmrService.selectedContract = mockContract;
                                ssmrService.currentStep = 'MeterEntry';
                                ssmrService.onClickBack();
                                expect(ssmrService.currentStep).toEqual('MultiRegisterOnboard');
                            });
                        });
                        describe('for a non multi-meter reading', () => {
                            it('Should set currentStep to MultiRegisterOnboard', () => {
                                ssmrService.meterEntryIndex = 0;
                                mockContract.ssmrModel.meters[0].registers.push(mockContract.ssmrModel.meters[0].registers[0]);
                                ssmrService.registerEntryIndex = 0;
                                ssmrService.selectedContract = mockContract;
                                ssmrService.currentStep = 'MeterEntry';
                                ssmrService.onClickBack();
                                expect(ssmrService.currentStep).toEqual('MultiRegisterOnboard');
                            });
                        });
                    });
                    describe('for a non multi-register reading', () => {
                        describe('for a multi-meter reading', () => {
                            it('Should set currentStep to MultiMeterIntro', () => {
                                ssmrService.meterEntryIndex = 0;
                                mockContract.ssmrModel.meters.push(mockContract.ssmrModel.meters[0]);
                                ssmrService.selectedContract = mockContract;
                                ssmrService.currentStep = 'MeterEntry';
                                ssmrService.onClickBack();
                                expect(ssmrService.currentStep).toEqual('MultiMeterIntro');
                            });
                        });
                        describe('for a non multi-meter reading', () => {
                            it('Should set currentStep to ChooseService', () => {
                                ssmrService.meterEntryIndex = 0;
                                ssmrService.selectedContract = mockContract;
                                ssmrService.currentStep = 'MeterEntry';
                                ssmrService.onClickBack();
                                expect(ssmrService.currentStep).toEqual('ChooseService');
                            });
                        });
                    });
                });
                describe('when not on the first meter entry', () => {
                    describe('for a multi-meter reading', () => {
                        it('Should set currentStep to MeterEntry', () => {
                            ssmrService.meterEntryIndex = 3;
                            ssmrService.registerEntryIndex = 0;
                            mockContract.ssmrModel.meters.push(mockContract.ssmrModel.meters[0]);
                            mockContract.ssmrModel.meters.push(mockContract.ssmrModel.meters[1]);
                            mockContract.ssmrModel.meters.push(mockContract.ssmrModel.meters[2]);
                            ssmrService.selectedContract = mockContract;
                            ssmrService.currentStep = 'MeterEntry';
                            ssmrService.onClickBack();
                            expect(ssmrService.currentStep).toEqual('MeterEntry');
                            expect(ssmrService.meterEntryIndex).toEqual(2);
                        });
                    });
                });
            });
            describe('when current step is "Submitting"', () => {
                describe('for a multi-meter reading', () => {
                    it('Should set currentStep to Summary', () => {
                        mockContract.ssmrModel.meters.push(mockContract.ssmrModel.meters[0]);
                        ssmrService.selectedContract = mockContract;
                        ssmrService.currentStep = 'Submitting';
                        ssmrService.onClickBack();
                        expect(ssmrService.currentStep).toEqual('Summary');
                    });
                });
                describe('for a non multi-meter reading', () => {
                    it('Should set currentStep to MeterEntry', () => {
                        ssmrService.selectedContract = mockContract;
                        ssmrService.currentStep = 'Submitting';
                        ssmrService.onClickBack();
                        expect(ssmrService.currentStep).toEqual('MeterEntry');
                    });
                });
            });
            describe('when current step is "MultiMeterIntro"', () => {
                it('Should set currentStep to ChooseService', () => {
                    ssmrService.currentStep = 'MultiMeterIntro';
                    ssmrService.onClickBack();
                    expect(ssmrService.currentStep).toEqual('ChooseService');
                });
            });
            describe('when current step is "MultiRegisterOnboard"', () => {
                describe('for a multi-meter reading', () => {
                    it('Should set currentStep to Summary', () => {
                        mockContract.ssmrModel.meters.push(mockContract.ssmrModel.meters[0]);
                        ssmrService.selectedContract = mockContract;
                        ssmrService.currentStep = 'MultiRegisterOnboard';
                        ssmrService.onClickBack();
                        expect(ssmrService.currentStep).toEqual('MultiMeterIntro');
                    });
                });
                describe('for a non multi-meter reading', () => {
                    it('Should set currentStep to Summary', () => {
                        ssmrService.selectedContract = mockContract;
                        ssmrService.currentStep = 'MultiRegisterOnboard';
                        ssmrService.onClickBack();
                        expect(ssmrService.currentStep).toEqual('ChooseService');
                    });
                });
            });
            describe('when current step is "Summary"', () => {
                it('Should set currentStep to MeterEntry', () => {
                    mockContract.ssmrModel.meters.push(mockContract.ssmrModel.meters[0]);
                    mockContract.ssmrModel.meters[0].registers.push(mockContract.ssmrModel.meters[0].registers[0]);
                    mockContract.meterCount = 1;
                    ssmrService.selectedContract = mockContract;
                    ssmrService.currentStep = 'Summary';
                    ssmrService.onClickBack();
                    expect(ssmrService.currentStep).toEqual('MeterEntry');
                });
            });
        });
    });
});
