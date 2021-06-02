import { Component, Input } from '@angular/core';
import { ModalService } from '../../../../modal/modal.service';

import { SolarCheckEligibilityContract } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckRegistrationStatusType } from '../../../../../shared/model/solar/solarCheckRegistrationStatus.model';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';
import { SolarCheckDeregisterRequestStatus } from '../solarCheckDeregisterRequestStatus';

import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { SolarCheckDeregistrationState } from '../solarCheckDeregistrationState';

@Component({
    selector: 'agl-solar-check-deregister',
    templateUrl: './solarCheckDeregister.component.html',
    styleUrls: ['./solarCheckDeregister.component.scss']
})

export class SolarCheckDeregisterComponent {

    @Input() public registeredContract: SolarCheckEligibilityContract;
    @Input() public deregisterRequest: SolarCheckDeregisterRequestStatus;

    private isAwaitingResponse: boolean;

    constructor(
        private modalService: ModalService,
        private solarCheckService: ISolarCheckService,
        private dataLayer: DataLayerService
    ) { }

    public get isAwaitingDeregisterResponse() {
        return this.isAwaitingResponse;
    }

    public attemptDeregistration() {
        this.deregisterRequest.Progress = SolarCheckDeregistrationState.INPROGRESS;
        this.isAwaitingResponse = true;
        let t1 = (new Date()).getTime();

        this.solarCheckService.deregister(this.registeredContract.contractNumber).subscribe(
            (data) => {
                let t2 = (new Date()).getTime();
                let timeoutVal = t2 - t1 > 2000 ? 0 : 2000 - t2 + t1;
                setTimeout(() => {
                    this.registeredContract.registrationStatus = SolarCheckRegistrationStatusType.DeregistrationPending;
                    this.deregisterRequest.Progress = SolarCheckDeregistrationState.COMPLETE;
                    this.isAwaitingResponse = false;
                    this.solarCheckService.refreshEligibility();
                    this.closeModal();
                    this.dataLayer.pushSccSettingsDeregister();
                },
                    timeoutVal);
            },
            (error) => {
                console.error('Error failed to complete the deregistrater request', error);
                this.deregisterRequest.Progress = SolarCheckDeregistrationState.ERROR;
                this.closeModal();
                this.dataLayer.pushSccSettingsDeregisterError();
            }
        );
    }

    public closeModal() {
        this.modalService.close();
    }
}
