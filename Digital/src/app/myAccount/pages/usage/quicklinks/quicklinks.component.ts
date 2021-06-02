import { Component } from '@angular/core';
import { ConfigService } from '../../../../shared/service/config.service';

@Component({
    selector: 'agl-account-usage-quicklinks',
    templateUrl: './quicklinks.component.html',
    styleUrls: ['./quicklinks.component.scss']
})
export class QuickLinksComponent {
    public directDebitUrl: string;
    public paperlessBillingUrl: string;
    public changePlanUrl: string;

    constructor(
        private config: ConfigService
    ) {
        this.directDebitUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/home/paymentoptions/direct-debit`;
        this.paperlessBillingUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/home/myaccount/paperless-billing`;
        this.changePlanUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/sts/account/login?returnApp=OneMinuteMove&returnPath=%2Fsignup%23connection%2FrequestType%2Faf`;
    }
}
