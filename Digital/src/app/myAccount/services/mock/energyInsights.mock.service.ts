import { Injectable, EventEmitter } from '@angular/core';
import { ManageEnergyInsightsComponentModel } from '../../pages/settings/notifications/manageEnergyInsights/manageEnergyInsightsComponentModel';

@Injectable()
export class MockEnergyInsightsService {

    public modelUpdated: EventEmitter<ManageEnergyInsightsComponentModel[]> = new EventEmitter<ManageEnergyInsightsComponentModel[]>();

    public getUsageBreakdownForBilled() {
        throw new Error('getUsageBreakdownForBilled is not implemented');
    }
    public setModel() {
        throw new Error('setModel is not implemented');
    }
    public getAccountStatus() {
        throw new Error('getAccountStatus is not implemented');
    }
    public setupEnergyInsights() {
        throw new Error('setupEnergyInsights is not implemented');
    }
    public getContractDetailsAndEligibility() {
        throw new Error('getContractDetailsAndEligibility is not implemented');
    }
    public verifySingleAccountDetails() {
        throw new Error('verifySingleAccountDetails is not implemented');
    }
    public filterContracts() {
        throw new Error('filterContracts is not implemented');
    }
    public shouldDisplayBackButton() {
        throw new Error('shouldDisplayBackButton is not implemented');
    }
    public buildContractEnergyInsightsModel() {
        throw new Error('buildContractEnergyInsightsModel is not implemented');
    }
    public hasPostSetupContracts() {
        throw new Error('hasPostSetupContracts is not implemented');
    }
    public hasPreSetupContracts() {
        throw new Error('hasPreSetupContracts is not implemented');
    }
    public hasIneligibleContracts() {
        throw new Error('hasIneligibleContracts is not implemented');
    }
}
