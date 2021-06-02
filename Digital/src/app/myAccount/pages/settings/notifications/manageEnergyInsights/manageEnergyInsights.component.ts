
import { Component, Input, OnInit } from '@angular/core';

import { ContractEnergyInsightsModel } from '../../../../services/settings/model/contractEnergyInsightsModel';
import { EnergyInsightsService } from '../../../../services/energyInsights.service';
import { SetupEnergyInsightsRequest } from '../../../../services/settings/model/setupEnergyInsightsRequest';
import { FlashMessageType } from '../../../../maui/flashMessage';
import { ManageEnergyInsightsComponentModel } from './manageEnergyInsightsComponentModel';
import { CLIENT_RENEG_WINDOW } from 'tls';
import { EnergyInsightsIneligibleReason } from '../../energyInsights/energyInsightsIneligibleReason.enum';

@Component({
    selector: 'agl-settings-manage-energy-insights',
    templateUrl: './manageEnergyInsights.component.html',
    styleUrls: ['./manageEnergyInsights.component.scss']
})

export class ManageEnergyInsightsComponent implements OnInit {

    @Input() public energyInsightsSubscriptionModels: ManageEnergyInsightsComponentModel[];
    @Input() public isEnergyInsightsDataError: boolean;
    @Input() public hasInflightAccount: boolean = false;

    public FlashMessageType = FlashMessageType;
    public showAccountNumber = false;
    public emailAddress: string;
    public hasEligibleEnergyInsightsContracts: boolean = false;
    public EnergyInsightsIneligibleReason = EnergyInsightsIneligibleReason;

    constructor(
        private energyInsightsService: EnergyInsightsService
    ) { }

    ngOnInit(): void {
        if (!this.isEnergyInsightsDataError && this.energyInsightsSubscriptionModels.length) {
            this.emailAddress = this.energyInsightsSubscriptionModels[0].emailAddress;
            this.hasEligibleEnergyInsightsContracts = this.energyInsightsSubscriptionModels
                                                            .some((energyInsightsModel) => energyInsightsModel.isEnergyInsightsEligible);
            this.showAccountNumber = this.shouldShowAccountNumber();
        }
    }

    public showEnergyInsightsSubscriptionToggles(model: ManageEnergyInsightsComponentModel): boolean {
        return !this.isEnergyInsightsDataError;
    }

    public shouldShowAccountOrContractHeader(): boolean {
        // We want to show the header if there is more than 1 account, so the customer can see which account they are managing
        let moreThanOneEiModel: boolean = this.energyInsightsSubscriptionModels.length > 1;
        return (moreThanOneEiModel || this.hasInflightAccount);
    }

    public shouldShowAccountNumber(): boolean {
        return this.everyAccountHasOnlyOneElecContract();
    }

    public everyAccountHasOnlyOneElecContract(): boolean {
        let accountElectricityCounts = [];
        this.energyInsightsSubscriptionModels.map((eiModel) => {
            if (eiModel.isElectricityContract) {
                accountElectricityCounts[eiModel.accountNumber] = 1 + (accountElectricityCounts[eiModel.accountNumber] || 0);
            }
        });

        return Object.keys(accountElectricityCounts).every((key) => {
            return accountElectricityCounts[key] === 1;
        });
    }

    public setUpMidBillReport(setupMidBill: boolean, model: ManageEnergyInsightsComponentModel): void {
        model.midBillRequestLoading = true;
        let energyInsightsRequest = new SetupEnergyInsightsRequest(setupMidBill);

        this.energyInsightsService.setupEnergyInsights(model.contractNumber, energyInsightsRequest)
            .finally(() => {
                model.midBillRequestLoading = false;
            })
            .subscribe((setupResult) => {
                model.energyInsightsSubscription.subscribedToMidBillEnergyBreakdown = setupMidBill;
                model.postEnergyInsightsMidFailed = false;
            },
            (err) => {
                model.postEnergyInsightsMidFailed = true;
                model.energyInsightsSubscription.subscribedToMidBillEnergyBreakdown  = !setupMidBill;
            });
    }

    public setUpEndBillReport(setupEndBill: boolean, model: ManageEnergyInsightsComponentModel): void {
        model.endBillRequestLoading = true;
        let energyInsightsRequest = new SetupEnergyInsightsRequest(null, setupEndBill);

        this.energyInsightsService.setupEnergyInsights(model.contractNumber, energyInsightsRequest)
            .finally(() => {
                model.endBillRequestLoading = false;
            })
            .subscribe((setupResult) => {
                model.energyInsightsSubscription.subscribedToEndBillEnergyBreakdown = setupEndBill;
                model.postEnergyInsightsEndFailed = false;
            },
            (err) => {
                model.postEnergyInsightsEndFailed = true;
                model.energyInsightsSubscription.subscribedToEndBillEnergyBreakdown = !setupEndBill;
            });
    }

    public onClickDismissFlashMessage(isMid: boolean, model: ManageEnergyInsightsComponentModel) {
        if (isMid) {
            model.postEnergyInsightsMidFailed = false;
        } else {
            model.postEnergyInsightsEndFailed = false;
        }
    }
}
