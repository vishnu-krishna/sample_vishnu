import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { MeterApiModel, SelfServiceMeterReading, SelfServiceMeterReadingResult, SelfServicePhotoReading, SelfServiceReadingResponse } from '../../../shared/service/api.service';
import { ContractDisplayViewModel } from '../../model/ssmr/contractDisplayView.model';
import { ErrorMessageMap } from '../../model/ssmr/errorMessageMap.model';
import { ISsmrService } from '../contract/issmr.service';
import { SsmrScreenCode, SsmrStep, SubmissionType } from '../ssmr.service';

@Injectable()
export class SsmrMockService implements ISsmrService {
    public currentStep: SsmrStep; // Current step. One of: 'Safety' | 'ChooseService' | 'MeterEntry' | 'Submitting' | 'Oops' | 'Adjustment'.
    public meterEntryIndex: number;
    public registerEntryIndex: number;
    public showHeader: boolean;
    public showFooter: boolean;
    public showSSMR: boolean;
    public transition1: boolean;
    public selectedContract: ContractDisplayViewModel;
    public selfServiceMeterReadings: SelfServiceMeterReading[];
    public selfServiceReadingResponse: SelfServiceReadingResponse;
    public lastSubmittedReadings: SelfServiceMeterReading[];
    public selfServicePhotoReadings: SelfServicePhotoReading[];
    public screenCode: SsmrScreenCode;
    public errorNumber: string;
    public hasElecBasicMeter: boolean;
    public hasGasBasicMeter: boolean;
    public submissionType: SubmissionType;
    public BACK_BUTTON_DISABLED_STEPS: SsmrStep[];
    public ELIGIBILITY_ERROR_MESSAGES: ErrorMessageMap[];
    public METER_READ_ERROR_MESSAGES: ErrorMessageMap[];
    public badMeterReads: SelfServiceMeterReadingResult[];

    public showWebChat(contract: ContractDisplayViewModel): boolean {
        throw new Error('Method not implemented.');
    }
    public isBackButtonAvailable() {
        throw new Error('Method not implemented.');
    }
    public clearReadings() {
        throw new Error('Method not implemented.');
    }
    public onClickBack() {
        throw new Error('Method not implemented.');
    }
    public showModal() {
        throw new Error('Method not implemented.');
    }
    public onClickClose() {
        throw new Error('Method not implemented.');
    }
    public goToStep(step: SsmrStep) {
        throw new Error('Method not implemented.');
    }
    public getEligibleContracts(): Observable<ContractDisplayViewModel[]> {
        throw new Error('Method not implemented.');
    }
    public isMultiRegister(meter: MeterApiModel): boolean {
        throw new Error('Method not implemented.');
    }
    public isEligible(contract: ContractDisplayViewModel): boolean {
        throw new Error('Method not implemented.');
    }
    public isContractMultiRegister(contract: ContractDisplayViewModel): boolean {
        throw new Error('Method not implemented.');
    }
    public isContractMultiMeter(contract: ContractDisplayViewModel): boolean {
        throw new Error('Method not implemented.');
    }
    public getEligibilityMessage(contract: ContractDisplayViewModel): string {
        throw new Error('Method not implemented.');
    }
    public postMetersForContract(contractNumber: string, data: SelfServiceMeterReading[]): Observable<SelfServiceReadingResponse> {
        throw new Error('Method not implemented.');
    }
    public postPhotosForContract(contractNumber: string, data: SelfServicePhotoReading[]): Observable<SelfServiceReadingResponse> {
        throw new Error('Method not implemented.');
    }
    public getMeterReadErrorMessage(): string {
        throw new Error('Method not implemented.');
    }
    public loadEligibility() {
        throw new Error('Method not implemented.');
    }
    public checkForBasicMeterByFuelType() {
        throw new Error('Method not implemented.');
    }
    public reloadMeterEntryPage() {
        throw new Error('Method not implemented.');
    }
    public suggestPhotoUpload( contract: ContractDisplayViewModel ): boolean {
        throw new Error('Method not implemented.');
    }
}
