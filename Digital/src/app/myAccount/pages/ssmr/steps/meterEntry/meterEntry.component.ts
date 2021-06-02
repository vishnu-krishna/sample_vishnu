import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SelfServiceMeterReading } from '../../../../../shared/service/api.service';
import { ContractDisplayViewModel } from '../../../../model/ssmr/contractDisplayView.model';
import { ISsmrService } from '../../../../services/contract/issmr.service';

@Component({
    selector: 'agl-ssmr-meter-entry',
    templateUrl: './meterEntry.component.html',
    styleUrls: ['./meterEntry.component.scss']
})
export class MeterEntryComponent implements OnInit, AfterViewInit {
    public selectedContract: ContractDisplayViewModel;
    public selfServiceMeterReading: SelfServiceMeterReading;
    public screenCode: string;
    public selected: string = 'electricity';
    public meterSerial: string = '';
    public registerId: string = '';
    public lastReadValue: string = '';
    public numberOfDigitsinRegister: number = 0; // This is called dialFormat in the API.
    public isMeterSerialMatchesReadingError: boolean = false; // User has likely entered meter serial number instead of register read.

    public isMultiRegister: boolean = false;

    public registerReadValue: string = '';
    public invalidMeterMessage: string = 'Check read';
    public validMeterMessage: string = 'Read ok';
    public invalidValue: boolean = false; // Represents an invalid read rejected by the server
    public validValue: boolean = false; // Represents an invalid read rejected by the server
    public failedValidation: boolean = false; // The read entered didn't have enough digits

    public iconOverlayText: string = 'Invalid read';
    public selfServiceReadingResponseInvalid: boolean = false;
    public heading: string;
    public buttonContinueText: string;
    public meterIcons;
    public isSkipMeterError: boolean;
    public meterHeading: string;
    public registerHeading: string;

    public mask: any = /\d/;
    public meterMask: any[] = [];
    public INPUT_PLACEHOLDER_SPACE_CHAR = '\u2007';

    constructor(
        public ssmrService: ISsmrService,
    ) {
        this.registerReadValue = '';
    }

    public ngOnInit() {
        this.selectedContract = this.ssmrService.selectedContract;
        this.meterIcons = Array(this.selectedContract.meterCount).fill(1); // [1,1,1,1,1]
        this.registerReadValue = '';

        this.isSkipMeterError = false;
        this.screenCode = this.ssmrService.screenCode;

        if (this.screenCode === 'SSMR_MRR') {
            this.selfServiceReadingResponseInvalid = true;
        }

        if (this.meterSerialExists(this.selectedContract, this.ssmrService.meterEntryIndex)) {
            this.meterSerial = this.selectedContract.ssmrModel.meters[this.ssmrService.meterEntryIndex].meterSerial;
        }

        if (this.registerIdExists(this.selectedContract, this.ssmrService.meterEntryIndex)) {
            this.registerId = this.selectedContract.ssmrModel.meters[this.ssmrService.meterEntryIndex].registers[this.ssmrService.registerEntryIndex].registerId;
        }

        if (this.dialFormatExists(this.selectedContract, this.ssmrService.meterEntryIndex)) {
            this.numberOfDigitsinRegister = +this.selectedContract.ssmrModel.meters[this.ssmrService.meterEntryIndex].registers[this.ssmrService.registerEntryIndex].dialFormat;
            for (let x = 1; x <= this.numberOfDigitsinRegister; x++) {
                this.meterMask.push(this.mask);
            }
        } else {
            // TODO: Handle unknown number of register digits.
        }

        if (this.lastReadValueExists(this.selectedContract, this.ssmrService.meterEntryIndex)) {
            this.lastReadValue = this.formatLastRead(this.selectedContract.ssmrModel.meters[this.ssmrService.meterEntryIndex].registers[this.ssmrService.registerEntryIndex].lastMeterRead);
        }

        this.registerHeading = this.getRegisterHeading();
        this.buttonContinueText = this.getButtonContinueText();
        this.isMultiRegister = this.ssmrService.isMultiRegister(this.selectedContract.ssmrModel.meters[this.ssmrService.meterEntryIndex]);

        // Populate Meter Reading from submitted meter reading.
        if (this.ssmrService.selfServiceMeterReadings.length > this.ssmrService.meterEntryIndex) {
            if (this.ssmrService.selfServiceMeterReadings[this.ssmrService.meterEntryIndex] &&
                this.ssmrService.selfServiceMeterReadings[this.ssmrService.meterEntryIndex].registers[this.ssmrService.registerEntryIndex] &&
                this.ssmrService.selfServiceMeterReadings[this.ssmrService.meterEntryIndex].registers[this.ssmrService.registerEntryIndex].reading ) {

                this.registerReadValue = this.ssmrService.selfServiceMeterReadings[this.ssmrService.meterEntryIndex].registers[this.ssmrService.registerEntryIndex].reading;
                let badMeterReadIndex: number;
                let badRegisterIndex: number;
                if (this.ssmrService.badMeterReads) {
                     badMeterReadIndex = this.ssmrService.badMeterReads.findIndex((x) => x.meterSerial === this.meterSerial);
                }

                if (badMeterReadIndex > -1) {
                    badRegisterIndex = this.ssmrService.badMeterReads[badMeterReadIndex].registers.findIndex((x) => x.isValid === false &&
                                                                                                            x.registerId === this.ssmrService.selfServiceMeterReadings[this.ssmrService.meterEntryIndex].registers[this.ssmrService.registerEntryIndex].registerId);
                }
                if (this.screenCode === 'SSMR_MRR' &&
                    this.ssmrService.badMeterReads &&
                    badMeterReadIndex > -1 &&
                    badRegisterIndex > -1) {
                    this.invalidValue = true;
                } else if (this.screenCode === 'SSMR_MRR' && this.checkExistingEntry() ) {
                    this.validValue = true;
                }
            }
        }

        if (this.isMultiRegister) {
            this.validMeterMessage = `${this.registerHeading} - ${this.validMeterMessage}`;
            this.invalidMeterMessage = `${this.registerHeading} - ${this.invalidMeterMessage}`;
        }

        this.meterHeading = this.getMeterHeading();
    }

    public checkExistingEntry() {
        let isExistingEntry: boolean = false;

        let lastSubmittedMeterRead: SelfServiceMeterReading = this.ssmrService.lastSubmittedReadings.find((meter) => {
            if (meter) { // Checking the meter entry is present or not in last submit
                return meter.meterSerial === this.ssmrService.selfServiceMeterReadings[this.ssmrService.meterEntryIndex].meterSerial;
            }
        });

        if (lastSubmittedMeterRead) {
            isExistingEntry = lastSubmittedMeterRead.registers.some((register) => {
                if (register) { // Checking the register entry is present or not
                    return register.registerId === this.ssmrService.selfServiceMeterReadings[this.ssmrService.meterEntryIndex].registers[this.ssmrService.registerEntryIndex].registerId;
                }
            });
        }
        return isExistingEntry;
    }

    public ngAfterViewInit() {
        // Focus meter entry input.
        setTimeout(() => {
            document.getElementById('meter-entry-input').focus();
        }, 400);
    }

    public onClickIcon(index: number) {
        this.ssmrService.meterEntryIndex = index;
        this.ssmrService.registerEntryIndex = 0;
        this.ssmrService.reloadMeterEntryPage();
    }

    public getMeterHeading(): string {
        const meterCount = this.selectedContract.meterCount;
        const currentMeterIndex = this.ssmrService.meterEntryIndex + 1;

        return meterCount <= 1 ? 'Enter your meter read' : `Meter ${currentMeterIndex}`;
    }

    public getRegisterHeading(): string {

        const registerCount = this.selectedContract.ssmrModel.meters[this.ssmrService.meterEntryIndex].registers.length;
        const currentRegisterIndex = this.ssmrService.registerEntryIndex + 1;

        return registerCount <= 1 ? '' : `Register ${currentRegisterIndex} of ${registerCount}`;
    }

    public getButtonContinueText(): string {
        return 'NEXT';
    }

    public showSkipMeter(): boolean {
        return true;
    }

    public onClickSkipMeter() {

        if (this.ssmrService.meterEntryIndex < this.selectedContract.meterCount - 1 || (this.isMultiRegister)) {

            if (this.isMultiRegister) {
                this.updateRegister(this.registerId, undefined);
            } else {
                this.ssmrService.selfServiceMeterReadings[this.ssmrService.meterEntryIndex] = undefined;
            }

            this.goNextStep();

        } else if ((this.ssmrService.meterEntryIndex === this.selectedContract.meterCount - 1) && this.ssmrService.selfServiceMeterReadings.length > 0) {

            let thisMeterIndex = this.ssmrService.selfServiceMeterReadings.findIndex((meter) => {
                if (meter) {
                    return (meter.meterSerial === this.meterSerial);
                }
            });

            if (!this.ssmrService.isMultiRegister(this.ssmrService.selectedContract.ssmrModel.meters[this.ssmrService.meterEntryIndex])) {
                this.ssmrService.selfServiceMeterReadings[thisMeterIndex] = undefined;
            } else {

                let thisRegisterIndex = this.ssmrService.selfServiceMeterReadings[thisMeterIndex].registers.findIndex((register) => {
                    if (register) {
                        return (register.registerId === this.registerId);
                    }
                });
                this.ssmrService.selfServiceMeterReadings[thisMeterIndex].registers[thisRegisterIndex] = undefined;
            }

            let readExists = this.ssmrService.selfServiceMeterReadings.some((element) => {
                if (element) {
                    return element !== undefined;
                }
            });

            this.goNextStep();
        } else {
            this.goNextStep();
        }
    }
    public formatLastRead(lastRead: string): string {
        if (lastRead) {
            lastRead = lastRead.split('.')[0];
            lastRead = this.padLeftWithZeros(lastRead, this.numberOfDigitsinRegister);
            return lastRead;
        }
    }

    public padLeftWithZeros(original, desiredLength) {
        let value = original + '';
        while (value.length < desiredLength) {
            value = '0' + value;
        }
        return value;
    }

    public meterSerialExists(contract: ContractDisplayViewModel, meterNumber: number): boolean {
        return (contract && !!contract.ssmrModel && !!contract.ssmrModel.meters
            && contract.ssmrModel.meters.length > 0 && !!contract.ssmrModel.meters[meterNumber].meterSerial);
    }

    public registerIdExists(contract: ContractDisplayViewModel, meterNumber: number): boolean {
        return this.hasRegistersForMeter(contract, meterNumber) && !!contract.ssmrModel.meters[meterNumber].registers
        && !!contract.ssmrModel.meters[meterNumber].registers[this.ssmrService.registerEntryIndex]
        && !!contract.ssmrModel.meters[meterNumber].registers[this.ssmrService.registerEntryIndex].registerId;
    }
    public lastReadValueExists(contract: ContractDisplayViewModel, meterNumber: number): boolean {
        return this.hasRegistersForMeter(contract, meterNumber) && contract.ssmrModel.meters[meterNumber].registers
        && !!contract.ssmrModel.meters[meterNumber].registers[this.ssmrService.registerEntryIndex]
        && !!contract.ssmrModel.meters[meterNumber].registers[this.ssmrService.registerEntryIndex].lastMeterRead;
    }
    public dialFormatExists(contract: ContractDisplayViewModel, meterNumber: number): boolean {
        return this.hasRegistersForMeter(contract, meterNumber) && contract.ssmrModel.meters[meterNumber].registers
        && !!contract.ssmrModel.meters[meterNumber].registers[this.ssmrService.registerEntryIndex]
        && !!contract.ssmrModel.meters[meterNumber].registers[this.ssmrService.registerEntryIndex].dialFormat;
    }

    public updateRegister(registerId, registerReadValue) {
        this.selfServiceMeterReading = this.ssmrService.selfServiceMeterReadings[this.ssmrService.meterEntryIndex] || {
            meterSerial: this.meterSerial,
            registers: [
            ]
        };

        this.selfServiceMeterReading.registers[this.ssmrService.registerEntryIndex] = {
                registerId: registerId,
                reading: registerReadValue,
        };
        this.ssmrService.selfServiceMeterReadings[this.ssmrService.meterEntryIndex] = this.selfServiceMeterReading;
    }

    public goNextStep() {
        const onLastMeter: boolean = this.ssmrService.meterEntryIndex === this.selectedContract.meterCount - 1;
        let readings = this.ssmrService.selfServiceMeterReadings;
        const hasReadings: boolean = this.ssmrService.selfServiceMeterReadings.some((meter) => {
            let hasValidReadingForMeter = false;
            if (meter) {
                hasValidReadingForMeter = meter.registers.some((register) => {
                    if (register) {
                        return !!register.reading;
                    }
                });
            }
            return hasValidReadingForMeter;
        });

        const singleMeter: boolean = this.selectedContract.meterCount === 1;

        if (this.isMultiRegister) {
            const onLastRegisterForMeter: boolean = this.ssmrService.registerEntryIndex === this.selectedContract.ssmrModel.meters[this.ssmrService.meterEntryIndex].registers.length - 1;

            // Do this after the value is submited to api
            if (onLastMeter && onLastRegisterForMeter && hasReadings) {
                this.ssmrService.goToStep('Summary');
            } else if (onLastMeter && onLastRegisterForMeter && !hasReadings) {
                this.isSkipMeterError = true;
            } else if (!onLastMeter && onLastRegisterForMeter) {
                this.isSkipMeterError = false;
                this.ssmrService.meterEntryIndex++;
                this.ssmrService.registerEntryIndex = 0;
                this.ssmrService.reloadMeterEntryPage();
            } else if (!onLastRegisterForMeter) {
                this.isSkipMeterError = false;
                this.ssmrService.registerEntryIndex++;
                this.ssmrService.reloadMeterEntryPage();
            }
        } else {
            // Do this after the value is submited to api
            if (singleMeter && hasReadings) {
                this.ssmrService.goToStep('Submitting');
            } else if (onLastMeter && hasReadings) {
                this.ssmrService.goToStep('Summary');
            } else if (onLastMeter && !hasReadings) {
                this.isSkipMeterError = true;
            } else if (!onLastMeter) {
                this.isSkipMeterError = false;
                this.ssmrService.meterEntryIndex++;
                this.ssmrService.reloadMeterEntryPage();
            }
        }
    }

    public onClickSubmit() {
        this.isMeterSerialMatchesReadingError = false;

        this.failedValidation = (this.registerReadValue.length !== +this.numberOfDigitsinRegister);

        for (let i = 0; i <= this.numberOfDigitsinRegister; i++) {
            if (this.registerReadValue.charAt(i) === this.INPUT_PLACEHOLDER_SPACE_CHAR) {
                this.failedValidation = true;
            }
        }
        if (this.registerReadValue === this.meterSerial) { // Make sure user didn't enter meter serial number on accident.
            this.isMeterSerialMatchesReadingError = true;
        } else if (!this.failedValidation) { // If no validation errors, then format and submit.
            this.updateRegister(this.registerId, this.registerReadValue);
            this.ssmrService.submissionType = 'MeterRead';
            this.goNextStep();
        }
    }

    private hasRegistersForMeter(contract: ContractDisplayViewModel, meterNumber: number): boolean {
        return contract && contract.hasOwnProperty('ssmrModel') && contract.ssmrModel.hasOwnProperty('meters')
            && contract.ssmrModel.meters.length > 0 && contract.ssmrModel.meters[meterNumber].hasOwnProperty('registers')
            && contract.ssmrModel.meters[meterNumber].registers.length > 0;
    }

}
