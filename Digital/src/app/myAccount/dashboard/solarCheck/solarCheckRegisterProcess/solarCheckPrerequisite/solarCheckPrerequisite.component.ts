import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../../../modal/modal.service';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';

import { SolarCheckEligibilityContract } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';
import { SolarCheckEvents, SolarCheckMessage } from '../../../../services/solarCheck.service';
import { SolarCheckRegisterState } from '../solarCheckRegisterProcess.component';
import { SolarCheckPrerequisiteViewModel } from './solarCheckPrerequisiteView.model';

@Component({
    selector: 'agl-solar-check-prequisite',
    templateUrl: './solarCheckPrerequisite.component.html',
    styleUrls: ['./solarCheckPrerequisite.component.scss']
})

export class SolarCheckPrerequisiteComponent {

    @Input() public contract: SolarCheckEligibilityContract;
    @Output() public next = new EventEmitter<SolarCheckRegisterState>();
    @Output() public back = new EventEmitter<SolarCheckRegisterState>();

    public model: SolarCheckPrerequisiteViewModel;
    public submitInProgress: Boolean;

    constructor(
        private solarCheckService: ISolarCheckService,
        private modalService: ModalService,
        private dataLayer: DataLayerService,
        private messageBusService: IMessageBusService
    ) {
        this.model = new SolarCheckPrerequisiteViewModel();
        this.submitInProgress = false;
    }

    public submit() {
        this.submitInProgress = true;
        this.solarCheckService.setHasBattery(this.contract.contractNumber, this.model.hasBattery).subscribe(
            () => {
                // successful
                if (this.model.hasBattery) {
                    // Assign contract to be unsuitable (hides offer)
                    this.contract.eligible = false;
                    this.next.emit(SolarCheckRegisterState.UNSUITABLE);
                    this.dataLayer.pushSccRegisterHasBattery();
                    this.broadcastUpdateHasBattery();
                } else {
                    // Assign contract to be unsuitable (hides offer)
                    this.contract.eligible = true;
                    this.next.emit(SolarCheckRegisterState.SOLAR_DETAILS);
                    this.dataLayer.pushSccRegisterSolarDetails();
                }
            },
            (error) => {
                // ToDo: inform user if there was an error
                console.error('battery registration: error while trying to submit', error);
                this.submitInProgress = false;
                this.dataLayer.pushSccRegisterBatteryError();
            },
            () => {
                // completed
                this.submitInProgress = false;
            });
    }

    public previous() {
        this.back.emit(SolarCheckRegisterState.WELCOME);
    }

    public closeModal() {
        this.modalService.close();
    }

    public hasBatterySelected(isBattery: boolean) {
        this.model.UpdateHasBattery(isBattery);
    }

    private broadcastUpdateHasBattery() {
        let solarCheckMessage = new SolarCheckMessage();
        solarCheckMessage.solarCheckEvent = SolarCheckEvents.hasBattery;
        this.messageBusService.broadcast(solarCheckMessage);
    }
}
