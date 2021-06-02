import { Component, OnInit } from '@angular/core';
import { SelfServiceMeterReading } from '../../../../../shared/service/api.service';
import { MeterApiModel } from '../../../../../shared/service/api.service';
import { ContractDisplayViewModel } from '../../../../model/ssmr/contractDisplayView.model';
import { ISsmrService } from '../../../../services/contract/issmr.service';
import { FuelType } from '../../../../services/ssmr.service';

@Component({
    selector: 'agl-ssmr-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
    public selectedContract: ContractDisplayViewModel;
    public numberMeters: number;
    public meterReadings: SelfServiceMeterReading[] = [];
    public fuelType: any = FuelType ;

    constructor(
        public ssmrService: ISsmrService,
    ) {
    }

     public ngOnInit() {
        this.selectedContract = this.ssmrService.selectedContract;
        this.meterReadings = this.ssmrService.selfServiceMeterReadings;
     }

    public onClickSubmit() {
        if (this.ssmrService.selfServiceMeterReadings.length > 0) {
            this.ssmrService.goToStep('Submitting');
        }
    }

    public isFuelTypeElectricity(): boolean {
        return this.selectedContract.fuelType === this.fuelType.Electricity;
    }

    public isFuelTypeGas(): boolean {
        return this.selectedContract.fuelType === this.fuelType.Gas;
    }

    public onClickIcon( index: number) {
        this.ssmrService.meterEntryIndex = index;
        this.ssmrService.registerEntryIndex = 0;
        this.ssmrService.reloadMeterEntryPage();
    }
    public checkMeterReadSubmitted( meterSerial: string ): boolean {
        const isMeterReadPresent  = this.ssmrService.selfServiceMeterReadings.some((element) => {
            if (element) {
                let isValuePresentInRegister = element.registers.some((register) => {
                    return register.reading !== undefined;
                });
                return element.meterSerial === meterSerial && isValuePresentInRegister;
            }
        });
        return isMeterReadPresent;
    }

    public isMultiRegister(meter: MeterApiModel): boolean {
        return meter.registers.length > 1;
    }

    public getRegisterMessage(meter: MeterApiModel): string {
        let registerMessageString: string = 'Registers';
        let registerCount: number = meter.registers.length;
        let actualRegisterReads: any;

        let selfServiceMeterReading: SelfServiceMeterReading  = this.ssmrService.selfServiceMeterReadings.find((element) => {
            if (element) {
                return element.meterSerial === meter.meterSerial;
            }
        });

        if (selfServiceMeterReading && selfServiceMeterReading.registers ) {
            actualRegisterReads = selfServiceMeterReading.registers.filter((register) => {
                return !!register.reading;
            });
        }

        if (actualRegisterReads) {
            if (actualRegisterReads.length === meter.registers.length) {
                registerMessageString = `${registerMessageString} ${registerCount}`;
            } else {
                 registerMessageString = `${registerMessageString} ${actualRegisterReads.length} of ${registerCount}`;
            }
        } else {
            registerMessageString = `${registerMessageString} 0 of ${registerCount}`;
        }
        return registerMessageString;
    }
}
