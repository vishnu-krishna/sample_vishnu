import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolarCheckEligibilityContract } from '../../../../../shared/model/solar/solarCheckEligibility.model';
import { IMessageBusService } from '../../../../../shared/service/contract/imessageBus.service';
import { ModalService } from '../../../../modal/modal.service';
import { ISolarCheckService } from '../../../../services/contract/isolarCheck.service';
import { SolarCheckEvents, SolarCheckMessage } from '../../../../services/solarCheck.service';
import { SolarCheckRegisterState } from '../solarCheckRegisterProcess.component';

@Component({
    selector: 'agl-solar-check-unsuitable',
    templateUrl: './solarCheckUnsuitable.component.html',
    styleUrls: ['./solarCheckUnsuitable.component.scss']
})

export class SolarCheckUnsuitableComponent {

    @Input() public contract: SolarCheckEligibilityContract;
    @Output() public next = new EventEmitter<SolarCheckRegisterState>();
    @Output() public back = new EventEmitter<SolarCheckRegisterState>();

    constructor(
        private solarCheckService: ISolarCheckService,
        private modalService: ModalService,
        private messageBusService: IMessageBusService
    ) {}

    public previous() {
        // Solar check contract is made eligible (show solar offer)
        this.contract.eligible = true;
        this.broadcastUpdateNoBattery();
        this.back.emit(SolarCheckRegisterState.PREREQUISTE);
    }

    public closeModal() {
        // Solar check contract is made unsuitable (hides solar offer)
        this.contract.eligible = false;
        this.modalService.close();
    }

    private broadcastUpdateNoBattery() {
        let solarCheckMessage = new SolarCheckMessage();
        solarCheckMessage.solarCheckEvent = SolarCheckEvents.updateNoBattery;
        this.messageBusService.broadcast(solarCheckMessage);
    }

}
