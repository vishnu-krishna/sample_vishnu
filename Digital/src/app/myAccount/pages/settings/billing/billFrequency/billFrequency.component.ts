import { Component } from '@angular/core';
import { ConfigService } from '../../../../../shared/service/config.service';

@Component({
    selector: 'agl-settings-bill-frequency',
    templateUrl: './billFrequency.component.html',
    styleUrls: ['./billFrequency.component.scss']
})
export class BillFrequencyComponent {
    public billingUrl: string;

    constructor(
        private config: ConfigService
    ) {
        this.billingUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/myaccount/monthlybilling`;
    }

}
