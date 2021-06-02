import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../../../modal/modal.service';

import { SolarCheckEligibilityContract } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckRegistrationStatusType } from '../../../../../shared/model/solar/solarCheckRegistrationStatus.model';
import { SolarCheckSolarDetailsType } from '../../../../../shared/model/solar/solarCheckSolarDetails.model';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';
import { SolarCheckStatusViewModel } from '../../solarCheckStatus/solarCheckStatusView.model';
import { SolarCheckRegisterState } from '../solarCheckRegisterProcess.component';

import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { SolarCheckEvents, SolarCheckMessage } from '../../../../services/solarCheck.service';
import { SolarCheckStatusViewModelFactory } from '../../solarCheckStatus/solarCheckStatusViewModelFactory';

@Component({
    selector: 'agl-solar-check-register',
    templateUrl: './solarCheckRegister.component.html',
    styleUrls: ['./solarCheckRegister.component.scss']
})

export class SolarCheckRegisterComponent {

    @Input() public contract: SolarCheckEligibilityContract;
    @Output() public next = new EventEmitter<SolarCheckRegisterState>();
    @Output() public back = new EventEmitter<SolarCheckRegisterState>();
    @Input() public termsAccepted: boolean;
    @Input() public scDetailsModel: SolarCheckSolarDetailsType;
    @Input() public statusModel: SolarCheckStatusViewModel;
    public awaitingRegisterResponse: boolean;
    public isError: boolean = false;

    constructor(
        private modalService: ModalService,
        private solarCheckService: ISolarCheckService,
        private dataLayer: DataLayerService,
        private solarStatusFactory: SolarCheckStatusViewModelFactory = new SolarCheckStatusViewModelFactory(),
        private messageBusService: IMessageBusService
    ) {
        this.awaitingRegisterResponse = false;
    }

    public submit() {
        this.awaitingRegisterResponse = true;
        let t1 = (new Date()).getTime();
        this.solarCheckService.register(this.contract.contractNumber, this.scDetailsModel).subscribe(
            (result) => {
                this.solarCheckService.refreshEligibility();
                let t2 = (new Date()).getTime();
                let timeoutVal = t2 - t1 > 2000 ? 0 : 2000 - t2 + t1;
                setTimeout(() => {
                    this.contract.registrationStatus = SolarCheckRegistrationStatusType.RegistrationPending;
                    this.broadcastSolarCheckRegistered();
                    this.closeModal();
                    this.dataLayer.pushSccRegisterSuccess();
                },
                    timeoutVal);
            },
            (error) => {
                this.awaitingRegisterResponse = false;
                this.isError = true;
                this.dataLayer.pushSccRegisterError();
            }
        );
    }

    public previous() {
        this.back.emit(SolarCheckRegisterState.SOLAR_DETAILS);
    }

    public closeModal() {
        this.modalService.close();
    }
    public toggleTermsAccepted() {
        this.termsAccepted = !this.termsAccepted;
    }
    private broadcastSolarCheckRegistered() {
        let solarCheckMessage = new SolarCheckMessage();
        solarCheckMessage.solarCheckEvent = SolarCheckEvents.registered;
        this.messageBusService.broadcast(solarCheckMessage);
    }
}
