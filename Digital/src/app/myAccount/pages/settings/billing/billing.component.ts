import { Component, OnInit }                from '@angular/core';
import { FeatureFlagService, FeatureFlagTypes } from '../../../../myAccount/services/featureFlag.service';
import { ConfigService } from '../../../../shared/service/config.service';
import { ISettingsService }                 from '../../../services/settings/settings.service.interface';
import { BillingSettingsViewModel } from './billingSettingsViewModel';
import { BillingSettingsViewModelFactory } from './billingSettingsViewModelFactory';
import { BillingSettingsViewModelItem } from './billingSettingsViewModelItem';
import { BillDeliveryModeChangedEventArgs } from './emailBilling/billDeliveryModeChangedEventArgs';

@Component({
    selector: 'agl-settings-billing',
    templateUrl: './billing.component.html',
    styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
    public isLoading: boolean = true;
    public viewModel: BillingSettingsViewModel;
    public isEbillTurnedOn: boolean;
    public paperlessBillingUrl: string;
    public isWaGasTurnedOn: boolean;
    public ssmrFeatureEnabled: boolean = true;
    public billSmoothingV2Enabled: boolean;
    public monthlyBillingEnabled: boolean;
    public isManageNotificationsEnabled: boolean;

    constructor(
        public viewModelFactory: BillingSettingsViewModelFactory,
        public settingsService: ISettingsService,
        public featureFlagService: FeatureFlagService,
        public config: ConfigService) {
            this.paperlessBillingUrl = `${this.config.current.aglSiteCoreWebsiteBaseUrl}/aeo/myaccount/paperless-billing`;
        }

    public ngOnInit() {
        this.viewModel = new BillingSettingsViewModel();
        this.featureFlagService.featureFlagged(FeatureFlagTypes.manageAccountEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.isEbillTurnedOn = featureIsEnabled;
                this.viewModel = new BillingSettingsViewModel();
                this.viewModelFactory.getViewModel().subscribe((model) => {
                    this.viewModel = model;
                    this.isLoading = false;
                });
            }
        );

        this.featureFlagService.featureFlagged(FeatureFlagTypes.waGasTurnedOn).subscribe(
            (featureIsEnabled: boolean) => {
                this.isWaGasTurnedOn = featureIsEnabled;
            }
        );

        this.featureFlagService.featureFlagged(FeatureFlagTypes.billSmoothingEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.billSmoothingV2Enabled = featureIsEnabled;
            }
        );

        this.featureFlagService.featureFlagged(FeatureFlagTypes.monthlyBillingEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.monthlyBillingEnabled = featureIsEnabled;
            }
        );

        this.featureFlagService.featureFlagged(FeatureFlagTypes.manageNotificationsEnabled).subscribe(
            (featureIsEnabled: boolean) => {
                this.isManageNotificationsEnabled = featureIsEnabled;
            }
        );
    }

    public onBillDeliveryModeChanged(args: BillDeliveryModeChangedEventArgs) {

        let emailBillingViewModel = this.viewModel.items
            .find((item) => item.emailBillingModel.contractAccountNumber === args.contractAccountNumber).emailBillingModel;

        emailBillingViewModel.beginTransition();

        this.settingsService.updateBillDeliveryMethodPreference(args.contractAccountNumber, args.billingPreference)
            .subscribe(
                (data: any) => {
                    emailBillingViewModel.endTransition();
                },
                (err) => {
                    emailBillingViewModel.failTransition();
                }
            );
    }

    public showClassicAeoMonthlyBillingLink(model: BillingSettingsViewModelItem): boolean {
        if (this.viewModel && model) {
            return !this.viewModel.containsPaygContract
                && model.accountDetailModel.regionId !== 'WA'
                && !this.monthlyBillingEnabled;
        }
        return false;
    }

    // This is for the Monthly Billing initiative introduced by Obsidian in Feb 2018
    public showMyAccountManagedMonthlyBilling(model: BillingSettingsViewModelItem): boolean {
        if (model) {
            return model.accountDetailModel.regionId !== 'WA'
                && model.showMonthlyBilling
                && this.monthlyBillingEnabled;
        }
        return false;
    }

}
