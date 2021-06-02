import { Component, OnInit } from '@angular/core';

import { SelfServiceMeterReading, SelfServiceReadingResponse } from '../../../../../shared/service/api.service';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { ContractDisplayViewModel } from '../../../../model/ssmr/contractDisplayView.model';
import { ISsmrService } from '../../../../services/contract/issmr.service';

import { UploadProgressMessage } from '../../../../../shared/messages/uploadProgress.message';

@Component({
    selector: 'agl-ssmr-submitting',
    templateUrl: './submitting.component.html',
    styleUrls: ['./submitting.component.scss']
})
export class SubmittingComponent implements OnInit {
    public isSubmitting: boolean;
    public selectedContract: ContractDisplayViewModel;
    public selfServiceMeterReadings: SelfServiceMeterReading[] = [];
    public selfServiceReadingResponse: SelfServiceReadingResponse;
    public submittingHeading: string = '';
    public submittingMessage: string = '';
    public uploadProgress: number;

    constructor(
        public ssmrService: ISsmrService,
        public messageBusService: IMessageBusService
    ) {
        this.messageBusService.listen(UploadProgressMessage).subscribe((uploadProgressMessage) => {
            this.uploadProgress = uploadProgressMessage.progress.percentage;
        });
    }

    public ngOnInit() {
        this.isSubmitting = true;
        this.selectedContract = this.ssmrService.selectedContract;

        if (this.ssmrService.submissionType === 'MeterRead') {
            this.setupMeterReadPost();
            this.postMeterReading();
        } else if (this.ssmrService.submissionType === 'Photo') {
            this.setupPhotoPost();
            this.postPhotos();
        }
    }

    public setupMeterReadPost() {
        this.submittingMessage = 'Sending read...';
        this.submittingHeading = 'Hang tight, your meter read is being processed.';
        for (let item of this.ssmrService.selfServiceMeterReadings) {
            if (item) {
                this.selfServiceMeterReadings.push(item);
            }
        }

        this.ssmrService.lastSubmittedReadings = [];
        this.ssmrService.selfServiceMeterReadings.forEach((meterreading) => {
            if (meterreading) {
                meterreading.registers = meterreading.registers.filter((p) => !!p.reading);
                if (meterreading.registers.length > 0) {
                    this.ssmrService.lastSubmittedReadings.push(meterreading);
                }
            }
        });
    }

    public postMeterReading() {

        const handleSuccessfulResponse = (result) => {
                    let res = this.ssmrService.selfServiceReadingResponse;
                    if (res && res.screenCode) {
                        if (this.shouldGoToPhoto(res)) {
                            this.ssmrService.goToStep('PhotoIntro');
                        } else if ( this.shouldGoToChat(res)) {
                            this.ssmrService.goToStep('Chat');
                        } else if (res.screenCode === 'SSMR_EX3' || res.screenCode === 'SSMR_MRR') { // Meter reading error.
                            this.ssmrService.goToStep('Oops');
                        } else if ( res.screenCode === 'SSMR_ADJ1' ||
                                    res.screenCode === 'SSMR_ADJ2' ||
                                    res.screenCode === 'SSMR_ADJ3' ||
                                    res.screenCode === 'SSMR_PROJ1' ||
                                    res.screenCode === 'SSMR_PROJ2' ||
                                    res.screenCode === 'SSMR_PROJ3'	||
                                    res.screenCode === 'SSMR_NSBD1' ||
                                    res.screenCode === 'SSMR_NSBD2') { // Meter reading success - Go to Adjustment screen.
                            this.ssmrService.goToStep('Adjustment');
                        }
                    } else {
                        this.ssmrService.goToStep('Oops');
                    }
        };

        const handleErrorResponse = handleSuccessfulResponse;

        this.ssmrService.postMetersForContract( this.selectedContract.contractNumber, this.selfServiceMeterReadings)
            .subscribe(handleSuccessfulResponse, handleErrorResponse);
    }

    public setupPhotoPost() {
        this.submittingHeading = 'Uploading photos...';
        this.submittingMessage = 'Hang tight, your meter read photos are uploading.';
    }

    public postPhotos() {

        this.ssmrService.postPhotosForContract(this.selectedContract.contractNumber, this.ssmrService.selfServicePhotoReadings)
            .subscribe(
                (result) => {
                    this.ssmrService.goToStep('Adjustment');
                },
                (error) => {
                    this.ssmrService.goToStep('Oops');
                }
        );
    }

    public shouldGoToPhoto(res: SelfServiceReadingResponse): boolean {
        if ( res && res.screenCode && !this.ssmrService.isContractMultiRegister(this.selectedContract)) {
            if ( res.error && res.error.internalError && res.error.internalError.errorNumber) {
                return ( res.screenCode === 'SSMR_EX1' &&  res.error.internalError.errorNumber === '095');
            }
        }

        return false;
    }

    public shouldGoToChat(res: SelfServiceReadingResponse): boolean {
        if ( res && res.screenCode ) {
            if (res.screenCode === 'SSMR_EX1') {
                return true;
            } else if ( res.error && res.error !== null && res.error.internalError && res.error.internalError !== null && res.error.internalError.errorNumber) {
                if ( res.screenCode === 'SSMR_MRR' &&  res.error.internalError.errorNumber === '064') {
                    return true;
                }
            }
        } else {
            return false;
        }
    }
}
