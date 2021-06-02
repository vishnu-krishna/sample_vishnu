import { ContractViewModel } from '../../account.service';
import { EnergyInsightsEligibilityContract } from './energyInsightsEligibilityContract';

export class ContractEnergyInsightsModel {
    public accountNumber: string;
    public contract: ContractViewModel;
    public energyInsightsEligibility: EnergyInsightsEligibilityContract;
    public email: string;
    public address: string;
}
