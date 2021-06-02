import { Component, OnInit } from '@angular/core';
import { IDecisioningService } from '../../services/contract/idecisioning.service';

@Component({
    selector: 'agl-smspay-banner',
    templateUrl: './smsPayBanner.component.html',
    styleUrls: ['./smsPayBanner.component.scss']
})
export class SmsPayBannerComponent implements OnInit {

    public showSmsPayPanel: boolean;

    constructor(
        public decisioningService: IDecisioningService
    ) { }

    public ngOnInit() {
        this.decisioningService.checkSmsPayBannerVisibility(true)
        .subscribe(
            (showSmsPayBannerResult: boolean) => {
               this.showSmsPayPanel = showSmsPayBannerResult;
        });
    }

    public closeSmsPayPanel() {
        this.showSmsPayPanel = false;
        this.decisioningService.closeSmsPayPanel();
    }
}
