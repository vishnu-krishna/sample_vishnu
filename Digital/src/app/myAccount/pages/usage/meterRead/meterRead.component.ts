import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UsageLoadNewContractMessage } from '../../../../shared/messages/usageLoadNewContract.message';
import { IMessageBusService } from '../../../../shared/service/contract/imessageBus.service';
import { ISsmrService } from '../../../services/contract/issmr.service';

@Component({
    selector: 'agl-meter-read',
    templateUrl: './meterRead.component.html',
    styleUrls: ['./meterRead.component.scss']
})
export class MeterReadComponent implements OnInit {
    @Input() public selected;
    public meterType: string;
    public dateOfRead: string;
    public screenWidth: number;
    public deviceType: string;

    constructor(
        public _messageBusService: IMessageBusService,
        public router: Router,
        public ssmrService: ISsmrService,
    ) { }

    public ngOnInit() {
        this.initComponent();
        this.screenWidth = screen.width;
        this.setWidth(this.screenWidth);
    }

    public initComponent() {
        this.meterType = 'Basic meter';
        this._messageBusService.listenWithLatest(UsageLoadNewContractMessage).subscribe(
            (result) => {
                this.dateOfRead = moment(result.Contract.currentBillEndDate).format('DD MMMM YYYY');
            }
        );
    }
    public onClickSubmitMeterRead() {
        this.ssmrService.showModal();
    }

    public setWidth(width: number) {
        if (width >= 992) {
            this.deviceType = 'desktop';
        } else if (width >= 768) {
            this.deviceType = 'tablet';
        } else {
            this.deviceType = 'mobile';
        }
        console.log('DEVICE TYPE:', this.deviceType);
    }

}
