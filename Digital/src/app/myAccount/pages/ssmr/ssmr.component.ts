import { Component } from '@angular/core';
import { ISsmrService } from './../../services/contract/issmr.service';

declare let leanengage: any;

@Component({
    selector: 'agl-ssmr-modal',
    templateUrl: './ssmr.component.html',
    styleUrls: ['./ssmr.component.scss']
})
export class SSMRComponent {
    public showDefaultState: boolean;

    constructor(
        public ssmrService: ISsmrService
    ) { }

}
