import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SolarCheckSolarDetailsType } from '../../../../../../shared/model/solar/solarCheckSolarDetails.model';

import { SolarCheckEligibilityContract } from '../../../../../../shared/model/solar/solarCheckEligibility.model';
import { ModalService } from '../../../../../modal/modal.service';
import { ISolarCheckService } from '../../../../../services/contract/isolarCheck.service';

import { IMessageBusService } from '../../../../../../shared/service/contract/imessageBus.service';
import { SolarCheckUpdateDetailsState } from '../updateProcess/solarCheckUpdateDetailsProcess.component';

@Component ({
    selector: 'agl-settings-update-solar-system-details',
    templateUrl: './solarCheckUpdateSystemDetails.component.html',
    styleUrls: ['./solarCheckUpdateSystemDetails.component.scss']
})

export class SolarCheckUpdateSystemDetailsComponent {

    @Input() public contractNumber: string;
    @Input() public scDetailsModel: SolarCheckSolarDetailsType;
    @Input() public updateReason: SolarCheckUpdateDetailsState;

    @Output() public previous = new EventEmitter<SolarCheckUpdateDetailsState>();

    public isUpdate: boolean = true;

    private contract: SolarCheckEligibilityContract = new SolarCheckEligibilityContract();

    constructor(
        private solarCheckService: ISolarCheckService,
        private modalService: ModalService,
        private messageBusService: IMessageBusService
    ) {
    }

    public getContract() {
        this.contract.contractNumber = this.contractNumber;
        return this.contract;
    }

    public handlePrevious() {
        this.previous.emit(SolarCheckUpdateDetailsState.REASON);
    }

    /**
     * Event listener to handle incoming update state
     */
    public handleUpdate() {
        this.modalService.close();
    }

}
