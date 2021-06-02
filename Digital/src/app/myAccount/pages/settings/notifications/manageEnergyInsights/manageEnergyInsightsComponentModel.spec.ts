import { ContractEnergyInsightsModel } from './../../../../services/settings/model/contractEnergyInsightsModel';
import { ContractViewModel } from '../../../../services/account.service';
import { ManageEnergyInsightsComponentModel } from './manageEnergyInsightsComponentModel';
import { EnergyInsightsEligibilityContract } from '../../../../services/settings/model/energyInsightsEligibilityContract';

describe('Manage Energy Insights Component Model tests', () => {
    let createEnergyInsightsComponentModelTests = (): ManageEnergyInsightsComponentModel => {
        let eligibility: EnergyInsightsEligibilityContract = {
            ...new EnergyInsightsEligibilityContract(),
            contractNumber: 91222333,
            isEligible: true,
            subscribedToMidBillEnergyBreakdown: true,
            subscribedToEndBillEnergyBreakdown: false,
            availableUsageBreakdownBillPeriods: [
                {
                    billStartDate: '2018-01-01',
                    billEndDate: '2018-03-31'
                }
            ]
        };

        let contractEnergyInsightsModel: ContractEnergyInsightsModel = {
            accountNumber: '123456',
            contract: new ContractViewModel('91222333'),
            energyInsightsEligibility: eligibility,
            email: 'johnny@gmail.com',
            address: '123 Bourke St, Docklands 3000'
        };

        return new ManageEnergyInsightsComponentModel(contractEnergyInsightsModel);
    };

    describe('Computed properties of the component model', () => {
        let testModel: ManageEnergyInsightsComponentModel;
        beforeEach(() => {
            testModel = createEnergyInsightsComponentModelTests();
        });

        it('should compute correctly if the model is initialised', () => {
            // ASSERT
            expect(testModel.midBillRequestLoading).toBe(false);
            expect(testModel.endBillRequestLoading).toBe(false);
            expect(testModel.postEnergyInsightsEndFailed).toBe(false);
            expect(testModel.postEnergyInsightsMidFailed).toBe(false);
            expect(testModel.isEnergyInsightsEligible).toBe(true);
            expect(testModel.emailAddress).toContain('johnny@gmail.com');
            expect(testModel.address).toContain('123 Bourke St, Docklands 3000');
            expect(testModel.contractNumber).toBe('91222333');
            expect(testModel.availableUsageBreakdownBillPeriods).toEqual([
                {
                    billStartDate: '2018-01-01',
                    billEndDate: '2018-03-31'
                }]);
        });

        it('should set mid and end bill requests loading state', () => {
            // ARRANGE
            testModel.midBillRequestLoading = true;
            testModel.endBillRequestLoading = true;

            // ASSERT
            expect(testModel.midBillRequestLoading).toBe(true);
            expect(testModel.endBillRequestLoading).toBe(true);
        });

        it('should set post failures to mid and end bill', () => {
            // ARRANGE
            testModel.postEnergyInsightsEndFailed = true;
            testModel.postEnergyInsightsMidFailed = true;

            // ASSERT
            expect(testModel.postEnergyInsightsEndFailed).toBe(true);
            expect(testModel.postEnergyInsightsMidFailed).toBe(true);
        });
    });
});
