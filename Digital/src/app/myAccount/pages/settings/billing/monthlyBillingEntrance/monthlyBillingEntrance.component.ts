import { DataServiceInterface } from './../../../../../../../e2e/services/dataService/dataServiceInterface';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../shared/service/config.service';
import { FlashMessageType } from '../../../../maui/flashMessage';
import { AccountViewModel } from '../../../../services/account.service';
import { MonthlyBillingReferrer, MonthlyBillingService } from '../../../../services/monthlyBilling.service';
import { AccountMonthlyBillingModel } from '../../../../services/settings/model/accountMonthlyBillingModel';
import { BillingFrequencyType } from '../../../../services/settings/model/billingFrequencyType';
import { ContractMonthlyBillingModel } from '../../../../services/settings/model/contractMonthlyBillingModel';
import { MonthlyBillingRoutes } from '../../monthlyBilling/monthlyBillingRoutes.const';
import { BillingSettingsViewModelItem } from '../billingSettingsViewModelItem';
import { DataLayerService } from '../../../../../shared/service/dataLayer.service';

@Component({
    selector: 'agl-settings-monthly-billing-entrance',
    templateUrl: './monthlyBillingEntrance.component.html',
    styleUrls: ['./monthlyBillingEntrance.component.scss']
})
export class MonthlyBillingEntranceComponent implements OnInit {
    @Input() public billingSettingsAccountViewModel: BillingSettingsViewModelItem;
    public canSetup: boolean;
    public contractMBMs: ContractMonthlyBillingModel[];
    public billingUrl: string;
    public isLoadingBillingFrequency: boolean;
    public isLoadingEligibility: boolean;
    public linkText: string;
    public eligibilityFailed: boolean = false;
    public message: string;
    public monthlyBillingInfo: AccountMonthlyBillingModel;
    public monthlyBillingUrl: string = '/settings/monthlybilling/services';
    public FlashMessageType: typeof FlashMessageType = FlashMessageType;
    public billSmoothingFuelsMsg: string = ``;
    public billingFrequencyFailed: boolean = false;

    private linkTextManage: string = `Manage`;
    private linkTextSetup: string = `Set up`;

    constructor(
        private config: ConfigService,
        private dataLayerService: DataLayerService,
        public monthlyBillingService: MonthlyBillingService,
        public router: Router,
    ) {
    }

    public ngOnInit() {
        this.eligibilityFailed = this.monthlyBillingService.eligibilityFailed;
        this.isLoadingBillingFrequency = true;
        this.monthlyBillingService.getMonthlyBillingInfoForAccount(this.billingSettingsAccountViewModel.account)
            .finally(() => {
                this.isLoadingBillingFrequency = false;
            })
            .subscribe(
                (result: AccountMonthlyBillingModel) => {
                    this.monthlyBillingInfo = new AccountMonthlyBillingModel(result.accountNumber, result.contractMonthlyBillingModels);
                    this.contractMBMs = this.monthlyBillingInfo.contractMonthlyBillingModels;
                    this.billingFrequencyFailed = this.billingSettingsAccountViewModel.account.allContractsAreNewConnection ? !this.billingSettingsAccountViewModel.account.allContractsAreNewConnection : this.monthlyBillingInfo.billingFrequencyFailed;
                    this.canSetup = true;
                    this.message = this.monthlyBillingService.createMessage(this.monthlyBillingInfo);
                    this.createLink();

            },  (err) => {
                    console.error('ERROR: monthlyBillingService.getMonthlyBillingInfoForAccount()', err);
                    this.billingFrequencyFailed = true;
            }
        );
    }

    public onClickLink(account: AccountViewModel) {

        if (this.linkText === this.linkTextManage) {
            this.dataLayerService.pushSingleEvents({
                monthly_billing_entry: 'manage',
            });
        }

        if (this.linkText === this.linkTextSetup) {
            this.dataLayerService.pushSingleEvents({
                monthly_billing_entry: 'setup',
            });
        }

        this.isLoadingEligibility = true;
        this.monthlyBillingService.currentAccount = account;
        this.monthlyBillingService.getMonthlyBillingInfoWithEligibility(this.monthlyBillingService.currentAccount)
            .finally(
                () => {
                    this.isLoadingEligibility = false;
                }
            )
            .subscribe(
                (monthlyBillingAccountDetails: AccountMonthlyBillingModel ) => {
                    this.eligibilityFailed = false;
                    this.monthlyBillingService.monthlyBillingReferrer = MonthlyBillingReferrer.ManageAccount;
                    this.monthlyBillingService.currentAccount = account;
                    this.monthlyBillingService.selectedMonthlyBillingAccount = this.monthlyBillingInfo;
                    this.router.navigate([MonthlyBillingRoutes.ChooseService]);
                },
                (err) => {
                    console.error(`ERROR: monthlyBillingService.getMonthlyBillingInfoForAccount(). Routing to 'Manage Account'`, err);
                    this.eligibilityFailed = true;
                }
            );
    }

    public showLink(): boolean {
        return !this.isLoadingBillingFrequency && !this.isLoadingEligibility && this.monthlyBillingInfo && !this.monthlyBillingInfo.billingFrequencyFailed && !this.monthlyBillingInfo.areAllContractsInflight;
    }

    private createLink(): void {
        if (this.monthlyBillingInfo && this.monthlyBillingInfo.hasMonthlyBilling) {
            this.linkText = this.linkTextManage;
        } else if (this.canSetup) {
            this.linkText = this.linkTextSetup;
        } else {
            // TODO: ineligible scenario
        }
    }
}
