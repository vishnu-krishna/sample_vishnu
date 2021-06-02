
import { ContractEnergyInsightsModel } from '../../../../services/settings/model/contractEnergyInsightsModel';
import { UsageBreakdownBillPeriod } from '../../../../services/settings/model/usageBreakdownBillPeriod';
import { Reason } from '../../../../services/settings/model/reason';
import { EnergyInsightsEligibilityContract } from '../../../../services/settings/model/energyInsightsEligibilityContract';
import { EnergyInsightsIneligibleReason } from '../../energyInsights/energyInsightsIneligibleReason.enum';

export class ManageEnergyInsightsComponentModel {

    public midBillRequestLoading: boolean = false;
    public endBillRequestLoading: boolean = false;
    public postEnergyInsightsEndFailed: boolean = false;
    public postEnergyInsightsMidFailed: boolean = false;
    public energyInsightsSubscription: EnergyInsightsEligibilityContract;

    constructor(
        private contractEnergyInsightsSubscription: ContractEnergyInsightsModel,
    ) {
        if (!contractEnergyInsightsSubscription) {
            throw Error(`ManageEnergyInsightsComponentModel was instantiated with an empty model.`);
        }
        if (!contractEnergyInsightsSubscription.contract) {
            throw Error(`ManageEnergyInsightsComponentModel was instantiated without a valid contract`);
        }
        this.energyInsightsSubscription = contractEnergyInsightsSubscription.energyInsightsEligibility;
    }

    public get isEnergyInsightsEligible(): boolean {
        return this.energyInsightsSubscription.isEligible;
    }

    public get emailAddress(): string {
        return this.contractEnergyInsightsSubscription.email ? this.contractEnergyInsightsSubscription.email : '';
    }

    public get address(): string {
        return this.contractEnergyInsightsSubscription.address;
    }

    public get contractNumber(): string {
        return this.contractEnergyInsightsSubscription.contract.contractNumber;
    }

    public get accountNumber(): string {
        return this.contractEnergyInsightsSubscription.contract.accountNumber;
    }

    public get availableUsageBreakdownBillPeriods(): UsageBreakdownBillPeriod[] {
        return this.energyInsightsSubscription.availableUsageBreakdownBillPeriods;
    }

    public get ineligibleReason(): EnergyInsightsIneligibleReason {
        return this.energyInsightsSubscription.reasonForIneligibility;
    }

    public get ineligibleReasonMessage(): string {
        return this.energyInsightsSubscription.ineligibilityMessage;
    }

    public get isElectricityContract(): boolean {
        return this.contractEnergyInsightsSubscription.contract.isElectricity;
    }
}
