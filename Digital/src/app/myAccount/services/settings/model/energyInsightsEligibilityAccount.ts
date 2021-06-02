import { EnergyInsightsEligibilityContract } from './energyInsightsEligibilityContract';

export class EnergyInsightsEligibilityAccount {

    constructor(
        public accountNumber: string,
        public contracts: EnergyInsightsEligibilityContract[],
    ) {

    }

}
