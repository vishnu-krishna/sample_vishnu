import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AglAuthTokenProvider } from '../../../../../shared/repository/aglAuthTokenProvider';
import { ConfigService } from '../../../../../shared/service/config.service';
import { AccountViewModel, IAccountServiceMA } from '../../../../services/account.service';
import { MonthlyBillingService } from '../../../../services/monthlyBilling.service';

@Component({
    selector: 'agl-monthly-billing-welcome',
    templateUrl: './monthlyBillingWelcome.component.html',
    styleUrls: ['./monthlyBillingWelcome.component.scss']
})
export class MonthlyBillingWelcomeComponent {
    public account: AccountViewModel;
    public isLoadingEligibility: boolean;
    public isSingleAccount: boolean;
    public showPage: boolean = false;

    constructor(
        public accountService: IAccountServiceMA,
        public monthlyBillingService: MonthlyBillingService,
        private router: Router,
        private aglAuthTokenProvider: AglAuthTokenProvider,
        private configService: ConfigService,

    ) {}

    public login() {
        const siteCoreUrl = this.configService.current.aglSiteCoreWebsiteBaseUrl;
        const loginPage = `${siteCoreUrl}/sts/account/login?returnApp=MyAccount&returnPath=${encodeURIComponent('/settings/monthlybilling/welcome')}`;
        window.location.replace(loginPage);
    }

    public register() {
        const siteCoreUrl = this.configService.current.aglSiteCoreWebsiteBaseUrl;
        const loginPage = `${siteCoreUrl}/sts/account/login?register=true&returnApp=MyAccount&returnPath=${encodeURIComponent('/settings/monthlybilling/welcome')}`;
        window.location.replace(loginPage);
    }
}
