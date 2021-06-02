import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from '../../../../shared/service/config.service';
import { AccountViewModel, IAccountServiceMA } from '../../../services/account.service';
import { ISsmrService } from '../../../services/contract/issmr.service';
import { FeatureFlagService, FeatureFlagTypes } from '../../../services/featureFlag.service';
import { MonthlyBillingReferrer, MonthlyBillingService } from '../../../services/monthlyBilling.service';
import { AccountMonthlyBillingModel } from '../../../services/settings/model/accountMonthlyBillingModel';
import { MonthlyBillingRoutes } from '../../settings/monthlyBilling/monthlyBillingRoutes.const';

@Component({
    selector: 'agl-bills-button-stack',
    templateUrl: './billsButtonStack.component.html',
    styleUrls: ['./billsButtonStack.component.scss']
})
export class BillsButtonStackComponent implements OnInit {

    @Input() public isReadOnly: boolean;

    public monthlyBillingEntryAvailable: boolean = false;
    public ssmrFeatureEnabled: boolean = false;
    public isSingleAccount: boolean = false;
    public monthlyBillingUrl: string;
    public account: AccountViewModel;
    public isLoadingMonthlyBillingEligibility: boolean = false;
    public monthlyBillingFeatureFlagOn: boolean;
    public doesCustomerhaveBasicMeter: boolean;
    public hasLoaded: boolean = false;

    private manageNotificationsFeatureFlagOn: boolean;

    constructor(
        public featureService: FeatureFlagService,
        public accountsService: IAccountServiceMA,
        public ssmr: ISsmrService,
        public monthlyBillingService: MonthlyBillingService,
        public router: Router,
        public configService: ConfigService
    ) {

    }

    public ngOnInit() {
        this.checkCustomerHasBasicMeter();

        let featureFlagTypes: FeatureFlagTypes[] = [
            FeatureFlagTypes.ssmrEnabled,
            FeatureFlagTypes.manageNotificationsEnabled,
        ];

        this.featureService.featureFlagValues(featureFlagTypes)
            .subscribe(([ssmrEnabled, manageNotificationsEnabled]) => {
                this.ssmrFeatureEnabled = ssmrEnabled;
                this.manageNotificationsFeatureFlagOn = manageNotificationsEnabled;
            });

        Observable.forkJoin(
            this.featureService.featureFlagged(FeatureFlagTypes.monthlyBillingEnabled),
            this.monthlyBillingService.isCustomerPredictedAsEligible(),
            this.monthlyBillingService.hasAnyNonMonthlyBillingContract(),
            this.accountsService.getAccounts()
        )
        .finally(() => {
            this.hasLoaded = true;
        })
        .subscribe(
            ([monthlyBillingEnabled, monthlyBillingPredictedEligible, nonMonthlyBillingContractAvailable, accounts]) => {
                this.monthlyBillingFeatureFlagOn = monthlyBillingEnabled;

                if (accounts.length === 1) {
                    this.isSingleAccount = true;
                    this.account = accounts[0];
                }
                this.monthlyBillingEntryAvailable = (monthlyBillingEnabled && monthlyBillingPredictedEligible && nonMonthlyBillingContractAvailable);
            },
            (err: any) => {
                // We need to handle this error, otherwise it gets bubbled up to angular, which will cause issues
            }
        );
    }

    public showSssmrLink() {
        return this.doesCustomerhaveBasicMeter && this.ssmrFeatureEnabled;
    }

    public onClickMonthlyBilling(): void {
        if (this.isSingleAccount) {
            this.isLoadingMonthlyBillingEligibility = true;
            this.monthlyBillingService.currentAccount = this.account;
            this.monthlyBillingService.getMonthlyBillingInfoWithEligibility(this.monthlyBillingService.currentAccount)
                .finally(
                    () => {
                        this.isLoadingMonthlyBillingEligibility = false;
                    }
                )
                .subscribe(
                    (monthlyBillingAccountDetails: AccountMonthlyBillingModel ) => {
                        this.monthlyBillingService.eligibilityFailed = false;
                        this.monthlyBillingService.monthlyBillingReferrer = MonthlyBillingReferrer.ManageAccount;
                        this.monthlyBillingService.currentAccount = this.account;
                        this.monthlyBillingService.selectedMonthlyBillingAccount = monthlyBillingAccountDetails;
                        this.router.navigate([MonthlyBillingRoutes.ChooseService]);
                    },
                    (err) => {
                        this.monthlyBillingService.eligibilityFailed = true;
                        this.router.navigate(['/settings/billing']);
                    }
                );

        } else {
            this.router.navigate(['/settings/billing']);
        }

    }

    public checkCustomerHasBasicMeter() {
        this.doesCustomerhaveBasicMeter = true;
        this.accountsService.getAccounts().subscribe(
            (result) => {
                let accountArray: AccountViewModel[];
                accountArray = result;
                for (let account of accountArray) {
                    this.doesCustomerhaveBasicMeter = (account.contracts.find((contract) => (contract.isSmartMeter === false)) !== undefined);
                    if (this.doesCustomerhaveBasicMeter) {
                        break; // breaking if at least one basic meter is found for the account
                    }
                }
            }
        );
    }

    public viewPlanLink(): string {
        return this.configService.current.aglSiteCoreWebsiteBaseUrl + `/aeo/energyplans/energy-plan`;
    }

    public showClassicAeoMonthlyBillingLink(): boolean {
        return !this.monthlyBillingFeatureFlagOn && this.hasLoaded;
    }

    public showMyAccountManagedMonthlyBilling(): boolean {
        return this.monthlyBillingFeatureFlagOn && this.monthlyBillingEntryAvailable && this.hasLoaded;
    }

    public eBillingLink(): string {
        return this.manageNotificationsFeatureFlagOn ? `/settings/notifications` : `/settings/billing`;
    }
}
