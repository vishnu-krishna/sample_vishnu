import { Component } from '@angular/core';
import { ISsmrService } from '../../../../services/contract/issmr.service';

@Component({
    selector: 'agl-settings-meter-reading',
    templateUrl: './meterReading.component.html',
    styleUrls: ['./meterReading.component.scss']
})

export class MeterReadingComponent {
    constructor(
        public ssmrService: ISsmrService
    ) {}
}
