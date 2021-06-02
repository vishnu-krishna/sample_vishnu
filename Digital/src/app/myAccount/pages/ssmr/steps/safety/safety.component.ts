import { Component } from '@angular/core';
import { ISsmrService } from '../../../../services/contract/issmr.service';

@Component({
    selector: 'agl-ssmr-safety',
    templateUrl: './safety.component.html',
    styleUrls: ['./safety.component.scss']
})
export class SafetyComponent {
    public shouldSlideLeft: boolean = false;

    constructor(
        public ssmrService: ISsmrService
    ) {
    }

    public onClickContinue() {
        this.ssmrService.clearReadings();

        if (this.ssmrService.selectedContract.showWebChatLink) {
            this.ssmrService.goToStep('Chat');
        } else if (this.ssmrService.isContractMultiMeter(this.ssmrService.selectedContract)) {
            this.ssmrService.goToStep('MultiMeterIntro');
        } else if (this.ssmrService.isContractMultiRegister(this.ssmrService.selectedContract)) {
            this.ssmrService.goToStep('MultiRegisterOnboard');
        } else {
            this.ssmrService.goToStep('MeterEntry');
        }
    }
}
