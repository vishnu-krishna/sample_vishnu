import { Component, OnInit } from '@angular/core';
import { MeterApiModel } from '../../../../../shared/service/api.service';
import { ContractDisplayViewModel } from '../../../../model/ssmr/contractDisplayView.model';
import { ISsmrService } from '../../../../services/contract/issmr.service';

@Component({
    selector: 'agl-ssmr-multi-meter-intro',
    templateUrl: './multiMeterIntro.component.html',
    styleUrls: ['./multiMeterIntro.component.scss']
})
export class MultiMeterIntroComponent implements OnInit {
    public selectedContract: ContractDisplayViewModel;
    public numberMeters: number;

    constructor(
        public ssmrService: ISsmrService,
    ) {
    }

     public ngOnInit() {
         this.selectedContract = this.ssmrService.selectedContract;

         if (this.meterSerialExists(this.selectedContract)) {
            this.numberMeters = this.selectedContract.ssmrModel.meters.length;
        }
     }

    public meterSerialExists( contract: ContractDisplayViewModel): boolean {
        if ( contract && contract.ssmrModel && contract.ssmrModel.meters
            && contract.ssmrModel.meters.length > 0 && contract.ssmrModel.meters[0].meterSerial) {

            return true;
        } else {
            return false;
        }
    }

    public onClickMeterEntry() {
        if (this.ssmrService.isContractMultiRegister(this.selectedContract)) {
            this.ssmrService.goToStep('MultiRegisterOnboard');
        } else {
            this.ssmrService.goToStep('MeterEntry');
        }
    }

    public getRegisterMessage(meter: MeterApiModel): string {
        let registerMessageString: string = 'Registers';
        let registerCount: number = meter.registers.length;
        registerMessageString = `${registerMessageString} ${registerCount}`;
        return registerMessageString;
    }

    public isMultiRegister(meter: MeterApiModel): boolean {
        return meter.registers.length > 1;
    }
}
