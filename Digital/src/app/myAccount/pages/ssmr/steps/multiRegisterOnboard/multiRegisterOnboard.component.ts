import { Component, OnInit } from '@angular/core';
import { ContractDisplayViewModel } from '../../../../model/ssmr/contractDisplayView.model';
import { ISsmrService } from '../../../../services/contract/issmr.service';

@Component({
    selector: 'agl-ssmr-multi-register-onboard',
    templateUrl: './multiRegisterOnboard.component.html',
    styleUrls: ['./multiRegisterOnboard.component.scss']
})
export class MultiRegisterOnboardComponent implements OnInit {
    public selectedContract: ContractDisplayViewModel;
    public numberMeters: number;

    constructor(
        public ssmrService: ISsmrService,
    ) { }

    public ngOnInit() {
        this.selectedContract = this.ssmrService.selectedContract;

        if (this.meterSerialExists(this.selectedContract)) {
            this.numberMeters = this.selectedContract.ssmrModel.meters.length;
        }

        this.ssmrService.clearReadings();
    }

    public meterSerialExists(contract: ContractDisplayViewModel): boolean {
        return contract && contract.ssmrModel && contract.ssmrModel.meters && contract.ssmrModel.meters.length
            && !!contract.ssmrModel.meters[0].meterSerial;
    }

    public onClickNext() {
        this.ssmrService.goToStep('MeterEntry');
    }
}
