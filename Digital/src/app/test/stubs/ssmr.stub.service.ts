import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISsmrService } from '../../myAccount/services/contract/issmr.service';
import { SsmrStep } from '../../myAccount/services/ssmr.service';
import { ContractDisplayViewModel } from './../../myAccount/model/ssmr/contractDisplayView.model';
import { ErrorMessageMap } from './../../myAccount/model/ssmr/errorMessageMap.model';
import { MeterApiModel, SelfServiceMeterReading, SelfServiceMeterReadingResult, SelfServicePhotoReading, SelfServiceReadingResponse } from './../../shared/service/api.service';

@Injectable()
export class SmmrStubService implements ISsmrService {
    public currentStep: 'Safety' | 'ChooseService' | 'PhotoIntro' | 'MeterEntry' | 'Submitting' | 'Oops' | 'Adjustment' | 'Chat' | 'MultiMeterIntro' | 'MultiRegisterOnboard' | 'Summary' | 'AttachPhoto';
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
    public screenCode: 'SSMR_ADJ1' | 'SSMR_ADJ2' | 'SSMR_ADJ3' | 'SSMR_EX1' | 'SSMR_EX2' | 'SSMR_EX3' | 'SSMR_EX4' | 'SSMR_EX5' | 'SSMR_MRE' | 'SSMR_MRR' | 'SSMR_PROJ1' | 'SSMR_PROJ2' | 'SSMR_PROJ3' | 'SSMR_NSBD1' | 'SSMR_NSBD2';
    public errorNumber: string;
    public hasElecBasicMeter: boolean;
    public hasGasBasicMeter: boolean;
    public submissionType: 'MeterRead' | 'Photo';
    public BACK_BUTTON_DISABLED_STEPS: SsmrStep[] = ['ChooseService', 'Oops', 'Adjustment', 'Chat'];
    public ELIGIBILITY_ERROR_MESSAGES: ErrorMessageMap[];
    public METER_READ_ERROR_MESSAGES: ErrorMessageMap[];
    public badMeterReads: SelfServiceMeterReadingResult[];
    public showWebChat(contract: ContractDisplayViewModel): boolean {
        throw new Error('Method not implemented.');
    }
    public isMultiRegister(meter: MeterApiModel): boolean {
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
    public postMetersForContract(contractNumber: string, data: SelfServiceMeterReading[]): Observable<SelfServiceReadingResponse> {
        throw new Error('Method not implemented.');
    }
    public postPhotosForContract(contractNumber: string, data: SelfServicePhotoReading[]): Observable<SelfServiceReadingResponse> {
        throw new Error('Method not implemented.');
    }
    public getEligibleContracts(): Observable<ContractDisplayViewModel[]> {
        throw new Error('Method not implemented.');
    }
    public isContractMultiRegister(contract: ContractDisplayViewModel): boolean {
        throw new Error('Method not implemented.');
    }
    public isEligible(contract: ContractDisplayViewModel): boolean {
        throw new Error('Method not implemented.');
    }
    public isContractMultiMeter(contract: ContractDisplayViewModel): boolean {
        throw new Error('Method not implemented.');
    }
    public suggestPhotoUpload(contract: ContractDisplayViewModel): boolean {
        throw new Error('Method not implemented.');
    }
    public getEligibilityMessage(contract: ContractDisplayViewModel): string {
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
}
