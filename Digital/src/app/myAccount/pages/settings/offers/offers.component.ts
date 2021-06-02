import { Component } from '@angular/core';
import { ConfigService } from '../../../../shared/service/config.service';
import { IAccountServiceMA } from '../../../services/account.service';

@Component({
    selector: 'agl-settings-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
    public isWa = false;
    public flyBuysUrl: string;

    constructor(
        private accountsService: IAccountServiceMA,
        private config: ConfigService
    ) {
        this.flyBuysUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/home/myaccount/flybuys-transactions`;

        this.accountsService.getAccounts().subscribe((accounts) => {
            if (accounts[0].contracts[0].regionId === 'WA') {
                this.isWa = true;
            }
        });
    }
}
