import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AccountViewModel, IAccountServiceMA } from '../../../../services/account.service';
import { MonthlyBillingService } from '../../../../services/monthlyBilling.service';
import { AccountMonthlyBillingModel } from '../../../../services/settings/model/accountMonthlyBillingModel';

/* tslint:disable:no-access-missing-member */
declare let leanengage: any;
declare let lpTag;

@Component({
    selector: 'agl-settings-monthly-billing',
    templateUrl: './monthlyBilling.settings.component.html',
    styleUrls: [ './monthlyBilling.settings.component.scss' ]
})
export class MonthlyBillingSettingsComponent implements OnInit {

    public isMonthlyBillingEnabled: boolean = true;

    constructor(
        public monthlyBillingService: MonthlyBillingService,
        public accountService: IAccountServiceMA,
    ) {

    }

    public loadUserData(): void {
        this.accountService.getAccounts()
            .subscribe((accounts: AccountViewModel[]) => {

                // tslint:disable-next-line:array-type
                let eligibilityCalls: Observable<AccountMonthlyBillingModel>[] = [];

                for (let account of accounts) {
                    console.log(`Adding eligibility call for account ${account.accountNumber}`);
                    eligibilityCalls.push(this.monthlyBillingService.getMonthlyBillingInfoForAccount(account));
                }

                Observable.forkJoin(eligibilityCalls).subscribe((results: AccountMonthlyBillingModel[]) => {
                    for (let accountResult of results) {
                        console.log(`Eligiblity for account: ${accountResult.accountNumber}`);
                        console.log(accountResult);
                    }
                });

            });
    }

    public ngOnInit() {
        // oninit
        this.loadUserData();
    }

}
