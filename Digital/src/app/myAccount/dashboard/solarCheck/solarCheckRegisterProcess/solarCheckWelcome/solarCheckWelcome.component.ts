import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../../../modal/modal.service';
import { ContractViewModel } from '../../../../services/account.service';
import { SolarCheckRegisterState } from '../solarCheckRegisterProcess.component';

@Component ({
    selector: 'agl-solar-check-welcome',
    templateUrl: './solarCheckWelcome.component.html',
    styleUrls: ['./solarCheckWelcome.component.scss']
})

export class SolarCheckWelcomeComponent {

    @Input() public contract: ContractViewModel;
    @Output() public next = new EventEmitter<SolarCheckRegisterState>();
    @Output() public back = new EventEmitter<SolarCheckRegisterState>();

    constructor(
        private modalService: ModalService
    ) { }

    public submit() {
        this.next.emit(SolarCheckRegisterState.PREREQUISTE);
    }

    public closeModal() {
        this.modalService.close();
    }
}
