import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { Location } from '@angular/common';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';
import { ConfigService } from '../../shared/service/config.service';
import { ContractDisplayViewModel } from '../model/ssmr/contractDisplayView.model';
import { ErrorMessageMap } from '../model/ssmr/errorMessageMap.model';
import { MeterViewModel } from '../model/ssmr/meter.model';
import { ApiService, SelfServiceMeterReading, SelfServiceMeterReadingResult, SelfServicePhotoReading, SelfServiceReadingResponse } from './../../shared/service/api.service';
import { IAccountServiceMA } from './account.service';
import { ISsmrService } from './contract/issmr.service';

declare let leanengage: any;

@Injectable()
export class SsmrService implements ISsmrService {
    public contractsSubject: ReplaySubject<ContractDisplayViewModel[]>;
    public showSSMR: boolean = false; // Show SSMR modal.
    public currentStep: SsmrStep; // Current step. One of: 'Safety' | 'ChooseService' | 'MeterEntry' | 'Submitting' | 'Oops' | 'Adjustment'.
    public transition1: boolean; // For SCSS Modal slide in.
    public showHeader: boolean = true; // Don't show fixed app header when SSMR Modal is active.
    public showFooter: boolean = true; // Don't show fixed app footer when SSMR Modal is active.
    public selectedContract: ContractDisplayViewModel; // This contract's meters are being read and submitted.
    public selfServiceMeterReadings: SelfServiceMeterReading[]; // Meter reading data sent to API.
    public selfServiceReadingResponse: SelfServiceReadingResponse; // Meter reading data received from API.
    public lastSubmittedReadings: SelfServiceMeterReading[]; // Meter reading data that is submitted last time.
    public selfServicePhotoReadings: SelfServicePhotoReading[];
    public screenCode: SsmrScreenCode; // This code comes from API and drives the state of the SSMR app.
    public errorNumber: string; // This code comes from API and drives the state of the SSMR app.
    public hasElecBasicMeter: boolean; // This show the value where an account have electricity with basic meter
    public hasGasBasicMeter: boolean; // This show the value where an account have gas with basic meter
    public meterEntryIndex: number;
    public registerEntryIndex: number;
    public badMeterReads: SelfServiceMeterReadingResult[];
    public submissionType: SubmissionType = 'MeterRead';

    public BACK_BUTTON_DISABLED_STEPS: SsmrStep[] = ['Oops', 'Adjustment', 'Chat'];
    public ELIGIBILITY_ERROR_MESSAGES: ErrorMessageMap[] = [
        { screenCode: 'SSMR_EX1', errorNumber: '025', message: 'Two failed attempts. Try again tomorrow.' },
        { screenCode: 'SSMR_EX1', errorNumber: '064', message: 'Service ineligible.' },
        { screenCode: 'SSMR_EX3', errorNumber: '', message: 'Processing error. We will contact you to resolve this.' },
        { screenCode: 'SSMR_EX4', errorNumber: '065', message: 'Read submitted today.' },
        { screenCode: 'SSMR_EX5', errorNumber: '003', message: 'Service ineligible.' },
        { screenCode: 'SSMR_EX5', errorNumber: '014', message: 'Service ineligible.' },
        { screenCode: 'SSMR_EX5', errorNumber: '018', message: 'Service ineligible due to pending move.' },
        { screenCode: 'SSMR_EX5', errorNumber: '069', message: 'Service ineligible.' },
        { screenCode: 'SSMR_EX5', errorNumber: '070', message: 'Service disconnected.' },
        { screenCode: 'SSMR_EX5', errorNumber: '071', message: 'Smart meter read taken automatically.' }
    ];
    public METER_READ_ERROR_MESSAGES: ErrorMessageMap[] = [
        {
            screenCode: 'SSMR_EX3',
            errorNumber: '',
            message: 'Sorry, there was an error processing your request.<br/><br/>One of our customer service agents will contact you directly<br/>to resolve this.'
        },
        {
            screenCode: 'SSMR_MRR',
            errorNumber: '009',
            message: 'Your read doesn’t look quite right and is lower than expected.<br/><br/>Please try again.'
        },
        {
            screenCode: 'SSMR_MRR',
            errorNumber: '010',
            message: 'Your read doesn’t look quite right and cannot be accepted.<br/><br/>Please try again.'
        },
        {
            screenCode: 'SSMR_MRR',
            errorNumber: '011',
            message: 'Your read doesn’t look quite right and is lower than expected.<br/><br/>Please try again.'
        },
        {
            screenCode: 'SSMR_MRR',
            errorNumber: '012',
            message: 'Your read doesn’t look quite right and cannot be accepted.<br/><br/>Please try again.'
        },
        {
            screenCode: 'SSMR_MRR',
            errorNumber: '013',
            message: 'Your read doesn’t look quite right and is higher than expected.<br/><br/>Please try again.'
        },
        {
            screenCode: 'SSMR_MRR',
            errorNumber: '014',
            message: 'Your read doesn’t look quite right and is lower than expected.<br/><br/>Please try again.'
        },
        {
            screenCode: 'SSMR_MRR',
            errorNumber: '033',
            message: 'Sorry, there was an error processing your request.<br/><br/>One of our customer service agents will contact you directly <br/> to resolve this.'
        },
        {
            screenCode: 'SSMR_MRR',
            errorNumber: '064',
            message: 'Sorry, there was an error processing your request.<br/><br/>One of our customer service agents will contact you directly <br/> to resolve this.'
        },
        {
            screenCode: 'SSMR_MRR',
            errorNumber: '068',
            message: `Your read doesn’t look quite right and is lower than expected.<br/><br/>Please try again.`
        },
        {
            screenCode: 'SSMR_MRR',
            errorNumber: '095',
            message: `Your read doesn’t look quite right. It might be too high or too low.<br/><br/>Please try again.`
        },
    ];

    private locationSubscription: Subscription;

    constructor(private apiService: ApiService,
                private accountService: IAccountServiceMA,
                private configService: ConfigService,
                private domSanitizer: DomSanitizer,
                private location: Location) {
        this.contractsSubject = new ReplaySubject<ContractDisplayViewModel[]>(1);
    }

    public clearReadings() {
        this.meterEntryIndex = 0;
        this.registerEntryIndex = 0;
        this.selfServiceMeterReadings = [];
    }

    public isBackButtonAvailable() { // No back button for initial page (Safety).
        return this.BACK_BUTTON_DISABLED_STEPS.indexOf(this.currentStep) < 0;
    }

    public isContractMultiRegister(contract: ContractDisplayViewModel): boolean {
        if (contract.ssmrModel.meters && contract.ssmrModel.meters.length) {
            for (let meter of contract.ssmrModel.meters) {
                if (meter.registers.length > 1) {
                    return true; // More than 1 register
                }
            }
            return false;
        }
    }

    public isMultiRegister(meter: MeterViewModel) {
        return meter && meter.registers && meter.registers.length > 1;
    }

    public isContractMultiMeter(contract: ContractDisplayViewModel): boolean {
        if (contract.ssmrModel.hasOwnProperty('meters')) {
            return contract.ssmrModel.meters.length > 1;
        }

        return false;
    }

    public onClickBack() {
        if (this.currentStep === 'Safety') {
            this.currentStep = 'ChooseService';

        } else if (this.currentStep === 'MeterEntry') {
            if (this.meterEntryIndex > 0) {
                if (this.isContractMultiRegister(this.selectedContract)) {
                    if (this.registerEntryIndex === 0) {
                        this.meterEntryIndex--;
                        if (this.selfServiceMeterReadings[this.meterEntryIndex]) {
                            this.registerEntryIndex = this.selfServiceMeterReadings[this.meterEntryIndex].registers.length - 1;
                        }
                    } else {
                        this.registerEntryIndex--;
                    }
                    this.reloadMeterEntryPage();
                } else {
                    this.meterEntryIndex--;
                }
            } else if (this.meterEntryIndex === 0) {
                if (this.isContractMultiRegister(this.selectedContract)) {
                    if (this.registerEntryIndex === 0) {
                        this.currentStep = 'MultiRegisterOnboard';
                    } else {
                        this.registerEntryIndex--;
                        this.reloadMeterEntryPage();
                    }
                } else if (this.isContractMultiMeter(this.selectedContract)) {
                  this.currentStep = 'MultiMeterIntro';
                } else {
                   this.currentStep = 'ChooseService';
                }
            }

        } else if (this.currentStep === 'Submitting') {
            if (this.submissionType === 'MeterRead') {
                if (this.isContractMultiMeter(this.selectedContract)) {
                    this.currentStep = 'Summary';
                } else {
                    this.currentStep = 'MeterEntry';
                }
            } else if (this.submissionType === 'Photo') {
                this.currentStep = 'AttachPhoto';
            }

        } else if (this.currentStep === 'MultiMeterIntro') {
            this.currentStep = 'ChooseService';
        } else if (this.currentStep === 'MultiRegisterOnboard') {
            if (this.isContractMultiMeter(this.selectedContract)) {
                this.currentStep = 'MultiMeterIntro';
            } else {
                this.currentStep = 'ChooseService';
            }
        } else if (this.currentStep === 'Summary') {
            this.meterEntryIndex = this.selectedContract.meterCount - 1;
            this.registerEntryIndex = this.selectedContract.ssmrModel.meters[this.meterEntryIndex].registers.length - 1;
            this.currentStep = 'MeterEntry';
        } else if (this.currentStep === 'AttachPhoto') {
            this.currentStep = 'PhotoIntro';
        } else if (this.currentStep === 'PhotoIntro') {
            this.currentStep = 'ChooseService';
        } else if (this.currentStep === 'ChooseService') {
            this.onClickClose();
        }
    }

    public reloadMeterEntryPage() {
        this.currentStep = null;
        setTimeout(() => {
            this.currentStep = 'MeterEntry';
        }, 1);
    }

    public showModal() {
        this.loadEligibility();
        this.currentStep = 'ChooseService';
        // this.currentStep = 'AttachPhoto';
        this.showSSMR = true;
        this.transition1 = true; // Puts the modal at bottom off screen.
        setTimeout(() => {
            this.transition1 = false; // Begins transition to slide modal to the top.
        }, 50);
        setTimeout(() => {
            this.showHeader = false;    // Makes the header and footer disappear less abruptly.
            this.showFooter = false;
        }, 500);
        document.body.style.overflow = 'hidden'; // Disable scroll on body behind modal.

        // Support browser back button by pushing an extra url into the browser history
        window.history.pushState(window.history.state, window.document.title, window.location.href);

        // Listen for navigation change (if the subscription doesn't already exist)
        if (!this.locationSubscription) {
            this.locationSubscription = <Subscription> this.location.subscribe(() => {
                this.locationSubscription.unsubscribe();
                this.locationSubscription = undefined;
                this.onClickClose(true, true);
            });
        }
    }

    public onClickClose(browserBackButtonClicked: boolean = false, hideSurvey: boolean = false) {

        // For non browser back closing of the dialog we need to clean up the top level history
        if (!browserBackButtonClicked) {
            this.location.back();
        }

        document.body.style.overflow = 'scroll'; // Enable scroll on body behind modal.
        this.transition1 = true;    // Begins transition to slide modal to the bottom.
        this.showHeader = true;
        this.showFooter = true;
        if (!hideSurvey) {
            setTimeout(() => {
                if (this.currentStep === 'Adjustment') {
                    this.showFeedbackSurvey();
                }
                this.showSSMR = false;  // Hide the modal after it transitions off the bottom of screen.
            }, 500);
        }
    }

    public showFeedbackSurvey() {

        let leanAppId = this.configService.current.leanEngageAppId;
        let userId = Array.apply(0, Array(15)).map(() => {
            return ((charset) => {
                return charset.charAt(Math.floor(Math.random() * charset.length));
            })('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
        }).join('');

        leanengage('start', { user_id: userId, name: 'anonymous', app_id: leanAppId });
        leanengage('triggerSurvey', 'my-account-payment-survey-clone-b46a2b14-c808-4bdd-b824-eab69e44d8c8');
    }

    public goToStep(step: SsmrStep) {
        if (step) {
            this.currentStep = step;
        }
    }

    public loadEligibility() {
        this.screenCode = null;
        this.accountService.getAccounts().subscribe(
            (accounts) => {

                let contracts: ContractDisplayViewModel[] = [];

                if (accounts && accounts.length > 0) {

                    for (let account of accounts) {

                        if (account.contracts && account.contracts.length > 0) {
                            for (let contract of account.contracts) {
                                let contractDisplay = new ContractDisplayViewModel(contract);
                                // Hide the restricted accounts to be shown in meter read screen
                                if (!contract.isRestricted) {
                                    this.apiService.getMetersForContract(contract.contractNumber).subscribe(
                                        (result) => {
                                            if (result) {
                                                contractDisplay.ssmrModel = result;
                                                contractDisplay.isEligible = this.isEligible(contractDisplay);
                                                contractDisplay.showWebChatLink = this.showWebChat(contractDisplay);
                                                contractDisplay.suggestPhotoUpload = this.suggestPhotoUpload(contractDisplay);
                                                contractDisplay.eligibilityMessage = this.getEligibilityMessage(contractDisplay);
                                                contractDisplay.lastReadDate = this.getLastReadDate(contractDisplay);
                                                contractDisplay.meterCount = this.getMeterCount(contractDisplay);
                                            }
                                            contracts.push(contractDisplay);
                                        },
                                        (error) => {
                                            contractDisplay.isEligible = this.isEligible(contractDisplay);
                                            contractDisplay.showWebChatLink = this.showWebChat(contractDisplay);
                                            contractDisplay.suggestPhotoUpload = this.suggestPhotoUpload(contractDisplay);
                                            contractDisplay.eligibilityMessage = this.getEligibilityMessage(contractDisplay);
                                            contracts.push(contractDisplay);
                                        }
                                    );
                                }
                            }
                        }
                    }
                }
                this.contractsSubject.next(contracts);
            }
        );
    }

    public getLastReadDate(contract: ContractDisplayViewModel): string {
        let now = moment().startOf('day');
        let lastReadDate = null;
        let metercount: number = 0;
        if (contract.hasOwnProperty('ssmrModel') && contract.ssmrModel.hasOwnProperty('meters') && contract.ssmrModel.meters.length > 0) {
            for (let meter of contract.ssmrModel.meters) {
                if (meter.hasOwnProperty('registers') && meter.registers.length > 0) {
                    for (let register of meter.registers) {
                        if (register.hasOwnProperty('lastReadDate')) {
                            if (lastReadDate === null) {
                                lastReadDate = moment(register.lastReadDate);
                            } else if (now.diff(register.lastReadDate) < now.diff(lastReadDate)) {
                                lastReadDate = moment(register.lastReadDate);
                            }
                        }
                    }
                }
            }
            if (lastReadDate) {
                return moment(lastReadDate).format('ddd DD MMM YYYY').toString();
            } else {
                return 'None';
            }
        }
    }

    public getMeterCount(contract: ContractDisplayViewModel): number {
        if (contract.hasOwnProperty('ssmrModel') && contract.ssmrModel.hasOwnProperty('meters')) {
            return contract.ssmrModel.meters.length;
        }
    }

    public checkForBasicMeterByFuelType() {
        this.accountService.getAccounts().subscribe(
            (accounts) => {
                if (accounts && accounts.length > 0) {
                    for (let account of accounts) {
                        if (account.contracts && account.contracts.length > 0) {
                            for (let contract of account.contracts) {
                                if (contract.isElectricity && !contract.isSmartMeter) {
                                    this.hasElecBasicMeter = true;
                                } else if (contract.isGas && !contract.isSmartMeter) {
                                    this.hasGasBasicMeter = true;
                                }
                            }
                        }
                    }
                }
            }
        );
    }

    public getEligibleContracts(): Observable<ContractDisplayViewModel[]> {
        return this.contractsSubject.asObservable();
    }

    public showWebChat(contract: ContractDisplayViewModel): boolean {
        return this.isContractMultiRegister(contract) && this.hasPhotoUploadError(contract);
    }

    public suggestPhotoUpload(contract: ContractDisplayViewModel): boolean {
        return !this.isContractMultiRegister(contract) && this.hasPhotoUploadError(contract);
    }

    public hasPhotoUploadError(contract: ContractDisplayViewModel): boolean {
        const screenCode: SsmrScreenCode = contract.ssmrModel.screenCode;
        const errorValue = this.getErrorValue(contract);

        return screenCode === 'SSMR_EX1' && errorValue
            && errorValue.errorNumber === '025';
    }

    public isEligible(contract: ContractDisplayViewModel): boolean {
        if (contract && contract.hasOwnProperty('ssmrModel') && contract.ssmrModel.hasOwnProperty('screenCode')) {
            return contract.ssmrModel.screenCode === 'SSMR_MRE' && !contract.isSmartMeter;
        }
        return false; // Not eligible.
    }

    public getErrorValue(contract: ContractDisplayViewModel) {
        let errorValue;
        const screenCode: SsmrScreenCode = contract.ssmrModel.screenCode;

        if (contract && contract.ssmrModel && contract.ssmrModel.screenCode && contract.ssmrModel.error && contract.ssmrModel.error.internalError) {
            const code = contract.ssmrModel.error.internalError.errorNumber;

            errorValue = this.ELIGIBILITY_ERROR_MESSAGES.find((item) => {
                return item.screenCode === screenCode && item.errorNumber === code;
            });
        }

        return errorValue;
    }

    public getEligibilityMessage(contract: ContractDisplayViewModel): any {
        let screenCode: SsmrScreenCode = contract.ssmrModel.screenCode;
        let errorValue = this.getErrorValue(contract);

        // If SSMR_MRE (eligible) screenCode but not single meter with single register.
        if (errorValue) {
            if (screenCode === 'SSMR_EX3') {
                this.screenCode = 'SSMR_EX3';
                errorValue = this.ELIGIBILITY_ERROR_MESSAGES.find((item) => {
                    return item.screenCode === screenCode;
                });
                return this.domSanitizer.bypassSecurityTrustHtml(errorValue.message);
            } else {
                return this.domSanitizer.bypassSecurityTrustHtml(errorValue.message);
            }
        }
    }

    public postMetersForContract(contractNumber: string, data: SelfServiceMeterReading[]): Observable<SelfServiceReadingResponse> {
        return this.apiService.postMetersForContract(contractNumber, data)
            .do((result) => {
                this.selfServiceReadingResponse = result;
                this.screenCode = result.screenCode;
            });
    }

    public postPhotosForContract(contractNumber: string, data: any): Observable<SelfServiceReadingResponse> {
        return this.apiService.postPhotosForContract(contractNumber, data)
            .do((result) => {
                // this.selfServiceReadingResponse = result;
                this.screenCode = result.screenCode;
            });
    }

    public getMeterReadErrorMessage(): any {
        let errorValue: ErrorMessageMap;

        if (this.screenCode && this.screenCode === 'SSMR_EX3') { // SAP Error
            errorValue = this.METER_READ_ERROR_MESSAGES.find((item) => {
                return item.screenCode === this.screenCode;
            });
            if (errorValue) {
                return this.domSanitizer.bypassSecurityTrustHtml(errorValue.message);
            } else {
                return ''; // No screenCode or code;
            }
        } else { // All Other Errors
            let res = this.selfServiceReadingResponse;
            if (res && res.screenCode) {
                let screenCode = res.screenCode;

                if (screenCode === 'SSMR_EX3') {
                    errorValue = this.METER_READ_ERROR_MESSAGES.find((item) => {
                        return item.screenCode === screenCode;
                    });
                } else if (screenCode === 'SSMR_MRR' && res.error && res.error.internalError) {
                    this.errorNumber = res.error.internalError.errorNumber;
                    errorValue = this.METER_READ_ERROR_MESSAGES.find((item) => {
                        return item.screenCode === screenCode && item.errorNumber === this.errorNumber;
                    });
                }

                if (errorValue) {
                    return this.domSanitizer.bypassSecurityTrustHtml(errorValue.message);
                } else {
                    return ''; // when there is different screen code
                }
            } else {
                return 'Something went wrong processing your read. <br> Please try again tomorrow.'; // Default message when there is no screen code and error number
            }
        }
    }
}

export type SsmrStep = 'Safety' |
    'ChooseService' |
    'PhotoIntro' |
    'MeterEntry' |
    'Submitting' |
    'Oops' |
    'Adjustment' |
    'Chat' |
    'MultiMeterIntro' |
    'MultiRegisterOnboard' |
    'Summary' |
    'PhotoIntro' |
    'AttachPhoto';

export type SsmrScreenCode = 'SSMR_ADJ1' |
    'SSMR_ADJ2' |
    'SSMR_ADJ3' |
    'SSMR_EX1' |
    'SSMR_EX2' |
    'SSMR_EX3' |
    'SSMR_EX4' |
    'SSMR_EX5' |
    'SSMR_MRE' |
    'SSMR_MRR' |
    'SSMR_PROJ1' |
    'SSMR_PROJ2' |
    'SSMR_PROJ3' |
    'SSMR_NSBD1' |
    'SSMR_NSBD2';

export type SubmissionType = 'MeterRead' | 'Photo';

export const FuelType = {
    Electricity: 'Electricity',
    Gas: 'Gas'
};
