import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyCodes } from '../../../../../../../shared/globals/keyCodes';
import { SolarCheckEligibilityContract } from '../../../../../../../shared/model/solar/solarCheckEligibility.model';
import { SolarCheckSolarDetailsUpdateType } from '../../../../../../../shared/model/solar/solarCheckSolarDetails.model';
import { ModalService } from '../../../../../../modal/modal.service';
import { SolarCheckUpdateDetailsState } from '../solarCheckUpdateDetailsProcess.component';
import { SolarCheckUpdateReasonViewModel } from './solarCheckUpdateReasonView.model';

@Component({
    selector: 'agl-solar-check-update-reason',
    templateUrl: './solarCheckUpdateReason.component.html',
    styleUrls: ['./solarCheckUpdateReason.component.scss']
})

export class SolarCheckUpdateReasonComponent {

    @Input() public contract: SolarCheckEligibilityContract;
    @Input() public updateReason: SolarCheckUpdateDetailsState;
    @Output() public next = new EventEmitter<SolarCheckUpdateDetailsState>();

    public model: SolarCheckSolarDetailsUpdateType;
    public viewModel: SolarCheckUpdateReasonViewModel;
    public submitInProgress: Boolean;

    constructor(
        private modalService: ModalService
    ) {
        this.model = new SolarCheckSolarDetailsUpdateType();
        this.model.systemChanged = null;
        this.submitInProgress = false;
        this.viewModel = new SolarCheckUpdateReasonViewModel();
    }

    public submit() {
        if (this.model.systemChanged) {
            this.updateReason = SolarCheckUpdateDetailsState.UPGRADE;
        } else {
            this.updateReason = SolarCheckUpdateDetailsState.CORRECTION;
        }

        this.next.emit(this.updateReason);
    }

    public tabCloseModal(event) {
        if (event.keyCode === KeyCodes.enter) {
            this.closeModal();
        }
    }

    public closeModal() {
        this.modalService.close();
    }

    public hasSystemChanged(isSystemChange: boolean) {
        this.model.systemChanged = isSystemChange;
        this.viewModel.UpdateIsSystemChange(isSystemChange);
    }
}
