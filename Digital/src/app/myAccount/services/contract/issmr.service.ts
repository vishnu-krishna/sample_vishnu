import { Observable } from 'rxjs/Observable';

import { MeterApiModel, SelfServiceMeterReading, SelfServiceMeterReadingResult, SelfServicePhotoReading, SelfServiceReadingResponse } from '../../../shared/service/api.service';
import { ContractDisplayViewModel } from '../../model/ssmr/contractDisplayView.model';
import { ErrorMessageMap } from '../../model/ssmr/errorMessageMap.model';
import { SsmrScreenCode, SsmrStep, SubmissionType } from '../ssmr.service';

export abstract class ISsmrService {
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

        /**
         * List of meter serial numbers with errors from API response.
         */
        public badMeterReads: SelfServiceMeterReadingResult[];

        public abstract isMultiRegister(meter: MeterApiModel): boolean;
        public abstract isBackButtonAvailable();
        public abstract clearReadings();
        public abstract onClickBack();
        public abstract showModal();
        public abstract onClickClose(browserBackButtonClicked?: boolean, hideSurvey?: boolean);
        public abstract goToStep( step: SsmrStep );
        public abstract postMetersForContract(contractNumber: string, data: SelfServiceMeterReading[]): Observable<SelfServiceReadingResponse>;
        public abstract postPhotosForContract(contractNumber: string, data: SelfServicePhotoReading[]): Observable<SelfServiceReadingResponse>;
        public abstract getEligibleContracts(): Observable<ContractDisplayViewModel[]>;
        public abstract isContractMultiRegister(contract: ContractDisplayViewModel): boolean;
        public abstract isContractMultiMeter(contract: ContractDisplayViewModel): boolean;
        public abstract isEligible( contract: ContractDisplayViewModel ): boolean;
        public abstract showWebChat( contract: ContractDisplayViewModel ): boolean;
        public abstract suggestPhotoUpload( contract: ContractDisplayViewModel ): boolean;
        public abstract getEligibilityMessage( contract: ContractDisplayViewModel ): string;
        public abstract getMeterReadErrorMessage( ): string;
        public abstract loadEligibility();
        public abstract checkForBasicMeterByFuelType();
        public abstract reloadMeterEntryPage();
}
