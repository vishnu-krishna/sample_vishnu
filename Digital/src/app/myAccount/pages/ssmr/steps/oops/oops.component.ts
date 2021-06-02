import { Component, OnInit } from '@angular/core';

import { ContractDisplayViewModel } from '../../../../model/ssmr/contractDisplayView.model';
import { ISsmrService } from '../../../../services/contract/issmr.service';

@Component({
    selector: 'agl-ssmr-oops',
    templateUrl: './oops.component.html',
    styleUrls: ['./oops.component.scss']
})
export class OopsComponent implements OnInit {
    public screenCode: string;
    public selectedContract: ContractDisplayViewModel;
    public meterReadErrorMessage: string;
    public heading: string;
    public errorNumber: string;

    constructor(
        public ssmrService: ISsmrService
    ) {
    }

    public ngOnInit() {
        this.selectedContract = this.ssmrService.selectedContract;

        this.screenCode = this.ssmrService.screenCode;
        if ( this.screenCode === 'SSMR_MRR' ) {
            this.meterReadErrorMessage = this.ssmrService.getMeterReadErrorMessage();
            this.errorNumber = this.ssmrService.errorNumber;
            this.heading = `That didn't go to plan`;

            this.ssmrService.badMeterReads = this.ssmrService.selfServiceReadingResponse.meters.filter((meter) => {
                return meter.registers.find((x) => x.isValid === false);
            });

            this.ssmrService.meterEntryIndex = this.ssmrService.selectedContract.ssmrModel.meters.findIndex((meter) => {
                if (meter && meter.meterSerial && this.ssmrService.badMeterReads && this.ssmrService.badMeterReads.length > 0) {
                    return meter.meterSerial === this.ssmrService.badMeterReads[0].meterSerial;
                }
            });

            if (this.ssmrService.selectedContract.ssmrModel.meters[this.ssmrService.meterEntryIndex].registers.length > 1) {
                let badMeter = this.ssmrService.selectedContract.ssmrModel.meters[this.ssmrService.meterEntryIndex];
                this.ssmrService.registerEntryIndex = badMeter.registers.findIndex((register) => {
                    if (register && register.registerId && this.ssmrService.badMeterReads && this.ssmrService.badMeterReads.length > 0) {
                        return register.registerId === this.ssmrService.badMeterReads[0].registers.find((x) => x.isValid === false).registerId;
                    }
                });
            } else {
                 this.ssmrService.registerEntryIndex = 0;
            }

        } else if ( this.screenCode === 'SSMR_EX3') {
            this.meterReadErrorMessage = this.ssmrService.getMeterReadErrorMessage();
            this.heading = `Something went wrong`;
        } else { // This is when API response does not have screen code or error number
            this.heading = `That didn't go to plan`;
            this.meterReadErrorMessage = this.ssmrService.getMeterReadErrorMessage();
        }
    }

    public onClickSubmit() {
        this.ssmrService.goToStep('MeterEntry');
    }

    public onClickCloseButton() {
        this.ssmrService.onClickClose();
    }
}
